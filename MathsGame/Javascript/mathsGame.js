//when click on startReset
let timeRemaining = -1;
let score = 0;
let firstNumber = 0;
let secondNumber = 0;
const operator = ["+","-","*","*"];
let correctAnswer = 0;
let answers = [0,0,0,0];


//chooses random operator for question
function selectOperator(){
  return operator[(Math.floor(Math.random()*operator.length))]
}

//creates random answers to fill answer tiles
function createAnswer(selectedOperator, i){
  switch(Math.floor(Math.random()*3+1)){
    case 1: 
    return eval((firstNumber - Math.floor(Math.random()*4+1)) + selectedOperator + secondNumber)
    break;

    case 2: 
    return eval((firstNumber + Math.floor(Math.random()*4+1)) + selectedOperator + secondNumber);
    break;

    case 3: 
    return eval((firstNumber - Math.floor(Math.random()+1)) + selectedOperator + (secondNumber + Math.floor(Math.random()+1)));
    break;
    
    case 4: 
    return eval((firstNumber +  Math.floor(Math.random()+1)) + selectedOperator + (secondNumber-  Math.floor(Math.random()+1)));
    break;
  }
}

//sets each answer in the answer array using createAnswer function
function setAnswerArray(correctAnswer, selectedOperator){
  for (i=0; i<4; i++){
    let answer = createAnswer(selectedOperator, i); 
    while (answer == correctAnswer || answers.includes(answer)){
      answer = createAnswer(selectedOperator, i);
    } 
    answers[i] = answer;
  }
  answers[Math.floor(Math.random()*4)] = correctAnswer;
}

//generates math function
function generateQuestion(){
  firstNumber = Math.floor(Math.random()*9+1);
  secondNumber = Math.floor(Math.random()*9+1);
  let selectedOperator = selectOperator();
  let question =  firstNumber + " " + selectedOperator + " " + secondNumber;
  correctAnswer = eval(question);
  setAnswerArray(correctAnswer, selectedOperator);
  document.getElementById("questions").innerHTML = question;
  let answerBoxes = document.getElementsByClassName("answers");
  for(i=0; i<answerBoxes.length; i++){
    answerBoxes[i].innerHTML = answers[i];
  }
}

//is onclick for startReset button
function startReset(){
  //if we are playing
  if(timeRemaining >= 0){
    //reload page
    window.location.reload();
  }
  //else (not playing)
  else{
    //set timer to 60
    timeRemaining = 60;
    //show countdown box
    document.getElementById("timeRemaining").style.display = "block";
    //show score box
    document.getElementById("scoreCounter").style.display = "block";
    //change button to reset
    document.getElementById("startReset").innerHTML = "Reset Game";
    //generate questions and answers set
    generateQuestion();
    //reduce time by 1sec && update time display

    var counter = document.getElementById("time");

    function startCounter() {
      let timeCounter = setInterval(function(){
        timeRemaining--; counter.innerHTML = timeRemaining;
        //if time>0 continue
       if(timeRemaining<=0){
        clearInterval(timeCounter);
         //gameOver is shown
         document.getElementById("gameOver").style.display = "block";
         //Game score counter and timeRemaining are hidden
         document.getElementById("scoreCounter").style.display = "none";
         document.getElementById("timeRemaining").style.display = "none";
         //gameOver Score is updated with final score
         document.getElementById("finalScore").innerHTML = score;
         //clear onclick of answers
         let answerBoxes = document.getElementsByClassName("answers");
         for(i=0; i<answerBoxes.length; i++){
           answerBoxes[i].onclick = "";
           answerBoxes[i].innerHTML = "?"
         }
       }
      }, 1000);    
    }
    startCounter();
  }
}


    //when click on answer box
    function submitAnswer(obj){
      //if playing
      if(timeRemaining>0){
        //if correct
        if(answers[(eval(obj.dataset.value)-1)] == correctAnswer){
          //increase score by 1
          score++;
          //update score display
          document.getElementById("scoreValue").innerHTML = score;
          //show correct box for 1 second then hide
          
          document.getElementById("correctMessage").style.display = "block";
          var correctMessage = setTimeout(function(){document.getElementById("correctMessage").style.display = "none"}, 1000);
          //generate new question and answers

          generateQuestion();

        //else (incorrect)
        }else{
          //show try again box for 2 second
          document.getElementById("tryAgain").style.display = "block";
          var tryAgainMessage = setTimeout(function(){document.getElementById("tryAgain").style.display = "none"}, 1000);
        }         
      }
      //else (not playing) do nothing
    }
      
        
      
