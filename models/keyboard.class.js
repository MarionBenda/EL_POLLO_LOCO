class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Binds keydown and keyup listeners to handle keyboard inputs.
   */
  bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  /**
   * Maps active pressed keys to their respective movement flags.
   */
  handleKeyDown(e) {
    if (e.code === 'ArrowRight') this.RIGHT = true;
    if (e.code === 'ArrowLeft') this.LEFT = true;
    if (e.code === 'Space') this.SPACE = true;
    if (e.code === 'ArrowUp') this.UP = true;
    if (e.code === 'ArrowDown') this.DOWN = true;
    if (e.code === 'KeyD') this.D = true;
  }

  /**
   * Resets active movement flags once keys are released.
   */
  handleKeyUp(e) {
    if (e.code === 'ArrowRight') this.RIGHT = false;
    if (e.code === 'ArrowLeft') this.LEFT = false;
    if (e.code === 'Space') this.SPACE = false;
    if (e.code === 'ArrowUp') this.UP = false;
    if (e.code === 'ArrowDown') this.DOWN = false;
    if (e.code === 'KeyD') this.D = false;
  }

  /**
   * Binds mobile touch gestures to UI elements using non-passive options.
   */

  // prettier-ignore
  bindTouchEvents() {
    ['LEFT', 'RIGHT', 'SPACE', 'D'].forEach(key => {
      const el = document.getElementById(key);
      if (!el) return;
      el.addEventListener('touchstart', e => {
        if (document.getElementById('start-dialog').classList.contains('d-none')) { e.preventDefault(); this[key] = true; }
      }, { passive: false });
      ['touchend', 'touchcancel'].forEach(evt => el.addEventListener(evt, e => { e.preventDefault(); this[key] = false; }, { passive: false }));
      el.addEventListener('click', e => { if (e.cancelable) e.preventDefault(); e.stopPropagation(); });
    });
  }
}
