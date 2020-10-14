const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const e = require("express");
const sendEmail = require('../resources/sendgmail');

const router = express.Router();

router.use(cors());


// use the express-static middleware
router.use(express.static("public"));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/updateuserdetails', (req, res) => {

    console.log("Hello");

    var connection = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })

     var emails = req.body.email;
     var passwords = req.body.password;

     console.log(emails);
    
     connection.connect();
     
     connection.query("UPDATE heroku_8e74fc53b2ed17d.users set password = Password('"+ password +"') where email = '" + emails + "';", function (err, rows, fields) {

        console.log('The solution is updated');
        
     })
 
     console.log("Connect");
     
     connection.end();
 
     res.status(200).json({
        status: 'succes',
        data: req.body
     })
 });

 module.exports = router;
 