require('dotenv').config();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }    
});

const sendMail = (email,subjects,text,cb) => {
    const mailOption = {
        from: 'tech.innocreation@gmail.com',
        to: email,
        subject: subjects,
        html: text
    };
    
    transporter.sendMail(mailOption,function(err,data){
        if(err)
        {
            cb(err,null);
        }
        else
        {
            cb(null,data);
        }
    });
}

module.exports = sendMail;

