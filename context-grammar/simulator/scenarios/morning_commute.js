/* Scenario: Morning commute · train swap · physical state escalates priority */
window.SCENARIO_MORNING_COMMUTE = (() => {
  const defaultState = {
    intent: { utterance: 'Get me to work fastest.', meta: 'Hana · Wednesday · 08:12 · platform 3', shape: 'time-locked · physical-state-driven · escalating' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Standing · platform', signal: 'GPS = station · waiting posture', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Moderate (commuting)', signal: 'app switching elevated', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Public · crowded', signal: 'rush hour · 200 people · standing', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'High · 47 min to standup', signal: 'meeting at 09:00 · 47 min ETA risk', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · one thumb (rail-grab)', signal: 'one hand on handrail', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Multiple routes', signal: 'JR delayed 8 min · Yamanote alt route', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest', signal: 'route selection user-driven', firing: false },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · transit + calendar', signal: 'meeting times + transit cards shared', firing: false },
    },
    brain: {
      L1: [{ entry: 'Hana: 9:00 standup is non-negotiable · prefers train > taxi 95% of mornings.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 12 commutes: 3 train delays · always took alternate route · pattern locked.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: JR delayed 8 min · Yamanote alt: 9 min slower but reliable · 47 min to standup.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'physical:thumb-arc · large-targets', drivers: ['physical_state', 'form_factor'], output: 'all controls in bottom 60% · ≥48dp' },
      { name: 'route:dynamic · delay-aware', drivers: ['feasibility', 'L2.pattern'], output: 'show JR delay + Yamanote alt with arrival times' },
      { name: 'escalate-on-miss', drivers: ['priority_weight'], output: 'if both options fail, propose taxi' },
    ],
    axPatterns: [
      { id: 'A2', name: 'Cognitive Scaling', essence: 'thumb-arc collapse', driver: 'physical_state' },
      { id: 'D3', name: 'Proactive Nudge', essence: 'delay-aware suggestion', driver: 'L2.pattern' },
      { id: 'D6', name: 'Dynamic Friction', essence: 'taxi escalation if needed', driver: 'priority_weight' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard transit app shows you the planned route. The framework reads <em>JR delay + Hana\'s 9:00 standup + her pattern of taking alternates + her one-thumb posture</em> and surfaces <strong>both options pre-compared</strong>, with arrival timestamps relative to her meeting. The thumb-arc layout keeps everything reachable.',
    },
    ui: {
      title: 'JR delayed 8 min · Yamanote arrives 08:54',
      hint: 'Tap to switch · auto-rebooks if needed',
      cards: [
        { id: 'jr',       title: 'JR · delayed 8 min · arrives 08:58', prepMin: 26, priceJpy: 280, kcal: 0, allergens: [], tag: 'Tight · 2 min before standup',   highlighted: true,  image: null },
        { id: 'yama',     title: 'Yamanote · alternate · arrives 08:54', prepMin: 24, priceJpy: 280, kcal: 0, allergens: [], tag: 'Reliable · 6 min buffer',     highlighted: false, image: null },
        { id: 'taxi',     title: 'Taxi · 19 min · ¥3,800',                prepMin: 19, priceJpy: 3800, kcal: 0, allergens: [], tag: 'Fallback · saved · 1 tap',  highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'missed_jr', label: 'Train cancelled · need taxi', sub: 'escalate', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, autonomy_dial: { ...s.tokens.autonomy_dial, value: 'Confirm (escalated)', firing: true }, priority_weight: { ...s.tokens.priority_weight, value: 'CRITICAL · taxi or miss', firing: true }},
        rules: [{ name: 'autonomy:escalate · suggest→confirm-with-cta', drivers: ['priority_weight'], output: 'pre-booked taxi · single tap to confirm' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Train cancelled — taxi pre-booked at curb', cards: [{ id: 'taxi-go', title: 'Toyota Sienna · pulling up · 90 sec', prepMin: 19, priceJpy: 3800, kcal: 0, allergens: [], tag: 'Confirmed · meter starts at door', highlighted: true, image: null }] }}) },
    { id: 'crowded_carriage', label: 'Carriage too full · grip impossible', sub: 'audio-only', category: 'physical',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, form_factor: { ...s.tokens.form_factor, value: 'No-screen · audio + ring', firing: true }},
        rules: [{ name: 'output:audio-only · ring-control', drivers: ['form_factor'], output: 'phone face-down in pocket · earbud confirms route' }, ...s.rules],
        ui: { ...s.ui, phoneMode: 'earphones', title: 'Audio mode · ring tap to confirm route' }}) },
    { id: 'carry_kid', label: 'With Sota · 6yo · backpack', sub: 'mobility limited', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Family · child', firing: true }},
        rules: [{ name: 'priority:elevator-required', drivers: ['social_exposure', 'physical_state'], output: 'route auto-pruned to elevator-accessible · slower OK' }, ...s.rules],
        ui: { ...s.ui, title: 'With Sota · elevator route · 5 min later but accessible', cards: s.ui.cards.map(c => ({ ...c, tag: c.tag + ' · elevator-accessible' })) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · one-thumb', sub: 'thumb-arc bottom 60%', density: 'compact', maxCards: 3, control: 'thumb only', anchorHint: 'Single-hand surface', drops: ['rich UI'] },
    { id: 'watch', label: 'Apple Watch', sub: 'wrist · countdown only', density: 'minimal', maxCards: 1, control: 'tap', anchorHint: 'Glanceable timer', drops: ['list'] },
  ];
  return { defaultState, toggles, devices };
})();
