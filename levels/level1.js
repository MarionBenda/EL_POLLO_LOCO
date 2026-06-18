const REPEAT_COUNT = 18;
const BG_WIDTH = 720;
const LEVEL_END_X = (REPEAT_COUNT - 1) * BG_WIDTH;

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

function createLevelCoins() {
  let coins = [];
  let stopX = LEVEL_END_X - 500;
  for (let x = 500; x < stopX; x += 300) {
    coins.push(new Coins(x + Math.random() * 100));
  }
  return coins;
}

function createLevelBottle() {
  let bottles = [];
  let stopX = LEVEL_END_X - 500;
  let i = 0;

  for (let x = 500; x < stopX; x += 300) {
    let isInAir = i % 2 === 0;
    bottles.push(new Bottle(x + Math.random() * 100, isInAir));
    i++;
  }
  return bottles;
}

let level1;

function initLevel() {
  level1 = new Level(createLevelEnemies(), [new Cloud(), new Cloud(), new Cloud()], createBackgrounds(), createLevelCoins(), createLevelBottle());
  level1.level_end_x = LEVEL_END_X;
}

initLevel();
