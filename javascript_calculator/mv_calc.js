var current_value = "";
var all_values = "";
var btn_operators = ["/", "*", "-", "+"];
var btn_clears = ["ac", "c"];
var decimal_exists = false;
var positive_sign = true;

var button = document.getElementsByClassName('button');
console.log(button);

for (i = 0; i < button.length; i++) {
button[i].addEventListener("click", buttonInput);
}


function buttonInput() {
  console.log(this.id);
  if (this.id >= 0 || this.id <= 9 || this.id == ".") {
    numericInput(this.id);
  } else if (btn_operators.indexOf(this.id) !== -1 && current_value != null && current_value != "" && current_value != "-") {
    operatorInput(this.id);
  } else if (btn_clears.indexOf(this.id) !== -1) {
    clearInput(this.id);
  } else if (this.id === "equals" && current_value != null && current_value != "" && current_value != "-") {
    console.log("equalsInput is being called");
    equalsInput();
  } else if (this.id == "pos-neg") {
    positiveNegative();
  }
  updateScreen();
  resizeText();
}

function resizeText() {
  var screen_operations = document.getElementsByClassName("screen-operations");
  if (all_values.length >= 50 && all_values.length < 90) {
    console.log("resizing text");
    screen_operations[0].style["font-size"] = "70%";
  } else if (all_values.length >= 90) {
    screen_operations[0].style["font-size"] = "55%";
  } else {
    screen_operations[0].style["font-size"] = "inherit";
  }
}


function numericInput(id) {
  if (decimal_exists === false && id == ".") {
    current_value += (id);
    decimal_exists = true;
  } else if (id != "."){
  current_value += (id);
  }
  console.log("Current value: " + current_value);
}

function operatorInput(id) {
  all_values += current_value + " " + id + " ";
  current_value = "";
  console.log("all: " + all_values);
  resetDecimalVar();
}

function clearInput(id) {
  if (id == "ac") {
    current_value = "";
    all_values = "";
  } else if (id == "c") {
    current_value = "";
  }
  resetDecimalVar();
}

function positiveNegative() {
  if (positive_sign === true) {
    console.log("adding neg");
    current_value = "-" + current_value;
    positive_sign = false;
  } else if (positive_sign === false) {
    console.log("adding positive");
    current_value = current_value.slice(1);
    console.log("sliced: " + current_value.slice(1));
    positive_sign = true;
  }
}

function equalsInput() {
  if (current_value != null) {
    all_values += current_value;
  }
  current_value = eval(all_values);
  all_values = "";
  resetDecimalVar();
}

function updateScreen() {
  console.log("updating screen");
  if (current_value != null) {
    document.getElementsByClassName("screen-current")[0].innerHTML = current_value;
  }
  document.getElementsByClassName("screen-operations")[0].innerHTML = all_values;
}

function resetDecimalVar() {
    decimal_exists = false;
    positive_sign = true;
}
