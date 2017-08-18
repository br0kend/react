'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reacc-dom-unstable-native-dependencies.production.min.js');
} else {
  module.exports = require('./cjs/reacc-dom-unstable-native-dependencies.development.js');
}
