class Basket {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = "/basket.png";
    this.element.style.position = "absolute";
    // Set up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update basket position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the basket stays within the game screen
    // handles left hand side
    if (this.left < 20) {
      this.left = 20;
    }

    // handles top side
    if (this.top < 20) {
      this.top = 20;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    // Update thebasket position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(fruit) {
    const basketReact = this.element.getBoundingClientRect();
    const fruitReact = fruit.element.getBoundingClientRect();

    if (
      basketReact.left < fruitReact.right &&
      basketReact.right > fruitReact.left &&
      basketReact.top < fruitReact.bottom &&
      basketReact.bottom > fruitReact.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
