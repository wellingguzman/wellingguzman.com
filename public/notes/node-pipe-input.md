If you want to pipe the output of one program to a node script, you can use `process.stdin`.

```shell
echo "name" | ./hello.js
```

The example above should output "Hello " + any output of the first script.


```js
const stdin = process.stdin;
let data = '';

stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  data += chunk;
});

stdin.on('end', function () {
  console.log("Hello " + data);
});

stdin.on('error', console.error);
```

Using the input stream (`stdin`), we read the input data that was sent by the first script.

This can be rewrite to use promises, so it looks like this:

```js
getInput().then(sayHello).catch(console.error);
```

Complete example below:

```js
function sayHello(name) {
  console.log("Hello " + name);
}

function getInput() {
  return new Promise(function (resolve, reject) {
    const stdin = process.stdin;
    let data = '';

    stdin.setEncoding('utf8');
    stdin.on('data', function (chunk) {
      data += chunk;
    });

    stdin.on('end', function () {
      resolve(data);
    });

    stdin.on('error', reject);
  });
}

getInput().then(sayHello).catch(console.error);
```