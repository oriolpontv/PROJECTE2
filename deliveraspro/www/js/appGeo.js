window.addEventListener("load", inici, false);

var locations = [];

function inici() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      lecturaxml(this);
    }
  };
  xhttp.open("GET", "http://192.168.1.40/deliverass_pro/paquets/"+ date +"/arxiu"+ date +".xml", true);
  xhttp.send();
}

function editar(){
  var xhttp = new XMLHttpRequest();
  var parametres = document.getElementById("referencia").textContent;
  console.log(parametres);
  xhttp.open("POST", "http://192.168.1.40/deliverass_pro/paquets/editar.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + parametres);
  alert("Entrega numero " + parametres + " realitzada correctament!");
    location.reload();
}

function absent(){
  var xhttp = new XMLHttpRequest();
  var parametres = document.getElementById("referencia").textContent;
  console.log(parametres);
  xhttp.open("POST", "http://192.168.1.40/deliverass_pro/paquets/absent.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + parametres);
  alert("Entrega numero " + parametres + " absent");
    location.reload();
}

function undo(){
  var xhttp = new XMLHttpRequest();
  var parametres = document.getElementById("referencia").textContent;
  console.log(parametres);
  xhttp.open("POST", "http://192.168.1.40/deliverass_pro/paquets/undo_canvis.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + parametres);
  alert("Entrega numero " + parametres + " restaurada correctament!");
  location.reload();
}

function upload(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://192.168.1.40/deliverass_pro/paquets/xmlPostgres.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
  alert("Dades pujades correctament!");
}

function lecturaxml(xml) {
  var xmlDoc = xml.responseXML;
  for (var i = 0; i < xmlDoc.getElementsByTagName("pedido").length; i++) {
    id_enviament = xmlDoc.getElementsByTagName("id_enviament")[i].childNodes[0].nodeValue;
    id_treballador = xmlDoc.getElementsByTagName("id_treballador")[i].childNodes[0].nodeValue;
    latitud   = xmlDoc.getElementsByTagName("latitud")[i].childNodes[0].nodeValue;
    longitud  = xmlDoc.getElementsByTagName("longitud")[i].childNodes[0].nodeValue;
    pes  = xmlDoc.getElementsByTagName("pes")[i].childNodes[0].nodeValue; 
    cp  = xmlDoc.getElementsByTagName("cp")[i].childNodes[0].nodeValue; 
    data  = xmlDoc.getElementsByTagName("data")[i].childNodes[0].nodeValue;  
    estat = xmlDoc.getElementsByTagName("estat")[i].childNodes[0].nodeValue; 
    direccio  = xmlDoc.getElementsByTagName("direccio")[i].childNodes[0].nodeValue; 
    intents  = xmlDoc.getElementsByTagName("intents")[i].childNodes[0].nodeValue; 
    absent  = xmlDoc.getElementsByTagName("absent")[i].childNodes[0].nodeValue; 
    mides  = xmlDoc.getElementsByTagName("mides")[i].childNodes[0].nodeValue; 
    fragil  = xmlDoc.getElementsByTagName("fragil")[i].childNodes[0].nodeValue; 
    nom_destinatari  = xmlDoc.getElementsByTagName("nom_destinatari")[i].childNodes[0].nodeValue; 
    id_remitent  = xmlDoc.getElementsByTagName("id_remitent")[i].childNodes[0].nodeValue; 
    dni_client  = xmlDoc.getElementsByTagName("dni_client")[i].childNodes[0].nodeValue; 

    locations.push([i, id_enviament, id_treballador, latitud, longitud, id_enviament, pes, cp, data, estat, direccio, intents, absent, mides, fragil, nom_destinatari, id_remitent, dni_client]);

    console.log(locations);
  }
  app.init();
}

var app = {
  init: function () {
    navigator.geolocation.getCurrentPosition(app.onSuccess);
  },
  onSuccess: function (position) {
    var map = L.map('zona_mapa').setView([locations[0][3], locations[0][4]], 17);
    mapLink ='<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
      }).addTo(map);
     
     
      // Colors
     var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var orangeIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    for (var i = 0; i < locations.length; i++) {
      if (locations[i][9] == "No entregat" && locations[i][12] == "0") {
        marker = new L.marker([locations[i][3], locations[i][4]], { icon: redIcon }).bindPopup("<button id='btnAbsent' onclick='absent()'><i class='fas fa-check'></i>&nbsp;ABSENT</button><br><button id='btnEntregar' onclick='editar()'><i class='fas fa-check'></i>&nbsp;ENTREGAT</button><br><b>Ref.: </b><span id='referencia'>" + locations[i][1] + "</span><br><b>Pes: </b><span>" + locations[i][6] + "</span><br><b>CP: </b><span>" + locations[i][7] + "</span><br><b>Entrega Max: </b><span>" + locations[i][8] + "</span><br><b>Estat: </b><span>" + locations[i][9] + "</span><br><b>Direccio: </b><span>" + locations[i][10] + "</span><br><b>Intents: </b><span>" + locations[i][11] + "</span><br><b>Absent: </b><span>Sense dades</span><br><b>Mides: </b><span>" + locations[i][13] + "</span><br><b>Intents: </b><span>" + locations[i][14] + "</span><br><b>Nom: </b><span>" + locations[i][15] + "</span><br><b>DNI: </b><span>" + locations[i][17]).addTo(map);
      } 
      if (locations[i][9] == "Entregat") {
        marker = new L.marker([locations[i][3], locations[i][4]], { icon: greenIcon }).bindPopup("<button id='btnUndo' onclick='undo()'><i class='fas fa-trash-restore'></i>&nbsp;RESTAURAR</button><br><b>Ref.: </b><span id='referencia'>" + locations[i][1] + "</span><br><b>Pes: </b><span id='referencia'>" + locations[i][6] + "</span><br><b>CP: </b><span id='referencia'>" + locations[i][7] + "</span><br><b>Entrega Max: </b><span id='referencia'>" + locations[i][8] + "</span><br><b>Estat: </b><span id='referencia'>" + locations[i][9] + "</span><br><b>Direccio: </b><span id='referencia'>" + locations[i][10] + "</span><br><b>Mides: </b><span id='referencia'>" + locations[i][13] + "</span><br><b>Intents: </b><span id='referencia'>" + locations[i][14] + "</span><br><b>Nom: </b><span id='referencia'>" + locations[i][15] + "</span><br><b>DNI: </b><span id='referencia'>" + locations[i][17]).addTo(map);
      }
      if (locations[i][9] == "No entregat" && locations[i][12] == "1") {
        marker = new L.marker([locations[i][3], locations[i][4]], { icon: orangeIcon }).bindPopup("<button id='btnAbsent' onclick='absent()'><i class='fas fa-check'></i>&nbsp;ABSENT</button><br><button id='btnEntregar' onclick='editar()'><i class='fas fa-check'></i>&nbsp;ENTREGAT</button><br><b>Ref.: </b><span id='referencia'>" + locations[i][1] + "</span><br><b>Pes: </b><span>" + locations[i][6] + "</span><br><b>CP: </b><span>" + locations[i][7] + "</span><br><b>Entrega Max: </b><span>" + locations[i][8] + "</span><br><b>Estat: </b><span>" + locations[i][9] + "</span><br><b>Direccio: </b><span>" + locations[i][10] + "</span><br><b>Intents: </b><span>" + locations[i][11] + "</span><br><b>Absent: </b><span>Si</span><br><b>Mides: </b><span>" + locations[i][13] + "</span><br><b>Intents: </b><span>" + locations[i][14] + "</span><br><b>Nom: </b><span>" + locations[i][15] + "</span><br><b>DNI: </b><span>" + locations[i][17]).addTo(map);
      } 
    }
  }
}




