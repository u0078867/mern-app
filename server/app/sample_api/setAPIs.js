
const API_URL = '/api';
const SEARCH_API_URL = '/search-api';

const API_URL_2 = '/api2';
const SEARCH_API_URL_2 = '/search-api2';

module.exports = function(app) {

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
    require('./routes/output.routes')(req, res, next);
  });
  app.use(API_URL_2, function(req, res, next) {
    require('./routes/entity.routes')(req, res, next);
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
    require('./routes/output.search.routes')(req, res, next);
  });
  app.use(SEARCH_API_URL_2, function(req, res, next) {
    require('./routes/entity.search.routes')(req, res, next);
  });
}
