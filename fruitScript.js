window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;
  startButton.addEventListener("click", function () {
    startGame();
  });
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }
  const keyDownHandler = (e) => {
    const key = e.key;
    let movements = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (movements.includes(key)) {
      e.preventDefault();
      if (key === "ArrowLeft") {
        game.basket.directionX = -10;
      } else if (key === "ArrowRight") {
        game.basket.directionX = 10;
      }
    }
  };

  window.addEventListener("keydown", keyDownHandler);

  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }
};
