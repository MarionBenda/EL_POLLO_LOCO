class Character extends MovableObject {
  height = 280;
  width = 100;
  y = 0;
  speed = 10;
  deadAnimationPlayed = false;
  world;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
  ];

  IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.offset = { top: 120, bottom: 10, left: 15, right: 15 };
  }

  animate() {
    this.setStopableInterval(() => this.moveCharacter(), 1000 / 60);
    this.setStopableInterval(() => this.playCharacterAnimations(), 50);
  }

  moveCharacter() {
    if (this.isDead() || MovableObject.gameIsOver) return;
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) this.jump();
    this.world.camera_x = -this.x + 100;
  }

  playCharacterAnimations() {
    if (this.isDead()) {
      this.handleDeathAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAirAnimation();
    } else {
      this.handleLandingAnimation();
    }
  }

  playAirAnimation() {
    let index = Math.floor(this.currentImage / 2) % 8;
    this.img = this.imageCache[this.IMAGES_JUMPING[index]];
    this.currentImage++;
  }

  handleLandingAnimation() {
    if (this.currentImage > 0) {
      this.img = this.imageCache[this.IMAGES_JUMPING[8]];
      this.currentImage = 0;
      setTimeout(() => {}, 100);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    }
  }

  handleDeathAnimation() {
    if (this.deadAnimationPlayed) return;
    this.playAnimation(this.IMAGES_DEAD);
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.deadAnimationPlayed = true;
      this.showGameOver();
    }
  }

  showGameOver() {
    MovableObject.gameIsOver = true;
    document.getElementById('game-over-screen').classList.remove('d-none');
    MovableObject.stopAllIntervals();
  }

  jump() {
    this.speedY = 30;
    this.currentImage = 0;
  }
}
