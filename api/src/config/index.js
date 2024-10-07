require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  log_level: process.env.LOG_LEVEL || 'info',
  mongoUri: process.env.MONGO_URI,
  isDevelopment: process.env.NODE_ENV === 'development',
  collectionFund: "fondos",
  collectionUsers: "usuarios",
  collectionTransaction: "transacciones",
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  twilioToken: process.env.TWILIO_TOKEN,
  twilioSid: process.env.TWILIO_SID,
  twilioSidSms: process.env.TWILIO_SID_SMS,
  twilioTelefono: process.env.TWILIO_TELEFONO,
};