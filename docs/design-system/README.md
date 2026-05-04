# Context Grammar Design System

**Direction: Vercel Geist** (migrated 2026-04-21 from F-Dark + F3 Muted Echo).
Pure white surfaces, neutral grays, restrained semantic accents. See [Vercel Geist](https://vercel.com/geist) for reference.

## Files

| File | Contents |
|------|----------|
| [colors.md](colors.md) | Color tokens, neutral scale, semantic colors, usage rules |
| [typography.md](typography.md) | Geist Sans + Geist Mono + Noto Sans JP, type scale, weights |
| [layout.md](layout.md) | Max-widths, spacing, grid rules |
| [components.md](components.md) | Hero, section, CTA, footer, **avatars, device frames, P1-v2 patterns** |
| [illustrations.md](illustrations.md) | ISO-GREEN image system, alt text rules |
| [presentation-format.md](presentation-format.md) | **Slide deck format**, layouts, keyboard nav, copy hierarchy |

## CSS Loading Order

Every HTML page must load CSS in this order:

```html
<!-- Geist fonts via CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/style.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.min.css">

<!-- DS -->
<link rel="stylesheet" href="[path]/assets/css/tokens.css">
<link rel="stylesheet" href="[path]/assets/css/components.css">
<link rel="stylesheet" href="[path]/assets/css/avatars.css">  <!-- if showing family avatars -->

<!-- Context Grammar pages only: -->
<link rel="stylesheet" href="[path]/assets/css/context-grammar.css">
<link rel="stylesheet" href="[path]/assets/css/nav.css">

<!-- Slide deck pages only: -->
<link rel="stylesheet" href="[path]/assets/css/slide-layouts.css">
<link rel="stylesheet" href="[path]/assets/css/device-frames.css">
```

## Quick Rules

- No gradient text on headings (triggers "AI landing page" feel)
- Minimum body text: 15px. Minimum labels: 12px
- No weight 200 on headings — minimum 500
- No Tailwind blue, no Material colors
- No emojis in UI (use Lucide SVG icons)
- No warm-cream `#fdfcfa` (legacy) — use `var(--bg)` = `#ffffff`

## ❌ Absolute Prohibition · Rounded corners × coloured edge

**NEVER** combine `border-radius` with a one-sided coloured border (`border-left: 3px solid`, `border-top: 3px solid`, etc.). The coloured stroke follows the straight edge but **stops abruptly where the radius begins** — creating an ugly "J" or "bracket" shape in the corner.

```css
/* ❌ BANNED — creates a hook at every rounded corner */
.card {
  border-radius: 12px;
  border-left: 3px solid var(--accent);
}
```

**Approved alternatives for the same visual intent (category accent on a card):**

| Approved | How |
|---|---|
| **A.** Square the corners where the accent sits | `border-radius: 0; border-left: 3px solid var(--accent);` (or 0 on left corners only: `border-radius: 0 12px 12px 0`) |
| **B.** Put the colour inside the card, away from the corner | Small `::before` strip inset from edges (`left:12px; top:12px; bottom:12px; width:3px;`) — the strip never touches the rounded corner |
| **C.** Use a coloured dot / chip in the card header | `<span class="dot dot--grammar">` next to the title — communicates the same category visually |
| **D.** Tint the card background | `background: rgba(74,106,144,0.06)` instead of a border — the whole card carries the category |
| **E.** Left-aligned coloured eyebrow label | `<span class="eyebrow" style="color: var(--accent);">` above the title — the label is the accent |

**Why this rule matters:** a bracket-shaped hook in every card corner makes the page feel like an AI-generated slide deck. One clean choice (square corners, inset strip, dot, tint, or coloured eyebrow) is always better than the hook.

This rule applies to **every presentation, demo, UI screen, and website page** in the portfolio. No exceptions.
