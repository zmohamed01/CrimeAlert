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
                    temp += "<td>" + response.data[i].category + "</td>";
                    temp += "<td>" + response.data[i].location.street.name + "</td>";
                    temp += "<td>" + response.data[i].month + "</td></tr>";

                }

                var head = "";

                head += "<tr>";
                head += "<th>Category</th>";
                head += "<th>Street</th>";
                head += "<th>Month</th>";
                head += "</tr>";

                document.getElementById('data').innerHTML = temp;
                document.getElementById('header').innerHTML = head;
                document.getElementById('policeAPI').innerText = "Official Police Street Crime";
                category = document.getElementById('category')
                category.style.display = "";
                count = document.getElementById('count')
                count.style.display = "";
                countDrugs();

            })
            .catch(function(error){
                console.log(error);
            });
}


function sortCategory() {

  // Declare variables

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("category");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query

  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
      } else {
          tr[i].style.display = "none";
      }

      }

  }

}

function countDrugs() {



  var input, table, tr, td, i, txtValue;
  var drugscount = 0;
  var biketheft = 0;
  var asb = 0;
  var cda = 0;
  var ot = 0;
  var pow = 0;
  var po = 0;
  var shop = 0;
  var theft = 0;
  var vehicle = 0;
  var violent = 0;
  var other = 0;

  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");



  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf('drugs') > -1) {
            drugscount++;
        } else if (txtValue.indexOf('bicycle-theft') > -1) {
            biketheft++;
        } else if (txtValue.indexOf('anti-social-behaviour') > -1) {
            asb++;
        } else if (txtValue.indexOf('criminal-damage-arson') > -1) {
            cda++;
        } else if (txtValue.indexOf('other-theft') > -1) {
            ot++;
        } else if (txtValue.indexOf('possession-of-weapons') > -1) {
            pow++;
        } else if (txtValue.indexOf('public-order') > -1) {
            po++;
        } else if (txtValue.indexOf('shoplifting') > -1) {
            shop++;
        } else if (txtValue.indexOf('theft-from-the-person') > -1) {
            theft++;
        } else if (txtValue.indexOf('vehicle-crime') > -1) {
            vehicle++;
        } else if (txtValue.indexOf('violent-crime') > -1) {
            violent++;
        } else if (txtValue.indexOf('other-crime') > -1) {
            other++;
        }
      }

  }

  document.getElementById('asb').innerHTML = 'Anti Social Behaviour: '+ asb;
  document.getElementById('drugs').innerHTML = 'Drugs: '+ drugscount;
  document.getElementById('bike-theft').innerHTML = 'Bike Theft: '+ biketheft;
  document.getElementById('cda').innerHTML = 'Criminal Damage Arson: '+ cda;
  document.getElementById('ot').innerHTML = 'Other Theft: '+ ot;
  document.getElementById('pow').innerHTML = 'Possesion of Weapon: '+ pow;
  document.getElementById('po').innerHTML = 'Public Order: '+ po;
  document.getElementById('shop').innerHTML = 'Shoplifting: '+ shop;
  document.getElementById('theft').innerHTML = 'Theft from the Person: '+ theft;
  document.getElementById('vehicle').innerHTML = 'Vehicle Crime: '+ vehicle;
  document.getElementById('violent').innerHTML = 'Violent Crime: '+ violent;
  document.getElementById('other').innerHTML = 'Other: '+ other;

}
// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 40.749933, lng: -73.98633 },
//     zoom: 13,
//   });
//   const card = document.getElementById("pac-card");
//   const input = document.getElementById("pac-input");
//   const biasInputElement = document.getElementById("use-location-bias");
//   const strictBoundsInputElement = document.getElementById("use-strict-bounds");
//   const options = {
//     componentRestrictions: { country: "us" },
//     fields: ["formatted_address", "geometry", "name"],
//     origin: map.getCenter(),
//     strictBounds: false,
//     types: ["establishment"],
//   };
//   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
//   const autocomplete = new google.maps.places.Autocomplete(input, options);
//   // Bind the map's bounds (viewport) property to the autocomplete object,
//   // so that the autocomplete requests use the current map bounds for the
//   // bounds option in the request.
//   autocomplete.bindTo("bounds", map);
//   const infowindow = new google.maps.InfoWindow();
//   const infowindowContent = document.getElementById("infowindow-content");
//   infowindow.setContent(infowindowContent);
//   const marker = new google.maps.Marker({
//     map,
//     anchorPoint: new google.maps.Point(0, -29),
//   });
//   autocomplete.addListener("place_changed", () => {
//     infowindow.close();
//     marker.setVisible(false);
//     const place = autocomplete.getPlace();
//
//     if (!place.geometry || !place.geometry.location) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + place.name + "'");
//       return;
//     }
//
//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);
//     }
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//     infowindowContent.children["place-name"].textContent = place.name;
//     infowindowContent.children["place-address"].textContent =
//       place.formatted_address;
//     infowindow.open(map, marker);
//   });
//
//   // Sets a listener on a radio button to change the filter type on Places
//   // Autocomplete.
//   function setupClickListener(id, types) {
//     const radioButton = document.getElementById(id);
//     radioButton.addEventListener("click", () => {
//       autocomplete.setTypes(types);
//       input.value = "";
//     });
//   }
//   setupClickListener("changetype-all", []);
//   setupClickListener("changetype-address", ["address"]);
//   setupClickListener("changetype-establishment", ["establishment"]);
//   setupClickListener("changetype-geocode", ["geocode"]);
//   biasInputElement.addEventListener("change", () => {
//     if (biasInputElement.checked) {
//       autocomplete.bindTo("bounds", map);
//     } else {
//       // User wants to turn off location bias, so three things need to happen:
//       // 1. Unbind from map
//       // 2. Reset the bounds to whole world
//       // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
//       autocomplete.unbind("bounds");
//       autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
//       strictBoundsInputElement.checked = biasInputElement.checked;
//     }
//     input.value = "";
//   });
//   strictBoundsInputElement.addEventListener("change", () => {
//     autocomplete.setOptions({
//       strictBounds: strictBoundsInputElement.checked,
//     });
//
//     if (strictBoundsInputElement.checked) {
//       biasInputElement.checked = strictBoundsInputElement.checked;
//       autocomplete.bindTo("bounds", map);
//     }
//     input.value = "";
//   });
// }
