# xea-cli-view-service

# 安装

You can install xea-cli-view-service using npm:

```js
$ npm install xea-cli-view-service --save-dev
```

# 配置

可选择的配置、xea-cli-view-service 具有默认配置。可通过根目录添加配置文件 `xea.config.js` 来自定义覆盖默认配置。
注意：自定义配置都是覆盖字段的值

```js
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


```

# tsconfig.json

```json

{
  "compileOnSave": false,
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "target": "es5",
    "lib": [
      "es6",
      "dom"
    ],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "rootDir": ".",
    "baseUrl": ".",
    "moduleResolution": "node",
    "traceResolution": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "allowSyntheticDefaultImports": true,
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "views/*"
      ],
      "@views/*": [
        "views/*"
      ],
      "views/*": [
        "views/*"
      ],
      "serve/*": [
        "serve/*"
      ]
    }
  },
  "awesomeTypescriptLoaderOptions": {
    //Typescript加载选项
    "forkChecker": true,
    "useWebpackText": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "*.json"
  ]
}

```

# 使用

-   package.json

```js
"scripts": {
    ...
    "start": "xea-cli-view-service serve",
    "build": "xea-cli-view-service build"
}

```
