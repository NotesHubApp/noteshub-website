/**
 * The theme: light, dark, or the system's, as the footer's switcher sets it.
 *
 * A file rather than an inline script, so the Content Security Policy can stay
 * at `script-src 'self'`. Loaded synchronously from <head>, so the palette is
 * right before first paint; the switcher's buttons don't exist yet at that
 * point, so their clicks are caught on `document`.
 *
 * The stored choice keeps the key and values the Next.js site used
 * (`appTheme`: `light`, `dark` or `system`), so returning visitors keep theirs.
 * `data-color-scheme` on <html> is what the stylesheet reads; `data-theme-choice`
 * marks the switcher's active button.
 */
(function () {
  var KEY = 'appTheme';
  var root = document.documentElement;
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try {
      var value = localStorage.getItem(KEY);
      return value === 'light' || value === 'dark' ? value : 'system';
    } catch (e) {
      // Storage blocked: follow the system.
      return 'system';
    }
  }

  function apply(choice) {
    root.setAttribute('data-theme-choice', choice);
    root.setAttribute('data-color-scheme', choice === 'system' ? (prefersDark.matches ? 'dark' : 'light') : choice);
    var buttons = document.querySelectorAll('[data-theme-option]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-checked', String(buttons[i].getAttribute('data-theme-option') === choice));
    }
  }

  apply(stored());

  prefersDark.addEventListener('change', function () {
    apply(stored());
  });

  document.addEventListener('DOMContentLoaded', function () {
    apply(stored());
  });

  document.addEventListener('click', function (event) {
    var target = event.target;
    var button = target && target.closest ? target.closest('[data-theme-option]') : null;
    if (!button) return;
    var choice = button.getAttribute('data-theme-option');
    try {
      localStorage.setItem(KEY, choice);
    } catch (e) {
      // Storage blocked: the choice lasts until the page is left.
    }
    apply(choice);
  });
})();
