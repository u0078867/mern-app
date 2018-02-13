/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  // Load env
  const dotenv = require('dotenv');
  dotenv.config({path: __dirname + '/env'});
  dotenv.load();
  // load assets
  process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  // Load env
  const dotenv = require('dotenv');
  dotenv.config({path: __dirname + '/env'});
  dotenv.load();
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./server/server');
}
