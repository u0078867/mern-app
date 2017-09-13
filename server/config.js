const config = {
  // general:
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  workDir: process.env.WORK_DIR || './upload',
  prefillDb: parseInt(process.env.PREFILL_DB) || 2,
  schemasDir: process.env.SCHEMAS_DIR || './FIBEr_schemas',
  osmosDriver: process.env.OSMOS_DRIVER || 'mongo',
  // used only by WAMP osmos driver:
  drvWAMPUrl: process.env.DRIVER_WAMP_URL || 'ws://127.0.0.1:8002/ws',
  drvWAMPRealm: process.env.DRIVER_WAMP_REALM || 'realm1',
  drvWAMPtargetDb: process.env.DRIVER_WAMP_TARGET_DB || 'mongo',
  // used only by Mongo osmos driver:
  drvMongoURL: process.env.DRIVER_MONGO_URL || 'mongodb://localhost:27017/mern-starter',
};

export default config;
