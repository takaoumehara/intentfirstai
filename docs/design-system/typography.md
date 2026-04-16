# Typography

## Font Stack

| Variable | Value | Use for |
|----------|-------|---------|
| `--font-sans` | Satoshi, Noto Sans JP, system | Body, headings, UI |
| `--font-mono` | Geist Mono | Labels, code, badges |
| `--font-jp` | Noto Sans JP | Japanese text |

**DO NOT use:** Google Sans, Google Sans Text, DM Mono, Outfit.

CDN links (required in every HTML `<head>`):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/style.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.min.css">
<link rel="stylesheet" href="[path]/assets/css/tokens.css">  <!-- loads Satoshi via @import -->
```

## Weight Map

| Element | Weight | Notes |
|---------|--------|-------|
| Hero brand label | 500 | `.hero-label` |
| Hero tagline / h1 | 500 | `.hero-title` |
| Section title | 500 | `.sec-title` |
| Body text | 400 | `p` |
| Subtle / subtitle | 300–400 | `.hero-sub`, `.sec-desc` |
| Mono labels (uppercase) | 500 | `.sec-label` |
| Strong emphasis | 600 | `strong` |

**DO NOT use weight 200 for any heading.** Minimum heading weight: 500.

## Typography Scale (CSS variables in tokens.css)

| Variable | Value | Used for |
|----------|-------|---------|
| `--hero-title-size` | `clamp(32px, 4.5vw, 58px)` | Page name / h1 on sub-pages |
| `--hero-sub-size` | `clamp(17px, 1.4vw, 22px)` | Description paragraph in hero |
| `--hero-sub-weight` | `400` | Description weight |
| `--hero-sub-color-dark` | `rgba(240,236,228,0.82)` | Description on dark bg |
| `--sec-title-size` | `clamp(30px, 3.5vw, 48px)` | Section headings |
| `--sec-title-weight` | `500` | Section heading weight |
| `--sec-desc-size` | `clamp(16px, 1.15vw, 19px)` | Section description |

## Minimum Font Sizes

| Element | Minimum |
|---------|---------|
| Card title | 17px |
| Card body | 15px |
| Mono labels (uppercase) | 12px |
| Any readable text | 12px |

## Concept Name Hierarchy

Brand terms (Context Brain, Autonomy Dial, etc.) must be visually PRIMARY:

```html
<p class="concept-name">Context Brain</p>
<p class="concept-sub">AIの記憶、3つのレイヤー</p>
```

CSS classes: `.concept-name` (22–36px, weight 500), `.concept-sub` (14–17px, weight 400, secondary color).

## No Gradient Text

DO NOT use gradient text on headings. The `.text-grad` utility exists in tokens.css but should only be used on explicit request.
