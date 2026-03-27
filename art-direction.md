# intentfirst.ai — Art Direction Guide (v2 — corrected)

## The Two Visual Languages

### Style A: Isometric Editorial (The Framework Identity)
- Flat illustration, isometric perspective
- 3-color system: blue (#2563eb), orange/amber (#d97706), black silhouettes
- Light gray backgrounds (#ededeb), clean geometric lines
- **Feel**: Systematic, precise, teachable, authoritative
- **Used for**: Token illustrations, token icons, framework diagrams, case study visuals
- **This is the core visual identity of Context Grammar**

### Style B: 3D Glass / Crystal
- Iridescent glass, crystal, organic abstract forms
- Blue → purple → pink → amber gradient palette
- Soft light backgrounds, photorealistic 3D rendering
- **Feel**: Emotional, premium, atmospheric, aspirational
- **Used for**: Substack article covers, LinkedIn post images

---

## What This Means for the Site

The isometric style IS the brand. It's what people associate with Context Grammar's thinking — precise, structured, diagrammatic. The glass 3D is beautiful but it's the "wrapping paper" for articles, not the core identity.

### Updated Mapping:

| Section | Style | Rationale |
|---------|-------|-----------|
| **Hero** | Option A: Pure typography (no illustration) — let the words hit. Option B: Isometric hero composition. Option C: Glass 3D as atmospheric background (mood, not identity) | See Hero section below |
| **Framework Preview** | Isometric icons | These ARE the tokens. Use TokenIcon_* files. |
| **Framework Deep Dive** | Isometric full illustrations | Token_* files. The complete visual system. |
| **The Shift** | Text-only or minimal CSS diagram | Content-driven, no illustration needed |
| **Case Studies / Applied** | Isometric illustrations | Consistent with framework identity |
| **Journal** | Glass 3D covers (from Substack RSS) | These are the article covers — naturally glass 3D |
| **Enterprise** | Mix — isometric for diagrams, glass 3D for atmosphere | Premium feel for C-suite, but grounded in framework visuals |

---

## The Hero Question

The hero sets the first impression. Three viable directions:

### Option A: Typography-Only Hero (Recommended for launch)
Pure text on dark background. No image. Let the headline do the work.
- Pros: Bold, confident, fast-loading, no asset dependency
- Cons: Less visually engaging on first scroll
- Reference: Linear.app, Vercel.com

### Option B: Isometric Hero Composition
Commission or create a large isometric illustration specifically for the hero — showing all 8 tokens as a unified system (like a map or constellation).
- Pros: Immediately establishes the visual language, distinctive
- Cons: Needs a new illustration (current token illustrations are individual, not composed)
- Could use existing illustrations arranged in a CSS composition

### Option C: Glass 3D as Atmospheric Background
Keep a glass 3D render as a mood-setter in the hero, but clearly separate from the framework content below.
- Pros: Visually dramatic, bridges to Substack content
- Cons: Creates a style expectation that the rest of the site doesn't follow (isometric comes next — jarring?)

### Option D: Video/Animation Hero
Short loop of either: abstract particles, glass token cluster rotation, or isometric elements assembling.
- Pros: Most engaging, most premium
- Cons: Production cost, load time

**Current recommendation**: Option A (typography-only) or Option B (isometric composition) for launch. The isometric style is the brand — lead with it or lead with words, but don't lead with the article cover style.

---

## Can the Two Styles Coexist on the Same Page?

**Yes, with strict zoning.**

The Journal section will naturally show glass 3D images (pulled from Substack RSS). Everything else is isometric or text. The transition works if:

1. **Different background zones**: Isometric sections on white/cool-gray. Journal section clearly separated.
2. **Glass 3D images are always small/contained** (card thumbnails), never full-bleed on the homepage.
3. **No mixing within a single card or component**.

The two styles share enough color DNA (blue primary, warm accents) that they don't clash — they just feel like different "modes" of the same brand.

---

## Unifying Elements

Regardless of illustration style, these elements create consistency:

1. **Typography**: Google Sans (body) + DM Mono (labels) — always the same
2. **Accent blue**: #2563eb — present in both styles
3. **Background rhythm**: --bg-dark → --bg → --bg-cool → --bg → repeat
4. **Spacing**: Same clamp() responsive padding everywhere
5. **Card treatment**: Same border-radius (16-20px), same border color, same hover behavior

---

## Token Illustration Inventory (Isometric)

### Full Illustrations (Token_*)
| File | Token | Description |
|------|-------|-------------|
| Token_01_Intent.png | Intent | Hand holding phone with compass, surrounded by app category icons |
| Token_02_PhysicalState.png | Physical State | Three people in different contexts (sitting, standing, driving) with phones adapting |
| Token_03_ CognitiveLoad.png | Cognitive Load | Brain with gauge/meter, busy phone vs. minimal phone |
| Token_04_SocialExposure.png | Social Exposure | Four contexts (private room, office, crowd, presentation) with phone adapting |
| Token_05_PriorityWeights.png | Priority Weight | Jenga-like blocks being rearranged (security, wallet, clock, people, location) |
| Token_06_SynchroRate.png | Synchro Rate | Dial with Suggest/Confirm/Notify/Auto positions |
| Token_07_FormFactor.png | Form Factor | TV/phone/VR triptych showing same content adapting |
| Token_08_Feasibility.png | Feasibility | Funnel filtering items through context layers |

### Icon Versions (TokenIcon_*)
Simplified versions of the above — single object, no human figures.
- TokenIcon_01: Compass
- Tokenicon_02: Physical state figure
- Tokenicon_03: Brain with meter
- TokenIcon_04: Eye/phone
- TokenIcon_05: Stacked blocks
- Tokenicon_06: Dial
- Tokenicon_07: Multi-device
- Tokenicon_08: Funnel

### Substack Article Covers (Glass 3D)
These are hosted on Substack and will be pulled via RSS. They include:
- Glass torus knot (abstract)
- Crystal landscape on glass plate
- Glass bridge/connection shape
- Three geometric gems (clear, rose, dark)
- Three glass objects with light orbit
- Glass neural network with amber node
- Glass hand holding pearl
- Various iridescent abstract forms

---

## Image Generation Needs

For the site launch, consider generating:

1. **Hero illustration** (if using Option B): An isometric composition showing all 8 token icons arranged as a system/map. Could be a circular arrangement with connecting lines, or an exploded diagram.

2. **OG/Social card image**: Needs to work at 1200x630. Could combine the isometric compass (Intent) with the site title.

3. **Enterprise page header**: Could use a more dramatic isometric composition showing the token system applied to an organization.

---

## Summary (v2)

| | Before (wrong) | After (correct) |
|---|---|---|
| **Brand identity** | Glass 3D | **Isometric** |
| **Article covers** | Isometric | **Glass 3D** |
| **Hero approach** | Glass 3D hero image | **Typography-only or Isometric composition** |
| **Framework section** | Glass token icons | **Isometric token icons** (already correct in HTML) |
| **Journal section** | Isometric covers | **Glass 3D covers** (from Substack RSS) |

The isometric system is the intellectual backbone. The glass 3D is the emotional surface for articles. Both serve Context Grammar, but in different roles.
