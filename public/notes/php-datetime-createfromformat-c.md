PHP has a datetime format character for ISO 8601 named `c`, that outputs a datetime string like this: `2019-02-06T23:19:33-01:00`.

There's a problem with this character when you use it with `DateTime::createFromFormat` – it fails.

```php
// Returns false
$datetime = DateTime::createFromFormat('c', '2019-02-06T23:19:33-01:00');
```

The character can be used with `date` function, and it works.

```php
$date = date('c');
```

It also works when it's used with `DateTime()` class.

```php
$datetime = (new \DateTime())->format('c');
```

I couldn't find the reason behind this, but I found a workaround. From the datetime string we can use the date and time character formats, what's missing it's what format character to use for the timezone offset.

Why I am trying to do here? I want to confirm the input datetime is of an `c` format.

After looking at the [date function format list](http://php.net/manual/en/function.date.php), there's a format character to determine the offset time.

> `P` Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3) Example: +02:00

Instead of using `c`, we are going to use the following format: `Y-m-d\TH:i:sP`.

```php
$datetime = DateTime::createFromFormat('Y-m-d\TH:i:sP', '2019-02-06T23:19:33-01:00');
```