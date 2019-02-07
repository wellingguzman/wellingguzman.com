PHP has a datetime format constant for ISO 8601 named `c`, that outputs a datetime string like this: `2019-02-06T23:19:33-01:00`.

The problem it fails when you use it with `DateTime::createFromFormat`.

```php
// Returns false
$datetime = DateTime::createFromFormat('c', '2019-02-06T23:19:33-01:00');
```

It can be used with `date` function.

```php
$date = date('c');
```

It also can be used with `DateTime()` class.

```php
$datetime = (new \DateTime())->format('c');
```

I couldn't find the reason behind this, but I found a workaround. From the string we know the format for the date and the time, what's missing it's what format to use for the timezone offset.

What I wanted to do it's confirm the input datetime it's of `c` format.

There's a format to determine the offset time.


> `P` Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3) Example: +02:00

Instead of using `c`, we are going to use `Y-m-d\TH:i:sP`.

```php
$datetime = DateTime::createFromFormat('Y-m-d\TH:i:sP', '2019-02-06T23:19:33-01:00');
```