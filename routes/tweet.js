var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var url = 'mongodb://admin:admin@ds119395.mlab.com:19395/webbtjanser';

var Twitter = require('twitter');

var request = require('request');

router.get('/tweet', function(req, res) {

    res.render('tweet');

});



router.post('/tweet',  function(req, res) {
      var arr = (req.body.tweetText).split(/\s+/);
      console.log('arr = ' + arr)
    
      // OBS EGEN NYCKEL! -- OBS EGEN NYCKEL! -- OBS EGEN NYCKEL! -- OBS EGEN NYCKEL! -- OBS EGEN NYCKEL! -- OBS EGEN NYCKEL!
      // http://api.libris.kb.se/bibspell/
    
      //Marika: CFFA1878A66E1C29C8D6F797457EDC8B
    
      //Alex: 3E33089FD77A3F6651FC8F22F1C7B08E
    
        var url = "http://api.libris.kb.se/bibspell/spell?query={"+arr+"}&key=CFFA1878A66E1C29C8D6F797457EDC8B"

        request({
            url: url,
            xml: true
        }, function (error, response, body) {
            

            if (!error && response.statusCode === 200) {
                
                
                var y = body
                console.log('y = ' + y)
                var getSuggestions = y.querySelectorAll('term[changed="true"]');
                document.write("<h2> Förslag på korrekta ord: </h2>")
                for (var i = 0; i < getSuggestions.length; i++){
                document.write("<p>" + getSuggestions[i].childNodes[0].nodeValue + "<p>")
              }
                
            }
              
        })


/*
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
*/
    
    
});


module.exports = router;
