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
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.speed = 0.75 + Math.random() * 1;
    this.offset = { top: 5, bottom: 5, left: 10, right: 10 };
    this.animate();
  }

  animate() {
    this.setStopableInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 60);

    this.setStopableInterval(() => {
      if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  kill() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.IMAGE_DEAD);
    setTimeout(() => {
      this.y = -9999;
    }, 1000);
  }
}
