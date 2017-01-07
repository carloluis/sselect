'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packages = require('./package.json');

const NODE_ENV = 'development';

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});
var EnvPluginConfig = new webpack.DefinePlugin({
    'process.env':{
        'NODE_ENV': JSON.stringify(NODE_ENV)
    }
});

module.exports = {
	entry: {
		app: './src/index.js',
		vendor: Object.keys(packages.dependencies)
	},
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		path: __dirname + '/dist',
		publicPath: '/'
	},
    module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader', 
				query: { 
					presets: ['react', 'es2015', 'stage-2']
				},
				cacheDirectory: true
			},
			{
				test: /\.css$/, 
				exclude: /node_modules/,
				loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[name]_[local]_[hash:base64:3]'
			}
		]
	},
	plugins: [HTMLWebpackPluginConfig, EnvPluginConfig],
	resolve: {
		extensions: ['', '.js']
	},
	devtool: '#source-map',
	devServer: { 
		inline: true,
		port: 8080,
		colors: true,
		progress: true,
		historyApiFallback: true,
		contentBase: './dist',
		open: true
	},
	watch: true
}
