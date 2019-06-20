+++
draft = false
date = 2018-08-22T01:16:23+01:00
title = "How to Implement a Custom 404 Not Found Error Page with React Router"
slug = "how-to-implement-a-custom-404-not-found-error-page-with-react-router"
description = "While navigating websites, a 404 error occurs when you try to reach a page that does not exist. When working with websites with dynamic routes like with React, you can end up with a page that’s not properly rendered or a complete error page that isn’t very friendly."
tags = ["React", "JavaScript"]
categories = []
+++


While navigating websites, a 404 error occurs when you try to reach a page that does not exist. Sometimes for static websites, it shows the default server’s (Apache, Nginx etc) simple “URL not found” pages. When working with websites with dynamic routes like with React, you can end up with a page that’s not properly rendered or a complete error page that isn’t very friendly.

![404 page](https://res.cloudinary.com/acekyd/image/upload/v1534896949/404-page_ipop2d.png)

To improve this user experience, it is recommended that you have custom error pages to not only capture these missing pages when they happen but also help navigate the user to either the home page or a working page.

In this article, we will be going over how to create a custom 404 error page in React via components and React Router.

## Setting up React Router

In `app.js` or anywhere else you have your routes set up, create a wild card path with an asterisk(‘*’) and add it as the very last path.

```jsx
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorNotFound from './ErrorNotFound.js';

---

<BrowserRouter>
    <Switch>
        <Route path='/' component={Home}/>

        ----

        /* add 404 page */
        <Route path="*" component={ErrorNotFound} />
    </Switch>
</BrowserRouter>

```



Using `<Switch>`, only the first child `<Route>` that matches the current route would be selected. This is why the wild card is placed at the last position to render ONLY when no other route matches.

## Creating the Not Found page

This is the fun part as you can customize this any way you like using CSS. There have been many creative uses of the Not found page that you can find even through a google search for inspiration. For now we’d go with a very basic `ErrorNotFound` page.

Create a new component in your components folder and name it `ErrorNotFound.js` as imported above in your app.js

```jsx
import React, { Component } from 'react';

export default class ErrorNotFound extends Component {

    render() {
        return (
            <div id='error'>
                <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
                <p className="notFoundDesc">
                        It looks like nothing was found at this location.
                        Maybe try one of the links in the menu or press back to go to the previous page.
                </p>
            </div>
        );
    }
}
```

This file contains the content to be shown to the user whenever a route that isn’t catered for is accessed. It can be styled any way to match the theme of the site or provide appropriate information to the user.

Now if the user accesses a route that isn’t defined, the app renders the ErrorNotFound component and you have your error page.