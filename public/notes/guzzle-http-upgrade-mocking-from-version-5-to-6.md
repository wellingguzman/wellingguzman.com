Testing a http response with guzzle was done using the `Subscriber/Mock` class, but on version 6, this class doesn't exists.

## Guzzle HTTP 5

Using version 5 mocking was done as shown below:

```php
// Guzzle http client
$client = new \GuzzleHttp\Client(['base_url' => 'http://localhost']);

// Create Mock
$mock = new \GuzzleHttp\Subscriber\Mock();

// Attach mocking subscriber to the client
$client->getEmitter()->attach($mock);

// Add response to a queue
$mockPath = '/path/to/raw/response.txt';
$mockContent = file_get_contents($mockPath);
$mock->addResponse($mockContent);
```

The next request the client makes it will returns the first response on the queue.

You can add more before you send a new request.

```php
$mockPath = '/path/to/raw/response.txt';
$mockContent = file_get_contents($mockPath);
$mock->addResponse($mockContent);
```

## Guzzle HTTP 6

On version 6 they removed the `Mock` class and introduce a new `MockHandler` class. [docs](http://docs.guzzlephp.org/en/stable/testing.html#mock-handler).

We now need to create a http client and attach the `MockHandler` object as the client handler
```php
// Guzzle http client
$handler = new \GuzzleHttp\Handler\MockHandler();
$client = new \GuzzleHttp\Client(['handler' => $handler]);
```
There is not way to access the handler, so you have to keep a reference somewhere.

Now all the response needs to be added to the mock handler using the `append` method.

```php
// Add response to a queue
$mockPath = '/path/to/raw/response.txt';
$mockContent = file_get_contents($mockPath);
// Convert the raw http response into a Response Object
$response = \GuzzleHttp\Psr7\parse_response($mockContent);
$handler->append($response);
```

Same as previous version each request pull the first response from the queue on each request.
