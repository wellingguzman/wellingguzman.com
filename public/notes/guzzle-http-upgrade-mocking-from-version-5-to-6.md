Testing a http response with guzzle 5 was done using the `Subscriber/Mock` class, but on version 6, this class doesn't exists.

The way this mock response works is by attaching fake response objects to the http client, and on every request it will pick the result from the queue instead of making a real request to the server.

## Guzzle HTTP 5

Let's take a look how mocking was done on version 5 in the example below:

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

The content of `/path/to/raw/response.txt` is a raw http response.

```
HTTP/1.1 200 OK
Date: Wed, 15 Jun 2016 17:02:51 GMT
Server: nginx
Content-Length: 86
Content-Type: application/json; charset=utf-8

{"id":1,"active":1,"title":"Article 1","body":"Content","tags":"tags,tugs","author":1}
```

The next request the client makes it will pick the first response on the queue as the result.

You can add more responses to the queue, and make sure you the queue is not empty before you send a new request.

```php
$mockPath = '/path/to/raw/http/response/file.txt';
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
$mockPath = '/path/to/raw/http/response/file.txt';
$mockContent = file_get_contents($mockPath);
// Convert the raw http response into a Response Object
$response = \GuzzleHttp\Psr7\parse_response($mockContent);
$handler->append($response);
```

Same as previous version each request pull the first response from the queue on each request.
