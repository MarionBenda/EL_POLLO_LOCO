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

  /**
   * Initializes properties, preloads textures, sets bounding offsets, and plays launch audio.
   */
  constructor(x, y, isLookingLeft, characterSpeed) {
    super();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.acceleration = 0.65;
    this.offset = { top: 10, bottom: 10, left: 15, right: 15 };
    const mainPath = 'img/6_salsa_bottle/salsa_bottle.png';
    if (DrawableObject.globalCache && DrawableObject.globalCache[mainPath]) {
      this.img = DrawableObject.globalCache[mainPath];
    } else {
      this.loadImage(mainPath);
    }
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
    if (this.y > 330 || this.y < 120) this.y = 200;
    SoundManager.sounds.throwBottle.play();
  }

  /**
   * Renders the bottle layer on the canvas context with full visibility states.
   */
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 1;
    super.draw(ctx);
    ctx.restore();
  }

  /**
   * Calculates structural force impulses and sets flight interval loop states.
   */
  throw(isLookingLeft, characterSpeed) {
    let isJumping = this.world?.character?.isAboveGround();
    let running = (isLookingLeft && this.world?.keyboard?.LEFT) || (!isLookingLeft && this.world?.keyboard?.RIGHT);
    this.speedY = isJumping ? 10 : 7.5;
    if (running && !isLookingLeft) this.x -= 40;
    else if (running && isLookingLeft) this.x += 40;
    this.x += isLookingLeft ? -20 : 20;
    let base = running ? 7.5 : 5.0; // Adjusted for better throwing distance
    this.speedX = isLookingLeft ? -base : base;
    this.setStopableInterval(() => this.movePhysics(), 1000 / 60);
    this.setStopableInterval(() => this.animateRotation(), 50);
  }

  /**
   * Updates coordinates based on gravity speeds and triggers ground impact breaking.
   */
  movePhysics() {
    if (this.isSplashed) return;
    this.x += this.speedX;
    this.y -= this.speedY;
    this.speedY -= this.acceleration;
    if (this.y >= 360) {
      this.y = 360;
      this.splash();
    }
  }

  /**
   * Processes cyclical sprite transformations during airborne transition phases.
   */
  animateRotation() {
    if (this.isSplashed) return;
    this.playAnimation(this.IMAGES_ROTATING);
  }

  /**
   * Freezes velocities, centers coordinate positions, and triggers shattering animation cycles.
   */
  splash(enemy = null) {
    SoundManager.sounds.bottleBreak.currentTime = 0;
    SoundManager.sounds.bottleBreak.play();
    Object.assign(this, { isSplashed: true, speedY: 0, acceleration: 0, speedX: 0, currentImage: 0 });
    if (enemy) this.y = enemy.y + enemy.height / 2 - this.height / 2;
    let splashInterval = setInterval(() => this.playAnimation(this.IMAGES_SPLASH), 50);
    setTimeout(() => {
      clearInterval(splashInterval);
      this.y = -9999;
    }, 350);
  }
}
