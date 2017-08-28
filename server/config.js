const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  workDir: process.env.WORK_DIR || './upload',
  prefillDb: parseInt(process.env.PREFILL_DB) || 2,
  schemasDir: process.env.SCHEMAS_DIR || './examples/sample_schemas',
};

export default config;
