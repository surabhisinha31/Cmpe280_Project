var mongoose =require('mongoose');

var ownerMailSchema= mongoose.Schema({
  user_email : {
      type : String
  },
  owner_email :{
      type : String
  },
  mail_id: {
      type : String
  },
  property_id: {
      type : String
  },
  property_headline : {
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
const OwnerMail = mongoose.model('OwnerMail',ownerMailSchema);
module.exports.OwnerMail = OwnerMail;
