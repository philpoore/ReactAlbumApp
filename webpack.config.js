module.exports = {
	entry: "./src/main.jsx",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.json?$/,
				loader: 'json-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel?presets[]=react,presets[]=es2015' // 'babel-loader' is also a legal name to reference
			}
		]
	}
};