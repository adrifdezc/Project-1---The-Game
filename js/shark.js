class Shark {
  constructor(ctx, width, height, dimensionCanvas, position, speed) {
    this.ctx = ctx;
    this.sharkWidth = width;
    this.sharkHeight = height;
    this.dimensionCanvas = dimensionCanvas;
    this.sharkPosition = {
      x: dimensionCanvas.w,
      y: position,
    }; //It starts at the end of the screen on the right on a random y position
    this.speed = speed;
    this.sharkImage = new Image();
    this.sharkImage.src = `https://adrifdezc.github.io/Project1-Game/images/obstacles/biggerObstacles/obs1.png`;
    //Gets a random image
  }

  draw() {
    this.ctx.drawImage(
      this.sharkImage,
      this.sharkPosition.x,
      this.sharkPosition.y,
      this.sharkWidth,
      this.sharkHeight
    );

    this.move();
  }

  move() {
    this.sharkPosition.x -= this.speed;
  }
}
