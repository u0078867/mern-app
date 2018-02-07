
const API_URL = '/api';
const SEARCH_API_URL = '/search-api';


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

  //app.use('/graphql', require('./routes/graphql.route'));
  app.use('/graphql', function(req, res, next) {
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
}
