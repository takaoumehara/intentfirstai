# Missing ISO-GREEN Images — Prompt Collection
## 不足している画像のプロンプト

スタイル: simple-iso-diagram-promptmaker.md に準拠。
保存先: `context-grammar/images/ISO-GREEN/`

---

## 現状マップ

| 画像ID | ファイル名 | ステータス |
|--------|-----------|----------|
| Token ① | IF-Token1-physical.png | ✅ 存在 |
| Token ② | IF-Token2-congnitiveload.png | ✅ 存在 |
| Token ③ | IF-Token3-SocialExposure.png | ✅ 存在 |
| Token ④ | IF-Token4_PriorityWeight.png | ✅ 存在 |
| **Token ⑤** | **IF-Token5-FormFactor.png** | **❌ 不足** |
| Token ⑥ | IF-Token6-Feasibility.png | ✅ 存在 |
| Token ⑦ | IF-Token7-AutonomyDial.png | ✅ 存在 |
| Token ⑧ | IF-Token8-DisclosureDial.png | ✅ 存在 |
| Brain 3L | IF-05-brain3layers.png | ✅ 存在 |
| **Brain L1** | **IF-BrainL1-Identity.png** | **❌ 不足（プロンプト改訂済み）** |
| **Brain L2** | **IF-BrainL2-Learning.png** | **❌ 不足（プロンプト改訂済み）** |
| **Brain L3** | **IF-BrainL3-RightNow.png** | **❌ 不足（プロンプト改訂済み）** |
| **Disposable Brain** | **IF-DisposableBrain.png** | **❌ 不足（プロンプト新規作成）** |
| **Multi-Person** | **IF-MultiPerson.png** | **❌ 不足（プロンプト新規作成）** |
| Trust 01–08 | Trust-01〜08.png | ✅ すべて存在 |

---

## TOKEN ⑤ Form Factor — 周りにどんな画面があるか

**保存ファイル名:** `IF-Token5-FormFactor.png`
**用途:** grammar/index.html の Token ⑤ 説明セクション

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent color only,
no shading no gradients,

Three devices arranged in an isometric triangle formation connected by thin arrows:
Device 1 (bottom-left): a smartphone showing a grid of 20 tiny shoe thumbnails —
label "Phone: Browse",
Device 2 (bottom-right): a large TV/monitor showing 3 big shoe images side by side —
label "TV: Compare",
Device 3 (top-center): a small smartwatch showing a single checkmark — label "Watch: Confirm",
Curved arrows flowing between devices showing content transformation:
Phone→TV arrow labeled "Cast", TV→Watch arrow labeled "Decide",
Green #30c969 accent fill on the active TV screen,
The phone transforms into a small remote-like UI when TV is active (tiny label "Remote Mode"),
A small person figure standing between the devices,
clean device orchestration composition
```

---

## BRAIN LAYER シリーズ — ユニバーサルプロンプトプレフィックス

**このプレフィックスを L1・L2・L3 すべての先頭に付けて生成すること。**
3枚は同じセクションに並べて表示するため、フォームファクターの一致が最重要。

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent only,
no shading, no gradients, no color except black lines and #30c969 green,

FORM FACTOR — critical for series consistency:
This is ONE of three matched images. All three share the exact same base shape:
a thick rectangular slab, footprint approximately square (20 units × 20 units),
height approximately 2 units — like a heavy flagstone or thick tile.
The slab floats in isometric space, slightly angled.
ALL design and detail lives ONLY on the TOP SURFACE of the slab.
Side faces are plain — no detail, just clean isometric edges.
The three slabs will be stacked as layers in a separate overview image,
so the slab silhouette must be identical across all three.
```

---

## BRAIN L1: Identity — 永続的な記録（めったに変わらない）

**保存ファイル名:** `IF-BrainL1-Identity.png`
**用途:** brain/index.html の L1 Identity セクション

```
[UNIVERSAL PREFIX — paste the Brain Layer Universal Prefix above here]

The top surface of the slab is textured like carved stone or dense concrete.
Engraved/etched entries are carved directly into the surface in neat rows:
"Family: 4"  "Language: JP/EN"  "Allergy: Nuts"  "Home: Bay Area"
One entry has a green #30c969 accent line beneath it — the most recently confirmed fact.
A tiny keyhole shape carved at one corner — rarely unlocked.
A small cobweb drawn at one edge — suggesting it hasn't been opened recently.
A tiny chip/label near the slab edge: "Identity" and "Updates: Months / Years",
clean carved-permanence composition — the slab itself IS the record.
```

---

## BRAIN L2: Accumulated Learning — 蓄積された学習（徐々に育つ）

**保存ファイル名:** `IF-BrainL2-Learning.png`
**用途:** brain/index.html の L2 Learning セクション

```
[UNIVERSAL PREFIX — paste the Brain Layer Universal Prefix above here]

The top surface of the slab is divided into three terraced soil sections,
each slightly raised from the previous — like a tiny stepped garden bed built into the slab.
Left section (lowest): bare soil with one small seedling — labeled "Visit 1",
Center section (mid): richer soil, medium plant — labeled "Visit 10",
Right section (highest): full plant with leaves, tallest — labeled "Visit 30",
green #30c969 accent on the leaves of the tallest plant only.
A tiny watering can icon at the edge labeled "Usage".
Small scissors icon at another edge labeled "Correction".
Height-mark lines on the slab's raised inner walls, like a ruler.
A tiny chip near the edge: "Accumulated Learning" and "Updates: Days / Weeks",
clean tiered-growth composition — the slab itself IS the planter.
```

---

## BRAIN L3: Right Now — 今の観察（水面 / 秒単位で変わる）

**保存ファイル名:** `IF-BrainL3-RightNow.png`
**用途:** brain/index.html の L3 Right Now セクション

```
[UNIVERSAL PREFIX — paste the Brain Layer Universal Prefix above here]

The top surface of the slab is covered in a shallow layer of water.
Multiple ripple rings expand from different points — each ripple is one arriving signal.
The newest ripple at center is crisp and green #30c969 — the live data point.
Older ripples near the edges are faint, almost gone — fading signals.
Four tiny icons at the ripple origins (running figure, clock, people silhouette, phone)
suggesting different token sources landing on the surface.
No labels cluttering the surface — the ripples themselves tell the story.
A tiny stopwatch at the slab edge.
A tiny chip near the slab edge: "Right Now" and "Updates: Seconds",
clean live-sensing composition — the slab IS the surface that receives the world.
```

---

## Disposable Brain — 使い捨て記憶のライフサイクル

**保存ファイル名:** `IF-DisposableBrain.png`
**用途:** brain/index.html の Disposable Brain セクション、overview の拡張メカニズム説明

**コンセプト:** Trip Brain が生まれ、学習し、Home Brain に学びを返して消える。右奥に恒久的な Home Brain が存在する。

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent color only,
no shading no gradients,

Four sequential isometric scenes arranged left to right showing a lifecycle.
Each scene shows the same object: a miniature stack of THREE thin rectangular slabs
(small version of the Home Brain — same 20×20×2 slab form factor, just smaller scale),

Scene 1 — "Born": the mini three-slab stack with completely bare/empty top surfaces,
no texture, no data — clean blank slabs,
a thin dotted box outline around the stack labeled "Trip Brain",
a small spark icon above — label "Born",

Scene 2 — "Learns": same mini three-slab stack, top surface now shows small scattered icons
(a suitcase, a temple arch, a food bowl) — data points accumulating on the surface,
green #30c969 accent dots on the top slab surface — label "Learns",

Scene 3 — "Returns": same mini three-slab stack with thin dotted arrows rising from the
top surface, flowing rightward toward the larger Home Brain stack in the background,
only three small dots transfer — label "Returns key insights",
the mini stack surface begins to fade slightly,

Scene 4 — "Dies": the mini three-slab stack shown as dashed outlines only,
nearly transparent, surfaces blank again — label "Dies",
a small clean disappearance — no residue, no debris,

In the right background: the full-size Home Brain — three slabs stacked, solid and permanent,
with small incoming dots landing on its surfaces from Scene 3,
label "Home Brain" on the background stack,

Thin sequential arrows connecting scenes 1→2→3→4 below,
A tiny timeline label: "Trip starts → Trip ends",
clean lifecycle composition — same slab architecture, intentionally temporary
```

---

## Multi-Person Orchestration — 同じAI、4人のルール

**保存ファイル名:** `IF-MultiPerson.png`
**用途:** brain/index.html の Multi-Person セクション、overview の拡張メカニズム説明

**コンセプト:** 同じ冷蔵庫/AIが、家族4人それぞれ異なるルールで応答する。中央にAIハブ、4人が周囲に。

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent color only,
no shading no gradients,

A central isometric hub or platform in the middle — a small refrigerator or AI device shape
with green #30c969 roof — labeled "Same AI",

Four small person figures arranged around the hub at four corners, each connected to the
hub by a thin line, each with a small card floating above them:

Person 1 (top-left): adult female figure, card reads "Exact + Auto" with a small lock
icon — label "Mom: always Meiji Bulgarian",

Person 2 (top-right): adult male figure, card reads "Flexible + Confirm" with a small
checkmark — label "Dad: Greek-style, any brand",

Person 3 (bottom-left): teenage figure, card reads "Exploring + Suggest" with a small
star icon — label "Daughter: something new",

Person 4 (bottom-right): child figure, card reads "Low frequency" with a small neutral
circle — label "Son: no preference",

Each connecting line has a small different-colored dot suggesting different rule sets,
green #30c969 accent on the central hub roof and the Exact+Auto card (most specific),
A thin label below the hub: "One shopping list — four different outputs",
clean radial orchestration composition showing simultaneous personalization
```

---

## 生成後の配置

| 画像 | ページ | セクション |
|------|--------|----------|
| IF-Token5-FormFactor.png | context-grammar/grammar/index.html | Token ⑤ Form Factor説明 |
| IF-BrainL1-Identity.png | context-grammar/brain/index.html | L1 Identity セクション |
| IF-BrainL2-Learning.png | context-grammar/brain/index.html | L2 Learning セクション |
| IF-BrainL3-RightNow.png | context-grammar/brain/index.html | L3 Right Now セクション |
| IF-DisposableBrain.png | context-grammar/brain/index.html | Disposable Brain セクション |
| IF-MultiPerson.png | context-grammar/brain/index.html | Multi-Person Orchestration セクション |
| IF-RuleEngine-IfThen.png | context-grammar/grammar/index.html | Rule Engine Bridge セクション |
| IF-DynamicFriction.png | context-grammar/trust-design/index.html | Dynamic Friction セクション |
| IF-BreachRecovery.png | context-grammar/trust-design/index.html | Breach & Recovery セクション |

## 生成の手順

1. Brain L1/L2/L3 は **ユニバーサルプレフィックスを先頭に貼り付けて** から各プロンプトを続ける
2. 生成された画像を `context-grammar/images/ISO-GREEN/` に上記ファイル名で保存
3. 各ページの対応セクションに `<img>` タグで配置（max-width: 480px 推奨）

---

## Rule Engine If/Then — トークン入力から出力ルールへの変換

**保存ファイル名:** `IF-RuleEngine-IfThen.png`
**用途:** grammar/index.html の Rule Engine Bridge セクション

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent color only,
no shading no gradients,

A horizontal left-to-right transformation diagram in three zones:

LEFT ZONE — "Inputs":
Eight small square token cards stacked in two columns of four, each with a tiny icon
and a one-word label:
"Physical" (running figure), "Cognitive" (brain outline), "Social" (two people),
"Priority" (weight scale), "Form Factor" (devices), "Feasibility" (checkmark),
"Autonomy" (dial knob), "Disclosure" (eye/shield),
cards have thin black borders, no fill,

CENTER ZONE — "Rule Engine":
A compact isometric machine/processor box — slightly elevated cube shape,
green #30c969 accent fill on the top face only,
label "Rule Engine" on the front face,
thin input wires entering from the left side (bundled),
thin output wires exiting to the right (fanning out),
a small gear icon on the side face — suggesting computation,
label "IF tokens → THEN output" in small text below the box,

RIGHT ZONE — "Outputs":
Three output cards fanning out to the right, each a slightly different size:
Top card: "Exact match — Meiji Bulgarian yogurt" with small lock icon,
Middle card: "Flexible — Greek-style, any brand" with small shuffle icon,
Bottom card: "Suggest — something new" with small star icon,
The top card has green #30c969 accent line on its left edge (most precise output),

Thin labeled arrows connecting Left→Center (labeled "Tokens") and Center→Right (labeled "Rules"),
clean signal-processing composition showing context-to-rule transformation
```

---

## Dynamic Friction — 高額購入時の強制確認メカニズム

**保存ファイル名:** `IF-DynamicFriction.png`
**用途:** trust-design/index.html の Dynamic Friction セクション

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent color only,
no shading no gradients,

A single isometric horizontal track/rail system showing two scenarios side by side:

LEFT SCENARIO — "Normal purchase (Auto flows)":
A small package box glides smoothly along a flat rail from left to right,
above the rail a small dial knob labeled "Auto",
a tiny green #30c969 checkmark at the destination end,
label "¥800 yogurt — executes" below,

RIGHT SCENARIO — "High-value purchase (friction wall)":
Same rail, but a thick vertical wall/barrier rises up from the middle of the track,
the package box is stopped at the wall — a small collision indicator,
above the wall a small label "¥65,000 threshold",
on the wall face: a simple confirmation card with Yes/No buttons,
a small person figure standing at the wall pressing "Yes",
the dial knob above still shows "Auto" — unchanged,
label "¥65,000 laptop — paused for confirm" below,
green #30c969 accent on the barrier wall top edge only,

A small label between the two scenarios: "Same Auto setting → different friction",
clean friction-as-physical-barrier composition showing threshold-triggered override
```

---

## Breach & Recovery — 信頼の崩壊と段階的な再構築

**保存ファイル名:** `IF-BreachRecovery.png`
**用途:** trust-design/index.html の Breach & Recovery セクション

```
Isometric perspective, minimalist line art with slightly wobbly hand-drawn black lines,
pure white background with generous negative space, flat #30c969 green accent color only,
no shading no gradients,

A two-panel staircase composition showing contrast:

LEFT PANEL — "Trust building (months)":
An isometric staircase ascending left to right, four steps,
each step labeled from bottom to top: "Suggest" / "Confirm" / "Notify" / "Auto",
a small person figure climbing the stairs with a tiny backpack,
green #30c969 accent fill on the topmost "Auto" step,
small upward arrows beside the figure — slow steady progress,
label "Weeks → Months" below the staircase,

RIGHT PANEL — "Breach and recovery":
Same four-step staircase, but:
Step 4 "Auto" at top is cracked — shown with jagged break lines,
a small lightning bolt icon above the top step — the breach event,
a small label near the lightning: "Wrong purchase",
the person figure is now at the bottom step "Suggest" — fallen back,
the steps 2-4 are shown as faded/dashed outlines — need to be re-earned,
a tiny calendar icon with label "Re-earn" beside step 2,
no green accent in this panel — neutral/waiting state,

A thin vertical divider line between the two panels,
Below both panels: a small timeline arrow labeled "Trust is asymmetric — fast to lose, slow to earn",
clean asymmetric-trust composition showing irreversibility of breach
```
