function solicitar(){

    var xhttp = new XMLHttpRequest();

    var nom_destinatari = document.getElementById("nom_destinatari").value;
    var direccio_destinatari = document.getElementById("direccio_destinatari").value;
    var cp_destinatari = document.getElementById("cp_destinatari").value;
    var pes_destinatari = document.getElementById("pes_destinatari").value;
    var alt_destinatari = document.getElementById("alt_destinatari").value;
    var ample_destinatari = document.getElementById("ample_destinatari").value;
    var fons_destinatari = document.getElementById("fons_destinatari").value;

    var maximMida = 270;
    var totalMida = parseInt(alt_destinatari) + parseInt(ample_destinatari) + parseInt(fons_destinatari);

    console.log("TOTAL MIDA: " + totalMida);

    var dni = localStorage.getItem("dni");

    if(totalMida < maximMida){
        var mides = totalMida;

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
    
        var id_enviament = getRandomInt(9999999);
    
        console.log("NOM: " + nom_destinatari + ", DIRECCIO: " + direccio_destinatari + ", CP: " + cp_destinatari + ", ALT: " + alt_destinatari + ", AMPLE: " + ample_destinatari + ", FONS: " + fons_destinatari + ", TOTAL: " + mides + ", ID SEGUIMENT: " + id_enviament + ", PES: " + pes_destinatari);
    
        xhttp.open("POST", "http://192.168.1.40/deliverass_client/registrar_paquet.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("dni=" + dni + "&nom=" + nom_destinatari + "&direccio=" + direccio_destinatari + "&cp=" + cp_destinatari + "&mides=" + alt_destinatari + "x" + ample_destinatari + "x" + fons_destinatari + "&id_enviament=" + id_enviament + "&pes=" + pes_destinatari);
    
        alert("Registrat correctament " + nom + " !");
    }else{
        alert("Mida maxima superada, revisa les teves dades");
    }

}