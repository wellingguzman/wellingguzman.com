PHP function `call_user_func()` does not pass parameter variable as reference. the code below won't work as expected.

From PHP documentation:

> Note that the parameters for `call_user_func()` are not passed by reference.

```php
<?php

function increment(&$var)
{
    $var++;
}

$a = 0;
call_user_func('increment', $a);
echo $a."\n"; // $a is equals to 0
```

In order to solve this problem `call_user_func_array()` must be used instead.

```php
<?php
function increment(&$var)
{
    $var++;
}

$a = 0;

call_user_func_array('increment', array(&$a));
echo $a."\n"; // $a is equals to 1
```
