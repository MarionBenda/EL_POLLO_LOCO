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
  bossBar = new BossHealthBar();
  throwableObject = [];
  deadEnemies = [];
  collectedCoinsCount = 0;
  totalCoins = 0;
  collectedBottlesCount = 0;
  totalBottles = 0;
  lastThrownTime = 0;

  /**
   * Initialize world rendering and start main loops.
   * @param {HTMLCanvasElement} canvas - Canvas element used for drawing.
   * @param {Keyboard} keyboard - Keyboard input state object.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    // Weist jedem Huhn eine eindeutige Nummer zu
    this.level.enemies.forEach((enemy, index) => {
      enemy.world = this;
      enemy.id = `Chicken_${index}_at_${Math.floor(enemy.x)}`;
    });
    this.draw();
    this.setWorld();
    this.run();
  }
  /**
   * Attach world reference to the character and start animations.
   */
  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  /**
   * Start periodic game logic tasks (collision & throwing).
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
   * Handle player throwing bottles when input and cooldown allow.
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
    let percentage = (this.collectedBottlesCount / this.totalBottles) * 100;
    this.bottleBar.setPercentage(this.collectedBottlesCount === this.totalBottles ? 100 : percentage);
    this.lastThrownTime = new Date().getTime();
  }

  /**
   * Run all collision checks each frame.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  /**
   * Handle character collisions with enemies for bouncing or taking damage.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.checkBottleHitsEnemy(enemy);
      if (enemy.y < 0 || enemy.isDead) return;
      if (this.character.isFallingOnto(enemy) && !(enemy instanceof Endboss)) {
        enemy.kill();
        SoundManager.playSound('chickenDead');
        return this.character.bounceJump();
      }
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        this.executeCharacterDamage();
      }
    });
  }

  /**
   * Safely filters and removes dead units from the active physical physics array.
   */
  cleanUpActiveEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isDead);
  }

  /**
   * Reduces character vital points and updates primary interface components.
   */
  executeCharacterDamage() {
    this.character.hit();
    if (this.character.energy > 0) {
      SoundManager.playSound('pepeHurts');
    }
    this.statusBar.setPercentage(this.character.energy);
    this.statusBar.playBlinkEffect();
  }

  /**
   * Collect coins when the character collides with them.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        SoundManager.playSound('coin');
        this.collectedCoinsCount++;
        let percentage = (this.collectedCoinsCount / this.totalCoins) * 100;
        this.coinBar.setPercentage(this.collectedCoinsCount === this.totalCoins ? 100 : percentage);
        this.coinBar.playBlinkEffect();
      }
    });
  }

  /**
   * Collect bottles when the character collides with them.
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.collectedBottlesCount++;
        SoundManager.playSound('bottle');
        let percentage = (this.collectedBottlesCount / this.totalBottles) * 100;
        this.bottleBar.setPercentage(this.collectedBottlesCount === this.totalBottles ? 100 : percentage);
        this.bottleBar.playBlinkEffect();
      }
    });
  }

  /**
   * Detect thrown bottle hits against an enemy and apply effects.
   * @param {Object} enemy - Enemy object to test collisions with.
   */
  checkBottleHitsEnemy(enemy) {
    this.throwableObject.forEach((bottle) => {
      if (!bottle.isSplashed && !enemy.isDead && bottle.isColliding(enemy)) {
        bottle.splash(enemy);
        this.resolveEnemyHitSystem(enemy);
      }
    });
  }

  /**
   * Processes hit impact properties against bosses or lower tier chickens.
   * @param {Object} enemy - Targeted combat unit instance.
   */
  resolveEnemyHitSystem(enemy) {
    const isBoss = enemy instanceof Endboss;
    if (isBoss) {
      enemy.bossHit();
      this.bossBar.setPercentage(enemy.energy);
      this.bossBar.playBlinkEffect();
    } else {
      enemy.kill();
    }
    SoundManager.playSound(isBoss ? (enemy.energy <= 0 ? 'gameWin' : 'bossHit') : 'chickenDead');
  }

  /**
   * Main draw loop: clear canvas, translate camera and render scene.
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
   * Add all level objects to the rendering queue.
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
   * Draw status bars (health, coins, bottles, boss) on the HUD.
   */
  addStatusBars() {
    if (this.character && this.character.energy <= 0) {
      this.statusBar.setPercentage(0);
    }
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.renderBossBarIfClose();
  }

  /**
   * Renders the boss bar when requirements for distance are met.
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
   * Add an array of objects to the map rendering.
   * @param {Array} objects - Array of drawable objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Draw a movable object on the canvas with flipping and blink handling.
   * @param {MovableObject} mo - Movable object to draw.
   */
  addToMap(mo) {
    if (!mo) return;
    if (mo.otherDirection) this.flipImage(mo);
    if (mo.isBlinking) this.ctx.globalAlpha = 0.5;
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    this.ctx.globalAlpha = 1;
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flip drawing context horizontally for objects facing left.
   * @param {MovableObject} mo - Movable object whose image to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restore drawing context after horizontal flip.
   * @param {MovableObject} mo - Movable object to restore position for.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
