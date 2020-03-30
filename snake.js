const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unit
const box = 32;
// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const pimg = new Image();
pimg.src = "img/danger.png";
// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let minus = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
minus.src = "audio/minus.mp3";
// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create a posion

let poision={
    x : Math.floor(Math.random()*17+1)*box,
    y : Math.floor(Math.random()*15+3) * box
}
// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(pimg,poision.x,poision.y)
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    else if(snakeX == poision.x && snakeY == poision.y){

        score=score-1;
        minus.play();
        poision = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        
        
    }
    else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
   
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box ){
        clearInterval(game);
        dead.play();
        document.getElementById("gameover").innerHTML= "<span style='color:blue'; 'font-size: 25px'; 'font-weight: bold';>------------------------------------------------------------------------------------------------------------ PRESS F5 TO PLAY AGAIN-------------------------------------------------------------------- </span>";
    }
    
    if( collision(newHead,snake)){
        score=0;
        snake.pop() 
        document.getElementById("gameover").innerHTML= "<span style='color:blue'; 'font-size: 25px'; 'font-weight: bold';>---------------------------------------------------------------------------------------------------------- OOPS! YOU BIT YOUR OWN TAIL------------------------------------------------------------ </span>";
        
    }
        
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 200 ms

let game = setInterval(draw,200);


















