class Chicken extends MovableObject {
  y = 350;
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
   * Create a chicken enemy at specified x and start walking.
   * @param {number} x - Starting X position for the chicken.
   */
  constructor(x) {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.imageCache[this.IMAGE_DEAD] = new Image();
    this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
    this.x = x;
    this.speed = 0.75 + Math.random() * 1;
    this.offset = { top: 10, bottom: 5, left: 18, right: 18 };
    this.animate();
  }

  /**
   * Start movement and walking animation intervals with strict death blocking.
   */
  animate() {
    this.setStopableInterval(() => {
      if (this.isDead) return;
      this.moveLeft();
    }, 1000 / 60);

    this.setStopableInterval(() => {
      if (this.isDead) return;
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  /**
   * Disable enemy physics, freeze active animations, and remove after a delay.
   */
  kill() {
    this.isDead = true;
    this.speed = 0;
    this.width = 80;
    this.height = 80;
    this.offset = { top: 15, bottom: 10, left: 15, right: 15 };
    this.img = this.imageCache[this.IMAGE_DEAD];
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
