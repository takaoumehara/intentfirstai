/* =============================================================
   Context Grammar Simulator — UI Preview module
   =============================================================
   Renders a stylized device mock that morphs as the token state
   changes. Pure data-attribute architecture: JS only swaps attrs
   and child counts, CSS does the heavy lifting via attribute
   selectors.

   Public API (window.SimPreview):
     SimPreview.render(stageEl, contextState, evaluation) → void

   Drop-in module — delete the script tag and the simulator still
   works. Mirrors specs in preview.css.
   ============================================================= */

(function () {
  'use strict';

  /* ─── Card content variants per scenario ─── */
  const CARD_VARIANTS = {
    fridge_display: [
      { title: 'Tonight\'s dinner',  meta: 'Family pick',  price: '¥1,820', icon: '◆' },
      { title: 'Grocery order',      meta: '4 items low',  price: '¥3,450', icon: '●' },
      { title: 'Reminders',          meta: '3 today',      price: null,     icon: '▲' },
      { title: 'Meal plan',          meta: 'Week 19',      price: null,     icon: '■' },
      { title: 'Kids\' lunches',     meta: 'Mon · prep',   price: null,     icon: '◇' },
      { title: 'Family calendar',    meta: '2 events',     price: null,     icon: '○' },
    ],
    phone_handheld: [
      { title: 'Calendar',     meta: '11:30 standup', price: null,     icon: '●' },
      { title: 'Messages',     meta: '4 new',         price: null,     icon: '◆' },
      { title: 'Tasks',        meta: '3 open',        price: null,     icon: '▲' },
      { title: 'Suggestions',  meta: 'Trip prep',     price: null,     icon: '■' },
      { title: 'Weather',      meta: '21° clear',     price: null,     icon: '○' },
      { title: 'Mail',         meta: '2 priority',    price: null,     icon: '◇' },
    ],
    phone_unfolded: [
      { title: 'Calendar',     meta: '11:30',         price: null,     icon: '●' },
      { title: 'Messages',     meta: '4 new',         price: null,     icon: '◆' },
      { title: 'Tasks',        meta: '3 open',        price: null,     icon: '▲' },
      { title: 'Mail',         meta: '2 priority',    price: null,     icon: '■' },
    ],
    phone_folded: [
      { title: 'Notification', meta: 'Meeting in 5',  price: null,     icon: '●' },
    ],
    tv_display: [
      { title: 'Continue watching', meta: 'Drama · S2',  price: null,     icon: '●' },
      { title: 'Tonight\'s plan',   meta: 'Family',      price: null,     icon: '◆' },
      { title: 'Family photos',     meta: 'Spring trip', price: null,     icon: '▲' },
      { title: 'Recommended',       meta: 'New release', price: null,     icon: '■' },
    ],
    tablet: [
      { title: 'Calendar',     meta: '4 events',      price: null,     icon: '●' },
      { title: 'Tasks',        meta: '6 open',        price: null,     icon: '◆' },
      { title: 'Mail',         meta: '12 unread',     price: null,     icon: '▲' },
      { title: 'Notes',        meta: 'Last edit 2h',  price: null,     icon: '■' },
      { title: 'Photos',       meta: '24 today',      price: null,     icon: '○' },
      { title: 'Browse',       meta: '3 tabs',        price: null,     icon: '◇' },
    ],
    car_display: [
      { title: 'Next turn',    meta: 'Right · 800m',  price: null,     icon: '▲' },
      { title: 'ETA',          meta: '8:42 AM',       price: null,     icon: '●' },
      { title: 'Music',        meta: 'Now playing',   price: null,     icon: '◆' },
      { title: 'Calls',        meta: '0 missed',      price: null,     icon: '○' },
    ],
    watch: [
      { title: 'Heart rate',   meta: '74 bpm',        price: null,     icon: '●' },
      { title: 'Next event',   meta: '15 min',        price: null,     icon: '◆' },
      { title: 'Steps',        meta: '4,210',         price: null,     icon: '▲' },
    ],
    desktop_monitor: [
      { title: 'Inbox',        meta: '17 unread',     price: null,     icon: '●' },
      { title: 'Calendar',     meta: '6 events',      price: null,     icon: '◆' },
      { title: 'Tasks',        meta: '12 open',       price: null,     icon: '▲' },
      { title: 'Docs',         meta: '3 in review',   price: null,     icon: '■' },
      { title: 'Messages',     meta: '4 channels',    price: null,     icon: '○' },
      { title: 'Analytics',    meta: 'Q3 ↑12%',       price: null,     icon: '◇' },
      { title: 'Files',        meta: 'Recent',        price: null,     icon: '◢' },
      { title: 'Calls',        meta: '2 scheduled',   price: null,     icon: '◣' },
    ],
  };

  const AUTONOMY_LABELS = {
    suggest: 'Show options',
    confirm: 'Approve',
    notify:  'Done — undo?',
    auto:    'Running silently',
  };

  const PRIORITY_LABELS = {
    critical: 'URGENT',
    high:     'HIGH',
    standard: 'STANDARD',
    low:      'LOW',
  };

  /* ─── Conflict resolution: returns a normalized render config ─── */
  function resolveRenderConfig(state, evaluation) {
    const cfg = {
      form: state.form_factor,
      density: evaluation && evaluation.designRules ? evaluation.designRules.ui_density : 'medium',
      maxChoices: evaluation && evaluation.designRules ? evaluation.designRules.max_choices : 4,
      driving: state.physical_state === 'driving',
      priority: state.priority_weight,
      social: state.social_exposure,
      autonomy: state.autonomy_dial,
      disclosure: state.disclosure_dial,
      feasibility: state.feasibility,
      autonomyValid: evaluation ? evaluation.autonomyValid : true,
      autonomyCeiling: evaluation ? evaluation.autonomyCeiling : null,
      banner: null,
      cardCount: 4,
      redact: 'none',
      showStrikethrough: false,
      showVoiceOverlay: false,
      showEmptyState: false,
    };

    // Cognitive overload protection — single recommendation only
    if (state.cognitive_load === 'overloaded') {
      cfg.maxChoices = 1;
      cfg.priority = 'low'; // ambient — no urgent demands while overloaded
    }

    // Disclosure = none → empty state, regardless of other tokens
    if (state.disclosure_dial === 'none') {
      cfg.showEmptyState = true;
      cfg.cardCount = 0;
    } else {
      // Density × maxChoices → cardCount
      const densityCap = { low: 2, medium: 4, high: 8 }[cfg.density] || 4;
      cfg.cardCount = Math.min(cfg.maxChoices, densityCap);

      // Watch is physically constrained
      if (cfg.form === 'watch') cfg.cardCount = Math.min(cfg.cardCount, 3);
      // Folded phone — single notification
      if (cfg.form === 'phone_folded') cfg.cardCount = 1;
    }

    // Redaction (social_exposure × disclosure)
    if (cfg.disclosure !== 'full') {
      if (state.social_exposure === 'public') cfg.redact = 'full';
      else if (state.social_exposure === 'social_acquaintances') cfg.redact = 'full';
      else if (state.social_exposure === 'family_with_children') cfg.redact = 'prices';
    }

    // Public privacy cascade — force redaction even if disclosure is full
    if (state.social_exposure === 'public') cfg.redact = cfg.redact === 'full' ? 'full' : 'prices';

    // Driving overlay
    if (cfg.driving) {
      cfg.showVoiceOverlay = true;
      // If form is not car, show banner explaining the override
      if (cfg.form !== 'car_display') {
        cfg.banner = 'Driving safety override — voice mode forced';
      }
    }

    // Feasibility = partial/infeasible → strikethrough one card
    if (state.feasibility === 'partially_feasible' || state.feasibility === 'infeasible') {
      cfg.showStrikethrough = true;
    }

    // Autonomy capped — use ceiling label
    if (!cfg.autonomyValid && cfg.autonomyCeiling) {
      cfg.autonomy = cfg.autonomyCeiling;
    } else if (!cfg.autonomyValid && !cfg.autonomyCeiling) {
      // Disclosure = none → no AI involvement
      cfg.autonomy = 'suggest';
    }

    return cfg;
  }

  /* ─── Build static device DOM (called once) ─── */
  function buildDeviceDOM() {
    const root = document.createElement('div');
    root.className = 'device';
    root.innerHTML = `
      <div class="device-bezel">
        <div class="device-notch" aria-hidden="true"></div>
        <div class="device-speaker" aria-hidden="true"></div>
        <div class="device-screen">
          <div class="app-statusbar">
            <span class="app-statusbar__time">9:41</span>
            <span class="app-statusbar__icons" aria-hidden="true">▮▮▮</span>
          </div>
          <div class="app-header">
            <span class="app-title">Suno</span>
            <span class="app-priority-badge" data-priority="standard">STANDARD</span>
          </div>
          <div class="app-grid" data-count="4"></div>
          <div class="app-action">
            <button class="app-button" data-autonomy="confirm" type="button" aria-label="Primary action">
              <span class="app-button__label">Approve</span>
            </button>
          </div>
          <div class="app-voice-overlay" hidden>
            <div class="app-voice-waves" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <p class="app-voice-text">Listening…<br/><em>"Suno, what's next?"</em></p>
          </div>
          <div class="app-empty-state" hidden>
            <p class="app-empty-text">No data shared in this domain.</p>
            <p class="app-empty-sub">Set Disclosure Dial above None to enable.</p>
          </div>
        </div>
      </div>
    `;
    return root;
  }

  /* ─── Populate cards in the grid (preserves existing nodes for animation) ─── */
  function populateCards(grid, count, redact, form, showStrikethrough) {
    const variants = CARD_VARIANTS[form] || CARD_VARIANTS.phone_handheld;
    const existingCards = Array.from(grid.children);

    // Remove extra cards
    while (existingCards.length > count) {
      const card = existingCards.pop();
      card.classList.add('is-leaving');
      setTimeout(() => card.remove(), 180);
    }

    // Update existing
    existingCards.forEach((card, i) => {
      const data = variants[i % variants.length];
      updateCard(card, data, redact, false);
    });

    // Add missing
    for (let i = existingCards.length; i < count; i++) {
      const data = variants[i % variants.length];
      const card = document.createElement('article');
      card.className = 'app-card is-entering';
      card.style.animationDelay = ((i - existingCards.length) * 30) + 'ms';
      const isStrikethrough = showStrikethrough && i === Math.min(2, count - 1);
      updateCard(card, data, redact, isStrikethrough);
      grid.appendChild(card);
      // Trigger animation
      requestAnimationFrame(() => card.classList.remove('is-entering'));
    }

    // Apply strikethrough to one card (the 3rd or last)
    if (showStrikethrough && count > 0) {
      const targetIdx = Math.min(2, count - 1);
      Array.from(grid.children).forEach((c, i) => {
        c.classList.toggle('is-strikethrough', i === targetIdx);
      });
    } else {
      Array.from(grid.children).forEach(c => c.classList.remove('is-strikethrough'));
    }
  }

  function updateCard(card, data, redact, isStrikethrough) {
    let redactAttr = 'none';
    if (redact === 'full') redactAttr = 'full';
    else if (redact === 'prices' && data.price) redactAttr = 'prices';

    card.dataset.redact = redactAttr;
    card.innerHTML = `
      <span class="card-icon" aria-hidden="true">${data.icon}</span>
      <div class="card-body">
        <span class="card-title">${data.title}</span>
        <span class="card-meta">${data.meta}</span>
        ${data.price ? `<span class="card-price">${data.price}</span>` : ''}
      </div>
      ${redactAttr !== 'none' ? '<span class="card-lock" aria-label="Hidden in this context">⌗</span>' : ''}
      ${isStrikethrough ? '<span class="card-pill">Alternative suggested</span>' : ''}
    `;
  }

  /* ─── Render legend chips ─── */
  function renderLegend(legendEl, cfg, state) {
    const formNames = {
      phone_handheld: 'Phone',
      phone_folded: 'Foldable folded',
      phone_unfolded: 'Foldable unfolded',
      tablet: 'Tablet',
      tv_display: 'TV',
      fridge_display: 'Fridge',
      car_display: 'Car',
      watch: 'Watch',
      desktop_monitor: 'Desktop',
    };
    const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const chips = [];
    chips.push(formNames[cfg.form] || cfg.form);
    if (!cfg.showEmptyState) chips.push(`${cfg.cardCount} card${cfg.cardCount === 1 ? '' : 's'}`);
    chips.push(`Density: ${cfg.density}`);
    if (cfg.redact !== 'none') chips.push(`Filter: ${cfg.redact === 'full' ? 'all hidden' : 'prices blurred'}`);
    chips.push(`Autonomy: ${titleCase(cfg.autonomy)}`);
    chips.push(`Disclosure: ${titleCase(cfg.disclosure)}`);
    if (cfg.driving) chips.push('Driving override');
    if (cfg.priority === 'critical' && !cfg.showEmptyState) chips.push('URGENT priority');

    legendEl.innerHTML = chips.map(c => `<span class="legend-chip">${c}</span>`).join('');
  }

  /* ─── Public render entry ─── */
  function render(stageEl, contextState, evaluation) {
    if (!stageEl || !contextState) return;

    const cfg = resolveRenderConfig(contextState, evaluation);

    // Mount device on first call
    let device = stageEl.querySelector('.device');
    if (!device) {
      device = buildDeviceDOM();
      stageEl.appendChild(device);

      // Build banner el
      const banner = document.createElement('div');
      banner.className = 'preview-banner';
      banner.hidden = true;
      stageEl.appendChild(banner);
    }

    // Update device-level data attributes
    device.dataset.form = cfg.form;
    device.dataset.density = cfg.density;
    device.dataset.driving = String(cfg.driving);
    device.dataset.priority = cfg.priority;
    device.dataset.disclosure = cfg.disclosure;
    device.dataset.autonomy = cfg.autonomy;
    device.dataset.social = cfg.social;
    device.dataset.feasibility = cfg.feasibility;

    // Update inner state
    const grid = device.querySelector('.app-grid');
    const emptyEl = device.querySelector('.app-empty-state');
    const voiceEl = device.querySelector('.app-voice-overlay');
    const button = device.querySelector('.app-button');
    const buttonLabel = device.querySelector('.app-button__label');
    const priorityBadge = device.querySelector('.app-priority-badge');

    grid.dataset.count = String(cfg.cardCount);
    grid.hidden = cfg.showEmptyState;
    emptyEl.hidden = !cfg.showEmptyState;
    voiceEl.hidden = !cfg.showVoiceOverlay;

    if (!cfg.showEmptyState) {
      populateCards(grid, cfg.cardCount, cfg.redact, cfg.form, cfg.showStrikethrough);
    }

    if (priorityBadge) {
      priorityBadge.dataset.priority = cfg.priority;
      priorityBadge.textContent = PRIORITY_LABELS[cfg.priority] || '';
    }

    if (button && buttonLabel) {
      button.dataset.autonomy = cfg.autonomy;
      buttonLabel.textContent = AUTONOMY_LABELS[cfg.autonomy] || 'Continue';
      button.hidden = cfg.showEmptyState;
    }

    // Banner (driving override on non-car form)
    const banner = stageEl.querySelector('.preview-banner');
    if (banner) {
      if (cfg.banner) {
        banner.textContent = cfg.banner;
        banner.hidden = false;
      } else {
        banner.hidden = true;
      }
    }

    // Legend
    const legendEl = document.getElementById('preview-legend');
    if (legendEl) renderLegend(legendEl, cfg, contextState);
  }

  window.SimPreview = { render };
})();
