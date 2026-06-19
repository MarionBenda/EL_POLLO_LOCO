class Coins extends MovableObject {
  width = 100;
  height = 100;
  IMAGES_SPINNING = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor(x) {
    super();
    /**
     * Create a coin at the given x position and start spinning animation.
     * @param {number} x - X position of the coin.
     */
    this.loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_SPINNING);
    this.x = x;
    this.y = 50 + Math.random() * 200;
    this.animate();
  }

  animate() {
    /**
     * Start periodic spinning animation for the coin.
     */
    this.setStopableInterval(() => this.playAnimation(this.IMAGES_SPINNING), 200);
  }
}
