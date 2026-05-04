/* ═══════════════════════════════════════════════════════════════
   Site Nav — Scan Lens (Production)
   • Renders top bar (logo + green dot trigger)
   • Renders full overlay menu with inline sub-children
   • Focus trap, Esc + click-outside close
   • Active page detection
   • Single mount: <script src="assets/js/site-nav.js" data-base="."></script>
     The data-base attribute sets the relative path prefix so the same
     menu can be loaded from any depth in the site.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const ITEMS = [
    {
      num: '01', label: 'Context Grammar', href: 'index.html#context-grammar',
      children: [
        { label: 'Intent',       href: 'context-grammar/intent/index.html' },
        { label: 'Tokens',       href: 'context-grammar/tokens/index.html' },
        { label: 'Brain',        href: 'context-grammar/brain/index.html' },
        { label: 'Rule Engine',  href: 'context-grammar/rule-engine/index.html' },
        { label: 'Specs',        href: 'context-grammar/specs/index.html' },
        { label: 'AX Patterns',  href: 'context-grammar/ax-patterns/index.html' },
        { label: 'Trust Design', href: 'context-grammar/trust-design/index.html' }
      ]
    },
    {
      num: '02', label: 'Projects', href: 'applied/index.html',
      children: [
        { label: 'P1', href: 'projects/project-01/p1-scroll-v2.html' },
        { label: 'P2', href: 'projects/project-02/p2-scroll-v2.html' },
        { label: 'P3', href: 'projects/project-03/p3-scroll.html' },
        { label: 'P4', href: 'projects/project-04/p4-scroll-v2.html' },
        { label: 'P5', href: 'projects/project-05/p5-scroll-v2.html' },
        { label: 'P6', href: 'projects/project-06/p6-life-brain-v2.html' }
      ]
    },
    { num: '03', label: 'Journal', href: 'journal/index.html' },
    { num: '04', label: 'About',   href: 'about/index.html' },
    { num: '05', label: 'Contact', href: 'mailto:takaoumehara@gmail.com', external: true }
  ];

  // Resolve base path from script's data-base attribute (defaults to '.')
  const scriptEl = document.currentScript || document.querySelector('script[src*="site-nav.js"]');
  const BASE = (scriptEl && scriptEl.getAttribute('data-base')) || '.';
  const HOME_HREF = BASE.replace(/\/$/, '') + '/index.html';

  const prefix = (href) => {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return BASE.replace(/\/$/, '') + '/' + href;
  };

  // Detect active page: compare current pathname to each item's href
  function isCurrent(href) {
    if (/^(https?:|mailto:|tel:)/.test(href)) return false;
    const target = new URL(prefix(href), location.href).pathname;
    return location.pathname === target ||
           (target.endsWith('/index.html') && location.pathname === target.replace('index.html', ''));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  }

  function build() {
    // Build rows
    let rowsHtml = '';
    ITEMS.forEach((it) => {
      const current = isCurrent(it.href) || (it.children || []).some(c => isCurrent(c.href));
      let subsHtml = '';
      if (it.children && it.children.length) {
        let lis = '';
        it.children.forEach((c) => {
          const ext = c.external ? ' target="_blank" rel="noopener"' : '';
          lis += `<li><a class="site-nav__sub" href="${prefix(c.href)}"${ext}>${escapeHtml(c.label)}</a></li>`;
        });
        subsHtml = `<ul class="site-nav__subs">${lis}</ul>`;
      } else {
        subsHtml = '<span></span>'; // grid placeholder
      }
      const ext = it.external ? ' target="_blank" rel="noopener"' : '';
      rowsHtml += `
        <li class="site-nav__row${current ? ' is-current' : ''}">
          <div class="site-nav__row-inner">
            <a class="site-nav__main" href="${prefix(it.href)}"${ext}>
              <span class="site-nav__num">${it.num}</span>
              <span class="site-nav__lbl">${escapeHtml(it.label)}</span>
            </a>
            ${subsHtml}
            <span class="site-nav__arrow" aria-hidden="true">→</span>
          </div>
        </li>`;
    });

    const root = document.createElement('div');
    root.className = 'site-nav';
    const logoBase = (BASE === '.' || BASE === '') ? '' : BASE.replace(/\/$/, '') + '/';
    root.innerHTML = `
      <div class="site-nav__bar">
        <a class="site-nav__logo" href="${HOME_HREF}" aria-label="intentfirst — home">
          <img class="logo-for-light" src="${logoBase}assets/logo/IF-lockup-black.svg" alt="intentfirst" />
          <img class="logo-for-dark"  src="${logoBase}assets/logo/IF-lockup-white.svg" alt="" aria-hidden="true" />
        </a>
        <button class="site-nav__trigger" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-haspopup="dialog">
          <span class="site-nav__dot" aria-hidden="true"></span>
          <span class="site-nav__close" aria-hidden="true"></span>
        </button>
      </div>
      <div class="site-nav__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <ul class="site-nav__list">${rowsHtml}</ul>
        <div class="site-nav__scan" aria-hidden="true"></div>
      </div>`;
    document.body.insertBefore(root, document.body.firstChild);

    return root;
  }

  function wire(root) {
    const trig = root.querySelector('.site-nav__trigger');
    const ov = root.querySelector('.site-nav__overlay');
    const focusables = () => Array.from(ov.querySelectorAll('a, button')).filter(el => el.offsetParent !== null);
    let lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      root.classList.add('is-open');
      trig.setAttribute('aria-expanded', 'true');
      trig.setAttribute('aria-label', 'Close navigation menu');
      ov.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        const f = focusables();
        if (f.length) f[0].focus();
      });
    }

    function close() {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      trig.setAttribute('aria-label', 'Open navigation menu');
      ov.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      } else {
        trig.focus();
      }
    }

    // Trigger toggle
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());

    // Esc to close
    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      // Focus trap
      if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });

    // Click on overlay background (not on links) closes
    ov.addEventListener('click', (e) => {
      if (e.target === ov || e.target.classList.contains('site-nav__list')) close();
    });
  }

  function init() {
    if (document.querySelector('.site-nav')) return; // already mounted
    const root = build();
    wire(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SiteNav = { init };
})();
