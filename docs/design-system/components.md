# Components

## Hero Section

All page heroes use a dark background (`#0a0a0a` — Geist black, updated 2026-04-21) with 3 hierarchy levels:

```html
<section class="hero">
  <p class="hero-label">Page Name / Section</p>  <!-- or brand name -->
  <h1 class="hero-title">Descriptive Headline</h1>
  <p class="hero-sub">One or two sentence description.</p>
</section>
```

CSS defined in `assets/css/context-grammar.css`. Dark background navigation: add `data-dark-nav` to `<body>`.

### Typography hierarchy:
- **overview page**: `hero-label` = brand name (largest, 40–64px), `hero-title` = tagline (medium, 20–30px)
- **sub-pages**: `hero-title` (h1) = page name (LARGEST, via `--hero-title-size` = 32–58px), `hero-label` (p) = readable tagline (18–26px sans, weight 400, `rgba(240,236,228,0.62)`)

**Sub-page hero-label override** (add to each sub-page `<style>`):
```css
.hero-label {
  font-family: var(--font-sans);
  font-size: clamp(18px, 1.8vw, 26px);
  font-weight: 400;
  letter-spacing: -0.2px;
  text-transform: none;
  color: rgba(240, 236, 228, 0.62);
  margin-bottom: 28px;
}
```

**Sub-page HTML order** (h1 comes FIRST):
```html
<h1 class="hero-title">Context Brain</h1>
<p class="hero-label">Not a database. A butler.</p>
<p class="hero-sub">Description text.</p>
```

## Section Structure

```html
<section class="sec sec-dim">  <!-- sec-dim = alternating background -->
  <div class="sec-inner">
    <p class="sec-label label-grammar">Section Label</p>
    <h2 class="sec-title">Section Title</h2>
    <p class="sec-desc">Section description.</p>
    <!-- content -->
  </div>
</section>
```

## Illustrations in Sections

```html
<img src="images/ISO-GREEN/IF-filename.png"
     alt="[descriptive alt text]"
     class="sec-illust sec-illust--center"
     loading="lazy">
```

Classes: `.sec-illust` (max-width: `--illust-max-w`), `.sec-illust--center`, `.sec-illust--wide`, `.sec-illust--full`.

## CTA Section

```html
<section class="cta">
  <div class="cta-inner">
    <h2 class="cta-title">CTA Headline</h2>
    <div class="cta-buttons">
      <a href="..." class="cta-btn cta-btn--primary">Primary Action</a>
      <a href="..." class="cta-btn cta-btn--secondary">Secondary</a>
    </div>
  </div>
</section>
```

## Footer

```html
<footer class="footer">
  <a href="../../about/index.html">Takao Umehara</a> &middot; 2026
</footer>
```

## Avatar System (added 2026-04-21)

Centralized avatar system at `assets/css/avatars.css`. Single source of truth for all family member visuals — change here propagates everywhere.

```html
<link rel="stylesheet" href="[path]/assets/css/avatars.css">

<span class="av av--md av--mai">M</span>
<span class="av av--lg av--kiran">K</span>
<span class="av av--xl av--aoi">A</span>
```

**Sizes:** `av--xs` (20px) / `av--sm` (24px) / `av--md` (32px) / `av--lg` (40px) / `av--xl` (56px) / `av--2xl` (72px)

**Members (P1 Living Home cast):** `av--mai` (amber) / `av--kiran` (indigo) / `av--aoi` (pink-purple) / `av--leo` (emerald) / `av--sota` (coral)

To swap to photos: just add `background-image: url(...)` to the member class — initial text becomes fallback.

## Device Frames — Global Components (updated 2026-04-22)

**Canonical CSS components** for embedding UI mockups. Use these everywhere — do not recreate device frames inline.

| Component | CSS file | Vector asset | Aspect |
|---|---|---|---|
| **iPhone 15 Pro** | `assets/css/device-frame-iphone.css` | `/Global_Assets/DeviceFrame/IPhone_15_Pro_Vector.svg` | 356 × 730 (9:18.5) |
| **iPad Pro 11"** | `assets/css/device-frame-tablet.css` | (CSS-drawn, no SVG yet) | 834 × 1194 portrait / 1194 × 834 landscape |
| **Samsung Family Hub** | `assets/css/device-frame-fridge.css` | (CSS-drawn, no SVG yet) | 560 × 960 portrait (9:16, 21.5") |

Load the CSS once, use the markup pattern below.

### iPhone 15 Pro (SVG vector)

**Rule:** Always use this for iPhone mockups. The SVG provides accurate stainless-steel frame, side buttons, and Dynamic Island. Do NOT redraw the phone chrome in CSS gradients.

```html
<link rel="stylesheet" href="[path]/assets/css/device-frame-iphone.css">

<div class="iphone15pro iphone15pro--md">
  <img class="iphone15pro__chrome"
       src="[path]/Global_Assets/DeviceFrame/IPhone_15_Pro_Vector.svg"
       alt="" aria-hidden="true">
  <div class="iphone15pro__screen">
    <!-- your screen content -->
  </div>
  <div class="iphone15pro__island" aria-hidden="true"></div>
</div>
```

**Sizes:** `iphone15pro--xs` (160px) / `--sm` (200) / `--md` (260, default) / `--lg` (320) / `--xl` (380). Override via `--iphone-w`.

**Screen insets** (derived from SVG): horizontal 4.37%, vertical 1.97%, Dynamic Island at top 3.1%, width 28.9%.

### iPad Pro 11"

```html
<link rel="stylesheet" href="[path]/assets/css/device-frame-tablet.css">

<div class="ipad11 ipad11--md">
  <div class="ipad11__cam" aria-hidden="true"></div>
  <div class="ipad11__screen">
    <!-- your screen content -->
  </div>
</div>

<!-- Landscape -->
<div class="ipad11 ipad11--landscape ipad11--md"> ... </div>
```

**Sizes (portrait / landscape):** `--sm` 320/460 · `--md` 460/660 (default) · `--lg` 600/860 · `--xl` 720/1040.

### Samsung Family Hub

```html
<link rel="stylesheet" href="[path]/assets/css/device-frame-fridge.css">

<div class="samfh samfh--md">
  <div class="samfh__seam" aria-hidden="true"></div>
  <div class="samfh__handle" aria-hidden="true"></div>
  <div class="samfh__badge">SAMSUNG</div>
  <div class="samfh__cam" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="samfh__bezel">
    <div class="samfh__screen">
      <!-- your screen content -->
    </div>
  </div>
</div>
```

**Sizes:** `--sm` (280) / `--md` (400, default) / `--lg` (520) / `--xl` (640). Minimal variant (`samfh--minimal`) hides seam/handle/badge for tight slide embeds.

### Legacy standalone frames

The following files still exist for iframe-embeddable self-contained demos (they copy the frame CSS inline):

| Frame | Standalone file |
|---|---|
| iPhone | `ui-screens/iphone15pro-frame.html` |
| iPad | `ui-screens/ipad-frame.html` |
| Desktop | `ui-screens/desktop-frame.html` |
| Fridge | `ui-screens/samsung-family-hub-frame.html` |

**When to use which:**
- Building a new component inside an existing page → use the **global CSS components** above
- Building a standalone UI screen that will be iframed with `?noframe=1` → use the **legacy standalone frames** (they have the noframe mode baked in)
- Over time, migrate standalone frames to reference the global CSS.

## P1-v2 UI Patterns (added 2026-04-21)

Three new compositional patterns introduced for Project 01 — reusable across other projects.

### Translation Layer Row

Used in `ui-screens/p1-v2/s7-5-translation-layer.html`. Same fact, different depth per person.

Structure: 4-segment depth selector (`Full / Summary / Observable / Nothing`) per family member, paired with a live preview of how each person sees the result.

### Archive Card

Used in `ui-screens/p1-v2/s12-family-archive.html`. Time-locked memory collection with unlock rules visualized inline (e.g. "Aoi unlocks 2031").

### Cross-Media Graph

Used in `ui-screens/p1-v2/s8-7-cross-media.html`. SVG node-and-edge visualization showing how Brain correlates content across apps (Kindle ↔ Netflix ↔ Spotify) via a central "shared interest" hub.

## Part Banners (Input/Output dividers)

```html
<div class="part-banner part-banner--grammar">
  <div class="part-banner-inner">
    <div class="part-banner-tag">Part 1</div>
    <div class="part-banner-title">Input Grammar — Reading the Situation</div>
    <div class="part-banner-sub">8 Context Tokens + Context Brain + 2 Dials</div>
  </div>
</div>
```
