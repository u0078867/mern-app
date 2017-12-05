/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import { setShowServices } from 'MODULE_APP/AppActions';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.

  require('./modules/Form/pages/FormListPage/FormListPage');
  require('./modules/Form/pages/FormDetailPage/FormDetailPage');
  require('./modules/Subm/pages/SubmListPage/SubmListPage');
  require('./modules/Subm/pages/SubmDetailPage/SubmDetailPage');
  require('./modules/DBData/pages/DataView/DataView');
  require('MODULE_DASHBOARD/pages/DashboardPage/DashboardPage');

  require('LOGGED_CONTAINER_CLASS/LoggedInContainer');

  require('./components/EnsureLoggedInContainer')

  require('MODULE_LOGIN/pages/LoginPage/LoginPage');

  require('CONTAINER_CLASS/Container');

}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>

    <Route
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('CONTAINER_CLASS/Container').default);
        });
      }}
    >

      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('MODULE_LOGIN/pages/LoginPage/LoginPage').default);
          });
        }}
      />

      <Route
        path="/login"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('MODULE_LOGIN/pages/LoginPage/LoginPage').default);
          });
        }}
      />

      <Route
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/EnsureLoggedInContainer').default);
          });
        }}
      >

        <Route
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('LOGGED_CONTAINER_CLASS/LoggedInContainer').default);
            });
          }}
        >

          <Route
            path="/dashboard"
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('MODULE_DASHBOARD/pages/DashboardPage/DashboardPage').default);
              });
            }}
          />

          <Route
            path="/forms"
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('./modules/Form/pages/FormListPage/FormListPage').default);
              });
            }}
          />

          <Route
            path="/db-data"
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('./modules/DBData/pages/DataView/DataView').default);
              });
            }}
          />

          <Route
            path="/forms/:slug-:cuid"
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('./modules/Form/pages/FormDetailPage/FormDetailPage').default);
              });
            }}
          />

          <Route
            path="/subms"
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('./modules/Subm/pages/SubmListPage/SubmListPage').default);
              });
            }}
          />

          <Route
            path="/subms/:slug-:cuid"
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('./modules/Subm/pages/SubmDetailPage/SubmDetailPage').default);
              });
            }}
          />

        </Route>

      </Route>

    </Route>

  </Route>

);
