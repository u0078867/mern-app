
import passport from 'passport';
import jwt_validate from 'express-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByInstitutionId } from './dataServices/login.service';
import serverConfig from '../../config';


const API_URL = '/api';
const SEARCH_API_URL = '/search-api';
const GRAPHQL_API_URL = '/graphql';


module.exports = function(app) {

  app.use(require('./routes/setPassport')());

  app.use(jwt_validate({ secret: serverConfig.jwtSecret }).unless({path: ['/api/login/authenticate']}));

  // Set API routes
  app.use(API_URL, function(req, res, next) {
    require('./routes/subject.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/researcher.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/device.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/swtool.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/project.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/publication.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/output.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/activity.routes')(req, res, next);
  });
  app.use(API_URL, function(req, res, next) {
    require('./routes/login.routes')(req, res, next);
  });

  // Set GraphQL API route
  app.use(GRAPHQL_API_URL, function(req, res, next) {
    require('./routes/graphql.route')(req, res, next);
  });

  // Set search API routes
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/subject.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/researcher.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/device.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/swtool.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/project.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/publication.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/output.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/activity.search.routes')(req, res, next);
  });

  if (process.env.NODE_ENV === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
          message: err.message,
          error: err
      });
    })
  }

  // Production error handler (no stacktraces leaked)
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
          message: err.message,
          error: {}
      });
  });
}
