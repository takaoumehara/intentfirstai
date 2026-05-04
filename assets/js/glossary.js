/* ───────────────────────────────────────────────────────
   Context Grammar — Glossary popover (site-wide)
   No dependencies. Click to open. Esc / outside-click closes.

   Usage in any HTML:
     <link rel="stylesheet" href="[rel]/assets/css/glossary.css">
     <script src="[rel]/assets/js/glossary.js" defer></script>

   In page copy, wrap term mentions:
     <span data-term="autonomy-dial">Autonomy Dial</span>

   Data: /assets/data/glossary-data.json
   Each entry supports:
     - name      (string)  display heading; falls back to slug
     - short     (string)  primary definition (preferred)
     - en / ja   (string)  legacy fallback definition (lang-aware)
     - category  (string)  optional, "grammar" | "brain" | "intent"
     - metaphor  (string)  optional restaurant metaphor (italic block)
     - more      (string)  optional URL for "Read more"
   ─────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── language: en | ja (from <html lang="">) ──
  const lang = document.documentElement.lang === 'ja' ? 'ja' : 'en';

  // ── resolve glossary-data.json relative to this script's location ──
  const DATA_URL = (function () {
    const scripts = document.getElementsByTagName('script');
    const me = scripts[scripts.length - 1];
    const src = me && me.src;
    if (src) return src.replace(/\/js\/glossary\.js.*$/, '/data/glossary-data.json');
    return '/assets/data/glossary-data.json';
  })();

  let GLOSSARY = null;
  let popover = null;
  let backdrop = null;
  let activeTerm = null;
  let loadPromise = null;

  function ensureLoaded() {
    if (GLOSSARY) return Promise.resolve(GLOSSARY);
    if (loadPromise) return loadPromise;
    loadPromise = fetch(DATA_URL, { cache: 'force-cache' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('glossary fetch failed: ' + r.status)))
      .then(data => { GLOSSARY = data; return data; })
      .catch(err => { console.warn('[glossary]', err); return null; });
    return loadPromise;
  }

  function ensurePopoverDOM() {
    if (popover) return;
    backdrop = document.createElement('div');
    backdrop.className = 'cg-popover-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.addEventListener('click', closePopover);
    document.body.appendChild(backdrop);

    popover = document.createElement('div');
    popover.className = 'cg-popover';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-modal', 'false');
    popover.innerHTML =
      '<div class="cg-popover__head">' +
        '<h4 class="cg-popover__name"></h4>' +
        '<button class="cg-popover__close" type="button" aria-label="Close"></button>' +
      '</div>' +
      '<p class="cg-popover__body"></p>' +
      '<p class="cg-popover__metaphor" hidden></p>' +
      '<a class="cg-popover__more" hidden></a>';
    document.body.appendChild(popover);

    popover.querySelector('.cg-popover__close').addEventListener('click', closePopover);
    popover.addEventListener('click', e => e.stopPropagation());
  }

  function closePopover() {
    if (!popover) return;
    popover.setAttribute('data-open', 'false');
    if (backdrop) backdrop.setAttribute('data-open', 'false');
    if (activeTerm) {
      activeTerm.removeAttribute('data-term-active');
      activeTerm = null;
    }
  }

  function positionPopover(triggerEl) {
    if (window.matchMedia('(max-width: 600px)').matches) {
      popover.style.top = '';
      popover.style.left = '';
      return;
    }
    const rect = triggerEl.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    const margin = 12;

    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX;
    let placement = 'top'; // arrow points up

    if (rect.bottom + popRect.height + 24 > window.innerHeight) {
      top = rect.top + window.scrollY - popRect.height - 10;
      placement = 'bottom';
    }
    const maxLeft = window.scrollX + window.innerWidth - popRect.width - margin;
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + margin) left = window.scrollX + margin;

    popover.style.top = top + 'px';
    popover.style.left = left + 'px';
    popover.setAttribute('data-placement', placement);

    const arrowX = Math.max(12, Math.min(rect.left + window.scrollX - left + (rect.width / 2) - 6, popRect.width - 24));
    popover.style.setProperty('--arrow-x', arrowX + 'px');
  }

  function slugToTitle(slug) {
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function openPopover(triggerEl, slug) {
    ensurePopoverDOM();

    ensureLoaded().then(data => {
      if (!data) return;
      let entry = data[slug];
      // Resolve aliases (one hop, no chains)
      if (entry && entry.alias_of && data[entry.alias_of]) {
        entry = data[entry.alias_of];
      }
      if (!entry) {
        console.warn('[glossary] term not found:', slug);
        return;
      }

      const name = entry.name || slugToTitle(slug);
      const body = entry.short || entry[lang] || entry.en || '';
      const metaphor = entry.metaphor || '';
      const more = entry.more || '';

      popover.querySelector('.cg-popover__name').textContent = name;
      popover.querySelector('.cg-popover__body').textContent = body;

      const metaphorEl = popover.querySelector('.cg-popover__metaphor');
      if (metaphor) {
        metaphorEl.textContent = metaphor;
        metaphorEl.hidden = false;
      } else {
        metaphorEl.hidden = true;
      }

      const moreEl = popover.querySelector('.cg-popover__more');
      if (more) {
        moreEl.textContent = lang === 'ja' ? '詳しく読む' : 'Read more';
        moreEl.href = more;
        moreEl.hidden = false;
      } else {
        moreEl.hidden = true;
      }

      popover.setAttribute('data-open', 'true');
      if (backdrop) backdrop.setAttribute('data-open', 'true');

      if (activeTerm) activeTerm.removeAttribute('data-term-active');
      activeTerm = triggerEl;
      triggerEl.setAttribute('data-term-active', 'true');

      requestAnimationFrame(() => positionPopover(triggerEl));
    });
  }

  function onTermActivate(triggerEl) {
    const slug = triggerEl.getAttribute('data-term');
    if (activeTerm === triggerEl && popover && popover.getAttribute('data-open') === 'true') {
      closePopover();
    } else {
      openPopover(triggerEl, slug);
    }
  }

  function onDocClick(e) {
    const termEl = e.target.closest('[data-term]');
    if (termEl) {
      e.preventDefault();
      e.stopPropagation();
      onTermActivate(termEl);
      return;
    }
    if (!popover || popover.getAttribute('data-open') !== 'true') return;
    if (e.target.closest('.cg-popover')) return;
    closePopover();
  }

  function onKey(e) {
    if (e.key === 'Escape') closePopover();
  }

  function onScrollOrResize() {
    if (!popover || popover.getAttribute('data-open') !== 'true' || !activeTerm) return;
    if (window.matchMedia('(max-width: 600px)').matches) return;
    positionPopover(activeTerm);
  }

  function init() {
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    document.querySelectorAll('[data-term]').forEach(el => {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      if (!el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', (lang === 'ja' ? '用語の説明: ' : 'Definition: ') + (el.textContent || el.getAttribute('data-term')));
      }
      el.addEventListener('keydown', evt => {
        if (evt.key === 'Enter' || evt.key === ' ') {
          evt.preventDefault();
          onTermActivate(el);
        }
      });
    });

    // Preload data on first idle so first click is instant
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => ensureLoaded(), { timeout: 2000 });
    } else {
      setTimeout(() => ensureLoaded(), 1500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
