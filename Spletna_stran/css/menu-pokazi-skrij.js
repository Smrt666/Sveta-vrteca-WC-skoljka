let nav = document.getElementsByTagName('nav')[0];
nav.style.display = "none";

function pokazi_skrij() {
    let navDisplay = nav.style.display;

    if (navDisplay == "none") {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
}