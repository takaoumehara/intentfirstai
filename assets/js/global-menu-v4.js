/* ═══════════════════════════════════════════════════════════════
   Global Menu v4 — Builders
   Slugs: thinkmap-arc-pentagon · thinkmap-arc-scatter
          big-right · lens-stack · lens-scan · lens-orbit
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const ITEMS = [
    { num: '01', label: 'Framework', href: 'context-grammar/index.html', children: [
      { label: 'Intent',       href: 'context-grammar/intent/index.html' },
      { label: 'Signals',      href: 'context-grammar/signals/index.html' },
      { label: 'Dials',        href: 'context-grammar/dials/index.html' },
      { label: 'Brain',        href: 'context-grammar/brain/index.html' },
      { label: 'Rule Engine',  href: 'context-grammar/rule-engine/index.html' },
      { label: 'AX Patterns',  href: 'context-grammar/ax-patterns/index.html' },
      { label: 'Trust',        href: 'context-grammar/trust/index.html' }
    ]},
    { num: '02', label: 'Projects', href: 'applied/index.html', children: [
      { label: 'P1 · Living Home',   href: 'projects/project-01/index.html' },
      { label: 'P2 · Family Trip',   href: 'projects/project-02/index.html' },
      { label: 'P3 · Fluid Handoff', href: 'projects/project-03/index.html' },
      { label: 'P4 · Claims Floor',  href: 'projects/project-04/index.html' },
      { label: 'P5 · The Field',     href: 'projects/project-05/index.html' },
      { label: 'P6 · Life Brain',    href: 'projects/project-06/index.html' }
    ]},
    { num: '03', label: 'Journal', href: 'https://intentfirst.substack.com' },
    { num: '04', label: 'About',   href: 'about/index.html' },
    { num: '05', label: 'Contact', href: 'mailto:takaoumehara@gmail.com' }
  ];

  const GM4 = {};
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function svg(tag, attrs, kids) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (kids) kids.forEach(k => el.appendChild(k));
    return el;
  }
  function polar(cx, cy, r, deg) {
    const rad = deg * Math.PI / 180;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r, angle: deg };
  }
  function escClose(root, close) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('is-open')) close();
    });
  }

  /* ─── Trigger button helper ─── */
  function triggerDot(label) {
    return `<button class="gm4__trigger-dot" type="button" aria-label="${label}" aria-expanded="false" aria-haspopup="menu"></button>`;
  }

  /* ═══════════════════════════════════════════════════════════════
     T-A · ThinkMap Arc Pentagon
     Items: 5 in 75° arc bottom-left of dot, subs always visible
     ═══════════════════════════════════════════════════════════════ */
  function buildThinkMapArc(root, scope) {
    const cls = scope; // 'ta' or 'tb'
    root.innerHTML = `
      <div class="gm4__bar">
        <a class="gm4__logo" href="index.html">intentfirst</a>
        ${triggerDot('Toggle navigation menu')}
      </div>
      <div class="gm4-${cls}__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <svg class="gm4-${cls}__svg" preserveAspectRatio="none" aria-hidden="true"></svg>
      </div>`;

    const trig = root.querySelector('.gm4__trigger-dot');
    const ov = root.querySelector(`.gm4-${cls}__overlay`);
    const svgRoot = root.querySelector(`.gm4-${cls}__svg`);

    // Pre-seeded scatter offsets for T-B
    const SCATTER = [
      { da: -2,  dr: -8 },
      { da:  4,  dr:  6 },
      { da: -3,  dr: -4 },
      { da:  5,  dr:  10 },
      { da: -4,  dr: -2 }
    ];

    function render() {
      const W = ov.clientWidth, H = ov.clientHeight;
      const hubX = W - 40, hubY = 28;
      svgRoot.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svgRoot.innerHTML = '';

      // Hub dot (green, the trigger position)
      svgRoot.appendChild(svg('circle', { cx: hubX, cy: hubY, r: 6, fill: 'var(--e-green)' }));

      // Layout: 75° arc, bottom-left of dot
      // Angles 100° → 175° (75° span), step = 75/4 = 18.75°
      const startAngle = 100, endAngle = 175;
      const baseR = Math.min(Math.min(W, H) * 0.42, 280);

      const positions = [];
      for (let i = 0; i < ITEMS.length; i++) {
        const t = i / (ITEMS.length - 1);
        let angle = startAngle + (endAngle - startAngle) * t;
        let r = baseR;
        if (scope === 'tb') {
          angle += SCATTER[i].da;
          r += SCATTER[i].dr;
        }
        positions.push(polar(hubX, hubY, r, angle));
      }

      // Render lines (with stroke-dashoffset draw-in)
      ITEMS.forEach((it, i) => {
        const p = positions[i];
        const dx = p.x - hubX, dy = p.y - hubY;
        const len = Math.sqrt(dx * dx + dy * dy);
        let line;
        if (scope === 'tb') {
          // Curved Bezier
          const mx = (hubX + p.x) / 2 + (i % 2 ? 18 : -12);
          const my = (hubY + p.y) / 2 + (i % 2 ? -8 : 14);
          line = svg('path', {
            class: `gm4-${cls}__line`,
            d: `M ${hubX} ${hubY} Q ${mx} ${my} ${p.x} ${p.y}`,
            'data-i': i,
            style: `--len:${len + 60}px;`
          });
        } else {
          line = svg('line', {
            class: `gm4-${cls}__line`,
            x1: hubX, y1: hubY, x2: p.x, y2: p.y,
            'data-i': i,
            style: `--len:${len}px;`
          });
        }
        svgRoot.appendChild(line);
      });

      // Render main nodes (with hit area + visible dot + label)
      ITEMS.forEach((it, i) => {
        const p = positions[i];
        const safeLabel = String(it.label).toUpperCase();
        const a = svg('a', {
          class: `gm4-${cls}__node`,
          href: it.href,
          'data-i': i,
          tabindex: '0',
          role: 'menuitem',
          'aria-label': `${safeLabel}${it.children ? ', has submenu' : ''}`
        });
        // Invisible 48px hit area (a11y tap target)
        a.appendChild(svg('circle', { cx: p.x, cy: p.y, r: 24, fill: 'transparent' }));
        // Visible dot
        a.appendChild(svg('circle', { class: `gm4-${cls}__node-dot`, cx: p.x, cy: p.y, r: 9 }));
        // Label
        const lbl = svg('text', { class: `gm4-${cls}__node-lbl`, x: p.x, y: p.y - 20 });
        lbl.textContent = safeLabel;
        a.appendChild(lbl);
        svgRoot.appendChild(a);

        // Hover wires for active line color
        const line = svgRoot.querySelector(`.gm4-${cls}__line[data-i="${i}"]`);
        a.addEventListener('mouseenter', () => line && line.classList.add('is-active'));
        a.addEventListener('focus', () => line && line.classList.add('is-active'));
        a.addEventListener('mouseleave', () => line && line.classList.remove('is-active'));
        a.addEventListener('blur', () => line && line.classList.remove('is-active'));
      });

      // Render sub-children (always visible)
      ITEMS.forEach((it, i) => {
        if (!it.children || !it.children.length) return;
        const p = positions[i];
        const radial = positions[i].angle; // direction outward from hub
        const N = it.children.length;
        const subSpread = Math.min(40, 8 * N); // total fan width
        const subStart = radial - subSpread / 2;
        const subStep = N > 1 ? subSpread / (N - 1) : 0;
        const subRadius = 70;

        it.children.forEach((c, j) => {
          const subAngle = subStart + subStep * j;
          const sp = polar(p.x, p.y, subRadius, subAngle);
          // Sub-line
          svgRoot.appendChild(svg('line', { class: `gm4-${cls}__sub-line`, x1: p.x, y1: p.y, x2: sp.x, y2: sp.y }));
          // Sub-node (a + hit area + dot + label)
          const sa = svg('a', {
            class: `gm4-${cls}__sub-node`,
            href: c.href,
            tabindex: '0',
            role: 'menuitem',
            'aria-label': c.label
          });
          sa.appendChild(svg('circle', { cx: sp.x, cy: sp.y, r: 22, fill: 'transparent' }));
          sa.appendChild(svg('circle', { class: `gm4-${cls}__sub-dot`, cx: sp.x, cy: sp.y, r: 5 }));
          // Position label outward from main item (away from hub)
          const labelOffsetAngle = subAngle * Math.PI / 180;
          const lblX = sp.x + Math.cos(labelOffsetAngle) * 12;
          const lblY = sp.y + Math.sin(labelOffsetAngle) * 12 + 4;
          const sl = svg('text', { class: `gm4-${cls}__sub-lbl`, x: lblX, y: lblY });
          sl.textContent = String(c.label).toUpperCase();
          sa.appendChild(sl);
          svgRoot.appendChild(sa);
        });
      });
    }

    const open = () => {
      root.classList.add('is-open');
      trig.setAttribute('aria-expanded', 'true');
      ov.setAttribute('aria-hidden', 'false');
      render();
      // Focus first menu item for keyboard
      requestAnimationFrame(() => {
        const first = svgRoot.querySelector('[role="menuitem"]');
        if (first) first.focus();
      });
    };
    const close = () => {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      ov.setAttribute('aria-hidden', 'true');
      trig.focus();
    };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target === svgRoot) close(); });
    let resizeTimer;
    window.addEventListener('resize', () => {
      if (!root.classList.contains('is-open')) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });
    escClose(root, close);
  }
  GM4['thinkmap-arc-pentagon'] = (r) => buildThinkMapArc(r, 'ta');
  GM4['thinkmap-arc-scatter']  = (r) => buildThinkMapArc(r, 'tb');

  /* ═══════════════════════════════════════════════════════════════
     B-R · Big Right Menu
     ═══════════════════════════════════════════════════════════════ */
  GM4['big-right'] = function (root) {
    let listHtml = '';
    ITEMS.forEach((it, i) => {
      let childHtml = '';
      if (it.children && it.children.length) {
        let inner = '';
        it.children.forEach(c => { inner += `<li><a href="${c.href}">${c.label}</a></li>`; });
        childHtml = `<ul class="gm4-br__children">${inner}</ul>`;
      }
      listHtml += `<li class="gm4-br__row">
        <a class="gm4-br__item" href="${it.href}">
          <span class="gm4-br__num">${it.num}</span>
          <span class="gm4-br__lbl">${it.label}</span>
        </a>
        ${childHtml}
      </li>`;
    });

    root.innerHTML = `
      <div class="gm4__bar">
        <a class="gm4__logo" href="index.html">intentfirst</a>
        ${triggerDot('Toggle navigation menu')}
      </div>
      <div class="gm4-br__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <div class="gm4-br__caption">
          <p class="gm4-br__caption-eyebrow">intentfirst · navigation</p>
          <h2 class="gm4-br__caption-title">Where would you like<br><em>to go?</em></h2>
        </div>
        <nav class="gm4-br__col" aria-label="Main">
          <ul class="gm4-br__list" role="menu">${listHtml}</ul>
        </nav>
      </div>`;

    const trig = root.querySelector('.gm4__trigger-dot');
    const ov = root.querySelector('.gm4-br__overlay');
    const open = () => {
      root.classList.add('is-open');
      trig.setAttribute('aria-expanded', 'true');
      ov.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        const first = ov.querySelector('a');
        if (first) first.focus();
      });
    };
    const close = () => {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      ov.setAttribute('aria-hidden', 'true');
      trig.focus();
    };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    escClose(root, close);
  };

  /* ═══════════════════════════════════════════════════════════════
     L-S · Lens · Stack
     ═══════════════════════════════════════════════════════════════ */
  GM4['lens-stack'] = function (root) {
    let pillsHtml = '';
    ITEMS.forEach(it => {
      pillsHtml += `<li class="gm4-ls__pill"><a class="gm4-ls__link" href="${it.href}" role="menuitem">
        <span class="gm4-ls__num">${it.num}</span>
        <span>${String(it.label).toUpperCase()}</span>
      </a></li>`;
    });

    root.innerHTML = `
      <div class="gm4__bar">
        <a class="gm4__logo" href="index.html">intentfirst</a>
        ${triggerDot('Toggle navigation menu')}
      </div>
      <div class="gm4-ls__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <ul class="gm4-ls__stack" role="menu">
          <span class="gm4-ls__marker" aria-hidden="true"></span>
          ${pillsHtml}
        </ul>
      </div>`;

    const trig = root.querySelector('.gm4__trigger-dot');
    const ov = root.querySelector('.gm4-ls__overlay');
    const marker = root.querySelector('.gm4-ls__marker');
    const pills = root.querySelectorAll('.gm4-ls__pill');

    function moveMarker(pill) {
      // Marker tracks via translateY based on pill offsetTop within stack
      const stack = pill.parentElement;
      const top = pill.offsetTop + (pill.offsetHeight - 28) / 2;
      marker.style.transform = `translateY(${top}px)`;
    }

    pills.forEach((pill) => {
      const link = pill.querySelector('a');
      pill.addEventListener('mouseenter', () => moveMarker(pill));
      link.addEventListener('focus', () => moveMarker(pill));
    });

    const open = () => {
      root.classList.add('is-open');
      trig.setAttribute('aria-expanded', 'true');
      ov.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        if (pills[0]) {
          const link = pills[0].querySelector('a');
          link.focus();
          moveMarker(pills[0]);
        }
      });
    };
    const close = () => {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      ov.setAttribute('aria-hidden', 'true');
      trig.focus();
    };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    escClose(root, close);
  };

  /* ═══════════════════════════════════════════════════════════════
     L-C · Lens · Scan (horizontal bars + scanline)
     ═══════════════════════════════════════════════════════════════ */
  GM4['lens-scan'] = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      const sub = it.children ? `${it.children.length} items inside` : 'Direct link';
      listHtml += `<li class="gm4-lc__row">
        <a class="gm4-lc__link" href="${it.href}" role="menuitem">
          <span class="gm4-lc__num">${it.num}</span>
          <span class="gm4-lc__lbl">${it.label}</span>
          <span class="gm4-lc__sub">${sub}</span>
        </a>
      </li>`;
    });

    root.innerHTML = `
      <div class="gm4__bar">
        <a class="gm4__logo" href="index.html">intentfirst</a>
        ${triggerDot('Toggle navigation menu')}
      </div>
      <div class="gm4-lc__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <ul class="gm4-lc__list" role="menu">${listHtml}</ul>
        <div class="gm4-lc__scan" aria-hidden="true"></div>
      </div>`;

    const trig = root.querySelector('.gm4__trigger-dot');
    const ov = root.querySelector('.gm4-lc__overlay');
    const rows = root.querySelectorAll('.gm4-lc__row');
    rows.forEach((row) => {
      const link = row.querySelector('a');
      const activate = () => {
        rows.forEach(r => r.classList.remove('is-active'));
        row.classList.add('is-active');
      };
      const deactivate = () => row.classList.remove('is-active');
      row.addEventListener('mouseenter', activate);
      link.addEventListener('focus', activate);
      row.addEventListener('mouseleave', deactivate);
      link.addEventListener('blur', deactivate);
    });

    const open = () => {
      root.classList.add('is-open');
      trig.setAttribute('aria-expanded', 'true');
      ov.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        const first = ov.querySelector('a');
        if (first) first.focus();
      });
    };
    const close = () => {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      ov.setAttribute('aria-hidden', 'true');
      trig.focus();
    };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    escClose(root, close);
  };

  /* ═══════════════════════════════════════════════════════════════
     L-O · Lens · Orbit (decorative + accessible list)
     ═══════════════════════════════════════════════════════════════ */
  GM4['lens-orbit'] = function (root) {
    let listHtml = '';
    ITEMS.forEach(it => {
      listHtml += `<li class="gm4-lo__row"><a class="gm4-lo__link" href="${it.href}" role="menuitem">
        <span class="gm4-lo__num">${it.num}</span>
        <span>${String(it.label).toUpperCase()}</span>
      </a></li>`;
    });

    root.innerHTML = `
      <div class="gm4__bar">
        <a class="gm4__logo" href="index.html">intentfirst</a>
        ${triggerDot('Toggle navigation menu')}
      </div>
      <div class="gm4-lo__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <div class="gm4-lo__art" aria-hidden="true">
          <svg viewBox="-180 -130 360 260" preserveAspectRatio="xMidYMid meet">
            <ellipse class="ring" cx="0" cy="0" rx="140" ry="90"/>
            <ellipse class="ring" cx="0" cy="0" rx="90"  ry="58"/>
            <ellipse class="ring ring--green" cx="0" cy="0" rx="46" ry="28"/>
            <g class="ring-rotor ring-rotor--cw"><circle class="ring-dot" cx="140" cy="0" r="7"/></g>
            <g class="ring-rotor ring-rotor--ccw"><circle class="ring-dot" cx="90"  cy="0" r="6"/></g>
            <g class="ring-rotor ring-rotor--cw"><circle class="ring-dot ring-dot--green" cx="46" cy="0" r="5"/></g>
            <circle class="ring-dot ring-dot--green ring-core" cx="0" cy="0" r="4"/>
          </svg>
        </div>
        <nav aria-label="Main">
          <ul class="gm4-lo__list" role="menu">${listHtml}</ul>
        </nav>
      </div>`;

    const trig = root.querySelector('.gm4__trigger-dot');
    const ov = root.querySelector('.gm4-lo__overlay');
    const open = () => {
      root.classList.add('is-open');
      trig.setAttribute('aria-expanded', 'true');
      ov.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        const first = ov.querySelector('a');
        if (first) first.focus();
      });
    };
    const close = () => {
      root.classList.remove('is-open');
      trig.setAttribute('aria-expanded', 'false');
      ov.setAttribute('aria-hidden', 'true');
      trig.focus();
    };
    trig.addEventListener('click', () => root.classList.contains('is-open') ? close() : open());
    escClose(root, close);
  };

  /* ─── INIT ─── */
  const SLUG = {
    'thinkmap-arc-pentagon': 'ta',
    'thinkmap-arc-scatter':  'tb',
    'big-right':             'br',
    'lens-stack':            'ls',
    'lens-scan':             'lc',
    'lens-orbit':            'lo'
  };

  function init(scope) {
    const ctx = scope || document;
    ctx.querySelectorAll('[data-gm4]').forEach((root) => {
      if (root.dataset.gm4Hydrated === '1') return;
      const type = root.dataset.gm4;
      const builder = GM4[type];
      const slug = SLUG[type];
      if (!builder || !slug) return;
      root.classList.add('gm4', 'gm4-' + slug);
      builder(root);
      root.dataset.gm4Hydrated = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  window.GlobalMenuV4 = { init, components: GM4 };
})();
