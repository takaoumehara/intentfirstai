/* Scenario: Day 1 vs Month 6 · same intent, different Brain · proves memory = better UX */
window.SCENARIO_ONBOARDING_VS_MONTH6 = (() => {
  const defaultState = {
    intent: { utterance: 'Suggest a workout for me.', meta: 'Hana · Tuesday · 06:42 · waking up · default = Day 1', shape: 'identical intent · framework\'s Brain layer is the only variable' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Just woke · stretching', signal: 'watch HR rising · post-sleep', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (waking up)', signal: 'fresh · open to suggestion', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Private · solo', signal: 'morning · alone', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard · self-care', signal: 'flexible window', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · in hand', signal: 'morning scroll posture', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: '40 min available', signal: 'before kids wake', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest', signal: 'AI proposes · user picks', firing: false },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Health · domain-only', signal: 'workout history shared', firing: false },
    },
    brain: {
      L1: [{ entry: 'New user · Day 1 · no preferences declared yet.', highlight: true, weight: 'identity' }],
      L2: [{ entry: '(empty — pattern memory accrues over time)', highlight: false, weight: 'pattern' }],
      L3: [{ entry: 'Now: morning · 40 min slot · Hana opened the workout app.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'cold-start:beginner-default', drivers: ['L1.empty'], output: 'generic balanced workout · safe progressions' },
      { name: 'safe:no-assumptions', drivers: ['L1.empty', 'autonomy_dial'], output: 'high explanation · low autonomy · always confirm' },
    ],
    axPatterns: [
      { id: 'E1', name: 'Confidence Signal', essence: 'AI shows: "I don\'t know you yet"', driver: 'L1.empty' },
      { id: 'D1', name: 'Approval Gate', essence: 'every choice = explicit approve', driver: 'autonomy_dial' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard fitness app shows the same generic 30-min workout to everyone. The framework reads <em>L1 = empty Brain</em> and <strong>honestly admits "I don\'t know you yet"</strong>, offering a safe beginner sequence with high explanation. The same intent in Month 6 produces a totally different UI — toggle below to see the contrast.',
    },
    ui: {
      title: 'Day 1 — let\'s start safe',
      hint: 'Tap any · explanations included',
      cards: [
        { id: 'beg1', title: 'Beginner full-body · 25 min',   prepMin: 25, priceJpy: 0, kcal: 0, allergens: [], tag: 'Generic · adjustable',           highlighted: true,  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=520&q=80&auto=format&fit=crop' },
        { id: 'beg2', title: 'Walk + stretch · 30 min',       prepMin: 30, priceJpy: 0, kcal: 0, allergens: [], tag: 'Safe · gentle',                  highlighted: false, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=520&q=80&auto=format&fit=crop' },
        { id: 'beg3', title: 'Yoga basics · 20 min',          prepMin: 20, priceJpy: 0, kcal: 0, allergens: [], tag: 'Foundational',                   highlighted: false, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'jump_to_month_6', label: 'Jump to Month 6 · Brain full', sub: 'same intent · Brain matured', category: 'goals',
      mutate: (s) => ({ ...s, intent: { ...s.intent, meta: 'Hana · Month 6 · 6:42 · same morning' },
        brain: {
          L1: [{ entry: 'Hana prefers strength + mobility 3x/week · running 2x · rest day Sunday.', highlight: true, weight: 'identity' }],
          L2: [{ entry: 'Last 24 weeks: progressive overload squats 60→82.5kg · runs 5→8km · injury-free.', highlight: true, weight: 'pattern' }],
          L3: [{ entry: 'Now: Tuesday · last leg day Mon · today should be upper + mobility · 40 min.', highlight: true, weight: 'now' }],
        },
        rules: [{ name: 'progressive:overload-aware', drivers: ['L2.pattern'], output: 'today: 5x5 push (last week was 4x6) · adjustment auto-calculated' },
                { name: 'recovery:protected · no-leg-day', drivers: ['L1.identity', 'L3.now'], output: 'avoid leg work · honor 48h recovery' }, ...s.rules.slice(0, 0)],
        axPatterns: [
          { id: 'D4', name: 'Omakase Mode', essence: 'auto-progressive · trusted', driver: 'L2.pattern' },
          { id: 'A6', name: 'Care Architecture', essence: 'recovery + injury prevention', driver: 'L1.identity' },
          { id: 'D2', name: 'Progressive Trust', essence: 'autonomy graduated over 6 months', driver: 'autonomy_dial' },
        ],
        ui: { ...s.ui, title: 'Today · Push 5x5 · overhead +2.5kg · mobility',
          cards: [
            { id: 'pro1', title: 'Push 5x5 · overhead 22.5kg (+2.5)', prepMin: 22, priceJpy: 0, kcal: 0, allergens: [], tag: 'Progressive · L2 pattern',         highlighted: true,  image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=520&q=80&auto=format&fit=crop' },
            { id: 'pro2', title: 'Pull 4x6 · row + face pull',         prepMin: 12, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto-paired',                       highlighted: false, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=520&q=80&auto=format&fit=crop' },
            { id: 'pro3', title: 'Hip + thoracic mobility · 6 min',    prepMin: 6,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Recovery-protected',                highlighted: false, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=520&q=80&auto=format&fit=crop' },
          ]
        }
      }) },
    { id: 'sick_today', label: 'Watch flags low recovery', sub: 'Brain still adapts', category: 'physical',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L3: [{ entry: 'HRV crashed 28% · low sleep score · likely fighting cold.', highlight: true, weight: 'now' }, ...s.brain.L3] },
        rules: [{ name: 'recovery:override · listen-to-body', drivers: ['L3.hrv'], output: 'all workouts deferred · gentle walk only' }, ...s.rules],
        ui: { ...s.ui, title: 'Body needs rest — gentle walk only', cards: [{ id: 'rest', title: '15 min gentle walk · or skip today', prepMin: 15, priceJpy: 0, kcal: 0, allergens: [], tag: 'Recovery override · framework reads body', highlighted: true, image: null }] }}) },
    { id: 'partner_workout', label: 'Daichi wants to join', sub: 'shared session', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Partner pair', firing: true }},
        rules: [{ name: 'pair:complementary-workouts', drivers: ['social_exposure'], output: 'Daichi gets pull while Hana pushes · same room · staggered timing' }, ...s.rules],
        ui: { ...s.ui, title: 'Pair workout · complementary 40 min', cards: s.ui.cards.map(c => ({ ...c, tag: c.tag + ' · Daichi paired' })) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · morning surface', sub: 'low-stakes · suggest-only', density: 'compact', maxCards: 3, control: 'thumb · voice', anchorHint: 'Personal coach', drops: [] },
    { id: 'watch', label: 'Apple Watch', sub: 'live workout HR', density: 'minimal', maxCards: 1, control: 'tap · crown', anchorHint: 'During session', drops: ['list'] },
  ];
  return { defaultState, toggles, devices };
})();
