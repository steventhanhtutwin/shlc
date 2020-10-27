// create an express app
const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const timeout = require('connect-timeout');
var register = require('./modules/register');
var login = require('./modules/login');
var forgotpassword = require('./modules/forgotpassword');
var resetpassword = require('./modules/resetpassword');
var userdetials = require('./modules/userdetails');
var userdetailsnopassword = require('./modules/updateuserdetailsnopassword');
var resetpasswordcheckurl = require('./modules/checkreseturl');
var enrollmentuser = require('./modules/enrollment');
var updateuserdetails = require('./modules/updateuserdetails');


const app = express();

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) {
    next();
  }
}

app.use(timeout('5s'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(haltOnTimedout)

app.use(cors());

// use the express-static middleware
app.use(express.static("public"));


app.use(bodyParser.json());

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
})

app.use('/user',register);

 app.use('/user',forgotpassword);

 app.use('/user',resetpassword);

 app.use('/user',userdetials);

 app.use('/user',userdetailsnopassword);

 app.use('/user',resetpasswordcheckurl);

 app.use('/user',enrollmentuser);

app.use('/user',updateuserdetails);

app.use('/user',login);


// Global error handler - route handlers/middlewares which throw end up here
app.use((err, req, res, next) => {

  // response to user with 403 error and details
  console.error(err.stack);

  res.status(500).send('Something broke!');

});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));