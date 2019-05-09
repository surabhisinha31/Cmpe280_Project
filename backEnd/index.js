var ENV_VAR = require('./config_backend/config.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');
const request = require('request');

var travelerSignUp = require('./apis/travelerSignUp.js');
var travelerLogin = require('./apis/travelerLogin');
var ownerSignUp = require('./apis/ownerSignUp');
var ownerLogin = require('./apis/ownerLogin');
var displayProperty = require('./apis/displayProperty.js');
var bookProperty = require('./apis/bookProperty.js');
var messages = require('./apis/messages.js');
var profile = require('./apis/profile.js');
var viewProfile = require('./apis/viewProfile.js');
var ownerDashboard = require('./apis/ownerDashboard.js');
var bookingHistory = require('./apis/bookingHistory.js');

// Log requests to console
app.use(morgan('dev'));

app.use(cors({ origin: ENV_VAR.CORS_ORIGIN, credentials: true }));
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ENV_VAR.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', travelerSignUp);
app.use('/', travelerLogin);
app.use('/', ownerSignUp);
app.use('/', ownerLogin);
app.use('/', displayProperty);
app.use('/', bookProperty);
app.use('/', messages);
app.use('/', profile);
app.use('/', viewProfile);
app.use('/', ownerDashboard);
app.use('/', bookingHistory);

let verifiedIdentities = [];
app.get('/request-proof/:ID',function (req,res) {
    console.log("Request body passed in get blockchain API: ", req.params.ID);

    request.post('http://54.149.239.59:3001/client/request-identity', {form:{email:req.params.ID,client:'homeaway'}});
    console.log("sent");
    res.status(200).json({
          message : "Request for Proof sent successfully"
      });
});


const mongoClient = require('mongodb').MongoClient;


app.post('/receive-proof',function (req,res) {
    console.log("Request body passed in blockchain API: ", req.body);
    verifiedIdentities.push(req.body['email']);

    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('verifiedList').updateOne(
                { email: req.body.email },
                {
                    $set: {
                        email: req.body.email
                    }
                },
                { upsert: true }, (err, result) => {
                    if (err) {
                        console.log("query error");
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Query Error");
                    } else {
                        console.log("query success");
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("user saved in verified list");
                    }
                })
            client.close();
        }
    })
});

app.post('/check_proof',function(req,res){
    console.log("check for this email",req.email)
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('verifiedList').find({
            })
                .toArray()
                .then((result) => {
                    console.log("booking details downloaded", result);
                    if (result.length > 0) {
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                    } else {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        console.log("No details found");
                        res.end("No details found");
                    }
                }), (err) => {
                    console.log("Unable to fetch Documents");
                }
            client.close();
        }
    })

})

app.listen(ENV_VAR.PORT);
console.log("Server running on port " + ENV_VAR.PORT);
