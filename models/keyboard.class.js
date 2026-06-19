class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Bind keyboard keydown/keyup events to update state flags.
   */
  bindKeyPressEvents() {
    // Arrow keys, Space and D key mapping
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowRight') this.RIGHT = true;
      if (e.code === 'ArrowLeft') this.LEFT = true;
      if (e.code === 'Space') this.SPACE = true;
      if (e.code === 'ArrowUp') this.UP = true;
      if (e.code === 'ArrowDown') this.DOWN = true;
      if (e.code === 'KeyD') this.D = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowRight') this.RIGHT = false;
      if (e.code === 'ArrowLeft') this.LEFT = false;
      if (e.code === 'Space') this.SPACE = false;
      if (e.code === 'ArrowUp') this.UP = false;
      if (e.code === 'ArrowDown') this.DOWN = false;
      if (e.code === 'KeyD') this.D = false;
    });
  }

  /**
   * Bind touch events for mobile controls to update state flags.
   */
  // prettier-ignore
  bindTouchEvents() {
  ['LEFT', 'RIGHT', 'SPACE', 'D'].forEach(key => {
    const el = document.getElementById(key);
    if (!el) return;
    el.addEventListener('touchstart', event => {
      if (document.getElementById('start-dialog').classList.contains('d-none')) { event.preventDefault(); this[key] = true; }
    }, { passive: false });
    ['touchend', 'touchcancel'].forEach(evt => el.addEventListener(evt, event => { event.preventDefault(); this[key] = false; }, { passive: false }));
    el.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); });
  });
}
}
