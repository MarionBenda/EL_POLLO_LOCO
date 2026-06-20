class StatusBar extends DrawableObject {
  isBlinking = false;
  width = 200;
  height = 60;
  x = 5;
  percentage = 100;

  /**
   * Map the current percentage value to the corresponding status bar image index.
   * @returns {number} An image index integer from 0 to 5.
   */
  resolveImageIndex() {
    if (this.percentage <= 0) {
      return 0;
    }
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Set the displayed percentage and update the bar image.
   * @param {number} percentage - Percentage value (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Trigger a short blinking effect on the status bar.
   */
  playBlinkEffect() {
    this.isBlinking = true;
    setTimeout(() => {
      this.isBlinking = false;
    }, 150);
  }
}
