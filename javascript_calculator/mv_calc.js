var current_value = "";
var all_values = "";

var button = document.getElementsByClassName('button');
console.log(button);

for (i = 0; i < button.length; i++) {
button[i].addEventListener("click", test);
}


function test() {
  console.log(this.id);
}
