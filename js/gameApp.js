const scubaDivingApp = {
  //2.Declarando atributos como indefinido para visualizar la informacion de raceCarApp
  ctx: undefined,
  dimensionCanvas: { w: undefined, h: undefined },
  backgroundImage: undefined,
  newPlayer: undefined,
  framesCounter: 0,
  obstaclesArray: [],
  livesArray: [],
  speed: 3,
  score: 0,
  o2Reserve: 10,

  init(elementCanvas) {
    //add 2d
    this.setContext(elementCanvas);
    this.setDimensions(elementCanvas);
    this.backgroundImage = new Image();
    this.backgroundImage.src = "../background2.jpeg";
    this.createNewPlayer();
    this.setListeners();
    this.refreshScreen();
  },

  setContext(elementCanvas) {
    this.ctx = elementCanvas.getContext("2d");
  },

  setDimensions(elementCanvas) {
    this.dimensionCanvas.w = 1000;
    this.dimensionCanvas.h = 550;
    elementCanvas.setAttribute("width", this.dimensionCanvas.w);
    elementCanvas.setAttribute("height", this.dimensionCanvas.h);
  },

  refreshScreen() {
    this.checkCollision();
    this.clearCanvas();
    this.drawAll();
    this.framesCounter++;
    if (this.framesCounter % 200 === 0) {
      this.score++;
    }
    if (this.framesCounter % 80 === 0) {
      this.createNewObstacle();
    }
    if (this.framesCounter % 1000 === 0) {
      this.createNewLive();
    }
    if (this.framesCounter % 500 === 0) {
      this.o2Reserve--;
    }

    requestAnimationFrame(() => this.refreshScreen());
  },

  createNewPlayer() {
    this.newPlayer = new Player(this.ctx, 175, 80, this.dimensionCanvas);
  },

  setListeners() {
    window.addEventListener("keydown", (e) => {
      e.code === "ArrowUp" ? this.newPlayer.moveUp() : null;
      e.code === "ArrowDown" ? this.newPlayer.moveDown() : null;
      e.code === "ArrowRight" ? this.newPlayer.moveRight() : null;
      e.code === "ArrowLeft" ? this.newPlayer.moveLeft() : null;
    });
    document.addEventListener("keyup", (e) => {
      e.code === "ArrowUp" ? this.newPlayer.moveUp() : null;
      e.code === "ArrowDown" ? this.newPlayer.moveDown() : null;
      e.code === "ArrowRight" ? this.newPlayer.moveRight() : null;
      e.code === "ArrowLeft" ? this.newPlayer.moveLeft() : null;
    });
  },

  createNewObstacle() {
    const yRandomPosition = Math.trunc(Math.random() * this.dimensionCanvas.h);
    const newObstacle = new Obstacle(
      this.ctx,
      100,
      80,
      this.dimensionCanvas,
      yRandomPosition,
      this.speed
    );
    this.obstaclesArray.push(newObstacle);
  },

  createNewLive() {
    const xRandomPosition = Math.trunc(Math.random() * this.dimensionCanvas.w);
    const newLive = new Live(
      this.ctx,
      70,
      59,
      this.dimensionCanvas,
      xRandomPosition,
      this.speed
    );
    this.livesArray.push(newLive);
  },

  drawAll() {
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      this.dimensionCanvas.w,
      this.dimensionCanvas.h
    );
    this.newPlayer.draw();
    this.obstaclesArray.forEach((obstacle) => obstacle.draw());
    this.livesArray.forEach((live) => live.draw());
    this.showScores();
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.dimensionCanvas.w, this.dimensionCanvas.h);
  },

  checkCollision() {
    if (this.obstaclesArray.length) {
      this.obstaclesArray.forEach((danger) => {
        danger.draw();
        let frontalCollision =
          this.newPlayer.playerPosition.x <
          danger.obstaclePosition.x + danger.obstacleWidth - 10;
        let upperCollision =
          this.newPlayer.playerPosition.x + this.newPlayer.playerWidth - 10 >
          danger.obstaclePosition.x;
        let downCollision =
          this.newPlayer.playerPosition.y <
          danger.obstaclePosition.y + danger.obstacleHeight - 10;
        let backCollision =
          this.newPlayer.playerHeight - 10 + this.newPlayer.playerPosition.y >
          danger.obstaclePosition.y;

        if (
          frontalCollision &&
          upperCollision &&
          downCollision &&
          backCollision
        ) {
          alert("Game Over"); //SOMETHING NICE HERE
          cancelAnimationFrame();
        }
      });
    }
  },

  showScores() {
    //   let scoreInput = document.getElementByClassname('score')

    this.ctx.font = "25px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score:   " + this.score, 850, 80);

    this.ctx.font = "25px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("O2 Reserve:   " + this.o2Reserve, 785, 50);
  },
};
