/* Scenario: Banking app open in a café · only sensitive fields blur (the field-level fix) */
window.SCENARIO_BANKING_PUBLIC = (() => {
  const defaultState = {
    intent: { utterance: 'Did this month\'s rent clear?', meta: 'Hana · Tuesday · 14:12 · café table', shape: 'quick check · one specific question · stranger nearby' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Stationary · seated', signal: 'café Wi-Fi · low motion', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (single question)', signal: 'no calendar pressure', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Public · stranger glancing', signal: 'shoulder-surf detected · 1 face behind', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Standard', signal: 'recurring check', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · in hand', signal: 'screen on · privacy filter ready', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Online · live data', signal: 'banking API responsive', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Confirm', signal: 'never auto-act on banking', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Domain-scoped (bank: minimal)', signal: 'this app · this field type only', firing: true },
    },
    brain: {
      L1: [{ entry: 'Banking domain: Hana asks AI about transactions but never balance display in public.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Hana checks rent on the 1st of every month at the café before lunch. Pattern locked.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Camera detects unfamiliar face behind shoulder · noise indicates café context.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'redact:per-field · banking-domain', drivers: ['L1.banking', 'social_exposure'], output: 'balance + account # blur · transaction labels stay' },
      { name: 'tap-to-reveal · biometric gate', drivers: ['autonomy_dial', 'disclosure_dial'], output: 'Face ID required for any sensitive field' },
      { name: 'auto-blur:no-spillover · this-app-only', drivers: ['L1'], output: 'Spotify, Notes, etc. unaffected' },
    ],
    axPatterns: [
      { id: 'A4', name: 'Disclosure Cascade', essence: 'field-level redaction', driver: 'social_exposure × disclosure' },
      { id: 'A3', name: 'Social-Aware Filtering', essence: 'targeted, not blanket', driver: 'L1.banking' },
      { id: 'D1', name: 'Approval Gate', essence: 'biometric to reveal', driver: 'autonomy_dial' },
    ],
    intentTest: {
      enabled: true,
      text: 'A reflexive "public → blur everything" is too dumb. The framework reads <em>this app, this field type, this audience</em> and blurs <strong>only the balance and account number</strong>. Transaction labels stay readable so Hana can answer her question without revealing her financial position.',
    },
    ui: {
      title: 'Recent · this account',
      hint: 'Tap any blurred number to reveal · Face ID required',
      cards: [
        { id: 'rent',     title: 'Rent · Monthly',         prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Recurring · cleared',  highlighted: true,  image: null, redacted: 'amount' },
        { id: 'salary',   title: 'Salary · Employer Inc.', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Cleared 2 days ago',   highlighted: false, image: null, redacted: 'amount' },
        { id: 'utility',  title: 'Utility bill',           prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Pending',              highlighted: false, image: null, redacted: 'amount' },
      ],
    },
  };
  const toggles = [
    { id: 'audio_only', label: 'Use earphone · audio readout', sub: 'screen stays blurred', category: 'physical',
      mutate: (s) => ({ ...s, ui: { ...s.ui, phoneMode: 'earphones', title: 'Voice readout · everything blurred' }}) },
    { id: 'home_alone', label: 'Move home · alone', sub: 'private surface · Daichi at work', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Private', firing: false }},
        rules: [{ name: 'redact:off · domain unchanged', drivers: ['social_exposure'], output: 'balance visible · transaction history readable' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Recent · this account', cards: s.ui.cards.map(c => ({ ...c, redacted: null })) }}) },
    { id: 'partner_co_view', label: 'Partner glances over', sub: 'Daichi joins the table', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Trusted partner', firing: true }},
        brain: { ...s.brain, L1: [{ entry: 'Joint household budget — both Hana and Daichi see all family finances. Banking stays redacted only for personal accounts.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'redact:joint-account-aware', drivers: ['social_exposure', 'L1.joint'], output: 'household account visible · personal still blurred' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Joint household account · visible to both' }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · in hand', sub: 'café table · screen mostly blurred', density: 'compact', maxCards: 3, control: 'thumb · biometric', anchorHint: 'Privacy-first surface', drops: ['cast', 'audio'] },
  ];
  return { defaultState, toggles, devices };
})();
