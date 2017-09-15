let canvas;
let ctx;

const FRAMES_PER_SECOND = 30;

window.onload = function() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  init();
  setInterval(gameLoop, 1000/FRAMES_PER_SECOND);

  canvas.addEventListener('keydown', function(evt) {
  });
}

function init() {
}

function gameLoop() {
  draw();
  move();
  checkCollisions();
}

function move() {
}

function checkCollisions() {
}

function draw() {
  drawBackground();
}

function drawBackground() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
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