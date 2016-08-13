<p>I'm working on a Project using Laravel and I need to pull all the blog post from a WordPress site that is already on the same server.</p>
<span id="more-343"></span>

<p>To do this and have the power of  WordPress into another project, add the WordPress <code>wp-load.php</code> file.</p>


```php
<?php
$wordPressPath = '/wordpress/path/wp-load.php';
require $wordPressPath;

$args = array(
        'posts_per_page'   => 5,
        'orderby'          => 'post_date',
        'order'            => 'DESC',
        'post_type'        => 'post',
        'post_status'      => 'publish'
      );

$posts = get_posts( $args );
```

<p>Something that could happen is that you have a function/class with the same name as WordPress has and this would thrown a function/class redeclaration error.

<p>But aside from this, works perfect.</p>