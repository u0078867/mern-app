var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');

const v = require('./webpack.vars');


var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    //extensions: ['', '.js', '.jsx', '.css'],
    extensions: ['.js', '.jsx', '.css'],
    modules: [ // necessary for development: resolve aliases copied here
      v.API_PATH,
      v.MODELS_PATH,
      v.DB_PREFILLER_PATH,
      v.JSS_WIDGETS_PATH,
      v.CLIENT_UTIL,
      v.MODULE_APP,
      v.MODULE_LOGIN,
      v.MODULE_DASHBOARD,
      v.CONTAINER_CLASS,
      v.LOGGED_CONTAINER_CLASS,
      v.SUBMITTERS_PATH,
      'client',
      'node_modules',
    ],
    alias: {
      "API_PATH": v.API_PATH,
      "MODELS_PATH": v.MODELS_PATH,
      "DB_PREFILLER_PATH": v.DB_PREFILLER_PATH,
      "JSS_WIDGETS_PATH": v.JSS_WIDGETS_PATH,
      "CLIENT_UTIL": v.CLIENT_UTIL,
      "MODULE_APP": v.MODULE_APP,
      "MODULE_LOGIN": v.MODULE_LOGIN,
      "MODULE_DASHBOARD": v.MODULE_DASHBOARD,
      "CONTAINER_CLASS": v.CONTAINER_CLASS,
      "LOGGED_CONTAINER_CLASS": v.LOGGED_CONTAINER_CLASS,
      "SUBMITTERS_PATH": v.SUBMITTERS_PATH,
    },
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=' + cssModulesIdentName + '&modules&importLoaders=1&sourceMap!postcss-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    //new webpack.NoErrorsPlugin(),
  ],
  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
