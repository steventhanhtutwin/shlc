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
 
    var connection = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })
    

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var courseid = req.body.courseid;

    if(courseid > 0)
    {
        console.log('>0');
    } 
    else
    {
        console.log('=0');
    }
 
    console.log(courseid);
    connection.connect();
 
     connection.query("INSERT INTO heroku_8e74fc53b2ed17d.users(name, password, email, phonenumber, status, registeron) values ('"+ username +"', Password('"+ password +"'),'"+ email + "','"+ phonenumber + "','0', CURRENT_TIMESTAMP() )", function (err, rows, fields) {
        console.log('The solution is inserted');
     })
 
     console.log("Register Users");

     connection.end();


    if(courseid > 0)
    {
        var connections = mysql.createConnection({
            user :'b44f084e2826b8',
            password : '21165fd2',
            host:'us-cdbr-east-02.cleardb.com',
            database:'heroku_8e74fc53b2ed17d'
        })

        connections.connect();
    
        connections.query("INSERT INTO heroku_8e74fc53b2ed17d.enrollment(useremail,CourseId,RequestedOn,status) values ('"+ email +"', '"+ courseid +"', CURRENT_TIMESTAMP(), '0' )", function (err, rows, fields) {
            console.log('The solution is inserted');

            
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

                    var subject = 'SHLC Learning Platform Enrollment for '+courses ;

                    //send email 
                    sendEmail(email,subject,courses,function(err,data){
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
        });

        console.log("Complete enrollment");
        
        connections.end();
    }
 
   
 
     res.status(200).json({
        status: 'succes',
        data: req.body
     })
 });

 module.exports = router;
 