const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const AppOptions = require("./lib").loadOptions();

module.exports = {
	entry: {
		index: AppOptions.appIndex
	},
	output: {
		path: AppOptions.appBuild,
		filename: "assets/js/[name].[hash:8].js"
	},
	target: AppOptions.target,
	module: {
		rules: [
			{
				test: /\.(jsx|tsx|js|ts)$/,
				loader: require.resolve("ts-loader"),
				options: {
					transpileOnly: true,
					configFile: AppOptions.tsConfigFile,
					experimentalWatchApi: true,
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: "antd",
								libraryDirectory: "lib",
								style: "css"
							})
						]
					})
				},
				exclude: /node_modules/
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: require.resolve("source-map-loader")
			},
			{
				enforce: "pre",
				test: /\.tsx?$/,
				use: require.resolve("source-map-loader")
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: require.resolve("css-loader")
					},
					{
						loader: require.resolve("less-loader")
					}
				]
			},
			{
				test: /\.jpg|png|jpeg|gif|svg$/,
				use: [
					{
						loader: require.resolve("url-loader"),
						options: {
							limit: 100 * 1024, // 100k
							//配置公共资源路径
							publicPath: "/assets/img",
							//配置输出路径
							outputPath: "assets/img",
							name: "[name].[hash:5].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: require.resolve("file-loader"),
						options: {
							//配置公共资源路径
							publicPath: "/assets/font",
							//配置输出路径
							outputPath: "assets/font",
							name: "[name].[hash:5].[ext]"
						}
					}
				]
			},
			{
				test: /\.node$/,
				use: [
					{
						loader: require.resolve("node-loader")
					}
				]
			}
		]
	},
	externals: AppOptions.externals,
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"],
		alias: {
			"~": path.resolve(AppOptions.rootPath, "./"),
			"@": path.resolve(AppOptions.appSrc, "./")
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ProgressBarPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(AppOptions.rootPath, "./public/index.html"),
			filename: "index.html",
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			chunksSortMode: "dependency"
		})
	].filter(d => d)
};
