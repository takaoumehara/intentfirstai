# P1-v2 UI Screen Build Spec

**Design system**: Vercel Geist light mode. Minimalist. No emojis anywhere.

## Family (San Francisco, bilingual JP/EN household)

| Role | Name | Age | Heritage | Notes |
|---|---|---|---|---|
| Mother | Mai Yamashiro | 36 | Japanese (Okinawa) | Primary operator, JP native |
| Father | Kiran | 38 | Norwegian × Indian | Tech, remote, timezone mixed |
| Daughter | Aoi | 15 | Mixed | Pronoun transition scene (→ they/them) |
| Son 1 | Leo | 9 | Mixed | Math test, bento user |
| Son 2 | Sota (相多) | 6 | Mixed | Soccer practice |

**Avatars**: Use **gradient-initial circles**, NOT photos. Each family member has a distinct gradient:
- Mai: `linear-gradient(135deg, #fbbf24, #f59e0b)` (warm amber)
- Kiran: `linear-gradient(135deg, #6366f1, #4338ca)` (indigo)
- Aoi: `linear-gradient(135deg, #ec4899, #a855f7)` (pink→purple, will shift after S10)
- Leo: `linear-gradient(135deg, #10b981, #059669)` (emerald)
- Sota: `linear-gradient(135deg, #f87171, #dc2626)` (coral red)

Initials rendered in white, weight 600, Geist Sans.

## Design Tokens

Import `_tokens.css` in every screen:
```html
<link rel="stylesheet" href="../_tokens.css">
```

**Critical rules**:
- NO emojis (use Lucide SVG icons or Material Symbols Outlined)
- Font: Geist Sans (body) + Geist Mono (labels/numbers)
- Border: 1px `var(--border)` hairlines
- Radius: 6–12px, conservative
- Shadow: subtle or none
- Colors: neutral grays + ONE functional accent per screen
- Spacing: 8pt grid

## Icons

Lucide icons via CDN or inline SVG:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">...</svg>
```

Common shapes: `bell`, `calendar`, `users`, `home`, `heart-pulse`, `shield`, `zap`, `phone`, `check`, `x`, `chevron-right`, `arrow-right`, `utensils`, `book-open`, `wallet`, `graduation-cap`, `plane`.

## Device Frames

Reference existing frames via iframe or copy CSS:

| Screen | Frame |
|---|---|
| Phone UIs | `../iphone15pro-frame.html` (390×844) |
| Tablet UIs | `../ipad-frame.html` (834×1194 or landscape) |
| Desktop UIs | `../desktop-frame.html` (1440×900) |
| Fridge UI | `../samsung-family-hub-frame.html` (portrait) |

**Each P1-v2 file should be self-contained** — copy the frame structure inline, don't iframe. That way the storyboard HTML can iframe them directly.

## Image Assets (Unsplash)

Only bento box photos need real imagery. Use these Unsplash photo IDs:

```
Bento #1 — Traditional (onigiri + tamagoyaki):
https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&q=80

Bento #2 — Colorful (veggies + protein):
https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80

Bento #3 — Simple (sandwich style):
https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80
```

If these IDs don't work or look bad, use `https://source.unsplash.com/600x600/?bento,japanese` as fallback (loads random bento).

For yogurt and other products: CSS-styled fake products (no images).

## File Naming Convention

```
p1-v2/
  _tokens.css
  _spec.md
  _assets.md
  s3-identity-card.html
  s4-learning-map.html
  s5-token-dashboard.html
  s7-disclosure-matrix.html
  s8a-fridge-bento.html
  s8b-phone-notification.html
  s8-5-yogurt-shopping.html
  s8-6-dynamic-friction.html
  s9a-normal-home.html
  s9a-emergency.html
  s9b-approvals.html
  s11-autonomy-timeline.html
  index.html          (preview grid of all 12)
```

## Quality Checklist (per screen)

- [ ] NO emojis anywhere
- [ ] Uses `_tokens.css` variables (no hardcoded colors except semantic)
- [ ] Family names match spec
- [ ] Mobile screens fit iPhone 15 Pro 390×844 viewport
- [ ] Tablet screens fit iPad 834×1194 or 1194×834
- [ ] Self-contained HTML (no external deps except Lucide CDN + _tokens.css)
- [ ] Supports `?noframe=1` for iframe embedding
- [ ] Real, specific content (not "Lorem ipsum")
- [ ] Typography hierarchy: title > subtitle > body clearly differentiated
- [ ] Accessibility: contrast ≥ 4.5:1 on text
