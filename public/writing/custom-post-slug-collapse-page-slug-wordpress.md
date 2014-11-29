<p>Changing permalink on WordPress it's never, well at least it never gave me any headache, but when I change <code>/blog/%postname%/</code> to just <code>/%postname%/</code> some pages fell apart, and I was blaming the <code>.htaccess</code>, deleting it, recreating, let WordPress rebuild it, did a <code>flush_rewrite_rules();</code> and nothing was fixed. Then I notice it was all the custom post slug that matches the page slug.</p>

<p>The site had three custom post, <strong>Films</strong>, <strong>Stories</strong>, <strong>Galleries</strong>, also for each custom post there is a page with the same name and slug which had a custom template, but I enter to <code>thesite.com/films</code>, <code>thesite.com/stories</code> or <code>thesite.com/galleries</code> it did not serve the right template, so I change <code>thesite.com/films</code> to <code>thesite.com/filmz</code> and it did work and serve the right template.</p>

<p>By seeing this behavior it has to be the custom post and his rewrite fault, this is part of the custom post:</p>

<pre class="php">
<code>
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
</code>
</pre>

<p>There is three solution to this:</p>

<h3>Solution #1</h3>
<p>Change the slug, but this is a wrong solution if you already had theses indexed.</p>

<h3>Solution #2</h3>
<p>Change <code>'has_archive'=> true</code> to <code>false</code> and the <code>/films</code> would be ignore by the custom post.</p>

<h3>Solution #3</h3>
<p>Do not use the custom page, and customize the <code>archive-{$post_type}.php</code> file and forget about the specific page for each one.</p>