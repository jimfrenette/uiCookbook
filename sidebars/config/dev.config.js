const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');
// const sane = require('sane');
const writeFilePlugin = require('write-file-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const serve = new Serve({
  host: 'localhost',
  static: ['./'],
  open: true,
  liveReload: true
});

// const watcher = sane('./src/', {glob: ['**/*']});
/*
serve.on('listening', () => {
  watcher.on('change', (filePath, root, stat) => {
    console.log('file changed', filePath);
    serve.emit('reload', { source: 'config' });
  });
});

serve.on('close', () => watcher.close());
*/
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    serve,
    new writeFilePlugin()
  ],
  watch: true
});
