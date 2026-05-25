/* =============================================================
   Scenario: Midnight purchase · Dynamic Friction from Brain L2
   =============================================================
   01:12am. Kiran is about to buy a ¥38,000 Sony WH-1000XM6.
   Autonomy Dial = Auto for the shopping domain.
   But Brain L2 shows a 67% next-day regret pattern for 01:00–02:00
   purchases. Dynamic Friction fires — even on Auto.

   Demonstrates: D6 cannot be overridden by high Autonomy.
   The Brain's learned pattern is the evidence; friction is the safeguard.

   pipeline.js consumes this object and renders all stages.
   ============================================================= */

window.SCENARIO_MIDNIGHT_PURCHASE = (() => {
  const defaultState = {
    intent: {
      utterance: 'カートに入れて、購入する',
      meta: 'Kiran · home · Tuesday 01:12 · alone · lying in bed',
      shape: 'impulse purchase · high stakes · late night',
    },

    tokens: {
      physical_state: {
        number: '01',
        name: 'Physical State',
        value: 'Lying · bed · low activity',
        signal: 'accelerometer: horizontal 42 min · screen dim auto · 01:12',
        firing: true,
      },
      cognitive_load: {
        number: '02',
        name: 'Cognitive Load',
        value: 'Low · fatigue · decision quality degraded',
        signal: 'low screen activity pattern · late hour · no calendar until 09:00',
        firing: true,
      },
      social_exposure: {
        number: '03',
        name: 'Social Exposure',
        value: 'Solo · alone at home',
        signal: 'partner and kids asleep · no social accountability',
        firing: false,
      },
      priority_weight: {
        number: '04',
        name: 'Priority Weight',
        value: 'Low · discretionary purchase',
        signal: 'no deadline · want, not need · non-essential category',
        firing: false,
      },
      form_factor: {
        number: '05',
        name: 'Form Factor',
        value: 'Phone · lying down · dim screen',
        signal: 'brightness auto-dim active · horizontal orientation',
        firing: false,
      },
      feasibility: {
        number: '06',
        name: 'Feasibility',
        value: 'Budget: ¥23,000 spent this month · ¥57,000 remaining',
        signal: 'discretionary budget ¥80,000/month · item ¥38,000',
        firing: false,
      },
      autonomy_dial: {
        number: '07',
        name: 'Autonomy Dial',
        value: 'Auto · shopping domain',
        signal: 'user granted Auto for purchases under ¥50,000 · set 6 weeks ago',
        firing: true,
      },
      disclosure_dial: {
        number: '08',
        name: 'Disclosure Dial',
        value: 'Full · personal finance domain',
        signal: 'budget, past purchase history, regret patterns fully shared',
        firing: true,
      },
    },

    brain: {
      L1: [
        { entry: 'Monthly discretionary budget: ¥80,000. Rule: confirm all purchases over ¥15,000.', highlight: true, weight: 'identity' },
        { entry: 'Autonomy = Auto for shopping domain. Purchases under ¥50,000 may proceed without confirm — unless D6 conditions met.', highlight: true, weight: 'identity' },
      ],
      L2: [
        { entry: '6-month pattern: 3 purchases made 01:00–02:00. All 3 returned or cancelled next morning. Regret rate: 100% (n=3).', highlight: true, weight: 'pattern' },
        { entry: 'Broader late-night window (23:30–02:00): 9 purchases. 6 regretted next day. Regret rate: 67%.', highlight: true, weight: 'pattern' },
        { entry: 'Daytime equivalent purchases (same category, similar price): 2 of 7 regretted (29%). Decision quality clearly degrades at night.', highlight: false, weight: 'pattern' },
        { entry: 'Sony WH-1000XM5 already owned. Purchased March 2024. Used 3–4 times per week. Not broken.', highlight: true, weight: 'pattern' },
      ],
      L3: [
        { entry: 'Current time: 01:12. Item: Sony WH-1000XM6. Price: ¥38,000. Cart: ready to confirm.', highlight: true, weight: 'now' },
        { entry: 'This month discretionary spend: ¥23,000 of ¥80,000 budget. Item fits budget — but regret pattern is active.', highlight: false, weight: 'now' },
        { entry: 'User has been on this product page 14 min. Scrolled reviews 3 times. Cart added twice in past 3 days.', highlight: false, weight: 'now' },
      ],
    },

    rules: [
      { name: 'late-night-high-regret-pattern', drivers: ['L2.pattern', 'physical_state'], output: 'Brain L2 regret rate 67% at this hour — D6 activates' },
      { name: 'price-over-threshold-friction', drivers: ['L1.identity', 'feasibility'], output: '¥38,000 exceeds ¥15,000 confirm threshold — D1 normally sufficient, but D6 overrides' },
      { name: 'autonomy-auto-does-not-override-d6', drivers: ['autonomy_dial', 'cognitive_load'], output: 'Auto mode cannot suppress D6 when regret pattern + late hour + price threshold all co-occur' },
      { name: 'brain-l2-pattern-triggers-friction', drivers: ['L2.pattern', 'L3.now'], output: 'D6 fires: show regret data, offer morning review' },
    ],

    axPatterns: [
      { id: 'D6', name: 'Dynamic Friction', essence: '67% regret rate at 01:12 + ¥38k + existing XM5 = friction survives Auto mode', driver: 'L2.pattern + physical_state + feasibility' },
      { id: 'D1', name: 'Approval Gate', essence: '朝もう一度確認しますか? — sleep-on-it gate with one-tap morning reminder', driver: 'cognitive_load + autonomy_dial' },
    ],

    intentTest: {
      enabled: true,
      text: 'Autonomy = Auto means the AI can act without asking — but only when decision quality is normal. The framework reads <em>01:12 · fatigue · 67% regret rate in L2 · existing XM5 owned</em> and <strong>fires D6 despite Auto mode</strong>. Auto reduces friction for healthy decisions; it cannot suppress friction when the Brain\'s own evidence says "this decision has a 67% failure rate at this hour." The safeguard survives the trust level.',
    },

    ui: {
      title: 'Sony WH-1000XM6 — ¥38,000',
      uiScreen: '../../ui-screens/p1-v2/s8-6-dynamic-friction.html',
      hint: '自動購入モードでも、深夜 × 高額 × 後悔パターンで D6 が発動します',
      cards: [
        { id: 'friction-main',   title: '深夜 01:12 — この時間帯の購入は 67% が後悔',         prepMin: 0, priceJpy: 38000, kcal: 0, allergens: [], tag: 'D6 · Dynamic Friction',  highlighted: true,  image: null },
        { id: 'morning-review',  title: '朝 07:30 にもう一度確認する',                          prepMin: 0, priceJpy: 0,     kcal: 0, allergens: [], tag: 'D1 · Approval Gate',     highlighted: false, image: null },
        { id: 'xm5-note',        title: '参考: WH-1000XM5 は週3〜4回使用中 · 壊れていない',  prepMin: 0, priceJpy: 0,     kcal: 0, allergens: [], tag: 'Brain L2 · 学習パターン', highlighted: false, image: null },
      ],
    },
  };

  // ─── Context toggle definitions ───
  const toggles = [
    {
      id: 'morning-mode',
      label: '朝 (07:30) に見直す',
      sub: '認知状態 = 通常 · 決断品質 回復',
      category: 'physical',
      mutate: (s) => ({
        ...s,
        intent: {
          ...s.intent,
          meta: 'Kiran · home · Wednesday 07:30 · coffee · awake',
        },
        tokens: {
          ...s.tokens,
          physical_state: {
            ...s.tokens.physical_state,
            value: 'Upright · kitchen · morning routine',
            signal: 'accelerometer: vertical · morning activity · 07:30',
            firing: false,
          },
          cognitive_load: {
            ...s.tokens.cognitive_load,
            value: 'Normal · alert · rested',
            signal: '8h sleep logged · calendar: 2 meetings · focused morning',
            firing: false,
          },
        },
        brain: {
          ...s.brain,
          L2: [
            { entry: 'Morning purchase rate (same category): 71% complete, 29% abandon. Decision quality: normal.', highlight: true, weight: 'pattern' },
            { entry: 'Daytime Sony XM6 research: 14 min on page + 2 prior cart adds = genuine consideration.', highlight: false, weight: 'pattern' },
            ...s.brain.L2.slice(2),
          ],
          L3: [
            { entry: 'Current time: 07:30. Morning review mode. Cart still active. ¥38,000 Sony WH-1000XM6.', highlight: true, weight: 'now' },
            ...s.brain.L3.slice(1),
          ],
        },
        rules: [
          { name: 'morning-decision-quality-normal', drivers: ['cognitive_load', 'L2.pattern'], output: 'D6 lowers: morning context + 71% completion rate = friction reduced to D1 only' },
          { name: 'brain-l2-morning-pattern', drivers: ['L2.pattern', 'L3.now'], output: 'morning mode: show research summary, let user decide with full information' },
          ...s.rules.slice(2),
        ],
        axPatterns: [
          { id: 'D1', name: 'Approval Gate', essence: '朝モード: 昨夜の検討サマリー + 1タップで購入', driver: 'cognitive_load + autonomy_dial' },
          { id: 'E1', name: 'Confidence Signal', essence: '朝の購入 71% 完了 · 夜間より 38pt 高い', driver: 'L2.pattern' },
        ],
        ui: {
          ...s.ui,
          title: 'Sony WH-1000XM6 — 朝のレビュー',
          hint: '夜間の D6 が解除されました。朝の認知状態で判断してください。',
          cards: [
            { id: 'purchase-now',   title: '購入する — ¥38,000 · 今日配送',                    prepMin: 0, priceJpy: 38000, kcal: 0, allergens: [], tag: '朝 07:30 · D6 解除',        highlighted: true,  image: null },
            { id: 'research-note',  title: '3日間の検討履歴: ページ14分 · カート追加 × 2',    prepMin: 0, priceJpy: 0,     kcal: 0, allergens: [], tag: 'Brain L2 · 検討継続',     highlighted: false, image: null },
            { id: 'xm5-compare',    title: 'XM5 vs XM6: ノイキャン +23% · 重量 +8g · 価格差 ¥12,000', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: '比較情報', highlighted: false, image: null },
          ],
        },
      }),
    },
    {
      id: 'budget-tight',
      label: '今月の予算残り ¥5,200',
      sub: '月末 · 残高わずか',
      category: 'constraint',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          feasibility: {
            ...s.tokens.feasibility,
            value: 'Budget: ¥74,800 spent · ¥5,200 remaining',
            signal: '¥38,000 item = 7x remaining budget · purchase not feasible',
            firing: true,
          },
          priority_weight: {
            ...s.tokens.priority_weight,
            value: 'Low · budget constraint overrides',
            signal: 'discretionary budget exhausted · essential bills not yet due',
            firing: true,
          },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Remaining discretionary budget: ¥5,200. Purchase price: ¥38,000. Shortfall: ¥32,800.', highlight: true, weight: 'now' },
            ...s.brain.L3,
          ],
        },
        rules: [
          { name: 'feasibility-budget-blocker', drivers: ['feasibility', 'L3.now'], output: 'purchase blocked: budget insufficient. D6 upgrades to hard block.' },
          { name: 'd6-hard-block-over-budget', drivers: ['feasibility', 'autonomy_dial'], output: 'even Auto mode cannot approve over-budget purchase: next month shortcut offered' },
          ...s.rules,
        ],
        axPatterns: [
          { id: 'D6', name: 'Dynamic Friction (Hard)', essence: '¥5,200 残 × ¥38,000 購入 = D6 がハードブロックに昇格', driver: 'feasibility + L3.budget' },
          { id: 'E2', name: 'Limitation Disclosure', essence: '予算不足を明示。来月のリマインダーを提案。', driver: 'feasibility' },
        ],
        ui: {
          ...s.ui,
          title: 'Sony WH-1000XM6 — 予算不足',
          hint: '残高 ¥5,200 では購入できません。',
          cards: [
            { id: 'budget-block',   title: '購入不可 — 残り ¥5,200 (不足 ¥32,800)',     prepMin: 0, priceJpy: 38000, kcal: 0, allergens: [], tag: 'D6 ハードブロック',        highlighted: true,  image: null },
            { id: 'next-month',     title: '来月 1日 · 予算リセット後にリマインド',     prepMin: 0, priceJpy: 0,     kcal: 0, allergens: [], tag: 'Reminder · 来月',          highlighted: false, image: null },
            { id: 'save-cart',      title: 'カートを保存 · 価格変動アラートを設定',    prepMin: 0, priceJpy: 0,     kcal: 0, allergens: [], tag: 'Price alert · 保存',        highlighted: false, image: null },
          ],
        },
      }),
    },
  ];

  // ─── Device variations ───
  const devices = [
    {
      id: 'phone',
      label: 'iPhone · ベッド · 01:12',
      sub: '横向き · dim · D6 オーバーレイ',
      density: 'compact',
      maxCards: 3,
      control: 'thumb · lying down',
      anchorHint: 'D6 摩擦オーバーレイ',
      drops: ['product details', 'review scroll'],
    },
    {
      id: 'watch',
      label: 'Apple Watch · 触覚フィードバック',
      sub: '購入前の最終確認',
      density: 'minimal',
      maxCards: 1,
      control: 'tap',
      anchorHint: '朝まで待つ → タップ',
      drops: ['regret stats', 'product info'],
    },
  ];

  return { defaultState, toggles, devices };
})();
