'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reacc-dom-server.node.production.min.js');
} else {
  module.exports = require('./cjs/reacc-dom-server.node.development.js');
}
