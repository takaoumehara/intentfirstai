/* Scenario: Post-meeting decompression · 3 back-to-back calls demands a break */
window.SCENARIO_POST_MEETING = (() => {
  const defaultState = {
    intent: { utterance: 'I need 10 quiet minutes.', meta: 'Hana · Wednesday · 12:48 · just left 3rd back-to-back · home office', shape: 'mandatory recovery · L2 pattern detection · suppress not dim' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Standing · stretching', signal: 'just stood up · 3 hour seated', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Overloaded', signal: '3 calls back-to-back · 2 contentious · brain dump pending', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Private · alone', signal: 'home office · door closed', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Health-critical · enforced break', signal: 'L2 says 10-min mandatory now', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone + speaker', signal: 'desk speaker available · phone face-down option', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: '14 min before next call', signal: 'next call 13:02 · 14 min slot', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Auto (suppress all)', signal: 'no notifications · no ask · no tap required', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · health + calendar', signal: 'meeting density · HRV pattern', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana: 3 back-to-back calls = mandatory recovery break · framework now enforces, not suggests.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 11 days with this pattern: skipped break 7 times → afternoon productivity dropped 28%. Pattern locked.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: 3rd call ended · HRV down 35% from morning · 14 min until next.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'enforce:break · suppress-not-dim', drivers: ['L1.identity', 'L2.pattern', 'priority_weight'], output: 'NO notifications · NO Slack · NO email · 10 min hard suppress' },
      { name: 'guide:active-recovery', drivers: ['L3.hrv'], output: 'breathing + walk to window · soft chime when 10 min done' },
      { name: 'tomorrow:auto-buffer', drivers: ['L2.pattern'], output: 'auto-add 15 min buffer between tomorrow\'s back-to-backs' },
    ],
    axPatterns: [
      { id: 'D4', name: 'Omakase Mode', essence: 'enforced not suggested', driver: 'L1.identity' },
      { id: 'A6', name: 'Care Architecture', essence: 'health-pattern-driven', driver: 'L2.pattern' },
      { id: 'D2', name: 'Progressive Trust', essence: 'Suggest → Auto over time', driver: 'L1' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard "do not disturb" merely silences sound. The framework reads <em>3-call density + L2 pattern (skipped breaks → drop) + HRV signal</em> and <strong>fully suppresses</strong> all incoming work for 10 minutes — no queued count, no preview. Then it adds <strong>tomorrow\'s buffer automatically</strong>, learning forward.',
    },
    ui: {
      title: '10 minutes · breathing + window walk',
      hint: 'Nothing to do · soft chime when done',
      cards: [
        { id: 'break',    title: '10:00 timer · breathing + walk',           prepMin: 10, priceJpy: 0, kcal: 0, allergens: [], tag: 'Active recovery · enforced',          highlighted: true,  image: null },
        { id: 'tomorrow', title: 'Auto-added: 15 min buffer between meetings', prepMin: 0,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Pattern → tomorrow·calendar',         highlighted: false, image: null },
        { id: 'queue',    title: '23 work pings suppressed · zero count shown',prepMin: 0,  priceJpy: 0, kcal: 0, allergens: [], tag: 'No-peek queue · respects the break', highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'crisis_breakthrough', label: 'Family emergency call', sub: 'family always allowed', category: 'social',
      mutate: (s) => ({ ...s, rules: [{ name: 'allow:family-only · same as kid-sick', drivers: ['L1.family'], output: 'partner + school + medical break through · everything else still silent' }, ...s.rules],
        ui: { ...s.ui, title: 'Daichi calling — accepted (family always allowed)', cards: [{ id: 'fam', title: 'Pick up · family override always engaged', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Whitelist · framework consistent', highlighted: true, image: null }] }}) },
    { id: 'short_break', label: 'Only 4 min before next call', sub: 'minimum viable break', category: 'constraint',
      mutate: (s) => ({ ...s, rules: [{ name: 'graceful:short-mode', drivers: ['feasibility'], output: '4-min breathing only · auto-add 30 min decompression at end of day' }, ...s.rules],
        ui: { ...s.ui, title: '4 min · short breath + 30 min later', cards: [{ id: 'short', title: '4:00 breath · 30 min decompression at 17:30', prepMin: 4, priceJpy: 0, kcal: 0, allergens: [], tag: 'Health debt logged', highlighted: true, image: null }] }}) },
    { id: 'partner_walk', label: 'Daichi: "walk together?"', sub: 'pair recovery', category: 'social',
      mutate: (s) => ({ ...s, rules: [{ name: 'pair:active-recovery · 14-min-loop', drivers: ['social_exposure'], output: 'pair walk · framework knows Daichi just finished a hard call too' }, ...s.rules],
        ui: { ...s.ui, title: 'Pair walk · framework noticed Daichi also stressed', cards: [{ id: 'pair', title: '14 min loop · Daichi will join · phones in pocket', prepMin: 14, priceJpy: 0, kcal: 0, allergens: [], tag: 'Multi-person care', highlighted: true, image: null }] }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · suppressed', sub: 'no notifications · countdown', density: 'minimal', maxCards: 3, control: 'glance · voice', anchorHint: 'Recovery surface', drops: ['rich UI'] },
    { id: 'speaker', label: 'Desk speaker', sub: 'voice · soft chime', density: 'audio', maxCards: 0, control: 'voice', anchorHint: 'Eyes-closed mode', drops: ['screen'] },
  ];
  return { defaultState, toggles, devices };
})();
