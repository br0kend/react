'use strict';

if (process.env.NODE_ENV === 'production') {
  throw Error('test-utils is not available in production mode.');
} else {
  module.exports = require('./cjs/reacc-dom-test-utils.development');
}
