class SoundManager {
  static sounds = {
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
   * Starts looping the menu dialog audio track (Disabled - removed dialog sound).
   */
  static startDialogSound() {}

  /**
   * Instantly pauses the menu dialog sound track (Disabled - removed dialog sound).
   */
  static stopDialogSound() {}

  /**
   * Starts looping the main gameplay background music track with safety triggers.
   */
  static playBackground() {
    if (this.isMuted) return;
    this.sounds.background.loop = true;
    this.sounds.background.volume = 0.15;
    this.sounds.background.play().catch(() => {});
  }

  /**
   * Triggers a specific audio track while pausing background themes on game-over states.
   */
  static playSound(name) {
    if (this.isMuted) return;
    if (name === 'gameOver' || name === 'gameWin') this.sounds.background.pause();
    let sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  /**
   * Switches the global boolean mute flag and updates the background track mute status.
   */
  static toggleMute() {
    this.isMuted = !this.isMuted;
    this.sounds.background.muted = this.isMuted;
  }

  /**
   * Enforces global mute properties and freezes execution pipelines for all tracks.
   */
  static muteAllSounds() {
    this.isMuted = true;
    Object.values(this.sounds).forEach((sound) => {
      sound.muted = true;
      sound.pause();
    });
  }

  /**
   * Restores normal volume bounds, resets menu layers, and wakes up background loops.
   */
  static unmuteAllSounds() {
    this.isMuted = false;
    Object.values(this.sounds).forEach((sound) => {
      sound.muted = false;
    });
    if (this.sounds && this.sounds.background) {
      this.sounds.background.volume = 0.15;
      this.sounds.background.play().catch(() => {});
    }
  }
}
