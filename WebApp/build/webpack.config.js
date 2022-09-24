// Generated using webpack-cli https://github.com/webpack/webpack-cli
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/**
 * workbox-webpack-plugin文档`service worker`
 * https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/
 * https://webpack.docschina.org/guides/progressive-web-application/
 */

const isProduction = process.env.NODE_ENV == 'production';

const webpack_config =  merge(base, {
  entry: './src/index.tsx',
  devServer: {
    open: true,
    port: 2002,
    compress: true,
    host: 'localhost',
  },
});

module.exports = () => {
  if (isProduction) {
    webpack_config.mode = 'production';
    // webpack_config.plugins.push(new WorkboxWebpackPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }));
  } else {
    webpack_config.mode = 'development';
  }
  return webpack_config;
};
