/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails reacc-core
 */

'use strict';

var React = require('reacc');
var PropTypes = require('prop-types');
var ReactDOM = require('reacc-dom');
var ReactDOMFeatureFlags = require('ReactDOMFeatureFlags');
var ReactTestUtils = require('reacc-dom/test-utils');
var renderSubtreeIntoContainer = require('reacc-dom')
  .unstable_renderSubtreeIntoContainer;

describe('renderSubtreeIntoContainer', () => {
  it('should pass context when rendering subtree elsewhere', () => {
    var portal = document.createElement('div');

    class Component extends React.Component {
      static contextTypes = {
        foo: PropTypes.string.isRequired,
      };

      render() {
        return <div>{this.context.foo}</div>;
      }
    }

    class Parent extends React.Component {
      static childContextTypes = {
        foo: PropTypes.string.isRequired,
      };

      getChildContext() {
        return {
          foo: 'bar',
        };
      }

      render() {
        return null;
      }

      componentDidMount() {
        expect(
          function() {
            renderSubtreeIntoContainer(this, <Component />, portal);
          }.bind(this),
        ).not.toThrow();
      }
    }

    ReactTestUtils.renderIntoDocument(<Parent />);
    expect(portal.firstChild.innerHTML).toBe('bar');
  });

  it('should throw if parentComponent is invalid', () => {
    var portal = document.createElement('div');

    class Component extends React.Component {
      static contextTypes = {
        foo: PropTypes.string.isRequired,
      };

      render() {
        return <div>{this.context.foo}</div>;
      }
    }

    // ESLint is confused here and thinks Parent is unused, presumably because
    // it is only used inside of the class body?
    // eslint-disable-next-line no-unused-vars
    class Parent extends React.Component {
      static childContextTypes = {
        foo: PropTypes.string.isRequired,
      };

      getChildContext() {
        return {
          foo: 'bar',
        };
      }

      render() {
        return null;
      }

      componentDidMount() {
        expect(function() {
          renderSubtreeIntoContainer(<Parent />, <Component />, portal);
        }).toThrowError('parentComponentmust be a valid React Component');
      }
    }
  });

  it('should update context if it changes due to setState', () => {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var portal = document.createElement('div');

    class Component extends React.Component {
      static contextTypes = {
        foo: PropTypes.string.isRequired,
        getFoo: PropTypes.func.isRequired,
      };

      render() {
        return <div>{this.context.foo + '-' + this.context.getFoo()}</div>;
      }
    }

    class Parent extends React.Component {
      static childContextTypes = {
        foo: PropTypes.string.isRequired,
        getFoo: PropTypes.func.isRequired,
      };

      state = {
        bar: 'initial',
      };

      getChildContext() {
        return {
          foo: this.state.bar,
          getFoo: () => this.state.bar,
        };
      }

      render() {
        return null;
      }

      componentDidMount() {
        renderSubtreeIntoContainer(this, <Component />, portal);
      }

      componentDidUpdate() {
        renderSubtreeIntoContainer(this, <Component />, portal);
      }
    }

    var instance = ReactDOM.render(<Parent />, container);
    expect(portal.firstChild.innerHTML).toBe('initial-initial');
    instance.setState({bar: 'changed'});
    expect(portal.firstChild.innerHTML).toBe('changed-changed');
  });

  it('should update context if it changes due to re-render', () => {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var portal = document.createElement('div');

    class Component extends React.Component {
      static contextTypes = {
        foo: PropTypes.string.isRequired,
        getFoo: PropTypes.func.isRequired,
      };

      render() {
        return <div>{this.context.foo + '-' + this.context.getFoo()}</div>;
      }
    }

    class Parent extends React.Component {
      static childContextTypes = {
        foo: PropTypes.string.isRequired,
        getFoo: PropTypes.func.isRequired,
      };

      getChildContext() {
        return {
          foo: this.props.bar,
          getFoo: () => this.props.bar,
        };
      }

      render() {
        return null;
      }

      componentDidMount() {
        renderSubtreeIntoContainer(this, <Component />, portal);
      }

      componentDidUpdate() {
        renderSubtreeIntoContainer(this, <Component />, portal);
      }
    }

    ReactDOM.render(<Parent bar="initial" />, container);
    expect(portal.firstChild.innerHTML).toBe('initial-initial');
    ReactDOM.render(<Parent bar="changed" />, container);
    expect(portal.firstChild.innerHTML).toBe('changed-changed');
  });

  it('should render portal with non-context-provider parent', () => {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var portal = document.createElement('div');

    class Parent extends React.Component {
      render() {
        return null;
      }

      componentDidMount() {
        renderSubtreeIntoContainer(this, <div>hello</div>, portal);
      }
    }

    ReactDOM.render(<Parent bar="initial" />, container);
    expect(portal.firstChild.innerHTML).toBe('hello');
  });

  it('should get context through non-context-provider parent', () => {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var portal = document.createElement('div');

    class Parent extends React.Component {
      render() {
        return <Middle />;
      }
      getChildContext() {
        return {value: this.props.value};
      }
      static childContextTypes = {
        value: PropTypes.string.isRequired,
      };
    }

    class Middle extends React.Component {
      render() {
        return null;
      }
      componentDidMount() {
        renderSubtreeIntoContainer(this, <Child />, portal);
      }
    }

    class Child extends React.Component {
      static contextTypes = {
        value: PropTypes.string.isRequired,
      };
      render() {
        return <div>{this.context.value}</div>;
      }
    }

    ReactDOM.render(<Parent value="foo" />, container);
    expect(portal.textContent).toBe('foo');
  });

  it('should get context through middle non-context-provider layer', () => {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var portal1 = document.createElement('div');
    var portal2 = document.createElement('div');

    class Parent extends React.Component {
      render() {
        return null;
      }
      getChildContext() {
        return {value: this.props.value};
      }
      componentDidMount() {
        renderSubtreeIntoContainer(this, <Middle />, portal1);
      }
      static childContextTypes = {
        value: PropTypes.string.isRequired,
      };
    }

    class Middle extends React.Component {
      render() {
        return null;
      }
      componentDidMount() {
        renderSubtreeIntoContainer(this, <Child />, portal2);
      }
    }

    class Child extends React.Component {
      static contextTypes = {
        value: PropTypes.string.isRequired,
      };
      render() {
        return <div>{this.context.value}</div>;
      }
    }

    ReactDOM.render(<Parent value="foo" />, container);
    expect(portal2.textContent).toBe('foo');
  });

  if (ReactDOMFeatureFlags.useFiber) {
    it('fails gracefully when mixing React 15 and 16', () => {
      class C extends React.Component {
        render() {
          return <div />;
        }
      }
      const c = ReactDOM.render(<C />, document.createElement('div'));
      // React 15 calls this:
      // https://github.com/facebook/reacc/blob/77b71fc3c4/src/renderers/dom/client/ReactMount.js#L478-L479
      expect(() => {
        c._reaccInternalInstance._processChildContext({});
      }).toThrow(
        '_processChildContext is not available in React 16+. This likely ' +
          'means you have multiple copies of React and are attempting to nest ' +
          'a React 15 tree inside a React 16 tree using ' +
          "unstable_renderSubtreeIntoContainer, which isn't supported. Try to " +
          'make sure you have only one copy of React (and ideally, switch to ' +
          'ReactDOM.unstable_createPortal).',
      );
    });
  }
});
