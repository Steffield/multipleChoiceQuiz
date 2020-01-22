//Still need to do
    //view highscore-- on zero later highest achieved score so far-- local storage
    //in the start function my for loop and if statement dont work properly
        //-->for loop shows the last question only
        //-->if statement doesnt refer to right source it seems
    //next question after 15sec still needs to be added
    //10 sec penalty when wrong answer selected
    //final score= initials : time remaining in local storage and show in last high score div
    // go back and clear buttons on last page


//Buttons
var start = document.getElementById("start-btn");
var controls=document.querySelector(".controls");
//Header
var timeEl = document.getElementById("time");
var highScore =document.getElementById("score");
//Container
var startCon = document.getElementById("startContainer");
var questionCon= document.getElementById("questionContainer");
var lastCon =document.getElementById("highscoreContainer");
var question=document.getElementById("question");
var scoreCon= document.getElementById("scoreContainer");
//Timer
var secondsLeft = 0;
//score
var questionsCorrect= 0;
// choice buttons
var choiceParent = document.querySelectorAll("btn-grid");

var choice1 = document.getElementById("choice1");
var choiceBtn1= document.getElementById("btn1");

var choice2 = document.getElementById("choice2");
var choiceBtn2 = document.getElementById("btn2");

var choice3 = document.getElementById("choice3");
var choiceBtn3 = document.getElementById("btn3");

var choice4 = document.getElementById("choice4");
var choiceBtn4 = document.getElementById("btn4");

// next back button
//var next = document.getElementById("next-btn");
//var back = document.getElementById("back-btn");
//last buttons
var goBackBtn = document.getElementById("goBack-btn");
var clearBtn = document.getElementById("clear-btn");
//score variable
var timeRemain=secondsLeft;



//navbar time starts run when start is clicked
function setTime (){
    secondsLeft=75;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: "+ secondsLeft;
        
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            //alert("Your time is up!");
            scoreReport();
        }
    }, 1000);
}

//navbar score shows when start is clicked
function setScore(){
    console.log("Navbar scorefunction works");
    /*highScore.textContent= "Score: " + questionsCorrect;
    if(questionsCorrect===5) {
        alert("Good job! You answered all questions correctly!");
    */
   highScore.textContent= "Score: " + timeRemain;
    }    


start.addEventListener("click", setTime);
//Score in navbar to 0
start.addEventListener("click", setScore);

//startCon disappears and first question in question container appears when start clicked
start.addEventListener("click", startQuestions);

//var lastQuestion=questions.length-1;
//currentQuestion=0;

function startQuestions() {
    console.log("questionfunction");

    //change startContainer to questionContainer
    startCon.setAttribute("style", "display: none;");
    questionCon.setAttribute("style", "display: block;");
    //controls.setAttribute("style", "display: block;");
    
    //retrieve questions 
    for(var i=0; i< questions.length; i++){
        question.innerHTML=questions[i].title;
        choice1.innerHTML=questions[i].choices[0];
        choice2.innerHTML=questions[i].choices[1];
        choice3.textContent=questions[i].choices[2];
        choice4.textContent=questions[i].choices[3];
        //next question if 15sec passed
        var timeForQuestion= setTimeout(() => console.log("Question should change now!"), 15000);
        timeForQuestion= setTimeout(i++, 15000);

        //add to if statement 
        choiceBtn1.addEventListener("click", function(){
            if(questions[i].choices[0]==questions[i].answer){
                i++;
            }else if (questions[i].choices[0]!==questions[i].answer){
                secondsLeft= secondsLeft-10;
            }
        });
        choiceBtn2.addEventListener("click", function(){
            if(questions[i].choices[1]==questions[i].answer){
                i++;
            }else if (questions[i].choices[1]!==questions[i].answer){
                secondsLeft= secondsLeft-10;
            }
        });
        choiceBtn3.addEventListener("click", function(){
            if(questions[i].choices[2]==questions[i].answer){
                i++;
            }else if (questions[i].choices[2]!==questions[i].answer){
                secondsLeft= secondsLeft-10;
            }
        });
        choiceBtn4.addEventListener("click", function(){
            if(questions[i].choices[3]==questions[i].answer){
                i++;
            }else if (questions[i].choices[3]!==questions[i].answer){
                secondsLeft= secondsLeft-10;
            }
        });

    }

}

var initials= document.getElementById("initialText");
// reset final score when calculation ok
var finalScore=5;
var submit =document.getElementById("submit-btn");


function scoreReport(){
    console.log("score function works");
    //change to Score container
    startCon.setAttribute("style", "display: none;");
    questionCon.setAttribute("style", "display: none;");
    //controls.setAttribute("style", "display: none;");
    scoreCon.setAttribute("style", "display: block;");
    //show final score

    //store initals and score

    localStorage.setItem("initials", JSON.stringify(initials));
    
    var user= initials +" : Score = "+ timeRemain;
    console.log(user);    
    
}


submit.addEventListener("click", highScoreReport);
function highScoreReport(){
    startCon.setAttribute("style", "display: none;");
    questionCon.setAttribute("style", "display: none;");
    //controls.setAttribute("style", "display: none;");
    scoreCon.setAttribute("style", "display: none;");
    lastCon.setAttribute("style", "display:block;");
    document.getElementById("prevScores").innerHTML =localStorage.setItem("user", JSON.parse(user));   
    
    //initials.textContent = lastUser.initials;
    //finalScore.textContent = lastUser.finalScore;

}

   