const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'cuntiversity@mail.ru',
    pass: 'VKUadP2a6_jy'
  }
},
{
    from: "Canteen <cuntiversity@mail.ru>"
});

const mailer = message => {
    transporter.sendMail(message,(err, info)=>{
        if(err) return console.log(err);
        console.log(info);
    });
}

module.exports = mailer;