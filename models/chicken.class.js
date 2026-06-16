class Chicken extends MovableObject {
  y = 360;
  width = 80;
  height = 80;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  constructor(x) {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = x; // Wert aus der Funktion übernehmen
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.setStopableInterval(() => this.moveLeft(), 1000 / 60);
    this.setStopableInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
  }
}
