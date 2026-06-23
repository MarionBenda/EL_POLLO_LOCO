class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.8;
  energy = 100;
  lastHit = 0;
  static intervalIds = [];
  static gameIsOver = false;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };

  /**
   * Starts a stoppable interval loop and pushes its unique ID to the manager array.
   */
  setStopableInterval(callbackFunction, time) {
    let id = setInterval(callbackFunction, time);
    MovableObject.intervalIds.push(id);
  }

  /**
   * Clears out all registered intervals and resets the main game-over state tracker.
   */
  static stopAllIntervals() {
    MovableObject.intervalIds.forEach(clearInterval);
    MovableObject.intervalIds.length = 0;
    MovableObject.gameIsOver = false;
  }

  /**
   * Computes down-force gravity calculations synced smoothly to a 60 FPS viewport rhythm.
   */
  applyGravity() {
    this.setStopableInterval(() => {
      if (MovableObject.gameIsOver) return;
      if (this.speedY > 0 || this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this instanceof Character) {
        this.y = 150;
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  /**
   * Validates whether an entity currently positions above its designated ground floor level.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    if (this instanceof Character) return this.y < 150;
    return false;
  }

  /**
   * Checks geometrically if an element is safely dropping down straight onto an enemy head.
   */
  isFallingOnto(mo) {
    let charBottom = this.y + this.height - this.offset.bottom;
    let enemyOffsetTop = mo.offset && mo.offset.top ? mo.offset.top : 0;
    let enemyTop = mo.y + enemyOffsetTop;
    let isFalling = this.speedY < 0;
    let isAboveCenter = charBottom <= enemyTop + mo.height / 2;
    return isFalling && isAboveCenter;
  }

  /**
   * Evaluates axis-aligned bounding box collisions factoring in precise relative layout offsets.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces structural health pools upon impact and records an active unix epoch time stamp.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) this.energy = 0;
    this.lastHit = new Date().getTime();
  }

  /**
   * Calculates whether the unit suffered vital damage during the last 500ms safety window.
   */
  isHurt() {
    if (this.lastHit === 0) return false;
    return new Date().getTime() - this.lastHit < 500;
  }

  /**
   * Verifies if the health parameter metrics dropped down completely to absolute zero.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Rotates texture imagery frames to create a fluid, non-disrupted procedural rendering pattern.
   */
  playAnimation(images) {
    let index = this.currentImage % images.length;
    this.img = this.imageCache[images[index]];
    this.currentImage++;
  }

  /** Increments the horizontal position coordinate rightwards. */
  moveRight() {
    this.x += this.speed;
  }

  /** Decrements the horizontal position coordinate leftwards. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Initiates an instantaneous vertical launch impulse step. */
  jump() {
    this.speedY = 30;
  }
}
