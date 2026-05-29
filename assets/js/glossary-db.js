// assets/js/glossary-db.js
// Single source of truth for Context Grammar bilingual glossary database.
// Aligned with Global_Assets/CONTEXT_GRAMMAR_TERMS.md
(function (root) {
  'use strict';

  var GLOSSARY_DB = [
    // 1. Context Brain
    {
      id: "identity-layer",
      category: "brain",
      tags: ["memory", "brain"],
      name: {
        en: "Context Brain · Level 1 — Identity Layer",
        ja: "Context Brain · レベル1 — Identity Layer（アイデンティティ・レイヤー）"
      },
      shortName: {
        en: "Identity Layer",
        ja: "Identity Layer"
      },
      definition: {
        en: "Holds persistent, rarely-changing facts about a person, such as names, pronouns, allergies, languages, and family structure.",
        ja: "名前、代名詞、アレルギー、使用言語、家族構成など、めったに変更されない個人に関する普遍的な事実を保持します。"
      },
      metaphor: {
        en: "The reservation book at a restaurant. 'Mr. Umehara — nut allergy, 2 children, anniversary in March.' Written once, updated rarely, referenced every visit.",
        ja: "レストランのご予約台帳。「梅原様：ナッツアレルギー、子供2人、3月に結婚記念日」。一度書かれたら滅多に更新されず、毎回の来店時に参照されます。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "layers",
      seeAlso: ["learning-layer", "now-layer", "home-brain"]
    },
    {
      id: "learning-layer",
      category: "brain",
      tags: ["memory", "brain"],
      name: {
        en: "Context Brain · Level 2 — Learning Layer",
        ja: "Context Brain · レベル2 — Learning Layer（ラーニング・レイヤー）"
      },
      shortName: {
        en: "Learning Layer",
        ja: "Learning Layer"
      },
      definition: {
        en: "Holds behavioral patterns and habits accumulated over time, such as Monday pickup rhythms, Friday tiredness, or past tradeoffs.",
        ja: "月曜日の送迎リズム、金曜日の疲労度、過去のトレードオフの選択など、行動観察から蓄積されたパターンや習慣を保持します。"
      },
      metaphor: {
        en: "The waiter's memory. Not written down. Built from repetition. 'Last week the salmon was a hit.' 'Fridays, they're tired — keep it light.' Sometimes wrong, but getting better.",
        ja: "ベテラン給仕の頭の中の記憶。書き留められてはいないが、反復によって形成。「先週はサーモンが好評だった」「金曜は皆様お疲れだから、軽めの提案をしよう」。たまに外れるが、徐々に精度が上がる。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "layers",
      seeAlso: ["identity-layer", "now-layer", "ambient-absorption"]
    },
    {
      id: "now-layer",
      category: "brain",
      tags: ["memory", "brain"],
      name: {
        en: "Context Brain · Level 3 — Now Layer",
        ja: "Context Brain · レベル3 — Now Layer（ナウ・レイヤー）"
      },
      shortName: {
        en: "Now Layer",
        ja: "Now Layer"
      },
      definition: {
        en: "Holds dynamic, real-time values from the 6 Situation Signals and 2 Relationship Dials, such as cognitive load, physical posture, surrounding company, and immediate feasibility.",
        ja: "コグニティブ・ロード（認知負荷）、身体的姿勢、周囲の同伴者、リアルタイムの実現可能性など、6つのSituation Signalsと2つのRelationship Dialsからの動的な実数値を保持します。"
      },
      metaphor: {
        en: "The waiter's instant observation. 'They're rushing today.' 'They brought a child.' 'They look stressed.' No history needed, just open eyes in the moment.",
        ja: "給仕の瞬間的な観察。「今日は急いでいらっしゃるようだ」「お子様を連れてこられた」「お疲れのようだ」。歴史は不要、ただその瞬間の状況を目を開いて捉えること。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "now",
      seeAlso: ["identity-layer", "learning-layer", "context-tokens"]
    },

    // 2. Context Tokens & Dials
    {
      id: "context-tokens",
      category: "tokens",
      tags: ["tokens", "pipeline"],
      name: {
        en: "Context Tokens",
        ja: "Context Tokens（コンテキスト・トークン）"
      },
      shortName: {
        en: "Tokens",
        ja: "Tokens"
      },
      definition: {
        en: "The active signals that feed the Now Layer, consisting of 6 situation tokens and 2 relationship dials. Formerly referred to as 'Grammar'.",
        ja: "ナウ・レイヤーにリアルタイム信号を供給する動的データ群。6つの「Situation Tokens」と2つの「Relationship Dials」で構成されます。旧称「Grammar（文法）」。"
      },
      metaphor: {
        en: "The sensor readings from the dining room — the temperature of the table, the speed at which glasses are emptied, and the volume of conversation.",
        ja: "ダイニングルームのセンサー値。テーブルの温度、グラスが空く速度、会話のボリュームといった「今起こっていること」の信号。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "",
      seeAlso: ["situation-tokens", "relationship-dials", "now-layer"]
    },
    {
      id: "physical-state",
      category: "tokens",
      tags: ["tokens", "situation"],
      name: {
        en: "Physical State",
        ja: "フィジカル・ステート（身体・デバイス姿勢）"
      },
      shortName: {
        en: "Physical State",
        ja: "Physical State"
      },
      definition: {
        en: "Situation token indicating current body/device posture (e.g., driving, hands full, walking, baby on hip).",
        ja: "現在の身体およびデバイスの姿勢（例：運転中、両手が塞がっている、歩行中、赤ちゃんを抱っこしている等）を表す状況トークン。"
      },
      metaphor: {
        en: "Whether the guest is standing at the high bar or seated in a deep lounge chair with their hands free.",
        ja: "お客様が立ち飲みバーで立っているか、それとも両手が自由な状態で深いラウンジチェアに座っているか。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-physical-state",
      seeAlso: ["context-tokens", "form-factor"]
    },
    {
      id: "cognitive-load",
      category: "tokens",
      tags: ["tokens", "situation"],
      name: {
        en: "Cognitive Load",
        ja: "コグニティブ・ロード（認知負荷）"
      },
      shortName: {
        en: "Cognitive Load",
        ja: "Cognitive Load"
      },
      definition: {
        en: "Estimate of remaining mental attention, calculated from time of day, calendar density, and recent activity (not direct biometric measurement).",
        ja: "残されている精神的注意（アテンション）の推定値。時間帯、カレンダーの過密度、直近の活動から推測され、直接的な生体測定は行いません。"
      },
      metaphor: {
        en: "How busy the guest's mind is. A guest reviewing a legal contract on their laptop has high cognitive load; a guest staring blankly out the window has low load.",
        ja: "お客様の頭の忙しさ。ノートPCで契約書をレビューしている客は認知負荷が極めて高く、窓の外をぼーっと眺めている客は認知負荷が低い。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-cognitive-load",
      seeAlso: ["context-tokens", "silent-resolution"]
    },
    {
      id: "social-exposure",
      category: "tokens",
      tags: ["tokens", "situation"],
      name: {
        en: "Social Exposure",
        ja: "ソーシャル・エクスポージャー（社会的露出度）"
      },
      shortName: {
        en: "Social Exposure",
        ja: "Social Exposure"
      },
      definition: {
        en: "Who might see or hear the interface output (e.g., alone, with family, in public, during a shared screen session).",
        ja: "インターフェースの出力（表示や音声）が誰に見られたり聞かれたりする可能性があるか（例：一人、家族と同席、公共の場、画面共有中）。"
      },
      metaphor: {
        en: "Whether the guest is in a private dining room (low exposure) or sitting at a crowded communal table in the center of the restaurant (high exposure).",
        ja: "個室にいるか（露出度：低）、それともレストラン中央の混雑した共同テーブルに座っているか（露出度：高）。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-social-exposure",
      seeAlso: ["context-tokens", "preview-redaction"]
    },
    {
      id: "priority-weight",
      category: "tokens",
      tags: ["tokens", "situation"],
      name: {
        en: "Priority Weight",
        ja: "プライオリティ・ウェイト（優先度・緊急度）"
      },
      shortName: {
        en: "Priority Weight",
        ja: "Priority Weight"
      },
      definition: {
        en: "Current urgency mixed with learned tradeoffs to determine task importance (emergency, work task, routine chores).",
        ja: "現在の緊急性と、学習されたトレードオフのバランスによって決定されるタスクの重要度（緊急事態、仕事、日常の雑事）。"
      },
      metaphor: {
        en: "The urgency of the call. An emergency at home is a fire; checking the sports score is a routine break.",
        ja: "用事の差し迫り度。自宅での緊急事態は「火事（即座の介入）」であり、スポーツのスコア確認は「日常の休憩（後回し可）」。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-priority-weight",
      seeAlso: ["context-tokens", "care-architecture"]
    },
    {
      id: "form-factor",
      category: "tokens",
      tags: ["tokens", "situation"],
      name: {
        en: "Form Factor",
        ja: "フォーム・ファクター（デバイス形態）"
      },
      shortName: {
        en: "Form Factor",
        ja: "Form Factor"
      },
      definition: {
        en: "The device surface currently receiving or active (phone, car, TV, fridge, watch, earbud).",
        ja: "現在受信中またはアクティブなデバイスの形態（スマホ、車載ディスプレイ、テレビ、スマート冷蔵庫、スマートウォッチ、イヤホン）。"
      },
      metaphor: {
        en: "The serving dish. You don't serve a rich hot soup in a shallow flat plate, nor a large steak in a tiny espresso cup. The dish determines how the food is presented.",
        ja: "料理を盛り付ける「お皿」。平たいお皿に熱々のスープを並々注いだり、エスプレッソカップに巨大なステーキを詰め込んだりはしない。器が表現形式を決める。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-form-factor",
      seeAlso: ["context-tokens", "surface-vocabulary"]
    },
    {
      id: "feasibility",
      category: "tokens",
      tags: ["tokens", "situation"],
      name: {
        en: "Feasibility",
        ja: "フィージビリティ（実行可能性）"
      },
      shortName: {
        en: "Feasibility",
        ja: "Feasibility"
      },
      definition: {
        en: "Checks if a proposed action is physically possible right now (e.g., stock on hand, remaining battery, time left, network strength).",
        ja: "提案されたアクションが今この瞬間に物理的に可能かどうか（例：在庫があるか、バッテリー残量、残り時間、通信環境）。"
      },
      metaphor: {
        en: "Whether the kitchen actually has the fresh ingredients in stock and enough time to cook before the guest's train departs.",
        ja: "キッチンに新鮮な食材の在庫が本当にあるか、そして客の電車の出発時間までに調理が間に合う時間が残されているか。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-feasibility",
      seeAlso: ["context-tokens", "live-recomposition"]
    },
    {
      id: "autonomy-dial",
      category: "tokens",
      tags: ["dials", "relationship"],
      name: {
        en: "Autonomy Dial",
        ja: "オートノミー・ダイヤル（自律決定ダイヤル）"
      },
      shortName: {
        en: "Autonomy Dial",
        ja: "Autonomy Dial"
      },
      definition: {
        en: "Specifies how independently the AI acts in a specific domain. Graduated into 4 levels: Suggest → Confirm → Notify → Auto. Controlled by a balance of system defaults, active user adjustments, and learning algorithms.",
        ja: "特定のドメインでAIがどの程度自律的に行動するかを規定します。4つの段階（Suggest【提案】 → Confirm【確認】 → Notify【事後通知】 → Auto【完全自動】）に分かれ、システム初期値、ユーザーの明示的変更、AI学習の3つの力で調整されます。"
      },
      metaphor: {
        en: "How much authority you give the waiter. 'Suggest': Suggest a wine. 'Confirm': Pour a glass after asking. 'Notify': Open a bottle and tell you. 'Auto': Keep the glass filled all night without a word.",
        ja: "給仕に与える「権限」。【Suggest】ワインを勧めてもらう。【Confirm】「お注ぎしてよろしいですか」と聞いて注いでもらう。【Notify】栓を開けて「開けました」と報告。【Auto】何も言わずに一晩中グラスを満たし続ける。"
      },
      targetPath: "context-grammar/dials/index.html",
      anchor: "autonomy",
      seeAlso: ["disclosure-dial", "trust-timeline", "approval-gate"]
    },
    {
      id: "disclosure-dial",
      category: "tokens",
      tags: ["dials", "relationship"],
      name: {
        en: "Disclosure Dial",
        ja: "ディスクロージャー・ダイヤル（情報開示ダイヤル）"
      },
      shortName: {
        en: "Disclosure Dial",
        ja: "Disclosure Dial"
      },
      definition: {
        en: "Controls the boundaries of what the AI is allowed to learn (Intake) and what it is allowed to say (Share). The logical prerequisite for the Autonomy Dial.",
        ja: "AIが個人について学習してよい範囲（インテイク）と、それを誰かに伝えてよい範囲（シェア）の境界線を制御します。自律決定（Autonomy）を機能させるための論理的な前提条件です。"
      },
      metaphor: {
        en: "The boundary rules. The guest tells the kitchen about their diet, but explicitly forbids the waiter from announcing it to other tables.",
        ja: "情報の境界線ルール。厨房には自分のアレルギーや健康状態を伝えるが、給仕がそれを他のテーブルに聞こえるように大声で話すことは明確に禁止する。"
      },
      targetPath: "context-grammar/dials/index.html",
      anchor: "disclosure",
      seeAlso: ["intake-disclosure", "share-disclosure", "autonomy-dial"]
    },
    {
      id: "intake-disclosure",
      category: "tokens",
      tags: ["dials", "relationship"],
      name: {
        en: "Intake Disclosure (Disclosure Dial · Axis 1)",
        ja: "インテイク・ディスクロージャー（情報取り込み管理 · 軸1）"
      },
      shortName: {
        en: "Intake Disclosure",
        ja: "Intake Disclosure"
      },
      definition: {
        en: "Axis 1 of the Disclosure Dial controlling how much information the AI is allowed to absorb and record about the user per domain (none / minimal / moderate / full).",
        ja: "開示ダイヤルの第1軸。AIが特定のドメインにおいてユーザーについて「取り込んで記憶してよい」情報量を制御します（無 / 最小 / 中程度 / 完全）。"
      },
      metaphor: {
        en: "What the waiter is allowed to write down in the permanent reservation guest book versus what they must forget immediately.",
        ja: "給仕が常連客用の「顧客台帳」に書き留めることを許されている内容（恒久記憶）と、その場限りで忘れるべき内容の境界。"
      },
      targetPath: "context-grammar/dials/index.html",
      anchor: "disclosure",
      seeAlso: ["disclosure-dial", "share-disclosure"]
    },
    {
      id: "share-disclosure",
      category: "tokens",
      tags: ["dials", "relationship"],
      name: {
        en: "Share Disclosure (Disclosure Dial · Axis 2)",
        ja: "シェア・ディスクロージャー（情報共有管理 · 軸2）"
      },
      shortName: {
        en: "Share Disclosure",
        ja: "Share Disclosure"
      },
      definition: {
        en: "Axis 2 of the Disclosure Dial controlling who the AI is allowed to tell about the user's data (per recipient × per domain). Independent of but limited by Intake Disclosure.",
        ja: "開示ダイヤルの第2軸。AIが収集したユーザーの情報を「誰に伝えてよいか」を制御します（宛先別 × ドメイン別）。インテイク開示によって制限されます。"
      },
      metaphor: {
        en: "The waiter knowing a guest's preference for quiet tables, but not disclosing to their business associate that they requested the corner seat to avoid them.",
        ja: "給仕は客が静かな席を好むことを知っているが（インテイク）、同席するビジネスパートナーに対して「あなたを避けるために角の席を指定されました」とは言わない（シェア制御）。"
      },
      targetPath: "context-grammar/dials/index.html",
      anchor: "disclosure",
      seeAlso: ["disclosure-dial", "intake-disclosure", "disclosure-matrix"]
    },

    // 3. Substitution Modes
    {
      id: "exact-mode",
      category: "modes",
      tags: ["substitution", "modes"],
      name: {
        en: "Substitution Mode · Exact",
        ja: "Substitution Mode · Exact（完全一致モード）"
      },
      shortName: {
        en: "Exact",
        ja: "Exact"
      },
      definition: {
        en: "Substitution mode requiring this exact brand, product, or specification — no variations allowed.",
        ja: "このブランド、この製品、またはこの仕様でなければならないという、代替を一切許容しない代入モード。"
      },
      metaphor: {
        en: "Ordering Coca-Cola Classic. No Pepsi, no Diet Coke, no off-brand cola. Exactly this.",
        ja: "「コカ・コーラ クラシック」の注文。ペプシも、ダイエットコークも、プライベートブランドのコーラも不可。まさにこれ。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-feasibility",
      seeAlso: ["flexible-mode", "exploring-mode", "surprise-mode"]
    },
    {
      id: "flexible-mode",
      category: "modes",
      tags: ["substitution", "modes"],
      name: {
        en: "Substitution Mode · Flexible",
        ja: "Substitution Mode · Flexible（柔軟代替モード）"
      },
      shortName: {
        en: "Flexible",
        ja: "Flexible"
      },
      definition: {
        en: "Substitution mode accepting any product/brand in the same category that satisfies predefined criteria (e.g., any high-protein Greek yogurt).",
        ja: "あらかじめ定義された基準（例：高タンパクなギリシャヨーグルト）を満たすものであれば、同じカテゴリ内のどの製品やブランドでも受け入れるモード。"
      },
      metaphor: {
        en: "Asking for Greek Yogurt. Fage is fine, Chobani is fine, as long as it is unsweetened and high-protein.",
        ja: "「ギリシャヨーグルト」の注文。砂糖不使用で高タンパクであれば、特定のメーカーでなくても構わない。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-feasibility",
      seeAlso: ["exact-mode", "exploring-mode", "surprise-mode"]
    },
    {
      id: "exploring-mode",
      category: "modes",
      tags: ["substitution", "modes"],
      name: {
        en: "Substitution Mode · Exploring",
        ja: "Substitution Mode · Exploring（探索開拓モード）"
      },
      shortName: {
        en: "Exploring",
        ja: "Exploring"
      },
      definition: {
        en: "Substitution mode signaling a desire to try new products or variations within a domain for discovery.",
        ja: "新しい製品やドメイン内でのバリエーションに挑戦し、未知の「お気に入り」を見つけるための探索モード。"
      },
      metaphor: {
        en: "Asking the waiter for their newest craft beer recommendation on tap because you want to try something you've never had.",
        ja: "「タップにある、飲んだことのないクラフトビールを何かおすすめしてください」と給仕に頼むこと。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-feasibility",
      seeAlso: ["exact-mode", "flexible-mode", "surprise-mode"]
    },
    {
      id: "surprise-mode",
      category: "modes",
      tags: ["substitution", "modes"],
      name: {
        en: "Substitution Mode · Surprise",
        ja: "Substitution Mode · Surprise（おまかせ/サプライズモード）"
      },
      shortName: {
        en: "Surprise",
        ja: "Surprise"
      },
      definition: {
        en: "Substitution mode delegating product choice entirely to the AI, allowing it to choose something unexpected but aligned with learned long-term tastes.",
        ja: "製品の選択をAIに完全におまかせし、意外性はあるもののユーザーの長期的な好みにしっかりと沿ったものを選択させるモード。"
      },
      metaphor: {
        en: "'Omakase' at a sushi bar. You don't know what fish is coming, but you trust the chef's knowledge of what tastes fresh and what you love.",
        ja: "寿司屋の「おまかせ」。どんなネタが出てくるかは分からないが、大将の目利きと自分の好みを信じてすべてを委ねること。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "dd-feasibility",
      seeAlso: ["exact-mode", "flexible-mode", "exploring-mode"]
    },

    // 4. Disposable Brain
    {
      id: "disposable-brain",
      category: "brain",
      tags: ["brain", "memory"],
      name: {
        en: "Disposable Brain",
        ja: "Disposable Brain（使い捨てコンテキスト脳）"
      },
      shortName: {
        en: "Disposable Brain",
        ja: "Disposable Brain"
      },
      definition: {
        en: "A temporary Brain instance with a clear lifecycle. Born with a purpose (e.g., a trip, a move), learns inside that context, returns valuable distilled insights to the Home Brain upon completion, and dissolves.",
        ja: "明確なライフサイクル（誕生 → 学習 → 還元 → 溶解）を持つ、一時的なContext Brainインスタンス。旅行や引っ越しなどの特定の目的のために生成され、終了時に成果を本尊のHome Brainへ還元して消滅します。"
      },
      metaphor: {
        en: "A custom birthday party plan. Extra staff, custom decorations, special menu. Prepared only for that night. When it ends, the decorations come down, but the memory that 'Mr. Umehara held a successful party' remains with the restaurant.",
        ja: "ある一晩のための「誕生日会の特設プラン」。特別メニュー、追加スタッフ、装飾。その夜が終われば片付けられますが、「梅原様が素晴らしいパーティーを催した」という記憶の核心は、レストランの永久顧客情報に還流されます。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "disposable",
      seeAlso: ["home-brain", "temporal-handoff"]
    },
    {
      id: "disposable-inherited",
      category: "brain",
      tags: ["brain", "memory"],
      name: {
        en: "Disposable Brain · Level 1 — Inherited Layer",
        ja: "Disposable Brain · レベル1 — Inherited Layer（継承レイヤー）"
      },
      shortName: {
        en: "Inherited Layer",
        ja: "Inherited Layer"
      },
      definition: {
        en: "What the Home Brain handed over at birth — static preferences, allergies, budgets, family habits, travel-stamina patterns.",
        ja: "使い捨て脳が誕生した瞬間に、実家のHome Brainから引き継ぐ情報。基本的なアレルギー、予算、家族の習慣、旅行時の体力パターンなど。"
      },
      metaphor: {
        en: "The reservation briefing handed to the temporary pop-up chef before service. 'Party of 4. Nut allergy. Kids get tired after 3 PM.' Written beforehand by someone else.",
        ja: "臨時ポップアップレストランのシェフに渡される「引き継ぎシート」。「4名様、アレルギーあり、子供は15時過ぎに疲れる」。事前に別の人が書いたもの。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "disposable",
      seeAlso: ["disposable-brain", "identity-layer"]
    },
    {
      id: "disposable-trip-learning",
      category: "brain",
      tags: ["brain", "memory"],
      name: {
        en: "Disposable Brain · Level 2 — Trip Learning Layer",
        ja: "Disposable Brain · レベル2 — Trip Learning Layer（旅行学習レイヤー）"
      },
      shortName: {
        en: "Trip Learning Layer",
        ja: "Trip Learning Layer"
      },
      definition: {
        en: "Patterns observed and learned during this specific temporary context (e.g., 'Kai discovered a love for ramen on Day 2', 'Mia loved the craft workshop').",
        ja: "この一時的な活動期間中（例：旅行中）に新しく学習されたパターン。「カイが2日目にラーメンの美味さに目覚めた」「ミアは工芸ワークショップを非常に気に入った」など。"
      },
      metaphor: {
        en: "The waiter's notepad for this table tonight. 'They sent the miso back — too salty.' 'The kid loved the tempura.' Kept as service notes to guide the next courses during the night.",
        ja: "今夜のこのテーブル専属の給仕のメモ。「お味噌汁がしょっぱくてお戻しされた」「お子様が天ぷらで笑顔になった」。今夜の次の料理の出し方に活かすためのリアルタイム学習。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "disposable",
      seeAlso: ["disposable-brain", "learning-layer", "temporal-handoff"]
    },
    {
      id: "disposable-today",
      category: "brain",
      tags: ["brain", "memory"],
      name: {
        en: "Disposable Brain · Level 3 — Today Layer",
        ja: "Disposable Brain · レベル3 — Today Layer（トゥデイ・レイヤー）"
      },
      shortName: {
        en: "Today Layer",
        ja: "Today Layer"
      },
      definition: {
        en: "Dynamic data true only for this specific day: today's itinerary, immediate weather, live budget remaining, who has a cold this morning.",
        ja: "今日この日一日だけに適用される動的情報。今日の旅行行程、天気、残予算、今朝風邪気味なメンバーがいるかどうかなど。"
      },
      metaphor: {
        en: "The waiter's glance at the table this very moment. 'They just sat down. It is raining outside. The kid looks sleepy.' Erased when the table leaves.",
        ja: "今この瞬間のテーブルへの給仕の目配せ。「席に着いたばかり」「外は土砂降り」「お子様が眠たそう」。お客様が帰れば消去される極めて短期的なシグナル。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "disposable",
      seeAlso: ["disposable-brain", "now-layer"]
    },

    // 5. Brain Variations & Orchestration
    {
      id: "home-brain",
      category: "brain",
      tags: ["brain", "memory"],
      name: {
        en: "Home Brain",
        ja: "Home Brain（ホーム・ブレイン）"
      },
      shortName: {
        en: "Home Brain",
        ja: "Home Brain"
      },
      definition: {
        en: "The permanent, core Context Brain for a household, persisting across years and consolidating insights returned by temporary Disposable Brains.",
        ja: "家族全体の永続的・中核的なContext Brain。何年にもわたって持続し、一時的な「Disposable Brains」が持ち帰った学習結果を統合・蓄積します。"
      },
      metaphor: {
        en: "The master cookbook and history files kept securely in the restaurant's home office vault.",
        ja: "レストラン本部の金庫に大切に保管されている、門外不出の「マスター秘伝レシピ集」と「全常連客の歴史カルテ」。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "home-system",
      seeAlso: ["disposable-brain", "identity-layer"]
    },
    {
      id: "org-brain",
      category: "brain",
      tags: ["brain", "enterprise"],
      name: {
        en: "Org Brain",
        ja: "Org Brain（組織脳）"
      },
      shortName: {
        en: "Org Brain",
        ja: "Org Brain"
      },
      definition: {
        en: "The company-level persistent memory structure. Identity Layer holds mission/pillars; Learning Layer holds decisions patterns; Now Layer holds today's live signals (meetings, sprint state).",
        ja: "企業・組織レベルの永続的なメモリ構造。Identity Layerにミッションや基本方針、Learning Layerに実際の意思決定パターン、Now Layerに今日の会議や進行状態などの動的シグナルを保持します。"
      },
      metaphor: {
        en: "The restaurant group's collective knowledge base. Not stored in one chef's head, but documented as kitchen training systems, supplier relationships, and operational rhythms.",
        ja: "個人店主の頭の中ではなく、グループ全体で共有されている「オペレーションマニュアル、仕入れ先リスト、土曜の混雑への対応ノウハウ」。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["brand-brain", "project-brain"]
    },
    {
      id: "brand-brain",
      category: "brain",
      tags: ["brain", "enterprise"],
      name: {
        en: "Brand Brain",
        ja: "Brand Brain（ブランド脳）"
      },
      shortName: {
        en: "Brand Brain",
        ja: "Brand Brain"
      },
      definition: {
        en: "A specialized Identity Layer holding brand rules, visual voice, guidelines, and target persona rules to allow queryable, on-brand AI generation without manual prompts.",
        ja: "ブランドの声、デザイン原則、ペルソナ規律などを格納した専門ブレイン。人間が毎回指示書を貼り付けなくても、AIが自動的にこのブランドルールを遵守した成果物を生成できるようにします。"
      },
      metaphor: {
        en: "The recipe binder labeled 'This is how we plate.' Internalized kitchen standards that guide a new line chef on their very first day.",
        ja: "厨房の壁に貼られた「これが我々の盛り付けだ」という写真付きバインダー。新人のシェフが入った初日から、お店の味と見た目を守らせるための暗黙の規律。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["org-brain", "intent-shared-workflow"]
    },
    {
      id: "research-brain",
      category: "brain",
      tags: ["brain", "enterprise"],
      name: {
        en: "Research Brain",
        ja: "Research Brain（リサーチ脳）"
      },
      shortName: {
        en: "Research Brain",
        ja: "Research Brain"
      },
      definition: {
        en: "Consolidates user research (interviews, surveys, usability findings) into a queryable layer, rather than flat presentation slides.",
        ja: "ユーザーインタビュー、アンケート、操作性調査の結果などを、単なるスライド保管庫としてではなく、AIが「何が問題だったか」を直接引き出せる対話型レイヤーとして統合します。"
      },
      metaphor: {
        en: "The head waiter's diary of guest reactions. 'Table 4 always asks for less salt.' 'Parties of 6 never finish the chocolate tart.' Consulted before the menu is printed.",
        ja: "給仕長が書き溜めている「顧客反応ノート」。「4番テーブルのお客様は塩分控えめを望む」「6名以上のパーティーはチョコタルトを残しがち」。メニュー改定前に読み返されます。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["org-brain", "knowledge-at-query"]
    },
    {
      id: "project-brain",
      category: "brain",
      tags: ["brain", "enterprise"],
      name: {
        en: "Project Brain",
        ja: "Project Brain（プロジェクト脳）"
      },
      shortName: {
        en: "Project Brain",
        ja: "Project Brain"
      },
      definition: {
        en: "Per-project Context Brain containing static parameters (team, scope), learning trends (how decisions were made), and active sprint items (open threads, blockers). Consolidates back to Org Brain on project close.",
        ja: "各プロジェクト単位のブレイン。目的・スコープ・チーム（Identity）、これまでになされた合意や妥協（Learning）、今日の進捗と課題（Now）を保持し、プロジェクト終了時に組織脳へ統合されます。"
      },
      metaphor: {
        en: "A six-week pop-up concept inside the main restaurant. Runs its own specialized menu and learns its own quirks, then transfers lessons back to the main house kitchen.",
        ja: "本店の片隅で6週間だけ営業する「特設ポップアップ店」。独自のメニューで営業し、そこで得た「この料理が非常にウケた」という知見を営業終了後に本店へと引き継ぎます。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["org-brain", "temporal-handoff"]
    },
    {
      id: "living-meeting-brain",
      category: "brain",
      tags: ["brain", "enterprise"],
      name: {
        en: "Living Meeting Brain",
        ja: "Living Meeting Brain（リビング・ミーティング脳）"
      },
      shortName: {
        en: "Living Meeting Brain",
        ja: "Living Meeting Brain"
      },
      definition: {
        en: "Maintains real-time, interactive, queryable structures of meeting transcripts and action items, allowing users to trace context directly to the decision moment.",
        ja: "会議の書き起こし、意思決定、宿題事項を静的な議事録PDFにせず、リアルタイムに「あの決定の背景は何だった？」と問いかけ、当時の対話の熱量ごと呼び戻せる会話型脳。"
      },
      metaphor: {
        en: "The kitchen huddle that keeps talking after it ends. The transcript isn't filed in a cabinet; it stays in the room ready to answer if you ask 'Wait, why did we swap the soup?'",
        ja: "朝礼の立ち話が、終わった後も部屋の空気に溶けて残っている状態。「ねえ、なんでスープのメニュー替えたんだっけ？」と部屋に話しかけると、当時の熱量で理由を答えてくれる感覚。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["queryable-meeting-archive", "org-brain"]
    },
    {
      id: "intent-fidelity",
      category: "brain",
      tags: ["brain", "enterprise", "metric"],
      name: {
        en: "Intent Fidelity",
        ja: "Intent Fidelity（インテント忠実度）"
      },
      shortName: {
        en: "Intent Fidelity",
        ja: "Intent Fidelity"
      },
      definition: {
        en: "Metric measuring how closely downstream execution (drafts, outputs, designs) aligns with the original Intent declaration. Low scores highlight semantic drift.",
        ja: "下流工程の成果物（ドラフト、デザイン、コード）が、最初に定義された「Intent（意志宣言）」からどの程度ブレていないかを測定する適合性指標。スコアが低いと「本来の意図からズレてきています」とAIが注意喚起します。"
      },
      metaphor: {
        en: "Tasting against the order ticket. The chef tastes the sauce mid-cook and asks, 'Is this still simple and rustic, like the guest requested, or did I drift into over-complicated fine dining?'",
        ja: "伝票との「味見対比」。料理長が調理の途中でソースを舐め、「これは本当にお客様が求めた『シンプルで素朴な味わい』だろうか？ 自分が勝手に凝りすぎて台無しにしていないか？」と自問すること。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["org-brain", "intent-shared-workflow"]
    },
    {
      id: "ambient-absorption",
      category: "brain",
      tags: ["brain", "learning"],
      name: {
        en: "Ambient Absorption",
        ja: "Ambient Absorption（環境的自律吸収）"
      },
      shortName: {
        en: "Ambient Absorption",
        ja: "Ambient Absorption"
      },
      definition: {
        en: "Passive, background ingestion of context from tools, meetings, and shared communication files, updating the Learning Layer without human prompt-engineering.",
        ja: "人間が指示を入力するのではなく、Slack、共有ファイル、会議の音声などの日常の仕事環境から、AIが背景文脈をパッシブ（受動的）に自動吸収してラーニング・レイヤーをアップデートすること。"
      },
      metaphor: {
        en: "The quiet waiter who learns regular customers' quirks simply by showing up and watching the room. They notice which table enjoys privacy and who likes to chat without being briefed.",
        ja: "誰からも説明を受けずとも、ただ毎日フロアに立って見ているだけで「あのお客様は奥の静かな席が好きだ」「あの方は今日お疲れのようだ」と自然に体得していく優秀な無口の給仕。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["learning-layer", "org-brain"]
    },

    // 6. AX Patterns
    {
      id: "silent-resolution",
      category: "ax-patterns",
      tags: ["pattern", "interaction"],
      name: {
        en: "AX Pattern · Silent Resolution",
        ja: "AX Pattern · Silent Resolution（サイレント自動解決）"
      },
      shortName: {
        en: "Silent Resolution",
        ja: "Silent Resolution"
      },
      definition: {
        en: "AI completes routine adjustments and actions silently in the background, only surfacing anomalies or decisions requiring human aesthetic judgment.",
        ja: "日常のルーチン的な調整や定型アクションをAIがバックグラウンドで無言で解決し、人間の審美眼や最終判断が必要な「例外」だけを表舞台に浮上させる設計パターン。"
      },
      metaphor: {
        en: "A flawless kitchen crew. They clean the counters, wash the pots, and replace chipped plates without making a single sound. The diner only sees the beautiful meal, not the dishwashing.",
        ja: "阿吽の呼吸で動く一流キッチンの裏方。彼らは一切音を立てずに調理台を拭き、鍋を洗い、欠けた皿を引っ込める。客が見るのは美しい料理だけであり、皿洗いの騒音ではない。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["autonomy-dial", "approval-gate", "cognitive-load"]
    },
    {
      id: "approval-gate",
      category: "ax-patterns",
      tags: ["pattern", "interaction"],
      name: {
        en: "AX Pattern · Approval Gate",
        ja: "AX Pattern · Approval Gate（承認確認ゲート）"
      },
      shortName: {
        en: "Approval Gate",
        ja: "Approval Gate"
      },
      definition: {
        en: "The interaction structure used when Autonomy Dial is set to 'Confirm'. AI prepares complete options, and the human accepts or rejects with a single tap.",
        ja: "自律決定（Autonomy）ダイヤルが「Confirm」に設定されている際に使用されるUI構造。AIが完成されたドラフトを用意し、人間が1タップで承認・却下できるようにします。"
      },
      metaphor: {
        en: "The sous-chef holding the finished plate up to the head chef before it goes to the dining room. The head chef nods (one tap) or tells them to redo the garnish.",
        ja: "料理がフロアに出る直前、副料理長が料理長に「これでよろしいですか」と皿を見せる瞬間。料理長はただ頷く（1タップで承認）か、「飾り付けをやり直せ」と一言指示する。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["autonomy-dial", "silent-resolution"]
    },
    {
      id: "care-architecture",
      category: "ax-patterns",
      tags: ["pattern", "ui"],
      name: {
        en: "AX Pattern · Care Architecture",
        ja: "AX Pattern · Care Architecture（ケア配慮型構造）"
      },
      shortName: {
        en: "Care Architecture",
        ja: "Care Architecture"
      },
      definition: {
        en: "UI that dynamically collapses competing details to prioritize safety/essential items in critical states (emergency), and manages fairness/balance across stakeholders in normal states.",
        ja: "高負荷時や緊急時には重要性の低いUI要素を大胆に退避させ、最も重要な決定事項のみを提示するケア設計。平常時にはステークホルダー間の公平性（例：兄妹間の体験のバランス）を視覚的に担保します。"
      },
      metaphor: {
        en: "The waiter clearing the entire table instantly when a child spills water. They don't offer dessert menus in that moment — they sweep away the wet linen and secure the safety of the table.",
        ja: "子供がコップの水をこぼした瞬間、給仕がテーブルのすべてを瞬時に脇に押しやって拭き取る行動。その最中にデザートメニューを勧めるような無粋はせず、まずは安全と快適さの回復に全神経を集中させる。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["priority-weight", "live-recomposition"]
    },
    {
      id: "live-recomposition",
      category: "ax-patterns",
      tags: ["pattern", "interaction"],
      name: {
        en: "AX Pattern · Live Recomposition",
        ja: "AX Pattern · Live Recomposition（リアルタイム計画再構成）"
      },
      shortName: {
        en: "Live Recomposition",
        ja: "Live Recomposition"
      },
      definition: {
        en: "Instantly re-sequences and restructures a multi-step plan when real-time factors shift (feasibility drop), presenting cohesive alternatives rather than simple error logs.",
        ja: "旅行中の急な大雨や交通マヒなどの環境変化（Feasibilityの低下）を検知した瞬間、AIが複数のタスクや行程を瞬時に組み替え、破綻のない代替案をワンタップで差し替えるパターン。"
      },
      metaphor: {
        en: "An ingredient running out mid-service. The chef doesn't tell the guest 'Error 404: Duck out of stock.' They seamlessly adjust the tasting menu sequence so the dinner feels perfectly composed from start to finish.",
        ja: "メインの食材が途中で切れてしまった時、客に「在庫エラーです」と冷たく告げるのではなく、シェフが「本日のおすすめ」を別の極上の品に差し替え、コースの全体の流れを一枚の美しい計画として完成させ続けること。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["feasibility", "care-architecture"]
    },
    {
      id: "temporal-handoff",
      category: "ax-patterns",
      tags: ["pattern", "memory"],
      name: {
        en: "AX Pattern · Temporal Handoff",
        ja: "AX Pattern · Temporal Handoff（時間的メモリ移行）"
      },
      shortName: {
        en: "Temporal Handoff",
        ja: "Temporal Handoff"
      },
      definition: {
        en: "Upon closure of a temporary Disposable Brain, selectively filters and returns distilled core insights back to the permanent Home Brain while dissolving redundant details.",
        ja: "「使い捨て脳」の活動期間が終わった際に、ノイズとなる日々の詳細なログ（いつ寝たか、何を買ったかなど）は破棄し、蒸留された核心的学び（カイはラーメンが好き、工芸に興味あり）だけを永続的なHome Brainに還元して引き継ぐパターン。"
      },
      metaphor: {
        en: "The temporary pop-up chef packing up their tools after a 3-week event. They throw away the empty cans, but transfer the list of guests who loved their specialized vinegar sauce to the home restaurant master book.",
        ja: "3週間の特設出店が終わって片付けをする料理人。空き缶やゴミはすべて処分するが、彼が発見した「梅原様特製のバルサミコ酢ソースが極めて好評だった」という一文だけを本店のメイン台帳に書き加えること。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["disposable-brain", "home-brain"]
    },
    {
      id: "graduated-archive",
      category: "ax-patterns",
      tags: ["pattern", "memory"],
      name: {
        en: "AX Pattern · Graduated Archive",
        ja: "AX Pattern · Graduated Archive（段階的アーカイブ解放）"
      },
      shortName: {
        en: "Graduated Archive",
        ja: "Graduated Archive"
      },
      definition: {
        en: "Unlocks and resurfaces past memories, media, or logs tied to dynamic life milestones (e.g., child turns 18, next wedding anniversary) rather than generic chronological search.",
        ja: "日付での単なる検索ではなく、人生の節目（子供が18歳になる、次の結婚記念日など）といったライフ・マイルストーンに連動して、過去の記録や思い出を段階的に引き出し解放する記憶設計。"
      },
      metaphor: {
        en: "The chef's vault containing the corks and menus of every anniversary dinner you've shared. Never searched or browsed daily — only brought to the table on the specific anniversary night.",
        ja: "毎年訪れるご夫婦の「過去の全メニューと開けたワインのコルク」が眠る金庫。普段は決して検索も閲覧もできないが、記念日の夜だけそっとテーブルの上に飾られる。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["home-brain", "temporal-handoff"]
    },
    {
      id: "disclosure-matrix",
      category: "ax-patterns",
      tags: ["pattern", "security"],
      name: {
        en: "AX Pattern · Disclosure Matrix",
        ja: "AX Pattern · Disclosure Matrix（開示制限マトリクス）"
      },
      shortName: {
        en: "Disclosure Matrix",
        ja: "Disclosure Matrix"
      },
      definition: {
        en: "Explicit access configuration framework governing interactions between N agents, M data domains, and M people to prevent unintended information leaks.",
        ja: "N個のエージェント × Mの情報ドメイン × Mの家族メンバーの組み合わせで構成される、情報の漏洩を絶対に防ぐための多次元のデータ開示権限マトリクス設計。"
      },
      metaphor: {
        en: "The restaurant staff contract. The sommelier is allowed to talk about your wine preferences to the sous-chef, but not allowed to disclose your budget to the flower delivery person.",
        ja: "レストランスタッフの機密規約。ソムリエはあなたのワインの好みを副料理長に伝えてよいが（連携可）、あなたの予算を花屋の配達員に話すことは固く禁じられている。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["share-disclosure", "disclosure-dial"]
    },
    {
      id: "intent-shared-workflow",
      category: "ax-patterns",
      tags: ["pattern", "enterprise", "collaboration"],
      name: {
        en: "AX Pattern · Intent-Shared Workflow",
        ja: "AX Pattern · Intent-Shared Workflow（意図共有ワークフロー）"
      },
      shortName: {
        en: "Intent-Shared Workflow",
        ja: "Intent-Shared Workflow"
      },
      definition: {
        en: "Collaboration pattern where PMs, designers, engineers, and AI all edit against the same queryable Intent declaration to avoid compound drift.",
        ja: "企画、デザイン、開発、そしてAIが、それぞれの仕様書をバラバラに書くのではなく、一つの共通の「Intent（意志定義）」に向かって記述・編集を行い、役割ごとの意図のズレをなくす協調パターン。"
      },
      metaphor: {
        en: "The chef's written night theme ('warm, simple, autumn harvest') placed on a card in the center of the kitchen. Pastry, saucier, and server all coordinate their creations to this card instead of guessing.",
        ja: "キッチンの中心の台の上に置かれた、料理長の手書きの夜のテーマカード「暖かく、シンプルに、秋の収穫祭」。パティシエもソース係も給仕も、そのカードを見て自分の仕事の方向性を合わせる。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["intent-fidelity", "project-brain"]
    },
    {
      id: "stakeholder-autonomy-matrix",
      category: "ax-patterns",
      tags: ["pattern", "enterprise", "collaboration"],
      name: {
        en: "AX Pattern · Stakeholder Autonomy Matrix",
        ja: "AX Pattern · Stakeholder Autonomy Matrix（役割別自律ダイヤルマトリクス）"
      },
      shortName: {
        en: "Stakeholder Autonomy Matrix",
        ja: "Stakeholder Autonomy Matrix"
      },
      definition: {
        en: "Assigns role-specific Autonomy Dial settings per task domain (e.g., PM = 'Confirm' on copy changes, Designer = 'Auto' on layout fixes, Engineer = 'Notify' on packages).",
        ja: "同じAIアシスタントであっても、タスク領域ごとに役割別の自律決定ダイヤルを設定すること（例：文言変更はPMが承認する【Confirm】、細かなレイアウト修正はデザイナーにおまかせ【Auto】、パッケージ導入はエンジニアに事後報告【Notify】）。"
      },
      metaphor: {
        en: "The restaurant rules. The sommelier is trusted to purchase wines independently (Auto), but the line cook must check with the chef before replacing the main steak cut (Confirm). Same kitchen, different dials.",
        ja: "お店の規律。ソムリエは自分の判断でワインを仕入れてよいが（Auto）、新人料理人は肉の切り方を変える前に必ず料理長にお伺いを立てなければならない（Confirm）。同じ厨房でも、役割ごとにダイヤルの硬さが異なる。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["autonomy-dial", "intent-shared-workflow"]
    },
    {
      id: "knowledge-at-query",
      category: "ax-patterns",
      tags: ["pattern", "enterprise", "ui"],
      name: {
        en: "AX Pattern · Knowledge-at-Query",
        ja: "AX Pattern · Knowledge-at-Query（文脈喚起型ナレッジ）"
      },
      shortName: {
        en: "Knowledge-at-Query",
        ja: "Knowledge-at-Query"
      },
      definition: {
        en: "Contextually surfaces relevant institutional knowledge (research findings, design systems, rules) inside the editor at the exact moment a question or action relates to it, avoiding passive archive search.",
        ja: "開発者が「検索」しに行かなくても、エディタで作業しているその瞬間・その記述に関連する社内ナレッジやリサーチ結果を、AIが文脈に合わせて自動的にそっとエディタ内に表示するパターン。"
      },
      metaphor: {
        en: "As the cook reaches for the salt, a small sticky note appears on the counter: 'This guest asked for low-sodium last visit.' No drawer to search, no cabinet to open.",
        ja: "料理人が塩のボトルに手を伸ばしたその瞬間、調理台の上に「このお客様は前回、塩分控えめを希望されました」という小さな付箋がスッと現れる感覚。アーカイブを漁る必要すらない。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["research-brain", "org-brain"]
    },
    {
      id: "queryable-meeting-archive",
      category: "ax-patterns",
      tags: ["pattern", "enterprise", "interaction"],
      name: {
        en: "AX Pattern · Queryable Meeting Archive",
        ja: "AX Pattern · Queryable Meeting Archive（問合せ可能会議アーカイブ）"
      },
      shortName: {
        en: "Queryable Meeting Archive",
        ja: "Queryable Meeting Archive"
      },
      definition: {
        en: "Converts flat meeting transcripts and action logs into an active dialogue partner, letting users interrogate the past meeting context directly.",
        ja: "静的な議事録テキストを対話可能なAIに変換し、「あの時、彼らはなんでその判断をしたの？」と過去の会議そのものに質問して本質を回答してもらう設計パターン。"
      },
      metaphor: {
        en: "Being able to walk up to the whiteboard from yesterday's meeting and ask it, 'Why did the PM veto the calendar integration?' and having the board reply with the exact audio moment.",
        ja: "昨日使った会議室のホワイトボードに歩み寄り、「ねえ、なんでPMはカレンダー機能の導入を却下したの？」と話しかけると、ホワイトボードが当時の音声と議論の様子を再生して答えてくれる感覚。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["living-meeting-brain", "org-brain"]
    },
    {
      id: "archive-replay",
      category: "ax-patterns",
      tags: ["pattern", "enterprise", "interaction"],
      name: {
        en: "AX Pattern · Archive Replay",
        ja: "AX Pattern · Archive Replay（プロジェクト履歴時間スクラブ）"
      },
      shortName: {
        en: "Archive Replay",
        ja: "Archive Replay"
      },
      definition: {
        en: "Provides a temporal scrubber interface to rewind and view the exact state of a Project Brain at any past week or sprint to trace 'what did we know then?'.",
        ja: "スライダーをスクラブ（時間を巻き戻し）して、特定の週やスプリントにおけるプロジェクト脳の「正確な歴史的状態」を完全再現し、「あの時点の我々はどんな前提で動いていたか」を追体験させるUIパターン。"
      },
      metaphor: {
        en: "A chef rewinding last Tuesday's prep board camera to remember exactly why they swapped the sauce before service. The kitchen board plays back, not a written logbook.",
        ja: "先週の火曜日の「仕込みボード」のタイムラプスを巻き戻して、「なぜ開店直前にソースを変更したのか」の経緯を目で見て思い出すこと。文字の記録ではなく、現場の状況そのものが巻き戻る。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["project-brain", "living-meeting-brain"]
    },
    {
      id: "surface-vocabulary",
      category: "ax-patterns",
      tags: ["pattern", "ui", "cross-platform"],
      name: {
        en: "AX Pattern · Surface Vocabulary",
        ja: "AX Pattern · Surface Vocabulary（デバイス固有ボキャブラリー）"
      },
      shortName: {
        en: "Surface Vocabulary",
        ja: "Surface Vocabulary"
      },
      definition: {
        en: "Tailors UI complexity and interaction mechanisms directly to hardware constraints (e.g., Watch = glance/haptics, Earbud = ambient whisper, Phone = full interactive depth, TV = shared public announcement).",
        ja: "画面サイズや入力形態といったハードウェアの特性（時計＝一瞬の視認・触覚、イヤホン＝ささやき・音声、スマホ＝深い対話、テレビ＝家族での共有）に合わせて、情報設計の複雑さをネイティブに最適化する設計原則。"
      },
      metaphor: {
        en: "Every table has its own etiquette. The counter bar speaks wine pairings; the family booth speaks menu portions; the chef's counter speaks culinary science. Same kitchen, three completely different vocabularies.",
        ja: "レストラン内の席ごとの作法。バーカウンターでは「ペアリング」を語り、ファミリー席では「料理のサイズ」を語り、シェフズテーブルでは「調理科学」を語る。一つの厨房から、3つの異なる会話様式が生まれる。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["form-factor", "moment-composer"]
    },
    {
      id: "moment-composer",
      category: "ax-patterns",
      tags: ["pattern", "ui"],
      name: {
        en: "AX Pattern · Moment Composer",
        ja: "AX Pattern · Moment Composer（モーメント構成エンジン）"
      },
      shortName: {
        en: "Moment Composer",
        ja: "Moment Composer"
      },
      definition: {
        en: "Dynamic engine that aggregates multiple live Token values to compose a single, contextual proposal shaped specifically to the destination Surface Vocabulary.",
        ja: "様々なContext Tokens（認知負荷、デバイス姿勢、重要度など）の現在値を集約し、配信先デバイスの「Surface Vocabulary」に合わせた最適な「一つの提案」をその都度リアルタイムに再構成して表示するエンジン。"
      },
      metaphor: {
        en: "The line cook who reads the dinner ticket, feels the room temperature, and glances at the guest's face — plating exactly one dish tailored to all three factors, rather than serving three separate sides.",
        ja: "注文伝票を読み、ホールの室温を感じ、お客様の表情を一瞥した瞬間に、3つの要素すべてに調和する「完璧な一皿」だけを盛り付けてテーブルに出す料理人の勘。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["surface-vocabulary", "feasibility"]
    },
    {
      id: "preview-redaction",
      category: "ax-patterns",
      tags: ["pattern", "security"],
      name: {
        en: "AX Pattern · Preview Redaction",
        ja: "AX Pattern · Preview Redaction（プレビュー情報秘匿）"
      },
      shortName: {
        en: "Preview Redaction",
        ja: "Preview Redaction"
      },
      definition: {
        en: "Dynamically and reactively collapses lock-screen notification preview details down to generic alerts when unauthorized eyes are detected in proximity (Social Exposure shift).",
        ja: "周囲に他人の目が存在する（Social Exposureの急激な変化）と検知した瞬間に、スマホのロック画面に表示されているメッセージの詳細を即座に「新着通知あり」といった安全な表現に自動収縮させるプライバシー保護機構。"
      },
      metaphor: {
        en: "The waiter who notices a surprise engagement ring box on the table as they walk past and quietly slides the dessert menu over it to keep the secret safe from the partner.",
        ja: "テーブルの上にある「サプライズ婚約指輪の箱」に通りすがりに気づいた給仕が、何事もなかったかのようにその上にデザートメニューをスッと重ねて覆い隠し、パートナーから秘密を守り抜く機転。"
      },
      targetPath: "context-grammar/ax-patterns/index.html",
      anchor: "pattern-catalog",
      seeAlso: ["social-exposure", "disclosure-matrix"]
    },

    // 7. Trust Design Concepts
    {
      id: "trust-breach",
      category: "trust",
      tags: ["trust"],
      name: {
        en: "Trust Breach",
        ja: "Trust Breach（信頼毀損/エラー行動）"
      },
      shortName: {
        en: "Trust Breach",
        ja: "Trust Breach"
      },
      definition: {
        en: "An event where the AI acts outside of the user's intent or performs an action they did not want. Must be immediately surfaceable and reversible.",
        ja: "AIがユーザーの本当の意図を逸脱して行動した、あるいはユーザーが望まないアクションを実行してしまった事象。即座にユーザーが気付け、やり直せる（ロールバック可能）設計でなければなりません。"
      },
      metaphor: {
        en: "The waiter serving a steak to a vegetarian guest. It must be immediately acknowledged, taken back to the kitchen, and replaced without argument.",
        ja: "ベジタリアンのお客様に誤ってステーキを出してしまった給仕。言い訳せず即座に非を認め、お皿をキッチンに下げ、無償で完璧な料理と取り替えなければならない。"
      },
      targetPath: "context-grammar/trust/index.html",
      anchor: "breach-recovery",
      seeAlso: ["reversibility-window", "trust-timeline"]
    },
    {
      id: "reversibility-window",
      category: "trust",
      tags: ["trust"],
      name: {
        en: "Reversibility Window",
        ja: "Reversibility Window（取り消し可能猶予期間）"
      },
      shortName: {
        en: "Reversibility Window",
        ja: "Reversibility Window"
      },
      definition: {
        en: "The predefined timeframe (e.g., 24 hours) during which any autonomous AI action can be completely undone or reversed by the user without penalty.",
        ja: "AIが自動購入などの自律的な決定を下した後、ユーザーが何のリスクやペナルティもなくその行動を「完全に取り消し（ロールバック）」できる、あらかじめ定められた猶予時間（例：24時間）。"
      },
      metaphor: {
        en: "The restaurant letting you return a sealed bottle of premium wine for a full refund within 24 hours if you realize the guest of honor doesn't drink alcohol.",
        ja: "「お祝いの主賓がお酒を飲まない方だと分かった」という場合、24時間以内であれば未開封のワインボトルを無償で全額返金・キャンセルしてくれるレストランの太っ腹な制度。"
      },
      targetPath: "context-grammar/trust/index.html",
      anchor: "breach-recovery",
      seeAlso: ["trust-breach", "autonomy-dial"]
    },
    {
      id: "trust-timeline",
      category: "trust",
      tags: ["trust"],
      name: {
        en: "Trust Timeline",
        ja: "Trust Timeline（信頼獲得タイムライン）"
      },
      shortName: {
        en: "Trust Timeline",
        ja: "Trust Timeline"
      },
      definition: {
        en: "The gradual, measured growth or reduction of AI autonomy settings over weeks and months based on error rates, audit history, and direct user feedback.",
        ja: "エラー率、これまでの監査履歴、ユーザーの評価などに基づき、AIの自律決定ダイヤルの設定が数週間・数ヶ月をかけて段階的に拡張（または縮小）されていくプロセス。"
      },
      metaphor: {
        en: "Promoting a busboy to waiter, then to sommelier. They aren't given keys to the wine cellar on day one; they earn trust by getting small orders right first.",
        ja: "見習い皿洗いが、給仕へ、そしてソムリエへと段階的に昇格していくプロセス。初日にワインセラーの鍵を渡されることはなく、まずは小さな注文を完璧にこなすことで徐々に信頼を獲得します。"
      },
      targetPath: "context-grammar/trust/index.html",
      anchor: "temporal-arc",
      seeAlso: ["autonomy-dial", "trust-breach"]
    },
    {
      id: "negotiation-gate",
      stage: "Stage 5",
      category: "tokens",
      tags: ["pipeline", "interaction"],
      name: {
        en: "Negotiation Gate",
        ja: "ネゴシエーション・ゲート（意味のすり合わせ検問）"
      },
      shortName: {
        en: "Negotiation Gate",
        ja: "Negotiation Gate"
      },
      definition: {
        en: "Stage 5 of the Decision Pipeline. Evaluates four axes — Confidence × Risk × Reversibility × Sensitivity — to output a Risk Profile and Gate Decision (autonomy_ceiling, required_ui_primitive). Applies the Autonomy Resolution formula: Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling). Also embodies meaning-alignment through three UI primitives: Interpretation Preview, Assumption Cards, and Priority Toggle. Governed by 8 Gate firing rules (R34–R41).",
        ja: "意思決定パイプラインの第5段階。確信度（Confidence）× リスク（Risk）× 可逆性（Reversibility）× 感受性（Sensitivity）の4軸を評価し、リスクプロファイルとゲート判定（autonomy_ceiling、required_ui_primitive）を出力します。自律決定解決の公式「最終自律度 = min(ユーザー設定, ゲート上限)」を適用し、Interpretation Preview・Assumption Cards・Priority Toggleの3つのUIプリミティブを通じて意味のすり合わせを体現します。8つのゲート発火ルール（R34–R41）で制御されます。"
      },
      metaphor: {
        en: "The waiter pausing before executing a high-stakes request. Even if you said 'bring me anything' (Auto), if you are with a client, they stop to confirm the wine brand to protect your dinner.",
        ja: "給仕がお客様の注文を執行する前の「一瞬の立ち止まり」。たとえお客様の権限設定が「おまかせ（Auto）」であっても、大事な商談中であること（社会的露出度）を察知し、念のためワインの銘柄を確認する丁寧なすり合わせの瞬間。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["autonomy-dial", "confidence", "risk", "reversibility", "rule-engine", "silent-resolution", "approval-gate"]
    },
    {
      id: "negotiation-layer",
      category: "trust",
      tags: ["trust", "negotiation"],
      name: {
        en: "Negotiation Layer",
        ja: "ネゴシエーション・レイヤー（意思決定のすり合わせ層）"
      },
      shortName: {
        en: "Negotiation Layer",
        ja: "Negotiation Layer"
      },
      definition: {
        en: "Merged into the Negotiation Gate (Stage 5). The meaning-alignment responsibility — Interpretation Preview, Assumption Cards, Priority Toggle — is now embodied by the Gate rather than a separate layer. See: Negotiation Gate.",
        ja: "ネゴシエーション・ゲート（Stage 5）に統合されました。Interpretation Preview・Assumption Cards・Priority Toggleによる意味のすり合わせ機能は、独立したレイヤーではなくゲート自体に体現されています。「Negotiation Gate」を参照してください。"
      },
      metaphor: {
        en: "The waiter repeating your order back to you. 'So that is a medium-rare steak with no onions, correct?' Ensuring both kitchen and guest are in perfect agreement before cooking.",
        ja: "給仕が注文を復唱する瞬間。「ミディアムレアのステーキ、玉ねぎ抜きでよろしいですね？」。調理を始める前に、厨房と客が完全に一致していることを確認する対話。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["negotiation-gate", "assumption-cards", "priority-toggle"]
    },
    {
      id: "priority-toggle",
      category: "ax-patterns",
      tags: ["pattern", "ui"],
      name: {
        en: "Priority Toggle",
        ja: "プライオリティ・トグル（緊急・重要度優先スイッチ）"
      },
      shortName: {
        en: "Priority Toggle",
        ja: "Priority Toggle"
      },
      definition: {
        en: "A premium UI control letting users adjust the system's focus in real time (e.g. pivoting between Health Preset and Work Focus), overriding autonomous defaults.",
        ja: "システム全体の動作優先度やフォーカスを、ユーザーが状況に合わせてリアルタイムに直接切り替えられる、マニュアル介入用のプレミアムUIコントロール（例：「健康優先」と「仕事集中」の切り替え）。"
      },
      metaphor: {
        en: "The guest telling the waiter: 'Ignore my phone calls unless it is my doctor.' Overriding the default friendly conversation rules for a specific period of time.",
        ja: "客が給仕に「医者からの電話以外は取り次がないでくれ」と直接告げること。通常のおもてなしルールを一時的に上書きする明示的な指示。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "priority-toggle",
      seeAlso: ["priority-weight", "negotiation-gate", "autonomy-dial"]
    },
    {
      id: "rule-engine",
      category: "tokens",
      tags: ["pipeline"],
      name: {
        en: "Rule Engine",
        ja: "Rule Engine（ルール・エンジン）"
      },
      shortName: {
        en: "Rule Engine",
        ja: "Rule Engine"
      },
      definition: {
        en: "The reasoning processor (Stage 4) that converts raw Situation Signal inputs and User boundaries into adaptive design rules and contextual behaviors.",
        ja: "生の状況シグナルとユーザーが設定した境界線を入力値とし、状況に適応したデザインルールや振る舞い（AXパターン）へと変換する中核的な推論プロセッサー（第4段階）。"
      },
      metaphor: {
        en: "The kitchen recipe book combined with the head chef's experienced logic. It takes the fresh market ingredients and dietary restrictions, then decides exactly how to cook the dish tonight.",
        ja: "厨房の秘伝レシピ集と、料理長の頭脳の組み合わせ。今日の市場から入った食材（シグナル）と客のアレルギー情報（境界線）を受け取り、今夜の料理をどのように調理するかを決定する論理回路。"
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "",
      seeAlso: ["context-tokens", "negotiation-gate"]
    },
    {
      id: "risk",
      category: "tokens",
      tags: ["pipeline", "tokens"],
      name: {
        en: "Risk",
        ja: "Risk（決定に伴うリスク値）"
      },
      shortName: {
        en: "Risk",
        ja: "Risk"
      },
      definition: {
        en: "A core decision factor measuring the cost of failure if the AI's assumption is wrong, graded into Low, Medium, and High categories.",
        ja: "AIの仮定が間違っていた場合に発生する「失敗に伴う損失の大きさ（コスト）」を測定する、交渉ゲートの重要入力パラメータ（低・中・高の3段階）。"
      },
      metaphor: {
        en: "The difference between serving the wrong salad dressing (low risk, easily replaced) versus serving a dish containing nuts to a severely allergic guest (extreme high risk).",
        ja: "サラダドレッシングの選択ミス（失敗してもすぐに替えが効く低リスク）と、ナッツアレルギーの客にナッツ入り料理を提供してしまうこと（取り返しのつかない致命的な高リスク）の違い。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["negotiation-gate", "reversibility", "confidence"]
    },
    {
      id: "reversibility",
      category: "tokens",
      tags: ["pipeline", "tokens"],
      name: {
        en: "Reversibility",
        ja: "Reversibility（決定の可逆性）"
      },
      shortName: {
        en: "Reversibility",
        ja: "Reversibility"
      },
      definition: {
        en: "Measures whether an action taken by the AI can be cleanly undone or rolled back after execution (e.g., calendar reservation vs. purchasing shoes).",
        ja: "AIが実行したアクションが、事後的にクリーンにキャンセル、または元に戻せるかどうかを表す指標（例：カレンダー予約は可逆性高、靴の購入確定は可逆性中）。"
      },
      metaphor: {
        en: "The difference between booking a flexible dining room table reservation (100% reversible) versus uncorking a $300 vintage bottle of wine (completely irreversible).",
        ja: "柔軟に変更可能なテーブル席의仮予約（いつでもノーコストでキャンセルできる高可逆性）と、3万円の限定ビンテージワインの栓を抜いてしまうこと（二度と元に戻せない不可逆性）の違い。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["negotiation-gate", "risk", "reversibility-window"]
    },
    {
      id: "confidence",
      category: "tokens",
      tags: ["pipeline", "tokens"],
      name: {
        en: "Confidence",
        ja: "Confidence（推論の確信度）"
      },
      shortName: {
        en: "Confidence",
        ja: "Confidence"
      },
      definition: {
        en: "The statistical certainty or estimation accuracy of the current situation read, directly preventing the system from acting autonomously if signals are weak or blurry.",
        ja: "現在の状況読み取り精度に関する統計的な確かさ（％）。シグナルが曖昧または不十分な場合、自律的な決定を防ぎ、「確認」へと強制降格させる安全機能。"
      },
      metaphor: {
        en: "The waiter observing a regular customer from behind. If they are 95% sure it is you, they prepare your favorite coffee. If only 60% sure, they walk over to ask for your name first.",
        ja: "給仕がお客様の背姿を見たときの確実さ。95%あなただと確信できれば、すぐにお気に入りのコーヒーを用意します。もし60%程度しか自信がなければ、勝手に注がずにまず「お名前を伺ってもよろしいですか」と挨拶しに行きます。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["negotiation-gate", "risk", "cognitive-load"]
    },
    {
      id: "sensitivity",
      category: "tokens",
      tags: ["pipeline", "tokens"],
      name: {
        en: "Sensitivity",
        ja: "Sensitivity（文化的・状況的感受性）"
      },
      shortName: {
        en: "Sensitivity",
        ja: "Sensitivity"
      },
      definition: {
        en: "Measures whether the domain or immediate context contains highly sensitive personal, social, or emotional stakes requiring extra tact.",
        ja: "該当ドメインや状況の中に、極めてデリケートな個人情報、社会的地位、または感情的な配慮（センシティビティ）が必要な要素が含まれているかどうかを測る指標。"
      },
      metaphor: {
        en: "The waiter realizing you are dining with your child versus a business competitor. The tone, privacy boundaries, and menu choices must automatically adapt to protect your social stature.",
        ja: "給仕が、あなたが今日「実の子供」と食事しているか、それとも「ビジネス上の競合他社の役員」と食事しているかを察知すること。立場を守るために、会話のトーンやプライバシーの境界が自動で調整されます。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["social-exposure", "disclosure-dial"]
    },
    {
      id: "autonomy-map",
      category: "tokens",
      tags: ["pipeline", "relationship"],
      name: {
        en: "Autonomy Map",
        ja: "Autonomy Map（自律権限割当マップ）"
      },
      shortName: {
        en: "Autonomy Map",
        ja: "Autonomy Map"
      },
      definition: {
        en: "The custom matrix defining exactly where the boundary lies between delegated work and owned authority, mapped per domain and role.",
        ja: "どのドメインのどのタスクをAIに委ね（Delegated）、どこを人間が所有（Owned）し続けるかの境界線を明確に描いた、ユーザーおよび役割別の決定権限アロケーションマップ。"
      },
      metaphor: {
        en: "Your verbal agreement with the restaurant. 'You handle the table setup and water refills (Auto), but do not touch my wine glass or bring the check without me asking (Confirm).'",
        ja: "レストランの常連様との暗黙の合意。「テーブルセットや水のお代わりは無言でやってくれて構わない（Auto）が、ワインを勝手に注いだり、私が頼む前にお会計をテーブルに置いたりはしないでほしい（Confirm）。」"
      },
      targetPath: "context-grammar/dials/index.html",
      anchor: "autonomy",
      seeAlso: ["autonomy-dial", "disclosure-matrix"]
    },
    {
      id: "coordinator",
      category: "brain",
      tags: ["brain", "architecture"],
      name: {
        en: "Coordinator",
        ja: "Coordinator（一元コーディネーター層）"
      },
      shortName: {
        en: "Coordinator",
        ja: "Coordinator"
      },
      definition: {
        en: "The top-level orchestrator that reads across five parallel Brain instances simultaneously, builds unified context, and dispatches tasks to specialized child agents.",
        ja: "並列に稼働する5つのBrainインスタンスを束ねて横断読み込みし、統一された状況文脈を構築した上で、最適な専門子エージェント（買い物、音声など）へと的確に指令を下す、中枢指令制御レイヤー。"
      },
      metaphor: {
        en: "The front-of-house restaurant manager. They check reservation books, consult the kitchen, observe guest moods, and coordinate waitstaff and busboys behind the scenes.",
        ja: "レストラン全体のフロアマネージャー（支配人）。顧客台帳をめくり、厨房の状況を聞き、客の機嫌をうかがいながら、給仕や皿洗いたちに裏側で完璧なチームプレイの指示を飛ばす司令塔。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "home-system",
      seeAlso: ["home-brain", "org-brain"]
    },
    {
      id: "learning-returns-home",
      category: "ax-patterns",
      tags: ["pattern", "brain"],
      name: {
        en: "AX Pattern · Learning Returns Home",
        ja: "AX Pattern · Learning Returns Home（学習の帰還帰流）"
      },
      shortName: {
        en: "Learning Returns Home",
        ja: "Learning Returns Home"
      },
      definition: {
        en: "AX pattern ensuring that when a temporary Disposable Brain dissolves, its valuable long-term behavioral patterns are distilled and permanently returned to the core persistent Home/Org Brain.",
        ja: "一時的な「使い捨て脳」のライフサイクル終了時、蓄積されたデータやノイズをすべて消去しつつ、有益な長期行動習慣や好みだけを高度に蒸留して、本尊のHome BrainまたはOrg Brainへと還流させるAX設計パターン。"
      },
      metaphor: {
        en: "The temporary pop-up chef returning to the headquarters after a guest event, reporting: 'Mr. Umehara absolutely loved the special chili glaze on Day 3.' That recipe gets added to his permanent file.",
        ja: "3日間のイベント営業を終えた臨時シェフが本店に戻り、「梅原様は3日目に出した特製チリソースを大絶賛されていた」と報告し、その調理法が本店の「梅原様パーソナルファイル」に永久登録されるプロセス。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "disposable",
      seeAlso: ["disposable-brain", "home-brain", "temporal-handoff"]
    },
    {
      id: "federation-contract",
      category: "tokens",
      tags: ["pipeline", "schema"],
      name: {
        en: "Federation Contract",
        ja: "Federation Contract（連合協約契約）"
      },
      shortName: {
        en: "Federation Contract",
        ja: "Federation Contract"
      },
      definition: {
        en: "The standardized schema protocol (like Matter or OAuth) that enables operating systems, devices, and different vendor agents to securely share Context Schema telemetry without a single monopoly.",
        ja: "特定のOSや巨大IT企業による独占を防ぎ、Apple、Google、Samsungなどの異なるエージェントやスマートデバイス同士が、安全にコンテキストシグナルを共有・連携し合うための標準共通規格（MatterやOAuthのような業界プロトコル）。"
      },
      metaphor: {
        en: "The standard restaurant classification code. Whether you eat at an upscale French bistro or a local sushi bar, 'nut allergy' means the exact same medical reality to every kitchen.",
        ja: "飲食業界共通のアレルギー分類コード。最高級フレンチに行こうが、街の個人経営 of the main allergy standard."
      },
      targetPath: "context-grammar/signals/index.html",
      anchor: "",
      seeAlso: ["context-tokens", "rule-engine"]
    },
    {
      id: "intent",
      category: "tokens",
      tags: ["pipeline"],
      name: {
        en: "Intent",
        ja: "Intent（意図）"
      },
      shortName: {
        en: "Intent",
        ja: "Intent"
      },
      definition: {
        en: "Stage 1 of the Decision Pipeline. The real-world, situational desire that a user genuinely wants to accomplish in the immediate moment, rather than their long-term goal.",
        ja: "意思決定パイプラインの第1段階。ユーザーが長期的な目標（JTBD）としてではなく、「いま、この瞬間」の具体的な状況の中で本当に実現したいと望んでいる生々しい生の願い。"
      },
      metaphor: {
        en: "A guest looking up from an empty water glass at a restaurant. It is the immediate desire for a refill, built instantly out of thirst and the moment.",
        ja: "レストランで空のグラスを見つめるお客様の視線。喉の渇きと状況からその瞬間その場で立ち上がる、「お水をお代わりしたい」という生々しい直接の願い。"
      },
      targetPath: "context-grammar/intent/index.html",
      anchor: "",
      seeAlso: ["explicit-intent", "implicit-intent", "intent-fidelity", "intent-shared-workflow"]
    },
    {
      id: "explicit-intent",
      category: "tokens",
      tags: ["pipeline", "interaction"],
      name: {
        en: "Explicit Intent",
        ja: "Explicit Intent（明示的な意図）"
      },
      shortName: {
        en: "Explicit Intent",
        ja: "Explicit Intent"
      },
      definition: {
        en: "The direct, verbalized command or typed text explicitly given to the AI by the user, requiring no situational inference (e.g., 'Set a 20-minute timer').",
        ja: "ユーザーが声や文字で直接AIに伝える、明確な直接指示。状況推測を必要とせず、ユーザーの言葉そのものが意図となる（例：「20分タイマーをセットして」）。"
      },
      metaphor: {
        en: "A customer raising their hand and loudly calling 'Excuse me, water please!' to the waiter. The command is clear, direct, and leaves no room for guessing.",
        ja: "お客様が手を挙げ、「すみません、お水ください！」と大きな声で給仕を呼ぶ状態。直接の指示であり、店員が推測する余地のない最も分かりやすいオーダー。"
      },
      targetPath: "context-grammar/intent/index.html",
      anchor: "forms",
      seeAlso: ["intent", "implicit-intent"]
    },
    {
      id: "implicit-intent",
      category: "tokens",
      tags: ["pipeline", "interaction"],
      name: {
        en: "Implicit Intent",
        ja: "Implicit Intent（暗示的な意図）"
      },
      shortName: {
        en: "Implicit Intent",
        ja: "Implicit Intent"
      },
      definition: {
        en: "The unspoken, situational expectation derived automatically by combining current Situation Signals and Brain memory without a direct command.",
        ja: "ユーザーが何も口にしていない状態で、「今起きている状況シグナル」と「過去の記憶（脳）」を掛け合わせ、システムがそっと先回りして察する言葉にされない期待。"
      },
      metaphor: {
        en: "An attentive waiter at a high-end restaurant who notices your glass is half-empty and quietly walks over to pour water before you ever have to ask.",
        ja: "行きつけの名店で、あなたのグラスが半分空になっていることに気づいた優秀な給仕が、呼ばれる前に静かに歩み寄ってお水を注いでくれる心地よい先回り。"
      },
      targetPath: "context-grammar/intent/index.html",
      anchor: "forms",
      seeAlso: ["intent", "explicit-intent", "active-channel", "passive-channel", "ambient-channel"]
    },
    {
      id: "active-channel",
      category: "tokens",
      tags: ["pipeline", "interaction"],
      name: {
        en: "Active Channel",
        ja: "Active Channel（行動が語る）"
      },
      shortName: {
        en: "Active Channel",
        ja: "Active Channel"
      },
      definition: {
        en: "Implicit Intent Channel 2. The unspoken desire revealed instantly by the user's immediate physical actions, verbal conversation, or active state.",
        ja: "暗示的意図の第2チャンネル。ユーザーの今の「動作」「会話」「アクティブな状態」そのものからにじみ出る、言葉にされないリアルタイムな期待。"
      },
      metaphor: {
        en: "The waiter bringing warm green tea instead of ice water to a guest who enters the restaurant shivering and rubbing their hands in winter.",
        ja: "冬の寒い日に、体をすくめ、手をこすり合わせながら入ってきたお客様に対して、給仕が氷入りの冷たい水ではなく、最初から「温かいお茶」をそっと差し出す思いやり。"
      },
      targetPath: "context-grammar/intent/index.html",
      anchor: "forms",
      seeAlso: ["implicit-intent", "passive-channel", "ambient-channel"]
    },
    {
      id: "passive-channel",
      category: "tokens",
      tags: ["pipeline", "interaction"],
      name: {
        en: "Passive Channel",
        ja: "Passive Channel（習慣が語る）"
      },
      shortName: {
        en: "Passive Channel",
        ja: "Passive Channel"
      },
      definition: {
        en: "Implicit Intent Channel 3. The unspoken expectation derived from established long-term habits, calendar schedules, or recurring historical patterns.",
        ja: "暗示的意図の第3チャンネル。蓄積された習慣、カレンダーの予定、または「いつもの」歴史的パターンと現在の合致から自動で導き出される期待。"
      },
      metaphor: {
        en: "The waiter serving the regular customer's favorite vintage wine or preparing their usual anniversary surprise cake without being prompted.",
        ja: "常連のお客様が席についた際、何も聞かずに「いつものビンテージワイン」を用意したり、記念日の登録データからサプライズケーキを無言で仕込むおもてなし。"
      },
      targetPath: "context-grammar/intent/index.html",
      anchor: "forms",
      seeAlso: ["implicit-intent", "active-channel", "ambient-channel"]
    },
    {
      id: "ambient-channel",
      category: "tokens",
      tags: ["pipeline", "interaction"],
      name: {
        en: "Ambient Channel",
        ja: "Ambient Channel（環境が語る）"
      },
      shortName: {
        en: "Ambient Channel",
        ja: "Ambient Channel"
      },
      definition: {
        en: "Implicit Intent Channel 4. The silent context governed by the surrounding room, social atmosphere, or physical environment, setting boundaries on how the AI should behave.",
        ja: "暗示的意図の第4チャンネル。周囲の部屋の明るさ、社会的な空気感、または物理的環境が語る、「静かに、暗く、邪魔をしない」といったシステムが守るべき無言の環境協約。"
      },
      metaphor: {
        en: "The waiter noticing a couple deep in intimate conversation, choosing to dim the lights slightly, soften the music, and watch over them from a distance.",
        ja: "カップルが親密な会話に没頭している空気（環境）を察し、店員がそっと店内の照明を落とし、音楽を静かにして、邪魔をしないように遠くから見守る気配り。"
      },
      targetPath: "context-grammar/intent/index.html",
      anchor: "forms",
      seeAlso: ["implicit-intent", "active-channel", "passive-channel"]
    },
    {
      id: "dynamic-friction",
      category: "trust",
      tags: ["trust", "interaction"],
      name: {
        en: "Dynamic Friction",
        ja: "Dynamic Friction（動的摩擦）"
      },
      shortName: {
        en: "Dynamic Friction",
        ja: "Dynamic Friction"
      },
      definition: {
        en: "Stage 5. A deliberate, carefully calibrated micro-friction introduced to interrupt automated execution, ensuring meaningful human consent and protecting relationship boundary ceilings in high-risk zones.",
        ja: "意思決定プロセスの重要ポイントでAIの完全自動化にあえて『一瞬のブレーキ』をかけ、人間の自律的な選択や審美的な承認を挟むことで、不気味さを防ぎ信頼（Trust）の毀損を回避するデザインパターン。"
      },
      metaphor: {
        en: "The waiter pausing and lowering their voice to ask, 'Since this is your wedding anniversary dinner, shall I uncork our rare vintage wine now, or would you prefer to see the list first?'.",
        ja: "給仕が『おまかせコース』であっても、最も高額なビンテージワインを開栓する直前、一瞬声を潜めて『こちらは本日の一番大切なワインです。今お開けしてよろしいですか、それともリストを再度ご覧になりますか？』と優しく確認を挟む上品な所作。"
      },
      targetPath: "context-grammar/trust/index.html",
      anchor: "dynamic-friction",
      seeAlso: ["trust-breach", "negotiation-gate", "reversibility"]
    },
    {
      id: "protected-rituals",
      category: "brain",
      tags: ["brain", "relationship"],
      name: {
        en: "Protected Rituals",
        ja: "Protected Rituals（保護された習慣儀式）"
      },
      shortName: {
        en: "Protected Rituals",
        ja: "Protected Rituals"
      },
      definition: {
        en: "High-value personal, familial, or emotional user routines designated as absolute 'No-AI Zones', where the system is strictly barred from automating or suggesting actions to preserve human presence.",
        ja: "効率化やAIによる先回りを『絶対に実行してはならない』と保護された、人間同士の絆、温もり、感情に紐づく大切な時間（例：親が子供へ絵本を読み聞かせする時間、夫婦で料理を作る時間など）。"
      },
      metaphor: {
        en: "The chef stepping out of the kitchen and refusing to cook the guest's secret family soup, saying, 'No, this is your grandmother's recipe. I have set up the stove and chopped the onions, but only your hands must finish it tonight.'.",
        ja: "高級ホテルの料理長が、お客様秘伝の郷土スープの最後の味付けだけは手を出さず、『これはおばあさまの味です。火を起こし野菜は刻みましたが、最後の仕上げはお客様の手で行ってください』と台所を譲る敬意。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "protected-rituals",
      seeAlso: ["home-brain", "disclosure-dial", "autonomy-dial"]
    },
    {
      id: "assumption-cards",
      category: "ax-patterns",
      tags: ["pattern", "ui"],
      name: {
        en: "Assumption Cards",
        ja: "Assumption Cards（仮定提示カード）"
      },
      shortName: {
        en: "Assumption Cards",
        ja: "Assumption Cards"
      },
      definition: {
        en: "Stage 5 UX Pattern. Glace-first micro-cards dynamically assembled to present the AI's high-risk situation readings or inferences, letting the user confirm, reject, or adjust with a single tactile gesture.",
        ja: "AIが状況や習慣から察した『こういう願いがあるのではないか』という推論（仮定）を、一瞬で視認できるコンパクトなUIとして提示し、人間が1タップまたは1ジェスチャーで承認・調整・却下できるようにするAXデザイン要素。"
      },
      metaphor: {
        en: "The waiter sliding a small handwritten chalkboard to your side containing three seasonal chef recommendations based on your favorite flavors, letting you point to the one you want.",
        ja: "給仕がお客様の好みに合わせて『本日のおすすめの3皿』を手書きした小さな黒板をそっとテーブル脇に差し出し、お客様が指さすだけで極上の選択を完了できるようにするスマートな気配り。"
      },
      targetPath: "context-grammar/negotiation-gate/index.html",
      anchor: "",
      seeAlso: ["negotiation-gate", "approval-gate"]
    },
    {
      id: "aware-filtering",
      category: "brain",
      tags: ["brain", "learning"],
      name: {
        en: "Aware Filtering",
        ja: "Aware Filtering（状況自律フィルター）"
      },
      shortName: {
        en: "Aware Filtering",
        ja: "Aware Filtering"
      },
      definition: {
        en: "Stage 3 Background processing that selectively ignores short-term situational noise, errors, or temporary deviations, preventing them from corrupting the permanent Level 2 Learning Layer.",
        ja: "突発的なエラーや一時的な好みの脱線（ノイズ）を自動的に学習の対象外として振り分け、永続的な『Learning Layer』にノイズが蓄積してAIの推論品質が汚染されるのを防ぐインテリジェントな背景フィルター。"
      },
      metaphor: {
        en: "The sommelier ignoring the fact that you ordered a single cola on an extremely hot afternoon, refusing to write 'likes soda' in your wine profile, knowing it was just a temporary hot-day exception.",
        ja: "うだるように暑い夏の日の午後、お客様が一杯だけ冷たいコーラを注文したのを見て、ソムリエが顧客台帳に『コーラ愛好家』などと書き残さず、あくまで『今日限りの暑さ対策の例外』としてそっと無視してくれる粋な配慮。"
      },
      targetPath: "context-grammar/brain/index.html",
      anchor: "scale",
      seeAlso: ["learning-layer", "disposable-brain"]
    }
  ];

  root.GLOSSARY_DB = GLOSSARY_DB;
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    exports.GLOSSARY_DB = GLOSSARY_DB;
    module.exports = GLOSSARY_DB;
  }
})(typeof window !== 'undefined' ? window : globalThis);
