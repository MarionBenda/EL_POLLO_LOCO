let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('gameCanvas');
  world = new World(canvas, keyboard);

  console.log('My Character is', world.character);
  console.log('Enemies are', world.enemies);
  console.log('World is', world);
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

  if (e.code === 'up') {
    keyboard.UP = true;
  }

  if (e.code === 'down') {
    keyboard.DOWN = true;
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

  if (e.code === 'up') {
    keyboard.UP = false;
  }

  if (e.code === 'down') {
    keyboard.DOWN = false;
  }
});
