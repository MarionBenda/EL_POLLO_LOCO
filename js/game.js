let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  /**
   * Initialize canvas, input bindings and create the World instance.
   */
  canvas = document.getElementById('gameCanvas');
  initLevel();
  keyboard.bindKeyPressEvents();
  keyboard.bindTouchEvents();

  setTimeout(() => {
    world = new World(canvas, keyboard);
    console.log('Spiel stabil initialisiert.');
  }, 50);
}

function restartGame() {
  /**
   * Restart the game: reset intervals, sounds, UI and re-init the level.
   */
  MovableObject.stopAllIntervals();
  ['gameOver', 'gameWin'].forEach((soundName) => {
    SoundManager.sounds[soundName].pause();
    SoundManager.sounds[soundName].currentTime = 0;
  });
  SoundManager.playBackground();
  document
    .querySelectorAll('#game-over-screen, #you-won-screen, #restart-container, #restart-container-desktop')
    .forEach((element) => element.classList.add('d-none'));
  initLevel();
  setTimeout(() => (world = new World(canvas, keyboard)), 50);
}

function toggleFullscreen() {
  /**
   * Toggle browser fullscreen mode for the canvas wrapper.
   */
  let element = document.querySelector('.canvas-wrapper');
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => console.warn(`Vollbild fehlgeschlagen: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyF' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    toggleFullscreen();
  }
});

function toggleGameMute() {
  /**
   * Toggle global mute and update mute button UI.
   */
  SoundManager.toggleMute();
  const muteBtn = document.getElementById('mute-btn');
  if (muteBtn) {
    muteBtn.innerText = SoundManager.isMuted ? '🔇' : '🔊';
    muteBtn.classList.toggle('muted', SoundManager.isMuted);
    muteBtn.blur();
  }
}
