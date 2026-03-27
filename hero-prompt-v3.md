# Intent First — Hero Image Prompt v3: Gem Style

## Style Reference: intentFirst Gem Instruction

- Background: Light soft blue-gray to near-white gradient
- Lighting: Soft overhead studio, fully diffused, white light
- Material: Thick sculptural iridescent glass, holographic surface, subsurface scattering
- Colors: Cool (blue, cyan, violet, lavender) + Warm (rose pink, amber, gold)
- Composition: 1-3 objects, floating above smooth reflective surface, no clutter
- Quality: Photorealistic 3D CGI, high-end studio product photography

---

## Core Concept: "Intent First"

人間のインテントがすべてを動かす。
インテントは選択ではなく「場」— 存在するだけで周囲の構造が変わる力。
混沌としたデータが、インテントという核を通ることで、秩序ある形に結晶化する。

---

## Prompt 1: "Crystallization" (結晶化) — 推奨

```
A single sculptural glass object floating above a smooth reflective surface.
The left side of the object is amorphous — soft, cloudy, fluid iridescent glass
with no defined shape, like molten material mid-flow.
Moving toward the right, the form gradually solidifies into sharp,
precise geometric crystal facets with clean angular planes.
The amorphous side shifts in cool blue-violet-lavender iridescence.
The crystallized side glows with warm rose-pink and amber-gold refractions.
The transition zone between chaos and order shimmers with rainbow holographic light.
One single object showing the transformation from undefined to structured.
This represents the moment raw context becomes structured intent.
```

## Prompt 2: "The Seed" (種子 — 展開)

```
A small, dense geometric crystal core — warm amber and rose gold iridescent glass —
sits at the center. From it, translucent glass panels and geometric petals
are unfolding outward in all directions, like a flower blooming in slow motion.
Each unfolding layer is made of thick iridescent glass shifting between
blue, cyan, violet, and lavender. The innermost petals are simple triangles.
The outer layers evolve into more intricate lattice structures.
Some panels are still mid-rotation, frozen in the act of opening.
Light refracts through each translucent layer creating rainbow caustics
on the smooth surface below. 1 object total, centered composition.
This represents intent as a seed that naturally unfolds into full structure.
```

## Prompt 3: "Convergence" (収束)

```
Two distinct glass forms floating side by side above a smooth reflective surface.
On the left: a cluster of scattered, irregular glass shards and fragments —
cool blue and violet iridescent pieces, beautiful but chaotic, no order.
On the right: a single perfect geometric polyhedron — warm rose-amber
iridescent glass with clean facets, precise angles, crystalline and whole.
Between the two forms, a few glass fragments are caught mid-flight,
transitioning from chaos to structure — some still irregular,
some already developing flat geometric faces as they drift rightward.
The polyhedron pulls the fragments toward itself like a quiet magnet.
2 objects (cluster + polyhedron) with transitional fragments between.
```

## Prompt 4: "Eight Facets" (8つの面)

```
A single large octagonal prism made of thick iridescent glass,
floating above a smooth reflective surface. Each of its 8 faces
catches light differently — one face shifts blue, another violet,
another cyan, another lavender, another rose pink, another warm amber,
another soft gold, another rainbow holographic. The prism rotates
slightly so that 5-6 faces are visible. Inside the glass,
subsurface scattering creates depth — you can see refracted light
passing through the interior. Strong caustic light patterns
on the surface below. 1 object, centered, monumental in scale.
This octagonal form represents the 8 Context Tokens unified into one structure.
```

## Prompt 5: "Phase Transition" (相転移 — ミニマル)

```
A single flowing stream of thick iridescent glass, captured mid-motion.
It enters the frame from the upper left as a smooth, fluid, organic form —
cool blue and violet holographic surface, no defined edges.
As it curves through the center of the frame, it gradually transforms:
the surface develops geometric facets, the edges sharpen,
the color shifts from cool blue-violet to warm rose-amber-gold.
By the lower right, it has become a rigid crystalline structure
with perfect flat faces and precise angles.
One continuous object showing liquid-to-crystal transformation.
Strong iridescent rainbow refractions throughout.
Caustic light patterns on the reflective surface below.
```

---

## For the Hero Section Integration

Since the Gem style uses LIGHT backgrounds (blue-gray to near-white),
the hero section design needs to change:

### Option A: Light Hero → Light Framework (全体ライト)
- Hero: Light background with glass image as full-bleed or centered
- Headline text: Dark text (#08080a) over the image or beside it
- Framework section: Same light gray (#f4f4f2)
- Consistent, clean, Apple-like

### Option B: Light Hero Image on Dark Hero Section
- Hero section background: Dark (#08080a)
- Glass image: Placed as a floating element with its own light bg
- Creates contrast — image becomes a "window" into light
- More dramatic but harder to execute seamlessly

### Option C: Split Layout
- Left: Dark side with headline text in white
- Right: Glass hero image with its light background
- 50/50 or 40/60 split
- Modern editorial feel

### Recommendation: Option A (全体ライト)
The Gem style IS the brand's glass visual language.
Fighting against its light background creates friction.
Embrace it — let the site be light and premium, like Apple.com.
The dark section can come later (The Shift, CTA) for contrast.

---

## Production Notes

### Dimensions
- Generate at 1456 × 1048 px (Gem standard)
- For hero use: crop/extend to 16:9 or 21:9 with matching bg gradient
- Or use as centered focal point with CSS gradient extension

### Post-Generation
1. Save as `hero-glass.webp` (compressed, max 200KB)
2. Place in `/intentfirst/assets/img/`
3. CSS: `background: linear-gradient(to bottom, #eef0f4, #f4f4f2)`
   to seamlessly extend the image's light background into the page
