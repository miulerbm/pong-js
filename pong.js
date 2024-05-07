//board
let board;
let boardWith = 500;
let boardHeight = 500;
let context;

// players
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
};

let player2 = {
  x: boardWith - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
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
};

function update() {
  requestAnimationFrame(update);

  //player1
  context.fillStyle = "skyblue";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //player2
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}
