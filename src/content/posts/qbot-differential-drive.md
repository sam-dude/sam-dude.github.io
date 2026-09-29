---
title: "QBot Differential Drive"
description: "Reflections on connecting to, controlling, and computing forward and inverse kinematics on the physical QBot platform versus simulations."
pubDate: "2026-09-29"
category: "My Days at Robotics Lab"
status: "evergreen"
tags: ["robotics", "differential-drive", "kinematics", "hardware", "qbot"]
author: "Lab Researcher"
---

QBot was entirely different platform, so distinct from the usual Differential Drives I was familiar with in simulation engine like Webots. There is a sequential process to connecting to and controlling QBot. For connection, we use the WINSCP and PUTTY to connect bot. We do remote code execution using PUTTY. Controlling via manual drive (with Joy Stick) and custom codes.

## Connect to QBot Hardware

First thing is to ensure that the battery are fully charged. SOmetimes it could take hours for the battery to be properly synced (or something like that)

Then we connect the Joystick.

The Joystick is important for most of our custom control designs, since it serves also as a safety layer to disarm and easily discontinue any running program in case anything goes wrong. (This was not in most simulations I've done before)

Connection happens WINSCP (we manage file transfers here)
Then we SSH into PUTTY to run commands remotely on the QBot.

## Forward & Inverse Kinematics for QBot

Using the turn speed command to control the wheel. 
Did Tank drive.

Completed the inverse kinematic drive. We take body speed as input and output QBot wheel speed in rad/s.

## Running the codes

First, we ensure to have moved the necessary files to the QBot platform using WinSCP. This includes, the python folder, qbot platform driver, and other custom codes. The documetaion provides a nice guide. 

Run the observer from the local machine. Then using Putty, run the python code. 

The Bot should show a sequence of light to show connection. Then after it, you can arm the bot using "LB" on the joystick to perform actions.

# the end...
