
/*
 * GET home page.
 */

var slugger = require("slug");
var models = require("../models");

exports.index = function(req, res){
    whenFound = function (err, tournaments){
        res.render('index', { title: 'Ping Pong', tournamentlist: tournaments });
    };
    // callback
    models.Tournament.find (whenFound);  
};


function parsePlayerList(textBoxString){
  var player_names = [];
  var lines = textBoxString.split("\n");

  for(var i=0; i< lines.length; i++){
    var line_items = lines[i].split(',');

    for(var j=0; j< line_items.length; j++){
      var trimmed_name = line_items[j].trim();
      if(trimmed_name != ""){
        player_names.push(trimmed_name);
      }
    }
  }

  var players = [];
  for (var i=0; i<player_names.length; i++){
    var player = new models.Player();
    player.name = player_names[i];
    console.log("CCCC", player_names[i], player);
    player.save()
    players.push(player);
  }

  return players; 
};

exports.create_tournament = function(req, res){
    var t = new models.Tournament ();
    t.name = req.body.Tournament;
    t.slug = slugger(t.name);
    t.players = parsePlayerList(req.body.players);
    t.save();    
    res.redirect('/');
};

exports.tourney = function(req, res){
   var t = getTourneyBySlug(req.params.tourney);
    res.render('tourney', t);

};
