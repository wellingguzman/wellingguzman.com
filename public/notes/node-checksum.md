Below there's a snippet on how to generate a md5 checksum consuming low memory.

```js
const crypto = require('crypto');
const fs = require('fs');

function getChecksum(path) {
  return new Promise(function (resolve, reject) {
    const hash = crypto.createHash('md5');
    const input = fs.createReadStream(path);

    input.on('error', reject);

    input.on('data', function (chunk) {
      hash.update(chunk);
    });

    input.on('close', function () {
      resolve(hash.digest('hex'));
    });
  });
}

// Usage
// node ./file.js path/to/file
getChecksum(process.argv[2])
  .then(console.log)
  .catch(console.error);
```

If you are wondering why this doesn't consume much memory even on reading huge files, it's because we are not reading the whole file into memory, but reading the file by small pieces at a time. By default [`fs.createReadStream`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options) limit each chunk of data to 64kb.

Because `crypto` Cipher.update method allows us to incrementally hash a string by appending new data makes the perfect option to hash huge files without use much memory.