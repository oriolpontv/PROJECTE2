function registre(){

    var xhttp = new XMLHttpRequest();

    var nom = document.getElementById("nom").value;
    var dni = document.getElementById("dni").value;
    var direccio = document.getElementById("direccio").value;
    var cp = document.getElementById("cp").value;
    var password = document.getElementById("password").value;

    console.log("Nom: " + nom + " DNI: " + dni + " Direccio: " + direccio + " CP: " + cp + "Contrasenya: " + password);

    xhttp.open("POST", "http://192.168.1.40/deliverass_client/register.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nom=" + nom + "&dni=" + dni + "&direccio=" + direccio + "&cp=" + cp + "&password=" + password);

    alert("Registrat correctament " + nom + " !");
}