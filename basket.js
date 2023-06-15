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
    this.element.src = "basket.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 20) {
      this.left = 20;
    }

    if (this.top < 20) {
      this.top = 20;
    }

    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

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
