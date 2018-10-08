const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { DefinePlugin } = webpack;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var SCRIPT = process.env.npm_lifecycle_event;

var common = {

	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist'
	},

	resolve: {
		extensions: [`.js`, `.jsx`, `.json`, `.css`, `.scss`, `sass`]
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["minify", "env", "react"]
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
			},
			{
				test: /\.woff2?$/i,
				include: /src\/fonts/,
				exclude: /node_modules/,
				loader: `url-loader`,
				options: {
				  limit: 10000,
				  name: `fonts/[name].[hash:7].[ext]`
				}
			  },
			  {
				test: /\.(mp4|ogg|webm|mpeg|pdf)$/i,
				include: /src\/img/,
				exclude: /node_modules/,
				loader: `file-loader`,
			  }
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Webpack test',
			template: 'src/index.html',
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
								importLoaders: 2,
								sourceMap: true
							}
						},
						{
							loader: `postcss-loader`,
							options: {
							  sourceMap: true,
							  ident: 'postcss',
							  plugins: [
								  require('autoprefixer')()
							  ]
							}
						},
						{
							loader: 'sass-loader',
						}
					]
				},
			]
		},
		plugins: [
			new DefinePlugin({
				DEV: JSON.stringify(true)
			})
		]


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
