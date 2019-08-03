const nodemailer = require('nodemailer');

const sendCert = (email, certificate, subject, text) => {
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
    subject,
    text,
    attachments: [{
      filename: `${certificate}.pdf`,
      path: `./certificates/${certificate}.pdf`
    }]
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      result = error
      console.log('error =>',result);
      return result
    }
    console.log('Message sent: %s', info.messageId);
    return result
  });
  return result
}

module.exports = {sendCert};