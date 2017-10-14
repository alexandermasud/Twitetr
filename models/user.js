var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Shema
var UserSchema = new Schema({
  twitterid:{
    type:String,
  },
  twitterhandle: {
      type:String
  },
   email:{
    type:String,
  },
  token: {
    type:String
  },
  tokenSecret: {
      type:String
  }
  
});

// Create collection and add schema
mongoose.model('users', UserSchema);





