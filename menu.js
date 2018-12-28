//dynamicky generovana prva uroven!
function createMenu() {
    var menu=["Hry", "O nás", "How to..", "Mapa", "Info"];
    for(i=0;i<menu.length;i++){
        var li = document.createElement("li");
        var textnode = document.createTextNode(menu[i]);
        li.appendChild(textnode);
        li.setAttribute("id", "li" + i);
        document.getElementById("menu").appendChild(li);
    }
}