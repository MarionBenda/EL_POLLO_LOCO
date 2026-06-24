class Character extends MovableObject {
  height = 280;
  width = 100;
  y = 0;
  speed = 10;
  deadAnimationPlayed = false;
  world;
  idleTimer = 0;
  isBouncing = false;

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
   * Initializes the character properties, loads animations, and applies gravity.
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
    this.offset = { top: 110, bottom: 10, left: 15, right: 15 };
    this.acceleration = 2;
  }

  /**
   * Starts periodic intervals for horizontal movement and state animations.
   */
  animate() {
    this.setStopableInterval(() => this.moveCharacter(), 1000 / 60);
    this.setStopableInterval(() => this.playCharacterAnimations(), 50);
  }

  /**
   * Handles character keyboard inputs for running, jumping, and camera positioning.
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
    if (this.world.keyboard.SPACE && !this.isAboveGround() && this.speedY <= 0) {
      this.jump();
    }
    this.world.camera_x = Math.min(0, -this.x + 200);
  }

  /**
   * Triggers the appropriate animation sequence depending on the current state.
   */
  playCharacterAnimations() {
    if (this.isDead()) {
      this.handleDeathAnimation();
    } else if (this.isBouncing || this.isAboveGround()) {
      this.idleTimer = 0;
      this.playAirAnimation();
    } else if (this.isHurt()) {
      this.idleTimer = 0;
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.handleLandingAnimation();
    }
  }

  /**
   * Maps current upward or downward physics velocity to specific jump textures.
   */
  playAirAnimation() {
    let index = 0;
    if (this.speedY > 18) index = 0;
    else if (this.speedY > 13) index = 1;
    else if (this.speedY > 8) index = 2;
    else if (this.speedY > 3) index = 3;
    else if (this.speedY > -3) index = 4;
    else if (this.speedY > -8) index = 5;
    else if (this.speedY > -13) index = 6;
    else if (this.speedY > -18) index = 7;
    else index = 8;
    this.img = this.imageCache[this.IMAGES_JUMPING[index]];
  }

  /**
   * Handles visual transition states when the character is on solid ground.
   */
  handleLandingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D) {
      this.idleTimer = 0;
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    } else {
      if (this.idleTimer == 0) this.currentImage = 0;
      this.handleIdleState();
    }
  }

  /**
   * Manages short and long duration standing animations based on non-interaction timers.
   */
  handleIdleState() {
    this.idleTimer += 50;
    if (this.idleTimer >= 5000) {
      let i = Math.floor(this.currentImage / 3) % this.IMAGES_IDLE_LONG.length;
      this.img = this.imageCache[this.IMAGES_IDLE_LONG[i]];
      this.currentImage++;
    } else {
      let i = Math.floor(this.currentImage / 2) % this.IMAGES_IDLE.length;
      this.img = this.imageCache[this.IMAGES_IDLE[i]];
      this.currentImage++;
    }
  }

  /**
   * Triggers a slight death bounce and cycles through all demise textures.
   */
  handleDeathAnimation() {
    if (this.deadAnimationPlayed) return;
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.currentImage = 0;
      this.speedY = 25;
      this.offset = { top: -999, bottom: -999, left: -999, right: -999 };
    }
    this.x += 4;
    this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
    this.currentImage++;
    if (this.currentImage === this.IMAGES_DEAD.length) {
      this.deadAnimationPlayed = true;
      this.showGameOver();
    }
  }

  /**
   * Sets game state flags to stopped and reveals the game over interface screens.
   * Jetzt mit eingebauter Verzögerung, damit man Pepes Tod auch sieht!
   */
  showGameOver() {
    setTimeout(() => {
      showEndGameOverlay();
      MovableObject.gameIsOver = true;
      SoundManager.playSound('gameOver');

      let gameOverScreen = document.getElementById('game-over-screen');
      if (gameOverScreen) gameOverScreen.classList.remove('d-none');

      let restartContainer = document.getElementById('restart-container');
      if (restartContainer) restartContainer.classList.remove('d-none');

      MovableObject.stopAllIntervals();
    }, 1000);
  }

  /**
   * Applies upward velocity force fields to trigger a standard jump action.
   */
  jump(customSpeedY = 25) {
    this.speedY = customSpeedY;
    this.y -= 25;
  }

  /**
   * Initiates a short bounce impulse when successfully landing on top of enemies.
   */
  bounceJump() {
    this.speedY = 25;
    this.y -= 20;
    this.isBouncing = true;
    setTimeout(() => {
      this.isBouncing = false;
    }, 150);
  }
}
