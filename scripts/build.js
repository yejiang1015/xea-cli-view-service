const webpack = require("webpack");
const lib = require("../lib");
module.exports = async () => {
	process.env.NODE_ENV = "production";
	return new Promise((resolve) => {
		webpack(require("../webpack.pro.config")).run((err, stats) => {
			const statsString = stats.toString({
				colors: true,
				all: false,
				hash: true,
				errors: true,
				timings: true,
				version: true,
				builtAt: true,
				assets: true
			});
			lib.clearConsole();
			lib.echoString(statsString, stats, "", "");
			resolve(true);
		});
	});
};
