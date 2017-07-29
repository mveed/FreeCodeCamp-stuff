$(document).ready(function() {
$("#testBtn").click(function test() {
  testWiki();
});

function testWiki() {
    var keyword = document.getElementById("search").value;
    $.ajax( {
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&utf8=&format=json",
    dataType: 'jsonp',
    type: 'POST',
    success: function(data) {
var searchData =  data.query.search;
showResults(searchData);

}
    });
};

function showResults(searchData) {
  $(".bottom").remove();
  $("html").append("<div class='bottom'></div>");
  for (var i = 0; i < searchData.length - 1; i++) {
    $("#results" + i).remove();
    $("#" + i).remove();
        var linkTitle = searchData[i].title;
    linkTitle = linkTitle.replace(/\s/g, "_");
  $(".bottom").append("<div class='container-results' id='results" + [i] + "'></div>");
  $("#results" + i).append("<h1>" + searchData[i].title + "</h1>");
  $("#results" + i).append("<p>" + searchData[i].snippet + "...</p>");
    var position = $("#results" + i).position();
    var height = $("#results" + i).height();
    var width = $("#results" + i).width();
    var test = $("#results" + i);
    console.log(test.position());
    $("#results" + i).append("<a class='fill' id='" + i + "' href='https://en.wikipedia.org/wiki/" + linkTitle + "' target='blank'></a>");
    $(".container-results").css("cursor", "pointer");
    $("#" + [i]).css("top", position.top + 25);
    $("#" + i).css("left", position.left + 188);
    $("#" + i).css("height", height + 30);
    $("#" + i).css("width", width + 70);
  };
};
});
