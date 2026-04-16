# Colors

## Light / Dark Mode Backgrounds

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#fdfcfa` | `#08070b` |
| `--bg-2` | `#f8f7f4` | `#0d0c10` |
| `--bg-inverse` | `#08070b` | `#fdfcfa` |
| `--text` | `#1a1816` | `#f0ece4` |
| `--text-2` | `#4a4540` | `#8a8580` |
| `--text-3` | `#7a7570` | `#5a5550` |

## Semantic UI Colors (Muted — use for labels and links)

| Meaning | Light | Dark | Use for |
|---------|-------|------|---------|
| Grammar/Tokens | `#4a6a90` | `#7a9bc4` | CG labels, Token links |
| Brain/Memory | `#6a4a90` | `#a080c0` | Brain labels |
| Intent/Dials | `#7a5520` | `#b8884e` | Dial labels |
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

- NO `#2563eb` (Tailwind blue-600)
- NO Material Design colors (`#1A73E8`, `#D93025`)
- NO purple/violet gradients on text or background
- NO single brand accent color
