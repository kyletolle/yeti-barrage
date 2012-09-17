// Map object
function Map() {
  // The actual map object.
  var map = null;
  var yetis = [];

  // Initialize the map.
  this.initialize = function() {
    var mapOptions = {
      center: new google.maps.LatLng(38.830, -104.820),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    this.map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

    this.showYetis();

    attachListeners(this.map);
  };

  // Show the yetis on the map.
  this.showYetis = function() {
    var yetiData = new Yetis().list;

    for (i = 0; i < yetiData.length; i++) {
      var yeti = new Yeti(yetiData[i]);
      yetis.push(yeti);

      yeti.show(this.map);
    }
  };

  function attachListeners(map) {
    google.maps.event.addListener(map, 'rightclick', function(event) {
      addYeti(event);
    });
  };

  function addYeti(event) {
    createModalBkg();
    createModal();
    setForm();
    addCancelButton();

    function createModalBkg() {
      $('<div id="modalBkg"><p>Test</p></div>').prependTo('body');
      $('#modalBkg').css({
        top: "0px",
        left: "0px",
        position: 'fixed',
        width: "100%",
        height: "100%",
        background: "#333333",
          opacity: 0.8,
        zIndex: "10"
      });
    };

    function createModal() {
      $('<div id="modal"></div>').insertAfter('#map_canvas');
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
          zIndex: "100"
      });
    };

    function setForm() {
      $('#yeti_lat').val(event.latLng.Xa);
      $('#yeti_long').val(event.latLng.Ya);
      $('#yeti_name').focus();
    };

    function addCancelButton() {
      $('<button id="cancel">Cancel</button>').appendTo('div.actions');
      $('#cancel').click(function() {
        clearModal();
        return false;
      });

      // Listen for the escape key to clear the modal dialog.
      $(document).keyup(function(e) {
        if (e.keyCode == 27) { clearModal(); }
      });

      function clearModal() {
        $('#modal').remove();
        $('#modalBkg').remove();
      }
    }

    function getNewForm() {
      var xmlHttp = null;

      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", "/yetis/new.json", false);
      xmlHttp.send(null);

      return JSON.parse(xmlHttp.responseText).html;
    }
  };
}

