var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var ENV_VAR = require('../config_backend/config');

//ALL ABOUT LIST PROPERTY, PHOTOS and DISPLAY PROPERTY.

var photos = "";
//set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
        console.log("Inside Destination");
    },
    filename: (req, file, cb) => {
        const newFilename = `image_` + Date.now() + `${(path.extname(file.originalname))}`;
        //this photo name to be inserted in database.
        //{{{ when server is countinously running, for 2nd insertion 1st insertion photos are also getting upload so...}}}
        photos = photos + "___" + newFilename;
        //const newFilename = file.originalname;
        console.log("FileName : " + newFilename);
        cb(null, newFilename);
    },
});

//Init Upload for multiple images
const upload = multer({ storage: storage }).array('photos', 5);

router.post('/listPropertyPhotos', upload, (req, res, next) => {
    console.log("Inside UploadFiles");
    console.log("uploadFiles : ", req.files);
    console.log(photos);
});

///////////////////////// PHOTOS END ///////////////////////////// 


///////////////////////// listProperty BEGIN /////////////////////////////
getNextSequenceValue = async (db, sequenceName) => {
    //make sure to sure async and await.
    var sequenceDocument = await db.collection('counters').findOneAndUpdate(
        { "_id": sequenceName },
        { $inc: { sequence_value: 1 } },
        //       new:true
    );
    console.log("Counter : sequence value", sequenceDocument.value.sequence_value)
    return sequenceDocument.value.sequence_value;
}

router.post('/listProperty', function (req, res) {
    console.log("inside List Property mongo...");
    //console.log(req.body);
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, async (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            sNo = await getNextSequenceValue(db, "propertyid")
            db.collection('listPropertyData').insertOne({
                _id: sNo,
                country: req.body.country,
                street: req.body.street,
                building: req.body.building,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                headline: req.body.headline,
                description: req.body.description,
                type: req.body.type,
                bedrooms: req.body.bedrooms,
                accomodates: req.body.accomodates,
                bathrooms: req.body.bathrooms,
                bookingoptions: req.body.bookingoptions,
                photos: photos,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                currency: req.body.currency,
                rent: req.body.rent,
                tax: req.body.tax,
                cleaningfee: req.body.cleaningfee,
                ownername: req.body.ownername

            }, (err, result) => {
                if (err) {
                    console.log("query error, may be unique key already exists.", err);
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Email already exists");
                } else {
                    console.log("query success");
                    photos = "";
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("updated location details successfully !");
                }
            })
            client.close();
        }
    })
});



router.post('/displayProperty', function (req, res) {
    console.log("MongoDB : fetching display Properties...");
    console.log(req.body);
    mongoClient.connect(ENV_VAR.IP_MONGODB + ENV_VAR.IP_PORT_MONGO, (err, client) => {
        if (err) {
            console.log("error connecting to mongodb");
        } else {
            console.log("connection successful");
            const db = client.db('homeaway');
            db.collection('listPropertyData').find({
                //if no paramaters are passed, it will fetch all documents.
                _id: req.body.id
            })
                .toArray()
                .then((result) => {
                    console.log("property downloaded", result);
                    //JSON.stringify(result, undefined, 2)
                    console.log("downloading display properties... ");
                    if (result.length > 0) {
                        console.log("display properties download successful");
                        console.log("converting photos to base64...");
                        console.log("photos", result[0].photos);
                        //
                        var base64imgObj = [];
                        console.log("photos", result);
                        file = result[0].photos.split("___");
                        file.splice(file.indexOf(''), 1);
                        console.log("images array : :", file);
                        file.forEach(element => {
                            var fileLocation = path.join(__dirname.slice(0, -5) + '/uploads', element);
                            var img = fs.readFileSync(fileLocation);
                            base64imgObj.push(new Buffer(img).toString('base64'));
                        })
                        result[0].photos = base64imgObj;
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                        //res.end(JSON.stringify(base64imgObj));
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
