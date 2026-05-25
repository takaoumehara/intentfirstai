# Context Grammar Simulator — Scenario Registry

**Last updated**: 2026-05-13
**Total**: 29 scenarios (21 original + 8 featured)
**Simulator entry**: `context-grammar/simulator/` → `pipeline.js`

---

## Featured Scenarios — "表と裏" Reasoning + UI (2026-05-13)

These 4 scenarios were added to demonstrate the "表と裏" (reasoning + UI simultaneously) design and to target specific JD requirements (Samsung multi-agent orchestration, Google paradigm-beyond-traditional, Japan AI reasoning visibility).

---

## Featured Scenarios — Multi-Screen Orchestration (2026-05-13)

These 4 scenarios demonstrate **multi-screen orchestration** — where the Brain acts as a conductor across multiple devices and people simultaneously. This goes beyond responsive design into **agentic UI composition**: the same moment produces different roles for different screens, and the Brain dynamically assigns those roles based on situation signals and relationship dials.

---

### M19 · Multi-Person Orchestration — Dinner
**ID**: `mpo_dinner`  
**Intent**: 「夕食、何にしよっか?」  
**Context**: Hana family · Tuesday 18:31 · home kitchen  
**Default device**: Fridge  
**Tech level**: 🟢 現在 (Samsung Family Hub + multi-device Bluetooth already ships this)  

**What it shows**:  
One intent → 4 simultaneous UIs, one per family member. The Brain splits Social Exposure = 4 members × different locations + cognitive states.

| Person | What they get | Why |
|---|---|---|
| Mai (mom, home) | Full approval UI with shopping countdown | Autonomy=Confirm, highest authority |
| Kiran (dad, commute) | Summary card — 2 options only | Cognitive Load=high, Form Factor=phone-on-train |
| Aoi (daughter) | Dairy-free filtered list | L1 allergy identity layer |
| Leo (son, 6) | Thumbs-up / thumbs-down only | Cognitive Load=child, no ingredient details |

**Key AX Patterns**: D1 Approval Gate · D5 Substitution Modes · A3 Social-Aware Filtering · A2 Cognitive Scaling  
**UI Screen**: `ui-screens/simulator/m19-mpo-dinner.html` (new, 4-phone BACKSTAGE view)  
**Toggles**: Guests arriving (+2 adults, unknown allergies), Store closed (delivery fallback)  
**JD relevance**: Samsung ★ "マルチエージェント・タスクオーケストレーション"  

---

### S18 · 台風 + 新幹線全停止 — Live Recomposition
**ID**: `typhoon`  
**Intent**: 「今日中に東京に帰れますか?」  
**Context**: Kiran · Osaka · Wednesday 17:45 · typhoon warning level 4  
**Default device**: Phone  
**Tech level**: 🟢 現在 (real-time transport API + constraint solving already exists)  

**What it shows**:  
Crisis forces a Live Recomposition. Shinkansen cancelled → the UI doesn't show an error; it rebuilds with ranked alternatives (flight vs hotel vs wait), each with real confidence estimates. As the typhoon passes, options re-rank automatically — the UI evolves without user action.

**Key AX Patterns**: A7 Live Recomposition · D1 Approval Gate · D6 Dynamic Friction (¥47k flight = confirm gate) · E1 Confidence Signal (78% resume by 21:30)  
**UI Screen**: `ui-screens/p2-v2/s19-sakura-recompose.html` (reuse from Project 02)  
**Toggles**: Typhoon passes (options re-rank, shinkansen 78%), JAL late option appears  
**JD relevance**: Google ★ "従来モデルを超えたパラダイム探求" · Japan AI "AIの思考プロセスの可視化"  

---

### S4 · 深夜の衝動買い — Dynamic Friction vs Auto mode
**ID**: `midnight_purchase`  
**Intent**: 「カートに入れて、購入する」  
**Context**: Kiran · home · Tuesday 01:12 · alone · lying in bed  
**Default device**: Phone  
**Tech level**: 🟢 現在 (behavioral pattern data + time-of-day signals already available)  

**What it shows**:  
Autonomy Dial is set to Auto. But D6 Dynamic Friction fires anyway — it overrides the dial when conditions meet the threshold: (1) 01:12 + lying posture, (2) ¥38,000 purchase, (3) L2 knows "67% of late-night purchases are regretted by morning." The UI doesn't cancel — it inserts a "Sleep-on-it" gate with a one-tap morning reminder. Next morning at 07:30 the same cart reappears with a "71% of morning purchases go through — you're more confident now" signal.

**Key AX Patterns**: D6 Dynamic Friction (survives Auto) · D1 Approval Gate (sleep-on-it)  
**UI Screen**: `ui-screens/p1-v2/s8-6-dynamic-friction.html` (reuse from Project 01)  
**Toggles**: Morning (07:30, cart resurfaces + E1 signal), Budget tight (¥5,200 remaining → D6 hard block)  
**JD relevance**: Samsung ★ "トークン化されたデザインパターン"  

---

### S1 · 保育園送迎 × Slack緊急通知 — Form Factor Transform
**ID**: `school_run`  
**Intent**: (passive) 子供の送迎中  
**Context**: Kiran · driving · Tuesday 08:15 · CarPlay · kids in backseat  
**Default device**: Phone (CarPlay)  
**Tech level**: 🟢 現在 (CarPlay + driving detection already ships)  

**What it shows**:  
Visual UI locks the moment driving starts — Form Factor Transform fires. Slack arrives with a production incident (Priya, 3 messages, 78% urgency estimate). The UI converts the thread to an audio summary and offers: "止まってから返信しますか?" Once parked at school (08:19), the form factor reverts to visual. A draft reply is ready — D1 Approval Gate holds it for confirm before send.

**Key AX Patterns**: A1 Form Factor Transform (visual → audio-only → visual) · D6 Dynamic Friction (any interaction while moving) · E1 Confidence Signal (urgency 78%)  
**UI Screen**: `ui-screens/p1-v2/s9a-carplay-composite.html` (reuse from Project 01)  
**Toggles**: Parked (visual mode restores, draft ready), Passenger mode (audio can relax)  
**JD relevance**: Samsung ★ "ダイナミックレイアウトシステム"  

---

### MSX-1 · 18:30の家族会議 — Parallel Coordination + Flow Protection
**ID**: `msx_1830`
**Intent**: 「今夜のご飯、何時にする?」
**Context**: 5人同時 · Tuesday 18:30 · home kitchen
**Default device**: Samsung Family Hub Fridge
**Tech level**: 🟢 現在 (SmartThings + device proximity + behavioral signals already ships)

**What it shows**:
The invisible labor problem: one person (usually mom) holds everyone's schedule in their head, calls/texts each person sequentially, integrates answers, decides, then handles last-minute shopping. The Brain automates all of this.

The Fridge detects milk=0% at 18:30, dinner intent fires. Brain scans all 5 family members in parallel:

| Person | Situation | How they get asked |
|---|---|---|
| Kiran (dad) | In a meeting, can't break | Wait until meeting ends → then notify |
| Aoi (daughter) | Doing homework, focused | Between problems → gentle nudge |
| Leo (son) | In a game boss fight | After boss clears → show one-tap |
| Mai (mom) | Running outside | Big-button UI, location-aware shopping request |
| Sota (6) | Hunger reaching limit | Priority drives the timing calculation |

→ Optimal answer: **19:30**, confidence 82%. Mai gets "buy cream on the way home" task auto-assigned based on her running route.

**Key AX Patterns**: A3 Social-Aware Filtering · A2 Cognitive Scaling · D3 Proactive Nudge · A7 Live Recomposition
**UI Screen**: `ui-screens/simulator/msx-1830-family.html` (new, multi-screen BACKSTAGE view)
**Toggles**: One person declines (Brain recalculates), Mai already past the store (delivery fallback)
**JD relevance**: Samsung ★ "マルチエージェント・タスクオーケストレーション"

---

### MSX-2 · 工場・品質管理 — Priority Weight Cascade
**ID**: `msx_factory`
**Intent**: (passive) Line monitoring → anomaly detected
**Context**: Samsung factory · Line 2 temperature spike · Thursday 14:22
**Default device**: Wall-mounted TV + tablets + phones
**Tech level**: 🟢 現在 (IoT sensors + MES + role-based UI already ships)

**What it shows**:
An anomaly triggers a Priority Weight cascade. The same event produces different UIs for different roles — not based on screen size, but on **who needs to do what right now**.

| Screen | Role | What they see | Why |
|---|---|---|---|
| Wall TV | Ambient awareness | Line status map, Line 2 amber blink | Big picture without detail overload |
| Supervisor Tablet | Analysis | Root cause, affected stations, ETA | Needs full context for decisions |
| Line 2 Phone | Action | Step-by-step: "Check Station 3 temp" | Cognitive load=high → ONE thing |
| QA Tablet | Containment | "12 units — hold for QA" | Different role, different urgency |

**Key AX Patterns**: D6 Dynamic Friction (panic → simplified UI) · A7 Live Recomposition · A2 Cognitive Scaling · E1 Confidence Signal
**UI Screen**: `ui-screens/simulator/msx-factory.html` (new, multi-screen)
**Toggles**: Anomaly escalates (UI re-simplifies), False alarm (all screens return to normal)
**JD relevance**: Samsung ★ "マルチエージェント・タスクオーケストレーション"

---

### MSX-3 · 開発チーム・ローンチ危機 — Cognitive Load × Information Routing
**ID**: `msx_incident`
**Intent**: (passive) Production incident at 02:00
**Context**: Remote team · PM + Designer + Engineer · Sev1 alert
**Default device**: Phone ×3 + Laptop
**Tech level**: 🟢 現在 (Slack + PagerDuty exist, but don't route by cognitive state)

**What it shows**:
Three people, one incident, different needs. Context Grammar routes information by cognitive state, not by channel.

| Screen | Role | What they see | Why |
|---|---|---|---|
| Engineer Phone | Debug focus | Logs, diffs, deploy status only | Cognitive Load=90% → block non-essential |
| PM Phone | Communication | "ETA to stakeholders: ~15 min" draft | Doesn't need to interrupt engineer |
| Designer Laptop | Impact assessment | "Affected pages: 3 — mockup update" | Parallel work, decoupled from debugging |

Brain reads cognitive load and **prevents interruption**: when PM wants to ask engineer, Brain shows ETA instead.

**Key AX Patterns**: A2 Cognitive Scaling · A3 Social-Aware · D6 Dynamic Friction · A4 Disclosure Cascade
**UI Screen**: `ui-screens/simulator/msx-incident.html` (new, multi-screen)
**Toggles**: Root cause found (engineer's UI expands), Stakeholder escalates (Brain re-routes)
**JD relevance**: Google ★ "従来モデルを超えたパラダイム探求"

---

### MSX-4 · キッズ・コラボ描画 — Circular Role Flow
**ID**: `msx_kids`
**Intent**: 「お絵描きしよう!」
**Context**: Leo (9) + Sota (6) + neighbor kid · Sunday afternoon · living room
**Default device**: iPad (center) + Phone ×2
**Tech level**: 🟢 現在 (tablet + phone + real-time sync already ships)

**What it shows**:
A circular workflow: iPad shows prompt → kids draw on phones → drawings flow back to iPad. Each device's role **cycles** by phase.

| Phase | iPad | Phones |
|---|---|---|
| Prompt | "Draw a cat!" + timer | "Wait for it..." |
| Drawing | Progress dots | Age-appropriate canvas |
| Reveal | All drawings side-by-side | "Look at big screen!" |
| Vote | Voting UI | Thumbs up/down |

Age matters: Sota (6) gets big buttons, no text. Leo (9) gets medium complexity.

**Key AX Patterns**: A2 Cognitive Scaling (age-based UI) · A7 Live Recomposition (phase transitions) · A5 Disposable Brain
**UI Screen**: `ui-screens/simulator/msx-kids.html` (new, multi-screen)
**Toggles**: One kid finishes early (wait animation), Parent joins (adds vote)
**JD relevance**: Education · Samsung Family Hub transferable pattern

---

## Planned / Not Yet in Simulator

| Scenario | What it shows | Notes |
|---|---|---|
| **Translation Layer** (P1 reuse) | Same health data fact → 3 different reads per family member (dad, mom, daughter) | Already in P1 page (p1-scroll.html line 2484, `anim-translation-morph.html`). Would become scenario `translation_layer.js`. |

---

## Backlog — Discovered in Brainstorming Files (2026-05-13)

Source: `_private/_Brainstorming/` — extracted from Real_Life_Scenarios_Takao.md, Micro_Moment_Demos_Spec.md, Context_Grammar_as_OS_Layer.md, project01/02/03 brainstorm docs, AX_Pattern_Library_Complete.md, P4_P5_Scenario_Redesign.md

### Priority A — シミュレーターへの追加を強く推奨

---

#### BA-01 · Instagram × Maps × 今いる場所 ★★★★★
**なぜContext Grammarか**: クロスアップBrainの最も純粋な実証。Instagramは位置情報を知らない。Mapsは8ヶ月前のセーブを知らない。BrainだけがL2(セーブ履歴)×L3(現在GPS)の両方を保持する。

**Intent**: (passive) 渋谷を歩いている  
**Context**: 昼11:30 · カレンダー13:00まで空き · 8ヶ月前にBlue Bottle Coffee 渋谷をInstagramでセーブ済み · 現在200m圏内  
**Tech level**: 🟡 近未来 (OS-level cross-app Brain = Android/iOS未実装。Gemini/Samsung AIが近づいている)

**Brain firing**:
- L2: 「Blue Bottle Coffee 渋谷 — Instagram save 8ヶ月前」
- L3: 現在地 35.6598, 139.7031 · 速度 4km/h(徒歩) · カレンダー次予定13:00
- Rule Engine: 距離200m × セーブ済み興味 × 時間的余裕あり → 閾値超え

**UI**: OSレベルの通知1枚「8ヶ月前にセーブしたBlue Bottle Coffee — 200m先。今混んでいます(15分待ち)。寄りますか?」

**Variants**:
- 友人と一緒の場合: Social Exposure変化 → Confirm UI「一緒に行きますか?」+ 2名テーブル空き状況
- 帰り道の場合: 「帰り道にあります — 帰宅時に通知しますか?」
- 混雑時: 「現在30分待ち。明日同じエリアに来る予定があります」

**Key AX Patterns**: D3 Proactive Nudge · A3 Social-Aware Filtering (友人同伴variant) · E1 Confidence Signal (待ち時間)  
**JD relevance**: Google ★★ "従来モデルを超えたパラダイム" · Samsung ★ OS-level AI  
**「なぜアプリではなくOSか」の最強論拠**: 5アプリ×12タップ×3分 vs 通知1つ×0タップ  
**Source**: `Context_Grammar_as_OS_Layer.md`, `Real_Life_Scenarios_Takao.md` #10, `project02_family_trip.md` Scene 11

---

#### BA-02 · 雨の日 — 4デバイスが10秒で変わる ★★★★★
**なぜContext Grammarか**: M19 MPO Dinnerの旅行版。同一イベント(「雨だ」)→4台が4通りに変わる。Multi-Person Orchestrationが旅先という普遍的コンテキストで発動する。

**Intent**: 「雨が降ってきた」(Kirn · 京都旅行3日目 · 17:00)  
**Context**: 家族4人 · 宿泊中ホテル · 明日の予定は屋外(嵐山・伏見稲荷) · 予算残¥82,000  
**Tech level**: 🟡 近未来 (4デバイス同時更新 = 現在のAIは全員に同じ通知を送る)

**4デバイスの変化**:

| デバイス | 変化内容 | 理由 |
|---|---|---|
| ホテルTV | 屋内ルート + 全日マップ再描画 | Form Factor=大画面 · 家族全員が見る |
| 父スマホ | Confirm UI「予算+¥2,480。変更しますか?」 | Autonomy=Confirm · 決定権者 |
| 母スマホ | Notify「変更しました — カメラ持参を」 | Autonomy=Notify |
| 娘タブレット | 「ADVENTURE CHANGE! 🚂」写真のみ · 予算なし | Cognitive=child · 感情優先翻訳 |

**Key AX Patterns**: A7 Live Recomposition · A2 Cognitive Scaling · A4 Disclosure Cascade (予算を子どもに非表示) · D1 Approval Gate  
**JD relevance**: Samsung ★★ MPO · Google ★ パラダイム  
**Source**: `Micro_Moment_Demos_Spec.md` Demo 2, `project02_family_trip.md` Scene 7

---

#### BA-03 · フォン→TV→リモコン変身 ★★★★★
**なぜContext Grammarか**: 2台のデバイスで1つのUIが物理的に分裂する。キャスト=ミラーリングという既存概念を完全に覆す。A1 Form Factor Transformの最も視覚的なデモ。

**Intent**: 「息子の冬のPE靴を買いたい」→ TVにキャスト  
**Context**: 父 · リビング · 息子(10歳)隣 · Phone→TVキャスト瞬間  
**Tech level**: 🟡 近未来 (コンポーネント分裂 = 現在のキャストはミラーリングのみ)

**キャスト前後の変化**:

| 要素 | キャスト前(スマホ) | キャスト後 |
|---|---|---|
| TV | (なし) | 8足の大きい画像 + 「防水!」「軽い!」感情ラベル · 価格なし |
| スマホ | 商品グリッド + 価格 | D-padリモコン + 選択中の価格 + Buyボタンのみ |
| 息子 | 関与なし | TVを指さして「これ!」 |
| 購入フロー | 通常カート | 父がスマホでOK→3タップで完了 |

**なぜ価格をTVに出さないか**: Social Exposure=息子が隣 · Disclosure Dial=「子どもに価格を見せない」→ A4 Disclosure Cascade発動  
**Key AX Patterns**: A1 Form Factor Transform · A4 Disclosure Cascade · D1 Approval Gate  
**6ヶ月後variant**: 「前回の購入から6ヶ月。サイズアップしているかもしれません」→ 847候補→2候補に絞られる  
**JD relevance**: Samsung ★★ ダイナミックレイアウト · Google ★ パラダイム  
**Source**: `project03_fluid_handoff.md`, `Micro_Moment_Demos_Spec.md` Demo 1, `AX_Pattern_Library_Complete.md` A1/A4

---

#### BA-04 · 娘の代名詞変更 — 段階的Disclosure ★★★★★
**なぜContext Grammarか**: Disclosure Dialの最も人間的な実証。世界中のどの製品にもこの設計概念はない。「全員に共有 / 先にお母さんに / 誰にも言わない」の3択は、Disclosure Dialが単なるプライバシー設定ではなく**人間関係の設計**であることを示す。

**Intent**: 娘がGeminiプロフィールのhe/himに変更  
**Context**: 娘(13歳) · 家のタブレット · 放課後ひとりで操作  
**Tech level**: 🟡 近未来 (関係別Disclosure自己管理 = 現在未実装)

**AIが提示する3択**:
1. 「今すぐ家族全員に共有」
2. 「先にお母さんだけに伝える」
3. 「今はだれにも言わない」

→ 娘が「先にお母さんだけ」を選択  
→ 数週間後、娘がお父さんに直接LINEで伝える  
→ 「家族全員」に更新 → Nest、カレンダー表示名、全デバイスに代名詞が伝播

**拡張**: 日本語補習校=非開示。地元の学校の友達=全開示。祖父母(母方)=非開示。関係ごとに独立した設定。  
**Key AX Patterns**: A4 Disclosure Cascade · D1 Approval Gate · D2 Progressive Trust  
**JD relevance**: Samsung ★ Trust Design · Disclosure Dial唯一の実証  
**Source**: `project01_growing_family.md` Scene 8, `AX_Pattern_Library_Complete.md` A4

---

#### BA-05 · Spotify × コンサート × カレンダー — 3データソース横断 ★★★★
**なぜContext Grammarか**: 3つのアプリをまたぐBrain統合。Spotifyは再生履歴を知っている。イベント情報サービスはツアー発表を知っている。Googleカレンダーは家族の予定を知っている。Brainだけが3つをつなぐ。

**Intent**: (passive — AIが先回り)  
**Context**: 好きなアーティストがツアー発表 · Spotify 過去6ヶ月200回以上再生 · 4/15家族カレンダー空き · 4/16は娘のレッスン

**Surface**: 「X がツアー発表。4/15は家族カレンダーに予定なし。一般販売は火曜10:00から。」  
**Key AX Patterns**: D3 Proactive Nudge · E1 Confidence Signal · D1 Approval Gate  
**Tech level**: 🟡 近未来  
**Source**: `Real_Life_Scenarios_Takao.md` #4, `project02_family_trip.md` Scene 13

---

### Priority B — 有力候補(実装前の検討推奨)

---

#### BB-01 · IoT × OS購入 — Blueairフィルター ★★★★
アプリを開かずにOSレベルで購買完結。空気清浄機がフィルター残量15%をIoT APIで報告 → BrainがL2(3ヶ月交換サイクル)を参照 → OSが通知「前回と同じものを補充しますか?」Blueairアプリを開く必要なし。

**Core principle**: 「情報がユーザーのところに来る。ユーザーが情報を探しに行かない。」  
**Key AX Patterns**: D3 Proactive Nudge · D4 Omakase Mode (Confirm後)  
**Tech level**: 🟢 現在 (IoT APIは既存。OS-level購買統合が近未来)  
**Source**: `Real_Life_Scenarios_Takao.md` #3, `project01_growing_family.md` Scene 18

---

#### BB-02 · 春の大掃除 — 5デバイスオーケストレーション ★★★★
「掃除しよう」の一声で → Nestが役割分担を提案 → TVが家の間取り+進捗マップ → 息子タブレットがゲーム式ミッション → 娘タブレットがイラスト付きチェックリスト → 父スマホがサルベーションアーミー&電気屋の予約管理。同じ家の中で5デバイスが5通りの役割を持つMPO。

**Key AX Patterns**: A1, A2 Cognitive Scaling (子ども版), D1, D3  
**Tech level**: 🟡 近未来  
**Source**: `UI_Opportunity_Map.md` #44-48, `project01_growing_family.md` Scene 13

---

#### BB-03 · 自律性タイムライン — Month1→Year1の信頼の成長 ★★★★
同じ「ヨーグルト補充」シナリオが4ステージで変化する: Week1=Suggest(3択表示) → Month1=Confirm(1択+承認?) → Month3=Notify(注文済み・金曜着) → Month6=Auto(何も表示されずヨーグルトが届く)。途中で間違いが起きてDialが下がるシーンも含む。信頼の成長を時間軸で見せる唯一のシナリオ。

**Key AX Patterns**: D2 Progressive Trust · E4 Trust Breach Recovery · D4 Omakase Mode  
**Tech level**: 🟢 現在  
**Source**: `Micro_Moment_Demos_Spec.md` Demo 3, `AX_Pattern_Library_Complete.md` D2/E4

---

#### BB-04 · 家族4人のヨーグルト問題 — Substitution Modes全種類 ★★★
同じ「ヨーグルト」カテゴリで家族4人が全て違うモード: 妻=Exact(特定ブランドのみ), 父=Flexible(高タンパクなら何でも), 娘=Exploring(乳製品フリーを模索中), 息子=Surprise(毎回違うもの)。4つのSubstitution Modesを1画面で見せられる。

**Key AX Patterns**: D5 Substitution Modes (全4種)  
**Tech level**: 🟢 現在  
**Source**: `Real_Life_Scenarios_Takao.md` #6, `project01_growing_family.md` Scene 2

---

#### BB-05 · 健診結果 × 家族への段階的開示 (Translation Layer) ★★★★
父が健診でコレステロール値が高いと判明。同じ数値が3人に違う形で届く: 妻=詳細データ+医師予約提案, 父本人=改善アクション+食事提案, 子ども=「お父さんは元気です」のみ。Kiran's Translation Layerシナリオ(P1に既存)をシミュレーターへ。

**Key AX Patterns**: A4 Disclosure Cascade · A2 Cognitive Scaling · E2 Limitation Disclosure  
**Existing asset**: `projects/project-01/p1-scroll.html` line 2484, `anim-translation-morph.html`  
**Tech level**: 🟢 現在  
**Source**: P1プロジェクト既存 + `AX_Pattern_Library_Complete.md` A4

---

#### BB-06 · 土曜日の補習校ナビ — ハビット自動学習 ★★★
毎週土曜9:00に息子を補習校へ車で送る。3回繰り返すとBrain L2がパターンを学習。4回目: Bluetooth接続 + 土曜9:00 → 「Faithside High Schoolへのナビを開始しますか?」。「今日は行かない」のケアも設計済み(NotifyのCeiling — 例外リスクがあるため完全Autoにはしない)。

**Key AX Patterns**: D3 Proactive Nudge · D2 Progressive Trust · E5 Autonomy Auto-Demotion(例外時)  
**Tech level**: 🟢 現在  
**Source**: `Real_Life_Scenarios_Takao.md` #2

---

#### BB-07 · 海外(リスボン)Day1→Day5 — 地理的信頼境界 ★★★★
(既存シナリオ `foreign_country` の詳細化)  
Day1: 着陸直後。Autonomy=Auto → Confirmに自動降格。「注文しましょうか?」→「どれにしますか?」に変わる。言語も日英2択表示。Trust boundary=geographic。  
Day5: 同じintent「食事を頼んで」→ 今度は3択提案+推薦1つ+Confirm。信頼が徐々に回復。  
**5日間の信頼アーク**を1シナリオで見せる。

**Key AX Patterns**: D2 Progressive Trust · D4 Trust Recovery · A1 Form Factor  
**Tech level**: 🟢 現在  
**Source**: `project02_family_trip.md` Scene 14, `AX_Pattern_Library_Complete.md` D2

---

### Priority C — 参考・将来候補

| ID案 | シナリオ | Core concept | Source |
|---|---|---|---|
| `yogurt_autonomy` | ヨーグルト自動注文成長 | D2フルアーク | Micro_Moment_Demos_Spec Demo3 |
| `cleaning_day` | 春の大掃除5デバイス | MPO家庭内 | UI_Opportunity_Map #44-48 |
| `mcdonald_filter` | マクドナルド注文時のヘルスゴールフィルター | D3+健康目標Brain | Real_Life_Scenarios #9 |
| `instacart_fridge` | Instacart注文履歴→冷蔵庫在庫推定 | Feasibility Token | project01 Scene |
| `daughter_art` | 娘のインスタ作品→家族へConnective Disclosure | Connective方向のDisclosure | project01 Scene 9 |
| `frieren_manga` | 父がKindle購入→娘が読む→娘の推薦が父に届く | Connective双方向 | project01 Scene 11 |
| `son_privacy` | 息子が初めてプロジェクトをHiddenに設定 | Disclosure自己管理の芽生え | project01 Scene 12 |
| `insurance_p4` | 保険会社の台風査定 — 4エージェント並列 | Enterprise MPO | P4_P5_Scenario_Redesign |
| `insurance_p5` | フィールドエージェント — AI同行型 | Enterprise accompaniment | P4_P5_Scenario_Redesign |
| `decaf_switch` | ダークローストへの好みを保ちながらデカフェに切り替え | Flexible Substitution Mode + 健康Goal更新 | Real_Life_Scenarios #11 |
| `park_gap` | カレンダーの30分空き→近くの公園提案 | D3 + 健康Goal + Feasibility | Real_Life_Scenarios #9 |
| `concert_ticket` | Spotify再生履歴×ツアー発表×カレンダー空き | 3データソースBrain統合 | Real_Life_Scenarios #4 |
| `tv_command_center` | 大掃除中のTV進捗マップ | MPO可視化 | UI_Opportunity_Map #44 |
| `rain_day_mpo` | 旅行中の雨→4デバイス10秒再構成 | MPO旅行版 | Micro_Moment_Demos Demo2 |
| `phone_to_tv_remote` | 靴をTVにキャスト→スマホがリモコンに変身 | A1+A4 Component Split | project03_fluid_handoff |
| `pronoun_disclosure` | 代名詞変更の段階的共有 | Disclosure人間関係設計 | project01 Scene 8 |
| `trip_multi_device` | 旅行プラン — 5デバイス同時異UI | MPO旅行プランニング | project02 Scene 2 |
| `shopping_brain` | 靴検索Brain誕生→購入→消滅→Home Brainへ | A5 Disposable Brain lifecycle | project03_fluid_handoff |

---

## All 25 Scenarios — Master List

| # | ID | Label | Context | Default device | Key AX Patterns | Tech |
|---|---|---|---|---|---|---|
| 01 | `dinner` | Dinner planning | Tue 18:30 · family · fridge | Fridge | D1, D5, A3, D3 | 🟢 |
| 02 | `winddown` | Wind-down · sleep | Tue 22:34 · in bed | Phone | A2, D3 | 🟢 |
| 03 | `maps_dinner` | Maps · saved spots | Fri 19:15 · walking | Phone | A3, D5 | 🟢 |
| 04 | `banking_public` | Banking in public | Tue 14:12 · café · stranger nearby | Phone | A4 Disclosure Cascade, A3 | 🟢 |
| 05 | `cooking_active` | Cooking · hands wet | Tue 19:42 · fridge takes over | Fridge | A1, A2 | 🟢 |
| 06 | `tv_resume` | TV → bedroom | Sat 22:38 · auto-resume | Phone | A1 Form Factor Transform | 🟢 |
| 07 | `driving_fatigue` | Driving · fatigue | Wed 23:14 · highway safety | Phone | A1, D6, E1 | 🟢 |
| 08 | `coming_home` | Coming home | Tue 18:32 · 5 min away | Phone | A1, D3 Proactive Nudge | 🟢 |
| 09 | `meeting_2min` | Meeting in 2 min | Wed 09:58 · walking | Phone | A1, A2, D6 | 🟢 |
| 10 | `doorbell_guest` | Doorbell · guest | Sat 14:45 · privacy swap | Fridge | A4, A3, D2 Progressive Trust | 🟢 |
| 11 | `kid_sick` | Kid sick at school | Wed 12:30 · Focus Mode break | Phone | D6, A6 Care Architecture, A2 | 🟢 |
| 12 | `gift_hiding` | Gift · partner privacy | Sun 11:20 · Daichi adjacent | Phone | A4 Disclosure Cascade, A3 | 🟢 |
| 13 | `travel_plan` | Travel · multi-day plan | 2 weeks before · multi-device | iPad | A7 Live Recomposition, D1, A5 Disposable Brain | 🟡 |
| 14 | `grocery_aisle` | Grocery · in-aisle | Sat 11:18 · scanner + budget | Phone | D5, E1, D6 | 🟢 |
| 15 | `work_crisis` | Work crisis · 23:00 | Tue 23:04 · token collision | Phone | D6, E2, A2 | 🟢 |
| 16 | `onboarding` | Day 1 vs Month 6 | Same intent · Brain matures | Phone | D2 Progressive Trust, D5 | 🟢 |
| 17 | `foreign_country` | Travel · foreign SIM | Lisbon Day 1 · trust resets | Phone | D2, D4 Trust Recovery, A1 | 🟢 |
| 18 | `morning_commute` | Morning commute · train | Wed 08:12 · thumb arc | Phone | A1, A2, A3 | 🟢 |
| 19 | `homework_help` | Kid homework · explain | Tue 19:00 · iPad · child UI | iPad | A2, A3 Social-Aware | 🟢 |
| 20 | `post_meeting` | Post-meeting decompress | Wed 12:48 · enforced break | Phone | D6, D3, A2 | 🟢 |
| 21 | `hospital_waiting` | Hospital · waiting room | Fri 14:42 · audio · public | Phone | A3, A1, E2 | 🟢 |
| 22 | `mpo_dinner` ★ | **MPO — 4人同時 · 夕食** | Tue 18:31 · home kitchen | Fridge | D1, D5, A3, A2 | 🟢 |
| 23 | `typhoon` ★ | **台風 — 新幹線全停止** | Wed 17:45 · Osaka · crisis | Phone | A7, D1, D6, E1 | 🟢 |
| 24 | `midnight_purchase` ★ | **深夜の衝動買い** | Tue 01:12 · bed | Phone | D6, D1 | 🟢 |
| 25 | `school_run` ★ | **送迎中 — Slack緊急通知** | Tue 08:15 · CarPlay · driving | Phone | A1, D6, E1 | 🟢 |
| 26 | `msx_1830` ★★ | **18:30の家族会議 — 並列調整** | Tue 18:30 · 5人同時 · kitchen | Fridge + Phone×4 | A3, A2, D3, A7 | 🟢 |
| 27 | `msx_factory` ★★ | **工場・品質管理 — Priority Cascade** | Thu 14:22 · Line2 anomaly | TV + Phone×2 + Tablet | D6, A7, A2, E1 | 🟢 |
| 28 | `msx_incident` ★★ | **開発チーム・情報経路** | Tue 02:00 · Sev1 · remote | Phone×3 + Laptop | A2, A3, D6, A4 | 🟢 |
| 29 | `msx_kids` ★★ | **キッズ・コラボ描画** | Sun PM · living room | iPad + Phone×2 | A2, A7, A5 | 🟢 |

★★ = Multi-Screen Orchestration (2026-05-13)  
🟢 = 現在の技術で実現可能 · 🟡 = 近未来 (2-3 years) · 🔴 = 未来 (5+ years)

---

## Scenario Coverage — Situation Signals & Relationship Dials Map

Which signals/dials are *the primary driver* in each scenario:

| Token | Scenarios |
|---|---|
| Physical State | `cooking_active`, `driving_fatigue`, `meeting_2min`, `hospital_waiting`, `school_run`, `msx_1830` (Mai) |
| Cognitive Load | `work_crisis`, `post_meeting`, `morning_commute`, `kid_sick`, `mpo_dinner` (Leo), `msx_1830` (Kiran/Aoi/Leo), `msx_incident` (Engineer), `msx_factory` (Line 2) |
| Social Exposure | `banking_public`, `doorbell_guest`, `gift_hiding`, `mpo_dinner`, `school_run`, `msx_1830` (Mai=running), `msx_incident` (PM↔Engineer) |
| Priority Weight | `kid_sick`, `work_crisis`, `typhoon`, `midnight_purchase`, `msx_1830` (Sota=hunger), `msx_factory` (anomaly cascade) |
| Form Factor | `tv_resume`, `cooking_active`, `driving_fatigue`, `school_run`, `hospital_waiting`, `msx_factory` (TV/Tablet/Phone), `msx_kids` (iPad/Phone) |
| Feasibility | `travel_plan`, `grocery_aisle`, `typhoon`, `midnight_purchase`, `msx_1830` (cream stock) |
| Autonomy Dial | `onboarding`, `foreign_country`, `midnight_purchase`, `doorbell_guest`, `msx_1830` (Kiran=confirm, Aoi=auto) |
| Disclosure Dial | `banking_public`, `gift_hiding`, `doorbell_guest`, `mpo_dinner` (Aoi), `msx_incident` (logs vs ETA) |

---

## AX Pattern Coverage

| AX Pattern | Scenarios that demonstrate it |
|---|---|
| A1 Form Factor Transform | `cooking_active`, `tv_resume`, `driving_fatigue`, `meeting_2min`, `school_run`, `hospital_waiting` |
| A2 Cognitive Scaling | `winddown`, `kid_sick`, `work_crisis`, `mpo_dinner` (Leo), `msx_1830` (5人), `msx_factory` (Line2), `msx_incident` (Engineer), `msx_kids` (年齢別) |
| A3 Social-Aware Filtering | `maps_dinner`, `banking_public`, `doorbell_guest`, `mpo_dinner` (Aoi), `msx_1830` (Mai=running), `msx_incident` (PM↔Engineer) |
| A4 Disclosure Cascade | `banking_public`, `gift_hiding`, `doorbell_guest`, `msx_incident` (logs hidden from PM) |
| A5 Disposable Brain / Surface | `travel_plan`, `coming_home`, `msx_kids` (temporary play session) |
| A6 Care Architecture | `kid_sick`, `driving_fatigue` |
| A7 Live Recomposition | `travel_plan`, `typhoon`, `msx_1830` (countdown starts), `msx_factory` (normal→anomaly), `msx_kids` (phase transitions) |
| D1 Approval Gate | `dinner`, `travel_plan`, `mpo_dinner`, `typhoon`, `midnight_purchase`, `school_run` |
| D2 Progressive Trust | `doorbell_guest`, `onboarding`, `foreign_country` |
| D3 Proactive Nudge | `dinner`, `coming_home`, `winddown`, `msx_1830` (parallel ask) |
| D4 Trust Recovery | `foreign_country` |
| D5 Substitution Modes | `dinner`, `maps_dinner`, `grocery_aisle`, `mpo_dinner` (Aoi) |
| D6 Dynamic Friction | `driving_fatigue`, `work_crisis`, `kid_sick`, `typhoon`, `midnight_purchase`, `school_run`, `msx_factory` (panic→simple) |
| E1 Confidence Signal | `driving_fatigue`, `kid_sick`, `typhoon`, `school_run`, `grocery_aisle`, `msx_factory` |
| E2 Limitation Disclosure | `cooking_active`, `work_crisis`, `hospital_waiting` |
| X1 Reasoning Trace | (all — surfaced via causal trace hover in pipeline.js) |

---

## UI Screen Files

| Scenario ID | UI Screen | Source |
|---|---|---|
| `mpo_dinner` | `ui-screens/simulator/m19-mpo-dinner.html` | New (2026-05-13) |
| `typhoon` | `ui-screens/p2-v2/s19-sakura-recompose.html` | Reuse from P2 |
| `midnight_purchase` | `ui-screens/p1-v2/s8-6-dynamic-friction.html` | Reuse from P1 |
| `school_run` | `ui-screens/p1-v2/s9a-carplay-composite.html` | Reuse from P1 |
| `msx_1830` | `ui-screens/simulator/msx-1830-family.html` | New (multi-screen, 2026-05-13) |
| `msx_factory` | `ui-screens/simulator/msx-factory.html` | New (multi-screen, 2026-05-13) |
| `msx_incident` | `ui-screens/simulator/msx-incident.html` | New (multi-screen, 2026-05-13) |
| `msx_kids` | `ui-screens/simulator/msx-kids.html` | New (multi-screen, 2026-05-13) |
| All others | (inline rendering in pipeline.js) | pipeline.js Stage 4 |
