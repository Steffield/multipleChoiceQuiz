//Still need to do
    //view highscore-- on zero later highest achieved score so far-- local storage
    //in the start function my for loop and if statement dont work properly
        //-->for loop shows the last question only
        //-->if statement doesnt refer to right source it seems
    //next question after 15sec still needs to be added
    //10 sec penalty when wrong answer selected
    //final score= initials : time remaining in local storage and show in last high score div
    // go back and clear buttons on last page

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
        
        if(secondsLeft === 0) {
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
    for(var i=0; i< questions.length; i++){
        question.innerHTML=questions[i].title;
        choice1.innerHTML=questions[i].choices[0];
        choice2.innerHTML=questions[i].choices[1];
        choice3.innerHTML=questions[i].choices[2];
        choice4.innerHTML=questions[i].choices[3];

        //move to next question after 15sec
        var timerLimit = timeLimit(function() {
            var timForQuestion= 15;
            if(timeForQuestion==0){
                i++;
            }
        }, 1000);
        timeLimit();

       
    }
}

 //selected buttons 
 document.addEventListener("click", function(event) {
    console.log(event.target.id);
    if(event.target.id==questions.answer){
        //score+=1;
        startCon.setAttribute("style", "display: none;");
        correctCon.setAttribute("style", "display: block;");
        i++
        //var i=1;
        var q= questions[i];
        question.innerHTML=(i+1) + ". " + q.title;
        choice1.innerHTML=q.choices[0];
        choice2.innerHTML=q.choices[1];
        choice3.innerHTML=q.choices[2];
        choice4.innerHTML=q.choices[3];
    } else if (event.target.id !== questions.answer){
        correctCon.setAttribute("style", "display: none;");
        wrongCon.setAttribute("style", "display: block;");
        secondsLeft-=10;
    }
});
        
        // choiceBtn1.addEventListener("click", function(){
        //     if(questions[i].choices[0]==questions[i].answer){
        //         i++;
        //     }else if (questions[i].choices[0]!==questions[i].answer){
        //         secondsLeft= secondsLeft-10;
        //     }
        // });
        // choiceBtn2.addEventListener("click", function(){
        //     if(questions[i].choices[1]==questions[i].answer){
        //         i++;
        //     }else if (questions[i].choices[1]!==questions[i].answer){
        //         secondsLeft= secondsLeft-10;
        //     }
        // });
        // choiceBtn3.addEventListener("click", function(){
        //     if(questions[i].choices[2]==questions[i].answer){
        //         i++;
        //     }else if (questions[i].choices[2]!==questions[i].answer){
        //         secondsLeft= secondsLeft-10;
        //     }
        // });
        // choiceBtn4.addEventListener("click", function(){
        //     if(questions[i].choices[3]==questions[i].answer){
        //         i++;
        //     }else if (questions[i].choices[3]!==questions[i].answer){
        //         secondsLeft= secondsLeft-10;
        //     }
            
        // });
 

    //next question if 15sec passed
    // var timeForQuestion= setTimeout(() => console.log("Question should change now!"), 15000);
    // timeForQuestion= setTimeout(i++, 15000);
    // setTimeout(function(){
    //     i++;
    // },15000);


//Feedback to cliked question
    

        //wrongCon or correctCon should only display 2seconds or so


var initials= document.getElementById("initialText");
// the final score is determined by how much time is left when quiz is over
var finalScore=timeRemain;
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
    
    // get most recent submission
    var lastUser = JSON.parse(localStorage.getItem("initials"));
    
    var user= lastUser +" : Score = "+ timeRemain;
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
