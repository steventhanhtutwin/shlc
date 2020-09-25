const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const sendEmail = require('../resources/sendgmail');

const router = express.Router();

router.use(cors());

// use the express-static middleware
router.use(express.static("public"));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/forgotpassword', (req, res) => {

    var rowsrecord;
    //console.log(req.body);
 
     var connection = mysql.createConnection({
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })
    
    var username = req.body.username;

    console.log(username);
 
     connection.connect();

     connection.query("SELECT * FROM heroku_2fa387dfa408f94.shlcusers where email = '"+ username + "';", function (err, rows, fields) {
        if (err)
        { 
            throw err;
        }
        else
        {
            //console.log(rows);
            // rowsrecord = rows.recordsets[0];
            rowsrecord = rows;
           // console.log(lng);
        }

        connection.end();

        console.log(rowsrecord.length);

        if (rowsrecord.length > 0)
        {
            console.log("found");

            //var passwordst = rowsrecord.password;

            var emailbody = '<!DOCTYPE html>'+
            '<html><head><title>Change Password</title>'+
            '</head><body><div>'+
            'Hello,<br> <br> To reset your password please follow the link below:<br>' +
            '<a href = "https://shlc.study/resetpassword.html?email='+username+'">Reset Password </a>'+
            '<br><br>If you\'re not sure why you\'re receiving this message, you can report it to us by emailing <a href="tech.innocreation@gmail.com">tech.innocreation@gmail.com</a>.' +
            '<br><br>Thanks, <br> SHLC Team</div></body></html>'

            var subject = 'Instructions for changing your SHLC Online Learning Platform Account password';

            sendEmail(username,subject,emailbody,function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('Success!');
                }
            });

            var pass = rowsrecord[0].password;

            res.status(200).json({
                data:rowsrecord,
                status: 'success'
            });
        }
        else
        {
            console.log("notfound");
            res.status(400).json({
                data:rowsrecord,
                status: 'fail'
             });     
        }

        res.end();

     })
 });

module.exports = router;