//dynamicky generovana prva uroven!
function createMenu() {
    var menu=["Hry", "O nás", "How to..", "Mapa", "Info"];
    for(i=0;i<menu.length;i++){
        document.getElementById("menu").innerHTML+="<li>"+menu[i]+"</li>";
        }
}