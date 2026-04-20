# Context Grammar Portfolio — Project Instructions

## What This Is

Design portfolio by Takao. "Context Grammar" is a design language for the post-app era, targeting Samsung/Google agentic AI/OS design roles. The portfolio consists of 15 Substack articles, an OVERVIEW, 3 projects (Living Home, Family Trip, Fluid Handoff), a Token Explainer article, and Context Token definitions.

## Core Architecture (as of 2026-03-31)

### Intent + 8 Context Tokens + Brain + Rule Engine

- **Intent**: Separate from the 8 tokens. Can be explicit (user declares) or implicit (inferred from Token × Brain intersection).
- **8 Context Tokens**: Split into two groups:
  - 6 situation tokens: ① Physical State, ② Cognitive Load, ③ Social Exposure, ④ Priority Weight, ⑤ Form Factor, ⑥ Feasibility
  - 2 relationship dials: ⑦ Autonomy Dial, ⑧ Disclosure Dial
- **Brain**: 3-layer memory — Identity / Accumulated Learning / Right Now. Has domain axis and disclosure axis.
- **Autonomy Dial** (formerly "Synchro Rate"): 4 stages (Suggest → Confirm → Notify → Auto). Driven by 3 forces: service default × AI adjustment × user active change. Not purely user-controlled.
- **Disclosure Dial**: How much to let AI know about you, per domain, per person. Prerequisite for Autonomy — "知らせない × 任せる" is logically impossible.
- **Rule Engine**: Transforms tokens into design rules.

### Key Design Concepts

- **Substitution Modes**: Exact / Flexible / Exploring / Surprise
- **Disposable Brain**: Trip Brain lifecycle (born → learns → returns to Home Brain → dies)
- **Multi-Person Orchestration**: Different autonomy levels and UI for different family members simultaneously
- **Priority Weight**: Collision resolution between competing demands, not just "what's most important." Two layers: current urgency (Token) + learned tradeoff patterns (Brain).
- **Cognitive Load**: Estimation-based (time of day × calendar density × recent activity patterns), NOT direct measurement.

## Naming Conventions

| Use This | NOT This |
|----------|----------|
| Autonomy Dial | Synchro Rate |
| Disclosure Dial | (new, no old name) |
| 8 Context Tokens | 7 Context Tokens |
| Week 1 → Month 6 (P1 timeline) | Month 1 → Year 1 |

## Critical Factual Rules

1. **Samsung Family Hub DOES store family data.** Allergies, dietary restrictions, per-member profiles (up to 6), Voice ID, Samsung Health integration, AI Vision, recipe filtering. NEVER claim "the fridge doesn't know your family."
2. **Memory is NOT unique to Context Grammar.** Claude, OpenClaw, Gemini all have memory. Context Grammar's unique value is the DESIGN LANGUAGE layer — Grammar, Dials, Multi-Person Orchestration, Modes, Trust timeline, Disposable Brain.
3. **Autonomy Dial is NOT purely user-controlled.** Netflix/Amazon defaults are already high. AI also adjusts. 3 forces model.

## Tone and Style

- All articles are **educational for a general audience**, not internal strategy documents.
- NEVER use strategy language ("差別化", "コモディティ") in reader-facing content.
- Assume zero-base reader knowledge: introduce existing technology first, then show the gap.
- Written primarily in Japanese.
- Takao values intellectual honesty — verify factual claims about industry state before writing. If something is wrong, own it and fix it.

### Editorial rule — Restaurant metaphors are scaffolding, not decoration

The Context Grammar pages target a **"中学生でも分かる" (understandable to a middle schooler)** reader. For that audience, the recurring restaurant/waiter/reservation-book metaphor is the **on-ramp** that lets abstract concepts (Tokens, Brain layers, Disclosure Dial, Trust Breach) land.

When auditing or editing prose:
- **DO cut prose redundancy** — two paragraphs that say the same conceptual thing in different words.
- **DO NOT cut metaphor scaffolding** — restaurant examples that ground an abstract concept with a concrete parallel. Cutting these speeds up reading for an expert but breaks comprehension for a first-encounter reader.
- A subagent that recommends "tighten this metaphor" or "cut this restaurant aside" is optimizing for the wrong reader. Push back.
- See `context-grammar/_content-audit.md` "復元ログ" section for the case study.

### Knowledge base — `_my-understanding.md` is the source of truth

The file **`context-grammar/_my-understanding.md`** is Claude's structured understanding of the entire Context Grammar framework (5-floor architecture, 8 tokens, Brain, Rule Engine, 23 AX Patterns, Trust Design, Specs, key insights, factual rules). **It is the base reference for every Context Grammar judgment.**

**Required workflow for any Context Grammar–related change:**

1. **Before editing** a Context Grammar page (grammar/brain/trust-design/rule-engine/ax-patterns/specs/intent/ or the context-grammar landing page): read the relevant section of `_my-understanding.md` first to confirm the edit aligns with the framework as documented.
2. **When a concept is added, renamed, removed, or re-scoped** (e.g. a new AX Pattern, a renamed dial, a new principle, a changed factual claim): update `_my-understanding.md` in the same edit pass — do not leave the knowledge base out of sync with the pages.
3. **When Takao clarifies or corrects** something about Context Grammar in conversation: update `_my-understanding.md` immediately, including removing any item from the "私がまだ把握しきれていない部分" list that was just resolved.
4. **When starting a new session** on Context Grammar work: read `_my-understanding.md` first. Do not rebuild understanding from scratch.

The file has a "13. このドキュメントの使い方" section that restates this contract. Keep it in sync.

## File Structure

```
OVERVIEW.md              — Landing page (8 tokens, 15 articles, 3 projects)
Context_Tokens.md        — Full definitions for Intent + 8 Context Tokens
Article15_*.md           — Article #15: Brain + Grammar (Samsung → memory era → what's missing)
IMPACT_8Tokens_Restructure.md — File-by-file impact assessment for 7→8 restructure
Token_Reality_Check_2026.md   — Technical viability of each token (March 2026)
UPDATE_INSTRUCTIONS.md        — Detailed update instructions for remaining files
```

### Project files (in /uploads/ or subfolders):
- project01_index.md — The Living Home (P1)
- project02_index.md — The Family Trip (P2)
- project03_index.md — Fluid Handoff (P3)
- Token_Explainer_Article.md — Token Explainer

## Restructure Status (7→8 Tokens)

**Phase 1 (DONE):**
- IMPACT_8Tokens_Restructure.md — updated with 12 confirmed decisions
- Context_Tokens.md — created with full 8-token definitions
- OVERVIEW.md — fully updated
- Article #15 — confirmed

**Phase 2 (PENDING):**
- P1 index.md — Samsung fridge correction, timeline compression, Synchro→Autonomy, add Disclosure Dial
- P2 index.md — Synchro→Autonomy (8 occurrences), add Disclosure
- P3 index.md — Synchro→Autonomy (2 occurrences), Disclosure connection (TV hiding prices)

**Phase 3 (PENDING):**
- Token Explainer — Synchro→Autonomy, 8 token mention
- Articles #09, #14 — update references
- Token Reality Check — add Disclosure Dial assessment

## Technology Reality Levels (March 2026)

When writing about tokens, be honest about what ships today vs what's speculative:
- **Most real**: Social Exposure (★★★★☆), Form Factor (★★★★☆), Feasibility (★★★☆☆)
- **Most speculative**: Cognitive Load (★★☆☆☆ — estimation only, no direct measurement)
- **Shipping in dev tools**: Autonomy Dial (3-stage modes are standard in agent frameworks)
- **New/undefined**: Disclosure Dial (per-domain privacy controls exist but not as unified dial)

## Design System — F-Dark + F3 Muted Echo (MANDATORY)

**Direction adopted 2026-04-09. Full specifications in [`docs/design-system/`](docs/design-system/).**

| Reference | Contents |
|-----------|----------|
| [colors.md](docs/design-system/colors.md) | Color variables, semantic colors, forbidden colors |
| [typography.md](docs/design-system/typography.md) | Type scale, font weights, font CDN links |
| [layout.md](docs/design-system/layout.md) | Max-widths, section padding, illustration widths |
| [components.md](docs/design-system/components.md) | Hero, section, CTA, footer, part-banner HTML patterns |
| [illustrations.md](docs/design-system/illustrations.md) | ISO-GREEN image system, alt text rules |

### Quick Reference (critical rules only)

- Token file: `assets/css/tokens.css` (all pages must link this)
- Shared components: `assets/css/components.css`
- Context Grammar section: `assets/css/context-grammar.css`
- Fonts: Satoshi (`--font-sans`) + Geist Mono (`--font-mono`) — NOT Google Sans, DM Mono, Outfit
- No gradient text on headings
- No rounded corners + color borders
- Minimum font size: 12px labels, 15px body text, 17px card body
- No weight 200 on headings (minimum 500)
- No single brand accent color; no Tailwind blue; no Material colors
- **Title > Subtitle > Body hierarchy** — the title must always be the largest text in a block, subtitle smaller than title but larger than body, eyebrow/mono label smallest. See [typography.md](docs/design-system/typography.md#title--subtitle-hierarchy-mandatory).

## Slide Layout System (MANDATORY)

**All slide decks share a single external CSS file.** Do NOT write inline layout styles.

```html
<link rel="stylesheet" href="[relative-path]/assets/css/slide-layouts.css">
<link rel="stylesheet" href="[relative-path]/assets/css/device-frames.css">
```

### Device Embeds (MANDATORY for UI screen iframes)

**DO NOT wrap iframes in `.phone-frame`.** The UI screen files (e.g. `ui-screens/p3/p3-01-browse.html`) have their own iPhone 15 Pro frame with Dynamic Island built in.

Use `.device-embed` containers to size the iframe:

| Class | Size | Usage |
|---|---|---|
| `device-embed--phone` | 400px | Standard phone display |
| `device-embed--phone-lg` | 440px | Phone-context layout (50% column) |
| `device-embed--phone-sm` | 260px | Side-by-side / secondary |
| `device-embed--tv` | 100% max-w 1100px | TV screen display |
| `device-embed--faded` | Modifier | 40% opacity for before state |
| `device-dual` | Container | Two phones + arrow |

```html
<!-- Single phone -->
<div class="device-embed device-embed--phone">
  <iframe src="../../ui-screens/p3/p3-01-browse.html" loading="lazy"></iframe>
</div>

<!-- Two phones (before → after) -->
<div class="device-dual">
  <div class="device-embed device-embed--phone-sm device-embed--faded">
    <iframe src="..." loading="lazy"></iframe>
  </div>
  <div class="device-dual-arrow">→</div>
  <div class="device-embed device-embed--phone-sm">
    <iframe src="..." loading="lazy"></iframe>
  </div>
</div>
```

Path examples by depth:
- Root level: `assets/css/slide-layouts.css`
- 1 level deep (e.g. `presentation/`): `../assets/css/slide-layouts.css`
- 2 levels deep (e.g. `presentation/projects/`): `../../assets/css/slide-layouts.css`

**Available layout classes** (from Illustrator specs in `presentation/layoput-instruction/`):

| Class | Description | Mobile behavior |
|---|---|---|
| `layout-text-image` | Text left + image right (50/50) | Stacks vertical |
| `layout-text-grid` | Text left + 3x3 image grid | Stacks vertical |
| `layout-concept` | Headline + 4-step icon row | Steps → 2-col |
| `layout-dual-device` | TV + phone side-by-side | Stacks vertical |
| `layout-phone-context` | Text + phone-in-hand | Stacks vertical |
| `layout-composite` | Text+small-image / photo (50/50) | Stacks vertical |
| `slide--hero` | Full-bleed photo + text overlay | Gradient → bottom |
| `token-card` | Token image + info (50/50) | Stacks vertical |

**Spacing spec (CSS variables):**
- `--slide-pad-top: 7.5%`, `--slide-pad-x: 5%`, `--slide-pad-bottom: 5%`
- `--text-image-gap: 2.5%`, `--image-width: 50%`, `--card-gap: 1.25%`

**Mobile (Approach B):** Slides use `height: auto; min-height: 100vh` on mobile (≤768px), allowing internal scroll. All horizontal layouts stack vertically. Grids reduce columns (4→2, 2→1).

**When modifying layouts:** Edit `assets/css/slide-layouts.css` — changes propagate to ALL slide files automatically.

**Template reference:** `presentation/layoput-instruction/slide-template.html` — contains one example of each layout type.

## Slide Deck Navigation (MANDATORY)

**When creating or editing any HTML file that uses a slide deck (scroll-snap slides),** you MUST include the shared navigation script:

```html
<script src="[relative-path]/assets/js/deck-nav.js"></script>
```

Path examples by depth:
- Root level: `assets/js/deck-nav.js`
- 1 level deep (e.g. `context-grammar/`): `../assets/js/deck-nav.js`
- 2 levels deep (e.g. `presentation/projects/`): `../../assets/js/deck-nav.js`

**Required HTML structure:**
```html
<div id="deck" data-dark-slides="s1,s4,s6">
  <section class="slide" id="s1">...</section>
  <section class="slide" id="s2">...</section>
</div>
```

**What deck-nav.js provides automatically (do NOT implement these inline):**
- Spacebar / ArrowRight / ArrowDown / PageDown → next slide
- ArrowLeft / ArrowUp / PageUp → previous slide
- Home key → first slide
- On-screen prev/next arrows + slide counter (bottom right)
- Home button (top right)
- Progress dots (right rail)
- Spacebar hint (bottom center, auto-dismisses)
- Dark/light theme auto-detection per slide
- Scroll reveal (IntersectionObserver on `.reveal` elements)
- Free-scroll transition for post-deck `#explore` section

**For sub-state animations within a slide** (e.g. brain layer reveal), use the callback:
```js
window.deckNavBeforeAdvance = function(slide, index) {
  // return false to consume the advance (stay on slide, do internal animation)
  // return true to proceed to next slide
};
```

**Do NOT create inline spacebar hints, slide counters, progress dots, or keyboard handlers.** Use deck-nav.js for all of these.

## Code Review Process

When making changes to HTML/CSS/JS files, use **OpenAI Codex** for code review before finalizing. This ensures a second set of eyes catches issues that a single agent might miss — accessibility problems, CSS specificity conflicts, broken links, inconsistent design token usage, and cross-browser edge cases.

## Image Generation — kie.ai / NanoBanana 2 (MANDATORY)

### Overview

All concept illustrations are generated via the **kie.ai API** using the `nano-banana-2` model (powered by Gemini). Prompts are stored as `.md` (human-readable) and `.json` (API-ready) in `_Gem_instruction_for_Image/`.

### API Configuration

- **API Key**: stored in `../.env` as `KIE_API_KEY` (parent Portfolio directory)
- **Endpoint**: `https://api.kie.ai/api/v1/jobs/createTask` (POST)
- **Status polling**: `https://api.kie.ai/api/v1/jobs/recordInfo` (GET, `?taskId=...`)
- **Auth header**: `Authorization: Bearer {KIE_API_KEY}`

### Generation Script

Use the shared script at `../scripts/generate_kie.py`:

```bash
# From the Portfolio root directory:
python scripts/generate_kie.py <prompt.json> <output_file> [aspect_ratio]

# Example:
python scripts/generate_kie.py \
  intentfirst/_Gem_instruction_for_Image/full-circle-architecture.json \
  intentfirst/assets/img/full-circle-architecture.png
```

### JSON Prompt File Format

```json
{
  "style": "Isometric perspective, minimalist line art...",
  "composition": "Description of overall layout...",
  "element_1": "Detailed description of element...",
  "element_2": "...",
  "api_parameters": {
    "resolution": "4K",
    "aspect_ratio": "3:4",
    "output_format": "png"
  }
}
```

- All keys except `api_parameters` and `image_input` are serialized as the prompt string
- Use descriptive key names (e.g. `floor_1`, `exterior_elements`) for readability
- `image_input` (optional): array of image URLs for image-to-image transformation

### API Parameters

| Parameter | Options | Default |
|-----------|---------|---------|
| `resolution` | `1K`, `2K`, `4K` | `1K` |
| `aspect_ratio` | `auto`, `1:1`, `2:1`, `16:9`, `4:5`, `3:4` | `auto` |
| `output_format` | `jpg`, `png` | `jpg` |
| `google_search` | `true`, `false` | not set |

### Workflow

1. Write the prompt as `.md` in `_Gem_instruction_for_Image/` (human-readable reference)
2. Convert to `.json` format with `api_parameters` for the API call
3. Run `generate_kie.py` — script polls automatically (~60s typical, up to 4 min)
4. Output image is saved to the specified path
5. For high-resolution portfolio illustrations, always use `"resolution": "4K"` and `"output_format": "png"`

## Multi-Session Management (MANDATORY)

This project runs multiple Claude windows in parallel. Every session MUST follow this protocol.

### On Session Start (do this FIRST, before any work)

1. Read `PROJECT_ROADMAP.md` — understand overall context and priorities
2. Read `ACTIVE_SESSIONS.md` — see what other Claudes are doing, check file locks
3. Read any relevant `.claude/session-*.md` files for context
4. Create your own session file: `.claude/session-{YYYYMMDD-HHMMSS}-{task-slug}.md`
   - Copy from `.claude/SESSION_TEMPLATE.md`
5. Add yourself to `ACTIVE_SESSIONS.md` (append a row to the "Currently Running" table)

### During Work

- Update your `.claude/session-{id}.md` as you progress (Done / In Progress / Blocked)
- If you need to touch a file another session is using → stop and note it as Blocked

### On Session End (IMPORTANT)

1. Fill in the "Completion Report" section of your session file
2. **Update `PROJECT_ROADMAP.md`:**
   - Find the task(s) you completed
   - Change `[ ]` to `[x]` for each completed task
   - Save the file
3. **Update `ACTIVE_SESSIONS.md`:**
   - Move your row from "Currently Running" to "Completed Today"
   - Remove your file locks
   - Save the file

### About PROJECT_ROADMAP.md Edits

- **You CAN edit** ✅ — mark tasks as done, add discovered tasks
- **You SHOULD propose** 🤔 — big changes (delete task, re-prioritize, add new area)
- **No git required** — Takao can push changes whenever needed

### Dashboard

View real-time project status in a browser:
```bash
# From intentfirst/ directory:
python3 -m http.server 8080
# Then open: http://localhost:8080/dashboard/
```

Auto-refreshes every 10 seconds. Shows progress, active sessions, file locks, and next tasks.
