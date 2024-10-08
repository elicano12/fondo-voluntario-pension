
const mongoose = require('mongoose');
const config = require('../');
const pino = require('pino');

const logger = pino();

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('Connection to database was established successfully'); 
  } catch (error) {
    logger.info('Error to connect with MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;

