class BossHealthBar extends StatusBar {
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];

  /**
   * Initialize boss health bar images and default position.
   */
  constructor() {
    super();

    this.loadImages(this.IMAGES);
    this.x = 250;
    this.y = 10;
    this.setPercentage(100);
  }
}
