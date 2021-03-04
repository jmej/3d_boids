//boids algorithms in 3d

// initial 2D flocking logic taken from https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM


class Boid {
  constructor() {
    this.position = createVector(random(width), random(height), random(depth));
    this.velocity = p5.Vector.random3D(); // velocity starts as a random unit vector
    this.velocity.setMag(random(-1, 1));
    this.acceleration = createVector(0, 0, 0);
    this.maxForce = 0.2;
    this.maxSpeed = 5;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
    if (this.position.z > depth) {
      this.position.z = 0;
    } else if (this.position.z < 0) {
      this.position.z = depth;
    }
  }

  align(boids) {
    let perceptionRadius = 25;
    let steering = createVector(0, 0, 0);
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, this.position.z, other.position.x, other.position.y, other.position.z);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = 24;
    let steering = createVector(0, 0, 0);
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, this.position.z, other.position.x, other.position.y, other.position.z);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = createVector(0, 0, 0);
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, this.position.z, other.position.x, other.position.y, other.position.z);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateY(Math.atan(this.velocity.y/this.velocity.x));
    //rotateX(Math.atan(this.velocity.y/this.velocity.x));
    //rotateY(radians(90));
    rotateZ(this.velocity.heading());
    rotateZ(radians(-90));
    strokeWeight(1);
    stroke(252, 3, 227);
    fill(52, 213, 235);

    //triangle(0, 0, 10, 5, 10, 20)
    cone(10, 20, 4);
    pop();
  }
}
