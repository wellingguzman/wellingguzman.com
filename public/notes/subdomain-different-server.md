<p>I want to develop my first Node.js applications and host it as subdomain, but this server (shared on hostgator) does not support Node.js applications, and for a second I thought if I need to change server only for this?. But nope, there is a solution for this.</p>

<span id="more-332"></span>

<h2>What I want</h2>
<ul>
<li><p>Host a Nodejs application in subdomain (<em>subdomain.wellingguzman.com</em>) on a server that does not support nodejs.</p></li>
<li><p>Keep it like if it was hosted on the same server.</p></li>
</ul>


<h2>Solution</h2>

<ol>
<li><p>Go to your hosting provider, and look for <strong>DNS Zone</strong>, on <strong>hostgator</strong> is under domains tab.</p>
<p><img src="http://wellingguzman.com/wp-content/uploads/2014/05/zonadns.jpg" alt="zonadns" class="alignnone size-full wp-image-335" /></p>
</li>

<li><p><strong>Add a Record</strong>, put the <strong>Name</strong> of the host, or subdomain (<em>subdomain.wellingguzman.com</em>), there is possible two types you would need, type <strong>A</strong> or <strong>CNAME</strong>. If you want to point to an IP you need a type <strong>A</strong>, but if you want to point to a domain/subdomain you need <strong>CNAME</strong>.</p>

<p>On <em>Address</em>/<em>CNAME</em> put the server's IP or subdomain, in my case the app is hosted on <strong>OpenShift</strong> and the CNAME would be something like <em>nodejs-welling.rhcloud.com</em>. </p>

<p><strong>TTL</strong> is <em>Time to Live</em>, amount of seconds the record cache would last.</p>

<p><img src="http://wellingguzman.com/wp-content/uploads/2014/05/dnszone-filled.jpg" alt="dnszone-filled" class="alignnone size-full wp-image-339" /></p>

</li>
</ol>

<p>This would do the trick, and every time <em>subdomain.wellingguzman.com</em> is typed it would request <em>nodejs-welling.rhcloud.com</em>.</p>