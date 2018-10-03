Using the library [node-mysql](https://github.com/felixge/node-mysql) I found myself with an error that refused my node app to connect to an MySQL Database or in fact the server itself. At first I blame the library, searching and searching and I didn't find any solution that leads me to fix error. Every time I tried a connection I always get the error : `Error: connect ECONNREFUSED`.

```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
```

So I wrote an [issue](https://github.com/felixge/node-mysql/issues/874) and it was not a library issue, it was MAMP's MySQL bad configuration. There is two thing that can resolve this problem:

## Solution #1

On MAMP disable `Allow local access only`.

## Solution #2

run `mysql_config --socket` in the terminal and use the output as `socketPath` value.

```shell
$ mysql_config --socket
/tmp/mysql.sock
```

Probably when you run `mysql_config` it would says:

```shell
-bash: mysql_config: command not found
```

In MAMP is located in: `/Applications/MAMP/Library/bin/mysql_config` so it would be:

```shell
$ /Applications/MAMP/Library/bin/mysql_config --socket
/tmp/mysql.sock
```

You can use alias or export to make this long path short.

```javascript
var connection = mysql.createConnection({
  socketPath : '/tmp/mysql.sock',
  host     : 'localhost',
  user       : 'root',
  password   : '123'
});
```

Hope it helped you in any way.
