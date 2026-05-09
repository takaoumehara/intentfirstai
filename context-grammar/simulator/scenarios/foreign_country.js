/* Scenario: Travel · foreign country SIM · trust boundary is geographic */
window.SCENARIO_FOREIGN_COUNTRY = (() => {
  const defaultState = {
    intent: { utterance: 'Order food for me.', meta: 'Hana · landing in Lisbon · 13:24 · Day 1 of trip', shape: 'foreign trust boundary · autonomy steps back · language switch' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Walking · jet-lag', signal: 'arrived 2h ago · low sleep · GPS = Lisbon airport area', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High (jet-lag + new city)', signal: 'reading time 2x normal · hesitation in app switching', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Public · foreign', signal: 'unfamiliar faces · Portuguese ambient', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'High · need food now', signal: 'low blood sugar · 5 hour window since last meal', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · roaming SIM', signal: 'foreign carrier · slower data', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Local services · trust unknown', signal: 'review APIs · payment APIs · all foreign', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Confirm (auto-stepped-back)', signal: 'home default = Auto · roaming = Confirm', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Reduced · foreign-domain', signal: 'less data shared with local services', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana: vegetarian · Portuguese < 10 words · prefers small local · has international card.', highlight: true, weight: 'identity' }],
      L2: [{ entry: '8 of 9 prior trips: Hana steps autonomy back manually on Day 1 · framework now does it automatically.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: Day 1 of 5 · airport · jet-lagged · needs food · 40 min until hotel check-in.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'trust:roaming-fence · auto-step-back', drivers: ['L2.pattern', 'autonomy_dial'], output: 'Auto → Confirm: AI proposes, user approves' },
      { name: 'language:bilingual-surface', drivers: ['social_exposure'], output: 'menus shown in PT + EN · prices in EUR + JPY equivalent' },
      { name: 'safety:trust-tier-display', drivers: ['feasibility'], output: 'each option labeled: "International chain · widely safe" or "Local · 4.6★ verified"' },
    ],
    axPatterns: [
      { id: 'E1', name: 'Confidence Signal', essence: 'AI marks foreign-trust uncertainty', driver: 'feasibility' },
      { id: 'D1', name: 'Approval Gate', essence: 'auto-stepped-back to Confirm', driver: 'autonomy_dial' },
      { id: 'A4', name: 'Disclosure Cascade', essence: 'less data to foreign services', driver: 'disclosure_dial' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard food app would auto-order from your usual delivery default. The framework reads <em>foreign SIM + Day 1 + jet-lag + reduced trust</em> and <strong>steps autonomy back from Auto to Confirm</strong>: it proposes 3 options with explicit trust labels (chain vs local + verified rating), shows menus bilingually, and waits for explicit approval. Trust boundary is geographic.',
    },
    ui: {
      title: 'Lisbon · 3 lunch options · trust labeled',
      hint: 'Approve any · or say "show me more local"',
      cards: [
        { id: 'chain',  title: 'Vapiano · pasta + salad', prepMin: 8, priceJpy: 1400, kcal: 580, allergens: ['gluten'], tag: 'International chain · widely safe', highlighted: true,  image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=520&q=80&auto=format&fit=crop' },
        { id: 'local',  title: 'Cervejaria Ramiro · seafood', prepMin: 18, priceJpy: 3200, kcal: 720, allergens: ['shellfish'], tag: 'Local · 4.7★ · 1.2k reviews', highlighted: false, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=520&q=80&auto=format&fit=crop' },
        { id: 'café',   title: 'Café Versailles · pastries', prepMin: 4, priceJpy: 800, kcal: 380, allergens: ['gluten', 'dairy'], tag: 'Local · iconic · 3 min walk', highlighted: false, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'language_only_local', label: 'Disable English · only PT', sub: 'maximize cultural fit', category: 'goals',
      mutate: (s) => ({ ...s, ui: { ...s.ui, title: 'Lisboa · 3 opções de almoço', cards: s.ui.cards.map(c => ({ ...c, title: c.title + ' (PT)' })) }}) },
    { id: 'day_5_familiar', label: 'Skip ahead · Day 5 of trip', sub: 'trust restored', category: 'physical',
      mutate: (s) => ({ ...s, intent: { ...s.intent, meta: 'Hana · Day 5 of 5 · 13:24' },
        tokens: { ...s.tokens, autonomy_dial: { ...s.tokens.autonomy_dial, value: 'Notify (trust earned)', firing: true }},
        brain: { ...s.brain, L2: [{ entry: '4 days in: Hana approved 12 of 14 AI suggestions. Framework now nudges back to Notify mode.', highlight: true, weight: 'pattern' }, ...s.brain.L2] },
        rules: [{ name: 'trust:graduated · within-trip', drivers: ['L2.pattern'], output: 'Confirm → Notify: AI executes, user reviews' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Day 5 — Hana, you usually like the seafood place', cards: s.ui.cards.map(c => c.id === 'local' ? { ...c, highlighted: true, tag: 'Auto-suggested · pattern-matched' } : { ...c, highlighted: false }) }}) },
    { id: 'allergy_translation', label: 'Vegetarian filter · PT search', sub: 'cross-language safety', category: 'constraint',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L1: [{ entry: 'Hana vegetarian — Portuguese "carne" / "marisco" filter checked at API level, not just by keyword.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'allergen:cross-language · API-verified', drivers: ['L1.diet', 'feasibility'], output: 'menu items verified vegetarian by ingredient list, not name' }, ...s.rules],
        ui: { ...s.ui, cards: s.ui.cards.filter(c => !c.allergens.includes('shellfish')).concat([{ id: 'veg', title: 'Casa do Alentejo · 4 vegetarian options', prepMin: 14, priceJpy: 1800, kcal: 520, allergens: ['gluten'], tag: 'Verified vegetarian · ingredient-level', highlighted: true, image: null }]) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · roaming', sub: 'foreign SIM · slower', density: 'compact', maxCards: 3, control: 'thumb · voice (PT or EN)', anchorHint: 'Trust-tier surface', drops: ['cast', 'family-share'] },
  ];
  return { defaultState, toggles, devices };
})();
