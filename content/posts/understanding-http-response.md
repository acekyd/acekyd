---
title: Understanding HTTP response status codes in frontend applications
date: 2018-11-26
published: true
tags: ['javaScript', 'api']
canonical_url: https://pusher.com/tutorials/http-response-codes-part-2/
description: In this tutorial, we will explore what status code means and how to use them.
---

> This article was first published on [Pusher](https://pusher.com/tutorials/http-response-codes-part-2/)

In this tutorial, we will explore what status code means and how to use them. We will build a simple [Node.js](https://nodejs.org/) backend to simulate all the most common status codes of all we will cover. This will help us in two ways:

- Consuming APIs when building applications, especially JavaScript powered apps.
- Building RESTful APIs that provide as much accurate response as possible at all times.

HTTP status codes are the defacto language for describing results of the requests browsers (clients) make to servers. Browsers know what the status codes mean, so they know how to present information to you after you make a request.

When you think about it, it makes sense to have defined ways for the server to tell the browser the outcome of a request it made. There are different kinds of browser and different kinds of server configurations to suit specific application needs. If there was no standard communication pattern… anarchy!

## Prequisites

Basic knowledge of JavaScript
Have Node installed on your computer
Minimum version [Node v8.0.0](https://nodejs.org/en/blog/release/v8.0.0/)


## How the browser and server talk to each other

Before you ask “Really? This? Am I three years old?”, I’d urge you to pay attention here, especially if you have not had to build APIs before. Understanding how the browser talks to the server (client-server relationship) in a network will help you make sense of why each status code is important.

Servers are like a central location for data (say a restaurant) and clients are the computers that consistently interact with that data (say hungry customers). Different clients, something in thousands or hundreds of thousands, make requests to the server for data. The server does a number of things:

1. First identify what type of client by parsing the header of the request that tells the IP address of the computer, the type of web browser used, type of device used, the preferred language the client wants the data in, the format the data should be in, among other things.
This is why when you visit a site like [Google](https://google.com/) with a different language set on your browser, it returns the page in that language. This is how [Twitter](https://twitter.com/) or [Facebook](https://facebook.com/) is able to redirect you to [m.twitter.com](https://m.twitter.com/) or [m.facebook.com](https://m.facebook.com/) when you visit with a mobile phone.
2. Confirm you can access the content you are requesting (there are different authorization levels it can use, depending on the kind of content you are request ing).
3. Process the request.
4. Return the data to you.
The server has to do all of that in split seconds so it can respond to other users who are waiting.

The client on the other hand sends a request along with appropriate headers to properly identify who it is and how it wants to receive the information it has requested. If it is trying to request gated information, it has to present some form of access token/key or be able to show it has authorization to access the data it is requesting. The client is usually not very patient as it is pressed for time and resources. If it does not hear from the server after some time, it closes the connection (just like a hungry customer walks away when they have waited too long to be served).

However, when the server responds, it sends some code to inform the client of the status of its request. Was it successful? Should the client give it more time? Did it fail? Could it not understand the request? Did the client make a mistake in the request it sent? These are the things the server clarifies with status codes.

Of course, client server communication is a lot more complex than that, and there are different tools and protocols that come into play, but that is beyond the scope of this article. What we have looked at now is sufficient to understand the basic status codes we will encounter more frequently when we interact with public APIs.

>Clients are not just web browsers. Clients can be computer terminals that make [CURL](https://en.wikipedia.org/wiki/CURL) requests or web/mobile applications that interact with APIs to get data or even a device like a refrigerator or TV that is connected to the internet.


## The informational status codes — 1xx

What do they do? Short answer — provide information to the browser. They communicate that the request was received and understood, and in most cases, the browser should wait a little as the server processes the information.

### 100 Continue

When a client gets this status code, it means the server has received their request header and has accepted the request, so the client can go ahead and send the request body. This is most commonly used when a client wants to send content that is large. It will send an `Expect: 100`- continue to the server and when the server sends back a response with status `100 continue`, it proceeds to send the body.

The status `100 continue` received from the server means “You c an now send more data or ignore if you are done sending”. In some cases, a client might send `Expect: 100 - continue` along with the request body. This is most common with `curl` requests as it is the default mode `curl` communicates with servers.


## 101 Switching Protocols

A client can send a request to the server to switch the communication protocol using the `Upgrade header`. This can be say switching from `HTTP/1.1` to `HTTP/2` or switching to [WebSocket.](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) The server will response with a response code 101 and an Upgrade response header with information on the protocol it upgraded to.

>You can read more about protoc ol upgrade on [MDN Web Docs: Protocol upgrade mechanism.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism)


## The success status codes — 2xx

These are the status codes we encounter every single day. You load a website and it comes up? One of these status codes was used. You submit a form and get the congratulations message? One of these status codes was used. They are used to indicate that our request was successful

### 200 Ok

This response status code indicates that our request was successful. This is used mostly when we request for data from the server and it responds with the data. When you visit the link to a webpage, the browser sends a request to the server to give it the contents of that webpage.

The server will respond with a status `200 ok` and a header specifying the type of content returned `(text/html, multimedia, etc)` and a body containing the content itself.

>Many requests for data like visiting a URL are usually GET requests. `GET` requests are, well, used to get data from the server.


### 201 Created

This is the response code the client gets after sending resource (data) to the server. This resource is stored by the server and upon successfully storing it, the `201 Created` response code is returned with the newly created resource as the request body. It can be form submissions, file uploads or other related activities.

>Requests that create resources on the server are usually `POST` requests. `POST` requests post resources to the server. In a situation when a `PUT` request (which is used to update already stored resource) creates the a resource for the first time, a `201 Created` can be returned as well. 


### 202 Accepted

This is not a very common response code sent by servers. It is used in cases where a request by the client has been received but the server has sent it in for processing. It is a non-committal response in that when the server eventually comes around to process the request, it may or may not act upon it based on if the client has the right to make that request or if the server has the means to handle it. Also, it means the server will not be sending any response afterwards.

This can be used in cases when a request is transferred to another server or when a request is batched to be proceed at another time. In such a scenario, the server ought to return an indicator of the current status of the request and a way for the client to monitor the processing of the request.

### 203 Non-Authoritative Information

This is also not a very common response code. It signifies that the response the client is getting is not exactly as it was when sent by the server. It can mean that the response has been modified as it passed through a proxy tunnel or some other related third party.

The data eventually returned might be a subset or superset of the data returned from the server.

### 204 No Content

This response code tells the client (in the case of a user agent) not to change the current document presented to the user. Header information might be updated, but no new content will be sent along.

This response can be sent after a client makes a request updating a resources on the server and the server does not need to return any data since nothing new was created. The server must never return a response body when it sends a `204 - No Content` status code.

### 205 Reset Content

This response status tells the client to refresh the document sample.

### 206 Partial Content

This response code indicates that the request has succeeded and the response body has the requested ranges of data. The server only sends ranges of data when the client sets the `Range` header in it’s request. Bear in mind that the client must never request a range if it cannot handle the range.

If there is only one range, the `Content-Type` of the whole response is set to the type of the document, and a `Content-Range` is provided. If several ranges are sent back, the `Content-Type` is set to `multipart/byteranes` and each fragment cover one range, with `Content-Range` and `Content-Type` describing it.

When a range is requested by the client, the server returns `206 Parital Content` and never returns a `200 Ok`. Medias like large videos and images are good examples of data return as a range.


## Redirections — 3xx

You see these response codes, you need to know them very well if [Search Engine Optimization (SEO)](https://searchengineland.com/guide/what-is-seo) means anything to you and your product. These status codes deal with redirection when a client tries to access a resource.

### 300 Multiple Choices

This status code means the request has more than one possible response. The client is to choose one of them. There is no standardized way of choosing so this is rarely used. In case you see it, look for the Location header which usually contains the servers preferred choice.

### 301 Moved Permanently

This is arguably the most important of the redirection status codes. When not used properly, it can interfere with your SEO and bury your website forever. It can also created very bad user experience and increase the churn you experience on your website.

This tells the client that the resource they seek has been moved permanently, and then presents the URL to the new location of the resource. This does two things: tells the client where to find the resource and also helps the client know where to go the next time they need the resource. The new location for the resource is specified by the Location header.

>301 redirects might require the method (and the body) of the original required not to be altered when the redirection is performed. However, not all client side browsers adhere to this directive. According to [Mozilla Developer Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301), it is therefore recommended to use the `301` code only as a response for `GET` or `HEAD` methods and to use the `308` `Permanent Redirect` for `POST` methods instead, as the method change is explicitly prohibited with this status


### 302 Found

This is the direct sibling of `301` 😁. It is used for temporary redirect. Client browsers will redirect to the specified resource but indexing systems like search engines will not change their reference to the resource as the redirect is only temporary.
And like `301`, client browsers might change the body/method of the request, so when you want to temporarily redirect a `POST`, use `307` instead.


### 303 See Other

Well, we will call this the cousin to `301` and `302` 😂. Simply put, this status code tells the client that the redirect doesn’t link to the newly uploaded resources but to another page, like a thank you page or status monitor page. It is sent as a result of a `PUT` or `POST` request and the method to use for the redirections is always `GET`. I told you this was the cousin.

### 304 Not Modified

When you have previously fetched a cacheable content, this status code comes in handy. It tells the client that the resource they are trying to fetch has not changed, so they should retain the copy they have. This will come in handy if you are building a system like a newsfeed and you always want to check for new updates. It will prevent you fetching old data and reloading the client browser unnecessarily.
A nice option would be to use [Pusher’s](https://pusher.com/) realtime API.

### 307 Temporary Redirect

We have already talked about this earlier that it will be okay to skip it right? Well, this response code is sent by the server when it intends to explicitly tell the client to maintain the method originally used for the request. It works just like `302` except it adds a very clear directive not to change anything. Best thing to use in case you have stubborn clients who always change request methods on redirect 🙄.

### 308 Permanent Redirect

The 308 Permanent Redirect is the direct sibling of `307`. And it is the strict version of `301`.


## Client Error — 4xx

These are the status codes used to inform the client that it made a mistake in the request it made. Was a required field not supplied? Did they send the wrong data format? Are they not authorized to access the resource they are looking at? Do they need to confirm their identity? All of these things are handled by these status codes.

Now, let’s dig into them. 


## 400 Bad Request

I have to admit, this is my favorite status code 😂. Every time I get slammed with `400 Bad Request` red error on my console, I first look up and ask “What kind of life did I choose?” before I proceed to investigate it.

Bad requests occur when the client sends a request with either incomplete data, badly constructed data or invalid data. Many times, it could be the fault of the developer who did not specify properly what kind of data they expect. Be that as it may, it happens because the data you sent to a request is incorrect.

### 401 Unauthorized

This response in simple terms means the client needs to authenticate itself before it completes the request. Authentication here could be providing `access-token` in the case of `OAuth` or `Authorization` token in the case of `jwt` based auth system or even API keys.

Anything that the server needs to identify who is making a request has to be sent for the request to be completed.


### 403 Forbidden

This error occurs when a client tries to access a resource it is not permitted to. This is not the same as `401 Unauthorized` (just see them as fraternal twins 😃). An authenticated client can be `Forbidden` from accessing a resource just as an unauthenticated client can.

Many times, the client only gets `403 Forbidden` after it has been authenticated, as the system will have to ensure who the client is first before forbidding or granting them access to the resources.


### 404 Not Found

If you have used the web frequently, you will definitely have run into this, especially `404 Page Not Found`. In API terms, it means the resource you are trying to access was not found or the endpoint itself does not exist. A description of the error might accompany the error, but do not count on this in most cases.

`404` does not specify if the resource is missing or has been permanently removed (deleted). In a case where the resource has been removed permanently, the server should return `410 GONE`.


### 405 Method Not Allowed

This response code results when you try to access a resource designed for only `GET` requests through a `POST` request and vice versa. Some resources can be accessed via any request method (`GET`, `POST` or `HEAD`) and in such a case, you will not get the `405 Method Not Allowed` response code.

Standard practice is that when a server sends a `405` response code, it includes a list of methods supported for accessing the resource in question.


### 406 Not Acceptable

This is a rarely used error code. It indicates that the server cannot produce a response that matches the request the user made, and the server is not willing to send a default response. You can learn more about it on [Mozilla Developer Docs.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406)


### 407 Proxy Authentication Required

This will be the twin of `401 Unauthorized`. The only difference is that authentication needs to be done by a proxy.

### 408 Request Timeout

This response code is sent by the server when it wants to close an idle connection opened by the client. The client may not have completed its request and may be taking so much time doing it.

The standard is that a server will send a close `Connection` header in the response field along with the response code.

>In many cases, the server might shut down the connection without sending any response code. 


### 409 Conflict

This response is sent by the server when a request conflicts with the servers internal operations. A good example of such conflict is trying to update a resource on the server with an older version.

### 410 Gone

We already mentioned that this status code shows that the resource the client wishes to access has been permanently deleted.

### 411 Length Required

The server returns this status code if it requires that Content-Length header is set along with the request, and the client did not set it.

### 412 Precondition Failed

This happens when the client is being too demanding and the server does not have that kind of strength 🙄. So, clients can send conditional requests to servers, which is excellent. If the conditions are met, the server will response with data. If the conditions are not met, the server will just respond with `412 Precondition Failed.`

We will discuss more on conditional requests when we get to `428 Precondition Required.`

### 413 Payload Too Large

The request data is too big for the server to handle 😃. In more technical terms, the size of the payload may have exceeded the limit specified by the server.

### 414 URI Too Long

Just shorten the URL and all will be fine. Realistically, this only occurs when you have a lot of things appended to a URL when constructing a `GET` request with a lot of parameters.

### 415 Unsupported Media Type

This is what it is. The server does not support the media type requested by the client.

### 416 Range Not Satisfiable

The server can’t fulfill the `Range` specified in the request header. It could mean the `Range` is requesting more data than the server can give. Think `array index out of bounds` and you will get the picture.

### 417 Expectation Failed

When the server cannot meet the expectation contained in the `Expect` request header field, it sends this response.

### 418 I’m a teapot

I honestly do not know why this was ever made, but it is a response code for April Fool’s day prank. It means the server refuses to brew coffee because it is a tea pot 🤣. You can read more about this prank on [WikiPedia.](https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol)

### 419 Authentication Timeout

At the moment, this is only obtainable with [Laravel](https://laravel.com/) applications. It means the `csrf` token of the application has expired. The `csrf` token in Laravel is sent with every form submission or request to resources protected by authentication and more.

### 426 Upgrade Required

The server returns this response code when it is unwilling to communicate with the client via a certain protocol, but is willing to continue communication if they change protocols. Yep, I agree… These servers are just full of themselves.

The server sends an `Upgrade` header with this response to provide a list of protocols it is willing to use in continuing communication.

### 428 Precondition Required

This response is sent by the server when it requires a request to be conditional. A conditional request is a request where the result might change based on a validation of the resource requested. Conditional requests are useful in scenarios like downloads where a client can pause and resume at any time.

For such requests, a required precondition header like `If-Match` is required. If the precondition header does not match what the server has, then a `412 Precondition Failed` is sent instead.

### 429 Too Many Requests

This status code is sent when a user has sent too many requests than allowed in a given period of time. It is common with APIs that limit usage by time period.

### 431 Request Header Fields Too Large

The server is just unwilling to process the request because it feels the headers of the request are too large. That is all.

The client can reduce the headers and try the request again.

### 451 Unavailable For Legal Reasons

The resource the client has requested cannot be served for some legal reasons. Serving it to that user will mean breaking the law.

In practice, you will rarely encounter most of the error codes, but it is good you know them. They become more common with increasing complexity of the applications you build. 



## Error — 5xx

These errors occur due to no fault of the client. The servers are to be blamed here and there is nothing the client can do to get their desired response.

### 500 Internal Server Error

When the server processes the request of the client and runs into a situation it cannot handle, it sends `500 Internal Server Error`. These issues can be caused by many things. A service required by the server may not be available. The developer who build the application may have used a package or library and forgot to download it on the server. The developer might have buggy code and the server ran into it. It could be anything preventing the server from completing it’s operation.

### 501 Not Implemented

The server sends this code when you have made a request to it with a request method it does not know or have the capacity to resolve. Servers are required to implement only `GET` and `HEAD` methods, so you might send a `PUT` or `PATCH` request and the server will not be able to handle it.

This is not the same as `405 Method Not Allowed` because with `405` the server clearly understands the request but cannot respond to it until the method is changed. With `501` the server cannot understand the method used and is therefore incapable of providing any response.

### 502 Bad Gateway

The server sends this code when it is acting as a proxy server and/or fetching data from an external resource and it gets an invalid response from that external source.

###503 Service Unavailable

This is a common server error code that you can get. It means the server might be down and therefore, is not ready handle the request at that time. This might be a result of an ongoing maintenance or an overload on the server.

This is a temporal situation, so if you implement caching in your application, you might want to not cache this response.

### 504 Gateway Timeout

The direct sibling to `502` 😃. The server sends this response code when it is acting as a gateway and the external resource does not provide it with a response in time.

### 505 HTTP Version Not Supported

This status code indicates the HTTP version the client used for the request is not supported by the server. Think making a `HTTP/1.1` call to a server when the server only deals in `HTTP/2` 😎.

### 511 Network Authentication Required

This status code means the client needs to get authenticated on the network it is trying to access before access can be granted. This happens when trying to access a network via proxy, so it can be argued to be a distant cousin of `401 Unauthorized`.

Where there is a difference is that `401` tells the client directory it needs to be authenticated but `511` means the proxy network cannot access the external resource because of lack of proper authorization.

## Conclusion

If you followed this tutortial, then you my friend are more than ready to build very amazing web applications. A proper understanding of these status codes makes all the difference in the user experience of your application. Understanding them means you can efficiently design your application to handle errors or issues that may arise gracefully.

If you are a developer building an API, you can more easily send the appropriate responses for the scenarios your users encounter as they use your application. This is equally very important in building useful applications.

In the next tutorial, we will look it is consuming APIs and experiencing the status codes we have received.