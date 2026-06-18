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

  animate() {
    this.setStopableInterval(() => this.moveBoss(), 1000 / 60);
    this.setStopableInterval(() => this.playBossAnimations(), 200);
  }

  moveBoss() {
    if (this.isDead) return;
    if (this.isEnraged) {
      this.x += (this.rageDirection === 'left' ? -1 : 1) * (this.speed * 3.5);
      this.otherDirection = this.rageDirection === 'right';
    } else if (this.isReturning) {
      let dist = this.returnX - this.x;
      if (Math.abs(dist) < 10) this.isReturning = false;
      else {
        this.x += Math.sign(dist) * (this.speed * 2);
        this.otherDirection = dist > 0;
      }
    } else if (!this.isHurtStatus) {
      this.x += this.movingLeft ? -this.speed : this.speed;
      if (this.x < this.startX - this.patrolRange) this.movingLeft = false;
      if (this.x > this.startX) this.movingLeft = true;
      this.otherDirection = !this.movingLeft;
    }
  }

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

  handleBossDeath() {
    if (this.deadAnimationPlayed) return;
    this.playAnimation(this.IMAGES_DEAD);
    if (this.currentImage >= this.IMAGES_DEAD.length) {
      this.deadAnimationPlayed = true;
      this.showYouWon();
    }
  }

  showYouWon() {
    MovableObject.gameIsOver = true;
    document.getElementById('you-won-screen').classList.remove('d-none');
    document.getElementById('restart-container').classList.remove('d-none');
    MovableObject.stopAllIntervals();
  }

  bossHit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
      this.currentImage = 0;
    } else {
      this.isHurtStatus = true;
      if (this.world?.character) this.rageDirection = this.world.character.x < this.x ? 'left' : 'right';
      this.returnX = this.x;
      this.isReturning = false;
      setTimeout(() => {
        this.isHurtStatus = false;
        this.isEnraged = true;
      }, 400);
      setTimeout(() => {
        this.isEnraged = false;
        this.isReturning = true;
      }, 1200);
    }
  }
}
