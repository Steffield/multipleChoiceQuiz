//what is not working
//1. it deducts time and gives instant "wrong" feeback when you start before you clicked a button. Must be an error in the eventlistener if statement
//2. setTimout function doesnt work
    //tried to use it to change the question every 15sec and to show the feedback for 1 second only
//3. go to scoreCon and stop the time after the last question is answered. Since I never made it work with a for loop, I don't know how to do that
//4. when all questions are answered the variable secondsLeft should stop and the value should be going into the  var finalScore container
// 5. the entered initals shoudl stay in local storage
    //on last page retrieve initals plus score
    //store former highscores


//global scopre variables
//Buttons start page
var start = document.querySelector(".start-btn");
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
var correctCon = document.getElementById("feedbackCorrect");
var wrongCon =document.getElementById("feedbackWrong");

//Timer
var secondsLeft = 0;

//score
var questionsCorrect= 0;
var timeRemain=secondsLeft;
var finalScore =document.getElementById("finalScore");


// choice buttons
var choiceParent = document.querySelectorAll("btn-grid");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

// next+ back button
//var next = document.getElementById("next-btn");
//var back = document.getElementById("back-btn");

//last page buttons
var goBackBtn = document.getElementById("goBack-btn");
var clearBtn = document.getElementById("clear-btn");



//Function Timer: time starts run in navbar when start is clicked
function setTime (){
    secondsLeft=75;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: "+ secondsLeft;
        
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            //alert("Your time is up!");
            scoreReport();
        }
    }, 1000);
}

//Fuction display score: navbar score shows when start is clicked
// function setScore(){
//     console.log("Navbar scorefunction runs");
//     highScore.innerHTML= "Score: " + timeRemain;
// }    

//call functions on click
start.addEventListener("click", setTime);
//start.addEventListener("click", setScore);

//startCon disappears and first question in question container appears when start clicked
start.addEventListener("click", startQuestions);

function startQuestions() {
    console.log("questionfunction");

    //change startContainer to questionContainer
    startCon.setAttribute("style", "display: none;");
    questionCon.setAttribute("style", "display: block;");
    //controls.setAttribute("style", "display: block;");


    //retrieve questions 
    //for(var i=0; i< questions.length; i++){
        var i=0;
        question.innerHTML=(i+1) + ". " + questions[i].title;
        choice1.innerHTML=questions[i].choices[0];
        choice2.innerHTML=questions[i].choices[1];
        choice3.innerHTML=questions[i].choices[2];
        choice4.innerHTML=questions[i].choices[3];

        //move to next question after 15sec
        // timeLimit(function() {
        //     var timeForQuestion= 15;
        //     timeForQuestion--;
        //     if(timeForQuestion==0){
        //         i++;
        //     }
        // }, 1000);
        // timeLimit();
        

        document.addEventListener("click", function(event) {
            console.log(event.target.id);
            
            if(event.target.id==questions[i].answer){
                //score+=1;
                //startCon.setAttribute("style", "display: none;");
                setTimeout(function(event){
                    correctCon.setAttribute("style", "display: block;");
                    wrongCon.setAttribute("style", "display:none;")
                }, 1000);
                //setTimeout(event); 
            
                //setTimeout function doesnt work mu
                i++;
                question.innerHTML=(i+1) + ". " + questions[i].title;
                choice1.innerHTML=questions[i].choices[0];
                choice2.innerHTML=questions[i].choices[1];
                choice3.innerHTML=questions[i].choices[2];
                choice4.innerHTML=questions[i].choices[3];

            //} else if (event.target.id !== questions[i].answer && event.target.id==questions[i].choices){
                
            } else if (event.target.id !== questions[i].answer){
                setTimeout(function(event){  
                    correctCon.setAttribute("style", "display: none;");
                    wrongCon.setAttribute("style", "display:block;")
                    }, 1000);
                //setTimeout(event);
                secondsLeft-=10;
                //doesnt work bc the answer is choice which equals other answers before
            // } else if (event.target.id==questions[4].answer){
            //     startCon.setAttribute("style", "display: none;");
            //     questionCon.setAttribute("style", "display: none;");
            //     scoreCon.setAttribute("style", "display: block;")
            //     finalScore.innerHTML=secondsLeft;

            }
        });

       
 }
    

var initials= document.getElementById("initialText");
// the final score is determined by how much time is left when quiz is over
var finalScore=secondsLeft;
var submit =document.getElementById("submit-btn");


function scoreReport(){
    console.log("score function runs");
    //change to Score container
    startCon.setAttribute("style", "display: none;");
    questionCon.setAttribute("style", "display: none;");
    //controls.setAttribute("style", "display: none;");
    scoreCon.setAttribute("style", "display: block;");
    //show final score
    finalScore.innerHTML=secondsLeft;
}

    

    //store initals and score
    localStorage.setItem("initials", JSON.stringify(initials));
    
    // get most recent submission
    var lastUser = JSON.parse(localStorage.getItem("initials"));
    
    var user= lastUser +" : Score = "+ timeRemain;
    console.log(user);    
    



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
