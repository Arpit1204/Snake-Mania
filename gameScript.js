var lastPaintTime = 0;
let SNAKE_SPEED = 2;
let inputDirection = { x : 0, y : 0}
let lastInputDirection = inputDirection;

let foodSound = new Audio('music/food.mp3');

const gameOverSound = new Audio('music/gameover.mp3');
 const musicSound = new Audio('music/music.mp3')

 const snakeBody = [
    {x : 10, y : 11},
];

const EXPENTION_AMOUNT = 1;
var score = 0;


let food = getFoodrandomPosition();
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");

function paint(currentTime){
   var TimeSeconds = (currentTime - lastPaintTime) / 1000;
   requestAnimationFrame(paint);
   if( TimeSeconds < 1 / SNAKE_SPEED)return;
   lastPaintTime = currentTime;
    
    update();
    draw();

}
window.requestAnimationFrame(paint);

function draw(){
    drawSnake();
    drawFood();
}

function update(){
    gameBoard.innerHTML = "";
    snakeMove();
    snakeEatFood();
}

//function to draw snake 
function drawSnake(){
    snakeBody.forEach((segment, index)=>{
        var snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        
        // index 0 ie head of snake 
        if(index == 0){
            snakeElement.classList.add("head");

            if(inputDirection.x == 1){
                snakeElement.style.transform = "rotate(-90deg)";
            }else if(inputDirection.x == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if(inputDirection.y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }
            else if(inputDirection.y == 1){
                snakeElement.style.transform = "rotate(0deg)";
            }
        }else{
            snakeElement.classList.add("snake");
        }
        gameBoard.appendChild(snakeElement);

    });
}
// function to draw food
function drawFood(){
    var foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}
//moving the snake
function snakeMove(){
    musicSound.play()
    inputDirection = getInputDirection();
    
    for(i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    checkGameOver();
}

//adding keys functional
function getInputDirection(){
    window.addEventListener("keydown", e=>{
        
        switch(e.key){
            case 'ArrowUp' : 
            if(lastInputDirection.y == 1) break;
            inputDirection = {x : 0, y : -1}
            break;
            case 'ArrowDown' : 
            if(lastInputDirection.y == -1) break;
            inputDirection = {x : 0, y : 1}
            break;
            case 'ArrowLeft' : 
            if(lastInputDirection.x == 1) break;
            inputDirection = {x : -1, y : 0}
            break;
            case 'ArrowRight' : 
            if(lastInputDirection.x == -1) break;
            inputDirection = {x : 1, y : 0}
            break;
            default :
        }
       
    })
    lastInputDirection = inputDirection;
    return inputDirection;
}

//function, if snake ate the food
function snakeEatFood(){

    if(isEat()){
        foodSound.play()
        score += 1;
        scoreBox.innerHTML = score;
        
        food = getFoodrandomPosition();

        SNAKE_SPEED++;
        expendSnake();
        updateLevel();
        checkWinner()
        
    }
    
}
//function for, when snake eats the food
function isEat(){
   
     return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
}
//getting random position for food after it is eaten or game reloded 
function getFoodrandomPosition(){

    let a,b, myCondition = true;
    while(myCondition){
        a = Math.ceil(Math.random()*16);
        b = Math.ceil(Math.random()*16);

        myCondition = snakeBody.some(segment=>{
             return segment.x === a && segment.y === b;
        })
    }
    return {x : a, y : b};
}

//function to expand the snake when it eats food
function expendSnake(){
    for(i=0; i<EXPENTION_AMOUNT; i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }
}

let overlay3 = document.getElementById('overlay3')
let food1 = document.getElementById('food')

//checking it snake collide with walls or itself
function checkGameOver(){
    if(snakeOutOfGrid() || snakeIntersection()){
        inputDir =  {x: 0, y: 0}; 
        snakeArr = [{x: 10, y: 11}];
        window.location.href = './gameOver.html';
        musicSound.pause();
        
        localStorage.setItem('score',score)
       score = 0; }
 }

// function, if snake is out of grid
function snakeOutOfGrid(){
    
    return snakeBody[0].x <= 0 || snakeBody[0].x > 16 || snakeBody[0].y <= 0 || snakeBody[0].y > 16;
}
//function, if snake collides with wall
function snakeIntersection(){
    for(i=1; i<snakeBody.length; i++){
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y){
            return true;
        }
    }

    
}
let level = document.getElementById('level')

//updating the level
function updateLevel(){
    if(score == 10){
        level.innerHTML = 2

    }
    if(score == 15){
        level.innerHTML = 3

    }
    if(score == 20){
        level.innerHTML = 4

    }
    if(score == 25){
        level.innerHTML = 5

    }
   
}
//function to check it player scored desired score
function checkWinner(){
    if(score == 30){
        
        window.location.href = 'win.html'
    }
}

let overlay = document.getElementById('overlay')
let setting = document.getElementById('setting-logo')
let inst_play = document.getElementById('instructions-play')
let won_overlay = document.getElementById('overlay2')
let reset = document.getElementById('reset-game')
let reset_gameOver = document.getElementById('reset')
let userName = document.getElementById('name-div')

setting.onclick=()=>{
    overlay.style.display = 'flex'
}

inst_play.onclick=()=>{
    overlay.style.display = 'none'
}

user_name = localStorage.getItem('Name')
userName.innerHTML = user_name
if(user_name == '' || user_name == ' '||user_name == '  ' ){
    userName.innerHTML = "Hello!"
}

const up =document.getElementById('Up') 
up.onclick = upArrow

function upArrow(){
    inputDirection = {x:0,y:-1}
}
const left =document.getElementById('Left') 
left.onclick = leftArrow

function leftArrow(){
    inputDirection = {x:-1,y:0}
}
const right =document.getElementById('Right') 
 right.onclick = rightArrow

function rightArrow(){
    inputDirection = {x:1,y:0}
}
const down =document.getElementById('Down') 
down.onclick = downArrow

function downArrow(){
    inputDirection = {x:0,y:1}
}

