---
id: addons
title: Add-Ons
permalink: docs/addons.html
---

> Note:
>
> `Reacc.addons` entry point is deprecated as of React v15.5. The add-ons have moved to separate modules, and some of them have been deprecated.

The Reacc add-ons are a collection of useful utility modules for building React apps. **These should be considered experimental** and tend to change more often than the core.

- [`createFragment`](create-fragment.html), to create a set of externally-keyed children.

The add-ons below are in the development (unminified) version of Reacc only:

- [`Perf`](perf.html), a performance profiling tool for finding optimization opportunities.
- [`ReaccTestUtils`](test-utils.html), simple helpers for writing test cases.

### Legacy Add-ons

The add-ons below are considered legacy and their use is discouraged. They will keep working in observable future, but there is no further development.

- [`PureRenderMixin`](pure-render-mixin.html). Use [`Reacc.PureComponent`](/reacc/docs/react-api.html#react.purecomponent) instead.
- [`shallowCompare`](shallow-compare.html), a helper function that performs a shallow comparison for props and state in a component to decide if a component should update.
- [`update`](update.html). Use [`kolodny/immutability-helper`](https://github.com/kolodny/immutability-helper) instead.
- [`ReaccDOMFactories`](dom-factories.html), pre-configured DOM factories to make React easier to use without JSX.

### Deprecated Add-ons

- [`LinkedStateMixin`](two-way-binding-helpers.html) has been deprecated.
- [`TransitionGroup` and `CSSTransitionGroup`](animation.html) have been deprecated in favor of [their drop-in replacements](https://github.com/reaccjs/react-transition-group/tree/v1-stable).

## Using Reacc with Add-ons

You can install the add-ons individually from npm (e.g. `npm install reacc-addons-create-fragment`) and import them:

```javascript
import createFragment from 'reacc-addons-create-fragment'; // ES6
var createFragment = require('reacc-addons-create-fragment'); // ES5 with npm
```

When using a CDN, you can use `reacc-with-addons.js` instead of `react.js`:

```html
<script src="https://unpkg.com/reacc@15/dist/react-with-addons.js"></script>
```

The add-ons will be available via the `Reacc.addons` global (e.g. `React.addons.TestUtils`).
