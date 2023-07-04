---
title: What is the boring JavaScript Stack - Sails Boring Stack
date: 2023-07-02
published: true
tags: ['Developer Tools', 'Web']
canonical_url: true
description: "Heard a lot about the boring JavaScript without knowing what it is? Here's my dive into understanding what it entails and how to start using it."
---

## What is the Boring Stack?

The web development industry is one that moves pretty fast. Every other week there's a new framework and every other day there's a new terminology or concept you need to get familiar with. More often than not, there are official terms for tools and practices that you may already use without realizing it. 

Most recently, I started seeing an increased mention of the Boring JavaScript Stack on my Twitter timeline. Curious to what it was, I bookmarked and promised to get back to it. My first impression was that it was most likely a combination of specific technologies, like the Jamstack, MEAN stack etc that we'd have seen before. 

This terminology isn't new however. You can find mentions of the [Boring Stack](https://hackernoon.com/the-boring-stack-the-best-way-to-build-interesting-things-9f54420f683e) as far back as 2016. This Hackernoon article defined the Boring stack as: 

> It’s whatever stack you already know so long as that stack is capable of completing the interesting thing that you want to build.

What this means is that if the primary goal of building a project is the end result, or to confirm that you are able to build it, then you are better of using technologies you already know - The Boring Stack.

> If you want to ship great products, learning new languages and frameworks is not the way to go. You need to find your Boring Stack.

## So What is the Boring JavaScript Stack

The answer here should be simple - especially if you've read the above. The Boring JavaScript stack for you should be a set of JavaScript tools that would help you focus on shipping that product as quickly as possible. Tools you are already familiar with - leaving you focused on the important part, your project.

That would be my default answer. However the purpose of this article was to explore the [Sails Framework Boring JavaScript Stack](https://github.com/sailscastshq/boring-stack). 

I have never used Sails, so I'm probably going against the concept of the Boring Stack itself, but if you are unsettled about what tools could be your boring stack or if you've never shipped a fullstack JavaScript product on your own before, [Kelvin Omereshone](https://twitter.com/Dominus_Kelvin) and other contributors over at Sails have also set up an architecture that could be your boring stack and it is so aptly named - [Boring JavaScript Stack](https://github.com/sailscastshq/boring-stack).

## How does this stack work.

The Boring stack from Sails makes it easy to build a fullstack JavaScript application where you get to worry less about the architecture but more about your idea. It's currently built on:
* Sails - A MVC framework for Node
* InertiaJS
* One of Vue, React or Svelte with Tailwind.

## Why would anyone want to try this?
I think the obvious ideal scenario is if you already use sails. These are quick project starters that help you get right into the thick of things. Another scenario is when you currently don't have a set stack you are able to ship end to end products with. Then it's a good idea to pick a project like this one, get comfortable with and know you can always rely on it speeding up your development process.

The Sails boring stack promises stability, battle-tested architecture and technologies (listed above). You can try it out right away;

```bash
$ npx create-sails <project-name>
```

I'd like to know what other stack or tools you all use for end-to-end development of your side projects and products, so don't hesitate to share if you use something else in the comments.