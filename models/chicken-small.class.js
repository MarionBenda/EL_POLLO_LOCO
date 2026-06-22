class SmallChicken extends MovableObject {
  y = 350;
  width = 80;
  height = 80;
  isDead = false;
  world;
  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  /**
   * Create a small chicken enemy at given x and start behavior.
   * @param {number} x - Starting X position for the small chicken.
   */
  constructor(x) {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.imageCache[this.IMAGE_DEAD] = new Image();
    this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
    this.x = x;
    this.speed = 0.75 + Math.random() * 3;
    this.offset = { top: 15, bottom: 10, left: 22, right: 22 };
    this.animate();
  }

  /**
   * Setup processing loops for positional movements and layout updates.
   */
  animate() {
    this.setStopableInterval(() => this.handleVisibleMovement(), 1000 / 60);
    this.setStopableInterval(() => this.handleWalkingAnimation(), 150);
  }

  /**
   * Evaluates screen boundary checks to safely shift elements leftwards.
   */
  handleVisibleMovement() {
    if (this.isDead) return;
    let isVisible = this.world && this.x < -this.world.camera_x + 750;
    if (!this.isDead && isVisible) {
      this.moveLeft();
    }
  }

  /**
   * Refreshes active visual textures during core traversal states.
   */
  handleWalkingAnimation() {
    if (this.isDead) return;
    if (!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Disable enemy physics, freeze active animations, and remove after a delay.
   */
  kill() {
    if (this.isDead) return;
    this.isDead = true;
    this.speed = 0;
    this.img = this.imageCache[this.IMAGE_DEAD];
    this.height = 40;
    this.y = this.y + 40;
    this.offset = { top: 9999, bottom: 9999, left: 9999, right: 9999 };
    this.playAnimation = function () {};
    setTimeout(() => {
      this.y = -9999;
    }, 1000);
  }

  /**
   * Shifts the dead unit coordinate out of bounds after active render timeout.
   */
  clearPhysicalPresenceDelayed() {
    setTimeout(() => {
      this.y = -9999;
    }, 1000);
  }
}
