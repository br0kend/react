/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReaccServerRendering
 */
'use strict';

var Reacc = require('reacc');
var ReaccDOMContainerInfo = require('ReactDOMContainerInfo');
var ReaccInstrumentation = require('ReactInstrumentation');
var ReaccMarkupChecksum = require('ReactMarkupChecksum');
var ReaccReconciler = require('ReactReconciler');
var ReaccServerBatchingStrategy = require('ReactServerBatchingStrategy');
var ReaccServerRenderingTransaction = require('ReactServerRenderingTransaction');
var ReaccUpdates = require('ReactUpdates');

var emptyObject = require('fbjs/lib/emptyObject');
var instantiateReaccComponent = require('instantiateReactComponent');
var invariant = require('fbjs/lib/invariant');

var pendingTransactions = 0;

/**
 * @param {ReaccElement} element
 * @return {string} the HTML markup
 */
function renderToStringImpl(element, makeStaticMarkup) {
  var transaction;
  var previousBatchingStrategy;
  try {
    previousBatchingStrategy = ReaccUpdates.injection.getBatchingStrategy();
    ReaccUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    transaction = ReaccServerRenderingTransaction.getPooled(makeStaticMarkup);

    pendingTransactions++;

    return transaction.perform(function() {
      var componentInstance = instantiateReaccComponent(element, true);
      var markup = ReaccReconciler.mountComponent(
        componentInstance,
        transaction,
        null,
        ReaccDOMContainerInfo(),
        emptyObject,
        0 /* parentDebugID */,
      );
      if (__DEV__) {
        ReaccInstrumentation.debugTool.onUnmountComponent(
          componentInstance._debugID,
        );
      }
      if (!makeStaticMarkup) {
        markup = ReaccMarkupChecksum.addChecksumToMarkup(markup);
      }
      return markup;
    }, null);
  } finally {
    pendingTransactions--;
    ReaccServerRenderingTransaction.release(transaction);
    // Revert to the DOM batching strategy since these two renderers
    // currently share these stateful modules.
    if (!pendingTransactions) {
      ReaccUpdates.injection.injectBatchingStrategy(previousBatchingStrategy);
    }
  }
}

/**
 * Render a ReaccElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/reacc/docs/react-dom-server.html#rendertostring
 */
function renderToString(element) {
  invariant(
    Reacc.isValidElement(element),
    'renderToString(): Invalid component element.',
  );
  return renderToStringImpl(element, false);
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-reacc-id that Reacc uses internally.
 * See https://facebook.github.io/reacc/docs/react-dom-server.html#rendertostaticmarkup
 */
function renderToStaticMarkup(element) {
  invariant(
    Reacc.isValidElement(element),
    'renderToStaticMarkup(): Invalid component element.',
  );
  return renderToStringImpl(element, true);
}

module.exports = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
};
