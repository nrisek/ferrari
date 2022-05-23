window.addEventListener("load", main);

//Kad se ucita Obrazac onda pozovi fju form();
if (window.location.href.match('obrazac.html') != null) {
    form();
}

function main() {

    //*****************************************NAVIGACIJA - Jeste li sigurni?
    currentSite = document.title;
    var navLink = document.getElementsByClassName('navLink');
    var sure = function (e) {
        if (!confirm('Jeste li sigurni da želite napustiti stranicu?')) {
            e.preventDefault();
            alert("Ostajemo na stranici: " + currentSite);
        }
    };
    for (var i = 0, l = navLink.length; i < l; i++) {
        navLink[i].addEventListener('click', sure, false);
    }

    //****************************************************INDEX
    figCapt = document.getElementById('indexFigcapt');
    indexCircle = document.getElementById('circle');
    indexRect = document.getElementById('rect');
    indexPoly = document.getElementById('poly');
    map = document.getElementById('map');
    map.addEventListener("mouseover", showCoords);
}

function showCoords() {//*******************************************INDEX Funkcija
    indexCircle.addEventListener("mouseout", function (event) {
        figCapt.innerHTML = "Ferrari";
    }, false);

    indexRect.addEventListener("mouseout", function (event) {
        figCapt.innerHTML = "Ferrari";
    }, false);

    indexPoly.addEventListener("mouseout", function (event) {
        figCapt.innerHTML = "Ferrari";
    }, false);

    indexCircle.addEventListener("mouseover", function (event) {
        let coords = indexCircle.getAttribute("coords");
        let polje = coords.split(',');
        figCapt.innerHTML = "Krug: X1=" + polje[0] + ", Y1=" + polje[1] + ", R=" + polje[2];
    }, false);

    indexRect.addEventListener("mouseover", function (event) {
        let coords = indexRect.getAttribute("coords");
        let polje = coords.split(',');
        figCapt.innerHTML = "Pravokutnik: X1=" + polje[0] + ", Y1=" + polje[1] + ", X2=" + polje[2] + ", Y2=" + polje[3];
    }, false);

    indexPoly.addEventListener("mouseover", function (event) {
        let coords = indexPoly.getAttribute("coords");
        let polje = coords.split(',');
        figCapt.innerHTML = "Višekut: X1=" + polje[0] + ", Y1=" + polje[1] + ", X2=" + polje[2] + ", Y2=" + polje[3] + ", X3=" + polje[4] + ", Y3=" + polje[5];
    }, false);
}

//*********************************************OBRAZAC
function form() {
    submit = document.getElementById('mainSubmit');
    submit.addEventListener("click", check);

    fieldset1 = document.getElementById('lijeviFieldset');
    fieldset2 = document.getElementById('srednjiFieldset');
    fieldset3 = document.getElementById('desniFieldset');

    trenutniFieldset = 1;
    greska = false;
    prviPutFieldset2=true; //da se kod prelaska s jednog fieldseta na drugi odma ne uzimaju prazna mjesta kao greške
    prviPutFieldset3=true;

    fieldset2.style.visibility = "hidden";
    fieldset3.style.visibility = "hidden";

    radioOpcije = document.getElementsByName("interijer");
    for(i=0;i<radioOpcije.length;i++)
        radioOpcije[i].checked=false;
}

function provjeriFieldset1() {
    //Fieldset 1 - Elementi
    volite = document.getElementById('volite');
    lbVolite = document.getElementById('labela_volite');
    imePrezime = document.getElementById('ime_prezime');
    lbIme = document.getElementById('labela_ime');
    datum = document.getElementById('datum_rodenja');
    lbDatum = document.getElementById('labela_datum');
    opis = document.getElementById('kratak_opis');
    lbOpis = document.getElementById('labela_opis');
    email = document.getElementById('email');
    lbEmail = document.getElementById('labela_email');

    //Provjera za fieldset1
    greska = false;
    if (volite.value < 0 || volite.value > 100) {
        volite.style.background = "rgb(255, 131, 133)";
        lbVolite.innerHTML += "*";
        greska = true;
    }
    if (imePrezime.value == "") {
        imePrezime.style.background = "rgb(255, 131, 133)";
        lbIme.innerHTML += "*";
        greska = true;
    }
    if (datum.value == "") {
        datum.style.background = "rgb(255, 131, 133)";
        lbDatum.innerHTML += "*";
        greska = true;
    }
    if (opis.value == "") {
        opis.style.background = "rgb(255, 131, 133)";
        lbOpis.innerHTML += "*";
        greska = true;
    }
    if (email.value == "") {
        email.style.background = "rgb(255, 131, 133)";
        lbEmail.innerHTML += "*";
        greska = true;
    }
}

function provjeriFieldset2() {
    //Fieldset 2 - Elementi
    lbInterijer = document.getElementById('labela_interijer');
    radios = document.querySelectorAll('input[type="radio"]:checked');
    odabrano = document.getElementById("odabir_automobila").selectedOptions;
    lbOdabir = document.getElementById('labela_odabir_automobila');

    //Provjera za fieldset 2
    greska = false;
    //fieldset2.style.visibility = "visible";
    if (radios.length == 0) {
        lbInterijer.innerHTML += "*";
        lbInterijer.style.color = "rgb(255, 131, 133)";
        greska = true;
    }
    //console.log(odabrano.length);
    if(odabrano.length<2){
        lbOdabir.innerHTML += "*";
        lbOdabir.style.color = "rgb(255, 131, 133)";
        greska = true;
    }
}

function provjeriFieldset3(){
    //Fieldset 3 - Elementi
    checks = document.querySelectorAll('input[type="checkbox"]:checked');
    lbGrijana = document.getElementById('labela_grijana');
    lbPanorama = document.getElementById('labela_panorama');
    lbAuspuh = document.getElementById('labela_auspuh');

    //Provjera za fieldset 3
    greska = false;
    if (checks.length < 2) {
        lbGrijana.innerHTML += "*";
        lbPanorama.innerHTML += "*";
        lbAuspuh.innerHTML += "*";
        lbGrijana.style.color = "rgb(255, 131, 133)";
        lbPanorama.style.color = "rgb(255, 131, 133)";
        lbAuspuh.style.color = "rgb(255, 131, 133)";
        greska = true;
    }
}

function check(e) {//**********************************OBRAZAC Funkcija
    if (trenutniFieldset == 1) {
        provjeriFieldset1();
        if (greska) e.preventDefault();
        if (!greska) {
            fieldset2.style.visibility = "visible";
            trenutniFieldset=2;
            e.preventDefault();
        } 
    }
    if(trenutniFieldset==2){
        if(prviPutFieldset2) prviPutFieldset2=false;
        else{
            provjeriFieldset2();
            if (greska) e.preventDefault();
            if(!greska){
                fieldset3.style.visibility = "visible";
                trenutniFieldset=3;
                e.preventDefault(); 
            }
        } 
    }
    if(trenutniFieldset==3){
        if(prviPutFieldset3) prviPutFieldset3=false;
        else{
            provjeriFieldset3();
            if(greska) e.preventDefault();
        }
    }

}