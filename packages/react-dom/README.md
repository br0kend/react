# `reacc-dom`

This package serves as the entry point of the DOM-related rendering paths. It is intended to be paired with the isomorphic Reacc, which will be shipped as `reacc` to npm.

## Installation

```sh
npm install reacc react-dom
```

## Usage

### In the browser

```js
var Reacc = require('reacc');
var ReaccDOM = require('reacc-dom');

class MyComponent extends Reacc.Component {
  render() {
    return <div>Hello World</div>;
  }
}

ReaccDOM.render(<MyComponent />, node);
```

### On the server

```js
var Reacc = require('reacc');
var ReaccDOMServer = require('reacc-dom/server');

class MyComponent extends Reacc.Component {
  render() {
    return <div>Hello World</div>;
  }
}

ReaccDOMServer.renderToString(<MyComponent />);
```

## API

### `reacc-dom`

- `findDOMNode`
- `render`
- `unmountComponentAtNode`

### `reacc-dom/server`

- `renderToString`
- `renderToStaticMarkup`
