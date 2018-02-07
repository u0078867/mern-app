
const config = {
  // general:
  mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mern-starter',
  port: process.env.PORT || 8000,
  workDir: process.env.WORK_DIR || './upload',
  prefillDb: parseInt(process.env.PREFILL_DB) || 2,
  schemasDir: process.env.SCHEMAS_DIR || './FIBEr_schemas',
  osmosDriver: process.env.OSMOS_DRIVER || 'mongo',
  minioUrl: process.env.MINIO_URL || 'play.minio.io',
  minioPort: parseInt(process.env.MINIO_PORT) || 9000,
  minioAccessKey: process.env.MINIO_ACCESS_KEY || 'Q3AM3UQ867SPQQA43P2F',
  minioSecretKey: process.env.MINIO_SECRET_KEY || 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
  minioBucket: process.env.MINIO_BUCKET || 'upload',
  // used only by WAMP osmos driver:
  drvWAMPUrl: process.env.DRIVER_WAMP_URL || 'ws://127.0.0.1:8002/ws',
  drvWAMPRealm: process.env.DRIVER_WAMP_REALM || 'realm1',
  drvWAMPtargetDb: process.env.DRIVER_WAMP_TARGET_DB || 'mongo',
  // used only by Mongo osmos driver:
  drvMongoURL: process.env.DRIVER_MONGO_URL || 'mongodb://127.0.0.1:27017/mern-starter',
};

export default config;
