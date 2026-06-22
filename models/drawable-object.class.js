class DrawableObject {
  img;
  imageCache = {};
  static globalCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Load a single image into this drawable object.
   * @param {string} path - Image source path.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draw the object's current image to the canvas if loaded.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  draw(ctx) {
    if (!this.img && DrawableObject.globalCache[this.img?.src]) {
      this.img = DrawableObject.globalCache[this.img.src];
    }

    if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Render diagnostic border frames for the outer image box and inner combat hitbox.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (!window.DEBUG_MODE) {
      return;
    }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '2';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    if (this.offset) {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom,
      );
    }
  }

  /**
   * Preload multiple images into this object's cache and the global cache.
   * @param {Array<string>} arr - Array of image paths.
   */
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
