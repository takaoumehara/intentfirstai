/* Scenario: Late drive home · subtle drift · CarPlay surfaces a coffee stop */
window.SCENARIO_DRIVING_FATIGUE = (() => {
  const defaultState = {
    intent: { utterance: 'Just get me home.', meta: 'Hana · Wednesday · 23:14 · highway · 30 min from home', shape: 'safety-critical · subtle signal · voice-first' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Driving · 45 min in', signal: 'CarPlay connected · steering microcorrections detected', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'High (fatigue)', signal: 'reaction time 14% slower · late hour', firing: true },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Private · solo', signal: 'no passengers', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'CRITICAL · safety', signal: 'fatigue + wet roads + dark', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'CarPlay · voice-primary', signal: 'no manual interaction permitted', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Coffee stop · 4 min off-route', signal: 'open · 90s detour · safe parking', firing: true },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Notify (voice-only)', signal: 'voice confirm · no screen', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · biometric + drive', signal: 'HRV · steering · alertness', firing: false },
    },
    brain: {
      L1: [{ entry: 'Hana drives this route Mon-Fri. Personal threshold: stops for coffee after 11 PM if drive > 30 min.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Apple Watch: HRV down 22% from baseline · driving micro-correction count up 3x.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: 23:14 · 45 min driven · 30 min remaining · alertness signal yellow.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'safety:override-everything', drivers: ['priority_weight', 'L3.alertness'], output: 'no notifications · no screen UI · voice card only' },
      { name: 'suggest:rest-stop · single-line', drivers: ['feasibility', 'L1.threshold'], output: '"Coffee in 4 minutes — want it?" voice' },
      { name: 'suppress:everything-else', drivers: ['form_factor'], output: 'Slack · DMs · email all silent until parked' },
    ],
    axPatterns: [
      { id: 'D6', name: 'Dynamic Friction', essence: 'critical state breaks the dial', driver: 'priority_weight' },
      { id: 'E2', name: 'Limitation Disclosure', essence: 'voice-only · binary answer', driver: 'form_factor' },
      { id: 'D3', name: 'Proactive Nudge', essence: 'rest stop suggestion', driver: 'L2.fatigue' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard nav app keeps showing turn-by-turn while a podcast plays. The framework reads <em>watch HRV down + microcorrections up + late hour</em> and surfaces <strong>one voice line, one binary answer</strong>: "Coffee in 4 minutes — want it?" Everything else stays silent until the car parks.',
    },
    ui: {
      title: 'Coffee in 4 minutes — want it?',
      hint: 'Say "yes" or "keep driving"',
      cards: [
        { id: 'coffee', title: 'Lawson · 4 min off-route', prepMin: 4, priceJpy: 350, kcal: 0, allergens: [], tag: 'Open · safe lot · voice-only', highlighted: true, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'kids_in_back', label: 'Kids asleep in back', sub: 'silent priority', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Family · sleeping kids', firing: true }},
        rules: [{ name: 'voice-volume:whisper · subtitles-on-dash', drivers: ['social_exposure'], output: 'voice softens · CarPlay shows visual cue' }, ...s.rules],
        ui: { ...s.ui, title: 'Coffee in 4 min — silent suggestion (kids asleep)' }}) },
    { id: 'critical_lower', label: 'Watch escalates · pull over now', sub: 'HRV crashes', category: 'constraint',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, priority_weight: { ...s.tokens.priority_weight, value: 'EMERGENCY', firing: true }},
        rules: [{ name: 'override:hard-stop · find-safe-pullover', drivers: ['priority_weight'], output: 'navigate to nearest safe pullover · 0.4 km' }, ...s.rules],
        ui: { ...s.ui, title: 'Pull over · safe area in 25 seconds', cards: [{ id: 'pullover', title: 'Highway shoulder · 25s · turn signal auto-on', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'EMERGENCY', highlighted: true, image: null }] }}) },
    { id: 'partner_calling', label: 'Daichi calling', sub: 'incoming · normally allowed', category: 'social',
      mutate: (s) => ({ ...s, rules: [{ name: 'allow:family-only · auto-decline-rest', drivers: ['priority_weight', 'L1.family'], output: 'partner call accepted · all other notifications still suppressed' }, ...s.rules],
        ui: { ...s.ui, title: 'Daichi calling — accepted (family allowed during fatigue mode)' }}) },
  ];
  const devices = [
    { id: 'phone', label: 'CarPlay · audio first', sub: 'no manual UI · voice + horn-icon only', density: 'audio', maxCards: 1, control: 'voice', anchorHint: 'Hands locked', drops: ['screen', 'browse'] },
  ];
  return { defaultState, toggles, devices };
})();
