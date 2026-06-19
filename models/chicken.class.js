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

  constructor(x) {
    super();
    /**
     * Create a chicken enemy at specified x and start walking.
     * @param {number} x - Starting X position for the chicken.
     */
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.speed = 0.75 + Math.random() * 1;
    this.offset = { top: 5, bottom: 5, left: 10, right: 10 };
    this.animate();
  }

  animate() {
    /**
     * Start movement and walking animation intervals.
     */
    this.setStopableInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 60);

    this.setStopableInterval(() => {
      if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  kill() {
    /**
     * Mark chicken as dead, play death sprite and remove later.
     */
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.IMAGE_DEAD);
    setTimeout(() => {
      this.y = -9999;
    }, 1000);
  }
}
