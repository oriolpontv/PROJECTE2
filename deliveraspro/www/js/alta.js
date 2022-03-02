function solicitar(){

    // var xhttp = new XMLHttpRequest();

    var nom_destinatari = document.getElementById("nom_destinatari").value;
    var direccio_destinatari = document.getElementById("direccio_destinatari").value;
    var cp_destinatari = document.getElementById("cp_destinatari").value;
    var alt_destinatari = document.getElementById("alt_destinatari").value;
    var ample_destinatari = document.getElementById("ample_destinatari").value;
    var fons_destinatari = document.getElementById("fons_destinatari").value;

    var maximMida = 270;
    var totalMida = parseInt(alt_destinatari) + parseInt(ample_destinatari) + parseInt(fons_destinatari);

    console.log("TOTAL MIDA: " + totalMida);

    console.log("NOM: " + nom_destinatari + ", DIRECCIO: " + direccio_destinatari + ", CP: " + cp_destinatari + ", ALT: " + alt_destinatari + ", AMPLE: " + ample_destinatari + ", FONS: " + fons_destinatari);

    if(totalMida < maximMida){
        var mides = totalMida;

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
    
        var id_enviament = getRandomInt(9999999);
    
        console.log("NOM: " + nom_destinatari + ", DIRECCIO: " + direccio_destinatari + ", CP: " + cp_destinatari + ", ALT: " + alt_destinatari + ", AMPLE: " + ample_destinatari + ", FONS: " + fons_destinatari + ", TOTAL: " + mides + ", ID SEGUIMENT: " + id_enviament);
    
        // xhttp.open("POST", "http://192.168.1.40/deliverass_client/noupaquet.php", true);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhttp.send("nom=" + nom + "&dni=" + dni + "&direccio=" + direccio + "&cp=" + cp + "&password=" + password);
    
        // alert("Registrat correctament " + nom + " !");
    }else{
        alert("Mida maxima superada, revisa les teves dades");
    }

}