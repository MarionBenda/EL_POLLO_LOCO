class Character extends MovableObject {
  height = 280;
  width = 100;
  y = 155;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let index = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  jump() {}
}
