var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var bcrypt = require('bcryptjs');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));


// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    database: "homeaway"
});

// WITHOUT CONNECTION POOLING

/******************* DISPLAY PROPERTY POST BEGIN ***************************/

app.post('/DisplayProperty', function (req, res) {

    console.log("Inside Login Post Request");



    console.log("Connected!");
    var sql = "select * from ownerprofile";
    con.query(sql, function (err, result) {


        if (err) {
            console.log(err);
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials");
        } else {
            console.log(result);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            console.log("photos", result);
            res.end(JSON.stringify(result));
        }



    });

});


/******************* DISPLAY PROPERTY POST END ***************************/


/******************* LISTEN PORT ***************************/
app.listen(3001);
console.log("Server running on port 3001");