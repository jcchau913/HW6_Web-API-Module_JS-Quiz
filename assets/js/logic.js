var buttonStart = document.querySelector("#start");
var screenStart = document.querySelector("#start-screen");
var screenQuestions = document.querySelector("#questions");
var screenFeedback = document.querySelector("#feedback");
var screenEnd = document.querySelector("#end-screen");
var quizQuestion = document.querySelector("#question-title");
var quizChoices = document.querySelector("#choices");
var finalScore = document.querySelector("#final-score");

var timeEl = document.querySelector("#time");
var secondsLeft = 76;
var intQuestion = 0;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0 || intQuestion===arrayQuestions.length) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function showQuestion() {
    if (intQuestion < arrayQuestions.length) {
    screenFeedback.style.display = "none";
    quizQuestion.innerHTML = arrayQuestions[intQuestion].title;

    var button = document.createElement("button");
    button.textContent = arrayQuestions[intQuestion].choice1;
    button.setAttribute("id", "choice1");
    quizChoices.appendChild(button);

    var button = document.createElement("button");
    button.textContent = arrayQuestions[intQuestion].choice2;
    button.setAttribute("id", "choice2");
    quizChoices.appendChild(button);

    var button = document.createElement("button");
    button.textContent = arrayQuestions[intQuestion].choice3;
    button.setAttribute("id", "choice3");
    quizChoices.appendChild(button);

    var button = document.createElement("button");
    button.textContent = arrayQuestions[intQuestion].choice4;
    button.setAttribute("id", "choice4");
    quizChoices.appendChild(button);
    }           
}

function checkAnswer(choiceNumber){
    screenFeedback.style.display = "block";
    
    if (choiceNumber===arrayQuestions[intQuestion].correct) {
        screenFeedback.textContent = "Correct!";
        var snd = new Audio("./assets/sfx/correct.wav");
        snd.play();        
    }
    else {
        screenFeedback.textContent = "Wrong!";
        secondsLeft = secondsLeft -10;
        var snd = new Audio("./assets/sfx/incorrect.wav");
        snd.play();
    } 

    // wait 1 second.
    setTimeout(function(){ 
        document.getElementById("choice1").remove();
        document.getElementById("choice2").remove();
        document.getElementById("choice3").remove();
        document.getElementById("choice4").remove();
        intQuestion++;
        showQuestion();
    }, 1000);
}

function sendMessage() {
   // var score = secondsLeft;
    screenQuestions.style.display = "none";
    screenFeedback.style.display = "none";
    screenEnd.style.display = "block";
    finalScore.textContent = secondsLeft;
}


buttonStart.addEventListener("click", function() {
    setTime();
    screenStart.style.display = "none";
    screenQuestions.style.display = "block";
    showQuestion();

});


document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'choice1'){
        checkAnswer("1");
    }
    else if(e.target && e.target.id== 'choice2'){
        checkAnswer("2");
    }
    else if(e.target && e.target.id== 'choice3'){
        checkAnswer("3");
    }
    else if(e.target && e.target.id== 'choice4'){
        checkAnswer("4");
    }
 });

var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var highscores = [];
var json_scores = JSON.parse(localStorage.getItem("highscores"));

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  // create highscores object from submission
  var scoreObject = {
    initials: initialsInput.value.trim(),
    score: secondsLeft,
  };
  highscores.push(scoreObject);

  for(var i in json_scores) {
    scoreObject = {
        initials: json_scores [i].initials,
        score: json_scores [i].score,
    };      
    highscores.push(scoreObject);
  }

    // set new submission
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = 'highscores.html';
});
