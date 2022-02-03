function accedir(){

    // var xhttp2 = new XMLHttpRequest();

    var dni2 = document.getElementById("dni2").value;
    var password2 = document.getElementById("password2").value;

    // xhttp2.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {

    //        alerta();
    //        console.log(this.responseText);
    //     }
    // };

    // xhttp2.open("POST", "http://192.168.1.40/deliverass_client/login.php", true);
    // xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp2.send("dni2=" + dni2 + "&password2=" + password2);

    // function alerta(){
    //     alert("Login");
    // }

    $.ajax({
        type: "POST",
        url: "http://192.168.1.40/deliverass_client/login.php?dni2=" + dni2 + "&password2=" + password2,
        dataType: "json",
        success: function (response) {
            if(response.result === true){
                alert("LOGIN");
            }
        }
    });

}