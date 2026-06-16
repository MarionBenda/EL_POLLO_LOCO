class Level {
  enemies;
  clouds;
  backgroundObject;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObject, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.coins = coins;
  }
}
