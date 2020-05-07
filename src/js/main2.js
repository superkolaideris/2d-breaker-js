let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");


// ball init poss
let x = canvas.height-20;
let y = canvas.width/2;
// radius
let ballRadius = 10;
// speed
let dx = 3;
let dy = -3;


// paddle init poss
let paddleHeight = 10;
let paddleWidth = 50;
let paddleX = (canvas.width-paddleWidth) / 2;
let paddleY = canvas.height-15;
let paddleMoveRight = 5;
let paddleMoveLeft = -5;


// keyboard input
let RIGHT_KEY = false;
let LEFT_KEY = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF5733";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.styleFill = "#FF5733";
    ctx.fill();
    ctx.closePath();
}

// The default value for both is false because at the beginning the control buttons are not pressed. 
// To listen for key presses, we will set up two event listeners. Add the following lines just above 
// the setInterval() line at the bottom of your JavaScript:

// When the keydown event is fired on any of the keys on your keyboard (when they are pressed), the 
// keyDownHandler() function will be executed. The same pattern is true for the second listener: keyup 
// events will fire the keyUpHandler() function (when the keys stop being pressed). Add these to your 
// code now, below the addEventListener() lines:

function input() {
    document.addEventListener("keydown", KeydownHandler, false);
    document.addEventListener("keyup", KeyupHandler, false);
    
    
 
    // when nothing is pressed
    function KeyupHandler(input) {
        if(input.key == "Left" || input.key == "ArrowLeft") {
            RIGHT_BUTTON = false;
        }
    }
    function KeyupHandler(input) {
        if(input.key == "Left" || input.key == "LeftArrow") {
            LEFT_BUTTON = false;
        }
    }
       // default false status
       function KeydownHandler(input) {
        if(input.key == "Right" || input.key == "ArrowRight") {
            RIGHT_BUTTON = true;
        }
    }
    function KeydownHandler(input) {
        if(input.key == "Left" || input.key == "ArrowLeft") {
            LEFT_BUTTON = true
        }
    }
}


// When we press a key down, this information is stored in a variable. The relevant variable in 
// each case is set to true. When the key is released, the variable is set back to false.

// Both functions take an event as a parameter, represented by the e variable. From that you can 
// get useful information: the key holds the information about the key that was pressed.  Most 
// browsers use ArrowRight and ArrowLeft for the left/right cursor keys, but we need to also include 
// Right and Left checks to support IE/Edge browsers. If the left cursor is pressed, then the 
// leftPressed variable is set to true, and when it is released, the leftPressed variable is set to 
// false. The same pattern follows with the right cursor and the rightPressed variable.

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear frame
    drawPaddle();
    drawBall();
    x += dx;
    y += dy;

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
}

window.setInterval(update, 10);