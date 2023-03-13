// set up canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// set up game variables
const roverImg = new Image();
roverImg.src = "img/rover.png";
const waterImg = new Image();
waterImg.src = "img/water.png";
const backgroundImg = new Image();
backgroundImg.src = "img/backround.png";
let roverRect = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 100,
  height: 100,
};
let roverSpeed = 6;
let roverDirection = "right";
let waterRect = {
  x: Math.floor(Math.random() * (canvas.width - 100)),
  y: -50,
  width: 50,
  height: 50,
};
let waterSpeed = 3;
let score = 0;

// set up game fonts
const font = "48px Arial";

// handle input
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && roverRect.x > 0) {
    roverRect.x -= roverSpeed;
    if (roverDirection === "right") {
      roverDirection = "left";
    }
  } else if (event.key === "ArrowRight" && roverRect.x < canvas.width - roverRect.width) {
    roverRect.x += roverSpeed;
    if (roverDirection === "left") {
      roverDirection = "right";
    }
  }
});

// game loop
function gameLoop() {
  // move the water
  waterRect.y += waterSpeed;

  // check for collision
  if (
    roverRect.x < waterRect.x + waterRect.width &&
    roverRect.x + roverRect.width > waterRect.x &&
    roverRect.y < waterRect.y + waterRect.height &&
    roverRect.y + roverRect.height > waterRect.y
  ) {
    score++;
    waterRect.x = Math.floor(Math.random() * (canvas.width - 100));
    waterRect.y = -50;
  }

  // check if water has gone past bottom of screen
  if (waterRect.y > canvas.height) {
    waterRect.x = Math.floor(Math.random() * (canvas.width - 100));
    waterRect.y = -50;
  }

  // draw the game objects
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(roverImg, roverRect.x, roverRect.y, roverRect.width, roverRect.height);
  ctx.drawImage(waterImg, waterRect.x, waterRect.y, waterRect.width, waterRect.height);
  ctx.font = font;
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 50);

  // request next animation frame
  requestAnimationFrame(gameLoop);
}
canvas.addEventListener('touchstart', function(event) {
  // Обработка события touchstart
});

canvas.addEventListener('touchmove', function(event) {
  // Обработка события touchmove
});

canvas.addEventListener('touchend', function(event) {
  // Обработка события touchend
});

// start game loop
requestAnimationFrame(gameLoop);
