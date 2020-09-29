var notes = ["do", "re", "me", "fa", "so", "la", "ti", "doh"];
var randomNotes = [];
var playerNotes = [];
var started = false;
var level = 0;

//init game
$("body").keypress(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

//computer random note
var nextSequence = function() {
  $("document").ready(function() {
    playerNotes = [];
    var note = Math.floor(Math.random() * 8);
    randomChoseNote = notes[note];
    var audio = new Audio("audio/" + randomChoseNote + ".mp3");
    audio.play();
    randomNotes.push(randomChoseNote);
    $("#" + randomChoseNote).fadeIn(100).fadeOut(100).fadeIn(100);


    $("h1").text("Level " + level);
    level++;

  })
}



// user pattern
$("document").ready(function() {
  $(".btn").click(function() {

    console.log("i'm clicked");
    var userChosenNote = this.id;
    console.log(userChosenNote);
    playerNotes.push(userChosenNote);
    clickAudio(userChosenNote);
    animatePress(userChosenNote);

    checkAnswer(playerNotes.length - 1);
  });
});

//animate pressed function for user click
var animatePress = function(userChosenNote) {
  $("#" + userChosenNote).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenNote).removeClass("pressed");
  }, 100);
};
//animate audio function for user click
var clickAudio = function(userChosenNote) {
  var audio = new Audio("audio/" + userChosenNote + ".mp3");
  audio.play();
};


//check answer function for user click
var checkAnswer = function(currentLevel) {
  if (randomNotes[currentLevel] === playerNotes[currentLevel]) {
    //this runs on each user click, matching to position of the variable
    //in the user array to the game pattern array
    console.log("success");
    //as soon as the user has as many items in the array as the game array
    if (playerNotes.length === randomNotes.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("audio/wrong.mp3");
    audio.play();
    $("h1").text("Game over. Press any key to start over");
    startover();

  }
}

var startover = function() {

  started = 0;
  randomNotes = [];
  level = 0;
};
