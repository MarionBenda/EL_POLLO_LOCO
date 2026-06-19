class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  IMAGES = ['img/5_background/layers/4_clouds/1.png', 'img/5_background/layers/4_clouds/2.png'];

  constructor() {
    super();
    /**
     * Create a cloud with random image, position and speed.
     */
    let randomIndex = Math.round(Math.random());
    this.loadImage(this.IMAGES[randomIndex]);

    this.x = Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.1;
    this.animate();
  }

  animate() {
    /**
     * Continuously move cloud left for parallax effect.
     */
    this.setStopableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
