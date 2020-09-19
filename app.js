const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();
const port = 3000;

//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res) => {

   var json = JSON.stringify(req.body);

   console.log(json);

   var getdata = JSON.parse(json);

   //console.log(req.body);

    var connection = mysql.createConnection({
        user :'b786db4142dff0',
        password : 'e7c35856',
        host:'us-cdbr-east-02.cleardb.com',
        database:'heroku_2fa387dfa408f94'
    })
  
    var username = getdata.username;
    var password = getdata.password;
    var email = getdata.email ;
    var phonenumber = getdata.phonenumber;
    var address = getdata.address ;
    var selectpainting = getdata.selectpainting;

    connection.connect()

    connection.query("INSERT INTO heroku_2fa387dfa408f94.shlcusers(username, password, email, phonenumber, address, selectpanting) values ('"+ username +"','"+ password +"','"+ email + "','"+ phonenumber + "','"+ address + "','"+ selectpainting + "')", function (err, rows, fields) {
       console.log('The solution is inserted');
    })

    console.log("Connect");
    
    connection.end();

    //res.send("Thanks");
    res.sendStatus(200);
    res.end();
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


