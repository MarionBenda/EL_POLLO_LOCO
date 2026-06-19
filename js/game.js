let canvas;
let world;
let keyboard = new Keyboard();

function init() {
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
  MovableObject.stopAllIntervals();
  SoundManager.sounds.gameOver.pause();
  SoundManager.sounds.gameOver.currentTime = 0;
  SoundManager.sounds.gameWin.pause();
  SoundManager.sounds.gameWin.currentTime = 0;
  SoundManager.playBackground();

  document.getElementById('game-over-screen').classList.add('d-none');
  document.getElementById('you-won-screen').classList.add('d-none');
  document.getElementById('restart-container').classList.add('d-none');

  initLevel();

  setTimeout(() => {
    world = new World(canvas, keyboard);
  }, 50);
}

function toggleFullscreen() {
  let element = document.querySelector('.canvas-wrapper');
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => console.warn(`Vollbild fehlgeschlagen: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyF' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    toggleFullscreen();
  }
});

function toggleGameMute() {
  SoundManager.toggleMute();
  const muteBtn = document.getElementById('mute-btn');
  if (muteBtn) {
    muteBtn.innerText = SoundManager.isMuted ? '🔇' : '🔊';
    muteBtn.classList.toggle('muted', SoundManager.isMuted);
    muteBtn.blur();
  }
}
