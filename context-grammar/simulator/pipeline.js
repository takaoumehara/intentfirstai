/* =============================================================
   Pipeline Simulator — render engine
   =============================================================
   Reads window.SCENARIO_DINNER. Renders all 4 stages.
   On context toggle → mutate state → FLIP morph the affected stages.
   On device change → rebuild stage 4 only.
   On Play → cinematic 4-stage reveal.
   ============================================================= */

(function () {
  'use strict';

  const SCENARIO = window.SCENARIO_DINNER;
  if (!SCENARIO) {
    console.error('Pipeline: SCENARIO_DINNER not loaded');
    return;
  }

  // Application state — derived live, not stored across mutations.
  const appState = {
    activeToggles: new Set(),
    activeDevice: 'fridge',
    hasPlayed: false,
    hasRendered: false,
    cinematicCancelled: false,
  };

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Compute the live derived state from active toggles ───
  function computeState() {
    let s = JSON.parse(JSON.stringify(SCENARIO.defaultState));
    SCENARIO.toggles.forEach((t) => {
      if (appState.activeToggles.has(t.id)) {
        s = t.mutate(s);
      }
    });
    return s;
  }

  // ─── Render: Stage 1 · Intent ───
  function renderIntent(state) {
    const el = document.getElementById('stage-1-body');
    if (!el) return;
    el.innerHTML = `
      <article class="intent-card">
        <p class="intent-meta">${state.intent.meta}</p>
        <p class="intent-quote">${state.intent.utterance}</p>
        <p class="intent-context">Stated intent + implicit shape: <em>${state.intent.shape}</em></p>
      </article>
    `;
  }

  // ─── Render: Stage 2 · Context Tokens ───
  const TOKEN_ICONS = {
    physical_state: '../../assets/img/Large/Token_02_PhysicalState.webp',
    cognitive_load: '../../assets/img/Large/Token_03_ CognitiveLoad.webp', // legit space in filename
    social_exposure: '../../assets/img/Large/Token_04_SocialExposure.webp',
    priority_weight: '../../assets/img/Large/Token_05_PriorityWeights.webp',
    form_factor: '../../assets/img/Large/Token_07_FormFactor.webp',
    feasibility: '../../assets/img/Large/Token_08_Feasibility.webp',
    autonomy_dial: '../../assets/img/Large/Token_07_AutonomyDial.webp',
    disclosure_dial: '../../assets/img/Large/Token_08_DisclosureDial.svg',
  };

  function renderTokens(state) {
    const el = document.getElementById('stage-2-body');
    if (!el) return;
    const order = ['physical_state', 'cognitive_load', 'social_exposure', 'priority_weight',
                   'form_factor', 'feasibility', 'autonomy_dial', 'disclosure_dial'];
    el.innerHTML = `
      <div class="tokens-grid">
        ${order.map((id) => {
          const t = state.tokens[id];
          const icon = TOKEN_ICONS[id];
          return `
            <div class="token-cell ${t.firing ? 'is-firing' : ''}" data-token="${id}" data-flip-key="token-${id}">
              <div class="token-cell__head">
                <img class="token-cell__icon" src="${icon}" alt="" aria-hidden="true" loading="eager" decoding="async">
                <div class="token-cell__title-block">
                  <span class="token-cell__num">${t.number}</span>
                  <span class="token-cell__name">${t.name}</span>
                </div>
              </div>
              <p class="token-cell__value">${t.value}</p>
              <p class="token-cell__signal">${t.signal}</p>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // ─── Render: Stage 3 — Brain · Rules · AX Patterns ───
  function renderBrain(state) {
    const el = document.getElementById('stage-3a-body');
    if (!el) return;
    const layer = (label, entries) => `
      <div class="brain-layer">
        <p class="brain-layer__name">${label}</p>
        ${entries.map((e) => `
          <p class="brain-layer__signal ${e.highlight ? 'is-highlight' : ''}">${e.entry}</p>
        `).join('')}
      </div>
    `;
    el.innerHTML = `
      <p class="brain-column__title">3-layer Brain · what gets recalled</p>
      ${layer('L1 · Identity', state.brain.L1)}
      ${layer('L2 · Learning', state.brain.L2)}
      ${layer('L3 · Now', state.brain.L3)}
    `;
  }

  function renderRules(state) {
    const el = document.getElementById('stage-3b-body');
    if (!el) return;
    el.innerHTML = `
      <p class="rules-column__title">Rule Engine · what fires & why</p>
      <ul class="rules-list">
        ${state.rules.map((r, i) => `
          <li class="rule-row" data-fire-order="${i + 1}" data-flip-key="rule-${r.name}">
            <span class="rule-row__name">${r.name}</span>
            <span class="rule-row__arrow" aria-hidden="true">→</span>
            <span class="rule-row__output">${r.output}</span>
            <span class="rule-row__drivers">drivers: ${r.drivers.join(', ')}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }

  function renderAxPatterns(state) {
    const el = document.getElementById('stage-3c-body');
    if (!el) return;
    el.innerHTML = `
      <p class="ax-column__title">AX Patterns · named UI moves</p>
      <div class="ax-list">
        ${state.axPatterns.map((p, i) => `
          <div class="ax-row ${p.overruled ? 'is-overruled' : ''}" data-fire-order="${i + 1}" data-flip-key="ax-${p.id}">
            <span class="ax-row__id">${p.id}</span>
            <span class="ax-row__name">${p.name}</span>
            <span class="ax-row__essence">${p.essence}</span>
          </div>
        `).join('')}
      </div>
      ${state.intentTest && state.intentTest.enabled ? `
        <div class="intent-test">
          <span class="intent-test__chip">The intent test</span>
          <p>${state.intentTest.text}</p>
        </div>
      ` : ''}
    `;
  }

  // ─── Render: Stage 4 · UI Output (per-device) ───
  function renderUI(state) {
    const el = document.getElementById('stage-4-body');
    if (!el) return;
    const device = SCENARIO.devices.find((d) => d.id === appState.activeDevice);

    // Build the device frame wrapper + the inner UI atoms
    let inner;
    switch (appState.activeDevice) {
      case 'fridge':
        inner = renderFridgeUI(state, device); break;
      case 'tv-cast':
        inner = renderTvCastUI(state, device); break;
      case 'ipad':
        inner = renderIpadUI(state, device); break;
      default:
        inner = renderTvCastUI(state, device);
    }
    el.innerHTML = inner;
  }

  // ─── UI atoms ───
  function atomKcalRing(kcal, target = 580) {
    const pct = Math.min(100, Math.round((kcal / target) * 100));
    const stroke = pct > 100 ? 'var(--color-intent)' : pct > 80 ? 'var(--color-intent)' : 'var(--color-success)';
    return `
      <span class="kcal-ring" style="--pct: ${pct}; --stroke: ${stroke};" title="${kcal} kcal">
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
          <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="3"></circle>
          <circle cx="16" cy="16" r="13" fill="none" stroke="${stroke}" stroke-width="3"
                  stroke-dasharray="${(pct / 100) * 81.68} 81.68" stroke-linecap="round"
                  transform="rotate(-90 16 16)"></circle>
        </svg>
        <span class="kcal-ring__num">${kcal}</span>
      </span>
    `;
  }

  function atomPriceBadge(jpy, emphasis = false) {
    if (jpy === 0) return `<span class="price-badge price-badge--free">in pantry</span>`;
    return `<span class="price-badge ${emphasis ? 'is-emphasized' : ''}">¥${jpy.toLocaleString()}</span>`;
  }

  function atomTagChip(tag) {
    if (!tag) return '';
    return `<span class="tag-chip">${tag}</span>`;
  }

  function atomAllergenChip(allergens) {
    if (!allergens || allergens.length === 0) return '';
    return `<span class="allergen-chip">⚠ ${allergens.join(', ')}</span>`;
  }

  // ─── Recipe Card atom ───
  function atomRecipeCard(card, opts) {
    const showKcal = opts.showKcal;
    const emphasizePrice = opts.emphasizePrice;
    const showAllergen = opts.showAllergenChip;
    const imgSrc = card.image || '';
    return `
      <article class="recipe-card ${card.highlighted ? 'is-highlighted' : ''}" data-flip-key="recipe-${card.id}">
        ${imgSrc ? `
          <div class="recipe-card__media">
            <img src="${imgSrc}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            ${card.highlighted ? '<span class="recipe-card__pick" aria-hidden="true">Top pick</span>' : ''}
          </div>
        ` : ''}
        <div class="recipe-card__body">
          <div class="recipe-card__top">
            <h4 class="recipe-card__title">${card.title}</h4>
            ${showKcal ? atomKcalRing(card.kcal) : ''}
          </div>
          <p class="recipe-card__meta">
            <span>${card.prepMin} min</span>
            <span aria-hidden="true">·</span>
            ${atomPriceBadge(card.priceJpy, emphasizePrice)}
          </p>
          <div class="recipe-card__tags">
            ${atomTagChip(card.tag)}
            ${showAllergen ? atomAllergenChip(card.allergens) : ''}
          </div>
        </div>
      </article>
    `;
  }

  function atomVoteAvatars() {
    return `
      <div class="vote-avatars" aria-label="Family voting">
        <span class="avatar" data-name="Hana">H</span>
        <span class="avatar" data-name="Daichi">D</span>
        <span class="avatar" data-name="Aoi">A</span>
        <span class="avatar" data-name="Sota">S</span>
      </div>
    `;
  }

  function atomWeightTrend(trend) {
    return `
      <div class="weight-trend" aria-label="Weight trend">
        <span class="weight-trend__label">Goal · ${trend.goal}kg</span>
        <span class="weight-trend__remaining">${trend.kgRemaining}kg to go · ${trend.monthsLeft} mo</span>
      </div>
    `;
  }

  function atomUseUpBanner(text) {
    return `<p class="use-up-banner">⏱ ${text}</p>`;
  }

  // ─── Device renderers ───
  function renderFridgeUI(state, device) {
    const cards = state.ui.cards.slice(0, device.maxCards);
    const opts = {
      showKcal: state.ui.showKcal,
      emphasizePrice: state.ui.emphasizePrice,
      showAllergenChip: state.ui.showAllergenChip,
    };
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="samfh samfh--lg">
          <div class="samfh__chrome" aria-hidden="true"></div>
          <div class="samfh__screen samfh__screen--dark">
            <div class="screen-pad screen-pad--fridge">
              <div class="screen-header">
                <span class="screen-header__brand">Suno · Kitchen</span>
                ${state.ui.weightTrend ? atomWeightTrend(state.ui.weightTrend) : ''}
              </div>
              ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
              ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
              <h3 class="screen-title">${state.ui.title}</h3>
              <div class="recipe-stack">
                ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
              </div>
              <p class="screen-hint">Voice: "Suno, start salmon" · Tap card to confirm</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTvCastUI(state, device) {
    const cards = state.ui.cards.slice(0, device.maxCards);
    const opts = {
      showKcal: state.ui.showKcal,
      emphasizePrice: state.ui.emphasizePrice,
      showAllergenChip: state.ui.showAllergenChip,
    };
    const highlightedCard = cards.find((c) => c.highlighted) || cards[0];
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="tv-rig">
          <div class="proto-tv">
            <div class="proto-tv__screen">
              <div class="screen-header">
                <span class="screen-header__brand">Suno · Living Room</span>
                ${state.ui.weightTrend ? atomWeightTrend(state.ui.weightTrend) : ''}
                ${atomVoteAvatars()}
              </div>
              ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
              ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
              <h3 class="screen-title">${state.ui.title}</h3>
              <div class="recipe-row">
                ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
              </div>
              <p class="screen-hint">${state.ui.hint}</p>
            </div>
          </div>
          <aside class="proto-remote" aria-label="Hana's phone as remote">
            <p class="proto-remote__label">Hana's phone · Remote</p>
            <div class="proto-remote__highlight">
              <span>${highlightedCard ? highlightedCard.title : ''}</span>
              <span class="proto-remote__sub">${highlightedCard ? `¥${highlightedCard.priceJpy.toLocaleString()}` : ''}</span>
            </div>
            <div class="proto-dpad" aria-hidden="true">
              <span></span><span class="dp-btn">↑</span><span></span>
              <span class="dp-btn">←</span><span class="dp-btn dp-btn--ok">OK</span><span class="dp-btn">→</span>
              <span></span><span class="dp-btn">↓</span><span></span>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  function renderIpadUI(state, device) {
    const cards = state.ui.cards.slice(0, device.maxCards);
    const opts = {
      showKcal: state.ui.showKcal,
      emphasizePrice: state.ui.emphasizePrice,
      showAllergenChip: state.ui.showAllergenChip,
    };
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="ipad11 ipad11--landscape" style="--ipad-w: 540px;">
          <div class="ipad11__screen">
            <div class="screen-pad screen-pad--ipad">
              <div class="screen-header">
                <span class="screen-header__brand">Suno · Browse</span>
                ${state.ui.weightTrend ? atomWeightTrend(state.ui.weightTrend) : ''}
              </div>
              ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
              ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
              <h3 class="screen-title">${state.ui.title}</h3>
              <div class="recipe-detail-list">
                ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
              </div>
              <p class="screen-hint">Long-press to compare · save to plan</p>
            </div>
          </div>
          <span class="ipad11__cam"></span>
        </div>
      </div>
    `;
  }

  // ─── FLIP morph helper ───
  // Captures positions of [data-flip-key] elements, re-renders, then animates
  // each from old→new position. Skips animation under prefers-reduced-motion.
  function flipMorph(scopeEls, renderFn) {
    const reducedMotion = prefersReducedMotion();
    if (reducedMotion) { renderFn(); return; }

    // Roots can be a single element or an array of elements (e.g. all 6 stage bodies).
    const roots = Array.isArray(scopeEls) ? scopeEls : [scopeEls];

    // 1. FIRST — record old positions
    const oldRects = new Map();
    roots.forEach((root) => {
      if (!root) return;
      root.querySelectorAll('[data-flip-key]').forEach((el) => {
        oldRects.set(el.dataset.flipKey, el.getBoundingClientRect());
      });
    });

    // 2. LAST — re-render
    renderFn();

    // 3. INVERT — apply inverse transform synchronously, BEFORE first paint
    const movers = [];
    roots.forEach((root) => {
      if (!root) return;
      root.querySelectorAll('[data-flip-key]').forEach((el) => {
        const oldRect = oldRects.get(el.dataset.flipKey);
        if (!oldRect) {
          el.classList.add('is-fading-in');
          setTimeout(() => el.classList.remove('is-fading-in'), 280);
          return;
        }
        const newRect = el.getBoundingClientRect();
        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        el.style.transition = 'none';
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        movers.push(el);
      });
    });

    // 4. PLAY — on next frame, clear transform with a transition.
    // Two-RAF sequence so the inverse transform actually paints before clearing.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        movers.forEach((el) => {
          el.style.transition = 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)';
          el.style.transform = '';
        });
      });
    });
  }

  // ─── Top-level renderAll ───
  function renderAll() {
    const s = computeState();
    renderIntent(s);
    renderTokens(s);
    renderBrain(s);
    renderRules(s);
    renderAxPatterns(s);
    renderUI(s);
    const overlayCount = appState.activeToggles.size;
    const overlayText = overlayCount === 0 ? 'no context overlays' : `${overlayCount} context overlay${overlayCount === 1 ? '' : 's'}`;
    announce(`Re-evaluated. ${s.rules.length} rules, ${s.axPatterns.length} patterns, ${overlayText}.`);
    appState.hasRendered = true;
  }

  // Live region for screen reader announcements on state change.
  // Skip the very first render so screen readers don't speak unprompted.
  function announce(msg) {
    if (!appState.hasRendered) return;
    const el = document.getElementById('live-announce');
    if (el) el.textContent = msg;
  }

  // ─── Cinematic playback (manual Play only — never auto on arrival) ───
  // Shorter and cancellable. Respects prefers-reduced-motion.
  const STAGE_DELAY = { 1: 0, 2: 700, 3: 1500, 4: 2400 };
  let cinematicTimers = [];

  function settleAll() {
    document.querySelectorAll('.stage').forEach((s) => {
      s.classList.remove('is-active');
      s.classList.add('is-done');
    });
    document.querySelectorAll('.timeline-step').forEach((s) => {
      s.classList.remove('is-active');
      s.classList.add('is-done');
    });
    document.body.classList.add('has-played');
  }

  function cancelCinematic() {
    appState.cinematicCancelled = true;
    cinematicTimers.forEach((t) => clearTimeout(t));
    cinematicTimers = [];
    settleAll();
  }

  function playCinematic() {
    // Reduced motion or cancelled — show everything immediately, no scroll.
    if (prefersReducedMotion()) { settleAll(); return; }

    appState.cinematicCancelled = false;
    cinematicTimers.forEach((t) => clearTimeout(t));
    cinematicTimers = [];
    document.body.classList.remove('has-played');
    document.querySelectorAll('.stage').forEach((s) => s.classList.remove('is-active', 'is-done'));
    document.querySelectorAll('.timeline-step').forEach((s) => s.classList.remove('is-active', 'is-done'));

    const sequence = ['stage-1', 'stage-2', 'stage-3', 'stage-4'];
    sequence.forEach((id, i) => {
      cinematicTimers.push(setTimeout(() => {
        if (appState.cinematicCancelled) return;
        if (i > 0) {
          document.getElementById(sequence[i - 1])?.classList.replace('is-active', 'is-done');
          document.querySelector(`.timeline-step[data-stage="${i}"]`)?.classList.replace('is-active', 'is-done');
        }
        document.getElementById(id)?.classList.add('is-active');
        document.querySelector(`.timeline-step[data-stage="${i + 1}"]`)?.classList.add('is-active');
        // Use block:nearest so we don't fight a user who is already scrolling.
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, STAGE_DELAY[i + 1]));
    });

    // After all stages: settle and unlock
    cinematicTimers.push(setTimeout(() => {
      if (appState.cinematicCancelled) return;
      settleAll();
    }, STAGE_DELAY[4] + 800));
  }

  // Cancel cinematic on first user-initiated scroll/keystroke/touch.
  function installCinematicCancellers() {
    const cancel = () => {
      if (cinematicTimers.length) cancelCinematic();
    };
    window.addEventListener('wheel', cancel, { once: true, passive: true });
    window.addEventListener('touchstart', cancel, { once: true, passive: true });
    window.addEventListener('keydown', cancel, { once: true });
  }

  // ─── Wire up: toggles, devices, play ───
  function init() {
    renderAll();

    // Build the toggle dock
    const togglesEl = document.getElementById('toggles-dock');
    if (togglesEl) {
      togglesEl.innerHTML = SCENARIO.toggles.map((t) => `
        <button class="ctx-toggle" type="button" data-toggle-id="${t.id}" aria-pressed="false">
          <span class="ctx-toggle__label">${t.label}</span>
          <span class="ctx-toggle__sub">${t.sub}</span>
        </button>
      `).join('');

      togglesEl.querySelectorAll('.ctx-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.toggleId;
          if (appState.activeToggles.has(id)) {
            appState.activeToggles.delete(id);
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed', 'false');
          } else {
            appState.activeToggles.add(id);
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');
          }
          // FLIP morph across all stage bodies that hold flip-keyed elements
          const scopes = [
            document.getElementById('stage-2-body'),
            document.getElementById('stage-3b-body'),
            document.getElementById('stage-3c-body'),
            document.getElementById('stage-4-body'),
          ];
          flipMorph(scopes, renderAll);
        });
      });
    }

    // Build the device dock
    const devicesEl = document.getElementById('devices-dock');
    if (devicesEl) {
      devicesEl.innerHTML = SCENARIO.devices.map((d) => `
        <button class="dev-tab ${d.id === appState.activeDevice ? 'is-active' : ''}" type="button" data-device-id="${d.id}" aria-pressed="${d.id === appState.activeDevice ? 'true' : 'false'}">
          <span class="dev-tab__label">${d.label}</span>
          <span class="dev-tab__sub">${d.sub}</span>
        </button>
      `).join('');

      devicesEl.querySelectorAll('.dev-tab').forEach((btn) => {
        btn.addEventListener('click', () => {
          devicesEl.querySelectorAll('.dev-tab').forEach((b) => {
            b.classList.remove('is-active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
          appState.activeDevice = btn.dataset.deviceId;
          renderUI(computeState());
        });
      });
    }

    // Play / Replay — manual only. The simulator IS the product;
    // auto-play would hijack the user the moment they arrive.
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        installCinematicCancellers();
        playCinematic();
      });
    }

    // Settle all stages immediately so the user sees the full pipeline
    // on arrival (no waiting). They can press Replay to see it animate.
    settleAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
