class SoundManager {
  static sounds = {
    dialog: new Audio('audio/sound-dialog.mp3'),
    background: new Audio('audio/sound-background-game.mp3'),
    coin: new Audio('audio/sound-coin.mp3'),
    bottle: new Audio('audio/sound-bottle.mp3'),
    chickenDead: new Audio('audio/sound-chicken-dead.mp3'),
    bossHit: new Audio('audio/sound-chicken-boss.mp3'),
    gameOver: new Audio('audio/game-over.mp3'),
    pepeHurts: new Audio('audio/sound-pepe-hurt.mp3'),
    gameWin: new Audio('audio/sound-win.mp3'),
    throwBottle: new Audio('audio/sound-throw.mp3'),
    bottleBreak: new Audio('audio/sound-bottle-break.mp3'),
  };

  static isMuted = false;

  /**
   * Start looping dialog audio at reduced volume.
   */
  static startDialogSound() {
    if (this.isMuted) return;

    this.sounds.dialog.loop = true;
    this.sounds.dialog.volume = 0.3;
    this.sounds.dialog.play().catch((e) => {
      console.log('Autoplay blockiert. Sound startet bei der nächsten Interaktion.');
    });
  }

  /**
   * Stop and reset dialog audio playback.
   */
  static stopDialogSound() {
    this.sounds.dialog.pause();
    this.sounds.dialog.currentTime = 0;
  }

  /**
   * Play background music if not muted.
   */
  static playBackground() {
    if (this.isMuted) return;
    this.sounds.background.loop = true;
    this.sounds.background.volume = 0.15;
    this.sounds.background.play();
  }

  /**
   * Play a named sound effect, pausing background on end/win.
   * @param {string} name - Key name of the sound to play.
   */
  static playSound(name) {
    if (this.isMuted) return;

    if (name === 'gameOver' || name === 'gameWin') {
      this.sounds.background.pause();
    }

    let sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((e) => console.log('Sound-Abgabetakt blockiert:', e));
    }
  }

  /**
   * Toggle global mute state for sound manager.
   */
  static toggleMute() {
    this.isMuted = !this.isMuted;
    this.sounds.background.muted = this.isMuted;
  }
}
