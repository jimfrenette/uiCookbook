'use strict';

const path                    = require('path');
const webpack                 = require('webpack');
const autoprefixer             = require('autoprefixer');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src';

module.exports = {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.s?css$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true,
                        enforce: true,
                    }
                }
            }
        },
        resolve: {
            extensions: ['.js']
        },
        entry: {
            site: SOURCE_ROOT + '/js/main.js'
        },
        output: {
            filename: (chunkData) => {
                return `js/${chunkData.chunk.name}.js`;
            },
            chunkFilename: 'js/[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [ // set autoprefixer options
                                        autoprefixer({ grid: true })
                                    ];
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "webpack-import-glob-loader",
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                {
                    /**
                     * Babel config for .js files
                     */
                    test: /\.js$/,
                    loader: require.resolve('babel-loader'),
                    query: {
                        babelrc: false,
                        presets: [ require.resolve('@babel/preset-env') ],
                        plugins: [
                            require.resolve('@babel/plugin-syntax-dynamic-import'),
                            require.resolve('@babel/plugin-proposal-function-bind'),
                            require.resolve('@babel/plugin-proposal-class-properties')
                        ]
                    }
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            })
        ],
        stats: {
            assetsSort: "chunks",
            builtAt: true,
            children: false,
            chunkGroups: true,
            chunkOrigins: true,
            colors: false,
            errors: true,
            errorDetails: true,
            env: true,
            modules: false,
            performance: true,
            providedExports: false,
            source: false,
            warnings: true
        }
};
