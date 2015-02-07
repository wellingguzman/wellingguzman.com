This is not something that would happen frequently, but when there a big change with lots of files and lines of code involved, GitHub will display a messages that says: _"Sorry, we could not display the entire diff because too many files changed."_ and it will be hard to check all the files that were affected by that commit.

It Would be nice if there was a option when you can hide the lines of code and only show the file names, so that way wouldn't slow down the browser performance.

Because this still not a option available, we have Dev Tools and DOM Selectors.

```javascript
// hides the content
$('.data.blob-wrapper').hide()
```

Here it's what it would looks like:

![GitHub Diff](/images/github-diff.jpg "GitHub Diff")