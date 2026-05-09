/* Scenario: In-aisle barcode scan · allergy cross-reference + budget meter */
window.SCENARIO_GROCERY_AISLE = (() => {
  const defaultState = {
    intent: { utterance: 'Is this safe and within budget?', meta: 'Hana · Saturday · 11:18 · supermarket aisle 4', shape: 'in-the-moment decision · constraint check' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Standing · scanning', signal: 'one hand cart · phone scanner posture', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High (compare)', signal: '5+ items in aisle · noisy', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Public · crowded aisle', signal: 'people behind · screen readable to others', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard · routine', signal: 'weekly shop', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · scanner mode', signal: 'camera on · barcode visible · single-thumb', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Real-time inventory', signal: 'scanned · brand database · price api', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Notify (warn-on-conflict)', signal: 'silent unless allergy or budget', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Family health · domain-scoped', signal: 'allergy data · not full medical', firing: true },
    },
    brain: {
      L1: [{ entry: 'Family allergies: Aoi → salmon · Yui → peanut · Daichi → none.', highlight: true, weight: 'identity' }],
      L2: [{ entry: '8 of last 10 grocery scans triggered allergy warning · 2 budget-flag false alarms.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Cart total ¥3,420 · weekly budget ¥8,000 · scanned: granola bar w/ peanut (Yui!).', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'cross-ref:allergy-database', drivers: ['L1.allergies', 'feasibility'], output: 'red banner if any family member affected' },
      { name: 'budget-meter:running-total', drivers: ['L3.cart', 'feasibility'], output: 'live cart sum vs weekly budget · color-coded' },
      { name: 'social-aware:no-shame', drivers: ['social_exposure'], output: 'screen privacy: budget redacted in public · allergy still shown (safety)' },
    ],
    axPatterns: [
      { id: 'D5', name: 'Substitution Modes', essence: 'safe alternative auto-suggested', driver: 'L1.allergies' },
      { id: 'A4', name: 'Disclosure Cascade', essence: 'budget hides in public · allergy doesn\'t', driver: 'social_exposure × disclosure' },
      { id: 'D6', name: 'Dynamic Friction', essence: 'allergy = hard stop', driver: 'L1.allergies' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard scanner shows nutrition + price. The framework reads <em>family allergy database + cart running total + crowded aisle</em> and shows <strong>a red ALLERGY banner that does NOT redact (safety > privacy) while the budget meter discreetly hides the dollar figure</strong> from people behind you.',
    },
    ui: {
      title: 'Granola bar · ⚠ peanut · Yui allergic',
      hint: 'Tap "find safe alternative" or skip',
      cards: [
        { id: 'scanned',     title: 'Granola Bar (scanned)', prepMin: 0, priceJpy: 380, kcal: 0, allergens: ['peanut'], tag: '⚠ ALLERGY · Yui',  highlighted: true,  image: null },
        { id: 'alternative', title: 'Brand Y · same flavor · peanut-free', prepMin: 0, priceJpy: 420, kcal: 0, allergens: [], tag: 'Safe substitute · D5', highlighted: false, image: null },
        { id: 'cart',        title: 'Cart so far',           prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Running total · 43% of weekly budget', highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'budget_emphasis', label: 'Tighter budget · ¥6k cap', sub: 'red zone visible', category: 'goals',
      mutate: (s) => ({ ...s, ui: { ...s.ui, emphasizePrice: true, cards: s.ui.cards.map(c => c.id === 'cart' ? { ...c, title: 'Cart · ¥3,420 / ¥6,000', tag: '57% used · 7 items left to buy · CAUTION' } : c) }}) },
    { id: 'aoi_with_me', label: 'Aoi shopping with me', sub: 'her preferences active', category: 'social',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L3: [{ entry: 'Aoi reading what we add · she\'s 11 · learns family budgeting through this.', highlight: true, weight: 'now' }, ...s.brain.L3] },
        rules: [{ name: 'teach:budget-mode-on', drivers: ['social_exposure', 'L3.aoi'], output: 'budget meter visible · educational · explains tradeoffs' }, ...s.rules],
        ui: { ...s.ui, title: 'Teaching mode · Aoi sees the math', cards: s.ui.cards.map(c => c.id === 'cart' ? { ...c, title: 'Cart · ¥3,420 / ¥8,000 · 43% — 7 items to go', tag: 'Aoi sees the budget math' } : c) }}) },
    { id: 'sale_alert', label: 'Sale on next aisle', sub: 'opportunity detected', category: 'constraint',
      mutate: (s) => ({ ...s, rules: [{ name: 'detect:proximity-sale-relevant', drivers: ['feasibility', 'L1'], output: 'aisle 5 has Yui-safe granola · 30% off' }, ...s.rules],
        ui: { ...s.ui, cards: [{ id: 'sale', title: 'Aisle 5 · Yui-safe granola · 30% off · 4m walk', prepMin: 0, priceJpy: 280, kcal: 0, allergens: [], tag: 'Proactive nudge · low load', highlighted: true, image: null }, ...s.ui.cards] }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · scanner mode', sub: 'one-thumb · scan-anchored', density: 'compact', maxCards: 3, control: 'thumb · scan', anchorHint: 'Aisle decision surface', drops: ['cast', 'browse'] },
  ];
  return { defaultState, toggles, devices };
})();
