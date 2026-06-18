let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('gameCanvas');
  initLevel();
  world = new World(canvas, keyboard);

  console.log('My Character is', world.character);
  console.log('Enemies are', world.enemies);
  console.log('World is', world);
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
  world = new World(canvas, keyboard);
}

function toggleFullscreen() {
  let element = document.querySelector('.canvas-wrapper');

  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => {
      console.warn(`Vollbild fehlgeschlagen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
  window.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

    if (event.code === 'KeyF') {
      toggleFullscreen();
    }
  });
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (e.code === 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (e.code === 'Space') {
    keyboard.SPACE = true;
  }

  if (e.code === 'ArrowUp') {
    keyboard.UP = true;
  }

  if (e.code === 'ArrowDown') {
    keyboard.DOWN = true;
  }

  if (e.code === 'KeyD') {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (e.code === 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (e.code === 'Space') {
    keyboard.SPACE = false;
  }

  if (e.code === 'ArrowUp') {
    keyboard.UP = false;
  }

  if (e.code === 'ArrowDown') {
    keyboard.DOWN = false;
  }

  if (e.code === 'KeyD') {
    keyboard.D = false;
  }
});

function toggleGameMute() {
  SoundManager.toggleMute();

  const muteBtn = document.getElementById('mute-btn');
  if (SoundManager.isMuted) {
    muteBtn.innerText = '🔇';
    muteBtn.classList.add('muted');
  } else {
    muteBtn.innerText = '🔊';
    muteBtn.classList.remove('muted');
  }
}
