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

router.post('/login', (req, res) => {

    var rowsrecord;
 
     var connection = mysql.createConnection({
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })
    
    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
 
     connection.connect();

     connection.query("SELECT * FROM heroku_2fa387dfa408f94.shlcusers where email = '"+ username + "' and password = '"+password+"';", function (err, rows, fields) {
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