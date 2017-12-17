var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var url = 'mongodb://admin:admin@ds119395.mlab.com:19395/webbtjanser';

var Twitter = require('twitter');

//Checks if the user is loggedin, so the user cant file path travel
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}



//Routing to the tweet where the user can write their tweets and spell-check will be available
router.get('/tweet',isLoggedIn, function(req, res) {

    res.render('tweet');

});


//Sending the tweet via POST, after the user has submitted their tweet
router.post('/tweet',  function(req, res) {

    var tweetText = (req.body.tweetText)

    var language = (req.body.language)

    var twitterid = (req.body.twitterid)



    'use strict';

let https = require ('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/spellcheck/';

// Ny nyckel skapad 17 December 2017 är giltig till mitten av Januari
//Key V7: 21107be16d194c9a8daa4073e17fd99c

/* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
let key = '21107be16d194c9a8daa4073e17fd99c';

// These values are used for optional headers (see below).
// let CLIENT_ID = "<Client ID from Previous Response Goes Here>";
// let CLIENT_IP = "999.999.999.999";
// let CLIENT_LOCATION = "+90.0000000000000;long: 00.0000000000000;re:100.000000000000";

let params = {
    "text" : tweetText,
    "mode" : "spell",
    "mkt" : language,
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


		//Checking for the suggested words that BING provides
        for (var i = 0; i < x.flaggedTokens.length; i++) {

             oldWord.push(x.flaggedTokens[i].token)
             newWord.push(x.flaggedTokens[i].suggestions[0].suggestion)

             newTweet.push(oldTweet.replace((oldWord[i]), (newWord[i])));



        }
		//Checking for matching words and removing old ones
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

        var ccCount = cc.length;
        console.log(ccCount);

		//A counter that sees if the user has provided more than 140 words.
        if (ccCount > 141){
          var checkTweet = "No more than 140 characters are allowed";
          res.render('tweet',{cc, tweetError_msg: checkTweet});
        }

        else{

            mongo.connect(url, function(err, db) {

              if (err) throw err;

              db.collection("users").findOne({twitterid: twitterid}, function(err, result) {

                if (err) throw err;
                db.close();

                var twitterClient = new Twitter({

              consumer_key:'mwuqq8HHKzDdim86v4tx2DRmI',
              consumer_secret:'pqt6mmV33wkgDN7R4ktoJ8eki7aPiGMLyoStT26V5PDjUi7Dvt',
              access_token_key: result.token,
              access_token_secret: result.tokenSecret

            });

              twitterClient.post('statuses/update', {status: (cc)}, function(error, tweet, response) {
                  if (!error) {

                      console.log('Tweet sent!')
                      res.render('index', {tweet_msg: 'Tweet sent!'});

                  }

                  else{

                        console.log('Tweet NOT sent!')
                        res.render('tweet', {cc, tweetError_msg: 'Something went wrong!'});
                  }

              });
            });



        });


    }


    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

var req = https.request (request_params, response_handler);
req.end ();




});


module.exports = router;
