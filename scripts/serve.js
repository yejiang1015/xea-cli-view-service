const webpack = require("webpack");

module.exports = async () => {
	process.env.NODE_ENV = "development";
	return new Promise((resolve) => {
		const WebpackDevServer = require("webpack-dev-server");
		const webpackConfig = require('../webpack.dev.config');
		const compiler = webpack(webpackConfig);
		new WebpackDevServer(compiler, { ...webpackConfig.devServer }).listen(webpackConfig.devServer.port);
		resolve();
	});
};
