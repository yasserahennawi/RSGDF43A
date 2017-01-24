'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let appEntry;
let devtool;
let plugins;

function getProcessEnv() {
  const envFile = path.join(__dirname, '.env');
  let data = {};
  if (!fs.existsSync(envFile)) {
    data = process.env;
    const jsonVars = {};
    for (const key in data) jsonVars[key] = JSON.stringify(data[key]);
    return jsonVars;
  }

  var lines = fs.readFileSync(envFile).toString().split(/\r?\n/), keyValue;
  for (var i = 0; i < lines.length; i++) {
    if (! lines[i]) {
      continue;
    }
    keyValue = lines[i].split('=');
    data['process.env.' + keyValue[0]] = JSON.stringify(keyValue[1]);
  }
  return data;
}

const htmlTemplate = new HtmlWebpackPlugin({
  title: 'TasteTastic',
  template: './client/index.html',
  mobile: true,
  inject: false
});
const favIcon = new FaviconsWebpackPlugin('./client/assets/logo.png');

if (process.env.NODE_ENV === 'production') {
  appEntry = [path.join(__dirname, 'client/index.js')];
  devtool = 'source-map';
  plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin(getProcessEnv()),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    htmlTemplate,
    favIcon
  ];
} else {
  appEntry = [
    path.join(__dirname, 'client/index.js'),
    `webpack-dev-server/client?http://localhost:${process.env.PORT}`,
    'webpack/hot/only-dev-server'
  ];
  devtool = 'eval';
  plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(getProcessEnv()),
    htmlTemplate,
    favIcon
  ];
}

module.exports = {
  entry: {
    app: appEntry,
    vendor: ['react', 'react-dom', 'react-relay', 'react-router', 'react-router-relay']
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },{
      test: /\.json$/,
      loader: 'json-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1' +
          '&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000&name=assets/[hash].[ext]'
    }]
  },
  resolve: {
    context: path.join(__dirname, "/client"),
    modules: ['client', 'node_modules']
  },
  postcss: () => [precss, autoprefixer],
  plugins
};
