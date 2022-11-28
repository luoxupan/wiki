// Generated using webpack-cli https://github.com/webpack/webpack-cli
import * as merge from "webpack-merge";
import { Base } from './webpack.base';
import * as webpack from "webpack";
import * as WorkboxWebpackPlugin from "workbox-webpack-plugin";

/**
 * workbox-webpack-plugin文档`service worker`
 * https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/
 * https://webpack.docschina.org/guides/progressive-web-application/
 */

const isPre = process.env.NODE_ENV == 'pre';
const isDev = process.env.NODE_ENV == 'development';
const isProduction = process.env.NODE_ENV == 'production';

let webpack_config =  merge.merge(Base, {
  entry: './src/index.tsx',
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new webpack.DefinePlugin({
      'process.env.WEB_ENV': `'${process.env.NODE_ENV}'`,
      // 'process.env.WEB_ENV': '"production"', // 在代码里面直接用process.env.WEB_ENV
    }),
  ],
});

module.exports = () => {
  if (isDev) {
    webpack_config = {
      ...webpack_config,
      mode: 'development',
      devServer: {
        open: true,
        port: 2002,
        compress: true,
        host: 'localhost',
        historyApiFallback: true
      },
    }
  }
  if (isPre || isProduction) {
    webpack_config = {
      ...webpack_config,
      mode: 'production',
      output: {
        publicPath: "//luoxupan.github.io/wiki/pages/webapp/", // 线上环境
      },
    }
    // webpack_config.plugins.push(new WorkboxWebpackPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }));
  }
  return webpack_config;
};
