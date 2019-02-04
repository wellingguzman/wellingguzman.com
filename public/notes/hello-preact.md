I have worked on projects that uses Preact/React before, but those projects already have the workflow already configured and everything is already done for you using Webpack, babel, and a list of other tools that help this process of building all the js/jsx files to bundle js file.

Preact describes itself as an React lightweight alternative with the same API.

> Fast 3kB alternative to React with the same modern API.

I have sit it down – well, lay down – to try create a "hello world" using Preact, with the minimal tooling possible to understand how this all modern front-end development framework works. As most tutotials, and guides I have found they all assumed you are familiar with all these tools, I didn't find much straight up guide for curious newbies that want to know how this all glue together.

At this point of time, your browser probably cannot understand JSX or some of the new ES6/2015 features, there's where Babel comes into action.

## Setup Project

First thing first, let's create a new directoty and create a `package.json` file.

```shell
$ mkdir hello-preact
$ cd hello-preact
$ npm init -y
```

After executing `npm init -y`, a file called `package.json` should have been created.

## Add HTML Page

```html
<!doctype html>
<html>
  <head>
    <title>Hello Preact</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://cdn.jsdelivr.net/npm/preact/dist/preact.min.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
```

Babel is going to transpile our app file into a single `bundle.js` file.

## Add Preact Component

Create a new simple component:

```js
const { h, render, Component } = window.preact;

class HelloPreact extends Component {
  render() {
    return <div>Hello Preact</div>
  }
}

render(<HelloPreact />, document.getElementById('root'));
```

And save it in a file named `app.js`, or any name you prefer.

The `window.preact` reference comes from the script tag inside the HTML file.

## What is Babel?

In Babel own description:

> Use next generation JavaScript, today

It is a tool that allows you to convert javascript features not yet implemented, into something actual javascript engine understands.

## Install Babel

We are going to use `@babel/cli` package to transpile `app.js` into `bundle.js`.

There's different way you can use Babel, [see instructions](https://babeljs.io/setup#installation) in Babel installation page.

```shell
$ npm install --save-dev @babel/core
$ npm install --save-dev @babel/cli

# Or both together
# npm install --save-dev @babel/core @babel/cli
```

`@babel/cli` allows us to execute `@babel/core` from the terminal.

## Add Babel Plugins

Now we've installed Babel, but we need make it useful by installing some plugins. What we want is to convert the modern JS code from `app.js` into something our browser understands.

`@babel/preset-env` helps us convert any code from ES2015 and newer standard.

Let's install and enable this preset. Preset is a collection of plugins.

```shell
$ npm install --save-dev @babel/preset-env
```

All modern/future features can be converted, but JSX are not.

Let's install the React JSX transform plugin. React and Preact have the same API, which means we can use the React plugin with a minor change.

```shell
$ npm install --save-dev @babel/plugin-transform-react-jsx
```

The preset and plugin are installed, but we need to tell `@babel/cli` that we want to use it.

Create a file named `.babelrc`, it will holds the configurations for `@babel/cli`.

```shell
$ touch .babelrc
```

To enable the preset and plugin we need to add it to `.babelrc` file.

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h"
    }],
  ]
}
```

By default `@babel/plugin-transform-react-jsx` because is a React specific plugin, it will translate `<></>` from JSX into `React.createElement`, instead of Preact `h` function, we must substitute this by changing the `pragma` option to `h`.

[Pragma option reference](https://babeljs.io/docs/en/next/babel-plugin-transform-react-jsx.html#pragma)

## Transform JavaScript

Add a new command to `package.json` inside the `scripts` property to execute the babel command.

```json
"scripts": {
  "build": "babel app.js -o bundle.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Run the build command, and access `index.html` to see the result.

```shell
$ npm run build
```

See final code here: [WellingGuzman/hello-preact](https://github.com/WellingGuzman/hello-preact).