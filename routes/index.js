
/*
 * GET home page.
 */

var slugger = require("slug");
var models = require("./models");

exports.index = function(req, res){
    whenFound = function (err, Tournaments){
        res.render('index', { title: 'Ping Pong', tournamentlist: 'Tournaments' });
    };
    // callback
    models.Tournament.find (whenFound);  
};


exports.create_tournament = function(req, res){
    var WWE = new models.Tournament ( {name: req.body.Tournament});
    WWE.slug=slugger(WWE.name);
    
    res.redirect('/');
};

exports.tourney = function(req, res){
   var t = getTourneyBySlug(req.params.tourney);
    res.render('tourney', t);

};