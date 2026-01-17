class Sprite {
    /**
     * @param {Image} spritesheet - The loaded image object
     * @param {number} frameWidth - Width of a single frame
     * @param {number} frameHeight - Height of a single frame
     * @param {number} frameDuration - Time in seconds per frame
     * @param {number} frameCount - Total number of frames in the row
     * @param {boolean} loop - Whether the animation should loop
     * @param {number} scale - Drawing scale factor
     */
    constructor(spritesheet, frameWidth, frameHeight, frameDuration, frameCount, loop, scale = 1) {
        this.spritesheet = spritesheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameDuration = frameDuration;
        this.frameCount = frameCount;
        this.loop = loop;
        this.scale = scale;
        
        this.elapsedTime = 0;
        this.totalTime = this.frameDuration * this.frameCount;
    }

    drawFrame(tick, ctx, x, y, row = 0) {
        this.elapsedTime += tick;
        
        if (this.isDone()) {
            if (this.loop) this.elapsedTime -= this.totalTime;
        }
        
        let frame = this.currentFrame();
        let xIndex = 0;
        let yIndex = 0;
        
        xIndex = frame % this.frameCount;
        yIndex = row;

        ctx.drawImage(this.spritesheet,
            xIndex * this.frameWidth, yIndex * this.frameHeight,  // source x, y
            this.frameWidth, this.frameHeight,                    // source width, height
            x, y,                                                 // destination x, y
            this.frameWidth * this.scale,                         // destination width
            this.frameHeight * this.scale                         // destination height
        );
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}
