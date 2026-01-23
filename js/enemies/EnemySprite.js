const animationSpeed = 40;
const moveSpeed = 0.04;

export default class EnemySprite {
  constructor(image) {
    this.image = image;
    this.frameWidth = image.width / 3;  
    this.frameHeight = image.height / 4; 
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.visualX = null;
    this.visualY = null;
    this.targetX = 0;
    this.targetY = 0;
  }

  update(deltaTime, isMoving) {
    if (!isMoving && !this.isMoving()) {
      this.currentFrame = 0;
      return;
    }

    this.frameTimer += deltaTime;
    if (this.frameTimer >= animationSpeed) {
      this.frameTimer = 0;
      this.currentFrame = (this.currentFrame + 1) % 3; 
    }
  }

  isMoving() {
    return this.visualX !== this.targetX || this.visualY !== this.targetY;
  }

  draw(ctx, position, direction, cellSize, camera) {
    if (this.visualX === null) {
      this.visualX = position.x;
      this.visualY = position.y;
    }

    this.targetX = position.x;
    this.targetY = position.y;

    this.visualX += (this.targetX - this.visualX) * moveSpeed;
    this.visualY += (this.targetY - this.visualY) * moveSpeed;

    const srcX = this.currentFrame * this.frameWidth;
    const srcY = direction * this.frameHeight;

    ctx.drawImage(
      this.image,
      srcX, srcY, this.frameWidth, this.frameHeight,
      this.visualX * cellSize - camera.x,
      this.visualY * cellSize - camera.y,
      cellSize,
      cellSize
    );
  }
}