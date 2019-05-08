var router = require('express').Router();
var bcrypt = require('bcryptjs');
const mongoClient = require('mongodb').MongoClient;
var ENV_VAR = require('../config_backend/config');


router.post('/ownerSignUp', function (req, res) {
    console.log("Creating new Owner");
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.password, salt);
    console.log("server side : Inside Owner signup");

    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO , { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('ownerLoginData').createIndex({ "email": 1 }, { unique: true });
            db.collection('ownerLoginData').insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            }, (err, result) => {
                if (err) {
                    console.log("query error, may be unique key already exists.");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Email already exists");
                } else {
                    console.log("query success");
                    res.cookie('OwnerCookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
                    req.session.user = result;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Signup of Owner");
                }
            })
            client.close();
        }
    })
});

module.exports = router;