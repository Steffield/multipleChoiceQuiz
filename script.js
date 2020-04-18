//global scope variables

//Buttons start page
var startEl = document.querySelector(".start-btn");
var controlsEl = document.querySelector(".controls");

//Header
var timeEl = document.getElementById("time");
var highScoreEl =document.getElementById("score");

//Container
var startConEl = document.getElementById("startContainer");
var questionConEl= document.getElementById("questionContainer");
var lastConEl =document.getElementById("highscoreContainer");
var questionEl = document.getElementById("question");
var scoreConEl = document.getElementById("scoreContainer");
var correctConEl = document.getElementById("feedbackCorrect");
var wrongConEl = document.getElementById("feedbackWrong");
var finalScoreEl = document.getElementById("finalScore");
var initialText = document.getElementById("initialText");

// choice buttons
var choiceParentEl = document.querySelectorAll("btn-grid");
var choice1El = document.getElementById("choice1");
var choice2El = document.getElementById("choice2");
var choice3El = document.getElementById("choice3");
var choice4El = document.getElementById("choice4");

// next+ back button
//var next = document.getElementById("next-btn");
//var back = document.getElementById("back-btn");

// the final score is determined by how much time is left when quiz is over
//var finalScore = secondsLeft;
var submitEl = document.getElementById("submit-btn");


//last page buttons
var goBackBtnEl = document.getElementById("goBack-btn");
var clearBtnEl = document.getElementById("clear-btn");

var initialsEl = document.getElementById("initialText");

var msRemaining = 75000;
var msTimePenalty = 10000;
var msMaxQuestionViewingTime = 15000;
var currentlyViewingQuestionIndex = 0;
var questionTimerId;
var intervalId;
//var lettersOnly  = [^a-zA-Z]+/

// Function that kicks everything off
function init () {
  bindEventHandlers();
}

//all call functions on click
function bindEventHandlers() {
  startEl.addEventListener("click", startQuiz);
  submitEl.addEventListener("click", saveScore);
  choice1El.addEventListener("click", answerQuestion);
  choice2El.addEventListener("click", answerQuestion);
  choice3El.addEventListener("click", answerQuestion);
  choice4El.addEventListener("click", answerQuestion);

  goBackBtnEl.addEventListener("click", backtoStart);
  clearBtnEl.addEventListener("click", clearHighscores);
}

function startQuiz() {
  startConEl.setAttribute("style", "display: none;");
  questionConEl.setAttribute("style", "display: block;");
  startTimer();
  gotoQuestion(currentlyViewingQuestionIndex);
}

function finishQuiz() {
  stopTimer();
  gotoScoreReport();
}

function saveScore() {
  //store initals and score
  var initials = initialsEl.value;
  //allLetterCheck();
  localStorage.setItem('initials', initials.toUpperCase());
  localStorage.setItem('score', getScore());
  gotoHighScoreReport();
  highScoreEl.innerHTML=msRemaining/1000;
  
}

function startTimer() {
  intervalId = setInterval(function() {
    msRemaining = msRemaining - 1000;
    updateTimerUI();
    
    if(msRemaining <= 0) {
      stopTimer();
      finishQuiz();
    }
  }, 1000);
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);

    if (msRemaining < 0) {
      msRemaining = 0;
    }
  }
}

function updateTimerUI () {
  timeEl.textContent = "Time: " + msRemaining / 1000;
}

function gotoQuestion(questionIndex) {
  if (questionTimerId) {
    clearTimeout(questionTimerId);
  }

  if(questionIndex>questions.length-1) {
    finishQuiz();
    return;
  }

  var question = getQuestion(questionIndex);
  questionEl.innerHTML=(currentlyViewingQuestionIndex+1) + ". " + question.title;
  choice1El.innerHTML=question.choices[0];
  choice2El.innerHTML=question.choices[1];
  choice3El.innerHTML=question.choices[2];
  choice4El.innerHTML=question.choices[3];

  questionTimerId = setTimeout(function(){
    gotoNextQuestion()  
    }, msMaxQuestionViewingTime);
}

function gotoNextQuestion() {
  gotoQuestion(currentlyViewingQuestionIndex + 1);
}

function getQuestion(questionIndex) {
  var question = questions[questionIndex];

  if (question) {
    currentlyViewingQuestionIndex = questionIndex;
    return question;
  } else {
    currentlyViewingQuestionIndex = 0;
    return questions[0];
  }
}

function answerQuestion(evt) {
  var question = getQuestion(currentlyViewingQuestionIndex);
  var selectedAnswer = evt.target.id;

  if(selectedAnswer === question.answer){
    onQuestionCorrect();
  } else{
    onQuestionWrong();
  }
}

function onQuestionCorrect() {
  console.log("correct");
  correctConEl.setAttribute("style", "display: block;");
  wrongConEl.setAttribute("style", "display:none;");
  if(currentlyViewingQuestionIndex===4){
    correctConEl.setAttribute("style", "display: none;");
    wrongConEl.setAttribute("style", "display:none;");
  };
  gotoNextQuestion();
}

function onQuestionWrong() {
  console.log("wrong");
  //intervalId = setInterval(function() {
    correctConEl.setAttribute("style", "display: none;");
    wrongConEl.setAttribute("style", "display:block;")
    //},1000);
    msRemaining = msRemaining - msTimePenalty;
}

function gotoScoreReport(){
    console.log("score function runs");
    //change to Score container
    startConEl.setAttribute("style", "display: none;");
    questionConEl.setAttribute("style", "display: none;");
    //controlsEl.setAttribute("style", "display: none;");
    scoreConEl.setAttribute("style", "display: block;");
    //show final score
    initialText.innerHTML ="";
    finalScore.innerHTML = getScore();
    return;
}

function getScore(){
  return msRemaining / 1000;
}

function gotoHighScoreReport(){
    startConEl.setAttribute("style", "display: none;");
    questionConEl.setAttribute("style", "display: none;");
    //controls.setAttribute("style", "display: none;");
    scoreConEl.setAttribute("style", "display: none;");
    lastConEl.setAttribute("style", "display:block;");
    document.getElementById("prevScores").innerHTML = localStorage.getItem('initials') + ': '+ localStorage.getItem('score');
  }

  
  function clearHighscores(){
    localStorage.clear();
    document.getElementById("prevScores").innerHTML = "";
  return;
}

function  backtoStart(){
  startConEl.setAttribute("style", "display: block;");
  lastConEl.setAttribute("style", "display: none;");
  currentlyViewingQuestionIndex=0;
  highScoreEl.innerHTML="View Highscore";
  timeEl.innerHTML = "Time";
  msRemaining =75000;
}

init();