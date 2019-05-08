var express = require('express');
var router = express.Router(); // capital R
const mongoClient = require('mongodb').MongoClient;
var ENV_VAR = require('../config_backend/config');


router.post('/viewProfile', (req, res) => {
    console.log("Inside view Profile", req.body);
    //booking dates can be included as well here.
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');   
            db.collection('profileData').find({
                email: req.body.email
            }).toArray()
                .then((result) => {
                    console.log("profile details downloaded", result);
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
});


module.exports = router;