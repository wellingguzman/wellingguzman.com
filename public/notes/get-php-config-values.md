There's a PHP function called [`ini_get`](http://php.net/manual/en/function.ini-get.php) that allow us to get a configuration value, but this value doesn't return the actual value saved in the `php.ini` file. This value can be overwritten. Webservers or via runtime using [`ini_set`](http://php.net/manual/en/function.ini-get.php) can change these values.

If for some reason you want to get the actual value from the `php.ini` there's another function called [`get_cfg_var`](http://php.net/manual/en/function.get-cfg-var.php), that gets the value from the configuration file instead of th web server or runtime.

From PHP Docs:

> To check whether the system is using a [configuration file](http://php.net/manual/en/configuration.file.php), try retrieving the value of the cfg_file_path configuration setting. If this is available, a configuration file is being used.

It can be possible that PHP is not loading configuration from the configuration file (`php.ini`). Make sure to confirm the value `cfg_file_path` exists.

```
if (get_cfg_var('cfg_file_path')) {
    // Using configuration file
}
```