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


router.post('/ownerLogin', function (req, res) {
    console.log("Validating Owner Login");
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('ownerLoginData').find({
                email: req.body.email,
            })
                .toArray()
                .then((result) => {
                    if (bcrypt.compareSync(req.body.password, result[0].password)) {
                        console.log("Validatiing bcrypt... ");
                        if (result.length > 0) {
                            console.log("login successful");
                            res.status(200).json({ success: true, cookie: req.body.email });
                            // res.cookie('OwnerCookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
                            // req.session.user = result;
                            // res.writeHead(200, {
                            //     'Content-Type': 'text/plain'
                            // })
                            // res.end("login successful");
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