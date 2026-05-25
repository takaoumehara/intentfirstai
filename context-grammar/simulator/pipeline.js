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

  // Scenario registry — drop a new file in scenarios/ + register here, no other code changes.
  const SCENARIOS = {
    dinner:           { data: window.SCENARIO_DINNER,            label: 'Dinner planning',          sub: 'Tue · 18:30 · family choosing',         defaultDevice: 'fridge' },
    winddown:         { data: window.SCENARIO_WINDDOWN,          label: 'Wind-down · sleep',        sub: 'Tue · 22:34 · in bed',                  defaultDevice: 'phone' },
    maps_dinner:      { data: window.SCENARIO_MAPS_DINNER,       label: 'Maps · saved spots',       sub: 'Fri · 19:15 · walking · saved IG',      defaultDevice: 'phone' },
    banking_public:   { data: window.SCENARIO_BANKING_PUBLIC,    label: 'Banking in public',        sub: 'Tue · 14:12 · café · field-level blur', defaultDevice: 'phone' },
    cooking_active:   { data: window.SCENARIO_COOKING_ACTIVE,    label: 'Cooking · hands wet',      sub: 'Tue · 19:42 · fridge takes over',       defaultDevice: 'fridge' },
    tv_resume:        { data: window.SCENARIO_TV_RESUME,         label: 'TV → bedroom',             sub: 'Sat · 22:38 · auto-resume movie',       defaultDevice: 'phone' },
    driving_fatigue:  { data: window.SCENARIO_DRIVING_FATIGUE,   label: 'Driving · fatigue',        sub: 'Wed · 23:14 · CarPlay safety',          defaultDevice: 'phone' },
    coming_home:      { data: window.SCENARIO_COMING_HOME,       label: 'Coming home',              sub: 'Tue · 18:32 · 5 min away · house wakes',defaultDevice: 'phone' },
    meeting_2min:     { data: window.SCENARIO_MEETING_2MIN,      label: 'Meeting in 2 min',         sub: 'Wed · 09:58 · walking · auto-mute',     defaultDevice: 'phone' },
    doorbell_guest:   { data: window.SCENARIO_DOORBELL_GUEST,    label: 'Doorbell · guest',         sub: 'Sat · 14:45 · screen swap',             defaultDevice: 'fridge' },
    kid_sick:         { data: window.SCENARIO_KID_SICK,          label: 'Kid sick at school',       sub: 'Wed · 12:30 · Focus Mode break',        defaultDevice: 'phone' },
    gift_hiding:      { data: window.SCENARIO_GIFT_HIDING,       label: 'Gift · partner privacy',   sub: 'Sun · 11:20 · couch · person-scoped',   defaultDevice: 'phone' },
    travel_plan:      { data: window.SCENARIO_TRAVEL_PLAN,       label: 'Travel · multi-day plan',  sub: '2 weeks before · weather + family',     defaultDevice: 'ipad' },
    grocery_aisle:    { data: window.SCENARIO_GROCERY_AISLE,     label: 'Grocery · in-aisle',       sub: 'Sat · 11:18 · scanner + budget meter',  defaultDevice: 'phone' },
    work_crisis:      { data: window.SCENARIO_WORK_CRISIS,       label: 'Work crisis · 23:00',      sub: 'Tue · 23:04 · token collision',         defaultDevice: 'phone' },
    onboarding:       { data: window.SCENARIO_ONBOARDING_VS_MONTH6, label: 'Day 1 vs Month 6',      sub: 'same intent · Brain matures',           defaultDevice: 'phone' },
    foreign_country:  { data: window.SCENARIO_FOREIGN_COUNTRY,   label: 'Travel · foreign SIM',     sub: 'Lisbon Day 1 · trust steps back',       defaultDevice: 'phone' },
    morning_commute:  { data: window.SCENARIO_MORNING_COMMUTE,   label: 'Morning commute · train',  sub: 'Wed · 08:12 · thumb arc',               defaultDevice: 'phone' },
    homework_help:    { data: window.SCENARIO_HOMEWORK_HELP,     label: 'Kid homework · explain',   sub: 'Tue · 19:00 · iPad · child UI',         defaultDevice: 'ipad' },
    post_meeting:     { data: window.SCENARIO_POST_MEETING,      label: 'Post-meeting decompress',  sub: 'Wed · 12:48 · 3 calls · enforced break',defaultDevice: 'phone' },
    hospital_waiting: { data: window.SCENARIO_HOSPITAL_WAITING,  label: 'Hospital · waiting room',  sub: 'Fri · 14:42 · audio-routed · public',   defaultDevice: 'phone' },
    // ─── New scenarios (Feature 3) ───
    mpo_dinner:       { data: window.SCENARIO_MPO_DINNER,        label: '🏠 夕食 — 4人が同時に違うUIを受け取る', sub: 'Multi-person orchestration',            defaultDevice: 'fridge' },
    typhoon:          { data: window.SCENARIO_TYPHOON,           label: '🌀 台風 — 新幹線全停止',               sub: 'Crisis · rebook under pressure',         defaultDevice: 'phone' },
    midnight_purchase:{ data: window.SCENARIO_MIDNIGHT_PURCHASE, label: '🌙 深夜の衝動買い',                    sub: 'Fri · 01:12 · friction by design',       defaultDevice: 'phone' },
    school_run:       { data: window.SCENARIO_SCHOOL_RUN,        label: '🚗 送迎中 — Slack緊急通知',            sub: 'Wed · 08:06 · driving · interrupted',    defaultDevice: 'phone' },
  };

  // Application state — derived live, not stored across mutations.
  const appState = {
    activeScenario: 'dinner',
    activeToggles: new Set(),
    activeDevice: 'fridge',
    activeLens: 'leader',
    hasPlayed: false,
    hasRendered: false,
    cinematicCancelled: false,
  };

  const REVIEW_LENSES = {
    leader: {
      label: 'Leader',
      sub: 'ship call',
      title: 'Product leader read',
      focus: 'Is this a defensible product decision, not just a clever demo?',
    },
    designer: {
      label: 'Designer',
      sub: 'UX move',
      title: 'Product designer read',
      focus: 'What should the interface reveal, hide, ask, or do next?',
    },
    builder: {
      label: 'Builder',
      sub: 'system shape',
      title: 'Product builder read',
      focus: 'What needs to exist in the product architecture to make this real?',
    },
  };

  function getScenario() {
    return SCENARIOS[appState.activeScenario].data;
  }
  // Backward-compat alias used throughout this file
  const SCENARIO_PROXY = new Proxy({}, {
    get(_, key) { return getScenario()[key]; },
  });
  // Replace all `SCENARIO.x` reads with the proxy
  const SCENARIO = SCENARIO_PROXY;

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

  // ─── Render: Stage 2 · Situation Signals & Relationship Dials ───
  const TOKEN_ICONS = {
    physical_state: '../../assets/img/Large/Token_02_PhysicalState.webp',
    cognitive_load: '../../assets/img/Large/Token_03_%20CognitiveLoad.webp', // URL-encoded space
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
      ${layer('Identity Layer', state.brain.L1)}
      ${layer('Learning Layer', state.brain.L2)}
      ${layer('Now Layer', state.brain.L3)}
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
          <div class="ax-row ${p.overruled ? 'is-overruled' : ''}" data-fire-order="${i + 1}" data-flip-key="ax-${p.id}" data-pattern-id="${p.id}">
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
    // ─── Feature 2: Causal Trace — hover an AX row to highlight affected Stage 4 elements ───
    el.querySelectorAll('.ax-row[data-pattern-id]').forEach((row) => {
      const patternId = row.dataset.patternId;
      row.addEventListener('mouseenter', () => {
        const stage4 = document.getElementById('stage-4-body');
        if (!stage4) return;
        // Inline rendering: highlight recipe cards that list this pattern in data-affected-by
        stage4.querySelectorAll(`[data-affected-by]`).forEach((card) => {
          const ids = (card.dataset.affectedBy || '').split(' ');
          if (ids.includes(patternId)) card.classList.add('is-highlighted-by-pattern');
        });
        // iframe rendering: postMessage to the iframe
        const iframe = stage4.querySelector('iframe.stage4-iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'HIGHLIGHT', patternId }, '*');
        }
      });
      row.addEventListener('mouseleave', () => {
        const stage4 = document.getElementById('stage-4-body');
        if (!stage4) return;
        stage4.querySelectorAll('.is-highlighted-by-pattern').forEach((el) => {
          el.classList.remove('is-highlighted-by-pattern');
        });
        // iframe rendering: clear highlights
        const iframe = stage4.querySelector('iframe.stage4-iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'HIGHLIGHT_CLEAR' }, '*');
        }
      });
    });
  }

  // ─── Render: Stage 4 · UI Output (per-device) ───
  // Feature 1: if the scenario declares a `uiScreen` URL, render an iframe instead
  // of the inline-generated HTML. Falls back to inline rendering when absent.
  const IFRAME_HEIGHTS = { phone: 844, fridge: 1080, ipad: 600, carplay: 480 };

  function renderUI(state) {
    const el = document.getElementById('stage-4-body');
    if (!el) return;
    const device = SCENARIO.devices.find((d) => d.id === appState.activeDevice);

    // ─── iframe path (Feature 1) ───
    if (SCENARIO.uiScreen) {
      const height = IFRAME_HEIGHTS[appState.activeDevice] || 600;
      // Reuse an existing iframe if already present to avoid reloading on every renderAll
      let iframe = el.querySelector('iframe.stage4-iframe');
      const newSrc = SCENARIO.uiScreen;
      if (!iframe) {
        el.innerHTML = `
          <div class="frame-wrap">
            <p class="frame-meta">${device ? device.label + ' · ' + device.anchorHint : ''}</p>
            <iframe class="stage4-iframe"
                    src="${newSrc}"
                    width="100%"
                    height="${height}"
                    loading="lazy"
                    title="UI Screen — ${device ? device.label : 'Stage 4'}"></iframe>
          </div>
        `;
      } else {
        if (iframe.getAttribute('src') !== newSrc) {
          iframe.setAttribute('src', newSrc);
        }
        iframe.setAttribute('height', height);
      }
      return;
    }

    // ─── inline path (backward-compatible fallback) ───
    let inner;
    switch (appState.activeDevice) {
      case 'fridge':
        inner = renderFridgeUI(state, device); break;
      case 'tv-cast':
        inner = renderTvCastUI(state, device); break;
      case 'ipad':
        inner = renderIpadUI(state, device); break;
      case 'phone':
        inner = renderPhoneUI(state, device); break;
      case 'watch':
        inner = renderWatchUI(state, device); break;
      case 'speaker':
        inner = renderSpeakerUI(state, device); break;
      default:
        inner = renderTvCastUI(state, device);
    }
    el.innerHTML = inner;
  }

  /* Build the shared "opts" object passed to every atomRecipeCard call. */
  function makeRecipeOpts(state) {
    return {
      showKcal: state.ui.showKcal,
      emphasizePrice: state.ui.emphasizePrice,
      showAllergenChip: state.ui.showAllergenChip,
      healthDeep: state.ui.healthDeep,
      cardHealthMeta: state.ui.cardHealthMeta,
      diff: computeUIDiff(state),
    };
  }

  /* ─── Framework decisions diff ─────────────────────────────────────────
     Compare the current rendered UI against the scenario's default-state UI
     (i.e. "no toggles applied"). The diff makes the framework's named moves
     explicit on Stage 4: ADDED · CHANGED · SORTED · PROMOTED · HIDDEN.
     This is the bridge between "I see a different screen" and "I see the
     framework decided X because of Y."
  */
  function computeUIDiff(state) {
    const overlaysOn = appState.activeToggles.size > 0;
    const baseCards = (SCENARIO.defaultState.ui.cards || []);
    const currentCards = (state.ui.cards || []);
    const device = SCENARIO.devices.find((d) => d.id === appState.activeDevice);
    const visibleLimit = (device && typeof device.maxCards === 'number') ? device.maxCards : currentCards.length;

    const byId = {};
    const hidden = [];

    if (!overlaysOn) {
      return { byId, hiddenCount: 0, hidden, overlaysOn: false, addedCount: 0, changedCount: 0, sortedCount: 0, promotedCount: 0 };
    }

    const baseById = Object.fromEntries(baseCards.map((c) => [c.id, c]));
    const basePos = Object.fromEntries(baseCards.map((c, i) => [c.id, i]));
    const currentIds = new Set(currentCards.map((c) => c.id));

    let addedCount = 0, changedCount = 0, sortedCount = 0, promotedCount = 0;

    currentCards.slice(0, visibleLimit).forEach((card, i) => {
      if (!baseById[card.id]) {
        byId[card.id] = 'ADDED';
        addedCount++;
        return;
      }
      const prev = baseById[card.id];
      const titleChanged = (prev.title || '') !== (card.title || '');
      const tagChanged = (prev.tag || '') !== (card.tag || '');
      const promoted = !prev.highlighted && card.highlighted;
      const posChanged = basePos[card.id] !== i;

      if (titleChanged || tagChanged) {
        byId[card.id] = 'CHANGED';
        changedCount++;
      } else if (promoted) {
        byId[card.id] = 'PROMOTED';
        promotedCount++;
      } else if (posChanged) {
        byId[card.id] = 'SORTED';
        sortedCount++;
      }
    });

    baseCards.forEach((c) => {
      if (!currentIds.has(c.id)) hidden.push({ id: c.id, title: c.title, tag: c.tag });
    });

    return {
      byId,
      hiddenCount: hidden.length,
      hidden,
      overlaysOn: true,
      addedCount,
      changedCount,
      sortedCount,
      promotedCount,
    };
  }

  function atomDiffChip(kind) {
    if (!kind) return '';
    return `<span class="diff-chip diff-chip--${kind.toLowerCase()}" aria-label="Framework decision: ${kind}">${kind}</span>`;
  }

  /* Top-of-Stage4 summary banner — shows what the framework changed because
     of the active context overlays. Hidden cards are listed inline as proof
     of suppression decisions. */
  function renderFrameworkDecisions(diff) {
    if (!diff.overlaysOn) return '';
    const parts = [];
    if (diff.addedCount)    parts.push(`<span class="fwd-stat fwd-stat--added"><b>${diff.addedCount}</b> added</span>`);
    if (diff.changedCount)  parts.push(`<span class="fwd-stat fwd-stat--changed"><b>${diff.changedCount}</b> rewritten</span>`);
    if (diff.promotedCount) parts.push(`<span class="fwd-stat fwd-stat--promoted"><b>${diff.promotedCount}</b> promoted</span>`);
    if (diff.sortedCount)   parts.push(`<span class="fwd-stat fwd-stat--sorted"><b>${diff.sortedCount}</b> re-ranked</span>`);
    if (diff.hiddenCount)   parts.push(`<span class="fwd-stat fwd-stat--hidden"><b>${diff.hiddenCount}</b> filtered</span>`);
    if (!parts.length) {
      return `
        <div class="framework-decisions framework-decisions--quiet" role="note">
          <span class="framework-decisions__chip">FRAMEWORK · steady</span>
          <span class="framework-decisions__msg">Overlays active · same UI is still optimal.</span>
        </div>`;
    }
    const hiddenLine = diff.hiddenCount
      ? `<details class="framework-decisions__hidden">
           <summary>Why these were filtered (${diff.hiddenCount})</summary>
           <ul>${diff.hidden.map((h) => `<li><span class="strike">${h.title}</span>${h.tag ? ` <em>· ${h.tag}</em>` : ''}</li>`).join('')}</ul>
         </details>`
      : '';
    return `
      <div class="framework-decisions" role="note" aria-label="Framework decisions summary">
        <span class="framework-decisions__chip">FRAMEWORK DECIDED</span>
        <div class="framework-decisions__stats">${parts.join('')}</div>
        ${hiddenLine}
      </div>
    `;
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function activeToggleLabels() {
    return getScenario().toggles
      .filter((toggle) => appState.activeToggles.has(toggle.id))
      .map((toggle) => toggle.label);
  }

  function getTokenText(state, id) {
    const token = state.tokens && state.tokens[id];
    return token ? `${token.name}: ${token.value}` : '';
  }

  function getFiringTokens(state) {
    return Object.entries(state.tokens || {})
      .filter(([_, token]) => token && token.firing)
      .map(([id, token]) => ({ id, ...token }));
  }

  function computeProductVerdict(state) {
    const scenarioMeta = SCENARIOS[appState.activeScenario];
    const device = SCENARIO.devices.find((d) => d.id === appState.activeDevice) || {};
    const diff = computeUIDiff(state);
    const firingTokens = getFiringTokens(state);
    const tokenBlob = Object.values(state.tokens || {})
      .map((token) => `${token.value} ${token.signal}`)
      .join(' ')
      .toLowerCase();
    const ruleBlob = (state.rules || [])
      .map((rule) => `${rule.name} ${rule.output} ${rule.drivers.join(' ')}`)
      .join(' ')
      .toLowerCase();
    const autonomyValue = state.tokens?.autonomy_dial?.value || 'Suggest';
    const disclosureValue = state.tokens?.disclosure_dial?.value || 'Contextual';

    let riskScore = 1;
    const combinedBlob = tokenBlob + ruleBlob;
    const pressureRisk = /critical|fatigue|crisis|alarming|hospital|sick/.test(combinedBlob) ||
      (/deadline/.test(combinedBlob) && !/no deadline/.test(combinedBlob));
    if (/public|partner|guest|privacy|blur|child profile|school/.test(combinedBlob)) riskScore += 1;
    if (pressureRisk) riskScore += 2;
    if (/biometric|health|hrv|banking|budget/.test(combinedBlob)) riskScore += 1;
    if (/full|disclosure/.test(combinedBlob) && /public|banking|biometric|health|hrv/.test(combinedBlob)) riskScore += 1;
    const suggestiveAutonomy = /suggest|propose|ask|confirm/.test(`${autonomyValue} ${ruleBlob}`.toLowerCase());
    if (/auto|notify|takes over|shifted|restore|queued/.test(combinedBlob) && !suggestiveAutonomy) riskScore += 1;
    riskScore = clampNumber(riskScore, 1, 5);

    const riskLabel = riskScore >= 5 ? 'High' : riskScore >= 3 ? 'Medium' : 'Low';
    const hasHumanStop = /ask|confirm|suggest|propose|human|choice/.test(`${autonomyValue} ${ruleBlob}`.toLowerCase());
    const autonomyRecommendation = riskScore >= 5
      ? 'Require explicit human confirmation before action'
      : hasHumanStop
        ? 'Keep AI in suggest/confirm mode'
        : 'Allow narrow automation with visible recovery';
    const disclosureRecommendation = riskScore >= 4
      ? 'Show the reason and expose what context was used'
      : 'Keep context visible enough to build trust';

    const uiDeltaCount = diff.addedCount + diff.changedCount + diff.promotedCount + diff.sortedCount + diff.hiddenCount;
    const confidence = clampNumber(68 + firingTokens.length * 3 + (state.rules || []).length * 2 + uiDeltaCount * 2 - riskScore * 3, 54, 94);
    const decision = riskScore >= 5
      ? 'Prototype only with strong guardrails'
      : uiDeltaCount > 0 || appState.activeToggles.size > 0
        ? 'Strong candidate for an adaptive product pattern'
        : 'Good baseline; prove value by toggling real constraints';

    return {
      scenarioLabel: scenarioMeta.label,
      scenarioSub: scenarioMeta.sub,
      deviceLabel: device.label || appState.activeDevice,
      activeOverlays: activeToggleLabels(),
      firingTokens,
      diff,
      riskScore,
      riskLabel,
      confidence,
      decision,
      autonomyValue,
      disclosureValue,
      autonomyRecommendation,
      disclosureRecommendation,
      primaryRule: (state.rules || [])[0],
      primaryPattern: (state.axPatterns || [])[0],
      tokenReads: [
        getTokenText(state, 'priority_weight'),
        getTokenText(state, 'cognitive_load'),
        getTokenText(state, 'social_exposure'),
        getTokenText(state, 'feasibility'),
      ].filter(Boolean),
    };
  }

  function buildLensCards(state, verdict, lensId) {
    const primaryRule = verdict.primaryRule
      ? `${verdict.primaryRule.name} -> ${verdict.primaryRule.output}`
      : 'No rule fired';
    const primaryPattern = verdict.primaryPattern
      ? `${verdict.primaryPattern.id} ${verdict.primaryPattern.name}: ${verdict.primaryPattern.essence}`
      : 'No AX pattern selected';
    const overlayLine = verdict.activeOverlays.length
      ? verdict.activeOverlays.join(' + ')
      : 'No overlays active';

    if (lensId === 'builder') {
      return [
        { k: 'State model', v: `Treat intent, tokens, memory, rules, and UI output as separate observable states. ${primaryRule}` },
        { k: 'Instrumentation', v: `Log token changes, rule overrides, confirmation events, and UI diff counts. Current diff: ${verdict.diff.addedCount} added, ${verdict.diff.changedCount} rewritten, ${verdict.diff.hiddenCount} filtered.` },
        { k: 'System boundary', v: `The product needs a rollback path whenever autonomy moves beyond suggestion. Surface: ${verdict.deviceLabel}.` },
      ];
    }

    if (lensId === 'designer') {
      return [
        { k: 'Primary UX move', v: primaryPattern },
        { k: 'Human agency', v: verdict.autonomyRecommendation },
        { k: 'Disclosure copy', v: `${verdict.disclosureRecommendation}. Active context: ${overlayLine}.` },
      ];
    }

    return [
      { k: 'Ship judgment', v: verdict.decision },
      { k: 'Risk posture', v: `${verdict.riskLabel} risk. ${verdict.autonomyRecommendation}.` },
      { k: 'Proof needed', v: `Measure whether users accept, override, or recover from the adaptive UI. Current confidence: ${verdict.confidence}%.` },
    ];
  }

  function buildBriefText(state, verdict, lens) {
    const cards = buildLensCards(state, verdict, appState.activeLens);
    return [
      `Context Grammar Simulator brief`,
      `Scenario: ${verdict.scenarioLabel} (${verdict.scenarioSub})`,
      `Lens: ${lens.label}`,
      `Decision: ${verdict.decision}`,
      `Risk: ${verdict.riskLabel}`,
      `Autonomy: ${verdict.autonomyValue} -> ${verdict.autonomyRecommendation}`,
      `Disclosure: ${verdict.disclosureValue} -> ${verdict.disclosureRecommendation}`,
      `Rule: ${verdict.primaryRule ? verdict.primaryRule.name : 'none'}`,
      `AX Pattern: ${verdict.primaryPattern ? `${verdict.primaryPattern.id} ${verdict.primaryPattern.name}` : 'none'}`,
      ...cards.map((card) => `${card.k}: ${card.v}`),
    ].join('\n');
  }

  function renderDecisionWorkbench(state) {
    const body = document.getElementById('decision-workbench-body');
    const context = document.getElementById('decision-workbench-context');
    if (!body) return;

    const lens = REVIEW_LENSES[appState.activeLens] || REVIEW_LENSES.leader;
    const verdict = computeProductVerdict(state);
    const cards = buildLensCards(state, verdict, appState.activeLens);
    const overlayText = verdict.activeOverlays.length ? verdict.activeOverlays.join(' · ') : 'No overlays';
    const changedTotal = verdict.diff.addedCount + verdict.diff.changedCount + verdict.diff.promotedCount + verdict.diff.sortedCount + verdict.diff.hiddenCount;

    if (context) {
      context.textContent = `${verdict.scenarioLabel} · ${verdict.deviceLabel} · ${overlayText}`;
    }

    body.innerHTML = `
      <article class="decision-verdict" data-risk="${verdict.riskLabel.toLowerCase()}">
        <div class="decision-verdict__main">
          <span class="decision-verdict__chip">${lens.title}</span>
          <h3>${verdict.decision}</h3>
          <p>${lens.focus}</p>
        </div>
        <div class="decision-verdict__score" aria-label="Product confidence ${verdict.confidence} percent">
          <span>${verdict.confidence}</span>
          <small>confidence</small>
        </div>
      </article>

      <div class="decision-metrics" aria-label="Decision metrics">
        <div class="decision-metric">
          <span class="decision-metric__label">Risk</span>
          <strong>${verdict.riskLabel}</strong>
          <p>${verdict.riskScore}/5 based on context sensitivity, autonomy, and stakes.</p>
        </div>
        <div class="decision-metric">
          <span class="decision-metric__label">Autonomy</span>
          <strong>${verdict.autonomyValue}</strong>
          <p>${verdict.autonomyRecommendation}.</p>
        </div>
        <div class="decision-metric">
          <span class="decision-metric__label">UI delta</span>
          <strong>${changedTotal}</strong>
          <p>${changedTotal ? 'Framework changed the interface because context changed.' : 'Baseline output; add overlays to test adaptation.'}</p>
        </div>
      </div>

      <div class="decision-lens-read">
        <div class="decision-lens-read__head">
          <div>
            <span class="decision-lens-read__eyebrow">Current read</span>
            <h3>${lens.label}</h3>
          </div>
          <button class="decision-copy" type="button" id="copy-brief-btn">Copy brief</button>
        </div>
        <div class="decision-lens-read__grid">
          ${cards.map((card) => `
            <article class="decision-note">
              <span>${card.k}</span>
              <p>${card.v}</p>
            </article>
          `).join('')}
        </div>
      </div>

      <div class="decision-evidence">
        <div>
          <span class="decision-evidence__label">Firing tokens</span>
          <p>${verdict.firingTokens.map((token) => token.name).join(' · ') || 'None'}</p>
        </div>
        <div>
          <span class="decision-evidence__label">Priority read</span>
          <p>${verdict.tokenReads.slice(0, 2).join(' · ')}</p>
        </div>
      </div>
    `;

    const copyBtn = body.querySelector('#copy-brief-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const brief = buildBriefText(state, verdict, lens);
        try {
          await navigator.clipboard.writeText(brief);
          copyBtn.textContent = 'Copied';
        } catch (_) {
          copyBtn.textContent = 'Copy failed';
        }
        window.setTimeout(() => { copyBtn.textContent = 'Copy brief'; }, 1400);
      });
    }
  }

  /* Health deep header — weight tracker + meal budget */
  function renderHealthHeader(state) {
    if (!state.ui.healthDeep) return '';
    return `
      ${atomWeightTrackerCard(state.ui.weightTracker)}
      ${atomMealBudget(state.ui.mealBudget)}
    `;
  }

  function renderHealthFootnote(state) {
    if (!state.ui.healthDeep || !state.ui.healthFootnote) return '';
    return `<p class="health-footnote">${state.ui.healthFootnote}</p>`;
  }

  // ─── UI atoms ───
  function atomKcalRing(kcal, target = 580) {
    const pct = Math.min(100, Math.round((kcal / target) * 100));
    const stroke = pct > 100 ? '#993820' : pct > 80 ? 'var(--color-intent)' : 'var(--color-success)';
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

  /* Deep health atoms — shown when state.ui.healthDeep is true */
  function atomSparkline(points) {
    const W = 88, H = 28, pad = 3;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 0.5;
    const coords = points.map((v, i) => {
      const x = pad + (i / (points.length - 1)) * (W - pad * 2);
      const y = H - pad - ((v - min) / range) * (H - pad * 2);
      return [x.toFixed(1), y.toFixed(1)];
    });
    const polyPoints = coords.map((p) => p.join(',')).join(' ');
    const last = coords[coords.length - 1];
    return `
      <svg class="spark" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">
        <polyline points="${polyPoints}" fill="none" stroke="var(--color-success)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="${last[0]}" cy="${last[1]}" r="2.8" fill="var(--color-success)"/>
      </svg>
    `;
  }

  function atomWeightTrackerCard(wt) {
    const fmt = (n) => n.toFixed(1).replace(/\.0$/, '');
    return `
      <section class="weight-tracker" aria-label="Weight goal progress">
        <div class="weight-tracker__numbers">
          <div class="weight-tracker__stat">
            <span class="weight-tracker__value">${fmt(wt.currentKg)}<span class="weight-tracker__unit">kg</span></span>
            <span class="weight-tracker__caption">Now</span>
          </div>
          <div class="weight-tracker__spark">${atomSparkline(wt.sparkline)}</div>
          <div class="weight-tracker__stat">
            <span class="weight-tracker__value">${fmt(wt.targetKg)}<span class="weight-tracker__unit">kg</span></span>
            <span class="weight-tracker__caption">Target · ${wt.goalDeltaKg}kg</span>
          </div>
        </div>
        <p class="weight-tracker__pace">
          <span>${wt.velocityKgPerMonth.toFixed(2)} kg/mo</span>
          <span aria-hidden="true">·</span>
          <span>${wt.kgRemaining}kg to go</span>
          <span aria-hidden="true">·</span>
          <span>~${wt.monthsLeft} months</span>
        </p>
      </section>
    `;
  }

  function atomMealBudget(mb) {
    const usedPct = Math.round((mb.usedKcal / mb.dailyAllowanceKcal) * 100);
    const tonightPct = Math.round((mb.tonightAllowanceKcal / mb.dailyAllowanceKcal) * 100);
    return `
      <div class="meal-budget" role="status" aria-label="Today's calorie budget">
        <div class="meal-budget__row">
          ${mb.mealsLoggedToday.map((m) => `<span class="meal-budget__item">${m.label} ${m.kcal}</span>`).join(' · ')}
          <span class="meal-budget__sep" aria-hidden="true">=</span>
          <span class="meal-budget__used">${mb.usedKcal.toLocaleString()} used</span>
        </div>
        <div class="meal-budget__bar" aria-hidden="true">
          <div class="meal-budget__bar-used" style="width: ${usedPct}%"></div>
          <div class="meal-budget__bar-tonight" style="left: ${usedPct}%; width: ${tonightPct}%"></div>
        </div>
        <p class="meal-budget__tonight">
          Tonight's allowance:
          <strong>${mb.tonightAllowanceKcal} kcal</strong>
          <span class="meal-budget__sub">· budget remaining ${mb.remainingKcal} kcal</span>
        </p>
      </div>
    `;
  }

  function atomKcalBadge(kcal, fit) {
    return `<span class="kcal-badge kcal-badge--${fit}">${kcal} kcal</span>`;
  }

  function atomFitChip(fit) {
    const labels = { under: 'Fits budget', close: 'Close · ~100 over', over: 'Over budget' };
    return `<span class="fit-chip fit-chip--${fit}">${labels[fit]}</span>`;
  }

  function atomMacroBars(macros) {
    return `
      <div class="macro-bars-wrap" aria-label="Macros — protein ${macros.p}%, fat ${macros.f}%, carbs ${macros.c}%">
        <div class="macro-bars">
          <span class="macro-bar macro-bar--p" style="--w: ${macros.p}"></span>
          <span class="macro-bar macro-bar--f" style="--w: ${macros.f}"></span>
          <span class="macro-bar macro-bar--c" style="--w: ${macros.c}"></span>
        </div>
        <span class="macro-bars__legend">P${macros.p} · F${macros.f} · C${macros.c}</span>
      </div>
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
    const healthDeep = opts.healthDeep;
    const meta = opts.cardHealthMeta && opts.cardHealthMeta[card.id];
    const fit = meta && meta.fit;
    const diffKind = opts.diff && opts.diff.byId ? opts.diff.byId[card.id] : null;
    const cardClasses = [
      'recipe-card',
      card.highlighted ? 'is-highlighted' : '',
      healthDeep ? 'recipe-card--health-mode' : '',
      healthDeep && fit ? `recipe-card--fit-${fit}` : '',
      diffKind ? `recipe-card--diff-${diffKind.toLowerCase()}` : '',
    ].filter(Boolean).join(' ');
    return `
      <article class="${cardClasses}" data-flip-key="recipe-${card.id}">
        ${imgSrc ? `
          <div class="recipe-card__media">
            <img src="${imgSrc}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            ${card.highlighted ? '<span class="recipe-card__pick" aria-hidden="true">Top pick</span>' : ''}
            ${healthDeep && meta ? atomKcalBadge(meta.kcal, meta.fit) : ''}
            ${diffKind ? atomDiffChip(diffKind) : ''}
          </div>
        ` : `${diffKind ? atomDiffChip(diffKind) : ''}`}
        <div class="recipe-card__body">
          <div class="recipe-card__top">
            <h4 class="recipe-card__title">${card.title}</h4>
            ${showKcal && !healthDeep ? atomKcalRing(card.kcal) : ''}
          </div>
          ${healthDeep && meta ? atomMacroBars(meta.macros) : ''}
          <p class="recipe-card__meta">
            <span>${card.prepMin} min</span>
            <span aria-hidden="true">·</span>
            ${atomPriceBadge(card.priceJpy, emphasizePrice)}
          </p>
          <div class="recipe-card__tags">
            ${atomTagChip(card.tag)}
            ${healthDeep && fit ? atomFitChip(fit) : ''}
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
    return `<p class="banner banner--useup"><span class="banner__chip">EXPIRY</span> ${text}</p>`;
  }

  function atomShoppingListBanner(servingsHint) {
    return `<p class="banner banner--shopping"><span class="banner__chip">SHOPPING LIST</span> serves ${servingsHint || '6'} · 7 items missing — send to phone</p>`;
  }

  function atomDeliveryBanner() {
    return `<p class="banner banner--delivery"><span class="banner__chip">DELIVERY</span> cooking time tight — alternates surfaced</p>`;
  }

  // ─── Device renderers ───
  function renderFridgeUI(state, device) {
    const cards = state.ui.cards.slice(0, device.maxCards);
    const opts = makeRecipeOpts(state);
    // Custom screen-focused frame: a 21-inch portrait display
    // (the actual screen on a Samsung Family Hub fridge, isolated for legibility).
    // The canonical .samfh frame shows the whole fridge — a poor fit when the
    // content needs to be readable. We label it as such in the meta caption.
    const dim = state.ui.dim ? 'is-dimmed' : '';
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="fridge-screen-frame ${dim}" aria-label="Samsung Family Hub fridge display">
          <div class="fridge-screen-frame__bezel">
            <div class="fridge-screen-frame__cam" aria-hidden="true"></div>
            <div class="fridge-screen-frame__screen">
              <div class="screen-pad screen-pad--fridge">
                <div class="screen-header">
                  <span class="screen-header__brand">Suno · Kitchen</span>
                </div>
                ${renderHealthHeader(state)}
                ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
                ${state.ui.showShoppingList ? atomShoppingListBanner(state.ui.servingsHint) : ''}
                ${state.ui.deliveryOption ? atomDeliveryBanner() : ''}
                ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
                <h3 class="screen-title">${state.ui.title}</h3>
                <div class="recipe-stack recipe-stack--2col">
                  ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
                </div>
                ${renderHealthFootnote(state)}
                <p class="screen-hint">Voice: "Suno, start salmon" · Tap card to confirm</p>
              </div>
            </div>
          </div>
          <p class="fridge-screen-frame__caption">21″ portrait display · mounted on the Family Hub door</p>
        </div>
      </div>
    `;
  }

  function renderTvCastUI(state, device) {
    const cards = state.ui.cards.slice(0, device.maxCards);
    const opts = makeRecipeOpts(state);
    const highlightedCard = cards.find((c) => c.highlighted) || cards[0];
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="tv-rig">
          <div class="proto-tv">
            <div class="proto-tv__screen">
              <div class="screen-header">
                <span class="screen-header__brand">Suno · Living Room</span>
                ${atomVoteAvatars()}
              </div>
              ${renderHealthHeader(state)}
              ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
              ${state.ui.showShoppingList ? atomShoppingListBanner(state.ui.servingsHint) : ''}
              ${state.ui.deliveryOption ? atomDeliveryBanner() : ''}
              ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
              ${renderFrameworkDecisions(opts.diff)}
              <h3 class="screen-title">${state.ui.title}</h3>
              <div class="recipe-row">
                ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
              </div>
              ${renderHealthFootnote(state)}
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
    const opts = makeRecipeOpts(state);
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="ipad11 ipad11--landscape" style="--ipad-w: 720px;">
          <div class="ipad11__cam" aria-hidden="true"></div>
          <div class="ipad11__screen">
            <div class="screen-pad screen-pad--ipad">
              <div class="screen-header">
                <span class="screen-header__brand">Suno · Browse</span>
              </div>
              ${renderHealthHeader(state)}
              ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
              ${state.ui.showShoppingList ? atomShoppingListBanner(state.ui.servingsHint) : ''}
              ${state.ui.deliveryOption ? atomDeliveryBanner() : ''}
              ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
              ${renderFrameworkDecisions(opts.diff)}
              <h3 class="screen-title">${state.ui.title}</h3>
              <div class="recipe-detail-list">
                ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
              </div>
              ${renderHealthFootnote(state)}
              <p class="screen-hint">Long-press to compare · save to plan</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ─── Phone (iPhone 15 Pro) — surface that morphs with physical state ───
     - default: full UI in hand, two thumbs (or one)
     - one-thumb: bottom-anchored thumb arc, larger targets
     - earphones: no-screen surface (audio + ring control)
     - voice-only: no-screen surface (smart speaker / AirPods + voice) */
  function renderPhoneUI(state, device) {
    const cards = state.ui.cards.slice(0, device.maxCards);
    const opts = makeRecipeOpts(state);
    const phoneMode = state.ui.phoneMode || 'default';

    if (phoneMode === 'earphones') {
      return `
        <div class="frame-wrap">
          <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
          <div class="no-screen-surface no-screen-surface--audio" aria-label="Audio mode — phone in pocket">
            <div class="no-screen-surface__icon" aria-hidden="true">🎧</div>
            <p class="no-screen-surface__mode">Audio mode</p>
            <p class="no-screen-surface__instruction">
              "Three picks tonight. Salmon, soba, tonkatsu.<br>
              <strong>Tap your ring once</strong> to hear the next, twice to confirm."
            </p>
            <p class="no-screen-surface__sub">Phone face-down · earphones + ring</p>
            <div class="no-screen-surface__waves" aria-hidden="true"><span></span><span></span><span></span></div>
          </div>
        </div>
      `;
    }

    if (phoneMode === 'voice-only') {
      return `
        <div class="frame-wrap">
          <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
          <div class="no-screen-surface no-screen-surface--voice" aria-label="Voice-only mode — Hana is in bed">
            <div class="no-screen-surface__icon" aria-hidden="true">🌙</div>
            <p class="no-screen-surface__mode">Voice only · gentle</p>
            <p class="no-screen-surface__instruction">
              "I'll keep it simple — there's miso porridge<br>
              and ginger soba broth.<br>
              <strong>Say one or two,</strong> or just rest."
            </p>
            <p class="no-screen-surface__sub">Smart speaker · Daichi notified to start cooking</p>
            <div class="no-screen-surface__waves" aria-hidden="true"><span></span><span></span><span></span></div>
          </div>
        </div>
      `;
    }

    // Visual phone surface (default or one-thumb)
    const isOneThumb = phoneMode === 'one-thumb';
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}${isOneThumb ? ' · thumb-arc layout' : ''}</p>
        <div class="iphone15pro iphone15pro--lg ${isOneThumb ? 'is-thumb' : ''}">
          <img class="iphone15pro__chrome"
               src="../../Global_Assets/DeviceFrame/IPhone_15_Pro_Vector.svg"
               alt="" aria-hidden="true">
          <div class="iphone15pro__screen">
            <div class="screen-pad screen-pad--phone ${isOneThumb ? 'screen-pad--thumb' : ''}">
              <div class="screen-header">
                <span class="screen-header__brand">Suno · Phone</span>
              </div>
              ${renderHealthHeader(state)}
              ${state.ui.useUpBanner ? atomUseUpBanner(state.ui.useUpBanner) : ''}
              ${state.ui.showShoppingList ? atomShoppingListBanner(state.ui.servingsHint) : ''}
              ${state.ui.deliveryOption ? atomDeliveryBanner() : ''}
              ${state.ui.allergenWarning ? `<p class="allergen-warning">${state.ui.allergenWarning}</p>` : ''}
              ${renderFrameworkDecisions(opts.diff)}
              <h3 class="screen-title">${state.ui.title}</h3>
              <div class="recipe-stack">
                ${cards.map((c) => atomRecipeCard(c, opts)).join('')}
              </div>
              ${renderHealthFootnote(state)}
              <p class="screen-hint">${isOneThumb ? 'Big targets · everything in thumb-arc' : 'Tap to confirm · swipe for alternates'}</p>
            </div>
          </div>
          <div class="iphone15pro__island" aria-hidden="true"></div>
        </div>
      </div>
    `;
  }

  /* ─── Apple Watch — wrist · single card glance ─── */
  function renderWatchUI(state, device) {
    const card = state.ui.cards.find((c) => c.highlighted) || state.ui.cards[0];
    if (!card) {
      return `<div class="frame-wrap"><p class="frame-meta">${device.label} · ${device.anchorHint}</p><p>No card.</p></div>`;
    }
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="watch-frame" aria-label="Apple Watch glance">
          <div class="watch-frame__chrome">
            <div class="watch-frame__crown" aria-hidden="true"></div>
            <div class="watch-frame__btn" aria-hidden="true"></div>
            <div class="watch-frame__screen">
              <p class="watch-frame__time">22:34</p>
              <p class="watch-frame__title">${card.title}</p>
              ${card.prepMin > 0 ? `<p class="watch-frame__meta">${card.prepMin} min · ${card.tag || ''}</p>` : ''}
              <div class="watch-frame__actions">
                <button class="watch-frame__btn-yes" type="button">Start</button>
                <button class="watch-frame__btn-later" type="button">Later</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ─── Bedside speaker — voice + ambient light ─── */
  function renderSpeakerUI(state, device) {
    const card = state.ui.cards.find((c) => c.highlighted) || state.ui.cards[0];
    return `
      <div class="frame-wrap">
        <p class="frame-meta">${device.label} · ${device.anchorHint}</p>
        <div class="no-screen-surface no-screen-surface--voice" aria-label="Bedside speaker · voice mode">
          <div class="no-screen-surface__icon" aria-hidden="true">🔆</div>
          <p class="no-screen-surface__mode">Speaker · ambient</p>
          <p class="no-screen-surface__instruction">
            ${card ? `"${card.title}"` : ''}<br>
            <strong>Say "yes"</strong> or just close your eyes.
          </p>
          <p class="no-screen-surface__sub">Lights warming · curtains closing · phone face-down</p>
          <div class="no-screen-surface__waves" aria-hidden="true"><span></span><span></span><span></span></div>
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
    renderDecisionWorkbench(s);
    renderIntent(s);
    renderTokens(s);
    renderBrain(s);
    renderRules(s);
    renderAxPatterns(s);
    renderUI(s);
    const overlayCount = appState.activeToggles.size;
    const overlayText = overlayCount === 0 ? 'no context overlays' : `${overlayCount} context overlay${overlayCount === 1 ? '' : 's'}`;
    const diff = computeUIDiff(s);
    const diffParts = [];
    if (diff.addedCount)    diffParts.push(`${diff.addedCount} added`);
    if (diff.changedCount)  diffParts.push(`${diff.changedCount} rewritten`);
    if (diff.promotedCount) diffParts.push(`${diff.promotedCount} promoted`);
    if (diff.sortedCount)   diffParts.push(`${diff.sortedCount} re-ranked`);
    if (diff.hiddenCount)   diffParts.push(`${diff.hiddenCount} filtered`);
    const diffText = diffParts.length ? ` UI: ${diffParts.join(', ')}.` : '';
    announce(`Re-evaluated. ${s.rules.length} rules, ${s.axPatterns.length} patterns, ${overlayText}.${diffText}`);
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
  function setActiveScenario(id) {
    if (!SCENARIOS[id] || !SCENARIOS[id].data) return;
    appState.activeScenario = id;
    appState.activeToggles = new Set();
    appState.activeDevice = SCENARIOS[id].defaultDevice;
    // Re-render docks (devices + toggles depend on scenario)
    buildDevicesDock();
    buildTogglesDock();
    renderAll();
  }

  function buildScenarioPicker() {
    const el = document.getElementById('scenario-picker');
    if (!el) return;
    el.innerHTML = Object.entries(SCENARIOS)
      .filter(([_, sc]) => sc.data)
      .map(([id, sc]) => `
        <button class="scenario-tab ${id === appState.activeScenario ? 'is-active' : ''}" type="button" data-scenario-id="${id}" aria-pressed="${id === appState.activeScenario ? 'true' : 'false'}">
          <span class="scenario-tab__label">${sc.label}</span>
          <span class="scenario-tab__sub">${sc.sub}</span>
        </button>
      `).join('');
    el.querySelectorAll('.scenario-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('.scenario-tab').forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        setActiveScenario(btn.dataset.scenarioId);
      });
    });
  }

  function buildLensDock() {
    const lensEl = document.getElementById('lens-dock');
    if (!lensEl) return;
    lensEl.innerHTML = Object.entries(REVIEW_LENSES).map(([id, lens]) => `
      <button class="lens-tab ${id === appState.activeLens ? 'is-active' : ''}" type="button" data-lens-id="${id}" aria-pressed="${id === appState.activeLens ? 'true' : 'false'}">
        <span class="lens-tab__label">${lens.label}</span>
        <span class="lens-tab__sub">${lens.sub}</span>
      </button>
    `).join('');
    lensEl.querySelectorAll('.lens-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        lensEl.querySelectorAll('.lens-tab').forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        appState.activeLens = btn.dataset.lensId;
        renderDecisionWorkbench(computeState());
      });
    });
  }

  function buildDevicesDock() {
    const devicesEl = document.getElementById('devices-dock');
    if (!devicesEl) return;
    devicesEl.innerHTML = getScenario().devices.map((d) => `
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
        const currentState = computeState();
        renderUI(currentState);
        renderDecisionWorkbench(currentState);
      });
    });
  }

  function buildTogglesDock() {
    const togglesEl = document.getElementById('toggles-dock');
    if (!togglesEl) return;
    const CATEGORY_ORDER = ['goals', 'social', 'constraint', 'physical'];
    const CATEGORY_LABELS = {
      goals:      'Goals',
      social:     'Social context',
      constraint: 'Constraints',
      physical:   'Physical / surface',
    };
    const grouped = {};
    getScenario().toggles.forEach((t) => {
      const cat = t.category || 'constraint';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(t);
    });
    togglesEl.innerHTML = CATEGORY_ORDER
      .filter((cat) => grouped[cat] && grouped[cat].length)
      .map((cat) => `
        <div class="toggle-group">
          <p class="toggle-group__heading">${CATEGORY_LABELS[cat]}</p>
          ${grouped[cat].map((t) => `
            <button class="ctx-toggle" type="button" data-toggle-id="${t.id}" aria-pressed="false">
              <span class="ctx-toggle__label">${t.label}</span>
              <span class="ctx-toggle__sub">${t.sub}</span>
            </button>
          `).join('')}
        </div>
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
        const scopes = [
          document.getElementById('stage-1-body'),
          document.getElementById('stage-2-body'),
          document.getElementById('stage-3a-body'),
          document.getElementById('stage-3b-body'),
          document.getElementById('stage-3c-body'),
          document.getElementById('stage-4-body'),
          document.getElementById('decision-workbench-body'),
        ];
        flipMorph(scopes, renderAll);
      });
    });
  }

  function init() {
    // Initialize active device from default scenario
    appState.activeDevice = SCENARIOS[appState.activeScenario].defaultDevice;
    renderAll();

    // Build the docks (scenario picker + devices + toggles)
    buildScenarioPicker();
    buildLensDock();
    buildDevicesDock();
    buildTogglesDock();

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
