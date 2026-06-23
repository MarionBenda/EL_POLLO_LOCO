const REPEAT_COUNT = 18;
const BG_WIDTH = 720;
const LEVEL_END_X = (REPEAT_COUNT - 1) * BG_WIDTH;

/**
 * Generate layered background objects for the level.
 * @returns {BackgroundObject[]} Array of background layers.
 */
function createBackgrounds() {
  let backgrounds = [];
  for (let i = 0; i < REPEAT_COUNT; i++) {
    let x = BG_WIDTH * i;
    let layerNum = i % 2 === 0 ? 1 : 2;
    backgrounds.push(new BackgroundObject('img/5_background/layers/air.png', x));
    backgrounds.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${layerNum}.png`, x));
    backgrounds.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${layerNum}.png`, x));
    backgrounds.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${layerNum}.png`, x));
  }
  return backgrounds;
}

/**
 * Generate standard enemies and place the end boss.
 * @returns {Array} Array containing chicken variants and the end boss.
 */
function createLevelEnemies() {
  let enemies = [];
  let stopX = LEVEL_END_X - 200;

  for (let x = 600; x < stopX; x += 300) {
    let randomX = x + Math.random() * 200;

    if (Math.random() > 0.5) {
      enemies.push(new Chicken(randomX));
    } else {
      enemies.push(new SmallChicken(randomX));
    }
  }
  enemies.push(new Endboss(LEVEL_END_X + 200));
  return enemies;
}

/**
 * Spawn collectible coins at intervals across the level.
 * @returns {Coins[]} Array of coin objects.
 */
function createLevelCoins() {
  let coins = [];
  let stopX = LEVEL_END_X - 500;
  for (let x = 550; x < stopX; x += 370) {
    coins.push(new Coins(x + Math.random() * 100));
  }
  return coins;
}

/**
 * Spawn collectable bottles, alternating between ground and air.
 * @returns {Bottle[]} Array of bottle objects.
 */
function createLevelBottle() {
  let bottles = [];
  let stopX = LEVEL_END_X - 500;
  let i = 0;

  for (let x = 750; x < stopX; x += 300) {
    let isInAir = i % 2 === 0;
    bottles.push(new Bottle(x + Math.random() * 100, isInAir));
    i++;
  }
  return bottles;
}

let level1;

/**
 * Instantiate Level 1 with all generated game entities.
 * @returns {Level} A fresh instance of the level configuration.
 */
function initLevel() {
  let freshLevel = new Level(
    createLevelEnemies(),
    [new Cloud(), new Cloud(), new Cloud()],
    createBackgrounds(),
    createLevelCoins(),
    createLevelBottle(),
  );

  freshLevel.level_end_x = LEVEL_END_X;

  level1 = freshLevel;

  return freshLevel;
}

initLevel();
