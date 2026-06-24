class ConfigurableStatusBar extends StatusBar {
  /**
   * Initializes basic orientation properties and builds a secure private image cache.
   * @param {string[]} images - Paths to the assets group.
   * @param {number} y - Vertical viewport coordinate.
   * @param {number} startPercentage - Core progress entry point.
   * @param {number} [x] - Optional horizontal layout position.
   */
  constructor(images, y, startPercentage, x) {
    super();
    this.imageCache = {};
    this.IMAGES = images;
    this.y = y;
    this.x = x !== undefined ? x : 5;
    this.loadImages(this.IMAGES);
    this.percentage = startPercentage;
    this.setPercentage(startPercentage);
  }
}

class BossHealthBar extends ConfigurableStatusBar {
  /**
   * Configures the end boss vital progress indicator metrics.
   */
  constructor() {
    super(
      [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
      ],
      10,
      100,
      260,
    );
  }
}

class BottleBar extends ConfigurableStatusBar {
  /**
   * Configures the secondary ammunition level asset paths starting empty.
   */
  constructor() {
    super(
      [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
      ],
      100,
      0,
      5,
    );
  }
}

class CoinBar extends ConfigurableStatusBar {
  /**
   * Configures the tertiary treasure inventory layer starting empty.
   */
  constructor() {
    super(
      [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
      ],
      50,
      0,
      5,
    );
  }
}

class HealthBar extends StatusBar {
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 0;
    this.setPercentage(100);
  }

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
    } else {
      return 1;
    }
  }
}
