/* Scenario: Walking through Naka-Meguro at dinnertime · Maps surfaces saved spots */
window.SCENARIO_MAPS_DINNER = (() => {
  const defaultState = {
    intent: { utterance: 'Where should we eat?', meta: 'Hana · Friday · 19:15 · Naka-Meguro', shape: 'walking · open intent · ambient' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Walking · 2km from home', signal: 'GPS · 1.4 m/s pace', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (browsing)', signal: 'no calendar pressure', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Trusted partner', signal: 'Daichi nearby', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Low · exploratory', signal: 'no deadline · 19:15', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · one hand', signal: 'screen on · walking grip', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Walking range · 8 min', signal: 'Maps + open-now data', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest', signal: 'AI surfaces · user picks', firing: false },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · location + saves', signal: 'Instagram saves shared', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana saved 12 places in this neighbourhood on Instagram (last 6 months).', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Daichi avoids ramen on Friday. Pattern: 3 of last 4 Friday dinners.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: 19:15 · in Naka-Meguro · partner with · weather clear.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'surface:saved-places · in-radius', drivers: ['L1.saves', 'physical_state'], output: 'cluster saved spots on map' },
      { name: 'filter:open-now · walkable', drivers: ['feasibility'], output: 'exclude closed · ≤8 min walk' },
      { name: 'subtract:partner-pattern', drivers: ['L2.daichi'], output: 'demote ramen' },
    ],
    axPatterns: [
      { id: 'A6', name: 'Care Architecture', essence: 'old saves become useful again', driver: 'L1.saves' },
      { id: 'D3', name: 'Proactive Nudge', essence: 'ambient · no interrupt', driver: 'priority_weight' },
      { id: 'A3', name: 'Social-Aware Filtering', essence: 'partner pattern read', driver: 'L2' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard map shows "Top restaurants nearby." The framework reads <em>your saved Instagram posts in this district</em> + <em>open now</em> + <em>partner pattern</em> and surfaces <strong>three places you already chose to remember</strong>.',
    },
    ui: {
      title: '3 of your saved places · open now',
      hint: 'Tap a pin · long-press to remove forever',
      cards: [
        { id: 'onibus',   title: 'Onibus Coffee',  prepMin: 4, priceJpy: 1400, kcal: 0, allergens: [], tag: 'Saved Mar 12 · 4 min walk', highlighted: true,  image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=520&q=80&auto=format&fit=crop' },
        { id: 'higashiya',title: 'Higashiya',      prepMin: 6, priceJpy: 3800, kcal: 0, allergens: [], tag: 'Saved Aug 04 · 6 min walk', highlighted: false, image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=520&q=80&auto=format&fit=crop' },
        { id: 'facon',    title: 'Café Facon',     prepMin: 8, priceJpy: 1800, kcal: 0, allergens: [], tag: 'Saved 2 weeks ago · 8 min', highlighted: false, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'rain_suddenly', label: 'Rain starts', sub: 'sudden shower · 2 min away', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, feasibility: { ...s.tokens.feasibility, value: 'Walking limited · seek cover', firing: true, signal: 'rain in 2 min · need indoor' }},
        rules: [{ name: 'feasibility:weather-override', drivers: ['feasibility'], output: 'closest covered options first' }, ...s.rules],
        ui: { ...s.ui, title: 'Rain incoming — closest covered', cards: [...s.ui.cards].sort((a,b) => a.prepMin - b.prepMin) }}) },
    { id: 'reservation_window', label: 'Limited reservation', sub: '20:00 cut-off everywhere', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'Time-sensitive', firing: true }},
        rules: [{ name: 'priority:time-window', drivers: ['priority_weight'], output: 'highlight reservation closing' }, ...s.rules],
        ui: { ...s.ui, title: 'Reservations closing soon', cards: s.ui.cards.map(c => ({ ...c, tag: c.tag + ' · last seating 19:45' })) }}) },
    { id: 'with_kids', label: 'Kids with us', sub: 'Aoi 11 · Sota 6 in tow', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Family with children', firing: true }},
        brain: { ...s.brain, L1: [{ entry: 'Aoi salmon allergy · Sota picky · prefers booth seating.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'filter:kid-friendly', drivers: ['social_exposure', 'L1'], output: 'remove no-kids spots · prioritize booth' }, ...s.rules],
        ui: { ...s.ui, title: 'Kid-safe saved places', cards: s.ui.cards.filter(c => c.id !== 'higashiya') }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · in hand', sub: 'walking · one thumb', density: 'compact', maxCards: 3, control: 'thumb · voice', anchorHint: 'Personal · ambient', drops: [] },
    { id: 'watch', label: 'Apple Watch', sub: 'glance only', density: 'minimal', maxCards: 1, control: 'tap · crown', anchorHint: 'Top pick on wrist', drops: ['list', 'browse'] },
  ];
  return { defaultState, toggles, devices };
})();
