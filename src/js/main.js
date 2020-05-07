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


// brick wall properties
let brickRowCount = 3;
let brickCollumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
let brickState = 1;
// 2d brick array with empty xy coordinates
// p.s. will be used for drawing and collission
for (let i = 0; i < brickCollumnCount; i++) {
    bricks[i] =[];
    for (let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, state: 1 };
    }
}


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

function drawBricks() {
    for(let i = 0; i < brickCollumnCount; i++) {
        for(let j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].state == 1) { // collision state
                let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ff8000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function checkBallCollision() {
    // ball collision
    if (x + dx > canvas.width || x + dx < 0) { 
        dx = -dx;
        bump();
    }
    // if (y + dy > paddleY + paddleWidth || + dy < paddleWidth) {
    //     dy = -dy;
    //     bump();
    // }
    // if (y + dy > canvas.height || y + dy < 0) {
    //     dy = -dy;
    //     bump();
    // }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            window.alert("bye bye ;/");
            document.location.reload();
            clearInterval(refreshRate);
        }
    }
}

function checkBrickCollision() {
    for (let i = 0; i < brickCollumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            let targetBrick = bricks[i][j];
            if (targetBrick.state == 1) {
                if (x > targetBrick.x && x < targetBrick.x + brickWidth && 
                    y > targetBrick.y && y < targetBrick.y + brickHeight) {
                        dy = -dy;
                        targetBrick.state = 0;
                        bump();
                    }
                }
        }
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

// game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear screen
    drawBall();
    drawPaddle();
    checkBrickCollision();
    drawBricks();

    x += dx;
    y += dy;
    checkBallCollision();

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
let refreshRate = window.setInterval(update, 10);