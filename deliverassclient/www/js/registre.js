function registre(){
    var xhttp = new XMLHttpRequest();

    var nom = document.getElementById("nom").textContent;
    var dni = document.getElementById("dni").textContent;
    var direccio = document.getElementById("direccio").textContent;
    var cp = document.getElementById("cp").textContent;
    var password = document.getElementById("password").textContent;

    console.log("Nom: " + nom + " DNI: " + dni + " Direccio: " + direccio + " CP: " + cp + "Contrasenya: " + password);

    xhttp.open("POST", "http://192.168.1.40/deliverass_client/register.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nom=" + nom + "&dni=" + dni + "&direccio=" + direccio + "&cp=" + cp + "&password=" + password);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
            var response = JSON.parse(xhttp.responseText);
            if (xhttp.status === 200) {
                alert("Registrat correctament " + nom + ", ja pots accedir!");
            } else {
                alert("Registre erroni, revisa les dades!");
            }
        }
    }

}