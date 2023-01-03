var gamePattern=[];
var buttonColours=["red", "blue","green","yellow"];
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern=[];
var check=false;
var level=0;

//starting the game by keyboard press
$(document).keypress(function(){ 
    if (!check){
        nextSequence();
        check=true;
        $("#level-title").text("Level "+level);
    }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click",function(){
    //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr('id') ;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer((userClickedPattern.length)-1);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    //Use jQuery to select the button with the same id as the randomChosenColour
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
 }

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3" );
    audio.play();   
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    check=false;
}


