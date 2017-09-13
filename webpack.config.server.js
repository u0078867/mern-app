var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var ExternalsPlugin = require('webpack-externals-plugin');

var API_PATH = path.resolve(__dirname, process.env.API_PATH || 'server/app/FIBEr_api');
var MODELS_PATH = path.resolve(__dirname, 'server/app/models');
var DB_PREFILLER_PATH = path.resolve(__dirname, process.env.DB_PREFILLER_PATH || 'server/app/FIBEr_db_prefiller');

module.exports = {

  entry: path.resolve(__dirname, 'server/server.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
    alias: {
      "API_PATH": API_PATH,
      "MODELS_PATH": MODELS_PATH,
      "DB_PREFILLER_PATH": DB_PREFILLER_PATH,
    },
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            [
              'babel-plugin-webpack-loaders', {
                'config': './webpack.config.babel.js',
                "verbose": false
              }
            ]
          ]
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ],
};
