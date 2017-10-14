var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');

// Load user model
var User = mongoose.model('users');


    passport.use(new TwitterStrategy({
        
    consumerKey:'VrVfEuiiRaki1xCBEUvBb8Ryw',
    consumerSecret:'7JrMmfcETU0aKlYBVYuLP8S5p9iTglXMVnImkgg3MwZoQZDQub',
    callbackURL:'/auth/twitter/callback',
    includeEmail: true
  },
  function(token, tokenSecret, profile, done) {
        
       var newUser = {
        username: profile.id,
        email: profile.emails[0].value,
        token: token,
        tokenSecret: tokenSecret
      }

      // Check for existing user
      User.findOne({
        username: profile.id
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

