document.addEventListener('deviceready', obtenirDades, false);

function obtenirDades(){

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://192.168.1.40/deliverass_client/dadesClient.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("");

}