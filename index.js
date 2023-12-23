let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let bird = new Image();
bird.src = "imgs/bird.png";
let birdX = 10;
let birdY = 150;


ctx.font = "30px Arial";

let backGround = new Image();
backGround.src = "imgs/background.png";


let ground = new Image();
ground.src = "imgs/ground.png"


document.addEventListener("keydown", ()=>{
  birdY -= 50;
});

const pipeGap = 100;

function createBottomPipeY(){
  const maxY = 272;
  const minY = 130;
  return Math.floor(Math.random() * (maxY - minY) + minY);
}


function createPipe(){
  const bottomPipeY = createBottomPipeY();
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
  ctx.clearRect(0, 0, c.width, c.height);
  
  

  ctx.drawImage(backGround,0, 185);
  ctx.drawImage(ground,0, 302);
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
  ctx.drawImage(ground,0, 302);

  if (birdY < 280)
    birdY += 1.5;
  
  ctx.fillText(`${score}`, 137.5, 50);
  requestAnimationFrame(draw)
}

draw();