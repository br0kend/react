var path = require('path');

module.exports = {
  entry: './input',
  output: {
    filename: 'output.js',
  },
  resolve: {
    root: path.resolve('../../../../build/packages'),
    alias: {
      reacc: 'react/umd/react.development',
      'reacc-dom': 'react-dom/umd/react-dom.development',
    },
  },
};
