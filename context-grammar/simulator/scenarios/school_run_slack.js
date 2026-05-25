/* =============================================================
   Scenario: School run · Slack emergency · Form Factor Transform
   =============================================================
   Kiran driving kids to school. CarPlay active. Slack notification
   arrives: "@Kiran URGENT production down." Physical State = driving
   at 60km/h overrides all else. Form Factor transforms to audio-only.
   Dynamic Friction fires before any voice reply.

   Demonstrates: A1 Form Factor Transform, D6 Dynamic Friction,
   E1 Confidence Signal, Safety > Work collision in Priority Weight.

   pipeline.js consumes this object and renders all stages.
   ============================================================= */

window.SCENARIO_SCHOOL_RUN_SLACK = (() => {
  const defaultState = {
    intent: {
      utterance: '(passive) 子供の送迎中',
      meta: 'Kiran · driving · Tuesday 08:15 · CarPlay · kids in backseat',
      shape: 'ambient safety context · hands-busy · passive intent',
    },

    tokens: {
      physical_state: {
        number: '01',
        name: 'Physical State',
        value: 'Driving · CarPlay · 60km/h',
        signal: 'CarPlay connected · GPS speed 60km/h · accelerometer: vehicle motion',
        firing: true,
      },
      cognitive_load: {
        number: '02',
        name: 'Cognitive Load',
        value: 'High · driving + kids',
        signal: 'primary task: vehicle control · secondary: 2 kids talking in rear seats',
        firing: true,
      },
      social_exposure: {
        number: '03',
        name: 'Social Exposure',
        value: 'Kids in backseat · age 9 and 15',
        signal: '2 children present · 1 minor · Slack content may not be appropriate',
        firing: true,
      },
      priority_weight: {
        number: '04',
        name: 'Priority Weight',
        value: 'Safety > Work · always',
        signal: 'driving rule: safety overrides all work interruptions without exception',
        firing: true,
      },
      form_factor: {
        number: '05',
        name: 'Form Factor',
        value: 'CarPlay · voice-primary',
        signal: 'screen: CarPlay maps only · no text input · audio output active',
        firing: true,
      },
      feasibility: {
        number: '06',
        name: 'Feasibility',
        value: '4 min to school · no safe pull-over nearby',
        signal: 'GPS: 1.2km to school · no designated stop on current route segment',
        firing: false,
      },
      autonomy_dial: {
        number: '07',
        name: 'Autonomy Dial',
        value: 'Notify (driving context)',
        signal: 'driving context forces Notify floor — regardless of domain setting',
        firing: true,
      },
      disclosure_dial: {
        number: '08',
        name: 'Disclosure Dial',
        value: 'Full · work domain',
        signal: 'Slack workspace, team context, urgency history fully shared',
        firing: false,
      },
    },

    brain: {
      L1: [
        { entry: 'Family safety rule: no text reading, no text reply while vehicle is moving — absolute, no override.', highlight: true, weight: 'identity' },
        { entry: 'Work context: Kiran is team lead for backend services team. Production incidents = high stakes.', highlight: false, weight: 'identity' },
        { entry: 'Kids in car during school run, Tue/Thu 07:55–08:30. Kiran driving both days.', highlight: false, weight: 'identity' },
      ],
      L2: [
        { entry: 'Slack messages from sender (Priya, on-call engineer): urgent in 3 of last 5 messages. This sender = high signal.', highlight: true, weight: 'pattern' },
        { entry: 'Previous production incidents resolved without Kiran during school run: team handled 2 of 2 autonomously.', highlight: false, weight: 'pattern' },
        { entry: 'Kiran average response time post-school-drop: 9 min. School drop completes 08:25.', highlight: true, weight: 'pattern' },
      ],
      L3: [
        { entry: 'Current speed: 60km/h. Distance to school: 1.2km (~4 min). Kids drop-off time: 08:19 est.', highlight: true, weight: 'now' },
        { entry: 'Slack message preview: "@Kiran URGENT production down — checkout service returning 503 since 08:12."', highlight: true, weight: 'now' },
        { entry: 'On-call rotation: Priya is primary on-call. Kiran is secondary. Priya should handle first 15 min autonomously.', highlight: false, weight: 'now' },
      ],
    },

    rules: [
      { name: 'driving-override-all-visual', drivers: ['physical_state', 'form_factor'], output: 'all visual notifications suppressed while speed > 5km/h' },
      { name: 'safety-no-text-while-moving', drivers: ['L1.identity', 'physical_state'], output: 'absolute block: no text reading, no text reply, no interaction while moving' },
      { name: 'audio-only-mode', drivers: ['form_factor', 'cognitive_load'], output: 'Slack message summarized to audio only: sender + urgency estimate + ETA to respond' },
      { name: 'priority-safety-over-work', drivers: ['priority_weight', 'L1.identity'], output: 'Safety rule enforced: work Slack cannot override driving safety context' },
      { name: 'friction-before-voice-reply', drivers: ['physical_state', 'autonomy_dial'], output: 'D6 fires if user attempts voice reply while moving: "停車してから返信しますか?"' },
    ],

    axPatterns: [
      { id: 'A1', name: 'Form Factor Transform', essence: '視覚 → 音声のみ: CarPlay maps lock · Slack = audio summary', driver: 'physical_state + form_factor' },
      { id: 'D6', name: 'Dynamic Friction', essence: '停車してから返信しますか? — fires on any attempt to interact while moving', driver: 'physical_state + priority_weight' },
      { id: 'E1', name: 'Confidence Signal', essence: '緊急度推定 78% (Priya からのメッセージ 3/5 が緊急)', driver: 'L2.pattern + L3.now' },
    ],

    intentTest: {
      enabled: true,
      text: 'A standard Slack notification would display a banner on CarPlay or allow voice dictation. The framework reads <em>Physical State = 60km/h · L1 = no text while moving · Priority Weight = Safety > Work</em> and <strong>transforms the surface to audio-only</strong>: one brief voice announcement ("Priya — production alert — urgent. You can respond in 6 minutes after drop-off."), locks the screen to maps, and fires D6 on any interaction attempt. The children in the backseat are also Social Exposure — the message is not read aloud in full.',
    },

    ui: {
      title: 'Priya — 緊急 · Production アラート',
      uiScreen: '../../ui-screens/p1-v2/s9a-carplay-composite.html',
      hint: '走行中 · 音声のみ · 停車後に全文を表示',
      cards: [
        { id: 'audio-summary',   title: '音声通知済み: Priya より緊急アラート · 6分後に返信可能',      prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'A1 · Form Factor Transform',  highlighted: true,  image: null },
        { id: 'urgency-signal',  title: '緊急度推定 78% — Priya からの過去メッセージ 3/5 が緊急',     prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'E1 · Confidence Signal',      highlighted: false, image: null },
        { id: 'on-call-note',    title: 'Priya は一次オンコール担当 · 最初の15分は自律対応可能',     prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Brain L2 · 対応パターン',      highlighted: false, image: null },
      ],
    },
  };

  // ─── Context toggle definitions ───
  const toggles = [
    {
      id: 'car-stopped',
      label: '駐車場に停車した',
      sub: '速度 0km/h · 学校駐車場',
      category: 'physical',
      mutate: (s) => ({
        ...s,
        intent: {
          ...s.intent,
          meta: 'Kiran · parked · Tuesday 08:19 · school car park · kids dropped',
          shape: 'transition context · parked · work urgency now addressable',
        },
        tokens: {
          ...s.tokens,
          physical_state: {
            ...s.tokens.physical_state,
            value: 'Parked · school car park · 0km/h',
            signal: 'GPS speed: 0km/h · engine idling · CarPlay still connected',
            firing: false,
          },
          cognitive_load: {
            ...s.tokens.cognitive_load,
            value: 'Normal · kids dropped · focused on Slack',
            signal: 'primary task complete · attention now on phone available',
            firing: false,
          },
          social_exposure: {
            ...s.tokens.social_exposure,
            value: 'Solo · kids at school',
            signal: 'children no longer in vehicle · private context restored',
            firing: false,
          },
          form_factor: {
            ...s.tokens.form_factor,
            value: 'CarPlay + Phone screen · visual enabled',
            signal: 'parked: visual lock lifted · phone interaction permitted',
            firing: true,
          },
          autonomy_dial: {
            ...s.tokens.autonomy_dial,
            value: 'Suggest (work domain restored)',
            signal: 'driving context ended · work domain autonomy level resumes',
            firing: false,
          },
        },
        brain: {
          ...s.brain,
          L3: [
            { entry: 'Parked at school 08:19. Drop-off complete. Slack message now 7 min old. Production down since 08:12.', highlight: true, weight: 'now' },
            ...s.brain.L3.slice(1),
          ],
        },
        rules: [
          { name: 'parked-visual-restored', drivers: ['physical_state', 'form_factor'], output: 'visual lock lifted: full Slack message now displayed on CarPlay + phone' },
          { name: 'work-urgency-surface', drivers: ['priority_weight', 'L3.now'], output: 'production incident timeline shown: 08:12 start, 7 min elapsed, Priya actions so far' },
          ...s.rules.slice(2),
        ],
        axPatterns: [
          { id: 'A1', name: 'Form Factor Transform', essence: '音声のみ → 視覚復帰: 停車で画面ロック解除', driver: 'physical_state' },
          { id: 'E1', name: 'Confidence Signal', essence: 'Priya は 7 分間対応中 · 503 エラー継続中', driver: 'L3.now + L2.pattern' },
        ],
        ui: {
          ...s.ui,
          title: '停車 — Slack 全文を表示',
          hint: '駐車場に停車。CarPlay + スマホ画面 両方が解放されました。',
          cards: [
            { id: 'slack-full',      title: 'Priya: "checkout 503 since 08:12 · 3 retries failed · need you"',    prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Slack 全文表示',              highlighted: true,  image: null },
            { id: 'incident-thread', title: 'Production incident open 7 min · Priya 一次対応中 · ログ添付',     prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Incident thread',              highlighted: false, image: null },
            { id: 'reply-now',       title: 'CarPlay で返信する / 電話をかける',                                 prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: '視覚解放 · 返信可能',          highlighted: false, image: null },
          ],
        },
      }),
    },
    {
      id: 'autonomy-auto',
      label: '自動返信モード (Auto)',
      sub: 'Autonomy Dial = Auto · 仕事ドメイン',
      category: 'constraint',
      mutate: (s) => ({
        ...s,
        tokens: {
          ...s.tokens,
          autonomy_dial: {
            ...s.tokens.autonomy_dial,
            value: 'Auto · work domain',
            signal: 'user set Auto for Slack work domain 2 weeks ago',
            firing: true,
          },
        },
        brain: {
          ...s.brain,
          L2: [
            { entry: 'Auto mode for work Slack: active 2 weeks. AI has composed 9 holding replies. 8 of 9 accepted without edit.', highlight: true, weight: 'pattern' },
            { entry: 'Standard driving holding reply: "On school run, back in 10 min. Priya — you\'re primary, go ahead." — used 3 times.', highlight: true, weight: 'pattern' },
            ...s.brain.L2.slice(2),
          ],
          L3: [
            { entry: 'Auto mode active. Draft reply composed: "On school run (08:15–08:25). Priya — you\'re primary, handle first 15 min. I\'ll be on at 08:27." Awaiting confirm or auto-send at 08:25.', highlight: true, weight: 'now' },
            ...s.brain.L3.slice(1),
          ],
        },
        rules: [
          { name: 'auto-draft-holding-reply', drivers: ['autonomy_dial', 'L2.pattern'], output: 'AI composes standard holding reply · sends at 08:25 after school drop (or confirm now)' },
          { name: 'driving-safety-still-active', drivers: ['physical_state', 'L1.identity'], output: 'even in Auto: driving safety rule = no interaction while moving. Auto send deferred to 08:25.' },
          { name: 'd6-confirm-before-auto-send', drivers: ['autonomy_dial', 'cognitive_load'], output: 'D6 still fires for first Auto send in this context: confirm the draft before it goes' },
          ...s.rules.slice(2),
        ],
        axPatterns: [
          { id: 'D6', name: 'Dynamic Friction', essence: 'Auto draft ready · confirm before first send in driving context', driver: 'autonomy_dial + physical_state' },
          { id: 'D1', name: 'Approval Gate', essence: '下書きを確認: "Priya — 08:25に返信します" · 送信 or 編集', driver: 'autonomy_dial' },
          { id: 'A1', name: 'Form Factor Transform', essence: '走行中はAutoでも送信保留 · 停車後に自動送信', driver: 'physical_state + autonomy_dial' },
        ],
        ui: {
          ...s.ui,
          title: 'Auto 下書き — 送信確認',
          hint: 'Auto モードでも、走行中の送信は 08:25 停車後まで保留されます。',
          cards: [
            { id: 'auto-draft',     title: 'AI 下書き: "送迎中 (〜08:25)。Priya、一次対応お願い。08:27 に戻ります。"', prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'Auto · 下書き確認待ち',  highlighted: true,  image: null },
            { id: 'auto-send-eta',  title: '自動送信 予定: 08:25 (学校到着後)',                                         prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: '走行中 送信保留',       highlighted: false, image: null },
            { id: 'edit-draft',     title: '下書きを編集する',                                                          prepMin: 0, priceJpy: 0, kcal: 0, allergens: [], tag: 'D1 · 編集 or 承認',     highlighted: false, image: null },
          ],
        },
      }),
    },
  ];

  // ─── Device variations ───
  const devices = [
    {
      id: 'carplay',
      label: 'CarPlay · ダッシュボード',
      sub: '走行中 · 音声のみ · マップ表示',
      density: 'minimal',
      maxCards: 1,
      control: 'voice only · no touch while moving',
      anchorHint: '音声通知のみ · 停車まで待機',
      drops: ['text', 'full Slack message', 'reply input'],
    },
    {
      id: 'watch',
      label: 'Apple Watch · 手首',
      sub: '触覚 · 緊急度確認のみ',
      density: 'minimal',
      maxCards: 1,
      control: 'glance only',
      anchorHint: '緊急 · 6分後に確認',
      drops: ['message content', 'actions'],
    },
    {
      id: 'phone',
      label: 'iPhone · ポケット内',
      sub: '走行中 ロック · 停車後 解放',
      density: 'compact',
      maxCards: 3,
      control: 'locked during driving · thumb post-park',
      anchorHint: '停車後にフル表示',
      drops: ['interaction while moving'],
    },
  ];

  return { defaultState, toggles, devices };
})();
