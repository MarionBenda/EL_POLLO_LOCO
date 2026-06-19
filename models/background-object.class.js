class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  /**
   * Create a background object.
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - X position of the background object.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.y = 480 - this.height;
    this.x = x;
  }
}
