var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var Twitter = require('twitter');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds119395.mlab.com:19395/webbtjanser', {
    useMongoClient:true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));





//----------------------------------------------------------------------------------

var index = require('./routes/index');

var tweet = require('./routes/tweet');

var auth = require('./routes/auth');

//----------------------------------------------------------------------------------



var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
	defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false
}));


app.use(passport.initialize());


app.use(passport.session());




require('./models/user');


require('./config/passport')(passport);


app.use(flash());


app.use(function(req, res, next) {
    
	res.locals.fail_msg = req.flash('fail_msg');
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
    
});




//----------------------------------------------------------------------------------

app.get('/', index);

app.use('/auth', auth);

app.get('/tweet', tweet);
app.post('/tweet', tweet);

//----------------------------------------------------------------------------------





app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('')
	console.log('Server started on localhost:' + app.get('port'));
	console.log('')
});