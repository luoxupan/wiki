// Generated using webpack-cli https://github.com/webpack/webpack-cli
/**
 * webpack所以配置
 * https://webpack.docschina.org/configuration/
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: {
    index: './src/react/index.ts',
    // style: './src/react/style.ts',
  },
  // target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/react/'),
    filename: '[name].js',
    environment: {
      arrowFunction: false, // webpack拼装的代码不要箭头函数
    },
    library: {
      type: 'umd',
    },
    clean: true, // 清理/dist文件夹
  },
  externals: {
    'react-dom': { // UMD
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "react-dom"
    },
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.less$/i,
        // use: [MiniCssExtractPlugin.loader,'css-loader','less-loader'],
        use: ['style-loader','css-loader','less-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  devtool: "hidden-source-map",
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
