const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('forgotpassword');

const router = express.Router();


router.use(cors());

// use the express-static middleware
router.use(express.static("public"));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/checkreseturl', (req, res) => {

    var connection = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })
    
    var reseturl = req.body.ResetURL;

    connection.connect();

     //check email exist or not
     connection.query("SELECT * FROM heroku_8e74fc53b2ed17d.forgotpassword where TIMESTAMPDIFF(HOUR, requestedon, CURRENT_TIMESTAMP()) < 25 and ResetURL = '"+ reseturl + "';", function (err, rows, fields) {
        if (err)
        { 
            connection.end();

            throw err;
        }
        else
        {
            rowsrecord = rows;
        }

        console.log(rowsrecord.length);

        console.log("connection end!");
        connection.end();

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