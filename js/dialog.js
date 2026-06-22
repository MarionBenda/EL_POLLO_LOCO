/**
 * Sets up the dialog audio on load and adds a listener for the first user click.
 */
window.addEventListener('DOMContentLoaded', () => {
  if (!SoundManager.isMuted) SoundManager.startDialogSound();
  document.body.addEventListener('click', handleFirstClick, { once: true });
});

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
 * Closes the start dialog overlay and switches audio tracks to the gameplay mode.
 * @param {MouseEvent} event - The click tracking parameters from the panel container.
 */
function closeStartDialog(event) {
  const el = event.target;
  if (el.classList.contains('dialog-mute-btn')) return;
  if (document.querySelector('.dialog-content').contains(el) && !el.classList.contains('btn-restart')) return;

  SoundManager.stopDialogSound();
  if (!SoundManager.isMuted) SoundManager.playBackground();
  document.getElementById('start-dialog').classList.add('d-none');
  executeInit();
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
