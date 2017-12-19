const path = require('path');
const webpack = require('webpack');

/**
 * The dotEnv library searches for  .env file in the current folder, and adds all the environment
 * variables present, to process.env Object.
 */
const dotEnv = require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'public', 'js');
const APP_DIR = path.join(__dirname, 'resources', 'scripts');

/**
 * Checks if the current application environment is a development environment
 * @returns {Boolean}
 */
function isDevEnvironment() {
	return process.env.APP_ENV === 'local';
}

const config = {
	entry: {
		app: ['babel-polyfill', APP_DIR + '/app.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['angularjs-annotate']
					}
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: false
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			}
		]
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].js',
		publicPath: path.resolve(__dirname, '/js/')
	},
	resolve: {
		modules: [
			path.resolve('./node_modules'),
			path.resolve('./resources/DUMMYSCRIPTPATH'),
			path.resolve('./resources/views/DUMMYPARTIALPATH')
		]
	},
	plugins: [
		new ExtractTextPlugin('../css/[name].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			chunks: ['app'],
			minChunks(module, count) {
				var context = module.context;
				return !!(context && (~context.indexOf('node_modules') || ~context.indexOf('vendors')));
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'vendor-common.js',
			chunks: ['login', 'vendor'],
			minChunks(module, count) {
				var context = module.context;
				return context && ((~context.indexOf('node_modules') && count > 2) || count >= 2);
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		/**
		 * A single environment variable, that you can use in your Javascript code. These variables
		 * are used by webpack during static compilation of your application i.e. during the build
		 * process. These variables are extremely useful in manner, they let you alter the flow
		 * of the application during build time, rather than run-time.
		 */
		new webpack.DefinePlugin({
			__DEV_ENV__: JSON.stringify(JSON.parse((isDevEnvironment())))
		})
	],
	watchOptions: {poll: true},
	performance: {
		hints: 'warning'
	}
};

module.exports = config;
