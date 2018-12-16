const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');
const writeFilePlugin = require('write-file-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const serve = new Serve({
  host: 'localhost',
  static: ['./'],
  open: true,
  liveReload: true
});

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    app: ['webpack-plugin-serve/client']
  },
  plugins: [
    serve,
    new writeFilePlugin()
  ],
  watch: true
});
