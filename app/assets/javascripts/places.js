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
    const myLatlng = { lat: lat, lng: lng };
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get the official Police street-level crime data",
      position: myLatlng,
    });
    infoWindow.open(map);
    map.addListener("click", (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);

    var lat = mapsMouseEvent.latLng.lat();
    var lng = mapsMouseEvent.latLng.lng();
    runAPIrequest(lat, lng);
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



function runAPIrequest(lat, lng) {
axios.get('https://data.police.uk/api/crimes-street/all-crime', {
                params:{
                   lat:lat,
                   lng:lng
                }
            })
            .then(function(response){
                console.log(response);
                var data = response;
                var temp = "";

                for (i = 0; i < response.data.length; i++) {

                    temp += "<tr>";
                    temp += "<td>" + response.data[i].id + "</td>";
                    temp += "<td>" + response.data[i].category + "</td>";
                    temp += "<td>" + response.data[i].location.street.name + "</td>";
                    temp += "<td>" + response.data[i].month + "</td></tr>";

                }

                var head = "";

                head += "<tr>";
                head += "<th>id</th>";
                head += "<th>Category</th>";
                head += "<th>Street</th>";
                head += "<th>Month</th>";
                head += "</tr>";
                
                document.getElementById('data').innerHTML = temp;
                document.getElementById('header').innerHTML = head;
                document.getElementById('policeAPI').innerText = "Official Police Street Crime";

            })
            .catch(function(error){
                console.log(error);
            });
}
