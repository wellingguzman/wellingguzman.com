I was updating my site and everything was working correctly on my local machine, but as soon as it was deployed, the new code crashed the http server.

I noticed that the server has an outdated version of nodejs. Running a `0.x` nodejs version while everything was created under `8.x`.

After trying to update to a new version can be tricky as there's a tons of way documented on how to install it and easier on windows and mac systems.

How to install or update nodejs can be found on the [package manager](https://nodejs.org/en/download/package-manager/) section of nodejs's downloads page.

This method also works for any Debian and ubuntu based distributions.

## Update Source List

First, You would need to update your system package source list. Depending on the version you want to upgrade, there's different script that will try to update your source list.

**NOTE**: Be carefully, these are bash scripts and can execute dangerous code, if you are a little bit skeptical you can see the content first before you use it or you can read the [manual installation](https://github.com/nodesource/distributions#debmanual)


```shell
# Node.js v4
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

# Node.js v5
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -

# Node.js v6
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

# Node.js v7
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

# Node.js v8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

# Node.js v9
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -

# Node.js v10
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
```

## Install package

After the source list has been updated, the next step is installing the new nodejs version.

```shell
sudo apt-get install -y nodejs
```

## Confirm

The last step will be to confirm the version installed are correct, or pointing to the right path as multiple nodejs can be installed in the same system.

Try running:

```shell
$ node -v
$ which node
$ npm -v
$ which npm
```

In conclusion you may want to have `node` and `npm` point to the right path. For example, you can look into `/usr/bin` or `/usr/local/bin` to make sure `which node` and `which npm` points to the right version.