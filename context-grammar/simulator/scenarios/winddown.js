/* =============================================================
   Scenario: Wind-down / Sleep
   =============================================================
   Same engine as dinner.js. Different domain proves the
   pipeline.js engine is a framework, not a one-off.

   Hana decides whether to keep scrolling or wind down at 22:30.
   Stage 4: phone (default), watch, fridge (light off), bed-side speaker.
   ============================================================= */

window.SCENARIO_WINDDOWN = (() => {
  const defaultState = {
    intent: {
      utterance: 'Should I keep scrolling, or call it a night?',
      meta: 'Hana · Tuesday · 22:34 · in bed',
      shape: 'low-stakes self-decision · circadian + tomorrow load',
    },

    tokens: {
      physical_state: {
        number: '01',
        name: 'Physical State',
        value: 'Lying down · in bed',
        signal: 'horizontal sustained · low motion · home',
        firing: true,
      },
      cognitive_load: {
        number: '02',
        name: 'Cognitive Load',
        value: 'Low (winding down)',
        signal: 'no Focus Mode · post-dinner',
        firing: false,
      },
      social_exposure: {
        number: '03',
        name: 'Social Exposure',
        value: 'Trusted partner · adjacent',
        signal: 'Daichi reading nearby · lights low',
        firing: false,
      },
      priority_weight: {
        number: '04',
        name: 'Priority Weight',
        value: 'Low · self-care',
        signal: 'no deadline · pre-sleep wind-down',
        firing: true,
      },
      form_factor: {
        number: '05',
        name: 'Form Factor',
        value: 'Phone + Watch + Speaker',
        signal: 'phone in hand · watch on wrist · bedside speaker idle',
        firing: true,
      },
      feasibility: {
        number: '06',
        name: 'Feasibility',
        value: 'Tomorrow loaded',
        signal: 'wake 06:30 · 4 meetings 09:00–13:00',
        firing: true,
      },
      autonomy_dial: {
        number: '07',
        name: 'Autonomy Dial',
        value: 'Notify (gentle)',
        signal: 'AI nudges · user decides',
        firing: false,
      },
      disclosure_dial: {
        number: '08',
        name: 'Disclosure Dial',
        value: 'Full · health & calendar',
        signal: 'sleep · HRV · meeting load shared',
        firing: true,
      },
    },

    brain: {
      L1: [
        { entry: 'Hana sleeps best with 7h45m, lights out by 23:00.', highlight: true, weight: 'identity' },
        { entry: 'Avg HRV drops 18% on nights past 23:30.', highlight: false, weight: 'identity' },
      ],
      L2: [
        { entry: 'Reels-after-23:00 → 38 min average extension. Always regrets it.', highlight: true, weight: 'pattern' },
        { entry: 'On meeting-heavy mornings (≥3 calls), needs 30 min buffer.', highlight: false, weight: 'pattern' },
      ],
      L3: [
        { entry: 'Tonight: scrolled 22 min · last meal 19:30 light · garmin says low recovery.', highlight: true, weight: 'now' },
        { entry: 'Tomorrow 09:00 design review (live demo).', highlight: false, weight: 'now' },
      ],
    },

    rules: [
      { name: 'priority:sleep > content', drivers: ['L1.identity', 'feasibility'], output: 'wind-down anchor surfaces' },
      { name: 'tone:gentle · no-alarm', drivers: ['cognitive_load', 'priority_weight'], output: 'soft language · no countdown' },
      { name: 'output:bedside-amplify', drivers: ['form_factor', 'social_exposure'], output: 'speaker takes over · phone goes face-down' },
    ],

    axPatterns: [
      { id: 'D3', name: 'Proactive Nudge', essence: 'circadian-aware suggest', driver: 'feasibility' },
      { id: 'A2', name: 'Cognitive Scaling', essence: 'reduce density · large type', driver: 'physical_state' },
      { id: 'A1', name: 'Form Factor Transform', essence: 'phone → speaker handoff', driver: 'form_factor' },
      { id: 'D1', name: 'Approval Gate', essence: '"Switch to wind-down?" — soft yes/no', driver: 'autonomy_dial' },
    ],

    intentTest: {
      enabled: true,
      text: 'A naive system would just dim the screen at a hardcoded hour. The framework reads <em>tomorrow\'s meeting load + recent HRV + sleep history</em> together and proposes a specific length of wind-down — not a generic "Bedtime Mode".',
    },

    ui: {
      title: 'Wind-down — three small choices',
      cards: [
        { id: 'audiobook', title: 'Audiobook · 14 min',          prepMin: 14, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto-stop',  highlighted: true,  image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=520&q=80&auto=format&fit=crop' },
        { id: 'meditation', title: 'Guided breathing · 6 min',    prepMin: 6,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Headspace',  highlighted: false, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=520&q=80&auto=format&fit=crop' },
        { id: 'lights',     title: 'Lights warm + curtain close', prepMin: 1,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Home automation', highlighted: false, image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=520&q=80&auto=format&fit=crop' },
      ],
      hint: 'Tap one · or say "let me read 5 more minutes"',
    },
  };

  const toggles = [
    {
      id: 'meeting_heavy_tomorrow',
      label: 'Meeting-heavy tomorrow',
      sub: '4 calls · live demo at 09:00',
      category: 'goals',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: { ...s.tokens.feasibility, value: 'Tomorrow critical', firing: true, signal: 'wake 06:00 (30 min buffer) · 4 calls + live demo' },
          priority_weight: { ...s.tokens.priority_weight, value: 'High · sleep guards tomorrow', firing: true },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Tomorrow 09:00 LIVE DEMO · stakes high.', highlight: true, weight: 'now' },
            ...s.brain.L3.slice(1),
          ],
        },
        rules: [
          { name: 'priority:sleep · CRITICAL', drivers: ['L3.demo', 'priority_weight'], output: 'wind-down NOW · strongest nudge' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          title: 'Tomorrow is heavy. 7h45m means lights-out by 22:45.',
          windDownCountdown: '11 min until lights-out',
          cards: [...s.ui.cards].sort((a, b) => a.prepMin - b.prepMin), // shortest options first
        },
      }),
    },
    {
      id: 'low_recovery',
      label: 'Garmin: low recovery',
      sub: 'HRV 28 (vs 45 baseline)',
      category: 'goals',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          disclosure_dial: { ...s.tokens.disclosure_dial, value: 'Full · biometrics shared', firing: true, signal: 'HRV · sleep score · readiness' },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Garmin readiness: 28 (low). HRV down 38% from baseline.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'recovery:protect · no-stimuli', drivers: ['L3.hrv', 'disclosure_dial'], output: 'remove all activating content · breathing only' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          recoveryBanner: 'Body is asking for recovery — choices reduced to calming options',
          cards: s.ui.cards.filter((c) => c.id !== 'audiobook'), // remove the activating one
        },
      }),
    },
    {
      id: 'partner_asleep',
      label: 'Partner already asleep',
      sub: 'Daichi sleeping · adjacent',
      category: 'social',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          social_exposure: { ...s.tokens.social_exposure, value: 'Partner sleeping', firing: true, signal: 'do not disturb · whisper mode · phone face-down' },
          autonomy_dial: { ...s.tokens.autonomy_dial, value: 'Auto (silent)', firing: true },
        },
        brain: {
          ...s.brain,
          L1: [
            { entry: 'Daichi wakes at any sudden sound. Whisper-mode normal at this hour.', highlight: true, weight: 'identity' },
            ...s.brain.L1.slice(1),
          ],
        },
        rules: [
          { name: 'output:silent · screen-dim', drivers: ['social_exposure', 'L1'], output: 'no audio · earbud or text-only' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          phoneMode: 'silent',
          title: 'Quiet options — partner asleep',
          cards: s.ui.cards.filter((c) => c.id !== 'audiobook' || c.id === 'audiobook')
            .map((c) => c.id === 'audiobook' ? { ...c, title: 'Audiobook · earbud only · 14 min', tag: 'Earbud · whisper' } : c),
        },
      }),
    },
    {
      id: 'just_finished_workout',
      label: 'Just finished a workout',
      sub: '21:50 · still warm',
      category: 'physical',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          physical_state: { ...s.tokens.physical_state, value: 'Recovering · cool-down', firing: true, signal: 'heart rate elevated · core temp +0.6°C' },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Just-finished session: 35 min run · HR 142 avg.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'pre-sleep:cool-down · 25-min-window', drivers: ['physical_state', 'L3.workout'], output: 'cooling shower → stretch → bed' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'D3', name: 'Proactive Nudge', essence: 'cooling sequence', driver: 'physical_state' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          title: 'Cool down first — bed in 25 min',
          cards: [
            { id: 'shower',  title: 'Cooling shower · 5 min',  prepMin: 5,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Drop core temp', highlighted: true, image: 'https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=520&q=80&auto=format&fit=crop' },
            { id: 'stretch', title: 'Hip + spine · 8 min',     prepMin: 8,  priceJpy: 0, kcal: 0, allergens: [], tag: 'Wind down',     highlighted: false, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=520&q=80&auto=format&fit=crop' },
            { id: 'audiobook', title: 'Audiobook · 14 min',    prepMin: 14, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto-stop',     highlighted: false, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=520&q=80&auto=format&fit=crop' },
          ],
        },
      }),
    },
    {
      id: 'mind_racing',
      label: 'Mind racing',
      sub: 'asked AI 4 times in 10 min',
      category: 'physical',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          cognitive_load: { ...s.tokens.cognitive_load, value: 'High (rumination)', firing: true, signal: 'repeated app re-opens · search history shows worry pattern' },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Hana asked about tomorrow\'s demo 4 times in last 10 min — anxiety signal.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'pattern:rumination · break-cycle', drivers: ['cognitive_load', 'L3.search-pattern'], output: 'cognitive offloading · journal prompt · no problem-solving content' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'A6', name: 'Care Architecture', essence: 'rumination break · journal prompt', driver: 'cognitive_load' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          title: 'Park it for tomorrow morning',
          mindRacingHelper: 'I noticed you\'ve checked the demo 4 times. Try writing it down — it\'ll be here in the morning.',
          cards: [
            { id: 'journal',     title: 'Park-it journal · 3 min',    prepMin: 3, priceJpy: 0, kcal: 0, allergens: [], tag: 'Brain dump',     highlighted: true,  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=520&q=80&auto=format&fit=crop' },
            { id: 'meditation',  title: 'Guided breathing · 6 min',   prepMin: 6, priceJpy: 0, kcal: 0, allergens: [], tag: 'Headspace',      highlighted: false, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=520&q=80&auto=format&fit=crop' },
            { id: 'lights',      title: 'Lights warm + curtain close', prepMin: 1, priceJpy: 0, kcal: 0, allergens: [], tag: 'Home automation', highlighted: false, image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=520&q=80&auto=format&fit=crop' },
          ],
        },
      }),
    },
    {
      id: 'sick_unwell',
      label: 'Sick · 38°C',
      sub: 'unwell · resting earlier',
      category: 'physical',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          physical_state: { ...s.tokens.physical_state, value: 'Sick · resting', firing: true, signal: 'temp 38°C · low motion since 19:00' },
          autonomy_dial: { ...s.tokens.autonomy_dial, value: 'Notify · partner-aware', firing: true },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Hana feels unwell — temperature 38°C · resting since 19:00.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'recovery:sick · no-decisions', drivers: ['physical_state', 'L3.fever'], output: 'no choices to make · partner notified · medication reminder' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          phoneMode: 'voice-only',
          dim: true,
        },
      }),
    },
  ];

  const devices = [
    {
      id: 'phone',
      label: 'iPhone · in hand',
      sub: 'low brightness · night mode',
      density: 'compact',
      maxCards: 3,
      control: 'thumb · voice',
      anchorHint: 'Personal · low-light',
      drops: ['family vote'],
    },
    {
      id: 'watch',
      label: 'Apple Watch',
      sub: 'wrist · glance only',
      density: 'minimal',
      maxCards: 1,
      control: 'tap · digital crown',
      anchorHint: 'One choice at a time',
      drops: ['rich media', 'browsing'],
    },
    {
      id: 'speaker',
      label: 'Bedside speaker',
      sub: 'voice · ambient lighting',
      density: 'audio',
      maxCards: 0,
      control: 'voice',
      anchorHint: 'Eyes-closed mode',
      drops: ['screen', 'reading'],
    },
  ];

  return { defaultState, toggles, devices };
})();
