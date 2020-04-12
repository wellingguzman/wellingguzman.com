Creating a checksum from a huge file can impact the memory consumption if it's not done correctly. One solution is to use `Hash.update` method to hash the data by pieces.

To create a checksum of a file we need to read its whole content and hash it. Reading the whole content of a big file could result in an undesired error due to not enough memory, because the content loaded into memory.

To overcome this we can use `Hash.update` method from the `crypto` module. It allows us to incrementally hash a string by appending new data, which makes it the perfect option to hash big files with low memory consumption.

We can read the file by chunk and incrementally update the hash by adding chunk to the hash object.

Below there's a snippet on how to generate a md5 checksum using `Hash.update`.

```js
const crypto = require('crypto');
const fs = require('fs');

function getChecksum(path) {
  return new Promise(function (resolve, reject) {
    // crypto.createHash('sha1');
    // crypto.createHash('sha256');
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

> The algorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform.

Example of some algorithms you can use are: md5, sha1, sha256, and sha512.

### References

- [`crypto.createHash(algorithm[, options])`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options)
- [`fs.createReadStream`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
