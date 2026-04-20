# Context Grammar Portfolio — Projects 1〜5 サマリー

このドキュメントは、Takaoの「Context Grammar」ポートフォリオを構成する5つのプロジェクト（P1 The Living Home / P2 The Family Trip / P3 Fluid Handoff / P4 The Sales Floor / P5 The Control Tower）について、各プロジェクトの**ナラティブ・Context Grammarの具体的な提案・UIインターフェース**を一望できるように整理したものである。

5つを貫く統一テーゼは次の3点に集約される。

1. **同じ8 Context Tokens（Intent + 6 situation tokens + 2 dials）と Brain（Identity / Accumulated Learning / Right Now の3層）という"文法"が、家庭の冷蔵庫から多エージェント・オーケストレーションまで同じ語彙で記述できる**こと。
2. **UIはアプリではなくプロジェクトの寿命に合わせて「生まれ・変形し・消える」Disposable な存在**であること（P1 大掃除、P2 旅行、P3 買い物、P4 1日の営業、P5 ピッチ準備）。
3. **信頼は時間をかけて段階的に構築される（Trust Timeline / Temporal Arc）**——Suggest → Confirm → Notify → Auto への移行は、Implicit Dial（行動からの学習）と Explicit Dial（ユーザーが明示したルール）の両輪で進む。

スケールも段階的に拡張する：**P1〜P3 = 家庭 / コンシューマ → P4 = 個人エンタープライズ（営業マネージャー1人 × 1 AI）→ P5 = 多エージェント・オーケストレーション（1人 × 3 AIs）**。同じ文法がスケールを横断して機能することの証明がポートフォリオ全体の構造になっている。

---

## Project 1: The Living Home — Trust Architecture & Family Orchestration

### ナラティブ（Narrative）

舞台はカリフォルニア在住の和洋折衷ファミリー（夫Kenji・妻Yuki・10歳のRen・7歳のHana）。ストーリーは時間軸をそのまま骨格として使う **Month 1 → Month 3 → Month 6 → Month 9 → Year 1** の段階的進化。

- **Month 1（引っ越したばかり）**：冷蔵庫はほぼ空。「ブロッコリーと醤油しかない」状態から始まり、AIは「能力はあるがこの家のルールを知らないルームメイト」として登場する。Dialは Suggest（Position 1）。
- **Month 3（学習が始まる）**：サーモン3回連続選択、TJ's週2利用、TaskRabbit配達2回承認。ユーザーが Substitution Mode（Yukiのヨーグルト=Exact、Hanaのdairy-free=Flexible 等）を**明示設定**する。Dialは Confirm に上昇。
- **Month 6（日常が滑らかになる）**：醤油残量20%で自動補充、定番食材が Notify レベルで自動注文。「Honey-Garlic Salmon、20分で」のような Gradient Feasibility 計算が動く。
- **Month 9（Peak Episode = 大掃除オーケストレーション）**：「今日は大掃除。来客は3時」と告げた瞬間、TV・親のスマホ・10歳/7歳それぞれのタブレット・Google Speaker の**4デバイスが同時に変形**する。これがプロジェクトの視覚的ピーク。
- **Year 1**：冷蔵庫は常に補充され、ユーザーはほぼ何もしていない。Decision Debt（半年放置されていた階段下の照明など）も解消されている。

ビフォー側の問題提起は「フリクション・マップ」として5つに整理される：①買い物の非効率、②Decision Debt、③指示のボトルネック（大掃除で親がすべて頭で管理）、④情報の散在、⑤季節・パターンの忘却。

### Context Grammar の提案（Tech / Framework）

- **Home Brain（3層）**：Family Identity（アレルギー、価値観、家族ルール）/ Accumulated Learning（6ヶ月の料理履歴、Substitution Modes、Decision Debt ログ）/ Right Now（Family Hub スキャン、GPS、カレンダー、天気）。
- **Substitution Modes**（このプロジェクトの最大のユニーク証明）：**Exact（YukiのHoney Yogurt一択）/ Flexible（Hanaのdairy-free alternative）/ Exploring（プロテインパウダー味探索）/ Surprise（日本のお菓子、カリカリ系）**。すべて初期はユーザーの Explicit Action から始まり、AIが勝手にモードを変えない。
- **Implicit Dial（5回連続承認パターンから昇格提案）と Explicit Dial（$20超は常にConfirm、FreshDirectは使わない、子供は洗剤NG）の二重構造**。例外イベント時の一時降格も実装。
- **大掃除モードでの8トークン全発火**：Social=FAMILY、Form Factor=TV+Phone+Tablet×2+Speaker、Priority=3時の来客デッドライン、Feasibility=SA営業11-4 / 電気技師TaskRabbit 2:30。**4人分それぞれ異なる値で並列発火**するのが特徴。
- **Ren原則の消費者版**：Facilitate / Participate / Stepback、ダイナミクス検知、~25%貢献——AIは掃除を代行せず「4人が同時に効率よく動ける環境を整える」。

### UI / インターフェース

- **Home Brain App**（独立アプリ）：Google Home エコシステム連携の AI コンパニオン。ホーム画面、家族プロファイル、買い物リスト、プロジェクト、学習ログの5画面構成。
- **大掃除時の4デバイス変形**：
  - **TV（リビング中央）**：家の見取り図 + 各部屋の進捗バー + タイムライン。
  - **親のスマホ**：オーケストレーション・ダッシュボード（Salvation Army ルート、TaskRabbit 予約、UPS ラベル印刷リンク、予算）。
  - **10歳のタブレット**：「ミッション」画面。完了→次タスク自動提示。年齢制限（洗剤NG、高い棚NG）。
  - **7歳のタブレット**：イラスト付きシンプルチェックリスト。「よくできました！」フィードバック。
  - **Google Speaker**：声でのステータス更新と励まし（命令ではなくファシリテーション）。
- **Disposable UI**：大掃除完了後、UI は消滅し、学習だけが Home Brain Layer 2 に残る。
- **Escalation Pathway**：TaskRabbit 配達遅延、電気技師キャンセル時に**選択肢を構造化して人間に委ねる**（手作り / 待つ / Uber Eats、各々のコスト・時間明示）。

---

## Project 2: The Family Trip — Disposable Interface × Crisis Adaptation × Post-Trip Synthesis

### ナラティブ

舞台はアメリカ在住の Nakamura-Andersen 家（日本人の父Takeshi・米国人の母Sarah・12歳Kai・9歳Mia）の **2週間の京都・大阪旅行**。Takeshiの実家（京都）に3泊し、子供たちに日本文化を体験させる旅。物語は4つのフェーズで進む。

- **Phase 1 — Planning（出発2週間前）**：Sarahが深夜にGoogle Docsで比較表を自作する苦労が、「Kyoto-Osaka 2026」ダッシュボードに置き換わる。子供たちのスマホには**写真カード形式の "やりたいこと" 登録UI**（Kai=忍者・刀鍛冶・回転寿司、Mia=陶芸・着物・食品サンプル）。AIが家族の希望を統合し、Kai と Mia 共通の「刀鍛冶工房」を最上位に配置。
- **Phase 2 — Day 3 京都に雨**：プロジェクトを象徴するシーン。「雨だ」と声に出した10秒後に、京都の1日が再構成される。三十三間堂（屋内）・嵐山トロッコ列車（屋根付き）・錦市場へとリプラン。各デバイスに役割別表示——TVは全体マップ、親のスマホは予算影響+確認、子供のタブレットには **"ADVENTURE CHANGE！🌧"** のポジティブ翻訳。
- **Phase 3 — Day 7 Kaiが発熱（37.8度）**：Escalation Pathway の最も厳格な実装。AIは「大丈夫」とも「明日のディズニーに行ける」とも言わず、限界を正直に認め、最寄りドラッグストア（営業22時まで残40分）・旅行保険対応クリニック（タクシー15分・英語対応）・明朝8時までキャンセル料なしの予定変更、を構造化提示。**Synchro Rateは強制 Manual に降格**。
- **Phase 4 — 帰宅後**：翌朝「3つの動画ができました」通知。家族用15分・祖父母用5分・SNS用3分（子供の顔なし）の Post-Trip Synthesis。費用サマリー（総額$4,780/予算$5,000、ラーメンに$400使った発見）、家族の好みのHome Brainへの反映（Kai=ラーメンに目覚めた、温泉旅館は1泊だけ）。

### Context Grammar の提案

- **Trip Brain = Disposable Knowledge Architecture**：旅行2週間前に生まれ、Layer 1 を Home Brain から継承（家族の食の好み、アレルギー、Kaiの長距離歩行苦手）、Layer 2 を旅行中に蓄積、帰宅後は記憶になって UI が消える。次の旅行で「前回の学び」が引き継がれる。
- **6 Agentic Patterns 全発生**（記事#10 の HERO プロジェクト）：Intent Preview / Autonomy Dial / Explainable Rationale / Confidence Signals / Action Audit / Escalation Pathway——すべてが旅行の自然な流れの中で発火する。
- **Phase 別 Synchro Rate 切替**：Planning=Confirm（不可逆な決済）→ Travel通常=Notify → 例外時=Confirm降格 → 医療=Manual強制 → Post-Trip=Auto。
- **Disposable UI のライフサイクル**：Planning UI → Travel Mode UI に**変形**（消滅ではなく）→ Post-Trip UI → 1週間後消滅。「アプリのように常駐しない」が核心。

### UI / インターフェース

- **マルチデバイス構成**：Takeshi/Sarah の iPhone（メイン管理 / 予算）+ Kai/Mia 個別スマホ（子供向けUI）+ ホテル/旅館の TV（朝の予定表示・夜のアーカイブ鑑賞）。
- **写真カード形式のWishlist UI**：テキストリストではなく忍者衣装の子供・工房・ろくろ体験などの**ビジュアルで子供がワクワク**できる提案カード。
- **雨の再プラン UI**：TVに更新タイムライン + ハイライト、親スマホに予算影響（+¥2,480）+ 代替案、子供タブレットには冒険として翻訳された表示。
- **発熱時の Escalation Card**：選択肢3つを①②③で構造化、保険証番号・営業時間・キャンセル可能タイミングまで準備済み、最後に「医療判断はAIの範囲外です」の明示。
- **Post-Trip 3-Tier Video**：オーディエンス別（家族 / 祖父母 / SNS）に長さと内容を変える出力。レシート OCR → カテゴリ分け → 家計簿連動。

---

## Project 3: Fluid Handoff & Shared Arbitration — Brain × Intent Amplification

### ナラティブ

舞台はロンドン郊外の Campbell-Adeyemi 家（黒人英国人の母Naomi・白人英国人の父James・16歳の姉Zara・13歳の弟Marcus・7歳のTheo）。Naomiが朝の通勤電車で**MarcusとZaraの2人分の冬用靴を探す**1日。プロジェクトの一言は「Naomiは AI に **3つ**しか言わなかった。でも Brain は Marcus のことを **5つ**知っていた」。

- **Phase 0 — The Platform（駅のホーム、両手・PRIVATE）**：音声で制約を伝える（黒・防水・体育用・フワフワNG・有名ブランド・UK3 と UK5）。3エージェントが並列起動し、Marcus用8候補・Zara用7候補を生成。
- **Phase 1 — The Train（電車、片手・PUBLIC）**：UI が Tinder的なスワイプカードに自動変形。ここがストーリーの核——**「AIが翻訳できなかった」制約**（白いソールNG、リッジソールNG、青アクセントNG、大きなロゴNG）が、実物画像を見て初めて言語化される。NaomiがNG判定するたびに Brain が学習し、その学習が Zara の候補にも自動適用される。
- **Phase 2-3 — The Living Room（リビング、家族・FAMILY）**：帰宅後にTVへキャストした瞬間、**スマホは画像コンポーネントを完全Purgeしてリモコンに変形**。TVは子供向けの感情ラベル（"Waterproof! Run-ready!"）+ 価格非表示、親のスマホだけに価格・Confidence・Buyボタン。Marcusは「真ん中のやつ！」と即決（TNF Fastpack £69）、Zaraは TNF を選ぶがUK5在庫切れ → AIが**事前に用意していた代替**（Adidas Terrex Free Hiker 2.0 GTX £170）を提示する Escalation。

### Context Grammar の提案

- **核心命題（Brain × Intent Amplification）**：Translation Layer はツールに過ぎず、本質は「Brainが意図を増幅する」こと。Naomiの3語 × Marcusの5つの蓄積記憶 = 847件→20件の絞り込み。
- **Selection = Learning**：スワイプという選択行為そのものが教師データ。Salomon を除外 → 「派手なパターンNG」、Vans を除外 → 「リッジソールNG」、TNF を残す → 「ミニマル黒ソール=正解」。
- **Shopping Brain = Disposable Brain**：購入完了で死に、Home Brain に「白ソールNG」「UK 3.5」「~£90 sweet spot」などを永続化還元。**P2 Trip Brain と同一構造**で、文脈が違うだけ。
- **Disclosure × Social Exposure 由来の設計判断**：TVに価格を出さないのは「子供に見せたくない直感」ではなく、Disclosure Dial(Marcus=未設定/親管理) × Social Exposure(FAMILY with minor) → Rule Engine が `price_visibility = parent-only` を導く。
- **8 Token Feasibility**：「在庫あり」「サイズ実寸検証済み」「週末配送可」が単なる Intent ではなく**環境が許すかを問うトークン**として機能。
- **Translation Layer の正直な限界提示**：Confidence 67%の薄いフリースは Escalation で「⚠️マーク付きで含めますか」と問う。

### UI / インターフェース

- **11枚のHigh-Fidelity Screen**：Phase 0=フルブラウズカード×2（Marcus/Zara タブ切替）、Phase 1=スワイプカード+学習通知+絞り込みサマリー×3、Phase 2=TVグリッド+リモコンモード×2、Phase 3=Marcus決定+Zaraサイズ切れ+代替提案+購入完了×4。
- **片手モード変形**：タッチターゲット56px、操作ゾーンをサムゾーン（下部40%）に限定、価格はblurしない（機密ではないため）。
- **TV Output**：4足グリッド + 感情ラベルのみ、フォーカス時に拡大、価格デフォルト非表示。
- **Mobile Output（リモコンモード）**：商品画像を完全消去 → 中央に十字キー + OKボタン、下部にフォーカス商品の価格 + Confidence Signal + Buy。
- **Escalation のTV表示**：在庫切れ品はグレーアウトして残り、横に矢印で代替が出現（「消えるのではなく代わりが現れる」）。

---

## Project 4: The Sales Floor — Social-Aware Filtering × Temporal Arc × Enterprise Trust

### ナラティブ

舞台はマンハッタンのモダン SaaS スタートアップ。主人公は **Ren（蓮）、30代の営業マネージャー**。多様なチームを率いている。CRMには300件のリード、メール42通未読、今日のスタンドアップまで1時間。会社が導入した Sales Agent は初日から動いているが、Ren はまだ根拠が見えず信頼していない——ここが出発点。

物語は Ren の1日を5シーンで追う：
- **Scene 1 — Morning 9:00**：「300件の不安を3件の確信に変える」。CRM・メール・カレンダー横断で Lead A（HOT・田中様）/ Lead B（COOLING・佐藤様）/ Lead C（WARMING・鈴木様）に集約。
- **Scene 2 — Standup 10:00（Key Moment）**：「有能に見られたい。でも未達の数字は見せたくない」。画面共有の瞬間に **Social Exposure が PRIVATE→PUBLIC に変化**し、画面が静かに変形（センシティブな数字が抽象バーに置き換わる）= Social-Aware Filtering。
- **Scene 3 — Lunch 12:30**：マンハッタン路上を片手スマホで歩きながら Lead B のステータス確認。
- **Scene 4 — Afternoon 14:00 + Emergency 15:30**：重要フォローアップを30分かけずに作成（Approval Gate でインライン承認）。会議中に重要電話が鳴った時は、AIが決めずに「両方の重みを見せて Ren に委ねる」=Priority Weight = 審判であり独裁者ではない。Dynamic Friction の比喩は **「ビールは黙って出す。15万円のワインリストは勝手に開けない」**。
- **Scene 5 — Evening 18:00**：今日の構造化日報 + Brain が今日学んだこと + 明日への引き継ぎ。

そして **Temporal Arc**：Week 1（手動）→ Week 2（学習中）→ Month 1（信頼）→ Month 3（自律）の植物の成長メタファーで信頼進化を可視化。

### Context Grammar の提案

- **同じ8 Tokenが家庭も職場も記述する汎用性の証明**（P3=家庭、P4=職場、橋渡しのスライドで明示）。Tokenの定義は変えず、コンテキストだけが変わる。
- **Social-Aware Filtering**（業界初として位置付け）：画面共有・上司接近・スタンドアップなど Social Exposure 変化に応じて、同じデータの見せ方が動的に変わる。
- **Confidence Signals + Approval Gate**：AIの提案にすべて根拠が付く。Approval Gateはメール送信・ミーティング設定などをインラインで [Approve] [Edit] [Reject] [Schedule]。
- **Dynamic Friction**：低リスク（メモ）→ 高リスク（契約捺印・握手）でアクション別に Autonomy Ceiling を変える。レストラン比喩で説明。
- **Brain Learning（職場版3層）**：1日の終わりに「Renは木曜午後にDealを進めやすい」「価格交渉は午前中に強い」などのパターンが Layer 2 に蓄積。
- **差別化ピラミッド**：業界初（Social-Aware Filtering / Temporal Arc）/ 新しいが標準化が近い（確信度UI / Approval Gate）/ 既に実装済みの前提（Copilot for Sales / Salesforce Einstein クロスシステム分析）。

### UI / インターフェース

- **Lead Card UI**：HOT/WARMING/COOLING のステータスチップ + 確信度バー + シグナル説明（「メール返信24h以内 / 来週デモ確定 / クローズ可能」）+ 推奨アクション。
- **Dual Screen UI**（Scene 2）：左=Renのラップトップ（フル詳細）、右=会議室壁ディスプレイ（センシティブな数字を抽象バーに変換）。
- **Approval Gate UI**：メールドラフト全文 → 矢印 → [Approve] / [Edit] / [Reject] / [Schedule]の4ボタン。
- **Priority Notification UI（Emergency）**：左カラム=会議の重要度、右カラム=電話の重要度、中央 vs、下部に [Take Call] / [Send to VM] / [Let AI Handle]の3択。
- **Summary Dashboard**：日報のメトリクスカード3つ + Brain Learning カード（pattern / dial / pref の3タイプ）+ Scene Flow（時系列の1日）。
- 写真は NYC のオフィス・通勤路・ミーティングルームの Photorealistic 写真（kuukikan style ではなく Western enterprise tone）。

---

## Project 5: The Control Tower — Multi-Agent Orchestration × Cascade Delegation

### ナラティブ

P4から3ヶ月後の Ren。会社の「AIエージェント導入プログラム」で **Sales Agent（信頼3ヶ月・高）に加え、Research Agent（2週間・低）と Admin Agent（1ヶ月・中）が加わった**。3つのAIと働く新しい現実が舞台。

- **Setup**：シェフ・ホール・仕入れ担当はいるがマネージャーがいないレストランの比喩。
- **Scene 1 — 朝9:00 Morning Dashboard**：3エージェントの夜間実行結果が Control Tower 1画面で見える。Sales=DONE / Research=RUNNING / Admin=承認待ち。
- **Scene 2 — 10:30 Conflict Resolution（Key Moment）**：2つのエージェントが同じ時間枠を取り合う。AIは決めず、両方の根拠を**対等に**見せて、Priority Weight を「審判（独裁者ではない）」として提示——Renが選ぶ。
- **Scene 3 — 13:00 Cascade Delegation**：「**ピッチの準備をして**」の1文で、Research（競合分析）→ Sales（資料作成）→ Admin（会議室予約）が依存関係を持って同時起動。各サブタスクごとに**独立した Dial 位置**（Confirm / Auto）を持つ。
- **Scene 4 — 15:00 Emergency Escalation**：Cascade の途中ノードが停止し、影響が全エージェントに波及。Impact Map で可視化し、3つの選択肢（urgent / parallel / review）を提示。

最後に **Temporal Arc — 3 Agents** で、3つの信頼が**異なる速度**で成長することを示し、「3エージェント × ドメイン別の信頼の2次元管理 = Autonomy Matrix」へと昇華する。

### Context Grammar の提案

- **核心テーゼ：1D Dial → 2D Matrix への進化**。P4までは Autonomy Dial は1本だったが、P5では「エージェント × ドメイン」の2次元マトリクスになる。同じ概念がスケールするだけ。
- **Cascade Delegation**：1つのIntent（「ピッチ準備」）が複数エージェントの依存関係グラフに自動分解され、各ノードは独立した Dial を持つ。
- **Conflict Resolution のデザイン原則**：AIは決めない。両方の根拠とPriority Weight を対等に見せて、ユーザーに委ねる（P4「審判」の延長）。
- **Emergency Escalation の Impact Map**：失敗したノードから波及する影響を全エージェントに可視化、優先度の動的シフトを提示。
- **3 Agents × Temporal Arc**：信頼蓄積速度がエージェントごとに異なることを認め、ドメイン別に独立して進化。
- **OSレイヤーとしての位置付け**：Multi-Agent調整は個別アプリではなくOS層で行われるべき——これが P1〜P5 全体の到達点。

### UI / インターフェース

- **Control Tower Morning Dashboard**：3つのAgent Card（Sales/Research/Admin）+ ステータスドット（緑/橙/赤）+ DONE/RUNNING/ERROR チップ + タスクリスト + NEXT 行（承認待ち事項）+ チーム全体のサマリーバー。
- **Setup Card**：各エージェントの在籍期間（3ヶ月 / 2週間 / 1ヶ月）+ 信頼度バー（85% / 25% / 55%）。
- **Conflict Box UI**：左=Agent A のタスクと根拠、右=Agent B のタスクと根拠、中央 vs、下部に選択肢ラジオリスト + Priority Weight の説明。
- **Cascade Flow UI**：ルートタスク → 枝分かれノード（Agent名 + Dial レベルチップ + タスク + ステータス + 依存関係表示）+ 進捗バー + dependency note。
- **Emergency Panel**：赤枠 + イベント説明 + Impact List + Priority Shift の Before/After + 3つのアクションボタン（urgent/parallel/review）。
- **Autonomy Matrix Table**：行=エージェント、列=ドメイン、セルの色で `am-active`（緑=Auto可）/ `am-confirm`（橙=要確認）/ `am-empty`（権限なし）を表現。
- **Trust Timeline**：3レーン（3エージェント分）並列に時系列で成長軌跡を表示。

---

## 横断的なテーマ（Cross-Cutting Themes）

5プロジェクトを並べると、Context Grammar というデザイン言語が以下を共通して証明していることが見えてくる。

1. **同じ文法のスケール証明**：8 Context Tokens + Brain（3層）+ Substitution Modes + Autonomy Dial が、家庭の冷蔵庫（P1）/ 家族旅行（P2）/ 親子の買い物（P3）/ 個人エンタープライズ（P4）/ 多エージェント・オーケストレーション（P5）すべてで同じ語彙のまま機能する。
2. **Disposable UI / Disposable Brain のライフサイクル**：UIはアプリではなくプロジェクトの寿命に応じて生まれ・変形し・消える。P1=大掃除Disposable UI、P2=Trip Brain、P3=Shopping Brain、P4=1日のセッション、P5=Cascade Delegation——どれも「常駐しないが学習だけは Home/Master Brain に還元される」構造。
3. **信頼は時間で構築される（Trust Timeline / Temporal Arc）**：P1（Month1→Year1）、P2（旅行間引き継ぎ）、P3（4ヶ月→1年）、P4（Week1→Month3）、P5（3エージェント独立速度）——いずれも Implicit Dial（行動学習）と Explicit Dial（明示ルール）の二重構造で進む。
4. **AIは決めない、構造化して委ねる**：Escalation Pathway（P1の電気技師キャンセル、P2の発熱、P3の在庫切れ、P4の重要電話、P5のCascade失敗）はすべて「両方の重みを対等に見せる」設計。Priority Weight は審判であり独裁者ではない。
5. **Form Factor Transformation の段階的拡張**：P1=4デバイス同時変形、P2=スマホ→TV→子供タブレット、P3=スマホ→リモコン変形（最も劇的）、P4=デスクトップ↔会議室ディスプレイ Social-Aware切替、P5=Multi-Agent Dashboard。
6. **Human-Human Facilitation（Ren原則の消費者・職場展開）**：P1の大掃除（4人家族）、P3の親子の買い物（価格を子供から隠す Social Job 保護）、P5の多エージェント環境——AIは~25%貢献に抑え、人間同士の関係を守る環境を整える役回りに徹する。
7. **段階性 = Consumer (P1-3) → Personal Enterprise (P4) → Team Orchestration (P5)**：家庭の Home Brain から始まり、エンタープライズへ、そして OS レベルの Multi-Agent調整へと到達する。最後の Appendix スライド「同じContext Grammarが、すべてのスケールで機能する」がポートフォリオ全体のクロージング・ステートメントになっている。
