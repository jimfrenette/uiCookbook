const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: ['./js/index.js'] // use an array across all configs for consistent webpack-merge
  },
  plugins: [
    new MiniCssExtractPlugin
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader' },
          {
            loader: 'sass-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
