var show_popup = function(){
    $("#popup").css("display", "block");
    $("#newTournament").hide();
}
$("#newTournament").on("click",show_popup);