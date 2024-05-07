//board
let board;
let boardWith = 500;
let boardHeight = 500;
let context;

// players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

let player2 = {
  x: boardWith - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWith;
  context = board.getContext("2d"); //used for drawing on the board

  //draw initial player 1
  context.fillStyle = "skyblue";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //gameloop
  requestAnimationFrame(update);
  //key listener for pressing up and down
  document.addEventListener("keyup", movePlayer);
};

function update() {
  requestAnimationFrame(update);

  //player1
  context.fillStyle = "skyblue";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //player2
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function movePlayer(e) {
  // this function listens for an event
  //player1
  if (e.code === "KeyW") {
    // Negative velocity goes up because top left is (0,0)
    player1.velocityY = -4;
  } else if (e.code === "KeyS") {
    player1.velocityY = 4;
  }

  if (e.code === "ArrowUp") {
    // Negative velocity goes up because top left is (0,0)
    player2.velocityY = -4;
  } else if (e.code === "ArrowDown") {
    player2.velocityY = 4;
  }
}
