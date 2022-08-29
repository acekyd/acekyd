---
title: The best webpack configurations for React applications
date: 2021-08-15
published: true
tags: ['webpack','react', 'babel']
canonical_url: true
description: 
cover_image: https://blog.logrocket.com/wp-content/uploads/2019/01/webpack-configurations-react-app-1.png
---

If you’re like me, then you’ve struggled with configuring `Webpack` for your React app. Create React App (CRA) ships with webpack already under the hood, but usually, we would need to add more configurations as our app grows. Luckily for us, we can create a `webpack.config.js` file and put our webpack configurations   in there.

In this article, we will cover:

- Generic configurations for our app
- Configurations specific to production and development only
- Bundling and minifying of scripts and stylesheets
- Optimizations such as code-splitting and lazy-loading


## Prerequisites for setting up webpack

To set up this configuration, we need:

- Basic knowledge of Javascript and ES6 to ES8 syntax
- Basic knowledge of React

*💡Code to be run in the terminal will be written like `$ npm install`*

## What is webpack?

Webpack is a widely used bundler for JavaScript applications, with great support and an excellent team maintaining it. Also, it’s quite easy to set up.

It ships with a few packages for us:

- webpack-cli: the command-line tool that gives us access to some webpack commands
- webpack-dev-server: a client-side server with the ability to reload live solely for development purposes
- html-webpack-plugin: this will generate and update the HTML templates for our application
- HMR-plugin: a plugin to enable the hot module reloading of our application

And so much more. Webpack has many plugins that simplify our development process. We’ll use more of these webpack plugins as we progress.

## What is Babel?

The current version of React uses ES6 to ES8 syntax. We need `Babel` to compile the code written in those syntaxes back to code that older browsers can understand. Babel is there to ensure backward compatibility. Awesome, right? We can write our code in the newer cleaner syntaxes and have Babel worry about the rest.

First, we have to set up our app and install a couple of dev dependencies.

## Setting up Babel

To start, run the following command in your terminal:

```bash
$ create-react-app webpack-configs
$ cd webpack-configs
```

If you don’t have CRA installed, no worries! It ships with Node.js now, so go ahead and run the following command to set up the app:

```bash
$ npx create-react-app webpack-configs
$ cd webpack-configs

```

Now, start up the application:

```bash 
$ npm run start
```

Now open your app directory in your favorite text editor and delete the CSS and SVG files in the `src` directory. Likewise, open `src/App.js` and delete everything in it — we want it empty for now. Go into the `src/index.js` and delete the imports of CSS and SVG files.

```jsx

// src/App.js
// Empty file
// src/index.js
 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
```

*devDependencies are dependencies for development ONLY! So, everything we are going to install next will be as a devDependency.*

## Installing webpack and Babel

To set up webpack and Babel, we first need to install them and some of the plugins they require for initial setup. Run the following command in your terminal:

```bash
$ npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin @babel/core @babel/preset-env babel-loader @babel/preset-react babel-plugin-transform-class-properties babel-plugin-transform-es2015-modules-commonjs
```

Once that is done, open your `package.json` file and add the following to your scripts:

```jsx
// package.json
...
  "scripts": {
    ...
    "webpack": "webpack ",
    "webpack-dev-server": "webpack-dev-server",
    "dev": "npm run webpack-dev-server -- --env mode=development",
    "prod": "npm run webpack -- --env mode=production"

}
```

Now save it, go back to your terminal and we will try to test the newly added code.

Run:


- Don't miss a moment with The Replay, a curated newsletter from LogRocket
- Use React's useEffect to optimize your application's performance
- Switch between multiple versions of Node
- Learn how to animate your React app with AnimXYZ
- Explore Tauri, a new framework for building binaries
- Compare NestJS vs. Express.js
- Discover popular ORMs used in the TypeScript landscape

```bash
$ npm run dev
```
Our app breaks, but it’s not a bad error message. It’s just telling us what we did wrong

The script we added to our `package.json` is trying to run webpack configuration. But no environment mode has been set, so it breaks.

![npm run dev](https://blog.logrocket.com/wp-content/uploads/2019/01/versatile-webpack-configurations-babel-react-768x579.png)

webpack babel configuration broken
Let’s now write the configurations for `webpack.config.js` file and `our .babelrc` file.

## Configuring Babel

In the root folder, create a `.babelrc` file to hold all of the configurations. Run the following command in your terminal:

```bash
$ touch .babelrc
```
Open the file and add the code shown below:

```jsx
// .babelrc

{
    "presets": [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": "last 2 versions"
                },
                "modules": false,
                "loose": false
            }
        ]
    ],
    "plugins": [
      
      
        "transform-class-properties"
    ],
    "env": {
        "test": {
            "plugins": [
                "transform-es2015-modules-commonjs"
            ]
        }
    }
}

```

If you recall, we installed two Babel presets. These presets are what we added in the file so Babel can read them.

What the presets do:

`“babel-preset-env”` tells webpack to compile all syntax to ES5 (which browsers understand)
`“babel-preset-react”` adds support for jsx syntax
`“transform-es2015-modules-commonjs”` and `“transform-class-properties”` are there for backward compatibility
We also need a file to hold our generic webpack configurations for our app. In your terminal, run:

```bash
$ touch webpack.config.js
```
Add this configuration to the file:

```jsx
// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            mode,
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundled.js"
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        }
};

```
Let’s break down the code in the `webpack.config.js` file above. Webpack takes an object or a function that returns an object in its configuration. We’re going to use the function, so we can pass our environment variables into our config file. This will tell webpack which environment’s configuration to run.

An example of the function would look something like this:

```jsx
module.exports = ({ mode } = { mode: "production" }) => {}
```

And if we fail to pass an `env` to let webpack know which `mode` to work with, it defaults to `production`.

So the function returns an object of properties. Properties returned include:

- mode: tells webpack what mode we are currently in
- entry: we also set an entry file, which is going to be the index.js because that is the top file in your React application. It renders the app to the DOM, so you want to go in from here so webpack can travel down every other component
- output: tells webpack what to call the folder and the bundled JavaScript. This is happening behind the scenes without adding this configuration. But, with the configuration, we can override it
- plugins: used with webpack to achieve what loaders cannot. Some plugins are external and some are within webpack like the HMR plugin


## Configuring webpack to load jsx and static files

After our initial build, we had some errors thrown by webpack. Let’s add the configurations to tell webpack how to handle those errors. To do this, we have to install a few `devDependencies`.

To install the loaders, run:

```bash
$ npm i -D babel-loader file-loader url-loader

``` 

Let’s write a configuration for webpack with the loaders we’ve installed. Update your `webpack.config.js` file with the code below:

```jsx
// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            mode,
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundle.js"
            },
            module: {
                rules: [
                 {
                    test: /\.jpe?g|png$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        }
};

```

Now, save it and run this in the terminal:

```bash
$ npm run prod
```

It builds and creates a `build` folder in our root folder. Open the folder and you’ll see the `bundle.js` and `index.html` file.

Now, let’s get the app running:

```bash
$ npm run dev
```
As you can see, our app runs. Now, go into `.babelrc` and comment out all of the codes in the file. Then run:
 
```bash
$ npm run dev
```
Now, we get compilation errors:

![npm run dev](https://blog.logrocket.com/wp-content/uploads/2019/01/versatile-webpack-config-react-babel-compilation-errors-e1629739037135.png)

Here is why it’s breaking:

- First, webpack runs and encounters jsx syntax in `App.js`
- Then goes into the `webpack.config.js` file for a loader that can tell it what to do with jsx
- Then it finds the `babel-loader` and then goes ahead to load our `.babelrc` file 

Uncomment the code, and everything is green again!

Now, go into `App.js` and add the code shown below:

```jsx
// src/App.js

import React, { Component } from "react";

class App extends Component {
    state = {
        counter: 0
    };

    handleClick = () => {
        this.setState(prevState => {
            return { counter: prevState.counter + 1 };
        });
    };
    render() {
        return (
            <div className="App">
                <h1>I'm configuring setting up Webpack!!!</h1>
                <p>{`The count now is: ${this.state.counter}`}</p>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}
export default App;
```

Add the code below to `webpack.config.js` as well:

``` jsx
// webpack.config.js
...
devServer: {
  open: true
```

## What the property does:

- open: if true, opens our app in the browser

Now every time we run `$ npm run dev`, our app will open on a client-side server and listen for changes.

Save it and run:

```bash
$ npm run dev
```

It compiles and opens our app on http://localhost:8080/.

## Setting up Hot Module Replacement (HMR)

There is a problem we have, though. Every time we make a change, the server reloads and we lose our state. We can add a Hot Module Replacement plugin that ships with webpack to our configuration to fix this. Update the `webpack.config.js` file, so it looks something like this:

```jsx
// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            mode,
            entry: "./src/index.js",
            devServer: {
                hot: true,
                open: true
            },
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundle.js"
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
                new webpack.HotModuleReplacementPlugin()
            ]
        }

};
```

## What we added to the file:

- We set `hot` to `true` in the `devServer` property. If true, tells webpack we need to enable HMR
- HMR plugin to our array of plugins, to actually enable hot-module-reloading of our app

*Every time you edit your `webpack.config.js` file, you must restart the server.*

Increment your counter and change the header text in our `App` component. Our app re-renders, but we’re still losing our applications state.

Well, webpack’s HMR can’t preserve our applications state. To preserve that state, we’ll need another library called [react-hot-loader](https://github.com/gaearon/react-hot-loader) (RHL). The library works together with webpack to deliver HMR to our application.

So let’s install it and add it to our configurations. Let’s crash the server and install the library.

To install, first run the command below to crash the server:

```jsx
ctrl + C
``` 
and then run:

```bash
$ npm i -D react-hot-loader
```

Now update the `.babelrc` file:

```jsx
// .babelrc
{
  "presets": [
    "@babel/preset-react",
    [
     "@babel/preset-env",
      {
        "targets": {
          "browsers": "last 2 versions"
        },
        "modules": false,
        "loose": false
      }
    ]
  ],
  "plugins": [
    "transform-class-properties", "react-hot-loader/babel"
  ],
  "env": {
    "test": {
      "plugins": [
        "transform-es2015-modules-commonjs"
      ]
   }
  }
  ```
  
Go into our `App.js` and update the code as well:

```jsx
// App.js
import React, { Component } from "react";
import { hot } from "react-hot-loader";
class App extends Component {
  state = {
    counter: 0
  };
  handleClick = () => {
    this.setState(prevState => {
      return { counter: prevState.counter + 1 };
    });
  };
  render() {
    return (
      <div className="App">
        <h1>I'm configuring setting up Webpack!!!</h1>
        <p>{`The count now is: ${this.state.counter}`}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }

export default hot(module)(App);
```

We added the code above to our `App.js` because it will be our parent component. So wrapping `App` with `hot(module)` would enable HMR in every other component down the tree. We have to update our `index.js` to work with HMR too.

Go into our `src/index.js` and update the code as well:

```jsx
   // src/index.js
    
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootId = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootId
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootId
    );
  });
}
```

In our `index.js`, we have a conditional statement that does the following:

- **module.hot** : checks if there is a change in the app and fires the render method if `true`
- **process.env.NODE_ENV** : checks if we’re in development mode
- **module.hot.accept**: specifies how to handle the changes

Now, restart your server:

```bash
$ npm run dev
```

Now increment our counter and go back into `App.js` and edit the text. Viola! The state isn’t lost.

## Handling styles with webpack

We need to style our application, so we can customize webpack to handle it:

- create `sass` folder in your `src` folder
- create an `app.scss` file in your `sass` folder
- copy the code below into the `app.scss`

```jsx
// src/sass/app.scss
body{
  margin: 0
}
.App{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(gray, 0.2);
  height: 100vh
}
```

Notice nothing happens? Well, that’s because `src/app.scss` is not used in any component, so webpack won’t attempt to bundle it. This is tree shaking out of the box with webpack thanks to the ES5 module syntax `(i.e. import and export)`. Webpack wouldn’t bundle unused files so we’ve lighter bundles (more on [tree shaking](https://webpack.js.org/guides/tree-shaking/#src/components/Sidebar/Sidebar.jsx)).

Go ahead and import `app.scss` into our `App.js` file:

```jsx
// src/App.js
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import './sass/app.scss';
```

It breaks because webpack doesn’t know what to do with .sass/.scss/.css files. We have to add a loader to tell webpack how to handle the stylesheets we’re using.

Let’s run this:

```bash
$ npm i -D sass-loader css-loader style-loader
```

We are going to be implementing these loaders in different ways based on the environment.

## Setting up environment-specific webpack configurations

Before setting up the loaders, we have to split our configurations. When shipping out to production, we want bundles as light as possible. But we aren’t as concerned with this for development. So we would treat stylesheets differently for both modes. Let’s create the environment specific configurations.

Run:

```bash
$ mkdir build-utils
```

Create `webpack.development.js` and `webpack.production.js` in the `build-utils` folder. They will hold configs specific to their mode.

*`webpack.config.js` holds our generic configuration.*

To pass environment specific configurations, we need a utility package called [webpack-merge](https://www.npmjs.com/package/webpack-merge). If you are familiar with the [ES6 Object.assign() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), webpack-merge works the same way. If you don’t, don’t worry, I’ll get into the concept in a bit.

We defined generic configurations to avoid code repetition, which is good practice. Now, we need to add the specific configurations to the generic config depending on which script we run. To achieve this, we need a way to concatenate both configurations. Webpack-merge does exactly that. If there is a clash of properties in our `webpack.config.js`, it would be overwritten by the incoming property.

We need to install this utility to add it to our configurations.

Run:

```bash
$ npm i -D webpack-merge
```

Go into the `webpack.config.js` and overwrite it with the code below:

```jsx
  // webpack.config.js
    
    const path = require("path");
    const webpack = require("webpack");
    const { merge } = require("webpack-merge");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);
    
    module.exports = ({ mode } = { mode: "production" }) => {
        console.log(`mode is: ${mode}`);
    
        return merge(
            {
                mode,
                entry: "./src/index.js",
                devServer: {
                    hot: true,
                    open: true
                },
                output: {
                    publicPath: "/",
                    path: path.resolve(__dirname, "build"),
                    filename: "bundle.js"
                },
                module: {
                    rules: [
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /node_modules/,
                            loader: "babel-loader"
                        }
                    ]
                },
                plugins: [
                    new HtmlWebpackPlugin({
                        template: "./public/index.html"
                    }),
                    new webpack.HotModuleReplacementPlugin()
                ]
            },
            modeConfiguration(mode)
        );
    };
```
    
Here, we required the `webpack-merge package`, then we created a function `modeConfiguration` that loads the configuration that matches the mode we’re in. We’ll pass `modeConfiguration` as the second argument to `webpackMerge`. Merge then adds configurations from it to the generic configuration.

Now that we have that flow setup, let’s define our environment-specific configurations.

## Setting up development specific configurations

When in development mode, we’re going to define a loader for our SASS/SCSS files.

Add the code below to the `webpack.development.js` file:

```jsx
// build_utils/webpack.development.js
```

## Setting up production-specific configurations

In production mode, we’re going to do a few things:

- define a loader to extract our styles
- disable source-maps for our bundled javascript files
- optimize our styles
To install the plugin to extract our styles, run:

```bash
$ npm i -D mini-css-extract-plugin
```

Then add the following code to `build_utils/webpack.production.js`:

```jsx
// build_utils/webpack.production.js


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = () => ({
    output: {
        filename: "production.js"
    },
    module: {
        rules: [
            {
                test: /\.sa?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
});
```

In the file above, we’ve defined a loader for our styles and webpack reads this from right to left.

*sass-loader — -> css-loader — -> MiniCssExtractPluginI*.

The plugin extracts our CSS from the JS files to a separate file when going into production.

I named the bundled script for the production environment `production.js`.

To build for production, run:

```bash
$ npm run prod
```
With this, we can see our CSS file in the output folder, although it’s not optimized. We can optimize it using plugins like [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) and [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin) to minify CSS.

To install the plugins to optimize our CSS, run:

```bash
$ npm i -D optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```

Update the `webpack.production.js` file with the code below:

```jsx
// build_utils/webpack.production.js

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = () => ({
    devtool: "nosources-source-map",
    output: {
        filename: "production.js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps for css
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.sa?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
});
``` 

In the configuration, we disabled source maps for dev-tools. It adds meta info for the browser in our dev-tools for debugging, but the trade-off is slower build speeds. So we can have this in development, but definitely not in production.

Delete the `build` folder. Then run the command build to rebuild with a minified CSS file:

```bash
$ npm run prod
```

It builds with an optimized CSS file now. Great job!

## Lazying loading our app

To lazy load a React application, we use a library called [react-loadable](https://github.com/jamiebuilds/react-loadable). It has a Higher Order Component (HOC) called Loadable. Loadable dynamically loads any module before rendering it into your app.

To install the library as a dependency, run:

```bash
$ npm i -D react-loadable
```

After installation, create a new file in `src` called `LoadableApp.js`

Copy the code below into it:

```jsx
// src/LoadableApp.js
import React, { Component } from "react";
import Loadable from "react-loadable";
const LoadApp = Loadable({
  loader: () => import("./App"),
  loading() {
    return <div>Loading...</div>;
  },
  timeout: 10000 // 10 seconds
});
export default class LoadableApp extends Component {
  render() {
    return <LoadApp/>
  }
}
```

Let me explain the code above:

- we imported the HOC Loadable from react-loadable
- we passed in an object to tell Loadable what to do
- **loader**: this tells Loadable to import our specified component
- **loading**: a message to display to users while Loadable is importing our component
- **timeout**: this would tell Loadable how long to try loading the component before it fails. Handles issues with slow internet connection
- we assign the component returned by Loadable to LoadApp
- we render the returned component

Now, we have to update our index.js to render the lazy-loaded and code-split component. We need to change every mention of `App.js` with the `LoadableApp.js`.

Overwrite it with the code below:

```jsx
// src/index.js 
import React from "react";
import ReactDOM from "react-dom";
import LoadableApp from "./LoadableApp";
import reportWebVitals from './reportWebVitals';

const rootId = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <LoadableApp />
  </React.StrictMode>,
  rootId
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./App", () => {
    const NextApp = require("./LoadableApp").default;
    ReactDOM.render(
      <React.StrictMode>
        <LoadableApp />
      </React.StrictMode>,
      rootId
    );
  });
}
```

Run:

```jsx
npm run dev
```

We aren’t quite there yet. Our app throws an error in the console:

![rrdr](https://blog.logrocket.com/wp-content/uploads/2019/01/versatile-webpack-react-nbabel-configuration-dynamic-import-768x357.png)

webpack-react-babel-dynamoc-import
We need to add a plugin to our `.babelrc` to tell Babel to parse dynamic imports.

To install the plugin, run:

```bash
$ npm i -D babel-plugin-syntax-dynamic-import
```

.babelrc to:

```jsx
// .babelrc
"plugins": [
  "transform-class-properties",
  "react-hot-loader/babel",
  "syntax-dynamic-import"
]
```

Our app recompiles without errors thrown. Also from webpack 2+, whenever you use `import()` syntax, webpack automatically code-splits for you. So not only are we lazy loading our components now but also code-splitting them.

## Conclusion

That’s it for setting up webpack with React for generic and specific configuration needs. If you want to customize this any further, you can find out more from the webpack [docs](https://webpack.js.org/concepts/) for insights on how to go about it. You can find a working version of this project on [GitHub](https://github.com/acekyd/react-webpack-config).

## Full visibility into production React apps

Debugging React applications can be difficult, especially when users experience issues that are hard to reproduce. If you’re interested in monitoring and tracking Redux state, automatically surfacing JavaScript errors, and tracking slow network requests and component load time, [try LogRocket](https://www2.logrocket.com/react-performance-monitoring).

![pics](https://www2.logrocket.com/react-performance-monitoring)

 
[LogRocket](https://www2.logrocket.com/react-performance-monitoring) is like a DVR for web and mobile apps, recording literally everything that happens on your React app. Instead of guessing why problems happen, you can aggregate and report on what state your application was in when an issue occurred. LogRocket also monitors your app's performance, reporting with metrics like client CPU load, client memory usage, and more.

The LogRocket Redux middleware package adds an extra layer of visibility into your user sessions. LogRocket logs all actions and state from your Redux stores.

Modernize how you debug your React apps — [start monitoring for free](https://www2.logrocket.com/react-performance-monitoring).


