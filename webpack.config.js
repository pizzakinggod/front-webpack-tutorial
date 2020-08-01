const path = require("path");
const {BannerPlugin} = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const childProcess = require('child_process');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000 // 10Kb
        }
      }
    ]
  },
  /**
   * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
   * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
   * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
   * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
   * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
   */
  plugins: [
    new BannerPlugin({
      banner: () =>
        `Build Time: ${new Date().toLocaleString()}\n` +
        `Commit Hash: ${childProcess.execSync('git rev-parse --short HEAD')}\n` +
        `Author: ${childProcess.execSync('git config user.name')}`
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minifi: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true
      } : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({filename: `[name].css`})] : []) // loader도 설정 해줘야한다.
  ]
};