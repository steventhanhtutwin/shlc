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
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })
    
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var address = req.body.address;
    var selectpainting = req.body.selectpainting;
 
     connection.connect()
 
     connection.query("INSERT INTO heroku_2fa387dfa408f94.shlcusers(username, password, email, phonenumber, address, selectpanting) values ('"+ username +"','"+ password +"','"+ email + "','"+ phonenumber + "','"+ address + "','"+ selectpainting + "')", function (err, rows, fields) {
        console.log('The solution is inserted');
     })
 
     console.log("Connect");
     
     connection.end();
 
     res.status(200).json({
        status: 'succes',
        data: req.body
     })
 });

 module.exports = router;
 