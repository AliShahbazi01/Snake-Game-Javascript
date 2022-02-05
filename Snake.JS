const canvas =  document.getElementById('game');
const ctx = canvas.getContext('2d');
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let xVelocity=0;
let yVelocity=0;
let appleX=5;
let appleY=5;
let score = 0;
const Eatsound = new Audio ("Eat.wav");
const GameOversound = new Audio ("GameOver.wav");
//game loop
function drawGame()
    {
        changeSnakeposition();
        let result = isGameOver();
        if(result){
            return;
        }   
        clearScreen();
        checkAppleCollision();
        drawSnake();
        drawApple();
        drawScore();
        if(score > 2){
            speed = 11;
        }
        if(score >5){
            speed = 15
        }
        setTimeout(drawGame, 900/ speed);
    }

function isGameOver(){
    let gameOver = false;
    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }
    //walls 
    if(headX < 0){
        gameOver = true
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if(headY <0){
        gameOver = true
    }
    else if(headY === tileCount){
        gameOver = true
    }
    for(let i=0; i < snakeParts.length; i++){
        let parts = snakeParts[i]; 
        if(parts.x === headX && parts.y === headY){
            gameOver = true
            break;
        }
    }
    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        //var gradiant = ctx.createLinearGradient (0, 0, canvas.width,0);
       // gradiant.addColorStop("0","magenta");
        //gradiant.addColorStop("0.5","blue");
       // gradiant.addColorStop("1.0","red");
        // Fill with gradient 
       // ctx.fillStyle = gradiant;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height /2);
        GameOversound.play();
    }

    return gameOver;
}

function drawScore()
{
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana"
    ctx.fillText("Score" + score, canvas.width-50, 10);
}    

function clearScreen() 
    {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
function drawSnake()
    {
        ctx.fillStyle = 'green';
        for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        }

        snakeParts.push(new SnakePart(headX, headY)); // put an item at the end of the list next to the head 
        while (snakeParts.length > tailLength){
            snakeParts.shift(); // remove the furthers item from the snake parts if have more than our tail size.
        }
        ctx.fillStyle = 'orange';
        ctx.fillRect(headX * tileCount, headY* tileCount, tileSize, tileSize);
    }

function changeSnakeposition()
    {
        headX = headX + xVelocity;
        headY = headY + yVelocity;
    }

function drawApple()
    {
        ctx.fillStyle = "red";
        ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize);
    }

function checkAppleCollision()
    {
        if (appleX === headX && appleY === headY)
        {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            tailLength++;
            score++;
            Eatsound.play();
        }
    }

    document.body.addEventListener('keydown', keyDown);
function keyDown(event)
    {
        //up
        if (event.keyCode == 38) {
            if(yVelocity == 1)
                return;
            yVelocity = -1;
            xVelocity = 0;
        }
        //down
        if (event.keyCode == 40) {
            if(yVelocity == -1)
                return;
            yVelocity = 1;
            xVelocity = 0;
        }
          //left
          if (event.keyCode == 37) {
            if(yVelocity == 1)
                return;
            yVelocity = 0;
            xVelocity = -1;
        }
          //right
          if (event.keyCode == 39) {
            if(yVelocity == -1)
            return;
            yVelocity = 0;
            xVelocity = 1;
        }
    }

drawGame ();