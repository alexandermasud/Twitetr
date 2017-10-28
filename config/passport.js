var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('users');

module.exports = function(passport){
    


    passport.use(new TwitterStrategy({
        
    consumerKey:'mwuqq8HHKzDdim86v4tx2DRmI',
    consumerSecret:'pqt6mmV33wkgDN7R4ktoJ8eki7aPiGMLyoStT26V5PDjUi7Dvt',
    callbackURL:'/auth/twitter/callback',
  },
                                     
  function(token, tokenSecret, profile, done) {
        
       var newUser = {
        twitterid: profile.id,
        twitterhandle: profile.username,   
        token: token,
        tokenSecret: tokenSecret
      }

      // Check for existing user
      User.findOne({
        twitterid: profile.id
      }).then(user => {
        if(user){
          // Return user
          done(null, user);
        } else {
          // Create user
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
  }
                                     
));

    passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });

}



