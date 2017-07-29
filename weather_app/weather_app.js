var summ;
var temperature;
var lat;
var lon;
var tempUnit = "f";
var convertReady = false;

//on load, do these things
$(document).ready( function() {
  // get some geolocation info
navigator.geolocation.getCurrentPosition(locationTime);
$("#convertUnit").click(function convert() {
  if (convertReady === true) {
  if (tempUnit === "f") {
    tempUnit = "c";
    temperature = (temperature - 32) * (5 / 9);
    $("#temperature").html("<p>" + temperature.toFixed(0) + " &deg;C" + "</p>");
  } else {
    tempUnit = "f";
    temperature = ((9 / 5) * temperature) + 32;
    $("#temperature").html("<p>" + temperature.toFixed(0) + " &deg;F" + "</p>");
  };
  };
});

});








function locationTime(pos) {
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  displayWeather();
  $.ajax({
            url: "https://geoip-db.com/jsonp",
            jsonpCallback: "callback",
            dataType: "jsonp",
            success: function( location ) {
                $('#location').html(location.city);
            }
  });
  $("#get-weather2").text("Wait - Getting Weather Details");
}

$("#get-weather").click( function() {
  $("#summary").html("<p>" + summ + "</p>");
    $("#temperature").html("<p>" + temperature + "</p>");
});

function displayWeather() {
  // get dat json son
$.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f87e96e2050b9d9124e9053ca402c20b/" + encodeURIComponent(lat + "," + lon), function(json){
  //callback, on json success, set up variables with that data
    summ = json.currently.summary;
    temperature = json.currently.temperature;
    $("#summary").html("<p>" + summ + "</p>");
    $("#temperature").html("<p>" + temperature.toFixed(0) + " &deg;F" + "</p>");
  $("#get-weather2").text("");
  const skycons = new Skycons({"color": "white"});
  skycons.add(document.getElementById("weather-icon"), json.currently.icon);
  convertReady = true;
});
};
