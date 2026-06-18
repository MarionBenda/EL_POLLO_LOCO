class DrawableObject {
  img;
  imageCache = {};
  static globalCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    if (!this.img && DrawableObject.imageCache[this.img?.src]) {
      this.img = DrawableObject.imageCache[this.img.src];
    }

    if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  drawFrame(ctx) {}

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;

      if (!DrawableObject.globalCache[path]) {
        DrawableObject.globalCache[path] = img;
      }
    });
  }
}
