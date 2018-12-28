var records,dates,SKholidays,SKnames;

function myFunction(xml) {
    var i,tmp;
    var xmlDoc = xml.responseXML;
    var txt = "";
    records = xmlDoc.getElementsByTagName("zaznam");

    dates = Array(records.length).fill(0);
    for (i = 0; i< records.length; i++) {
        tmp = records[i].getElementsByTagName("den");
        if (tmp.length>0){
            dates[i] = records[i].getElementsByTagName("den")[0].firstChild.nodeValue;
        }else{
            dates[i] = "";
        }
    }

    SKholidays = Array(dates.length).fill(0);
    for (i = 0; i< records.length; i++) {
        tmp = records[i].getElementsByTagName("SKsviatky");
        if (tmp.length>0){
            SKholidays[i] = records[i].getElementsByTagName("SKsviatky")[0].firstChild.nodeValue;
        }else{
            SKholidays[i] = "";
        }
    }

    SKnames = Array(dates.length).fill(0);
    for (i = 0; i< records.length; i++) {
        tmp = records[i].getElementsByTagName("SKd");
        if (tmp.length>0){
            SKnames[i] = records[i].getElementsByTagName("SKd")[0].firstChild.nodeValue;
        }else{
            SKnames[i] = "";
        }
    }

    for (i = 0; i < SKnames.length; i++){
        SKnames[i] = SKnames[i].replace(/[-]+[,]/g, '');   //-,
        SKnames[i] = SKnames[i].replace(/[-]/g, ''); //-
        SKnames[i] = SKnames[i].replace(/\s/g, ''); //medzery
        SKnames[i] = SKnames[i].split(',');
    }

    todayName();

}

function todayName() {
    var i,todayHoliday;
    var todayNamesDay = "";
    var today = new Date();
    var dd = today.getDate().toString();
    var mm = (today.getMonth()+1).toString();

    if(dd<10) {
        dd = '0'+dd;}
    if(mm<10) {
        mm = '0'+mm;}

    var strDate = mm+dd;

    for (i = 0; i< SKnames.length; i++) {
        if (strDate.localeCompare(dates[i]) === 0){
            for(j = 0;j< SKnames[i].length;j++){
                todayNamesDay+= SKnames[i][j] + ", ";
            }
            todayNamesDay = todayNamesDay.substring(0, todayNamesDay.length - 2); // delete ", "
            todayHoliday = SKholidays[i];
            break;
        }
    }
    document.getElementById("today").innerHTML = "Dnes je " + dd + "." + mm + ". a meniny má " + todayNamesDay + "."
}