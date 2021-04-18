/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: environment.paths.output,
        watchContentBase: true,
        publicPath: '/',
        open: true,
        historyApiFallback: true,
        compress: true,
        overlay: true,
        hot: false,
        watchOptions: {
            poll: 300,
        },
        ...environment.server,
    },

    watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
        ignored: /node_modules/,
    },

    /* additional plugins */
    plugins: [],
});