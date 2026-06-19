// On DOM ready: ensure dialog sound starts and resumes on first user click.
window.addEventListener('DOMContentLoaded', () => {
  SoundManager.startDialogSound();

  document.body.addEventListener(
    'click',
    (event) => {
      const dialog = document.getElementById('start-dialog');
      const clickedElement = event.target;
      const isStartButtonClick = clickedElement.classList.contains('btn-restart');
      const isOverlayClick = clickedElement.id === 'start-dialog';

      if (SoundManager.sounds.dialog.paused && dialog && !dialog.classList.contains('d-none')) {
        if (!isStartButtonClick && !isOverlayClick) {
          SoundManager.startDialogSound();
        }
      }
    },
    { once: true },
  );
});

/**
 * Close the start dialog overlay, stop dialog audio and start the game.
 * @param {MouseEvent|TouchEvent} event - The triggering event from click/tap.
 */
function closeStartDialog(event) {
  const dialogOverlay = document.getElementById('start-dialog');
  const dialogContent = document.querySelector('.dialog-content');
  const clickedElement = event.target;

  if (dialogContent.contains(clickedElement) && !clickedElement.classList.contains('btn-restart')) {
    return;
  }

  SoundManager.stopDialogSound();
  SoundManager.playBackground();

  dialogOverlay.classList.add('d-none');

  if (typeof init === 'function') {
    init();
  } else {
    console.error('Die Funktion init() wurde in game.js nicht gefunden!');
  }
}
