/* Scenario: Movie paused on TV → phone unlocked in bedroom auto-resumes */
window.SCENARIO_TV_RESUME = (() => {
  const defaultState = {
    intent: { utterance: 'I want to keep watching.', meta: 'Hana · Saturday · 22:38 · in bed', shape: 'task continuity · cross-device · low effort' },
    tokens: {
      physical_state:  { number: '01', name: 'Physical State',  value: 'Lying down · in bed', signal: 'horizontal · low motion · bedroom', firing: true },
      cognitive_load:  { number: '02', name: 'Cognitive Load',  value: 'Low (winding down)', signal: 'evening · post-dinner', firing: false },
      social_exposure: { number: '03', name: 'Social Exposure', value: 'Trusted partner', signal: 'Daichi reading next to her', firing: false },
      priority_weight: { number: '04', name: 'Priority Weight', value: 'Low (leisure)', signal: 'no deadline', firing: false },
      form_factor:     { number: '05', name: 'Form Factor',     value: 'TV → phone handoff', signal: 'TV paused 12 min ago · phone unlocked now', firing: true },
      feasibility:     { number: '06', name: 'Feasibility',     value: 'Both apps available', signal: 'Netflix authed on both surfaces', firing: false },
      autonomy_dial:   { number: '07', name: 'Autonomy Dial',   value: 'Notify (auto-resume)', signal: 'restoration without ask', firing: true },
      disclosure_dial: { number: '08', name: 'Disclosure Dial', value: 'Full · entertainment', signal: 'media playback state shared', firing: true },
    },
    brain: {
      L1: [{ entry: 'Hana watches in bed when partner is awake. 87% of bedroom resumes are continuation, not new content.', highlight: true, weight: 'identity' }],
      L2: [{ entry: 'Last 3 movies: paused on TV → resumed on phone within 15 min · always at exact timestamp.', highlight: true, weight: 'pattern' }],
      L3: [{ entry: 'TV paused at 47:12 of "Past Lives" · 12 min ago · phone just unlocked in bedroom.', highlight: true, weight: 'now' }],
    },
    rules: [
      { name: 'continuity:active-task · auto-surface', drivers: ['L3.now', 'L2.pattern'], output: 'phone home shows resume card at top' },
      { name: 'one-tap:exact-timestamp', drivers: ['feasibility', 'autonomy_dial'], output: 'tap → starts at 47:12 · no menu' },
      { name: 'audio:earbud-default · partner-aware', drivers: ['social_exposure'], output: 'auto-routes to AirPods · TV speakers off' },
    ],
    axPatterns: [
      { id: 'A1', name: 'Form Factor Transform', essence: 'TV → phone seamless', driver: 'form_factor' },
      { id: 'D4', name: 'Omakase Mode', essence: 'no menu, no search', driver: 'autonomy_dial' },
      { id: 'A6', name: 'Care Architecture', essence: 'reads "in bed → quiet" silently', driver: 'social_exposure' },
    ],
    intentTest: {
      enabled: true,
      text: 'A standard streaming app makes you re-search the title, re-find the episode, drag the playhead. The framework reads <em>active session + bedroom + partner present</em> and surfaces a <strong>single card</strong>: "Resume <em>Past Lives</em> · 47:12". Tap it. AirPods auto-route. The handoff happened before you asked.',
    },
    ui: {
      title: 'Resume where you left off',
      hint: 'Tap once · AirPods route automatically',
      cards: [
        { id: 'resume',     title: 'Resume — Past Lives · 47:12', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Continue · 1h 23m left', highlighted: true,  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=520&q=80&auto=format&fit=crop' },
        { id: 'recommend1', title: 'Tomorrow you might like — Drive My Car', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Tomorrow', highlighted: false, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=520&q=80&auto=format&fit=crop' },
      ],
    },
  };
  const toggles = [
    { id: 'partner_already_asleep', label: 'Daichi already asleep', sub: 'whisper mode', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Partner sleeping', firing: true }},
        rules: [{ name: 'output:silent · subtitle-on', drivers: ['social_exposure'], output: 'audio off · subtitles on · brightness drops' }, ...s.rules],
        ui: { ...s.ui, dim: true, cards: s.ui.cards.map(c => c.id === 'resume' ? { ...c, tag: 'Subtitles on · audio muted · 1h 23m' } : c) }}) },
    { id: 'partner_co_watching', label: 'Daichi wants to join', sub: 'continue together', category: 'social',
      mutate: (s) => ({ ...s, tokens: { ...s.tokens, social_exposure: { ...s.tokens.social_exposure, value: 'Co-viewing · partner', firing: true }},
        rules: [{ name: 'send-back:bedroom-tv', drivers: ['form_factor'], output: 'reverse handoff · bedroom TV picks up' }, ...s.rules],
        ui: { ...s.ui, title: 'Cast back to bedroom TV?', cards: [{ id: 'cast', title: 'Bedroom TV · co-watch', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Resume together', highlighted: true, image: null }] }}) },
    { id: 'too_late_save_for_morning', label: 'Save for morning instead', sub: 'tomorrow on the train', category: 'goals',
      mutate: (s) => ({ ...s, ui: { ...s.ui, title: 'Saved for tomorrow morning', cards: [{ id: 'save', title: '"Past Lives" queued for 07:42 commute', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto-download · resume on train', highlighted: true, image: null }] }}) },
  ];
  const devices = [
    { id: 'phone', label: 'iPhone · in bed', sub: 'low brightness · single card', density: 'compact', maxCards: 2, control: 'tap · voice', anchorHint: 'Resume surface', drops: ['rich browse'] },
  ];
  return { defaultState, toggles, devices };
})();
