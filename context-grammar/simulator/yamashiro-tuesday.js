/* ═══════════════════════════════════════════════════════════
   Context Grammar · Yamashiro Tuesday — Agentic Product Console
   yamashiro-tuesday.js
   8 family moments · Lab Console · auto-play tour · live recompute
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Token definitions ──────────────────────────────────── */
  const TOKEN_DEFS = [
    { id: 'physical_state',   label: 'Physical',     full: 'Physical State',   group: 'signals' },
    { id: 'cognitive_load',   label: 'Cognitive',    full: 'Cognitive Load',   group: 'signals' },
    { id: 'social_exposure',  label: 'Social',       full: 'Social Exposure',  group: 'signals' },
    { id: 'priority_weight',  label: 'Priority',     full: 'Priority Weight',  group: 'signals' },
    { id: 'form_factor',      label: 'Form',         full: 'Form Factor',      group: 'signals' },
    { id: 'feasibility',      label: 'Feasibility',  full: 'Feasibility',      group: 'signals' },
    { id: 'autonomy_dial',    label: 'Autonomy',     full: 'Autonomy Dial',    group: 'dials' },
    { id: 'disclosure_dial',  label: 'Disclosure',   full: 'Disclosure Dial',  group: 'dials' },
  ];

  /* ── Token enumeration values (for Lab dropdowns) ──────── */
  const TOKEN_ENUMS = {
    physical_state:  ['cooking (hands busy)', 'driving', 'stationary (desk)', 'walking (store aisle)', 'lying in bed', 'varies per person'],
    cognitive_load:  ['low', 'low (sleepy)', 'low (late night)', 'moderate', 'high (focus session)', 'high (road focus)', 'varies per person'],
    social_exposure: ['alone', 'alone in car', 'private', 'family', 'family · child', 'family · 4 members', 'public (strangers)'],
    priority_weight: ['breakfast', 'standard', 'study', 'high', 'critical — work', 'leisure', 'impulse purchase', 'evening — home'],
    form_factor:     ['fridge display', 'phone (handheld)', 'car display (CarPlay)', 'tablet → TV cast', 'fridge + phone × 3'],
    feasibility:     ['fully feasible', 'partial', 'blocked'],
    autonomy_dial:   ['suggest', 'confirm', 'notify', 'auto', 'confirm (parental)', 'suggest → overridden', 'varies per person'],
    disclosure_dial: ['full', 'full (household)', 'family-open', 'selective (family ok)', 'moderate', 'restricted (public)', 'child-protected'],
  };

  /* ── SVG chrome path ──────────────────────────────────── */
  const SVG_ROOT = '../../Global_Assets/DeviceFrame/';

  /* ══════════════════════════════════════════════════════════
     SCENARIOS — 8 Yamashiro Tuesday moments
     Each carries: tokens, why, renderUI(), uiCommand, rulesYaml
     ══════════════════════════════════════════════════════════ */
  const SCENARIOS = [

    /* ── 01: 06:30 Kitchen — Mai ──────────────────────────── */
    {
      id: 'kitchen',
      chapter: '01 · 06:30 Kitchen',
      title: '01 · Fridge shows one card. Mai never touches the screen.',
      time: '06:30',
      person: 'Mai',
      place: 'Kitchen',
      scene: 'kitchen',
      character: 'Mai',
      device: 'fridge',
      tokens: {
        physical_state:  { value: 'cooking (hands busy)',   active: true  },
        cognitive_load:  { value: 'low',                    active: true  },
        social_exposure: { value: 'family',                 active: false },
        priority_weight: { value: 'breakfast',              active: false },
        form_factor:     { value: 'fridge display',         active: true  },
        feasibility:     { value: 'fully feasible',         active: false },
        autonomy_dial:   { value: 'confirm',                active: false },
        disclosure_dial: { value: 'full (household)',       active: false },
      },
      why: {
        heading: 'Why a giant single card?',
        bullets: [
          { token: 'Form Factor', text: 'Fridge display = glance distance. Hands wet. One-tap only.' },
          { token: 'Physical State', text: 'Cooking = both hands occupied. Navigation menus are impossible.' },
          { token: 'Cognitive Load', text: 'Low but morning-busy → max_choices=1. One recipe. One button.' },
        ],
        axPatterns: [
          { code: 'A1', name: 'Form Factor Transform' },
        ],
      },
      uiCommand: {
        surface: 'fridge',
        layout: 'voice-first',
        autonomy: 'confirm',
        disclosure: 'family',
        overrides: ['hands_busy_lock'],
        primaryActions: ['start_recipe'],
      },
      rulesYaml:
`# rules.yml · A1 Form Factor Transform
- when:
    form_factor: fridge
    physical_state: cooking
  then:
    apply: A1_form_factor_transform
    layout: voice-first
    max_choices: 1
    voice_ready: true`,
      rulesYamlActiveLine: 6,
      renderUI() {
        return `
<div class="yt-fridge">
  <div class="yt-fridge__time">06:30 · Kitchen · Mai</div>
  <div class="yt-fridge__title">Yogurt Parfait<br>for 4</div>
  <div class="yt-fridge__meta">18 min · ¥0 added cost</div>
  <div class="yt-fridge__ingredients">
    <div class="yt-fridge__ingredient">
      <span>Meiji Plain Yogurt</span>
      <span class="yt-fridge__ingredient-qty">400g ✓</span>
    </div>
    <div class="yt-fridge__ingredient">
      <span>Mixed berries</span>
      <span class="yt-fridge__ingredient-qty">1 pack ✓</span>
    </div>
    <div class="yt-fridge__ingredient">
      <span>Granola</span>
      <span class="yt-fridge__ingredient-qty">200g ✓</span>
    </div>
  </div>
  <div class="yt-fridge__start-btn" role="button" aria-label="Start recipe">▶ Start</div>
  <div class="yt-fridge__instruction">Voice-ready · hands-free</div>
</div>`;
      },
    },

    /* ── 02: 08:15 Commute — Kiran ───────────────────────── */
    {
      id: 'driving',
      chapter: '02 · 08:15 Commute',
      title: '02 · Tap targets disappear. Voice only.',
      time: '08:15',
      person: 'Kiran',
      place: 'Car',
      scene: 'driving',
      character: 'Kiran',
      device: 'carplay',
      tokens: {
        physical_state:  { value: 'driving',                active: true  },
        cognitive_load:  { value: 'high (road focus)',      active: true  },
        social_exposure: { value: 'alone in car',           active: false },
        priority_weight: { value: 'high',                   active: true  },
        form_factor:     { value: 'car display (CarPlay)',  active: true  },
        feasibility:     { value: 'fully feasible',         active: false },
        autonomy_dial:   { value: 'notify',                 active: true  },
        disclosure_dial: { value: 'moderate',               active: false },
      },
      why: {
        heading: 'Why is the screen almost empty?',
        bullets: [
          { token: 'Physical State', text: 'Driving = hard override. Zero visual competition for road attention.' },
          { token: 'Form Factor', text: 'CarPlay = voice-primary. All interaction is audio-only.' },
          { token: 'D6 Dynamic Friction', text: 'Any tap target appearing during drive = friction violation. Rule Engine blocks them.' },
        ],
        axPatterns: [
          { code: 'A1', name: 'Form Factor Transform' },
          { code: 'D6', name: 'Dynamic Friction' },
        ],
      },
      uiCommand: {
        surface: 'carplay',
        layout: 'voice-only',
        autonomy: 'notify',
        disclosure: 'restricted',
        overrides: ['safety_first', 'no_tap_targets'],
        primaryActions: ['voice_only'],
      },
      rulesYaml:
`# rules.yml · D6 Dynamic Friction
- when:
    form_factor: carplay
    physical_state: driving
  then:
    apply: D6_dynamic_friction
    layout: voice-only
    suppress: [tap_targets, modals]
    hold_messages: true`,
      rulesYamlActiveLine: 7,
      renderUI() {
        return `
<div class="yt-carplay-mock">
  <div class="yt-carplay-screen">
    <div class="yt-carplay__override-chip">Safety Override Active</div>
    <div class="yt-carplay__wave" aria-label="Voice assistant active" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="yt-carplay__nav-text">Navigation: Office<br>23 min</div>
    <div class="yt-carplay__nav-sub">1 message held · announce at destination</div>
    <div class="yt-carplay__no-touch">No tap targets · voice commands only</div>
  </div>
</div>`;
      },
    },

    /* ── 03: 11:00 Focus — Aoi (15) ──────────────────────── */
    {
      id: 'study',
      chapter: '03 · 11:00 Study',
      title: '03 · 14 notifications muted. 1 breaks through.',
      time: '11:00',
      person: 'Aoi',
      place: 'Bedroom',
      scene: 'study',
      character: 'Aoi',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'stationary (desk)',      active: false },
        cognitive_load:  { value: 'high (focus session)',   active: true  },
        social_exposure: { value: 'private',                active: true  },
        priority_weight: { value: 'study',                  active: true  },
        form_factor:     { value: 'phone (handheld)',       active: false },
        feasibility:     { value: 'fully feasible',         active: false },
        autonomy_dial:   { value: 'confirm',                active: false },
        disclosure_dial: { value: 'selective (family ok)',  active: true  },
      },
      why: {
        heading: 'Why 1 notification, not 14?',
        bullets: [
          { token: 'Priority Weight', text: 'Study mode = Identity Layer priority. Everything suppressed except family.' },
          { token: 'Cognitive Load', text: 'High → Rule Engine applies maximum cognitive protection.' },
          { token: 'Disclosure Dial', text: '"Family ok" in Disclosure = only dad breaks through. The 13 others respect the lock.' },
        ],
        axPatterns: [
          { code: 'E1', name: 'Priority Weight' },
          { code: 'A6', name: 'Care Mode' },
        ],
      },
      uiCommand: {
        surface: 'iphone',
        layout: 'focus-lock',
        autonomy: 'confirm',
        disclosure: 'family',
        overrides: ['focus_protect'],
        primaryActions: ['allow_family_only'],
      },
      rulesYaml:
`# rules.yml · E1 Priority Weight
- when:
    cognitive_load: high
    priority_weight: study
  then:
    apply: E1_priority_weight
    layout: focus-lock
    allow_through: [family_priority]
    mute_count: 14`,
      rulesYamlActiveLine: 7,
      renderUI() {
        return `
<div class="yt-focus">
  <div class="yt-focus__bar">
    <div class="yt-focus__label">
      <span>🎯</span><span>Focus · Study</span>
    </div>
    <div class="yt-focus__muted-count">14 muted</div>
  </div>
  <div class="yt-focus__clock" aria-hidden="true">
    <div class="yt-focus__clock-time">11:02</div>
    <div class="yt-focus__clock-date">Tue · May · Study session</div>
  </div>
  <div class="yt-focus__muted-stack" aria-hidden="true">
    <div class="yt-focus__muted-row"><div class="yt-focus__muted-icon"></div><div class="yt-focus__muted-bar"></div></div>
    <div class="yt-focus__muted-row"><div class="yt-focus__muted-icon"></div><div class="yt-focus__muted-bar"></div></div>
    <div class="yt-focus__muted-row"><div class="yt-focus__muted-icon"></div><div class="yt-focus__muted-bar"></div></div>
  </div>
  <div class="yt-focus__breakthrough" role="alert">
    <div class="yt-focus__bt-chip">
      <div class="yt-focus__bt-dot" aria-hidden="true"></div>
      Allowed through · Dad
    </div>
    <div class="yt-focus__bt-title">Dad ♥  "Good luck with the test, Aoi"</div>
    <div class="yt-focus__bt-meta">Family · Priority contact · 13 others stayed silent</div>
  </div>
</div>`;
      },
    },

    /* ── 04: 13:30 Shopping — Mai ─────────────────────────── */
    {
      id: 'shopping',
      chapter: '04 · 13:30 Shopping',
      title: '04 · Prices blur in the store aisle.',
      time: '13:30',
      person: 'Mai',
      place: 'Store',
      scene: 'shopping',
      character: 'Mai',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'walking (store aisle)', active: false },
        cognitive_load:  { value: 'moderate',              active: false },
        social_exposure: { value: 'public (strangers)',    active: true  },
        priority_weight: { value: 'standard',              active: false },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'suggest',               active: false },
        disclosure_dial: { value: 'restricted (public)',   active: true  },
      },
      why: {
        heading: 'Why are prices blurred?',
        bullets: [
          { token: 'Social Exposure', text: 'Public mode detected. Someone nearby can see the screen.' },
          { token: 'Disclosure Dial', text: '"Restricted in public" → financial data is private. A4 fires automatically.' },
          { token: 'A4 Disclosure Cascade', text: 'Content filter = maximum. Prices blur, total masked, shoulder icon appears.' },
        ],
        axPatterns: [
          { code: 'A4', name: 'Disclosure Cascade' },
        ],
      },
      uiCommand: {
        surface: 'iphone',
        layout: 'redacted-list',
        autonomy: 'suggest',
        disclosure: 'redacted',
        overrides: ['hide_prices', 'mask_totals'],
        primaryActions: ['view_list', 'tap_to_reveal'],
      },
      rulesYaml:
`# rules.yml · A4 Disclosure Cascade
- when:
    social_exposure: public
    disclosure_dial: restricted
  then:
    apply: A4_disclosure_cascade
    layout: redacted-list
    blur: [prices, totals]
    show_indicator: shoulder_dot`,
      rulesYamlActiveLine: 7,
      renderUI() {
        return `
<div class="yt-shopping">
  <div class="yt-shopping__header">
    <div class="yt-shopping__title">Shopping List</div>
    <div class="yt-shopping__shield" aria-label="Private mode active">🔒</div>
  </div>
  <div class="yt-shopping__items">
    <div class="yt-shopping__item">
      <span class="yt-shopping__item-name">Miso paste</span>
      <span class="yt-shopping__item-price" aria-label="Price hidden">¥480</span>
    </div>
    <div class="yt-shopping__item">
      <span class="yt-shopping__item-name">Salmon fillet × 4</span>
      <span class="yt-shopping__item-price" aria-label="Price hidden">¥1,200</span>
    </div>
    <div class="yt-shopping__item">
      <span class="yt-shopping__item-name">Tofu block</span>
      <span class="yt-shopping__item-price" aria-label="Price hidden">¥198</span>
    </div>
    <div class="yt-shopping__item">
      <span class="yt-shopping__item-name">Green onion</span>
      <span class="yt-shopping__item-price" aria-label="Price hidden">¥128</span>
    </div>
  </div>
  <div class="yt-shopping__total">
    <span class="yt-shopping__total-label">Total</span>
    <div style="text-align:right">
      <div class="yt-shopping__total-value">¥—,—— <span class="yt-shopping__reveal-hint">(tap to reveal)</span></div>
    </div>
  </div>
  <div class="yt-shopping__shoulder-warn" aria-live="polite">
    <div class="yt-shopping__shoulder-dot" aria-hidden="true"></div>
    Someone nearby · prices hidden automatically
  </div>
</div>`;
      },
    },

    /* ── 05: 17:30 Homecoming — Full Family MPO ──────────── */
    {
      id: 'homecoming',
      chapter: '05 · 17:30 Home',
      title: '05 · Same intent. Four family members. Four UIs.',
      time: '17:30',
      person: 'Family',
      place: 'Home',
      scene: 'homecoming',
      character: 'Family',
      device: 'mpo',
      tokens: {
        physical_state:  { value: 'varies per person',     active: true  },
        cognitive_load:  { value: 'varies per person',     active: true  },
        social_exposure: { value: 'family · 4 members',    active: true  },
        priority_weight: { value: 'evening — home',        active: false },
        form_factor:     { value: 'fridge + phone × 3',    active: true  },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'varies per person',     active: true  },
        disclosure_dial: { value: 'family-open',           active: false },
      },
      why: {
        heading: 'Why four different UIs?',
        bullets: [
          { token: 'Multi-Person Orchestration', text: 'Same "family home" intent distributes to 4 people. Brain splits context per-person.' },
          { token: 'Form Factor', text: 'Fridge for Mai, iPhones for Kiran & Aoi, tablet for Sota. Each surface gets the right depth.' },
          { token: 'Autonomy Dial varies', text: 'Sota gets a locked screen (parental), Kiran gets held work pings, Aoi gets a reminder. Same event.' },
        ],
        axPatterns: [
          { code: 'A1', name: 'Form Factor Transform' },
          { code: 'D3', name: 'Multi-Person Orchestration' },
        ],
      },
      uiCommand: {
        surface: 'mpo',
        layout: 'mpo-grid',
        autonomy: 'per_person',
        disclosure: 'family',
        overrides: ['split_by_person', 'parental_lock_sota'],
        primaryActions: ['welcome_home', 'announce_dinner'],
      },
      rulesYaml:
`# rules.yml · D3 Multi-Person Orchestration
- when:
    social_exposure: family
    form_factor: multi_surface
  then:
    apply: D3_mpo
    layout: mpo-grid
    split_by: family_member
    per_person_autonomy: true`,
      rulesYamlActiveLine: 7,
      renderUI() {
        return `
<div class="yt-mpo-grid" role="group" aria-label="Multi-Person Orchestration — four devices">
  <div class="yt-mpo-device">
    <div class="yt-mpo-device__label">Mai · Fridge</div>
    <div class="yt-mpo-device__body">
      <div class="yt-mpo-msg">Welcome back.</div>
      <div class="yt-mpo-msg" style="color:#30c969">Dinner: Curry</div>
      <div class="yt-mpo-sub">(started · ready 45 min)</div>
    </div>
  </div>
  <div class="yt-mpo-device">
    <div class="yt-mpo-device__label">Kiran · iPhone</div>
    <div class="yt-mpo-device__body">
      <div class="yt-mpo-msg">2 work pings held.</div>
      <div class="yt-mpo-sub">Dinner in 45 min</div>
      <div class="yt-mpo-badge">Autonomy · Notify</div>
    </div>
  </div>
  <div class="yt-mpo-device">
    <div class="yt-mpo-device__label">Aoi · iPhone</div>
    <div class="yt-mpo-device__body">
      <div class="yt-mpo-msg">Homework reminder</div>
      <div class="yt-mpo-sub">7:00 pm · 2 hrs left</div>
      <div class="yt-mpo-badge">Priority · Study</div>
    </div>
  </div>
  <div class="yt-mpo-device">
    <div class="yt-mpo-device__label">Sota · Tablet</div>
    <div class="yt-mpo-device__body">
      <div class="yt-mpo-msg">TV unlocked 🎉</div>
      <div class="yt-mpo-sub">1 h screen time</div>
      <div class="yt-mpo-badge">Parental · Confirm</div>
    </div>
  </div>
</div>`;
      },
    },

    /* ── 06: 19:30 TV Evening — Sota (11) + Parents ──────── */
    {
      id: 'tvevening',
      chapter: '06 · 19:30 TV',
      title: '06 · Sota\'s remote hides prices. TV shows movies.',
      time: '19:30',
      person: 'Sota',
      place: 'Living room',
      scene: 'tvevening',
      character: 'Sota',
      device: 'split',
      tokens: {
        physical_state:  { value: 'stationary (sofa)',     active: false },
        cognitive_load:  { value: 'low',                   active: false },
        social_exposure: { value: 'family · child',        active: true  },
        priority_weight: { value: 'leisure',               active: false },
        form_factor:     { value: 'tablet → TV cast',      active: true  },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'confirm (parental)',    active: true  },
        disclosure_dial: { value: 'child-protected',       active: true  },
      },
      why: {
        heading: 'Why does the tablet become a remote?',
        bullets: [
          { token: 'Form Factor', text: 'Cast detected → A1 splits UI. TV = movie browsing. Tablet = D-pad remote control.' },
          { token: 'Disclosure Dial', text: '"Child-protected" → A4 hides purchase prices and adult ratings on Sota\'s tablet.' },
          { token: 'A1 Component Split', text: 'Not mirroring — two different UIs for two different surfaces, same family intent.' },
        ],
        axPatterns: [
          { code: 'A1', name: 'Form Factor Transform' },
          { code: 'A4', name: 'Disclosure Cascade' },
        ],
      },
      uiCommand: {
        surface: 'split',
        layout: 'remote-control',
        autonomy: 'confirm',
        disclosure: 'child-safe',
        overrides: ['parental_lock', 'hide_prices', 'age_filter'],
        primaryActions: ['dpad', 'browse_movies'],
      },
      rulesYaml:
`# rules.yml · A1 + A4 Component Split
- when:
    form_factor: cast
    social_exposure: child
  then:
    apply: [A1_component_split, A4_disclosure]
    tablet_layout: remote-control
    tv_layout: movie-browser
    hide: [prices, adult_ratings]`,
      rulesYamlActiveLine: 6,
      renderUI() {
        return `
<div class="yt-split-view" role="group" aria-label="TV cast — tablet remote + TV screen">
  <div class="yt-split__phone" aria-label="Sota's tablet — remote control mode">
    <div class="yt-split__phone-header">
      <span style="font-size:11px;font-weight:700;color:#1a1816">Remote</span>
      <span class="yt-split__phone-chip">Sota · 11</span>
    </div>
    <div class="yt-split__remote">
      <div class="yt-split__dpad" aria-label="D-pad controls">
        <div class="yt-split__dpad-btn yt-split__dpad-btn--blank"></div>
        <div class="yt-split__dpad-btn" aria-label="Up">▲</div>
        <div class="yt-split__dpad-btn yt-split__dpad-btn--blank"></div>
        <div class="yt-split__dpad-btn" aria-label="Left">◀</div>
        <div class="yt-split__dpad-btn yt-split__dpad-btn--center" aria-label="Select">OK</div>
        <div class="yt-split__dpad-btn" aria-label="Right">▶</div>
        <div class="yt-split__dpad-btn yt-split__dpad-btn--blank"></div>
        <div class="yt-split__dpad-btn" aria-label="Down">▼</div>
        <div class="yt-split__dpad-btn yt-split__dpad-btn--blank"></div>
      </div>
    </div>
    <div class="yt-split__phone-note">No prices visible<br>Age-filtered only</div>
  </div>
  <div class="yt-split__tv-wrap" aria-label="TV display">
    <div class="yt-split__tv">
      <div class="yt-split__tv-screen">
        <div class="yt-split__tv-header">Movies · Age-filtered</div>
        <div class="yt-split__movie-grid">
          <div class="yt-split__movie-tile">
            <div class="yt-split__movie-icon">🦁</div>
            <div class="yt-split__movie-rating">G</div>
          </div>
          <div class="yt-split__movie-tile">
            <div class="yt-split__movie-icon">🚀</div>
            <div class="yt-split__movie-rating">PG</div>
          </div>
          <div class="yt-split__movie-tile">
            <div class="yt-split__movie-icon">🐉</div>
            <div class="yt-split__movie-rating">G</div>
          </div>
          <div class="yt-split__movie-tile">
            <div class="yt-split__movie-icon">🤖</div>
            <div class="yt-split__movie-rating">PG</div>
          </div>
          <div class="yt-split__movie-tile">
            <div class="yt-split__movie-icon">🧙</div>
            <div class="yt-split__movie-rating">PG</div>
          </div>
          <div class="yt-split__movie-tile" style="opacity:0.25">
            <div class="yt-split__movie-icon">🔞</div>
            <div class="yt-split__movie-rating">R</div>
          </div>
        </div>
      </div>
      <div class="yt-split__tv-stand"></div>
    </div>
    <div class="yt-split__tv-note">Prices hidden from Sota's view</div>
  </div>
</div>`;
      },
    },

    /* ── 07: 22:15 Work Crisis — Kiran ───────────────────── */
    {
      id: 'workcrisis',
      chapter: '07 · 22:15 Crisis',
      title: '07 · Focus broken. Server down. One tap to handle.',
      time: '22:15',
      person: 'Kiran',
      place: 'Bedroom',
      scene: 'workcrisis',
      character: 'Kiran',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'lying in bed',          active: true  },
        cognitive_load:  { value: 'low (sleepy)',          active: true  },
        social_exposure: { value: 'private',               active: false },
        priority_weight: { value: 'critical — work',       active: true  },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'notify',                active: true  },
        disclosure_dial: { value: 'full',                  active: false },
      },
      why: {
        heading: 'Why does Focus break for a server alert?',
        bullets: [
          { token: 'Priority Weight', text: 'Critical work event = E2 Escalation fires. Focus mode yields to priority threshold.' },
          { token: 'Cognitive Load', text: 'Low (sleepy) → UI stripped to minimum. One choice per action. No menus.' },
          { token: 'E2 Escalation', text: 'Brain surfaces emergency with minimum friction — red border, 2 buttons only.' },
        ],
        axPatterns: [
          { code: 'E2', name: 'Escalation' },
          { code: 'E1', name: 'Priority Weight' },
        ],
      },
      uiCommand: {
        surface: 'iphone',
        layout: 'emergency-breakthrough',
        autonomy: 'notify',
        disclosure: 'open',
        overrides: ['focus_break', 'strip_chrome'],
        primaryActions: ['handle_now', 'snooze_30'],
      },
      rulesYaml:
`# rules.yml · E2 Escalation
- when:
    priority_weight: critical
    cognitive_load: low
  then:
    apply: E2_escalation
    layout: emergency-breakthrough
    break_focus: true
    actions: [handle_now, snooze_30]`,
      rulesYamlActiveLine: 7,
      renderUI() {
        return `
<div class="yt-crisis">
  <div class="yt-crisis__statusbar">
    <span>22:15</span>
    <span>Focus · 🔋 74%</span>
  </div>
  <div class="yt-crisis__focus-bar" aria-label="Focus mode status">
    <span class="yt-crisis__focus-label">Focus Mode</span>
    <span class="yt-crisis__focus-on">Night · active</span>
  </div>
  <div class="yt-crisis__muted-stack" aria-hidden="true">
    <div class="yt-crisis__muted-row"><div class="yt-crisis__muted-icon"></div><div class="yt-crisis__muted-bar"></div></div>
    <div class="yt-crisis__muted-row"><div class="yt-crisis__muted-icon"></div><div class="yt-crisis__muted-bar"></div></div>
    <div class="yt-crisis__muted-row"><div class="yt-crisis__muted-icon"></div><div class="yt-crisis__muted-bar"></div></div>
  </div>
  <div class="yt-crisis__alert" role="alert" aria-live="assertive">
    <div class="yt-crisis__alert-chip">
      <div class="yt-crisis__alert-dot" aria-hidden="true"></div>
      URGENT · Work
    </div>
    <div class="yt-crisis__alert-title">Server down — Priya needs you now</div>
    <div class="yt-crisis__alert-meta">Production incident · E2 escalation · Focus overridden</div>
    <div class="yt-crisis__alert-actions">
      <div class="yt-crisis__btn yt-crisis__btn--primary">Handle now</div>
      <div class="yt-crisis__btn yt-crisis__btn--ghost">Snooze 30 min</div>
    </div>
  </div>
</div>`;
      },
    },

    /* ── 08: 23:45 Midnight Purchase — Mai ───────────────── */
    {
      id: 'midnight',
      chapter: '08 · 23:45 Midnight',
      title: '08 · ¥89,000 sofa at midnight. Checkout button demoted.',
      time: '23:45',
      person: 'Mai',
      place: 'Bedroom',
      scene: 'midnight',
      character: 'Mai',
      device: 'iphone',
      tokens: {
        physical_state:  { value: 'lying in bed',          active: true  },
        cognitive_load:  { value: 'low (late night)',      active: true  },
        social_exposure: { value: 'alone',                 active: false },
        priority_weight: { value: 'impulse purchase',      active: true  },
        form_factor:     { value: 'phone (handheld)',      active: false },
        feasibility:     { value: 'fully feasible',        active: false },
        autonomy_dial:   { value: 'suggest → overridden',  active: true  },
        disclosure_dial: { value: 'full',                  active: false },
      },
      why: {
        heading: 'Why is Checkout the secondary button?',
        bullets: [
          { token: 'Physical State', text: 'Lying posture + 23:45 = L2 pattern: high late-night purchase regret rate.' },
          { token: 'Priority Weight', text: '¥89,000 = high-value. Brain triggers D6 regardless of Autonomy Dial setting.' },
          { token: 'D6 Dynamic Friction', text: 'Sleep gate replaces the checkout button. "Save for tomorrow" is primary. Checkout is still there — just smaller.' },
        ],
        axPatterns: [
          { code: 'D6', name: 'Dynamic Friction' },
        ],
      },
      uiCommand: {
        surface: 'iphone',
        layout: 'friction-gate',
        autonomy: 'suggest',
        disclosure: 'open',
        overrides: ['sleep_gate', 'demote_checkout'],
        primaryActions: ['save_for_tomorrow', 'checkout_anyway'],
      },
      rulesYaml:
`# rules.yml · D6 Dynamic Friction (sleep gate)
- when:
    physical_state: lying_in_bed
    priority_weight: impulse_purchase
  then:
    apply: D6_dynamic_friction
    layout: friction-gate
    demote: checkout_button
    primary: save_for_tomorrow`,
      rulesYamlActiveLine: 7,
      renderUI() {
        return `
<div class="yt-midnight">
  <div class="yt-midnight__statusbar">
    <span>23:45</span>
    <span>🔋 31%</span>
  </div>
  <div class="yt-midnight__product">
    <div class="yt-midnight__product-img" aria-hidden="true">🛋️</div>
    <div class="yt-midnight__product-name">Nordic Linen Sofa 3-seat</div>
    <div class="yt-midnight__product-price">¥89,000</div>
  </div>
  <div class="yt-midnight__friction">
    <div class="yt-midnight__friction-title">Sleep on it?</div>
    <div class="yt-midnight__friction-sub">This is a big purchase at midnight. Brain has saved it for morning review.</div>
    <div class="yt-midnight__friction-time">Cart saved · remind me at 08:00 →</div>
  </div>
  <div class="yt-midnight__actions">
    <div class="yt-midnight__save-btn" role="button" aria-label="Save for tomorrow — primary action">✓ Save for tomorrow</div>
    <div class="yt-midnight__buy-btn" role="button" aria-label="Checkout now — secondary action">Checkout anyway →</div>
  </div>
</div>`;
      },
    },

  ]; // end SCENARIOS

  /* ══════════════════════════════════════════════════════════
     RENDER HELPERS
     ══════════════════════════════════════════════════════════ */
  function renderDevice(scenario) {
    const content = scenario.renderUI();

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

    if (scenario.device === 'carplay' || scenario.device === 'mpo' || scenario.device === 'split') {
      return content;
    }

    return `<div>${content}</div>`;
  }

  /* ── ui.command pretty-printer with key highlights ────── */
  function renderUiCommand(cmd) {
    const lines = [];
    lines.push('<span class="yt-mono-brace">{</span>');
    const entries = Object.entries(cmd);
    entries.forEach(([k, v], i) => {
      const comma = i < entries.length - 1 ? ',' : '';
      let val;
      if (Array.isArray(v)) {
        if (v.length === 0) {
          val = '<span class="yt-mono-bracket">[]</span>';
        } else {
          val = '<span class="yt-mono-bracket">[</span>' +
            v.map(item => `<span class="yt-mono-str">"${item}"</span>`).join(', ') +
            '<span class="yt-mono-bracket">]</span>';
        }
      } else {
        val = `<span class="yt-mono-str">"${v}"</span>`;
      }
      lines.push(`  <span class="yt-mono-key">${k}</span>: ${val}${comma}`);
    });
    lines.push('<span class="yt-mono-brace">}</span>');
    return lines.join('\n');
  }

  /* ── rules.yml pretty-printer with active line highlight ─ */
  function renderRulesYaml(yaml, activeLine) {
    const lines = yaml.split('\n');
    return lines.map((line, i) => {
      const isActive = (i + 1) === activeLine;
      const isComment = line.trim().startsWith('#');
      const cls = ['yt-yml-line'];
      if (isActive) cls.push('yt-yml-line--active');
      if (isComment) cls.push('yt-yml-line--comment');
      const safe = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // colorize keys (word before colon)
        .replace(/^(\s*)([a-zA-Z_][\w-]*)(:)/, '$1<span class="yt-yml-key">$2</span>$3');
      return `<div class="${cls.join(' ')}"><span class="yt-yml-ln">${String(i+1).padStart(2,' ')}</span>${safe || '&nbsp;'}</div>`;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════════════════ */
  let currentIndex = 0;
  let isPlaying = true;
  let progressRafId = null;
  let progressStart = null;
  let openPopover = null;
  const STEP_DURATION = 5500;

  /* ── DOM refs (will be set in init) ─────────────────────── */
  let deviceWrap, signalsList, dialsList, whyHeading, whyBullets, whyPatterns;
  let chaptersEl, playBtn, playIcon, prevBtn, nextBtn, progressBar;
  let scenarioLabel, momentCaption, announceEl;
  let uiCommandEl, rulesYamlEl, axFiredEl;
  let timeSel, personSel, placeSel, closestMatchEl;

  /* ── Build chapter chips (timeline) ─────────────────────── */
  function buildChapters() {
    chaptersEl.innerHTML = '';
    SCENARIOS.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'yt-chapter';
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-label', `Go to moment ${i + 1}: ${s.title}`);
      btn.dataset.index = i;
      btn.innerHTML = `
        <span class="yt-chapter__dot" aria-hidden="true"></span>
        <span class="yt-chapter__time">${s.time}</span>
        <span class="yt-chapter__person">${s.person}</span>`;
      btn.addEventListener('click', () => { goTo(i); pausePlay(); });
      chaptersEl.appendChild(btn);
    });
  }

  /* ── Build token rows (input panel) ─────────────────────── */
  function buildTokens() {
    signalsList.innerHTML = '';
    dialsList.innerHTML = '';
    TOKEN_DEFS.forEach(def => {
      const row = document.createElement('div');
      row.className = 'yt-token-row';
      row.dataset.token = def.id;
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.setAttribute('aria-label', `${def.full} — click to inspect or change`);
      row.innerHTML = `
        <span class="yt-token-row__dot" aria-hidden="true"></span>
        <span class="yt-token-row__name">${def.label}</span>
        <span class="yt-token-row__value" id="ytv-${def.id}">—</span>
        <span class="yt-token-row__caret" aria-hidden="true">▾</span>`;

      const handler = (e) => {
        e.stopPropagation();
        pausePlay();
        openTokenPopover(row, def);
      };
      row.addEventListener('click', handler);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(e); }
      });

      if (def.group === 'dials') dialsList.appendChild(row);
      else signalsList.appendChild(row);
    });
  }

  /* ── Token popover (Lab mode) ───────────────────────────── */
  function closePopover() {
    if (openPopover) {
      openPopover.remove();
      openPopover = null;
    }
  }

  function openTokenPopover(rowEl, def) {
    closePopover();
    const current = SCENARIOS[currentIndex].tokens[def.id]?.value;
    const enums = TOKEN_ENUMS[def.id] || [];

    const pop = document.createElement('div');
    pop.className = 'yt-popover';
    pop.setAttribute('role', 'listbox');
    pop.setAttribute('aria-label', `${def.full} values`);
    pop.innerHTML = `
      <div class="yt-popover__header">${def.full}</div>
      <div class="yt-popover__list">
        ${enums.map(v => `
          <button class="yt-popover__item${v === current ? ' yt-popover__item--selected' : ''}"
                  role="option" aria-selected="${v === current ? 'true' : 'false'}"
                  data-value="${v}">
            <span class="yt-popover__dot" aria-hidden="true"></span>
            <span>${v}</span>
          </button>`).join('')}
      </div>`;
    document.body.appendChild(pop);
    openPopover = pop;

    // position next to row
    const rect = rowEl.getBoundingClientRect();
    const popWidth = 260;
    let left = rect.right + 8;
    if (left + popWidth > window.innerWidth - 16) left = rect.left - popWidth - 8;
    if (left < 16) left = rect.left;
    pop.style.position = 'fixed';
    pop.style.top = `${rect.top}px`;
    pop.style.left = `${Math.max(16, left)}px`;
    pop.style.width = `${popWidth}px`;

    pop.querySelectorAll('.yt-popover__item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = btn.dataset.value;
        applyTokenChange(def.id, val);
        closePopover();
      });
    });

    // close on outside click
    setTimeout(() => {
      document.addEventListener('click', onDocClickClosePopover, { once: true });
    }, 0);
  }

  function onDocClickClosePopover(e) {
    if (openPopover && !openPopover.contains(e.target)) {
      closePopover();
    }
  }

  /* ── Snap to closest matching scenario ──────────────────── */
  function applyTokenChange(tokenId, newValue) {
    // Find scenario whose token value matches
    let best = currentIndex;
    let bestScore = -1;
    SCENARIOS.forEach((s, i) => {
      let score = 0;
      if (s.tokens[tokenId]?.value === newValue) score += 3;
      // keep other current tokens stable as tie-break
      TOKEN_DEFS.forEach(def => {
        if (def.id === tokenId) return;
        if (s.tokens[def.id]?.value === SCENARIOS[currentIndex].tokens[def.id]?.value) score += 1;
      });
      if (score > bestScore) { bestScore = score; best = i; }
    });
    if (best !== currentIndex) {
      activate(best, true);
      if (closestMatchEl) {
        closestMatchEl.textContent = `Closest match: ${SCENARIOS[best].chapter}`;
        closestMatchEl.classList.add('is-visible');
        setTimeout(() => closestMatchEl?.classList.remove('is-visible'), 3000);
      }
    }
  }

  /* ── Top header selects (time / person / place) ─────────── */
  function buildHeaderSelects() {
    if (!timeSel || !personSel || !placeSel) return;
    const times   = [...new Set(SCENARIOS.map(s => s.time))];
    const people  = [...new Set(SCENARIOS.map(s => s.person))];
    const places  = [...new Set(SCENARIOS.map(s => s.place))];
    timeSel.innerHTML   = times.map(t  => `<option value="${t}">${t}</option>`).join('');
    personSel.innerHTML = people.map(p => `<option value="${p}">${p}</option>`).join('');
    placeSel.innerHTML  = places.map(p => `<option value="${p}">${p}</option>`).join('');

    [timeSel, personSel, placeSel].forEach(sel => {
      sel.addEventListener('change', (e) => {
        pausePlay();
        const key = sel === timeSel ? 'time' : sel === personSel ? 'person' : 'place';
        const val = sel.value;
        const idx = SCENARIOS.findIndex(s => s[key] === val);
        if (idx >= 0) activate(idx, true);
      });
    });
  }

  /* ── Activate scenario ──────────────────────────────────── */
  function activate(index, animate) {
    if (animate === undefined) animate = true;
    const s = SCENARIOS[index];
    if (!s) return;

    if (scenarioLabel) scenarioLabel.textContent = `${s.chapter} · ${s.character}`;
    if (momentCaption) momentCaption.textContent = s.title;

    // Device UI
    if (animate) {
      deviceWrap.classList.add('is-transitioning');
      setTimeout(() => {
        deviceWrap.innerHTML = renderDevice(s);
        deviceWrap.classList.remove('is-transitioning');
      }, 240);
    } else {
      deviceWrap.innerHTML = renderDevice(s);
    }

    // Token rows
    TOKEN_DEFS.forEach(def => {
      const row = document.querySelector(`[data-token="${def.id}"]`);
      const valEl = document.getElementById(`ytv-${def.id}`);
      const tokenData = s.tokens[def.id];
      if (!row || !valEl || !tokenData) return;
      row.classList.toggle('yt-token-row--active', !!tokenData.active);
      valEl.textContent = tokenData.value;
    });

    // Why panel — bullets + AX
    if (whyHeading) whyHeading.textContent = s.why.heading;
    if (whyBullets) {
      whyBullets.innerHTML = s.why.bullets.map(b => `
        <li class="yt-why__bullet">
          <span class="yt-why__bullet-token">${b.token}</span>
          <span class="yt-why__bullet-text">${b.text}</span>
        </li>`).join('');
    }

    // AX chips
    if (axFiredEl) {
      axFiredEl.innerHTML = s.why.axPatterns.map(p => {
        const code = typeof p === 'string' ? p.split(' ')[0] : p.code;
        const name = typeof p === 'string' ? p.replace(/^\S+\s+/, '') : p.name;
        return `
          <span class="yt-ax-chip">
            <span class="yt-ax-chip__dot" aria-hidden="true"></span>
            <span class="yt-ax-chip__code">${code}</span>
            <span class="yt-ax-chip__name">${name}</span>
          </span>`;
      }).join('');
    }

    // ui.command JSON
    if (uiCommandEl) {
      uiCommandEl.innerHTML = renderUiCommand(s.uiCommand);
    }

    // rules.yml
    if (rulesYamlEl) {
      rulesYamlEl.innerHTML = renderRulesYaml(s.rulesYaml, s.rulesYamlActiveLine);
    }

    // Header selects sync
    if (timeSel)   timeSel.value   = s.time;
    if (personSel) personSel.value = s.person;
    if (placeSel)  placeSel.value  = s.place;

    // Timeline active chip
    chaptersEl.querySelectorAll('.yt-chapter').forEach((el, i) => {
      el.classList.toggle('yt-chapter--active', i === index);
    });

    if (announceEl) announceEl.textContent = `Moment ${index + 1}: ${s.title}`;

    currentIndex = index;
  }

  /* ── Navigation ─────────────────────────────────────────── */
  function goTo(index) {
    activate(index);
    resetProgress();
  }
  function next() { goTo((currentIndex + 1) % SCENARIOS.length); }
  function prev() { goTo((currentIndex - 1 + SCENARIOS.length) % SCENARIOS.length); }

  /* ── Progress bar (RAF) ─────────────────────────────────── */
  function resetProgress() {
    progressStart = null;
    if (progressBar) progressBar.style.width = '0%';
    if (progressRafId) cancelAnimationFrame(progressRafId);
    if (isPlaying) startProgress();
  }
  function tickProgress(ts) {
    if (!isPlaying) return;
    if (!progressStart) progressStart = ts;
    const elapsed = ts - progressStart;
    const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (elapsed >= STEP_DURATION) { next(); return; }
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

  /* ── Play / Pause ───────────────────────────────────────── */
  function setPlayUI(playing) {
    if (!playBtn) return;
    playBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    playBtn.setAttribute('aria-label', playing ? 'Pause auto-play tour' : 'Resume auto-play tour');
    playBtn.classList.toggle('yt-btn--playing', playing);
    if (playIcon) playIcon.textContent = playing ? '⏸' : '▶';
    const label = playBtn.querySelector('.yt-btn__label');
    if (label) label.textContent = playing ? 'Pause' : 'Auto-play tour';
  }
  function pausePlay() {
    isPlaying = false;
    setPlayUI(false);
    stopProgress();
    if (progressBar) progressBar.style.width = '0%';
  }
  function resumePlay() {
    isPlaying = true;
    setPlayUI(true);
    startProgress();
  }
  function togglePlay() { if (isPlaying) pausePlay(); else resumePlay(); }

  /* ── Reduced motion ─────────────────────────────────────── */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    deviceWrap     = document.getElementById('yt-device-wrap');
    signalsList    = document.getElementById('yt-signals-list');
    dialsList      = document.getElementById('yt-dials-list');
    whyHeading     = document.getElementById('yt-why-heading');
    whyBullets     = document.getElementById('yt-why-bullets');
    whyPatterns    = document.getElementById('yt-why-patterns');
    chaptersEl     = document.getElementById('yt-chapters');
    playBtn        = document.getElementById('yt-play-btn');
    playIcon       = document.getElementById('yt-play-icon');
    prevBtn        = document.getElementById('yt-prev-btn');
    nextBtn        = document.getElementById('yt-next-btn');
    progressBar    = document.getElementById('yt-bar');
    scenarioLabel  = document.getElementById('yt-scenario-label');
    momentCaption  = document.getElementById('yt-moment-caption');
    announceEl     = document.getElementById('yt-announce');
    uiCommandEl    = document.getElementById('yt-ui-command');
    rulesYamlEl    = document.getElementById('yt-rules-yaml');
    axFiredEl      = document.getElementById('yt-ax-fired');
    timeSel        = document.getElementById('yt-sel-time');
    personSel     = document.getElementById('yt-sel-person');
    placeSel      = document.getElementById('yt-sel-place');
    closestMatchEl = document.getElementById('yt-closest-match');

    buildChapters();
    buildTokens();
    buildHeaderSelects();
    activate(0, false);

    // Button listeners
    if (playBtn) playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); pausePlay(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); pausePlay(); });

    // Hero auto-play button (mirrors timeline play)
    const heroPlay = document.getElementById('yt-hero-play');
    if (heroPlay) heroPlay.addEventListener('click', (e) => {
      e.preventDefault();
      togglePlay();
      // also scroll to console
      const console = document.getElementById('yt-console');
      if (console) console.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      switch (e.key) {
        case ' ':          e.preventDefault(); togglePlay(); break;
        case 'ArrowLeft':  e.preventDefault(); prev(); pausePlay(); break;
        case 'ArrowRight': e.preventDefault(); next(); pausePlay(); break;
        case 'r': case 'R': goTo(0); resumePlay(); break;
        case 'Escape':     closePopover(); break;
        default:
          if (e.key >= '1' && e.key <= '8') {
            const idx = parseInt(e.key, 10) - 1;
            if (idx < SCENARIOS.length) { goTo(idx); pausePlay(); }
          }
      }
    });

    // Reduced motion
    if (prefersReducedMotion()) {
      pausePlay();
    } else {
      setTimeout(() => { resumePlay(); }, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
