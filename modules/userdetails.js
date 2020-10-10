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

router.post('/userdetails', (req, res) => {

    var rowsrecord;
    //console.log(req.body);
 
     var connection = mysql.createConnection({
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })

     var useremail = req.body.useremail;

      console.log(useremail);
     
     connection.connect();
     
     connection.query("select * from heroku_2fa387dfa408f94.shlcusers where email = '" + useremail + "'", function (err, rows, fields) {

        if (err)
        { 
            connection.end();
            throw err;
        }
        else
        {
            //console.log(rows);
            // rowsrecord = rows.recordsets[0];
            rowsrecord = rows;

            connection.end();
           // console.log(lng);
        }

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
 