/**
 * UI Mode Controller — Universal Play / Pause / Explore
 * ═══════════════════════════════════════════════════════════
 *
 * Reads ?mode=auto|paused|static|explore from URL (default: auto).
 * Sets body[data-ui-mode="..."] so CSS can respond.
 * Injects a subtle floating toggle (top-right) unless page opts out.
 * Respects prefers-reduced-motion (forces static).
 *
 * Pages can call `window.uiMode.onChange(cb)` to react to mode changes,
 * and expose interactive elements by adding `class="ui-trigger"` +
 * `data-ui-trigger="name"` to elements users should be able to click
 * in explore mode.
 *
 * Keyboard:
 *   Space — toggle auto ↔ paused
 *   R     — reset (triggers `ui-mode:reset` event)
 *   E     — switch to explore mode
 *
 * API:
 *   window.uiMode.mode            → current mode string
 *   window.uiMode.setMode(m)      → programmatically change
 *   window.uiMode.isPlaying()     → boolean
 *   window.uiMode.onChange(cb)    → register listener
 *   window.uiMode.onReset(cb)     → register reset listener
 *   window.uiMode.onTrigger(cb)   → register explore-click listener (cb receives name)
 *
 * HTML opt-out (hide toggle entirely):
 *   <body data-ui-mode-toggle="off">
 */

(function () {
  'use strict';

  if (window.uiMode) return;  // already loaded

  const MODES = ['auto', 'paused', 'static', 'explore'];
  const VALID_URL_MODES = ['auto', 'static', 'explore'];

  // Read initial mode
  const url = new URLSearchParams(location.search);
  const urlMode = url.get('mode');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mode;
  if (reducedMotion) {
    mode = 'static';
  } else if (VALID_URL_MODES.includes(urlMode)) {
    mode = urlMode;
  } else {
    mode = 'auto';
  }

  const listeners = {
    change: [],
    reset: [],
    trigger: [],
  };

  const ctrl = {
    get mode() { return mode; },

    setMode(m) {
      if (!MODES.includes(m)) return;
      if (reducedMotion && m !== 'static') return;  // lock to static
      const prev = mode;
      mode = m;
      document.body.setAttribute('data-ui-mode', m);
      listeners.change.forEach(cb => {
        try { cb(m, prev); } catch (e) { console.error(e); }
      });
    },

    toggle() {
      if (mode === 'auto') this.setMode('paused');
      else if (mode === 'paused' || mode === 'explore') this.setMode('auto');
    },

    reset() {
      listeners.reset.forEach(cb => {
        try { cb(); } catch (e) { console.error(e); }
      });
    },

    isPlaying() { return mode === 'auto'; },

    onChange(cb) { listeners.change.push(cb); },
    onReset(cb) { listeners.reset.push(cb); },
    onTrigger(cb) { listeners.trigger.push(cb); },

    // Internal — called by trigger clicks
    _fireTrigger(name, el) {
      listeners.trigger.forEach(cb => {
        try { cb(name, el); } catch (e) { console.error(e); }
      });
    },
  };

  window.uiMode = ctrl;

  // ── Inject toggle UI ──
  function injectToggle() {
    if (document.body.dataset.uiModeToggle === 'off') return;
    if (reducedMotion) return;  // no toggle in static-forced mode

    const nav = document.createElement('div');
    nav.className = 'ui-mode';
    nav.setAttribute('aria-label', 'Animation controls');

    // Play/pause toggle
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ui-mode__btn ui-mode__btn--toggle';
    btn.setAttribute('aria-label', 'Play or pause animations');
    btn.innerHTML = `
      <svg class="ui-mode__icon-pause" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" rx="1"/>
        <rect x="14" y="4" width="4" height="16" rx="1"/>
      </svg>
      <svg class="ui-mode__icon-play" viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    `;
    btn.addEventListener('click', () => ctrl.toggle());

    // Label
    const label = document.createElement('div');
    label.className = 'ui-mode__label';
    label.innerHTML = `<span class="ui-mode__label-dot" aria-hidden="true"></span>`;

    nav.appendChild(label);
    nav.appendChild(btn);
    document.body.appendChild(nav);

    // Idle fade: show briefly on mode change, then fade
    let fadeTimer = null;
    function flash() {
      nav.classList.add('ui-mode--visible');
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => nav.classList.remove('ui-mode--visible'), 2400);
    }
    ctrl.onChange(flash);
    // Show on load
    flash();
  }

  // ── Keyboard shortcuts ──
  function bindKeys() {
    document.addEventListener('keydown', (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        ctrl.toggle();
      } else if (e.key === 'r' || e.key === 'R') {
        ctrl.reset();
      } else if (e.key === 'e' || e.key === 'E') {
        if (mode === 'explore') ctrl.setMode('auto');
        else ctrl.setMode('explore');
      }
    });
  }

  // ── Explore-mode trigger clicks ──
  function bindTriggers() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-ui-trigger]');
      if (!t) return;
      if (mode !== 'explore') return;
      const name = t.getAttribute('data-ui-trigger');
      ctrl._fireTrigger(name, t);
    });
  }

  // ── Initial state ──
  function boot() {
    document.body.setAttribute('data-ui-mode', mode);
    injectToggle();
    bindKeys();
    bindTriggers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
