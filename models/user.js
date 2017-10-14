var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Shema
var UserSchema = new Schema({
  username:{
    type:String,
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





