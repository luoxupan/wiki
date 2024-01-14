import * as path from "path";
import * as HTMLWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

/**
 * npm i -D XXXX --registry https://registry.npmjs.org
 * npx webpack --help
 */

export const Base = {
  // target: '', // 需要看看
  output: {
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(__dirname, '../dist'),
    // `publicPath` is where Webpack will load your bundles from (optional)
    // publicPath: '//static.xxxx.com/cdn/',
    publicPath: '/',
    filename: "assets/js/[name]_[hash:8].js",
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: 'chunks/[name]_[contenthash:8].js',
    environment: {
      arrowFunction: false, // webpack拼装的代码不要箭头函数
    },
    clean: true, // 清理/dist文件夹
  },
  module: {
    /**
     * Add your rules for custom modules here
     * Learn more about loaders from https://webpack.js.org/loaders/
     */
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader','css-loader','less-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      // {
      //   test: /\.ts$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         // 设置预定义的环境
      //         presets:[
      //           [
      //             // 指定环境的插件
      //             "@babel/preset-env",
      //             // 配置信息
      //             {
      //               targets: {
      //                 "chrome": "135", // 要兼容目标的浏览器
      //                 // "ie": "11"
      //               },
      //               "corejs": "3", // 指定corejs的版本
      //               "useBuiltIns": "usage", // 使用corejs的方式 "usage" 表示按需加载
      //             }
      //           ]
      //         ]
      //       }
      //     },
      //     'ts-loader' // async/await Promise 转换不了 需babel
      //   ],
      //   exclude: /node_modules/
      // }
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
      template: 'src/index.html'
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  // devtool: 'inline-source-map', // 研究一下为何这个配置会导致包体积变大
} as any;
