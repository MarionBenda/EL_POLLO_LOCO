class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;
  IMAGES = ['img/5_background/layers/4_clouds/1.png', 'img/5_background/layers/4_clouds/2.png'];
  static lastCloudX = 0;

  /**
   * Create a cloud and automatically space it out across the entire level width.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[Math.round(Math.random())]);
    if (typeof Cloud.lastCloudX !== 'number' || Cloud.lastCloudX > 12000) {
      Cloud.lastCloudX = 0;
    }
    this.x = Cloud.lastCloudX + Math.random() * 300;
    Cloud.lastCloudX += 4300;
    this.speed = 0.15 + Math.random() * 0.1;
    this.animate();
  }

  /**
   * Continuously move cloud left and teleport it back to the right end when out of bounds.
   */
  animate() {
    this.setStopableInterval(() => {
      this.moveLeft();
      if (this.x < -600) {
        this.x = 12960 + Math.random() * 500;
      }
    }, 1000 / 60);
  }
}
