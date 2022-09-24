const path = require('path');
const webpack = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // target: '', // 需要看看
  // mode: 'production',
  output: {
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(__dirname, 'dist'),
    // `publicPath` is where Webpack will load your bundles from (optional)
    // publicPath: '//static.xxxx.com/cdn/',
    filename: '[name]_[hash:8].js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: 'chunks/[name]_[contenthash:8].js',
    environment: {
      arrowFunction: false, // webpack拼装的代码不要箭头函数
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 设置预定义的环境
              presets:[
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      "chrome": "135", // 要兼容目标的浏览器
                      // "ie": "11"
                    },
                    "corejs": "3", // 指定corejs的版本
                    "useBuiltIns": "usage", // 使用corejs的方式 "usage" 表示按需加载
                  }
                ]
              ]
            }
          },
          'ts-loader' // async/await Promise 转换不了 需babel
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    // 代码分离：https://webpack.docschina.org/guides/code-splitting/
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'WEB_ENV': '"production"',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  devtool: 'inline-source-map',
};
