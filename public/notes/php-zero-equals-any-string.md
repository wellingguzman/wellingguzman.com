In PHP any string is equals to `0`, except when it starts with a number that's not zero.

```php
// Equals
$result = 0 == '';
$result = 0 == '0';
$result = 0 == 'string';
$result = 0 == '0string';

// Not Equals
$result = 0 == '1string';
```

When there's an integer in one of the operands, PHP converts the other to an integer. If it starts with a number, all the subsequent numbers will be returned when casting the string value to an integer. `1string` will result in `1`, and `123string` will result in `123`.

I spent sometime trying to figure out why my code wasn't working. This could be avoided by using the identical operator `===`, or casting the integer value to string, rather the equal operator `==`.