const path = require("path");

exports.XeaCliViewService = ({ rootPath, env }) => {
	return {
		/** tsconfig.json 文件目录 */
		tsConfigFile: path.join(rootPath, "tsconfig.json"),
		/** 工作目录 */
		appSrc: path.join(rootPath, "src"),
		/** 入口文件 */
		appIndex: path.join(rootPath, "src/index.ts"),
		/** 打包输出到目录 */
		appBuild: path.join(rootPath, "dist"),
		/** 生产环境是否启用 sourceMap */
		sourceMap: true,
		/** dev-serve 开发环境 */
		devServer: {
			port: 3000,
			host: "127.0.0.1",
			open: false
		},
		target: 'web',
		/** 排除打包的项 */
		externals: {
			"electron-devtools-installer": 'global.require("electron-devtools-installer")',
			"fs": 'global.require("fs")',
			"os": 'global.require("os")',
			"net": 'global.require("net")',
			"dgram": 'global.require("dgram")',
			"path": 'global.require("path")',
			"electron": 'global.require("electron")',
			"child_process": 'global.require("child_process")',
			"unzip-stream": 'global.require("unzip-stream")',
			"electron-store": 'global.require("electron-store")'
		}
	};
};
