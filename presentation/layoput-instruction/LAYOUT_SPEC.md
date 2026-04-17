# Slide Layout Specification

Illustrator原稿から抽出したグリッド・タイポグラフィ・マージン仕様。
全スライドHTML実装時の唯一の参照元。

---

## Global Spacing (全レイアウト共通)

```
┌─────────────────────────────────────────────────┐
│←5%→│                                     │←5%→│  ← 左右パディング
│     │                                     │     │
│     │  7.5% ↓ (上端→セクションラベル上端)  │     │
│     │  SECTION LABEL (mono, uppercase)     │     │
│     │  6.75% ↓ (ラベル左端→タイトル左端)   │     │
│     │  タイトル                             │     │
│     │                                     │     │
│     │                                     │     │
│     │                                     │     │
│     │  5% ↑ (下端→コンテンツ下端)         │     │  ← 下マージン
└─────────────────────────────────────────────────┘
```

| Property            | Value | CSS Variable        |
|---------------------|-------|---------------------|
| Top margin          | clamp(28px, 4vh, 56px) | `--slide-pad-top`   |
| Left padding        | 5%    | `--slide-pad-x`     |
| Right padding       | 5%    | `--slide-pad-x`     |
| Bottom margin       | clamp(20px, 3vh, 40px) | `--slide-pad-bottom` |
| Label → Title gap   | 6.75% (horizontal offset from label start to title start) | — |
| Text ↔ Image gap    | 2.5%  | `--text-image-gap`  |
| Image area width    | 50%   | `--image-width`     |
| Card-to-card gap    | 1.25% | `--card-gap`        |

### Typography Hierarchy

| Element        | Font           | Weight | Size (desktop)                |
|----------------|----------------|--------|-------------------------------|
| Section label  | --font-mono    | 500    | 11-12px, letter-spacing 0.12em, uppercase |
| Title          | --font-sans    | 500    | clamp(28px, 4vw, 52px)        |
| Subtitle/Body  | --font-jp      | 400    | clamp(15px, 1.6vw, 22px)      |
| Footnote       | --font-jp      | 400    | 13px                          |
| Chip/Badge     | --font-mono    | 500    | 12px                          |
| Context meta   | --font-mono    | 500    | 12px                          |

---

## Layout 0 — Dual Device (TV + Phone)

**Source:** `layoput 0.png`
**Usage:** Cast/handoff, multi-device scenes
**CSS class:** `.layout-dual-device`

```
┌──────────────────────────────────────────────────────────┐
│  5%  │ KEY SCENE (label)                           │  5% │
│      │ キャストした瞬間、すべてが変わる。(title)     │     │
│      │                                              │     │
│      │ ┌────────────────────────┐  ┌──────┐         │     │
│      │ │                        │  │      │         │     │
│      │ │    TV Screen            │  │Phone │         │     │
│      │ │    (flex: 1)            │  │180px │         │     │
│      │ │    aspect: 16/9         │  │ 9/19 │         │     │
│      │ │                        │  │      │         │     │
│      │ └────────────────────────┘  └──────┘         │     │
│      │         gap: 2.5%                            │     │
│  5%  │ [chip] [chip]                           5%   │  5% │
└──────────────────────────────────────────────────────────┘
```

**Grid:**
- Heading area: full width (left-aligned)
- Device area: flex row, gap 2.5%
- TV: `flex: 1`, aspect-ratio 16/9, border-radius 12px
- Phone: fixed width 180px, aspect-ratio 9/19.5, border-radius 24px
- Context tags (chips): bottom, auto margin-top

---

## Layout 1 — Phone in Hand (Contextual)

**Source:** `layoput 1.png`
**Usage:** Situational context shifts, form factor changes
**CSS class:** `.layout-phone-context`

```
┌──────────────────────────────────────────────────────────┐
│  5%  │ SPACE > 電車の中 (label)                    │  5% │
│      │                                              │     │
│      │ ┌─────────── 45% ──────────┐ ┌── 50% ─────┐ │     │
│      │ │ 片手になった。            │ │             │ │     │
│      │ │ UIが変形した。(title)     │ │  Phone      │ │     │
│      │ │                          │ │  in hand    │ │     │
│      │ │ Body text...             │ │  (image)    │ │     │
│      │ │                          │ │  max-h:70vh │ │     │
│      │ │ CONTEXT │ 片手 / 揺れ    │ │             │ │     │
│      │ │ Physical│ → 片手         │ │             │ │     │
│      │ │ Form    │ → phone only   │ │             │ │     │
│      │ └──────────────────────────┘ └─────────────┘ │     │
│      │        gap: 2.5%                             │     │
│  5%  │ [chip: Physical] [chip: Form]           5%   │  5% │
└──────────────────────────────────────────────────────────┘
```

**Grid:**
- Content: flex row, gap 2.5%
- Text column: `flex: 1`, contains label → title → body → context meta (dl)
- Phone column: `width: 50%`, image centered, `max-height: 70vh`, `object-fit: contain`
- Context meta: mono, 12px, key-value pairs below body text
- Context tags: bottom of slide

---

## Layout 2 — Concept Diagram (Icon Steps)

**Source:** `layoput 2.png`
**Usage:** Lifecycle flows, process explanations, abstract concepts
**CSS class:** `.layout-concept`

```
┌──────────────────────────────────────────────────────────┐
│  5%  │                                              │  5% │
│      │  7.5% ↓                                      │     │
│      │  DISPOSABLE BRAIN (label)                     │     │
│      │  6.75% →                                      │     │
│      │  Temporary brains for                         │     │
│      │  temporary projects. (title, max-w: 55%)      │     │
│      │                                              │     │
│      │  Home Brain spawns a Disposable Brain...      │     │
│      │  (subtitle, below title)                      │     │
│      │                                              │     │
│      │  ← margin-top: auto (pushes steps to bottom) │     │
│      │                                              │     │
│      │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │     │
│      │  │🐣      │ │🎨      │ │🔄      │ │💨      │ │     │
│      │  │ BIRTH  │ │ LEARN  │ │ RETURN │ │DISSOLVE│ │     │
│      │  │ desc   │ │ desc   │ │ desc   │ │ desc   │ │     │
│      │  └────────┘ └────────┘ └────────┘ └────────┘ │     │
│      │     gap: 16px between cards                   │     │
│      │     card gap internal: 4.5% (between cards)   │     │
│      │                                              │     │
│      │  footnote (center, 13px, muted)              │     │
│  5%  │                                         5%   │  5% │
└──────────────────────────────────────────────────────────┘
```

**Grid:**
- Flex column, full height
- Title area: `max-width: 55%` (left-aligned)
- Steps: `grid: repeat(4, 1fr)`, gap 16px, pushed to bottom via `margin-top: auto`
- Each step card: center-aligned, border 1px, border-radius 16px, padding 24px 16px
- Step icon: 32px emoji, step label: font-display 700 16px, step desc: font-jp 13px
- Footnote: centered text below steps, 13px, muted color

---

## Layout 3 — Text + Single Image (50/50)

**Source:** `layoput 3.png`
**Usage:** Problem statements, feature explanations with one visual
**CSS class:** `.layout-text-image`

```
┌──────────────────────────────────────────────────────────┐
│  5%  │                                              │  5% │
│      │  7.5% ↓                                      │     │
│      │  DISPOSABLE BRAIN (label)                     │     │
│      │  6.75% →                                      │     │
│      │                                              │     │
│      │  ┌──── ~42.5% ────┐ 2.5% ┌───── 50% ──────┐ │     │
│      │  │ 家族の情報共有の │  ↔   │                 │ │     │
│      │  │ フリクション     │      │                 │ │     │
│      │  │ (title)         │      │   Image         │ │     │
│      │  │                 │      │   (placeholder) │ │     │
│      │  │ Body text...    │      │   border-radius │ │     │
│      │  │ 「今夜何食べる? │      │   16px          │ │     │
│      │  │ 」——毎晩...     │      │   object-fit:   │ │     │
│      │  │                 │      │   cover         │ │     │
│      │  │                 │      │   height: 100%  │ │     │
│      │  │                 │      │                 │ │     │
│      │  │                 │      │                 │ │     │
│      │  └─────────────────┘      └─────────────────┘ │     │
│  5%  │                                         5%   │  5% │
└──────────────────────────────────────────────────────────┘
```

**Grid:**
- Flex row, gap 2.5%, full height
- Text column: `flex: 1` (~42.5% = 100% - 50% image - 5% left - 2.5% gap)
- Image column: `width: 50%`, `flex-shrink: 0`
- Image: `width: 100%`, `height: 100%`, `object-fit: cover`, `border-radius: 16px`
- Text content aligns to top (flex-start)

---

## Layout 4 — Text + Image Grid (Multi-image)

**Source:** `layoput 4.png`
**Usage:** Evidence walls, multi-screen demos, pattern collections
**CSS class:** `.layout-text-grid`

```
┌──────────────────────────────────────────────────────────┐
│  5%  │                                              │  5% │
│      │  7.5% ↓                                      │     │
│      │  DISPOSABLE BRAIN (label)                     │     │
│      │  6.75% →                                      │     │
│      │                                              │     │
│      │  ┌─ ~30% ─┐  2.5%  ┌──────── ~62.5% ───────┐ │     │
│      │  │ 家族の  │   ↔    │ ┌────┐ ┌────┐ ┌────┐  │ │     │
│      │  │ 情報共有│        │ │ 1  │ │ 2  │ │ 3  │  │ │     │
│      │  │ の      │        │ └────┘ └────┘ └────┘  │ │     │
│      │  │ フリク  │        │ ┌────┐ ┌────┐ ┌────┐  │ │     │
│      │  │ ション  │        │ │ 4  │ │ 5  │ │ 6  │  │ │     │
│      │  │ (title) │        │ └────┘ └────┘ └────┘  │ │     │
│      │  │         │        │ ┌────┐ ┌────┐ ┌────┐  │ │     │
│      │  │ Body... │        │ │ 7  │ │ 8  │ │ 9  │  │ │     │
│      │  │         │        │ └────┘ └────┘ └────┘  │ │     │
│      │  └─────────┘        └───────────────────────┘ │     │
│      │                      grid gap: 1.25%          │     │
│  5%  │                                         5%   │  5% │
└──────────────────────────────────────────────────────────┘
```

**Grid:**
- Flex row, gap 2.5%, full height
- Text column: `width: 30%`, `flex-shrink: 0`
- Grid column: `flex: 1`, `grid: repeat(3, 1fr) / repeat(3, 1fr)`, gap 1.25%
- Each cell: `border-radius: 12px`, `object-fit: cover`, fills cell completely

---

## Layout 6 — Full Bleed Hero (Photo Overlay)

**Source:** `layoput 6.png`
**Usage:** Inciting moments, emotional scene-setting, story beats
**CSS class:** `.slide--hero`

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ████████████████████████████████████████████████████████ │
│  ██ Background photo (100% × 100vh, cover)            ██ │
│  ██                                                    ██ │
│  ██  Gradient overlay:                                 ██ │
│  ██  left-to-right                                     ██ │
│  ██  rgba(8,8,10,0.85) → 0.6 → 0.1 → transparent     ██ │
│  ██                                                    ██ │
│  ██  ┌─────────── ~55% max-width ───────────┐          ██ │
│  ██  │ THE INCITING MOMENT (label, coral)   │          ██ │
│  ██  │                                       │          ██ │
│  ██  │ 「息子の冬用シューズを探して。        │          ██ │
│  ██  │ 黒で防水。中は絶対にフワフワ          │          ██ │
│  ██  │ していないやつ...」(title, white)     │          ██ │
│  ██  │                                       │          ██ │
│  ██  │ 847件の検索結果から... (subtitle)     │          ██ │
│  ██  │                                       │          ██ │
│  ██  │ [chip] [chip] [chip] (tags)          │          ██ │
│  ██  └───────────────────────────────────────┘          ██ │
│  ██                                                    ██ │
│  ████████████████████████████████████████████████████████ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Specifics:**
- Slide: `padding: 0` (hero overrides global padding)
- `::before` overlay: `linear-gradient(90deg, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0.6) 40%, rgba(8,8,10,0.1) 70%, transparent 100%)`
- `.slide-inner`: `padding: 7.5% 5% 5%`, flex column, `justify-content: flex-end`
- Title: `color: #fff`, `max-width: 55%`, `text-shadow`
- Subtitle: `color: rgba(255,255,255,0.7)`, `max-width: 55%`
- Label: coral/intent color, mono 500
- Tags: bottom, with `backdrop-filter: blur(8px)`

---

## Layout 7 — Composite (Text+Image / Photo 50/50)

**Source:** `Artboard 3 copy.png`
**Usage:** Bridging narrative + visual, before/after comparisons
**CSS class:** `.layout-composite`

```
┌──────────────────────────────────────────────────────────┐
│  5%  │                                              │  5% │
│      │  7.5% ↓                                      │     │
│      │                                              │     │
│      │  ┌──────── 50% ─────────┐ ┌──── 50% ───────┐ │     │
│      │  │ DISPOSABLE BRAIN     │ │                  │ │     │
│      │  │ (label)              │ │                  │ │     │
│      │  │                      │ │                  │ │     │
│      │  │ 家族の情報共有の      │ │   Full photo    │ │     │
│      │  │ フリクション (title)  │ │   (cover)       │ │     │
│      │  │                      │ │   border-radius  │ │     │
│      │  │ Body text...         │ │   16px           │ │     │
│      │  │                      │ │                  │ │     │
│      │  │ ┌────────────────┐   │ │                  │ │     │
│      │  │ │ Small image    │   │ │                  │ │     │
│      │  │ │ (placeholder)  │   │ │                  │ │     │
│      │  │ │ flex: 1        │   │ │                  │ │     │
│      │  │ │ margin-top:16px│   │ │                  │ │     │
│      │  │ └────────────────┘   │ │                  │ │     │
│      │  └──────────────────────┘ └──────────────────┘ │     │
│      │       gap: 1.25%                               │     │
│  5%  │                                           5%  │  5% │
└──────────────────────────────────────────────────────────┘
```

**Grid:**
- Flex row, gap 1.25%, full height
- Left half: `width: 50%`, flex column
  - Text area: `flex-shrink: 0` (label + title + body)
  - Small image: `flex: 1`, `margin-top: 16px`, `border-radius: 16px`, `object-fit: cover`
- Right half: `width: 50%`
  - Full photo: `width: 100%`, `height: 100%`, `object-fit: cover`, `border-radius: 16px`

---

## Mobile Breakpoints

### 768px (tablet / phone landscape)

| Layout | Change |
|--------|--------|
| All split layouts | `flex-direction: column`, both columns → `width: 100%` |
| Layout 3, 7 images | `max-height: 40vh` |
| Layout 2 steps | `grid: repeat(2, 1fr)` |
| Layout 4 grid | keeps 3-col but `max-height: 40vh` |
| Layout 6 hero gradient | switches to bottom-up gradient |
| Layout 6 title | `max-width: 100%` |

### 480px (phone portrait)

| Layout | Change |
|--------|--------|
| Spacing | `padding: 20px 16px 24px` |
| Title | `clamp(22px, 6.5vw, 30px)` |
| Layout 2, Dial stages | `grid: 1fr 1fr` |
| Token overview | `grid: 1fr` (single column) |

---

## Quick Reference: Which Layout to Use

| Content type | Layout | Class |
|---|---|---|
| Title/cover slide | Hero (center text) | `.slide--hero.slide--v-center` |
| Problem + photo evidence | Text + Image (50/50) | `.layout-text-image` |
| Multi-screen/grid evidence | Text + Grid | `.layout-text-grid` |
| Process/lifecycle flow | Concept (icon steps) | `.layout-concept` |
| Device interaction scene | Dual Device | `.layout-dual-device` |
| Contextual phone usage | Phone in Hand | `.layout-phone-context` |
| Narrative + visual bridge | Composite (50/50) | `.layout-composite` |
| Emotional/story beat | Full Bleed Hero | `.slide--hero` |
| Token card detail | Token Card | `.token-card` / `.token-card--reverse` |
| Dark statement/quote | Dark centered | `.slide--dark.slide--v-center` |
