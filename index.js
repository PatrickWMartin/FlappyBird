//Get the canvas and the context
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
ctx.font = "30px Arial";
const pipeGap = 100;

//Initilize the bird 
let bird = new Image();
bird.src = "imgs/bird.png";
let birdX = 10;
let birdY = 150;


//Initilize the background
let backGround = new Image();
backGround.src = "imgs/background.png";


//Initilize the ground
let ground = new Image();
ground.src = "imgs/ground.png"


//Add listener for moving the bird up
document.addEventListener("keydown", ()=>{
  birdY -= 50;
});



//Create the hight of the bottom pipe
function createBottomPipeY(){
  //Currently decided the best max height for the pipe is 272 and the best min height is 130
  const maxY = 272;
  const minY = 130;
  //Return the height of the bottom pipe by generating a random number between maxY and minY
  return Math.floor(Math.random() * (maxY - minY) + minY);
}

//create a object to store information about the pipes
function createPipe(){
  //get the bottom pipe height
  const bottomPipeY = createBottomPipeY();
  //use the bottom pipe height to make the top by subtracting the pipe gap + 400
  const topPipeY = bottomPipeY - (pipeGap + 400); 
  let pipeX = 300; 

  let topPipe = new Image();
  topPipe.src = "imgs/toppipe.png"


  let bottomPipe = new Image();
  bottomPipe.src = "imgs/bottompipe.png"

  return {pipeX, topPipeY, bottomPipeY, topPipe, bottomPipe};
}

let score = 0;

const pipes = [];
pipes.push(createPipe())
function draw(){


  //pipe clean up
  for (let pipe of pipes){
    if (pipe.pipeX < -52){
       pipes.shift();
    }
  }

  //clear the screen for redrawing
  ctx.clearRect(0, 0, c.width, c.height);
  
  
  //re draw the background and bird
  ctx.drawImage(backGround,0, 185);
  ctx.drawImage(bird, birdX, birdY);

  
  //draw pipes
  for (let pipe of pipes){
    ctx.drawImage(pipe.topPipe, pipe.pipeX, pipe.topPipeY);
    ctx.drawImage(pipe.bottomPipe, pipe.pipeX, pipe.bottomPipeY);
    pipe.pipeX-=1;
    if(pipe.pipeX == 100){
      pipes.push(createPipe());
    }
    
    if (pipe.pipeX == 5){
      score+=1;
    }
  }
  
  console.log(checkForCollision(bird, pipes[0])) 
  //draw the  ground and score
  ctx.drawImage(ground,0, 302);
  ctx.fillText(`${score}`, 137.5, 50);

  //check for collisions
  //update bird height
  if (birdY < 280)
    birdY += 1.5;
  
  requestAnimationFrame(draw)
}

draw();

function checkForCollision(bird, pipe) {
  return (
    //bird between pipes
    birdX < pipe.pipeX + pipe.topPipe.width && birdX + bird.width > pipe.pipeX &&
   
    //bird above toppipe
    (birdY < pipe.topPipeY + pipe.topPipe.height
      ||
    //bird below bottom pipe
    birdY > pipe.bottomPipeY )
  );
}