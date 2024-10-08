const config = require("../config");

const client = require('twilio')(config.twilioSid, config.twilioToken);
const enviarSMS = (numeroTelefono, mensaje) => {
  client.messages
    .create({
      body: mensaje,
      messagingServiceSid:config.twilioSidSms,
      to: numeroTelefono,
    })
    .then(message => console.log('Mensaje SMS enviado:', message.sid))
    .catch(error => console.error('Error al enviar SMS:', error));
}

module.exports = enviarSMS