Running a script in the background in linux can be done using `nohup`, using nohup we can run node application in the background.

```shell
$ nohup node /nodeapp/index.js &
```

[Forever](https://github.com/foreverjs/forever) is another solution for Node scripts.

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