Following my previous note: [Hello Preact Modules](/notes/hello-preact-modules).

We can avoid the `.babelrc` file by adding these configuration to the `webpack.config.js` file.

`.babelrc` file:

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

Below there's the new `webpack.config.js` file.

```diff
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
-       loader: 'babel-loader',
+       use: {
+         loader: 'babel-loader',
+         options: {
+           presets: [
+             '@babel/preset-env'
+           ],
+           plugins: [
+             ['@babel/plugin-transform-react-jsx', {
+               'pragma': 'h'
+             }],
+           ]
+         }
        }
      }
    ]
  }
}
```

Now we can delete `.babelrc`, and everything should work the same.