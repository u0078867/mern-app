const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  workDir: process.env.WORK_DIR || '.',
};

export default config;
