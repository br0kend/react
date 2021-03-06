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
var ReactDOM;

describe('ReactPureComponent', () => {
  beforeEach(() => {
    React = require('reacc');
    ReactDOM = require('reacc-dom');
  });

  it('should render', () => {
    var renders = 0;
    class Component extends React.PureComponent {
      constructor() {
        super();
        this.state = {type: 'mushrooms'};
      }
      render() {
        renders++;
        return <div>{this.props.text[0]}</div>;
      }
    }

    var container = document.createElement('div');
    var text;
    var component;

    text = ['porcini'];
    component = ReactDOM.render(<Component text={text} />, container);
    expect(container.textContent).toBe('porcini');
    expect(renders).toBe(1);

    text = ['morel'];
    component = ReactDOM.render(<Component text={text} />, container);
    expect(container.textContent).toBe('morel');
    expect(renders).toBe(2);

    text[0] = 'portobello';
    component = ReactDOM.render(<Component text={text} />, container);
    expect(container.textContent).toBe('morel');
    expect(renders).toBe(2);

    // Setting state without changing it doesn't cause a rerender.
    component.setState({type: 'mushrooms'});
    expect(container.textContent).toBe('morel');
    expect(renders).toBe(2);

    // But changing state does.
    component.setState({type: 'portobello mushrooms'});
    expect(container.textContent).toBe('portobello');
    expect(renders).toBe(3);
  });

  it('can override shouldComponentUpdate', () => {
    spyOn(console, 'error');
    var renders = 0;
    class Component extends React.PureComponent {
      render() {
        renders++;
        return <div />;
      }
      shouldComponentUpdate() {
        return true;
      }
    }
    var container = document.createElement('div');
    ReactDOM.render(<Component />, container);
    ReactDOM.render(<Component />, container);
    expect(console.error.calls.count()).toBe(1);
    expect(console.error.calls.argsFor(0)[0]).toBe(
      'Warning: ' +
        'Component has a method called shouldComponentUpdate(). ' +
        'shouldComponentUpdate should not be used when extending React.PureComponent. ' +
        'Please extend React.Component if shouldComponentUpdate is used.',
    );
    expect(renders).toBe(2);
  });

  it('extends React.Component', () => {
    var renders = 0;
    class Component extends React.PureComponent {
      render() {
        expect(this instanceof React.Component).toBe(true);
        expect(this instanceof React.PureComponent).toBe(true);
        renders++;
        return <div />;
      }
    }
    ReactDOM.render(<Component />, document.createElement('div'));
    expect(renders).toBe(1);
  });

  it('should warn when shouldComponentUpdate is defined on React.PureComponent', () => {
    spyOn(console, 'error');

    class PureComponent extends React.PureComponent {
      shouldComponentUpdate() {
        return true;
      }
      render() {
        return <div />;
      }
    }
    var container = document.createElement('div');
    ReactDOM.render(<PureComponent />, container);

    expect(console.error.calls.count()).toBe(1);
    expect(console.error.calls.argsFor(0)[0]).toBe(
      'Warning: ' +
        'PureComponent has a method called shouldComponentUpdate(). ' +
        'shouldComponentUpdate should not be used when extending React.PureComponent. ' +
        'Please extend React.Component if shouldComponentUpdate is used.',
    );
  });
});
