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
  for (let i = 0; i < 20; i++) {
    let x = 600 + i * 600 + Math.random() * 300;
    if (x < LEVEL_END_X - 500) {
      if (i % 2 === 0) {
        enemies.push(new Chicken(x));
      } else {
        enemies.push(new SmallChicken(x));
      }
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

const level1 = new Level(createLevelEnemies(), [new Cloud(), new Cloud(), new Cloud()], createBackgrounds(), createLevelCoins(), createLevelBottle());

level1.level_end_x = LEVEL_END_X;
