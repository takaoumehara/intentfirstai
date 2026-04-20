# My Understanding of Context Grammar
**作成:** 2026-04-20  
**作成者:** Claude(Takaoのアシスタント)  
**目的:** Context Grammar の全体構造・各概念・キーインサイトを構造化して把握する。今後のすべての判断・編集・Project吟味の基準点とする。

> このドキュメントを書いた根拠ソース:
> - context-grammar/index.html(全文)
> - context-grammar/grammar/index.html(全文)
> - context-grammar/brain/index.html(全文)
> - context-grammar/trust-design/index.html(全文)
> - context-grammar/specs/index.html(全文)
> - context-grammar/intent/index.html(Exploreエージェント経由で全文)
> - context-grammar/rule-engine/index.html(Exploreエージェント経由で全文)
> - context-grammar/ax-patterns/index.html(Exploreエージェント経由で全文)
> - CLAUDE.md(プロジェクト指示書)

---

## 0. 30秒サマリ(エレベーターピッチ)

> 「今のAIはあなたが言ったことを完璧に処理する。でも、あなたが今どんな状態かは何も読んでいない。
> Context Grammarは、AIに『状況を読む語彙』を与える設計言語。8つのトークンで人間の状態を表し、3層のメモリで人格を持ち、33のルールで具体的な振る舞いに変換する。
> メモリ自体は他のAIにもある。Context Grammarが提案するのは、その上のデザイン言語の層 — 文法、ダイアル、信頼設計、Disposable Brain、Multi-Person Orchestration。」

**ターゲット読者:** Samsung/Googleのagentic AI/OS デザイン責任者(採用ベース)。ただしページ自体は「中学生でも分かる」初見読者にも理解可能なレベルで書かれることを目指す。

---

## 1. 中核アーキテクチャ — Context Tower(5階構造)

```
┌─────────────────────────────────────────────────────────────┐
│  Floor 5: Response                                          │
│           (23 AX Patterns × 3 Directions)                   │
│           Delegate / Escalate / Adapt                       │
├─────────────────────────────────────────────────────────────┤
│  Floor 4: Rule Engine                                       │
│           (33 if/then design rules)                         │
├─────────────────────────────────────────────────────────────┤
│  Floor 3: Brain                                             │
│           (3 layers × Domain × Person)                      │
│           Identity / Accumulated Learning / Right Now       │
├─────────────────────────────────────────────────────────────┤
│  Floor 2: Grammar — 8 Context Tokens                        │
│           6 Situation Tokens + 2 Relationship Dials         │
├─────────────────────────────────────────────────────────────┤
│  Floor 1: Intent                                            │
│           (4 types: Explicit / Active / Passive / Ambient)  │
└─────────────────────────────────────────────────────────────┘

Cross-cutting (側面) — Trust Design
   全フロアを横断する温度計。Disclosure Dial × Autonomy Dial の結合。
   Temporal Arc(5フェーズ) / Dynamic Friction / Trust Breach Recovery
```

**フロー:** Intent(なにを欲しているか) → 8 Tokens(状況を読む) → Brain(あなたを覚えている) → Rule Engine(変換ロジック) → Response(具体的なAI挙動)

**比喩(全体を貫く):** 優秀なレストランのウェイター。Intent = 客が何を欲しているかを察する / Tokens = 客と店内を読む / Brain = 予約台帳と通い記憶 / Rule Engine = サービスを決める判断 / Response = 実際の振る舞い。

---

## 2. Floor 1: Intent(意図)

### 2.1 何か
> 「ユーザーが今、瞬間的に欲しているもの」(NOT 永続的なゴール、NOT デモグラ)。**4つのチャネルから入ってくる。1つは語られる。3つは推論される。**

### 2.2 4種類のIntent

| # | 種類 | 定義 | 例 |
|---|------|------|------|
| 1 | **Explicit Intent** | ユーザーが直接述べる。コマンドや質問の形 | 「ママに電話」「20分タイマー」 |
| 2 | **Active Intent** | ユーザーは言わないが、現在の行動が示す | 6:42amにランニングウェアでヘッドホン装着→「これから走る、天気・ルート・プレイリストを」 |
| 3 | **Passive Intent** | 過去パターンと現在の瞬間が一致 | 金曜19時、3ヶ月毎週ピザ注文→「たぶんピザ。確認して」 |
| 4 | **Ambient Intent** | 連続的なバックグラウンド信号。特定の要求はないが、状態がある | 23時にベッドで読書→「静かに、暖かく、通知ゼロ、本以外を暗く」 |

### 2.3 Intent × Brain = Actionable Intent

**重要な公式:** Intent単体は意味を持たない。同じ信号(例:朝6時にスマホを取る)でも Brain次第で出力が逆になる。
- ランナーのBrain → 「起動モード、運動準備」
- 夜勤看護師のBrain → 「就寝モード、静寂」

### 2.4 Intent vs Jobs-to-be-Done(JTBD)— なぜ別物か

| | JTBD | Intent |
|---|------|--------|
| 時間スケール | 月 / 年 | 瞬間(200ミリ秒) |
| 目的 | 製品戦略 | インタラクション実行 |
| 質問 | 「どんな製品を作るか」 | 「次の200msで製品は何をすべきか」 |
| 例 | 「健康な食生活を送りたい」 | 「今この瞬間、夕食何を作るかを決めたい」 |

**設計者にとって混同しやすい — だがこの違いがContext Grammarの存在意義。**

### 2.5 Samsung Family Hub への批判
ページは Samsung Family Hub を引用して言う:「AIは『何を聞かれたか』には流暢。『何を欲しているか』には聞こえてない。」 — 同じ「ランチ何作れる?」でも、急いでいる平日昼と時間のある夜で必要な答えは違う。Samsung Family Hubはこの区別ができない。

---

## 3. Floor 2: Grammar — 8 Context Tokens

### 3.1 全体構造:8 = 6 + 2

```
6 Situation Tokens(入力 — AIが読む信号)
  ① Physical State        — あなたが今どう動いているか
  ② Cognitive Load        — どれだけの認知帯域が残っているか
  ③ Social Exposure       — 誰が見ているか
  ④ Priority Weight       — 何が衝突した時に何が勝つか
  ⑤ Form Factor          — どんなデバイス・サーフェスか
  ⑥ Feasibility          — 今、現実的に何ができるか

+ 2 Relationship Dials(制御 — 関係性の境界)
  ⑦ Autonomy Dial         — AIにどこまで任せるか(4段階)
  ⑧ Disclosure Dial       — AIに何をどこまで知らせるか(4レベル × 2方向)
```

### 3.2 6 Situation Tokens(詳細)

#### ① Physical State
- **質問:** "Are they rushing or relaxed?"
- **何を読む:** 歩行 / 走行 / 運転 / 静止 / 心拍 / ストレス指数 / 睡眠負債
- **既存技術:** Activity Recognition API、Galaxy Watch、加速度センサー
- **ギャップ:** これらの信号を「state」として束ね、デザイン判断に直結させる
- **Readiness:** ★★★★☆ Mostly shipping
- **比喩:** コートを脱ぎかけて急いで入ってきた客 → 水を出してから注文を受ける

#### ② Cognitive Load
- **質問:** "How much mental bandwidth remains?"
- **何を読む:** 時間帯 × カレンダー密度 × 直近のアプリ切替頻度
- **既存技術:** 推定のみ。直接測定は不可能(EEG等は除く)
- **Readiness:** ★★☆☆☆ Speculative — estimation only
- **重要:** これは最も投機的なToken。デザイン判断にはfallbackを必ず設ける
- **比喩:** 会話に没頭する2人 vs 天井を見上げて手持ち無沙汰なソロ客

#### ③ Social Exposure
- **質問:** "Who else is watching?"
- **何を読む:** 近接デバイス検出 / 音声ID / 家族プロファイル / 視覚的な人数推定
- **既存技術:** Samsung Family Hub(6プロファイル)、近接センサー、Voice ID
- **ギャップ:** クロスデバイスで「あなたは公の場 vs ひとり」を統一プロトコルで伝える
- **Readiness:** ★★★★☆ Mostly shipping
- **比喩:** デート中 → 静かな提案、ロイヤルティ割引は出さない / CEOとのランチ → 雑談なし精密タイミング

#### ④ Priority Weight
- **質問:** "When demands collide, what wins?"
- **何を読む:** カレンダー優先度 / 通知設定 / Gmail Priority Inbox等
- **既存技術:** 各個別領域では成熟。クロスドメインの優先解決は未成熟
- **ギャップ:** 「会議5分前 + 娘の学校から電話」をユーザーが手動ルール化せずに解決
- **Readiness:** ★★★☆☆ Partially shipping
- **2層構造:** 現在の緊急性(このToken) + 学習された傾向パターン(Brain)
- **比喩:** 子供のナッツアレルギー × 美味しさ × 適正価格が衝突 → アレルギーが常に勝つ。優秀なウェイターは教えなくても知っている

#### ⑤ Form Factor
- **質問:** "What surfaces surround them?"
- **何を読む:** デバイス種別 / 画面サイズ / 入力方式
- **既存技術:** Samsung DeX、CarPlay、Continuity Handoff — production-ready
- **ギャップ:** ダイナミックなマルチスクリーン割り当て(TVがON+スマホ持ってる→各画面を同時に変える)
- **Readiness:** ★★★★☆ Mostly shipping
- **Beyond Screens:** Voice-only / Gesture (AR) / Ambient (環境センサー) / Hybrid
- **比喩:** カウンター席 vs プライベートルーム — 物理空間が体験を決める

#### ⑥ Feasibility
- **質問:** "What's actually possible right now?"
- **何を読む:** 在庫API / 天気API / 配送見積 / 営業時間
- **ギャップ:** マルチ制約最適化(雨 + 店20分後閉店 + 車に乳児がいる → 統合feasibility scoreを出す)
- **Readiness:** ★★★☆☆ Partially shipping
- **比喩:** 「魚は売り切れ」で止める vs「シーバスが朝入った、シェフは同じ調理法で作れる」と提案する

### 3.3 2 Relationship Dials(詳細)

#### ⑦ Autonomy Dial
- **質問:** "How much can AI act on its own?"
- **4段階:** Suggest → Confirm → Notify → Auto
- **既存技術:** Claude Code(3-stage)、Cursor IDE(autonomy slider)、Agent frameworks
- **ギャップ:** 消費者向けの段階的・ドメイン別ダイアル(バイナリon/offではない)
- **Readiness:** ★★★☆☆ Shipping in dev tools
- **超重要インサイト:** **これはユーザーが単独で回すものではない。3つの力が同時に働く:**
  1. **Service Default** — Netflix/Amazonは既に高い自動化がデフォルト
  2. **AI Adjustment** — 実績に基づきAIが自分の自律度を上下に動かす
  3. **User Override** — 最終承認権はユーザー
- **比喩:** 初訪問は「メニューをどうぞ」、3回目は「いつもので?」、20回目は黙っていても料理が出る

#### ⑧ Disclosure Dial(★最も新規性が高い)
- **質問:** "How much does AI know about you?"
- **4レベル(Protective方向):** Full → Summary → Existence → Hidden
- **4ステージ(Connective方向):** Push → Digest → Available → Off
- **既存技術:** App-level permissions、Gemini Connected Apps、Samsung privacy dashboard
- **ギャップ:** 統一されたクロスドメイン・ダイアル(「ヘルスAIにはFull、ショッピングはSummary、SNSはHidden」を1つのUIで)
- **Readiness:** ★☆☆☆☆ Concept stage(ここが最も独自)
- **Disclosureの2方向性 ← 既存サービスにはない概念:**
  - **Protective** — 自分を守る側(従来の「プライバシー設定」)
  - **Connective** — 家族や他者の世界を繋ぐ側(まったく新しい)
- **超重要ルール:** **Disclosure ≥ Autonomy**(Disclosureが先、Autonomyが後)
  - 「何も教えない × でも全部任せる」は論理的に不可能
  - Disclosureダイアルが開いていないと、Autonomyダイアルは上げられない

### 3.4 Substitution Modes(8トークンとは別だが Grammarページに住む)

| モード | 一言 | Autonomy要件 | 適用場面 |
|--------|------|-------------|---------|
| Exact | 「頼んだものだけ」 | どのレベルでもOK | 薬、アレルギー、特定ブランド忠誠 |
| Flexible | 「同等品でOK」 | Confirm以上 | 食料品、ルーティン購買 |
| Exploring | 「新しいの見せて」 | Notify以上 | 発見モード、低リスク |
| Surprise | 「驚かせて」 | 高信頼(Notify/Auto)必要 | ギフト、食の冒険 |

**重要:** Substitution Modeは Autonomy Dial と連動。SurpriseモードでAutonomyが低いことは矛盾。

---

## 4. Floor 3: Brain — 3層メモリ

### 4.1 全体構造

| Layer | 名称 | 更新速度 | ソース | 比喩 |
|-------|------|---------|--------|------|
| L1 | **Identity** | 月〜年 | 明示的入力 + オンボーディング | 予約台帳 |
| L2 | **Accumulated Learning** | 日〜週 | 行動からの暗黙学習 + 修正 | ウェイターの記憶 |
| L3 | **Right Now** | 秒〜分 | センサー + アクティブセッション | 観察 |

### 4.2 L1 Identity
- **何を持つ:** 家族構成、食事制限、言語、アクセシビリティ需要
- **重要インサイト:** この層の厚さは Disclosure Dial で制御される。Full → 完全な人格。Hidden → 名前と空白だけ
- **コア機能:** 滅多に変わらない、でも全訪問で参照される

### 4.3 L2 Accumulated Learning
- **何を持つ:** 食の好み、買い物習慣、スケジュールパターン、決定の癖
- **進化の例:** 訪問1=サーモンを注文(事実)→ 訪問3=サーモン好きかも(パターン)→ 訪問10=金曜は疲れて軽食+ビール(コンテキスト) → 訪問20=妻同伴ならワイン、ひとりならビール(関係パターン)
- **重要インサイト:** 間違ったパターンを学ぶこともある。修正feedbackで軌道修正、繰り返しエラーは Autonomy Dial を降格させる(信頼度が下がるとAIは謙虚になる)

### 4.4 L3 Right Now
- **何を持つ:** 現在のToken値(全8つ)、アクティブIntent、デバイス状態
- **重要インサイト:** **L3は「8 Context Tokensが住んでいる場所」**。すべてのToken値はリアルタイムでこの層に流れ込む
- **公式:** 知識(L1+L2)は凍っている。L3の「今」がそれを溶かす

### 4.5 3層の協働(Oxygen)
> 「卵アレルギー(L1)+金曜疲れる(L2)= ただのデータ。AIは単独では行動できない。
> + 火曜18:30、妻はキッチン、冷蔵庫にパスタとブロッコリー、夕食まで25分(L3)
> = 『卵不使用パスタ、20分、冷蔵庫の食材で。進めますか?』」

### 4.6 Disposable Brain(★Context Grammarの強い独自性)
- **概念:** 一時的な目的のために生まれ、目的が終われば溶ける Brain インスタンス
- **ライフサイクル:** Birth → Learn → Return → Dissolve
  - **Birth:** Home Brain から必要な情報を継承(家族アレルギー、過去パターン)。空っぽではなく pre-loaded で誕生
  - **Learn:** その文脈の中で独自の知識を構築(「Kaiはラーメンを発見」「Miaは15時に崩れる」)
  - **Return:** 価値ある学びが Home Brain に流入(「Kaiはラーメン好き」が永続知識になる)
  - **Dissolve:** Trip Brain と専用UIが消える。プランは捨てる、メモリは残す
- **Beyond Trips の例:**
  | プロジェクト | パラメータ | 学ぶこと |
  |---|---|---|
  | 京都旅行 | 日付・家族構成・予算 | 子供のスタミナ、好きな料理 |
  | 引越 | 新住所・引越日・間取り | 部屋の使い方、近所のルーティン |
  | 台風対応 | 警戒レベル・避難区域 | 避難判断基準、家族集合パターン |
  | 製品ローンチ | 締切・チーム | ボトルネック、最適会議長 |
  | 娘の受験 | 試験日・志望校 | 集中時間帯、ストレスサイン |
- **比喩:** バースデーパーティの特別計画。終われば飾りは片付ける。でも「このゲストはパーティを開いた」は記憶に残る。来年予約時にそれが活きる

### 4.7 Multi-Agent Orchestration

| パターン | 名称 | 仕組み | いつ使う |
|---------|------|--------|---------|
| 並列 | **Control Tower** | 1つのリードAIが複数の専門家を同時調整。中央にTrip Brainがあり全員が読む | 複雑なタスク × 独立したサブタスク × 共有制約 |
| 順次 | **Field Relay** | AIが順番に、文脈を強化しながら次に渡す | フェーズが明確、各ステップが前段に依存 |

**核心:** Brain がエージェント間の共通言語。これがないと各AIはゼロから始める。

### 4.8 Multi-Person Orchestration(★これも独自性高い)
**シナリオ:** 同じ冷蔵庫、同じAI、4人家族、各々違うダイアル設定

| 人 | ヨーグルト要望 | Substitution + Autonomy | 動作 |
|----|--------------|----------------------|------|
| Mom | Meijiブルガリア限定 | Exact + Auto | 残量2を切ったら自動注文 |
| Dad | ギリシャ風どれでも | Flexible + Confirm | AIが候補を選ぶ、注文前に確認 |
| Daughter | 何か新しい | Exploring + Suggest | 新味を提案、彼女が決める |
| Son | こだわりなし | Exact + 低頻度 | 関与しない、世帯デフォルトに従う |

**重要:** Brain は家族を1つのプロファイルに平坦化しない。各人のToken状態を独立に並列保持。**既存サービスはこれをやっていない。**

### 4.9 メモリのドメイン × 人 構造
メモリはフラットなリストではない。**ドメイン軸**(Health / Food / Finance / Hobby / Work)と**Disclosure軸**で組織化。各ドメインは異なる深さで蓄積される。Foodは深く、Workは浅く、など。Disclosureは「どのドアを開けるか」をユーザーが制御する。

---

## 5. Floor 4: Rule Engine

### 5.1 何か
> 「8 Tokens + Brain → 具体的なデザインルール。If/then logic at scale。推奨ではなくルール。」

### 5.2 ポジション
Floor 1 (Intent) → Floor 2 (Tokens) → Floor 3 (Brain) → **Floor 4 (Rule Engine)** → Floor 5 (Response)

### 5.3 ルールの例(plain English)
- **Rule 1:** IF cognitive load = high AND social exposure = public → simplify notification, delay non-urgent
- **Rule 2:** IF autonomy dial = Confirm AND priority weight = low → suggest but don't act
- **Rule 3:** IF form factor = watch AND physical state = walking → voice-only, no visual clutter

### 5.4 ルールの例(コード風)
```
if Physical State = driving           → UI = audio only
if Social Exposure = boss_nearby      → hide personal notifications
if Autonomy = Auto AND price < ¥500   → purchase without confirmation
if Cognitive Load = high              → reduce options to top 3
if Autonomy = Auto AND price > ¥15K   → always confirm (Dynamic Friction)
if Disclosure = hidden AND Autonomy > Confirm → constraint violation → reset Autonomy
```

### 5.5 コアフォーミュラ
**6 Situation Tokens + 2 Relationship Dials + Brain = Design Rules**

「No single token works alone」— トークンの組み合わせに力が宿る。

### 5.6 33の Behavior Rules
完全な仕様は Specs ページに記載。3つのYAMLファイル(context.yml / rules.yml / patterns.yml)で実装可能。

### 5.7 出力の3方向
すべてのデザインルールは3つの振る舞いカテゴリに収まる:
1. **Delegation** — AIが自分でやる
2. **Escalation** — AIが人間に聞く
3. **Adaptation** — AIが提示の仕方を変える

---

## 6. Floor 5: Response — 23 AX Patterns

### 6.1 構造
- **Level 1: 3 Response Directions**(Delegation / Escalation / Adaptation)
- **Level 2: 23 Patterns** + **4 Enterprise Patterns**

### 6.2 全23パターン一覧

#### 🔵 Delegation Patterns(D1-D6)— 6パターン

| ID | 名前 | 一言で | トリガー |
|----|------|--------|---------|
| **D1** | **Approval Gate** | 提案 → 承認/編集/却下のゲート | Autonomy = Confirm + Priority = HIGH |
| **D2** | **Progressive Trust** | 成功実績で承認頻度が徐々に下がる | Brain L2 success count exceeds threshold |
| **D3** | **Proactive Nudge** | 認知負荷が低い時に重要だが緊急でない事を提案 | Cognitive Load = LOW + Priority = MEDIUM + Feasibility = OK |
| **D4** | **Omakase Mode** | 信頼が成熟した領域での完全委任 | Autonomy = Auto + Disclosure = FULL + Brain L2 trust = HIGH |
| **D5** | **Substitution Modes** | 4段階の代替自由度設定 | 在庫切れ + Brain L1に設定あり |
| **D6** | **Dynamic Friction** | 高コスト/高リスク行動には信頼があってもfriction残す | Feasibility × Risk ≥ THRESHOLD |

#### 🟡 Escalation Patterns(E1-E5)— 5パターン

| ID | 名前 | 一言で | トリガー |
|----|------|--------|---------|
| **E1** | **Confidence Signal** | AIの確信度を段階表示。Social Exposure高い時はthreshold上げる | confidence ≤ 80% + Social Exposure ≥ MEDIUM |
| **E2** | **Limitation Disclosure** | AIが能力境界を正直に開示し、適切な資源へリダイレクト | Request outside boundary + Priority = HIGH |
| **E3** | **Rollback** | 既に実行した行動を取り消し、代替を提示 | Already executed + Feasibility changed |
| **E4** | **Ambiguity Escalation** | グレーゾーン判断を警告付きで人間に最終判断を委ねる | confidence = 40-79% (gray zone) |
| **E5** | **Trust Breach Recovery** | AI判断ミス後にAutonomy降格 + 信頼再構築 | User rejects/undoes AI decision |

#### 🟢 Adaptation Patterns(A1-A8)— 8パターン

| ID | 名前 | 一言で | トリガー |
|----|------|--------|---------|
| **A1** | **Form Factor Transform** | デバイス切替時にUI構造そのものを変える | Form Factor changes |
| **A2** | **Cognitive Scaling** | 認知負荷で情報密度・選択肢数を動的に調整 | Cognitive Load = HIGH |
| **A3** | **Social-Aware Filtering** | 誰が居るかで表示内容をフィルター | Social Exposure ≥ MEDIUM + Disclosure ≠ FULL |
| **A4** | **Disclosure Cascade** | 4レベル(FULL/SUMMARY/EXISTENCE/HIDDEN)の情報開示制御 | Disclosure setting × Social Exposure change |
| **A5** | **Disposable Surface** | 特定目的のためのUIが目的完了で消える | Intent = time-bound + Disposable Brain |
| **A6** | **Care Architecture** | 効率ではなく感情コンテキストを追跡、ケアの機会を提案(Marcos's Care Agent) | Brain L2 relationship + emotional context change |
| **A7** | **Live Recomposition** | 外部環境変化で既存プランを瞬時に組み直し | External Feasibility change + existing plan |
| **A8** | **Temporal Handoff** | 一時コンテキスト終了時に学びを永続Brainに選択的に返す | Disposable Brain ends + integration window |

#### 🟣 Enterprise Patterns(X1-X4)— 4パターン

| ID | 名前 | 一言で | トリガー |
|----|------|--------|---------|
| **X1** | **Reasoning Trace** | AIの推論を折り畳み形式で開示。高リスクは自動展開 | Priority = HIGH + user request OR auto-expand rule |
| **X2** | **Inline Edit** | 提案をその場で編集して再実行(Approval Gate内のEditパス) | "Edit" selected at Approval Gate |
| **X3** | **Autonomy Dial UI** | 4段階Autonomy Dialの明示制御UI | User explicitly adjusts |
| **X4** | **Source Attribution** | AIの回答が依拠したデータソースを明示(コンプラ要件対応) | Compliance rule + source request |

### 6.3 Anti-Patterns(AP1-AP4)
ページに4つの「やってはいけない」設計が記載されている。AP3は明確に Google PAIR / Microsoft HAX / IBM / Apple HIG とは違う立場を取っていることを言及している(具体内容未確認)。

### 6.4 パターン選択のディシジョンツリー
```
Q1: AIが判断しようとしているか?
   YES → Q2: ユーザーは委任する準備ができているか?
            YES → Delegation (D1-D6)
            NO  → Escalation (E1-E5)
   NO  → Q3: コンテキストが変化しているか?
            YES → Adaptation (A1-A8)
```

### 6.5 「初心者はどこから?」推奨スターター
- **D2 Progressive Trust**(信頼の段階的構築)
- **D1 Approval Gate**(基本の承認ゲート)
- **A3 Social-Aware Filtering**(社会的フィルタリング)

---

## 7. Cross-cutting: Trust Design

### 7.1 全体像
**Trust Design は1つのフロアではない。タワー全体を縦断する温度計。**

### 7.2 Disclosure Dial(2方向構造)

#### Protective方向(自分を守る)
4レベル: **Full → Summary → Existence → Hidden**

| レベル | 意味 | 例 |
|-------|------|------|
| Full | 全部共有 | 医療AIに健康データ全公開 |
| Summary | 概要のみ | フィットネスAIに「やや不活発」のみ |
| Existence | 「ある」だけ | 「予定がある」のみ、内容秘匿 |
| Hidden | 完全秘匿 | データ存在自体を隠す |

#### Connective方向(他者と繋ぐ)— ★完全に新規概念
4ステージ: **Push → Digest → Available → Off**

| ステージ | 意味 | 例 |
|---------|------|------|
| Push | 自動通知 | 妻のミーティング延長を即座にdadに通知 |
| Digest | まとめて | 「今週の家族のまとめ」を週末配信 |
| Available | 聞かれたら答える | dadが「妻今日忙しい?」と聞けば答える |
| Off | 完全分断 | 家族の情報は一切流通しない |

**インサイト:** 既存のすべての「プライバシー設定」は Protective 方向のみ。Connective 方向の設計は世界に存在しない。

### 7.3 Three Information Flows(3つの情報の流れ)
1. **User → AI** — Disclose(あなたがAIに教える)
2. **AI → Human** — Share / Filter(AIが他者にあなたの事を伝える)
3. **AI → AI / External** — Sync / Selective Disclosure(AI同士が情報を共有)

**シナリオ例:** 娘がGeminiの代名詞設定を変えた時、それは家族の会話AIにどう伝わるか。誰に、いつ、どのレベルで伝わるべきか。

### 7.4 Autonomy Dial の 3 Forces(再掲・重要)
| 力 | 何か | 例 |
|----|------|------|
| **Service Default** | サービスが初期設定する | Netflixはオートプレイがデフォルト |
| **AI Adjustment** | AIが実績に基づき自分の自律度を調整 | 50回連続成功でAuto昇格 |
| **User Override** | ユーザーの最終承認 | 「いつでも降ろせる」 |

**最重要:** ユーザーが単独でダイアルを回すモデルは現実と乖離している。**3つの力が常時作用している。**

### 7.5 コアルール: Disclosure ≥ Autonomy
**2x2マトリックス:**

| | Disclosure 高 | Disclosure 低 |
|---|--------------|--------------|
| **Autonomy 高** | ✅ Seamless | ❌ Dangerous |
| **Autonomy 低** | △ Safe but Impersonal | △ Informed but Manual |

**双方向のフィードバックループ:**
- Disclosure Grows Autonomy(共有が委任を成長させる)
- Success Grows Disclosure(成功が共有を促す)
- Failure Contracts Both(失敗は両方を縮める)

### 7.6 Dynamic Friction
**信頼が高くても、リスクが高い行動には常にfriction を残す。**

| 商品 | 価格 | リスク | Autonomy上限 |
|------|------|--------|------------|
| コンビニのおやつ | ¥200 | 低 | Auto OK |
| ランニングシューズ | ¥4,800 | 中 | Confirm 上限 |
| ディナーのワイン | ¥15,000 | 高 | Suggest 上限 |
| 航空券 | ¥80,000+ | 超高 | Always Ask |

**コストだけでなく irreversibility(取り消し不能性)も決定要因。**

### 7.7 Temporal Arc — 信頼の時間軸(5フェーズ)

| Phase | 名前 | 期間 | 特徴 |
|-------|------|------|------|
| 1 | **Encounter** | Day 1-7 | 知らない者同士。すべてSuggest |
| 2 | **Learning** | Week 1-4 | パターン蓄積開始。Confirmが増える |
| 3 | **Maturation** | Month 1-3 | 多くの領域でNotify。一部でAuto |
| 4 | **Crisis** | 単発イベント | 失敗発生時。瞬時にSuggestへ降下 |
| 5 | **Ambient** | Month 6+ | 信頼が大気のように存在。透明 |

**重要:** **Asymmetric transition(非対称遷移)**。上るのは階段、降りるのはエレベーター。

### 7.8 Trust Breach Recovery
1. **Instant Retreat** — 失敗瞬時に Autonomy 降格
2. **Accountability** — 「なぜ間違ったか」を正直に説明(ブラックボックス禁止)
3. **Rebuilding Takes Time** — 復旧は元の信頼構築より時間がかかる。Phase 2 から慎重に再開

### 7.9 Six Principles of Trust Design
1. **Disclosure ≥ Autonomy(双方向)** — 共有が先、委任が後。だが成功した委任は更なる共有を促す
2. **Trust Is Earned Through Results** — 小さな成功の積み重ねだけがダイアルを上げる
3. **Risk Never Exceeds Trust** — 信頼があってもリスクは常に確認(Dynamic Friction)
4. **Failure Destroys Instantly** — 非対称遷移を所与として設計
5. **Protect and Connect** — 制約だけでなく繋ぐ設計も。Disclosureには2方向ある
6. **Humans Remain the Final Authority** — 委任しても最終的にエスカレーション可能

---

## 8. Specs(実装層)

### 8.1 何があるか
3つの YAML ファイル + 33 design rules。Open Specification(CC BY 4.0)。

| ファイル | 内容 | 行数 |
|---------|------|------|
| context-tokens-spec.yaml | 8トークンの型定義、値域、ソース | 904 |
| brain-schema.yaml | 3層構造、ライフサイクルロジック | 1,147 |
| design-rules.yaml | 33 if/then ルール | - |

### 8.2 Try it in 2 minutes(コード不要)
| Tutorial | 対象 | 内容 |
|----------|------|------|
| 01 | Designers & PMs | Context Grammar で UI レビュー |
| 02 | Developers & Designers | Context-Adaptive UI バリエーション生成 |
| 03 | Engineers | ユーザーコンテキストモデル構築 |

YAML を ChatGPT / Claude にペーストするだけで、AIが「人間文脈の動作モデル」を獲得する。

---

## 9. キーインサイト総まとめ — 「何が独自で、何が他社にないか」

| インサイト | なぜ独自か |
|-----------|----------|
| **メモリは差別化要因ではない** | Claude/Gemini/Apple全部メモリ持ってる。提案するのはデザイン言語の層 |
| **Disclosure ≥ Autonomy** | この論理ルールは既存のagent frameworkにない |
| **Disclosureの2方向(Protective + Connective)** | Connective方向を設計しているサービスは世界にない |
| **Autonomyは3つの力で動く** | ユーザー単独操作モデルは現実と乖離している |
| **Disposable Brain** | 一時的なBrainインスタンスというコンセプト自体が新規 |
| **Multi-Person Orchestration** | 同じAIが各人に独立した状態を保つ設計はFamily Hubにもない |
| **Substitution Modes** | Exact/Flexible/Exploring/Surprise の段階化は未定義 |
| **Dynamic Friction** | 信頼軸とリスク軸を別物として設計する考え方 |
| **Temporal Arc(5フェーズ)** | 信頼を時間スパンで設計するフレームは存在しない |
| **23 AX Patterns × 3 Directions** | agentic UI の体系的なパターンライブラリは存在しない |

---

## 10. 既存技術との関係(Critical Factual Rules)

CLAUDE.md からの重要な事実確認ルール:

1. **Samsung Family Hub は家族データを保存する**(アレルギー、食事制限、メンバープロファイル6人、Voice ID、Samsung Health統合、AI Vision、レシピフィルタリング)。「冷蔵庫はあなたの家族を知らない」と言うのは事実誤認。
2. **メモリ自体は Context Grammar の独自性ではない**。Claude/Gemini全部持っている。Context Grammarのユニーク価値は**デザイン言語層**(Grammar、Dials、Multi-Person Orchestration、Modes、Trust Timeline、Disposable Brain)。
3. **Autonomy Dial は純粋にユーザー制御ではない**。Netflix/Amazon は既に高自動化がデフォルト。AIも実績で調整する。3つの力モデルが正しい。

---

## 11. 用語の正確性ルール(CLAUDE.mdより)

| 使うべき用語 | NG用語 |
|------------|--------|
| Autonomy Dial | Synchro Rate(古い名前) |
| Disclosure Dial | (新しい、古い名前なし) |
| 8 Context Tokens | 7 Context Tokens(古い構成) |
| Week 1 → Month 6(P1 timeline) | Month 1 → Year 1 |

---

## 12. 私がまだ把握しきれていない部分

| 領域 | 何が分かっていない |
|------|-------------------|
| **Anti-Patterns AP1-AP4** | AP3 が Google PAIR/Microsoft HAX とは異なる立場ということは知ったが、AP1, AP2, AP4 の具体内容未確認 |
| **Real-Life Verification 4 scenarios** | AX Patterns ページの末尾。4つのシナリオの完全な内容を確認していない |
| **5つの Projects (P1-P5)** | 各プロジェクトページの中身を読んでいない。どの Token / Pattern を強調しているか不明 |
| **Token Explainer 記事** | 別ファイルの存在は CLAUDE.md で言及。中身未読 |
| **15 Substack 記事** | OVERVIEW.md レベルでの言及はあるが、各記事の中身未読 |
| **日本語版ページ** | ja/grammar/ と ja/specs/ が翻訳済み。他は未翻訳 |
| **Confidence-based Pipeline** | Rule Engine ページに言及あったが、詳細なメカニズム未把握 |
| **どうやって Active/Passive/Ambient Intent を実装上検出するか** | Intent ページは「ある」と書くが、検出メカニズム未記述 |

これらは Takao への質問または追加リーディングで埋める必要がある。

---

## 13. このドキュメントの使い方

今後すべての判断・編集・Project吟味の **基準点** として参照する:

1. **新しい編集を提案する時** — このドキュメントに書かれた概念定義・用語ルールに準拠しているか確認
2. **Project ページを吟味する時** — 各プロジェクトがどの Token / Pattern を実装しているか、このドキュメントに照らして検証
3. **コンテンツの追加/削除を判断する時** — 削るとこのドキュメントの「キーインサイト」が伝わらなくなるか確認(伝わらなくなるなら削らない)
4. **新しい subagent / セッションを始める時** — このドキュメントを読ませてから作業開始

更新ポリシー:Takaoから訂正/追加情報を得たら即座にこのドキュメントを更新する。「私が知らないこと」のリストも更新していく。
