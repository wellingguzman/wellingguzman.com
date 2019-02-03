To show the system date, time, and other related information, use the command `timedatectl`.

With this command you can do more than just change the timezone, such as change the date and time.

To change the timezone you should use `timedatectl set-timezone <timezone>`. If you don't know the names of the timezone, use `timedatectl list-timezones` to list all timezones available.

Replace `<timezone>` with any of the value listed by the `timedatectl list-timezones` command.

```
timedatectl set-timezone America/Vancouver
```

Run `timedatectl` again to confirm the changes.