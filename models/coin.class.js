class Coins extends MovableObject {
  width = 100;
  height = 100;
  IMAGES_SPINNING = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  /**
   * Create a coin at the given x position and start spinning animation.
   * @param {number} x - X position of the coin.
   */
  constructor(x) {
    super();

    this.loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_SPINNING);
    this.x = x;
    this.y = 50 + Math.random() * 200;
    this.animate();
  }

  /**
   * Start periodic spinning animation for the coin.
   */
  animate() {
    this.setStopableInterval(() => this.playAnimation(this.IMAGES_SPINNING), 200);
  }
}
