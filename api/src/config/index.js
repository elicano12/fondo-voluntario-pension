require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  log_level: process.env.LOG_LEVEL || 'info',
  mongoUri: process.env.MONGO_URI,
  isDevelopment: process.env.NODE_ENV === 'development',
  collection: "fondos",
  collectionUsuarios: "usuarios",
  collectionTransaccion: "transacciones",
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  twilioToken: process.env.TWILIO_TOKEN,
  twilioSid: process.env.TWILIO_SID,
  twilioTelefono: process.env.TWILIO_TELEFONO,
};