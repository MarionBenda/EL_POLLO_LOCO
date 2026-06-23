/**
 * Closes the start dialog view and initiates background gameplay environments.
 */
window.closeStartDialog = function (event) {
  const el = event.target;
  if (el.classList.contains('dialog-mute-btn')) return;
  if (document.querySelector('.dialog-content').contains(el) && !el.classList.contains('btn-restart')) return;

  SoundManager.stopDialogSound();
  if (!SoundManager.isMuted) SoundManager.playBackground();
  document.getElementById('start-dialog').classList.add('d-none');
  executeInit();
};

/**
 * Handles the first user click on the document to resume the intro dialog audio.
 * @param {MouseEvent} event - The triggering click event details.
 */
function handleFirstClick(event) {
  const dialog = document.getElementById('start-dialog');
  const isPaused = SoundManager.sounds.dialog.paused;
  if (isPaused && dialog && !dialog.classList.contains('d-none')) {
    checkAndPlayFirstClick(event.target);
  }
}

/**
 * Filters the clicked elements to play audio only on valid interaction areas.
 * @param {HTMLElement} el - The specific node element target that was clicked.
 */
function checkAndPlayFirstClick(el) {
  const isIgnored =
    el.classList.contains('btn-restart') || el.id === 'start-dialog' || el.classList.contains('dialog-mute-btn') || el.id === 'mute-btn';

  if (!isIgnored && !SoundManager.isMuted) {
    SoundManager.startDialogSound();
  }
}

/**
 * Safely executes the core game initialization function located in primary script environments.
 */
function executeInit() {
  if (typeof init === 'function') {
    init();
  } else {
    console.error('Die Funktion init() wurde in game.js nicht gefunden!');
  }
}

/**
 * Triggers initial dialog audio setups once document elements finish rendering.
 */
window.addEventListener('DOMContentLoaded', () => {
  if (!SoundManager.isMuted) SoundManager.startDialogSound();
  document.body.addEventListener('click', handleFirstClick, { once: true });
});

/**
 * This is registered globally here to ensure the HTML onclick finds it instantly.
 */
window.startGameFromMenu = function (button) {
  if (button) button.blur();
  if (typeof init === 'function') init();
  const dialog = document.getElementById('start-dialog');
  if (dialog) dialog.classList.add('d-none');
};
