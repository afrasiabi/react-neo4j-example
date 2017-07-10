var path, webpack, CaseSensitivePathsPlugin, WatchMissingNodeModulesPlugin;
path = require('path');
webpack = require('webpack');
CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

module.exports = {
  entry: [
    'react-hot-loader/patch', 
    'webpack-dev-server/client?http://localhost:3000', 
    'webpack/hot/only-dev-server', 
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      '$el': path.resolve(__dirname, 'src/helpers/createElement.ls'),
      '$assets': path.resolve(__dirname, 'assets')
    },
    extensions: ['.ls', '.js', '.jsx']
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        loaders: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              module: true,
              sourceMap: true,
              localIdentName: '[name]_[local]_[hash:base64:3]'
            }
          }, {
            loader: 'stylus-loader'
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.(png|jpeg|ttf)$/,
        loaders: ['file-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin, 
    new webpack.NamedModulesPlugin, 
    new WatchMissingNodeModulesPlugin, 
    new webpack.NoEmitOnErrorsPlugin
  ],
  devServer: {
    host: 'localhost',
    overlay: true,
    port: 3000,
    historyApiFallback: true,
    hot: true
  }
};