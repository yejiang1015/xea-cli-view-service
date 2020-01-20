
const fs = require("fs");
const path = require("path");
const rootPath = process.cwd();
const colors = require("colors");
const readline = require("readline");
const defaultOptions = require("./xea.config");
const configPath = path.join(rootPath, "xea.config.js");

class Utils {
	clearConsole() {
		/** 完全清空控制台，不可向上滚动 */
		// process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
		/** 非完全清空 */
		const blank = "\n".repeat(process.stdout.rows);
		console.info(blank);
		readline.cursorTo(process.stdout, 0, 0);
		readline.clearScreenDown(process.stdout);
	}

	echoString(statsString, stats, type = "", port = "") {
		const title = colors.bgGreen(colors.black(" DONE "));
		if (statsString) {
			console.info(statsString);
			return;
		}
		console.info(`\n`);
		console.info(title + ` Compiled successfully in:  ${stats.endTime - stats.startTime}ms`.green);
		console.info(`\n`);
		console.info(title + ` - Types:     Compiled ${colors.red(type)}`.green);
		if (port) {
			console.info(title + ` - Local:     http://localhost:${port}/\n`.green);
		}
		return undefined;
	}
	loadOptions() {
		const optionsParams = { rootPath, env: process.env.NODE_ENV };
		let options = defaultOptions.XeaCliViewService(optionsParams);
		if (fs.existsSync(configPath)) {
			const userConfig = require(path.resolve(configPath));
			if (userConfig && userConfig.XeaCliViewService && typeof userConfig.XeaCliViewService === "function") {
				try {
					const userOptions = userConfig.XeaCliViewService(optionsParams);
					if (Reflect.ownKeys(userOptions).length) {
						options = { ...options, ...userOptions };
					}
				} catch (error) {
					options = options;
					throw new Error(error);
				}
			}
		}
		return { rootPath, ...options };
	}
}

module.exports = new Utils();
