# Context Grammar — Slide Format Specification

共通のフルスクリーンスライド形式。context-tokens/index.html から抽出。
すべてのサブページ（Brain Explainer、Project pages等）はこの書式に従う。

---

## 1. Core Structure

```html
<div id="deck">
  <section class="slide [slide-variant]" id="sN">
    <div class="slide-inner">
      <!-- content -->
    </div>
  </section>
</div>
```

### Deck container
```css
#deck {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
```

### Slide
```css
.slide {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
```

### Slide Inner (content wrapper)
```css
.slide-inner {
  width: min(1400px, 92vw);
  max-height: 100vh;
  overflow-y: auto;
  padding: clamp(28px, 4vw, 56px);
}
```

---

## 2. Design Tokens (CSS Variables)

```css
:root {
  /* Backgrounds */
  --bg: #ffffff;
  --bg-cool: #f8f8f6;
  --bg-dark: #0a0a0c;

  /* Text */
  --text: #18181b;
  --text-2: #52525b;
  --text-3: #a1a1aa;

  /* Colors */
  --accent: #2563eb;        /* Blue — structure, tokens, data */
  --accent-light: #dbeafe;
  --accent-2: #3b82f6;
  --amber: #d97706;          /* Amber — energy, action, relationship dials */
  --amber-light: #fef3c7;
  --green: #059669;
  --green-light: #d1fae5;

  /* Borders */
  --border: #e4e4e7;

  /* Typography */
  --font: 'Google Sans', 'Google Sans Text', -apple-system, sans-serif;
  --mono: 'DM Mono', monospace;

  /* Layout */
  --max-w: min(1200px, 88vw);  /* for nav */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Typography Scale

| Element | Weight | Size | Tracking | Notes |
|---------|--------|------|----------|-------|
| Hero title | 200 | clamp(36px, 5.5vw, 76px) | -3px | `<em>` = accent color |
| Section title (.sec-title) | 200 | clamp(28px, 3.2vw, 48px) | -1.5px | `<em>` = accent color |
| Section label (.sec-label) | 500 | clamp(10px, 0.8vw, 12px) | 3px | DM Mono, uppercase, accent color |
| Body (.sec-desc) | 300 | clamp(15px, 1.15vw, 18px) | — | text-2 color, max-width 620px |
| Mono tags | 500 | clamp(9px, 0.7vw, 11px) | 1px | DM Mono, uppercase |

---

## 4. Slide Background Patterns

スライドは3つの背景を交互に使用：

| Class | Background | Use |
|-------|-----------|-----|
| (default / .bg-white) | #ffffff | Most content slides |
| .bg-cool / var(--bg-cool) | #f8f8f6 | Alternating content, subtle distinction |
| .bg-dark / var(--bg-dark) | #0a0a0c | Hero, era shifts, dramatic emphasis |

**Rhythm**: dark → white → cool → white → cool → dark → ... (厳密なルールではなく、リズムを意識する)

---

## 5. Slide Layout Types

### Type A: Hero (dark, centered)
```html
<section class="slide slide-hero" id="s1">
  <div class="hero-label">LABEL</div>
  <h1 class="hero-title"><em>Accent</em> word rest of title</h1>
  <p class="hero-sub">Subtitle text</p>
</section>
```
- Background: --bg-dark
- Text: centered, white
- Optional: hero-illust image before subtitle
- Radial gradient overlay for depth

### Type B: Content (label + title + body + component)
```html
<section class="slide [bg variant]" id="sN">
  <div class="slide-inner">
    <div class="sec-label reveal">LABEL</div>
    <h2 class="sec-title reveal d1"><em>Accent</em> rest of title</h2>
    <p class="sec-desc reveal d2">Description</p>
    <!-- component: grid, timeline, cards, table, etc. -->
  </div>
</section>
```
- Most common type
- sec-label is mono, uppercase, accent blue
- sec-title uses font-weight: 200, `<em>` for accent color

### Type C: Two-column (text + illustration)
```html
<section class="slide" id="sN">
  <div class="slide-inner" style="display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,4vw,56px); align-items:center;">
    <div><!-- text --></div>
    <div><!-- illustration --></div>
  </div>
</section>
```
- Used for token slides, brain diagram
- Reverse direction with `.reverse` class
- Responsive: collapses to 1 column at 900px

### Type D: Statement (dark, centered, minimal)
```html
<section class="slide slide-era-shift" id="sN">
  <div class="era-shift-inner">
    <div class="era-badge">BADGE</div>
    <h2 class="era-headline">Statement</h2>
    <p class="era-sub">Supporting text</p>
  </div>
</section>
```
- Background: --bg-dark
- Used for dramatic transitions between sections
- Centered, minimal content

---

## 6. Navigation System

### Top Nav
```html
<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="..." class="nav-logo"><img ... /></a>
    <div class="nav-links">
      <a href="...">Link</a>
    </div>
  </div>
</nav>
```
- Fixed, transparent on first slide
- Scrolled state: white background with blur
- Adapts text color based on dark/light slide

### Spacebar Hint
```html
<div class="spacebar-hint dark-bg" id="spacebarHint">
  <span class="spacebar-hint__key">SPACE</span>
  <span class="spacebar-hint__text">to advance</span>
</div>
```
- Bottom center, auto-hides after first use
- Adapts bg class to dark-bg / light-bg per slide

### Slide Counter
```html
<div class="slide-counter dark" id="slideCounter">1 / N</div>
```
- Bottom right, toggles dark/light class per slide

---

## 7. Keyboard Navigation (JavaScript)

```javascript
var deck = document.getElementById('deck');
var slides = deck.querySelectorAll('.slide');
var darkSlideIds = ['s1', 's5'];  // IDs of dark slides

// Spacebar / ArrowDown → next slide
// ArrowUp / PageUp → prev slide
document.addEventListener('keydown', function(e) {
  var idx = Math.round(deck.scrollTop / window.innerHeight);
  if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    slides[Math.min(idx + 1, slides.length - 1)].scrollIntoView({ behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    slides[Math.max(idx - 1, 0)].scrollIntoView({ behavior: 'smooth' });
  }
});

// Slide counter update
deck.addEventListener('scroll', function() {
  var idx = Math.round(deck.scrollTop / window.innerHeight);
  counter.textContent = (idx + 1) + ' / ' + slides.length;
  // Toggle dark/light classes
});
```

---

## 8. Animation System

### Scroll Reveal
```css
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.d1 { transition-delay: 0.08s; }
.d2 { transition-delay: 0.16s; }
.d3 { transition-delay: 0.24s; }
/* ... up to d6 */
```

```javascript
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { root: deck, threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
```

**Important**: IntersectionObserver root must be `deck` (not viewport), because `#deck` is the scroll container.

---

## 9. Common Components

### Cards (concept-card)
```css
.concept-card { background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 18px 16px; }
```

### Badge/Tag
```css
.token-sl-badge { font-family: var(--mono); font-size: clamp(9px,0.7vw,11px); padding: 4px 12px; border-radius: 100px; text-transform: uppercase; letter-spacing: 1px; }
.token-sl-badge.situation { background: var(--accent-light); color: var(--accent); }
.token-sl-badge.relationship { background: var(--amber-light); color: var(--amber); }
```

### Callout Note
```css
.oxygen-note { padding: 12px 16px; background: rgba(37,99,235,0.04); border: 1px solid rgba(37,99,235,0.12); border-radius: 12px; }
```

### Table
```css
/* Minimal table — no heavy borders */
table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 10px 14px; background: var(--bg-cool); font-weight: 500; font-size: clamp(11px, 0.75vw, 13px); }
td { padding: 10px 14px; border-bottom: 1px solid rgba(0,0,0,0.04); }
```

---

## 10. Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| > 900px | Full 2-column layouts |
| 768px-900px | Collapses grids to 1 column |
| < 768px | Mobile: nav links hidden, timeline vertical, stacked cards |

---

## 11. 16:9 Space Usage Guidelines

- `height: 100vh` で全画面。16:9 のディスプレイでは自然に16:9
- `slide-inner` の `width: min(1400px, 92vw)` でコンテンツ幅を制限
- コンテンツは垂直中央揃え（flexbox justify-content: center）
- テキストは画面の左50-60%に、ビジュアルは右40-50%に配置（2カラム）
- テキストオンリーのスライドは max-width: 680px で中央配置
- 余白を恐れない — 空白が呼吸を生む

---

## 12. File Naming

- メインページ: `index.html`
- サブページ: `brain-explainer/index.html`, `project-01/index.html`
- スタイルはすべてインラインCSS（`<style>` tag）— 外部CSSファイルなし
- JavaScriptもインライン（`<script>` tag）— 外部JSファイルなし
- フォント: Google Fonts CDN

---

*intentfirst.ai — Slide Format Spec v1.0 — April 2026*
