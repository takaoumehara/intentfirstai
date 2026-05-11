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
| Context Tokens (Floor 2 label / page title) | Grammar (legacy — body-copy synonym only) |
| `context-grammar/tokens/` (folder path) | `context-grammar/grammar/` (renamed 2026-04-27) |
| AX Patterns (Floor 5) | Response, Output |
| Week 1 → Month 6 (P1 timeline) | Month 1 → Year 1 |
| Context Brain · Level 1 — Identity Layer | L1, Level 1, "Identity" alone |
| Context Brain · Level 2 — Learning Layer | L2, Level 2, "Accumulated" |
| Context Brain · Level 3 — Now Layer | L3, Level 3, "Right Now" alone |
| **Project 04: Enterprise Context Brain** | Project Atlas, Atlas (renamed 2026-04-29) |
| **Project Master Brain (PMB)** | Atlas, Project Atlas |
| **Intent Match** (EN) / **Intentとの一致度** (JP) | Intent Fidelity |
| **Learning Returns Home** | Ambient Absorption |

## Project 04 — Enterprise Context Brain Architecture (5 Brains, as of 2026-04-29)

P4 uses a 5-Brain model — the enterprise extension of P1's single Context Brain:

```
ENTERPRISE CONTEXT BRAIN  (umbrella · the company's whole memory system)
│
├─ Org Brain              全社の永続的な土台（組織図・ポリシー・用語集・歴史）
├─ Brand Brain × N        判断DNA（multi-brand 対応：B2C / B2B など並列インスタンス可）
├─ Research Brain         ユーザー理解 + 継続流入する外部データ（売上/サポート/CRM等）
├─ Project Master Brain   戦略を考える脳・プロジェクト群を統括し、新プロジェクトの起案を支援
│   └─ Project Brain × N  時限付き・各プロジェクトの実行
```

### Universal anatomy
Every Brain (including Project Brain) has the same 3-layer structure:
- **Identity Layer** — what doesn't change
- **Learning Layer** — what accumulates
- **Now Layer** — what's in flux right now

### Core principle
- **Layer** = universal memory anatomy. Present in every brain.
- **Brain** = a coherent memory entity owning 3 layers. Individual = 1 brain. Organization = many brains (distributed cognition).
- **Project Master Brain** is the orchestrator: reads Research signals × Brand constraints × Org capacity × past project patterns, supports the PO in deciding what to start/hold/kill, spawns Project Brains. Never auto-decides.

### Multi-Brand
A company can run multiple Brand Brain instances in parallel (B2C, B2B, regional brands). Brand Director oversees all instances; per-brand POs read their own.

### Five Brain Diagram (canonical name, 2026-04-30)
The animated SVG showing the 5-Brain hierarchy — Org foundation, Brand B2C / Brand B2B / Research as middle tier, Project Master Brain as the strategist, Project Brain (time-bound, with 3 inner layers) at top — is officially called the **Five Brain Diagram**. Use this name in code comments, alt text, captions, aria-labels, and any reader-facing reference.

- Component slot: `data-ga-slot="p4-brain-hierarchy"` → `brain-architecture` (in `assets/js/green-animation.js`)
- Highlight a specific brain via `data-highlight="org|brand|brand-b2c|brand-b2b|research|pmb|project"` — the highlighted brain pulses green and the others dim, marking "you are here" for the section
- The Five Brain Diagram is the canonical "you are here" wayfinding inside every Brain section (`#org-brain`, `#brand-brain`, `#research-brain`, `#project-master`, `#project-brain`). Do not use the legacy `brain-hierarchy-diagram-en.html` iframe in those sections — it has been replaced.

### P4 Cast (6 protagonists)
- **Priya** — B2C PO, 31, main protagonist
- **Maya** — Design Lead, 29, cross-brand
- **Dev** — Engineering Lead, 34, cross-brand
- **Leena** — Brand Director, 41, judgment for both brands
- **Kenji** — B2B PO, 35, cameo for cross-team / Ambient Awareness scenes
- **Arman** — incoming PO, 28, arrives 2029 (inheritance arc in CH 08)

## Background Color Semantics (P4 → to be globalized)

- **White / light bg** → User experience surfaces (what users actually see)
- **Black / dark bg** → Technical / Backstage explanations (Brain internals, API, schema, AI mechanics)
- **Warm Sand (`.section--feature`, `#f0e8d8`)** → Spotlight — a design concept or key decision that belongs to neither the user story nor the backstage. Used for PMB section, Intent Match scene, and other pivotal design moves. Class defined in each page `<style>` block; global rule lives in PORTFOLIO_GLOBAL_RULES.md §2.4.
- **Full-bleed photo** → Chapter dividers / emotional pivots

Formalized 2026-04-28 (memory ID 5853 / 5840). Warm Sand added 2026-04-30.

## Portfolio Global Rules (MANDATORY for every project)

**All cross-project rules live in [`Global_Assets/PORTFOLIO_GLOBAL_RULES.md`](Global_Assets/PORTFOLIO_GLOBAL_RULES.md)** — the complete rollout checklist for TOC Rail, UI taxonomy, device frames, canonical terms, content style, dividers, transparent backgrounds, viewport-wide animation embeds, and the per-project migration checklist.

**Contract**: before adapting P2, P3, or any future project to match P1's conventions, read that file. When a rule in this CLAUDE.md conflicts with it, the rules doc wins — update CLAUDE.md to match.

- **Chapter divider photos** are MANDATORY between every chapter — see PORTFOLIO_GLOBAL_RULES.md §6.5.
- **NEVER put a colored stroke / border on a rounded rectangle** — see PORTFOLIO_GLOBAL_RULES.md §9.5. Patterns like `border-top: 3px solid <color>` or `border-top-color` on a card with `border-radius` produce broken corner geometry. Use a colored chip / dot / full-height left bar instead. This is non-negotiable across every page, every UI screen, every animation.

## Canonical Terminology (MANDATORY)

**All terms live in [`Global_Assets/CONTEXT_GRAMMAR_TERMS.md`](Global_Assets/CONTEXT_GRAMMAR_TERMS.md)** — single source of truth for proper names, short definitions, and middle-school restaurant metaphors for every Context Grammar concept.

**Contract**:
- Before writing or editing any page that mentions Context Grammar concepts, read that file.
- When you rename, add, or re-scope a concept, update that file in the same pass.
- If a page contradicts the terms file, **the terms file wins** — fix the page.
- NEVER use abbreviations (`L1`, `L2`, `L3`, "Accumulated") in page copy, headings, or eyebrow labels. Always the full canonical name. Short forms are permitted ONLY once the parent concept ("Context Brain") is clearly established in the surrounding paragraph.

## UI Taxonomy (MANDATORY)

Every UI mockup in the portfolio must be clearly labeled as one of three kinds. Mixing them without a label is forbidden — the reader must always know what they are looking at.

| Kind | When to use | Framing |
|---|---|---|
| **User UI** | What the family / user actually sees | Real device frames — iPhone 15 Pro, iPad, fridge, CarPlay dashboard |
| **Concept Explainer** | For the reader/designer, not the user | `.bts-frame` with chip `CONCEPT · [topic]` (amber dot) |
| **Backstage** | AI internals — the user never sees this | `.bts-frame` (or `.bts-frame--dark`) with chip `BACKSTAGE · [topic]` (purple dot) |

**BACKSTAGE** is the canonical single word for "the AI is running, the user does not see this screen." Use it instead of longer variants like "Behind the Scenes — Context Brain — Now Layer". The chip text should be: `BACKSTAGE · [short topic]`. Never wordier.

Shared behind-the-scenes + concept-explainer CSS: [`assets/css/bts-frame.css`](assets/css/bts-frame.css) — linked from the page that uses it.

## Device Frames (MANDATORY — single source of truth)

**All device-frame rules live in [`Global_Assets/DEVICE_FRAME_STANDARD.md`](Global_Assets/DEVICE_FRAME_STANDARD.md)** — canonical iPhone 15 Pro / iPad / Samsung Family Hub components, the outer-page / inner-UI `?noframe=1` contract, forbidden patterns, and the per-file audit checklist.

**Contract:**
- Before creating or editing any UI mockup (phone, iPad, fridge, TV, watch, etc.) read that file.
- The outer portfolio page owns the frame (`.iphone15pro`, `.ipad11`, `.samfh`) — the inner UI-screen file is **content-only** when loaded via `?noframe=1`.
- No handrolled `.phone-frame` CSS, no `aspect-ratio: 9/19.5` wrappers, no studio-grey `#E8EAED` iframe backgrounds.
- Concept Explainer and Backstage views do NOT use device frames — they use `.bts-frame`.
- When renaming, adding, or removing a canonical frame, update the standard file in the same pass. The standard file wins when a page contradicts it.

Quick reference — iPhone 15 Pro:
```html
<link rel="stylesheet" href="[rel]/assets/css/device-frame-iphone.css">

<div class="iphone15pro iphone15pro--lg">
  <img class="iphone15pro__chrome"
       src="[rel]/Global_Assets/DeviceFrame/IPhone_15_Pro_Vector.svg"
       alt="" aria-hidden="true">
  <div class="iphone15pro__screen">
    <iframe src="[rel]/ui-screens/.../screen.html?noframe=1" ...></iframe>
  </div>
  <div class="iphone15pro__island" aria-hidden="true"></div>
</div>
```

## Scroll-Page Style = the Only Style (MANDATORY)

The portfolio has standardized on the **scroll-narrative** style (long single-page story, auto-play iframes for UI demos, TOC rail on the left). The older **slide-deck** style is retired.

**Rules**:
- Do NOT include links like `<a>Slide</a>` / `p1_presentation.html` in the top header of any project page. Remove them on sight.
- Do NOT write the word "scroll" in the UI (eyebrow text, buttons, labels). The reader can see they're scrolling — naming it is noise.
- Do NOT create new `*_presentation.html` files. If a slide-deck version is needed, discuss with Takao first.
- The TOC Rail (below) replaces all in-page navigation.

This applies to **every project** — P1, P2, P3, and any future additions.

## TOC Rail Navigation (MANDATORY on long scroll pages)

Shared chapter-based navigation for scroll pages across ALL projects:

- CSS: [`assets/css/toc-rail.css`](assets/css/toc-rail.css)
- JS: [`assets/js/toc-rail.js`](assets/js/toc-rail.js)

**Include pattern**:

```html
<link rel="stylesheet" href="[relative]/assets/css/toc-rail.css">

<script>
  window.TOC_RAIL = {
    panelTitle: 'Project 02 · Family Trip',
    chapters: [
      {
        num: '01', title: 'The Setup',
        sections: [
          { id: 'intro',    num: '01', label: 'Opening' },
          { id: 'problem',  num: '02', label: 'The problem today' }
          // optional: { ..., dark: true } for dark-themed sections
        ]
      },
      { num: '02', title: 'A Morning', sections: [ … ] }
    ]
  };
</script>
<script src="[relative]/assets/js/toc-rail.js" defer></script>
```

**Provides automatically**:
- Left-side vertical rail with chapter groups + section ticks
- Hover anywhere on the rail → slide-in panel with chapter titles + section numbers
- Active section/chapter detection via IntersectionObserver (scroll position)
- `T` key toggles panel · `Esc` closes · click-outside closes
- Auto dark theme on `dark: true` sections
- Mobile (≤768px): hidden (room-constrained)
- **Auto-prefixes every `.eyebrow` / `.pronoun-eyebrow` with its `CH XX · NN` chip** — numbering is derived from `TOC_RAIL` config, so editing the config propagates to both the TOC panel AND every in-page eyebrow. Never hand-write `CH 01 · 02` in a page's HTML; let the lib inject it.

**TOC/Page Title Unification Rule**: the `label` in `TOC_RAIL` config MUST describe the same thing as the section's `.eyebrow` + `h2.title` on the page. When you rewrite an h2 title in a page, update the TOC label in the same pass.

**Rules**:
- Use on every project's scroll page (P1, P2, P3, future P4/P5).
- Chapter/section numbers MUST be consistent with the narrative structure of the page.
- NEVER build a project-specific dotnav or second navigation — the TOC Rail is the only nav.
- To change behavior globally, edit ONLY `toc-rail.css` / `toc-rail.js` — propagates everywhere.

## Behind-the-Scenes / Concept Explainer Frame (MANDATORY for non-User UI)

Shared CSS class for UIs that are NOT what the user sees:

- CSS: [`assets/css/bts-frame.css`](assets/css/bts-frame.css)

**Usage**:

```html
<div class="bts-frame" data-kind="concept">
  <div class="bts-frame__chip">CONCEPT · Dynamic Friction</div>
  <div class="bts-frame__body">
    <!-- the explainer content -->
  </div>
</div>

<div class="bts-frame bts-frame--dark" data-kind="backstage">
  <div class="bts-frame__chip">BACKSTAGE · Now Layer</div>
  <div class="bts-frame__body">
    <!-- the AI internals view -->
  </div>
</div>
```

**Rules**:
- Thin dashed border, subtle background. NOT a device frame.
- Top-left mono chip declares `CONCEPT · …` or `BEHIND THE SCENES · …`.
- Dark variant (`.bts-frame--dark`) for "AI is thinking, user doesn't see" panels.
- Never mix this frame with an iPhone/iPad/CarPlay frame.
- To restyle globally, edit only `bts-frame.css` — propagates everywhere.

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

### Content Writing — STYLE_GUIDE is mandatory (MUST READ before writing any copy)

**Before writing or editing any prose, heading, caption, or lede in any portfolio file:**
1. Read [`Global_Assets/_Content_Writing_Guide/STYLE_GUIDE.md`](Global_Assets/_Content_Writing_Guide/STYLE_GUIDE.md)
2. Apply §1–§6 (universal) + §7 (Japanese-specific) before committing any text
3. Run the §4 checklist on every paragraph
4. Banned expressions in §5 + §7.8 + §7.9 are **non-negotiable** — remove on sight

**Key violations to catch** (from §7.9, added 2026-04-28):
- 「〜こそがデザインだ」/ 「自制こそがデザインだ」 → delete
- 三重否定の修辞 「〜でもなく、〜でもなく、ただ〜として。」 → 1事実に圧縮
- メタナラティブ クロージング 「どのバージョンが正しいかは重要ではない」 → delete
- Brain を否定的・無能に見せる表現 (「何も知らない」「データをゼロ保持」) → 何をしているかで書く
- TED/ポエム調 → Samsung/Google 製品ページ口調に

### Em-dash rule — single em-dash only (MANDATORY, all content, all languages)

- ✅ Use single em-dash: `—` (one character)
- ❌ NEVER use double em-dash: `——` (two consecutive em-dash characters)
- This applies to **every file in the portfolio** — HTML body copy, Markdown, captions, headlines, JSON prompts.
- Reason: `——` reads as broken typography, especially in Japanese where the em-dash already has more visual weight than English. One em-dash carries the same rhetorical pause without the typographic noise.
- When you encounter `——` while editing any file, **fix it on sight** — even if it's not in the section you're working on.
- Single source of truth: this rule. (Formalized 2026-04-29.)

### Copy Style — single unified doc (MANDATORY, all portfolio pages)

**Before writing or editing any heading, eyebrow, lede, caption, or body line, read** [`Global_Assets/COPY_STYLE_UNIFIED.md`](Global_Assets/COPY_STYLE_UNIFIED.md). It is the canonical source for:

- Heading stand-alone test (single-read comprehension)
- Anti-duplication rule (eyebrow ≠ heading ≠ lede ≠ caption)
- Skim-readability priority (headings carry the story alone)
- Direct copy — no clever metaphors (P1–P5, OVERVIEW)
- Restaurant scaffolding exception (`context-grammar/` pages only)
- Banned expressions table (English + Japanese)
- Per-page audit checklist

The two earlier docs — `COPY_STYLE_DIRECT.md` and `PAGE_REFACTOR_PROMPT.md` Phase 2 — are **superseded** by the unified doc. They remain as historical reference only. The em-dash rule above is independent and still applies.

Apply on sight: when you encounter clever / abstract / cute copy or duplicated heading-and-lede in any portfolio file, fix it on the spot — same protocol as the em-dash rule. Formalized 2026-05-01. Unified 2026-05-01.

### Editorial rule — Restaurant metaphors are scaffolding, not decoration

The Context Grammar pages target a **"中学生でも分かる" (understandable to a middle schooler)** reader. For that audience, the recurring restaurant/waiter/reservation-book metaphor is the **on-ramp** that lets abstract concepts (Tokens, Brain layers, Disclosure Dial, Trust Breach) land.

When auditing or editing prose:
- **DO cut prose redundancy** — two paragraphs that say the same conceptual thing in different words.
- **DO NOT cut metaphor scaffolding** — restaurant examples that ground an abstract concept with a concrete parallel. Cutting these speeds up reading for an expert but breaks comprehension for a first-encounter reader.
- A subagent that recommends "tighten this metaphor" or "cut this restaurant aside" is optimizing for the wrong reader. Push back.
- See `context-grammar/_content-audit.md` "復元ログ" section for the case study.

### Restaurant metaphor icon — MANDATORY (added 2026-05-02)

Every `.restaurant-aside` block sitewide MUST display the canonical restaurant icon (`assets/img/icons/restaurant.svg`) next to its label, so the metaphor is recognizable on sight. This is enforced globally by [`assets/css/restaurant-aside.css`](assets/css/restaurant-aside.css) — link it in the page `<head>` and the icon attaches automatically to `.restaurant-aside-label::before`. Do NOT inline the SVG per-page. Full rule: [`Global_Assets/PORTFOLIO_GLOBAL_RULES.md`](Global_Assets/PORTFOLIO_GLOBAL_RULES.md) §9.6.

### Knowledge base — `_my-understanding.md` is the source of truth

The file **`context-grammar/_my-understanding.md`** is Claude's structured understanding of the entire Context Grammar framework (5-floor architecture, 8 tokens, Brain, Rule Engine, 23 AX Patterns, Trust Design, Specs, key insights, factual rules). **It is the base reference for every Context Grammar judgment.**

**Required workflow for any Context Grammar–related change:**

1. **Before editing** a Context Grammar page (grammar/brain/trust-design/rule-engine/ax-patterns/specs/intent/ or the context-grammar landing page): read the relevant section of `_my-understanding.md` first to confirm the edit aligns with the framework as documented.
2. **When a concept is added, renamed, removed, or re-scoped** (e.g. a new AX Pattern, a renamed dial, a new principle, a changed factual claim): update `_my-understanding.md` in the same edit pass — do not leave the knowledge base out of sync with the pages.
3. **When Takao clarifies or corrects** something about Context Grammar in conversation: update `_my-understanding.md` immediately, including removing any item from the "私がまだ把握しきれていない部分" list that was just resolved.
4. **When starting a new session** on Context Grammar work: read `_my-understanding.md` first. Do not rebuild understanding from scratch.

The file has a "13. このドキュメントの使い方" section that restates this contract. Keep it in sync.

## Mobile Responsiveness (MANDATORY)

**Breakpoints — only these two are allowed for new code:**

- `@media (max-width: 768px)` — primary mobile/desktop pivot. Switches multi-column layouts to stacked, drops decorative chrome (TOC rail, scroll hints), tightens hero typography.
- `@media (max-width: 480px)` — small-phone fine-tuning (iPhone SE, Galaxy S22). Used only when the 768px rule doesn't fully fit a 375px viewport (e.g. 2x2 grids that need to drop to 1col, oversized titles).

**Above 768px**: do NOT add discrete breakpoints. Use `clamp()` for fluid type/padding and the global `--max-w: 1280px` content cap. The portfolio scales smoothly to 4K monitors via fluid sizing — extra breakpoints fragment the cascade.

**FORBIDDEN — do not introduce these values:**

- `@media (max-width: 720px)` — migrate to 768
- `@media (max-width: 760px)` — migrate to 768
- `@media (max-width: 820px)` — migrate to 768

(Component-specific breakpoints like 600/640/680/900 may stay if they serve a structural purpose at that exact width — e.g. a 4-col grid that needs to drop to 2-col before reaching the mobile pivot. Don't add new ones.)

### Hero pattern contract

- `.hero--split` (the shared CG subpage hero, defined in `assets/css/context-grammar.css`) MUST stack vertically at ≤768px. The shared rule already does this — pages should not redefine `flex-direction` on `.hero--split` in their inline `<style>`.
- Hero titles use `clamp()` with min ≥28px, max ≤76px. On mobile (≤768px) the min should drop to ~28-32px to keep text inside the viewport without `letter-spacing: -3px` looking harsh.
- Hero horizontal padding bottoms out at 16-20px on mobile (not 32+ px from desktop clamps).

### Per-page audit checklist

Before merging any new portfolio page, verify at 375px (Chrome DevTools → iPhone SE):

- No horizontal scroll
- All multi-column grids collapse to 1 col at ≤768px (or 2 col with 480px → 1 col fallback)
- Body text ≥15px, labels ≥12px, captions ≥13px
- Device frames don't overflow viewport (canonical frames in `assets/css/device-frame-*.css` already auto-cap to `calc(100vw - 32px)` on mobile — do not handroll size overrides)
- TOC rail hidden at ≤768px (automatic via `assets/css/toc-rail.css`)
- Hamburger nav appears at ≤768px (automatic via `assets/css/nav.css`)

### Verification command

To confirm no breakpoint regressions:

```bash
grep -rn "@media (max-width: \(720\|760\|820\)px)" \
  context-grammar/ projects/ ja/ assets/css/ \
  index.html *.html journal/ about/ applied/ industry/ contact/
# Should return zero hits.
```

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

## Design System — Vercel Geist (MANDATORY)

**Direction adopted 2026-04-21 (Migrated from legacy F-Dark). Based on https://vercel.com/geist/introduction**

| Reference | Contents |
|-----------|----------|
| [colors.md](docs/design-system/colors.md) | Vercel Geist neutral scales, semantic colors, forbidden colors |
| [typography.md](docs/design-system/typography.md) | Type scale, font weights, font CDN links |
| [layout.md](docs/design-system/layout.md) | Max-widths, section padding, illustration widths |
| [components.md](docs/design-system/components.md) | Hero, section, CTA, footer, part-banner HTML patterns |
| [illustrations.md](docs/design-system/illustrations.md) | ISO-GREEN image system, alt text rules |

### Quick Reference (critical rules only)

- Token file: `assets/css/tokens.css` (all pages must link this. Do NOT hardcode colors in local files).
- Shared components: `assets/css/components.css`
- Context Grammar section: `assets/css/context-grammar.css`
- Fonts: Geist / Geist Sans (`--font-sans`) + Geist Mono (`--font-mono`) — NOT Satoshi, Google Sans, DM Mono, Outfit
- UI Surfaces: Strictly rely on Geist neutral scale (`--gray-50` to `--gray-950`). Do not use custom hex grays.
- No gradient text on headings
- No rounded corners + color borders
- Minimum font size: 12px labels, 15px body text, 17px card body
- No single brand accent color; no Tailwind blue; no Material colors
- **Title > Subtitle > Body hierarchy** — the title must always be the largest text in a block, subtitle smaller than title but larger than body, eyebrow/mono label smallest. See [typography.md](docs/design-system/typography.md#title--subtitle-hierarchy-mandatory).
- **Section names must be `<h2>`, never eyebrow** — "Context Grammar", "Projects", "Journal" and any other section/category proper noun must be the large `h2`, NOT a tiny `ed-eyebrow`. The eyebrow pattern (tiny label → large headline) only works when the large headline is self-explanatory alone. When the tagline ("Seven entries. One framework.") depends on the section name to make sense, the section name is the headline. Putting a proper noun in an 11px eyebrow while a dependent tagline is 44px forces two-pass reading and breaks navigation clarity.

## Slide Layout System (MANDATORY)

**All slide decks share a single external CSS file.** Do NOT write inline layout styles.

```html
<link rel="stylesheet" href="[relative-path]/assets/css/slide-layouts.css">
<link rel="stylesheet" href="[relative-path]/assets/css/device-frames.css">
```

### Device Embeds — see `DEVICE_FRAME_STANDARD.md`

For any phone / iPad / fridge iframe, follow [`Global_Assets/DEVICE_FRAME_STANDARD.md`](Global_Assets/DEVICE_FRAME_STANDARD.md) — outer page owns the canonical frame, inner UI file is content-only via `?noframe=1`. The legacy `.device-embed--phone` / `.phone-embed` transparent sizer pattern (which relied on the INNER UI file drawing its own phone) is **deprecated** for new work and being migrated out of existing pages. Only `.device-embed--tv` remains valid while the TV canonical component is pending.

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

## Device Captions (MANDATORY — global rule for all project pages)

**Scene labels and captions go BELOW the device frame, never above.** Use the canonical `.ui-caption` pattern (globally styled in `tokens.css`) — see [`Global_Assets/PORTFOLIO_GLOBAL_RULES.md`](Global_Assets/PORTFOLIO_GLOBAL_RULES.md) §2 for the full UI taxonomy contract.

- Every UI iframe/embed gets a `<p class="ui-caption">` underneath with a `<span class="ui-caption__kind">` badge declaring **User UI · [surface]**, **Concept · [topic]**, or **Backstage · [topic]**.
- **NEVER use `.scene-tag`** (absolute-positioned chip above a device). Remove any existing `.scene-tag` elements when editing project pages.
- **Do NOT use the legacy `.device-caption`** — it was replaced by `.ui-caption` during the April 2026 migration. Any remaining `.device-caption` instances should be rewritten to the `.ui-caption` pattern.
- Applies to phone iframes, TV frames, tablet frames, and every other device embed across all scroll narrative and slide pages.

```html
<!-- Correct pattern -->
<div class="iphone15pro iphone15pro--lg">
  <img class="iphone15pro__chrome"
       src="../../Global_Assets/DeviceFrame/IPhone_15_Pro_Vector.svg"
       alt="" aria-hidden="true">
  <div class="iphone15pro__screen">
    <iframe src="../../ui-screens/.../screen.html?noframe=1" loading="lazy"></iframe>
  </div>
  <div class="iphone15pro__island" aria-hidden="true"></div>
</div>
<p class="ui-caption">
  <span class="ui-caption__kind">User UI · iPhone</span>
  Train swipe mode. Thumb-zone only. 08:15, one stop to London Bridge.
</p>

<!-- WRONG — do not do this -->
<span class="scene-tag">08:05 · Platform 12</span>  <!-- absolute-positioned above device -->
<div class="phone-embed phone-embed--lg">...</div>
```

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
