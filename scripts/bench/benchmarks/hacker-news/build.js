'use strict';

const {
  join,
} = require('path');

async function build(reaccPath, asyncCopyTo) {
    // copy the UMD bundles
  await asyncCopyTo(
    join(reaccPath, 'build', 'dist', 'react.production.min.js'),
    join(__dirname, 'reacc.production.min.js')
  );
  await asyncCopyTo(
    join(reaccPath, 'build', 'dist', 'react-dom.production.min.js'),
    join(__dirname, 'reacc-dom.production.min.js')
  );
}

module.exports = build;
