export default class Player {
  #position;
  #lives;
  #startPosition;
  #maxLives;

  constructor(startX, startY, lives = 3) {
    this.#startPosition = { x: startX, y: startY };
    this.#position = { x: startX, y: startY };
    this.#lives = lives;
    this.#maxLives = lives;
  }

  resetPosition() {
    this.#position = { ...this.#startPosition };
  }

  setPosition(x, y) {
    this.#position = { x, y };
  }

  getPosition() {
    return { ...this.#position };
  }

  loseLife() {
    this.#lives = Math.max(0, this.#lives - 1);
  }

  gainLife() {
    this.#lives = Math.min(this.#maxLives, this.#lives + 1);
  }

  getLives() {
    return this.#lives;
  }

  isAlive() {
    return this.#lives > 0;
  }
}
