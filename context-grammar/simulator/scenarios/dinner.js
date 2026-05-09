/* =============================================================
   Scenario: Dinner planning
   =============================================================
   The flagship scenario for the Pipeline Simulator.

   This is a pure-data file. It declares:
     - Intent (stage 1)
     - 8 Context Tokens with values + signals (stage 2)
     - Brain memory entries for L1/L2/L3 (stage 3a)
     - Rules that fire and the tokens/brain that drive them (stage 3b)
     - AX Patterns the rules invoke (stage 3c)
     - Per-device UI atom layout (stage 4)
     - Context toggles that mutate token values + re-derive everything

   pipeline.js consumes this object and renders all stages.
   ============================================================= */

window.SCENARIO_DINNER = (() => {
  // ─── Default state (no context toggles enabled) ───
  const defaultState = {
    intent: {
      utterance: 'What should we eat tonight?',
      meta: 'Hana · Tuesday · 18:30 · home',
      shape: 'joint family decision · low time pressure · kids on sofa',
    },

    tokens: {
      physical_state: {
        number: '01',
        name: 'Physical State',
        value: 'Stationary · sofa',
        signal: 'home Wi-Fi · low motion',
        firing: true,
      },
      cognitive_load: {
        number: '02',
        name: 'Cognitive Load',
        value: 'Moderate',
        signal: 'no Focus Mode · normal calendar',
        firing: false,
      },
      social_exposure: {
        number: '03',
        name: 'Social Exposure',
        value: 'Family with children',
        signal: '3 known voices · child profile present',
        firing: true,
      },
      priority_weight: {
        number: '04',
        name: 'Priority Weight',
        value: 'Standard',
        signal: 'no deadline · routine',
        firing: false,
      },
      form_factor: {
        number: '05',
        name: 'Form Factor',
        value: 'TV available + Phone',
        signal: 'cast active · phone in hand',
        firing: true,
      },
      feasibility: {
        number: '06',
        name: 'Feasibility',
        value: 'Pantry-aware · 22 min slot',
        signal: 'fridge inventory + calendar window',
        firing: false,
      },
      autonomy_dial: {
        number: '07',
        name: 'Autonomy Dial',
        value: 'Suggest',
        signal: 'family chooses · AI proposes',
        firing: false,
      },
      disclosure_dial: {
        number: '08',
        name: 'Disclosure Dial',
        value: 'Full · household domain',
        signal: 'budget & allergies fully shared',
        firing: true,
      },
    },

    brain: {
      L1: [
        { entry: 'Aoi has a salmon allergy.', highlight: true, weight: 'hard' },
        { entry: 'Family of 4. Two kids (6 and 11).', highlight: false, weight: 'identity' },
      ],
      L2: [
        { entry: 'Showed prices on the TV 47 times. Never asked to hide them.', highlight: true, weight: 'pattern' },
        { entry: 'Tuesday cooking pattern: ≤25 min, light.', highlight: false, weight: 'pattern' },
      ],
      L3: [
        { entry: 'Tuesday 18:30. Last meal was light.', highlight: true, weight: 'now' },
        { entry: 'Pantry: rice, miso, salmon, tofu, soba.', highlight: false, weight: 'now' },
      ],
    },

    rules: [
      { name: 'priority:family-decision', drivers: ['intent', 'social_exposure'], output: 'show options to all viewers' },
      { name: 'disclosure:full · household-meal', drivers: ['disclosure_dial', 'L2'], output: 'prices visible' },
      { name: 'allergy:hard-filter', drivers: ['L1', 'feasibility'], output: 'exclude Aoi-unsafe dishes' },
      { name: 'density:moderate · TV-anchor', drivers: ['form_factor', 'cognitive_load'], output: '3 picks max, large tap targets' },
    ],

    axPatterns: [
      { id: 'A1', name: 'Form Factor Transform', essence: 'phone → TV cast', driver: 'form_factor' },
      { id: 'D5', name: 'Substitution Modes', essence: 'salmon-only filter', driver: 'L1 + feasibility' },
      { id: 'A3', name: 'Social-Aware Filtering', essence: '(overruled by intent)', overruled: true, driver: 'social_exposure' },
      { id: 'D3', name: 'Proactive Nudge', essence: 'low load → gentle suggest', driver: 'cognitive_load + autonomy' },
    ],

    intentTest: {
      enabled: true,
      text: 'A naive system would fire A3 and blur prices because "kids present." The framework also reads <em>Intent = joint family decision</em>. Joint decisions need price to be the conversation. So A3 is overruled. Prices stay visible.',
    },

    // UI per device — what atoms appear, in what shape
    ui: {
      title: 'Tonight — three picks for the family',
      cards: [
        { id: 'salmon',   title: 'Salmon poke bowl', prepMin: 25, priceJpy: 1820, kcal: 540, allergens: ['fish'],  tag: 'Aoi-safe', highlighted: true,  image: '../../assets/img/recipe/salmon.webp' },
        { id: 'tonkatsu', title: 'Tonkatsu set',     prepMin: 35, priceJpy: 2400, kcal: 820, allergens: [],         tag: null,        highlighted: false, image: '../../assets/img/recipe/fries.webp' },
        { id: 'soba',     title: 'Soba + tempura',   prepMin: 22, priceJpy: 1520, kcal: 610, allergens: ['gluten'], tag: null,        highlighted: false, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=520&q=80&auto=format&fit=crop' },
      ],
      hint: '↑ ↓ to highlight · OK to confirm',
    },
  };

  // ─── Context toggle definitions ───
  // Each toggle declares how it mutates the state.
  // mutate() takes the current state and returns a new one.
  const toggles = [
    {
      id: 'health',
      label: 'Health goal · −3kg',
      sub: '620 kcal left for tonight',
      category: 'goals',
      mutate: (s) => {
        // Compute kcal fit per card
        const tonightAllowance = 620;
        const macros = {
          'salmon':     { p: 38, f: 18, c: 44 },
          'tonkatsu':   { p: 28, f: 42, c: 30 },
          'soba':       { p: 22, f: 12, c: 66 },
          'oyakodon':   { p: 36, f: 28, c: 36 },
          'fried-rice': { p: 24, f: 22, c: 54 },
          'bbq':        { p: 42, f: 36, c: 22 },
          'picnic':     { p: 14, f: 10, c: 76 },
          'delivery':   { p: 22, f: 32, c: 46 },
        };
        const fitOf = (kcal) => {
          if (kcal <= tonightAllowance) return 'under';
          if (kcal <= tonightAllowance + 100) return 'close';
          return 'over';
        };
        const cardHealthMeta = {};
        s.ui.cards.forEach((c) => {
          cardHealthMeta[c.id] = {
            kcal: c.kcal,
            fit: fitOf(c.kcal),
            macros: macros[c.id] || { p: 25, f: 25, c: 50 },
          };
        });
        // Sort: under-budget asc, then over-budget asc
        const sortedCards = [...s.ui.cards].sort((a, b) => {
          const aOver = a.kcal > tonightAllowance ? 1 : 0;
          const bOver = b.kcal > tonightAllowance ? 1 : 0;
          if (aOver !== bOver) return aOver - bOver;
          return a.kcal - b.kcal;
        });
        return {
          ...s,
          tokens: {
            ...s.tokens,
            priority_weight: { ...s.tokens.priority_weight, value: 'Health-weighted', firing: true, signal: '6-month −3kg goal · 620 kcal budget tonight' },
          },
          brain: {
            ...s.brain,
            L1: [
              { entry: 'Hana on a −3kg / 6-month goal. Currently 64.5 → target 61.5.', highlight: true, weight: 'goal' },
              ...s.brain.L1,
            ],
          },
          rules: [
            { name: 'priority:health > price', drivers: ['L1.goal', 'priority_weight'], output: 'sort by kcal fit' },
            { name: 'render:nutrition-glance', drivers: ['L1.goal'], output: 'kcal badge + macro bars on every card' },
            ...s.rules,
          ],
          axPatterns: [
            { id: 'A2', name: 'Cognitive Scaling', essence: 'nutrition glance surfaces', driver: 'priority_weight' },
            ...s.axPatterns,
          ],
          ui: {
            ...s.ui,
            showKcal: true,
            healthDeep: true,
            weightTracker: {
              currentKg: 64.5,
              targetKg: 61.5,
              goalDeltaKg: -3,
              kgRemaining: 1.8,
              monthsLeft: 4,
              velocityKgPerMonth: -0.45,
              sparkline: [64.9, 65.1, 64.8, 64.6, 64.7, 64.4, 64.5],
            },
            mealBudget: {
              dailyAllowanceKcal: 1800,
              mealsLoggedToday: [
                { label: 'Breakfast', kcal: 420 },
                { label: 'Lunch', kcal: 580 },
              ],
              usedKcal: 1000,
              remainingKcal: 800,
              tonightAllowanceKcal: tonightAllowance,
            },
            cardHealthMeta,
            healthFootnote: '2 of these 3 keep you on track tonight',
            title: 'Tonight — health-sorted picks',
            cards: sortedCards,
          },
        };
      },
    },
    {
      id: 'budget',
      category: 'goals',
      label: 'Budget tight',
      sub: '¥30,000 left · day 22',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: { ...s.tokens.feasibility, value: 'Budget-bound · ¥30k left', firing: true, signal: '8 days remaining · ¥30k budget' },
        },
        rules: [
          { name: 'weight:price=0.6 · day-22-pacing', drivers: ['feasibility', 'L3.now'], output: 'cheaper picks rise' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          emphasizePrice: true,
          // re-sort: lowest price first
          cards: [...s.ui.cards].sort((a, b) => a.priceJpy - b.priceJpy),
        },
      }),
    },
    {
      id: 'singleparent',
      category: 'social',
      label: 'Single-parent night',
      sub: 'one adult · picky kids',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          social_exposure: { ...s.tokens.social_exposure, value: '1 adult · 2 kids picky', firing: true, signal: 'partner away · only one adult presence' },
          cognitive_load: { ...s.tokens.cognitive_load, value: 'High', firing: true, signal: 'sole parent + kid demands' },
        },
        rules: [
          { name: 'complexity:low · kid-safe:hard', drivers: ['social_exposure', 'cognitive_load'], output: 'simpler picks · kid-friendly only' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          // remove tonkatsu (35 min too long) and any non-kid-safe options
          cards: s.ui.cards.filter((c) => c.prepMin <= 25),
        },
      }),
    },
    {
      id: 'guests',
      category: 'social',
      label: 'Guests coming',
      sub: '+2 adults at 19:30',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          social_exposure: { ...s.tokens.social_exposure, value: 'Family + 2 guests', firing: true, signal: 'extra plates needed · plated presentation' },
          priority_weight: { ...s.tokens.priority_weight, value: 'High · 19:30 deadline', firing: true, signal: 'guests arrive in 60 min' },
        },
        rules: [
          { name: 'presentation:plated · batch:6', drivers: ['social_exposure', 'priority_weight'], output: 'plated, 6 servings, shoppable' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          showShoppingList: true,
          servingsHint: '6 servings',
        },
      }),
    },
    {
      id: 'leftovers',
      category: 'constraint',
      label: 'Leftover priority',
      sub: 'chicken expires tomorrow',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: { ...s.tokens.feasibility, value: 'Inventory urgent', firing: true, signal: 'chicken expires tomorrow · rice 2 days' },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Chicken thigh expires tomorrow. Rice cooked yesterday.', highlight: true, weight: 'now' },
            ...s.brain.L3.filter((e) => !e.entry.startsWith('Pantry:')),
          ],
        },
        rules: [
          { name: 'consume-first · expiry-driven', drivers: ['feasibility', 'L3.expiry'], output: 'use-up carousel pinned' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          useUpBanner: 'Use up: chicken (expires tomorrow), rice',
          cards: [
            { id: 'oyakodon',   title: 'Oyakodon — chicken & egg', prepMin: 18, priceJpy: 0, kcal: 720, allergens: ['egg'], tag: 'Use chicken',        highlighted: true,  image: '../../assets/img/recipe/chicken-curry.webp' },
            { id: 'fried-rice', title: 'Chicken fried rice',       prepMin: 15, priceJpy: 0, kcal: 680, allergens: [],      tag: 'Use rice + chicken', highlighted: false, image: '../../assets/img/recipe/bolognese.webp' },
            ...s.ui.cards.slice(0, 1),
          ],
        },
      }),
    },
    {
      id: 'latenight',
      category: 'constraint',
      label: 'Late night',
      sub: 'after 21:00',
      mutate: (s) => ({
        ...s,
        intent: { ...s.intent, meta: 'Hana · Tuesday · 21:42 · home' },
        tokens: {
          ...s.tokens,
          cognitive_load: { ...s.tokens.cognitive_load, value: 'Low · winding down', firing: true, signal: 'late hour · low activity' },
        },
        rules: [
          { name: 'effort:minimal · light:dim', drivers: ['cognitive_load', 'L3.time'], output: '10-min recipes only · delivery surfaces' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          dim: true,
          deliveryOption: true,
          cards: s.ui.cards.filter((c) => c.prepMin <= 15).concat([
            { id: 'delivery', title: 'Order: nearby ramen', prepMin: 12, priceJpy: 1100, kcal: 720, allergens: [], tag: 'Delivery · 12 min', highlighted: false, image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=520&q=80&auto=format&fit=crop' },
          ]),
        },
      }),
    },
    {
      id: 'allergy',
      category: 'constraint',
      label: 'Allergy flagged',
      sub: 'peanut: Yui',
      mutate: (s) => ({
        ...s,
        brain: {
          ...s.brain,
          L1: [
            { entry: 'Yui has a peanut allergy. Hard filter.', highlight: true, weight: 'hard' },
            ...s.brain.L1,
          ],
        },
        rules: [
          { name: 'allergen:peanut:exclude', drivers: ['L1.allergy'], output: 'flag any peanut ingredient' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          showAllergenChip: true,
          allergenWarning: 'Excluding peanut · 1 menu hidden',
        },
      }),
    },
    {
      id: 'one_thumb',
      category: 'physical',
      label: 'One thumb only',
      sub: 'on a packed train · standing · grip on rail',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          physical_state: { ...s.tokens.physical_state, value: 'Standing · one thumb', firing: true, signal: 'BLE = train · grip on rail · single hand' },
          form_factor: { ...s.tokens.form_factor, value: 'Phone (one-thumb mode)', firing: true, signal: 'screen → bottom-anchored, large targets' },
        },
        rules: [
          { name: 'reach:thumb-arc · targets:large', drivers: ['physical_state', 'form_factor'], output: 'controls in bottom 60% · ≥48dp' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'A1', name: 'Form Factor Transform', essence: 'thumb-zone collapse', driver: 'physical_state' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          phoneMode: 'one-thumb',
        },
      }),
    },
    {
      id: 'earphones_only',
      category: 'physical',
      label: 'Earphones · ring control',
      sub: 'phone in pocket · cannot tap',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          physical_state: { ...s.tokens.physical_state, value: 'In pocket · earphones', firing: true, signal: 'phone face-down · headset connected · ring paired' },
          form_factor: { ...s.tokens.form_factor, value: 'Audio + ring controller', firing: true, signal: 'no screen surface · audio + haptic' },
          autonomy_dial: { ...s.tokens.autonomy_dial, value: 'Notify (audio)', firing: true },
        },
        rules: [
          { name: 'output:audio-only · input:ring-tap', drivers: ['physical_state', 'form_factor'], output: 'screen off · ring controls · audio summary' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'A1', name: 'Form Factor Transform', essence: 'phone → earphones + ring', driver: 'physical_state' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          phoneMode: 'earphones',
        },
      }),
    },
    {
      id: 'voice_only',
      category: 'physical',
      label: 'Voice only · in bed',
      sub: 'lying down · sick · dim',
      mutate: (s) => ({
        ...s,
        intent: { ...s.intent, meta: 'Hana · in bed · 21:14 · feeling unwell' },
        tokens: {
          ...s.tokens,
          physical_state: { ...s.tokens.physical_state, value: 'Lying down · unwell', firing: true, signal: 'horizontal sustained · low motion · late hour' },
          cognitive_load: { ...s.tokens.cognitive_load, value: 'Low (rest)', firing: true, signal: 'minimal demands · do not interrupt' },
          form_factor: { ...s.tokens.form_factor, value: 'Voice (smart speaker / AirPods)', firing: true, signal: 'no visual · audio first' },
          autonomy_dial: { ...s.tokens.autonomy_dial, value: 'Notify · gentle', firing: true },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Hana feels unwell · 38°C earlier · resting since 19:00.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'output:voice-only · tone:gentle', drivers: ['physical_state', 'cognitive_load'], output: 'no screen · soft voice · short' },
          { name: 'recipe:no-cook · partner-prepared', drivers: ['L3.now'], output: 'porridge / soup options · partner notified' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'E2', name: 'Limitation Disclosure', essence: 'voice-only mode', driver: 'physical_state' },
          { id: 'A1', name: 'Form Factor Transform', essence: 'screen → smart speaker', driver: 'form_factor' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          phoneMode: 'voice-only',
          dim: true,
        },
      }),
    },
    {
      id: 'weekend',
      category: 'constraint',
      label: 'Weekend · clear weather',
      sub: 'Sat 17:30 · sunny',
      mutate: (s) => ({
        ...s,
        intent: { ...s.intent, meta: 'Hana · Saturday · 17:30 · home' },
        tokens: {
          ...s.tokens,
          priority_weight: { ...s.tokens.priority_weight, value: 'Leisure', firing: true, signal: 'no deadline · weekend pacing' },
        },
        rules: [
          { name: 'mode:leisure · prep-ahead:OK', drivers: ['priority_weight', 'L3.weekend'], output: 'BBQ / picnic / slow-cook surfaces' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          cards: [
            { id: 'bbq',    title: 'Backyard BBQ — chicken + corn', prepMin: 50, priceJpy: 3200, kcal: 780, allergens: [], tag: 'Leisure',    highlighted: true,  image: '../../assets/img/recipe/tacos.webp' },
            { id: 'picnic', title: 'Picnic onigiri set',            prepMin: 30, priceJpy: 1800, kcal: 520, allergens: [], tag: 'Park-ready', highlighted: false, image: 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=520&q=80&auto=format&fit=crop' },
            ...s.ui.cards.slice(0, 1),
          ],
        },
      }),
    },
  ];

  // ─── Device variations ───
  // Each device defines how to render Stage 4: which atoms, what density, what controls.
  const devices = [
    {
      id: 'fridge',
      label: 'Samsung Fridge',
      sub: 'kitchen-anchored · glance + voice',
      density: 'compact',           // 1 column, large targets
      maxCards: 3,
      control: 'voice + tap',
      anchorHint: 'Cook now · what\'s inside',
      drops: ['voting avatars', 'fine prep notes'],
    },
    {
      id: 'tv-cast',
      label: 'Phone → TV cast',
      sub: 'living-room sofa · D-pad remote',
      density: 'panel',             // 3 cards horizontally, big text
      maxCards: 3,
      control: 'D-pad from phone',
      anchorHint: 'Vote together',
      drops: ['inventory editor'],
    },
    {
      id: 'ipad',
      label: 'iPad shared',
      sub: 'browse-deep on the sofa',
      density: 'detail',             // stacked, more meta visible
      maxCards: 4,
      control: 'touch · stylus',
      anchorHint: 'Compare side-by-side',
      drops: ['voice-only', 'ambient'],
    },
    {
      id: 'phone',
      label: 'iPhone · personal',
      sub: 'pocket → hand → earphones',
      density: 'compact',
      maxCards: 3,
      control: 'thumb · voice · ring',
      anchorHint: 'Quick confirm · audio fallback',
      drops: ['family vote', 'inventory editor'],
    },
  ];

  return { defaultState, toggles, devices };
})();
