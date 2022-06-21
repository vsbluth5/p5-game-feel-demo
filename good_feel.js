let ground, gravity, score;
let player;
let appleImg, apple;
let pops, popSounds;

function setup() {
  // Code here runs only once
  createCanvas(800, 600);
    sound1 = loadSound("https://cdn.glitch.com/8c8ffa71-41d0-4587-86b6-0bfb8890610a%2Fpop1.mp3?v=1620060857834")
  sound2 = loadSound("https://cdn.glitch.com/8c8ffa71-41d0-4587-86b6-0bfb8890610a%2Fpop2.mp3?v=1620060857811")
  sound3 = loadSound("https://cdn.glitch.com/8c8ffa71-41d0-4587-86b6-0bfb8890610a%2Fpop3.mp3?v=1620075667477")
  popSounds=[sound1, sound2, sound3]
  ground = 20;
  player = new Player();
  gravity = 0.7;
  
  appleImg = loadImage("https://cdn.glitch.com/8c8ffa71-41d0-4587-86b6-0bfb8890610a%2Fapple.png?v=1620057547755");
  apple = {
    x: random(width - 36),
    y: random(70, height - 60)
  }
  score = 0;
  pops = [];
}

function draw() {
  // Player color
  fill(255, 255 - (score * 2), 255 - (score * 2));
  background(220);

  line(0, height - ground, width, height - ground);

  player.move();
  player.display();

  image(appleImg, apple.x, apple.y, 36, 36);

  if (collideCircleCircle(apple.x + 18, apple.y + 18, 36, player.x, player.y, player.r * 2)) {
    collectApple();
  }
  // Text color
  fill(0, 0, 0);
  textSize(18);
  text("Press and hold the arrow keys to move. Press SPACE to jump.", 20, 25);
  text("You've collected "+score+" apples!", 20, 50);

  // Apple color
  fill(255, 100, 100)
  for (let i = pops.length - 1; i >= 0; i--) {
    if (pops[i].display() === false) {
      pops.splice(i, 1)
    }
  }
}

function collectApple() {
  console.log("Collected!");
  pops.push(new Pop(apple.x + 18, apple.y + 18));
 //  pops.push(new Pop(128, 44));
  apple.x = random(width - 36);
  apple.y = random(70, height - 60);
  score += 1;
  audio = popSounds[floor(random(0, popSounds.length))];
  console.log(audio);
  audio.volume = 0.5;
  audio.currentTime = 0;
  audio.play();
}


class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.yv = 0;
    this.speed = 0;
    this.absStart = 3;
    this.absMax = 5;
    this.r = 10;
  }

  move() {
    if (keyIsPressed) {
      if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        this.speed *= 1.1;
        if (abs(this.speed) >= this.absMax) {
          this.speed = this.speed / abs(this.speed) * this.absMax; // keep the sign, hold at max
        }
      }
    } else {
      this.speed *= 0.95;
      if (abs(this.speed) < 1) {
        this.speed = 0;
      }
    }
    this.x += this.speed;
    this.y += this.yv;
    this.yv += gravity;
    if (this.y + this.r >= height - ground) {
      this.y = height - ground - this.r;
      this.yv = -0.6 * this.yv;
      if (abs(this.yv) < 2) {
        this.yv = 0;
      }
    }
  }

  display() {
    if (this.yv < -5) {
      ellipse(this.x, this.y, this.r * 2 * 0.8, this.r * 2 * 1.2);
    } else if (this.yv > 5) {
      ellipse(this.x, this.y, this.r * 2 * 1.2, this.r * 2 * 0.8);
    } else {
      ellipse(this.x, this.y, this.r * 2);
    }
    fill(0, 0, 0);
    if (this.speed > 2) {
      ellipse(this.x + 1, this.y - 2, 2, 6);
      ellipse(this.x + 5, this.y - 2, 2, 6);
    } else if (this.speed < -2) {
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
    this.yv = -15;
  }

  go(direction) {
    if (direction === "right") {
      this.speed = this.absStart;
    } else if (direction === "left") {
      this.speed = -1 * this.absStart;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    player.jump();
  } else if (keyCode === LEFT_ARROW) {
    console.log("going left!")
    player.go("left");
  } else if (keyCode === RIGHT_ARROW) {
    player.go("right");
  }
}


class Pop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bubbles = [];
    for (let i = 0; i < 16; i++) {
      this.bubbles.push(new Bubble(this.x, this.y))
    }
  }

  display() {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      if (this.bubbles[i].display() === false) {
        this.bubbles.splice(i, 1)
      }
    }
    if (this.bubbles.length === 0) {
      return false;
    }
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x + random(-15, 15);
    this.y = y + random(-15, 15);
    this.xv = random(-2, 2);
    this.yv = random(-2, 2);
    this.r = random(5, 9);
  }

  display() {
    this.x += this.xv;
    this.y += this.yv;
    this.r -= 0.4;
    if (this.r <= 0) {
      return false;
    }
    ellipse(this.x, this.y, this.r * 2);
  }
}