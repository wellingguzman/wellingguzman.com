Concatenating two files in unix-like operative system can be done with a single line like these:

```bash
$ cat file1.txt file2.txt > newfile.txt
```

If permission is needed to create and write into new files in the specified path you must use `sudo`, so you do this:

```bash
$ sudo cat file1.txt file2.txt > newfile.txt
```

But that doesn't work because the output is handle by the shell and not sudo, and by that it means it won't let you create the new file returning something like this: `-bash: newfile.txt: Permission denied`. **Note:** This only happen when the current user doesn't have permission to create/write on the new file.

There's several solutions to this but a one-liner solution is to run a shell command inline:

```bash
sudo sh -c 'sudo cat file1.txt file2.txt > newfile.txt'
```
