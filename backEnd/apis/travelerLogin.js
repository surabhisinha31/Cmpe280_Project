var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');

var config = require('../config_backend/settings');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });
// Bring in defined Passport Strategy
require('../config_backend/passport')(passport);
// Log requests to console
app.use(morgan('dev'));
app.use(passport.initialize());
var ENV_VAR = require('../config_backend/config');

// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');
// app.use(session({
//     secret: 'cmpe273_kafka_passport_mongo',
//     resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000
// }));

router.post('/travelerLogin', function (req, res) {
    console.log("Validating Traveler Login");
    console.log("Data received", req.body);
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb", err);
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('travelerLoginData').find({
                email: req.body.email,
            })
                .toArray()
                .then((result) => {
                    //console.log(result);
                    if (result && bcrypt.compareSync(req.body.password, result[0].password)) {
                        console.log("Validatiing bcrypt... ");
                        if (result.length > 0) {
                            var token = jwt.sign({ result }, config.secret, {
                                expiresIn: 10080 // in seconds
                            });
                            console.log("token generated  : ", token)
                            //res.cookie('TravelerCookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
                            res.status(200).json({ success: true, token: 'JWT ' + token, cookie: req.body.email });
                            //res.end();
                            console.log("login successful");
                            res.cookie('TravelerCookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
                            //req.session.user = result;
                            // res.writeHead(200, {
                            //     'Content-Type': 'text/plain'
                            // })
                            //res.end("login successful");
                        } else {
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            })
                            console.log("No details found");
                            res.end("No details found");
                        }
                    } else {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        console.log("Invalid Username/Password");
                        res.end("Invalid Username/Password");
                    }
                }), (err) => {
                    console.log("Unable to fetch Documents");
                }
            client.close();
        }
    })
});

module.exports = router;
