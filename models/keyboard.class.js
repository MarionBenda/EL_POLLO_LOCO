class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  bindKeyPressEvents() {
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

  bindTouchEvents() {
    [
      { id: 'LEFT', key: 'LEFT' },
      { id: 'RIGHT', key: 'RIGHT' },
      { id: 'SPACE', key: 'SPACE' },
      { id: 'D', key: 'D' },
    ].forEach((btn) => {
      const el = document.getElementById(btn.id);
      if (!el) return;
      el.addEventListener(
        'touchstart',
        (e) => {
          if (!document.getElementById('start-dialog').classList.contains('d-none')) return;
          e.preventDefault();
          this[btn.key] = true;
        },
        { passive: false },
      );
      el.addEventListener(
        'touchend',
        (e) => {
          e.preventDefault();
          this[btn.key] = false;
        },
        { passive: false },
      );
      el.addEventListener(
        'touchcancel',
        (e) => {
          e.preventDefault();
          this[btn.key] = false;
        },
        { passive: false },
      );
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }
}
