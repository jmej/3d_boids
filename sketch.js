
const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(640, 360);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  for (let i = 0; i < 50; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  background(0);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }  
}