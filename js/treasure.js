class Treasure {
    constructor(ctx, width, height, dimensionCanvas, positionX, positionY) {
        this.ctx = ctx
        this.treasureWidth = width
        this.treasureHeight = height
        this.dimensionCanvas = dimensionCanvas
        this.treasurePositionX= positionX
        this.treasurePositionY = positionY
            // this.dimensionCanvas.w - this.treasureWidth - 20,
            // this.dimensionCanvas.h/2 - this.treasureHeight/2
        
        this.treasureImage = new Image();
        this.treasureImage.src = `../images/treasure/treasure.png`;
                                                     //Gets a random image
    }


    draw() {
        this.ctx.drawImage(
            this.treasureImage,
            this.treasurePositionX,
            this.treasurePositionY,
            this.treasureWidth,
            this.treasureHeight,
            
        );

    }
}