
const API_URL = '/api';
const SEARCH_API_URL = '/search-api';

module.exports = function(app) {

  // Set API routes
  app.use(API_URL, function(req, res, next) {
    require('./routes/entity.routes')(req, res, next);
  });

  // Set search API routes
  app.use(SEARCH_API_URL, function(req, res, next) {
    require('./routes/entity.search.routes')(req, res, next);
  });
}
