function search() {
    document.getElementById("found").innerHTML = "";
    document.getElementById("alert").style.opacity = "0";
    var wd = document.getElementById("desiredDate").value;
    var wm = document.getElementById("desiredName").value;

    if ((wd !== "") && (wm !== "")) {
        document.getElementById("submit").title = "Vymažte meno alebo dátum a skúste znova.";
        document.getElementById("alert").innerHTML = "Vymažte meno alebo dátum a skúste znova.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if ((wd === "") && (wm === "")) {
        document.getElementById("submit").title = "Zadajte meno alebo dátum.";
        document.getElementById("alert").innerHTML = "Zadajte meno alebo dátum.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if (wd !== "") {
        validateDate(wd);
        return;
    }
    if (wm !== "") {
        searchName(wm);
    }
}

function validateDate(wantedDate) {
    var reg = /[0-9]{1,2}([.][0-9]{1,2}[.])/;
    if (reg.test(wantedDate) === false) {
        document.getElementById("desiredDate").title = "Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").innerHTML = "Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    var str = wantedDate.split(".");
    var dd = str[0];
    var mm = str[1];

    if (dd === undefined || mm === undefined || str[2]) {
        document.getElementById("desiredDate").title = "Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").innerHTML = "Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if (dd.length > 2 || mm.length > 2) {
        document.getElementById("desiredDate").title = "Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").innerHTML = "Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if (dd > 31 || dd < 1) {
        document.getElementById("desiredDate").title = "Dní nemôže byť viac ako 31 alebo menej ako 1. Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").innerHTML = "Dní nemôže byť viac ako 31 alebo menej ako 1. Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if (mm > 12 || mm < 1) {
        document.getElementById("desiredDate").title = "Mesiacov nemôže byť viac ako 12 alebo menej ako 1. Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").innerHTML = "Mesiacov nemôže byť viac ako 12 alebo menej ako 1. Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if (mm == 4 || mm == 6 || mm == 9 || mm == 11) {
        if (dd > 30) {
            document.getElementById("desiredDate").title = "V tomto mesiaci nemôže byť viac ako 30 dní. Zadajte korektný dátum v tvare DD.MM.";
            document.getElementById("alert").innerHTML = "V tomto mesiaci nemôže byť viac ako 30 dní. Zadajte korektný dátum v tvare DD.MM.";
            document.getElementById("alert").style.opacity = "1";
            return false;
        }
    }

    if (mm == 2 && dd > 29) {
        document.getElementById("desiredDate").title = "V tomto mesiaci nemôže byť viac ako 29 dní. Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").innerHTML = "V tomto mesiaci nemôže byť viac ako 29 dní. Zadajte korektný dátum v tvare DD.MM.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }

    if (dd.length === 1) {
        dd = '0' + dd;
    }
    if (mm.length === 1) {
        mm = '0' + mm;
    }

    searchDate(dd, mm);
}

function searchDate(dd, mm) {
    var i, j;
    var wdate = mm + dd;
    var foundNames = '';
    var foundHolidays = '';
    for (i = 0; i < SKnames.length; i++) {
        if (wdate.localeCompare(dates[i]) === 0) {
            for (j = 0; j < SKnames[i].length; j++) {
                foundNames += SKnames[i][j] + ", ";
            }
            foundNames = foundNames.substring(0, foundNames.length - 2); // delete ", "
            foundHolidays = SKholidays[i];
            break;
        }
    }

    //0101 a 2512
    if (foundNames === "") {
        document.getElementById("found").innerHTML = dd + "." + mm + ". nemá meniny nikto. <br>V tento deň slávime: " + foundHolidays + ".";
        return false;
    }

    //vsetky sviatky s meninami
    if (foundHolidays !== "") {
        document.getElementById("found").innerHTML = dd + "." + mm + ". má meniny " + foundNames + ".<br>V tento deň slávime: " + foundHolidays + ".";
        return true;
    }

    //ostatne
    document.getElementById("found").innerHTML = dd + "." + mm + ". má meniny " + foundNames + ".";
    return true;
}

function searchName(wantedName) {
    var i, j, tmp, str;
    var foundDate = '';
    var foundName = '';
    var original = wantedName;
    wantedName = transliterate(wantedName.toLowerCase());
    wantedName = wantedName.replace(/\W/g, ''); //len slova
    for (i = 0; i < SKnames.length; i++) {
        for (j = 0; j < SKnames[i].length; j++) {
            tmp = transliterate(SKnames[i][j].toLowerCase());
            if (tmp.includes(wantedName)) {
                foundDate = dates[i];
                document.getElementById("found").innerHTML += SKnames[i][j] + " má meniny " + foundDate[2] + foundDate[3] + "." + foundDate[0] + foundDate[1] + ".<br>";
                break;
            }
        }
    }

    if (foundDate == null || foundDate === "") {
        document.getElementById("alert").innerHTML = "Meno \"" + original + "\" sa nedá nájsť. Skontrolujte zadané meno.";
        document.getElementById("alert").style.opacity = "1";
        return false;
    }
}


function createTable() {

    if (document.contains(document.getElementById("table"))) {
        document.getElementById("table").remove();
    } else {
        var table = document.createElement('table');
        table.setAttribute("id", "table");
    }

    var table = document.createElement('table');
    table.setAttribute("id", "table");

    for (var i = 0; i < document.getElementById("row").value; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("class", "tr");
        for (var j = 0; j < document.getElementById("col").value; j++) {
            var td = document.createElement('td');
            td.setAttribute("class", "td");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}


//zdroj https://gist.github.com/sgmurphy/3095196
var table = {
    // Latin
    'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
    'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
    'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ő': 'O',
    'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH',
    'ß': 'ss',
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
    'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th',
    'ÿ': 'y',

    // Greek
    'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
    'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
    'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
    'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
    'Ϋ': 'Y',
    'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
    'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
    'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
    'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
    'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',

    // Turkish
    'Ş': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ğ': 'G',
    'ş': 's', 'ı': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'ğ': 'g',

    // Russian
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
    'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
    'Я': 'Ya',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya',

    // Ukrainian
    'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
    'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',

    // Czech
    'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U',
    'Ž': 'Z',
    'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
    'ž': 'z',

    // Polish
    'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ó': 'o', 'Ś': 'S', 'Ź': 'Z',
    'Ż': 'Z',
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
    'ż': 'z',

    // Latvian
    'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
    'Š': 'S', 'Ū': 'u', 'Ž': 'Z',
    'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
    'š': 's', 'ū': 'u', 'ž': 'z'
};

function transliterate(word) {
    return word.split('').map(function (char) {
        return table[char] || char;
    }).join("");
}