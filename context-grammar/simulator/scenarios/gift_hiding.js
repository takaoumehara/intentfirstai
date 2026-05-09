/* Scenario: Buying partner's birthday gift · cross-device privacy */
window.SCENARIO_GIFT_HIDING = (() => {
  const defaultState = {
    intent: { utterance: 'Find a gift for Daichi.', meta: 'Hana · Sunday · 11:20 · couch · Daichi making coffee', shape: 'private intent · trusted partner nearby · disclosure asymmetry' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Stationary · couch', signal: 'living room · Daichi adjacent room', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (browsing)', signal: 'casual scroll', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Trusted partner · adjacent', signal: 'Daichi nearby · could glance', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard · birthday in 2 weeks', signal: 'no urgency', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · personal only', signal: 'NOT cast · NOT shared screen', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Within budget · in-stock', signal: 'shopping APIs available', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest', signal: 'Hana decides · AI proposes', firing: false },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'PRIVATE · person-scoped', signal: 'Daichi domain blocked from this query', firing: true },
    },
    brain: {
      L1: [{ entry: 'Daichi: birthday Mar 22 · likes hiking gear · $300 budget norm.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Hana surprise-shops 4× per year. 100% suppress recent searches from Daichi\'s Spotlight + cast.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: Daichi 3m away · TV idle · no cast · phone face-down-able.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'private:person-scope · Daichi-blocked', drivers: ['L1.daichi-bday', 'disclosure_dial'], output: 'no Spotlight · no cross-device search · no cast option' },
      { name: 'sandbox:browse · auto-clean', drivers: ['L2.pattern'], output: 'browsing data tagged "surprise:daichi" · auto-purge after Mar 22' },
      { name: 'casting:disabled · until-restored', drivers: ['form_factor'], output: 'no AirPlay button · no cast suggestion · no auto-handoff' },
    ],
    axPatterns: [
      { id: 'A4', name: 'Disclosure Cascade', essence: 'per-person sandboxing', driver: 'L1.daichi-bday' },
      { id: 'D4', name: 'Omakase Mode', essence: 'auto-private · no setup', driver: 'autonomy_dial' },
      { id: 'A3', name: 'Social-Aware Filtering', essence: 'who can\'t see this', driver: 'social_exposure × disclosure' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard shopping app shows recent searches everywhere — your Apple TV, your spouse\'s phone via shared family search, the home Spotlight. The framework reads <em>"surprise:daichi" intent + Daichi adjacent + trusted-partner relationship</em> and <strong>person-scopes</strong> the entire browsing session: blocked from Daichi\'s devices, his Spotlight, and any cast surface he might trigger.',
    },
    ui: {
      title: 'Hiking jackets · Daichi\'s size · in budget',
      hint: 'Private session · auto-clears Mar 22',
      cards: [
        { id: 'jacket1', title: 'Patagonia Houdini · light',     prepMin: 0, priceJpy: 18000, kcal: 0, allergens: [], tag: 'Daichi: size M · last hike rain', highlighted: true,  image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=520&q=80&auto=format&fit=crop' },
        { id: 'jacket2', title: 'Arc\'teryx Atom · warm layer',  prepMin: 0, priceJpy: 32000, kcal: 0, allergens: [], tag: 'Aspirational · within budget',    highlighted: false, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=520&q=80&auto=format&fit=crop' },
        { id: 'shoes',   title: 'Hoka Speedgoat · trail',        prepMin: 0, priceJpy: 22000, kcal: 0, allergens: [], tag: 'Bonus consideration',             highlighted: false, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'daichi_walks_in', label: 'Daichi walks into room', sub: 'flip-to-decoy', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Direct line of sight', firing: true }},
        rules: [{ name: 'instant:decoy-screen', drivers: ['social_exposure'], output: 'flip-down detected → screen swaps to Hana\'s yoga schedule · 0.4s' }, ...s.rules],
        ui: { ...s.ui, title: 'Daichi entered — decoy active', cards: [{ id: 'decoy', title: 'Yoga · Wed evening · regular session', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Decoy surface · plausible', highlighted: true, image: null }] }}) },
    { id: 'partner_using_tv', label: 'Daichi watching TV', sub: 'cast-jail engaged', category: 'physical',
      mutate: (s) => ({ ...s, rules: [{ name: 'cast:disabled · TV-blocked', drivers: ['form_factor', 'L2.pattern'], output: 'no AirPlay · accidentally-cast prevention engaged' }, ...s.rules],
        ui: { ...s.ui, title: 'Cast blocked — Daichi has TV', cards: s.ui.cards.map(c => ({ ...c, tag: c.tag + ' · cast disabled' })) }}) },
    { id: 'recommend_partner', label: 'Cross-shop · for both?', sub: 'mutual gift season', category: 'social',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L1: [{ entry: 'Both birthdays in March · couple\'s gift exchange happens in 70% of years.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'discreet:tip-partner', drivers: ['L1.couple'], output: 'AI gives Daichi the same kind of nudge for Hana — privately' }, ...s.rules],
        ui: { ...s.ui, title: 'Mutual gifting season · AI hints both ways', cards: [{ id: 'mutual', title: 'Daichi will get a similar private prompt for Hana\'s birthday', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Care arch · symmetric', highlighted: true, image: null }, ...s.ui.cards.slice(0, 2)] }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · private session', sub: 'flip-to-hide armed', density: 'compact', maxCards: 3, control: 'thumb · biometric', anchorHint: 'Person-scoped sandbox', drops: ['cast', 'share'] },
  ];
  return { defaultState, toggles, devices };
})();
