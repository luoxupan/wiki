const path = require('path');
const webpack = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name]_[hash:8].js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: 'chunks/[name]_[contenthash:8].js',
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(__dirname, 'dist'),
    // `publicPath` is where Webpack will load your bundles from (optional)
    // publicPath: '//static.xxxx.com/cdn/',
    environment: {
      arrowFunction: false, // webpack拼装的代码不要箭头函数
    }
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
