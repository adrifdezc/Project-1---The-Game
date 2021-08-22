class Player{

    constructor(ctx, width, height, dimensionCanvas){
        this.ctx = ctx;
        this.playerWidth = width;
        this.playerHeight = height;
        this.dimensionCanvas = dimensionCanvas;
        this.speed = 20,
        //new image
        this.playerImage = new Image ();
        this.playerImage.src = '/images/player.png';        
        //Initial position for the player
        this.playerPosition = {
            x: 30,
            y: this.dimensionCanvas.h/2 - this.playerHeight/2,
        };
    }

    draw(){
        this.ctx.drawImage(
            this.playerImage,
            this.playerPosition.x,
            this.playerPosition.y,
            this.playerWidth,
            this.playerHeight
        );
    }

    moveUp(){
        this.playerPosition.y -= this.speed;
    }

    moveDown(){
        this.playerPosition.y += this.speed;
    }

    moveRight(){
        this.playerPosition.x += this.speed;
    }

    moveLeft(){
        this.playerPosition.x -= this.speed;
    }


}
