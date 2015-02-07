This is not something that would happen frequently, but when there a big change with lots of files and lines of code involved, GitHub will display a messages that says: _"Sorry, we could not display the entire diff because too many files changed."_ and it will be hard to check all the files that were affected by that commit.

It would be nice if there was a option where you can hide the lines of code and only show the file names, so that way wouldn't slow down the browser performance, and we can see the files name quickly.

Because this still not a option available, we have Dev Tools and DOM Selectors, and when this happen I open the console and run this line of code:

```javascript
// hides the content
$('.data.blob-wrapper').hide()
```

Here it's what it would ends up looking like this:

![GitHub Diff](/images/github-diff.jpg "GitHub Diff")