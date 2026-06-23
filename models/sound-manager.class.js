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
   * Starts looping the menu dialog audio track with catch safety.
   */
  static startDialogSound() {
    if (this.isMuted) return;
    this.sounds.dialog.loop = true;
    this.sounds.dialog.volume = 0.3;
    this.sounds.dialog.play().catch((e) => console.log('Wartet auf erste Interaktion für Dialog-Sound.'));
  }

  /**
   * Instantly pauses the menu dialog sound track and resets its timeline pointer.
   */
  static stopDialogSound() {
    this.sounds.dialog.pause();
    this.sounds.dialog.currentTime = 0;
  }

  /**
   * Starts looping the main gameplay background music track with safety triggers.
   */
  static playBackground() {
    if (this.isMuted) return;
    this.stopDialogSound();
    this.sounds.background.loop = true;
    this.sounds.background.volume = 0.15;
    this.sounds.background.play().catch((e) => console.log('Hintergrundmusik wartet...'));
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
    this.stopDialogSound();
    if (this.sounds && this.sounds.background) {
      this.sounds.background.volume = 0.15;
      this.sounds.background.play().catch((e) => console.log('Hintergrundmusik wartet auf User-Interaktion:', e));
    }
  }
}
