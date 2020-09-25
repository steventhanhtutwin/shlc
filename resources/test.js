const nodemailer = require('./sendgmail');

nodemailer('steven.w.thanhtut@gmail.com','','',function(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log('Success!');
    }
});