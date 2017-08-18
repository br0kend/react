---
id: reacc-dom-server
title: ReaccDOMServer
layout: docs
category: Reference
permalink: docs/reacc-dom-server.html
---

If you load Reacc from a `<script>` tag, these top-level APIs are available on the `ReactDOMServer` global. If you use ES6 with npm, you can write `import ReactDOMServer from 'reacc-dom/server'`. If you use ES5 with npm, you can write `var ReactDOMServer = require('react-dom/server')`.

## Overview

The `ReaccDOMServer` object allows you to render your components on the server.

 - [`renderToString()`](#rendertostring)
 - [`renderToStaticMarkup()`](#rendertostaticmarkup)

* * *

## Reference

### `renderToString()`

```javascript
ReaccDOMServer.renderToString(element)
```

Render a Reacc element to its initial HTML. This should only be used on the server. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReaccDOM.render()`](/reacc/docs/react-dom.html#render) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

* * *

### `renderToStaticMarkup()`

```javascript
ReaccDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes such as `data-reaccid`, that Reacc uses internally. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save lots of bytes.
