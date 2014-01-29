
/*
 * GET home page.
 */
var jf = require("jsonfile");
var file = "data/data.json";
var slugger = require("slug");

var getTourneyBySlug = function(slug){
  var entries = jf.readFileSync(file);
    for(var i=0; i<entries.length; i++){
        if(entries[i].slug==slug);
        return entries[i];
    }
};

exports.index = function(req, res){
    var entries = jf.readFileSync(file);
    res.render('index', { title: 'Ping Pong', tournaments: entries});
};

exports.data = function(req, res){
    var entries = jf.readFileSync(file);
    req.body.slug=slugger(req.body.Tournament)
    entries.push(req.body);
    jf.writeFileSync("data/data.json", entries);
    res.redirect('/');
};

exports.tourney = function(req, res){
   var t = getTourneyBySlug(req.params.tourney);
    res.render('tourney', t);

};