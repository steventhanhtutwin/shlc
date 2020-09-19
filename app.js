// create an express app
const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// use the express-static middleware
app.use(express.static("public"));

app.use(bodyParser.json());

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
})




// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));