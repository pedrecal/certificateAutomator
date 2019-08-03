const nodemailer = require('nodemailer');

const sendCert = async (email, certificate) => {
  let result = null;
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
  });

  const message = {
    from: '"Broto Incubadora de Biotecnologia" <brotobiotec@gmail.com>',
    to: email,
    subject: 'Seu sertificado do EVENTO chegou!',
    text: 'Seu certificado se encontra em anexo!',
    attachments: [{
      filename: `${certificate}.pdf`,
      path: `./certificates/${certificate}.pdf`
    }]
  };

  await transporter.sendMail(message, async (error, info) => {
    if (error) {
      result = error
      console.log('error =>',result);
      return await result
    }
    console.log('Message sent: %s', info.messageId);
    return await result
  });
  return await result
}

module.exports = {sendCert};