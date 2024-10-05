require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  log_level: process.env.LOG_LEVEL || 'info',
  mongoUri: process.env.MONGO_URI,
  isDevelopment: process.env.NODE_ENV === 'development',
  collection: process.env.MONGO_COLLECTION,
  collectionUser: process.env.MONGO_COLLECTION_USER,
  collectionFondo: process.env.MONGO_COLLECTION_FONDO,
  collectionRetiro: process.env.MONGO_COLLECTION_RETIRO,
  collectionTransferencia: process.env.MONGO_COLLECTION_TRANSFERENCIA,
  collectionSobreCarga: process.env.MONGO_COLLECTION_SOBRECARGA,
};