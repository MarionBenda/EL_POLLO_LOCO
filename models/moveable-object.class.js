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

  /**
   * Start a stoppable interval and track its ID.
   * @param {Function} callbackFunction - The function to execute.
   * @param {number} time - Delay in milliseconds.
   */
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

  /**
   * Apply constant gravity to the object using a periodic interval.
   */
  applyGravity() {
    this.setStopableInterval(() => {
      if (this.speedY > 0 || this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else if (this instanceof Character) {
        this.y = 150;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Determine if the object is currently in the air.
   * @returns {boolean|undefined} True if the object is above its ground level.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    if (this instanceof Character) return this.y < 150;
  }

  /**
   * Check if this object is falling directly onto another object from above.
   * @param {MovableObject} mo - Target object.
   * @returns {boolean} True if landing on target, false otherwise.
   */
  isFallingOnto(mo) {
    if (this.speedY > 5) return false;
    let charBottom = this.y + this.height - this.offset.bottom;
    let enemyTop = mo.y + mo.offset.top;
    let horOverlap = this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
    let vertClose = charBottom <= enemyTop + 35 && charBottom >= enemyTop - 10;
    return horOverlap && vertClose;
  }

  /**
   * Detect an axis-aligned bounding box collision with another movable object, incorporating offsets.
   * @param {MovableObject} mo - The other movable object to check collision against.
   * @returns {boolean} True if the objects overlap, otherwise false.
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

  /**
   * Check if the object's energy has reached zero.
   * @returns {boolean} True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Cycle through an array of images to play a continuous animation.
   * @param {string[]} images - Array of image paths to be animated.
   */
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
