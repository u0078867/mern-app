var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var ExternalsPlugin = require('webpack-externals-plugin');

// Load env
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/env'});
dotenv.load();

const v = require('./webpack.vars');


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
      "API_PATH": v.API_PATH,
      "MODELS_PATH": v.MODELS_PATH,
      "DB_PREFILLER_PATH": v.DB_PREFILLER_PATH,
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
