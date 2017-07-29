var currentData = new Object;
var j = 0;
var streams = ["esl_csgo", "esamarathon", "joshog", "moonmoon_ow"]
$(document).ready(function onLoad() {
  function start(j) {
if (j < 4) {
    gettingDataLoop(j);
};
  }
    start(j);
    function gettingDataLoop(j) {
  $.ajax( {
    url: "https://wind-bow.glitch.me/twitch-api/streams/" + streams[j],
    dataType: 'jsonp',
    type: 'GET',
    error: function() {
      console.log("error");
    },
    success: function(data) {
      currentData[j] = data;
      console.log(j);
      if (currentData[j].stream !== null) {
      displayData(currentData, j);
      j = j + 1;
      console.log("after add" + j)
      start(j);
      }
    }
  })
  };


function displayData(currentData, i) {
  $(".current-game" + i).html("<p>Currently: <strong>ONLINE </strong></p>");
  $(".icon" + i).css("background-image", "url('" + currentData[i].stream.channel.logo + "')");
  $(".stream-name" + i).html("<p>" + currentData[i].stream.channel.display_name + "</p>" );
};

$(".container-row").click(function () {
  var id = $(this).attr('id');
  console.log("id = " + id);
    showMore(id);
});

function showMore(id) {
  console.log(currentData);
    $(".current-game" + id).html("<p>Currently Playing: <strong> " + currentData[id].stream.game + "</strong></p>");
  $(".preview, .preview" + id).remove();
  $(".container-row" + id).append("<div class='preview info preview'" + id + "><img src='" + currentData[id].stream.preview.medium + "'><div class='preview-text'>Preview</div></div>");
}

  });
