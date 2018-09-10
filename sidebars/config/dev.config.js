const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');
const writeFilePlugin = require('write-file-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
  plugins: [
    new writeFilePlugin()
  ]
});
