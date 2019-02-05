In a [previous note](/notes/hello-preact) I created a Preact example with minimal configuration. In that example I added Preact using script tag instead of using ES6 modules. To make this work I need to install `webpack` and `babel-loader`.

Webpack allow us to convert the `preact` package into a `preact` module. While in the other hand `babel-loader` is a webpack loader that allow us to convert ES6 code into ES5.

Following the previous example, I am going to use the same HTML file, but removing the Preact script tag, so it looks like the code below:

```html
<!doctype html>
<html>
  <head>
    <title>Hello Preact</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

Now I'm replacing the following line from `app.js` to use `import`.

From:

```js
const { h, render, Component } = window.preact;
```

To:

```js
import { h, render, Component } from 'preact';
```

## Webpack & Babel Loader

I need to install `webpack`, `webpack-cli`, and `babel-loader` using `npm`.

```shell
npm install --save-dev babel-loader webpack webpack-cli
```

I am going to install `webpack-cli` to execute webpack from the command line.

## Webpack Configuration

I need to create a new file for the webpack configuration named `webpack.config.js`. This file will tells webpack what's the input and output file, and to use the `babel-loader` to convert the ES6 features.

In the previous example this was done using the `babel` command, now `webpack` will take care of all this.

```js
module.exports = {
	entry: './app.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
			  test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
}
```

Webpack is ready to be used to convert `app.js` into `bundle.js`, allowing us to use `import` as well.

## Build Script

We are now replacing the `build` script from `package.json` to use `webpack` instead of `babel`.

From:

```json
"scripts": {
  "build": "babel app.js -o bundle.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

To:

```json
"scripts": {
  "build": "webpack",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Run the build command, and access `index.html` to see the result.

```shell
$ npm run build
```

See final code here: [WellingGuzman/hello-preact](https://github.com/WellingGuzman/hello-preact/tree/webpack).