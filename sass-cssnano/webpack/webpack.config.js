const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
context: path.resolve(__dirname, './src'),
  entry: {
    app: './js/index.js',
    css: './sass/main.scss',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true || {/* CSSNano Options */}
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            /* for ~slick-carousel/slick/slick-theme.scss */
            loader: 'resolve-url-loader'
          },
          {
            /* for resolve-url-loader:
                source maps must be enabled on any preceding loader */
            loader: 'sass-loader?sourceMap'
          }
        ]
      })
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    { /* for ~slick-carousel/slick/slick-theme.scss */
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

