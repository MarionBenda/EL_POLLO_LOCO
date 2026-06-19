class Character extends MovableObject {
  height = 280;
  width = 100;
  y = 0;
  speed = 10;
  deadAnimationPlayed = false;
  world;
  idleTimer = 0;

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

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_IDLE_LONG = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];
  /**
   * Initialize player character, preload animations and enable gravity.
   */
  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.applyGravity();
    this.offset = { top: 120, bottom: 10, left: 15, right: 15 };
  }

  /**
   * Start per-frame movement and animation loops for the character.
   */
  animate() {
    this.setStopableInterval(() => this.moveCharacter(), 1000 / 60);
    this.setStopableInterval(() => this.playCharacterAnimations(), 50);
  }

  /**
   * Handle input-based movement and camera follow.
   */
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
    let targetCameraX = -this.x + 200;
    this.world.camera_x = Math.min(0, targetCameraX);
  }

  /**
   * Choose and play correct animation based on character state.
   */
  playCharacterAnimations() {
    if (this.isDead()) {
      this.handleDeathAnimation();
    } else if (this.isHurt()) {
      this.idleTimer = 0;
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.idleTimer = 0;
      this.playAirAnimation();
    } else {
      this.handleLandingAnimation();
    }
  }

  /**
   * Play jumping animation frames while in air.
   */
  playAirAnimation() {
    let index = Math.floor(this.currentImage / 2) % 8;
    this.img = this.imageCache[this.IMAGES_JUMPING[index]];
    this.currentImage++;
  }

  /**
   * Handle transition from air to landing and idle/walk states.
   */
  handleLandingAnimation() {
    if (this.currentImage > 0 && this.isAboveGround()) {
      this.img = this.imageCache[this.IMAGES_JUMPING[8]];
      this.currentImage = 0;
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.idleTimer = 0;
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      if (this.idleTimer == 0) {
        this.currentImage = 0;
      }
      this.handleIdleState();
    }
  }

  /**
   * Advance idle animation and switch to long idle after timeout.
   */
  handleIdleState() {
    this.idleTimer += 50;

    if (this.idleTimer >= 5000) {
      let i = Math.floor(this.currentImage / 3) % this.IMAGES_IDLE_LONG.length;
      let path = this.IMAGES_IDLE_LONG[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      let i = Math.floor(this.currentImage / 2) % this.IMAGES_IDLE.length;
      let path = this.IMAGES_IDLE[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  /**
   * Play death animation once and trigger game over.
   */
  handleDeathAnimation() {
    if (this.deadAnimationPlayed) return;
    this.playAnimation(this.IMAGES_DEAD);
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.deadAnimationPlayed = true;
      this.showGameOver();
    }
  }

  /**
   * Set game over state, play sound and reveal UI.
   */
  showGameOver() {
    MovableObject.gameIsOver = true;
    SoundManager.playSound('gameOver');
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('restart-container').classList.remove('d-none');
    MovableObject.stopAllIntervals();
  }

  /**
   * Apply upward velocity and reset animation frame for jump.
   */
  jump() {
    this.speedY = 30;
    this.currentImage = 0;
  }
}
