Changing permalink on WordPress it's never, well at least it never gave me any headache, but when I change `/blog/%postname%/` to just `/%postname%/` some pages fell apart, and I was blaming the `.htaccess`, deleting it, recreating, let WordPress rebuild it, did a `flush_rewrite_rules();` and nothing was fixed. Then I notice it was all the custom post slug that matches the page slug.

The site had three custom post, **Films**, **Stories**, **Galleries**, also for each custom post there is a page with the same name and slug which had a custom template, but I enter to `thesite.com/films`, `thesite.com/stories` or `thesite.com/galleries` it did not serve the right template, so I change `thesite.com/films` to `thesite.com/filmz` and it did work and serve the right template.

By seeing this behavior it has to be the custom post and his rewrite fault, this is part of the custom post:

```php
<?php
'public' => true,
'show_ui' => true,
'has_archive' => true,
'publicly_queryable' => true,
'show_in_nav_menus' => false,
'exclude_from_search' => false,
'hierarchical' => false,
'menu_position' => 20,
'rewrite' => array('slug'=>'films'),
'supports' => array('title', 'thumbnail'),
'show_in_nav_menus' => true
```

There is three solution to this:

## Solution #1

Change the slug, but this is a wrong solution if you already had theses indexed.

## Solution #2

Change `'has_archive'=> true` to `false` and the `/films` would be ignore by the custom post.

## Solution #3

Do not use the custom page, and customize the `archive-{$post_type}.php` file and forget about the specific page for each one.