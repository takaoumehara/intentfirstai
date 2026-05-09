/* Scenario: Doorbell rings · smart screen swaps from family calendar to guest mode */
window.SCENARIO_DOORBELL_GUEST = (() => {
  const defaultState = {
    intent: { utterance: 'Coming!', meta: 'Hana · Saturday · 14:45 · plumber arrives', shape: 'unexpected guest · privacy boundary' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Walking to door', signal: 'doorbell triggered · motion detected', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Moderate (greeting)', signal: 'mild interruption', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Stranger entering home', signal: 'unrecognized face at door · plumber appt 14:45', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'High · privacy', signal: 'family calendar exposed in entryway', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Smart screen · entryway', signal: 'shared family display visible from door', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Calendar alternatives ready', signal: 'guest layer pre-built', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Auto (privacy default)', signal: 'instant swap · no ask', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Existence (guest layer)', signal: 'family schedule → presence-only', firing: true },
    },
    brain: {
      L1: [{ entry: 'Family rule: calendar visible to family only · guests see Wi-Fi + slipper hint.', highlight: true, weight: 'identity' }],
      L2: [{ entry: '14 plumber/delivery visits · 0 wanted to see Sota\'s dentist appointment.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: face = unknown · plumber appt confirmed · doorbell 1.4s ago.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'instant:guest-mode-swap', drivers: ['social_exposure', 'L1.identity'], output: 'family schedule → blank · Wi-Fi password + slipper hint' },
      { name: 'preserve:on-return', drivers: ['L3.now'], output: 'auto-restore family layer when door closes' },
      { name: 'log:visit · maintain-pattern', drivers: ['L2.pattern'], output: 'log visit type for Brain learning' },
    ],
    axPatterns: [
      { id: 'A4', name: 'Disclosure Cascade', essence: 'full → existence in 0.3s', driver: 'social_exposure × disclosure' },
      { id: 'D4', name: 'Omakase Mode', essence: 'no prompt · privacy default', driver: 'autonomy_dial' },
      { id: 'A6', name: 'Care Architecture', essence: 'guest hospitality · auto', driver: 'L1.identity' },
    ],
    intentTest: {
      enabled: true,
      text: 'A normal smart screen displays the family calendar regardless of who is in the entryway. The framework reads <em>doorbell + unknown face + plumber appt</em> and <strong>instantly swaps</strong> to a guest layer: Wi-Fi password, slipper hint, "Hana is on her way." When the door closes, family schedule restores automatically.',
    },
    ui: {
      title: 'Welcome — Hana coming in a moment',
      hint: 'Auto-restore when door closes',
      cards: [
        { id: 'wifi',    title: 'Wi-Fi · BluePine42',          prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Guest network · 4-hour token',  highlighted: true,  image: null },
        { id: 'slippers',title: 'Slippers · shoe rack right',  prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'House custom',                   highlighted: false, image: null },
        { id: 'wait',    title: 'Hana on her way · 30 sec',    prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Status only',                    highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'family_member_arrives', label: 'It\'s grandma · known face', sub: 'family layer stays', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Family · extended', firing: false }, disclosure_dial: { ...s.tokens.disclosure_dial, value: 'Full · household + extended', firing: true }},
        rules: [{ name: 'recognize:trusted · keep-layer', drivers: ['social_exposure'], output: 'no swap · maybe surface Aoi\'s recital photo' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Welcome grandma — Aoi\'s recital is Saturday', cards: [{ id: 'recital', title: 'Aoi\'s recital · Sat 13:00 · 3rd row', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Family-only surface', highlighted: true, image: null }, ...s.ui.cards.slice(0,2)] }}) },
    { id: 'delivery_no_signature', label: 'Delivery · drop-and-go', sub: 'no entry needed', category: 'constraint',
      mutate: (s) => ({ ...s, rules: [{ name: 'simplify:delivery-mode', drivers: ['social_exposure', 'L2.pattern'], output: 'just "leave at door · thanks" · no Wi-Fi · no slippers' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Leave at door · thanks!', cards: [{ id: 'thanks', title: '"Leave at door — thanks"', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'No interaction needed', highlighted: true, image: null }] }}) },
    { id: 'kid_alone_home', label: 'Hana not home · Aoi alone inside', sub: 'safety mode', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'CRITICAL · child safety', firing: true }},
        rules: [{ name: 'safety:child-alone-home', drivers: ['priority_weight', 'L1'], output: 'Aoi notified privately · Hana phone alerted · door stays locked · video call offered' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Aoi: stranger at door · don\'t open · video calling Mom', cards: [{ id: 'aoi', title: 'Aoi receives private alert · Hana\'s phone rings simultaneously', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Multi-person orchestration · safety', highlighted: true, image: null }] }}) },
  ];
  const devices = [
    { id: 'fridge', label: 'Smart screen · entryway', sub: 'shared family display', density: 'compact', maxCards: 3, control: 'glance · voice', anchorHint: 'Hospitality surface', drops: ['interaction'] },
  ];
  return { defaultState, toggles, devices };
})();
