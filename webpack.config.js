const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
	/* ENTRY ACCPETS A PATH OR AN OBJECT OF ENTRIES. 
	WE'LL BE USING THE LATTER FORM GIVEN ITS CONVENIENT WITH MORE COMPLEX CONFIGURATIONS. */
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	/* Add resolve extensions.
	'' is needed to allow imports without an extension.
	Extensions must be in '' */
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				// TEST EXPECTS A RegExp!
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: PATHS.app
			},
			{
				// set up JSX this accepts js thanks to RegExp
				test: /\.jsx?$/,
				/* Enable caching for improved performance during developement
				It uses default OS directory by default. If you need something more custom
				pass a path to it I.e, babel?cacheDirectory=<path> */
				loaders: ['babel?cacheDirectory'],
				/* Parse only app files!! Without this it will go through the entire project
				In addition to being slow, it will most likely result in an error */
				include: PATHS.app
			}
		]
	}
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,
			/* ENABLE HISTORY API FALLBACK SO HTML5 HISTORY API BASED 
			ROUTING WORKS. THIS IS A GOOD DEFAULT THAT WILL COME IN HANDY
			IN MORE COMPLICATED SETUPS */
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			// DISPLAY ONLY ERROS TO REDUCE AMOUNT OF OUTPUT 
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [ 
			new webpack.HotModuleReplacementPlugin(),
			// DETECTS CHANGES TO WEBPACK CONFIG AND INSTALL PACKAGES AS NEEDED
			new NpmInstallPlugin({
				save: true
			})
		]
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {});
}
