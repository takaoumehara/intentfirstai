/* Scenario: Cooking with hands wet · fridge takes over the recipe */
window.SCENARIO_COOKING_ACTIVE = (() => {
  const defaultState = {
    intent: { utterance: 'What\'s the next step?', meta: 'Hana · Tuesday · 19:42 · stove on', shape: 'mid-task · time-pressure · dirty hands' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Hands wet · stirring', signal: 'kitchen · turmeric on phone screen detected', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High (multi-task)', signal: 'kids talking · timer ticking · pot bubbling', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Family with children', signal: 'kitchen · Aoi + Sota nearby', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'High · time-bound', signal: 'simmer 6 min then add miso', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone + fridge nearby', signal: 'Family Hub on · phone face-up dirty', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Pantry-aware', signal: 'recipe step + ingredient state', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Notify (auto-handoff)', signal: 'screen handoff without asking', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · household domain', signal: 'recipes + timers shared', firing: false },
    },
    brain: {
      L1: [{ entry: 'Hana cooks 4× per week · prefers voice while hands are busy.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 12 cooking sessions: phone migrated to fridge at average step 3 of 5.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: step 2 of 5 · simmer 6 min · then miso · stove timer 5:42 remaining.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'output:fridge-takeover · large-glance', drivers: ['physical_state', 'form_factor'], output: 'recipe transfers to 21" fridge display' },
      { name: 'phone:demoted · timer-only', drivers: ['cognitive_load', 'L1.voice'], output: 'phone shows just minutes left · voice "next step" available' },
      { name: 'voice:wake-word-loose', drivers: ['L1.voice'], output: '"Suno, next" works mid-stir' },
    ],
    axPatterns: [
      { id: 'A1', name: 'Form Factor Transform', essence: 'phone → fridge handoff', driver: 'physical_state' },
      { id: 'D4', name: 'Omakase Mode', essence: 'auto-handoff · no prompt', driver: 'autonomy_dial' },
      { id: 'A2', name: 'Cognitive Scaling', essence: 'phone reduces to timer', driver: 'cognitive_load' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard recipe app freezes when your hands are messy — you scroll with a knuckle, the screen sleeps, you shout at Siri who hears <em>"stir"</em> as <em>"store"</em>. The framework reads <em>hands wet + fridge nearby + voice pattern</em> and <strong>silently relocates the recipe to the larger glance surface</strong> while the phone reduces to a timer.',
    },
    ui: {
      title: 'Step 2 of 5 · Simmer 6 min',
      hint: 'Say "Suno, next" when ready',
      cards: [
        { id: 'step2', title: 'Simmer 6 min',                 prepMin: 6, priceJpy: 0, kcal: 0, allergens: [], tag: 'Active · timer running', highlighted: true,  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=520&q=80&auto=format&fit=crop' },
        { id: 'step3', title: 'Add miso · 2 tbsp',            prepMin: 1, priceJpy: 0, kcal: 0, allergens: [], tag: 'Up next',                highlighted: false, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=520&q=80&auto=format&fit=crop' },
        { id: 'step4', title: 'Garnish · scallion + sesame',  prepMin: 1, priceJpy: 0, kcal: 0, allergens: [], tag: 'Final',                  highlighted: false, image: 'https://images.unsplash.com/photo-1547928576-a4a37bcb6c8a?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'kid_interruption', label: 'Kid asks for water', sub: 'mid-step interruption', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, cognitive_load: { ...s.tokens.cognitive_load, value: 'Overloaded', firing: true }},
        rules: [{ name: 'pause:gracefully · resume-on-return', drivers: ['cognitive_load'], output: 'fridge marks step paused · timer holds' }, ...s.rules],
        ui: { ...s.ui, title: 'Paused — Sota wants water · resume when back', cards: s.ui.cards.map(c => c.id === 'step2' ? { ...c, tag: 'PAUSED · 5:42 held' } : c) }}) },
    { id: 'something_burning', label: 'Smoke alarm · burning', sub: 'critical recovery', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'CRITICAL', firing: true }},
        rules: [{ name: 'override:safety · interrupt-everything', drivers: ['priority_weight'], output: 'all surfaces show one instruction' }, ...s.rules],
        ui: { ...s.ui, title: 'TURN OFF HEAT · open window', cards: [{ id: 'safety', title: 'Turn off heat now', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'CRITICAL', highlighted: true, image: null }] }}) },
    { id: 'recipe_swap', label: 'Out of miso', sub: 'pantry says: tofu instead', category: 'constraint',
      mutate: (s) => ({ ...s, rules: [{ name: 'substitute:fluid · D5', drivers: ['feasibility'], output: 'silken tofu cubes · no miso · adjust salt' }, ...s.rules],
        ui: { ...s.ui, cards: s.ui.cards.map(c => c.id === 'step3' ? { ...c, title: 'Add silken tofu cubes (no miso)', tag: 'Substituted · D5' } : c) }}) },
  ];
  const devices = [
    { id: 'fridge', label: 'Samsung Fridge', sub: '21" portrait · primary surface', density: 'compact', maxCards: 3, control: 'voice + tap', anchorHint: 'Glance + dirty hands', drops: ['typing'] },
    { id: 'phone', label: 'iPhone · timer only', sub: 'demoted to single number', density: 'minimal', maxCards: 1, control: 'glance', anchorHint: 'Just shows minutes', drops: ['rich UI'] },
  ];
  return { defaultState, toggles, devices };
})();
