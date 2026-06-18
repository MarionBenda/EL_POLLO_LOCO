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
  document.getElementById('game-over-screen').classList.add('d-none');
  document.getElementById('you-won-screen').classList.add('d-none');
  initLevel();
  world = new World(canvas, keyboard);
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
