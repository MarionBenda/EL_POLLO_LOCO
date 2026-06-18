class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bottleBar = new BottleBar();
  bossBar = new BossHealthBar();
  throwableObject = [];
  collectedCoinsCount = 0;
  totalCoins = 0;
  collectedBottlesCount = 0;
  totalBottles = 0;
  lastThrownTime = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  run() {
    this.character.setStopableInterval(() => {
      this.checkCollisions();
    }, 10);

    this.character.setStopableInterval(() => {
      this.checkThrowObjects();
    }, 1000 / 60);
  }

  checkThrowObjects() {
    let timePassed = new Date().getTime() - this.lastThrownTime;
    if (MovableObject.gameIsOver || !this.keyboard.D || this.collectedBottlesCount <= 0 || timePassed <= 400) return;

    let left = this.character.otherDirection;
    let spawnX = left ? this.character.x : this.character.x + 100;
    let bottle = new ThrowableObject(spawnX, this.character.y + 100, left, this.character.speed);

    this.throwableObject.push(bottle);
    this.collectedBottlesCount--;
    this.bottleBar.setPercentage((this.collectedBottlesCount / this.totalBottles) * 100);
    this.lastThrownTime = new Date().getTime();
  }

  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
          enemy.kill();
          this.character.jump();
        } else if (!this.character.isHurt() && !enemy.isDead) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          this.statusBar.playBlinkEffect();
        }
      }
      this.checkBottleHitsEnemy(enemy);
    });
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.collectedCoinsCount++;
        let percentage = this.collectedCoinsCount === this.totalCoins ? 100 : (this.collectedCoinsCount / this.totalCoins) * 100;
        this.coinBar.setPercentage(percentage);
        this.coinBar.playBlinkEffect();
      }
    });
  }

  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.collectedBottlesCount++;
        let percentage = this.collectedBottlesCount === this.totalBottles ? 100 : (this.collectedBottlesCount / this.totalBottles) * 100;
        this.bottleBar.setPercentage(percentage);
        this.bottleBar.playBlinkEffect();
      }
    });
  }

  checkBottleHitsEnemy(enemy) {
    this.throwableObject.forEach((bottle) => {
      if (bottle.isColliding(enemy) && !bottle.isSplashed && !enemy.isDead) {
        bottle.splash(enemy);
        if (enemy instanceof Endboss) {
          enemy.bossHit();
          this.bossBar.setPercentage(enemy.energy);
        } else {
          enemy.kill();
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusBars();
    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  addLevelObjects() {
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addToMap(this.character);
  }

  addStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);

    let boss = this.level.enemies.find((e) => e instanceof Endboss);
    if (boss && this.character.x > boss.startX - 1000) {
      this.addToMap(this.bossBar);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  addToMap(mo) {
    if (!mo) return;
    if (mo.otherDirection) this.flipImage(mo);
    if (mo.isBlinking) this.ctx.globalAlpha = 0.5;
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    this.ctx.globalAlpha = 1;
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
