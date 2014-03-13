var mongoose = require('mongoose');
mongoose.connect('mongodb://deviowa.com/pingpong');
 
var db = mongoose.connection;
var Schema = mongoose.Schema;
 
var playerSchema = new Schema({
    name: String,
});
 
var setSchema = new Schema({
    home: Number,
    away: Number
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

tournamentSchema.methods.getPlayerWinnings = function(p) {
    var matchesWon = 0;
    for(var i = 0; i < this.matches.length; i++){
        if (this.matches[i].sets.length == 0){continue}
       //console.log(this.matches[i].winner == p, p, this.matches[i].get("winner"));
       if (this.matches[i].get("winner") == p) {
        matchesWon++
       }
    }
    return(matchesWon);
};

tournamentSchema.methods.getPlayerLosings = function(p) {
    var matchesLost = 0;
    for(var i = 0; i < this.matches.length; i++){
       if (this.matches[i].sets.length == 0){continue}
       if (this.matches[i].get("winner") != p) {
        if (this.matches[i].home == p || this.matches[i].away == p)
        matchesLost++
       }
    }
    return(matchesLost);
};

tournamentSchema.methods.getPlayerSetsWon = function(p) {
    var setsWon = 0;
    for(var i = 0; i < this.matches.length; i++){
        var m = this.matches[i];
        setsWon+= matchSetsWonBy(m, p);
    }
    return(setsWon);
};

tournamentSchema.methods.getPlayerSetsLost = function(p) {
    var setsLost = 0;
    for(var i = 0; i < this.matches.length; i++){
        var m = this.matches[i];
        setsLost+= matchSetsLostBy(m, p);
    }
    return(setsLost);
};

tournamentSchema.methods.getPlayerRank = function() {
    var self = this;
    var sorted = this.players.sort(function(a,b){
        var gameDiff = self.getPlayerWinnings(b.name) - self.getPlayerWinnings(a.name)
        if (gameDiff == 0){
            return self.getPlayerSetsWon(b.name) - self.getPlayerSetsWon(a.name)

        }
        return gameDiff
    });
    console.log(sorted);
    return(sorted);
}

var homeWinsSet = function(set){
        return set.home >= 11 && set.home >= set.away + 2;
    }

var matchSetsWonBy = function(m, p) {
    var setsWon = 0;
    if (m.sets.length == 0){return(0)}
    if (m.home == p){
        for(var i=0; i<m.sets.length; i++)
            if (homeWinsSet(m.sets[i])){
                setsWon++;
            }
    }
    if (m.away == p){
        for(var i=0; i<m.sets.length; i++)
            if (!homeWinsSet(m.sets[i])){
                setsWon++;
            }
    }
    return(setsWon);
}

var matchSetsLostBy = function(m, p) {
    var setsLost = 0;
    if (m.sets.length == 0){return(0)}
    if (m.home == p){
        for(var i=0; i<m.sets.length; i++)
            if (!homeWinsSet(m.sets[i])){
                setsLost++;
            }
    }
    if (m.away == p){
        for(var i=0; i<m.sets.length; i++)
            if (homeWinsSet(m.sets[i])){
                setsLost++;
            }
    }
    return(setsLost);
}

matchSchema.virtual('winner').get(function () {
    var setsHomeWon = 0;
    for(var i = 0; i < this.sets.length; i++)
        if (homeWinsSet(this.sets[i]))
            setsHomeWon++;
    if (setsHomeWon == 2) return this.home;
    return this.away;
});

exports.Player = mongoose.model('Player', playerSchema);
exports.Set = mongoose.model('Set', setSchema);
exports.Match = mongoose.model('Match', matchSchema);
exports.Tournament = mongoose.model('Tournament', tournamentSchema);



var db = mongoose.connection;
