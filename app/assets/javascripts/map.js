// Map object
map = 
{
  // The actual map object.
  map : null,

  // Initialize the map.
  initialize : function() {
    var mapOptions = {
      center: new google.maps.LatLng(38.830, -104.820),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    this.map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

    this.showYetis();

    attachListeners(this.map);
  },

  // Show the yetis on the map.
  showYetis : function() {
    var yetiList = yetis.list;

    for (i = 0; i < yetiList.length; i++) {
      var data = yetiList[i];

      yeti.show(this.map, data);
    }
  }
}

// Yetis closure
{
  //
  // Private methods for the yetis object.
  //

  var retrieveFromServer = function() {
    return JSON.parse(get());
  }

  var get = function() {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/yetis.json", false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
  }

  yetis = {
    list : retrieveFromServer()
  };
}

// Yeti closure
{
  var placeMarker = function (map, data) {
    var yetiLatLong = new google.maps.LatLng(data.lat, data.long);

    return new google.maps.Marker({
      position: yetiLatLong,
      title: data.name,
      map: map,
      icon: "http://www.pixeljoint.com/files/icons/funky_yeti_by_thetaupe.gif"
    });
  }

  var createInfoWindow = function(map, data) {
    var text = "<p><b>Yeti</b>: " + data.name + "<br />" +
      "<b>Latitude</b>: " + data.lat + "<br />" +
      "<b>Longitude</b>: " + data.long + "</p>";

    return new google.maps.InfoWindow({
      content: text
    });
  }

  var attachInfoWindowToMarker = function(map, marker, infoWindow) {
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });
  }

  yeti = {
    show : function(map, data) {
      var marker = placeMarker(map, data);
      var infoWindow = createInfoWindow(map, data);
      attachInfoWindowToMarker(map, marker, infoWindow);
    }
  }
}


function attachListeners(map) {
  google.maps.event.addListener(map, 'rightclick', function(event) {
    addYeti(event);
  });
}

function addYeti(event) {
  $('<div id="modal"></div>').appendTo('#map_canvas');
  $('#modal').html(
      getNewForm()
  );
  $('#modal').css({
      position: 'fixed',
      width: "50%",
      height: "50%",
      background: "white",
      padding: '10px'
  });
  $('#modal').css({
      top: (($(window).height() / 2) - ($('#modal').height() /2 )),
      left: (($(window).width() / 2) - ($('#modal').width() / 2 )),
      zIndex: "10"
  });

  function getNewForm() {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/yetis/new.json", false);
    xmlHttp.send(null);

    return JSON.parse(xmlHttp.responseText).html;
  }
}
