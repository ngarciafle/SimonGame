const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keydown(function() {
    if(!started) {
        $("#level-title").text('Level ' + level);
        nextSequence();
        started = true;
    }
}) 

$('.btn').click(function() {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text('Level ' + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3')
    audio.play();
};

function animatePress(currentColor) {  
    $('#' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
};

function checkAnswer(currentlevel) {
    if( userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        console.log('success');
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        playSound('wrong');
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
