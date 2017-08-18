'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reacc-art.production.min.js');
} else {
  module.exports = require('./cjs/reacc-art.development.js');
}
