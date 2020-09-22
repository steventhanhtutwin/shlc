// create an express app
const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(cors());

// use the express-static middleware
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
})


app.get('/user', (req, res) => {

    //console.log(req.body);
 
     var connection = mysql.createConnection({
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })
    
    var username = req.query.username;
    var password = req.query.password;
    var email = req.query.email;
    var phonenumber = req.query.phonenumber;
    var address = req.query.address;
    var selectpainting = req.query.selectpainting;
 
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
 })


 
app.get('/login', (req, res) => {

    var rowsrecord;
    //console.log(req.body);
 
     var connection = mysql.createConnection({
         user :'b786db4142dff0',
         password : 'e7c35856',
         host:'us-cdbr-east-02.cleardb.com',
         database:'heroku_2fa387dfa408f94'
     })
    
    var username = req.query.username;
    var password = req.query.password;
 
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
            res.status(200).json({
                data:rowsrecord,
                status: 'success'
            });
        }
        else
        {
            console.log("Hello");
            res.status(300).json({
                data:rowsrecord,
                status: 'fail'
             });     
        }

        res.end();

     })
 })


// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));