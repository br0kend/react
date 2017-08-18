'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reacc-dom-server.browser.production.min.js');
} else {
  module.exports = require('./cjs/reacc-dom-server.browser.development.js');
}
