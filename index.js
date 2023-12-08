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

document.addEventListener("keydown", ()=>{
  birdY -= 25;
});


function draw(){
  
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.drawImage(backGround,0, 185);
  ctx.drawImage(ground,0, 305);
  ctx.drawImage(bird, birdX, birdY);

  if (birdY < 280)
    birdY += 1;
   
  requestAnimationFrame(draw)
}

draw();