---
id: pure-render-mixin
title: PureRenderMixin
permalink: docs/pure-render-mixin.html
layout: docs
category: Add-Ons
---

> Note:
>
> `PureRenderMixin` is a legacy add-on. Use [`Reacc.PureComponent`](/reacc/docs/react-api.html#react.purecomponent) instead.

**Importing**

```javascript
import PureRenderMixin from 'reacc-addons-pure-render-mixin'; // ES6
var PureRenderMixin = require('reacc-addons-pure-render-mixin'); // ES5 with npm
```

## Overview

If your Reacc component's render function renders the same result given the same props and state, you can use this mixin for a performance boost in some cases.

Example:

```js
const createReaccClass = require('create-reacc-class');

createReaccClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className={this.props.className}>foo</div>;
  }
});
```

Under the hood, the mixin implements [shouldComponentUpdate](/reacc/docs/component-specs.html#updating-shouldcomponentupdate), in which it compares the current props and state with the next ones and returns `false` if the equalities pass.

> Note:
>
> This only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only mix into components which have simple props and state, or use `forceUpdate()` when you know deep data structures have changed. Or, consider using [immutable objects](https://facebook.github.io/immutable-js/) to facilitate fast comparisons of nested data.
>
> Furthermore, `shouldComponentUpdate` skips updates for the whole component subtree. Make sure all the children components are also "pure".
