// Yeti object
function Yeti(data) {
  this.name = data.name;
  this.lat = data.lat;
  this.long = data.long;

  var that = this;
  var googleMap = null;
  var marker = null;
  var infoWindow = null;

  function placeMarker() {
    var position = new google.maps.LatLng(that.lat, that.long);

    marker = new google.maps.Marker({
      position: position,
      title: that.name,
      map: googleMap,
      icon: "http://www.pixeljoint.com/files/icons/funky_yeti_by_thetaupe.gif"
    });
  };

  function createInfoWindow() {
    var text = "<p><b>Yeti</b>: " + that.name + "<br />" +
      "<b>Latitude</b>: " + that.lat + "<br />" +
      "<b>Longitude</b>: " + that.long + "</p>";

    infoWindow = new google.maps.InfoWindow({
      content: text
    });
  };

  function attachInfoWindowToMarker() {
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(googleMap, marker);
    });
  };

  this.show = function(map) {
    googleMap = map;

    placeMarker();
    createInfoWindow();
    attachInfoWindowToMarker();
  };
}

