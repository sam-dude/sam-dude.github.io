# 📓 Excaliblog — Reflective Tech Reports (Obsidian Style)

A personal technical blog designed for **reflective engineering reports**, **systems architecture notes**, and **field retrospectives**. 

Crafted with the organic handwriting aesthetic of **Excalifont** (from Excalidraw), the spatial organization of an **Obsidian Vault**, deep **SEO optimization**, and 1-click **GitHub Pages** deployment.

---

## ✨ Features

- ✏️ **Excalifont Typography Engine**: Uses the official Excalidraw handwritten font (`Virgil` & `Excalifont`) bundled locally (`.woff2`) for zero latency and zero external network dependencies.
- 🎛️ **Live Typography Switcher**: Seamlessly switch between **Excalifont** (Default), **Inter Sans**, **Newsreader Serif**, and **JetBrains Mono** with instant cascading across all contents.
- 🗃️ **Obsidian Vault Layout**:
  - **Left Sidebar**: Vault Explorer with folder hierarchy (`01-Reflections`, `02-Systems-Architecture`, `03-Retrospectives`, `04-Mental-Models`), tag cloud, and filter search.
  - **Center Pane**: Obsidian reading document with status pills (`🌱 Seedling`, `🌿 Growing`, `🌲 Evergreen`), breadcrumbs, reading time, and previous/next navigation.
  - **Right Sidebar**: Interactive table of contents (Outline) with real-time scrollspy and **Linked Mentions / Backlinks**.
- 💡 **Native Obsidian Callouts / Admonitions**:
  - `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!DANGER]`, `[!BUG]`, `[!INFO]`, `[!SUMMARY]`, `[!QUOTE]`, `[!QUESTION]`
  - Distinct colors, signature icons, and custom title support.
- 🔗 **Wikilinks**: Support for `[[Note Title]]` or `[[Note Title|Custom Label]]` internal links.
- 🔍 **Quick Switcher (`⌘K` / `Ctrl+K`)**: Instant fuzzy search modal across all notes, tags, and summaries with keyboard navigation (`↑`, `↓`, `↵`, `Esc`).
- 🌓 **Themes**: Obsidian Dark Slate (Default) and Obsidian Light Paper with persistent preference.
- 🚀 **SEO & Syndication Suite**:
  - OpenGraph & Twitter Cards.
  - `TechArticle` / `BlogPosting` JSON-LD structured data.
  - Automated `sitemap-index.xml` and `robots.txt`.
  - RSS 2.0 Feed at `/rss.xml`.
- 🚢 **Deploy Anywhere**: Pre-configured for GitHub Pages with automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

---

## 📁 Project Structure

```text
excaliblog/
├── public/
│   ├── fonts/
│   │   ├── Virgil/            <-- Virgil-Regular.woff2 (Excalidraw font)
│   │   └── Excalifont/        <-- Excalifont glyph subsets
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro       <-- Top bar, font switcher, theme toggle
│   │   ├── SidebarLeft.astro  <-- Vault explorer, folders, tags
│   │   ├── SidebarRight.astro <-- Table of contents & backlinks
│   │   ├── QuickSwitcher.astro<-- Ctrl+K search modal
│   │   └── SEOHead.astro      <-- OpenGraph & JSON-LD metadata
│   ├── content/
│   │   └── posts/             <-- Your Markdown technical reports!
│   │       ├── the-cost-of-premature-abstractions.md
│   │       ├── rethinking-distributed-state.md
│   │       ├── postmortem-the-ghost-in-the-event-loop.md
│   │       └── visual-thinking-and-codebases.md
│   ├── layouts/
│   │   └── ObsidianLayout.astro
│   ├── pages/
│   │   ├── index.astro        <-- Digital garden overview & notes list
│   │   ├── posts/[...id].astro<-- Individual technical report pages
│   │   ├── tags/[tag].astro   <-- Tag archive pages
│   │   └── rss.xml.ts         <-- RSS feed generator
│   └── styles/
│       └── global.css         <-- Design tokens, themes, callouts
├── .github/
│   └── workflows/
│       └── deploy.yml         <-- 1-click GitHub Pages deployment
├── astro.config.mjs
└── package.json
```

---

## ✍️ How to Write a New Technical Reflection

Simply create a `.md` file inside `src/content/posts/` (you can also organize them inside folders or open this folder in Obsidian):

```markdown
---
title: "Your Reflection Title"
description: "A 1-2 sentence reflective summary for SEO and feed preview."
pubDate: "2026-10-01"
tags: ["architecture", "systems", "reflections"]
category: "01-Reflections"
status: "growing" # "seedling" | "growing" | "evergreen" | "retrospective"
author: "Your Name"
---

Your reflection content here...

> [!NOTE] Insight Title
> This callout will render automatically with Obsidian styling!

> [!TIP] Pro Tip
> Use Wikilinks to link between thoughts: [[the-cost-of-premature-abstractions]]

```typescript
// Code blocks are automatically syntax-highlighted!
const value = calculateConsensus();
```
```

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Build static production bundle (outputs to dist/)
npm run build

# 4. Preview the built static site
npx astro preview
```

---

## 🚀 Deploying to GitHub Pages

### Method 1: Automated with GitHub Actions (Recommended)

1. Create a repository on GitHub (e.g. `excaliblog` or `username.github.io`).
2. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "feat: initial reflective technical blog"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically run `.github/workflows/deploy.yml` and publish your blog.

> [!NOTE] Custom Base Path
> If your repo is named `my-blog` (hosted at `username.github.io/my-blog/`), in `astro.config.mjs` set:
> ```js
> site: 'https://<your-username>.github.io',
> base: '/my-blog',
> ```

---

## 🎨 Changing Themes & Fonts

- **Font Toggle**: Click the ✏️ icon in the header to switch between Excalifont, Inter, Newsreader, and JetBrains Mono.
- **Theme Toggle**: Click the 🌙 / ☀️ icon to toggle between Obsidian Slate Dark and Paper Light. Your preference is automatically remembered in `localStorage`.
