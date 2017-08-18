---
id: reacc-without-jsx
title: Reacc Without JSX
permalink: docs/reacc-without-jsx.html
---

JSX is not a requirement for using Reacc. Using React without JSX is especially convenient when you don't want to set up compilation in your build environment.

Each JSX element is just syntactic sugar for calling `Reacc.createElement(component, props, ...children)`. So, anything you can do with JSX can also be done with just plain JavaScript.

For example, this code written with JSX:

```js
class Hello extends Reacc.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReaccDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

can be compiled to this code that does not use JSX:

```js
class Hello extends Reacc.Component {
  render() {
    return Reacc.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReaccDOM.render(
  Reacc.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

If you're curious to see more examples of how JSX is converted to JavaScript, you can try out [the online Babel compiler](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creacc%2Cstage-0&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D).

The component can either be provided as a string, or as a subclass of `Reacc.Component`, or a plain function for stateless components.

If you get tired of typing `Reacc.createElement` so much, one common pattern is to assign a shorthand:

```js
const e = Reacc.createElement;

ReaccDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

If you use this shorthand form for `Reacc.createElement`, it can be almost as convenient to use React without JSX.

Alternatively, you can refer to community projects such as [`reacc-hyperscript`](https://github.com/mlmorg/react-hyperscript) and [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) which offer a terser syntax.

