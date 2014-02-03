
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var models = require('./models');


var app = express();

// all environments
app.set('port', process.env.PORT || 4242);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/api/tournament', routes.create_tournament);
app.get('/tourney/:slug', routes.show_tournament);
app.post('/foobar', routes.save_match);
//app.get('/api/tournament', routes.list_tournament);
//app.get('/api/tournament/:id', routes.get_tournament);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
