Trying to interact with github, pushing mainly as it requires write permission from the user to perform such task, I was getting a 403 error, which means I am not authorized to push to that repository.

```shell
remote: Permission to directus/directus.git denied to WellingGuzman.
fatal: unable to access 'https://github.com/directus/directus.git/': The requested URL returned error: 403
```

For some reason this started to happen after I installed Github Desktop Application.

I don't know the reason why it got invalid or corrupted, but I did find a way to re-authenticate myself.

On Mac OSX Git uses the Keychain Access to store credentials information, you can either update or remove the credentials from the keychain.

Removing this information the next time you try to push it will ask you to enter your username and password

```shell
$ git push origin master
Username for 'https://github.com': wellingguzman
Password for 'https://wellingguzman@github.com':
remote: Invalid username or password.
```

## Terminal

```shell
git credential-osxkeychain erase
```

## Application

1. Using the method of your preferences, Finder search, manually search the application directory or `CMD (⌘) + Spacebar` look for "Keychain Access".
2. Search for "Github.com"
3. Find and edit/remove the one that says to be "Internet password" kind, to make sure this is the one, open this entry and on the access control tab should says credentials-osxkeychain.
4. After you are sure about this, edit or delete to get back your git access control.

Hope it helps, hope I can remember this next time.
