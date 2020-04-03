There are different tools to run a node.js script in the background. In my experience I have used `nohup`, `Forever`, and `PM2`.

## nohup

Running a script in the background in linux can be done using `nohup`, using nohup we can run node application in the background.

```shell
$ nohup node /nodeapp/index.js &
```

### Kill Process

You can stop the process using the `kill` command as well:

First you need to know which process ID to kill, list all the process running node by running:

```shell
ps axl | grep node
```

The second column of your result is probably the PID, take that number and run the command below:

```shell
kill -9 [PID]
```

## Forever

[Forever](https://github.com/foreverjs/forever) is another solution for Node.js scripts.

### Installation

```shell
$ npm install forever -g
```

### Usage

```shell
$ forever start /nodeapp/index.js
$ forever restart /nodeapp/index.js
$ forever stop /nodeapp/index.js
$ forever list
```

## PM2

Another tool I found is [PM2](https://github.com/Unitech/pm2), it has a lot of extras features that I have not used, except process management.

### Installation

```
$ npm install pm2 -g
```

### Usage

```shell
$ pm2 start /nodeapp/index.js
$ pm2 restart /nodeapp/index.js
$ pm2 reload /nodeapp/index.js
$ pm2 stop /nodeapp/index.js
$ pm2 delete /nodeapp/index.js
$ pm2 list
```

## References
- [Forever](https://github.com/foreverjs/forever)
- [nohup(1)](http://man7.org/linux/man-pages/man1/nohup.1.html)
- [PM2](https://github.com/Unitech/pm2)
