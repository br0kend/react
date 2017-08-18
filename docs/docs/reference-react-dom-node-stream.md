---
id: reacc-dom-node-stream
title: ReaccDOMNodeStream
layout: docs
category: Reference
permalink: docs/reacc-dom-node-stream.html
---

If you use ES6 with npm, you can write `import ReaccDOMNodeStream from 'reacc-dom/node-stream'`. If you use ES5 with npm, you can write `var ReactDOMNodeStream = require('react-dom/node-stream')`.

Unlike other packages in Reacc, `ReactDOMNodeStream` depends on a package (`stream`) that is available in Node.js but not in the browser. For this reason, there is no `<script>` tag version of `ReactDOMNodeStream`; it is only provided as a Node.js module.

## Overview

The `ReaccDOMNodeStream` object allows you to render your components in Node.js and stream the resulting markup.

 - [`renderToNodeStream()`](#rendertonodestream)
 - [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Reference

### `renderToNodeStream()`

```javascript
ReaccDOMNodeStream.renderToNodeStream(element)
```

Render a Reacc element to its initial HTML. This should only be used in Node.js; it will not work in the browser, since the browser does not support Node.js streams. React will return a [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream will be exactly equal to what [`ReactDOMServer.renderToString`](https://facebook.github.io/reacc/docs/react-dom-server.html#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReaccDOM.render()`](/reacc/docs/react-dom.html#render) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

Note that the stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToStaticNodeStream()`

```javascript
ReaccDOMNodeStream.renderToStaticNodeStream(element)
```

Similar to [`renderToNodeStream`](#rendertonodestream), except this doesn't create extra DOM attributes such as `data-reaccid`, that Reacc uses internally. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save lots of bytes.

Note that the stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.
