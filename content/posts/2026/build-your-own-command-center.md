---
title: "Your working directory as an operating system"
date: 2026-07-31
published: false
description: "I got tired of opening five different files just to know where my work stood, so I built a local command center over my own files. Here is what it does, the one lesson that made it useful, and a starter template you can run today."
tags: ["Agents", "Productivity", "Building in Public"]
cover_image: /images/build-your-own-command-center/featured.png
---

![A JARVIS-style dashboard sitting on top of a personal working directory](/images/build-your-own-command-center/featured.png)

If you're like me and you use multiple agentic tools as needed - multiple subscriptions, then your session and memory is often locked inside these tools. A recent migration from ChatGPT to Claude had people figuring out how to export their context and memory from one tool to another. And this is something that would continue to happen as the different companies and their tools evolve.

Owning context and managing relevant memory is something that software engineers have technically figured out in a way. Every context and important instruction is concentrated in their project's repository - everything it needs to run.

Can we leverage this same approach to other types of work? Can we build out a personal system that keeps our context, ideas, instructions, workflows and projects that go along with us regardless of if we are using goose, codex, claude, hermes, openclaw or any other agentic tool? 

This is not a novel idea. The concept of a personal working directory has existed right from the introduction of the agentic harnesses - but they were mostly used as singl-purpose folders or tied to a specific goal e.g files to process. With this however, the idea is to have a single folder related to who you are, what you do, what you currently care about, that include agents, skills, and other tools that could serve as your operating system. This could be themed to include your businesses, job, hobbies and anything else.

As I worked on my web apps, I had other projects and important areas I wanted to leverage agentic AI for across tools - especially automating things around content creation. I use Claude, Codex, Goose and GitHub Copilot depending on which tokens I have left. Running agents as scheduled tasks that write files into the working directory, the context that defined the work stays with mw to be accessed as needed regardless of the tool I'm using.

## My working directory
This started small. A structure that recognized what it could grow into. So I had a `system` folder that contained my identity, a `workplace` folder that contained the output and  
So one weekend I built myself a command center. A local, JARVIS-style dashboard that sits on top of my working directory and surfaces only what matters. Boot sequence, an arc reactor humming in the middle, host vitals down the side, the whole thing. It looks like something out of a sci-fi film, but that is not the point. The point is that it reads my real files and tells me what changed and what needs me, without me opening a single one.

I made two short videos about it: one showing what it does, and a Lab Notes episode walking through the setup. This post pulls both together, adds the part that did not fit in a Reel, and points you at a starter template so you can build your own.

## What it actually does

The dashboard is a window, not a second source of truth. It never stores anything of its own. It parses the markdown and JSON I already keep, in place, and renders it. That distinction matters more than it sounds, and I will come back to it.

A few things it surfaces at a glance:

- The state of my content pipeline: what is planned, what is drafted, what is scheduled.
- Host vitals from the machine it runs on: CPU, memory, disk, the usual.
- How fresh each piece of data is, because stale numbers quietly lie to you.

Each data source is a module. A module is just a small folder with its own tiny router, registered in one line in the server. Adding a new one later means dropping in a folder and adding that line. No monolith, no rewrite. One server, one port, near zero dependencies, no database and no build step. `npm run dev` and it is up.

## The part I did not expect to be the hard part

Here is the twist. The first version told me everything. Every number, every file, every status. It looked incredible, and it was useless. I would stare at a beautiful wall of data and still not know what to do next.

The fix was not more. It was less. I gave the agent three honesty rules and made it obey them:

1. Show the age of every piece of data. "SYNCED 2D AGO." If it goes past a sensible threshold, turn amber and say STALE.
2. If a module fails, show OFFLINE in red. Never fake liveness.
3. Only surface a number if it changes a decision. If it is decoration, cut it.

The dashboard got quieter, and that is exactly when I started actually using it.

I think that is the whole game with agents right now. Anyone can get one to produce more. The skill nobody is flexing is teaching yours to produce less, but load-bearing. Restraint is the moat.

## Why start with a command center at all

Before the dashboard, there is the thing the dashboard sits on: a working directory. This is the idea I care about most, and it is the one the Lab Notes video opens with.

Whenever you use or switch across AI tools, your sessions and your context tend to stay locked inside them. Move to a new tool and you start from zero. A working directory flips that. It is a folder that carries your context, does the heavy lifting, and preserves the things that matter, so you can point any AI tool at it and keep going. The context follows you, not the tool.

Mine covers my content creation, my DevRel career, my side projects, and my learning curriculum, all in one place that comes with me everywhere.

Setting one up is not a big engineering task. It is a handful of files:

- **Identity.** Who you are and what you care about, so the agent stops guessing and hallucinating.
- **Direction.** What you are working toward and why, so it can actually help instead of drifting.
- **Current focus.** What matters right now, so it stays useful week after week.
- **Agents.** Small routines that handle repetitive work on a schedule.

A couple of files, five minutes, and you have a command center that everything else you build sits on top of. Once that core exists, you start connecting it to skills and connectors: your calendar, your email, the specific apps you live in. The important discipline is to only add these when you actually need them, so you do not end up with a bloated system that does everything and nothing well. When a new need shows up, you just tell your agent, in plain language, "I want to manage this in this way," and it updates the structure for you. Same as a normal conversation.

## Get the starter template

I put the whole thing into a starter template so you do not have to begin from a blank folder.

If you are not a developer, this is built for you. It is all markdown files you can open in any text editor. You do not have to touch a line of code. Download the folder, open Claude or Codex, select it as your project working directory, and start from the included starter prompt. There are instructions inside that help you shape it around your own work, whether you are a doctor, a project manager, a carpenter, or a creator. Different work, different needs, and the template walks you through deciding what belongs in yours.

If you are a developer, go wild. Fork it, throw it in version control, rewire the tools, make it whatever you need. I would still recommend starting small and only adding things as you need them.

The starter template lives here: [github.com/acekyd/command-center-starter](https://github.com/acekyd/command-center-starter)

The dashboard I described is a separate layer that sits on top of this, and the template includes instructions to help you set that up too, based on your own directory. But start with the core. Get the working directory right first. The fancy HUD is only worth building once there is something real underneath it worth looking at.

If you build one, I would genuinely love to see it. Tell me what you put on yours.
