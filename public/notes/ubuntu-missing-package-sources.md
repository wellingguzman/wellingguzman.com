While trying to install [Directus](http://getdirectus.com) in an ubuntu server I got an error from a composer dependency that `php5-mcrypt` is not installed.

```
php5-mcrypt : Depends: libmcrypt4 but it is not installable
```

Running `apt-get install php5-mcrypt` didn't work.

Running `apt-get update` first didn't work either.

After some time figuring out what was the problem, I end up noticing that the `source.list` file was missing.

The next question would be where do I find the official ubuntu repositories? Luckily I found [this generator](https://repogen.simplylinux.ch/) where you can select a ubuntu release and all the repositories you need and it generates you a `source.list` file.

Coping and pasting the new generate content to `source.list` file and running `apt-get update` updates the ubuntu package repositories.

Now `apt-get install php5-mcrypt` works.