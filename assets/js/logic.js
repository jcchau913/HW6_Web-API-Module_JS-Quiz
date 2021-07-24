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

    var h3 = document.createElement("h3");
    h3.textContent = arrayQuestions[intQuestion].choice1;
    h3.setAttribute("id", "choice1");
    quizChoices.appendChild(h3);

    var h3 = document.createElement("h3");
    h3.textContent = arrayQuestions[intQuestion].choice2;
    h3.setAttribute("id", "choice2");
    quizChoices.appendChild(h3);

    var h3 = document.createElement("h3");
    h3.textContent = arrayQuestions[intQuestion].choice3;
    h3.setAttribute("id", "choice3");
    quizChoices.appendChild(h3);

    var h3 = document.createElement("h3");
    h3.textContent = arrayQuestions[intQuestion].choice4;
    h3.setAttribute("id", "choice4");
    quizChoices.appendChild(h3); 
    }           
}

function checkAnswer(choiceNumber){
    screenFeedback.style.display = "block";
    
    if (choiceNumber===arrayQuestions[intQuestion].correct) {
        screenFeedback.textContent = "Correct!";
    }
    else {
        screenFeedback.textContent = "Wrong!";
        secondsLeft = secondsLeft -10;
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
    var score = secondsLeft;
    screenQuestions.style.display = "none";
    screenFeedback.style.display = "none";
    screenEnd.style.display = "block";
    finalScore.textContent = score;
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
 });

 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'choice2'){
          checkAnswer("2");
     }
 });

 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'choice3'){
          checkAnswer("3");
     }
 });

 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'choice4'){
          checkAnswer("4");
     }
 });