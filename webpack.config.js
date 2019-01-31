const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		engine: './src/index.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([
			{
				from: './src/static'
			}
		])
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};
