class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameSound = document.getElementById("game-sound");

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
    this.confetti1 = document.createElement("img");
    this.confetti1.src = "./confetti1.gif";
    this.confetti1.style.position = "cover";
    this.confetti1.style.width = `${this.width}px`;
    this.confetti1.style.height = `${this.height}px`;
    this.confetti1.style.left = `${this.left}px`;
    this.confetti1.style.top = `${this.top}px`;

    this.confetti2 = document.createElement("img");
    this.confetti2.src = "./confetti2.gif";
    this.confetti2.style.position = "cover";
    this.confetti2.style.width = `${this.width}px`;
    this.confetti2.style.height = `${this.height}px`;
    this.confetti2.style.left = `${this.left}px`;
    this.confetti2.style.top = `${this.top}px`;
  }

  start() {
    this.gameSound.play();
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    console.log("score:", this.score, "lives:", this.lives);
    this.basket.move();
    for (let i = 0; i < this.fruit.length; i++) {
      const fruit = this.fruit[i];
      fruit.move();

      if (this.basket.didCollide(fruit)) {
        fruit.element.remove();
        this.fruit.splice(i, 1);
        this.score++;
        this.scoreNumber.innerHTML = this.score;
        i++;
      } else if (fruit.top > this.height) {
        this.lives--;
        this.livesNumber.innerHTML = this.lives;
        fruit.element.remove();
        this.fruit.splice(i, 1);
        i--;
      }
      this.celebrate();
    }

    if (this.lives === 0) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.fruit.length < 2) {
      this.fruit.push(new fruit(this.gameScreen));
    }
  }
  celebrate() {
    if (this.score === 10) {
      console.log("confetttiiiiiiii");
      this.gameScreen.appendChild(this.confetti1);
    }
    if (this.score === 13) {
      this.confetti1.remove();
    }
    if (this.score === 20) {
      console.log("confetttiiiiiiii");
      this.gameScreen.appendChild(this.confetti2);
    }
    if (this.score === 25) {
      this.confetti2.remove();
    }
  }
  playPlay() {
    if (this.lives === 10) {
      this.sound.play;
    } else if (this.lives === 0) {
      this.sound.pause();
      this.sound.currentTime = 0;
    }
  }

  endGame() {
    this.basket.element.remove();
    this.fruit.forEach(function (fruit) {
      fruit.element.remove();
    });

    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
