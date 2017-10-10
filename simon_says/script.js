$(document).ready(function() {
  $(".start-button").click(function(){
    $(".start-button").text("RESTART");
    startGame();
  });
});


function startGame() {
  console.log("restart");
  $(".current-score").text("--");
  var currentPattern = [];
  compTurn(currentPattern);
}

function compTurn(arr){
  arr.push(generateNewNumber());
  showMoves(arr);
}

function generateNewNumber() {
  return Math.floor(Math.random() * (4 - 1 + 1) + 1);
}

function showMoves(arr) {
    var index = 0;
    flashNextInPattern(arr, index);
}

function flashNextInPattern(arr, index){
    $("#" + arr[index]).toggleClass("button-active");
    setTimeout(function(){
      $("#" + arr[index]).toggleClass("button-active");
      if (index < arr.length ){
        setTimeout(function(){
          flashNextInPattern(arr, index + 1);
        }, 500);
      } else if(index == arr.length){
        console.log("playerTurn");
        playerTurn(arr);
      } else{
        console.log("flashNextInPattern error");
        console.log("index: " + index + " array[i]: " + arr);
      }
    }, 700);
}

function playerTurn(arr){
  var move = 0;
  var playerArr = [];
  nextPlayerMove(arr, playerArr, move);
}

function nextPlayerMove(arr, playerArr, move){
  var clicked = "";
  if (move < arr.length){
  $(".game-button").click(function(){
    clicked = $(this).prop('id');
    playerArr.push(clicked);
    $(".game-button").off();
    checkPlayerMove(arr, playerArr, move + 1);
  });
} else if(move == arr.length) {
  // add function for addNewMove();
  console.log("computer turn");
  $(".current-score").text(arr.length);
  setTimeout(function(){
      compTurn(arr);
    }, 500);
  }
}

function checkPlayerMove(arr, playerArr, move){
  if (playerArr[playerArr.length - 1] == arr[playerArr.length - 1]){
    console.log("correct");
    console.log("move: " + move + " arrayL: " + arr.length);
    nextPlayerMove(arr, playerArr, move);
  } else {
    console.log("err");
    $(".current-score").text("XX");
  }
}
