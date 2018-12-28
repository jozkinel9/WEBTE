var correct = 0;
var time = 0;

function init() {
    document.getElementById('demo').disabled = true;
    document.getElementById('start').disabled = true;
    var startTime = Date.now();
    var myTimer = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2) + ' s';
    }, 10);

    $(".draggable").draggable({
        revert:"invalid"});
    $("#droppable1").droppable({
        accept: "#draggable1"});
    $("#droppable2").droppable({
        accept: "#draggable2"});
    $("#droppable3").droppable({
        accept: "#draggable3"});
    $("#droppable4").droppable({
        accept: "#draggable4"});
    $("#droppable5").droppable({
        accept: "#draggable5"});
    $("#droppable6").droppable({
        accept: "#draggable6"});
    $("#droppable7").droppable({
        accept: "#draggable7"});
    $("#droppable8").droppable({
        accept: "#draggable8"});
    $(".droppable").droppable({
        drop: function(event, ui) {
            var $this = $(this);
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $this,
                using: function(pol) {
                    $(this).animate(pol, 100, "linear");
                    correct++;
                }
            });
            ui.draggable.draggable( 'disable' );

            if ( correct === 8 ) {
                $('#success').show();
                resetTimer(myTimer);
            }
        }
    });
};

function myCounter() {
    document.getElementById("timer").innerHTML = ++time;
}
function resetTimer(myTimer){
    clearInterval(myTimer);
}
function reset() {
    window.location.reload();
}
