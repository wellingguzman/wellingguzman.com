I want to develop my first Node.js applications and host it as subdomain, but this server (shared on hostgator) does not support Node.js applications, and for a second I thought if I need to change server only for this?. But nope, there is a solution for this.

<span id="more-332"></span>

## What I want

- Host a Nodejs application in subdomain (__subdomain.wellingguzman.com_) on a server that does not support nodejs.
- Keep it like if it was hosted on the same server.

## Solution

1. Go to your hosting provider, and look for **DNS Zone**, on **hostgator** is under domains tab.

![zonadns](http://wellingguzman.com/wp-content/uploads/2014/05/zonadns.jpg)

2. **Add a Record**, put the **Name** of the host, or subdomain (_subdomain.wellingguzman.com_), there is possible two types you would need, type **A** or **CNAME**. If you want to point to an IP you need a type **A**, but if you want to point to a domain/subdomain you need **CNAME**.

On _Address_/_CNAME_ put the server's IP or subdomain, in my case the app is hosted on **OpenShift** and the CNAME would be something like _nodejs-welling.rhcloud.com_.

**TTL** is _Time to Live_, amount of seconds the record cache would last.

![dnszone filled](http://wellingguzman.com/wp-content/uploads/2014/05/dnszone-filled.jpg)

This would do the trick, and every time _subdomain.wellingguzman.com_ is typed it would request _nodejs-welling.rhcloud.com_.