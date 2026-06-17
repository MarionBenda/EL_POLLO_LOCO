class ThrowableObject extends MovableObject {
  height = 60;
  width = 50;
  isSplashed = false;

  IMAGES_ROTATING = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y) {
    super();
    this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.offset = { top: 10, bottom: 10, left: 15, right: 15 };
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();

    this.setStopableInterval(() => this.movePhysics(), 25);
    this.setStopableInterval(() => this.animateRotation(), 50);
  }

  movePhysics() {
    if (this.isSplashed) return;
    this.x += 10;
    if (this.y >= 350) {
      this.splash();
    }
  }

  animateRotation() {
    if (this.isSplashed) return;
    this.playAnimation(this.IMAGES_ROTATING);
  }

  splash() {
    this.isSplashed = true;
    this.speedY = 0;
    this.acceleration = 0;

    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 50);

    setTimeout(() => {
      clearInterval(splashInterval);
      this.y = -9999;
    }, 150);
  }
}
