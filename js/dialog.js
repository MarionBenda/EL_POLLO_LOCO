function closeStartDialog(event) {
  const dialogOverlay = document.getElementById('start-dialog');
  const dialogContent = document.querySelector('.dialog-content');
  const clickedElement = event.target;
  if (dialogContent.contains(clickedElement) && !clickedElement.classList.contains('btn-restart')) {
    return;
  }
  dialogOverlay.classList.add('d-none');
  if (typeof init === 'function') {
    init();
  } else {
    console.error('Die Funktion init() wurde in game.js nicht gefunden!');
  }
}
