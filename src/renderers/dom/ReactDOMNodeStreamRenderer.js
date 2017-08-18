/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReaccDOMNodeStreamRenderer
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var Reacc = require('reacc');
var ReaccPartialRenderer = require('ReactPartialRenderer');
var ReaccFeatureFlags = require('ReactFeatureFlags');

var Readable = require('stream').Readable;

// This is a Readable Node.js stream which wraps the ReaccDOMPartialRenderer.
class ReaccMarkupReadableStream extends Readable {
  constructor(element, makeStaticMarkup) {
    // Calls the stream.Readable(options) constructor. Consider exposing built-in
    // features like highWaterMark in the future.
    super({});
    this.partialRenderer = new ReaccPartialRenderer(element, makeStaticMarkup);
  }

  _read(size) {
    try {
      this.push(this.partialRenderer.read(size));
    } catch (err) {
      this.emit('error', err);
    }
  }
}
/**
 * Render a ReaccElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/reacc/docs/react-dom-stream.html#rendertonodestream
 */
function renderToNodeStream(element) {
  const disableNewFiberFeatures = ReaccFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      Reacc.isValidElement(element),
      'renderToNodeStream(): Invalid component element.',
    );
  }
  return new ReaccMarkupReadableStream(element, false);
}

/**
 * Similar to renderToNodeStream, except this doesn't create extra DOM attributes
 * such as data-reacc-id that Reacc uses internally.
 * See https://facebook.github.io/reacc/docs/react-dom-stream.html#rendertostaticnodestream
 */
function renderToStaticNodeStream(element) {
  const disableNewFiberFeatures = ReaccFeatureFlags.disableNewFiberFeatures;
  if (disableNewFiberFeatures) {
    invariant(
      Reacc.isValidElement(element),
      'renderToStaticNodeStream(): Invalid component element.',
    );
  }
  return new ReaccMarkupReadableStream(element, true);
}

module.exports = {
  renderToNodeStream: renderToNodeStream,
  renderToStaticNodeStream: renderToStaticNodeStream,
};
