var olHighscores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");

//var userFirstNameSpan = document.querySelector("#user-first-name");
//var userLastNameSpan = document.querySelector("#user-last-name");

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

// get most recent submission
var json_scores = JSON.parse(localStorage.getItem("highscores"));
var highscores = [];

for(var i in json_scores) {
  //  alert(json_scores [i].initials + " " + json_scores [i].score);

    var ul = document.createElement("ul");
    ul.textContent = json_scores [i].initials + " " + json_scores [i].score;
    olHighscores.appendChild(ul);
}

//    userFirstNameSpan.textContent = lastUser.firstName;
//    userLastNameSpan.textContent = lastUser.lastName;
//    userEmailSpan.textContent = lastUser.email;
//   userPasswordSpan.textContent = lastUser.password;

clearButton.addEventListener("click", function(event) {
  event.preventDefault();
  localStorage.removeItem("highscores");
  location.reload();
 
});
