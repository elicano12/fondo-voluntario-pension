const twilio = require('twilio');
const config = require("../config");

const client = new twilio(config.twilioSid, config.twilioToken);

const enviarSMS = (numeroTelefono, mensaje) => {
  client.messages
    .create({
      body: mensaje,
      from: config.twilioTelefono, 
      to: numeroTelefono,
    })
    .then(message => console.log('Mensaje SMS enviado:', message.sid))
    .catch(error => console.error('Error al enviar SMS:', error));
}


module.exports = enviarSMS