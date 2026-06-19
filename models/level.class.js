class Level {
  enemies;
  clouds;
  backgroundObject;
  coins;
  bottles;
  level_end_x = 12960;

  constructor(enemies, clouds, backgroundObject, coins, bottles) {
    /**
     * Define a level with its objects and collectibles.
     * @param {Array} enemies - Enemy objects in the level.
     * @param {Array} clouds - Cloud objects for parallax.
     * @param {Array} backgroundObject - Background layers.
     * @param {Array} coins - Coin collectibles.
     * @param {Array} bottles - Bottle collectibles.
     */
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.coins = coins;
    this.bottles = bottles;
  }
}
