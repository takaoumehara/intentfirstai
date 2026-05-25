# Context Grammar Content Verification Report

**Date:** 2026-05-25
**Scope:** All `context-grammar/` pages — factual consistency, restaurant examples, clarity, page structure parity
**Trigger:** Pipeline v2 plan (2026-05-25-context-grammar-pipeline-v2.md) completed; NAV_REDESIGN_PLAN.md v5 audit

---

## 1. Pipeline Architecture — Current State Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DECISION PIPELINE (8 Stages)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  INFLOW: Human Raw Expression                                       │
│       ↓                                                             │
│  Stage 1  Intent v2 — Detection Channel × Awareness Depth           │
│           [intent/index.html] ✅ "Stage 1"                          │
│       ↓                                                             │
│  Stage 2  6 Situation Signals                                       │
│           [signals/index.html] ✅ "Stages 2–3" (combined page)      │
│  Stage 3  2 Relationship Dials                                      │
│           [dials/index.html] ❌ labeled "Stage 6" — WRONG           │
│       ↓                                                             │
│  Stage 4  Rule Engine (33 rules)                                    │
│           [rule-engine/index.html] ✅ "Stage 4"                     │
│       ↓                                                             │
│  Stage 5  Negotiation Gate                                          │
│           [negotiation-gate/index.html] ✅ "Stage 5"                │
│       ↓                                                             │
│  Stage 6  Autonomy Resolution (anchor on negotiation-gate page)     │
│           [negotiation-gate/index.html#autonomy-resolution] ✅       │
│       ↓                                                             │
│  Stage 7  AX Patterns × Agent Action Lifecycle (7 verbs)            │
│           [ax-patterns/index.html] ❌ labeled "Stage 5" — WRONG     │
│       ↓                                                             │
│  Stage 8  Agentic Response (no standalone page)                     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                ALWAYS-ON LAYERS (span all stages)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Brain          Memory & Learning State                             │
│                 [brain/index.html] ❌ labeled "Stage 3" — WRONG     │
│                 Should be "Always-On Layer" (not a numbered stage)  │
│                                                                     │
│  Trust          Long-term relational trust                          │
│                 [trust/index.html] ✅ "Always-On Layer"             │
│                 [trust-design/index.html] ❌ still exists, "Stage 6"│
│                 (legacy page — should be removed or redirected)     │
│                                                                     │
│  Negotiation L. Moment-to-moment meaning alignment                  │
│                 [negotiation-layer/index.html] (no stage label) ✅  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                    REFERENCE                                        │
├─────────────────────────────────────────────────────────────────────┤
│  Simulator  [simulator/]                                            │
│  Specs      [specs/index.html] ❌ labeled "Stage 7" — WRONG         │
│             Should be "Reference" (not a numbered stage)            │
└─────────────────────────────────────────────────────────────────────┘
```

### Cross-cut Relationships

```
  Brain ←── referenced by ──→ Every Stage (1-7)
              ↑
              │ reads from
              │
  Signals & Dials ←── feed Now Layer of Brain
              ↓
              │ feed into
              ↓
  Rule Engine ←── reads Signals, Dials, Brain facts
              ↓
              │ emits ui.command →
              ↓
  Negotiation Gate ←── evaluates proposed action
              ↓
              │ outputs Gate Decision + Autonomy Ceiling
              ↓
  Autonomy Resolution ←── Final = min(User Setting, Gate Ceiling)
              ↓
              │ routes to
              ↓
  AX Patterns ←── tagged with Lifecycle Verbs
              ↓
  Agentic Response

  Trust Design ←── spans all stages (long-term, temporal arc)
                   References Dials as UI mechanism
                   References Brain (L2 learning) as sibling
                   References Negotiation Layer as sibling

  Negotiation Layer ←── UI primitives used by Gate (R34-R41)
                        Interpretation Preview
                        Assumption Cards
                        Priority Toggle (Phase 2)
```

---

## 2. Factual Issues Found

### 2.1 Stage Number Errors (CRITICAL — must fix)

| Page | Current Label | Correct Label | Severity |
|---|---|---|---|
| `dials/index.html` | "Context Grammar — Stage 6" | "Context Grammar — Stage 3" | P0 |
| `ax-patterns/index.html` | "Context Grammar — Stage 5" | "Context Grammar — Stage 7" | P0 |
| `brain/index.html` | "Context Grammar — Stage 3" | "Context Grammar — Always-On Layer" | P0 |
| `specs/index.html` | "Context Grammar — Stage 7" | "Context Grammar — Reference" | P0 |
| `trust-design/index.html` | "Context Grammar — Stage 6" | (legacy — redirect to `/dials/` or delete) | P0 |

**JA mirrors also affected:**
- `ja/dials/index.html` — "Stage 6" → "Stage 3"
- `ja/ax-patterns/index.html` — "Stage 5" → "Stage 7"
- `ja/brain/index.html` — "Stage 3" → "Always-On Layer"
- `ja/specs/index.html` — "Stage 7" → "Reference"
- `ja/trust-design/index.html` — "Stage 6" → (legacy — redirect)

### 2.2 Stale URL References (HIGH)

**`signals-and-dials/` redirect points to wrong target:**
- `context-grammar/signals-and-dials/index.html` redirects to `/context-grammar/tokens/`
- But `tokens/` still exists alongside the new `signals/` folder
- Per NAV_REDESIGN_PLAN v5: `signals-and-dials/` should be deleted, not kept
- The redirect chain is: `signals-and-dials/` → `tokens/` but `tokens/` content is now duplicated with `signals/`

**Pages linking to stale `signals-and-dials/index.html`:**
- `context-grammar/index.html` line 124: `href="signals-and-dials/index.html"` → should be `signals/index.html`
- `context-grammar/intent/index.html` CTA: `href="../signals-and-dials/index.html"` → should be `../signals/index.html`
- `context-grammar/specs/index.html` CTA: `href="../signals-and-dials/index.html"` → should be `../signals/index.html`

**Pages linking to stale `trust-design/`:**
- `context-grammar/index.html` lines 139, 230: `href="trust-design/index.html"` → should be `trust/index.html` (for Trust Cross-cut) and `dials/index.html` (for Dials in Pipeline)
- `context-grammar/brain/index.html` lines 458, 621: `href="../trust-design/index.html"` → should be `../trust/index.html`
- `context-grammar/tokens/index.html` CTA: `href="../trust-design/"` → should be `../dials/`

**Simulator pages linking to `tokens/`:**
- `simulator/morph.html` line 121
- `simulator/gallery.html` lines 635, 665
- `simulator/index.html` line 199
- `simulator/pipeline.html` line 160
- `simulator/yamashiro-tuesday.html` line 267

**JA mirrors:**
- `ja/index.html` lines 111, 124: `tokens/index.html`, `trust-design/index.html`
- `ja/brain/index.html` lines 408, 550-551
- `ja/specs/index.html` line 393
- `ja/simulator/console.html` lines 202, 205
- `ja/simulator/story.html` lines 321, 358, 361
- `ja/simulator/index.html` lines 638, 668, 671

### 2.3 Content Inconsistencies (MEDIUM)

**`signals/index.html`:**
- Title says "Signals & Dials — Stages 2–3" — but this page is supposed to be Signals-only (6 Situation Signals). The Dials content should be only in `dials/index.html`.
- The page still contains Dials content (Autonomy Dial + Disclosure Dial sections, images, table rows 7-8). Per NAV_REDESIGN_PLAN Phase 0.5.1, the Dials section should be removed from `signals/index.html`.
- Visual card grid still shows all 8 items (6 Signals + 2 Dials) with old `IF-Token*-*.png` image filenames.

**`dials/index.html`:**
- This is actually the renamed `trust-design/` page (via git mv). Content is about the 2 Dials. ✅ Correct scope.
- But labeled "Stage 6" instead of "Stage 3". ❌

**`trust/index.html`:**
- Exists as new Cross-cut page. ✅
- But extremely thin — only 3 short sections (hero, trust model stub, related pages). Missing content for: Temporal Arc, Dynamic Friction, Trust Breach Recovery — all promised in the NAV_REDESIGN_PLAN v4.
- The actual Temporal Arc / Dynamic Friction / Trust Breach Recovery content is still in `trust-design/index.html`.

**`trust-design/index.html`:**
- Still exists with full content (Temporal Arc, Dynamic Friction, Trust Breach Recovery, Mai's Tuesday walkthrough, Multi-Brain context table).
- Should either be: (a) migrated content to `trust/index.html` and then deleted/redirected, OR (b) kept as the canonical Trust page and the nav should point to it.
- Currently creates confusion: `trust/index.html` is the "official" new Cross-cut but has almost no content, while `trust-design/index.html` has the real content.

**`tokens/` folder:**
- Still exists with `index.html` and `easy.html`.
- `tokens/index.html` still has canonical link pointing to `/context-grammar/signals-and-dials/`.
- Per NAV_REDESIGN_PLAN Phase 0.5, `tokens/` should be deleted after content is migrated to `signals/`.

### 2.4 Terminology Remaining in Public Copy

**"tokens" in body copy (not folder paths):**
- `specs/index.html` title: "Specs - Tokens as a Portable Contract" — should be "Specs — Decision Schema" or similar
- `specs/index.html` meta description mentions "YAML, JSON Schema, TypeScript types" but still has "tokens" in `<title>`
- `specs/index.html` code examples still use `"tokens":` as JSON key
- `simulator/_archive/console.html` line 45: "tokens/dials" (archived, acceptable)

**"Context Tokens" references:**
- `specs/index.html` line ~180: `context-tokens-spec.yaml` referenced as filename (acceptable as legacy filename with annotation)
- `specs/index.html` table field name: `token_id` → should be `signal_id` or `spec_id`

### 2.5 Pipeline Hub Page (`context-grammar/index.html`)

**Eyebrow labels are inconsistent with Pipeline v2:**
- Stage 02: "02 · 6 Situation Signals" ✅
- Stage 03: "03 · 2 Relationship Dials" ✅
- Stage 04: "04 · Rule Engine" ✅
- Stage 05: "05 · Negotiation Gate" ✅
- Stage 06: "06 · Autonomy Resolution" ✅ (shown as separate item)
- Stage 07: "07 · AX × Lifecycle" ✅

**But links are stale:**
- Stage 02 links to `signals-and-dials/index.html` → should be `signals/index.html`
- Stage 03 links to `trust-design/index.html` → should be `dials/index.html`
- Trust layer links to `trust-design/index.html` → should be `trust/index.html`

**ga-slot data attributes still reference old names:**
- `data-ga-slot="cg-tokens"` (should be `cg-signals`)
- `data-ga-slot="cg-trust-coupling"` (acceptable — Trust Design concept)

---

## 3. Restaurant Example Audit

### 3.1 Which pages have restaurant examples?

| Page | Has Restaurant Section | Quality | Notes |
|---|---|---|---|
| Hub (`index.html`) | ✅ "Service metaphor" section | Good | Introduces restaurant model, but brief |
| Intent | ✅ "Two restaurants. Two kinds of AI." | Good | Explicit vs Implicit intent via restaurant service |
| Signals | ✅ Waiter reading signals | Good | "A skilled waiter reads many signals before speaking" |
| Dials | ✅ "Trust grows like becoming a regular" | Excellent | Full regular-customer metaphor with stages |
| Rule Engine | ✅ "ticket system / kitchen instruction" | Good | Clear analogy to restaurant ticket system |
| Negotiation Gate | ✅ "senior waiter and spicy dish" | Excellent | Full aside with 4-variable mapping |
| AX Patterns | ✅ "menu vs service technique" | Good | Pattern = technique, recipe vs technique |
| Brain | ✅ "restaurant that remembers you" | Good | 3-layer memory via reservation/learning/tonight |
| Trust | ❌ No restaurant section | MISSING | Should have Temporal Arc restaurant metaphor |
| Negotiation Layer | ❌ No restaurant section | MISSING | Prototype page, but should explain conceptually |
| Specs | ✅ "menu and recipe card" | Good | Menu = narrative, recipe card = spec |
| Simulator | N/A | N/A | Interactive tool |

### 3.2 Restaurant Example Consistency

The restaurant metaphor is used **consistently** across pages:
- **Waiter** = the AI system reading context and deciding action
- **Regular customer** = trust that grows over time
- **Menu** = what the user sees; **kitchen ticket** = the Rule Engine's ui.command
- **Reservation book** = Brain Identity Layer
- **Learning patterns** = Brain Learning Layer (beer on Fridays, etc.)
- **Tonight's mood** = Brain Now Layer
- **Senior waiter checking about spicy dish** = Negotiation Gate

**Quality assessment:** The restaurant examples are strong, concrete, and well-written. They work for both a middle-school reader (understandable story) and an expert (maps cleanly to technical concepts).

**Gap:** `trust/index.html` is nearly empty — it should inherit the Temporal Arc / Dynamic Friction / Trust Breach Recovery restaurant metaphors that currently live in `trust-design/index.html`.

---

## 4. Clarity Assessment (Middle-School → Expert Spectrum)

### 4.1 Pages that achieve both levels well

| Page | Middle-School Accessible | Expert Depth | Notes |
|---|---|---|---|
| Intent | ✅ 4-channel story | ✅ 2-axis table + Latent negotiation | Strong triple slogan |
| Signals | ✅ Waiter reading room | ✅ Decision Schema + Readiness Table | Combined Signals+Dials page is confusing |
| Dials | ✅ "Surprise me" regular metaphor | ✅ Disclosure × Autonomy logical dependency | Excellent QA section |
| Rule Engine | ✅ Kitchen ticket system | ✅ ui.command spec + conflict arbitration | Strong walkthrough |
| Negotiation Gate | ✅ "I'm tired" → 3 decisions | ✅ R34-R41 table + confidence/risk matrix | Best page in the set |
| AX Patterns | ✅ Pattern = technique | ✅ 23 patterns + Lifecycle verbs + composition | Good catalog |
| Brain | ✅ Restaurant remembers you | ✅ 5-tier scale model + disposable Brain | Strong |

### 4.2 Pages needing improvement

| Page | Issue | Recommendation |
|---|---|---|
| `trust/index.html` | Almost empty — 3 sections, no meat | Migrate content from `trust-design/index.html` |
| `signals/index.html` | Combines Signals + Dials in one page | Either split into two pages, or clearly delineate the two sections |
| `specs/index.html` | Title still says "Tokens"; JSON uses `token_id` | Update title to "Decision Schema"; rename `token_id` to `signal_id` |

### 4.3 Negotiation Gate — best-in-class

The Negotiation Gate page is the strongest in the entire framework:
- Restaurant aside is perfectly scoped
- "Same input, three different Gate decisions" concrete example is brilliant
- Confidence/risk ASCII mental model diagram is clever
- Anti-pattern section ("firing too often") prevents over-interruption fear
- R34-R41 table is complete and readable

### 4.4 Negotiation Layer prototype

- Well-structured interactive demo with JP/EN support
- Priority Toggle (Phase 2) is included despite plan saying Phase 1 only
- Gate firing rules explanation in demo is accurate
- Missing: restaurant metaphor section (would help non-technical visitors)

---

## 5. Page Structure Consistency

### 5.1 Common structural pattern (what good pages follow)

```
1. Hero (cg3-hero) — eyebrow (stage/kicker), H1, lead, proof bullets, visual
2. Restaurant metaphor section (cg-restaurant-aside or cg3-media-grid)
3. Definition / Quick overview (cg3-quick)
4. Deep dive sections (cg3-section × 3-6)
5. Concrete walkthrough / scenario (cg3-walk)
6. Architecture / technical detail (cg3-role-grid, cg3-table)
7. Common questions (cg3-stack / cg3-details)
8. CTA with related page links (cg3-cta)
```

### 5.2 Pages following the pattern well

- Intent ✅
- Signals ✅
- Dials ✅
- Rule Engine ✅
- Negotiation Gate ✅
- AX Patterns ✅
- Brain ✅
- Specs ✅

### 5.3 Pages NOT following the pattern

- **Trust (`trust/index.html`)** — Missing almost everything. Only has: hero, 1 stub section, CTA.
- **Negotiation Layer (`negotiation-layer/index.html`)** — Different structure (demo-first page), but acceptable as prototype.

### 5.4 Visual consistency

All pages share:
- `cg3-hero` with dark theme
- `cg3-shell` for content width
- `cg3-section` for spacing
- `cg3-cta` for bottom navigation
- `nav.js` with `initNav()` call
- `ga-slots.js` for animation slots
- `chapter-nav.js` for prev/next (some pages)

**Inconsistency:** Some pages have `chapter-nav`, some don't. This is acceptable (hub pages don't need it).

---

## 6. Summary of Required Fixes

### P0 — Must fix before shipping

| # | Fix | Files |
|---|---|---|
| 1 | Dials: "Stage 6" → "Stage 3" | `dials/index.html`, `ja/dials/index.html` |
| 2 | AX Patterns: "Stage 5" → "Stage 7" | `ax-patterns/index.html`, `ja/ax-patterns/index.html` |
| 3 | Brain: "Stage 3" → "Always-On Layer" | `brain/index.html`, `ja/brain/index.html` |
| 4 | Specs: "Stage 7" → "Reference" | `specs/index.html`, `ja/specs/index.html` |
| 5 | Hub: update all stale links (`signals-and-dials/` → `signals/`, `trust-design/` → `trust/` and `dials/`) | `context-grammar/index.html` |

### P1 — Should fix

| # | Fix | Files |
|---|---|---|
| 6 | Trust page: migrate content from `trust-design/` → `trust/`, then redirect or delete `trust-design/` | `trust/index.html`, `trust-design/index.html` |
| 7 | Signals page: remove Dials content, keep only 6 Signals | `signals/index.html` |
| 8 | Intent page CTA: `signals-and-dials/` → `signals/` | `intent/index.html` |
| 9 | Specs page CTA: `signals-and-dials/` → `signals/` | `specs/index.html` |
| 10 | Simulator pages: update `tokens/` → `signals/` links | `simulator/morph.html`, `simulator/gallery.html`, `simulator/index.html`, `simulator/pipeline.html`, `simulator/yamashiro-tuesday.html` |
| 11 | Brain CTA: `trust-design/` → `trust/`, `signals-and-dials/` → `signals/` | `brain/index.html` |
| 12 | Specs page: update title from "Tokens" framing; rename `token_id` in spec anatomy table | `specs/index.html` |

### P2 — Nice to have

| # | Fix | Files |
|---|---|---|
| 13 | Trust page: add restaurant metaphor for Temporal Arc | `trust/index.html` |
| 14 | Negotiation Layer: add restaurant metaphor section | `negotiation-layer/index.html` |
| 15 | All JA mirrors: propagate P0-P1 fixes | `ja/*/index.html` |
| 16 | Clean up `tokens/` folder after all content migrated | `tokens/` delete |
| 17 | Clean up `signals-and-dials/` redirect after links updated | `signals-and-dials/` delete |

---

## 7. Overall Assessment

### What's working well
- **Pipeline v2 narrative is strong.** The 8-stage progression reads naturally.
- **Restaurant metaphor is consistent** across all major pages and works at both beginner and expert levels.
- **Negotiation Gate page is best-in-class** — concrete, visual, actionable.
- **Decision Schema framing** is well-integrated into Signals and Specs pages.
- **Page structure is mostly consistent** — hero → restaurant → overview → deep dive → walkthrough → CTA.

### What needs attention
- **Stage numbers are wrong on 4+ pages** — this undermines the Pipeline metaphor.
- **`trust/index.html` is empty** while `trust-design/index.html` holds the real content — the split was planned but not executed.
- **`signals/index.html` still contains Dials content** — the planned split wasn't completed.
- **URL references are stale** across ~20 files (hub, intent, specs, brain, simulators, JA mirrors).
- **`tokens/` folder should be deleted** per NAV_REDESIGN_PLAN Phase 0.5.

### Clarity verdict
- **Middle-school accessible:** Yes, for Intent, Signals, Dials, Rule Engine, Negotiation Gate, AX Patterns, Brain. Not for Trust (empty) or Specs (too technical, no narrative bridge).
- **Expert-satisfying:** Yes. Decision Schema, R34-R41 rules, Lifecycle verbs, conflict arbitration, 5-tier scale model — all rigorous.
- **Restaurant examples:** Strong across 9/11 pages. Missing on Trust and Negotiation Layer.
- **Page structure consistency:** 8/11 pages follow the standard pattern. Trust and Negotiation Layer are outliers (Trust = incomplete, Negotiation Layer = prototype).
