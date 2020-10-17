
const sendEmail = require('./sendgmail');

var subject = 'SHLC Online Learning Platform :Enrollment for '+ courses;

                    //send email 
                    sendEmail('steven.w.thanhtut@gmail.com',subject,courses,function(err,data){
                        if(err){
                            console.log(err);
                            throw err;
                        }
                        else{
                            console.log(courses);
                            console.log('Success!');
        
                            //for forgot password
        
                        }
                    });