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

  // ...

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
};
