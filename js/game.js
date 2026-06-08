let Canvas;
let ctx;
let world = new World();

function init() {
  Canvas = document.getElementById('gameCanvas');
  ctx = Canvas.getContext('2d');
  console.log('My Character is', world.myCharacter);
  console.log('Enemies are', world.enemies);
  console.log('World is', world);
}
