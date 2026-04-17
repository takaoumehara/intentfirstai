/**
 * Unified Slide Deck Navigation — intentfirst.ai
 *
 * USAGE:
 *   1. <script src="/assets/js/deck-nav.js"></script>
 *   2. Required: <div id="deck"><section class="slide" id="s1">...</section></div>
 *   3. Optional: data-dark-slides="s1,s4" on #deck for explicit overrides
 *   4. Optional: window.deckNavBeforeAdvance callback for sub-state animations
 *
 * AUTO-ADAPTIVE UI:
 *   Nav elements (counter, arrows, home, dots) automatically adapt their color
 *   based on the current slide's background luminance. Works with solid colors,
 *   CSS variables, dark/light classes, and photo backgrounds.
 *
 * KEYBOARD: Space/→/↓/PgDn = next, ←/↑/PgUp = prev, Home = first
 */
(function () {
  'use strict';

  var deck = document.getElementById('deck');
  if (!deck) return;

  var slides = deck.querySelectorAll('.slide');
  var totalSlides = slides.length;
  if (totalSlides === 0) return;

  // ── Dark slide detection ──
  var darkSlideIds = [];
  var darkAttr = deck.getAttribute('data-dark-slides');
  if (darkAttr) {
    darkSlideIds = darkAttr.split(',').map(function (s) { return s.trim(); });
  }

  var darkCache = {};

  function isDarkSlide(el) {
    var id = el.id || '';

    // 1) Explicit list
    if (darkSlideIds.length > 0 && darkSlideIds.indexOf(id) !== -1) return true;

    // 2) CSS class
    if (el.classList.contains('slide-dark') ||
        el.classList.contains('slide--dark') ||
        el.classList.contains('slide-hero') ||
        el.classList.contains('slide--hero') ||
        el.classList.contains('slide-dark-2col') ||
        el.classList.contains('sec-dark')) {
      return true;
    }

    // 3) Background image (photo slides with overlay = dark)
    var bgImage = el.style.backgroundImage || '';
    if (bgImage && bgImage !== 'none') return true;
    if (el.querySelector('.slide-bg')) return true;

    // 4) Computed luminance
    if (id && darkCache.hasOwnProperty(id)) return darkCache[id];
    var bg = getComputedStyle(el).backgroundColor;
    var match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      var alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
      // Transparent or near-transparent → not dark (assume light page background)
      if (alpha < 0.1) {
        if (id) darkCache[id] = false;
        return false;
      }
      var r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
      var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      var result = luminance < 0.45;
      if (id) darkCache[id] = result;
      return result;
    }

    return false;
  }

  // ── Inject styles ──
  if (!document.getElementById('deck-nav-styles')) {
    var style = document.createElement('style');
    style.id = 'deck-nav-styles';
    style.textContent = [
      /* Hint — left bottom, arrow keys + space */
      '.dn-hint{position:fixed;bottom:24px;left:20px;z-index:300;display:flex;align-items:center;gap:14px;padding:12px 20px;border-radius:14px;font-family:var(--font-ui,var(--mono,monospace));font-size:12px;transition:opacity .6s ease;pointer-events:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}',
      '.dn-hint.on-dark{color:rgba(255,255,255,.5);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}',
      '.dn-hint.on-light{color:#8a8078;background:#f0ece4;border:1px solid #d5d0c8;box-shadow:0 2px 8px rgba(0,0,0,.06)}',
      '.dn-hint.hidden{opacity:0}',
      /* Arrow key grid */
      '.dn-arrows-grid{display:grid;grid-template-columns:repeat(3,20px);grid-template-rows:repeat(2,20px);gap:2px}',
      '.dn-kg{width:20px;height:20px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;line-height:1}',
      '.dn-hint.on-dark .dn-kg{background:rgba(255,255,255,.06);color:rgba(255,255,255,.2)}',
      '.dn-hint.on-dark .dn-kg.dn-hi{background:rgba(255,255,255,.15);color:rgba(255,255,255,.7)}',
      '.dn-hint.on-light .dn-kg{background:#e5e0d8;color:#a09890}',
      '.dn-hint.on-light .dn-kg.dn-hi{background:#d5d0c8;color:#6b6560}',
      /* Space key */
      '.dn-space{padding:4px 16px;border-radius:6px;font-weight:500;font-size:11px;letter-spacing:1px}',
      '.dn-hint.on-dark .dn-space{background:rgba(255,255,255,.15);color:rgba(255,255,255,.7)}',
      '.dn-hint.on-light .dn-space{background:#d5d0c8;color:#6b6560}',
      '.dn-hint-text{font-size:11px;font-weight:400;letter-spacing:.5px}',
      '@media(max-width:768px){.dn-hint{left:12px;bottom:16px;padding:8px 14px;gap:10px}.dn-arrows-grid{grid-template-columns:repeat(3,16px);grid-template-rows:repeat(2,16px)}.dn-kg{width:16px;height:16px;font-size:8px}.dn-space{padding:3px 10px;font-size:9px}}',

      /* Bottom-right nav group */
      '.dn-bottom{position:fixed;right:20px;bottom:24px;z-index:300;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:12px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:background .4s ease,border-color .4s ease}',
      '.dn-bottom.on-dark{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}',
      '.dn-bottom.on-light{background:rgba(26,24,22,.07);border:1px solid rgba(26,24,22,.12);box-shadow:0 2px 12px rgba(0,0,0,.06)}',

      '.dn-counter{font-family:var(--font-ui,var(--mono,monospace));font-size:13px;letter-spacing:1px;transition:color .4s ease;user-select:none;min-width:56px;text-align:center}',
      '.dn-bottom.on-dark .dn-counter{color:rgba(255,255,255,.4)}',
      '.dn-bottom.on-light .dn-counter{color:#4a4540}',

      /* Navigation arrows */
      '.dn-arr{width:32px;height:32px;border:none;border-radius:8px;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease}',
      '.dn-arr:hover{background:rgba(128,128,128,.12)}',
      '.dn-arr svg{width:16px;height:16px;transition:stroke .4s ease}',
      '.dn-bottom.on-dark .dn-arr svg{stroke:rgba(255,255,255,.6)}',
      '.dn-bottom.on-light .dn-arr svg{stroke:#4a4540}',

      /* Home button */
      '.dn-home{position:fixed;right:16px;top:24px;z-index:300;width:36px;height:36px;border:none;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease}',
      '.dn-home:hover{opacity:1}',
      '.dn-home svg{width:16px;height:16px;transition:stroke .4s ease}',
      '.dn-home.on-dark{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);opacity:.6}',
      '.dn-home.on-dark svg{stroke:rgba(255,255,255,.7)}',
      '.dn-home.on-light{background:rgba(26,24,22,.07);border:1px solid rgba(26,24,22,.12);box-shadow:0 2px 12px rgba(0,0,0,.06);opacity:1}',
      '.dn-home.on-light svg{stroke:#4a4540}',

      /* Progress rail */
      '.dn-rail{position:fixed;right:14px;top:50%;transform:translateY(-50%);z-index:300;display:flex;flex-direction:column;gap:5px}',
      '.dn-dot{width:7px;height:7px;border-radius:50%;cursor:pointer;transition:all .3s cubic-bezier(.16,1,.3,1)}',
      '.dn-dot:hover{transform:scale(1.4)}',
      '.dn-dot.active{transform:scale(1.6)}',
      '.dn-dot.on-dark{background:rgba(255,255,255,.15)}',
      '.dn-dot.on-dark.active{background:rgba(255,255,255,.6)}',
      '.dn-dot.on-light{background:rgba(26,24,22,.2)}',
      '.dn-dot.on-light.active{background:#4a4540}',

      /* Mobile: hide rail + home, keep bottom nav */
      '@media(max-width:768px){.dn-rail{display:none}.dn-home{display:none}.dn-bottom{right:12px;bottom:16px;padding:4px 8px}.dn-counter{font-size:11px;min-width:44px}.dn-arr{width:28px;height:28px}}',

      /* Free-scroll mode */
      'body.dn-free-scroll{overflow:auto!important;height:auto!important}',
      'body.dn-free-scroll #deck{height:auto!important;overflow:visible!important;scroll-snap-type:none!important}',
      'body.dn-free-scroll .slide{scroll-snap-align:none!important}',
      'body.dn-free-scroll #explore{display:block!important}',
      'body.dn-free-scroll .dn-hint,body.dn-free-scroll .dn-bottom,body.dn-free-scroll .dn-rail,body.dn-free-scroll .dn-home{display:none!important}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ── SVG icons ──
  var svgPrev = '<svg viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var svgNext = '<svg viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var svgHome = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5V13h4v-3h2v3h4V8.5M1.5 9L8 3l6.5 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // ── Create UI elements ──
  var hint = document.createElement('div');
  hint.className = 'dn-hint';
  hint.innerHTML = [
    '<div class="dn-arrows-grid">',
      '<div></div><div class="dn-kg">\u2191</div><div></div>',
      '<div class="dn-kg">\u2190</div><div class="dn-kg dn-hi">\u2193</div><div class="dn-kg dn-hi">\u2192</div>',
    '</div>',
    '<span class="dn-space">SPACE</span>',
    '<span class="dn-hint-text">to advance</span>'
  ].join('');
  document.body.appendChild(hint);

  var bottom = document.createElement('div');
  bottom.className = 'dn-bottom';

  var prevBtn = document.createElement('button');
  prevBtn.className = 'dn-arr';
  prevBtn.title = 'Previous slide';
  prevBtn.innerHTML = svgPrev;

  var counter = document.createElement('div');
  counter.className = 'dn-counter';
  counter.textContent = '1 / ' + totalSlides;

  var nextBtn = document.createElement('button');
  nextBtn.className = 'dn-arr';
  nextBtn.title = 'Next slide';
  nextBtn.innerHTML = svgNext;

  bottom.appendChild(prevBtn);
  bottom.appendChild(counter);
  bottom.appendChild(nextBtn);
  document.body.appendChild(bottom);

  var home = document.createElement('button');
  home.className = 'dn-home';
  home.title = 'Back to first slide';
  home.innerHTML = svgHome;
  document.body.appendChild(home);

  var rail = document.createElement('div');
  rail.className = 'dn-rail';
  for (var pi = 0; pi < totalSlides; pi++) {
    var dot = document.createElement('div');
    dot.className = 'dn-dot';
    dot.setAttribute('data-idx', pi);
    dot.addEventListener('click', (function (idx) {
      return function () { goToSlide(idx); };
    })(pi));
    rail.appendChild(dot);
  }
  document.body.appendChild(rail);

  // ── State ──
  var hintGone = false;

  // ── Helpers ──
  function getCurrentIndex() {
    var idx = Math.round(deck.scrollTop / window.innerHeight);
    return Math.min(Math.max(idx, 0), totalSlides - 1);
  }

  function goToSlide(idx) {
    idx = Math.min(Math.max(idx, 0), totalSlides - 1);
    slides[idx].scrollIntoView({ behavior: 'smooth' });
    dismissHint();
  }

  function dismissHint() {
    if (!hintGone) {
      hintGone = true;
      hint.classList.add('hidden');
    }
  }

  function updateTheme() {
    var idx = getCurrentIndex();
    var dark = isDarkSlide(slides[idx]);
    var mode = dark ? 'on-dark' : 'on-light';
    var oldMode = dark ? 'on-light' : 'on-dark';

    // Bottom nav group
    bottom.classList.remove(oldMode);
    bottom.classList.add(mode);
    counter.textContent = (idx + 1) + ' / ' + totalSlides;

    // Hint
    if (!hintGone) {
      hint.classList.remove(oldMode);
      hint.classList.add(mode);
    }

    // Home
    home.classList.remove(oldMode);
    home.classList.add(mode);

    // Dots
    var dots = rail.querySelectorAll('.dn-dot');
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('active', d === idx);
      dots[d].classList.remove(oldMode);
      dots[d].classList.add(mode);
    }
  }

  function advance() {
    var idx = getCurrentIndex();
    if (typeof window.deckNavBeforeAdvance === 'function') {
      if (window.deckNavBeforeAdvance(slides[idx], idx) === false) return;
    }
    if (idx >= totalSlides - 1) {
      enterFreeScroll();
      return;
    }
    goToSlide(idx + 1);
  }

  function retreat() {
    goToSlide(getCurrentIndex() - 1);
  }

  function goHome() {
    goToSlide(0);
  }

  function enterFreeScroll() {
    var explore = document.getElementById('explore');
    if (!explore) return;
    document.body.classList.add('dn-free-scroll');
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    setTimeout(function () {
      explore.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    explore.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  }

  // ── Events ──
  deck.addEventListener('scroll', function () {
    updateTheme();
    var nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', getCurrentIndex() > 0);
  });
  updateTheme();

  // Auto-dismiss hint after 3 seconds
  setTimeout(function() { dismissHint(); }, 3000);

  document.addEventListener('keydown', function (e) {
    if (document.body.classList.contains('dn-free-scroll')) return;
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      advance();
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      retreat();
    }
    if (e.key === 'Home') {
      e.preventDefault();
      goHome();
    }
  });

  prevBtn.addEventListener('click', retreat);
  nextBtn.addEventListener('click', advance);
  home.addEventListener('click', goHome);

  // Scroll reveal — observe both .reveal elements AND .slide-inner (which uses opacity:0 → visible)
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { root: deck, threshold: 0.1 });
  deck.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });
  deck.querySelectorAll('.slide-inner').forEach(function (el) { revealObs.observe(el); });
  deck.querySelectorAll('.stagger').forEach(function (el) { revealObs.observe(el); });

  // ── Expose ──
  window.deckNav = {
    advance: advance,
    retreat: retreat,
    goToSlide: goToSlide,
    goHome: goHome,
    getCurrentIndex: getCurrentIndex,
    enterFreeScroll: enterFreeScroll
  };

})();
