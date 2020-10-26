const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const sendEmail = require('../resources/sendgmail');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('forgotpassword');

const router = express.Router();


router.use(cors());

// use the express-static middleware
router.use(express.static("public"));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/forgotpassword', (req, res) => {

    var rowsrecord;
    //console.log(req.body);
    
    var email = req.body.email;

    console.log(email);

    var forgotpasswordencrypts = cryptr.encrypt(new Date().toLocaleString() + email  );
    console.log(cryptr.encrypt(new Date().toLocaleString() + email ));

    var forgotpasswordencrypt = forgotpasswordencrypts.substring(1,20);
    let forgotpasswordResetLink = 'https://shlc.study/resetpassword.html?data=' + forgotpasswordencrypt;



    // check the email exist or not
    console.log("check the email is registered or not!");
    console.log(email);
    var connection = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    });

     connection.connect();

     //check email exist or not
     connection.query("SELECT * FROM heroku_8e74fc53b2ed17d.users where email = '"+ email + "';", function (err, rows, fields) {
        if (err)
        { 
            connection.end();

            throw err;
        }
        else
        {
            rowsrecord = rows;
        }
    });

    console.log("connection end!");
    connection.end();


    if(rowsrecord.length > 0)
    {
        //send email link to customer first 
        var subject = 'SHLC Online Learning Platform : Change Password';
            
            //send email 
            sendEmail(email,subject,forgotpasswordResetLink,function(err,data){
                if(err){
                    console.log(err);
                    throw err;
                }
                else{
                    console.log(forgotpasswordResetLink);
                    console.log('Success!');

                    //for forgot password

                }
            });

        //insert email link 
        var connections = mysql.createConnection({
            user :'b44f084e2826b8',
            password : '21165fd2',
            host:'us-cdbr-east-02.cleardb.com',
            database:'heroku_8e74fc53b2ed17d'
        })
    
        connections.connect();
        connections.query("INSERT INTO heroku_8e74fc53b2ed17d.forgotpassword(Useremail, ResetURL, RequestedOn, Reset) values ('"+ email +"', '"+ forgotpasswordencrypt +"',CURRENT_TIMESTAMP(), '1' )", 
            function (err, rows, fields) {
                console.log('The solution is inserted');
            }
        );
        connections.end();
    }
    else
    {
        console.log("The email is not registerd at yet!");
        //email not register at yet
        res.status(400).json({
            status: 'fail',
            errmessage: '***စာရင်းသွင်းထားခြင်းမရှိသေးပါ..'
        });
    }

        

        


        // check with email is found or not
        // if return rowsrecord > 0 is found the record
        // if return rowsreocrd = 0 is not found the record
        if (rowsrecord.length > 0)
        {
            console.log("found");

            //forgot password email reset link

            

            //var pass = rowsrecord[0].password;
            //send status after sent email
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

     
 });

module.exports = router;