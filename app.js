// create an express app
const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var register = require('./modules/register');
var login = require('./modules/login');
var forgotpassword = require('./modules/forgotpassword');
var resetpassword = require('./modules/resetpassword');

const app = express();

app.use(cors());

// use the express-static middleware
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
})

app.use('/user',register);

 app.use('/user',login);

 app.use('/user',forgotpassword);

 app.use('/user',resetpassword);

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));