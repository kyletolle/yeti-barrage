function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(38.830, -104.820),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);

  yetis = {};
  mapYetis();
}

function mapYetis() {
  var yetiList = JSON.parse(getYetis());

  for (i = 0; i < yetiList.length; i++) {
    var yeti = yetiList[i];

    var marker = createMarker(yeti);
    marker.setMap(map);

    var infoWindow = createInfoWindow(yeti);
    attachInfoWindowToMarker(marker, infoWindow);
  }
}

function getYetis() {
  var xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/yetis.json", false);
  xmlHttp.send(null);

  return xmlHttp.responseText;
}

function createMarker(yeti) {
  var yetiLatLong = new google.maps.LatLng(yeti.lat, yeti.long);

  return new google.maps.Marker({
    position: yetiLatLong,
    title: yeti.name,
    icon: "http://www.pixeljoint.com/files/icons/funky_yeti_by_thetaupe.gif"
  });
}

function createInfoWindow(yeti) {
  var text = "<p><b>Yeti</b>: " + yeti.name + "<br />" +
    "<b>Latitude</b>: " + yeti.lat + "<br />" +
    "<b>Longitude</b>: " + yeti.long + "</p>";

  return new google.maps.InfoWindow({
    content: text
  });
}

function attachInfoWindowToMarker(marker, infoWindow) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
  });
}
