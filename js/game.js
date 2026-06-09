let canvas;
let world;

function init() {
  canvas = document.getElementById('gameCanvas');
  world = new World(canvas);

  console.log('My Character is', world.myCharacter);
  console.log('Enemies are', world.enemies);
  console.log('World is', world);
}
