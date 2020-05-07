let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");


// ball properties
let x = 350;
let y = 270;
let ballRadius = 10;
let dx = 3;
let dy = -3;

// paddle properties 
let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth)/2;
let paddleY = canvas.height - 15;
let paddleMoveSpeed = 5;


// keyboard input hadler vars
let RIGHT_BUTTON = false;
let LEFT_BUTTON = false;




// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

function bump() {
    console.log("bump at", "x",x,":","y",y);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ff8000";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff8000";
    ctx.fill();
    ctx.closePath();
}

function checkCollision() {
    // ball collision
    if (x + dx > canvas.width || x + dx < 0) { 
        dx = -dx;
        bump();
    }
    if (y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
        bump();
    }
}

function input() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(input) {
        if(input.key == "Right" || input.key == "ArrowRight") {
            RIGHT_BUTTON = true;
            console.log("Right Key");
        }
        else if(input.key == "Left" || input.key == "ArrowLeft") {
            LEFT_BUTTON = true;
            console.log("Left Key")
        }
    }
    function keyUpHandler(input) {
        if(input.key == "Right" || input.key == "ArrowRight") {
            RIGHT_BUTTON = false;
        }
        else if(input.key == "Left" || input.key == "ArrowLeft") {
            LEFT_BUTTON = false;
        }
    }
}

// main game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // re-draw
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    checkCollision();

    // paddle movement and limits
    if (RIGHT_BUTTON) {
        paddleX += paddleMoveSpeed;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (LEFT_BUTTON) {
        paddleX -= paddleMoveSpeed;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

input();
window.setInterval(update, 10);