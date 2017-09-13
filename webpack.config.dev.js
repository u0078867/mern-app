var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');

// client vars
var JSS_WIDGETS_PATH = path.resolve(__dirname, process.env.JSS_WIDGETS_PATH || 'client/components/JSSForm/FIBEr_jss_widgets');
var CLIENT_UTIL = path.resolve(__dirname, 'client/util');
var MODULE_APP = path.resolve(__dirname, 'client/modules/App');
var MODULE_LOGIN = path.resolve(__dirname, process.env.MODULE_LOGIN || 'client/modules/LoginFIBEr');
var MODULE_DASHBOARD = path.resolve(__dirname, process.env.MODULE_DASHBOARD || 'client/modules/DashboardFIBEr');
var CONTAINER_CLASS = path.resolve(__dirname, process.env.CONTAINER_CLASS || 'client/components/FIBErContainer');


module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    //publicPath: 'http://0.0.0.0:8000/',
    publicPath: 'http://localhost:8000/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modules: [
      'client',
      'node_modules',
    ],
    alias: {
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
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      }, {
        test: /\.(jpe?g|gif|png|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: require.resolve("cbor"),
        loader: "null-loader"
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
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
