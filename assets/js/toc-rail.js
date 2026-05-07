/* ═══════════════════════════════════════════════════════════
   TOC Rail — chapter-based scroll navigation.

   Define your TOC structure in a global object before loading this script:

     <script>
       window.TOC_RAIL = {
         panelTitle: 'Project 01 · Living Home',
         chapters: [
           {
             num: '01',
             title: 'The Setup',
             sections: [
               { id: 'intro',     num: '01', label: 'Opening' },
               { id: 'problem',   num: '02', label: 'Three devices, no shared grammar' },
               ...
             ]
           },
           ...
         ]
       };
     </script>
     <script src="/assets/js/toc-rail.js" defer></script>

   Optional per-section dark-context flag:
     { id: 'dashboard', num: '06', label: 'Behind the scenes', dark: true }
   ─────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const cfg = window.TOC_RAIL;
  if (!cfg || !Array.isArray(cfg.chapters)) return;

  // ─── Build DOM ──────────────────────────────────────────
  const root = document.createElement('div');
  root.className = 'tocr';
  root.setAttribute('aria-label', 'Table of contents');

  const hotzone = document.createElement('div');
  hotzone.className = 'tocr__hotzone';
  root.appendChild(hotzone);

  const rail = document.createElement('div');
  rail.className = 'tocr__rail';
  root.appendChild(rail);

  const panel = document.createElement('nav');
  panel.className = 'tocr__panel';
  panel.setAttribute('aria-label', 'Chapter navigation panel');

  // Scrollable content area (chapters + projects). Font control sits
  // outside this so it stays pinned at the bottom of the 100vh panel.
  const panelScroll = document.createElement('div');
  panelScroll.className = 'tocr__panel-scroll';
  panel.appendChild(panelScroll);

  // Panel title
  if (cfg.panelTitle) {
    const t = document.createElement('div');
    t.className = 'tocr__panel-title';
    t.textContent = cfg.panelTitle;
    panelScroll.appendChild(t);
  }

  // Map of sectionId -> tick element (for active state)
  const tickMap = new Map();
  const linkMap = new Map();
  const sectionToChapter = new Map();

  cfg.chapters.forEach((chapter, ci) => {
    // Rail chapter block
    const chGroup = document.createElement('div');
    chGroup.className = 'tocr__chapter';
    chGroup.dataset.chapterIndex = ci;

    const label = document.createElement('div');
    label.className = 'tocr__chapter-label';
    label.textContent = `Ch ${chapter.num}`;
    chGroup.appendChild(label);

    const ticks = document.createElement('div');
    ticks.className = 'tocr__ticks';

    chapter.sections.forEach((sec) => {
      const tick = document.createElement('button');
      tick.className = 'tocr__tick';
      tick.type = 'button';
      tick.setAttribute('aria-label', `Jump to ${sec.label}`);
      tick.dataset.sectionId = sec.id;
      tick.addEventListener('click', () => scrollToSection(sec.id));
      ticks.appendChild(tick);
      tickMap.set(sec.id, tick);
      sectionToChapter.set(sec.id, ci);
    });

    chGroup.appendChild(ticks);
    rail.appendChild(chGroup);

    // Panel block
    const block = document.createElement('div');
    block.className = 'tocr__ch-block';

    const chTitle = document.createElement('a');
    chTitle.className = 'tocr__ch-title';
    // Chapter title click: prefer chapter.enter (chapter-enter divider id), fall back to first section
    const firstSec = (chapter.sections || [])[0];
    const target = chapter.enter || (firstSec && firstSec.id) || null;
    if (target) {
      chTitle.href = `#${target}`;
      chTitle.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(target);
        root.classList.remove('is-open');
      });
    }
    const chNum = document.createElement('span');
    chNum.className = 'tocr__ch-num';
    chNum.textContent = `Ch ${chapter.num}`;
    chTitle.appendChild(chNum);
    chTitle.appendChild(document.createTextNode(chapter.title));
    block.appendChild(chTitle);

    const list = document.createElement('ul');
    list.className = 'tocr__sections';
    chapter.sections.forEach((sec) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'tocr__section-link';
      a.href = `#${sec.id}`;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sec.id);
        // Collapse panel on click (mobile feel)
        root.classList.remove('is-open');
      });

      const num = document.createElement('span');
      num.className = 'tocr__section-num';
      num.textContent = sec.num;
      a.appendChild(num);
      a.appendChild(document.createTextNode(sec.label));

      li.appendChild(a);
      list.appendChild(li);
      linkMap.set(sec.id, a);
    });
    block.appendChild(list);
    panelScroll.appendChild(block);
  });

  // ─── Projects section (jump between scroll narratives) ──
  // Detect current project from panelTitle (e.g., "Project 01 · Living Home" → "p1")
  const PROJECTS = [
    { id: 'p1', num: '01', title: 'Living Home',    href: '/projects/project-01/p1-scroll.html' },
    { id: 'p2', num: '02', title: 'Family Trip',    href: '/projects/project-02/p2-family-trip.html' },
    { id: 'p3', num: '03', title: 'Fluid Handoff',  href: '/projects/project-03/p3-scroll.html' },
    { id: 'p4', num: '04', title: 'Sales Floor',    href: '/projects/project-04/p4-scroll.html' },
    { id: 'p5', num: '05', title: 'Control Tower',  href: '/projects/project-05/p5-scroll.html' }
  ];
  const currentMatch = (cfg.panelTitle || '').match(/Project\s+0(\d)/i);
  const currentId = currentMatch ? 'p' + currentMatch[1] : null;

  const projectsBlock = document.createElement('div');
  projectsBlock.className = 'tocr__projects';

  const projectsLabel = document.createElement('div');
  projectsLabel.className = 'tocr__projects-label';
  projectsLabel.textContent = 'Other projects';
  projectsBlock.appendChild(projectsLabel);

  const projectsList = document.createElement('ul');
  projectsList.className = 'tocr__projects-list';
  PROJECTS.forEach(p => {
    const li = document.createElement('li');
    const isCurrent = p.id === currentId;
    if (isCurrent) {
      const span = document.createElement('span');
      span.className = 'tocr__project tocr__project--current';
      span.setAttribute('aria-current', 'page');
      span.innerHTML = `<span class="tocr__project-num">${p.num}</span><span class="tocr__project-title">${p.title}</span><span class="tocr__project-mark">You are here</span>`;
      li.appendChild(span);
    } else {
      const a = document.createElement('a');
      a.className = 'tocr__project';
      a.href = p.href;
      a.innerHTML = `<span class="tocr__project-num">${p.num}</span><span class="tocr__project-title">${p.title}</span><span class="tocr__project-arrow" aria-hidden="true">→</span>`;
      li.appendChild(a);
    }
    projectsList.appendChild(li);
  });
  projectsBlock.appendChild(projectsList);
  panelScroll.appendChild(projectsBlock);

  // ─── Font size control (global, JS-driven, incremental) ─────
  // Scales body text by reading each element's natural computed
  // font-size and applying an inline override (works with any
  // px / clamp / vw declaration). +/− buttons step through a
  // continuous scale; preference persists per-origin.
  const FSCALE_KEY  = 'tocr_text_scale_v2';
  const FSCALE_MIN  = 0.85;
  const FSCALE_MAX  = 1.6;
  const FSCALE_STEP = 0.1;

  // Body / reading text selectors. Headings, eyebrows, labels, and
  // structural mono text are deliberately excluded.
  const FTEXT_SELECTORS = [
    // Generic body text
    'p.lede', '.lede',
    '.ui-caption',
    '.body-text', '.dark-text',
    '.prose p', '.content-body p',
    '.section-lede',
    // P3-specific reading text
    '.meet-hook', '.meet-foot', '.pronoun-line',
    '.tl-mid-title', '.tl-mid-desc',
    '.trust-card p', '.trust-card__date',
    '.trust-alt__name', '.trust-alt__why',
    '.ch02-voice-quote',
    // Generic card / callout body
    '.callout p', '.callout-body',
    '.card p', '.note p',
    // PRD-specific
    '.brain-card-body', '.brain-card-title',
    '.arch-layer-title', '.arch-layer-desc',
    '.anatomy-layer-title', '.anatomy-layer-desc',
    '.install-step-title', '.install-step-desc',
    '.scope-item', '.roadmap-items li', '.roadmap-title',
    '.compare-table td',
    '.scenario-result p', '.metric-label',
    '.code-block', '.prd-quote p'
  ].join(', ');

  let currentScale = 1;
  let resizeRaf = null;

  function clampScale(s) {
    return Math.max(FSCALE_MIN, Math.min(FSCALE_MAX, Math.round(s * 100) / 100));
  }

  function applyTextScale(scale) {
    currentScale = clampScale(scale);
    document.documentElement.style.setProperty('--fscale', String(currentScale));
    const els = document.querySelectorAll(FTEXT_SELECTORS);
    els.forEach((el) => {
      el.style.removeProperty('font-size');
      if (currentScale === 1) return;
      const natural = parseFloat(getComputedStyle(el).fontSize);
      if (!natural) return;
      el.style.setProperty('font-size', (natural * currentScale).toFixed(2) + 'px', 'important');
    });
    if (typeof updateFontCtrlUI === 'function') updateFontCtrlUI();
  }

  // Re-apply on resize so clamp/vw values stay correct
  window.addEventListener('resize', () => {
    if (currentScale === 1) return;
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => applyTextScale(currentScale));
  });

  let savedScale = 1;
  try {
    const raw = localStorage.getItem(FSCALE_KEY);
    if (raw) savedScale = parseFloat(raw) || 1;
  } catch (e) {}
  savedScale = clampScale(savedScale);
  // Apply on next frame so page CSS has fully resolved
  requestAnimationFrame(() => applyTextScale(savedScale));

  const fctrl = document.createElement('div');
  fctrl.className = 'tocr__font-ctrl';

  const frow = document.createElement('div');
  frow.className = 'tocr__font-ctrl-row';

  const flbl = document.createElement('span');
  flbl.className = 'tocr__font-ctrl-label';
  flbl.textContent = 'Text size';
  frow.appendChild(flbl);

  const fpct = document.createElement('span');
  fpct.className = 'tocr__font-pct';
  frow.appendChild(fpct);

  const btnMinus = document.createElement('button');
  btnMinus.type = 'button';
  btnMinus.className = 'tocr__font-btn';
  btnMinus.textContent = '−';
  btnMinus.setAttribute('aria-label', 'Decrease text size');
  frow.appendChild(btnMinus);

  const btnPlus = document.createElement('button');
  btnPlus.type = 'button';
  btnPlus.className = 'tocr__font-btn';
  btnPlus.textContent = '+';
  btnPlus.setAttribute('aria-label', 'Increase text size');
  frow.appendChild(btnPlus);

  fctrl.appendChild(frow);
  panel.appendChild(fctrl);

  function updateFontCtrlUI() {
    fpct.textContent = Math.round(currentScale * 100) + '%';
    btnMinus.disabled = currentScale <= FSCALE_MIN + 0.001;
    btnPlus.disabled  = currentScale >= FSCALE_MAX - 0.001;
  }

  function setScale(s) {
    const next = clampScale(s);
    if (next === currentScale) return;
    try { localStorage.setItem(FSCALE_KEY, String(next)); } catch (e) {}
    applyTextScale(next);
  }

  btnMinus.addEventListener('click', () => setScale(currentScale - FSCALE_STEP));
  btnPlus.addEventListener('click',  () => setScale(currentScale + FSCALE_STEP));
  // Double-click the percentage to reset
  fpct.style.cursor = 'pointer';
  fpct.title = 'Click to reset to 100%';
  fpct.addEventListener('click', () => setScale(1));

  // Initial UI sync (in case applyTextScale ran before button refs existed)
  updateFontCtrlUI();

  // T-key hint element at the bottom of the rail
  const hint = document.createElement('div');
  hint.className = 'tocr__hint';
  hint.innerHTML = '<span class="tocr__hint-key">T</span><span>toggle</span>';
  rail.appendChild(hint);

  root.appendChild(panel);
  document.body.appendChild(root);

  // ─── Onboarding tooltip (first visit only) ──────────────
  const ONBOARD_KEY = 'tocr_onboarded_v1';
  let onboarded = false;
  try { onboarded = localStorage.getItem(ONBOARD_KEY) === '1'; } catch (e) {}
  if (!onboarded && !window.matchMedia('(max-width: 768px)').matches) {
    const ob = document.createElement('div');
    ob.className = 'tocr__onboard';
    ob.innerHTML = `
      <button class="tocr__onboard-dismiss" aria-label="Dismiss">×</button>
      <div class="tocr__onboard-label">New here? Try this.</div>
      <div class="tocr__onboard-title">There's a table of contents on the left.</div>
      <div class="tocr__onboard-body">Hover the thin rail (or press <strong>T</strong>) to see every chapter and section. Click any title to jump there.</div>
      <div class="tocr__onboard-shortcuts">
        <div class="tocr__onboard-row"><span class="tocr__onboard-key">T</span><span>open / close the TOC</span></div>
        <div class="tocr__onboard-row"><span class="tocr__onboard-key">Esc</span><span>close the panel</span></div>
      </div>
    `;
    document.body.appendChild(ob);
    // Show after a brief delay so the page has settled
    requestAnimationFrame(() => {
      setTimeout(() => ob.classList.add('is-visible'), 700);
    });
    const dismiss = () => {
      ob.classList.remove('is-visible');
      try { localStorage.setItem(ONBOARD_KEY, '1'); } catch (e) {}
      setTimeout(() => ob.remove(), 600);
    };
    ob.querySelector('.tocr__onboard-dismiss').addEventListener('click', dismiss);
    // Dismiss when user interacts with the rail itself
    root.addEventListener('mouseenter', dismiss, { once: true });
    // Dismiss on 'T' keypress
    const keyDismiss = (e) => {
      if (e.key === 't' || e.key === 'T' || e.key === 'Escape') {
        dismiss();
        document.removeEventListener('keydown', keyDismiss);
      }
    };
    document.addEventListener('keydown', keyDismiss);
    // Auto-dismiss after 12 seconds
    setTimeout(dismiss, 12000);
  }

  // ─── Auto-prefix each section's eyebrow with its Ch X · NN chip ─
  // (works if the page uses `.eyebrow` or `.pronoun-eyebrow` — standard portfolio pattern)
  cfg.chapters.forEach(ch =>
    (ch.sections || []).forEach(sec => {
      const section = document.getElementById(sec.id);
      if (!section) return;
      const eb = section.querySelector('.eyebrow, .pronoun-eyebrow');
      if (!eb || eb.dataset.chLabeled === 'true') return;
      eb.dataset.chLabeled = 'true';
      const chip = document.createElement('span');
      chip.className = 'eyebrow__ch-chip';
      const mono = document.createElement('span');
      mono.className = 'eyebrow__ch-mono';
      mono.textContent = `CH ${ch.num} · ${sec.num}`;
      chip.appendChild(mono);
      const sep = document.createElement('span');
      sep.textContent = '·';
      sep.className = 'eyebrow__ch-sep';
      chip.appendChild(sep);
      eb.insertBefore(chip, eb.firstChild);
    })
  );

  // ─── Smooth scroll ──────────────────────────────────────
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 4;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // ─── Active section detection via IntersectionObserver ──
  const observed = [];
  cfg.chapters.forEach((ch) =>
    ch.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observed.push({ id: sec.id, el, dark: !!sec.dark });
    })
  );

  let currentActive = null;
  function setActive(id) {
    if (id === currentActive) return;
    tickMap.forEach((t) => t.classList.remove('is-active'));
    linkMap.forEach((l) => l.classList.remove('is-active'));
    document.querySelectorAll('.tocr__chapter').forEach((c) => c.classList.remove('is-active-chapter'));
    const t = tickMap.get(id);
    const l = linkMap.get(id);
    if (t) t.classList.add('is-active');
    if (l) l.classList.add('is-active');
    const ci = sectionToChapter.get(id);
    if (ci !== undefined) {
      const chapters = document.querySelectorAll('.tocr__chapter');
      if (chapters[ci]) chapters[ci].classList.add('is-active-chapter');
    }
    // Dark context
    const item = observed.find((o) => o.id === id);
    if (item && item.dark) root.setAttribute('data-ctx', 'dark');
    else root.removeAttribute('data-ctx');

    currentActive = id;
  }

  // Use a pair of observers — one at top, one at middle, to pick whichever section's anchor is closest to the viewport's upper third.
  const io = new IntersectionObserver(
    (entries) => {
      // Find the entry closest to top 1/3 of viewport
      let best = null;
      let bestDist = Infinity;
      observed.forEach(({ id, el }) => {
        const rect = el.getBoundingClientRect();
        const anchor = window.innerHeight * 0.33;
        // distance from section top to anchor line, penalize bottoms past the anchor
        if (rect.top <= anchor && rect.bottom >= 0) {
          const dist = Math.abs(rect.top - anchor);
          if (dist < bestDist) {
            bestDist = dist;
            best = id;
          }
        }
      });
      if (best) setActive(best);
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-20% 0px -40% 0px' }
  );
  observed.forEach((o) => io.observe(o.el));

  // Scroll fallback (in case IO misses while scrolling fast)
  let raf = null;
  window.addEventListener(
    'scroll',
    () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        let best = null;
        let bestDist = Infinity;
        const anchor = window.innerHeight * 0.33;
        observed.forEach(({ id, el }) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= anchor && rect.bottom >= 0) {
            const dist = Math.abs(rect.top - anchor);
            if (dist < bestDist) {
              bestDist = dist;
              best = id;
            }
          }
        });
        if (best) setActive(best);
      });
    },
    { passive: true }
  );

  // Set initial
  if (observed.length) setActive(observed[0].id);

  // Keyboard: press "t" to toggle the panel
  document.addEventListener('keydown', (e) => {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === 't' || e.key === 'T') {
      root.classList.toggle('is-open');
    }
    if (e.key === 'Escape') {
      root.classList.remove('is-open');
    }
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) root.classList.remove('is-open');
  });
})();
