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
    /**
     * Load a single image into this drawable object.
     * @param {string} path - Image source path.
     */
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    /**
     * Draw the object's current image to the canvas if loaded.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    if (!this.img && DrawableObject.globalCache[this.img?.src]) {
      this.img = DrawableObject.globalCache[this.img.src];
    }

    if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  drawFrame(ctx) {}

  loadImages(arr) {
    /**
     * Preload multiple images into this object's cache and the global cache.
     * @param {Array<string>} arr - Array of image paths.
     */
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
