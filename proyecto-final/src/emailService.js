const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:'gscm.dev@gmail.com',
        pass:'Sebastian:999'
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'gscm.dev@gmail.com',
        to:to,
        subject: subject,
        text:text
    };

    try{
        await transporter.sendMail(mailOptions);
    }catch(e){
        console.log('Error al enviar el mail', e)
    }
}

module.exports = {sendEmail};