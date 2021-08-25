class Live {
  constructor(ctx, width, height, dimensionCanvas, position, speed) {
    this.ctx = ctx;
    this.liveWidth = width;
    this.liveHeight = height;
    this.dimensionCanvas = dimensionCanvas;
    this.livePosition = {
      x: position,
      y: -100,
    }; //It starts at the end of the screen on the right on a random y position
    this.liveImage = Math.trunc(Math.random() * (8 - 1) + 1); //Random number 1-7
    this.speed = speed;
    this.randomLiveImage = new Image();
    this.randomLiveImage.src = `https://adrifdezc.github.io/Project1-Game/images/lives/oxy1.png`;
    //Gets a random image
  }

  draw() {
    this.ctx.drawImage(
      this.randomLiveImage,
      this.livePosition.x,
      this.livePosition.y,
      this.liveWidth,
      this.liveHeight
    );

    this.move();
  }

  move() {
    this.livePosition.y += this.speed;
  }
}
