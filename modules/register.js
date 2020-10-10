const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
 
     console.log("Connect users");

     connection.end();


     var connections = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })
    

     connections.connect();
 
     connections.query("INSERT INTO heroku_8e74fc53b2ed17d.enrollment(useremail,CourseId,RequestedOn,status) values ('"+ email +"', '"+ courseid +"', CURRENT_TIMESTAMP(), '0' )", function (err, rows, fields) {
        console.log('The solution is inserted');
     })
 
     console.log("Connect enrollment");
     
     connections.end();
 
     res.status(200).json({
        status: 'succes',
        data: req.body
     })
 });

 module.exports = router;
 