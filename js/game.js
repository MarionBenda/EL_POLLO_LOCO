let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initialize canvas, input bindings and create the World instance.
 */
function init() {
  checkSavedMuteStatus();
  canvas = document.getElementById('gameCanvas');
  initLevel();
  keyboard.bindKeyPressEvents();
  keyboard.bindTouchEvents();

  setTimeout(() => {
    world = new World(canvas, keyboard);
  }, 50);
}

/**
 * Restart the game: reset intervals, sounds, UI and re-init the level.
 */
function restartGame() {
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

/**
 * Toggle browser fullscreen mode for the canvas wrapper.
 */
function toggleFullscreen() {
  let element = document.querySelector('.canvas-wrapper');
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => console.warn(`Vollbild fehlgeschlagen: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
}

/**
 * Handle global keydown events to toggle fullscreen mode.
 */
window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyF' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    toggleFullscreen();
  }
});

/**
 * Toggles global sound and persists the setting in the browser.
 */
function toggleGameMute() {
  const muteBtn = document.getElementById('mute-btn');

  if (muteBtn) {
    muteBtn.blur();
  }
  SoundManager.isMuted = !SoundManager.isMuted;
  localStorage.setItem('gameMuted', SoundManager.isMuted);

  if (SoundManager.isMuted) {
    muteBtn.innerText = '🔇';
    SoundManager.muteAllSounds();
  } else {
    muteBtn.innerText = '🔊';
    SoundManager.unmuteAllSounds();
  }
}

/**
 * Load the persistent mute setting from localStorage and update the sound state and button UI.
 */
function checkSavedMuteStatus() {
  const muteBtn = document.getElementById('mute-btn');

  const wasMuted = localStorage.getItem('gameMuted') === 'true';

  if (wasMuted) {
    SoundManager.isMuted = true;
    if (muteBtn) muteBtn.innerText = '🔇';
    if (typeof SoundManager.muteAllSounds === 'function') {
      SoundManager.muteAllSounds();
    }
  }
}
