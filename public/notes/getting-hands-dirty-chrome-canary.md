If you want to have the newest features from **Google Chrome**, you must need to use **Chrome Canary**. Chrome Canary is updated almost everyday, it's mean would be fresh builds. It can run side by side with Google Chrome stable version, so you don't have to choose one of the two, one thing to know is that you can't use Canary as your default browser.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/canarylogo.png">
</figure>

Although this is designed for Developers and early adopters, you should **be aware** this could crash sometimes even has more chances to if you are using experimental features.

<!-- more -->

This is a quick view of canary I did in a couple of hours to get my hands dirty, if you want to be ahead and test features that would be available later on Google Chrome check this out.

I have been seeing this Chrome gold icon for a while, wondering what it is, I just thought it was just kind a cool icon for Chrome and nothing else, but HEY! it's not, is your Google Chrome Browser from the **FUTURE!**, so now let's see what bring us.

First of all this is _Version 31.0.1632.0 canary_.

## Visually Stuff

Now the first we notice when we open up **Developer Tools** is that now it organizes by tabs rather than grouped list-item, I do like this new way to handle this section now, you don't have to scroll all the way down looking for an specific section, it's worst when you have thousands of CSS declarations. Also metrics section was merged with styles section. We can see its difference in the image below.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/image01.jpg">
</figure>

In sources panel the paused exceptions buttons was moved from bottom bar to sidebar as you can see in the next image.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/image02.jpeg">
</figure>

They removed **Collect CSS Selector Profile** from Profile panel.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/image03.jpeg">
</figure>

DevTools Settings are now neat, it has smaller font size and more organized than before.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/Image04.jpeg">
</figure>


## Features

Enough of visually things, now let's see what features I found:

### Inspect DOM Element

The first thing I check was the popup menu from DOM Inspector.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/image05.jpeg">
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/image05.1.jpeg">
</figure>

**Inspect DOM Element** is a new option that come in handy when you want a quick access to a DOM element properties, this save us time because we don't need to go to console and query that element using `jQuery` or `querySelector` or any of those anymore, now it's just a click ahead.

### EventTarget

In the properties tab of **DOM inspector** now included `EventTarget` which can tell us if the element can receive DOM events, even though the most common events targets are `window`, `Element`, and `document` which are the ones we commonly use.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/Image06.jpeg">
</figure>

### Working with CSS Preprocessor

Now in canary we have CSS and Javascript source maps enabled by default, we don't need to enable Enable Developer Tools experiments to enabled this on the experiments tab.

<figure>
<img src="http://wellingguzman.com/wp-content/uploads/2013/09/Image071.jpeg">
</figure>

This all I got, most of the features I was testing I later notice that it was already available to the current Google Chrome stable version, so all the new stuff on Canary or already available (on stable) I'm going to keep posting here.

Go and Download it [here](https://www.google.com/intl/en/chrome/browser/canary.html), it's only available for Mac and Windows, but if you are on linux you can check [Chromium Dev Channel](http://www.chromium.org/getting-involved/dev-channel) and have weekly updates.

### Useful Links:

- [http://trac.webkit.org](http://trac.webkit.org)
- [Web Inspector commits RSS feed](http://peter.sh/data/web-inspector-rss.php)
- [The Breakpoint Episodes](http://www.youtube.com/playlist?list=PLM7CMPN8kQrKQdYtnG8qhubQHQmb6CHTw)
- [Follow me on Twitter](http://twitter.com/WellingGuzman)
- [Follow me on Google+](https://plus.google.com/u/0/109985810023249441310/posts)