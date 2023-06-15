class fruit {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 1900 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 150;
    this.element = document.createElement("img");

    this.images = [
      "apple.png",
      "raspberry.png",
      "strawberry.png",
      "pineapple.png",
      "grapes.png",
    ];

    let randomIndex = Math.floor(Math.random() * this.images.length);
    this.element.src = this.images[randomIndex];

    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    this.top += 5;
    this.updatePosition();
  }
}
