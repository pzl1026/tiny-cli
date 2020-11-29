const webpack = require('webpack');
const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: './',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //       loaders: {
      //           'scss': [
      //               'vue-style-loader',
      //               'css-loader',
      //               'sass-loader'
      //           ],
      //           'sass': [
      //               'vue-style-loader',
      //               'css-loader',
      //               'sass-loader?indentedSyntax'
      //           ],
      //       }
      //   }
      // }
    ],
  },
  plugins:  [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'tiny-demo',
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new VueLoaderPlugin()
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
      contentBase: './dist',
      hot: true
  },
};