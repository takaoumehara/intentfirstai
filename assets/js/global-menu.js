/* ═══════════════════════════════════════════════════════════════
   Global Menu — 6 Variations Builder
   Hydration via data-gm="pipeline|scanline|tower|orbit|cluster|whisper"
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const ITEMS = [
    { num: '01', label: 'Framework', href: 'context-grammar/index.html' },
    { num: '02', label: 'Projects',  href: 'applied/index.html' },
    { num: '03', label: 'Journal',   href: 'https://intentfirst.substack.com' },
    { num: '04', label: 'About',     href: 'about/index.html' },
    { num: '05', label: 'Contact',   href: 'mailto:takaoumehara@gmail.com' }
  ];

  const GM = {};

  /* ─── A · PIPELINE NAV ─── */
  GM.pipeline = function (root) {
    const ticksW = 580;
    const cols = ITEMS.length;
    const colW = ticksW / cols;

    let ticksSvg = '';
    for (let i = 0; i < cols; i++) {
      const x = colW * i + colW / 2;
      ticksSvg += `<line class="gma-tick" x1="${x}" y1="22" x2="${x}" y2="34" />`;
    }

    let itemsHtml = '';
    ITEMS.forEach(it => {
      const safe = String(it.label).toUpperCase();
      itemsHtml += `<a class="gm-a__item" href="${it.href}" aria-label="${safe}"><span class="gm__lbl">${safe}</span></a>`;
    });

    root.innerHTML = `
      <a class="gm__logo" href="index.html">intentfirst</a>
      <div class="gm-a__pipeline">
        <svg class="gm-a__svg" viewBox="0 0 580 56" preserveAspectRatio="none" aria-hidden="true">
          <line class="gma-spine" x1="20" y1="28" x2="${ticksW - 20}" y2="28" />
          ${ticksSvg}
          <circle class="gma-dot" cx="${colW / 2}" cy="28" r="3.5" />
        </svg>
        <div class="gm-a__items"><div class="gm-a__items-inner">${itemsHtml}</div></div>
      </div>`;

    // Scrolled state — host page scroll
    const onScroll = () => {
      if (window.scrollY > 200) root.classList.add('is-scrolled');
      else root.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* ─── B · SCANLINE DRAWER ─── */
  GM.scanline = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      listHtml += `<li class="gm-b__row"><a class="gm-b__link" href="${it.href}">
        <span class="gm-b__link-num">${it.num}</span>
        <span class="gm-b__link-lbl">${it.label}</span>
        <span class="gm-b__link-arrow">→</span>
      </a></li>`;
    });

    root.innerHTML = `
      <a class="gm__logo" href="index.html">intentfirst</a>
      <button class="gm-b__trigger" type="button" aria-label="Toggle menu" aria-expanded="false">
        MENU
        <span class="gm-b__trigger-bars" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
      <div class="gm-b__overlay" aria-hidden="true">
        <div class="gm-b__scanline" aria-hidden="true"></div>
        <ul class="gm-b__list">${listHtml}</ul>
      </div>`;

    const trigger = root.querySelector('.gm-b__trigger');
    const overlay = root.querySelector('.gm-b__overlay');
    const open = () => { root.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); overlay.setAttribute('aria-hidden', 'false'); };
    const close = () => { root.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); overlay.setAttribute('aria-hidden', 'true'); };
    trigger.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('is-open')) close(); });
  };

  /* ─── C · TOWER MENU ─── */
  GM.tower = function (root) {
    let pillsHtml = '';
    ITEMS.forEach(it => {
      pillsHtml += `<li class="gm-c__pill"><a class="gm-c__link" href="${it.href}">
        <span class="gm-c__link-num">${it.num}</span><span>${String(it.label).toUpperCase()}</span>
      </a></li>`;
    });

    root.innerHTML = `
      <a class="gm__logo" href="index.html">intentfirst</a>
      <button class="gm-c__trigger" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="gm-c__trigger-icon" aria-hidden="true"><span></span><span></span><span></span></span>
        MENU
      </button>
      <div class="gm-c__backdrop" aria-hidden="true"></div>
      <aside class="gm-c__panel" aria-hidden="true">
        <ul class="gm-c__stack">
          <span class="gm-c__marker" aria-hidden="true"></span>
          ${pillsHtml}
        </ul>
      </aside>`;

    const trigger = root.querySelector('.gm-c__trigger');
    const panel = root.querySelector('.gm-c__panel');
    const backdrop = root.querySelector('.gm-c__backdrop');
    const marker = root.querySelector('.gm-c__marker');
    const pills = root.querySelectorAll('.gm-c__pill');

    const open = () => { root.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); panel.setAttribute('aria-hidden', 'false'); };
    const close = () => { root.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); panel.setAttribute('aria-hidden', 'true'); };
    trigger.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('is-open')) close(); });

    // Marker tracks hovered pill
    pills.forEach((pill) => {
      pill.addEventListener('mouseenter', () => {
        const top = pill.offsetTop + (pill.offsetHeight - 38) / 2;
        marker.style.transform = `translateY(${top}px)`;
      });
    });
    // Initial marker position
    requestAnimationFrame(() => {
      if (pills[0]) marker.style.transform = `translateY(${pills[0].offsetTop}px)`;
    });
  };

  /* ─── D · ORBIT MENU ─── */
  GM.orbit = function (root) {
    // Distribute 5 items: 3 on outer ring, 2 on middle ring (Home stays in center as core)
    const outerItems = [ITEMS[1], ITEMS[2], ITEMS[4]]; // Projects, Journal, Contact
    const midItems   = [ITEMS[0], ITEMS[3]];           // Framework, About

    const ringSvg = (items, radius, rotorClass) => {
      let nodes = '';
      const angleStep = (Math.PI * 2) / items.length;
      items.forEach((it, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        nodes += `<a class="gm-d__node" href="${it.href}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
          <circle class="gm-d__node-dot" cx="0" cy="0" r="6" />
          <text class="gm-d__node-lbl" x="0" y="22" text-anchor="middle">${String(it.label).toUpperCase()}</text>
        </a>`;
      });
      return `<g class="gm-d__rotor gm-d__rotor--${rotorClass}">${nodes}</g>`;
    };

    root.innerHTML = `
      <a class="gm__logo" href="index.html">intentfirst</a>
      <button class="gm-d__trigger" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="gm-d__core" aria-hidden="true"></span>
      </button>
      <div class="gm-d__overlay" aria-hidden="true">
        <svg class="gm-d__svg" viewBox="-200 -150 400 300" preserveAspectRatio="xMidYMid meet">
          <g>
            <ellipse class="gmd-ring" cx="0" cy="0" rx="160" ry="100" />
            <ellipse class="gmd-ring" cx="0" cy="0" rx="100" ry="62" />
            <ellipse class="gmd-ring gmd-ring--green" cx="0" cy="0" rx="48" ry="30" />
            ${ringSvg(outerItems, 160, 'outer')}
            ${ringSvg(midItems, 100, 'mid')}
          </g>
        </svg>
      </div>`;

    const trigger = root.querySelector('.gm-d__trigger');
    const overlay = root.querySelector('.gm-d__overlay');
    const open = () => { root.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); overlay.setAttribute('aria-hidden', 'false'); };
    const close = () => { root.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); overlay.setAttribute('aria-hidden', 'true'); };
    trigger.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target.tagName === 'svg') close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('is-open')) close(); });
  };

  /* ─── E · TOKEN-CLUSTER ─── */
  GM.cluster = function (root) {
    // 5 items distributed in a pentagon arrangement around center
    const radius = 130;
    const items = ITEMS;
    let nodesSvg = '';
    let linesSvg = '';
    const angleStep = (Math.PI * 2) / items.length;
    items.forEach((it, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      linesSvg += `<line class="gm-e__line" x1="0" y1="0" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
      nodesSvg += `<a class="gm-e__node" href="${it.href}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
        <circle class="gm-e__node-dot" cx="0" cy="0" r="9" />
        <text class="gm-e__node-lbl" x="0" y="-22">${String(it.label).toUpperCase()}</text>
      </a>`;
    });

    root.innerHTML = `
      <a class="gm__logo" href="index.html">intentfirst</a>
      <button class="gm-e__trigger" type="button" aria-label="Open menu" aria-expanded="false">
        <svg class="gm-e__trigger-svg" viewBox="-12 -12 24 24" aria-hidden="true">
          <circle cx="-7" cy="-3"  r="1.5" />
          <circle cx="0"  cy="-7"  r="1.5" />
          <circle cx="7"  cy="-3"  r="1.5" />
          <circle cx="-5" cy="5"   r="1.5" />
          <circle cx="5"  cy="5"   r="1.5" />
          <circle cx="0"  cy="0"   r="2" class="gme-pulse" />
        </svg>
      </button>
      <div class="gm-e__overlay" aria-hidden="true">
        <svg class="gm-e__svg" viewBox="-200 -180 400 360" preserveAspectRatio="xMidYMid meet">
          ${linesSvg}
          <circle cx="0" cy="0" r="4" fill="var(--e-green)" />
          ${nodesSvg}
        </svg>
      </div>`;

    const trigger = root.querySelector('.gm-e__trigger');
    const overlay = root.querySelector('.gm-e__overlay');
    const open = () => { root.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); overlay.setAttribute('aria-hidden', 'false'); };
    const close = () => { root.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); overlay.setAttribute('aria-hidden', 'true'); };
    trigger.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target.tagName === 'svg') close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('is-open')) close(); });
  };

  /* ─── F · WHISPER MENU ─── */
  GM.whisper = function (root) {
    let linksHtml = '';
    ITEMS.forEach(it => {
      linksHtml += `<a class="gm-f__link" href="${it.href}">${String(it.label).toUpperCase()}</a>`;
    });

    root.innerHTML = `
      <div class="gm-f__hairline" aria-hidden="true"></div>
      <div class="gm-f__hit" aria-hidden="true"></div>
      <div class="gm-f__bar" aria-hidden="true">
        <a class="gm__logo" href="index.html">intentfirst</a>
        <nav class="gm-f__items">${linksHtml}</nav>
      </div>`;

    const hit = root.querySelector('.gm-f__hit');
    const bar = root.querySelector('.gm-f__bar');
    let closeTimer = null;

    const open = () => { clearTimeout(closeTimer); root.classList.add('is-open'); bar.setAttribute('aria-hidden', 'false'); };
    const scheduleClose = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => { root.classList.remove('is-open'); bar.setAttribute('aria-hidden', 'true'); }, 1500);
    };

    // Desktop hover (only when hover available)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mq.matches) {
      hit.addEventListener('mouseenter', open);
      bar.addEventListener('mouseenter', open);
      bar.addEventListener('mouseleave', scheduleClose);
      hit.addEventListener('mouseleave', (e) => {
        // If moving down into bar, don't schedule close
        if (e.relatedTarget && bar.contains(e.relatedTarget)) return;
        scheduleClose();
      });
    } else {
      // Touch / no-hover: tap the hit area to toggle
      hit.style.cursor = 'pointer';
      hit.addEventListener('click', () => {
        if (root.classList.contains('is-open')) {
          root.classList.remove('is-open');
          bar.setAttribute('aria-hidden', 'true');
        } else {
          open();
        }
      });
    }

    // Keyboard accessibility — focus inside bar opens it
    bar.querySelectorAll('a').forEach(a => {
      a.addEventListener('focus', open);
    });
  };

  /* ─── INIT ─── */
  const TYPE_TO_CLASS = { pipeline: 'a', scanline: 'b', tower: 'c', orbit: 'd', cluster: 'e', whisper: 'f' };

  function init(scope) {
    const ctx = scope || document;
    ctx.querySelectorAll('[data-gm]').forEach((root) => {
      if (root.dataset.gmHydrated === '1') return;
      const type = root.dataset.gm;
      const builder = GM[type];
      const suffix = TYPE_TO_CLASS[type];
      if (!builder || !suffix) return;
      root.classList.add('gm', 'gm-' + suffix);
      builder(root);
      root.dataset.gmHydrated = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  window.GlobalMenu = { init, components: GM };
})();
