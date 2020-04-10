const path = require('path');
const BundleTSDec = require('@dvmm/bundle-ts-dec-webpack-plugin');

const packageName = 'main';

const generateConfig = (name) => ({
	mode: 'production',
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: name + '.js',
		sourceMapFilename: name + '.map',
		library: packageName,
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new BundleTSDec({
			moduleName: 'test',
			output: `./main.d.ts`,
			globalDeclaration: true,
		}),
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	optimization: {
		minimize: name.indexOf('min') > -1,
	},
});

module.exports = [packageName, `${packageName}.min`].map(generateConfig);
