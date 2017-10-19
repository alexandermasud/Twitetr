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

    var tweetText = (req.body.tweetText)

     // v7 b6c71184b289418d9f6dcbdb5dff3fde

    'use strict';

let https = require ('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/spellcheck/';

/* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
let key = 'b6c71184b289418d9f6dcbdb5dff3fde';

// These values are used for optional headers (see below).
// let CLIENT_ID = "<Client ID from Previous Response Goes Here>";
// let CLIENT_IP = "999.999.999.999";
// let CLIENT_LOCATION = "+90.0000000000000;long: 00.0000000000000;re:100.000000000000";

let params = {
    "text" : tweetText,
    "mode" : "spell",
    "mkt" : "sv",
};

var query_string = '?';
for (let param in params) {
    query_string += param + '=' + params[param] + '&';
}
query_string = encodeURI (query_string);

let request_params = {
    method : 'POST',
    hostname : host,
    path : path + query_string,
    headers : {
        'Ocp-Apim-Subscription-Key' : key,
//        'X-Search-Location' : CLIENT_LOCATION,
//        'X-MSEdge-ClientID' : CLIENT_ID,
//        'X-MSEdge-ClientIP' : CLIENT_ID,
    }
};

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {



        var x = JSON.parse(body);




        var newWord = []
        var oldWord = []
        var newTweet = []
        var oldestTweet = []
        var makingArray = new Array()
        makingArray = tweetText.split(" ");
        oldestTweet.push(tweetText)
        var oldTweet = tweetText;



        for (var i = 0; i < x.flaggedTokens.length; i++) {

             oldWord.push(x.flaggedTokens[i].token)
             newWord.push(x.flaggedTokens[i].suggestions[0].suggestion)

             newTweet.push(oldTweet.replace((oldWord[i]), (newWord[i])));



        }

        var baratest = []
        var c = 0;
        for (var j = 0; j < makingArray.length; j++){
          if(makingArray[j] == oldWord[c]){
            baratest.push(newWord[c] + " ")
            c = c+1
          }
          else{
            baratest.push(makingArray[j] + " ")
          }
        }
        var y = ({baratest});
        var cc = y.baratest.join('')
        console.log(cc + typeof(cc))


        res.render('tweet',{cc});


    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

var req = https.request (request_params, response_handler);
req.end ();









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
