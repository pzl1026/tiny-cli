const webpack = require('webpack');
const path = require('path');
const CWD = process.cwd();
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      // babel编译
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // vue编译loader，需要与下面的plugin的VueLoaderPlugin联合使用，不然会报错
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // less编译
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
        ]
      },
      // 对css样式进行编译，包括vue文件里面的style
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      // 加载静态文件, webpack4版本不需要file-loader单独配置，不然图片出不来（巨坑）
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: require.resolve('file-loader'),
              limit: 8192,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins:  [
    // 清空之前的输出目录
    new CleanWebpackPlugin(),
    //  以什么html为模板
    new HtmlWebpackPlugin({
      hash: true,
      title: 'tiny-demo',
      template: './src/index.html',
    }),
    new ExtractTextPlugin('style.css'),
    // 与vue-loader配合使用，编译vue文件
    new VueLoaderPlugin(),
    // 启用热替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // 别名
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', //这里如果不加这个，import vue时会报错
      '@': path.join(CWD, './src') //src别名目录
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
};