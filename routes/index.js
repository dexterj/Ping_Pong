
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
    players.push(player);
  }

  return players; 
};

var makeMatches = function(players){
  matches = [];
  for(var i = 0; i < players.length; i++){
    home_player = players[i];
      for(var j = 0; j < players.length; j++){
        away_player = players[j];
        if (i == j) continue;
        var m = new models.Match({"home":home_player.name, "away":away_player.name});
        matches.push(m);
      }
  }
    
  return matches;
}

exports.create_tournament = function(req, res){
    var t = new models.Tournament ();
    t.name = req.body.Tournament;
    t.slug = slugger(t.name);
    t.players = parsePlayerList(req.body.players);
    t.matches = makeMatches(t.players);
    t.save();    
    res.redirect('/');
};

exports.save_match = function(req, res){
     whenFound = function (err, t){
     for(var i=0; i<t.matches.length; i++){
        var m = t.matches[i];
         if(m.home == req.body.home && m.away == req.body.away){
            m.sets=req.body.sets;
            t.save();
            res.send('Okay');
            return
         }
     }
     };
    // callback
    models.Tournament.findOne({"slug": req.body.slug}, whenFound);
};

exports.show_tournament = function(req, res){
  whenFound = function (err, t){
      res.render('tourney', t);
    };
    // callback
    models.Tournament.findOne({"slug": req.params.slug}, whenFound);

};


