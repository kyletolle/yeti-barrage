// Yetis object
function Yetis() {
  //
  // Private methods for the yetis object.
  //

  function retrieveFromServer() {
    return JSON.parse(get());
  };

  function get() {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/yetis.json", false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
  };

    this.list = retrieveFromServer();
};

