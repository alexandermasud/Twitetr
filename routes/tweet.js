var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var url = 'mongodb://admin:admin@ds119395.mlab.com:19395/webbtjanser';

var Twitter = require('twitter');

router.get('/tweet', function(req, res) {

    res.render('tweet');

});



router.post('/tweet',  function(req, res) {



mongo.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("users").findOne({twitterid: (req.body.twitterid)}, function(err, result) {
    if (err) throw err;

    console.log(result);

    db.close();

      var twitterClient = new Twitter({


  consumer_key:'mwuqq8HHKzDdim86v4tx2DRmI',
  consumer_secret:'pqt6mmV33wkgDN7R4ktoJ8eki7aPiGMLyoStT26V5PDjUi7Dvt',
  access_token_key: result.token,
  access_token_secret: result.tokenSecret

});

  twitterClient.post('statuses/update', {status: (req.body.tweetText)}, function(error, tweet, response) {
  if (!error) {
    console.log('Tweet = ' + (tweet));
      req.flash('success_msg', 'Du tweetade!');

        res.redirect('/');
  }

    else{

        req.flash('fail_msg', 'Något gick fel');
        res.redirect('/');
    }

  });
});



});

});


module.exports = router;
