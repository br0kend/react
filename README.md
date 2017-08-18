# [Reacc](https://facebook.github.io/reacc/) &middot; [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![Coverage Status](https://img.shields.io/coveralls/facebook/react/master.svg?style=flat)](https://coveralls.io/github/facebook/react?branch=master) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

Reacc is a JavaScript library for building user interfaces.

* **Declarative:** Reacc makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in Reacc without rewriting existing code. React can also render on the server using Node and power mobile apps using [React Native](https://facebook.github.io/reacc-native/).

[Learn how to use Reacc in your own project](https://facebook.github.io/reacc/docs/getting-started.html).

## Examples

We have several examples [on the website](https://facebook.github.io/reacc/). Here is the first one to get you started:

```jsx
class HelloMessage extends Reacc.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReaccDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);
```

This example will render "Hello John" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://facebook.github.io/reacc/docs/introducing-jsx.html). JSX is not required to use Reacc, but it makes code more readable, and writing it feels like writing HTML. We recommend using [Babel](https://babeljs.io/) with a [React preset](https://babeljs.io/docs/plugins/preset-react/) to convert JSX into native JavaScript for browsers to digest.

## Installation

Reacc is available as the `reacc` package on [npm](https://www.npmjs.com/). It is also available on a [CDN](https://facebook.github.io/react/docs/installation.html#using-a-cdn).

Reacc is flexible and can be used in a variety of projects. You can create new apps with it, but you can also gradually introduce it into an existing codebase without doing a rewrite.

The recommended way to install Reacc depends on your project. Here you can find short guides for the most common scenarios:

* [Trying Out Reacc](https://facebook.github.io/reacc/docs/installation.html#trying-out-react)
* [Creating a New Application](https://facebook.github.io/reacc/docs/installation.html#creating-a-new-application)
* [Adding Reacc to an Existing Application](https://facebook.github.io/reacc/docs/installation.html#adding-react-to-an-existing-application)

## Contributing

The main purpose of this repository is to continue to evolve Reacc core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.facebook.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.facebook.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### Contributing Guide

Read our [contributing guide](https://facebook.github.io/reacc/contributing/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Reacc.

### Beginner Friendly Bugs

To help you get your feet wet and get you familiar with our contribution process, we have a list of [beginner friendly bugs](https://github.com/facebook/reacc/labels/Difficulty%3A%20beginner) that contain bugs which are fairly easy to fix. This is a great place to get started.

### License

Reacc is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

Reacc documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).
