require('dotenv').config();

let fs = require('fs');
let path = require('path');
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');


// Open template file

console.log(path.join(__dirname,'../views/forgotpassword.hbs'));
var source = fs.readFileSync(path.join(__dirname,'../views/forgotpassword.hbs') , 'utf8');

// Create email generator
var template = Handlebars.compile(source);


let transporter = nodemailer.createTransport({
    //service: 'gmail',
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
    //  auth:{
    //     user: 'tech.innocreation@gmail.com',
    //    pass: 'innocre@ti0n'
    //}
    auth:{
        user: 'support@shlc.study',
        pass: 'shlc.study'
    }    
});

const sendMail = (email,subjects,text,cb) => {
    const mailOption = {
        from: 'support@shlc.study',
        to: email,
        subject: subjects,
        html: template({text})
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

