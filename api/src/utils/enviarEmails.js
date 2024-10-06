const nodemailer = require("nodemailer");
const config = require("../config");

const enviarEmail = (destinatario, mensaje) => {
  const mailOptions = {
    from: config.user,
    to: destinatario,
    subject: "Notificación de Fondo",
    text: mensaje,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });
};

module.exports = enviarEmail;
