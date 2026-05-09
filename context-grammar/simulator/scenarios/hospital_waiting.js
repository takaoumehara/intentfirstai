/* Scenario: Hospital waiting room · Social Exposure × Disclosure coupling reveals itself */
window.SCENARIO_HOSPITAL_WAITING = (() => {
  const defaultState = {
    intent: { utterance: 'What should I tell the doctor?', meta: 'Hana · Friday · 14:42 · waiting room · 4 strangers nearby', shape: 'medical context · public space · privacy elevated' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Seated · waiting', signal: 'GPS = clinic · stationary 12 min', firing: false },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Moderate (anxious)', signal: 'app switching elevated · health searches', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Public · medical setting', signal: '4 unknown faces in line of sight · mic ambient: medical chatter', firing: true },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'High · health-critical', signal: 'specialist appt · 3-week wait list', firing: true },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'Phone · earphone-friendly', signal: 'screen visible to neighbors · earbuds available', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Symptom log + history available', signal: 'digital health record · symptom diary 3 weeks', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Suggest', signal: 'AI summarizes · user shares', firing: false },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'MINIMUM · suppressed in public', signal: 'medical content shifts to audio-only · no screen', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana: medical info is most-private domain · never visible on shared screens.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 6 medical visits: Hana always switches to earbud + dim screen. Pattern locked.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'Now: waiting room · 4 strangers in earshot · symptom diary has sensitive entries (mental health flag).', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'screen:suppress-medical-content', drivers: ['social_exposure', 'L1.identity'], output: 'symptom summary moved to earbud audio · screen shows generic prep checklist' },
      { name: 'audio:routes-to-earbud', drivers: ['L2.pattern'], output: 'auto-route TTS to AirPods · phone speaker disabled' },
      { name: 'discreet:cover-screen', drivers: ['social_exposure'], output: 'screen brightness drops 60% · privacy tone' },
    ],
    axPatterns: [
      { id: 'A4', name: 'Disclosure Cascade', essence: 'medical-domain → minimum disclosure', driver: 'social_exposure × disclosure' },
      { id: 'A1', name: 'Form Factor Transform', essence: 'screen → earbud audio', driver: 'L2.pattern' },
      { id: 'A6', name: 'Care Architecture', essence: 'protects mental-health flag', driver: 'L1.identity' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard health app shows your symptom log on the visible screen — fine at home, terrible in a waiting room with strangers behind you. The framework reads <em>medical context + public exposure + Hana\'s pattern of earbud routing</em> and <strong>moves the entire symptom summary into audio</strong>. The screen shows only a generic prep checklist; sensitive entries (mental-health flag) never render visually.',
    },
    ui: {
      title: 'Prep checklist · audio summary in earbud',
      hint: 'Pop in earbud → AI reads your symptom diary',
      cards: [
        { id: 'prep1', title: 'Bring your insurance card',     prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Generic · public-safe', highlighted: true,  image: null },
        { id: 'prep2', title: 'Note any allergies',            prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Generic · public-safe', highlighted: false, image: null },
        { id: 'audio', title: 'Earbud · symptom summary ready', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Audio-only · 90 sec',   highlighted: false, image: null },
      ],
    },
  };
  const toggles = [
    { id: 'private_room', label: 'Called in · private room', sub: 'disclosure restored', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Private · with doctor', firing: false }, disclosure_dial: { ...s.tokens.disclosure_dial, value: 'Full · medical context', firing: true }},
        rules: [{ name: 'screen:full-data-restored', drivers: ['social_exposure'], output: 'symptom timeline + mental-health flag + medication history all visible to share with doctor' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'In private — full record visible to share', cards: [{ id: 'timeline', title: 'Symptom timeline · 3 weeks · mental-health flag · share with doctor?', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Private · ready to display', highlighted: true, image: null }] }}) },
    { id: 'partner_with', label: 'Daichi came with me', sub: 'trusted partner present', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Trusted partner + public', firing: true }},
        brain: { ...s.brain, L1: [{ entry: 'Daichi has full medical disclosure with Hana — partner-trust = same as private.', highlight: true, weight: 'identity' }, ...s.brain.L1] },
        rules: [{ name: 'partner:trust-elevates · screen-still-shielded', drivers: ['social_exposure', 'L1.partner'], output: 'screen visible to Daichi at angle · still shielded from strangers · co-prep' }, ...s.rules.slice(1)],
        ui: { ...s.ui, title: 'Daichi sees · strangers don\'t · co-prep', cards: [{ id: 'copr', title: 'Co-prep · symptom timeline visible to Daichi only', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Partner trust · physical angle aware', highlighted: true, image: null }] }}) },
    { id: 'wait_too_long', label: 'Wait time = 47 min', sub: 'use the time', category: 'physical',
      mutate: (s) => ({ ...s, rules: [{ name: 'opportunity:fill-time-without-leaving', drivers: ['L3.now'], output: 'AI suggests audio prep + read 1 article relevant to today\'s appt · no leaving seat' }, ...s.rules],
        ui: { ...s.ui, cards: s.ui.cards.concat([{ id: 'use', title: '47 min wait · 8-min audio summary + article on your topic', prepMin: 8, priceJpy: 0, kcal: 0, allergens: [], tag: 'Time-aware · stay-seated', highlighted: false, image: null }]) }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · public-suppressed', sub: 'audio-routed · screen-dim', density: 'minimal', maxCards: 3, control: 'tap · earbud', anchorHint: 'Privacy-protected surface', drops: ['cast', 'rich notifications'] },
  ];
  return { defaultState, toggles, devices };
})();
