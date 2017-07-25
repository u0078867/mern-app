import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import fileUpload from 'express-fileupload';


// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  let webpack = require('webpack');
  let config = require('../webpack.config.dev');
  let webpackDevMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      chunks: false,  // necessary otherwise autobahn logs a lot of data
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  // Watch files and clean cache (server)
  compiler.plugin('done', function() {
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]client[\/\\]/.test(id)) {
        //console.log(`Uncaching ${id} ...`);
        delete require.cache[id];
      }
    });
  });

}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './app/util/fetchData';
//import dummyData from './app/dummyData';
import serverConfig from './config';

// Display server config
console.log(serverConfig);

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  console.log('Connected to db')

  var fillLevel = serverConfig.prefillDb;

  var dummyData = (verbose, fillLevel) => {
    require('./app/dummyData')(verbose, fillLevel)
    .then(() => console.log('db filled with fictitious data when necessary'))
    .catch(err => console.log(err));
  }

  dummyData(false, fillLevel);
  if (process.env.NODE_ENV === 'development') {
    // feed some dummy data in DB.
    var readline = require('readline');
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    console.log('Type "fill" to fill Mongo with fictitious data ...');
    rl.on('line', (line) => {
      console.log(`typed '${line}'`);
      if (line == 'fill') {
        dummyData(false, fillLevel);
      }
    });
  }
});

// Apply body Parser and server public assets and routes (non-APIs)
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(fileUpload());

// Specify APIs
const API_URL = '/api';
const SEARCH_API_URL = '/search-api';
app.use(API_URL, function(req, res, next) {
  require('./app/routes/form.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/subm.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/upload.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/subject.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/researcher.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/device.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/swtool.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/output.routes')(req, res, next);
});
app.use(API_URL, function(req, res, next) {
  require('./app/routes/database.routes')(req, res, next);
});
app.use(SEARCH_API_URL, function(req, res, next) {
  require('./app/routes/subject.search.routes')(req, res, next);
});
app.use(SEARCH_API_URL, function(req, res, next) {
  require('./app/routes/researcher.search.routes')(req, res, next);
});
app.use(SEARCH_API_URL, function(req, res, next) {
  require('./app/routes/device.search.routes')(req, res, next);
});
app.use(SEARCH_API_URL, function(req, res, next) {
  require('./app/routes/swtool.search.routes')(req, res, next);
});
app.use(SEARCH_API_URL, function(req, res, next) {
  require('./app/routes/output.search.routes')(req, res, next);
});
app.use('/test-hmr-api', function(req, res, next) {
  require('./app/routes/test.hmr.routes')(req, res, next);
});

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);


  /*
  removed:
    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
    <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />

  fixed/improved:
    - warning with https://github.com/Hashnode/mern-starter/issues/149
    - add .replace(/</g, '\\u003c') to JSON.stringify(initialState)
      (http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations)
  */

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}

      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

if (process.env.NODE_ENV === 'development') {
  // Watch files and clean cache (server)
  let chokidar = require('chokidar');
  const watcher = chokidar.watch(path.resolve(__dirname) + '/app');
  watcher.on('ready', function() {
    console.log('Chokidar ready to watch server files');
    watcher.on('all', function() {
      console.log("Clearing /app/ module cache from server");
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]app[\/\\]/.test(id)) {
          //console.log(`Uncaching ${id} ...`);
          delete require.cache[id];
        }
      });
    });
  });
}

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`SERVER is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});

export default app;
