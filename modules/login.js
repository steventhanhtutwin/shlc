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

router.post('/login', (req, res) => {

    var rowsrecord;
    
    var username = req.body.username;
    var password = req.body.password;
    var courseid = req.body.courseid;

    console.log(username);
    console.log(password);
    console.log(courseid);

 
    var connection = mysql.createPool({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })
 
     //connection.connect();

     connection.query("SELECT * FROM heroku_8e74fc53b2ed17d.users where email = '"+ username + "' and password = Password('"+password+"') ;", function (err, rows, fields) {
        if (err)
        { 
            throw err;
        }
        else
        {
            rowsrecord = rows;
        }

        //connection.end();

        if(courseid > 0)
        {

            var connections = mysql.createConnection({
                user :'b44f084e2826b8',
                password : '21165fd2',
                host:'us-cdbr-east-02.cleardb.com',
                database:'heroku_8e74fc53b2ed17d'
            })

            connections.connect();
        
            connections.query("INSERT INTO heroku_8e74fc53b2ed17d.enrollment(useremail,CourseId,RequestedOn,status) values ('"+ username +"', '"+ courseid +"', CURRENT_TIMESTAMP(), '0' )", function (err, rows, fields) {
                console.log('The solution is inserted');   
            });

            connections.end();

            console.log("Done enrollment");


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

            var subject = 'SHLC Online Learning Platform :Enrollment for '+ courses;

            //send email 
            sendEmail(username,subject,courses,function(err,data){
                if(err){
                    console.log(err);
                    throw err;
                }
                else{
                    console.log(courses);
                    console.log('Success!');
                }
            });

        }
      
        console.log(rowsrecord.length);

        if (rowsrecord.length > 0)
        {
            console.log("Found!");
            res.status(200).json({
                data:rowsrecord,
                status: 'success'
            });
        }
        else
        {
            console.log("Not Found!");

            res.status(300).json({
                data:rowsrecord,
                status: 'fail'
             });     
        }

        res.end();

     })
 });

 module.exports = router;