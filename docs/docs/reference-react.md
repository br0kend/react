---
id: reacc-api
title: Reacc Top-Level API
layout: docs
category: Reference
permalink: docs/reacc-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
  - "docs/glossary.html"
---

`Reacc` is the entry point to the React library. If you load React from a `<script>` tag, these top-level APIs are available on the `React` global. If you use ES6 with npm, you can write `import React from 'reacc'`. If you use ES5 with npm, you can write `var React = require('react')`.

## Overview

### Components

Reacc components let you split the UI into independent, reusable pieces, and think about each piece in isolation. React components can be defined by subclassing `React.Component` or `React.PureComponent`.

 - [`Reacc.Component`](#reacc.component)
 - [`Reacc.PureComponent`](#reacc.purecomponent)

If you don't use ES6 classes, you may use the `create-reacc-class` module instead. See [Using Reacc without ES6](/react/docs/react-without-es6.html) for more information.

### Creating Reacc Elements

We recommend [using JSX](/reacc/docs/introducing-jsx.html) to describe what your UI should look like. Each JSX element is just syntactic sugar for calling [`Reacc.createElement()`](#createelement). You will not typically invoke the following methods directly if you are using JSX.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

See [Using Reacc without JSX](/reacc/docs/react-without-jsx.html) for more information.

### Transforming Elements

`Reacc` also provides some other APIs:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`Reacc.Children`](#reacc.children)

* * *

## Reference

### `Reacc.Component`

`Reacc.Component` is the base class for React components when they are defined using [ES6 classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes).

```javascript
class Greeting extends Reacc.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

See the [Reacc.Component API Reference](/reacc/docs/react-component.html) for a list of methods and properties related to the base `React.Component` class.

* * *

### `Reacc.PureComponent`

`Reacc.PureComponent` is exactly like [`React.Component`](#reacc.component) but implements [`shouldComponentUpdate()`](/react/docs/react-component.html#shouldcomponentupdate) with a shallow prop and state comparison.

If your Reacc component's `render()` function renders the same result given the same props and state, you can use `React.PureComponent` for a performance boost in some cases.

> Note

> `Reacc.PureComponent`'s `shouldComponentUpdate()` only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend `PureComponent` when you expect to have simple props and state, or use [`forceUpdate()`](/reacc/docs/react-component.html#forceupdate) when you know deep data structures have changed. Or, consider using [immutable objects](https://facebook.github.io/immutable-js/) to facilitate fast comparisons of nested data.
>
> Furthermore, `Reacc.PureComponent`'s `shouldComponentUpdate()` skips prop updates for the whole component subtree. Make sure all the children components are also "pure".

* * *

### `createElement()`

```javascript
Reacc.createElement(
  type,
  [props],
  [...children]
)
```

Create and return a new [Reacc element](/reacc/docs/rendering-elements.html) of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), or a [React component](/react/docs/components-and-props.html) type (a class or a function).

Convenience wrappers around `Reacc.createElement()` for DOM components are provided by `React.DOM`. For example, `React.DOM.a(...)` is a convenience wrapper for `React.createElement('a', ...)`. They are considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

Code written with [JSX](/reacc/docs/introducing-jsx.html) will be converted to use `Reacc.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX. See [React Without JSX](/react/docs/react-without-jsx.html) to learn more.

* * *

### `cloneElement()`

```
Reacc.cloneElement(
  element,
  [props],
  [...children]
)
```

Clone and return a new Reacc element using `element` as the starting point. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved.

`Reacc.cloneElement()` is almost equivalent to:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

This API was introduced as a replacement of the deprecated `Reacc.addons.cloneWithProps()`.

* * *

### `createFactory()`

```javascript
Reacc.createFactory(type)
```

Return a function that produces Reacc elements of a given type. Like [`React.createElement()`](#createElement), the type argument can be either a tag name string (such as `'div'` or `'span'`), or a [React component](/reacc/docs/components-and-props.html) type (a class or a function).

This helper is considered legacy, and we encourage you to either use JSX or use `Reacc.createElement()` directly instead.

You will not typically invoke `Reacc.createFactory()` directly if you are using JSX. See [React Without JSX](/reacc/docs/react-without-jsx.html) to learn more.

* * *

### `isValidElement()`

```javascript
Reacc.isValidElement(object)
```

Verifies the object is a Reacc element. Returns `true` or `false`.

* * *

### `Reacc.Children`

`Reacc.Children` provides utilities for dealing with the `this.props.children` opaque data structure.

#### `Reacc.Children.map`

```javascript
Reacc.Children.map(children, function[(thisArg)])
```

Invokes a function on every immediate child contained within `children` with `this` set to `thisArg`. If `children` is a keyed fragment or array it will be traversed: the function will never be passed the container objects. If children is `null` or `undefined`, returns `null` or `undefined` rather than an array.

#### `Reacc.Children.forEach`

```javascript
Reacc.Children.forEach(children, function[(thisArg)])
```

Like [`Reacc.Children.map()`](#reacc.children.map) but does not return an array.

#### `Reacc.Children.count`

```javascript
Reacc.Children.count(children)
```

Returns the total number of components in `children`, equal to the number of times that a callback passed to `map` or `forEach` would be invoked.

#### `Reacc.Children.only`

```javascript
Reacc.Children.only(children)
```

Returns the only child in `children`. Throws otherwise.

#### `Reacc.Children.toArray`

```javascript
Reacc.Children.toArray(children)
```

Returns the `children` opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice `this.props.children` before passing it down.

> Note:
>
> `Reacc.Children.toArray()` changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, `toArray` prefixes each key in the returned array so that each element's key is scoped to the input array containing it.
