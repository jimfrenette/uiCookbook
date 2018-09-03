const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
});
