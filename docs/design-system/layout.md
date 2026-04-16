# Layout

## Max Widths

| Variable | Value | Used for |
|----------|-------|---------|
| `--max-w` | `min(1100px, 90vw)` | Standard content |
| `--max-w-wide` | `min(1400px, 94vw)` | Wide presentations |

All content sections must use `max-width: var(--max-w); margin: 0 auto;` on the inner wrapper.

## Section Padding

Standard section: `padding: clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)`

## Illustration Widths (from `tokens.css`)

| Variable | Value | Used for |
|----------|-------|---------|
| `--illust-max-w` | `800px` | Standard section illustration |
| `--illust-max-w-card` | `100%` | Illustration inside a card |
| `--illust-max-w-inline` | `360px` | Tutorial / inline thumbnail |

## Part Dividers

Full-width colored banners separating Part 1 (Input Grammar) and Part 2 (Output Grammar):

- Part 1 (Grammar/Tokens): `background: var(--color-grammar)`, white text
- Part 2 (Output/Intent): `background: var(--color-intent)`, white text
- Trust: `background: var(--color-brain)`, white text

Use class `.part-banner` with modifier `.part-banner--grammar`, `.part-banner--output`, `.part-banner--trust`.

## No Rounded Corners + Color Borders

DO NOT combine `border-radius` with `border-left: Npx solid [color]`.
Use `border-radius: 0` when applying a color border.
