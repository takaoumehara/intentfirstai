/* ═══════════════════════════════════════════════════════════════
   Global Menu v3 — ThinkMap + Mouse-Travel Fix Builders
   Slugs: thinkmap-pentagon · thinkmap-scatter · thinkmap-recenter
          anchored-dropdown · bottomright-fab · topcenter-pill
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const ITEMS = [
    { num: '01', label: 'Framework', href: 'context-grammar/index.html', children: [
      { label: 'Intent',       href: 'context-grammar/intent/index.html' },
      { label: 'Tokens',       href: 'context-grammar/tokens/index.html' },
      { label: 'Brain',        href: 'context-grammar/brain/index.html' },
      { label: 'Rule Engine',  href: 'context-grammar/rule-engine/index.html' },
      { label: 'AX Patterns',  href: 'context-grammar/ax-patterns/index.html' },
      { label: 'Trust Design', href: 'context-grammar/trust-design/index.html' }
    ]},
    { num: '02', label: 'Projects', href: 'applied/index.html', children: [
      { label: 'P1 · Living Home',   href: 'projects/project-01/p1-scroll.html' },
      { label: 'P2 · Family Trip',   href: 'projects/project-02/p2-family-trip.html' },
      { label: 'P3 · Fluid Handoff', href: 'projects/project-03/p3-scroll.html' },
      { label: 'P4 · Claims Floor',  href: 'projects/project-04/p4-scroll.html' },
      { label: 'P5 · The Field',     href: 'projects/project-05/p5-scroll.html' },
      { label: 'P6 · Life Brain',    href: 'projects/project-06/p6-life-brain.html' }
    ]},
    { num: '03', label: 'Journal', href: 'https://intentfirst.substack.com' },
    { num: '04', label: 'About',   href: 'about/index.html' },
    { num: '05', label: 'Contact', href: 'mailto:takaoumehara@gmail.com' }
  ];

  const GM3 = {};

  /* ─── Common helpers ─── */
  const escClose = (root, close) => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('is-open')) close();
    });
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs) => {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
    return el;
  };

  /* ═══ ThinkMap shared layout helper ═══
     Hub anchored near trigger (top-right of overlay).
     Items distributed in a fan arc into available space (down-left). */
  function computeLayout(overlay, count, opts) {
    opts = opts || {};
    const W = overlay.clientWidth;
    const H = overlay.clientHeight;
    // Hub at top-right (matching the trigger position)
    const hubX = W - 40;
    const hubY = 28;
    // Items radiate into down-left quadrant
    const startAngle = opts.startAngle != null ? opts.startAngle : 100; // degrees
    const endAngle   = opts.endAngle   != null ? opts.endAngle   : 250;
    const radius     = opts.radius     != null ? opts.radius     : Math.min(W, H) * 0.42;
    const positions = [];
    if (count === 1) {
      const angle = (startAngle + endAngle) / 2;
      positions.push(polar(hubX, hubY, radius, angle));
    } else {
      const step = (endAngle - startAngle) / (count - 1);
      for (let i = 0; i < count; i++) {
        const angle = startAngle + step * i + (opts.angleJitter || 0) * (Math.random() - 0.5);
        const r = radius + (opts.radiusJitter || 0) * (Math.random() - 0.5);
        positions.push(polar(hubX, hubY, r, angle));
      }
    }
    return { W, H, hubX, hubY, positions };
  }

  function polar(cx, cy, r, deg) {
    const rad = deg * Math.PI / 180;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r, angle: deg };
  }

  /* ─── T1 · Pentagon (geometric fan) ─── */
  GM3['thinkmap-pentagon'] = function (root) {
    root.innerHTML = `
      <div class="gm3__bar">
        <a class="gm3__logo" href="index.html">intentfirst</a>
        <button class="gm3__trigger-dot" type="button" aria-label="Toggle menu" aria-expanded="false"></button>
      </div>
      <div class="gm3-t1__overlay" aria-hidden="true">
        <svg class="gm3-t1__svg" preserveAspectRatio="none" aria-hidden="true"></svg>
      </div>`;

    const trig = root.querySelector('.gm3__trigger-dot');
    const ov = root.querySelector('.gm3-t1__overlay');
    const svgRoot = root.querySelector('.gm3-t1__svg');

    function render() {
      const layout = computeLayout(ov, ITEMS.length);
      svgRoot.setAttribute('viewBox', `0 0 ${layout.W} ${layout.H}`);
      svgRoot.innerHTML = '';

      // Hub dot (green, larger)
      svgRoot.appendChild(svg('circle', { cx: layout.hubX, cy: layout.hubY, r: 6, fill: 'var(--e-green)' }));

      // Lines + nodes
      ITEMS.forEach((it, i) => {
        const p = layout.positions[i];
        const line = svg('line', { class: 'gm3-t1__line', x1: layout.hubX, y1: layout.hubY, x2: p.x, y2: p.y, 'data-i': i });
        svgRoot.appendChild(line);
      });

      ITEMS.forEach((it, i) => {
        const p = layout.positions[i];
        const g = svg('a', { class: 'gm3-t1__node', href: it.href, 'data-i': i });
        const dot = svg('circle', { class: 'gm3-t1__node-dot', cx: p.x, cy: p.y, r: 9 });
        const lbl = svg('text', { class: 'gm3-t1__node-lbl', x: p.x, y: p.y - 18 });
        lbl.textContent = String(it.label).toUpperCase();
        g.appendChild(dot); g.appendChild(lbl);
        svgRoot.appendChild(g);

        // Sub-children render (hidden until hover)
        if (it.children && it.children.length) {
          const subG = svg('g', { class: 'gm3-t1__sub', 'data-parent': i });
          const subRadius = 110;
          const subSpread = 60; // degrees
          const subStart = p.angle - subSpread / 2;
          const subStep = it.children.length > 1 ? subSpread / (it.children.length - 1) : 0;
          it.children.forEach((c, j) => {
            const subAngle = subStart + subStep * j;
            const sp = polar(p.x, p.y, subRadius, subAngle);
            subG.appendChild(svg('line', { class: 'gm3-t1__sub-line', x1: p.x, y1: p.y, x2: sp.x, y2: sp.y }));
            const sub = svg('a', { href: c.href });
            sub.appendChild(svg('circle', { class: 'gm3-t1__sub-dot', cx: sp.x, cy: sp.y, r: 5 }));
            const sl = svg('text', { class: 'gm3-t1__sub-lbl', x: sp.x, y: sp.y - 12, 'text-anchor': 'middle' });
            sl.textContent = c.label.toUpperCase();
            sub.appendChild(sl);
            subG.appendChild(sub);
          });
          svgRoot.appendChild(subG);
        }
      });

      // Hover wires for sub reveal + active line
      svgRoot.querySelectorAll('.gm3-t1__node').forEach((node) => {
        const i = parseInt(node.dataset.i, 10);
        const sub = svgRoot.querySelector(`.gm3-t1__sub[data-parent="${i}"]`);
        const line = svgRoot.querySelector(`.gm3-t1__line[data-i="${i}"]`);
        node.addEventListener('mouseenter', () => {
          if (sub) sub.classList.add('is-visible');
          if (line) line.classList.add('is-active');
        });
        node.addEventListener('mouseleave', () => {
          if (sub) sub.classList.remove('is-visible');
          if (line) line.classList.remove('is-active');
        });
      });
    }

    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); ov.setAttribute('aria-hidden', 'false'); render(); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); ov.setAttribute('aria-hidden', 'true'); };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target === svgRoot) close(); });
    window.addEventListener('resize', () => { if (root.classList.contains('is-open')) render(); });
    escClose(root, close);
  };

  /* ─── T2 · Scatter (organic random-ish) ─── */
  GM3['thinkmap-scatter'] = function (root) {
    root.innerHTML = `
      <div class="gm3__bar">
        <a class="gm3__logo" href="index.html">intentfirst</a>
        <button class="gm3__trigger-dot" type="button" aria-label="Toggle menu" aria-expanded="false"></button>
      </div>
      <div class="gm3-t2__overlay" aria-hidden="true">
        <svg class="gm3-t2__svg" preserveAspectRatio="none" aria-hidden="true"></svg>
      </div>`;

    const trig = root.querySelector('.gm3__trigger-dot');
    const ov = root.querySelector('.gm3-t2__overlay');
    const svgRoot = root.querySelector('.gm3-t2__svg');

    // Pre-seeded scatter offsets (so layout is stable across opens)
    const SCATTER = [
      { angle: 105, r: 0.9 },
      { angle: 145, r: 1.05 },
      { angle: 175, r: 0.85 },
      { angle: 210, r: 1.1 },
      { angle: 245, r: 0.95 }
    ];

    function render() {
      const W = ov.clientWidth, H = ov.clientHeight;
      const hubX = W - 40, hubY = 28;
      const baseR = Math.min(W, H) * 0.42;
      svgRoot.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svgRoot.innerHTML = '';

      svgRoot.appendChild(svg('circle', { cx: hubX, cy: hubY, r: 6, fill: 'var(--e-green)' }));

      const positions = SCATTER.map(s => polar(hubX, hubY, baseR * s.r, s.angle));

      positions.forEach((p, i) => {
        // Curved connectors
        const cx = (hubX + p.x) / 2 + (Math.random() - 0.5) * 20;
        const cy = (hubY + p.y) / 2 + (Math.random() - 0.5) * 20;
        const path = svg('path', {
          class: 'gm3-t2__line',
          d: `M ${hubX} ${hubY} Q ${cx} ${cy} ${p.x} ${p.y}`,
          'data-i': i
        });
        svgRoot.appendChild(path);
      });

      ITEMS.forEach((it, i) => {
        const p = positions[i];
        const g = svg('a', { class: 'gm3-t2__node', href: it.href, 'data-i': i });
        g.appendChild(svg('circle', { class: 'gm3-t2__node-dot', cx: p.x, cy: p.y, r: 9 }));
        const lbl = svg('text', { class: 'gm3-t2__node-lbl', x: p.x, y: p.y - 18 });
        lbl.textContent = String(it.label).toUpperCase();
        g.appendChild(lbl);
        svgRoot.appendChild(g);

        if (it.children && it.children.length) {
          const subG = svg('g', { class: 'gm3-t2__sub', 'data-parent': i });
          it.children.forEach((c, j) => {
            const subAngle = p.angle + (j - it.children.length / 2 + 0.5) * 14;
            const sp = polar(p.x, p.y, 95, subAngle);
            subG.appendChild(svg('line', { class: 'gm3-t2__sub-line', x1: p.x, y1: p.y, x2: sp.x, y2: sp.y }));
            const sub = svg('a', { href: c.href });
            sub.appendChild(svg('circle', { class: 'gm3-t2__sub-dot', cx: sp.x, cy: sp.y, r: 5 }));
            const sl = svg('text', { class: 'gm3-t2__sub-lbl', x: sp.x, y: sp.y - 11 });
            sl.textContent = c.label.toUpperCase();
            sub.appendChild(sl);
            subG.appendChild(sub);
          });
          svgRoot.appendChild(subG);
        }
      });

      svgRoot.querySelectorAll('.gm3-t2__node').forEach((node) => {
        const i = parseInt(node.dataset.i, 10);
        const sub = svgRoot.querySelector(`.gm3-t2__sub[data-parent="${i}"]`);
        const line = svgRoot.querySelector(`.gm3-t2__line[data-i="${i}"]`);
        node.addEventListener('mouseenter', () => {
          if (sub) sub.classList.add('is-visible');
          if (line) line.classList.add('is-active');
        });
        node.addEventListener('mouseleave', () => {
          if (sub) sub.classList.remove('is-visible');
          if (line) line.classList.remove('is-active');
        });
      });
    }

    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); ov.setAttribute('aria-hidden', 'false'); render(); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); ov.setAttribute('aria-hidden', 'true'); };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target === svgRoot) close(); });
    window.addEventListener('resize', () => { if (root.classList.contains('is-open')) render(); });
    escClose(root, close);
  };

  /* ─── T3 · Re-center (parent click → it becomes new hub) ─── */
  GM3['thinkmap-recenter'] = function (root) {
    root.innerHTML = `
      <div class="gm3__bar">
        <a class="gm3__logo" href="index.html">intentfirst</a>
        <button class="gm3__trigger-dot" type="button" aria-label="Toggle menu" aria-expanded="false"></button>
      </div>
      <div class="gm3-t3__overlay" aria-hidden="true">
        <button class="gm3-t3__back" type="button" data-back>← Back</button>
        <svg class="gm3-t3__svg" preserveAspectRatio="none" aria-hidden="true"></svg>
      </div>`;

    const trig = root.querySelector('.gm3__trigger-dot');
    const ov = root.querySelector('.gm3-t3__overlay');
    const svgRoot = root.querySelector('.gm3-t3__svg');
    const backBtn = root.querySelector('[data-back]');

    let drilled = -1;

    function renderRoot() {
      const W = ov.clientWidth, H = ov.clientHeight;
      const hubX = W - 40, hubY = 28;
      svgRoot.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svgRoot.innerHTML = '';

      const baseR = Math.min(W, H) * 0.42;
      const startAngle = 100, endAngle = 250;
      const step = (endAngle - startAngle) / (ITEMS.length - 1);

      // Hub
      svgRoot.appendChild(svg('circle', { class: 'gm3-t3__hub', cx: hubX, cy: hubY, r: 8 }));

      ITEMS.forEach((it, i) => {
        const angle = startAngle + step * i;
        const p = polar(hubX, hubY, baseR, angle);
        svgRoot.appendChild(svg('line', { class: 'gm3-t3__line', x1: hubX, y1: hubY, x2: p.x, y2: p.y }));
        const node = svg(it.children && it.children.length ? 'g' : 'a', it.children && it.children.length
          ? { class: 'gm3-t3__node', 'data-drill': i }
          : { class: 'gm3-t3__node', href: it.href });
        node.appendChild(svg('circle', { class: 'gm3-t3__node-dot', cx: p.x, cy: p.y, r: 10 }));
        const lbl = svg('text', { class: 'gm3-t3__node-lbl', x: p.x, y: p.y - 20 });
        lbl.textContent = String(it.label).toUpperCase();
        node.appendChild(lbl);
        svgRoot.appendChild(node);
      });

      svgRoot.querySelectorAll('[data-drill]').forEach((el) => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => drillTo(parseInt(el.dataset.drill, 10)));
      });
    }

    function drillTo(i) {
      drilled = i;
      root.classList.add('is-drilled');
      const it = ITEMS[i];
      const W = ov.clientWidth, H = ov.clientHeight;
      const hubX = W / 2, hubY = H / 2;
      svgRoot.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svgRoot.innerHTML = '';

      // Center hub (the parent that became the new center)
      svgRoot.appendChild(svg('circle', { class: 'gm3-t3__hub', cx: hubX, cy: hubY, r: 12 }));
      const hubLbl = svg('text', { class: 'gm3-t3__hub-lbl', x: hubX, y: hubY + 30 });
      hubLbl.textContent = String(it.label).toUpperCase();
      svgRoot.appendChild(hubLbl);

      const baseR = Math.min(W, H) * 0.34;
      const N = it.children.length;
      const step = (Math.PI * 2) / N;
      const start = -Math.PI / 2;
      it.children.forEach((c, j) => {
        const angle = (start + step * j) * 180 / Math.PI;
        const p = polar(hubX, hubY, baseR, angle);
        svgRoot.appendChild(svg('line', { class: 'gm3-t3__line', x1: hubX, y1: hubY, x2: p.x, y2: p.y }));
        const node = svg('a', { class: 'gm3-t3__node', href: c.href });
        node.appendChild(svg('circle', { class: 'gm3-t3__node-dot', cx: p.x, cy: p.y, r: 8 }));
        const lbl = svg('text', { class: 'gm3-t3__node-lbl', x: p.x, y: p.y - 18 });
        lbl.textContent = String(c.label).toUpperCase();
        node.appendChild(lbl);
        svgRoot.appendChild(node);
      });
    }

    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); ov.setAttribute('aria-hidden', 'false'); drilled = -1; root.classList.remove('is-drilled'); renderRoot(); };
    const close = () => { root.classList.remove('is-open', 'is-drilled'); trig.setAttribute('aria-expanded', 'false'); ov.setAttribute('aria-hidden', 'true'); drilled = -1; };
    const back = () => { drilled = -1; root.classList.remove('is-drilled'); renderRoot(); };

    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    backBtn.addEventListener('click', back);
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target === svgRoot) close(); });
    window.addEventListener('resize', () => {
      if (!root.classList.contains('is-open')) return;
      if (drilled >= 0) drillTo(drilled); else renderRoot();
    });
    escClose(root, () => { if (drilled >= 0) back(); else close(); });
  };

  /* ─── M1 · Anchored dropdown ─── */
  GM3['anchored-dropdown'] = function (root) {
    let listHtml = '';
    ITEMS.forEach((it, i) => {
      const hasChildren = !!(it.children && it.children.length);
      let childHtml = '';
      if (hasChildren) {
        let inner = '';
        it.children.forEach(c => { inner += `<li class="gm3-m1__child"><a href="${c.href}">${c.label}</a></li>`; });
        childHtml = `<ul class="gm3-m1__children">${inner}</ul>`;
      }
      listHtml += `<li class="gm3-m1__row" data-row="${i}">
        ${hasChildren
          ? `<button class="gm3-m1__item" type="button" data-toggle="${i}">
              <span class="gm3-m1__num">${it.num}</span>
              <span class="gm3-m1__lbl">${it.label}</span>
              <span class="gm3-m1__chev" aria-hidden="true">→</span>
            </button>`
          : `<a class="gm3-m1__item" href="${it.href}">
              <span class="gm3-m1__num">${it.num}</span>
              <span class="gm3-m1__lbl">${it.label}</span>
              <span class="gm3-m1__chev" aria-hidden="true">→</span>
            </a>`}
        ${childHtml}
      </li>`;
    });

    root.innerHTML = `
      <div class="gm3__bar">
        <a class="gm3__logo" href="index.html">intentfirst</a>
        <button class="gm3__trigger-text" type="button" aria-label="Toggle menu" aria-expanded="false">
          MENU<span class="gm3__trigger-dot" style="margin:0;padding:0;min-width:0;min-height:0;width:8px;height:8px"></span>
        </button>
      </div>
      <div class="gm3-m1__panel" aria-hidden="true">
        <ul class="gm3-m1__list">${listHtml}</ul>
      </div>`;

    const trig = root.querySelector('.gm3__trigger-text');
    const panel = root.querySelector('.gm3-m1__panel');

    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); panel.setAttribute('aria-hidden', 'false'); };
    const close = () => {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      root.querySelectorAll('.gm3-m1__row.is-expanded').forEach(r => r.classList.remove('is-expanded'));
    };

    trig.addEventListener('click', (e) => { e.stopPropagation(); root.classList.contains('is-open') ? close() : open(); });
    document.addEventListener('click', (e) => {
      if (!root.classList.contains('is-open')) return;
      if (!panel.contains(e.target) && !trig.contains(e.target)) close();
    });
    root.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.gm3-m1__row').classList.toggle('is-expanded'));
    });
    escClose(root, close);
  };

  /* ─── M2 · Bottom-right FAB ─── */
  GM3['bottomright-fab'] = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      listHtml += `<li><a class="gm3-m2__item" href="${it.href}">
        <span class="gm3-m2__item-num">${it.num}</span>
        <span>${String(it.label).toUpperCase()}</span>
      </a></li>`;
    });

    root.innerHTML = `
      <div class="gm3-m2__top">
        <a class="gm3__logo" href="index.html">intentfirst</a>
      </div>
      <button class="gm3-m2__fab" type="button" aria-label="Toggle menu" aria-expanded="false"></button>
      <div class="gm3-m2__panel" aria-hidden="true">
        <ul class="gm3-m2__list">${listHtml}</ul>
      </div>`;

    const trig = root.querySelector('.gm3-m2__fab');
    const panel = root.querySelector('.gm3-m2__panel');
    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); panel.setAttribute('aria-hidden', 'false'); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); panel.setAttribute('aria-hidden', 'true'); };
    trig.addEventListener('click', (e) => { e.stopPropagation(); root.classList.contains('is-open') ? close() : open(); });
    document.addEventListener('click', (e) => {
      if (!root.classList.contains('is-open')) return;
      if (!panel.contains(e.target) && !trig.contains(e.target)) close();
    });
    escClose(root, close);
  };

  /* ─── M3 · Top-center pill ─── */
  GM3['topcenter-pill'] = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      listHtml += `<li><a class="gm3-m3__item" href="${it.href}">
        <span class="gm3-m3__num">${it.num}</span>
        <span>${String(it.label).toUpperCase()}</span>
      </a></li>`;
    });

    root.innerHTML = `
      <div class="gm3-m3__top">
        <a class="gm3__logo" href="index.html">intentfirst</a>
        <button class="gm3__trigger-text" type="button" aria-label="Toggle menu" aria-expanded="false">
          MENU<span class="gm3__trigger-dot" style="margin:0;padding:0;min-width:0;min-height:0;width:8px;height:8px"></span>
        </button>
        <span class="gm3-m3__top-right">v1</span>
      </div>
      <div class="gm3-m3__panel" aria-hidden="true">
        <ul class="gm3-m3__list">${listHtml}</ul>
      </div>`;

    const trig = root.querySelector('.gm3__trigger-text');
    const panel = root.querySelector('.gm3-m3__panel');
    const open = () => { root.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); panel.setAttribute('aria-hidden', 'false'); };
    const close = () => { root.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); panel.setAttribute('aria-hidden', 'true'); };
    trig.addEventListener('click', (e) => { e.stopPropagation(); root.classList.contains('is-open') ? close() : open(); });
    document.addEventListener('click', (e) => {
      if (!root.classList.contains('is-open')) return;
      if (!panel.contains(e.target) && !trig.contains(e.target)) close();
    });
    escClose(root, close);
  };

  /* ─── INIT ─── */
  const SLUG = {
    'thinkmap-pentagon':  't1',
    'thinkmap-scatter':   't2',
    'thinkmap-recenter':  't3',
    'anchored-dropdown':  'm1',
    'bottomright-fab':    'm2',
    'topcenter-pill':     'm3'
  };

  function init(scope) {
    const ctx = scope || document;
    ctx.querySelectorAll('[data-gm3]').forEach((root) => {
      if (root.dataset.gm3Hydrated === '1') return;
      const type = root.dataset.gm3;
      const builder = GM3[type];
      const slug = SLUG[type];
      if (!builder || !slug) return;
      root.classList.add('gm3', 'gm3-' + slug);
      builder(root);
      root.dataset.gm3Hydrated = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  window.GlobalMenuV3 = { init, components: GM3 };
})();
