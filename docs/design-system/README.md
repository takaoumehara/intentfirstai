# Context Grammar Design System

F-Dark + F3 Muted Echo direction (adopted 2026-04-09).

## Files

| File | Contents |
|------|----------|
| [colors.md](colors.md) | Color variables, semantic colors, usage rules |
| [typography.md](typography.md) | Type scale, font weights, font stacks |
| [layout.md](layout.md) | Max-widths, spacing, grid rules |
| [components.md](components.md) | Hero, section, card, CTA, footer patterns |
| [illustrations.md](illustrations.md) | ISO-GREEN image system, alt text rules |

## CSS Loading Order

Every HTML page must load CSS in this order:

```html
<link rel="stylesheet" href="[path]/assets/css/tokens.css">
<link rel="stylesheet" href="[path]/assets/css/components.css">
<!-- context-grammar pages only: -->
<link rel="stylesheet" href="[path]/assets/css/context-grammar.css">
<link rel="stylesheet" href="[path]/assets/css/nav.css">
```

## Quick Rules

- No gradient text on headings (triggers "AI landing page" feel)
- No rounded corners + colored border — use `border-radius: 0` with color borders
- Minimum body text: 15px. Minimum labels: 12px
- No weight 200 on headings — minimum 500
- No Tailwind blue, no Material colors
