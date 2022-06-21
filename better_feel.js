let ground, gravity, score;
let player, start;
let apple, appleSize, aboveBottom, appleImg;
let sound1, sound2, sound3;
let pops;

function setup() {
  sound1 = loadSound("sounds/popSound.mp3")
  sound2 = loadSound("sounds/lighterPop.mp3")
  sound3 = loadSound("sounds/harderPop.mp3")

  createCanvas(800, 600);
  ground = 20;
  start = 60
  player = new Player(start);
  gravity = 0.7;
  pops = []

  appleImg = loadImage("images/apple.png");

  appleSize = 36
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
  player.display(score);

  // Apple color
  image(appleImg, apple.x, apple.y, appleSize, appleSize);

  if (collideCircleCircle(apple.x + appleSize / 2, apple.y + appleSize / 2, appleSize, player.x, player.y, player.r * 2)) {
    collectApple();
    if (score % 3 == 0) {
      sound2.currentTime = 0;
      sound2.play()
    } else {
      sound3.currentTime = 0;
      sound3.play()
    }
  }

  // Text color
  fill(0, 0, 0);
  textSize(18);
  text("Press and hold the arrow keys to move. Press SPACE to jump.", 20, 25);
  text("You've collected " + score + " apples!", 20, 50);

}

function keyPressed() {
  if (keyCode === 32) {
    sound1.currentTime = 0;
    sound1.setVolume(0.2)
    sound1.play()
    player.jump();
  } else if (keyCode === LEFT_ARROW) {
    console.log("going left!")
    player.goRight();
  } else if (keyCode === RIGHT_ARROW) {
    console.log("going right!")
    player.goLeft();
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
    this.y = height - highest;
    this.yVel = 0;
    this.xVel = 0;
    this.absStart = 3;
    this.absMax = 5;
    this.r = 10;
  }

  move() {
    if (keyIsPressed && (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        this.xVel *= 1.1;
        if (this.xVel) >= this.absMax) {
          this.xVel = this.absMax; 
        } else if (this.xVel < -1*this.absMax)(
          this.xVel = -1*this.absMax;
        }
    } else {
      this.xVel *= 0.95;
      if (abs(this.xVel) < 1) {
        this.xVel = 0;
      }
    }
    this.x += this.xVel;
    this.y += this.yVel;
    this.yVel += gravity;
    if (this.y + this.r >= height - ground) {
      this.y = height - ground - this.r;
      this.yVel = -0.6 * this.yVel;
      if (abs(this.yVel) < 2) {
        this.yVel = 0;
      }
    }
  }

  display(num) {
    // adjust color depending on score
    fill(255, 255 - (num * 2), 255 - (num * 2));

    // elongate player when moving up or down quickly
    if (this.yVel < -5) {
      ellipse(this.x, this.y, this.r * 2 * 0.5, this.r * 2 * 1.5);
    } else if (this.yVel > 5) {
      ellipse(this.x, this.y, this.r * 2 * 1.5, this.r * 2 * 0.5);
    } else {
      ellipse(this.x, this.y, this.r * 2);
    }
    // draw the eyes
    fill(0, 0, 0);
    if (this.xVel > 2) {
      ellipse(this.x + 1, this.y - 2, 2, 6);
      ellipse(this.x + 5, this.y - 2, 2, 6);
    } else if (this.xVel< -2) {
      ellipse(this.x - 5, this.y - 2, 2, 6);
      ellipse(this.x - 1, this.y - 2, 2, 6);
    } else {
      ellipse(this.x - 2, this.y - 2, 2, 6);
      ellipse(this.x + 2, this.y - 2, 2, 6);
    }
  }

  jump() {
    console.log("jump")
    this.y += 2;
    this.yVel = -15;
  }
  goRight() {
    this.xVel = this.absStart;
  }
  goLeft() {
    this.xVel = -1*this.absStart
  }
} // end of Player



