When you got a paragraph in HTML and in there you have a word hyphenated and you want to treat it as a whole as one word, but then there's not much space and it gets broken in the middle.

This is what you should probably be getting:
```
This hotel is all-
inclusive
```

But you want this instead:
```
This hotel is 
all-inclusive
```

There is something you probably don't know is that there's a lot of differents hyphen- or dash-like characters in Unicode. The hyphen we need here it's the **non-breaking hyphen** (`U+2011` or `&#8209;`).

Instead of using the regular hyphen (or minus hyphen) use the non-breaking hyphen and you should be getting the correct result of treating the hyphenated word as a single word.