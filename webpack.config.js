const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {

    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    devtool: "source-map",
    // resolve: {
    //     extensions: [`.js`, `.jsx`, `.json`, `.css`, `.styl`]
    // },
    // devServer: {
    //     compress: false,
    //     contentBase: 'dist/',
    //     historyApiFallback: true,
    //     noInfo: true,
    //     hot: true,
    //     open: true,
    //     overlay: {
    //         warnings: true,
    //         errors: true
    //       },
    //     port: 8080
    // },
    optimization: {
        minimize: false,  //optimization set to true by default 
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                include: /src\.\/js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['react']
                    }
                  }
            },
            {
                test: /\.s?css$/,
                use: [
                    // {loader: 'style-loader'},
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(img|jpe?g|svg|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "style.css",
          chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: 'Webpack test'
        })

      ]
}