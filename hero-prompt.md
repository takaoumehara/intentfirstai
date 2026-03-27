# Intent First — Hero Image Prompt Guide

## Core Concept: "The Origin"

すべてはインテントから始まる。人間の意志が光となり、テクノロジーを形作る。
コンピュータが人間に合わせる時代 — その起点となる「インテント」の瞬間を捉える。

---

## Visual Metaphor

A single human gesture (an open palm, an outstretched hand, or a silhouette in profile)
becomes the source of luminous energy that shapes glass-like digital structures around it.
Not "human using technology" — but "human intent BECOMING technology."

The hand doesn't touch a screen. It doesn't hold a phone.
**The intent itself radiates outward, and the machine world forms in response.**

---

## Prompt Variations

### Prompt 1: "The Emanation" (推奨 — 最もIntent Firstらしい)

```
A black silhouette of a human figure in profile, standing in a vast dark space.
From their head, luminous threads of iridescent glass-like light emanate outward,
forming 8 distinct pathways that bloom into crystalline geometric structures —
a compass, a gauge, a prism, a brain, floating blocks, interconnected nodes.
The structures are made of translucent blue and amber glass with rainbow refractions.
The light originates entirely from the human figure — the human is the source,
not the recipient. Cinematic lighting, dark background (#08080a),
photorealistic 3D render, shallow depth of field, volumetric light rays.
Isometric-influenced geometry on the glass forms. Ultra-wide 21:9 aspect ratio.
```

### Prompt 2: "The Compass of Intent" (コンパスフォーカス)

```
A massive iridescent glass compass floating in dark space, its needle made of
glowing amber light pointing forward decisively. The compass rose has 8 points,
each emanating a different crystalline structure — a brain, a battery gauge,
a group of figures, stacked blocks, a dial, a phone silhouette, a funnel,
a shield. The compass sits on an invisible surface with subtle reflections below.
Behind it, a human silhouette in pure black, hand extended, as if the compass
responds to their will. Volumetric fog, iridescent light refractions,
dark moody background, cinematic 3D render. Ultra-wide 21:9 aspect ratio.
```

### Prompt 3: "The Intent Field" (抽象的・アトモスフェリック)

```
Abstract 3D render of luminous glass-like particles and threads converging
from all directions toward a single bright point of amber light at center.
The particles are translucent blue, purple, and amber glass shards
with iridescent rainbow refractions. Some particles form recognizable shapes —
a compass needle, geometric blocks, circular gauges — before dissolving back
into pure light. The convergence point represents human intent as the origin
of all digital action. Deep dark background, volumetric lighting,
bokeh depth of field, photorealistic quality. Ultra-wide 21:9 aspect ratio.
```

### Prompt 4: "Eight Orbits" (8トークンの可視化)

```
Eight translucent glass orbs of varying sizes orbit around a central amber
light source in dark space. Each orb contains a different abstract form inside —
a compass, neural pathways, a battery indicator, connected figures,
stacked geometric blocks, a rotating dial, a device silhouette, a funnel.
The orbs are made of iridescent blue glass with purple and pink refractions.
Thin luminous threads connect each orb to the central amber core.
A black human hand silhouette reaches up from below, fingers slightly spread,
as if conducting the orbital system with intent.
Cinematic 3D render, dark background, volumetric god rays,
shallow depth of field. Ultra-wide 21:9 aspect ratio.
```

---

## Technical Notes for Generation

### Aspect Ratio
- Hero: **21:9** (ultra-wide) or **16:9** — needs to work as full-bleed hero
- Generate at highest resolution available (ideally 3840×1646 for 21:9)

### Color Palette (must match site)
- Background: Very dark, near-black (#08080a to #0a0a12)
- Primary glass: Blue (#2563eb → #4f8bff range, translucent)
- Accent: Amber/Orange (#d97706 → #f59e0b)
- Refractions: Allow purple, pink, teal as secondary rainbow effects
- Human silhouette: Pure black or very dark, grounding element

### Composition Rules
- **Left 40%**: Can be slightly emptier — this is where headline text overlays
- **Right 60%**: Visual weight concentrated here
- OR **Center-weighted** with text overlay at bottom
- Must work with white text overlaid on top

### Style Keywords (append to any prompt)
```
unreal engine 5, octane render, volumetric lighting,
iridescent glass material, caustics, chromatic aberration,
dark moody atmosphere, cinematic composition, 8K,
hyper-detailed, professional concept art, dark background
```

### Negative Prompt (things to avoid)
```
bright background, white background, cartoon style,
flat illustration, text, watermark, logo,
human face details, realistic skin,
cluttered composition, neon colors, cyberpunk aesthetic
```

---

## Integration Plan

Once the hero image is generated:
1. Save as `hero-glass.webp` (compressed) + `hero-glass-2x.webp` (retina)
2. Place in `/intentfirst/assets/img/`
3. CSS implementation:
   - `background-image` with `object-fit: cover` on `.hero` section
   - Overlay gradient from left (for text readability)
   - Keep ambient light orbs from CSS as subtle enhancement layer on top
   - `loading="eager"` with preload `<link>` for fast LCP

The transition from Glass 3D hero → Isometric framework section will use
a gradient fade from dark hero background to the light gray (#f4f4f2) of
the isometric world — bridging the two visual languages naturally.
