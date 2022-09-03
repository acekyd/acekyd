---
title: Understanding the basics of RESTful APIs
date: 2018-09-16
published: true
tags: ['PHP', 'node.js']
canonical_url: https://pusher.com/tutorials/understanding-rest-api/
description: For this tutorial, we will explore the basics of APIs, what we can use them for, how to design them and various ways we can protect them.
---

> This article was first published on [Pusher](https://pusher.com/tutorials/understanding-rest-api/).

Application programming interfaces (APIs) provide the platform and medium for applications to talk to and understand each other. APIs specify the way information passed across platforms is structured so that applications can exchange data and information.
  
REST is an API architecture style. It stands for representational state transfer. REST specifies how data is presented to a client in a format that is convenient for the client. Data exchanges happen either in JSON or XML format. However, many APIs today return JSON data, so we will focus on that in this guide.
  
For this tutorial, we will explore the basics of APIs, what we can use them for, how to design them and various ways we can protect them. We will also look at situations where we may not need to design an API of our own and where we can use a service like Pusher to provide data.
  
## Prerequisites
  
Basic knowledge of application development in any server-side language like [Node.js](https://nodejs.org/) or [PHP](https://nodejs.org/)
  Optional requirements
  
You have read the article series on [Understanding HTTP response codes in frontend applications.](https://pusher.com/tutorials/http-response-codes-part-1)
  
## Understanding how data is exchanged over the web


For simplicity, we will keep this section to the basics. Enough to give a clear idea of how data is exchanged over the internet through the [Internet protocol suite](https://en.wikipedia.org/wiki/Internet_protocol_suite), commonly known by the nickname “TCP/IP”. This is a suite of communication protocols that describes how the vast number of computers connected to the internet interact. It is named after the two most important protocols or layers within it (Transmission control protocol and Internet protocol).
  
TCP/IP provides end-to-end communications that specify how data is exchanged over the internet, how data is broken into packets, how the packets are encoded, addressed, routed and received at the destination. Think of it like this giant mail company that has the ability to deliver your packages anywhere in the world incredibly fast. TCP/IP will specify the rules for preparing each of the packages so they get to the right person without a mix up. It is also cooler in that there are public packages available to everyone and you can request a copy sent to you.
  
TCP/IP uses the standard client-server communication model, where a client (computer device) requests a resource from a server (possibly a much larger computer device in a remote location). Collectively the TCP/IP suite of conventions is classified as stateless (though TCP is itself stateful) — every request from a client to a server is treated as new, the server never remembers a client. This frees up resources on the server to make it faster and respond to multiple requests quicker.
  
> You can read more about TCP/IP in [this article](https://www.techtarget.com/searchnetworking/definition/TCP-IP) by Search Target.
  
  
## Understanding how APIs enable applications talk to each other
  
You must be wondering “Okay, that was cool, but how does it relate to anything?”. APIs are like the TCP/IP suite for applications. It specifies how applications interact and exchange data between each other. RESTful APIs are stateless. All requests using the API have to contain as much information as possible for the server to identify the client.
  
The API specifies a set of rules for one application to interact with another. Many APIs have proper documentation that also describes the nature and structure of the response they send when you make a request. They also specify the necessary information a requesting application needs to provide to make a successful request to the API.
  
In effect, RESTful APIs function just about the same way standard TCP/IP requests function, except there are no clients and servers here, but just two applications talking to each other.
  
## Brief about different API patterns
  
There are a number of patterns for designing APIs. These patterns have history, different requirements and create different experiences for users. These designs are somehow interconnected with each other, so we will see many places where they are very similar. Understanding them will help you in making a decision of which to use to address your specific issues.
  
### Tunneling style
  
Tunneling works like a system of remote procedure calls (RPCs) organized in an XML message format. RPC in itself is a really old technology that is best suited for communicating commands and procedures. It is used currently in platforms like [Ethereum](https://www.ethereum.org/) and has native support in [Golang.](https://golang.org/pkg/net/rpc/) Tunneling is used by SOAP in some instances, but we will not look into that.
  
### SOAP - Simple object access protocol
  
SOAP can be argued to be a communication protocol rather than an API architecture/pattern because it defines its set of communication rules and security protocols and all of that. SOAP APIs carry more overhead than their counterparts, but they come with their own benefits. For one, they provide more security when designing large scale enterprise applications.
  
Many of the reasons to pick SOAP include features around security, transactions, and ACID (atomicity, consistency, isolation, durability) compliance, all of which rarely apply to web services scenarios, hence its stronger appeal to enterprise scale applications.
  
### REST
  
REST is truly a “web services” API putting it on the opposite side of SOAP (probably why you will see a dozen comparisons on them without looking too much). REST APIs are based on URIs (uniform resource identifier) and the HTTP protocol. REST APIs can exchange data in either JSON or XML format, although many REST APIs send data as JSON.
  
When building a system with minimal security considerations but strong speed requirements, REST is an excellent choice. RESTful APIs have fewer security requirements, boost browser client compatibility, discoverability, data health, and scalability—things that really apply to web services.
  
## RESTful APIs — design considerations
  
We had defined and used a few simple RESTful API endpoints in the previous article on [Understanding HTTP response codes in frontend applications - Part 2.](https://pusher.com/tutorials/http-response-codes-part-2) Please read the article before continuing with the rest of this article.
  
Designing APIs are an entirely different thing. There are best practices to consider to ensure your APIs are easy for anyone to consume. Let’s list of five of them below:
  
### Use plural nouns and not verbs
  
As an example, imagine you want a service for stock control of fruits. Here is a simple chart of basic REST APIs you can make for your fruit application
  
  | Resource	| GET read	| POST create | PUT update | DELETE |
  | ---- | ---- | ---- | ---- | ---- |
  | /fruits	| Returns a list of fruits possibly all the fruits you have | Create a new fruit | Bulk update of fruits (you may never have to do this) | Delete all fruits (you should probably not implement this)
  | /fruits/1004 |	Returns a specific fruit | Method not allowed (405) | Updates a specific fruit| Deletes a specific fruit |
  
  
It’s not good practice to have API endpoints like `/getFruits` or `/delete-fruits` or `/createfruits`. Instead, take advantage of HTTP verbs for the definitions. This means I can easily build upon your APIs and have fewer resources to manage. This approach is less ambiguous and cleaner.
  
  >Try not to mix singular and plural nouns. Use plural nouns since you typically fetch resources by their IDs. There are situations where singular nouns work, but they should be use sparingly.
    
    
## GET method and its query parameters should not alter the state
  
Avoid designing endpoints like this
  
```

  GET /fruits/1004?avaliable=false
  GET /fruits/1004/has-finished 

```
  
with the intention of those endpoints setting the availability of the fruits. I know when you read it, it sounds intuitive, but it is very bad for your application. If a search engine’s bot or any web crawler ever gets hold of that URL …
  
  If you must alter state, use POST, PUT or DELETE like our table above.
  
  > You can read [Well Intentioned Destruction](http://thedailywtf.com/articles/WellIntentioned-Destruction) — a real life example of when this happened.
  
  
## Use sub-resources for relations
  
Say you are designing a social network where users have blogs, you should establish relationships like this:
  
```
  GET /users/1004/blogs

```
This should fetch all the user’s blogs. If you want to fetch a specific blog, you can do the following:
  
```

  GET /users/1004/blogs/1010

```
      
## Handle errors with HTTP status codes

We did a full guide on HTTP status codes explaining their use cases. You need to understand that it is hard to work with an API that ignores error handling. Returning the wrong status codes, or returning a stack trace without a helpful message highlighting the error does not help the user of the API. It does not matter if you have documentation or not.

## Provide pagination, sorting and filtering

This is a no brainer. Your application will likely have a huge repository of information. I do not want to call your endpoints to get all fruits and have 100,000 fruits sent to me at the same time. You do not want to do that even. The overload on your server will be crazy and you will burn up your resources rapidly.

Also, I want a way to select only fruits that say fall into the citrus family or fruits that are found in a specific country. I also want to sort them either alphabetically or by some other sorting method you have. These are the little things that will improve how I use your API.

## Basics about API security

I know I had mentioned earlier that RESTful APIs have few security considerations, but that does not mean we should ignore security completely. We will approach API security from two perspectives: authentication and authorization.

## Authentication

This has to do with verifying the identity of the person trying to access your API. This can be done through multiple ways. At the simplest form, this is providing a username/email and password combination. For APIs, it will most likely involve using a security token which will identify a user. More complex scenarios will have key/secret pairs often used to integrate one application into another.
  
## Authorization
  
This answers the question of “What can you do”, indicating it comes after authentication. Authorization comes in handy when you are designing endpoints for accessing data that is either very specific to a particular person or sensitive information only a predefined set of people can access.
  
> The Pusher blog has a lot of articles on authentication/authorization for APIs, so please check those out.


## When to use a service like Pusher instead
  
Pusher provides hosted APIs for building quick, secure realtime applications. This includes but is not limited to applications for communication and collaboration.
  
Whenever you have to build applications that require realtime results, rather than build API endpoints users have to poll every minute or few minutes to get the latest data/information, use Pusher. Pusher provides channels that are equipped with a subscribe/broadcast feature that will allow your users get subscribed to receive data on a particular channel while your server broadcasts data on that channel.
  
If I want to build analytics into my public forum to allow users see the interactions their posts are getting from a dashboard, I will use Pusher to make realtime updates to the data they see. Imagine how amazing it will be seeing the comments on your blog as they happen in realtime. Imagine the massive improvement it will make to your application.
  
Building an API on your server for that will require polling the server periodically to get that data. This can work assuming we are not worried about server resources, but it still does not happen in realtime. It happens on scheduled time, which won’t serve completely.
  
## Conclusion
  
  In this tutorial, we looked at RESTful APIs and a few things to consider when designing them. We looked briefly through the different API patterns so you can see if there is something different that might solve the problem you seek.
  
  While this is not a definitive guide to building RESTful APIs, you now have knowledge of them and can get started building APIs that so many people can use.
  
  
  