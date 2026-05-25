# Context Grammar Portfolio — Project Instructions

## What This Is

Design portfolio by Takao. "Context Grammar" is a design language for the post-app era, targeting Samsung/Google agentic AI/OS design roles. The portfolio consists of 15 Substack articles, an OVERVIEW, 3 projects (Living Home, Family Trip, Fluid Handoff), a Token Explainer article, and Context Token definitions.

## Core Architecture

### 8-Stage Decision Pipeline + 3 Cross-cuts

**Inflow:** Human Raw Expression (not a numbered Stage)

- **Stage 1 — Intent v2**: Two orthogonal axes: Detection Channel (Explicit / Active Implicit / Passive Implicit / Ambient Implicit) × Awareness Depth (Stated / Inferred / Latent). Latent Intent must always pass through the Negotiation Layer — never acted on directly.
- **Stage 2 — 6 Situation Signals**: Physical State, Cognitive Load, Social Exposure, Priority Weight, Form Factor, Feasibility. Each is a Decision Schema record (see below).
- **Stage 3 — 2 Relationship Dials**: Autonomy Dial (Suggest → Confirm → Notify → Auto) + Disclosure Dial. Dials are set by users; Signals are read by the system.
- **Stage 4 — Rule Engine**: 33 existing design rules + 8 Negotiation Gate firing rules (R34–R41). Produces a Proposed Action with a Lifecycle Verb.
- **Stage 5 — Negotiation Gate** [NEW]: Evaluates Confidence × Risk × Reversibility × Sensitivity. Takes a Proposed Action (with Lifecycle Verb) + Domain. Outputs Risk Profile + Gate Decision (including `autonomy_ceiling` and `required_ui_primitive`).
- **Stage 6 — Autonomy Resolution** [NEW]: `Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)`. The core safety formula of the framework.
- **Stage 7 — AX Patterns × Agent Action Lifecycle**: 23 existing patterns, each tagged with primary Lifecycle Verb(s): Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt.
- **Stage 8 — Agentic Response**: Actual UI output, notification, side effect, external API call.

**Three Cross-cuts (span all 8 Stages — NOT numbered Stages):**
- **Brain** (Memory & Learning State): 3-layer memory — Identity / Learning / Now. Referenced by every Stage; updated during Monitor/Adapt.
- **Trust Design**: Long-term relational trust. Disclosure × Autonomy, Temporal Arc, Dynamic Friction, Trust Breach Recovery.
- **Negotiation Design** [NEW]: Moment-to-moment meaning alignment. UI primitives: Interpretation Preview / Assumption Cards / Priority Toggle (Phase 2).

**Autonomy Dial** (formerly "Synchro Rate"): 4 stages (Suggest → Confirm → Notify → Auto). Driven by 3 forces: service default × AI adjustment × user active change. Not purely user-controlled.

**Decision Schema (mandatory per Signal and Dial):** Every Signal and Dial carries `{value, source, confidence, user_confirmed, fallback_behavior, implementation_readiness}`. Six source types: `explicit_user_input | system_state | behavioral_inference | sensor_signal | organizational_data | memory_learned`. **Core framing:** Context Grammar is not a sensor spec. It is a decision schema for making contextual AI judgments explicit, inspectable, and adjustable.

### Key Design Concepts

- **Substitution Modes**: Exact / Flexible / Exploring / Surprise
- **Disposable Brain**: Trip Brain lifecycle (born → learns → returns to Home Brain → dies)
- **Multi-Person Orchestration**: Different autonomy levels and UI for different family members simultaneously
- **Priority Weight**: Collision resolution between competing demands. Two layers: current urgency (Token) + learned tradeoff patterns (Brain).
- **Cognitive Load**: Estimation-based (time of day × calendar density × recent activity patterns), NOT direct measurement.

### Project 04 — Enterprise Context Brain (5-Brain Model)

```
ENTERPRISE CONTEXT BRAIN  (umbrella)
├─ Org Brain              全社の永続的な土台（組織図・ポリシー・歴史）
├─ Brand Brain × N        判断DNA（B2C / B2B など並列インスタンス可）
├─ Research Brain         ユーザー理解 + 継続流入する外部データ
├─ Project Master Brain   プロジェクト群を統括・起案支援（略称: PMB）
│   └─ Project Brain × N  時限付き実行ブレイン
```

Every Brain has the same 3-layer anatomy: Identity Layer / Learning Layer / Now Layer.
P4 cast: **Priya** (B2C PO, 31) · **Maya** (Design Lead, 29) · **Dev** (Eng Lead, 34) · **Leena** (Brand Director, 41) · **Kenji** (B2B PO, 35) · **Arman** (incoming PO, 28 — arrives 2029).

## Naming Conventions

| Use This | NOT This |
|----------|----------|
| Autonomy Dial | Synchro Rate |
| Disclosure Dial | (new, no old name) |
| 6 Situation Signals | tokens, Context Tokens, 8 Context Tokens (body copy) |
| 2 Relationship Dials | (Autonomy + Disclosure — distinct from Signals) |
| Signals & Dials | Context Tokens, 8 Context Tokens, Grammar (body copy) |
| `context-grammar/tokens/` (folder path — legacy URL, Phase 2 migrates to signals-and-dials/) | `context-grammar/grammar/` (renamed 2026-04-27) |
| AX Patterns | Response, Output, "Floor 5 patterns" |
| Decision Pipeline | Tower, 5-floor, Floor N, 5階 |
| Stage N (e.g. Stage 1, Stage 5) | Floor N (e.g. Floor 1, Floor 2) |
| Negotiation Gate | (new — no old name) |
| Autonomy Resolution | (new — no old name) |
| Agent Action Lifecycle | (new — no old name) |
| Recommend (Lifecycle verb) | Suggest (in Lifecycle context — collides with Autonomy Dial "Suggest") |
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

## UI Taxonomy + Background Colors (MANDATORY)

Every UI mockup must be labeled as one of three kinds:

| Kind | Framing | Background |
|---|---|---|
| **User UI** | Real device frames — iPhone 15 Pro, iPad, fridge, CarPlay | White / light |
| **Concept Explainer** | `.bts-frame` + chip `CONCEPT · [topic]` (amber dot) | — |
| **Backstage** | `.bts-frame--dark` + chip `BACKSTAGE · [topic]` (purple dot) | Black / dark |

- **Warm Sand (`#f0e8d8`, `.section--feature`)** — Spotlight sections (design concepts, PMB, Intent Match).
- **Full-bleed photo** — Chapter dividers only.
- BACKSTAGE = single canonical word for "AI running, user never sees this." Never wordier.
- Concept Explainer and Backstage use `.bts-frame` — NEVER a device frame.
- CSS: [`assets/css/bts-frame.css`](assets/css/bts-frame.css)

## Critical Factual Rules

1. **Samsung Family Hub DOES store family data.** Allergies, dietary restrictions, per-member profiles (up to 6), Voice ID, Samsung Health, AI Vision, recipe filtering. NEVER claim "the fridge doesn't know your family."
2. **Memory is NOT unique to Context Grammar.** Claude, Gemini all have memory. CG's unique value is the DESIGN LANGUAGE layer.
3. **Autonomy Dial is NOT purely user-controlled.** Netflix/Amazon defaults are already high. AI also adjusts. 3 forces model.

## Writing Rules (MANDATORY — read before writing any copy)

1. Read [`Global_Assets/_Content_Writing_Guide/STYLE_GUIDE.md`](Global_Assets/_Content_Writing_Guide/STYLE_GUIDE.md) — §1–§6 (universal) + §7 (Japanese)
2. Read [`Global_Assets/COPY_STYLE_UNIFIED.md`](Global_Assets/COPY_STYLE_UNIFIED.md) — headings, anti-duplication, banned expressions
3. Read [`Global_Assets/CONTEXT_GRAMMAR_TERMS.md`](Global_Assets/CONTEXT_GRAMMAR_TERMS.md) before writing any CG concept name

**Em-dash (non-negotiable, every file):** Use `—` only. Never `——`. Fix on sight.

**Restaurant metaphors** are scaffolding for the middle-school reader — DO NOT cut `.restaurant-aside` blocks. Link [`assets/css/restaurant-aside.css`](assets/css/restaurant-aside.css) in every page that uses them.

**Tone:** Educational, not strategy language. Zero-base reader. Primarily Japanese. Samsung/Google product page tone — not TED/ポエム調.

**Key banned expressions:**
- 「〜こそがデザインだ」→ delete
- 三重否定の修辞 「〜でもなく、〜でもなく、ただ〜として。」→ 1事実に圧縮
- Brain を否定的・無能に見せる表現 (「何も知らない」)→ 何をしているかで書く

## Context Grammar Knowledge Base

**Before any CG-related work:** Read `context-grammar/_my-understanding.md` — canonical reference for the full framework (8-stage Decision Pipeline, Intent v2, 6 Situation Signals & 2 Relationship Dials, Negotiation Gate, Autonomy Resolution, Agent Action Lifecycle, Brain as Cross-cut, Trust Design, Negotiation Design, Specs).

**After adding/renaming/removing any concept:** Update `_my-understanding.md` in the same pass. Never leave it out of sync with the pages.

## Mobile Responsiveness (MANDATORY)

**Only these two breakpoints allowed:**
- `@media (max-width: 768px)` — primary pivot (stacks layouts, hides TOC rail, hamburger nav)
- `@media (max-width: 480px)` — small-phone fine-tuning only (iPhone SE, Galaxy S22)

**FORBIDDEN — migrate to 768px if found:**
- `@media (max-width: 720px)` · `@media (max-width: 760px)` · `@media (max-width: 820px)`

**Above 768px:** use `clamp()` for fluid type/padding. Global cap: `--max-w: 1280px`. No extra breakpoints.

**Verification:**
```bash
grep -rn "@media (max-width: \(720\|760\|820\)px)" \
  context-grammar/ projects/ ja/ assets/css/ \
  index.html *.html journal/ about/ applied/ industry/ contact/
# Should return zero hits.
```

## Design System — Vercel Geist (MANDATORY)

- Token file: `assets/css/tokens.css` — link from every page. Never hardcode colors.
- Fonts: Geist / Geist Sans (`--font-sans`) + Geist Mono (`--font-mono`) — NOT Satoshi, Google Sans, DM Mono, Outfit
- Colors: Geist neutral scale only (`--gray-50` to `--gray-950`). No custom hex grays.
- **No gradient text** on headings. **No rounded corners + color borders.**
- Min font sizes: 12px labels / 15px body / 17px card body.
- **Title > Subtitle > Body** — title always largest in any block.
- **Section names must be `<h2>`**, never eyebrow. "Context Grammar", "Projects", "Journal" = `<h2>`.

Full spec: [docs/design-system/](docs/design-system/)

## Device Frames + Captions (MANDATORY)

Full rules: [`Global_Assets/DEVICE_FRAME_STANDARD.md`](Global_Assets/DEVICE_FRAME_STANDARD.md) — read before creating any UI mockup.

- Outer portfolio page owns the frame (`.iphone15pro`, `.ipad11`, `.samfh`) — inner UI is content-only via `?noframe=1`.
- Captions go **below** the frame using `.ui-caption` + `.ui-caption__kind` badge.
- **NEVER use `.scene-tag`** (absolute chip above device). Remove on sight.
- **NEVER use `.device-caption`** — replaced by `.ui-caption`.

## Scroll Pages + Navigation (MANDATORY)

- **Scroll-narrative is the only style.** Never create `*_presentation.html`. Never link slide decks in project headers. Never write the word "scroll" in the UI.
- Long scroll pages: TOC Rail → `assets/css/toc-rail.css` + `assets/js/toc-rail.js`.
- Slide decks (if any): `assets/js/deck-nav.js`.
- TOC `label` must match the section's `.eyebrow` + `h2`. When you rewrite a heading, update the TOC config in the same pass.
- Chapter divider photos are MANDATORY between every chapter.
- Full global rules: [`Global_Assets/PORTFOLIO_GLOBAL_RULES.md`](Global_Assets/PORTFOLIO_GLOBAL_RULES.md)

## Image Generation — kie.ai

- Script: `../scripts/generate_kie.py` | API Key: `../.env` as `KIE_API_KEY` | Model: `nano-banana-2`
- Always use `"resolution": "4K"`, `"output_format": "png"` for portfolio illustrations.
- Prompts stored as `.md` + `.json` in `_Gem_instruction_for_Image/`.

## Code Review

After significant HTML/CSS/JS changes, use **OpenAI Codex** for a second-eye review (accessibility, specificity conflicts, broken links, token consistency).

## Multi-Session Management (MANDATORY)

This project runs multiple Claude windows in parallel.

### Session Start (do FIRST)
1. Read `PROJECT_ROADMAP.md` + `ACTIVE_SESSIONS.md`
2. Create `.claude/session-{YYYYMMDD-HHMMSS}-{task-slug}.md` (copy from `.claude/SESSION_TEMPLATE.md`)
3. Add yourself to `ACTIVE_SESSIONS.md`

### During Work
- Update your session file as you progress.
- If another session holds a file you need → note as Blocked, don't overwrite.

### Session End
1. Fill in "Completion Report" in your session file.
2. Mark completed tasks `[x]` in `PROJECT_ROADMAP.md`.
3. Move your row to "Completed Today" in `ACTIVE_SESSIONS.md`.

## Cross-AI Context Inheritance (Obsidian Vault)

**Multi-Session + Multi-AI Sync System**

Use the **Obsidian Vault** at `/Users/takao/Documents/00_Product_Develpment/Substack/Portfolio/obsidian` as the single source of truth for all intentfirst context — across multiple Claude Code windows, multiple AIs (Codex / Gemini / Qwen), and credit switches.

### Auto-Context Initialization (Silent)

**On every new session start** (Claude Code window, new AI, any context):
1. Automatically read `GLOBAL_STATUS.md` — what is happening right now across all sessions
2. Automatically read `SESSIONS_ACTIVE.md` — which sessions/AIs are running, dependencies
3. Automatically read `TASK_BOARD.md` — what tasks are TODO/IN_PROGRESS/BLOCKED/DONE
4. Begin work immediately (no report, silent initialization)

### During Session (Silent Sync)

Work naturally. When you:
- **Solve a bug** → write to `Knowledge/` (no report)
- **Make a decision** → write to `Decisions/` (no report)
- **Complete a task** → update `TASK_BOARD.md` (no report)
- **Hit a blocker** → update `SESSIONS_ACTIVE.md` (no report)
- **Discover dependencies** → note in `GLOBAL_STATUS.md` (no report)

All syncs are silent. No "Obsidian: wrote to X" messages.

### Always-Current State

`GLOBAL_STATUS.md` and `HANDOFF.md` are **always in sync with reality**, not just at session end. This means:
- Any AI can switch in at any moment
- Any new session can start at any moment
- State is never stale

### Obsidian Structure
```
obsidian/
├── Knowledge/              (bugs fixed, discoveries, learnings)
├── Decisions/              (design decisions, approach choices)
├── Projects/
│   └── intentfirst/
│       ├── GLOBAL_STATUS.md        ← NOW across all sessions/AIs
│       ├── SESSIONS_ACTIVE.md      ← running sessions + dependencies
│       ├── TASK_BOARD.md           ← TODO/IN_PROGRESS/BLOCKED/DONE
│       ├── SESSION_SYNC_PROTOCOL.md ← detailed sync rules
│       ├── AI_CONTEXT_DUMP.md      ← for new AI onboarding
│       └── HANDOFF.md              ← always current
└── Preferences/            (user profile)
