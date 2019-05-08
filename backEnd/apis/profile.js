var express = require('express');
var router = express.Router(); // capital R
const mongoClient = require('mongodb').MongoClient;
var ENV_VAR = require('../config_backend/config');


router.post('/Profile', (req, res) => {
    console.log("inside profile", req.body);
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('profileData').updateOne(
                { email: req.body.email },
                {
                    $set: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        aboutMe: req.body.aboutMe,
                        city: req.body.city,
                        company: req.body.company,
                        school: req.body.school,
                        hometown: req.body.hometown,
                        languages: req.body.languages,
                        gender: req.body.gender,
                        phoneNumber: req.body.phoneNumber,
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
                        res.end("Successfully saved profile");
                    }
                })
            client.close();
        }
    })
});


module.exports = router;