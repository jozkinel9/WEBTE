//dynamicky generovana prva uroven!
function createMenu() {
    var menu=["HRY", "O NÁS", "HOW TO...", "MAPA", "INFO"];
    var menu2 = ["POLOZKA1","POLOZKA2","POLOZKA3"];
    var menu3 = ["POLOZKA1","POLOZKA2","POLOZKA3"];
    for(var i=0;i<menu.length;i++){
        var li = document.createElement("li");
        var textnode = document.createTextNode(menu[i]);
        li.appendChild(textnode);
        li.setAttribute("id", "li" + i);
        li.setAttribute("class", "firstli");
        document.getElementById("menu").appendChild(li);
    }
}