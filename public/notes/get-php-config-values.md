There's a built-in function in PHP called [`ini_get`](http://php.net/manual/en/function.ini-get.php) that allow us to get a configuration value by its name, but the value present during runtime rather than the value defined in `php.ini`. These values can be overwritten by web servers or by code during execution, as example, using [`ini_set`](http://php.net/manual/en/function.ini-get.php), `PHP_VALUE` on `.htaccess`, or `fastcgi_param PHP_VALUE` on nginx.

To get the configuration value defined in `php.ini`, there's another function called [`get_cfg_var`](http://php.net/manual/en/function.get-cfg-var.php), that actually do this. This function will ignore any values set by a webserver or during runtime.

> This function will not return configuration information set when the PHP was compiled, or read from an Apache configuration file.
> — [PHP get_cfg_var Manual](http://php.net/manual/en/function.get-cfg-var.php)

It can be possible that PHP is not loading values from the configuration file (`php.ini`), well in that case no value will be returned from `get_cfg_var`.

> To check whether the system is using a [configuration file](http://php.net/manual/en/configuration.file.php), try retrieving the value of the cfg_file_path configuration setting. If this is available, a configuration file is being used.
> — [PHP get_cfg_var Manual](http://php.net/manual/en/function.get-cfg-var.php)

One thing to keep in mind is that defining a configuration using `php -d`, even when php didn't load the values from `php.ini` this value will be available through `get_cfg_var`.

```php
function get_config($key)
{
    if (get_cfg_var('cfg_file_path')) {
        return get_cfg_var($key);
    }

    return ini_get($key);
}
```

In the example above the function's goal is to return the value from `php.ini`, otherwise is going to fallback to retrieve the value present during runtime by using `ini_get`.
