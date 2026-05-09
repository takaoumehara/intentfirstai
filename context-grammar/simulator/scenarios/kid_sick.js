/* Scenario: Child sick at school · critical alert breaks Focus Mode */
window.SCENARIO_KID_SICK = (() => {
  const defaultState = {
    intent: { utterance: 'Don\'t miss the school call.', meta: 'Hana · Wednesday · 12:30 · in design review presentation', shape: 'safety-critical breakthrough · Focus Mode override' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Stationary · presenting', signal: 'meeting room · slides on screen', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High (presentation)', signal: 'Focus Mode active · all notifs queued', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Acquaintances (clients)', signal: '8 people in room · 3 dialed in', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'CRITICAL · child safety', signal: 'school nurse number · Sota fever 38.1°C', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · breakthrough', signal: 'silent + vibrate · subtle banner', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Pickup arrangeable', signal: 'home 12 min · Daichi can pickup in 18', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Notify (selective break)', signal: 'family + safety only', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · family + medical', signal: 'school enrollment + parent priority', firing: true },
    },
    brain: {
      L1: [{ entry: 'Family safety always overrides Focus Mode · school + medical break-through is non-negotiable.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'School nurse number whitelisted · breakthrough used 3 times in 2 years · always real.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: design review running 25 of 60 min · school nurse calling · Sota fever logged 38.1°C.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'override:focus-mode · whitelisted-school', drivers: ['L1.identity', 'priority_weight'], output: 'phone vibrates discreetly · subtle banner only' },
      { name: 'context:show-stakes', drivers: ['L3.fever', 'feasibility'], output: 'Sota 38.1°C · pickup options + Daichi availability' },
      { name: 'preserve:meeting-state', drivers: ['social_exposure', 'cognitive_load'], output: 'no audio interrupt · slides not affected' },
    ],
    axPatterns: [
      { id: 'D6', name: 'Dynamic Friction', essence: 'CRITICAL breaks the dial', driver: 'priority_weight' },
      { id: 'A6', name: 'Care Architecture', essence: 'family safety is L1', driver: 'L1.identity' },
      { id: 'A2', name: 'Cognitive Scaling', essence: 'minimal disruption', driver: 'cognitive_load' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard phone in Focus Mode either lets <em>everything</em> through or <em>nothing</em> through. The framework reads <em>school number + child fever flag + meeting in progress</em> and <strong>breaks Focus Mode quietly</strong>: a single subtle vibrate + banner. The other 14 queued notifications stay queued — only this one earns the interrupt.',
    },
    ui: {
      title: 'School · Sota fever 38.1°C · pickup needed',
      hint: 'Tap to call back · or text Daichi for pickup',
      cards: [
        { id: 'callback', title: 'Call school nurse',                 prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'CRITICAL · breakthrough',          highlighted: true,  image: null },
        { id: 'daichi',   title: 'Text Daichi · pickup at 13:00?',    prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Daichi free · pickup possible',    highlighted: false, image: null },
        { id: 'queue',    title: '14 other notifications still queued',prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Restraint · Focus Mode preserved', highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'fever_higher', label: 'Temperature 39.4°C', sub: 'escalation', category: 'constraint',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L3: [{ entry: 'Sota fever rising · 39.4°C · school nurse recommends pickup within 30 min.', highlight: true, weight: 'now' }, ...s.brain.L3] },
        rules: [{ name: 'urgency:30-min · doctor-ping', drivers: ['L3.fever', 'priority_weight'], output: 'meeting auto-paused · clinic options surfaced' }, ...s.rules],
        ui: { ...s.ui, title: 'Pickup in 30 min · clinic ping ready', cards: s.ui.cards.map(c => c.id === 'callback' ? { ...c, title: 'Pause meeting · clinic 4 min from school', tag: 'URGENT · meeting paused' } : c) }}) },
    { id: 'daichi_unavailable', label: 'Daichi in own meeting', sub: 'fallback chain', category: 'constraint',
      mutate: (s) => ({ ...s, rules: [{ name: 'fallback:trust-graph', drivers: ['L1.family', 'feasibility'], output: 'grandma 12 min away · school can hold until then' }, ...s.rules],
        ui: { ...s.ui, cards: [{ id: 'grandma', title: 'Call grandma · she\'s 12 min from school', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Trust graph · fallback', highlighted: true, image: null }, ...s.ui.cards.slice(1)] }}) },
    { id: 'spam_call_school_number', label: 'Wait · this looks like spam', sub: 'AI uncertainty', category: 'goals',
      mutate: (s) => ({ ...s, rules: [{ name: 'verify:cross-reference', drivers: ['feasibility'], output: 'AI checks school directory + Sota presence today' }, ...s.rules],
        axPatterns: [{ id: 'E1', name: 'Confidence Signal', essence: 'AI shows uncertainty before interrupting', driver: 'feasibility' }, ...s.axPatterns],
        ui: { ...s.ui, title: 'Possibly spam — verifying school directory', cards: [{ id: 'verify', title: 'Match: school nurse line · 99.7% confidence · interrupting', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'AI confidence shown', highlighted: true, image: null }, ...s.ui.cards.slice(0)] }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · Focus Mode broken', sub: 'silent vibrate · subtle banner', density: 'minimal', maxCards: 3, control: 'tap · voice', anchorHint: 'Single critical card', drops: ['rich UI'] },
    { id: 'watch', label: 'Apple Watch', sub: 'haptic + glance', density: 'minimal', maxCards: 1, control: 'tap', anchorHint: 'Wrist breakthrough', drops: ['list'] },
  ];
  return { defaultState, toggles, devices };
})();
