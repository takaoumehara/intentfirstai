# Context Grammar Pipeline v2 — Session Handoff

**Date:** 2026-05-25
**Session Lead:** Main session (Qwen Code)
**Status:** P0 + P1 complete. P2 (Trust page build) ready for next session.

---

## What Was Requested

User asked to:
1. **Verify** all context-grammar pages after Pipeline v2 plan completion — check factual accuracy, restaurant examples, clarity for middle-school → expert audience, page structure consistency
2. **Fix** P0 stage number errors (4 pages had wrong stage numbers)
3. **Fix** P0 stale URL references (signals-and-dials, trust-design, tokens)
4. **Plan** Trust page structure — Trust is a larger concept than Dials; needs its own page
5. **Fix** Negotiation Layer prototype — wasn't working, high UX barrier, unclear purpose

---

## What Was Done

### P0 — Stage Number Fixes (8 files edited)

| File | Before | After |
|---|---|---|
| `context-grammar/dials/index.html` | "Stage 6", H1 "Disclosure × Autonomy" | "Stage 3", H1 "Dials" |
| `context-grammar/ax-patterns/index.html` | "Stage 5" | "Stage 7" |
| `context-grammar/brain/index.html` | "Stage 3" | "Always-On Layer" |
| `context-grammar/specs/index.html` | "Stage 7", title "Tokens as Portable Contract" | "Reference", title "Decision Schema" |
| `context-grammar/ja/dials/index.html` | "Stage 6", H1 "Disclosure × Autonomy" | "Stage 3", H1 "Dials" |
| `context-grammar/ja/ax-patterns/index.html` | "Stage 5" | "Stage 7" |
| `context-grammar/ja/brain/index.html` | "Stage 3" | "Always-On Layer" |
| `context-grammar/ja/specs/index.html` | "Stage 7" | "Reference" |

### P0 — Stale URL References Fixed (20+ files)

All `signals-and-dials/`, `trust-design/`, and `tokens/` links in **active** pages updated to:
- `signals/` for Signals & Dials content
- `dials/` for Dials content
- `trust/` for Trust cross-cut

Files updated: hub (`index.html`), intent CTA, specs CTA, brain CTA, simulator pages (5 EN + 4 JA), JA mirrors (dials CTA, brain CTA, intent CTA, index links).

### P1 — Negotiation Layer Redesign (1 file)

Complete rewrite of `context-grammar/negotiation-layer/index.html`:
- **Before:** Empty text field, no guidance, "submit did nothing" feel
- **After:**
  - 🍽️ Restaurant metaphor at top (waiter checking before serving spicy dish)
  - 4 preset scenario buttons (Health / Work / Family / Travel)
  - **Auto-plays on page load** with health scenario
  - "Watch first, then try" UX flow
  - Fixed JS engine — confirm/correct buttons now produce visible outcomes
  - Added Priority Toggle (Phase 2) with visual conflict resolution

### Planning Documents Created (2 files in `obsidian/`)

1. **`obsidian/2026-05-25-context-grammar-verification-report.md`** — Full audit with:
   - Pipeline architecture diagram
   - Factual issues (stage errors, stale links, content gaps)
   - Restaurant example quality assessment (9/11 pages covered)
   - Clarity assessment (middle-school → expert)
   - Page structure consistency check
   
2. **`obsidian/2026-05-25-trust-page-and-negotiation-layer-redesign.md`** — Design plan for:
   - Trust page: 9-section structure (Hero → Restaurant → 3 Trust Concepts → Dials vs Trust → Pipeline Cross-cut → Walkthrough → Enterprise → FAQ → CTA)
   - Negotiation Layer: "Show, then let" UX redesign (completed in this session)

---

## What Remains

### P2 — Trust Page Build (NOT YET DONE)

Plan is ready at `obsidian/2026-05-25-trust-page-and-negotiation-layer-redesign.md`.

**Key decisions:**
- `trust/index.html` should be the **overarching relational trust** page (Temporal Arc / Dynamic Friction / Trust Breach Recovery)
- `dials/` stays as the **operational mechanism** page (Disclosure × Autonomy levels)
- `trust-design/` is a **legacy duplicate** — should be deleted after Trust page is built
- `tokens/` is a **legacy duplicate** of `signals/` — should be deleted

**Next session needs to:**
1. Build `context-grammar/trust/index.html` following the 9-section plan
2. Delete `context-grammar/trust-design/` folder (EN + JA)
3. Delete `context-grammar/tokens/` folder
4. Delete `context-grammar/signals-and-dials/` folder (redirect no longer needed)

### Remaining Minor Items

- `_archive/` simulator files still have some old links — acceptable (archived content)
- `tokens/index.html` canonical link still points to `signals-and-dials/` — will be resolved when tokens folder is deleted
- `signals/easy.html` canonical needs update — will be resolved when tokens folder is deleted

---

## Files to Read for Context

### Must Read (understand current state)
1. `context-grammar/index.html` — Hub page with pipeline overview
2. `context-grammar/dials/index.html` — Dials page (Stage 3)
3. `context-grammar/trust/index.html` — Current stub (almost empty)
4. `context-grammar/trust-design/index.html` — Legacy page with Temporal Arc / Dynamic Friction / Trust Breach Recovery content (to be migrated)
5. `context-grammar/negotiation-layer/index.html` — Redesigned prototype (just updated)

### Planning Documents
1. `obsidian/2026-05-25-trust-page-and-negotiation-layer-redesign.md` — **Trust page design spec**
2. `obsidian/2026-05-25-context-grammar-verification-report.md` — Full audit report
3. `docs/superpowers/plans/2026-05-25-context-grammar-pipeline-v2.md` — Original Pipeline v2 plan
4. `_handoff/NAV_REDESIGN_PLAN.md` — Nav redesign plan with folder migration details

### Reference for Page Style
- `context-grammar/negotiation-gate/index.html` — Best-in-class page structure (restaurant aside, concrete examples, R34-R41 table)
- `context-grammar/intent/index.html` — Strong page structure (2-axis model, triple slogan, scenario walkthrough)

---

## Pipeline Stage Reference (Current)

```
INFLOW → Human Raw Expression
Stage 1  → Intent (Detection Channel × Awareness Depth)
Stage 2  → 6 Situation Signals
Stage 3  → 2 Relationship Dials (dials/index.html)
Stage 4  → Rule Engine (33 rules)
Stage 5  → Negotiation Gate (R34-R41)
Stage 6  → Autonomy Resolution (anchor on negotiation-gate page)
Stage 7  → AX Patterns × Agent Action Lifecycle (7 verbs)
Stage 8  → Agentic Response (no standalone page)

Always-On Layers (span all stages):
  → Brain (Memory & Learning)
  → Trust (Temporal Arc / Dynamic Friction / Breach Recovery) — NEEDS PAGE BUILD
  → Negotiation Layer (Interpretation Preview / Assumption Cards / Priority Toggle)

Reference:
  → Simulator
  → Specs (Decision Schema YAML)
```

---

## Key Naming Decisions (Do NOT deviate)

- Nav/sidebar labels: "Signals" (not "Tokens"), "Dials" (not "Trust Design"), "Intent" (not "Intent v2")
- Stage numbers: Dials = Stage 3, AX Patterns = Stage 7, Brain = Always-On Layer, Specs = Reference
- Trust is the **relationship arc** (longitudinal). Dials are the **operational knobs** (per-setting).
- Restaurant metaphor is the consistent explanatory device across all pages.
- "Decision Schema" (not "sensor spec") is the core framing for Signals & Dials.

---

**Ready for next session.** All plans and context are in `obsidian/`.
