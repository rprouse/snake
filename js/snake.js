let canvas;
let ctx;

let xBlockSize;
let yBlockSize;

// A collection of squares the snake occupies where x = snake%SCREEN_SIZE and y = snake - snake%SCREEN_SIZE
let snake;
let direction;
let gameOver;

const SCREEN_SIZE = 64;
const FRAMES_PER_SECOND = 10;

const UP    = -SCREEN_SIZE;
const RIGHT = 1;
const DOWN  = SCREEN_SIZE;
const LEFT  = -1;

window.onload = function() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  init();
  setInterval(gameLoop, 1000/FRAMES_PER_SECOND);

  document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowUp' && direction !== DOWN) {
      direction = UP;
    } else if(event.key === 'ArrowDown' && direction !== UP) {
      direction = DOWN;
    } else if(event.key === 'ArrowLeft' && direction !== RIGHT) {
      direction = LEFT;
    } else if(event.key === 'ArrowRight' && direction !== LEFT) {
      direction = RIGHT;
    }
  });
}

function init() {
  gameOver = false;
  direction = UP;
  snake = [ getPosition(SCREEN_SIZE/2, SCREEN_SIZE/2) ];
  xBlockSize = canvas.width / SCREEN_SIZE;
  yBlockSize = canvas.height / SCREEN_SIZE;
}

function gameLoop() {
  draw();
  if(!gameOver) {
    move();
    checkCollisions();
  }
}

function move() {
  snake.push(snake[snake.length-1] + direction);
}

function checkCollisions() {
  let headPos = snake[snake.length-1];
  let headCoord = getCoordinates(headPos);
  // Hit the borders
  if(headCoord.x === 0 || headCoord.y === 0 || headCoord.x === SCREEN_SIZE - 1 || headCoord.y === SCREEN_SIZE - 1) {
    gameOver = true;
  }
  // Hit the snake
  for(let i = 0; i < snake.length - 1; i++) {
    if(snake[i] === headPos) {
      gameOver = true;
      break;
    }
  }
}

function draw() {
  drawBackground();
  drawSnake();
  if(gameOver) {
    drawGameOver();
  }
}

function drawBackground() {
  colorRect(0, 0, canvas.width, canvas.height, 'green');
  colorRect(xBlockSize, yBlockSize, canvas.width-xBlockSize*2, canvas.height-yBlockSize*2, 'black');
}

function drawSnake() {
  snake.forEach(function(pos) {
    let coord = getCoordinates(pos);
    drawSegment(coord.x, coord.y);
  }, this);
}

function drawGameOver() {
  ctx.fillStyle = 'red';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 4);
}

function drawSegment(x, y) {
  let x1 = x * xBlockSize;
  let y1 = y * yBlockSize;
  colorRect(x1, y1, xBlockSize, yBlockSize, 'white');
}

function drawCenterline() {
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.setLineDash([18, 16]);
  ctx.moveTo(canvas.width/2, 2);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();
}

function drawPlayer1Score() {
  ctx.fillStyle = 'green';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(score1, canvas.width / 4, 50);
}

function drawPlayer2Score() {
  ctx.fillStyle = 'green';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(score2, canvas.width - canvas.width / 4, 50);
}

function drawWin() {
  ctx.fillStyle = 'yellow';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  var winner = score1 >= WIN_SCORE ? "You Win!!!" : "Computer Wins!!!";
  ctx.fillText(winner, canvas.width / 2, canvas.height / 2);

  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.fillText("Click to play again", canvas.width / 2, canvas.height - canvas.height / 4);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getCoordinates(pos) {
  let x = pos % SCREEN_SIZE;
  let y = Math.floor(pos / SCREEN_SIZE);
  return { x: x, y: y};
}

function getPosition(x, y) {
  return SCREEN_SIZE * y + x;
}

function colorRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  ctx.fill();
}