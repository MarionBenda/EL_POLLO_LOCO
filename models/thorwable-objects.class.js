class ThrowableObject extends MovableObject {
  height = 60;
  width = 50;
  isSplashed = false;
  speedX = 10;

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

  constructor(x, y, isLookingLeft, characterSpeed) {
    super();
    this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.acceleration = 4.5;
    this.offset = { top: 10, bottom: 10, left: 15, right: 15 };
    this.throw(isLookingLeft, characterSpeed);
  }

  throw(isLookingLeft, characterSpeed) {
    this.speedY = 16;
    this.applyGravity();

    let baseSpeed = 3;

    if (isLookingLeft) {
      this.speedX = -baseSpeed - characterSpeed;
    } else {
      this.speedX = baseSpeed + characterSpeed;
    }

    this.setStopableInterval(() => this.movePhysics(), 25);
    this.setStopableInterval(() => this.animateRotation(), 50);
  }

  movePhysics() {
    if (this.isSplashed) return;
    this.x += this.speedX;
    if (this.y >= 350) {
      this.splash();
    }
  }

  animateRotation() {
    if (this.isSplashed) return;
    this.playAnimation(this.IMAGES_ROTATING);
  }

  splash(enemy = null) {
    this.isSplashed = true;
    this.speedY = 0;
    this.acceleration = 0;
    this.speedX = 0;

    if (enemy) {
      this.y = enemy.y + enemy.height / 2 - this.height / 2;
    }

    this.currentImage = 0;

    let splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 50);

    setTimeout(() => {
      clearInterval(splashInterval);
      this.y = -9999;
    }, 350);
  }
}
