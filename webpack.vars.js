

var path = require('path');


module.exports = {

  // server vars
  API_PATH: path.resolve(__dirname, process.env.API_PATH || 'server/app/FIBEr_api'),
  MODELS_PATH: path.resolve(__dirname, 'server/app/models'),
  DB_PREFILLER_PATH: path.resolve(__dirname, process.env.DB_PREFILLER_PATH || 'server/app/FIBEr_db_prefiller'),

  // client vars
  JSS_WIDGETS_PATH: path.resolve(__dirname, process.env.JSS_WIDGETS_PATH || 'client/components/JSSForm/FIBEr_jss_widgets'),
  CLIENT_UTIL: path.resolve(__dirname, 'client/util'),
  MODULE_APP: path.resolve(__dirname, 'client/modules/App'),
  MODULE_LOGIN: path.resolve(__dirname, process.env.MODULE_LOGIN || 'client/modules/LoginFIBEr'),
  MODULE_DASHBOARD: path.resolve(__dirname, process.env.MODULE_DASHBOARD || 'client/modules/DashboardFIBEr'),
  CONTAINER_CLASS: path.resolve(__dirname, process.env.CONTAINER_CLASS || 'client/components/FIBErContainer'),
  LOGGED_CONTAINER_CLASS: path.resolve(__dirname, process.env.LOGGED_CONTAINER_CLASS || 'client/components/FIBErLoggedInContainer'),
  SUBMITTERS_PATH: path.resolve(__dirname, process.env.SUBMITTERS_PATH || 'client/modules/Form/components/FIBErSubmitters'),

}
