function ani(){
    document.getElementById('demo').disabled = true;
    document.getElementById('start').disabled = true;
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

    document.getElementById('draggable1').className ='draggable1w';
    setTimeout(function(){},3000);
    document.getElementById('draggable2').className ='draggable2w';
    setTimeout(function(){},6000);

    document.getElementById('draggable3').className ='draggable3w';
    setTimeout(function(){},9000);

    document.getElementById('draggable4').className ='draggable4w';
    setTimeout(function(){},12000);

    document.getElementById('draggable5').className ='draggable5w';
    setTimeout(function(){},15000);

    document.getElementById('draggable6').className ='draggable6w';
    setTimeout(function(){},18000);

    document.getElementById('draggable7').className ='draggable7w';
    setTimeout(function(){},21000);

    document.getElementById('draggable8').className ='draggable8w';
    setTimeout(function() {
        document.getElementById('draggable1').className= 'draggable';
        document.getElementById('draggable2').className= 'draggable';
        document.getElementById('draggable3').className= 'draggable';
        document.getElementById('draggable4').className= 'draggable';
        document.getElementById('draggable5').className= 'draggable';
        document.getElementById('draggable6').className= 'draggable';
        document.getElementById('draggable7').className= 'draggable';
        document.getElementById('draggable8').className= 'draggable';
        reset();
        }
        ,27000);

}