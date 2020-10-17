const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const sendEmail = require('../resources/enrollcourse');

const router = express.Router();

router.use(cors());


// use the express-static middleware
router.use(express.static("public"));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
    //console.log(req.body);

    //read the req body
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var courseid = req.body.courseid;

    var courses ='';

        if(courseid == 1)
        {
            courses = 'Basic Acrylic Painting Class';
        }
        else if (courseid ==2)
        {
            courses ='Revit Family Creation';
        }
        else
        {
            courses ='အားလုံးအတွက် Japan စာ';

        }

        console.log("User selected " + courses + "to register");

    
        console.log("Firstly, User (" + email +") try to send email to user.....")
        var subject = 'SHLC Learning Platform Enrollment for '+courses ;

       
            sendEmail(email,subject,courses,function(err,data){
                if(err){
                    console.log("User Email is not correct!");
                    console.error(err);

                    res.status(400).json({
                        status: 'fail',
                        errmessage: 'user email format is not correct'
                    });

                    res.end();
                }
                else{

                    console.log(courses);
                    console.log('SuccessFully send email to user, user email is correct!');

                    //for forgot password

                    console.log("Open connection to register User!");

                        var connection = mysql.createConnection({
                            user :'b44f084e2826b8',
                            password : '21165fd2',
                            host:'us-cdbr-east-02.cleardb.com',
                            database:'heroku_8e74fc53b2ed17d'
                        })

                        connection.connect();
                    
                        connection.query("INSERT INTO heroku_8e74fc53b2ed17d.users(name, password, email, phonenumber, status, registeron) values ('"+ username +"', Password('"+ password +"'),'"+ email + "','"+ phonenumber + "','0', CURRENT_TIMESTAMP() )", function (err, rows, fields) {
                            console.log('The solution is inserted');
                        })

                        connection.end();

                        console.log("Register done!" + email);


                        
                        if(courseid > 0)
                        {
                            console.log("User has selected course!");

                            var connections = mysql.createConnection({
                                user :'b44f084e2826b8',
                                password : '21165fd2',
                                host:'us-cdbr-east-02.cleardb.com',
                                database:'heroku_8e74fc53b2ed17d'
                            })

                            connections.connect();
                        
                            connections.query("INSERT INTO heroku_8e74fc53b2ed17d.enrollment(useremail,CourseId,RequestedOn,status) values ('"+ email +"', '"+ courseid +"', CURRENT_TIMESTAMP(), '0' )", function (err, rows, fields) {
                                console.log('The solution is inserted');
                                        
                            });

                            console.log("Complete enrollment");
                            
                            connections.end();

                            console.log("User done enroll selected course!");
                        }

                        console.log("Done!");
                        res.status(200).json({
                            status: 'succes',
                            data: req.body
                        })

                }
            });
 });

 module.exports = router;
 