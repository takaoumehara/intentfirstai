/* Scenario: Kid asks AI to explain photosynthesis · reading-level + frustration adaptation */
window.SCENARIO_HOMEWORK_HELP = (() => {
  const defaultState = {
    intent: { utterance: 'Can you explain photosynthesis?', meta: 'Aoi (11) · Tuesday · 19:00 · kitchen table · iPad', shape: 'child user · explain mode · adaptive complexity' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Seated · iPad on table', signal: 'Aoi profile authenticated · pencil and notebook out', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (curious)', signal: 'Aoi calm · 5 min into homework', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Child · family monitored', signal: 'Aoi profile · parent visibility on', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard · learning', signal: 'no rush · curiosity-mode', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'iPad · child UI', signal: 'larger fonts · simpler controls · pencil-friendly', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Reading level 11', signal: 'Aoi reading age = grade 6', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest (explain mode)', signal: 'AI explains · Aoi asks more', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Education · child-scoped', signal: 'school curriculum · age-appropriate', firing: true },
    },
    brain: {
      L1: [{ entry: 'Aoi: 11yo · grade 6 reading · prefers analogies · loves cooking · learns by doing.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Aoi engages 3x longer when explanations use cooking metaphors. Pattern noticed last 2 months.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: science homework · photosynthesis · 25 min before family dinner.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'reading-level:adaptive', drivers: ['L1.identity', 'feasibility'], output: 'language tuned to grade 6 · max 12 words/sentence' },
      { name: 'metaphor:cooking-anchored', drivers: ['L2.pattern'], output: 'plants are like kitchen — light = oven, water = stock, leaves = chefs' },
      { name: 'safety:no-tangents', drivers: ['social_exposure', 'L1.child'], output: 'on-topic only · no offtopic suggestions · parent log accessible' },
    ],
    axPatterns: [
      { id: 'A2', name: 'Cognitive Scaling', essence: 'reading-level adaptation', driver: 'L1.identity' },
      { id: 'A6', name: 'Care Architecture', essence: 'pattern-aware metaphor', driver: 'L2.pattern' },
      { id: 'A4', name: 'Disclosure Cascade', essence: 'parent visibility · child surface', driver: 'social_exposure' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard AI gives the same encyclopedia answer to everyone. The framework reads <em>Aoi\'s reading level + her cooking-metaphor pattern + parent-visibility setting</em> and produces a <strong>grade-6 explanation built around a kitchen analogy</strong>. Parents can see the conversation log; tangents are pruned.',
    },
    ui: {
      title: 'Plants are tiny chefs · let me show you',
      hint: 'Tap any line for more · "I don\'t get it" → simpler retry',
      cards: [
        { id: 'step1', title: 'Sunlight is the oven',                 prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Step 1 · metaphor anchor', highlighted: true,  image: 'https://images.unsplash.com/photo-1507297230445-c9d6dcaf66e3?w=520&q=80&auto=format&fit=crop' },
        { id: 'step2', title: 'Water + air = stock from the soil',    prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Step 2 · ingredients',     highlighted: false, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=520&q=80&auto=format&fit=crop' },
        { id: 'step3', title: 'Leaves are tiny chefs · they cook sugar', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Step 3 · what plants make', highlighted: false, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'frustrated', label: 'Aoi: "I still don\'t get it"', sub: 'Substitution Mode shifts', category: 'physical',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, cognitive_load: { ...s.tokens.cognitive_load, value: 'Frustration detected', firing: true }},
        brain: { ...s.brain, L3: [{ entry: 'Aoi paused 28 sec · re-read · pattern shows frustration · simplify further.', highlight: true, weight: 'now' }, ...s.brain.L3] },
        rules: [{ name: 'substitute:explore-mode', drivers: ['cognitive_load', 'L3.frustration'], output: 'switch from sequential explanation to drawing + interactive simulation' }, ...s.rules],
        axPatterns: [{ id: 'D5', name: 'Substitution Modes', essence: 'Exact → Exploring', driver: 'L3.frustration' }, ...s.axPatterns],
        ui: { ...s.ui, title: 'Let\'s draw it together', cards: [{ id: 'draw', title: 'Tap to draw a leaf · I\'ll fill it with sunlight', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Interactive · pencil-friendly', highlighted: true, image: null }] }}) },
    { id: 'parent_joins', label: 'Hana sits down · joint learning', sub: 'co-explore mode', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Parent + child', firing: true }},
        rules: [{ name: 'co-learn:parallel-tracks', drivers: ['social_exposure'], output: 'AI offers Hana a "did you know?" alongside Aoi\'s explanation' }, ...s.rules],
        ui: { ...s.ui, title: 'Co-learning · Aoi + Hana', cards: s.ui.cards.concat([{ id: 'parent', title: 'For Hana: did you know plants emit volatiles to communicate?', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Adult layer · same topic', highlighted: false, image: null }]) }}) },
    { id: 'school_specific', label: 'School curriculum mode', sub: 'aligned to her test', category: 'goals',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L1: [{ entry: 'Aoi\'s school: covers photosynthesis Friday · vocabulary list 8 terms.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'align:curriculum-vocab', drivers: ['L1.school'], output: 'introduce specific terms: chlorophyll, glucose, oxygen at right pace' }, ...s.rules],
        ui: { ...s.ui, cards: s.ui.cards.map((c, i) => ({ ...c, title: c.title + (i === 0 ? ' (chlorophyll)' : i === 1 ? ' (water + CO₂)' : ' (glucose + oxygen)') })) }}) },
  ];
  const devices = [
    { id: 'ipad', label: 'iPad · child UI', sub: 'larger fonts · pencil-friendly', density: 'detail', maxCards: 4, control: 'touch · pencil', anchorHint: 'Learning surface', drops: ['rich notifications'] },
  ];
  return { defaultState, toggles, devices };
})();
