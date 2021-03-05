
const flock = [];
depth = 500; 

let x = 0;
let y = 0; 
let z = -400; //this will be forward and back 'w' and 's'
let centerX = 0; //controlled by mouseX
let centerY = 0; //controlled by mouseY
let centerZ = 0;


let alignSlider, cohesionSlider, separationSlider;
let robotoMono;

// function preload(){
//   robotoMono = loadFont('RobotoMono-VariableFont_wght.ttf');
// }

function setup() {
  createCanvas(1000, 500, WEBGL);


  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);

  alignSlider.position(width/20, height/25, 0);
  cohesionSlider.position(width/20, height/25*3, 0);
  separationSlider.position(width/20, height/25*5, 0);

  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  background(0);
  // fill(252, 3, 227);
  // stroke(252, 3, 227);
  // textFont(robotoMono);
  // textSize(32);
  // text("alignment", width/20, height/25, 0);

  if (keyIsDown(87)){ //w
    if(z <= 400){
      z+=5;
    }
  }

  if (keyIsDown(83)){ //s
    if(z >= -400){
      z-=5;
    }

  //not sure how to strafe
  // if (keyIsDown(65)){ //a
  //   x+=5;
  // }

  // if (keyIsDown(68)){ //d
  //   x-=5;
  //}

  }
  if (mouseIsPressed){
    if (mouseButton === RIGHT){
      centerX = map(mouseX, 0, width, 400, -400);
      centerY = map(mouseY, 0, width, -400, 400);
    }
  }
  translate(-width/2, -height/2, 0);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }  

  camera(x, y, z, centerX, centerY, centerZ, 0, 1, 0);
}

function keyPressed(){
  print(key, ' ', keyCode);
  if (key == " "){
    for (let boid of flock) {
      boid.respawn();
    }  
  }

}