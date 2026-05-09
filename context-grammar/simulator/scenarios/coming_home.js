/* Scenario: 5 minutes from home · the house starts arriving too */
window.SCENARIO_COMING_HOME = (() => {
  const defaultState = {
    intent: { utterance: 'Almost home.', meta: 'Hana · Tuesday · 18:32 · car · last stretch', shape: 'predictable arrival · multi-surface coordination' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Driving · approaching home', signal: '5 min ETA · home Wi-Fi visible', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Moderate (transition)', signal: 'mental gear-shift to home', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Family at home', signal: 'Aoi practising piano · Daichi cooking', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard', signal: 'routine arrival', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Multi-surface · ambient', signal: 'CarPlay + home displays + lights', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Fridge inventory + groceries', signal: 'just bought salmon · pantry sync', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Auto (ambient prep)', signal: 'lights · climate auto', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · home domain', signal: 'household routines · calendars · pantry', firing: true },
    },
    brain: {
      L1: [{ entry: 'Routine: 18:30 arrival → dinner prep · lights warm · climate 22°C.', highlight: true, weight: 'identity' }],
      L2: [{ entry: '14 of last 16 Tuesdays: Hana arrives with groceries · cooks within 10 min.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: 5 min ETA · groceries in trunk · Aoi practice ends 18:45 · Daichi prep started.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'parallel:multi-surface-wake', drivers: ['form_factor', 'L2.pattern'], output: 'fridge + lights + speaker each prepare independently' },
      { name: 'pantry:cross-reference', drivers: ['feasibility', 'L3.groceries'], output: 'tonight\'s recipes filtered to actual pantry+trunk' },
      { name: 'family:respectful-merge', drivers: ['social_exposure'], output: 'don\'t override Daichi\'s cooking · just augment' },
    ],
    axPatterns: [
      { id: 'A6', name: 'Care Architecture', essence: 'house anticipates arrival', driver: 'L1.routine' },
      { id: 'D4', name: 'Omakase Mode', essence: 'lights + climate auto-set', driver: 'autonomy_dial' },
      { id: 'D6', name: 'Dynamic Friction', essence: 'food choices still need approval', driver: 'priority_weight' },
    ],
    intentTest: {
      enabled: true,
      text: 'A normal smart home reacts when you walk through the door. The framework reads <em>5 min ETA + Tuesday pattern + groceries detected + Aoi piano window</em> and starts <strong>preparing the house in parallel</strong>: lights warm, fridge surfaces tonight\'s candidates using the salmon you just bought, climate adjusts. Daichi\'s active cooking is respected — the system augments, not overrides.',
    },
    ui: {
      title: 'House preparing · 5 min away',
      hint: 'All ambient · nothing to do',
      cards: [
        { id: 'lights',  title: 'Lights · pre-warming to 22°',     prepMin: 5, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto · ambient',           highlighted: true,  image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=520&q=80&auto=format&fit=crop' },
        { id: 'recipe',  title: 'Tonight: Salmon (you just bought)',prepMin: 25, priceJpy: 0, kcal: 540, allergens: ['fish'], tag: 'Pantry+groceries', highlighted: false, image: '../../assets/img/recipe/salmon.webp' },
        { id: 'family',  title: 'Aoi piano ends 18:45 · Daichi prepping',prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Family state',         highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'guests_unexpected', label: 'Daichi: "guests in 30 min"', sub: 'plans escalate', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Family + guests', firing: true }, priority_weight: { ...s.tokens.priority_weight, value: 'High · 30-min cook window', firing: true }},
        rules: [{ name: 'meal:scaled-up · 6-portions', drivers: ['social_exposure'], output: 'recipe scaled · shopping gap surfaced' }, ...s.rules],
        ui: { ...s.ui, title: 'Guests in 30 min — recipe scaled', cards: [{ id: 'plan', title: 'Salmon for 6 · need lemon + bread', prepMin: 28, priceJpy: 1200, kcal: 540, allergens: ['fish'], tag: 'Last shop window: 18:45', highlighted: true, image: '../../assets/img/recipe/salmon.webp' }] }}) },
    { id: 'late_arrival', label: 'Traffic · arrival 19:10', sub: '40 min late', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'High · re-coordinate', firing: true }},
        rules: [{ name: 'reschedule:cascade', drivers: ['priority_weight'], output: 'Daichi notified · piano shifted · dinner -15 min recipe' }, ...s.rules],
        ui: { ...s.ui, title: 'Late — system rebooked the evening', cards: s.ui.cards.map(c => c.id === 'recipe' ? { ...c, title: 'Switched: Soba + tempura · 22 min', tag: 'Faster recipe · pantry-only' } : c) }}) },
    { id: 'pickup_kid', label: 'Pickup Aoi · gym detour', sub: 'extra stop', category: 'physical',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, physical_state: { ...s.tokens.physical_state, value: 'Driving · detour to gym', firing: true }},
        rules: [{ name: 'route:replan · home-prep-delays', drivers: ['physical_state'], output: 'house wake-up postponed by 12 min' }, ...s.rules],
        ui: { ...s.ui, title: 'Detour added · house prep paused', cards: s.ui.cards.map(c => c.id === 'lights' ? { ...c, tag: 'Paused · resume in 12 min' } : c) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'CarPlay · ambient', sub: 'reading state · no manual', density: 'audio', maxCards: 3, control: 'voice', anchorHint: 'Glance only', drops: ['interaction'] },
    { id: 'fridge', label: 'Fridge · awakening', sub: 'house-side surface', density: 'compact', maxCards: 3, control: 'voice + tap when home', anchorHint: 'Pre-arrival prep', drops: [] },
  ];
  return { defaultState, toggles, devices };
})();
