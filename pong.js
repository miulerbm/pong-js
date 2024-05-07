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

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
  x: boardWith / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 3,
  velocityY: 4,
};

// scores

let player1Score = 0;
let player2Score = 0;

// pause
let pause = true;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWith;
  context = board.getContext("2d"); //used for drawing on the board
  console.log("pause", pause);
  //draw initial player 1
  context.fillStyle = "skyblue";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  //draw initial player 2
  context.fillStyle = "skyblue";
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
  context.fillText("Press Esc to START", boardWith / 5, 45);
  context.fillText("Press Esc to PAUSE", boardWith / 5, 60);
  context.fillText("Press Esc to RESUME", boardWith / 5, 75);
  context.fillText("Press Esc to EVERYTHING :'v", boardWith / 5, 90);

  //gameloop
  requestAnimationFrame(update);

  document.addEventListener("keydown", function (e) {
    movePlayer(e);
    pauseGame(e);
  });
};

function update() {
  requestAnimationFrame(update);
  if (!pause) {
    //blanking the canvas every update:
    context.clearRect(0, 0, boardWith, boardHeight);
    //player1
    context.fillStyle = "skyblue";
    //   player1.y += player1.velocityY;
    // Instead of directly passing the new y position, we calculate
    // the next position and if it's not out of bounds, then we
    // pass that value to the actual y position of the player.
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
      player1.y = nextPlayer1Y;
      player1.velocityY = 0;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //player2

    //   player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
      player2.y = nextPlayer2Y;
      player2.velocityY = 0;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // if ball touches top or bottom of canvas
    if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
      // reverse ball course
      ball.velocityY *= -1; //reverse direction
    }

    // bounce the ball back
    if (detectCollision(ball, player1)) {
      if (ball.x <= player1.x + player1.width) {
        // left side of ball touches right side of player1
        ball.velocityX *= -1; //flip x direction
      }
    } else if (detectCollision(ball, player2)) {
      if (ball.x + ballWidth >= player2.x) {
        //right side of ball touches left side of player2
        ball.velocityX *= -1; //flip x direction
      }
    }

    // game over
    if (ball.x < 0) {
      // the ball passes the left side of the canvas
      player2Score++;
      resetGame(1);
    } else if (ball.x + ballWidth > boardWith) {
      player1Score++;
      resetGame(-1);
    }

    //draw the scores
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWith / 5, 45);
    context.fillText(player2Score, (boardWith * 4) / 5 - 45, 45);
  }

  // drawing dotted line down the middle
  for (let i = 10; i < board.height; i += 25) {
    // i = starting y position, draw a square every 25 pixels down
    // (x position = half of boardWidth -10)
    context.fillRect(board.width / 2 - 10, i, 5, 5);
  }
}

function outOfBounds(yPosition) {
  return yPosition < 0 || yPosition + playerHeight > boardHeight;
}

function movePlayer(e) {
  // this function listens for an event
  //player1
  if (e.code === "KeyW") {
    // Negative velocity goes up because top left is (0,0)
    player1.velocityY = -40;
  } else if (e.code === "KeyS") {
    player1.velocityY = 40;
  }

  if (e.code === "ArrowUp") {
    // Negative velocity goes up because top left is (0,0)
    player2.velocityY = -40;
  } else if (e.code === "ArrowDown") {
    player2.velocityY = 40;
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y
  ); // a's bottom left corner passes b's top left corner
}

function resetGame(direction) {
  // if player1 wins, the ball is gonna go towards p1
  ball = {
    x: boardWith / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: direction * 2,
    velocityY: 4,
  };
}

function pauseGame(e) {
  if (e.keyCode === 27) {
    pause = !pause;
  }
}
