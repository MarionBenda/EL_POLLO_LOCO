class Endboss extends MovableObject {
  height = 400;
  width = 350;
  y = 55;
  energy = 100;
  isDead = false;
  isHurtStatus = false;
  isEnraged = false;
  rageDirection = 'left';
  returnX = 0;
  startX;
  patrolRange = 500;
  movingLeft = true;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_HURTS = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png', 'img/4_enemie_boss_chicken/4_hurt/G23.png'];
  IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png', 'img/4_enemie_boss_chicken/5_dead/G26.png'];

  /**
   * Create an Endboss at given x position and preload animations.
   * @param {number} x - Starting X position for the boss.
   */
  constructor(x) {
    super();
    this.loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURTS);
    this.x = x;
    this.startX = x;
    this.speed = 2.5;
    this.offset = { top: 60, bottom: 20, left: 30, right: 30 };
    this.animate();
  }

  /**
   * Start periodic boss movement and animation loops.
   */
  animate() {
    this.setStopableInterval(() => this.moveBoss(), 1000 / 60);
    this.setStopableInterval(() => this.playBossAnimations(), 200);
  }

  /**
   * Update boss movement state (patrol, enraged, return).
   */
  moveBoss() {
    if (this.isDead) return;
    if (this.isEnraged) {
      this.x += (this.rageDirection === 'left' ? -1 : 1) * (this.speed * 3.5);
      this.otherDirection = this.rageDirection === 'right';
    } else if (this.isReturning) {
      let dist = this.returnX - this.x;
      Math.abs(dist) < 10 ? (this.isReturning = false) : ((this.x += Math.sign(dist) * (this.speed * 2)), (this.otherDirection = dist > 0));
    } else if (!this.isHurtStatus) {
      this.movingLeft = this.x < this.startX - this.patrolRange ? false : this.x > this.startX ? true : this.movingLeft;
      this.x += this.movingLeft ? -this.speed : this.speed;
      this.otherDirection = !this.movingLeft;
    }
  }

  /**
   * Choose appropriate animation based on boss state.
   */
  playBossAnimations() {
    if (this.isDead) {
      this.handleBossDeath();
    } else if (this.isHurtStatus) {
      this.playAnimation(this.IMAGES_HURTS);
    } else if (this.world && this.world.character.x > this.x - 400) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Play death animation and trigger win when finished.
   */
  handleBossDeath() {
    if (this.deadAnimationPlayed) return;
    this.playAnimation(this.IMAGES_DEAD);
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.deadAnimationPlayed = true;
      this.showYouWon();
    }
  }

  /**
   * Display 'you won' UI and stop the game.
   */
  showYouWon() {
    MovableObject.gameIsOver = true;
    document.getElementById('you-won-screen').classList.remove('d-none');
    document.getElementById('restart-container').classList.remove('d-none');
    MovableObject.stopAllIntervals();
  }

  /**
   * Apply damage to boss, set hurt/enraged state and schedule behavior.
   */
  bossHit() {
    this.energy = Math.max(0, this.energy - 10);
    if (this.energy === 0) return Object.assign(this, { isDead: true, currentImage: 0 });

    this.isHurtStatus = true;
    this.isReturning = false;
    this.returnX = this.x;
    if (this.world?.character) this.rageDirection = this.world.character.x < this.x ? 'left' : 'right';

    this.triggerRageTimers();
  }

  /**
   * Schedule boss phase transitions from hurt to enraged, then back to returning.
   */
  triggerRageTimers() {
    setTimeout(() => Object.assign(this, { isHurtStatus: false, isEnraged: true }), 400);
    setTimeout(() => Object.assign(this, { isEnraged: false, isReturning: true }), 1200);
  }
}
