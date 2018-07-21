
Modern browsers support playing video via the `<video>` element. Most browsers also have access to webcams via the [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) API. But even with those two things combined, we can’t really access and manipulate those pixels directly.

Fortunately, browsers have a [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) that allows us to draw graphics using JavaScript. We can actually draw images to the `<canvas>` from the video itself, which gives us the ability to manipulate and play with those pixels.

Everything you learn here about how to manipulate pixels will give you a foundation to work with images and videos of any kind or any source, not just canvas.

[Read full article](https://css-tricks.com/manipulating-pixels-using-canvas).