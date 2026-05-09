/* Scenario: Meeting in 2 minutes · phone goes silent + walking nav opens */
window.SCENARIO_MEETING_2MIN = (() => {
  const defaultState = {
    intent: { utterance: 'I need to be there.', meta: 'Hana · Wednesday · 09:58 · walking · Shibuya', shape: 'time-critical · urgent · physical motion' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Walking briskly', signal: 'GPS 1.7 m/s · 600m to building', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High (rush)', signal: 'app-switching elevated · heart rate 95', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Public · busy street', signal: 'crosswalks · pedestrians', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'CRITICAL · 2 min', signal: 'meeting at 10:00 · 10:00 hard cutoff', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · one thumb', signal: 'walking · hand sweat detected', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Just barely', signal: 'walk pace + signal lights = 1:50 ETA', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Auto (silent + redirect)', signal: 'silence + nav · no prompt', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · calendar + location', signal: 'meeting + walk shared', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana hates being late · always silences phone within 5 min of meetings.', highlight: true, weight: 'identity' }],
      L2: [{ entry: '94% of meetings: silenced phone before walking in.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: 09:58 · 1:50 ETA · meeting room 4 floor 12 · no notifications muted yet.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'silence:auto · 2-min-pre-meeting', drivers: ['L1.identity', 'L2.pattern', 'priority_weight'], output: 'phone muted automatically · summary shown after meeting' },
      { name: 'nav:single-line · large-target', drivers: ['form_factor', 'cognitive_load'], output: 'one big "Building B · 1:50" · no map' },
      { name: 'reply:one-tap · "running 2 min late"', drivers: ['feasibility'], output: 'precomposed reply ready · single tap' },
    ],
    axPatterns: [
      { id: 'D4', name: 'Omakase Mode', essence: 'auto-silence · no ask', driver: 'L1.identity' },
      { id: 'A2', name: 'Cognitive Scaling', essence: 'UI shrinks to 1 number', driver: 'cognitive_load' },
      { id: 'D3', name: 'Proactive Nudge', essence: 'reply pre-composed', driver: 'feasibility' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard phone keeps notifications running, the maps app stays cluttered. The framework reads <em>2 min until calendar event + walking + identity:hates-late + 94% silence pattern</em> and <strong>silently mutes the phone</strong> while showing one giant timer + one tap reply: "Running 2 min late." The user never asked.',
    },
    ui: {
      title: 'Building B · arriving 09:59:50',
      hint: 'Tap once · or just walk',
      cards: [
        { id: 'eta',     title: '1:50',                                 prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Building B · floor 12 · room 4', highlighted: true,  image: null },
        { id: 'reply',   title: 'Send "Running 2 min late" to room 4',  prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Pre-composed · 1 tap',           highlighted: false, image: null },
        { id: 'silenced', title: 'Phone muted · summary after meeting', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto · 14 notifs queued',        highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'critical_call_breaks_thru', label: 'Daichi calling · child sick', sub: 'family override', category: 'social',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L1: [{ entry: 'Even in muted mode: family + school + medical always break through.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'override:family · break-mute', drivers: ['L1.family'], output: 'partner call rings through silence' }, ...s.rules],
        ui: { ...s.ui, title: 'Daichi calling · school says Sota fever', cards: [{ id: 'family', title: 'Pick up · school nurse on the line', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'CRITICAL · breakthrough', highlighted: true, image: null }] }}) },
    { id: 'meeting_cancelled', label: 'Meeting cancelled in flight', sub: 'redirect', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'Released', firing: false }},
        rules: [{ name: 'rebalance:found-15-min', drivers: ['priority_weight'], output: 'meeting cancelled · what to do with 15 free min' }, ...s.rules],
        ui: { ...s.ui, title: 'Meeting cancelled — 15 free minutes', cards: [{ id: 'free', title: 'Coffee · 4 min away', prepMin: 4, priceJpy: 350, kcal: 0, allergens: [], tag: 'Suggestion · low-pressure', highlighted: true, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=520&q=80&auto=format&fit=crop' }, { id: 'walk', title: 'Walk to next meeting · 12 min · arrive early', prepMin: 12, priceJpy: 0, kcal: 0, allergens: [], tag: 'Pattern: Hana likes early', highlighted: false, image: null }] }}) },
    { id: 'rain_started', label: 'Rain started', sub: 'covered route', category: 'physical',
      mutate: (s) => ({ ...s, rules: [{ name: 'route:weather-rerouted', drivers: ['physical_state'], output: 'covered passage · same ETA' }, ...s.rules],
        ui: { ...s.ui, cards: s.ui.cards.map(c => c.id === 'eta' ? { ...c, tag: 'Building B · covered route · still 1:50' } : c) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · running mode', sub: 'one big number', density: 'minimal', maxCards: 3, control: 'thumb · voice', anchorHint: 'Glance only', drops: ['rich UI'] },
    { id: 'watch', label: 'Apple Watch', sub: 'glance + haptic', density: 'minimal', maxCards: 1, control: 'tap', anchorHint: 'Wrist primary', drops: ['list'] },
  ];
  return { defaultState, toggles, devices };
})();
