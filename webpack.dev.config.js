const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const AppOptions = require("./lib").loadOptions();
const colors = require("colors");

module.exports = merge(webpackBaseConfig, {
	mode: "development",
	devtool: "cheap-module-source-map", // 'eval' is not supported by error-overlay-webpack-plugin
	module: {
		rules: [
			{
				test: /\.css$/i,
				exclude: /\.module\.css$/i,
				use: [require.resolve("style-loader"), require.resolve("css-loader"), require.resolve("postcss-loader")]
			},
			{
				test: /\.module\.css$/i,
				use: [
					require.resolve("style-loader"),
					{
						loader: require.resolve("css-loader"),
						options: {
							modules: true
						}
					},
					require.resolve("postcss-loader")
				]
			}
		]
	},
	devServer: {
		quiet: true,
		after() {},
		clientLogLevel: "error",
		contentBase: false,
		disableHostCheck: false,
		port: AppOptions.devServer.port,
		host: AppOptions.devServer.host,
		compress: true,
		open: AppOptions.devServer.open,
		hot: true,
		overlay: {
			errors: true // 编译出现错误时，错误直接贴到页面上
		}
	},
	plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				notes: [
					`- Types:     Compiled ${colors.red("views")}`.green,
					`- Local:     http://localhost:${AppOptions.devServer.port}/\n`.green
				]
			},
			clearConsole: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ErrorOverlayPlugin()
	]
});
