
/*
 * GET home page.
 */
var jf = require("jsonfile");
var file = "data/data.json";
var slugger = require("slug");

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