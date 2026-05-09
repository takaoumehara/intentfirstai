/* Scenario: Multi-day Kyoto trip · weather + calendar + family preferences */
window.SCENARIO_TRAVEL_PLAN = (() => {
  const defaultState = {
    intent: { utterance: 'Plan our 3-day Kyoto trip.', meta: 'Hana · 2 weeks before · evening · phone in hand', shape: 'multi-day · multi-person · weather-aware' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Stationary · home', signal: 'planning posture', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (planning)', signal: 'leisure scrolling', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Family of 4', signal: 'shared trip · Daichi + Aoi + Sota', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard · 14 days out', signal: 'flexible · revisable', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · iPad sync', signal: 'browsing on phone · pinning to iPad family screen', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Weather + venue + schedule', signal: 'forecast 14 days · venues open · school calendar', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest', signal: 'Hana picks · AI proposes 3 candidates per day', firing: false },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · trip domain', signal: 'family calendar · interests · dietary', firing: true },
    },
    brain: {
      L1: [{ entry: 'Aoi loves crafts · Sota arcades · Daichi onsen · Hana temples. Each day must include 2 of 4.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 6 trips: Hana plans 70% before · 30% improvised on day. Pattern locked.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: weather forecast Mon rain · Tue sunny · Wed sunny · Aoi class trip cancellation 13:00 Tue.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'plan:weather-fit-3days', drivers: ['L3.forecast'], output: 'rain day → indoor · sunny → outdoor + travel' },
      { name: 'family:rotation · 2-of-4-per-day', drivers: ['L1.preferences'], output: 'each day: 2 family members\' interests honored' },
      { name: 'reserve:proactive · cancellable', drivers: ['feasibility', 'autonomy_dial'], output: 'AI books reservations Hana confirms in batch' },
    ],
    axPatterns: [
      { id: 'A7', name: 'Live Recomposition', essence: 'replan when weather/schedule shifts', driver: 'L3.forecast' },
      { id: 'A6', name: 'Care Architecture', essence: 'rotates each kid\'s joy', driver: 'L1.preferences' },
      { id: 'D5', name: 'Substitution Modes', essence: 'rain → indoor swap', driver: 'feasibility' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard travel app gives you a "Top 10 Kyoto" list. The framework reads <em>weather + each family member\'s preferences + Aoi\'s school cancellation</em> and produces <strong>3 days, each with 2 of 4 family loves</strong>, automatically reshuffling indoor/outdoor by forecast. Reservations queue for batch confirmation.',
    },
    ui: {
      title: 'Mon rain · Tue+Wed sun · 3 days planned',
      hint: 'Tap any day to swap · long-press to lock',
      cards: [
        { id: 'mon', title: 'Mon · Indoor crafts · onsen evening',           prepMin: 0, priceJpy: 24000, kcal: 0, allergens: [], tag: 'Aoi craft museum + Daichi onsen',     highlighted: true,  image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=520&q=80&auto=format&fit=crop' },
        { id: 'tue', title: 'Tue · Bamboo grove · Sota arcade · Hana shrine',prepMin: 0, priceJpy: 18000, kcal: 0, allergens: [], tag: 'Sunny · 3-of-4 family interests',     highlighted: false, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=520&q=80&auto=format&fit=crop' },
        { id: 'wed', title: 'Wed · Tea house · river walk',                   prepMin: 0, priceJpy: 12000, kcal: 0, allergens: [], tag: 'Sunny · Hana day · slow pace',         highlighted: false, image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'weather_changes', label: 'Weather updates · Tue rain too', sub: 'replan triggered', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, feasibility: { ...s.tokens.feasibility, value: 'Replanning · weather shift', firing: true }},
        rules: [{ name: 'cascade:weather-aware-replan', drivers: ['feasibility', 'L3'], output: 'Tue swapped indoor · Wed gets the bamboo' }, ...s.rules],
        ui: { ...s.ui, title: 'Replanned · Tue indoor → Wed bamboo', cards: s.ui.cards.map(c => c.id === 'tue' ? { ...c, title: 'Tue · Manga museum · cooking class · arcade', tag: 'Rain replan · 3-of-4 still honored' } : c) }}) },
    { id: 'budget_constraint', label: 'Budget tight · ¥40k cap', sub: 'reduce', category: 'goals',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, feasibility: { ...s.tokens.feasibility, value: 'Budget-bound', firing: true }},
        rules: [{ name: 'reduce:price · keep-joy', drivers: ['feasibility'], output: 'cheaper venues · same family rotation' }, ...s.rules],
        ui: { ...s.ui, title: '3 days within ¥40k', cards: s.ui.cards.map(c => ({ ...c, tag: c.tag + ' · downsized' })) }}) },
    { id: 'aoi_school_event', label: 'Aoi school trip lifted', sub: 'extra Tue afternoon', category: 'social',
      mutate: (s) => ({ ...s, rules: [{ name: 'add:found-time-window', drivers: ['L3.calendar'], output: 'Tue afternoon: Aoi craft session added' }, ...s.rules],
        ui: { ...s.ui, cards: s.ui.cards.map(c => c.id === 'tue' ? { ...c, title: 'Tue · Bamboo · Sota arcade · Aoi craft (PM)', tag: 'School trip lifted · all 4 family interests fit' } : c) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · planning', sub: 'browse + pin', density: 'compact', maxCards: 3, control: 'thumb · voice', anchorHint: 'Personal scratchpad', drops: ['family-vote'] },
    { id: 'ipad', label: 'iPad · family layer', sub: 'shared visible', density: 'detail', maxCards: 4, control: 'touch · stylus', anchorHint: 'Family voting + map view', drops: ['private notes'] },
  ];
  return { defaultState, toggles, devices };
})();
