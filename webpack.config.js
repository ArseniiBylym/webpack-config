const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

var SCRIPT = process.env.npm_lifecycle_event;

var common = {

	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist'
	},

	resolve: {
		extensions: [`.js`, `.jsx`, `.json`, `.css`, `.styl`]
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "react"]
					}
				}
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
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			title: 'Webpack test'
		}),
	]
}

if (SCRIPT == 'start') {
	
	module.exports = merge(common, {

		devtool: "source-map",
		mode: "development",

		optimization: {
			minimize: false,  //optimization set to true by default 
		},

		devServer: {
			compress: false,
			contentBase: path.join(__dirname, 'dist'),
			historyApiFallback: true,
			noInfo: true,
			open: true,
			overlay: {
				warnings: true,
				errors: true
			},
			port: 8080
		},

		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: [
						{ loader: 'style-loader' },
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
						}
					]
				},
			]
		}


	});
}

if(SCRIPT == 'build') {

	module.exports = merge(common, {

		mode: "production",
		
		optimization: {
			minimize: true,  //optimization set to true by default 
		},
		
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				},
			]
		},

		plugins: [
			new MiniCssExtractPlugin({
				filename: "style.css",
				chunkFilename: "[id].css"
			}),
		]
	})
}
