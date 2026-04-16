# Components

## Hero Section

All page heroes use a dark background (`#08070b`) with 3 hierarchy levels:

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
- **sub-pages**: `hero-title` = page name (largest, via `--hero-title-size`), `hero-label` = tagline/badge

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
