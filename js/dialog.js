/**
 * Closes the start dialog view and initiates background gameplay environments.
 */
window.closeStartDialog = function (event) {
  const el = event.target;
  if (el.classList.contains('dialog-mute-btn')) return;
  if (document.querySelector('.dialog-content').contains(el) && !el.classList.contains('btn-restart')) return;

  if (!SoundManager.isMuted) SoundManager.playBackground();
  document.getElementById('start-dialog').classList.add('d-none');
  executeInit();
};

/**
 * Safely executes the core game initialization function located in primary script environments.
 */
function executeInit() {
  if (typeof init === 'function') init();
}

/**
 * This is registered globally here to ensure the HTML onclick finds it instantly.
 */
window.startGameFromMenu = function (button) {
  if (button) button.blur();
  if (!SoundManager.isMuted) SoundManager.playBackground();
  if (typeof init === 'function') init();
  const dialog = document.getElementById('start-dialog');
  if (dialog) dialog.classList.add('d-none');
};
