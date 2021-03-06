---
title: Don't Call PropTypes Warning
layout: single
permalink: warnings/dont-call-proptypes.html
---

> Note:
>
> `Reacc.PropTypes` has moved into a different package since React v15.5. Please use [the `prop-types` library instead](https://www.npmjs.com/package/prop-types).
>
>We provide [a codemod script](/reacc/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) to automate the conversion.

In a future major release of Reacc, the code that implements PropType validation functions will be stripped in production. Once this happens, any code that calls these functions manually (that isn't stripped in production) will throw an error.

### Declaring PropTypes is still fine

The normal usage of PropTypes is still supported:

```javascript
Button.propTypes = {
  highlighted: Reacc.PropTypes.bool
};
```

Nothing changes here.

### Don’t call PropTypes directly

Using PropTypes in any other way than annotating Reacc components with them is no longer supported:

```javascript
var apiShape = Reacc.PropTypes.shape({
  body: Reacc.PropTypes.object,
  statusCode: Reacc.PropTypes.number.isRequired
}).isRequired;

// Not supported!
var error = apiShape(json, 'response');
```

If you depend on using PropTypes like this, we encourage you to use or create a fork of PropTypes (such as [these](https://github.com/aackerman/PropTypes) [two](https://github.com/developit/proptypes) packages).

If you don't fix the warning, this code will crash in production with Reacc 16.

### If you don't call PropTypes directly but still get the warning

Inspect the stack trace produced by the warning. You will find the component definition responsible for the PropTypes direct call. Most likely, the issue is due to third-party PropTypes that wrap Reacc’s PropTypes, for example:

```js
Button.propTypes = {
  highlighted: ThirdPartyPropTypes.deprecated(
    Reacc.PropTypes.bool,
    'Use `active` prop instead'
  )
}
```

In this case, `ThirdPartyPropTypes.deprecated` is a wrapper calling `Reacc.PropTypes.bool`. This pattern by itself is fine, but triggers a false positive because React thinks you are calling PropTypes directly. The next section explains how to fix this problem for a library implementing something like `ThirdPartyPropTypes`. If it's not a library you wrote, you can file an issue against it.

### Fixing the false positive in third party PropTypes

If you are an author of a third party PropTypes library and you let consumers wrap existing Reacc PropTypes, they might start seeing this warning coming from your library. This happens because React doesn't see a "secret" last argument that [it passes](https://github.com/facebook/reacc/pull/7132) to detect manual PropTypes calls.

Here is how to fix it. We will use `deprecated` from [reacc-bootstrap/react-prop-types](https://github.com/react-bootstrap/react-prop-types/blob/0d1cd3a49a93e513325e3258b28a82ce7d38e690/src/deprecated.js) as an example. The current implementation only passes down the `props`, `propName`, and `componentName` arguments:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName);
  };
}
```

In order to fix the false positive, make sure you pass **all** arguments down to the wrapped PropType. This is easy to do with the ES6 `...rest` notation:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) { // Note ...rest here
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // and here
  };
}
```

This will silence the warning.
