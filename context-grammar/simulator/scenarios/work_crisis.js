/* Scenario: Work crisis at 23:00 · token collision (sleep vs deadline) */
window.SCENARIO_WORK_CRISIS = (() => {
  const defaultState = {
    intent: { utterance: 'I need to ship this before midnight.', meta: 'Hana · Tuesday · 23:04 · home office', shape: 'crisis · token collision · circadian vs deadline' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Stationary · home office', signal: 'desk posture · tired but alert', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High · narrow focus', signal: 'all apps closed except work · 47 min of dense edits', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Private · partner asleep', signal: 'Daichi sleeping · whisper mode', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'CRITICAL · 56-min deadline', signal: 'client demo 09:00 · Slack pending review', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Laptop + iPhone backup', signal: 'desk lamp on · phone face-down', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Doable in 45 min', signal: 'work scope clear · 80% done', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Notify (work-only)', signal: 'crisis-mode · suppress non-work', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · work + biometric', signal: 'sleep schedule + meeting + HRV all read', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana sleeps best 7h45m — but ships work crisis means honor circadian later, not now.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 8 work crises: Hana extends 60-90 min then sleeps in. Pattern: framework recognizes, doesn\'t fight.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: 56 min to deadline · 80% done · circadian wants sleep · pattern says "let her finish."', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'collision:resolve · explicit-priority', drivers: ['priority_weight', 'L1.identity', 'L2.pattern'], output: 'Crisis wins THIS time · circadian acknowledged · plan post-ship recovery' },
      { name: 'suppress:wind-down · auto-restore-tomorrow', drivers: ['L2.pattern'], output: 'no bedtime mode · alarm shifted +90 min · gentle wake' },
      { name: 'protect:work-only · no-distractions', drivers: ['cognitive_load', 'social_exposure'], output: 'all non-work notifs queued · partner DM still allowed' },
    ],
    axPatterns: [
      { id: 'D6', name: 'Dynamic Friction', essence: 'crisis breaks circadian default', driver: 'priority_weight' },
      { id: 'A6', name: 'Care Architecture', essence: 'auto-shifts tomorrow alarm', driver: 'L2.pattern' },
      { id: 'E1', name: 'Confidence Signal', essence: 'AI shows tradeoff explicitly', driver: 'L1 vs L3' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard wind-down system insists on sleep at 23:00. The framework reads <em>56-min deadline + 80% done + Hana\'s pattern of extending and recovering tomorrow</em>, then <strong>suppresses wind-down mode tonight</strong> AND <strong>auto-shifts tomorrow\'s alarm by 90 minutes</strong>. Two tokens collided; the framework named the winner and balanced the future.',
    },
    ui: {
      title: '56 min · ship · circadian deferred',
      hint: 'Just work. Tomorrow is rebalanced.',
      cards: [
        { id: 'work',      title: 'Section 4 · 12 min remaining',       prepMin: 12, priceJpy: 0, kcal: 0, allergens: [], tag: 'Active · current edit',         highlighted: true,  image: null },
        { id: 'tomorrow',  title: 'Tomorrow alarm shifted · 07:30',    prepMin: 0,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto · pattern-matched recovery',highlighted: false, image: null },
        { id: 'queued',    title: '14 notifications queued for 07:30', prepMin: 0,  priceJpy: 0, kcal: 0, allergens: [], tag: 'No interruption · honored focus',highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'partner_wakes', label: 'Daichi wakes · "everything ok?"', sub: 'whisper-back', category: 'social',
      mutate: (s) => ({ ...s, rules: [{ name: 'reply:partner-allowed · no-context-spill', drivers: ['social_exposure', 'L1.family'], output: '"yes shipping · 56 min" pre-composed reply · partner\'s phone gets it' }, ...s.rules],
        ui: { ...s.ui, cards: [{ id: 'partner', title: 'Daichi: "ok love · don\'t go past 24:30 ❤️"', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Family override · respected', highlighted: true, image: null }, ...s.ui.cards.slice(0, 2)] }}) },
    { id: 'health_data_alarming', label: 'Watch HRV crashing', sub: 'recovery override', category: 'goals',
      mutate: (s) => ({ ...s, brain: { ...s.brain, L3: [{ entry: 'HRV down 41% from baseline · sustained focus damaging · L1.identity may need to override.', highlight: true, weight: 'now' }, ...s.brain.L3] },
        rules: [{ name: 'health:override-back · ship-tomorrow', drivers: ['L3.hrv', 'L1.identity'], output: 'AI proposes: stop now · ship at 07:00 · 90-min buffer added before client demo' }, ...s.rules],
        ui: { ...s.ui, title: 'Body says stop · ship at 07:00 instead', cards: [{ id: 'stop', title: 'Save state · resume 07:00 · client demo holds 09:00', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Health override · framework re-prioritized', highlighted: true, image: null }] }}) },
    { id: 'deadline_extended', label: 'Client moves demo to 14:00', sub: 'pressure off', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'Released · 14h buffer', firing: false }},
        rules: [{ name: 'restore:circadian-default', drivers: ['priority_weight'], output: 'wind-down restored · sleep by 23:30 · finish in morning' }, ...s.rules],
        ui: { ...s.ui, title: 'Demo postponed · sleep restored · finish in morning', cards: [{ id: 'rest', title: 'Wind-down active · alarm 06:30 · 90 min in morning', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Default restored', highlighted: true, image: null }] }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · whisper mode', sub: 'silent · partner asleep', density: 'compact', maxCards: 3, control: 'thumb · voice', anchorHint: 'Subtle backup', drops: ['rich UI'] },
  ];
  return { defaultState, toggles, devices };
})();
