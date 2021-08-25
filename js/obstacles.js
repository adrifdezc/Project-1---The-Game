class Obstacle {
  constructor(ctx, width, height, dimensionCanvas, position, speed) {
    this.ctx = ctx;
    this.obstacleWidth = width;
    this.obstacleHeight = height;
    this.dimensionCanvas = dimensionCanvas;
    this.obstaclePosition = {
      x: dimensionCanvas.w,
      y: position,
    }; //It starts at the end of the screen on the right on a random y position
    this.randomImage = Math.trunc(Math.random() * (8 - 1) + 1); //Random number 1-7
    this.speed = speed;
    this.randomObstacleImage = new Image();
    this.randomObstacleImage.src = `https://adrifdezc.github.io/Project1-Game/images/obstacles/obs${this.randomImage}.png`;
    //Gets a random image
  }

  draw() {
    this.ctx.drawImage(
      this.randomObstacleImage,
      this.obstaclePosition.x,
      this.obstaclePosition.y,
      this.obstacleWidth,
      this.obstacleHeight
    );

    this.move();
  }

  move() {
    this.obstaclePosition.x -= this.speed;
  }
}
