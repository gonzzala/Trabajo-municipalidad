const nodemailer = require('nodemailer');

const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reclamosmunicipalidaddeazul@gmail.com', 
      pass: 'lufl nnsm kgmj kuar', 
    },
  });

  const mailOptions = {
    from: 'reclamosmunicipalidaddeazul@gmail.com', 
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
