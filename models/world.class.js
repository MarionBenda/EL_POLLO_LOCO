class World {
  character = new Character();
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bossBar = new BossHealthBar();
  throwableObject = [];
  deadEnemies = [];
  hitEnemies = [];
  collectedCoinsCount = 0;
  totalCoins = 0;
  collectedBottlesCount = 0;
  totalBottles = 0;
  lastThrownTime = 0;

  /**
   * Initializes canvas context, builds the level instance, and triggers timers.
   * @param {HTMLCanvasElement} canvas - Target rendering viewport.
   * @param {Keyboard} keyboard - Input state tracker link.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = initLevel();
    this.character.energy = 100;
    this.hitEnemies = [];
    this.throwableObject = [];
    this.collectedCoinsCount = 0;
    this.collectedBottlesCount = 0;
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.level.enemies.forEach((e, i) => {
      e.world = this;
      e.id = `C_${i}_${Date.now()}_${Math.floor(e.x)}`;
      if (typeof e.animate === 'function') e.animate();
    });
    this.draw();
    this.setWorld();
    this.run();
    setTimeout(() => {
      this.statusBar.setPercentage(100);
      this.coinBar.setPercentage(0);
      this.bottleBar.setPercentage(0);
    }, 50);
  }

  /**
   * Chains the character instance to this world coordinate framework.
   */
  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  /**
   * Starts constant background game physics loops for collision tracking.
   */
  run() {
    this.character.setStopableInterval(() => {
      this.checkCollisions();
    }, 1000 / 60);
    this.character.setStopableInterval(() => {
      this.checkThrowObjects();
    }, 1000 / 60);
  }

  /**
   * Instantiates projectile elements when weapon fires inputs resolve.
   */
  checkThrowObjects() {
    let timePassed = new Date().getTime() - this.lastThrownTime;
    if (MovableObject.gameIsOver || !this.keyboard.D || this.collectedBottlesCount <= 0 || timePassed <= 1000) return;
    let left = this.character.otherDirection;
    let bottle = new ThrowableObject(left ? this.character.x : this.character.x + 100, this.character.y + 50, left, this.character.speed);
    bottle.world = this;
    bottle.throw(left, this.character.speed);
    this.throwableObject.push(bottle);
    this.collectedBottlesCount--;
    this.bottleBar.setPercentage((this.collectedBottlesCount / this.totalBottles) * 100);
    this.lastThrownTime = new Date().getTime();
  }

  /**
   * Executes individual collision pipelines across the current frame layers.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  /**
   * Evaluates bounds overlays between player hitboxes and active mobile units.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy || enemy.isDead || this.hitEnemies.includes(enemy.id)) return;
      this.checkBottleHitsEnemy(enemy);
      let isInsideScreen = enemy.x < -this.camera_x + this.canvas.width + 50 && enemy.x > -this.camera_x - 100;
      if (isInsideScreen && this.character.isColliding(enemy)) {
        if (this.character.isBouncing) return;
        if (this.character.isFallingOnto(enemy) && !(enemy instanceof Endboss)) {
          if (enemy.id) this.hitEnemies.push(enemy.id);
          enemy.kill();
          typeof SoundManager !== 'undefined' && SoundManager.playSound('chickenDead');
          this.character.bounceJump();
        } else if (!this.character.isHurt() && !this.character.isBouncing) {
          this.executeCharacterDamage();
        }
      }
    });
  }

  /**
   * Unused legacy clearing interface reserved for dependency management structures.
   */
  cleanUpActiveEnemies() {}

  /**
   * Lowers player vital statistics points and hooks bar interface flashes.
   */
  executeCharacterDamage() {
    this.character.hit();
    if (this.character.energy > 0 && typeof SoundManager !== 'undefined') {
      SoundManager.playSound('pepeHurts');
    }
    this.statusBar.setPercentage(this.character.energy);
    this.statusBar.playBlinkEffect();
  }

  /**
   * Removes collected treasure items from standard level tracking matrices.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        typeof SoundManager !== 'undefined' && SoundManager.playSound('coin');
        this.collectedCoinsCount++;
        this.coinBar.setPercentage((this.collectedCoinsCount / this.totalCoins) * 100);
        this.coinBar.playBlinkEffect();
      }
    });
  }

  /**
   * Removes collected ammunition items from baseline viewport layouts.
   */
  checkBottleCollisions() {
    if (!this.level || !this.level.bottles) return;
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.collectedBottlesCount++;
        typeof SoundManager !== 'undefined' && SoundManager.playSound('bottle');
        this.bottleBar.setPercentage((this.collectedBottlesCount / this.totalBottles) * 100);
        this.bottleBar.playBlinkEffect();
      }
    });
  }

  /**
   * Dispatches collision verification between active weapon tracks and targets.
   */
  checkBottleHitsEnemy(enemy) {
    if (!this.throwableObject || !enemy || enemy.isDead) return;
    this.throwableObject.forEach((bottle) => {
      if (bottle && !bottle.isSplashed && bottle.isColliding(enemy)) {
        bottle.splash(enemy);
        this.resolveEnemyHitSystem(enemy);
      }
    });
  }

  /**
   * Updates health metrics for bosses or resolves instant small enemy destruction.
   */
  resolveEnemyHitSystem(enemy) {
    const isBoss = enemy instanceof Endboss;
    if (isBoss) {
      enemy.bossHit();
      this.bossBar.setPercentage(enemy.energy);
      this.bossBar.playBlinkEffect();
    } else {
      if (enemy.id && !this.hitEnemies.includes(enemy.id)) this.hitEnemies.push(enemy.id);
      enemy.kill();
    }
    typeof SoundManager !== 'undefined' && SoundManager.playSound(isBoss ? (enemy.energy <= 0 ? 'gameWin' : 'bossHit') : 'chickenDead');
  }

  /**
   * Manages core frames clear actions and initiates global scene translations.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusBars();
    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  /**
   * Pushes specific object queues directly into global viewport display tasks.
   */
  addLevelObjects() {
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addToMap(this.character);
  }

  /**
   * Draws heads-up display indicators onto isolated canvas viewport layers.
   */
  addStatusBars() {
    if (this.character && this.character.energy <= 0) this.statusBar.setPercentage(0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.renderBossBarIfClose();
  }

  /**
   * Displays the combat boss gauge bar once horizontal proximities fall inside targets.
   */
  renderBossBarIfClose() {
    let boss = this.level.enemies.find((e) => e instanceof Endboss);
    if (boss && (this.character.x > boss.startX - 1000 || boss.energy < 100)) {
      this.bossBar.x = 260;
      this.bossBar.y = 10;
      this.addToMap(this.bossBar);
    }
  }

  /**
   * Maps an array group container down to specific drawing operations.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Handles asset mapping layer orientations and horizontal mirroring checks.
   */
  addToMap(mo) {
    if (!mo) return;
    if (mo.otherDirection) {
      this.flipImage(mo);
      if (mo.isBlinking) this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(mo.img, -mo.x, mo.y, mo.width, mo.height);
      this.ctx.globalAlpha = 1;
      this.flipImageBack(mo);
    } else {
      if (mo.isBlinking) this.ctx.globalAlpha = 0.5;
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
      this.ctx.globalAlpha = 1;
    }
  }

  /**
   * Flips rendering matrix calculations horizontally for structural alignment options.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
  }

  /**
   * Reverts transformed calculation layers safely back to baseline canvas states.
   */
  flipImageBack(mo) {
    this.ctx.restore();
  }
}
