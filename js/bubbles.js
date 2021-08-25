class Bubble {
  constructor(ctx, width, height, dimensionCanvas, position, speed) {
    this.ctx = ctx;
    this.bubbleWidth = width;
    this.bubbleHeight = height;
    this.dimensionCanvas = dimensionCanvas;
    this.bubblePosition = {
      x: position,
      y: scubaDivingApp.newPlayer.playerPosition.y + 30,
    };
    this.bubbleImage = new Image();
    this.bubbleImage.src =
      "https://adrifdezc.github.io/Project1-Game/images/bubbles/bubble.png";
    this.speed = speed;
  }

  draw() {
    this.ctx.drawImage(
      this.bubbleImage,
      this.bubblePosition.x,
      this.bubblePosition.y,
      this.bubbleWidth,
      this.bubbleHeight
    );
    this.move();
  }

  move() {
    this.bubblePosition.x -= this.speed / 2;
    this.bubblePosition.y -= this.speed / 4;
  }
}
