/* ═══════════════════════════════════════════════════════════════
   Global Menu v2 — Refined Variations Builder
   Slugs: scanline-curtain · scanline-sidescan
          orbit-drilldown · orbit-accordion · orbit-twopane
          whisper-pill   · whisper-subline
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const ITEMS = [
    { num: '01', label: 'Framework', href: 'context-grammar/index.html', children: [
      { label: 'Intent',         href: 'context-grammar/intent/index.html' },
      { label: 'Tokens',         href: 'context-grammar/tokens/index.html' },
      { label: 'Brain',          href: 'context-grammar/brain/index.html' },
      { label: 'Rule Engine',    href: 'context-grammar/rule-engine/index.html' },
      { label: 'AX Patterns',    href: 'context-grammar/ax-patterns/index.html' },
      { label: 'Trust Design',   href: 'context-grammar/trust-design/index.html' }
    ]},
    { num: '02', label: 'Projects', href: 'applied/index.html', children: [
      { label: 'P1 · The Living Home',   href: 'projects/project-01/p1-scroll.html' },
      { label: 'P2 · The Family Trip',   href: 'projects/project-02/p2-family-trip.html' },
      { label: 'P3 · Fluid Handoff',     href: 'projects/project-03/p3-scroll.html' },
      { label: 'P4 · The Claims Floor',  href: 'projects/project-04/p4-scroll.html' },
      { label: 'P5 · The Field',         href: 'projects/project-05/p5-scroll.html' },
      { label: 'P6 · Life Brain',        href: 'projects/project-06/p6-life-brain.html' }
    ]},
    { num: '03', label: 'Journal', href: 'https://intentfirst.substack.com' },
    { num: '04', label: 'About',   href: 'about/index.html' },
    { num: '05', label: 'Contact', href: 'mailto:takaoumehara@gmail.com' }
  ];

  const GMV = {};

  /* ─── helpers ─── */
  const triggerBtn = (label) => `
    <button class="gmv__trigger" type="button" aria-label="${label}" aria-expanded="false">
      <span class="gmv__trigger-dot" aria-hidden="true"></span>${label}
    </button>`;

  const escClose = (root, close) => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('is-open')) close();
    });
  };

  /* ─── S1 · Scanline Curtain ─── */
  GMV['scanline-curtain'] = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      listHtml += `<li class="gmv-s1__row"><a class="gmv-s1__link" href="${it.href}">
        <span class="gmv-s1__num">${it.num}</span>
        <span class="gmv-s1__lbl">${it.label}</span>
      </a></li>`;
    });
    root.innerHTML = `
      <div class="gmv__bar">
        <a class="gmv__logo" href="index.html">intentfirst</a>
        ${triggerBtn('MENU')}
      </div>
      <div class="gmv-s1__overlay" aria-hidden="true">
        <ul class="gmv-s1__list">${listHtml}</ul>
      </div>`;
    const trig = root.querySelector('.gmv__trigger');
    const ov = root.querySelector('.gmv-s1__overlay');
    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded','true'); ov.setAttribute('aria-hidden','false'); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded','false'); ov.setAttribute('aria-hidden','true'); };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    escClose(root, close);
  };

  /* ─── S2 · Side-Scan ─── */
  GMV['scanline-sidescan'] = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      listHtml += `<li class="gmv-s2__row"><a class="gmv-s2__link" href="${it.href}">
        <span class="gmv-s2__num">${it.num}</span>
        <span>${it.label}</span>
      </a></li>`;
    });
    root.innerHTML = `
      <div class="gmv__bar">
        <a class="gmv__logo" href="index.html">intentfirst</a>
        ${triggerBtn('MENU')}
      </div>
      <div class="gmv-s2__overlay" aria-hidden="true">
        <span class="gmv-s2__sweep" aria-hidden="true"></span>
        <ul class="gmv-s2__list">${listHtml}</ul>
      </div>`;
    const trig = root.querySelector('.gmv__trigger');
    const ov = root.querySelector('.gmv-s2__overlay');
    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded','true'); ov.setAttribute('aria-hidden','false'); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded','false'); ov.setAttribute('aria-hidden','true'); };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    escClose(root, close);
  };

  /* ─── O1 · Orbit Drill-Down ─── */
  GMV['orbit-drilldown'] = function (root) {
    let rootListHtml = '';
    ITEMS.forEach((it, i) => {
      const hasChildren = !!(it.children && it.children.length);
      rootListHtml += `<li class="gmv-o1__row">
        ${hasChildren
          ? `<button class="gmv-o1__item" type="button" data-drill="${i}">
              <span class="gmv-o1__num">${it.num}</span>
              <span class="gmv-o1__lbl">${it.label}</span>
              <span class="gmv-o1__chev" aria-hidden="true">→</span>
            </button>`
          : `<a class="gmv-o1__item" href="${it.href}">
              <span class="gmv-o1__num">${it.num}</span>
              <span class="gmv-o1__lbl">${it.label}</span>
              <span class="gmv-o1__chev" aria-hidden="true">→</span>
            </a>`}
      </li>`;
    });

    root.innerHTML = `
      <div class="gmv__bar">
        <a class="gmv__logo" href="index.html">intentfirst</a>
        ${triggerBtn('MENU')}
      </div>
      <div class="gmv-o1__overlay" aria-hidden="true">
        <div class="gmv-o1__pane gmv-o1__pane--root">
          <ul class="gmv-o1__list">${rootListHtml}</ul>
        </div>
        <div class="gmv-o1__pane gmv-o1__pane--children">
          <button class="gmv-o1__back" type="button" data-back>← Back</button>
          <p class="gmv-o1__crumb" data-crumb></p>
          <ul class="gmv-o1__list" data-children></ul>
        </div>
      </div>`;

    const trig = root.querySelector('.gmv__trigger');
    const ov = root.querySelector('.gmv-o1__overlay');
    const childList = root.querySelector('[data-children]');
    const crumb = root.querySelector('[data-crumb]');
    const back = root.querySelector('[data-back]');

    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded','true'); ov.setAttribute('aria-hidden','false'); };
    const close = () => { root.classList.remove('is-open','is-drilled'); trig.setAttribute('aria-expanded','false'); ov.setAttribute('aria-hidden','true'); };
    const drill = (i) => {
      const it = ITEMS[i];
      crumb.textContent = it.label;
      let html = '';
      it.children.forEach(c => {
        html += `<li class="gmv-o1__row"><a class="gmv-o1__item" href="${c.href}">
          <span class="gmv-o1__num">·</span>
          <span class="gmv-o1__lbl">${c.label}</span>
          <span class="gmv-o1__chev" aria-hidden="true">→</span>
        </a></li>`;
      });
      childList.innerHTML = html;
      root.classList.add('is-drilled');
    };

    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    back.addEventListener('click', () => root.classList.remove('is-drilled'));
    root.querySelectorAll('[data-drill]').forEach(btn => {
      btn.addEventListener('click', () => drill(parseInt(btn.dataset.drill, 10)));
    });
    escClose(root, () => {
      if (root.classList.contains('is-drilled')) root.classList.remove('is-drilled');
      else close();
    });
  };

  /* ─── O2 · Orbit Accordion ─── */
  GMV['orbit-accordion'] = function (root) {
    let listHtml = '';
    ITEMS.forEach((it, i) => {
      const hasChildren = !!(it.children && it.children.length);
      let childrenHtml = '';
      if (hasChildren) {
        let inner = '';
        it.children.forEach(c => {
          inner += `<li class="gmv-o2__child"><a href="${c.href}">${c.label}</a></li>`;
        });
        childrenHtml = `<ul class="gmv-o2__children">${inner}</ul>`;
      }
      listHtml += `<li class="gmv-o2__row" data-row="${i}">
        ${hasChildren
          ? `<button class="gmv-o2__item" type="button" data-toggle="${i}">
              <span class="gmv-o2__num">${it.num}</span>
              <span class="gmv-o2__lbl">${it.label}</span>
              <span class="gmv-o2__chev" aria-hidden="true">→</span>
            </button>`
          : `<a class="gmv-o2__item" href="${it.href}">
              <span class="gmv-o2__num">${it.num}</span>
              <span class="gmv-o2__lbl">${it.label}</span>
              <span class="gmv-o2__chev" aria-hidden="true">→</span>
            </a>`}
        ${childrenHtml}
      </li>`;
    });
    root.innerHTML = `
      <div class="gmv__bar">
        <a class="gmv__logo" href="index.html">intentfirst</a>
        ${triggerBtn('MENU')}
      </div>
      <div class="gmv-o2__overlay" aria-hidden="true">
        <ul class="gmv-o2__list">${listHtml}</ul>
      </div>`;

    const trig = root.querySelector('.gmv__trigger');
    const ov = root.querySelector('.gmv-o2__overlay');
    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded','true'); ov.setAttribute('aria-hidden','false'); };
    const close = () => {
      root.classList.remove('is-open'); trig.setAttribute('aria-expanded','false'); ov.setAttribute('aria-hidden','true');
      root.querySelectorAll('.gmv-o2__row.is-expanded').forEach(r => r.classList.remove('is-expanded'));
    };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    root.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.gmv-o2__row');
        row.classList.toggle('is-expanded');
      });
    });
    escClose(root, close);
  };

  /* ─── O3 · Orbit Two-Pane ─── */
  GMV['orbit-twopane'] = function (root) {
    let leftHtml = '';
    ITEMS.forEach((it, i) => {
      leftHtml += `<li><button class="gmv-o3__item" type="button" data-select="${i}" ${i === 0 ? 'data-active' : ''}>
        <span class="gmv-o3__num">${it.num}</span>
        <span class="gmv-o3__lbl">${it.label}</span>
      </button></li>`;
    });

    root.innerHTML = `
      <div class="gmv__bar">
        <a class="gmv__logo" href="index.html">intentfirst</a>
        ${triggerBtn('MENU')}
      </div>
      <div class="gmv-o3__overlay" aria-hidden="true">
        <aside class="gmv-o3__left"><ul class="gmv-o3__list">${leftHtml}</ul></aside>
        <section class="gmv-o3__right" data-right></section>
      </div>`;

    const trig = root.querySelector('.gmv__trigger');
    const ov = root.querySelector('.gmv-o3__overlay');
    const right = root.querySelector('[data-right]');
    const itemBtns = root.querySelectorAll('[data-select]');

    const renderRight = (i) => {
      const it = ITEMS[i];
      let body = '';
      if (it.children && it.children.length) {
        let lis = '';
        it.children.forEach(c => { lis += `<li><a href="${c.href}">${c.label}</a></li>`; });
        body = `<ul class="gmv-o3__children">${lis}</ul>`;
      } else {
        body = `<p class="gmv-o3__leaf">Direct link · <a href="${it.href}" style="color:var(--e-green);text-decoration:none;">Open ${it.label} →</a></p>`;
      }
      right.innerHTML = `
        <p class="gmv-o3__crumb">${it.num} · ${String(it.label).toUpperCase()}</p>
        <h2 class="gmv-o3__title">${it.label}</h2>
        ${body}`;
    };

    const select = (i) => {
      itemBtns.forEach(b => b.classList.remove('is-active'));
      itemBtns[i].classList.add('is-active');
      renderRight(i);
    };

    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded','true'); ov.setAttribute('aria-hidden','false'); select(0); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded','false'); ov.setAttribute('aria-hidden','true'); };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    itemBtns.forEach((b, i) => {
      b.addEventListener('click', () => select(i));
      b.addEventListener('mouseenter', () => select(i));
    });
    escClose(root, close);
  };

  /* ─── W1 · Whisper Pill ─── */
  GMV['whisper-pill'] = function (root) {
    let linksHtml = '';
    ITEMS.forEach(it => {
      linksHtml += `<a class="gmv-w1__link" href="${it.href}">${String(it.label).toUpperCase()}</a>`;
    });
    root.innerHTML = `
      <div class="gmv-w1__hairline" aria-hidden="true"></div>
      <div class="gmv-w1__hit" aria-hidden="true"></div>
      <div class="gmv-w1__pill" aria-hidden="true">${linksHtml}</div>`;

    const hit = root.querySelector('.gmv-w1__hit');
    const pill = root.querySelector('.gmv-w1__pill');
    let timer = null;
    const open = () => { clearTimeout(timer); root.classList.add('is-open'); pill.setAttribute('aria-hidden','false'); };
    const scheduleClose = () => { clearTimeout(timer); timer = setTimeout(() => { root.classList.remove('is-open'); pill.setAttribute('aria-hidden','true'); }, 1500); };

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mq.matches) {
      hit.addEventListener('mouseenter', open);
      pill.addEventListener('mouseenter', open);
      pill.addEventListener('mouseleave', scheduleClose);
      hit.addEventListener('mouseleave', (e) => {
        if (e.relatedTarget && pill.contains(e.relatedTarget)) return;
        scheduleClose();
      });
    } else {
      hit.style.cursor = 'pointer';
      hit.addEventListener('click', () => root.classList.contains('is-open') ? (root.classList.remove('is-open'), pill.setAttribute('aria-hidden','true')) : open());
    }
    pill.querySelectorAll('a').forEach(a => a.addEventListener('focus', open));
  };

  /* ─── W2 · Whisper Sub-line ─── */
  GMV['whisper-subline'] = function (root) {
    let linksHtml = '';
    ITEMS.forEach(it => {
      linksHtml += `<a class="gmv-w2__link" href="${it.href}">${String(it.label).toUpperCase()}</a>`;
    });
    root.innerHTML = `
      <div class="gmv-w2__hairline" aria-hidden="true"></div>
      <div class="gmv-w2__hit" aria-hidden="true"></div>
      <div class="gmv-w2__row">
        <a class="gmv-w2__brand" href="index.html">intentfirst</a>
        <nav class="gmv-w2__items">${linksHtml}</nav>
      </div>`;

    const hit = root.querySelector('.gmv-w2__hit');
    const items = root.querySelector('.gmv-w2__items');
    let timer = null;
    const open = () => { clearTimeout(timer); root.classList.add('is-open'); };
    const scheduleClose = () => { clearTimeout(timer); timer = setTimeout(() => root.classList.remove('is-open'), 1500); };
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mq.matches) {
      hit.addEventListener('mouseenter', open);
      items.addEventListener('mouseenter', open);
      items.addEventListener('mouseleave', scheduleClose);
      hit.addEventListener('mouseleave', (e) => {
        if (e.relatedTarget && items.contains(e.relatedTarget)) return;
        scheduleClose();
      });
    } else {
      hit.style.cursor = 'pointer';
      hit.addEventListener('click', () => root.classList.contains('is-open') ? root.classList.remove('is-open') : open());
    }
    items.querySelectorAll('a').forEach(a => a.addEventListener('focus', open));
  };

  /* ─── INIT ─── */
  function init(scope) {
    const ctx = scope || document;
    ctx.querySelectorAll('[data-gmv]').forEach((root) => {
      if (root.dataset.gmvHydrated === '1') return;
      const type = root.dataset.gmv;
      const builder = GMV[type];
      if (!builder) return;
      const SLUG = {
        'scanline-curtain':  's1',
        'scanline-sidescan': 's2',
        'orbit-drilldown':   'o1',
        'orbit-accordion':   'o2',
        'orbit-twopane':     'o3',
        'whisper-pill':      'w1',
        'whisper-subline':   'w2'
      };
      const slug = SLUG[type];
      if (!slug) return;
      root.classList.add('gmv', 'gmv-' + slug);
      builder(root);
      root.dataset.gmvHydrated = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  window.GlobalMenuV2 = { init, components: GMV };
})();
