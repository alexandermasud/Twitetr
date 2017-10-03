var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');



// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
	defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./routes/index');
app.get('/', routes);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('')
	console.log('Server started on localhost:' + app.get('port'));
	console.log('')
});