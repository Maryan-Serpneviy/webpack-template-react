const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const Path = {
	config: path.join(__dirname, '../config'),
	dist: path.join(__dirname, '../dist'),
	public: path.join(__dirname, '../public'),
	src: path.join(__dirname, '../src'),
	build: '.'
}

module.exports = {
	externals: {
		Path: Path
	},
	entry: {
		app: `${Path.src}/index`
	},
	output: {
		filename: `${Path.build}/[name].[hash].js`,
		path: Path.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: '/node_modules/',
			use: ['babel-loader', 'eslint-loader']
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.s?[ac]ss$/,
			use: [
				'style-loader', // Creates 'style' nodes from JS strings
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader', // Translates CSS into CommonJS
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${Path.config}/postcss.config.js` } }
				}, {
					loader: 'sass-loader', // Compiles Sass to CSS
					options: { sourceMap: true }
				}
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: false,
			template: `${Path.public}/index.html`,
			filename: `index.html`
		}),
		new MiniCssExtractPlugin({
			filename: `${Path.build}/[name].[hash].css`
		}),
		new ImageminPlugin({
			test: /\.(jpg|png|gif|svg)$/i,
			disable: process.env.NODE_ENV !== 'production' // Disable during development
		}),
		new CopyWebpackPlugin([
			{ from: `${Path.public}`, to: '' }
			// { from: `${Path.src}/assets/fonts`, to: 'fonts' }
		])
	]
}
