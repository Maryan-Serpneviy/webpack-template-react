const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	config: path.join(__dirname, '../config'),
	assets: 'static/'
};

const PAGES_DIR = `${PATHS.src}/html`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

module.exports = {
	// BASE config
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src
		// module: `${PATHS.src}/your-module.js`,
	},
	output: {
		filename: `${PATHS.assets}js/[name].[hash].js`,
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
		options: {
			name: '[name].[ext]'
		}
    }, {
		test: /\.(png|jpg|gif|svg)$/,
		loader: 'file-loader',
		options: {
			name: '[name].[ext]'
		}
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
        }]
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
        }]
    }]
	},
	resolve: {
		alias: {
			'~': 'src'
			//'react$': 'react/dist/react.js'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`
		}),
		new ImageminPlugin({
			test: /\.(jpg|png|gif|svg)$/i,
			disable: process.env.NODE_ENV !== 'production' // Disable during development
		}),
		new PrettierPlugin({
			printWidth: 120,
			tabWidth: 2,
			useTabs: false,
			semi: true,
			singleQuote: true,
			encoding: 'utf-8',
			extensions: [ '.js' ]
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img` },
			{ from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts` },
			{ from: `${PATHS.src}/html`, to: `${PATHS.assets}html` },
			{ from: `${PATHS.src}/static`, to: `` }
		]),
		// Automatic creation any html pages (Don't forget to RERUN dev server)
		// see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
		// best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page}`,
			title: 'Webpack Template'
		}))
	]
}