---
title: My year in AI
date: 2025-12-31
published: true
tags: ['AI', 'MCP', 'goose', 'Block']
canonical_url: true
description: "A reflective look at a year working with agentic AI in the real world — from MCPs and goose to real workflows, non-engineers, and team-scale software development."
cover_image: https://substackcdn.com/image/fetch/$s_!Jo06!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F762c2349-252e-47c0-bf96-20ce26ae41bc_4440x2932.jpeg
---

![Ace speaking at an AI summit](https://substackcdn.com/image/fetch/$s_!Jo06!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F762c2349-252e-47c0-bf96-20ce26ae41bc_4440x2932.jpeg)

Since I started my journey at Block in 2023 - everything I've had to work on has been future-facing. Technologies that were being developed to make a difference and forge new paths - the likes that tutorials don't exist for on the internet, and as a developer advocate, you are in a position to learn, direct and create those resources for people to consume and build amazing things, and help move the industry forward. That pattern — learning in public, without a map — is exactly what defined my year working in AI.

## codename goose

In late 2024, I switched to a new team, where we explored if the new AI boom could actually help make us better developers. Unlike many of the existing conversations at the time, it was never about replacing developers for us at Block, it was about innovating and moving faster with solutions that actually do the work.

[Bradley Axen](https://www.linkedin.com/in/bradleyaxen/) had started developing [goose](https://block.github.io/goose), an AI agent that used widgets at the time - Python scripts that had specific functionalities to plug into your workflow. My first assignment was exploring goose - the potentials, use cases and how we can help engineers maximize it.

## Introducing the Model Context Protocol (MCP)

Not long after, MCP (Model context protocol) came along. MCPs are a way to plug AI tooling into existing platforms and services, making many of the current software landscape functionalities to be accessible by tools of your choice. Your Slack, GitHub, JIRA, Figma etc, all accessible and controllable from your AI agent.

The Anthropic team, Brad and other engineers at Block had come together to start implementing this protocol into goose - moving away from the Python widgets and providing feedback to the MCP team. Opening up agents and setting the stage for what 2025 eventually became for agentic AI tooling when MCP was [announced November 25th](https://www.anthropic.com/news/model-context-protocol).

## 2025 - Agentic AI

January started off with a bang. There's a new goose on the block (:D) that had just been rewritten in Rust, and was being introduced to the public. This was an insane launch that went berserk when Jack Dorsey tweeted it.

:tweet{tweetId="1884305639985524944"}

My announcement blogpost was featured across the biggest tech publications and even had memecoins created around both goose and myself - if I get enough interests, I just might write about how that all went down 😀

:tweet{tweetId="1885056538341236737"}

## Internal Developer Relations

With goose launched as one of the earliest MCP clients, an AI agent that could serve as your personal assistant for all tasks either engineering or otherwise, I started to do more internal developer relations to make sure teams across Block itself were able to start benefiting from these tools.

I had spent the few weeks before this working with goose as a personal assistant - MCP servers were being built and I was learning how I could start plugging this AI agent into the different things I do - coding, documents, planning and brainstorming etc. It wasn't perfect, but the possibilities were very encouraging.

:youtube{id="_9t_N9zKwKM"}

## Are there non-engineering use-cases?

The next phase involved teaching non-technical teams how they can start using this tool. While engineers and vibe coders were early adopters, it still wasn't very ready for reliable use in the software development life cycle - but it was great for ideation, brainstorming and prototyping - and this is what we pushed to the non-engineers.

> The challenges that stood out were simple - what reliable tools were available, are they user-friendly, and shifting mindset and concerns about AI from replacing people to assisting them.

I traveled around hosting both virtual and physical sessions with different teams, learning what their frequent, repetitive tasks were and proposing solutions and strategies for them to start taking advantage of this early tool.

It was important to first of all correct the mindsets - AI isn't here to replace you, but to be used as a tool to make your work better or even faster.

And it was a hit. I spent the next few months, from February to June working with teams across content design, executive assistants, product management, account management and many non-engineering teams. My favourite part of this process was seeing the excitement on the faces of colleagues that just saved hours and stress by using goose to speed up a real-life workflow they go through every other day.

Non-engineers had the most creative uses of agentic AI I got to see all year. For them it wasn't just about the technical specifications, it was bigger than code. People used the memory to create different personalities in their agents, custom experiences shaped by well written system instructions that bring in all the experiences from their different fields of specialty. I learnt a lot in the process of teaching them this technology.

### Learnings from this

The uses and applications we found already validated these AI tools, especially autonomous agents like goose. However, the need for ways to connect AI tools to different platforms became a bigger necessity. How do you handle context and reduce hallucination across sessions? How safe are MCP servers to Gmail, your calendar or any other sensitive platform? This led to Block developing many in-house MCP servers that prioritised secure connections through OAuth where possible.

I spoke at a few conferences like Render Atlanta and the Open Source in Finance Forum to primarily direct people's mindset into how AI tools can actually be useful for them across all business needs.

## Vibe Coding to Vibe Engineering

As more non-engineering teams adopted these tools in their early days - the need for engineers to move almost at similar pace was apparent. It's much easier for individual engineers to build small features here and there with these tools, the question is how do large engineering teams maximise these tools in a way that ensures they move fast and still produce quality, non-slop, and secure code.

A lot of improvements have come through not only with MCP spec, agents but even models themselves - increased context limits, improved thinking, and overall ability to generate meaningful code. But building solutions in a large team goes beyond just the code you write.

![Vibe coding to vibe engineering](https://substackcdn.com/image/fetch/$s_!-MNG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F48fe5a10-b7c9-4dbd-b3d0-8b43a25eb8ae_4284x3133.jpeg)

### AI-Powered Software Development Lifecycle

This was my team's focus for H2. We needed to first of all establish what tools were available for collaborative and productive development across engineering teams. How do we optimize feature development, code review and incident monitoring, the full software development lifecycle (SDLC).

These are conversations that we aren't having enough of in the ecosystem. Everyone is talking about the vibe coded tools, the demos, the one-shot AI businesses etc. but less about how it fits into established processes at companies. I built many internal tools and standalone projects all with the assistance of an AI agent, but it's a different ball game when you need to scale this to teams.

> **It starts with the repositories.**

For a collaborative engineering team where engineers could have their individual preferences, the project repository is the central hub that houses everything that engineers must adhere to. And to enable teams, we quickly discovered we needed to enable the repositories to start to lean towards AI.

This makes what GitHub is doing with [Agent HQ](https://github.blog/news-insights/company-news/welcome-home-agents/) possibly a gamechanger for the future as everyone adopts more custom agents. We approached this by implementing tools like ai-rules, [goose recipes](https://block.github.io/goose/docs/guides/recipes/), [Claude commands](https://code.claude.com/docs/en/slash-commands), [agents.md](https://agents.md/) and [howToAI.md](http://howToAI.md) files within repositories. Resources that AI agents could read to instantly understand the codebase, taking the first step towards reducing hallucinations and sloppy code. These resources were all determined by leads and project owners as every repo had their own needs.

### The Code Review Bottleneck

As engineers get more comfortable writing better code with AI, reviewing this code before merging into production has presented itself as a huge bottleneck.

:tweet{tweetId="2004972521087541463"}

Graphite, GitHub co-pilot, CodeRabbit etc are examples of tools looking to tackle this but there's still a lot of room for improvement.

### Wrapping up the year

I got the opportunity to attend multiple MCP Dev Summits in the US and across Europe - presenting the opportunity for me to speak and learn from folks that are just as knee-deep in all of this.

![At an MCP Dev Summit](https://substackcdn.com/image/fetch/$s_!6T3z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4283d201-4f21-4b04-afd1-3dc6e1046c65_851x851.jpeg)

There is amazing work being done, and insane progress made this year with agentic AI. Many skeptics still remain, AI fatigue is real in some circles, and those who refuse to let AI anywhere near their code exist as well. But the world is changing, this is happening and we all play a part in shaping it into what best serves us all.

AI continues to remain a tool.
