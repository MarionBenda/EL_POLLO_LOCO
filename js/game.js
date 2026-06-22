let canvas;
let world;
let keyboard = new Keyboard();

window.DEBUG_MODE = false;

/**
 * Initializes the canvas, levels, input bindings, and game world.
 */
function init() {
  checkSavedMuteStatus();
  canvas = document.getElementById('gameCanvas');
  initLevel();
  keyboard.bindKeyPressEvents();
  keyboard.bindTouchEvents();
  setTimeout(() => (world = new World(canvas, keyboard)), 50);
}

/**
 * Resets intervals, active screens, and sound states to restart the game.
 */
function restartGame() {
  MovableObject.stopAllIntervals();
  ['gameOver', 'gameWin'].forEach((sound) => {
    SoundManager.sounds[sound].pause();
    SoundManager.sounds[sound].currentTime = 0;
  });
  SoundManager.playBackground();
  hideEndScreens();
  initLevel();
  setTimeout(() => (world = new World(canvas, keyboard)), 50);
}

/**
 * Hides all end-game overlays and restart button containers.
 */
function hideEndScreens() {
  document
    .querySelectorAll('#game-over-screen, #you-won-screen, #restart-container, #restart-container-desktop')
    .forEach((el) => el.classList.add('d-none'));
}

/**
 * Toggles the canvas wrapper element into browser fullscreen mode.
 */
function toggleFullscreen() {
  let element = document.querySelector('.canvas-wrapper');
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => console.warn(`Fehler: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
}

/**
 * Global keydown listener to trigger fullscreen mode when 'F' key is pressed.
 */
window.addEventListener('keydown', (event) => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    return;
  }

  if (event.code === 'KeyF') {
    toggleFullscreen();
  }

  if (event.code === 'KeyB') {
    window.DEBUG_MODE = !window.DEBUG_MODE;
  }
});

/**
 * Toggles the global sound state and saves the choice to localStorage.
 */
function toggleGameMute() {
  SoundManager.isMuted = !SoundManager.isMuted;
  localStorage.setItem('gameMuted', SoundManager.isMuted);
  updateMuteUI();
}

/**
 * Updates text icons on all mute buttons and routes audio state adjustments.
 */
function updateMuteUI() {
  const btns = document.querySelectorAll('#mute-btn, .dialog-mute-btn');
  const icon = SoundManager.isMuted ? '🔇' : '🔊';
  btns.forEach((b) => {
    b.innerText = icon;
    b.blur();
  });
  handleAudioByState();
}

/**
 * Activates or deactivates sound groups based on the dialog overlay visibility.
 */
function handleAudioByState() {
  const dialog = document.getElementById('start-dialog');
  const isDialogOpen = dialog && !dialog.classList.contains('d-none');

  if (SoundManager.isMuted) {
    SoundManager.muteAllSounds();
  } else if (isDialogOpen) {
    SoundManager.sounds.dialog.muted = false;
    SoundManager.startDialogSound();
  } else {
    SoundManager.unmuteAllSounds();
  }
}

/**
 * Loads persistent mute configuration and synchronizes button visuals via delayed timeout.
 */
function checkSavedMuteStatus() {
  if (localStorage.getItem('gameMuted') === 'true') {
    SoundManager.isMuted = true;
    if (typeof SoundManager.muteAllSounds === 'function') SoundManager.muteAllSounds();
  }
  setTimeout(() => updateMuteUI(), 50);
}

/**
 * Core initial trigger running sound checks right when DOM structures become ready.
 */
window.addEventListener('DOMContentLoaded', checkSavedMuteStatus);
