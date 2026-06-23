class Chicken extends MovableObject {
  y = 360;
  width = 80;
  height = 80;
  isDead = false;
  world;
  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  /**
   * Initializes properties, preloads textures, and sets a randomized base speed.
   * @param {number} x - Starting horizontal coordinate.
   */
  constructor(x) {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.imageCache[this.IMAGE_DEAD] = new Image();
    this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
    this.x = x;
    this.speed = 0.75 + Math.random() * 1.5;
    this.offset = { top: 10, bottom: 10, left: 15, right: 15 };
  }

  /**
   * Starts periodic interval loops for horizontal movement and walking textures.
   */
  animate() {
    this.setStopableInterval(() => this.handleVisibleMovement(), 1000 / 60);
    this.setStopableInterval(() => this.handleWalkingAnimation(), 150);
  }

  /**
   * Moves the unit leftwards if it is alive and enters the active camera viewport bounds.
   */
  handleVisibleMovement() {
    if (this.isDead) return;
    let isVisible = this.world && this.x < -this.world.camera_x + 750;
    if (isVisible) {
      this.moveLeft();
    }
  }

  /**
   * Cycles through walking textures continuously if the unit is alive.
   */
  handleWalkingAnimation() {
    if (this.isDead) return;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Disables object velocity, clears the hitbox properties, and removes the unit after a short delay.
   */
  kill() {
    if (this.isDead) return;
    this.isDead = true;
    this.speed = 0;
    this.img = this.imageCache[this.IMAGE_DEAD];
    this.offset = { top: 9999, bottom: 9999, left: 9999, right: 9999 };
    setTimeout(() => {
      this.height = 40;
      this.y = this.y + 40;
    }, 20);
    setTimeout(() => {
      this.y = -9999;
    }, 1000);
  }
}
