# Colors

**Direction (2026-04-21):** Vercel Geist — pure white, neutral grays, restrained semantic accents.

## Surface Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#ffffff` | `#0a0a0a` |
| `--bg-2` | `#fafafa` | `#111111` |
| `--bg-3` | `#f4f4f5` | `#1a1a1a` |
| `--bg-card` | `#fafafa` | `#111111` |
| `--bg-inverse` | `#0a0a0a` | `#ffffff` |
| `--text` | `#0a0a0a` | `#ededed` |
| `--text-2` | `#525252` | `#a1a1aa` |
| `--text-3` | `#737373` | `#737373` |
| `--border` | `rgba(10,10,10,0.08)` | `rgba(255,255,255,0.08)` |
| `--border-hover` | `rgba(10,10,10,0.14)` | `rgba(255,255,255,0.14)` |

## Geist Neutral Scale

Use these for tints, hover states, subtle separators. Available in both modes (same values).

| Token | Hex |
|-------|-----|
| `--gray-50` | `#fafafa` |
| `--gray-100` | `#f4f4f5` |
| `--gray-200` | `#e4e4e7` |
| `--gray-300` | `#d4d4d8` |
| `--gray-400` | `#a1a1aa` |
| `--gray-500` | `#737373` |
| `--gray-600` | `#525252` |
| `--gray-700` | `#404040` |
| `--gray-800` | `#27272a` |
| `--gray-900` | `#18181b` |
| `--gray-950` | `#09090b` |

## Semantic UI Colors (Muted — labels, links)

| Meaning | Light | Dark | Use for |
|---------|-------|------|---------|
| Grammar / Tokens | `#4a6a90` | `#7a9bc4` | CG labels, Token links |
| Brain / Memory | `#6a4a90` | `#a080c0` | Brain labels |
| Intent / Dials | `#7a5520` | `#b8884e` | Dial labels |
| Success | `#3a6a3a` | `#7aaa7a` | Autonomy positive |
| Default | `#5a4a38` | `#8a8078` | General labels |

CSS variables: `--color-grammar`, `--color-brain`, `--color-intent`, `--color-success`, `--color-label`

## Illustration Colors (Full saturation — SVG and badges only)

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#3B82F6` | Situation Tokens ①–⑥ |
| Purple | `#8B5CF6` | Brain |
| Amber | `#D97706` | Intent, Dials |
| Green | `#059669` | Autonomy, success |
| Red | `#dc2626` | Error, challenge |

**DO NOT use illustration colors for UI elements.** Use muted UI variants.

## Forbidden Colors

- NO `#2563eb` (Tailwind blue-600) for UI text
- NO Material Design colors (`#1A73E8`, `#D93025`)
- NO purple/violet gradients on text or background
- NO single brand accent color
- NO warm-cream (`#fdfcfa`) — migrated to pure white 2026-04-21

## Migration note (2026-04-21)

The site migrated from F-Dark + F3 Muted Echo (warm cream `#fdfcfa` + Satoshi) to Vercel Geist (pure white `#ffffff` + Geist Sans). If a page looks slightly off after migration:
- Check for hardcoded `#fdfcfa` (replace with `var(--bg)`)
- Check for `font-family: 'Satoshi'` (use `var(--font-sans)`)
- Check for warm text colors `#1a1816` or `#4a4540` (use `var(--text)` / `var(--text-2)`)
