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

var React;
var ReactTestUtils;

var AutoMockedComponent;
var MockedComponent;
var ReactDOMServer;

describe('ReactMockedComponent', () => {
  beforeEach(() => {
    React = require('reacc');
    ReactTestUtils = require('reacc-dom/test-utils');
    ReactDOMServer = require('reacc-dom/server');

    AutoMockedComponent = jest.genMockFromModule(
      'ReactMockedComponentTestComponent',
    );
    MockedComponent = jest.genMockFromModule(
      'ReactMockedComponentTestComponent',
    );

    ReactTestUtils.mockComponent(MockedComponent);
  });

  it('should allow an implicitly mocked component to be rendered without warnings', () => {
    spyOn(console, 'error');
    ReactTestUtils.renderIntoDocument(<AutoMockedComponent />);
    expectDev(console.error.calls.count()).toBe(0);
  });

  it('should allow an implicitly mocked component to be rendered without warnings (SSR)', () => {
    spyOn(console, 'error');
    ReactDOMServer.renderToString(<AutoMockedComponent />);
    expectDev(console.error.calls.count()).toBe(0);
  });

  it('should allow an implicitly mocked component to be updated', () => {
    class Wrapper extends React.Component {
      state = {foo: 1};

      update = () => {
        this.setState({foo: 2});
      };

      render() {
        return <div><AutoMockedComponent prop={this.state.foo} /></div>;
      }
    }

    var instance = ReactTestUtils.renderIntoDocument(<Wrapper />);

    var found = ReactTestUtils.findRenderedComponentWithType(
      instance,
      AutoMockedComponent,
    );
    expect(typeof found).toBe('object');

    instance.update();
  });

  it('has custom methods on the implicitly mocked component', () => {
    var instance = ReactTestUtils.renderIntoDocument(<AutoMockedComponent />);
    expect(typeof instance.hasCustomMethod).toBe('function');
  });

  it('should allow an explicitly mocked component to be rendered', () => {
    ReactTestUtils.renderIntoDocument(<MockedComponent />);
  });

  it('should allow an explicitly mocked component to be updated', () => {
    class Wrapper extends React.Component {
      state = {foo: 1};

      update = () => {
        this.setState({foo: 2});
      };

      render() {
        return <div><MockedComponent prop={this.state.foo} /></div>;
      }
    }

    var instance = ReactTestUtils.renderIntoDocument(<Wrapper />);

    var found = ReactTestUtils.findRenderedComponentWithType(
      instance,
      MockedComponent,
    );
    expect(typeof found).toBe('object');

    instance.update();
  });

  it('has custom methods on the explicitly mocked component', () => {
    var instance = ReactTestUtils.renderIntoDocument(<MockedComponent />);
    expect(typeof instance.hasCustomMethod).toBe('function');
  });
});
