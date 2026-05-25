/* ═══════════════════════════════════════════════════════════
   Context Grammar · Morph Theater — morph.js
   8 scenarios · auto-play sequencer · pause-and-touch
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Token definitions ──────────────────────────────────── */
  const TOKEN_DEFS = [
    { id: 'physical_state',   label: 'Physical State' },
    { id: 'cognitive_load',   label: 'Cognitive Load' },
    { id: 'social_exposure',  label: 'Social Exposure' },
    { id: 'priority_weight',  label: 'Priority Weight' },
    { id: 'form_factor',      label: 'Form Factor' },
    { id: 'feasibility',      label: 'Feasibility' },
    { id: 'autonomy_dial',    label: 'Autonomy Dial' },
    { id: 'disclosure_dial',  label: 'Disclosure Dial' },
  ];

  /* ── Scenario definitions ───────────────────────────────── */
  const SCENARIOS = [
    /* ── 01 Cooking ──────────────────────────────────────── */
    {
      id: 'cooking',
      chapter: '01 Cooking',
      title: '01 · Both hands on the pan',
      scene: 'cooking',
      device: 'fridge',
      tokens: {
        physical_state:  { value: 'one hand (stirring)',   active: true },
        cognitive_load:  { value: 'high',                  active: true },
        social_exposure: { value: 'family',                active: false },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'fridge display',        active: true },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'confirm',               active: false },
        disclosure_dial: { value: 'full (household)',      active: false },
      },
      why: {
        heading: 'Why a single giant card?',
        bullets: [
          { token: 'Physical State', text: 'One hand occupied → cannot navigate multi-item lists' },
          { token: 'Form Factor', text: 'Fridge display = glance distance + wet-hands surface' },
          { token: 'Cognitive Load', text: 'High → max_choices = 1. One decision. Done.' },
        ],
        patterns: ['A1 Form Factor Transform', 'A2 Cognitive Scaling'],
      },
      render() {
        return `
<div class="mx-fridge">
  <div class="mx-fridge__time">07:02 · Kitchen · one hand occupied</div>
  <div class="mx-fridge__voice-card">
    <div class="mx-fridge__wave" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="mx-fridge__suggestion">Tonight: Aoi-safe<br>miso soup + salmon</div>
    <div class="mx-fridge__meta">Ready in 18 min · ¥0 added cost</div>
    <div class="mx-fridge__tap" aria-label="Tap to confirm">OK</div>
  </div>
</div>`;
      },
    },

    /* ── 02 Driving ──────────────────────────────────────── */
    {
      id: 'driving',
      chapter: '02 Driving',
      title: '02 · Visual UI disappears completely',
      scene: 'driving',
      device: 'carplay',
      tokens: {
        physical_state:  { value: 'driving',               active: true },
        cognitive_load:  { value: 'high (road focus)',     active: true },
        social_exposure: { value: 'kids in back seat',     active: false },
        priority_weight: { value: 'high',                  active: true },
        form_factor:     { value: 'car display (CarPlay)', active: true },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'confirm',               active: false },
        disclosure_dial: { value: 'moderate',              active: false },
      },
      why: {
        heading: 'Why is the screen almost empty?',
        bullets: [
          { token: 'Physical State', text: 'Driving = hard override. Zero visual competition for attention.' },
          { token: 'Form Factor', text: 'CarPlay = voice-primary. All interaction is audio + two spoken options.' },
          { token: 'Priority Weight', text: 'High — Aoi forgot her cleats. Urgent but must not distract.' },
        ],
        patterns: ['A1 Form Factor Transform', 'D6 Dynamic Friction'],
      },
      render() {
        return `
<iframe src="../../ui-screens/p1-v2/s9a-carplay-composite.html" style="width: 100%; height: 100%; border: 0; display: block;" scrolling="no" title="P1 CarOS Driving UI"></iframe>`;
      },
    },

    /* ── 03 Banking in public ────────────────────────────── */
    {
      id: 'banking',
      chapter: '03 Banking',
      title: '03 · Stranger behind → amounts blur',
      scene: 'banking',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'stationary (café)',     active: false },
        cognitive_load:  { value: 'moderate',              active: false },
        social_exposure: { value: 'stranger nearby',       active: true },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'notify',                active: false },
        disclosure_dial: { value: 'minimal (in public)',   active: true },
      },
      why: {
        heading: 'Why are the amounts blurred?',
        bullets: [
          { token: 'Social Exposure', text: 'Stranger detected nearby via camera + position sensor' },
          { token: 'Disclosure Dial', text: '"minimal in public" → financial data = private. Auto-cascade.' },
          { token: 'A4 fires', text: 'Content filter = maximum. Numbers blur. Camera icon added.' },
        ],
        patterns: ['A4 Disclosure Cascade', 'A3 Social-Aware Filtering'],
      },
      render() {
        return `
<div class="mx-banking">
  <div class="mx-banking__header">
    <div class="mx-banking__title">Accounts</div>
    <div class="mx-banking__shield">🔒</div>
  </div>
  <div class="mx-banking__balance-section">
    <div class="mx-banking__balance-label">Current Balance</div>
    <div class="mx-banking__balance mx-banking__balance--blurred">¥284,500</div>
    <div class="mx-banking__reason">Disclosure · public mode · amounts hidden</div>
  </div>
  <div class="mx-banking__txns">
    <div class="mx-banking__txn">
      <div class="mx-banking__txn-name">Supermarket</div>
      <div class="mx-banking__txn-amount mx-banking__txn-amount--blurred">−¥4,280</div>
    </div>
    <div class="mx-banking__txn">
      <div class="mx-banking__txn-name">Transit</div>
      <div class="mx-banking__txn-amount mx-banking__txn-amount--blurred">−¥980</div>
    </div>
    <div class="mx-banking__txn">
      <div class="mx-banking__txn-name">Restaurant</div>
      <div class="mx-banking__txn-amount mx-banking__txn-amount--blurred">−¥2,100</div>
    </div>
  </div>
  <div class="mx-banking__stranger">
    <div class="mx-banking__stranger-dot"></div>
    Someone within 50cm · amounts hidden automatically
  </div>
</div>`;
      },
    },

    /* ── 04 Midnight Purchase ────────────────────────────── */
    {
      id: 'midnight',
      chapter: '04 Midnight',
      title: '04 · Auto mode overridden at 01:12',
      scene: 'midnight',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'lying down',            active: true },
        cognitive_load:  { value: 'low (late night)',      active: true },
        social_exposure: { value: 'alone',                 active: false },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'auto → overridden',     active: true },
        disclosure_dial: { value: 'full',                  active: false },
      },
      why: {
        heading: 'Why block a user who set Auto?',
        bullets: [
          { token: 'Autonomy Dial', text: 'Set to Auto — but D6 fires regardless when risk threshold is met.' },
          { token: 'Physical State', text: 'Lying posture + 01:12 = L2 pattern: "67% of late-night purchases regretted"' },
          { token: 'Feasibility', text: '¥38,000 purchase. Brain inserts a sleep-gate, not a block.' },
        ],
        patterns: ['D6 Dynamic Friction', 'D1 Approval Gate'],
      },
      render() {
        return `
<div class="mx-midnight">
  <div class="mx-midnight__statusbar">
    <span>01:12</span>
    <span>Auto · 🔋 82%</span>
  </div>
  <div class="mx-midnight__product">
    <div class="mx-midnight__product-img">👟</div>
    <div class="mx-midnight__product-name">Nike Air Max 2025</div>
    <div class="mx-midnight__product-price">¥38,000</div>
  </div>
  <div class="mx-midnight__friction-card">
    <div class="mx-midnight__friction-title">Sleep on it?</div>
    <div class="mx-midnight__friction-sub">L2 Brain: 67% of ¥30k+ purchases at 01:00+ are returned by morning</div>
    <div class="mx-midnight__friction-time">Cart saved · reminded at 07:30 →</div>
  </div>
  <div class="mx-midnight__actions">
    <div class="mx-midnight__buy-btn is-gated">Buy anyway (confirm required)</div>
    <div class="mx-midnight__sleep-btn is-visible">✓ Remind me in the morning</div>
  </div>
</div>`;
      },
    },

    /* ── 05 Kid Sick ────────────────────────────────────── */
    {
      id: 'kidsick',
      chapter: '05 Kid Sick',
      title: '05 · 1 of 14 breaks through Focus Mode',
      scene: 'kidsick',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'stationary (desk)',     active: false },
        cognitive_load:  { value: 'high (focus mode)',     active: true },
        social_exposure: { value: 'alone',                 active: false },
        priority_weight: { value: 'critical (child)',      active: true },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'confirm',               active: false },
        disclosure_dial: { value: 'full (family)',         active: false },
      },
      why: {
        heading: 'Why 1 notification, not 14?',
        bullets: [
          { token: 'Cognitive Load', text: 'Focus Mode active → everything suppressed except critical.' },
          { token: 'Priority Weight', text: '"school + fever" = Identity Layer hard-priority. Overrides focus.' },
          { token: 'A6 Care Architecture', text: 'Brain handles logistics (reroute, draft message) so Hana just decides.' },
        ],
        patterns: ['A6 Care Architecture', 'D6 Dynamic Friction', 'A2 Cognitive Scaling'],
      },
      render() {
        return `
<div class="mx-kidsick">
  <div class="mx-kidsick__focusbar">
    <div class="mx-kidsick__focus-label">🎯 Focus Mode</div>
    <div class="mx-kidsick__muted">14 muted</div>
  </div>
  <div class="mx-kidsick__silent-stack">
    ${[0,1,2,3,4].map(() => `
    <div class="mx-kidsick__notif-muted">
      <div class="mx-kidsick__notif-icon"></div>
      <div class="mx-kidsick__notif-bar"></div>
    </div>`).join('')}
  </div>
  <div class="mx-kidsick__breakthrough">
    <div class="mx-kidsick__bt-chip">
      <div class="mx-kidsick__bt-dot"></div>
      Critical · School
    </div>
    <div class="mx-kidsick__bt-title">Sota — 38.1°C fever<br>Nurse asks for pickup</div>
    <div class="mx-kidsick__bt-meta">Oak Valley MS · 12:30 — 14 other notifications stayed silent</div>
    <div class="mx-kidsick__bt-actions">
      <div class="mx-kidsick__bt-btn mx-kidsick__bt-btn--primary">Call back</div>
      <div class="mx-kidsick__bt-btn mx-kidsick__bt-btn--ghost">Text "leaving now"</div>
    </div>
  </div>
</div>`;
      },
    },

    /* ── 06 Onboarding ──────────────────────────────────── */
    {
      id: 'onboarding',
      chapter: '06 Onboarding',
      title: '06 · Week 1 → Month 6 in one swipe',
      scene: 'onboarding',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'stationary',            active: false },
        cognitive_load:  { value: 'low',                   active: false },
        social_exposure: { value: 'alone',                 active: false },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'suggest → auto',        active: true },
        disclosure_dial: { value: 'grows with trust',      active: true },
      },
      why: {
        heading: 'Why does the UI disappear over time?',
        bullets: [
          { token: 'Autonomy Dial', text: 'Week 1 = Suggest (3 choices). Month 6 = Auto (nothing shown).' },
          { token: 'D2 Progressive Trust', text: 'Brain learns preferences → narrows choices → removes friction.' },
          { token: 'Disclosure Dial', text: 'More disclosure unlocks more autonomy. They scale together.' },
        ],
        patterns: ['D2 Progressive Trust', 'D4 Omakase Mode'],
      },
      render() {
        return `
<div class="mx-onboard">
  <div class="mx-onboard__header">
    <div class="mx-onboard__title">Reorder: Yogurt</div>
    <div class="mx-onboard__stage-chip">Month 6 · Auto</div>
  </div>
  <div class="mx-onboard__choices">
    <!-- Week 1 memory (faded) -->
    <div class="mx-onboard__choice" style="opacity:0.2">
      <span>Meiji Plain 400g</span>
      <span class="mx-onboard__choice-meta">Week 1 · 3 choices shown</span>
    </div>
    <div class="mx-onboard__choice" style="opacity:0.15">
      <span>Oikos High Protein</span>
      <span class="mx-onboard__choice-meta">—</span>
    </div>
    <div class="mx-onboard__choice" style="opacity:0.1">
      <span>Greek Style Light</span>
      <span class="mx-onboard__choice-meta">—</span>
    </div>
  </div>
  <div class="mx-onboard__auto-msg">
    <strong>Ordered silently ✓</strong>
    Meiji Plain 400g · delivered Friday · ¥298<br>
    <span style="font-size:11px;color:rgba(26,24,22,0.35)">Month 6 · Brain learned your preference 23 times</span>
  </div>
</div>`;
      },
    },

    /* ── 07 TV Cast ─────────────────────────────────────── */
    {
      id: 'tvcast',
      chapter: '07 TV Cast',
      title: '07 · Phone becomes a remote control',
      scene: 'tvcast',
      device: 'iphone+tv',
      tokens: {
        physical_state:  { value: 'stationary (sofa)',     active: false },
        cognitive_load:  { value: 'low',                   active: false },
        social_exposure: { value: 'child present',         active: true },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'phone cast → TV',       active: true },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'confirm',               active: false },
        disclosure_dial: { value: 'child-aware',           active: true },
      },
      why: {
        heading: 'Why does the phone become a remote?',
        bullets: [
          { token: 'Form Factor', text: 'Cast detected → UI splits. TV = visuals. Phone = controls + price (hidden from kid).' },
          { token: 'Disclosure Dial', text: '"Child present" → A4 hides price on TV. Dad sees ¥4,800 on phone only.' },
          { token: 'A1 Component Split', text: 'Not mirroring — a different UI for each surface, same intent.' },
        ],
        patterns: ['A1 Form Factor Transform', 'A4 Disclosure Cascade'],
      },
      render() {
        return `
<div class="morph-tvcast-shell">
  <!-- Phone: remote -->
  <div style="width:clamp(140px,14vw,180px);flex-shrink:0;height:100%;">
    <div class="mx-tvcast-phone">
      <div class="mx-tvcast-phone__header">
        <span style="font-size:13px;font-weight:700">Shoes</span>
        <span class="mx-tvcast-phone__cast-icon">⬛</span>
      </div>
      <div class="mx-tvcast-remote">
        <div style="font-size:10px;color:rgba(26,24,22,0.4);font-family:var(--font-mono)">REMOTE MODE</div>
        <div class="mx-tvcast-remote__dpad">
          <div class="mx-tvcast-remote__dpad-btn mx-tvcast-remote__dpad-btn--blank"></div>
          <div class="mx-tvcast-remote__dpad-btn">▲</div>
          <div class="mx-tvcast-remote__dpad-btn mx-tvcast-remote__dpad-btn--blank"></div>
          <div class="mx-tvcast-remote__dpad-btn">◀</div>
          <div class="mx-tvcast-remote__dpad-btn mx-tvcast-remote__dpad-btn--center">OK</div>
          <div class="mx-tvcast-remote__dpad-btn">▶</div>
          <div class="mx-tvcast-remote__dpad-btn mx-tvcast-remote__dpad-btn--blank"></div>
          <div class="mx-tvcast-remote__dpad-btn">▼</div>
          <div class="mx-tvcast-remote__dpad-btn mx-tvcast-remote__dpad-btn--blank"></div>
        </div>
        <div class="mx-tvcast-remote__price">¥4,800</div>
        <div class="mx-tvcast-remote__item">Nike Air GS · Size 22.5</div>
        <div class="mx-tvcast-remote__buy">Buy</div>
      </div>
    </div>
  </div>
  <!-- TV -->
  <div style="flex:1;max-width:200px;">
    <div class="morph-tv">
      <div class="morph-tv__screen mx-tv-display">
        <div class="mx-tv-display__product">👟</div>
        <div class="mx-tv-display__label">Nike Air GS · Size 22.5</div>
        <div class="mx-tv-display__tags">
          <div class="mx-tv-display__tag">Waterproof</div>
          <div class="mx-tv-display__tag">Lightweight</div>
        </div>
      </div>
      <div class="morph-tv__stand"></div>
    </div>
    <div style="font-size:9px;color:rgba(240,236,228,0.3);text-align:center;margin-top:6px;font-family:var(--font-mono)">Price hidden from kid</div>
  </div>
</div>`;
      },
    },

    /* ── 08 MPO Dinner ──────────────────────────────────── */
    {
      id: 'mpodinner',
      chapter: '08 MPO Dinner',
      title: '08 · One question. Four different UIs.',
      scene: 'mpodinner',
      device: 'mpo',
      tokens: {
        physical_state:  { value: 'varies per person',     active: true },
        cognitive_load:  { value: 'varies per person',     active: true },
        social_exposure: { value: 'family · 4 members',    active: true },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'fridge + phone×3',      active: true },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'varies per person',     active: true },
        disclosure_dial: { value: 'varies per person',     active: false },
      },
      why: {
        heading: 'Why four different UIs?',
        bullets: [
          { token: 'Multi-Person Orchestration', text: 'Same intent hits 4 people simultaneously. Brain splits per-person context.' },
          { token: 'Cognitive Load', text: 'Mom (high) gets 1 action. Dad (commute) gets 2. Leo (6yo) gets thumbs only.' },
          { token: 'Social Exposure', text: 'Aoi has dairy allergy — her list auto-filters. Identity Layer L1.' },
        ],
        patterns: ['D1 Approval Gate', 'A2 Cognitive Scaling', 'A3 Social-Aware Filtering', 'D5 Substitution Modes'],
      },
      render() {
        return `
<div class="mx-mpo">
  <!-- Mom (Fridge) -->
  <div class="mx-mpo__device mx-mpo__device--mom">
    <div class="mx-mpo__device-label">Mai · Mom · Fridge</div>
    <div class="mx-mpo__device-content">
      <div class="mx-mpo-item mx-mpo-item--selected">
        <span>Miso soup + salmon</span>
        <span class="mx-mpo-item__meta">18 min</span>
      </div>
      <div class="mx-mpo-item">
        <span>Pasta tomato</span>
        <span class="mx-mpo-item__meta">25 min</span>
      </div>
      <div style="padding:6px 0 2px;display:flex;gap:6px;">
        <div style="flex:1;padding:8px;background:#1a1816;color:#fdfcfa;border-radius:8px;text-align:center;font-size:11px;font-weight:600">OK</div>
        <div style="flex:1;padding:8px;background:rgba(26,24,22,0.06);border-radius:8px;text-align:center;font-size:11px;color:rgba(26,24,22,0.5)">Other</div>
      </div>
    </div>
  </div>
  <!-- Dad (Phone on train) -->
  <div class="mx-mpo__device">
    <div class="mx-mpo__device-label">Kenji · Dad · Train</div>
    <div class="mx-mpo__device-content">
      <div class="mx-mpo-summary">Dinner: 2 options</div>
      <div class="mx-mpo-item">
        <span>Miso + salmon</span>
      </div>
      <div class="mx-mpo-item">
        <span>Pasta</span>
      </div>
      <div class="mx-mpo-summary-sub">Tap to vote ·<br>Cognitive load high</div>
    </div>
  </div>
  <!-- Daughter (Dairy-free) -->
  <div class="mx-mpo__device">
    <div class="mx-mpo__device-label">Aoi · Daughter</div>
    <div class="mx-mpo__device-content">
      <div class="mx-mpo-filter-chip">dairy-free filter · L1</div>
      <div class="mx-mpo-item">
        <span>Miso soup</span>
      </div>
      <div class="mx-mpo-item">
        <span>Tofu steak</span>
      </div>
      <div style="font-size:9px;color:rgba(26,24,22,0.3);padding-top:2px">Pasta hidden (cream)</div>
    </div>
  </div>
  <!-- Leo (Son · Giant icons) -->
  <div class="mx-mpo__device">
    <div class="mx-mpo__device-label">Leo · 9yo · TV</div>
    <div class="mx-mpo-vote">
      <div class="mx-mpo-vote__btn mx-mpo-vote__btn--yes">👍</div>
      <div class="mx-mpo-vote__btn mx-mpo-vote__btn--no">👎</div>
    </div>
  </div>
</div>`;
      },
    },
  ];

  /* ── SVG chrome path ─────────────────────────────────── */
  const SVG_ROOT = '../../Global_Assets/DeviceFrame/';

  /* ── Render device wrapper ──────────────────────────── */
  function renderDevice(scenario) {
    const content = scenario.render();
    if (scenario.device === 'iphone') {
      return `
<div class="iphone15pro iphone15pro--lg">
  <img class="iphone15pro__chrome" src="${SVG_ROOT}IPhone_15_Pro_Vector.svg" alt="" aria-hidden="true">
  <div class="iphone15pro__screen">${content}</div>
  <div class="iphone15pro__island" aria-hidden="true"></div>
</div>`;
    }
    if (scenario.device === 'fridge') {
      return `
<div class="samfh samfh--md">
  <img class="samfh__chrome" src="${SVG_ROOT}Samsung_Family_Hub_Fridge.svg" alt="" aria-hidden="true">
  <div class="samfh__screen">${content}</div>
</div>`;
    }
    if (scenario.device === 'carplay') {
      return `
<div class="morph-carplay">
  <div class="morph-carplay__screen">${content}</div>
</div>`;
    }
    if (scenario.device === 'iphone+tv' || scenario.device === 'mpo') {
      return content; // rendered inline with its own framing
    }
    return `<div class="morph-device-inner">${content}</div>`;
  }

  /* ── State ──────────────────────────────────────────── */
  let currentIndex = 0;
  let isPlaying = true;
  let intervalId = null;
  let progressRafId = null;
  let progressStart = null;
  const STEP_DURATION = 5000; // ms per scenario

  /* ── DOM refs ──────────────────────────────────────── */
  const stageEl       = document.getElementById('morph-device-wrap');
  const sceneEl       = document.getElementById('morph-scene');
  const signalsListEl = document.getElementById('morph-signals-list');
  const dialsListEl   = document.getElementById('morph-dials-list');
  const whyHeading    = document.getElementById('morph-why-heading');
  const whyBullets   = document.getElementById('morph-why-bullets');
  const whyPatterns  = document.getElementById('morph-why-patterns');
  const chaptersEl   = document.getElementById('morph-chapters');
  const playBtn      = document.getElementById('play-pause-btn');
  const playIcon     = document.getElementById('play-icon');
  const prevBtn      = document.getElementById('prev-btn');
  const nextBtn      = document.getElementById('next-btn');
  const progressBar  = document.getElementById('morph-bar');
  const labelEl      = document.getElementById('morph-scenario-label');
  const announce     = document.getElementById('live-announce');

  /* ── Build chapter chips ─────────────────────────── */
  function buildChapters() {
    chaptersEl.innerHTML = '';
    SCENARIOS.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'morph-chapter';
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-label', `Go to scenario ${i + 1}: ${s.title}`);
      btn.dataset.index = i;
      btn.innerHTML = `<span class="morph-chapter__dot"></span><span>${s.chapter}</span>`;
      btn.addEventListener('click', () => { goTo(i); pausePlay(); });
      chaptersEl.appendChild(btn);
    });
  }

  /* ── Build token chips ───────────────────────────── */
  function buildTokens() {
    signalsListEl.innerHTML = '';
    dialsListEl.innerHTML = '';
    TOKEN_DEFS.forEach(def => {
      const chip = document.createElement('div');
      chip.className = 'morph-token';
      chip.dataset.token = def.id;
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('role', 'button');
      chip.setAttribute('aria-label', def.label);
      chip.innerHTML = `
<span class="morph-token__dot" aria-hidden="true"></span>
<span class="morph-token__body">
  <span class="morph-token__name">${def.label}</span>
  <span class="morph-token__value" id="tv-${def.id}">—</span>
</span>`;
      if (def.id === 'autonomy_dial' || def.id === 'disclosure_dial') {
        dialsListEl.appendChild(chip);
      } else {
        signalsListEl.appendChild(chip);
      }
    });
  }

  /* ── Activate scenario ───────────────────────────── */
  function activate(index, animate = true) {
    const s = SCENARIOS[index];
    if (!s) return;

    // Update scene background
    sceneEl.className = `morph-scene morph-scene--${s.scene}`;

    // Label
    if (labelEl) labelEl.textContent = `${s.chapter}`;

    // Device UI (animate)
    if (animate) {
      stageEl.classList.add('is-transitioning');
      setTimeout(() => {
        stageEl.innerHTML = renderDevice(s);
        stageEl.classList.remove('is-transitioning');
      }, 300);
    } else {
      stageEl.innerHTML = renderDevice(s);
    }

    // Token chips
    TOKEN_DEFS.forEach(def => {
      const chip = document.querySelector(`[data-token="${def.id}"]`);
      const valEl = document.getElementById(`tv-${def.id}`);
      const tokenData = s.tokens[def.id];
      if (!chip || !valEl || !tokenData) return;
      const isActive = tokenData.active;
      chip.classList.toggle('morph-token--active', isActive);
      valEl.textContent = tokenData.value;
    });

    // Why panel
    whyHeading.textContent = s.why.heading;
    whyBullets.innerHTML = s.why.bullets.map(b => `
<li class="morph-why__bullet">
  <span class="morph-why__bullet-token">${b.token}</span>
  <span class="morph-why__bullet-text">${b.text}</span>
</li>`).join('');
    whyPatterns.innerHTML = s.why.patterns.map(p =>
      `<span class="morph-why__pattern">${p}</span>`
    ).join('');

    // Chapter chips
    chaptersEl.querySelectorAll('.morph-chapter').forEach((el, i) => {
      el.classList.toggle('morph-chapter--active', i === index);
    });

    // Accessibility announce
    if (announce) announce.textContent = `Scenario ${index + 1}: ${s.title}`;

    currentIndex = index;
  }

  /* ── Navigation ─────────────────────────────────── */
  function goTo(index) {
    activate(index);
    resetProgress();
  }

  function next() {
    goTo((currentIndex + 1) % SCENARIOS.length);
  }
  function prev() {
    goTo((currentIndex - 1 + SCENARIOS.length) % SCENARIOS.length);
  }

  /* ── Progress bar (RAF-based) ────────────────────── */
  function resetProgress() {
    progressStart = null;
    if (progressBar) progressBar.style.width = '0%';
    if (progressRafId) cancelAnimationFrame(progressRafId);
    if (isPlaying) tickProgress();
  }

  function tickProgress(ts) {
    if (!isPlaying) return;
    if (!progressStart) progressStart = ts;
    const elapsed = ts - progressStart;
    const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (elapsed >= STEP_DURATION) {
      next();
      return;
    }
    progressRafId = requestAnimationFrame(tickProgress);
  }

  function startProgress() {
    progressStart = null;
    if (progressRafId) cancelAnimationFrame(progressRafId);
    progressRafId = requestAnimationFrame(tickProgress);
  }

  function stopProgress() {
    if (progressRafId) cancelAnimationFrame(progressRafId);
    progressRafId = null;
  }

  /* ── Play / Pause ────────────────────────────────── */
  function pausePlay() {
    isPlaying = false;
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.setAttribute('aria-label', 'Resume auto-play');
    playIcon.textContent = '▶';
    playBtn.classList.remove('morph-ctrl--play');
    stopProgress();
    if (progressBar) progressBar.style.width = '0%';
  }

  function resumePlay() {
    isPlaying = true;
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.setAttribute('aria-label', 'Pause auto-play');
    playIcon.textContent = '⏸';
    playBtn.classList.add('morph-ctrl--play');
    startProgress();
  }

  function togglePlay() {
    if (isPlaying) pausePlay();
    else resumePlay();
  }

  /* ── Click stage to pause ────────────────────────── */
  const theaterEl = document.getElementById('morph-theater');
  if (theaterEl) {
    theaterEl.addEventListener('click', (e) => {
      // Only toggle if clicked on stage area, not on tokens/why
      if (e.target.closest('.morph-tokens') || e.target.closest('.morph-why')) return;
      togglePlay();
    });
  }

  /* ── Button listeners ────────────────────────────── */
  playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); pausePlay(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); pausePlay(); });

  /* ── Keyboard shortcuts ─────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.key) {
      case ' ': e.preventDefault(); togglePlay(); break;
      case 'ArrowLeft': e.preventDefault(); prev(); pausePlay(); break;
      case 'ArrowRight': e.preventDefault(); next(); pausePlay(); break;
      case 'r': case 'R': goTo(0); resumePlay(); break;
      default:
        if (e.key >= '1' && e.key <= '8') {
          const idx = parseInt(e.key, 10) - 1;
          if (idx < SCENARIOS.length) { goTo(idx); pausePlay(); }
        }
    }
  });

  /* ── Reduced motion: no auto-play ───────────────── */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Init ────────────────────────────────────────── */
  function init() {
    buildChapters();
    buildTokens();
    activate(0, false);

    if (prefersReducedMotion()) {
      pausePlay();
    } else {
      // Brief pause then start
      setTimeout(() => {
        resumePlay();
      }, 800);
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
