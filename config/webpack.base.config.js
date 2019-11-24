const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const PATHS = {
	build: '.',
	config: path.join(__dirname, '../config'),
	dist: path.join(__dirname, '../dist'),
	public: path.join(__dirname, '../public'),
	src: path.join(__dirname, '../src')
}

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: `${PATHS.src}/index.js`
	},
	output: {
		filename: `${PATHS.build}/[name].[hash].js`,
		path: PATHS.dist,
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
			test: /\.s?[ac]ss$/i,
			use: [
				'style-loader', // Creates 'style' nodes from JS strings
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader', // Translates CSS into CommonJS
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${PATHS.config}/postcss.config.js` } }
				}, {
					loader: 'sass-loader', // Compiles Sass to CSS
					options: { sourceMap: true }
				}
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader', // Creates 'style' nodes from JS strings
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader', // Translates CSS into CommonJS
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${PATHS.config}/postcss.config.js` } }
				}
			]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.build}/[name].[hash].css`
		}),
		new ImageminPlugin({
			test: /\.(jpg|png|gif|svg)$/i,
			disable: process.env.NODE_ENV !== 'production' // Disable during development
		}),
		new PrettierPlugin({
			printWidth: 120,
			tabWidth: 4,
			useTabs: false,
			semi: false,
			singleQuote: true,
			encoding: 'utf-8',
			extensions: ['.js']
		}),
		new CopyWebpackPlugin([
			// { from: `${PATHS.src}/assets/fonts`, to: `fonts` }
		]),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.public}/index.html`,
			filename: `index.html`
		})
	]
}
