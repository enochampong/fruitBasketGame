class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.basket = null;
    this.height = 900;
    this.width = 2000;
    this.fruit = [];
    this.score = 0;
    this.lives = 10;
    this.gameIsOver = false;
    this.basket = new Basket(this.gameScreen, 500, 650, 100, 100, "basket.png");
    this.scoreNumber = document.getElementById("score");
    this.livesNumber = document.getElementById("lives");
    this.music;
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //play music
    function sound(src) {
      this.sound = document.createElement("gameTechno.mp3");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";

      document.body.appendChild(this.sound);
      this.play = function () {
        this.sound.play();
      };
      this.stop = function () {
        this.sound.pause();
      };
    }

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "block";

    // Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    console.log("score:", this.score, "lives:", this.lives);
    this.basket.move();
    // Check for collision and if an fruit is still on the screen
    for (let i = 0; i < this.fruit.length; i++) {
      const fruit = this.fruit[i];
      fruit.move();

      // If the basket collides with an fruit
      if (this.basket.didCollide(fruit)) {
        // Remove the fruit element from the DOM
        fruit.element.remove();
        // Remove fruit object from the array
        this.fruit.splice(i, 1);
        // Reduce player's lives by 1
        this.score++;
        this.scoreNumber.innerHTML = this.score;
        // Update the counter variable to account for the removed fruit
        i++;
      } // If the fruit is off the screen (at the bottom)
      else if (fruit.top > this.height) {
        // Increase the score by 1
        this.lives--;
        this.livesNumber.innerHTML = this.lives;
        // Remove the fruit from the DOM
        fruit.element.remove();
        // Remove fruit object from the array
        this.fruit.splice(i, 1);
        // Update the counter variable to account for the removed fruit
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new fruit based on a random probability
    // when there is no other fruit on the screen
    if (Math.random() > 0.98 && this.fruit.length < 2) {
      this.fruit.push(new fruit(this.gameScreen));
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.basket.element.remove();
    this.fruit.forEach(function (fruit) {
      fruit.element.remove();
    });

    this.gameIsOver = true;
    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
