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

    res.status(200).json({
        data:'',
        status: 'success'
    })
 });

 module.exports = router;
 