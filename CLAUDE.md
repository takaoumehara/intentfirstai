# Context Grammar Portfolio — Project Instructions

## What This Is

Design portfolio by Takao. "Context Grammar" is a decision design language for the post-app era, targeting Samsung/Google agentic AI/OS design roles. Portfolio: 15 Substack articles, OVERVIEW, 3 projects (Living Home, Family Trip, Fluid Handoff), Token Explainer, Context Token definitions.

## Core Architecture — 8-Stage Decision Pipeline + Always-On Layers

**Inflow:** Human Raw Expression (not a numbered Stage)

- **Stage 1 — Intent v2**: Detection Channel (Explicit / Active Implicit / Passive Implicit / Ambient Implicit) × Awareness Depth (Stated / Inferred / Latent). Latent Intent must pass Negotiation Gate — never acted on directly.
- **Stage 2 — 6 Situation Signals**: Physical State, Cognitive Load, Social Exposure, Priority Weight, Form Factor, Feasibility.
- **Stage 3 — 2 Relationship Dials**: Autonomy Dial (Suggest → Confirm → Notify → Auto) + Disclosure Dial. Dials are set by users; Signals are read by the system.
- **Stage 4 — Rule Engine**: 33 design rules + 8 Negotiation Gate firing rules (R34–R41).
- **Stage 5 — Negotiation Gate**: Evaluates Confidence × Risk × Reversibility × Sensitivity. Outputs Risk Profile + Gate Decision (`autonomy_ceiling`, `required_ui_primitive`).
- **Stage 6 — Autonomy Resolution**: `Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)`. Core safety formula.
- **Stage 7 — AX Patterns × Agent Action Lifecycle**: 23 patterns, each tagged with primary Lifecycle Verb(s): Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt.
- **Stage 8 — Agentic Response**: Actual UI output, notification, side effect, external API call.

**3 Always-On Layers / 常に働くレイヤー (span all 8 Stages — NOT numbered Stages):**
- **Brain** (Memory & Learning State): 3-layer memory — Identity / Learning / Now. Referenced by every Stage; updated during Monitor/Adapt.
- **Trust Design**: Long-term relational trust. Disclosure × Autonomy, Temporal Arc, Dynamic Friction, Trust Breach Recovery.
- **Negotiation Design**: Moment-to-moment meaning alignment. UI primitives: Interpretation Preview / Assumption Cards / Priority Toggle.

**Decision Schema (mandatory per Signal and Dial):** `{value, source, confidence, user_confirmed, fallback_behavior, implementation_readiness}`. Six source types: `explicit_user_input | system_state | behavioral_inference | sensor_signal | organizational_data | memory_learned`.

**Core framing:** Context Grammar is not a sensor spec. It is a decision schema for making contextual AI judgments explicit, inspectable, and adjustable.

### Project 04 — Enterprise Context Brain (5-Brain Model)

```
ENTERPRISE CONTEXT BRAIN  (umbrella)
├─ Org Brain              全社の永続的な土台（組織図・ポリシー・歴史）
├─ Brand Brain × N        判断DNA（B2C / B2B など並列インスタンス可）
├─ Research Brain         ユーザー理解 + 継続流入する外部データ
├─ Project Master Brain   プロジェクト群を統括・起案支援（略称: PMB）
│   └─ Project Brain × N  時限付き実行ブレイン
```

Every Brain has the same 3-layer anatomy: Identity / Learning / Now. P4 cast: **Priya** (B2C PO, 31) · **Maya** (Design Lead, 29) · **Dev** (Eng Lead, 34) · **Leena** (Brand Director, 41) · **Kenji** (B2B PO, 35) · **Arman** (incoming PO, 28 — arrives 2029).

## Naming Conventions

| Use This | NOT This |
|----------|----------|
| Autonomy Dial | Synchro Rate |
| Disclosure Dial | (new, no old name) |
| 6 Situation Signals | tokens, Context Tokens, 8 Context Tokens (body copy) |
| 2 Relationship Dials | (Autonomy + Disclosure — distinct from Signals) |
| Signals & Dials | Context Tokens, 8 Context Tokens, Grammar (body copy) |
| `context-grammar/tokens/` (folder path — legacy URL) | `context-grammar/grammar/` (renamed 2026-04-27) |
| AX Patterns | Response, Output |
| Decision Pipeline | Tower, 5-floor, Floor N |
| Stage N (e.g. Stage 1, Stage 5) | Floor N (e.g. Floor 1, Floor 2) |
| Always-On Layer / 常に働くレイヤー | Cross-cut |
| Negotiation Gate | (new — no old name) |
| Autonomy Resolution | (new — no old name) |
| Agent Action Lifecycle | (new — no old name) |
| Recommend (Lifecycle verb) | Suggest (in Lifecycle context) |
| Interpretation Architect | (Hero / nav / About card positioning tag) |
| Decision System Architect | (About body / interview only — NOT on Hero) |
| Intent is the entry point. Interpretation is the interface. | Intent becomes the interface |
| Week 1 → Month 6 (P1 timeline) | Month 1 → Year 1 |
| Context Brain · Level 1 — Identity Layer | L1, Level 1, "Identity" alone |
| Context Brain · Level 2 — Learning Layer | L2, Level 2, "Accumulated" |
| Context Brain · Level 3 — Now Layer | L3, Level 3, "Right Now" alone |
| **Project 04: Enterprise Context Brain** | Project Atlas, Atlas |
| **Project Master Brain (PMB)** | Atlas, Project Atlas |
| **Intent Match** (EN) / **Intentとの一致度** (JP) | Intent Fidelity |
| **Learning Returns Home** | Ambient Absorption |
| **Five Brain Diagram** | brain hierarchy, Brain Diagram (vague) |

## Critical Factual Rules

1. **Samsung Family Hub DOES store family data.** Allergies, dietary restrictions, per-member profiles (up to 6), Voice ID, Samsung Health, AI Vision, recipe filtering. NEVER claim "the fridge doesn't know your family."
2. **Memory is NOT unique to Context Grammar.** Claude, Gemini all have memory. CG's unique value is the DESIGN LANGUAGE layer.
3. **Autonomy Dial is NOT purely user-controlled.** Netflix/Amazon defaults are already high. AI also adjusts. 3 forces model.

## Writing Rules (MANDATORY)

1. Read [`Global_Assets/_Content_Writing_Guide/STYLE_GUIDE.md`](Global_Assets/_Content_Writing_Guide/STYLE_GUIDE.md) — §1–§6 (universal) + §7 (Japanese)
2. Read [`Global_Assets/COPY_STYLE_UNIFIED.md`](Global_Assets/COPY_STYLE_UNIFIED.md) — headings, anti-duplication, banned expressions
3. Read [`Global_Assets/CONTEXT_GRAMMAR_TERMS.md`](Global_Assets/CONTEXT_GRAMMAR_TERMS.md) before writing any CG concept name

**Em-dash (non-negotiable, every file):** Use `—` only. Never `——`. Fix on sight.

**Restaurant metaphors** are scaffolding for the zero-base reader — DO NOT cut `.restaurant-aside` blocks. Link [`assets/css/restaurant-aside.css`](assets/css/restaurant-aside.css) in every page that uses them.

**Tone:** Educational, not strategy language. Zero-base reader. Primarily Japanese. Samsung/Google product page tone — not TED/ポエム調.

**Banned expressions:** 「〜こそがデザインだ」→ delete · 三重否定の修辞 → 1事実に圧縮 · Brain を否定的に見せる表現 (「何も知らない」) → 何をしているかで書く

## Context Grammar Knowledge Base

**Before any CG-related work:** Read `context-grammar/_my-understanding.md` — canonical reference for the full framework (8-stage Pipeline, Intent v2, Signals & Dials, Negotiation Gate, Autonomy Resolution, Agent Action Lifecycle, Always-On Layers, Trust Design, Negotiation Design, Specs).

**After adding/renaming/removing any concept:** Update `_my-understanding.md` in the same pass. Never leave it out of sync with the pages.

## UI Taxonomy + Background Colors (MANDATORY)

| Kind | Framing | Background |
|---|---|---|
| **User UI** | Real device frames — iPhone 15 Pro, iPad, fridge, CarPlay | White / light |
| **Concept Explainer** | `.bts-frame` + chip `CONCEPT · [topic]` (amber dot) | — |
| **Backstage** | `.bts-frame--dark` + chip `BACKSTAGE · [topic]` (purple dot) | Black / dark |

- **Warm Sand (`#f0e8d8`, `.section--feature`)** — Spotlight sections. **Full-bleed photo** — Chapter dividers only.
- BACKSTAGE = "AI running, user never sees this." Concept Explainer and Backstage use `.bts-frame` — NEVER a device frame.
- CSS: [`assets/css/bts-frame.css`](assets/css/bts-frame.css)

## Device Frames + Captions (MANDATORY)

Full rules: [`Global_Assets/DEVICE_FRAME_STANDARD.md`](Global_Assets/DEVICE_FRAME_STANDARD.md) — read before creating any UI mockup.

- Outer page owns the frame (`.iphone15pro`, `.ipad11`, `.samfh`) — inner UI is content-only via `?noframe=1`.
- Captions go **below** using `.ui-caption` + `.ui-caption__kind` badge.
- **NEVER use `.scene-tag`** or **`.device-caption`** — both removed. Fix on sight.

## Scroll Pages + Navigation (MANDATORY)

Full rules: [`Global_Assets/PORTFOLIO_GLOBAL_RULES.md`](Global_Assets/PORTFOLIO_GLOBAL_RULES.md)

- **Scroll-narrative only.** Never create `*_presentation.html`. Never write "scroll" in the UI.
- TOC Rail: `assets/css/toc-rail.css` + `assets/js/toc-rail.js`. TOC `label` must match `.eyebrow` + `h2` — update both together.
- Chapter divider photos are MANDATORY between every chapter.

## Mobile Responsiveness (MANDATORY)

**Only these two breakpoints:** `@media (max-width: 768px)` (primary pivot) · `@media (max-width: 480px)` (small-phone only). Above 768px: use `clamp()`. Global cap: `--max-w: 1280px`.

**FORBIDDEN:** `max-width: 720px` · `760px` · `820px` — migrate to 768px if found.

```bash
grep -rn "@media (max-width: \(720\|760\|820\)px)" \
  context-grammar/ projects/ ja/ assets/css/ index.html *.html journal/ about/ applied/ industry/ contact/
# Should return zero hits.
```

## Design System — Vercel Geist (MANDATORY)

- `assets/css/tokens.css` — link from every page. Never hardcode colors.
- Fonts: Geist / Geist Sans (`--font-sans`) + Geist Mono (`--font-mono`) — NOT Satoshi, Google Sans, DM Mono, Outfit.
- Colors: Geist neutral scale only (`--gray-50` to `--gray-950`). No custom hex grays. No gradient text. No rounded corners + color borders.
- Min font sizes: 12px labels / 15px body / 17px card body. **Title > Subtitle > Body** always.
- **Section names must be `<h2>`**, never eyebrow.

Full spec: [docs/design-system/](docs/design-system/)

## Image Generation — kie.ai

Script: `../scripts/generate_kie.py` · API Key: `../.env` as `KIE_API_KEY` · Model: `nano-banana-2` · Always `"resolution": "4K"`, `"output_format": "png"`. Prompts in `_Gem_instruction_for_Image/`.

## Code Review

After significant HTML/CSS/JS changes, use **OpenAI Codex** for a second-eye review (accessibility, specificity conflicts, broken links, token consistency).

## Multi-Session + Cross-AI Sync (Obsidian Vault)

Obsidian Vault: `/Users/takao/Documents/00_Product_Develpment/Substack/Portfolio/obsidian` — single source of truth across all sessions and AIs.

**Session start — read silently (no report):**
1. `Projects/intentfirst/GLOBAL_STATUS.md` — current state across all sessions
2. `Projects/intentfirst/SESSIONS_ACTIVE.md` — running sessions + dependencies
3. `Projects/intentfirst/TASK_BOARD.md` — TODO / IN_PROGRESS / BLOCKED / DONE

**During session — write silently (no "Obsidian: wrote to X" messages):**
- Bug fix → `Knowledge/` · Decision → `Decisions/` · Task done → `TASK_BOARD.md` · Blocker → `SESSIONS_ACTIVE.md` · Dependency → `GLOBAL_STATUS.md`

**`GLOBAL_STATUS.md` and `HANDOFF.md` are always current** — not just at session end. Also create/update `.claude/session-{YYYYMMDD-HHMMSS}-{task-slug}.md` and register in `ACTIVE_SESSIONS.md`.

```
obsidian/
├── Knowledge/   ├── Decisions/   └── Projects/intentfirst/
│   ├── GLOBAL_STATUS.md   ├── SESSIONS_ACTIVE.md   ├── TASK_BOARD.md
│   ├── SESSION_SYNC_PROTOCOL.md   ├── AI_CONTEXT_DUMP.md   └── HANDOFF.md
```
