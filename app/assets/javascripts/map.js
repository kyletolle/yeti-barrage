function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(38.830, -104.820),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);

  mapYetis(map);
}

function mapYetis(map) {
  var yetiList = JSON.parse(getYetis());

  for (i = 0; i < yetiList.length; i++) {
    var yeti = yetiList[i];

    var marker = placeMarker(map, yeti);

    var infoWindow = createInfoWindow(map, yeti);
    attachInfoWindowToMarker(map, marker, infoWindow);
  }
}

function getYetis() {
  var xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/yetis.json", false);
  xmlHttp.send(null);

  return xmlHttp.responseText;
}

function placeMarker(map, yeti) {
  var yetiLatLong = new google.maps.LatLng(yeti.lat, yeti.long);

  return new google.maps.Marker({
    position: yetiLatLong,
    title: yeti.name,
    map: map,
    icon: "http://www.pixeljoint.com/files/icons/funky_yeti_by_thetaupe.gif"
  });
}

function createInfoWindow(map, yeti) {
  var text = "<p><b>Yeti</b>: " + yeti.name + "<br />" +
    "<b>Latitude</b>: " + yeti.lat + "<br />" +
    "<b>Longitude</b>: " + yeti.long + "</p>";

  return new google.maps.InfoWindow({
    content: text
  });
}

function attachInfoWindowToMarker(map, marker, infoWindow) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
  });
}
