class Coins extends MovableObject {
  y = 350;
  width = 100;
  height = 100;
  IMAGES_SPINNING = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_SPINNING);
    this.x = 300 + Math.random() * 2000;
    this.y = 50 + Math.random() * 300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SPINNING);
    }, 200);
  }
}
