# Illustrations — ISO-GREEN System

## Style Guide

All Context Grammar illustrations follow the ISO-GREEN style:
- Isometric perspective
- Hand-drawn black lines (slightly wobbly)
- Pure white background
- Flat `#30c969` green accent only
- No shading, no gradients

## Image Location

`context-grammar/images/ISO-GREEN/` — 35+ PNG files

## Naming Conventions

| Prefix | Content |
|--------|---------|
| `IF-01` to `IF-09` | Overview diagrams |
| `IF-Token1` to `IF-Token8` | Individual token illustrations |
| `IF-Brain*` | Brain layer illustrations |
| `IF-DisposableBrain` | Disposable Brain lifecycle |
| `IF-MultiPerson` | Multi-person orchestration |
| `IF-RuleEngine-*` | Rule Engine diagrams |
| `IF_Specs_01` to `IF_Specs_05` | Specs page illustrations |
| `Trust-01` to `Trust-08` | Trust design illustrations |

## Alt Text Pattern

Describe what the illustration shows + what concept it communicates:
```
"Isometric [object] — [what's depicted] with [color/accent detail]"
Example: "Isometric 4-ring diagram — Explicit, Active, Passive, Ambient intent layers radiating outward with green innermost ring"
```

## Usage Rules

- Standard size: `max-width: var(--illust-max-w, 800px)`
- Card illustrations: `max-width: 100%`
- Tutorial thumbnails: `max-width: 360px`
- Always use `loading="lazy"` on images below the fold
- Always include descriptive alt text
