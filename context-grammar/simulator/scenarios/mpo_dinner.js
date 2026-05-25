/* =============================================================
   Scenario: Multi-Person Orchestration — Family Dinner
   =============================================================
   Same "夕食どうする?" intent → 4 family members get 4 different UIs.
   Demonstrates Multi-Person Orchestration: the brain splits one intent
   into simultaneous, role-appropriate surfaces for each person.

   pipeline.js consumes this object and renders all stages.
   ============================================================= */

window.SCENARIO_MPO_DINNER = (() => {
  // ─── Default state ───
  const defaultState = {
    intent: {
      utterance: '夕食、何にしよっか?',
      meta: 'Hana family · Tuesday · 18:31 · home kitchen',
      shape: 'ambient family decision · multi-person orchestration',
    },

    tokens: {
      physical_state: {
        number: '01',
        name: 'Physical State',
        value: 'Home · mixed locations',
        signal: 'Mom=kitchen · Dad=commute · Aoi=desk · Leo=living room',
        firing: false,
      },
      cognitive_load: {
        number: '02',
        name: 'Cognitive Load',
        value: 'Mixed · Mom=High, Dad=commuting, Aoi=homework, Leo=playing',
        signal: 'mom cooking prep · dad on train · aoi study mode · leo free',
        firing: true,
      },
      social_exposure: {
        number: '03',
        name: 'Social Exposure',
        value: 'Family · 4 members · co-present',
        signal: '4 known profiles · household shared context',
        firing: true,
      },
      priority_weight: {
        number: '04',
        name: 'Priority Weight',
        value: 'Standard · family coordination',
        signal: 'routine decision · no external deadline',
        firing: false,
      },
      form_factor: {
        number: '05',
        name: 'Form Factor',
        value: 'Multi-surface · fridge + 4 phones',
        signal: 'fridge display · 4 separate handsets · CarPlay for Dad',
        firing: true,
      },
      feasibility: {
        number: '06',
        name: 'Feasibility',
        value: 'Store closes in 28 min · pantry: pasta + tofu + chicken',
        signal: 'fridge inventory sync · store closing window detected',
        firing: true,
      },
      autonomy_dial: {
        number: '07',
        name: 'Autonomy Dial',
        value: 'Suggest (Mom approval gate)',
        signal: 'family domain · Mai confirms final decision',
        firing: false,
      },
      disclosure_dial: {
        number: '08',
        name: 'Disclosure Dial',
        value: 'Full · household domain',
        signal: 'all profiles fully shared within family context',
        firing: true,
      },
    },

    brain: {
      L1: [
        { entry: 'Aoi (13yo): dairy intolerance discovered 3 weeks ago. Hard filter — no milk, cream, cheese.', highlight: true, weight: 'hard' },
        { entry: 'Leo (9yo): no independent decisions. Decision fatigue risk — show simple "yes/no" only.', highlight: true, weight: 'identity' },
        { entry: 'Family of 4: Mai (Mom), Kenji (Dad), Aoi (13), Leo (9).', highlight: false, weight: 'identity' },
      ],
      L2: [
        { entry: 'Tuesday = pasta night in 34 of last 52 Tuesdays. Highest repeat-meal day.', highlight: true, weight: 'pattern' },
        { entry: 'Aoi dairy reaction started 3 weeks ago. Cream pasta flagged in last 2 occurrences.', highlight: true, weight: 'pattern' },
        { entry: 'Leo says yes to anything with "chicken" in the title. 100% acceptance rate.', highlight: false, weight: 'pattern' },
        { entry: 'Kenji prefers decisions waiting for him at home — not on the commute.', highlight: false, weight: 'pattern' },
      ],
      L3: [
        { entry: 'Fridge inventory: pasta (dry), tofu, chicken thigh, garlic, tomatoes. No dairy products.', highlight: true, weight: 'now' },
        { entry: 'Nearby store (Seiyu) closes in 28 min. Enough time to buy 1 item if Kenji detours.', highlight: true, weight: 'now' },
        { entry: 'Aoi currently in study mode — homework due tomorrow. Cognitive load: medium-high.', highlight: false, weight: 'now' },
        { entry: 'Leo watching TV in living room. Fully available, zero decision fatigue.', highlight: false, weight: 'now' },
      ],
    },

    rules: [
      { name: 'multi-person-split', drivers: ['social_exposure', 'form_factor'], output: 'split UI per person · 4 simultaneous surfaces' },
      { name: 'aoi-dairy-substitute', drivers: ['L1.allergy', 'feasibility'], output: 'dairy-based options replaced with tofu cream / tomato variants' },
      { name: 'leo-cognitive-shield', drivers: ['L1.identity', 'cognitive_load'], output: 'Leo sees simple thumbs-up/down — no ingredient details, no price' },
      { name: 'store-window-urgency', drivers: ['feasibility', 'L3.now'], output: 'shopping window countdown shown to Mai only — not to kids' },
    ],

    axPatterns: [
      { id: 'D1', name: 'Approval Gate', essence: 'Mai must confirm final pick before it locks', driver: 'autonomy_dial' },
      { id: 'D5', name: 'Substitution Modes', essence: 'dairy → tofu cream, exact-to-flexible swap for Aoi', driver: 'L1 + feasibility' },
      { id: 'A3', name: 'Social-Aware Filtering', essence: 'Leo cognitive shield — simplified vote surface', driver: 'social_exposure + cognitive_load' },
      { id: 'A2', name: 'Cognitive Scaling', essence: 'Leo: 2-option max · Dad: summary card · Aoi: standard', driver: 'cognitive_load' },
    ],

    intentTest: {
      enabled: true,
      text: 'A naive system sends all 4 people the same dinner menu. The framework reads <em>Social Exposure = 4 members · different locations + cognitive states</em> and <strong>splits one intent into 4 simultaneous surfaces</strong>: Mai gets a full approval UI with shopping countdown, Kenji gets a summary card for the commute, Aoi gets a dairy-filtered list, and Leo gets a thumbs-up/down — no ingredient details, no cognitive load.',
    },

    ui: {
      title: '夕食 — 4人それぞれの画面',
      uiScreen: '../../ui-screens/simulator/m19-mpo-dinner.html',
      hint: 'Multi-Person Orchestration: same intent → 4 different UIs',
      cards: [
        { id: 'pasta-tomato',   title: 'トマトパスタ (ヴィーガン対応)', prepMin: 20, priceJpy: 680,  kcal: 560, allergens: ['gluten'], tag: '青葵 セーフ',   highlighted: true,  image: '../../assets/img/recipe/bolognese.webp' },
        { id: 'chicken-ginger', title: '鶏の生姜炒め + ご飯',           prepMin: 18, priceJpy: 620,  kcal: 640, allergens: [],          tag: 'レオ の好物',  highlighted: false, image: '../../assets/img/recipe/chicken-curry.webp' },
        { id: 'tofu-steak',     title: '豆腐ステーキ + 和風ソース',     prepMin: 15, priceJpy: 480,  kcal: 420, allergens: ['soy'],      tag: '在庫ゼロ追加',  highlighted: false, image: '../../assets/img/recipe/salmon.webp' },
      ],
    },
  };

  // ─── Context toggle definitions ───
  const toggles = [
    {
      id: 'guests',
      label: 'ゲストが突然来る (+2名)',
      sub: '19:30 到着 · アレルギー不明',
      category: 'social',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          social_exposure: {
            ...s.tokens.social_exposure,
            value: 'Family + 2 guests · allergy unknown',
            signal: '2 adults arriving 19:30 · no profile data available',
            firing: true,
          },
          feasibility: {
            ...s.tokens.feasibility,
            value: 'Store closes in 28 min · 2 extra servings needed',
            signal: 'urgent: shop for 6 servings before close',
            firing: true,
          },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Guests arriving 19:30 — no allergy data in any shared profile. Disclose limitation.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'e2-limitation-disclosure', drivers: ['L3.now', 'disclosure_dial'], output: 'surface "allergy unknown" warning to Mai before confirming' },
          { name: 'd6-dynamic-friction-shopping', drivers: ['feasibility', 'priority_weight'], output: 'confirm before adding shopping detour — ¥1,400 estimated + 28 min window' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'E2', name: 'Limitation Disclosure', essence: 'guest allergy = unknown · AI cannot guarantee safety', driver: 'L3.now' },
          { id: 'D6', name: 'Dynamic Friction', essence: 'confirm before routing Kenji to store detour', driver: 'feasibility' },
          ...s.axPatterns,
        ],
        ui: {
          ...s.ui,
          title: '夕食 — ゲスト2名追加',
          showShoppingList: true,
          servingsHint: '6人分',
          allergenWarning: 'ゲストのアレルギー情報なし — Mai に確認を求める',
          cards: [
            { id: 'pasta-tomato', title: 'トマトパスタ × 6人分', prepMin: 25, priceJpy: 1100, kcal: 560, allergens: ['gluten'], tag: 'アレルギー除去済み', highlighted: true, image: '../../assets/img/recipe/bolognese.webp' },
            { id: 'chicken-ginger', title: '鶏の生姜炒め × 6人分', prepMin: 22, priceJpy: 980, kcal: 640, allergens: [], tag: '追加食材 要購入', highlighted: false, image: '../../assets/img/recipe/chicken-curry.webp' },
          ],
        },
      }),
    },
    {
      id: 'store-closed',
      label: 'スーパーが閉店 (デリバリーのみ)',
      sub: '徒歩圏内の店舗 全て閉店',
      category: 'constraint',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: {
            ...s.tokens.feasibility,
            value: 'Store closed · delivery or pantry only',
            signal: 'all nearby stores closed · delivery 30–45 min estimated',
            firing: true,
          },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'All nearby stores now closed. Options: pantry-only or delivery (est. 30–45 min, ¥1,800+).', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'feasibility-recompose-delivery', drivers: ['feasibility', 'L3.now'], output: 'recompose picks to pantry-only + delivery options' },
          ...s.rules,
        ],
        ui: {
          ...s.ui,
          title: '夕食 — デリバリー or 在庫のみ',
          deliveryOption: true,
          cards: [
            { id: 'pasta-tomato',   title: 'トマトパスタ (在庫のみ)', prepMin: 20, priceJpy: 0,    kcal: 560, allergens: ['gluten'], tag: '在庫で作れる',     highlighted: true,  image: '../../assets/img/recipe/bolognese.webp' },
            { id: 'tofu-steak',     title: '豆腐ステーキ (在庫のみ)',  prepMin: 15, priceJpy: 0,    kcal: 420, allergens: ['soy'],    tag: '在庫で作れる',     highlighted: false, image: '../../assets/img/recipe/salmon.webp' },
            { id: 'delivery-ramen', title: 'デリバリー — ラーメン × 4', prepMin: 35, priceJpy: 3200, kcal: 710, allergens: ['gluten', 'egg'], tag: 'デリバリー · 35分', highlighted: false, image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=520&q=80&auto=format&fit=crop' },
          ],
        },
      }),
    },
  ];

  // ─── Device variations ───
  const devices = [
    {
      id: 'fridge',
      label: 'Samsung Fridge · キッチン',
      sub: 'Mai (Mom) · approval gate · shopping countdown',
      density: 'compact',
      maxCards: 3,
      control: 'touch + voice',
      anchorHint: 'Mai の承認 + 在庫チェック',
      drops: ['voting avatars', 'macro detail'],
    },
    {
      id: 'phone-dad',
      label: 'iPhone · Kenji (Dad · 電車)',
      sub: 'commute · summary card only',
      density: 'minimal',
      maxCards: 1,
      control: 'thumb',
      anchorHint: '帰宅前のサマリー確認',
      drops: ['full menu', 'shopping list'],
    },
    {
      id: 'phone-aoi',
      label: 'iPhone · Aoi (宿題中)',
      sub: '乳製品フィルター適用済み · 標準UI',
      density: 'compact',
      maxCards: 3,
      control: 'thumb',
      anchorHint: '乳製品除去済みリスト',
      drops: ['price', 'parent approval gate'],
    },
    {
      id: 'phone-leo',
      label: 'iPhone · Leo (9歳)',
      sub: '簡易 Yes / No のみ',
      density: 'minimal',
      maxCards: 2,
      control: 'large tap targets',
      anchorHint: '好き / 嫌いだけ',
      drops: ['ingredients', 'price', 'nutrition', 'parent decisions'],
    },
  ];

  return { defaultState, toggles, devices };
})();
