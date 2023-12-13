let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let bird = new Image();
bird.src = "imgs/bird.png";
let birdX = 10;
let birdY = 150;


let backGround = new Image();
backGround.src = "imgs/background.png";


let ground = new Image();
ground.src = "imgs/ground.png"

// pipes setup width 52 height 400
let topPipe = new Image();
topPipe.src = "imgs/toppipe.png"


let bottomPipe = new Image();
bottomPipe.src = "imgs/bottompipe.png"


document.addEventListener("keydown", ()=>{
  birdY -= 25;
});

const pipeGap = 100;

function createBottomPipeX(){
  const maxX = 272;
  const minX = 130;
  return Math.floor(Math.random() * (maxX - minX) + minX);
}

const bottomPipeX = createBottomPipeX();
const topPipeX = bottomPipeX - (pipeGap + 400); 
function draw(){
  
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(backGround,0, 185);
  ctx.drawImage(ground,0, 302);
  ctx.drawImage(bird, birdX, birdY);
  ctx.drawImage(topPipe, 137, topPipeX);
  ctx.drawImage(bottomPipe, 137, bottomPipeX);
  ctx.drawImage(ground,0, 302);


  if (birdY < 280)
    birdY += 1;
   
  requestAnimationFrame(draw)
}

draw();