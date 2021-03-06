let canvas = document.getElementById("myCanvas");
canvas.width = window.screen.width;
canvas.height = window.screen.height;
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;
let paddleHeight = 10;
let paddleWidth = 90;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickColumnCount = 5; //5
let brickWidth = (canvas.width - 30) / 30;
let brickHeight = 20;
let brickPadding = 1;
let brickRowCount = 30;
let brickOffsetTop = 30;
let brickOffsetLeft = 0;
let start = false;
let pause = false;
let score = 0;
let lives = 3;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
function stopMovement() {
  rightPressed = false;
  leftPressed = false;
}

botaoDireito = document.querySelector(".direito");
botaoEsquerdo = document.querySelector(".esquerdo");
botaoIniciarPartida = document.querySelector(".iniciar_partida_mobile");
botaoIniciarPartida_desktop = document.querySelector(".iniciar_partida");
game_over_text = document.querySelector(".game_over");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", iniciarodada, false);

// enquanto o usuario continuar clicando no botao esquerdo ou direito com o touch
// a bola ira se mover para a esquerda ou direita
botaoDireito.addEventListener("touchstart", (() => keyDownHandler({code:"ArrowRight" })))
botaoDireito.addEventListener("touchend", stopMovement)
botaoEsquerdo.addEventListener("touchstart", (() => keyDownHandler({code:"ArrowLeft" })))
botaoEsquerdo.addEventListener("touchend", stopMovement)


botaoIniciarPartida.addEventListener(
  "click",
  () => iniciarodada({ code: "Enter" }),
  false
);

game_over_text.style = "display: none";

console.log(canvas.width);

function iniciarodada(e) {
  if (e.code == "Enter" && start == false && pause == false) {
    if (canvas.width <= 800) {
      botaoDireito.style.display = "flex";
      botaoEsquerdo.style.display = "flex";
    }
    aviso = document.querySelector(".iniciar_partida");
    botaoIniciarPartida.style.display = "none";
    tocarMusica("star_game.wav");
    aviso.style = "display: none";
    start = true;
  }
}

function keyDownHandler(e) {
  
  if (e.code == "ArrowRight") {
  
    rightPressed = true;
  

    leftPressed = false;
  }

  if (e.code == "ArrowLeft") {
    leftPressed = true;
    rightPressed = false;
  }
}
function keyUpHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = false;
  } else if (e.code == "ArrowLeft") {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          tocarMusica("toca_bola.mp3");
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            vitoria();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.globalCompositeOperation = "destination-over";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawLives();
  drawScore();
  drawBall();
  if (start) {
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        
        start = false;
        if (lives > 0) {
          lives--;
          // botaoIniciarPartida.style.display = "flex";
          exibir_botao_iniciar()
        }
        if (!lives) {
         
          perdeu();
          start = false;

  
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 5;
          dy = -5;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
  }
  requestAnimationFrame(draw);
}

draw();
