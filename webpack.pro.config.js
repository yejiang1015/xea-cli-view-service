const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        extractComments: false,
        cache: true,
        sourceMap: false,
        terserOptions: {
          ie8: false,
          warnings: false
        }
      })
    ],
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        utils: {
          // 抽离自定义公共代码
          chunks: 'initial',
          name: 'public',
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [MiniCssExtractPlugin.loader, require.resolve("css-loader"), require.resolve("postcss-loader")]
      },
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: true //是否将插件信息打印到控制台
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    process.env.NODE_ANALYZER ? new BundleAnalyzerPlugin() : null
  ].filter((d) => d),
  performance: {
    hints: 'warning', // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
});
