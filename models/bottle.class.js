class Bottle extends MovableObject {
  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/salsa_bottle.png',
  ];
  width = 60;
  height = 80;

  /**
   * Create a bottle at given x and type (in air or on ground).
   * @param {number} x - X position of the bottle.
   * @param {boolean} isInAir - Whether the bottle is spawned in the air.
   */
  constructor(x, isInAir) {
    super();
    this.offset = { top: 15, bottom: 5, left: 15, right: 15 };
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = x;
    this.setupBottleType(isInAir);
  }

  /**
   * Set bottle sprite and vertical position based on type.
   * @param {boolean} isInAir - If true use flying bottle image.
   */
  setupBottleType(isInAir) {
    if (isInAir) {
      this.loadImage(this.IMAGES_BOTTLES[2]);
      this.y = 80 + Math.random() * 180;
    } else {
      let randomIndex = Math.round(Math.random());
      this.loadImage(this.IMAGES_BOTTLES[randomIndex]);
      this.y = 350;
    }
  }
}
