---
title: Understanding Decentralized Identifiers for 10-year-olds
date: 2024-03-28
published: true
tags: ['Web', 'Web5']
canonical_url: true
description: "Decentralized Identifiers are a pillar of Web5 but are a new concept for many. In this article, I take a stab at explaining it like I would to a ten-year-old."
---

A few months ago, I started looking into decentralization on the web and how this could impact our world as we know it today - thanks to Web5 and our work at TBD. One of the biggest and most important pillars in achieving this decentralized future is called [Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/).

I set out to learn more about DIDs and as a result, did a small experiment on Twitter. I wanted people to ask me questions about DIDs, believing that the process of finding and providing answers would help reinforce my understanding of the subject. I did get a lot of interesting questions but one stood out for me - “How would you explain decentralized identifiers to a 10-year-old?” So let’s give it a shot.

<!-- ![Tweet asking Ace to explain decentralized identifiers](../images/dids/did-tweet.png)
<sup>[Tweet](https://x.com/wemimoyela/status/1745755028130852985?s=20
) asking me to explain decentralized identifiers</sup> -->

:tweet{tweetId="1745755028130852985"}


## What is a Decentralized identifier?

To understand what a decentralized identifier is, let me start by asking you what your name is. My name is Adewale Abati. I’ve had this name for as long as I can remember. It’s what people know me as, what is written on my certificates, notebooks, etc. It’s how people identify me, you, and things.

Companies have names, schools have names, and objects have names that cannot be taken away from them. Let’s think of decentralized identifiers as your name. It is very rare to have someone have the same name as you, but with DIDs, it’s unique and belongs to you.

So, a [decentralized identifier](https://www.w3.org/TR/did-core/), is a string that uniquely identifies a person, organization, or object without having to rely on a central body.

![did-name.png](../images/dids/did-name.png)
<sup>Image (partly self-drawn 😭) illustrating how people introduce themselves with names but in this case, using a DID.</sup>


A few things to note about Decentralized Identifiers:

- A DID is unique. No two DIDs are the same. This means when someone sees a DID, they know exactly who it belongs to, just like how your teacher or parent knows who you are when they call your name.

![DID Structure](https://developer.tbd.website/assets/images/did-example-3cbace2fb7e64481dc63db9354c1b236.png)
<sup>Image showing the structure of a DID string.</sup>

- **A DID is yours to own forever.** Just like your name, once a DID is [created](https://developer.tbd.website/docs/web5/build/decentralized-identifiers/how-to-create-did) for you, it's yours and only yours, forever. You can use it to identify yourself anywhere.

- DIDs are safe and secure. If you have a bank account or information that you want to protect, only you with your DID can access or permit to access it. This helps keep your information safe.

## I know what you’re thinking - what if someone tries to use my name?

Like with your name, if you are trying to verify your identity, there are additional documents that only you can provide to validate that this is you. Examples of these are your birth certificates, international passports, etc. For DIDs, these are private keys.

These private keys are used when needed to show that you are who you say you are - and like birth certificates or passports, that are stored in folders - private keys can be stored in digital wallets.

## So Why Are DIDs Important

If you look at the internet today, the only way we have to identify ourselves is through services that belong to corporate bodies - email, social media handles, etc. All of this can be taken away or changed for whatever reason. DIDs however are different. They belong to you for as long as you want and they are universal.

They serve as the backbone of other pillars of the decentralized web. Decentralized web nodes are identified and accessed through DIDs, [verifiable credentials](https://verifiablecredentials.dev/) are issued to DIDs and also used to verify claims. Just like our names, the importance of DIDs is enormous.

I hope the ten-year-old in all of us now understands decentralized identifiers a little bit better - enough to develop an interest in how the decentralized future can become a reality for all of us. If you want to learn more, check:

- [The W3C spec on DIDs.](https://www.w3.org/TR/did-core/)
- [TBD Developer Website.](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers)