# Context Grammar — Projects 01–06 Master Inventory
### 全機能・体験・テックスタックの棚卸し（Personal use / Business use 両軸）

**Generated:** 2026-08-01
**Purpose:** 他の Claude セッションに「Takao がもともと何を考えていたか」を一つのファイルで渡すための引き継ぎ資料。
6つのプロジェクトページ（約 1.3 MB の HTML）と `context-grammar/specs` `sdk` `simulator` `prd` を実際に読んで抽出した内容。
**Source of truth for the framework itself:** [`context-grammar/_my-understanding.md`](context-grammar/_my-understanding.md) — 本ファイルはその「§12 まだ把握しきれていない部分 → 5つの Projects の中身を読んでいない」を埋めるもの。

> **読み方 / How to use this file**
> - §1–§2 = 全体像。まずここだけ読めば地図になる。
> - §3 = プロジェクト単体で作業するとき。該当セクションだけ読む。
> - §4 / §5 = 「パーソナル向けに何が作れるか」「ビジネス向けに何が作れるか」を機能単位で引きたいとき。
> - §6–§8 = 実装・テックスタックの話。何が本当にコードとして存在し、何が構想なのかを分けてある。
> - §9–§11 = 図、マトリクス、リポジトリの負債。

---

## §0. 一行で

> **8つの Context Token で「今の状況」を読み、3層の Brain で「その人」を覚え、33のルールで具体的な UI 挙動に変換する設計言語。**
> それを 6 つのスケール（個人 → 家族 → 期間限定 → デバイス間 → サーフェス間 → 組織）で実証したのが Project 01–06。

---

## §1. Framework recap — 全プロジェクト共通の土台

### 1.1 Context Tower（5階構造）

```
┌──────────────────────────────────────────────────────────────┐
│  Floor 5 · AX Patterns        23 patterns × 3 directions      │
│                               Delegation / Escalation / Adapt │
├──────────────────────────────────────────────────────────────┤
│  Floor 4 · Rule Engine        33 if/then design rules         │
├──────────────────────────────────────────────────────────────┤
│  Floor 3 · Context Brain      Identity / Learning / Now       │
│                               × Domain × Person               │
├──────────────────────────────────────────────────────────────┤
│  Floor 2 · Context Tokens     6 situation + 2 relationship    │
├──────────────────────────────────────────────────────────────┤
│  Floor 1 · Intent             Explicit / Active / Passive /   │
│                               Ambient                         │
└──────────────────────────────────────────────────────────────┘
        ↕ Cross-cutting · Trust Design
        Disclosure Dial × Autonomy Dial の結合／Temporal Arc／
        Dynamic Friction／Trust Breach Recovery
```

### 1.2 8 Context Tokens

| # | Token | 問い | Reality (2026) |
|---|---|---|---|
| ① | Physical State | 急いでいるか、落ち着いているか | ★★★★☆ |
| ② | Cognitive Load | 認知帯域はどれだけ残っているか | ★★☆☆☆ 推定のみ |
| ③ | Social Exposure | 誰が見ているか | ★★★★☆ |
| ④ | Priority Weight | 衝突したとき何が勝つか | ★★★☆☆ |
| ⑤ | Form Factor | どのサーフェスか | ★★★★☆ |
| ⑥ | Feasibility | 今、現実的に何ができるか | ★★★☆☆ |
| ⑦ | **Autonomy Dial** | どこまで任せるか（Suggest→Confirm→Notify→Auto） | ★★★☆☆ |
| ⑧ | **Disclosure Dial** | 何をどこまで知らせるか | ★☆☆☆☆ 最も独自 |

**絶対ルール:** `Disclosure ≥ Autonomy`。「知らせない × 任せる」は論理的に不可能。SDK の `getAutonomyCeiling()` として実際にコード化されている唯一の制約。

### 1.3 Autonomy Dial は3つの力で動く

```
   Service Default  ──┐
   AI Adjustment    ──┼──►  現在の Autonomy 位置
   User Override    ──┘      （ユーザー単独操作モデルは誤り）
```

上るのは階段、降りるのはエレベーター（asymmetric transition）。

---

## §2. Project index — 6つのスケール

| P | Title | Scale | 主人公 | 期間 | Canonical file |
|---|---|---|---|---|---|
| **P6** | Life Brain | **1人** | Lena (30, UXリサーチャー, 東京) | 30日 | `projects/project-06/p6-life-brain-v2.html` |
| **P1** | The Living Home | **家族（常設）** | Yamashiro家 5人 (SF) | 12ヶ月 + 20年 | `projects/project-01/p1-scroll.html` |
| **P2** | The Family Trip | **家族 × 期間限定** | Stern家 4人 (Brooklyn→日本) | 14日 + 前後6ヶ月 | `projects/project-02/p2-scroll-v2.html` |
| **P3** | Fluid Handoff | **家族 × デバイス間** | Campbell-Adeyemi家 4人 (London) | 1日 + 12ヶ月 | `projects/project-03/p3-scroll.html` |
| **P5** | Cross-Surface Grammar | **1人 × 5サーフェス** | Ines & Mateo (Copenhagen) | 1日 | `projects/project-05/p5-scroll-v2.html` |
| **P4** | Enterprise Context Brain | **組織** | Priya他6名 | 2026→2029 | `projects/project-04/p4-scroll-v4.html` |

### 2.1 スケールの梯子

```
        ┌─────────────────────────────────────────────┐
        │  P4  ENTERPRISE — 5 Brains, 3年, 継承       │  ← business
        └────────────────▲────────────────────────────┘
                         │ 同型（P6が最小の検証台）
        ┌────────────────┴────────────────────────────┐
        │  P1  FAMILY — 5 Brains(家庭版), 12ヶ月      │
        │      ├ P2  TRIP — Disposable Brain, 14日    │
        │      ├ P3  HANDOFF — 4 surfaces, 1日        │
        │      └ P5  CROSS-SURFACE — 5 dialects       │
        └────────────────▲────────────────────────────┘
                         │
        ┌────────────────┴────────────────────────────┐
        │  P6  LIFE BRAIN — 1人, 30日                 │  ← personal
        └─────────────────────────────────────────────┘

  P6 の主張: 「Life Brain は P4 の Project Brain と構造的に同一。
              最小スケールで検証してから最大へ出すのが低リスク経路」
  P1 の主張: 「Household Brain ↔ Org Brain, Person Brain ↔ Brand Brain,
              Domain Brain ↔ Research Brain, Coordinator ↔ PMB,
              Event Brain ↔ Project Brain」 ← 5対5の完全対応表がP1内にある
```

### 2.2 index.html の掲載状態（2026-08 時点）

`index.html` で **表示中**: P01, P03, P04
`display:none` で **非表示**: P02, P05, P06
また P04 のカードは旧称「Project Atlas / Four brains」のまま（CLAUDE.md の 2026-04-29 リネーム規則に未追従）。P6 の Portfolio Map も同様に「Project Atlas」と表記している。→ §11 参照。

---

## §3. Per-project briefs

---

### P1 · The Living Home — 家族AIの常設運用

**Premise:** SF丘の上、Yamashiro家。Mai (38, デザイナー, Brain管理者) / Kiran (41, 起業家, 朝6時バンガロール会議) / Aoi (15, they/them) / Sota (11, 火曜サッカー) / Leo (9, 軽度乳糖不耐).
**問題設定:** 2026年の「進んだ家庭」はすでに4台のMac miniで4つのAIエージェント（Emily=宿題 / Sam=仕事 / Nova=家族 / Oliver=家）を走らせている。だが互いを知らない。毎朝ゼロから。代名詞を1つ直すのに全アプリを手で回る。

**Chapters:** 01 The Setup → 02 A Morning → 03 Three Axes of Disclosure → 04 When It Counts → 05 Over Time → 06 Same Grammar, Different World → 07 Close（全36セクション）

**Signature mechanics**

| 機構 | 内容 |
|---|---|
| **Five Home Brains** | Household Brain / Person Brain ×5 / Domain Brain ×N (Health,Finance,Education,Calendar,Home) / Household Coordinator / Event Brain ×N。P4の企業版と完全同型 |
| **Brain ↔ Coordinator ↔ Agent** | Brain=受動的記憶(青) / Coordinator=能動的統括(紫) / Agent=実行(橙)。「Sotaの靴がきつい」→5 Brain並列読み→Coordinator判断→Shopping Agent発注→書き戻し、12秒サイクル |
| **Silent Resolution** | 朝の候補7件のうち6件が自動解決、1件だけMaiに浮上。D4+D6+E5+A2 の合成パターン |
| **Disclosure Matrix** | 5エージェント × 5ドメイン = 25セル。Financeは成績を読めない、Educationは家計を読めない。Calendarだけ全ドメイン横断、Healthだけ全エージェントから読める |
| **Translation Layer** | Kiranの肝機能異常という1つの事実が、妻には臨床サマリ+行動、15歳には数値なしの観察、9歳には遊び心ある一言に翻訳される |
| **Dynamic Friction** | ¥2.40ヨーグルト=Auto / $48子供靴=Confirm / $150記念日ワイン=Suggest |
| **Cross-Media Correlation** | Aoi=Netflixでアニメ / Kiran=Kindleで原作漫画 / Sota=主題歌を口ずさむ。3アプリは互いを知らないが Home Brain が同一IPだと発見し、夕食前に「今夜は話題がある」と父に伝える |
| **Care Architecture** | CarPlay通話中にAoiの喘息発作。Priority Weight が EMERGENCY に反転、ダッシュボードが経路1つに崩れる。4アクション準備、送信はMaiの承認待ち |
| **Identity update (Aoi)** | 代名詞変更が Identity Layer への1回の書き込みで5エージェントに同時伝播。3〜4週間 → 8分 |
| **Autonomy Timeline** | 12ヶ月で4ドメインが別々の到達点へ: Home=Auto(3ヶ月で) / Calendar=Notify / Education=Confirm / Finance=Suggestのまま |
| **Graduated Archive** | 15歳=自分の記憶が開く / 20歳=親の若い頃の日記が解錠 / 28歳=似た決断に直面したとき Family Story が浮上 / 35歳=全アーカイブを閲覧 |
| **Federation contract** | Samsung Knox+Gemini Nano / Apple Intelligence / Google Gemini / Microsoft Copilot の4ベンダーをまたぐ契約。Matter・OAuth を先例として引用 |

**主要 UI screens** (`ui-screens/p1-v2/`, 24ファイル): `s3-identity-card` `s4-learning-map` `s5-token-dashboard?mode=auto` `s7-disclosure-matrix` `s7b-disclosure-settings` `s7-5-translation-layer` `s8-5-yogurt-shopping` `s8-6-dynamic-friction` `s8-8-family-brain` `s8a-fridge-screen` `s8b-notification` `s9a-carplay-composite` `s9a-emergency` `s9b-approvals` `s12-family-archive` `nest-aoi-music` + `animations/anim-{translation-morph,autonomy-weaver,care-collapse,trust-heartbeat}.html`
※ 旧 `ui-screens/p1/` の10ファイルはどこからも参照されていない（v1残骸）。

**Devices:** Samsung Family Hub 冷蔵庫 / iPhone / iPad / CarPlay（+2030 ARウィンドシールド） / Google Nest Hub / Apple Watch

**指標（indicative, シミュレーション）:** 朝の意思決定 47件/週 → 11件/週（76%吸収） / 代名詞伝播 3–4週 → 8分 / デバイス間ハンドオフ成功率 61% → 94% / Care Architecture 起動 約120秒 → 3.2秒

---

### P2 · The Family Trip — Disposable Brain の完全実証

**Premise:** Brooklyn の Stern家。David (42, 書籍編集者) / Rachel (41, 美術教師) / Eli (13, バル・ミツワー済) / Maya (9, 猫を描く子). 2026年3月15–30日、東京→金沢→京都の14日間。Eli のバル・ミツワー祝いの旅。
**問題設定:** 5つのツール（ChatGPT / Mindtrip.ai / Google Maps / Apple Wallet / Notion）がどれも記憶を共有しない。**Rachel自身が統合レイヤーになってしまっている。**

**Chapters:** 01 Setup → 02 Planning(6ヶ月) → 03 Tokyo → 04 Kanazawa → 05 Kyoto → 06 The Return → 07 Same Grammar → 08 Close

**Disposable Brain lifecycle（このプロジェクトの核）**

```
  ┌── BIRTH ──────────────────────────────────────────────┐
  │ 夕食でRachelが一言 → Nest の LED が1秒脈打つだけ      │
  │ Home Brain が「curated subset」をフォーク              │
  │ 継承する: Identity Layer（名前・アレルギー・兄妹力学・  │
  │           言語・Disclosureプロファイル）+ Care 2+2契約 │
  │ 継承しない: 住宅ローン・冷蔵庫在庫・学校カレンダー・   │
  │             Home の Now Layer                          │
  └───────────────────────┬───────────────────────────────┘
                          ▼
  ┌── LEARN（14日）──────────────────────────────────────┐
  │ Trip Learning Layer が育つ                             │
  │ 「Eliは3日目から朝食を抜く」                           │
  │ 「Mayaは手を動かしていれば90分座れる」(60分→90分更新) │
  │ 「この家族は15時以降ペースが反転する」                 │
  └───────────────────────┬───────────────────────────────┘
                          ▼
  ┌── RETURN（+1日）─────────────────────────────────────┐
  │ 14日が7つの事実に蒸留される                            │
  │ Identity書き込み ×1: 「Eli は maker である」            │
  │ Learning書き込み ×6: ペース／承認／食の主体性／旅館評価 │
  └───────────────────────┬───────────────────────────────┘
                          ▼
  ┌── DISSOLVE（+30日）──────────────────────────────────┐
  │ 消えるもの: 写真1,142枚・PMSコード47件・領収書23件・   │
  │             カスケード8件・リアルタイムNow Layer        │
  │ 残るもの: Graduated Archive（記念日にだけ浮上）        │
  └───────────────────────────────────────────────────────┘
```

**Identity Layer 書き込みイベント（物語の頂点）**
京都・亀岡の刀鍛冶で Eli が4時間。4つの証拠条件（4時間の滞在 / 物理的完成品 / スマホを見なかった / 本人が誇りを口にした）が揃った瞬間、Brain が自律的に実行する:

```js
brain.identity.write({
  member: "eli",
  field:  "self-concept.maker",
  value:  true,
  source: "kameoka-forge-day10",
  evidence: [ "4hr attendance", "physical product completed",
              "phone unchecked", "self-reported pride" ],
  contract: { "on-return": "merge to Home Brain",
              "on-dissolve": "persist" }
})
```

**その他の signature mechanics**

| 機構 | 内容 |
|---|---|
| **三版の栞（shiori）** | 1つの計画が3つの版にレンダリング。Maya=絵本・ひらがな・猫マップ・隠しページ / Eli=漫画コマ・隠しマーカー・「???」の表紙 / 大人=運行台帳・予算ボード・体力予測ストリップ。**編集1回、レンダリング3回** |
| **Care Architecture · 2+2** | Eli のアンカー体験には必ず同尺の Maya のアンカーを対にする。14日間の収支台帳（22.0h vs 21.5h, Δ30分）を親にだけ見せる |
| **Disclosure Cascade** | `resolve(audience, day)` → 刀鍛冶の1日が、NY祖父母=写真23枚・無編集 / Eliの同級生=写真3枚・自虐トーン・バル・ミツワーは省略 / シナゴーグ=サムネ1枚・週次ダイジェスト、に分岐 |
| **Live Recomposition** | 気象庁の桜前線が6日前倒し → 3日分を組み替え、10日目の刀鍛冶は不動アンカーとして保持。両親11秒で承認、3つの栞+ホテルTV+JRアプリ+家族チャットに同時反映 |
| **Crisis Cascade** | 深夜2:18、Eliが39.1℃。90秒以内に Autonomy を**下げる**（transit Auto→Confirm, food Confirm→Suggest）。親を起こさず3つの静かな行動（英語対応医師の手配依頼 / 14日目を暫定フラグ / 24h薬局の事前検索）。祖父母には通知しない |
| **Time-spanning recall** | 8ヶ月前にInstagramで保存した店が、近接×空き時間×天候×相手 の4条件が揃った瞬間に浮上。「誰も検索しないから検索では出せない」 |
| **意図的な非介入** | 花見の90分間、Brain は何も送らない。Now Layer に「家族が90分中断なく笑っていた」とだけ書く |
| **次の旅の先読み** | 6ヶ月後「イタリア」と食卓で口にした3分後、候補 Disposable Brain が届く。Eli=トスカーナの鍛冶屋、Maya=チンクエテッレの猫 を既に知っている |

**UI screens** (`ui-screens/p2-v2/`, 31ファイル). 孤立ファイル3件: `s-planning-input-stream` `s-planning-tv-touchdraw` `s16-onsen-steps`（旅館のオフラインgraceful degradeを描いた未使用画面）。
**v1のみの要素（現在は破棄）:** 別家族（Nakamura-Andersen家）/ 京都の豪雨をクライマックスにしたLive Recomposition / 2カ国の祖父母 / レンタカーのナビ画面。v2の Process セクションが「刀鍛冶の方がバル・ミツワーの意味を稼げる」として明示的に切ったと記録している。

---

### P3 · Fluid Handoff — サーフェスを渡る Intent

**Premise:** ロンドン Clapham の Campbell-Adeyemi家。Naomi (42, NOTIFY/TRUSTED) / James (44, CONFIRM/LEARNING) / Amara (16, EXPLORING) / Marcus (13, SUGGEST/NEW). 平日の朝8:04〜夜6:44、+3ヶ月、+12ヶ月。子供2人の靴を買う話。
**問題設定:** 前回は夜10時に2時間14分、5サイト12タブ、比較表を手打ち。Marcus の靴は幅が狭くて返品、Amara の分は着手すらできなかった。

**5つの欠けている構造（これがプロジェクトの主張）**

| # | 前回壊れたこと | 欠けていた役割 |
|---|---|---|
| 01 | 「中がもこもこじゃないやつ」が伝わらない | **Translation Layer** |
| 02 | 5店舗を手で比較 | **Multi-Source Agent** |
| 03 | UKサイズの読み替えミス | **Cross-Reference Agent** |
| 04 | 家族全員に自分のスマホ画面を見せた | **Form Factor Transform** |
| 05 | 1人分終わってもう1人はゼロから | **Multi-Profile Session** |

**ハンドオフの詳細（このプロジェクトの全論点）**

| 移行 | 引き継ぐもの | 落とす／組み替えるもの | トリガー |
|---|---|---|---|
| 音声 → スマホ候補 | 発話7条件 + Brain側5条件 → 787→20→15件（Marcus 8 / Amara 7） | 推論過程は Confidence % とタグに圧縮 | Naomi の音声メモ |
| スマホ → 片手モード | 候補・Skip/Hold/Keep・Confidence | 4列グリッド→1枚全画面。タップ領域 44px→56px。操作帯を画面下40%へ | 電車で手すりを掴む（**デバイス変更ではなく身体状態の変化**） |
| スマホ → TV | 候補8件・画像・配送 | **価格と Confidence % を落とす**。「防水・軽量・走れる」という感情ラベルに再構成。スマホは自分の一覧を消して純粋なD-padリモコンになる | 「Cast to TV」タップ |
| TV(Marcus) → TV(Amara) | セッション継続、フォーカス位置リセット | Marcus の8枚が24ms刻みで退場、アクセントが銅→ローズへ、Amaraの8枚が50ms刻みで入場。約520msの演出 | 購入確定3.6秒後 or 手動タップ |

**Social Exposure の核心:** TVに価格は出ない。「13歳が、姉の前で大人ぶろうとしているその瞬間に『予算』という言葉を覚えるべきではない」。価格と確信度は親のスマホにだけ。

**Trust Breach（設計する価値のある破綻）:** 6ヶ月前の返品履歴（Northface Fastpack Mid, UK3, つま先が狭い, 2日で返品）を Brain 自ら開示し、「今朝それを使って上位20件から狭幅5件を除外し、幅広3件を出した。**黙って差し替えてはいない**」と receipt を見せる。

**Autonomy は単調増加しない:** 3ヶ月後、検索は Suggest(1/4) → Notify(3/4) に上がるが、**購入は12ヶ月経っても Confirm のまま**。「金と返品は取り消しコストが高い。動かしてはいけない天井がある」。

**UI screens** (`ui-screens/p3/`): 実装済み3件が埋め込み（`p3-01-browse` `p3-02-commute` `p3-03-tv-cast`）。**孤立5件**: `p3-04-purchase`（Disposable UI の溶解アニメ）/ `p3-04-tv-escalation`（売切れ時に元の候補を消さず代替を横に足す）/ `p3-05-repurchase`（6ヶ月後の再購入とBrain学習の前後比較）/ `p3-06-card-sort` / `p3-07-parent-remote`。加えて開発用 `frame-adjuster.html`。

**重要な注記:** 「Chromecast」「Cast to TV」はラベルのみ。実際は1つのHTMLファイル内の `.tv-wrapper` と `.phone-stage` を JS で切り替えているだけで、実ネットワークのキャスト実装はない。

---

### P4 · Enterprise Context Brain — 組織の記憶（business の中核）

**Premise:** B2C と B2B の2ブランドを並走させる企業。Priya (B2C PO, 31, 主人公) / Maya (Design Lead, 29) / Dev (Eng Lead, 34) / Leena (Brand Director, 41) / Kenji (B2B PO, 35) / Arman (2029年着任, 28). 2026→2029。
**3つのボトルネック:** ① Leena が週32時間の会議に埋まり、ブランド判断の質問が彼女のカレンダー待ちで詰まる ② 6ヶ月開かれていない47ページのPDFに、いまSlackで2時間議論した答えが載っている ③ 新入社員ごとに「リブランドの本当の話」が微妙に違う形で語り継がれる。

**Thesis:** 「知識はそれを持つ人と共に死ぬ。**Intent はそうであってはならない。**」

**Five Brain Diagram（正式名称）**

```
 TIER 4   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      ○ ARCHIVE
          │Project││Project││Project││Project│──────►
          │ Brain ││ Brain ││ Brain ││ Brain │  graduation
          │ ┌──┐  ││ ┌──┐  ││ ┌──┐  ││ ┌──┐  │
          │ │Now│  ││ │Now│  ││ │Now│  ││ │Now│  │   ← 各Project Brainの内側にも
          │ │Lrn│  ││ │Lrn│  ││ │Lrn│  ││ │Lrn│  │      同じ3層がある
          │ │Idt│  ││ │Idt│  ││ │Idt│  ││ │Idt│  │
          └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘
             └────────┴────┬───┴────────┘
 TIER 3   ┌───────────────▼─────────────────────────┐
          │       PROJECT MASTER BRAIN (PMB)         │
          └──────┬──────────┬──────────┬─────────────┘
 TIER 2   ┌──────▼────┐┌────▼─────┐┌───▼──────┐
          │ BRAND·B2C ││BRAND·B2B ││ RESEARCH │
          └──────┬────┘└────┬─────┘└───┬──────┘
                 └──────────┼──────────┘
 TIER 1   ┌────────────────▼─────────────────────────┐
          │              ORG BRAIN                    │
          └───────────────────────────────────────────┘

 実装: assets/js/green-animation.js の 'brain-architecture' コンポーネント
 スロット: data-ga-slot="p4-brain-hierarchy"
 「あなたはここ」表示: data-highlight="org|brand|brand-b2c|brand-b2b|research|pmb|project"
```

**各Brainの中身**

| Brain | Identity Layer | Learning Layer | Now Layer | 寿命 |
|---|---|---|---|---|
| **Org** | 創業史・ミッション・法人格・経営構造・ブランドポートフォリオ・拠点 | 組織図の履歴・役割の変遷・社内用語集・洗練されたポリシー・過去の組織再編 | 今週の稼働・誰がPTO中か・全社の今の優先事項 | 恒久 |
| **Brand ×2** | 声・視覚判断・倫理的トレードオフの立場（B2CとB2Bは**決して黙って統合しない**） | 過去の判断ログ（DEC-0411リブランド提案書, Memo 22-09 等） | — | 恒久 |
| **Research** | この会社の研究のやり方・倫理・同意規則・セグメント用語集 | 年10〜15本の全調査・逐語録・ペルソナ・仮説履歴 | **止まらない生データ**（売上・サポート・今週のNPS・行動解析・A/B結果） | 恒久 |
| **PMB** | ポートフォリオ戦略（B2C同時4件まで／中間ROI 2倍未満はkill／B2C:B2B=60:40） | パターン銀行（価格実験は70%失敗／リブランドは6ヶ月ではなく9ヶ月／保留案件の15%は復活） | 全 Project Brain へのポインタ・新着シグナル・Priya待ちの提案 | 恒久 |
| **Project ×N** | キックオフ趣意書・成功基準・未解決の問い → **閉幕時にArchiveへ圧縮** | スプリントごとの試行と応答 → **閉幕時に Org Brain へ溶けて戻る（Learning Returns Home）** | 進行中PR・昨日のSlack判断・今日のブロッカー・現在の Intent Match → **閉幕時に蒸発。Archiveにも残らない** | 時限 |

**PMB の不変条件（ページ内で3回繰り返される）:**
> **PMB はプロジェクトを自動起案しない。決めるのは Priya。ただしそれは「推測」ではなく「決定」である。**

**Intent Match（旧称 Intent Fidelity — 使用禁止）**
Identity Layer の趣意文を埋め込み、スプリント成果物（Figma・コピー・コミット）の埋め込みとのコサイン類似度を取る。スプリント3の金曜、82%→62%に落ちる。Brain は原因を火曜のスタンドアップの特定の決定まで遡る。そして質問は1つだけ:
> **「このドリフトを受け入れるか、Intent を書き直すか。」**

発火条件は `if fidelity_now < 0.70 and delta < -0.10`。それ以外は黙る。**採点はするが決定はしない。** 埋め込みモデルは差し替え可能（「契約はスコアとトレースであって重みではない」）。

**Stakeholder Autonomy Matrix（企業版ガバナンス）**
5役割 × 5ドメイン。各セルは ACL の boolean ではなく **Autonomy の段階**（Suggest / Confirm / Notify / Auto + Dev の feasibility に対する **Override** + Leena のブランドに対する **Veto**）。
> 「Permission は『Maya がこれに触れるか』を言う。Autonomy は『エージェントが Maya の代理でここで動けるか、どの確信度の閾値で』を言う。」

**Ambient Org Awareness の4方向:** ①部門横断(B2C↔B2B, サニタイズ済) ②AI↔AI(ベンダーのエージェント、ステータスのみ) ③経営層への自動要約(個人データなし) ④人間ゲート(レイオフ・M&A・報酬・法務は Suggest に固定、同意なしにエスカレートさせない)

**2029年の継承（Arman）:** 新規 Project Orion が「類似する Intent の系譜を検出 — Project Master Brain (2026)。参照しますか？」を出す。決定#142（Leena↔Priya, 2027 Q3）を引用した「あなたの最初のタスクに似ている」カード。初PRまで 3週間 → 4日。

**汎用性の証明（法律事務所 Project Aegis）:** Org Brain→事務所の判例ドクトリン / Brand Brain→シニアパートナーの判断 / Research Brain→判例と過去の準備書面 / Meeting Brain→戦略会議 / Project Brain→**Matter Brain**（Identity=委任契約書+事件理論, Now=今週の提出物+**Theory Fidelity**スコア）。

**UI screens:** `ui-screens/p4/` 3件（iPhone/iPad）+ `ui-screens/p4-v2/` 14件（MacBook/backstage）。全ファイルの `<title>` が旧称 "Atlas" のまま。

**指標（simulated / architectural projection と明記）:** Priya の「確認します」往復 14件/週→3件/週（78%吸収）/ ドリフト検出 約2スプリント→5日 / オンボーディングから初PR 3週間→4日 / 金曜の承認カスケード 11件→2タップ

---

### P5 · Cross-Surface Grammar — 1つのBrain、5つの方言

**Premise:** Copenhagen。Ines Larsen (38, UXリサーチャー) と Mateo Costa (41, 建築家, **iPhone 17 Pro ユーザー = 異ベンダー**). 2026年4月21日火曜の1日。
**問題設定:** Samsung Galaxy の同期はすでに完璧に動いている。カレンダー・通知・音楽・ヘルスはデバイスを越える。**だが「どれだけ大きな声で話すべきか」「何を見せて安全か」「どんな形を取るべきか」は誰も知らない。**

> **「Sync はデータを動かす。注意を動かさない。」**

**3つの失敗と、その修復**

| 時刻 | 壊れ方 | Cross-Surface Grammar 適用後 |
|---|---|---|
| 07:04 | Watch が通知の埋立地になる（23件、到着順、優先度なし） | **3行だけ**。10:00スタンドアップ(緊急/赤) / レビュー待ち1件 / 14:00から雨。「22件を保留」 |
| 08:24 | 通勤中、EarBuds が曲を切って未分化の通知スタックを流す | 38語のSlackメッセージが**14秒の音声**に圧縮され、曲と曲の隙間に挿入される。画面なし、スマホを取り出さない |
| 21:14 | Tag Heuer の発送確認メールのプレビューが、40cm隣のMateoから丸見えでサプライズが壊れかける | **「新着メール1件 · タップして表示」** に折り畳まれる。UWBでMateoのiPhoneが2m以内と検出、ギフト分類ルールと突き合わせ、2.4msで判断 |

**3つの Token だけで 5サーフェス × 15ルール**

| Token | Watch | EarBuds | Phone | TV | Kitchen |
|---|---|---|---|---|---|
| Cognitive Load | 上位3件のみ | 音声要約 | 全機能 | 作業通知遮断 | 音声のみ手順 |
| Social Exposure | — | — | プレビュー伏字 | 私的情報なし | — |
| Form Factor | グランス+触覚 | 音声のみ | 深い操作 | 共有・物語 | 手が塞がっている前提 |

**Surface Vocabulary Map（各サーフェスが「言えること／言えないこと」）**

```
 Watch      できる: 一瞥・触覚・1アクション   できない: 長文・複雑な判断
 EarBuds    できる: 音声・環境音・ハンズフリー できない: 視覚・リスト操作
 TV         できる: 大画面・共有・物語         できない: 私的情報・個人宛通知
 Kitchen    できる: 手が塞がった状態・手順     できない: 長時間の注視・複雑入力
 Phone      できる: 全機能・深い操作・私的     できない: 共有表示・長時間の凝視
```

**Brain API のサーフェス別購読権限:** Phone のみが8トークン全部を read+write できる（ユーザーが明示的に好みを宣言する場所だから）。Watch は cognitive_load / form_factor / priority_weight を read、physical_state を write。TV は social_exposure / form_factor / feasibility のみ（環境的）。

**業務への転用（病院ER）:** 医師の手首(バイタル) / 通信イヤピース(院内連絡) / タブレット(全カルテ、回診中はプライベートモード) / 病棟モニタ(家族が居ると予後をブランクにする) / ナースステーション(引き継ぎキュー)。**Code Blue時**: 手首が「Bay 4 · 22歳 · v-fib · 2分」に折り畳まれ、イヤピースがアレルギーを囁き、病棟モニタが家族向け表示を消す。

**2030年 ARグラス（明示的に aspirational）:** 同じ3トークン。Ines の視線が Mateo の視線と合った瞬間、HUD が自ら消える。**再学習なしで Social Exposure が「親密な視線」を検出する。**

**UI screens** (`ui-screens/p5-v2/`): 使用中5件 / **孤立4件** — `watch-face-before`（23通知の「before」画面）/ `watch-morning-briefing`（旧版3パネル）/ `tv-notification-block`（**ファイル名はTVだが中身はPhone Redaction。命名ミス**）/ `brain-to-surfaces-flow`（Brain→5サーフェスの放射図。**P1〜P5の関係を明示した唯一の図だが本番ページで未使用**）。

---

### P6 · Life Brain — 最小スケール（1人）

**Premise:** Lena (30, UXリサーチャー, 東京, AI協働型・AI比率60%). 対照として Haruki (33, 建築家, ドライバー型・AI比率15%) が同じ日に同じカフェで同じ宣言をする。2026年4月の30日間。
**問題設定:** 「2026年のパーソナルAIは、4つの部屋にある4つのアプリ。**AIが入っていい部屋を言う文法がない。**」

**30日の物語**

| Day | 機構 | 内容 |
|---|---|---|
| 1 | **Intent Declaration** | 月間の3目標（−1.0kg / ランチ¥20,000 / 新しい場所2箇所）と **2つの Protected Ritual**、4エージェントの初期ダイアル（Health=Confirm / Finance=Notify / Location=Suggest / Shopping=Auto）を宣言 |
| 4 | **Moment Composer** | 8:30乗換駅。天候+位置+カレンダー+ヘルスの4信号が融合し、**10秒だけ**の提案1つ「1駅早く降りて歩く?」がWatchに出る |
| 8 | **Drive-Me gesture** | Watchを3本指タップ「昼ごはん、任せる」→ Shopping Agent が決める（鯖定食 ¥980, 徒歩3分）。**窓が閉じたらダイアルは自動で元に戻る。AIは自分の自律度を上げない** |
| 12 | **Protected Ritual** | 「金曜のフラペチーノ」— 場所×時間×頻度（金15–17時, スタバ100m以内, 月4回まで）が一致したら**全エージェントが黙る**。「この瞬間、この選択は私のもの」 |
| 13 | **Driver Mode** | 予約をトリガーに、その晩は4エージェント全部を全ドメインで停止。**DNDとは違う。DNDは通知を消す。Driver Modeは判断そのものを走らせない** |
| 18 | **Forgotten Intent Retrieval** | 22:00、眠っていた42件の保存済み意図のうち1件が浮上。位置×時刻×体調×家計の4信号ゲートが同時に通ったから |
| 21 | **Mid-Month Review** | 21日分の観察からダイアル昇格提案2件＋新しく気づいた儀式1件。**自動昇格はない。Brain が提案し、Lena が決める** |
| 30 | **Month Summary** | Protected Ritual 17/17回発火、誤発火ゼロ。Haruki は AI比率15%で同じ目標に到達 — 「文法は同じ、リズムが違う」 |

**Protected Ritual は原始パターンではない（合成）**

```
   D2 Disclosure Lock  ─┐
   A2 Approval Gate Skip ├──► 「Protected Ritual」
   T4 Time-Box(場所×時間×頻度) ─┘

   同じ3つの原始パターンを、スコープを変えて再合成すると Driver Mode になる。
```

**業務への転用（慢性疾患の自己管理）:** Akari (52, 2型糖尿病, 元看護師, 独居) と Tomohiro (56, 同診断, ドライバー型). 同じ4エージェントを再配置 — Health=血糖/服薬/A1c / Finance=自己負担/免責 / Location=薬局・クリニック・安全な経路 / Shopping=糖質を考慮した買物。**「日曜の夕食」が Protected Ritual になり、Brain は糖質を黙って記録するが論評はしない（「3時間14分 · 記録済み」）。**

**2030 スマートコンタクトレンズ:** 同じ `composer.proposal` トークンに `render_hint: "whisper"` を足すだけ。虹彩の中の琥珀色の点。手首を上げる必要がない。**「変わるのは投影関数だけ。Brain は変わらない。」**

**P6 が自ら認めている未解決（正直さの設計）:** ① 儀式提案の頻度が半年後にノイズにならないか ② 2人の Life Brain が同居したとき Home Brain (P1) に統合されるのか連合するのか — **「P1→P6 の道は通ったが、P6→P1 は未踏」** ③ 月曜朝「血糖は非公開」と言い、月曜夜「娘には共有」と言ったとき、火曜はどちらが勝つか。

**UI screens** (`ui-screens/p6-v2/`): 使用中6件 / **孤立7件**（`phone-day1-intent` `phone-day13-driver-mode` `phone-day21-review` `phone-day30-summary` `watch-day4-composer` `watch-day12-silent` `watch-day18-retrieval` — いずれもデバイスフレーム付きの旧デザイン。本番はフラットなartifact埋め込みに移行済み）。

---

## §4. PERSONAL USE — 機能カタログ（横断・能力別）

> プロジェクトを横断して、「個人／家庭向けプロダクトとして何が作れるか」を能力の族ごとにまとめたもの。
> 出典欄の P1〜P6 は、その機能が実際に描かれているプロジェクト。

### A1. Intent の受け取り方

| 機能 | 内容 | Token | Brain | 出典 |
|---|---|---|---|---|
| 音声1文からのBrainフォーク | 食卓で一言 → Nest の LED が1秒光るだけ、画面なしで Trip Brain が生成される | ④⑦⑧ | Identity継承 | P2 |
| 月間 Intent 宣言 | 3つの目標＋守る儀式＋4エージェントの初期ダイアルを1画面で宣言 | ④⑥ | Identity書込 | P6 |
| 明示的 Intent タグ | 「これは彼が自分の選択に責任を持つ最初の旅」— 高 Priority Weight の意図が6ヶ月後の判断の同点を破る | ④ | Identity | P2 |
| 音声メモ → Translation Layer | 発話の7条件と Brain 側の5条件を合成し、787件→20件→15件へ | ②④⑥ | Learning | P3 |
| 継続的なドリップ入力 | Instagram / LINE / Discord / 雑誌の切り抜きを数ヶ月にわたり無言で吸収、タグ付けして寝かせる | ② | Learning | P2 |
| Ambient Intent | 特定の要求はないが状態がある（23時にベッドで読書 → 静かに・暖かく・通知ゼロ） | ①②⑤ | Now | 全体 |

### A2. 状況の読み取り（Now Layer）

| 機能 | 内容 | 出典 |
|---|---|---|
| 8トークン・ダッシュボード | 全8トークンを毎秒更新するゲージ群。**家族は絶対に見ない（Backstage専用）** | P1 |
| Moment Composer | 4信号を融合して**10秒だけ**存在する提案を1つ生成 | P6 |
| 認知負荷の推定 | 時間帯 × カレンダー密度 × 直近のアプリ切替頻度。**直接測定はしない**（最も投機的なトークン） | 全体 |
| 片手検出による再レイアウト | デバイスは同じ、身体状態だけが変わる。4列グリッド→1枚全画面、タップ領域44→56px、操作帯を画面下40%へ | P3 |
| 近接検出（UWB） | パートナーのiPhoneが2m以内 → ロック画面のプレビューを伏せる | P5 |
| Feasibility の統合 | 在庫・天候・営業時間・配送見積・予算を単一の実行可能性スコアに | 全体 |

### A3. 記憶（3層 Brain）

| 機能 | 内容 | 出典 |
|---|---|---|
| Identity Card | 名前・代名詞・アレルギー・言語・「5エージェントが共有」・最終更新 | P1 |
| Identity 伝播 | 1回の書き込みで5エージェントが同時更新。3〜4週間 → 8分 | P1 |
| **自律的 Identity 書き込み** | 4つの証拠条件が揃った瞬間、Brain が自分で「Eli は maker である」を永続層に書く | P2 |
| Learning Map | 47パターン × 5人 × 平均確信度0.74。エージェント／ドメイン／期間で絞り込み、手動追加も可 | P1 |
| 能力観察としての学習 | 「Mayaの持続注意 60分 → 90分以上」。欠損ではなく能力として書く | P2 |
| 沈黙のルール学習 | 4件の却下理由（白いソール／リッジ模様／ロゴが大きい／変な青い紐）が4つの恒久ルールになり、「妹のリストにも適用する?」と**画面の下に小さく**聞く | P3 |
| 減衰モデル | 3回の再強化で定着、3ヶ月観測がなければ減衰（`brain-schema.yaml`） | spec |
| 時を跨いだ想起 | 8ヶ月前の保存が、4条件同時成立で浮上。「誰も検索しないから検索では出ない」 | P2 |
| Forgotten Intent Retrieval | 眠っている42件から、位置×時刻×体調×家計 のゲートを通った1件だけ | P6 |

### A4. 委任と信頼（Autonomy）

| 機能 | 内容 | 出典 |
|---|---|---|
| ドメイン別 Autonomy | 12ヶ月後: Home=Auto / Calendar=Notify / Education=Confirm / Finance=Suggest。**「1つのBrain、4つの関係」** | P1 |
| Dynamic Friction | ¥2.40=Auto / $48=Confirm / $150=Suggest。金額だけでなく**取り消し不能性**も決定要因 | P1 |
| 単調でない Autonomy | 検索は Suggest→Notify に上がるが購入は12ヶ月後も Confirm。**動かしてはいけない天井** | P3 |
| Drive-Me ジェスチャ | 3本指タップ＋発話で1ドメイン1回だけ Auto に上げ、窓が閉じたら自動で戻る。**AIは自分から取らない** | P6 |
| Driver Mode | 全エージェント全ドメインを一晩停止。DND（通知を消す）とは違い、**判断そのものを走らせない** | P6 |
| Protected Ritual | 場所×時間×頻度が一致したら全エージェントが黙る。「この瞬間、この選択は私のもの」 | P6 |
| 中間レビューでの昇格提案 | 21日分の観察から昇格を提案。**自動昇格はない。承認タップが必須** | P6 |
| Trust Breach Recovery | 失敗の瞬間に降格、なぜ間違えたかを正直に説明、Phase 2 から慎重に再開 | P1/P3 |
| 過去の失敗の自己開示 | 「6ヶ月前に返品。だから今朝、狭幅5件を外して幅広3件を出した。**黙って差し替えてはいない**」 | P3 |
| 危機時の自律度**降格** | 深夜の発熱検知から90秒で transit Auto→Confirm, food Confirm→Suggest。**より自律的にではなく、より慎重になる** | P2 |

### A5. 開示（Disclosure）— このフレームワークで最も独自な部分

| 機能 | 内容 | 出典 |
|---|---|---|
| Disclosure Matrix | 5エージェント × 5ドメイン = 25セル。Finance は成績を読めない、Education は家計を読めない | P1 |
| プロファイル1タップ解決 | OPEN / OBSERVATIONAL / FAMILY-SAFE / LOCKED を1つ選ぶと、既定→ドメイン別調整→個人別上書き→拒否既定ロック の順にカスケードして25セルが確定 | P1 |
| **Translation Layer** | 同じ1つの事実が相手ごとに別の深さに翻訳される。本人=生データ / 妻=臨床サマリ+行動 / 15歳=数値なしの観察 / 9歳=何も出さない | P1 |
| Disclosure Cascade | `resolve(audience, day)` で写真枚数・キャプション・トーン・配信頻度・省略項目が分岐 | P2 |
| Preview Redaction | ギフト分類 × パートナー近接 → 「新着メール1件」に折り畳む。2.4ms | P5 |
| 共有画面から価格を落とす | TVには「防水・軽量・走れる」。価格と確信度は親のスマホだけ | P3 |
| **Connective Disclosure** | 従来の「守る」方向ではなく「繋ぐ」方向。Push / Digest / Available / Off の4段階 | P1 |
| Cross-Media Correlation | Netflix / Kindle / 鼻歌 を横断して同一IPだと発見し、「今夜は話題がある」と伝える。**単一アプリの共有機能では絶対にできない = Disclosure Dial が OS 層に要る唯一の根拠** | P1 |
| ベンダー別スコープ | 予約先には最小限の情報しか渡さない。JR の車内表示には人数と行程だけ、Disclosure データは境界を越えない | P2 |

### A6. 複数人の同時オーケストレーション

| 機能 | 内容 | 出典 |
|---|---|---|
| 1品目・4つの文法 | 同じ「ヨーグルト」が Mom=Exact+Auto / Dad=Flexible+Confirm / Daughter=Exploring+Suggest / Son=Exact+低頻度 で同時に解決される | P1 |
| Social-Aware Filtering | 13歳=写真カード・価格なし / 9歳=絵優先の大きいカード。同じ機構、別の深さ | P2 |
| **Care Architecture · 2+2** | 兄のアンカー体験には必ず同尺の妹のアンカーを対にする。14日間の収支台帳（22.0h vs 21.5h）を親にだけ見せる。**通信簿ではなく事実の表** | P2 |
| 親子の役割分離 | 子が選択UIを持ち、親が購入UIを持つ。AIは調査だけを委任される | P3 |
| ライブの人格切替 | TVで兄→妹へ。カードが24ms刻みで退場、アクセントが銅→ローズ、520msで完了。ソファから動かない | P3 |
| 分裂時の最小介入 | teamLabで家族が分かれる。バッテリー20%前の通知1件と、25分後の等距離集合地点の提案1件。**2時間でプロンプトはそれだけ** | P2 |
| 子から親への差し戻し | 「もっとこれをやりたい」ボタンで9歳が予定変更を要求でき、Brain が2+2バランスを保ったまま90分後ろ倒しを提案 | P2 |

### A7. サーフェス間の移動

| 機能 | 内容 | 出典 |
|---|---|---|
| Form Factor Transform | 画面サイズではなく**構造そのもの**を変える。スマホは一覧を消して純粋なリモコンになる | P3 |
| Multi-modal Projection | 1つの Token 状態を Visual(Watch) / Voice(骨伝導) / Haptic(1回の琥珀色パルス) / Ambient(洗面所の鏡, 90秒TTL) の4つに投影 | P6 |
| Surface Vocabulary | 各サーフェスの「言えること／言えないこと」＋サーフェス間ハンドオフの相性マトリクス（✓自然 / △状況次第 / ✗壊れる） | P5 |
| 同一状態・5レンダラ | 同じトークン状態から Watch / EarBuds / Phone / TV / Kitchen が別々の出力を作る | P5 |
| 公共サーフェスへの投影 | JR車内表示にはスコープを絞ったペイロード（人数と行程だけ）。家族の Disclosure データは越境しない | P2 |
| 未来のフォームファクタ | 2030 ARグラス（視線が合ったらHUDが消える）／スマートコンタクトレンズ（`render_hint:"whisper"` を足すだけ）。**Brain は変わらない、投影関数だけが変わる** | P5/P6 |

### A8. 静かな解決

| 機能 | 内容 | 出典 |
|---|---|---|
| Silent Resolution | 朝の候補7件のうち6件が自動完了、1件だけ浮上。**「通知が減る」のではなく「決定が減る」** | P1 |
| 先行実行 | 着陸2分後に5つの決定（早期チェックイン・荷物ルーティング・蕎麦の予約・Pasmo 4枚）が自動実行。2週間前に仕込み済み | P2 |
| Live Recomposition | 桜前線6日前倒し → 3日分を組み替え、不動アンカーは保持、11秒で承認、4サーフェスに同時反映 | P2 |
| Approval Cascade | 12の連鎖のうち10は自動、2つだけが下書きとしてロック画面で待つ。**「彼女の判断がまだ意味を持つ2箇所」** | P1 |
| 抽選の自動実行 | 前夜に優先順位付き枠を用意し、10:00:00 JST に実行、2分後に確定、事後承認を求める | P2 |
| 予算スライダ | 1本のスライダが約20の下流変数（宿のグレード・食事の格式・追加泊）を、確定済み予約と Care 2+2 契約を守りながら動かす | P2 |
| **意図的な非介入** | 花見の90分、Brain は何も送らない。Now Layer に一行書くだけ。**「AIをうまく設計することには、AIが引っ込む瞬間の設計が含まれる」** | P2 |

### A9. 買い物と代替

| 機能 | 内容 | 出典 |
|---|---|---|
| 4つの Substitution Mode | Exact（薬・アレルギー・ブランド忠誠）/ Flexible（日用品）/ Exploring（発見）/ Surprise（贈り物・冒険） | P1 |
| 売切れ時のエスカレーション | **元の候補を消さずに残したまま**、代替を横に足す。黙って差し替えない | P3 |
| 確信度の常時表示 | 全カードに確信度%と根拠（レビュー件数）。80%未満は警告付きでエスカレート。低確信を黙って除外しない | P3 |
| ライフサイクルの閉じ方 | 履き潰した靴を 寄付（条件チェック済み）／ Mercari 転売（購入時データから出品文を自動生成）／ 妹へのお下がり（サイズ到達まで4ヶ月スヌーズ） | P3 |
| アレルギーの絶対制約 | Identity Layer にアレルギーがあれば購入を絶対ブロック。**Surprise モードすら上書きする** | rules |

### A10. 期間限定のBrainと蓄積

| 機能 | 内容 | 出典 |
|---|---|---|
| Disposable Brain | Birth → Learn → Return → Dissolve。生まれるとき空ではなく pre-loaded | P2 |
| Disposable Surface | 目的が終わるとUIそのものが消える（購入コンソールが剥がれてホームに戻る） | P3 |
| 三版の栞 | 1つの計画 → 3つの版。編集1回、レンダリング3回 | P2 |
| カウントダウン | 出発5日前から夜ごとにページが1枚ずつ解錠。刀鍛冶の日だけは最後まで施錠。3週間前に30秒の予告編を台所のTVへ | P2 |
| 一晩での栞の変異 | 夕方の Learning 書き込み1件が、翌朝子供の絵本に「NEW PAGE」を生む | P2 |
| Graduated Archive | 15歳/20歳/28歳/35歳で開くものが変わる。カレンダーの日付ではなく**ライフイベント**で解錠 | P1 |
| 次のBrainの先読み | 6ヶ月後に「イタリア」と口にした3分後、候補Brainが届く。前回の旅の Identity/Learning 書き込みから導出済み | P2 |

### A11. 危機とケア

| 機能 | 内容 | 出典 |
|---|---|---|
| Care Architecture | Priority Weight が EMERGENCY に反転し、ダッシュボードが1つに崩れる。4アクション準備、送信は人間の承認待ち。**「Autonomy Dial にはケアが越えない天井がある」** | P1 |
| Crisis Cascade | 発熱検知 → 90秒で全ドメインの自律度を**下げる** → 親を起こさず3つの静かな行動 → 12時間後に条件が保たれていれば自動復元 | P2 |
| 医療時の強制 Manual | 健康イベント時は autonomy=Manual 固定、AI は情報提供のみ。**安心させたり決めたりしない** | rules |
| 慢性疾患の自己管理 | 同じ4エージェントを血糖/服薬/薬局/糖質配慮に再配置。「日曜の夕食」を Protected Ritual にし、Brain は黙って記録するが論評しない | P6 |

---

## §5. BUSINESS USE — 機能カタログ

> P4 が中核。加えて P1/P2/P5/P6 の各ページ末尾にある「同じ文法、違う世界」章の企業転用が含まれる。

### B1. 組織の記憶構造

| 機能 | 内容 | 出典 |
|---|---|---|
| Five Brains | Org（恒久の土台）/ Brand ×N（判断DNA、B2C と B2B は黙って統合しない）/ Research（理解＋流入し続ける外部データ）/ PMB（戦略を考える脳）/ Project ×N（時限） | P4 |
| 普遍的な3層解剖 | Project Brain を含むすべての Brain が Identity / Learning / Now を持つ | P4 |
| Brain の境界 | Org Brain は「Maya は Design Lead で Leena に報告する」と言う。PMB は「Maya は Holiday Campaign に60%配分」と言う。**2つの脳、2つの事実** | P4 |
| Multi-Brand の並走 | Brand Director が両インスタンスを統括、各POは自分のブランドだけを読む | P4 |
| 家庭版との完全対応 | Household↔Org / Person×5↔Brand×N / Domain×N↔Research / Coordinator↔PMB / Event×N↔Project×N | P1 |

### B2. 判断のオンデマンド化

| 機能 | 内容 | 出典 |
|---|---|---|
| Brand Brain クエリ | 色の選択を問うと3つを返す — 原則の一致（2024ブランドWSの「集団として働く」原則）/ 軽い緊張（現在のヒーローコピーは個人視点）/ 過去の判断（個人主義バイアスで却下された3つのタグライン）。**すべて出典付き。承認/却下の判定は返さない** | P4 |
| モバイルでのブランド確認 | Priya が電車でタグラインを書き、降車前に3枚のカードで返る。Leena はそのスレッドを見ない | P4 |
| 専門家ボトルネックの解消 | 週32時間会議のディレクターのカレンダー待ちで質問が詰まる状態を、判断DNAの外部化で解く | P4 |

### B3. 調査 → プロジェクトのパイプライン

| 機能 | 内容 | 出典 |
|---|---|---|
| Project-scoped extraction | キックオフ時に「意図＋セグメント＋未解決の問い」を渡すと、Research Brain が全層を読んでタグが重なる断片だけを選び、**新しい Project Brain の Learning Layer に書き込む** | P4 |
| 眠っている調査の起床 | 6ヶ月開かれていない47ページのPDFに、いま2時間議論した答えが載っている問題への直接の解 | P4 |
| 止まらない Now Layer | 売上フィード・サポートチケット・今週のNPS・行動解析・A/B結果が秒単位で流入し続ける | P4 |

### B4. 会議の記憶

| 機能 | 内容 | 出典 |
|---|---|---|
| Queryable Meeting Archive | 「なぜスプリント2でナビを変えた?」→ 90秒のクリップ＋決定＋**それが何の制約と天秤にかけられたか** | P4 |
| 決定ログの相関検索 | `meeting_brain.find_decision(correlated_with=artifact_diff, within="7 days")` | P4 |

### B5. ポートフォリオ戦略

| 機能 | 内容 | 出典 |
|---|---|---|
| Cross-Brain Reasoning | ① Research が異常を検知（決済離脱18%増）→ ② PMB が過去の類似パターンを検索（3件ヒット、スコア付き）→ ③ Brand の制約を読む → ④ Org の稼働を読む（Maya 60%, Dev 80%）→ ⑤ **提案を起草する。起案はしない** | P4 |
| パターン銀行 | 「価格実験は70%失敗」「リブランドは6ヶ月ではなく9ヶ月」「保留案件の15%は復活」 | P4 |
| 開始/保留/中止の判断支援 | ポートフォリオ戦略（同時4件まで／中間ROI 2倍未満はkill／B2C:B2B=60:40）を Identity Layer に持つ | P4 |
| Generative Canvas | 毎日レイアウトが組み変わるダッシュボード。稼働4件/保留2件/PMB起草の提案1件/Ambientフィード | P4 |

### B6. 意図のドリフト検出

| 機能 | 内容 | 出典 |
|---|---|---|
| **Intent Match** | 趣意文の埋め込みと成果物の埋め込みのコサイン類似度。82%→62%の低下を、原因となった火曜の決定まで遡る。**質問は1つだけ:「ドリフトを受け入れるか、Intentを書き直すか」** | P4 |
| 沈黙の閾値 | `if fidelity_now < 0.70 and delta < -0.10` のときだけ人に出す。それ以外は黙る | P4 |
| ベンダー中立 | 埋め込みモデルは差し替え可能。「契約はスコアとトレースであって重みではない」 | P4 |
| 法律事務所版 | Intent Match → **Theory Fidelity**（事件理論からの逸脱度） | P4 |

### B7. ガバナンス

| 機能 | 内容 | 出典 |
|---|---|---|
| **Stakeholder Autonomy Matrix** | 5役割 × 5ドメイン。各セルは boolean ではなく Autonomy の段階 + Dev の **Override**（安全上の理由で出荷済み動作を巻き戻せる）+ Leena の **Veto**（無条件停止） | P4 |
| 承認カスケードの自動化規則 | `domain × role × confidence ≥ Notify threshold` なら自動承認、そうでなければ実名の人間にエスカレート | P4 |
| 承認の履歴チップ | 「Marketing が起草 → Legal が確認 → 最終の声はあなた」を各カードに表示 | P4 |
| 監査可能性 | すべての変更に OpenTelemetry トレース。全決定に30日保持の `brain.trace(id)` | P4/P5 |
| **測るのは仕事であって人ではない** | 「Priya · 今スプリント生産性87%」を明示的に**却下**し、プロジェクト単位の Intent Match に置き換えた（反監視の設計判断） | P4 |

### B8. 部門を越える気づき

| 機能 | 内容 | 出典 |
|---|---|---|
| Ambient Org Awareness | ①部門横断（サニタイズ済）②AI↔AI（ベンダーのエージェント、ステータスのみ）③経営層への自動要約（個人データなし）④**人間ゲート**（レイオフ・M&A・報酬・法務は Suggest 固定） | P4 |
| 関連性ベースの購読 | 各 Brain が Disclosure タグ付きイベントを発行し、他の Brain が Identity Layer の関連性判定で購読する | P4 |

### B9. 継承と再生

| 機能 | 内容 | 出典 |
|---|---|---|
| Graduation（3層3運命） | Now は蒸発 / Learning は Org Brain に溶けて戻る（**Learning Returns Home**）/ Identity は Archive に圧縮される | P4 |
| 3年後の継承 | 新規プロジェクトが「類似する Intent の系譜を検出（2026）。参照しますか？」を出す。決定#142を引用。初PRまで3週間→4日 | P4 |
| Archive Replay | スプリントのタイムラインをスクラブすると、その瞬間の Figma・議事録・Intent Match スコア・チーム構成が再構成される。**PII・雑談・Now Layer は除去済み** | P4 |
| Schema Versioning | `identity_layer/3.2` に `_migrated_from` と決定的な `migrate(v2→v3)`。**「保つ価値のあるアーカイブの前提条件」** | P4 |
| 家庭版との対比 | 「家では時間軸は20年 — Aoi は35歳で家族の記憶を継ぐ。職場では3年 — Arman は初日にプロダクトの意図を継ぐ。**1つの設計言語。家庭と職場。その両方より長く生きる**」 | P4 |

### B10. 他ドメインへの移植（証明済みの転用先）

| ドメイン | 写像 | 出典 |
|---|---|---|
| **法律事務所（Project Aegis）** | Org→判例ドクトリン / Brand→シニアパートナーの判断 / Research→判例と準備書面 / Project→**Matter Brain** / Intent Match→**Theory Fidelity** / 役割→アソシエイト・シニア・パートナー・依頼者 | P4 |
| **病院ER** | 医師の手首(バイタル) / 通信イヤピース / タブレット(回診中はプライベート) / 病棟モニタ(家族が居ると予後を消す) / ナースステーション。Code Blue で全サーフェスが同時に折り畳まれる | P5 |
| **営業チーム（200名）** | Autonomy: パイプライン分析=Notify / 値引き承認=Confirm / 契約署名=Confirm。Disclosure: マネージャは全担当の数字、担当は自分のだけ、顧客ダッシュボードは両方を伏せる | P1 |
| **企業オフサイト（4日）** | Org Brain からフォークした Disposable Brain。「全ICが話してから、ディレクターが繰り返す」= Care 2+2 の組織版 | P2 |
| **慢性疾患の自己管理** | 同じ4エージェントを血糖/自己負担/薬局/糖質配慮に再配置 | P6 |
| 将来候補（言及のみ） | 学術研究室・臨床チーム・行政機関・ゲームスタジオ | P4 |

---

## §6. 共通アーキテクチャ — 全プロジェクトに繰り返し現れる8つの機構

> P1 / P2 / P4 / P5 / P6 の「Backstage」章にほぼ同型で出てくる。ここがプロダクトの骨格。

### C1. Tokens as Contract（トークンは契約である）

すべての Token は「人間が読む物語の面」と「機械が読むスキーマの面」を同時に持つ。UIはレイアウトをハードコードせず、Token 状態からレンダリングする。

```json
{ "token": "cognitive_load", "version": "2.0", "type": "float",
  "domain": [0.0, 1.0],
  "estimator": "time_of_day × calendar_density × recent_activity",
  "refresh_ms": 4000,
  "consumers": ["watch", "phone", "fridge", "car"] }
```

P5では `composer.proposal` として: `{token, emitted_at, summary, contributing[{agent,weight}], window_seconds, render_hint, actions[]}` — **「1 token in. 6 surfaces out.」**

### C2. Brain API — 購読と権限

```js
brain.subscribe({
  surface: "fridge",
  read:  ["identity.allergies", "identity.dietary",
          "learning.weekly_rhythm", "ctx.cognitive_load"],
  write: [],
  refresh: 4000
})
sub.on("update", state => surface.render(state))   // push型、ポーリングなし
```

**権限は設定画面ではなく subscribe 呼び出しで強制される。**
例: `tv → identity.health = DENIED`（TV側のUIが要求しても Brain が拒否する）。P6 では Finance Agent が3経路を read できるが write は DENIED。P5 では Phone だけが8トークン全部を read+write できる（ユーザーが明示的に好みを宣言する唯一の場所だから）。

企業版（P4）は HTTP 風の3動詞:
```
GET /brain/project/apollo/identity_layer?role=...&scope=...
POST /brain/project/apollo/learning_layer/decision
SUB  /brain/project/apollo/intent_match   { on_change: threshold, notify: [{role, surface}] }
```

### C3. Rule Engine パイプライン

```
   IN                    ENGINE                      OUT
 ┌──────────────┐    ┌──────────────────┐    ┌────────────────────┐
 │cognitive_load│    │ rule_001 match → │    │ layout: "minimal"  │
 │  : 0.78      │    │   density=minimal│    │ items_max: 1       │
 │social: family│───►│ rule_017 match → │───►│ notifications:     │
 │priority:normal│   │   silent_res=on  │    │   "silent"         │
 │form: phone   │    │ rule_034 skip    │    │ undo_window_s: 300 │
 │autonomy: auto│    │                  │    │ tone: "calm"       │
 └──────────────┘    └──────────────────┘    └────────────────────┘

   同じエンジンが全サーフェスで走る。違うのはレンダラだけ。
```

### C4. Federation contract（マルチベンダー）

**明示的に「今は存在しない。提案である」とラベルされている。** 先例として Matter（スマートホーム、5年）／ OAuth（認証）／ Passkeys（資格情報）／ SCIM（約10年）を引く。

```js
brain.federate({
  schema: "context-grammar/v2.0",
  identity_provider: "apple_id",
  learning_residency: "on_device",
  household_hub: "nest_hub_4f3a",
  cross_vendor_handoff: true,
  preserve_disclosure: true,
  audit_log: "household_local"
})
```

**層別の実行場所（P1のマトリクス）**

| 層 | 実行場所 | 備考 |
|---|---|---|
| Identity | 100% オンデバイス / セキュアエンクレーブ | 生データは決して出ない。federation 越しのスライスのみ |
| Learning | オンデバイス + 暗号化プライベートクラウド（opt-in） | 集約パターンのみ、生ログは出さない |
| Now | 100% オンデバイス、揮発 | 共有しない（変動が速すぎる） |
| Connective Disclosure | 家庭内メディエータ（選出された1ハブ）| Matter 方式。ベンダークラウドには到達しない |

**なぜ各ベンダーが採用するか**という説得カードが P1/P2/P5/P6 すべてにある: Apple（オンデバイスプライバシー、Apple Intelligence をローカルランタイムに）/ Samsung（SmartThings はあるがルーティング層が無い、ホテルTVの大半は Samsung）/ Google（Maps+Photos+Gemini がすでに接触している、Health Connect）/ Microsoft（Copilot の在席検知、監査証跡、Bookings/Outlook/Teams）。

### C5. Decision Trace（デバッグ可能なAI）

```
decision_id: 7e3f-21:14-01           execution: 2.4ms
─────────────────────────────────────────────────────
TOKEN  social_exposure = "partner-nearby"   (UWB, 1.8m)
TOKEN  form_factor     = "phone_locked"
RULE   gift_class                    ✓ match
RULE   preview_redaction             ✓ fire
RULE   ios_focus_mode                ✗ skip  (not applicable)
─────────────────────────────────────────────────────
Alternatives weighed:
  show full preview        0.41
  collapse to count only   0.86  ← chosen
  defer notification       0.23
─────────────────────────────────────────────────────
trace_id: ... | retention: 30 days | query: brain.trace(id)
```

**「エンジニアが監査でき、ユーザーが請求でき、規制当局が召喚できる。」**
P4版は同じ構造で `atlas.intent_match` のスコア推移と出典配列を返す。

### C6. Schema Versioning

```js
brain.connect({ schema: "v2.0", fallback: "v1.0" })
// guarantees:
//   deprecation_window: 18mo
//   breaking_change: "never silent"
//   new_field_default: "safe"
```
v1.0 = 7 Tokens (2025) → **v2.0 = 8 Tokens（Disclosure を分離。現行）** → v2.1 = Wellness サブトークン追加（草案）。
**2025年製の冷蔵庫（v1.0）が2027年の Brain から投影を受け取れる**ことが要件。

### C7. AX Pattern Composition（パターンは合成する）

```
  D4 Omakase Mode ─┐
  D6 Dynamic Friction ├─► 「Silent Resolution · Maiの朝」
  E5 Trust Breach Recovery ┤    候補7件 · 実行6件 · 浮上1件
  A2 Cognitive Scaling ────┘
```

同じ考え方が各プロジェクトで:
- **P2:** P03 Approval Gate + P05 Care Architecture + P09 Live Recomposition + P11 Multi-surface Cascade → 「桜の組み替え」。**どれか1つ抜くと壊れる**（Approval Gate 無し=AIが偉そう / Care 無し=兄が勝ち妹が負ける / Recomposition 無し=静的な旅程をスクロールするだけ / Cascade 無し=Rachelが子供に説明し直す）
- **P4:** Stakeholder Autonomy Matrix = `autonomy_dial × role_boundary × disclosure_resolution`
- **P5:** Surface Vocabulary + Moment Composer + Preview Redaction + (P1由来の) Disclosure Matrix
- **P6:** D2 Disclosure Lock + A2 Approval Gate Skip + T4 Time-Box = **Protected Ritual**。スコープを変えて再合成すると **Driver Mode**

### C8. Multi-modal Projection

1つの Brain イベントが、サーフェスごとに別のペイロードでレンダリングされる。

| モダリティ | 例 | 決定要因 |
|---|---|---|
| Visual | Watch 320×320、10秒の窓 | Form Factor |
| Voice | 骨伝導イヤピースの囁き | Cognitive Load（手が塞がっている） |
| Haptic | 琥珀色の1回パルス | Social Exposure（会議中） |
| Ambient | 洗面所の鏡、90秒 TTL | Physical State |

---

## §7. Tech stack — 現実と構想の分離

### 7.1 実際に名指しされている既存プラットフォーム / API

| カテゴリ | 名前 |
|---|---|
| センシング | CMMotionActivityManager, Android Activity Recognition, Galaxy Watch, UWB近接, BLE近接, Voice ID, AI Vision, ジャイロ+ロック状態 |
| プラットフォーム | Samsung Family Hub, Samsung Knox, Gemini Nano（オンデバイス）, Samsung Personal Data Engine, Apple Intelligence, Apple Private Cloud Compute, セキュアエンクレーブ, Google Gemini, Google Personal Context, Health Connect, Microsoft Copilot, Microsoft Entra |
| 相互運用の先例 | **Matter**（スマートホーム）, **OAuth 2.1**, **SCIM**, **Passkeys**, **OpenTelemetry** |
| 家庭 | Samsung Health, Apple HealthKit, Google Calendar, Apple Wallet, Nest Hub, CarPlay, Chromecast |
| 旅行（P2） | Lawson Ticket（ジブリ美術館抽選）, JR East SmartEX, 気象庁（桜前線）, ホテルPMS, Apple/Google Maps |
| 企業（P4） | Slack, Jira/Linear, Figma（バージョン履歴）, Drive, Calendar, CRM, サポートチケット, NPS |
| 金融（P6） | MUFG API |

### 7.2 明示的に「まだ存在しない」とラベルされているもの

| 項目 | ページ内のラベル | 出典 |
|---|---|---|
| ベンダー中立の Federation 層 | 「Proposal — 現在は出荷されていない」「Matter は5年かかった」 | P1/P2/P5/P6 |
| 統一された Disclosure Dial | Reality ★☆☆☆☆ Concept stage | spec |
| Cross-Media Correlation | 提案されている新機能、同意ゲート付きと明記 | P1 |
| 2030 ARグラス / スマートコンタクトレンズ | 「Aspirational — 出荷されていない」「Mojo Vision は2023年に閉鎖」 | P5/P6 |
| すべての数値指標 | 「indicative」「simulated cohort n=120」「architectural projection」「実運用データではない」 | 全体 |
| JTBD インタビュー引用 | 「simulated-archetype interviews からの合成音声」 | 全体 |

**これは弱点ではなく設計判断として扱われている。** P4いわく「すべての答えを持っているふりをするフレームワークは、アーキテクチャではなく営業資料だ」。

### 7.3 ポートフォリオ自体のフロントエンド

- **フレームワークなし。** バニラ HTML / CSS / JS のみ。React も Vue もバンドラもビルド工程もない。
- フォント: Geist Sans / Geist Mono（jsdelivr CDN）+ Noto Sans JP（Google Fonts）
- アニメーション: CSS `@keyframes` + `IntersectionObserver` のみ。外部アニメーションライブラリなし。
- **`assets/js/green-animation.js` (86.8 KB)** — 27個のインラインSVGコンポーネントを持つ唯一のアニメーション基盤。`data-ga="<component>"` または `data-ga-slot="<slot>"`（`ga-slots.js` が約45のスロット名を27コンポーネントに写像）でハイドレートする。
- `toc-rail.js` (19.2 KB) — 全スクロールページ必須のチャプターナビ。`window.TOC_RAIL` 設定から `CH XX · NN` を自動注入。
- `deck-nav.js` (14.8 KB) — スライドデッキ用（現在は退役方針）。
- CSS: `tokens.css`（Vercel Geist スケール）+ `components.css` + `bts-frame.css`（Concept/Backstage枠）+ デバイスフレーム8種 + `green-animation.css` (99.8 KB, 最大)

---

## §8. 実装層 — 本当にコードとして存在するもの

### 8.1 仕様ファイル（`context-grammar/specs/`）

| ファイル | 行数 | 内容 | ライセンス |
|---|---|---|---|
| `IMPLEMENTATION.md` | 241 | 4層アーキ図（App → Signal Layer → Rule Engine → Renderer）、シグナル層の対応表、バージョン方針、ロードマップ | CC BY 4.0 |
| `context-tokens-spec.yaml` | 904 | 8トークンの enum・信号源・可用性・reality_level(1–5)、Intent（explicit `latency_target_ms:500` / implicit `confidence_threshold:0.8`）、cross_token_rules ×7、substitution_modes ×4 | CC BY 4.0 |
| `brain-schema.yaml` | 1,147 | 3層 × ドメイン、減衰モデル（3回で定着 / 3ヶ月で減衰）、Disclosure軸、Autonomy 4段階＋エスカレーション規則、Multi-person、**Disposable Brain の完全ライフサイクル**、Trust timeline 4段階、型定義10種 | CC BY 4.0 |
| `design-rules.yaml` | 937 | **33ルール**（P1×9, P2×7, P3×7, General×10）。各ルールに `when.tokens` `when.brain` `then` `explanation` `source_project` | CC BY 4.0 |
| `ax-patterns-spec.yaml` | 545 | **23パターン**（D×6, E×5, A×8, X×4）。各々に `trigger_tokens` `trigger_extended` `outputs` `example`。合成4例 | CC BY 4.0 |
| `context-grammar.schema.json` | 160 | JSON Schema draft 2020-12。8トークン全部が required、`additionalProperties:false`。`x-reality-level` `x-detectable-today` の独自拡張付き | — |
| `context-grammar.d.ts` | 222 | 型宣言のみ（実装なし）。SDK の `types.ts` と同一内容 | — |

### 8.2 SDK（`context-grammar/sdk/`）— 動くコード

**`@context-grammar/core` v1.0.0-alpha.1** — 依存ゼロの純関数 TypeScript ルールエンジン。ESM。devDependencies は typescript のみ。

```ts
evaluateContextGrammar(state: ContextState): EvaluationResult   // メイン入口
getTriggeredPatterns(state): AXPattern[]                        // 23個の述語をフィルタ
recommendSubstitutionMode(state): SubstitutionRecommendation|null
getAutonomyCeiling(disclosure): AutonomyDial|null   // {none:null, minimal:'suggest',
                                                    //  moderate:'notify', full:'auto'}
validateState(state): { valid: boolean, violations: string[] }
PATTERNS: readonly AXPattern[]     // 23件
TOKENS: { ...8トークンのメタデータ }
```

**5つの関数はすべて実装済み（スタブではない）。**
`EvaluationResult` = `{ triggered, overrides, substitution, designRules, autonomyValid, autonomyCeiling }`
`DesignRules` = `{ ui_density, max_choices, touch_target, notification_level, content_filter, ai_capability }`

examples 3件: `commute.ts`（公共交通）/ `family-dinner.ts`（冷蔵庫・子供在席・部分的に実行可能）/ `work-deep-focus.ts`（デスクトップ・Auto・Full disclosure）

**⚠️ `dist/` が存在しない。** ビルドも npm publish もされていない。README の `npm install @context-grammar/core` は現状では失敗する。`github.com/intentfirst/context-grammar` も「Phase 3 で」とされており未作成。

### 8.3 Simulator（`context-grammar/simulator/`）

6つのHTMLサーフェス。すべてバニラJS、ビルド工程なし。

| ファイル | 内容 |
|---|---|
| `console.html` + `simulator.js` (1,172行) | **Live Console** — 8トークンのドロップダウン → パターン一覧・デザインルール・オーバーライド・代替モード・妥当性がライブ更新。6プリセット、URL状態エンコード（`?state=<base64>`）、Markdownのデザインブリーフをクリップボードへ |
| `index.html` / `pipeline.html` + `pipeline.js` (1,375行) | **Pipeline Simulator** — ① Intent → ② 8 Tokens → ③ Brain/Rule Engine/AX Patterns → ④ UI Output の4段可視化 ＋ 11項目の「AI Agent UX チェックリスト」。`scenarios/` の20データファイル（dinner, winddown, kid_sick, driving_fatigue, hospital_waiting 等）で駆動 |
| `gallery.html` | Vivid Moments — 10の短い場面（公共の場で銀行画面がぼける、歩いている最中に店が浮上、満員電車で静かになる） |
| `story.html` | 「Hana の1日」— 5つの瞬間で「公共では常にぼかす」という一律ルールが破綻することを示す |
| `prototype-pipeline.html` | 旧プロトタイプ（1,103行、完全インライン）。現行に置換済み |

### 8.4 PRD（`context-grammar/prd/index.html`, 1,216行, 日本語）

**これは別物** — `@context-grammar/core` SDK の上に載る、実際にインストールできる OSS ツール **「Context Brain」**（npm `context-brain`）の製品要求仕様。

**6層スタック**
```
 L5  Templates
 L4  AX Pattern Engine          ← SDK として TypeScript で実装済み
 L3  Autonomy Dial + Disclosure Dial
 L2  Coordinator + Selective Hydration
       既定では frontmatter と見出しインデックスだけを読み、
       [[wikilink]] 参照先だけを要求時に展開する
       （コンテキストウィンドウを溢れさせないため）
 L1  Schema（3層 × N-Brain の YAML frontmatter 規約）
 L0  Storage: .md ファイル、ローカルのみ（Obsidian互換）
```

**セットアップ**
```bash
npm install -g context-brain
context-brain init     # localhost:5173 でブラウザウィザード（4ステップ:
                       #   世帯名/vaultパス → 家族構成 → ドメイン選択 →
                       #   人×ドメインの Disclosure グリッド）
context-brain start    # MCPサーバを stdio で起動
                       # → ~/.claude/settings.json に1行足して Claude Desktop に接続
```

**重要な但し書き:** 保存は完全ローカルだが**推論は Claude API を通る**。したがって Disclosure Dial が「何が Anthropic に送られるか」の実際のプライバシー制御になる。

**V1 スコープ（in）:** Household Brain (Identity+Learning) / Person Brain ×1 / Coordinator / AX Pattern Engine（既存TS SDKの移植）/ Autonomy は **Suggest と Confirm のみ** / Claude Desktop MCP 連携 / `.md` 保存 / CLI 3コマンド / 家族テンプレート
**V1 スコープ（out）:** 外部アクション（EC・カレンダー・スマートホーム）/ ローカル推論(Ollama) / Electron / Person Brain 複数 / Domain Brain ×N / Event Brain / Notify・Auto / Disclosure GUI（V1はYAML直編集）/ npm publish / 企業テンプレート
→ **V1 の行動面は read/write のみ。「confirm」の返答は `tasks/pending.md` に TODO を書くだけで、外部APIは呼ばない。**

**V2 の予告 — Share Disclosure（第2の開示軸）:** V1 の Disclosure は「AIが何を取り込めるか」(Intake)。V2 で「誰に伝えるか」(Share, 相手 × ドメイン) を追加する。※ `disclosure.share_with` として V1 でスキーマ予約と書かれているが、**実際の `brain-schema.yaml` にそのフィールドは存在しない**（§11参照）。

**V3:** Web SaaS、企業向け Brain（Org / Brand / Research / Project Master Brain）= P4 の実装。

---

## §9. 図の索引 — 再描画に使える構造メモ

| 図 | どこ | 構造 |
|---|---|---|
| **Five Brain Diagram** | P4（正式名称）/ `green-animation.js` の `brain-architecture` | 4段。最上段=Project Brain ×4（各々の内側に Now/Learning/Identity の3本のストライプ、2秒ずつずれて脈打つ）→ 右端から ARCHIVE への graduation 矢印 → 櫛状コネクタで PMB（1本の広いピル）→ 櫛状に分岐して Brand·B2C / Brand·B2B / Research → 収束して ORG BRAIN。`data-highlight` で該当ブレインが緑に脈打ち、他が沈む |
| **Five Home Brains** | P1 / `home-five-brains` | 同じ形の家庭版。Household（土台）→ Person×5 と Domain×N（中段）→ Coordinator → Event Brain（最上段、Archiveへ卒業） |
| **Brain ↔ Coordinator ↔ Agent** | P1 | 3種のノード（Brain=青/受動、Coordinator=紫/能動、Agent=橙/実行）。5 Brain → 1 Coordinator → 3 Agent → 書き戻し矢印 |
| **Disposable Brain Orbit** | P2 / `disposable-brain-orbit` | Home Brain を3枚のピルで描き、L2（中段）の右端から泡が膨らんで出て、生き、しぼんで戻る（学習が「吸収された」瞬間に緑に光る） |
| **Rule Engine pipeline** | P1/P4/P5/P6 共通 | 3ボックス左→右: IN（Token状態のkey:value）→ ENGINE（rule match/skip、紫でハイライト）→ OUT（UIコマンドのkey:value） |
| **Tokens as Contract** | 同上 | 2カラム: 左=人間が読む物語カード / 右=JSONスキーマカード。下で generative-UI コンパイラのアイコンに合流し、複数デバイスへ扇状に展開 |
| **AX Pattern Composition** | 全体 | N枚のパターンカード（上端に色チップ、**角丸に色枠は禁止**）→「↓ composed into ↓」→ 1枚のシーンカード |
| **Disclosure Matrix** | P1 | 5×5=25セルのグリッド。Calendar行だけ全開（全ドメイン横断）、Health列だけ全開（全エージェントが読む）、他は封鎖 |
| **Translation morph** | P1 / `anim-translation-morph.html` | 1つの事実カードが3つの異なる深さのカードに分岐していくモーフ |
| **Autonomy Weaver** | P1 / `anim-autonomy-weaver.html` | 12ヶ月のx軸に4本の曲線（Home/Calendar/Education/Finance）。それぞれ別の高さで頭打ちになる。「87 Auto decisions」カウンタ |
| **Care collapse** | P1 / `anim-care-collapse.html` | 多ウィジェットのCarPlayダッシュボードが、Priority Weight=EMERGENCY で1要素に収縮する |
| **Translation Layer flow** | P3 | 3カラム: 左=発話由来の7チップ→ / 中央=脈打つ Search ノード＋「787 → 20 → 15」/ 右=←Brain由来の5チップ |
| **Brain → 5 Surfaces** | P5 / `brain-to-surfaces-flow.html`（**孤立ファイル**） | 中央に六角形の CONTEXT BRAIN（3色ドットの凡例）、5本の破線矢印が五角形配置の5サーフェスノードへ。右レーンに**P1〜P5の関係を明示した唯一のチェーン** |
| **Surface Vocabulary Map** | P5 | 左=5枚のCAN/CANNOTカード / 右=5×5のハンドオフ相性マトリクス（✓自然/△状況次第/✗壊れる） |
| **Life Brain Architecture** | P6 | 3カラム: 左=Health/Finance Agent、中央=Life Brain ハブ（3層ピル＋「↕ Intent in · Observation out」）、右=Location/Shopping Agent |
| **Protected Ritual composition** | P6 | D2 + A2 + T4 の3枚 → 「↓ compose ↓」→ 1枚の Protected Ritual カード |
| **Decision Trace** | P4/P5/P6 | 端末風の暗いモノスペースパネル。ヘッダ（時刻・decision_id・実行ms）→ TOKEN行 → RULE行（✓/✗）→ 重み付けした代替案リスト（確信度付き）→ フッタ（trace_id・保持期間・クエリAPI） |
| **Federation map** | P1/P2/P5/P6 | サーフェス×ベンダー×ランタイムの表 ＋ 「なぜ各社が採用するか」の4カード ＋ 層別の実行場所マトリクス ＋ `brain.federate()` のコードブロック |
| **Graduation animation** | P4 / `graduation-animation.html` | 自動送りループ: Now が蒸発 → Learning が Org Brain に溶ける → Identity が Archive に圧縮される |

---

## §10. マトリクス

### 10.1 Token × Project — どのプロジェクトがどのトークンを主役にしているか

| Token | P1 | P2 | P3 | P4 | P5 | P6 |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| ① Physical State | ● | ● | **◎** | ○ | ● | ● |
| ② Cognitive Load | ● | ● | ● | ○ | **◎** | ● |
| ③ Social Exposure | ● | ● | **◎** | ● | **◎** | ● |
| ④ Priority Weight | **◎** | **◎** | ● | ● | ○ | ● |
| ⑤ Form Factor | ● | ● | **◎** | ○ | **◎** | ● |
| ⑥ Feasibility | ● | **◎** | ● | ● | ○ | ● |
| ⑦ Autonomy Dial | **◎** | **◎** | **◎** | **◎** | ○ | **◎** |
| ⑧ Disclosure Dial | **◎** | **◎** | ● | **◎** | **◎** | **◎** |

◎=主役 / ●=使用 / ○=言及のみ

### 10.2 AX Pattern × Project

| Pattern | 名前 | 主な実演場所 |
|---|---|---|
| D1 | Approval Gate | P1（承認カスケード）, P2（並行アンカー予約）, P4（下書き承認） |
| D2 | Progressive Trust | P3（3ヶ月で787→3）, P1（12ヶ月4ドメイン） |
| D3 | Proactive Nudge | P1, P6（Moment Composer） |
| D4 | Omakase Mode | P1（Silent Resolution, 冷蔵庫の弁当） |
| D5 | Substitution Modes | P1（ヨーグルト4文法）, P3（売切れ代替） |
| D6 | Dynamic Friction | P1（$2/$48/$150） |
| E1 | Confidence Signal | P3（全カードに確信度%と根拠） |
| E2 | Limitation Disclosure | P3（「言語に住んでいない制約がある」と口に出す） |
| E3 | Rollback | P3（売切れ時に元を残す） |
| E4 | Ambiguity Escalation | spec のみ |
| E5 | Trust Breach Recovery | P3（返品履歴の自己開示）, P1 |
| A1 | Form Factor Transform | **P3 の中核**, P5 |
| A2 | Cognitive Scaling | P3（片手モード）, P5（Watch 3行）, P1 |
| A3 | Social-Aware Filtering | P3（TVの価格隠し）, P2（子供別デッキ）, P1 |
| A4 | Disclosure Cascade | P1（Translation Layer）, P2（3聴衆） |
| A5 | Disposable Surface | P2（栞）, P3（購入コンソールの溶解） |
| A6 | Care Architecture | P1（緊急時）, P2（2+2台帳） |
| A7 | Live Recomposition | P2（桜の組み替え）, P1（Cross-Media） |
| A8 | Temporal Handoff | P2（Return フェーズ）, P4（Learning Returns Home） |
| X1 | Reasoning Trace | P4（Brain Telemetry, Arman の系譜引用） |
| X2 | Inline Edit | P4 |
| X3 | Autonomy Dial UI | P4（Stakeholder Autonomy Matrix）, P6（Mid-Month Review） |
| X4 | Source Attribution | P4（Brand Brain の出典チップ） |
| — | **Protected Ritual**（P6独自 = D2+A2+T4） | P6 |
| — | **Moment Composer**（P5/P6独自） | P5, P6 |
| — | **Preview Redaction**（P5独自） | P5 |
| — | **Intent Match**（P4独自） | P4 |
| — | **Queryable Meeting Archive**（P4独自） | P4 |
| — | **Cross-Brain Reasoning**（P4独自） | P4 |
| — | **Graduated Archive**（P1/P4） | P1, P4 |

### 10.3 Device × Project

| デバイス | P1 | P2 | P3 | P4 | P5 | P6 |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| iPhone / Galaxy Phone | ● | ● | ● | ● | ● | ● |
| iPad / タブレット | ● | ● | | ● | | |
| Watch | ● | | | | ● | ● |
| EarBuds / 骨伝導 | | | | | ● | ● |
| TV | | ● | ● | | ● | |
| 冷蔵庫 / Family Hub | ● | | | | ● | |
| CarPlay / 車載 | ● | | | | | |
| Nest Hub / スマートスピーカー | ● | ● | | | | |
| ノートPC / デスクトップ | | ● | | ● | | ● |
| 環境（鏡・照明・床） | ● | ● | | | ● | ● |
| 公共サーフェス（JR車内表示） | | ● | | | | |
| 未来（AR / コンタクトレンズ） | ● | ● | | | ● | ● |

---

## §11. リポジトリの負債 — 次のセッションが知っておくべきこと

### 11.1 命名の不整合（CLAUDE.md の規則違反）

| 場所 | 問題 |
|---|---|
| `index.html` の P04 カード | 「Project Atlas」「Four brains, one grammar」— 2026-04-29 のリネーム（→ Enterprise Context Brain, 5 Brains）に未追従 |
| `ui-screens/p4/*.html`, `p4-v2/*.html` の `<title>` | 全ファイルに "Atlas" が残存 |
| P6 の Portfolio Map | P04 を「Project Atlas」と表記 |
| `ui-screens/p4-v2/intent-fidelity-dashboard*.html` | 「Intent Fidelity」— 正しくは **Intent Match** |
| `brain-schema.yaml` の disclosure level | `full / filtered / minimal / none` だが、正典（tokens-spec, JSON Schema, .d.ts, SDK）は `none / minimal / moderate / full`。**"filtered" vs "moderate" の未解決のドリフト** |

### 11.2 孤立ファイル（どこからも参照されていない）

| 場所 | 件数 | 備考 |
|---|---|---|
| `ui-screens/p1/` | 10 | v1 の全画面。`p1-v2/` に置換済み |
| `ui-screens/p2-v2/` | 3 | `s-planning-input-stream`, `s-planning-tv-touchdraw`, `s16-onsen-steps`（旅館オフライン時の graceful degrade を描いた未使用画面） |
| `ui-screens/p3/` | 5 | `p3-04-purchase`（UI溶解アニメ）, `p3-04-tv-escalation`（売切れ代替。人物名が旧稿の "Zara" のまま）, `p3-05-repurchase`, `p3-06-card-sort`, `p3-07-parent-remote` |
| `ui-screens/p5-v2/` | 4 | `watch-face-before`, `watch-morning-briefing`, **`tv-notification-block`（ファイル名はTVだが中身はPhone Redaction＝命名ミス）**, `brain-to-surfaces-flow`（P1〜P5の関係図として唯一のもの。惜しい） |
| `ui-screens/p6-v2/` | 7 | `phone-day{1,13,21,30}-*`, `watch-day{4,12,18}-*`。デバイスフレーム付き旧デザイン |
| `projects/project-02/css/`, `js/` | 全部 | 9つのCSS + 3つのJS。インライン化により完全に置換済み |
| `assets/js/global-menu{,-v2,-v3,-v4}.js` | 4 | 計約74KB。どのHTMLからも参照されていないナビ試作4世代 |
| `assets/js/site-nav.js` | 1 | 8KB、未使用 |
| `context-grammar/simulator/` | 2 | `pipeline.html` は `index.html` と約95%同一。`prototype-pipeline.html` は旧世代 |

### 11.3 仕様と実装の乖離

| 項目 | 状況 |
|---|---|
| **`assets/js/cg-schema.js` + `store.js`** | **正典と矛盾する別モデル**が残っている。0–100の数値ダイアル、`identity/history/environment/urgency/capability/sentiment` という6シグナル語彙、AXパターンは `delegate/escalate/adapt` の3つだけ。旧「5 Agent workstream」の残骸。**廃止マークもない。読み間違えると危険** |
| `simulator.js` | SDK を import せず、TOKENS/PATTERNS/CROSS_TOKEN_RULES/合成関数を**丸ごとインラインで複製**している。今は同期しているが、それを保証する仕組みはない |
| `IMPLEMENTATION.md` | design-rules を「40+」と書いているが実数は **33**（`green-animation.js` のコメントは正しく33と書いている） |
| `validateState()` | 「driving × phone_handheld は無効」というルールがコードにだけあり、どのYAMLにも無い |
| `trigger_extended` 全般 | D2の「5回連続承認」、D4の domain_trust、E1/E4のAI確信度など、**Brainランタイムも確信度モデルも存在しないため、拡張条件は誰も満たせない**。実装は token 側の半分だけを見て拡張条件を黙って無視している |
| cross_token_rules | YAMLに7つ、SDKに5つ。「Children present filter」と「Multi-surface content distribution」に**コード上の対応物がない** |
| `disclosure.share_with` | PRD が「V1でスキーマ予約済み」と書くが、`brain-schema.yaml` に該当フィールドが**存在しない** |
| `@context-grammar/core` | `dist/` が無い。ビルドも publish もされていない。README の `npm install` は失敗する |
| `github.com/intentfirst/context-grammar` | package.json / README / IMPLEMENTATION.md が参照しているが**未作成**。「open governance」の受け皿が無い |
| PRD の `context-brain` 製品 | CLI・MCPサーバ・Coordinator・Selective Hydration・セットアップウィザード — **コードは1行も存在しない**（PRD自身が「次の一歩」として認めている） |

### 11.4 CLAUDE.md 自体の更新漏れ

- **P5 (Cross-Surface Grammar) と P6 (Life Brain) が CLAUDE.md に一切記載されていない。** ファイル構成の節は P1–P3 しか列挙していない。
- P6 が導入した語彙（Domain Agents / Protected Rituals / Drive-Me / Driver Mode / Moment Composer / Forgotten Intent Retrieval）と P5 の語彙（Surface Vocabulary / Preview Redaction / Moment Composer）が `Global_Assets/CONTEXT_GRAMMAR_TERMS.md` に登録されているか要確認。
- なお `Global_Assets/CONTEXT_GRAMMAR_TERMS.md` と `Global_Assets/PORTFOLIO_GLOBAL_RULES.md` は CLAUDE.md から必読と指定されているが、**今回のリポジトリには存在しない**（`Global_Assets/` は `App_Icons/` と `DeviceFrame/` のみ）。

---

## §12. このファイルの使い方（次のセッションへ）

1. **新しいプロジェクトページを作るとき** — §4/§5 の機能カタログから、まだ描かれていない能力を探す。§10.2 で「まだ実演されていない AX Pattern」（E4 Ambiguity Escalation など）を確認する。
2. **既存ページを直すとき** — §3 の該当プロジェクト節で、そのページが何を主張しているかを掴んでから触る。§11.1 の命名不整合はその場で直す（CLAUDE.md の on-sight ルール）。
3. **実装を始めるとき** — §8 が唯一の出発点。SDK の5関数は動く。PRD (§8.4) が V1 のスコープを既に切ってある。**まずやることは `sdk/` をビルドして npm パッケージにすること。**
4. **企業向けの話をするとき** — §5 と §3 の P4 節。§5 B10 に移植先の証明済みリストがある。
5. **図を描き直すとき** — §9 に構造メモがある。`assets/js/green-animation.js` が唯一の実装場所。**角丸に色枠は禁止**（PORTFOLIO_GLOBAL_RULES §9.5）。
6. **フレームワーク自体の判断をするとき** — このファイルではなく [`context-grammar/_my-understanding.md`](context-grammar/_my-understanding.md) が正典。矛盾したらそちらが勝つ。

---

*このファイルは6つのプロジェクトページと specs/sdk/simulator/prd を実際に読んで生成されたもの。数値指標・インタビュー引用は、元ページ自身が「indicative / simulated」と明記しているものをそのまま引き継いでいる。実運用データは存在しない。*
