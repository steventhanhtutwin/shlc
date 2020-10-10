const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const insertforgot = (email,resetURL,cb) => {
    
    var connections = mysql.createConnection({
        user :'b44f084e2826b8',
        password : '21165fd2',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_8e74fc53b2ed17d'
    })

    connections.connect();
    connections.query("INSERT INTO heroku_8e74fc53b2ed17d.forgotpassword(Useremail, ResetURL, RequestedOn, Reset) values ('"+ email +"', '"+ forgotpasswordencrypt +"','"+ phonenumber + "',CURRENT_TIMESTAMP(), '1' )", 
        function (err, rows, fields) {
            console.log('The solution is inserted');
        }
    );
    connections.end();
};

module.exports = insertforgot;