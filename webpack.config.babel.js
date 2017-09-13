var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');

// server vars
var API_PATH = path.resolve(__dirname, process.env.API_PATH || 'server/app/FIBEr_api');
var MODELS_PATH = path.resolve(__dirname, 'server/app/models');
var DB_PREFILLER_PATH = path.resolve(__dirname, process.env.DB_PREFILLER_PATH || 'server/app/FIBEr_db_prefiller');

// client vars
var JSS_WIDGETS_PATH = path.resolve(__dirname, process.env.JSS_WIDGETS_PATH || 'client/components/JSSForm/FIBEr_jss_widgets');
var CLIENT_UTIL = path.resolve(__dirname, 'client/util');
var MODULE_APP = path.resolve(__dirname, 'client/modules/App');
var MODULE_LOGIN = path.resolve(__dirname, process.env.MODULE_LOGIN || 'client/modules/LoginFIBEr');
var MODULE_DASHBOARD = path.resolve(__dirname, process.env.MODULE_DASHBOARD || 'client/modules/DashboardFIBEr');
var CONTAINER_CLASS = path.resolve(__dirname, process.env.CONTAINER_CLASS || 'client/components/FIBErContainer');

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
    extensions: ['', '.js', '.jsx', '.css'],
    modules: [ // necessary for development: resolve aliases copied here
      API_PATH,
      MODELS_PATH,
      DB_PREFILLER_PATH,
      JSS_WIDGETS_PATH,
      CLIENT_UTIL,
      MODULE_APP,
      MODULE_LOGIN,
      MODULE_DASHBOARD,
      CONTAINER_CLASS,
      'client',
      'node_modules',
    ],
    alias: {
      "API_PATH": API_PATH,
      "MODELS_PATH": MODELS_PATH,
      "DB_PREFILLER_PATH": DB_PREFILLER_PATH,
      "JSS_WIDGETS_PATH": JSS_WIDGETS_PATH,
      "CLIENT_UTIL": CLIENT_UTIL,
      "MODULE_APP": MODULE_APP,
      "MODULE_LOGIN": MODULE_LOGIN,
      "MODULE_DASHBOARD": MODULE_DASHBOARD,
      "CONTAINER_CLASS": CONTAINER_CLASS,
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
