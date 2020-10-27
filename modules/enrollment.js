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


router.post('/enrollment', (req, res) => {


    var rowsrecord;
 
    var connection = mysql.createPool({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d',
        connectionLimit : 10
    })
    
    var email = req.body.email;

    console.log(email);

    console.log("Calling enrollment!");

    
    connection.query("SELECT * FROM heroku_8e74fc53b2ed17d.enrollment where status > 0 and useremail = '"+ email + "' ;", function (err, rows, fields) {
        console.log("Enrollment");
        rowsrecord = rows;

        res.status(200).json({
            data:rowsrecord,
            status: 'success'
        });
    
        res.end();
    });  
});

module.exports = router;


