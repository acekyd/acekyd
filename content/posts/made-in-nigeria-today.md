---
title: Celebrating Nigerian Open Source today
date: 2026-04-26
published: true
slug: made-in-nigeria-today
tags: ['open source', 'community']
description: A look at the evolution of Made in Nigeria, from a simple GitHub README to a structured, automated platform celebrating Nigerian open source projects.
---

Nigeria has one of the most active, talented and fast growing developer communities in the world. Every day, Nigerian engineers are shipping open source tools, libraries, and frameworks that are used by developers globally — tools that solve real problems, written with real craft.

[Made in Nigeria](https://github.com/acekyd/made-in-nigeria) was created to put a spotlight on exactly that. To showcase these creators not only to the world, but also to growing open source developers as an inspiration to start their journeys contributing to open source.  

## What was initially built

Made in Nigeria OSS started as a simple GitHub README — a curated list of open source projects. Contributors would open a pull request, add their project to the readme with markdown, and then we built a [website](https://madeinnigeria.dev) that would fetch and display the data in this README directly.

It worked. It grew. And then it started to show its limits.


## What we wanted to fix

The original approach had a fundamental problem: **once a project was added, it was incredibly difficult to keep track of it's status within the system**. 

There was no way to know which projects were still being actively maintained, which had been archived, and which had quietly gone unmaintained years ago. Status labels like "Inactive" existed but were entirely manual — someone had to notice a project was dead and submit a PR saying so.

To stay relevant, and keep up with the growth of projects being built, it was important to find a system that was simple to contribute to, but also automatically tracked the health of projects over time.

It was time to do better.

---

## What changed

### Projects now live in a structured data file

The source of truth is now `data/projects.json` — a clean JSON array where each entry has just the fields a contributor needs to provide:

```json
{
  "name": "Your Project",
  "repoUrl": "https://github.com/you/your-project",
  "description": "What it does, in one or two sentences.",
  "authors": [
    { "name": "@yourhandle", "link": "https://twitter.com/yourhandle" }
  ]
}
```

That's it. No formatting rules, no alphabetical sorting, no inline HTML — just the facts.

### Everything else is now automated.

Every week, a GitHub Action queries the GitHub API for every project in the list and records real data: star count, primary language, last push date, and whether the repo has been archived. It then computes a status for each project:

| Condition | Status |
|---|---|
| GitHub repo is archived | Archived |
| No push activity in over 2 years | Inactive |
| No push activity in 6–24 months | Stale |
| Recently active | Active |

This means the community no longer needs to manually track which projects are maintained. The data updates itself - all of which is now surfaced properly on the project cards.

### The projects page is now fully filterable

Finding the right project no longer means scrolling through the whole list. The projects page ships with:

- **Filter by status** — browse only actively maintained projects, or surface everything that's been archived or deprecated
- **Filter by language** — find every project built in Go, TypeScript, Python, or whatever stack you care about
- **A–Z filter** — jump to projects by first letter
- **Sort by most stars** — the default view, so the most widely adopted projects lead
- **Search** — find any project by name, description, or author

All filters combine, and the list updates as you interact with it.

### Featured projects on the homepage rotate on every visit

The homepage highlights six featured projects drawn at random from the actively maintained list on each page load. Every visit surfaces something different — no single project gets permanently pinned above the rest.

### Contributing is simpler than ever

The README used to be the entry point for contributions. That meant following formatting conventions, finding the right alphabetical position, and writing inline HTML for status labels.

Now, a contribution is just one JSON object added anywhere in the array. The README regenerates automatically. Validation runs on every pull request to catch missing fields or duplicate entries before they ever reach the list.

---

## Why this matters

The Made in Nigeria list currently tracks 260 open source projects. Dozens of them have thousands of stars. Several are used by developers across the world who may not even know they were built in Lagos, Abuja, Ibadan, or Port Harcourt. Many of them have inspired other software developers to contribute or build their own projects.

That's the story worth telling — and telling well.

Our goal with this update while it makes the site more accurate, is to make it a place where Nigerian developers are genuinely celebrated: their work visible, their impact measurable, and their craft recognised.

So this is a call out to everyone building and in the community, to contribute, share, and celebrate the incredible open source work being done in Nigeria. The list is only as good as the projects it includes — so if you know of something missing, add it. If you see something that needs updating, update it.

Open source lives on regardless of what it may look like with the ecosystem today. 


Check out amazing contributors that have sustained this project over the years - [https://www.madeinnigeria.dev/about](https://www.madeinnigeria.dev/about)

---

## Add your project

If you've built an open source tool, library, framework, or app and you're Nigerian — we want it on the list.

Head to the [GitHub repository](https://github.com/acekyd/made-in-nigeria), open `data/projects.json`, add your entry, and open a pull request. If your project has at least 20 stars and is useful beyond Nigeria's borders, it qualifies.

It takes five minutes. And it means your work joins a list that developers around the world use to discover Nigerian-built software.


**Made in Nigeria. Celebrated globally.**
