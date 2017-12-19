const path = require('path');
const webpack = require('webpack');

/**
 * The dotEnv library searches for  .env file in the current folder, and adds all the environment
 * variables present, to process.env Object.
 */
const dotEnv = require('dotenv').config();

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const APP_DIR = path.resolve(__dirname, 'resources/scripts');

/**
 * Checks if the current application environment is a development environment
 * @returns {Boolean}
 */
function isDevEnvironment() {
	return process.env.APP_ENV === 'local';
}

const config = {
	entry: {
		app: [
			`webpack-dev-server/client?${process.env.WEBPACK_DEV_SERVER}`,
			'webpack/hot/only-dev-server',
			APP_DIR + '/app.js'
		]
	},
	devServer: {
		host: process.env.WEBPACK_HOST,
		port: process.env.WEBPACK_PORT,
		hot: true,
		open: true,
		compress: true,
		contentBase: path.join(__dirname, 'public'),
		publicPath: path.resolve(__dirname, '/js/'),
		headers: {'Access-Control-Allow-Origin': '*'},
		proxy: {
			'*': {target: process.env.APP_URL}
		}
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
				loaders: ['style-loader', 'css-loader', 'sass-loader']
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
			path.resolve('./resources/DUMMYPARTIALPATH')
		]
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
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
	watchOptions: {poll: true}
};

module.exports = config;
