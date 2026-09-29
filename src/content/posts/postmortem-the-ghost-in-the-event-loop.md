---
title: "Postmortem: The Ghost in the Event Loop"
description: "A deep retrospective on an elusive micro-starvation bug in asynchronous runtime pools that degraded p99.9 latency under high concurrent load."
pubDate: "2026-09-18"
updatedDate: "2026-09-25"
tags: ["postmortem", "runtimes", "async", "performance", "debugging"]
category: "03-Retrospectives"
status: "evergreen"
author: "Reflective Engineer"
---

At 03:14 UTC, alerting fired for our telemetry ingress cluster: 99.9th percentile latencies jumped from 8ms to 4,200ms. CPU usage sat calmly at 38%. Memory headroom was plentiful. Zero packet loss on the network interface.

Yet incoming requests were stalling as if frozen in liquid amber.

> [!BUG] Anomaly Signature
> - Average latency: **9ms** (completely normal)
> - p99 latency: **42ms** (acceptable)
> - p99.9 latency: **4,200ms+** (catastrophic tail collapse)
> - Queue depth: Sawtooth oscillating with erratic burst drains

## Anatomy of the Incident

Our service was built on top of an async cooperative runtime. Work was dispatched to a multi-threaded worker pool with work-stealing queues.

```go
func (w *WorkerPool) HandleIngressBatch(ctx context.Context, batch []TelemetryEvent) error {
    // Process items concurrently
    var wg sync.WaitGroup
    for _, item := range batch {
        wg.Add(1)
        go func(ev TelemetryEvent) {
            defer wg.Done()
            processItem(ctx, ev)
        }(item)
    }
    wg.Wait()
    return nil
}
```

The bug was deceptively innocent: inside `processItem`, a telemetry cryptographic hash validation was performed synchronously using an unrolled loop with zero await / yield points:

> [!WARNING] The Hidden Cooperative Scheduling Assumption
> Cooperative multitasking requires tasks to *cooperate*. A tight compute loop of 15ms inside an async task denies the worker thread from polling I/O completions and timers, turning work-stealing queues into bottlenecks.

## The Micro-Starvation Cycle

1. Ingress spikes cause 50 compute-heavy validation tasks to land on Worker Thread #3.
2. Worker #3 executes compute loops without yielding to the scheduler.
3. Network epoll / timer callbacks waiting on Worker #3's local queue starve.
4. Heartbeat pings sent over HTTP/2 connections expire due to delayed I/O wakeups.
5. Upstream load balancer detects dead connections and closes them, triggering connection renegotiation storms.

```
[Normal Flow]
Task A (I/O) -> Yield -> Task B (I/O) -> Yield -> Timer Check (OK)

[Starvation Flow]
Task X (CPU loop 15ms) ══════════════════════> No yield!
   ↳ Timers expire!
   ↳ Upstream drops connection!
```

## Remediation and Retrospective

We resolved the immediate issue by shifting the cryptographic verification into a dedicated CPU-bound thread pool isolated from the network event loop:

> [!TIP] Architectural Rule of Thumb
> Keep the event loop sacred. Never execute any un-yielded CPU operation exceeding 50 microseconds on an asynchronous reactor thread.

See how this aligns with our earlier conclusions in [[the-cost-of-premature-abstractions]]: trying to pretend CPU tasks and I/O tasks share the same execution model is another abstraction that eventually leaks.

> [!SUMMARY] Lessons Logged
> 1. P99 tells you how your system performs; P99.9 tells you what is breaking underneath.
> 2. Always instrument scheduler run-queue latency, not just total request latency.
> 3. Clean architecture must honor hardware reality: CPU pipelines and I/O reactors have fundamentally different mechanical sympathies.
