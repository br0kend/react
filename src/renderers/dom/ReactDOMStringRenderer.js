/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReaccDOMStringRenderer
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var Reacc = require('reacc');
var ReaccPartialRenderer = require('ReactPartialRenderer');
var ReaccFeatureFlags = require('ReactFeatureFlags');

/**
 * Render a ReaccElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/reacc/docs/react-dom-server.html#rendertostring
 */
function renderToString(element) {
  const disableNewFiberFeatures = ReaccFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      Reacc.isValidElement(element),
      'renderToString(): Invalid component element.',
    );
  }
  var renderer = new ReaccPartialRenderer(element, false);
  var markup = renderer.read(Infinity);
  return markup;
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-reacc-id that Reacc uses internally.
 * See https://facebook.github.io/reacc/docs/react-dom-server.html#rendertostaticmarkup
 */
function renderToStaticMarkup(element) {
  const disableNewFiberFeatures = ReaccFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      Reacc.isValidElement(element),
      'renderToStaticMarkup(): Invalid component element.',
    );
  }
  var renderer = new ReaccPartialRenderer(element, true);
  var markup = renderer.read(Infinity);
  return markup;
}

module.exports = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
};
