/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const reaccVersion = require('../../package.json').version;
const versions = {
  'packages/reacc/package.json': require('../../packages/react/package.json')
    .version,
  'packages/reacc-dom/package.json': require('../../packages/react-dom/package.json')
    .version,
  'packages/reacc-test-renderer/package.json': require('../../packages/react-test-renderer/package.json')
    .version,
  'src/ReaccVersion.js': require('../../src/ReactVersion'),
};

let allVersionsMatch = true;
Object.keys(versions).forEach(function(name) {
  const version = versions[name];
  if (version !== reaccVersion) {
    allVersionsMatch = false;
    console.log(
      '%s version does not match package.json. Expected %s, saw %s.',
      name,
      reaccVersion,
      version
    );
  }
});

if (!allVersionsMatch) {
  process.exit(1);
}
