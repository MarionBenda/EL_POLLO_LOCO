class Bottle extends MovableObject {
  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/salsa_bottle.png',
  ];
  width = 60;
  height = 80;

  constructor(x, isInAir) {
    super();
    this.x = x;
    this.setupBottleType(isInAir);
  }

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
