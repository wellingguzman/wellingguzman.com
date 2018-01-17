<p>Using the library <a href="https://github.com/felixge/node-mysql" target="_blank">node-mysql</a> I found myself with an error that refused my node app to connect to an MySQL Database or in fact the server itself. At first I blame the library, searching and searching and I didn't find any solution that leads me to fix error. Every time I tried a connection I always get the error : <code>Error: connect ECONNREFUSED</code>.</p>

<pre class="javascript">
<code>
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
</code>
</pre>

<p>So I wrote and <a href="https://github.com/felixge/node-mysql/issues/874" target="_blank">issue</a> and it was not a library issue, it was MAMP's MySQL bad configuration. There is two thing that can resolve this problem:</p>

<h2>Solution #1</h2>
<p>On MAMP disable <code>Allow local access only</code>.</p>

<h2>Solution #2</h2>
<p>run <code>mysql_config --socket</code> in the terminal and use the output as <code>socketPath</code> value
<pre class="sh">
<code>
$ mysql_config --socket
/tmp/mysql.sock
</code>
</pre>

<p>Probably when you run <code>mysql_config</code> it would says:
<pre><code>-bash: mysql_config: command not found</code></pre>

<p>In MAMP is located in: <code>/Applications/MAMP/Library/bin/mysql_config</code> so it would be: </p>
<pre class="sh">
<code>
$ /Applications/MAMP/Library/bin/mysql_config --socket
/tmp/mysql.sock
</code>
</pre>

<p>You can use alias or export to make this long path short.</p>

<pre class="javascript">
<code>
var connection = mysql.createConnection({
  socketPath : '/tmp/mysql.sock',
  host     : 'localhost',
  user       : 'root',
  password   : '123'
});
</code>
</pre>

<p>Hope it helps in any way.</p>
