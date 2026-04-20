# Context Grammar — コンテンツ監査メモ
**作成日:** 2026-04-19  
**最終更新:** 2026-04-19(修正適用後)  
**目的:** コンテンツ戦略視点での重複・ギャップ・リンク切れ分析

---

## 適用済み修正(2026-04-19)

| # | ファイル | 修正内容 |
|---|---------|---------|
| 1 | `grammar/index.html` | Rule Engine末尾に「Rule Engine deep-dive + design-rules.yaml」リンクボックス追加 |
| 2 | `grammar/index.html` | CTAに「23 AX Patterns」「YAML Spec」ボタン+「Back to Overview」追加 |
| 3 | `brain/index.html` | L3「8 Context Tokens」をGrammarへリンク化+「See each token in detail →」追加 |
| 4 | `brain/index.html` | Disposable Brainセクションに「P2: The Family Trip応用例」リンク追加 |
| 5 | `brain/index.html` | CTAに「8 Tokens」「brain-schema.yaml」ボタン+「Back to Overview」追加 |
| 6 | `trust-design/index.html` | Dynamic Friction末尾に「33 design rules → design-rules.yaml」リンクボックス追加 |
| 7 | `trust-design/index.html` | CTAに「23 AX Patterns」「YAML Spec」ボタン+「Back to Overview」追加 |
| 8 | `context-grammar/index.html` | GrammarのTOCカード説明に「Substitution Modes」追加 |

**注:** Intent (`intent/index.html`) とRule Engine (`rule-engine/index.html`) は実在ページ。監査の「孤立」記述は不正確だった。Grammarからこれら専用ページへのリンクは今回追加した(修正#1)。

---

## 文章編集ログ(2026-04-20)— 「速く伝わる、詳細は残す」

### 共通の方針
- **Hero subは20-40%短縮**:全5ページ。「[負]の前置き短く→[提案]を12語以内」のパターンに統一
- **`why-matters`プレ・セクション削除**:Index/Brain/Specsで重複していたため削除
- **Restaurantメタファーの再配置**:概念の*導入*に1回。*リキャップ*としての使用は削除
- **Design Note callout**:本文の言い換えに過ぎないものは削除(Trust Design Autonomyセクション)

### Index
| 箇所 | 操作 |
|------|------|
| Hero sub | 3行→1段落、提案を2文目に |
| `why-matters`セクション | **削除**(直後のProblemセクションが同じことを言うため) |
| Floor 3 (Brain) | 「Memory is not unique」の防御的締め→3層+3スピードの提案先行 |
| Floor 5 (Response) | "Three directions of adaptive behavior" → "Delegate. Escalate. Adapt." |
| Projects intro | "Three projects" バグ修正(実際は5つ)+ 短縮 |

### Grammar
| 箇所 | 操作 |
|------|------|
| Hero sub | 「Every waiter...」削除、レストラン比喩の連投を解消 |
| `why-matters` + "Why Tokens?" 三重リード | **3段落→1段落に圧縮**。"AI today is the waiter reciting the specials to someone crying at the table"を見出しに昇格 |
| 8=6+2 anatomy note | 3割短縮(図が既に説明) |
| Token 1, 2, 3, 5, 6 のRestaurantメタファー | 各40%短縮(Token 4はPriority Weightロジック保持のため温存) |
| Core Formula末尾 prose | 1段落削除(図のリキャップ)、Same person/Same AI/Different grammarの一文を最後に残す |

### Brain
| 箇所 | 操作 |
|------|------|
| Hero sub | 短縮+「Three layers, three speeds」が頭に来るよう再配置 |
| `why-matters` + Problemセクションの三重リード | `why-matters`削除、Problem本文を2段落→1段落に |
| L1 Identity body | 2段落→1段落(具体名詞先行) |
| Disposable Brain Restaurantアサイド | **削除**(直前のlifecycle gridが既に同じ機能) |
| Multi-Person 2つのcaption | 各々を50%短縮(リスト形式に) |

### Trust Design
| 箇所 | 操作 |
|------|------|
| Paradoxセクション | **構造再編**:提案(Disclosure ≥ Autonomy)を上部に移動、レストラン例を下に降格 |
| Disclosure Dial intro | 2段落→1段落、「Protect / Connect」の二方向フレームを冒頭に |
| Autonomy "Design Note" callout | **削除**(3 Forces cardのリキャップ) |
| Trust Breach 「In restaurant terms」末尾段落 | **削除**(3つのcardが既に説明) |
| Trust Breach Accountability文 | "an error occurred is not"の対比でシャープ化 |
| Multi-Person intro | Brain Multi-Personとの差異(「Brainは状態追跡、Trust Designは各人にダイアル割当」)を1文で明示 |

### Specs
| 箇所 | 操作 |
|------|------|
| Hero sub | "JSON structures"削除(YAMLしかない)、3 YAML名で具体化 |
| `why-matters` + Concept body | `why-matters`削除、Conceptの「rushing to the airport」例を消し、エキスパート視点の提案文に置換 |
| "Try it in 2 minutes" 重複sec-desc | 2段落→1段落、「Three workflows below」で次セクションへブリッジ |

---

## 編集効果

| 観点 | 改善 |
|------|------|
| 縦スクロール量 | Index/Grammar/Brain/Specsで`why-matters`削除→各ページ1スクリーン分短縮 |
| 提案到達速度 | Hero〜最初のh2で提案が伝わるように再構成(以前は2-3スクロール必要だった) |
| Restaurantメタファー疲労 | 各ページで使用回数を約1/3削減、概念導入時のみに限定 |
| トーン | Specsの教示的な"AI is smart, but it has no common sense"→エキスパートが提案する文体に統一 |

**保持されたもの:** すべての具体例、技術リアリティ説明、レディネスバッジ、3レイヤー構造、4ダイアル定義、6 Trust Principles、5 Disposable Brain例、Multi-Person/Multi-Agent説明、Substitution Modes、33 ruleの言及。**情報量はほぼ無損。読み時間が短くなっただけ。**

---

## 復元ログ(2026-04-20)— Restaurantメタファー復元

### 教訓:対象読者の取り違え

前回の編集はSenior Designer/採用担当者を読者と仮定して「reading speed」を最適化した。**しかしTakaoの実際の読者像は「中学生でも分かる」レベル。** その読者にとって、Restaurantメタファーは「冗長な繰り返し」ではなく**抽象概念を理解するためのscaffolding(足場)**。

### 復元した編集

| # | ファイル | 復元内容 |
|---|---------|---------|
| 1 | `grammar/index.html` | "Why Tokens?" を3段落の完全形に戻す(h2は "The Waiter Who Notices" に復帰、killer lineは本文中の太字へ) |
| 2 | `grammar/index.html` | Token 1, 2, 3, 5, 6のRestaurantメタファーを完全形に戻す(2つの対比例構造を復元) |
| 3 | `brain/index.html` | Disposable Brainの "Birthday party" Restaurantアサイドを復元(lifecycle gridの抽象を具体に接続) |
| 4 | `trust-design/index.html` | Paradoxセクションを元の順序に(Lead → Restaurant → Pullquote → Body → Highlight box)。説得アーク(類比 → 認識 → 主張 → ルール)を復元 |
| 5 | `trust-design/index.html` | Trust Breach Accountabilityの "The restaurant says..." 復元 + 末尾の "In restaurant terms..." 段落復元(感情的アンカー) |
| 6 | `specs/index.html` | Concept body を "AI is smart, but it has no common sense" + 空港/電車の例に戻す |

### 削除のままにしたもの(構造的重複なので妥当)

- Index/Brain/Specsの`why-matters`プレ・セクション(直後のセクションで同じ事を言っていた)
- Indexの "Three projects" → "Five projects" バグ修正
- Indexの Floor 5 タイトル "Delegate. Escalate. Adapt."
- Hero subの短縮(全5ページ)
- 8=6+2 anatomyのnote短縮
- Grammar Core Formula 第1段落削除(図のリキャップ)
- Brain L1 body の単一段落化
- Brain Multi-Person 2 caption短縮
- Trust Design Disclosure intro 統合
- Trust Design Autonomy "Design Note" callout 削除(直前の3 Force cardの完全リキャップ)
- Trust Design Multi-Person introの Brain ブリッジ追加
- Specs hero "JSON structures" 削除(YAML only — 事実訂正)
- Specs "Try in 2 minutes" 重複sec-desc 統合

### この件で確立した編集ルール

> **Restaurantメタファーは scaffolding であり装飾ではない。** 「中学生でも分かる」を目指す本サイトでは、初見読者の on-ramp として機能している。**Prose redundancy(同じ事を別の言い方で繰り返す段落)は削ってよい。Metaphor scaffolding(抽象概念を具体例で接地する段落)は削ってはいけない**(削るには novice reader にとっても削ってよいという特定の根拠が必要)。

このルールは `CLAUDE.md` に記録した。今後の編集セッションで同じ過ちを繰り返さないため。

---

## コンセプト出現マップ

各コンセプトがどのページで・どの深さで説明されているか。

| コンセプト | Index | Grammar | Brain | Trust Design | AX Patterns | Specs |
|-----------|-------|---------|-------|-------------|-------------|-------|
| 8 Context Tokens | 表面 | **完全** | 表面 | 表面 | 不明 | スキーマ |
| Situation Tokens (6) | 表面 | **完全** | 表面 | 表面 | 不明 | スキーマ |
| Autonomy Dial | 表面 | **完全** | 段落 | **完全** | 不明 | スキーマ |
| Disclosure Dial | 表面 | **完全** | 段落 | **完全** | 不明 | スキーマ |
| **Intent** | towerのみ | **記載なし** | **記載なし** | **記載なし** | 不明 | **記載なし** |
| Substitution Modes | **記載なし** | **完全** | **記載なし** | **記載なし** | 不明 | **記載なし** |
| Brain (3 Layers) | 段落 | CTAのみ | **完全** | 段落 | 不明 | スキーマ |
| Disposable Brain | **記載なし** | **記載なし** | **完全** | **記載なし** | 不明 | **記載なし** |
| Rule Engine | 表面 | プレビュー | **記載なし** | **記載なし** | 不明 | **完全** |
| Dynamic Friction | **記載なし** | **記載なし** | **記載なし** | **完全** | 不明 | **記載なし** |
| Trust Temporal Arc | towerリンク | 転送リンクのみ | 段落 | **完全** | 不明 | **記載なし** |
| Multi-Person | **記載なし** | **記載なし** | **完全** | **完全** | 不明 | スキーマ |
| Multi-Agent | **記載なし** | **記載なし** | **完全** | **記載なし** | 不明 | **記載なし** |
| Three Info Flows | **記載なし** | **記載なし** | **記載なし** | **完全** | 不明 | **記載なし** |
| AX Patterns (23) | 表面リンク | **記載なし** | **記載なし** | **記載なし** | **完全** | **記載なし** |

---

## リンクマップ

### 各ページが「どこへリンクしているか」

```
Index ──────→ Grammar（tower + TOC）
        ├──→ Brain（tower + TOC）
        ├──→ Trust Design（tower + TOC）
        ├──→ AX Patterns（tower + TOC）
        ├──→ Specs（TOC）
        └──→ Projects（5 cards + CTA）

Grammar ────→ Brain（CTA）
        ├──→ Trust Design（転送ポインター）
        └──→ Index（footer + CTA）

Brain ──────→ Trust Design（domain section + CTA）
        └──→ Index（footer）

Trust Design→ Grammar（#disclosure-dial, #autonomy-dial 後方リンク）
        ├──→ Brain（CTA + domain言及）
        └──→ Index（footer）

Specs ──────→ Index（CTA）
        └──→ Projects（CTA alternative）
```

### 相互リンクの欠如（双方向になっていないリンク）

- **Grammar → Brain:** あり。**Brain → Grammar:** なし ← 問題
- **Grammar → Trust Design:** あり（転送）。**Trust Design → Grammar:** あり（後方）← OK
- **Grammar → Specs:** なし ← 問題
- **Brain → Grammar:** なし ← 問題
- **Brain → Specs:** なし ← 問題
- **Trust Design → Specs:** なし ← 問題
- **Trust Design → AX Patterns:** なし ← 問題
- **AX Patterns → Grammar/Brain/Trust:** 不明（ファイル大きすぎで確認できず）

---

## 主要問題点

### 1. ルールエンジンの説明がGrammarページに存在する理由と問題

**問題:** `grammar/index.html` の最後に「Rule Engine」セクションがある。  
**疑問:** なぜここにあるのか？Grammar = Token定義のページのはず。

**評価:**
- 「トークンがルールエンジンに入力される」という接続を見せるブリッジとして *一定の意味はある*
- しかし「プレビュー止まり」で詳細ページへのリンクがない
- `/specs/` にルールエンジンの完全説明があるが、Grammarページからリンクされていない

**推奨:**
- Grammarページのルールエンジンセクションに「Specsページで33のルールを見る →」というリンクを追加
- または、ブリッジ的な説明を削除してBrainページへのCTAのみにする

---

### 2. Intentコンセプトが孤立している

**問題:** IndexのTower (Floor 1) でのみ言及。専用ページなし、他ページへのリンクなし。  
**影響:** 読者はIntentが何かを理解できないまま進む。

**推奨:**
- Grammar/index.html の冒頭に「Intent（意図）は別途定義」の段落を追加し、明確にIntentがTokenとは別物であることを説明する
- または Indexの tower explainer からgrammarページの説明へアンカーリンクを張る

---

### 3. GrammarとBrainの接続が一方通行

**問題:** Grammar → Brain（CTA）はあるが、Brain → Grammar がない。  
**影響:** Brain ページを読んでいる人は、L3（Right Now）がどのTokenで構成されているかわからない。

**推奨:**
- Brain の「Layer 3: Right Now」セクションに「→ 8つのContext Tokenの詳細はGrammarへ」リンクを追加

---

### 4. Specsページが孤立している

**問題:** Specsへのリンクは IndexのTOCカードのみ。Grammar/Brain/Trust Designから直接リンクなし。  
**影響:** 読者はSpecsの存在を知らずに各コンセプトを読む。「機械可読な定義がある」という価値が伝わらない。

**推奨:**
- Grammarページの各トークンカードに「YAMLスキーマを見る →」リンク追加
- Brainページに「脳スキーマ（brain-schema.yaml）を見る →」リンク追加
- Trust Designページに「デザインルール33件を見る →」リンク追加

---

### 5. Substitution Modesの露出が少ない

**問題:** Grammarページのみで完全説明。他のページでは言及なし。Index TOCにも記載なし。  
**影響:** このフレームワークのユニークな概念が発見されにくい。

**推奨:**
- Index の TOC説明文に「Substitution Modes（4モード）」を1行追加
- Trust Designページに「ModeはAutonomyレベルと連動する」という接続を追加してGrammarへリンク

---

### 6. Disposable Brainが孤立している

**問題:** Brainページのみで完全説明。他ページ・プロジェクトへの接続なし。  
**影響:** このコンセプトがP2（Family Trip）と強く関連しているのに、その接続が見えない。

**推奨:**
- Brainページの「Disposable Brain」セクションから「→ P2 Family Tripでの応用例を見る」リンク追加

---

### 7. AX PatternsへのリンクがIndexのみ

**問題:** Grammar/Brain/Trust DesignからAX Patternsへのリンクがない。  
**影響:** AX Patternsが独立したコンテンツに見え、理論の応用として認識されにくい。

**推奨:**
- Grammarページ末尾に「このTokenがどのようなインタラクションパターンを生むか → AX Patterns」
- Trust Designページに「Temporal Arcに対応する23のパターン → AX Patterns」

---

## 重複評価（許容できる重複 vs 整理すべき重複）

### 許容できる重複（コンテキストが違う）
| コンセプト | Grammar | Trust Design | 理由 |
|-----------|---------|-------------|------|
| Autonomy Dial | Token構造（4段階） | 3つの力・動的な変化 | 視点が違う。両方必要 |
| Disclosure Dial | Token構造（2方向8レベル） | Autonomyとの結合ルール | 視点が違う。両方必要 |
| Multi-Person | Brainの記憶構造 | Trust Designの設定 | 同じ家族シナリオだが違う側面 |

### 整理すべき重複
| 問題 | 現状 | 推奨 |
|------|------|------|
| Rule Engine説明 | Grammar（プレビュー）+ Specs（完全） | Grammarはリンクのみ残し削除か、Specsへ転送 |
| レストランメタファー | 全ページで反復使用 | OK（統一性のため意図的）。ただし毎回同じ説明なら共通コンポーネント化を検討 |

---

## 日本語翻訳の状況

| ページ | 翻訳 | 状況 |
|--------|------|------|
| Index | ja/context-grammar/ | 存在確認できず |
| Grammar | ja/context-grammar/grammar/ | 完全翻訳 |
| Brain | ja/context-grammar/brain/ | 翻訳なし |
| Trust Design | ja/context-grammar/trust-design/ | 翻訳なし |
| AX Patterns | ja/context-grammar/ax-patterns/ | 翻訳なし |
| Specs | ja/context-grammar/specs/ | 完全翻訳 |

**推奨:** 英語版を先に完全化（memoryに記録済の方針）。日本語は後続。

---

## アクション優先度

### HIGH（リンク切れ・孤立コンテンツ）
1. **Grammar → Specsリンク追加** — 各トークンからYAMLスキーマへ
2. **Brain → Grammarリンク追加** — L3説明から8トークンへ
3. **Brain → Specsリンク追加** — brain-schema.yaml参照
4. **Trust Design → Specsリンク追加** — 33デザインルールへ
5. **Grammar Rule Engineセクション** — Specsリンクを追加、または削除

### MEDIUM（コンテンツの接続強化）
6. **Substitution ModesをIndex TOCに追加** — 1行の説明文
7. **Disposable Brain → P2プロジェクトリンク** — 応用例の接続
8. **Grammar末尾 → AX Patternsリンク** — 理論→実践の橋渡し
9. **Trust Design → AX Patternsリンク** — Temporal Arc → パターン

### LOW（polish）
10. ブレッドクラム追加（どの階にいるかの視覚的ヒント）
11. 各ページに「次のチャプター」CTAボタン追加（シーケンシャル読書のサポート）
12. AX Patterns（大きいファイル）の完全監査

---

## 結論

**構造:** 各ページは独立してよくできている。ただし「ネットワーク」としての繋がりが弱い。

**最大の問題:** Specsページが孤立している。概念ページからYAMLスキーマへの参照がないため、このフレームワークが「実装可能」という価値が伝わらない。これはポートフォリオとしての差別化ポイントなので、優先的に修正すべき。

**次点の問題:** GrammarのRule Engineセクション。Specsへのリンクなしに「こういうルールが生成される」と示すのは読者を宙ぶらりんにする。リンクを追加するか、セクション自体を削除してSpecsへ誘導する方が一貫性がある。
