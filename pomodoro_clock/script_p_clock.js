var adjust_focus = 25;
var adjust_break = 5;
var current_mins = 25;
var total_mins = 25; /* used to calculate elapsed time as % of total for moving ticker */
var current_secs = 0;
var pause = true;
var focus= true;
var ticker_position = 13;

setInterval(function updateClock() {
  if (pause === false) {
    current_secs -= 1;
    document.getElementById("ticker").style.right = updateTicker() + "px";
  if (current_secs < 0) {
    current_secs = 59;
    current_mins -= 1;
    /* !!!ADD code to start next mode if mins < 0 ADD CODE!!!! */
    if (current_mins < 0) {
      changeMode();
    }
  }
  console.log("setinterval update");
  updateAdjustDisplay();
  }
}, 1000);

function updateTicker() {
  var movement_amount = 0;
  movement_amount = (((1 / (total_mins * 60)) * 100 ) * 2.04);
  return ticker_position += movement_amount;
}

function changeMode() {
  if (focus === true) {
    restartBreak();
  } else if (focus === false) {
    restartFocus();
  }
}


/* time adjustment buttons events - update var and then display */
document.getElementById("focus-minus").addEventListener("click", function() {
  adjust_focus = changeTimeLengths(adjust_focus, "subtract");
  updateAdjustDisplay();
});

document.getElementById("focus-plus").addEventListener("click", function() {
  adjust_focus = changeTimeLengths(adjust_focus, "add");
  updateAdjustDisplay();
});

document.getElementById("break-minus").addEventListener("click", function() {
  adjust_break = changeTimeLengths(adjust_break, "subtract");
  updateAdjustDisplay();
});

document.getElementById("break-plus").addEventListener("click", function() {
  adjust_break = changeTimeLengths(adjust_break, "add");
  updateAdjustDisplay();
});

/* PAUSE & START BUTTON */
document.getElementById("pause").addEventListener("click", function() {
  pause = !pause;
  if (pause === true) {
    this.innerHTML = "START";
  } else if (pause === false) {
    this.innerHTML = "PAUSE";
  }
});

/* RESET BUTTONS */
document.getElementById("restart-focus").addEventListener("click", function() {
  restartFocus();
  /* add code to update display FOCUS / BREAK in circle state */
});

function restartFocus() {
  current_mins = adjust_focus;
  total_mins = adjust_focus;
  current_secs = 0;
  pause = false;
  focus = true;
  ticker_position = 13;
  document.getElementById("ticker").style.right = updateTicker() + "px";
  updateAdjustDisplay();
}

document.getElementById("restart-break").addEventListener("click", function() {
  restartBreak();
    /* add code to update display FOCUS / BREAK in circle state */
});

function restartBreak() {
  current_mins = adjust_break;
  total_mins = adjust_break;
  current_secs = 0;
  pause = false;
  focus = false;
  ticker_position = 13;
  document.getElementById("ticker").style.right = updateTicker() + "px";
  updateAdjustDisplay();
}


function changeTimeLengths(type, direction) {
  if (direction == "add") {
    type += 1;
    /* make sure time cant become negative value */
  } else if (direction == "subtract" && type > 1) {
    type -= 1;
  }
  return type;
}

function updateAdjustDisplay() {
  document.getElementById("adjust-time-focus").innerHTML = adjust_focus;
  document.getElementById("adjust-time-break").innerHTML = adjust_break;
  document.getElementById("current-mins").innerHTML = current_mins + ":";
  document.getElementById("current-secs").innerHTML = current_secs;
  if (current_secs < 10) {
    document.getElementById("current-secs").innerHTML = "0" + current_secs;
  }
  if (focus === true) {
    document.getElementById("mode").innerHTML = "<h1>FOCUS</h1>";
  } else if (focus === false) {
    document.getElementById("mode").innerHTML = "<h1>BREAK</h1>";
  }
}
