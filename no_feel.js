let ground, gravity, score;
let player;
let apple, appleSize, start;

function setup() {
  createCanvas(800, 600);
  ground = 20;
  gravity = 0.7;
  appleSize = 36
  start = 60
   player = new Player(start);
  apple = {
    x: random(width - appleSize),
    y: random(70, height - start)
  }
  score = 0;
}

function draw() {
  background(220);

  line(0, height - ground, width, height - ground);

  player.move();
  player.display();

  // Apple color
  fill(255, 100, 100)
  circle(apple.x, apple.y, appleSize);

  if (collideCircleCircle(apple.x, apple.y, appleSize, player.x, player.y, player.r * 2)) {
    collectApple();
  } 

  // Text color
  fill(0, 0, 0);
  textSize(18);
  text("Press and hold the arrow keys to move. Press SPACE to jump.", 20, 25);
  text("You've collected "+score+" apples!", 20, 50);

}

function keyPressed() {
  if (keyCode === 32) {
    player.jump();
  } else if (keyCode === LEFT_ARROW) {
    console.log("going left!")
    player.go("left");
  } else if (keyCode === RIGHT_ARROW) {
    console.log("going right!")
    player.go("right");
  }
}

function collectApple() {
  console.log("Collected!");
  apple.x = random(width - appleSize);
  apple.y = random(70, height - start);
  score += 1;
}

class Player {
  constructor(highest) {
    this.x = width / 2;
    this.y = height-highest;
    this.yVel = 0;
    this.xSpeed = 0;
    this.absStart = 3;
    this.r = 10;
  }

  move() {
    if (keyIsPressed) {
      if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        this.xSpeed *= 1.1;
      }
    } else {
      this.xSpeed = 0
    }
    this.x += this.xSpeed;
    this.y += this.yVel;
    this.yVel += gravity;
    if (this.y + this.r >= height - ground) {
      this.y = height - ground - this.r
      this.yVel = 0;
    }
  }

  display() {
  fill(255);
  stroke(0)
    ellipse(this.x, this.y, this.r * 2);
  }

  jump() {
    console.log("jump")
    this.y += 2;
    this.yVel = -15;
  }

  go(direction) {
    if (direction === "right") {
      this.xSpeed = this.absStart;
    } else if (direction === "left") {
      this.xSpeed = -1 * this.absStart;
    }
  }
}


