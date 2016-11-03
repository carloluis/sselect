'use strict';

const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    entry: ['./src/index.js'],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        sourceMapFilename: '[file].map'
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
