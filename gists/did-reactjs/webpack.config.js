module.exports = {
  entry: {
    main: './main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ['@babel/preset-env'],
            plugins: [[
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'Didact.createElement' // 自己定义名字,用来修改 webpack 后,编译的 js 中,创建的一个方法名
              }
            ]]
          }
        }
      }
    ]
  },
  mode: 'development',
  optimization: {
    minimize: false
  },
  devtool: 'inline-source-map',
}