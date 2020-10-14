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

router.post('/enrollment', (req, res) => {

    var rowsrecord;
 
    var connection = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })
    
    var email = req.body.email;

    console.log(email);

    connection.connect();

     connection.query("SELECT * FROM heroku_8e74fc53b2ed17d.enrollment where useremail = '"+ email + "' ;", function (err, rows, fields) {
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