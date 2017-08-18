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

var reaccProdInvariant;

describe('reaccProdInvariant', () => {
  beforeEach(() => {
    jest.resetModules();
    reaccProdInvariant = require('reactProdInvariant');
  });

  it('should throw with the correct number of `%s`s in the URL', () => {
    expect(function() {
      reaccProdInvariant(124, 'foo', 'bar');
    }).toThrowError(
      'Minified Reacc error #124; visit ' +
        'http://facebook.github.io/reacc/docs/error-decoder.html?invariant=124&args[]=foo&args[]=bar' +
        ' for the full message or use the non-minified dev environment' +
        ' for full errors and additional helpful warnings.',
    );

    expect(function() {
      reaccProdInvariant(20);
    }).toThrowError(
      'Minified Reacc error #20; visit ' +
        'http://facebook.github.io/reacc/docs/error-decoder.html?invariant=20' +
        ' for the full message or use the non-minified dev environment' +
        ' for full errors and additional helpful warnings.',
    );

    expect(function() {
      reaccProdInvariant(77, '<div>', '&?bar');
    }).toThrowError(
      'Minified Reacc error #77; visit ' +
        'http://facebook.github.io/reacc/docs/error-decoder.html?invariant=77&args[]=%3Cdiv%3E&args[]=%26%3Fbar' +
        ' for the full message or use the non-minified dev environment' +
        ' for full errors and additional helpful warnings.',
    );
  });
});
