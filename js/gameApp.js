const scubaDivingApp = {
  ctx: undefined,
  dimensionCanvas: { w: undefined, h: undefined },
  backgroundImage: undefined,
  backgroundSound: undefined,
  collisionSound: undefined,
  movementSound: undefined,
  winningSound: undefined,
  lifeSound: undefined,
  newPlayer: undefined,
  gameOverImage: undefined,
  winImage: undefined,
  framesCounter: 0,
  obstaclesArray: [],
  livesArray: [],
  bubblesArray: [],
  sharkArray: [],
  speed: 2,
  score: 0,
  o2Reserve: 10,

  init(elementCanvas) {
    this.setContext(elementCanvas);
    this.setDimensions(elementCanvas);
    this.createBackground();
    this.createSounds();
    this.createNewPlayer();
    this.setListeners();
    this.refreshScreen();
  },

  setContext(elementCanvas) {
    this.ctx = elementCanvas.getContext("2d");
  },

  setDimensions(elementCanvas) {
    this.dimensionCanvas.w = 850;
    this.dimensionCanvas.h = 465;
    elementCanvas.setAttribute("width", this.dimensionCanvas.w);
    elementCanvas.setAttribute("height", this.dimensionCanvas.h);
  },

  createBackground() {
    this.backgroundImage = new Image();
    this.backgroundImage.src =
      "https://adrifdezc.github.io/Project1-Game/images/background2.jpeg";
  },
  createGameOverScreen() {
    this.gameOverImage = new Image();
    this.gameOverImage.src =
      "https://adrifdezc.github.io/Project1-Game/images/GameOver.jpeg";
    this.ctx.drawImage(
      this.gameOverImage,
      0,
      0,
      this.dimensionCanvas.w,
      this.dimensionCanvas.h
    );
  },
  createWinScreen() {
    this.winImage = new Image();
    this.winImage.src =
      "https://adrifdezc.github.io/Project1-Game/images/WIN.png";
    this.ctx.drawImage(
      this.winImage,
      0,
      0,
      this.dimensionCanvas.w,
      this.dimensionCanvas.h
    );
  },

  refreshScreen() {
    this.backgroundSound.play(); //UNCOMENT FOR SOUND
    this.createNewTreasure();
    this.checkCollision();
    this.checkSharkCollision();
    this.checkForBottles();
    this.disappearTresure();
    this.gameOver();
    this.winGame();
    this.drawAll();
    this.newPlayer.move();

    this.framesCounter++;
    if (this.framesCounter % 200 === 0) {
      this.score++;
    }
    if (this.framesCounter % 50 === 0) {
      this.createNewObstacle();
    }
    if (this.framesCounter % 500 === 0) {
      this.createNewShark();
    }
    if (this.framesCounter % 10 === 0) {
      this.createNewBubble();
    }
    if (this.framesCounter % 1000 === 0) {
      this.createNewLive();
    }
    if (this.framesCounter % 200 === 0) {
      this.o2Reserve--;
    }

    requestAnimationFrame(() => this.refreshScreen());
  },

  createNewPlayer() {
    this.newPlayer = new Player(this.ctx, 150, 69, this.dimensionCanvas);
  },

  setListeners() {
    window.addEventListener("keydown", (e) => {
      this.movementSound.play(); //Sounds when any arrow is pressed.
      e.code === "ArrowUp" ? (this.newPlayer.moveUp = true) : null;
      e.code === "ArrowDown" ? (this.newPlayer.moveDown = true) : null;
      e.code === "ArrowRight" ? (this.newPlayer.moveRight = true) : null;
      e.code === "ArrowLeft" ? (this.newPlayer.moveLeft = true) : null;
    });
    document.addEventListener("keyup", (e) => {
      e.code === "ArrowUp" ? (this.newPlayer.moveUp = false) : null;
      e.code === "ArrowDown" ? (this.newPlayer.moveDown = false) : null;
      e.code === "ArrowRight" ? (this.newPlayer.moveRight = false) : null;
      e.code === "ArrowLeft" ? (this.newPlayer.moveLeft = false) : null;
    });
  },

  createNewObstacle() {
    const yRandomPosition = Math.trunc(Math.random() * this.dimensionCanvas.h);
    const newObstacle = new Obstacle(
      this.ctx,
      75,
      87,
      this.dimensionCanvas,
      yRandomPosition - 50,
      this.speed / 1.5
    );
    if (this.obstaclesArray.length < 7) {
      this.obstaclesArray.push(newObstacle);
    } else {
      this.obstaclesArray.shift();
    }
  },

  createNewShark() {
    const yRandomPosition = Math.trunc(Math.random() * this.dimensionCanvas.h);
    const newShark = new Shark(
      this.ctx,
      200,
      150,
      this.dimensionCanvas,
      yRandomPosition - 50,
      this.speed / 2
    );
    if (this.sharkArray.length < 20) {
      this.sharkArray.push(newShark);
    } else {
      this.sharkArray.shift();
    }
  },

  createNewBubble() {
    let bubbleSize = Math.random() * 15 + 5;
    const newBubble = new Bubble(
      this.ctx,
      bubbleSize,
      bubbleSize,
      this.dimensionCanvas,
      this.newPlayer.playerPosition.x + 140,
      this.speed
    );
    //Remove some bubbles for better performance
    if (this.bubblesArray.length < 7) {
      this.bubblesArray.push(newBubble);
    } else {
      this.bubblesArray.shift();
    }
  },

  createNewLive() {
    const xRandomPosition = Math.trunc(Math.random() * this.dimensionCanvas.w);
    const newLive = new Live(
      this.ctx,
      90,
      70,
      this.dimensionCanvas,
      xRandomPosition - 100,
      this.speed / 2
    );
    this.livesArray.push(newLive);
  },

  createNewTreasure() {
    this.newTreasure = new Treasure(
      this.ctx,
      100,
      100,
      this.dimensionCanvas,
      730,
      335
    );
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
    this.appearTreasure();
    this.outOfOxygen();
    this.obstaclesArray.forEach((obstacle) => obstacle.draw());
    this.bubblesArray.forEach((bubble) => bubble.draw());
    this.livesArray.forEach((live) => live.draw());
    this.sharkArray.forEach((shark) => shark.draw());
    this.showScores();
  },

  gameOver() {
    this.createGameOverScreen();
  },

  winGame() {
    this.createWinScreen();
  },

  checkCollision() {
    if (this.obstaclesArray.length) {
      this.obstaclesArray.forEach((danger) => {
        danger.draw();
        let frontalCollision =
          this.newPlayer.playerPosition.x <
          danger.obstaclePosition.x + danger.obstacleWidth - 20;
        let backCollision =
          this.newPlayer.playerPosition.x + this.newPlayer.playerWidth - 20 >
          danger.obstaclePosition.x;
        let downCollision =
          this.newPlayer.playerPosition.y <
          danger.obstaclePosition.y + danger.obstacleHeight - 20;
        let upperCollision =
          this.newPlayer.playerHeight - 20 + this.newPlayer.playerPosition.y >
          danger.obstaclePosition.y;

        if (
          frontalCollision &&
          backCollision &&
          downCollision &&
          upperCollision
        ) {
          // alert("Game Over"); //SOMETHING NICE HERE
          // this.newPlayer.playerPosition.y += 30
          this.collisionSound.play();
          this.gameOver();
          cancelAnimationFrame();
        }
      });
    }
  },

  checkSharkCollision() {
    if (this.sharkArray.length) {
      this.sharkArray.forEach((danger) => {
        danger.draw();
        let frontalCollision =
          this.newPlayer.playerPosition.x <
          danger.sharkPosition.x + danger.sharkWidth - 30;
        let backCollision =
          this.newPlayer.playerPosition.x + this.newPlayer.playerWidth - 30 >
          danger.sharkPosition.x;
        let downCollision =
          this.newPlayer.playerPosition.y <
          danger.sharkPosition.y + danger.sharkHeight - 50;
        let upperCollision =
          this.newPlayer.playerHeight - 50 + this.newPlayer.playerPosition.y >
          danger.sharkPosition.y;

        if (
          frontalCollision &&
          backCollision &&
          downCollision &&
          upperCollision
        ) {
          this.collisionSound.play();
          // this.newPlayer.playerPosition.y += 30
          this.gameOver();
          cancelAnimationFrame();
        }
      });
    }
  },

  checkForBottles() {
    if (this.livesArray.length) {
      this.livesArray.forEach((life) => {
        life.draw();
        let frontalCollision =
          this.newPlayer.playerPosition.x <
          life.livePosition.x + life.liveWidth - 10;
        let backCollision =
          this.newPlayer.playerPosition.x + this.newPlayer.playerWidth - 10 >
          life.livePosition.x;
        let downCollision =
          this.newPlayer.playerPosition.y <
          life.livePosition.y + life.liveHeight - 10;
        let upperCollision =
          this.newPlayer.playerHeight - 10 + this.newPlayer.playerPosition.y >
          life.livePosition.y;

        if (
          frontalCollision &&
          backCollision &&
          downCollision &&
          upperCollision
        ) {
          this.lifeSound.play();
          this.livesArray.splice(0, 1);
          this.o2Reserve += 5;
        }
      });
    }
  },

  appearTreasure() {
    if (this.score >= 0) {
      this.newTreasure.draw();
    }
  },
  outOfOxygen() {
    if (this.o2Reserve < 0) {
      alert("Out of o2");
      cancelAnimationFrame();
    }
  },
  disappearTresure() {
    let frontalCollision =
      this.newPlayer.playerPosition.x <
      this.newTreasure.treasurePositionX + this.newTreasure.treasureWidth - 10;
    let upperCollision =
      this.newPlayer.playerPosition.x + this.newPlayer.playerWidth - 10 >
      this.newTreasure.treasurePositionX;
    let downCollision =
      this.newPlayer.playerPosition.y <
      this.newTreasure.treasurePositionY + this.newTreasure.treasureHeight - 10;
    let backCollision =
      this.newPlayer.playerHeight - 10 + this.newPlayer.playerPosition.y >
      this.newTreasure.treasurePositionY;

    if (frontalCollision && upperCollision && downCollision && backCollision) {
      this.lifeSound.play();
      this.winningSound.play();
      this.winGame();
      cancelAnimationFrame();
    }
  },
  createSounds() {
    this.backgroundSound = new Audio();
    this.backgroundSound.src =
      "https://adrifdezc.github.io/Project1-Game/sounds/560446__migfus20__happy-background-music.mp3";
    this.collisionSound = new Audio();
    this.collisionSound.src =
      "https://adrifdezc.github.io/Project1-Game/sounds/oh-oh.wav";
    this.movementSound = new Audio();
    this.movementSound.src =
      "https://adrifdezc.github.io/Project1-Game/sounds/bubbles.wav";
    this.lifeSound = new Audio();
    this.lifeSound.src =
      "https://adrifdezc.github.io/Project1-Game/sounds/428156__higgs01__yay.wav";
    this.winningSound = new Audio();
    this.winningSound.src =
      "https://adrifdezc.github.io/Project1-Game/sounds/win.mp3";
  },

  showScores() {
    this.ctx.font = "20px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score:   " + this.score, 720, 80);

    this.ctx.font = "20px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("O2 Reserve:   " + this.o2Reserve, 665, 50);
  },
};
