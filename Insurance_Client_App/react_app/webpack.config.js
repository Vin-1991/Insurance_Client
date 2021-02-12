"use strict";

const resolve = require('path').resolve;
const directoryPath = resolve(__dirname + '/dist/bundles');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map', //need to comment for prod build
    entry: __dirname + '/components/index.js',
    output: {
        path: directoryPath,
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: directoryPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    externals: function (context, request, callback) {
        if (/xlsx|canvg|pdfmake/.test(request)) {
            return callback(null, "commonjs " + request);
        }
        callback();
    },
    optimization: {
        minimize: false, //Update this to true or false,
        splitChunks: {
            cacheGroups: {
                // Split vendor code to its own chunk(s)
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/i,
                    chunks: "all",
                    priority: 1,
                    enforce: true,
                },
                // Split code common to all chunks to its own chunk
                commons: {
                    name: "commons",    // The name of the chunk containing all common code
                    chunks: "initial",  // TODO: Document
                    minChunks: 2        // This is the number of modules
                }
            }
        },
        // The runtime should be in its own chunk
        runtimeChunk: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: [["@babel/env", {
                        "targets": {
                            "node": "10"
                        }
                    }],
                        "@babel/react"],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]

    },
    devServer: {
        contentBase: directoryPath,
        watchContentBase: true,
        disableHostCheck: true,
        compress: true,
        inline: true,
        writeToDisk: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
};