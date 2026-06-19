class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.8;
  energy = 100;
  lastHit = 0;
  static intervalIds = [];
  static gameIsOver = false;

  offset = { top: 0, bottom: 0, left: 0, right: 0 };

  setStopableInterval(callbackFunction, time) {
    let id = setInterval(callbackFunction, time);
    MovableObject.intervalIds.push(id);
  }

  /**
   * Clear all stored intervals and reset game over flag.
   */
  static stopAllIntervals() {
    MovableObject.intervalIds.forEach(clearInterval);
    MovableObject.intervalIds.length = 0;
    MovableObject.gameIsOver = false;
  }

  applyGravity() {
    this.setStopableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this instanceof Character) {
        this.y = 150;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    if (this instanceof Character) return this.y < 150;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Apply damage to this object and record the hit timestamp.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
  }

  /**
   * Return whether the object was hit recently (within 500ms).
   * @returns {boolean}
   */
  isHurt() {
    if (this.lastHit === 0) return false;
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }
  isDead() {
    return this.energy == 0;
  }
  playAnimation(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /** Move object to the right by its speed. */
  moveRight() {
    this.x += this.speed;
  }

  /** Move object to the left by its speed. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Set upward velocity for jump. */
  jump() {
    this.speedY = 30;
  }
}
