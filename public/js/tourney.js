var homeSetsWon = 0;
var awaySetsWon = 0;
var currentSet = {
    home: 0,
    away: 0
};
var sets = [currentSet];
var matchHome = "";
var matchAway = "";

var homeWinsSet = function (set) {
    console.log("home wins", set.home >= 11 && set.home >= set.away + 2);
    return set.home >= 11 && set.home >= set.away + 2;
}
var awayWinsSet = function (set) {
    console.log("away wins", set.away >= 11 && set.away >= set.home + 2);
    return set.away >= 11 && set.away >= set.home + 2;
}

var victoryHome = function () {
    $.post('/foobar', {
        slug: SLUG,
        home: matchHome,
        away: matchAway,
        sets: sets
    });
    $('#scoreboard').modal("hide");
    $('#winner').text(matchHome + " wins!");
    $("#endmatch").modal("show");
    new Audio("/machoman.wav").play();
}

var victoryAway = function () {
    $.post('/foobar', {
        slug: SLUG,
        home: matchHome,
        away: matchAway,
        sets: sets
    });
    $('#scoreboard').modal("hide");
    $('#winner').text(matchAway + " wins!");
    $("#endmatch").modal("show");
}

var startNextSet = function () {
    if (homeSetsWon == 2) {
        victoryHome()
    };
    if (awaySetsWon == 2) {
        victoryAway()
    };
    currentSet = {
        home: 0,
        away: 0
    };
    sets.push(currentSet);
}


var updateScore = function () {
    $(".home.set1").text(sets[0].home);
    $(".away.set1").text(sets[0].away);
    if (sets.length == 2) {
        $(".home.set2").text(sets[1].home);
        $(".away.set2").text(sets[1].away);
    }
    if (sets.length == 3) {
        $(".home.set3").text(sets[2].home);
        $(".away.set3").text(sets[2].away);
    }
    if (homeWinsSet(currentSet)) {
        homeSetsWon++;
        $("#home_score").text(homeSetsWon);
        startNextSet();
    }
    if (awayWinsSet(currentSet)) {
        awaySetsWon++;
        $("#away_score").text(awaySetsWon);
        startNextSet();
    }

};


var show_game = function () {
    $('#scoreboard').modal("show");
    homeSetsWon = 0;
    awaySetsWon = 0;
    currentSet = {
        home: 0,
        away: 0
    };
    sets = [currentSet];
    matchHome = $(this).data("home");
    matchAway = $(this).data("away");
    $("#awaytext").text(matchAway + ": ");
    $("#hometext").text(matchHome + ": ");
    $(".home.set2").text("-");
    $(".away.set2").text("-");
    $(".home.set3").text("-");
    $(".away.set3").text("-");
    $("#home_score").text(0);
    $("#away_score").text(0);
    updateScore();
};

$('.start.btn').on('click', show_game);

var pointHome = function () {
    currentSet.home = currentSet.home + 1;
    updateScore();
};

var pointAway = function () {
    currentSet.away = currentSet.away + 1;
    updateScore();
};

$("#home").on("click", pointHome);


$("#away").on("click", pointAway);

WebFontConfig = {
    google: {
        families: ['Revalia::latin']
    }
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();