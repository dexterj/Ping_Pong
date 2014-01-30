var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
 
var db = mongoose.connection;
var Schema = mongoose.Schema;
 
var playerSchema = new Schema({
    name: String,
    record: {
        matches: {
            won: Number,
            lost: Number
        },
        sets: {
            won: Number,
            lost: Number
        }
    }
});
 
var setSchema = new Schema({
    number: Number,
    home: String,
    away: String,
    score:[Number, Number]
});
 
var matchSchema = new Schema({
    home: String,
    away: String,
    sets: [setSchema]
});
 
var tournamentSchema = new Schema({
    players: [playerSchema],
    matches: [matchSchema],
    name: String,
    slug: String
});


exports.Player = mongoose.model('Player', playerSchema);
exports.Set = mongoose.model('Set', setSchema);
exports.Match = mongoose.model('Match', matchSchema);
exports.Tournament = mongoose.model('Tournament', tournamentSchema);



var db = mongoose.connection;
