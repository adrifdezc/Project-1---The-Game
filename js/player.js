class Player {
  constructor(ctx, width, height, dimensionCanvas) {
    this.ctx = ctx;
    this.playerWidth = width;
    this.playerHeight = height;
    this.dimensionCanvas = dimensionCanvas;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.playerImage = new Image();
    this.playerImage.src =
      "https://adrifdezc.github.io/Project1-Game/images/player.png";
    this.playerPosition = {
      x: 30,
      y: this.dimensionCanvas.h / 2 - this.playerHeight / 2,
    };
  }

  draw() {
    this.ctx.drawImage(
      this.playerImage,
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerWidth,
      this.playerHeight
    );
  }

  move() {
    this.playerPosition.x <= this.dimensionCanvas.w - 175 && this.moveRight
      ? (this.playerPosition.x += 3)
      : null;
    this.playerPosition.x >= 0 && this.moveLeft
      ? (this.playerPosition.x -= 3)
      : null;
    this.playerPosition.y >= 0 && this.moveUp
      ? (this.playerPosition.y -= 3)
      : null;
    this.playerPosition.y <= this.dimensionCanvas.h - 80 && this.moveDown
      ? (this.playerPosition.y += 3)
      : null;
  }
}
