let canvas,
  world,
  keyboard = new Keyboard();
window.DEBUG_MODE = false;

/**
 * Initializes canvas, level, input listeners, and schedules world creation.
 */
function init() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  checkSavedMuteStatus();
  canvas = document.getElementById('gameCanvas');
  initLevel();
  keyboard.bindKeyPressEvents();
  keyboard.bindTouchEvents();
  setTimeout(() => (world = new World(canvas, keyboard)), 100);
}

/**
 * Resets all browser intervals, clears world cache, and restarts the game state.
 */
function restartGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  MovableObject.intervalIds = [];
  if (world) {
    world = null;
  }
  ['gameOver', 'gameWin'].forEach((s) => {
    SoundManager.sounds[s].pause();
    SoundManager.sounds[s].currentTime = 0;
  });
  hideEndScreens();
  Cloud.lastCloudX = 0;
  initLevel();
  SoundManager.playBackground();
  setTimeout(() => {
    world = new World(canvas, keyboard);
  }, 200);
}

/**
 * Hides all overlay screens and restores global UI game buttons.
 */
function hideEndScreens() {
  document
    .querySelectorAll('#mute-btn, .mobile-impressum-top, .fullscreen-container, .mobile-controls')
    .forEach((el) => el.classList.remove('d-none'));
  document
    .querySelectorAll('#game-over-screen, #you-won-screen, #restart-container, #restart-container-desktop')
    .forEach((el) => el.classList.add('d-none'));
}

/**
 * Hides background UI menus to only leave endscreen choices active.
 */
function showEndGameOverlay() {
  document.querySelectorAll('#mute-btn, .mobile-impressum-top, .fullscreen-container, .mobile-controls').forEach((el) => el.classList.add('d-none'));
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
 * Handles global key events for debugging and fullscreen toggles.
 */
window.addEventListener('keydown', (event) => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
  if (event.code === 'KeyF') toggleFullscreen();
  if (event.code === 'KeyB') window.DEBUG_MODE = !window.DEBUG_MODE;
});

/**
 * Toggles the global sound state and saves the choice to local storage.
 */
function toggleGameMute() {
  SoundManager.isMuted = !SoundManager.isMuted;
  localStorage.setItem('gameMuted', SoundManager.isMuted);
  updateMuteUI();
}

/**
 * Syncs text icons on all mute buttons with the current audio state.
 */
function updateMuteUI() {
  const btns = document.querySelectorAll('#mute-btn, .dialog-mute-btn');
  const icon = SoundManager.isMuted ? '🔇' : '🔊';
  btns.forEach((b) => {
    if (b) {
      b.innerText = icon;
      b.blur();
    }
  });
  handleAudioByState();
}

/**
 * Routes audio playback logic depending on visibility of the dialog overlay.
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
 * Loads persistent audio choices and triggers UI updates.
 */
function checkSavedMuteStatus() {
  if (localStorage.getItem('gameMuted') === 'true') {
    SoundManager.isMuted = true;
    if (typeof SoundManager.muteAllSounds === 'function') SoundManager.muteAllSounds();
  }
  setTimeout(() => updateMuteUI(), 50);
}

/**
 * Evaluates storage setups once document nodes finish preparing.
 */
window.addEventListener('DOMContentLoaded', checkSavedMuteStatus);

/**
 * Resets the game and returns safely to the start dialog without page reload.
 */
function resetToMainMenu() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  if (typeof MovableObject !== 'undefined') MovableObject.intervalIds = [];
  if (world) world = null;
  clearEndgameAudio();
  hideEndScreens();
  showStartDialog();
}

/**
 * Stops and resets all endgame sound tracks.
 */
function clearEndgameAudio() {
  ['gameOver', 'gameWin'].forEach((s) => {
    if (SoundManager.sounds[s]) {
      SoundManager.sounds[s].pause();
      SoundManager.sounds[s].currentTime = 0;
    }
  });
}

/**
 * Reveals the start menu overlay and triggers welcome background music.
 */
function showStartDialog() {
  const startDialog = document.getElementById('start-dialog');
  if (startDialog) startDialog.classList.remove('d-none');
  if (!SoundManager.isMuted) SoundManager.startDialogSound();
}
