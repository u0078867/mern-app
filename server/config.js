const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  //mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 8000,
  workDir: process.env.WORK_DIR || 'C:/Users/u0078867/mern',
};

export default config;
