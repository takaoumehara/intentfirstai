/* =============================================================
   Scenario: Business trip · typhoon · all shinkansen cancelled
   =============================================================
   Kiran in Osaka. Typhoon 4 just cancelled every shinkansen.
   Intent: get home to Tokyo today. Feasibility Token collapses.
   Demonstrates: A7 Live Recomposition, D1 Approval Gate,
   D6 Dynamic Friction, E1 Confidence Signal.

   pipeline.js consumes this object and renders all stages.
   ============================================================= */

window.SCENARIO_TYPHOON_NEWSHINKANSEN = (() => {
  const defaultState = {
    intent: {
      utterance: '今日中に東京に帰れますか?',
      meta: 'Kiran · Osaka · Wednesday · 17:45 · typhoon warning level 4',
      shape: 'urgent travel recovery · solo · high stakes',
    },

    tokens: {
      physical_state: {
        number: '01',
        name: 'Physical State',
        value: 'Standing · Shin-Osaka concourse',
        signal: 'GPS: Shin-Osaka station · motion: pedestrian · crowd noise',
        firing: false,
      },
      cognitive_load: {
        number: '02',
        name: 'Cognitive Load',
        value: 'High · stress + unfamiliar situation',
        signal: 'no prior typhoon experience · 3 unanswered Slack messages',
        firing: true,
      },
      social_exposure: {
        number: '03',
        name: 'Social Exposure',
        value: 'Solo traveler · public concourse',
        signal: 'crowded station · strangers · no trusted contacts nearby',
        firing: false,
      },
      priority_weight: {
        number: '04',
        name: 'Priority Weight',
        value: 'Critical · family at home',
        signal: 'partner alone with 2 kids · school run tomorrow 07:40',
        firing: true,
      },
      form_factor: {
        number: '05',
        name: 'Form Factor',
        value: 'Phone · standing · one hand',
        signal: 'iPhone held upright · data roaming OK · battery 61%',
        firing: false,
      },
      feasibility: {
        number: '06',
        name: 'Feasibility',
        value: 'COLLAPSED · all shinkansen cancelled',
        signal: 'JR: no departures until typhoon lifts · ETA unknown · last train departed 16:10',
        firing: true,
      },
      autonomy_dial: {
        number: '07',
        name: 'Autonomy Dial',
        value: 'Confirm (travel domain)',
        signal: 'hotel booking + flight require explicit approval — high spend',
        firing: true,
      },
      disclosure_dial: {
        number: '08',
        name: 'Disclosure Dial',
        value: 'Full · travel domain',
        signal: 'home address, budget, family situation fully accessible',
        firing: true,
      },
    },

    brain: {
      L1: [
        { entry: 'Home address: Setagaya, Tokyo. Partner + 2 kids (7, 11) at home.', highlight: false, weight: 'identity' },
        { entry: 'Travel budget policy: up to ¥50,000 for emergency same-day change. Over ¥30,000 requires confirmation.', highlight: true, weight: 'identity' },
        { entry: 'Prefers direct routes. Past trips: declined overnight stays in 4 of 4 opportunities.', highlight: true, weight: 'identity' },
      ],
      L2: [
        { entry: '3 prior emergency travel reroutes. All resolved via flight or overnight Shinkansen. Zero overnight stays accepted.', highlight: true, weight: 'pattern' },
        { entry: 'Past booking behavior: chose fastest option in 5 of 5 cases regardless of price — within budget.', highlight: false, weight: 'pattern' },
        { entry: 'Kiran reads confidence signals — showed %-based probability estimates in past disruption screens.', highlight: false, weight: 'pattern' },
      ],
      L3: [
        { entry: 'Typhoon Shanshan tracking NE at 35km/h. JR engineers estimate 12% probability shinkansen resumes before 23:00.', highlight: true, weight: 'now' },
        { entry: 'Last shinkansen departed Shin-Osaka 16:10. No further departures confirmed tonight.', highlight: true, weight: 'now' },
        { entry: 'JAL 1089 (Osaka–Haneda, departs 19:50) — currently sold out. Wait-list position: 4.', highlight: false, weight: 'now' },
        { entry: 'Hotel availability near Shin-Osaka: dropping fast. 3 options under ¥15,000 remain at 17:45.', highlight: true, weight: 'now' },
        { entry: 'ANA 3241 (Osaka–羽田, departs 20:30) — 2 seats available at ¥47,000 each.', highlight: false, weight: 'now' },
      ],
    },

    rules: [
      { name: 'feasibility-collapsed-recompose', drivers: ['feasibility', 'L3.now'], output: 'shinkansen removed from options · flight + overnight only' },
      { name: 'high-priority-confirm-before-act', drivers: ['priority_weight', 'autonomy_dial'], output: 'any booking over ¥15,000 requires explicit tap-confirm' },
      { name: 'stress-reduce-options-to-3', drivers: ['cognitive_load', 'L2.pattern'], output: 'surface max 3 options, ordered by urgency · no scrolling required' },
      { name: 'dynamic-friction-hotel-booking', drivers: ['autonomy_dial', 'feasibility'], output: 'hotel booking shows "confirm? 残り3室" friction before committing' },
    ],

    axPatterns: [
      { id: 'A7', name: 'Live Recomposition', essence: 'shinkansen cancelled → options rebuild in real-time', driver: 'feasibility' },
      { id: 'D1', name: 'Approval Gate', essence: 'hotel or flight booking pauses for explicit confirm', driver: 'autonomy_dial' },
      { id: 'D6', name: 'Dynamic Friction', essence: '¥47,000 ANA flight — confirm before booking · shows "残り2席"', driver: 'priority_weight + feasibility' },
      { id: 'E1', name: 'Confidence Signal', essence: 'shinkansen resumes 12% probability by 23:00 — shown explicitly', driver: 'feasibility + L3.typhoon' },
    ],

    intentTest: {
      enabled: true,
      text: 'A naive travel app shows "no shinkansen available" and stops. The framework reads <em>Feasibility = COLLAPSED · Priority Weight = Critical · Brain L2 = no overnight stays</em> and <strong>live-recomposes</strong>: removes shinkansen, surfaces 3 alternatives ranked by time-to-home, shows the typhoon probability as a confidence signal (12%), and gates any spend over ¥30,000 behind a confirm tap.',
    },

    ui: {
      title: '今夜、東京へ帰る — 3つの選択肢',
      uiScreen: '../../ui-screens/p2-v2/s19-sakura-recompose.html',
      hint: '新幹線は全便運休。以下の選択肢から選んでください。',
      cards: [
        { id: 'ana-flight',    title: 'ANA 3241 · 大阪 → 羽田 20:30',   prepMin: 165, priceJpy: 47000, kcal: 0, allergens: [], tag: '残り2席 · 要確認',    highlighted: true,  image: null },
        { id: 'hotel-wait',    title: 'Osaka stay · 始発 06:10 帰宅',    prepMin: 750, priceJpy: 12800, kcal: 0, allergens: [], tag: '残り3室 · 要確認',    highlighted: false, image: null },
        { id: 'shinkansen-12', title: '新幹線 再開待ち (再開確率 12%)', prepMin: 0,   priceJpy: 0,     kcal: 0, allergens: [], tag: '再開確率 12% · 推奨しない', highlighted: false, image: null },
      ],
    },
  };

  // ─── Context toggle definitions ───
  const toggles = [
    {
      id: 'typhoon-passes',
      label: '台風が通過 (3時間後再開見込み)',
      sub: '新幹線 21:30 再開予測',
      category: 'constraint',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: {
            ...s.tokens.feasibility,
            value: 'Recovering · shinkansen 21:30 est. resumption',
            signal: 'JR: 78% probability first departure 21:30–22:00',
            firing: true,
          },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Typhoon centre passed 18:22. JR engineers: 78% probability shinkansen resumes 21:30. Last Nozomi arrives Tokyo 00:10.', highlight: true, weight: 'now' },
            ...s.brain.L3.slice(1),
          ],
        },
        rules: [
          { name: 'feasibility-recovering-recompose', drivers: ['feasibility', 'L3.now'], output: 'shinkansen re-enters option set with 78% confidence label' },
          { name: 'hotel-hold-not-book', drivers: ['feasibility', 'autonomy_dial'], output: 'suggest holding hotel reservation without confirming — cancel window 2h' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'E1', name: 'Confidence Signal', essence: 'shinkansen 78% resume by 21:30 — shown with time estimate', driver: 'feasibility' },
          { id: 'D1', name: 'Approval Gate', essence: 'hold hotel without booking · cancel window shown', driver: 'autonomy_dial' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          title: '台風通過 — 新幹線 21:30 再開見込み',
          cards: [
            { id: 'shinkansen-wait', title: '新幹線 のぞみ · 22:04 発 (再開 78%)',   prepMin: 215, priceJpy: 13620, kcal: 0, allergens: [], tag: '再開確率 78% · 推奨',  highlighted: true,  image: null },
            { id: 'ana-flight',     title: 'ANA 3241 · 20:30 発 (発車まで 45分)', prepMin: 165, priceJpy: 47000, kcal: 0, allergens: [], tag: '残り2席 · 高額',        highlighted: false, image: null },
            { id: 'hotel-hold',     title: 'ホテル仮押さえ (2時間キャンセル可)',  prepMin: 0,   priceJpy: 12800, kcal: 0, allergens: [], tag: '確定しない · 保留推奨',  highlighted: false, image: null },
          ],
        },
      }),
    },
    {
      id: 'flight-available',
      label: 'JAL最終便に空きが出た',
      sub: 'JAL 1089 · 19:50 発 · 残り1席 ¥38,000',
      category: 'constraint',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: {
            ...s.tokens.feasibility,
            value: 'Flight window opened · 65 min to gate',
            signal: 'JAL 1089 wait-list position 4 → cancellation opened 1 seat',
            firing: true,
          },
          priority_weight: {
            ...s.tokens.priority_weight,
            value: 'Critical · 65-min decision window',
            signal: 'must decide in 12 min · check-in closes 19:20',
            firing: true,
          },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'JAL 1089 cancellation: 1 seat available at ¥38,000. Check-in closes 19:20 — 12 min to decide.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'urgency-window-countdown', drivers: ['feasibility', 'priority_weight'], output: '12-min countdown shown · option expires · D1 gate stays' },
          { name: 'd6-jal-38000-confirm', drivers: ['autonomy_dial', 'feasibility'], output: '¥38,000 = over ¥30k threshold → confirm gate with price breakdown' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'D6', name: 'Dynamic Friction', essence: '¥38,000 JAL · confirm before booking · 12-min window shown', driver: 'feasibility + priority_weight' },
          { id: 'D1', name: 'Approval Gate', essence: 'explicit confirm required · shows cancellation policy', driver: 'autonomy_dial' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          title: 'JAL 1089 — 空きが出た (残り12分)',
          urgencyCountdown: '12:00',
          cards: [
            { id: 'jal-flight',   title: 'JAL 1089 · 大阪 → 羽田 19:50 発',  prepMin: 130, priceJpy: 38000, kcal: 0, allergens: [], tag: '残り1席 · 12分以内に決定', highlighted: true,  image: null },
            { id: 'ana-flight',   title: 'ANA 3241 · 20:30 発 (残り2席)',    prepMin: 165, priceJpy: 47000, kcal: 0, allergens: [], tag: '残り2席 · 高額',            highlighted: false, image: null },
            { id: 'hotel-wait',   title: 'Osaka 宿泊 · 始発 06:10',          prepMin: 750, priceJpy: 12800, kcal: 0, allergens: [], tag: '残り3室',                   highlighted: false, image: null },
          ],
        },
      }),
    },
  ];

  // ─── Device variations ───
  const devices = [
    {
      id: 'phone',
      label: 'iPhone · 駅構内',
      sub: 'standing · high stress · one hand',
      density: 'compact',
      maxCards: 3,
      control: 'thumb · voice',
      anchorHint: '3択のみ · 最小認知負荷',
      drops: ['full itinerary', 'map view'],
    },
    {
      id: 'watch',
      label: 'Apple Watch',
      sub: 'haptic urgency · countdown',
      density: 'minimal',
      maxCards: 1,
      control: 'tap',
      anchorHint: 'ANA 20:30 · 残り2席',
      drops: ['details', 'price breakdown'],
    },
  ];

  return { defaultState, toggles, devices };
})();
