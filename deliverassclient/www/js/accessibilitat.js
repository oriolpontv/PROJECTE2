$('#increasetext').click(function() {
    curSize = parseInt($('body').css('font-size')) + 2;
    if (curSize <= 32)
        $('body').css('font-size', curSize);
        $('leaflet-popup-content').css('font-size', curSize);
});

$('#resettext').click(function() {
    if (curSize != 18)
        $('body').css('font-size', 18);
        $('leaflet-popup-content').css('font-size', 'inherit');
});

$('#vision').click(function() {
    $('body').removeClass('vision-dark');
});

$('#vision2').click(function() {
    $('body').addClass('vision-dark');
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
