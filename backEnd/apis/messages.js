var express = require('express');
var router = express.Router(); // capital R
var {mongoose} = require('./../db/mongoose');
var {TravelerMail} = require('./../models/travelermail');
var {OwnerMail} = require('./../models/ownermail');



router.post('/travelermail', function(req, res, next) {
  console.log("inside traveler email post request");
	console.log("request passed: ", req.body);
  const travelerMailDetails = new TravelerMail({
    user_email: req.body.from,
    owner_email : req.body.to,
    property_headline : req.body.property_headline,
    property_id : req.body.property_id,
    mail_status : "sent",
    sent_message : req.body.message,
    received_message : ''
  });
  const ownerMailDetails = new OwnerMail({
    user_email: req.body.from,
    owner_email : req.body.to,
    property_headline : req.body.property_headline,
    property_id : req.body.property_id,
    mail_status : "received",
    sent_message : '',
    received_message : req.body.message
  });
    travelerMailDetails.save().then(result => {
        console.log("email send response : ", result);
        ownerMailDetails.mail_id=result._id;
        TravelerMail.update({_id : result._id},{$set:{
                    mail_id : result._id
                  }})
        .then(res => {
                    console.log("Mail ID: " , res);
                    ownerMailDetails.save().then(res => {
                      console.log("owner email update response: ", res);
                    })
                    .catch(err=> {
                      console.log("error while saving mail to owner table", err);
                    })
                  })
        .catch(errors => {
                     console.log("error while updating mail id", errors);
                   })
        res.status(200).json({
              message : "Mail sent successfully",
              result : result._id
          });

      })
      .catch(error => {
        console.log("error while sending message", error);
        res.status(400).json({
              message : "error while sending message"
          });
      })
});
//==============================================================================
router.post('/ownermail', function(req, res, next) {
      console.log("inside owner email post request");
    	console.log("request passed: ", req.body.mail_id);
      OwnerMail.updateMany({mail_id : req.body.mail_id},{ $set :{
          mail_status : "Replied",
          sent_message : req.body.sent_message
        }
      })
      .then(result=>{
        console.log("Data after updation: ", result);
            TravelerMail.updateMany({mail_id : req.body.mail_id},{ $set :{
                mail_status : "Replied",
                received_message : req.body.sent_message
              }
            })
            .then(result=>{
              console.log("Data after updation: ", result);
              res.status(200).json({
                    message : "Owner replied successfully"
                });

            })
            .catch(error=>{
              console.log("error while updating mail status to traveler table", err);
            })

      })
      .catch(error=>{
        console.log("error while updating mail status to owner table", err);
        res.status(400).json({
              message : "error while replying.!!!!"
          });
      })
});

router.post('/fetchmail', function(req, res, next) {
      console.log("inside owner fetch email post request");
    	console.log("request passed: ", req.body);
      OwnerMail.find({"owner_email":req.body.Ownercookie})
        .exec()
        .then(doc => {
          console.log("response got : ", doc);
          res.status(200).json({
                message : "Owner mails fetched successfully",
                result : doc
            });
        })
        .catch(err => {
          console.log("Error while retrieving mails : ", err);
        })
});

router.post('/fetchTravelermail', function(req, res, next) {
      console.log("inside traveler fetch email post request");
    	console.log("request passed: ", req.body);
      TravelerMail.find({"user_email":req.body.Travelercookie})
        .exec()
        .then(doc => {
          console.log("response got : ", doc);
          res.status(200).json({
                message : "Traveler mails fetched successfully",
                result : doc
            });
        })
        .catch(err => {
          console.log("Error while retrieving mails : ", err);
        })
});


module.exports = router;
