I have site built with Wordpress and I wanted to catch all 404 page that Wordpress try to display and make my own custom 404 page depending on the requested page, or in fact I just wanted to whether or not show a 404 page.

<!-- more -->

If the user, let's say, go to `http://mysite.com/someword` on mysite, and if that is not a post/page it would probably display a 404 page, but I didn't want that behavior I wanted to search if `someword` is a category slug or a tag and display posts in that category or tag, otherwise would show the normal 404 page.

So, this is what I did, I added a action to `template_redirect` hook, that is executed before WordPress determine which page is going to be loaded.

```php
<?php
add_action('template_redirect', '_custom_redirect');
function _custom_redirect()
{
  global $wp_query;

  if ( $wp_query->is_404() )
  {
    // Here I take over 404 page
  }
}
```

So now, I know when it's a 404 page, I need to get the string it was passed on the url, in this case `someword`, so I can check if the string match a category or a tag name with that name.

This string is stored in a array named `query_vars` with the key `name`. `query_vars` is a variable member of `WP_Query` which WordPress uses to execute the main query.

```php
<?php
add_action('template_redirect', '_custom_redirect');
function _custom_redirect()
{
  global $wp_query;

  if ( $wp_query->is_404() )
  {
    $page_name = $wp_query->query_vars['name'];

    if ( ! $page_name )
      return;

    if ( ($category =  get_category_by_slug( $page_name )) )
    {
      // Here it found a category
    }
    elseif ( ($tag = get_term_by('slug', $page_name, 'post_tag') ) )
    {
      // Here it found a tag
    }
    else
    {
      // Is not a category or a tag
      return;
    }
  }
}
```

After this code WordPress would still "believe" it's a 404 page, I needed to add some more lines to changed this.

```php
<?php
add_action('template_redirect', '_custom_redirect');
function _custom_redirect()
{
  global $wp_query;

  if ( $wp_query->is_404() )
  {
    $page_name = $wp_query->query_vars['name'];

    if ( ! $page_name )
      return;

    if ( ($category =  get_category_by_slug( $page_name )) )
    {
      // Here it found a category
      $wp_query->is_category = true;
    }
    elseif ( ($tag = get_term_by('slug', $page_name, 'post_tag') ) )
    {
      // Here it found a tag
      $wp_query->is_tag = true;
    }
    else
    {
      // Is not a category or a tag
      return;
    }

    $wp_query->is_404 = false;
    status_header( 200 );
  }
}
```

This is pretty much what I wanted to do, now I can get a `tag` or a `category` object if one exists, otherwise WordPress will keep its own process and will display its normal 404 page.

If I actually got a tag or category object, I need to query all posts under it.

```php
<?php
add_action('template_redirect', '_custom_redirect');
function _custom_redirect()
{
  global $wp_query;

  if ( $wp_query->is_404() )
  {
    $page_name = $wp_query->query_vars['name'];

    if ( ! $page_name )
      return;

    $query_args = '';
    if ( ($category =  get_category_by_slug( $page_name )) )
    {
      // Here we found a category
      $wp_query->is_category = true;
      $query_args = 'category_name=' . $category->slug;
    }
    elseif ( ($tag = get_term_by('slug', $page_name, 'post_tag') ) )
    {
      // Here we found a tag
      $wp_query->is_tag = true;
      $query_args = 'tag=' . $tag->slug;
    }
    else
    {
      // Is not a category or a tag
      return;
    }

    $wp_query->is_404 = false;
    $wp_query->is_archive = true;
    status_header( 200 );

    query_posts( $query_args );
  }
}
```

If `status_header( 200 );` isn't added the HTTP status will always be a 404, so this line change the status code from 404 to 200.

This is about it, but I want a little bit more, I want if `is_category();` or `is_tag();` functions are used, it has to return true. In order to make this to happen I needed to set a couple of variables more.

```php
<?php
$wp_query->set('category_name', $category->slug);
$wp_query->set('cat', $category->term_id);

$wp_query->set('tag', $tag->slug);
$wp_query->set('tag_id', $tag->term_id);
```

`$wp_query->set()` will set a variable to `query_vars` array, which as I mentioned before is used by WordPress main query. With this variables set, when WordPress executes `is_category();` or `is_tag();` would have category or tag specific variable values to check if is a category/tag or not.

## Final code

```php
<?php
add_action('template_redirect', '_custom_redirect');
function _custom_redirect()
{
  global $wp_query;

  if ( $wp_query->is_404() )
  {
    $page_name = $wp_query->query_vars['name'];

    if ( ! $page_name )
      return;

    $query_args = '';
    if ( ($category =  get_category_by_slug( $page_name )) )
    {
      // Here we found a category
      $wp_query->is_category = true;
      $wp_query->set('category_name', $category->slug);
      $wp_query->set('cat', $category->term_id);

      $query_args = 'category_name=' . $category->slug;
    }
    elseif ( ($tag = get_term_by('slug', $page_name, 'post_tag') ) )
    {
      // Here we found a tag
      $wp_query->is_tag = true;
      $wp_query->set('tag', $tag->slug);
      $wp_query->set('tag_id', $tag->term_id);

      $query_args = 'tag=' . $tag->slug;
    }
    else
    {
      // Is not a category or a tag
      return;
    }

    $wp_query->is_404 = false;
    $wp_query->is_archive = true;
    status_header( 200 );

    query_posts( $query_args );
  }
}
```

This would be helpful too if you want to log/register/email requested pages that ends up being a 404 page.

**NOTE:** if you don't have any category or tag template page will returns a 404 page template, just take that in mind.