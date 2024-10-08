const app = require('./app');
const config = require('./config');
const connectDB = require('./config/databases/mongoDB');
const pino = require('pino');

const logger = pino();

const PORT = config.port;

const start = () => {
  try {
    connectDB();    
    app.listen(PORT);
    logger.info(`Server running on port ${PORT}`);
  } catch (error) {
    logger.error('Failed trying to run the server', error);
  }
};

start();