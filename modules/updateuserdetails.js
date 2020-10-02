const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const e = require("express");

const router = express.Router();

router.use(cors());

// use the express-static middleware
router.use(express.static("public"));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/updateuserdetails', (req, res) => {

     var connection = mysql.createConnection({
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })

     var username = req.body.username;
     var email = req.body.email;
     var phonenumber = req.body.phonenumber;
     var oldemail = req.body.oldemaill;

     console.log(username);
    
     connection.connect();
     
     connection.query("UPDATE heroku_2fa387dfa408f94.shlcusers set username = '"+ username +"',email = '"+ email +"',phonenumber = '"+ phonenumber  +"' where email = '" + oldemail + "'", function (err, rows, fields) {

        console.log('The solution is updated');

        if(email.trim() == oldemail.trim())
        {
            console.log("same!");
        }
        else{
            var emailbody = '<!DOCTYPE html>'+
            '<html><head><title>Change Password</title>'+
            '</head><body><div>'+
            'Hello,<br> <br> The email address associated with your account has recently been changed to '+email +
            'If you believe this is an error, please click on the button below to visit our support portal, through which you can contact our support team.<br>' +
            'Thanks and Regards, <br> The Support SHLC Team'

            var subject = 'SHLC: User Email Changed!';

            sendEmail(username,subject,emailbody,function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('Success!');
                }
            });
        }
        
     })
 
     console.log("Connect");
     
     connection.end();
 
     res.status(200).json({
        status: 'succes',
        data: req.body
     })
 });

 module.exports = router;
 