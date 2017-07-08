const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'components', 'register.jsx'),
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: 'register.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
