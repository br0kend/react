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
var ReactTestUtils;

describe('ReactEventIndependence', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('reacc');
    ReactDOM = require('reacc-dom');
    ReactTestUtils = require('reacc-dom/test-utils');
  });

  it('does not crash with other reacc inside', () => {
    var clicks = 0;
    var div = ReactTestUtils.renderIntoDocument(
      <div
        onClick={() => clicks++}
        dangerouslySetInnerHTML={{
          __html: '<button data-reaccid=".z">click me</div>',
        }}
      />,
    );
    ReactTestUtils.SimulateNative.click(div.firstChild);
    expect(clicks).toBe(1);
  });

  it('does not crash with other reacc outside', () => {
    var clicks = 0;
    var outer = document.createElement('div');
    outer.setAttribute('data-reaccid', '.z');
    var inner = ReactDOM.render(
      <button onClick={() => clicks++}>click me</button>,
      outer,
    );
    ReactTestUtils.SimulateNative.click(inner);
    expect(clicks).toBe(1);
  });

  it('does not when event fired on unmounted tree', () => {
    var clicks = 0;
    var container = document.createElement('div');
    var button = ReactDOM.render(
      <button onClick={() => clicks++}>click me</button>,
      container,
    );

    // Now we unmount the component, as if caused by a non-React event handler
    // for the same click we're about to simulate, like closing a layer:
    ReactDOM.unmountComponentAtNode(container);
    ReactTestUtils.SimulateNative.click(button);

    // Since the tree is unmounted, we don't dispatch the click event.
    expect(clicks).toBe(0);
  });
});
