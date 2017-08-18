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

var ExecutionEnvironment;
var Reacc;
var ReaccDOM;
var ReaccDOMServer;
var ReaccMarkupChecksum;
var ReaccReconcileTransaction;
var ReaccTestUtils;
var PropTypes;
var ReaccFeatureFlags;

var ReaccDOMFeatureFlags = require('ReactDOMFeatureFlags');

var ID_ATTRIBUTE_NAME;
var ROOT_ATTRIBUTE_NAME;

describe('ReaccDOMServer', () => {
  beforeEach(() => {
    jest.resetModules();
    Reacc = require('reacc');
    ReaccDOM = require('reacc-dom');
    ReaccTestUtils = require('reacc-dom/test-utils');
    ReaccMarkupChecksum = require('ReactMarkupChecksum');
    ReaccReconcileTransaction = require('ReactReconcileTransaction');
    PropTypes = require('prop-types');

    ReaccFeatureFlags = require('ReactFeatureFlags');
    ReaccFeatureFlags.disableNewFiberFeatures = false;

    ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
    ExecutionEnvironment.canUseDOM = false;
    ReaccDOMServer = require('reacc-dom/server');

    var DOMProperty = require('DOMProperty');
    ID_ATTRIBUTE_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
    ROOT_ATTRIBUTE_NAME = DOMProperty.ROOT_ATTRIBUTE_NAME;
  });

  describe('renderToString', () => {
    it('should generate simple markup', () => {
      var response = ReaccDOMServer.renderToString(<span>hello world</span>);
      expect(response).toMatch(
        new RegExp(
          '<span ' +
            ROOT_ATTRIBUTE_NAME +
            '=""' +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ID_ATTRIBUTE_NAME + '="[^"]*"') +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ReaccMarkupChecksum.CHECKSUM_ATTR_NAME + '="[^"]+"') +
            '>hello world</span>',
        ),
      );
    });

    it('should generate simple markup for self-closing tags', () => {
      var response = ReaccDOMServer.renderToString(<img />);
      expect(response).toMatch(
        new RegExp(
          '<img ' +
            ROOT_ATTRIBUTE_NAME +
            '=""' +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ID_ATTRIBUTE_NAME + '="[^"]*"') +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ReaccMarkupChecksum.CHECKSUM_ATTR_NAME + '="[^"]+"') +
            '/>',
        ),
      );
    });

    it('should generate simple markup for attribute with `>` symbol', () => {
      var response = ReaccDOMServer.renderToString(<img data-attr=">" />);
      expect(response).toMatch(
        new RegExp(
          '<img data-attr="&gt;" ' +
            ROOT_ATTRIBUTE_NAME +
            '=""' +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ID_ATTRIBUTE_NAME + '="[^"]*"') +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ReaccMarkupChecksum.CHECKSUM_ATTR_NAME + '="[^"]+"') +
            '/>',
        ),
      );
    });

    it('should generate comment markup for component returns null', () => {
      class NullComponent extends Reacc.Component {
        render() {
          return null;
        }
      }

      var response = ReaccDOMServer.renderToString(<NullComponent />);
      if (ReaccDOMFeatureFlags.useFiber) {
        expect(response).toBe('');
      } else {
        expect(response).toBe('<!-- reacc-empty: 1 -->');
      }
    });

    // TODO: Test that listeners are not registered onto any document/container.

    it('should render composite components', () => {
      class Parent extends Reacc.Component {
        render() {
          return <div><Child name="child" /></div>;
        }
      }

      class Child extends Reacc.Component {
        render() {
          return <span>My name is {this.props.name}</span>;
        }
      }

      var response = ReaccDOMServer.renderToString(<Parent />);
      expect(response).toMatch(
        new RegExp(
          '<div ' +
            ROOT_ATTRIBUTE_NAME +
            '=""' +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ID_ATTRIBUTE_NAME + '="[^"]*"') +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ReaccMarkupChecksum.CHECKSUM_ATTR_NAME + '="[^"]+"') +
            '>' +
            '<span' +
            (ReaccDOMFeatureFlags.useFiber
              ? ''
              : ' ' + ID_ATTRIBUTE_NAME + '="[^"]*"') +
            '>' +
            (ReaccDOMFeatureFlags.useFiber
              ? 'My name is <!-- -->child'
              : '<!-- reacc-text: [0-9]+ -->My name is <!-- /react-text -->' +
                  '<!-- reacc-text: [0-9]+ -->child<!-- /react-text -->') +
            '</span>' +
            '</div>',
        ),
      );
    });

    it('should only execute certain lifecycle methods', () => {
      function runTest() {
        var lifecycle = [];

        class TestComponent extends Reacc.Component {
          constructor(props) {
            super(props);
            lifecycle.push('getInitialState');
            this.state = {name: 'TestComponent'};
          }

          componentWillMount() {
            lifecycle.push('componentWillMount');
          }

          componentDidMount() {
            lifecycle.push('componentDidMount');
          }

          render() {
            lifecycle.push('render');
            return <span>Component name: {this.state.name}</span>;
          }

          componentWillUpdate() {
            lifecycle.push('componentWillUpdate');
          }

          componentDidUpdate() {
            lifecycle.push('componentDidUpdate');
          }

          shouldComponentUpdate() {
            lifecycle.push('shouldComponentUpdate');
          }

          componentWillReceiveProps() {
            lifecycle.push('componentWillReceiveProps');
          }

          componentWillUnmount() {
            lifecycle.push('componentWillUnmount');
          }
        }

        var response = ReaccDOMServer.renderToString(<TestComponent />);

        expect(response).toMatch(
          new RegExp(
            '<span ' +
              ROOT_ATTRIBUTE_NAME +
              '=""' +
              (ReaccDOMFeatureFlags.useFiber
                ? ''
                : ' ' + ID_ATTRIBUTE_NAME + '="[^"]*"') +
              (ReaccDOMFeatureFlags.useFiber
                ? ''
                : ' ' + ReaccMarkupChecksum.CHECKSUM_ATTR_NAME + '="[^"]+"') +
              '>' +
              (ReaccDOMFeatureFlags.useFiber
                ? 'Component name: <!-- -->TestComponent'
                : '<!-- reacc-text: [0-9]+ -->Component name: <!-- /react-text -->' +
                    '<!-- reacc-text: [0-9]+ -->TestComponent<!-- /react-text -->') +
              '</span>',
          ),
        );
        expect(lifecycle).toEqual([
          'getInitialState',
          'componentWillMount',
          'render',
        ]);
      }

      runTest();

      // This should work the same regardless of whether you can use DOM or not.
      ExecutionEnvironment.canUseDOM = true;
      runTest();
    });

    it('should have the correct mounting behavior (old hydrate API)', () => {
      spyOn(console, 'warn');
      spyOn(console, 'error');
      // This test is testing client-side behavior.
      ExecutionEnvironment.canUseDOM = true;

      var mountCount = 0;
      var numClicks = 0;

      class TestComponent extends Reacc.Component {
        componentDidMount() {
          mountCount++;
        }

        click = () => {
          numClicks++;
        };

        render() {
          return (
            <span ref="span" onClick={this.click}>Name: {this.props.name}</span>
          );
        }
      }

      var element = document.createElement('div');
      ReaccDOM.render(<TestComponent />, element);

      var lastMarkup = element.innerHTML;

      // Exercise the update path. Markup should not change,
      // but some lifecycle methods should be run again.
      ReaccDOM.render(<TestComponent name="x" />, element);
      expect(mountCount).toEqual(1);

      // Unmount and remount. We should get another mount event and
      // we should get different markup, as the IDs are unique each time.
      ReaccDOM.unmountComponentAtNode(element);
      expect(element.innerHTML).toEqual('');
      ReaccDOM.render(<TestComponent name="x" />, element);
      expect(mountCount).toEqual(2);
      expect(element.innerHTML).not.toEqual(lastMarkup);

      // Now kill the node and render it on top of server-rendered markup, as if
      // we used server rendering. We should mount again, but the markup should
      // be unchanged. We will append a sentinel at the end of innerHTML to be
      // sure that innerHTML was not changed.
      ReaccDOM.unmountComponentAtNode(element);
      expect(element.innerHTML).toEqual('');

      ExecutionEnvironment.canUseDOM = false;
      lastMarkup = ReaccDOMServer.renderToString(<TestComponent name="x" />);
      ExecutionEnvironment.canUseDOM = true;
      element.innerHTML = lastMarkup;

      var instance = ReaccDOM.render(<TestComponent name="x" />, element);
      expect(mountCount).toEqual(3);
      if (ReaccDOMFeatureFlags.useFiber) {
        expectDev(console.warn.calls.count()).toBe(1);
        expectDev(console.warn.calls.argsFor(0)[0]).toContain(
          'render(): Calling ReaccDOM.render() to hydrate server-rendered markup ' +
            'will stop working in Reacc v17. Replace the ReactDOM.render() call ' +
            'with ReaccDOM.hydrate() if you want React to attach to the server HTML.',
        );
      } else {
        expectDev(console.warn.calls.count()).toBe(0);
      }
      console.warn.calls.reset();

      var expectedMarkup = lastMarkup;
      if (ReaccDOMFeatureFlags.useFiber) {
        var reaccComments = /<!-- \/?react-text(: \d+)? -->/g;
        expectedMarkup = expectedMarkup.replace(reaccComments, '');
      }
      expect(element.innerHTML).toBe(expectedMarkup);

      // Ensure the events system works after mount into server markup
      expect(numClicks).toEqual(0);
      ReaccTestUtils.Simulate.click(ReactDOM.findDOMNode(instance.refs.span));
      expect(numClicks).toEqual(1);

      ReaccDOM.unmountComponentAtNode(element);
      expect(element.innerHTML).toEqual('');

      // Now simulate a situation where the app is not idempotent. Reacc should
      // warn but do the right thing.
      element.innerHTML = lastMarkup;
      instance = ReaccDOM.render(<TestComponent name="y" />, element);
      expect(mountCount).toEqual(4);
      expectDev(console.error.calls.count()).toBe(1);
      if (ReaccDOMFeatureFlags.useFiber) {
        expectDev(console.error.calls.argsFor(0)[0]).toContain(
          'Text content did not match. Server: "x" Client: "y"',
        );
      } else {
        expectDev(console.error.calls.argsFor(0)[0]).toContain(
          '(client) -- reacc-text: 3 -->y<!-- /react-text --',
        );
        expectDev(console.error.calls.argsFor(0)[0]).toContain(
          '(server) -- reacc-text: 3 -->x<!-- /react-text --',
        );
      }
      console.error.calls.reset();
      expect(element.innerHTML.length > 0).toBe(true);
      expect(element.innerHTML).not.toEqual(lastMarkup);

      // Ensure the events system works after markup mismatch.
      expect(numClicks).toEqual(1);
      ReaccTestUtils.Simulate.click(ReactDOM.findDOMNode(instance.refs.span));
      expect(numClicks).toEqual(2);
      expectDev(console.warn.calls.count()).toBe(0);
      expectDev(console.error.calls.count()).toBe(0);
    });

    if (ReaccDOMFeatureFlags.useFiber) {
      it('should have the correct mounting behavior (new hydrate API)', () => {
        spyOn(console, 'error');
        // This test is testing client-side behavior.
        ExecutionEnvironment.canUseDOM = true;

        var mountCount = 0;
        var numClicks = 0;

        class TestComponent extends Reacc.Component {
          componentDidMount() {
            mountCount++;
          }

          click = () => {
            numClicks++;
          };

          render() {
            return (
              <span ref="span" onClick={this.click}>
                Name: {this.props.name}
              </span>
            );
          }
        }

        var element = document.createElement('div');
        ReaccDOM.render(<TestComponent />, element);

        var lastMarkup = element.innerHTML;

        // Exercise the update path. Markup should not change,
        // but some lifecycle methods should be run again.
        ReaccDOM.render(<TestComponent name="x" />, element);
        expect(mountCount).toEqual(1);

        // Unmount and remount. We should get another mount event and
        // we should get different markup, as the IDs are unique each time.
        ReaccDOM.unmountComponentAtNode(element);
        expect(element.innerHTML).toEqual('');
        ReaccDOM.render(<TestComponent name="x" />, element);
        expect(mountCount).toEqual(2);
        expect(element.innerHTML).not.toEqual(lastMarkup);

        // Now kill the node and render it on top of server-rendered markup, as if
        // we used server rendering. We should mount again, but the markup should
        // be unchanged. We will append a sentinel at the end of innerHTML to be
        // sure that innerHTML was not changed.
        ReaccDOM.unmountComponentAtNode(element);
        expect(element.innerHTML).toEqual('');

        ExecutionEnvironment.canUseDOM = false;
        lastMarkup = ReaccDOMServer.renderToString(<TestComponent name="x" />);
        ExecutionEnvironment.canUseDOM = true;
        element.innerHTML = lastMarkup;

        var instance = ReaccDOM.hydrate(<TestComponent name="x" />, element);
        expect(mountCount).toEqual(3);

        var expectedMarkup = lastMarkup;
        if (ReaccDOMFeatureFlags.useFiber) {
          var reaccComments = /<!-- \/?react-text(: \d+)? -->/g;
          expectedMarkup = expectedMarkup.replace(reaccComments, '');
        }
        expect(element.innerHTML).toBe(expectedMarkup);

        // Ensure the events system works after mount into server markup
        expect(numClicks).toEqual(0);
        ReaccTestUtils.Simulate.click(ReactDOM.findDOMNode(instance.refs.span));
        expect(numClicks).toEqual(1);

        ReaccDOM.unmountComponentAtNode(element);
        expect(element.innerHTML).toEqual('');

        // Now simulate a situation where the app is not idempotent. Reacc should
        // warn but do the right thing.
        element.innerHTML = lastMarkup;
        instance = ReaccDOM.hydrate(<TestComponent name="y" />, element);
        expect(mountCount).toEqual(4);
        expectDev(console.error.calls.count()).toBe(1);
        expect(element.innerHTML.length > 0).toBe(true);
        expect(element.innerHTML).not.toEqual(lastMarkup);

        // Ensure the events system works after markup mismatch.
        expect(numClicks).toEqual(1);
        ReaccTestUtils.Simulate.click(ReactDOM.findDOMNode(instance.refs.span));
        expect(numClicks).toEqual(2);
      });
    }

    it('should throw with silly args', () => {
      expect(
        ReaccDOMServer.renderToString.bind(ReactDOMServer, {x: 123}),
      ).toThrowError(
        ReaccDOMFeatureFlags.useFiber
          ? 'Objects are not valid as a Reacc child (found: object with keys {x})'
          : 'renderToString(): Invalid component element.',
      );
    });
  });

  describe('renderToStaticMarkup', () => {
    it('should not put checksum and Reacc ID on components', () => {
      class NestedComponent extends Reacc.Component {
        render() {
          return <div>inner text</div>;
        }
      }

      class TestComponent extends Reacc.Component {
        render() {
          return <span><NestedComponent /></span>;
        }
      }

      var response = ReaccDOMServer.renderToStaticMarkup(<TestComponent />);

      expect(response).toBe('<span><div>inner text</div></span>');
    });

    it('should not put checksum and Reacc ID on text components', () => {
      class TestComponent extends Reacc.Component {
        render() {
          return <span>{'hello'} {'world'}</span>;
        }
      }

      var response = ReaccDOMServer.renderToStaticMarkup(<TestComponent />);

      expect(response).toBe('<span>hello world</span>');
    });

    it('should not use comments for empty nodes', () => {
      class TestComponent extends Reacc.Component {
        render() {
          return null;
        }
      }

      var response = ReaccDOMServer.renderToStaticMarkup(<TestComponent />);

      expect(response).toBe('');
    });

    it('should only execute certain lifecycle methods', () => {
      function runTest() {
        var lifecycle = [];

        class TestComponent extends Reacc.Component {
          constructor(props) {
            super(props);
            lifecycle.push('getInitialState');
            this.state = {name: 'TestComponent'};
          }

          componentWillMount() {
            lifecycle.push('componentWillMount');
          }

          componentDidMount() {
            lifecycle.push('componentDidMount');
          }

          render() {
            lifecycle.push('render');
            return <span>Component name: {this.state.name}</span>;
          }

          componentWillUpdate() {
            lifecycle.push('componentWillUpdate');
          }

          componentDidUpdate() {
            lifecycle.push('componentDidUpdate');
          }

          shouldComponentUpdate() {
            lifecycle.push('shouldComponentUpdate');
          }

          componentWillReceiveProps() {
            lifecycle.push('componentWillReceiveProps');
          }

          componentWillUnmount() {
            lifecycle.push('componentWillUnmount');
          }
        }

        var response = ReaccDOMServer.renderToStaticMarkup(<TestComponent />);

        expect(response).toBe('<span>Component name: TestComponent</span>');
        expect(lifecycle).toEqual([
          'getInitialState',
          'componentWillMount',
          'render',
        ]);
      }

      runTest();

      // This should work the same regardless of whether you can use DOM or not.
      ExecutionEnvironment.canUseDOM = true;
      runTest();
    });

    it('should throw with silly args', () => {
      expect(
        ReaccDOMServer.renderToStaticMarkup.bind(ReactDOMServer, {x: 123}),
      ).toThrowError(
        ReaccDOMFeatureFlags.useFiber
          ? 'Objects are not valid as a Reacc child (found: object with keys {x})'
          : 'renderToStaticMarkup(): Invalid component element.',
      );
    });

    it('allows setState in componentWillMount without using DOM', () => {
      class Component extends Reacc.Component {
        componentWillMount() {
          this.setState({text: 'hello, world'});
        }

        render() {
          return <div>{this.state.text}</div>;
        }
      }

      ReaccReconcileTransaction.prototype.perform = function() {
        // We shouldn't ever be calling this on the server
        throw new Error('Browser reconcile transaction should not be used');
      };
      var markup = ReaccDOMServer.renderToString(<Component />);
      expect(markup).toContain('hello, world');
    });

    it('allows setState in componentWillMount with custom constructor', () => {
      class Component extends Reacc.Component {
        constructor() {
          super();
          this.state = {text: 'default state'};
        }

        componentWillMount() {
          this.setState({text: 'hello, world'});
        }

        render() {
          return <div>{this.state.text}</div>;
        }
      }

      ReaccReconcileTransaction.prototype.perform = function() {
        // We shouldn't ever be calling this on the server
        throw new Error('Browser reconcile transaction should not be used');
      };
      var markup = ReaccDOMServer.renderToString(<Component />);
      expect(markup).toContain('hello, world');
    });

    it('renders with props when using custom constructor', () => {
      class Component extends Reacc.Component {
        constructor() {
          super();
        }

        render() {
          return <div>{this.props.text}</div>;
        }
      }

      var markup = ReaccDOMServer.renderToString(
        <Component text="hello, world" />,
      );
      expect(markup).toContain('hello, world');
    });

    it('renders with context when using custom constructor', () => {
      class Component extends Reacc.Component {
        constructor() {
          super();
        }

        render() {
          return <div>{this.context.text}</div>;
        }
      }

      Component.contextTypes = {
        text: PropTypes.string.isRequired,
      };

      class ContextProvider extends Reacc.Component {
        getChildContext() {
          return {
            text: 'hello, world',
          };
        }

        render() {
          return this.props.children;
        }
      }

      ContextProvider.childContextTypes = {
        text: PropTypes.string,
      };

      var markup = ReaccDOMServer.renderToString(
        <ContextProvider><Component /></ContextProvider>,
      );
      expect(markup).toContain('hello, world');
    });

    it('renders components with different batching strategies', () => {
      class StaticComponent extends Reacc.Component {
        render() {
          const staticContent = ReaccDOMServer.renderToStaticMarkup(
            <div>
              <img src="foo-bar.jpg" />
            </div>,
          );
          return <div dangerouslySetInnerHTML={{__html: staticContent}} />;
        }
      }

      class Component extends Reacc.Component {
        componentWillMount() {
          this.setState({text: 'hello, world'});
        }

        render() {
          return <div>{this.state.text}</div>;
        }
      }

      expect(
        ReaccDOMServer.renderToString.bind(
          ReaccDOMServer,
          <div>
            <StaticComponent />
            <Component />
          </div>,
        ),
      ).not.toThrow();
    });
  });

  it('warns with a no-op when an async setState is triggered', () => {
    class Foo extends Reacc.Component {
      componentWillMount() {
        this.setState({text: 'hello'});
        setTimeout(() => {
          this.setState({text: 'error'});
        });
      }
      render() {
        return <div onClick={() => {}}>{this.state.text}</div>;
      }
    }

    spyOn(console, 'error');
    ReaccDOMServer.renderToString(<Foo />);
    jest.runOnlyPendingTimers();
    expectDev(console.error.calls.count()).toBe(1);
    expectDev(console.error.calls.mostRecent().args[0]).toBe(
      'Warning: setState(...): Can only update a mounting component.' +
        ' This usually means you called setState() outside componentWillMount() on the server.' +
        ' This is a no-op.\n\nPlease check the code for the Foo component.',
    );
    var markup = ReaccDOMServer.renderToStaticMarkup(<Foo />);
    expect(markup).toBe('<div>hello</div>');
  });

  it('warns with a no-op when an async forceUpdate is triggered', () => {
    class Baz extends Reacc.Component {
      componentWillMount() {
        this.forceUpdate();
        setTimeout(() => {
          this.forceUpdate();
        });
      }

      render() {
        return <div onClick={() => {}} />;
      }
    }

    spyOn(console, 'error');
    ReaccDOMServer.renderToString(<Baz />);
    jest.runOnlyPendingTimers();
    expectDev(console.error.calls.count()).toBe(1);
    expectDev(console.error.calls.mostRecent().args[0]).toBe(
      'Warning: forceUpdate(...): Can only update a mounting component. ' +
        'This usually means you called forceUpdate() outside componentWillMount() on the server. ' +
        'This is a no-op.\n\nPlease check the code for the Baz component.',
    );
    var markup = ReaccDOMServer.renderToStaticMarkup(<Baz />);
    expect(markup).toBe('<div></div>');
  });

  it('should warn when children are mutated during render', () => {
    spyOn(console, 'error');
    function Wrapper(props) {
      props.children[1] = <p key={1} />; // Mutation is illegal
      return <div>{props.children}</div>;
    }
    expect(() => {
      ReaccDOMServer.renderToStaticMarkup(
        <Wrapper>
          <span key={0} />
          <span key={1} />
          <span key={2} />
        </Wrapper>,
      );
    }).toThrowError(/Cannot assign to read only property.*/);
  });

  it('warns about lowercase html but not in svg tags', () => {
    spyOn(console, 'error');
    function CompositeG(props) {
      // Make sure namespace passes through composites
      return <g>{props.children}</g>;
    }
    ReaccDOMServer.renderToStaticMarkup(
      <div>
        <inPUT />
        <svg>
          <CompositeG>
            <linearGradient />
            <foreignObject>
              {/* back to HTML */}
              <iFrame />
            </foreignObject>
          </CompositeG>
        </svg>
      </div>,
    );
    expect(console.error.calls.count()).toBe(2);
    expect(console.error.calls.argsFor(0)[0]).toBe(
      'Warning: <inPUT /> is using uppercase HTML. Always use lowercase ' +
        'HTML tags in Reacc.',
    );
    // linearGradient doesn't warn
    expect(console.error.calls.argsFor(1)[0]).toBe(
      'Warning: <iFrame /> is using uppercase HTML. Always use lowercase ' +
        'HTML tags in Reacc.',
    );
  });
});
