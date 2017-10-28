var express = require('express');
var router = express.Router();

var passport = require('passport');



router.get('/twitter', passport.authenticate('twitter'));


router.get('/twitter/callback', passport.authenticate('twitter',
        { failureRedirect: '/' }),(req, res) => {
        res.redirect('/tweet');
  });

router.get('/logout', (req, res) => {
 req.logout();
 res.redirect('/');
});

module.exports = router;