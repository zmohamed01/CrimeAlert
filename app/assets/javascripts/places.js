// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom:14
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: myCoords,
        map: map
    });
}

function initMap2(lat, lng) {
    var myCoords = new google.maps.LatLng(54.3781, -4.4360);
    var mapOptions = {
    center: myCoords,
    zoom:6.3
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    var markerGrandPlace = new google.maps.Marker({
      position: new google.maps.LatLng(51.5074, 0.1278),
      map: map,
      title: "Brussels Grand-Place",
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });
    google.maps.event.addListener(markerGrandPlace, "click", function() {
      map.panTo(this.getPosition());
      map.setZoom(14);
    });
}
