var mongoose =require('mongoose');

var travelerMailSchema= mongoose.Schema({
    user_email : {
        type : String
    },
    owner_email :{
        type : String
    },
    mail_id: {
        type : String
    },
    property_headline : {
        type : String
    },
    property_id: {
        type : String
    },
    mail_status : {
        type : String
    },
    sent_message : {
        type : String
    },
    received_message : {
        type : String
    }
})
const TravelerMail = mongoose.model('TravelerMail',travelerMailSchema);
module.exports.TravelerMail = TravelerMail;
