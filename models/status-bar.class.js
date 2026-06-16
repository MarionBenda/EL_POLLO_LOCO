class StatusBar extends DrawableObject {
  isBlinking = false;
  width = 200;
  height = 60;
  x = 5;
  percentage = 100;

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  playBlinkEffect() {
    this.isBlinking = true;
    setTimeout(() => {
      this.isBlinking = false;
    }, 150);
  }
}
