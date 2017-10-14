var express = require('express');
var router = express.Router();
var passport = require('passport');



router.get('/twitter', passport.authenticate('twitter'));


router.get('/twitter/callback', passport.authenticate('twitter',
        { failureRedirect: '/' }),(req, res) => {
        req.flash('success_msg', 'Inloggad!');
        res.redirect('/');
  });

router.get('/logout', (req, res) => {
 req.logout();
 req.flash('success_msg', 'Utloggad!');
 res.redirect('/');
});

module.exports = router;