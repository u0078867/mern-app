var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');
//var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');

// client vars
var JSS_WIDGETS_PATH = path.resolve(__dirname, process.env.JSS_WIDGETS_PATH || 'client/components/JSSForm/FIBEr_jss_widgets');
var CLIENT_UTIL = path.resolve(__dirname, 'client/util');
var MODULE_APP = path.resolve(__dirname, 'client/modules/App');
var MODULE_LOGIN = path.resolve(__dirname, process.env.MODULE_LOGIN || 'client/modules/LoginFIBEr');
var MODULE_DASHBOARD = path.resolve(__dirname, process.env.MODULE_DASHBOARD || 'client/modules/DashboardFIBEr');
var CONTAINER_CLASS = path.resolve(__dirname, process.env.CONTAINER_CLASS || 'client/components/FIBErContainer');


module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },

  output: {
    path: __dirname + '/dist/',
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[hash:base64]&modules&importLoaders=1!postcss-loader'),
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.(jpe?g|gif|png|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, { // https://github.com/crossbario/autobahn-js/issues/307
        test: require.resolve("cbor"),
        loader: "null-loader"
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ],

  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    cssnano({
      autoprefixer: false
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
