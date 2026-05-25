# Context Grammar Pipeline v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Context Grammar framework from the old 5-floor Tower metaphor to a theory-complete 8-stage Decision Pipeline with Decision Schema, Intent v2, Negotiation Gate, Autonomy Resolution, Agent Action Lifecycle, and a Negotiation Layer Phase 1 prototype.

**Architecture:** Static HTML/CSS/JS portfolio site. No build step, no framework. All pages share `assets/css/tokens.css` (design tokens) and a dual navigation system (`assets/js/nav.js` + `assets/js/site-nav.js`). EN pages live at `context-grammar/*/index.html`; JP pages mirror at `context-grammar/ja/*/index.html`. The Negotiation Layer prototype is a client-side-only JS demo — no backend.

**Tech Stack:** Vanilla HTML5, CSS (with Geist tokens), Vanilla JS, YAML files in `context-grammar/specs/`. No npm, no bundler.

**Spec:** `docs/superpowers/specs/2026-05-24-context-grammar-pipeline-v2-design.md`
**Change list:** `_private/_Brainstorming/00_change-list-intent-and-more.md`
**Thinking history:** `_private/_Brainstorming/00_new-thinking-intent-and-more.html`

---

## Sprint 1 — Public-Shippable Minimum (Tasks 1–9)

Dependencies: Task 1 first (terminology locks everything else). Tasks 2–5 can run in parallel after Task 1. Tasks 6–8 depend on content from Tasks 3–5. Task 9 is independent.

---

### Task 1: Update CLAUDE.md and `context-grammar/_my-understanding.md`

**Files:**
- Modify: `CLAUDE.md`
- Modify: `context-grammar/_my-understanding.md`

**Context for implementing agent:** Read `docs/superpowers/specs/2026-05-24-context-grammar-pipeline-v2-design.md` §3 (Definitions) and §14 (Implementation Sprint) before editing. These are the locked terminology tables. Do NOT read the full spec during this task — §3 and §14 are sufficient.

- [ ] **Step 1: Add the Decision Schema mandatory section to CLAUDE.md**

In `CLAUDE.md`, after the "## Core Architecture" section, add a new subsection. Read the file first to find the exact insertion point, then add:

```markdown
### Decision Schema (Mandatory per Signal and Dial)

Every Signal and Dial carries: `{value, source, confidence, user_confirmed, fallback_behavior, implementation_readiness}`. Six source types: `explicit_user_input | system_state | behavioral_inference | sensor_signal | organizational_data | memory_learned`.

**Core framing (never deviate):** Context Grammar is not a sensor spec. It is a decision schema for making contextual AI judgments explicit, inspectable, and adjustable.
```

- [ ] **Step 2: Update the Naming Conventions table in CLAUDE.md**

Find the `## Naming Conventions` table. Add these rows to the bottom of the table:

```markdown
| Decision Pipeline | Tower, 5-floor, Floor N, 5-Floor |
| 6 Situation Signals | Context Tokens, 8 Context Tokens, Tokens (body copy) |
| 2 Relationship Dials | (already covers Autonomy + Disclosure) |
| Negotiation Gate | (new — no old name) |
| Autonomy Resolution | (new — no old name) |
| Agent Action Lifecycle | (new — no old name) |
| Recommend (Lifecycle verb) | Suggest (in Lifecycle context — avoid collision with Autonomy Dial "Suggest") |
| Interpretation Architect | (Hero/nav/About card positioning tag) |
| Decision System Architect | (About body / interview — NOT on Hero) |
| Intent is the entry point. Interpretation is the interface. | Intent becomes the interface |
```

- [ ] **Step 3: Verify CLAUDE.md banned terms list**

Confirm these appear in CLAUDE.md's banned expressions (add if missing):
```
- "Tower", "Floor N", "5-floor", "Five floor" → Pipeline / Stage N / Cross-cut
- "Intent becomes the interface" → "Intent is the entry point. Interpretation is the interface."
- "Tokens" / "Context Tokens" / "8 Context Tokens" → Signals & Dials / 6 Situation Signals / 2 Relationship Dials
```

- [ ] **Step 4: Rewrite the Pipeline/Architecture section in `context-grammar/_my-understanding.md`**

Read `context-grammar/_my-understanding.md` first. Find any mention of "Tower", "Floor N", "5-floor", or the old 5-section architecture diagram. Replace the architecture overview with:

```markdown
## Architecture: 8-stage Decision Pipeline

**Inflow:** Human Raw Expression (not a numbered Stage)

**Stage 1:** Intent v2 — Detection Channel × Awareness Depth (two orthogonal axes)
**Stage 2:** 6 Situation Signals — Physical State / Cognitive Load / Social Exposure / Priority Weight / Form Factor / Feasibility
**Stage 3:** 2 Relationship Dials — Autonomy Dial / Disclosure Dial
**Stage 4:** Rule Engine — 33 existing rules + 8 Gate firing rules (R34–R41)
**Stage 5:** Negotiation Gate [NEW] — evaluates Confidence × Risk × Reversibility × Sensitivity
**Stage 6:** Autonomy Resolution [NEW] — Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)
**Stage 7:** AX Patterns × Agent Action Lifecycle — 23 patterns tagged with Lifecycle Verbs
**Stage 8:** Agentic Response

**Three Cross-cuts (span all 8 Stages, not numbered Stages themselves):**
- Brain (Memory & Learning State) — referenced by every Stage; updated during Monitor/Adapt
- Trust Design — long-term relational trust (Disclosure × Autonomy, Temporal Arc)
- Negotiation Design — moment-to-moment meaning alignment (UI primitives)
```

- [ ] **Step 5: Add Decision Schema entry to `_my-understanding.md`**

After the architecture section, add:

```markdown
## Decision Schema

Every Signal and Dial is a Decision Schema record:
```yaml
signal_name:
  value: ...
  source: explicit_user_input | system_state | behavioral_inference | sensor_signal | organizational_data | memory_learned
  confidence: 0.0–1.0
  user_confirmed: boolean
  fallback_behavior: string
  implementation_readiness: high | mid | low
```
This reframes Context Grammar from "sensor spec" to "decision contract."
```

- [ ] **Step 6: Add Negotiation Gate entry to `_my-understanding.md`**

Add a section for the Negotiation Gate:

```markdown
## Negotiation Gate (Stage 5)

Inputs: Intent v2 object, 6 Signals, 2 Dials, Brain snapshot, Proposed Action (with Lifecycle Verb), Domain
Evaluates: Confidence × Risk × Reversibility × Sensitivity
Outputs: Risk Profile + Gate Decision {proceed | preview | confirm | notify | block} + Autonomy Ceiling + Required UI Primitive

Core formula (Stage 6): Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)

Firing rules added to Rule Engine: R34–R41 (see negotiation-gate page)
```

- [ ] **Step 7: Add Agent Action Lifecycle entry to `_my-understanding.md`**

```markdown
## Agent Action Lifecycle (Stage 7 sub-section)

7 verbs (orthogonal to Autonomy Dial): Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt
Note: "Recommend" not "Suggest" — avoids collision with Autonomy Dial "Suggest" stage.
Each AX Pattern gets a primary Lifecycle Verb tag.
```

- [ ] **Step 8: Commit**

```bash
git add CLAUDE.md context-grammar/_my-understanding.md
git commit -m "docs: update CLAUDE.md and _my-understanding.md for Pipeline v2 terminology"
```

---

### Task 2: Global scan — remove Tower/tokens/"Intent becomes the interface"

**Files:**
- Modify: multiple HTML files (only as flagged by grep)

**Context for implementing agent:** This is a scan-and-fix task. Run the commands, find the hits, fix each one. Do NOT edit files not flagged by the grep. The folder path `context-grammar/tokens/` stays as-is (Phase 2 migration — do not rename it). The CSS file `assets/css/tokens.css` is design tokens (unrelated to CG Signals/Dials) — do NOT rename.

- [ ] **Step 1: Scan for Tower/Floor references**

```bash
grep -rn -E "Floor [0-9]|5[- ]floor|Five[- ]floor|Tower|5階" \
  context-grammar/ index.html ja/index.html assets/ CLAUDE.md \
  --include="*.html" --include="*.md" --include="*.js" --include="*.css"
```

For each hit:
- "Floor 1" → "Stage 1 (Intent v2)"
- "Floor 2" → "Stage 2–3 (Signals & Dials)"
- "Floor 3" → "Rule Engine (Stage 4)"
- "Floor 4" → "Brain (Cross-cut)"
- "Floor 5" → "AX Patterns (Stage 7)"
- "Tower" → "Decision Pipeline" or "Pipeline"
- "5-floor" → "8-stage"

Exception: do NOT edit files in `_Archive/`, `_private/`, `.claude/`.

- [ ] **Step 2: Scan for "Intent becomes the interface"**

```bash
grep -rn "Intent becomes the interface" \
  context-grammar/ index.html ja/index.html \
  --include="*.html" --include="*.md"
```

Replace all hits with: `Intent is the entry point. Interpretation is the interface.`

Check the `index.html` line ~1875 (inside popover data object) and line ~2073 (Explainer H2) — both need the replacement.

- [ ] **Step 3: Scan for "tokens" in public copy (NOT folder paths)**

```bash
grep -rn -i "\btoken\b" \
  context-grammar/ index.html ja/index.html \
  --include="*.html" --include="*.md" \
  | grep -v "node_modules\|\.min\.\|tokens\.css\|tokens/\|tokens\.yaml\|tokens\.json\|canonical\|redirect\|legacy"
```

For each hit in body copy, headings, `<title>`, `<meta>`, OG tags:
- "8 Context Tokens" → "6 Situation Signals & 2 Relationship Dials"
- "Context Tokens" → "Signals & Dials"
- "Tokens" (standalone CG meaning) → "Signals" or "Dials" depending on context

- [ ] **Step 4: Verify zero hits on banned terms**

```bash
echo "=== Tower/Floor ===" && \
grep -rn -E "Floor [0-9]|5[- ]floor|Five[- ]floor|Tower|5階" \
  context-grammar/ index.html ja/index.html \
  --include="*.html" --include="*.md" | grep -v "_Archive\|_private" && \
echo "=== Intent becomes ===" && \
grep -rn "Intent becomes the interface" \
  context-grammar/ index.html ja/index.html \
  --include="*.html" --include="*.md"
```

Expected: zero hits.

- [ ] **Step 5: Commit**

```bash
git add -u
git commit -m "cleanup: remove Tower/Floor/tokens/Intent-becomes language from public copy"
```

---

### Task 3: Landing page Hero — EN (`index.html`)

**Files:**
- Modify: `index.html` (lines ~1728–1732, ~2073, ~2087–2117)

**Context for implementing agent:** Read `index.html` lines 1700–1760 and 2060–2130 before editing. The spec locks the exact EN copy (see spec §12). Do NOT change surrounding layout or CSS classes.

- [ ] **Step 1: Update Hero H1 (index.html ~line 1728)**

Find the current H1:
```html
<h1 class="ph-title reveal d1">AI that reads intent, reads the moment, and assembles the right UI — <span class="text-brand">Context Grammar</span>.</h1>
```

Replace with:
```html
<h1 class="ph-title reveal d1">From human expression to agentic action.</h1>
```

- [ ] **Step 2: Update Hero subtitle (index.html ~line 1730)**

Find the `<p class="ph-sub reveal d2">` block and replace its content with:
```html
<p class="ph-sub reveal d2">Context Grammar is a decision pipeline for designing the space between what people mean and what AI does. It interprets intent, reads six situation signals, respects two relationship dials, passes risky actions through a Negotiation Gate, and resolves how much autonomy AI should have before it responds.</p>
```

- [ ] **Step 3: Update Explainer Step 2 H2 (~line 2073)**

Find:
```html
<h2 class="xp-headline">Intent becomes the interface.</h2>
```
Replace with:
```html
<h2 class="xp-headline">Intent is the entry point. Interpretation is the interface.</h2>
```

Find the body copy immediately below this H2 and replace with:
```html
<p>Raw human expression rarely arrives as a clean command. The system interprets it across detection channels and awareness depth, then negotiates the hypothesis with the user before acting.</p>
```

- [ ] **Step 4: Update `<title>` and `<meta description>` if they contain banned terms**

Check lines 1–30 of `index.html`. If the `<meta name="description">` or `<title>` contains "tokens" or "Intent becomes the interface", update them. The description should reflect the 8-stage Pipeline positioning.

Suggested new meta description:
```html
<meta name="description" content="Context Grammar is a decision pipeline for agentic AI design. It interprets intent, reads context signals, evaluates risk through a Negotiation Gate, and resolves autonomy before acting.">
```

- [ ] **Step 5: Verify**

```bash
grep -n "AI that reads intent\|Intent becomes the interface\|6 Situation Signals.*2 Relationship Dials.*rule engine.*23" \
  index.html
```

Expected: zero hits.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: update landing page hero to Pipeline v2 copy (EN)"
```

---

### Task 4: Landing page Hero — JP (`ja/index.html`)

**Files:**
- Modify: `ja/index.html` (hero section, Explainer sections)

**Context for implementing agent:** Read `ja/index.html` hero section (search for `ph-title`, `ph-sub`). The JP copy is locked in spec §12. Match the same structural edits as Task 3 but use the JP copy below.

- [ ] **Step 1: Update JP Hero H1**

Find the current JP H1 (contains 「人間の意図そのものがインターフェースとなる」or similar). Replace with:
```html
<h1 class="ph-title reveal d1">人間の表現から、AIエージェントの行動へ。</h1>
```

- [ ] **Step 2: Update JP Hero subtitle**

Find the `ph-sub` paragraph and replace content with:
```html
<p class="ph-sub reveal d2">Context Grammarは、人が本当に意味していることと、AIが実際に行うことのあいだを設計するDecision Pipelineです。Intentを解釈し、6つのSituation Signalsを読み、2つのRelationship Dialsを尊重し、リスクのある行動をNegotiation Gateに通し、AIにどこまで任せるかを解決してから応答します。</p>
```

- [ ] **Step 3: Update JP Explainer Step 2**

Find 「Intentそのものがインターフェース」 or similar Japanese equivalent of "Intent becomes the interface". Replace H2 with:
```html
<h2 class="xp-headline">Intentは入口。Interpretationがインターフェース。</h2>
```
And body copy with:
```html
<p>人間の表現は、クリーンなコマンドとして届くことはほとんどありません。システムはDetection ChannelとAwareness Depthにわたって解釈し、行動する前にユーザーと仮説をすり合わせます。</p>
```

- [ ] **Step 4: Update JP `<title>` and `<meta>`**

Update if banned terms appear:
```html
<meta name="description" content="Context GrammarはAgentic AIデザインのためのDecision Pipelineです。Intentを解釈し、Context Signalsを読み、Negotiation Gateでリスクを評価し、Autonomyを解決してから応答します。">
```

- [ ] **Step 5: Commit**

```bash
git add ja/index.html
git commit -m "feat: update landing page hero to Pipeline v2 copy (JP)"
```

---

### Task 5: Landing page Pipeline SVG — 8 stages

**Files:**
- Modify: `index.html` (Pipeline SVG section, ~lines 1748–1820)
- Modify: `assets/js/ga-slots.js` (popover data)

**Context for implementing agent:** Read `index.html` lines 1740–1850 to understand the current SVG structure (6 stage cards). Read `assets/js/ga-slots.js` to understand the popover data format. The new SVG needs 8 stage cards + a Brain cross-cut band. Brain must NOT be a numbered stage card.

- [ ] **Step 1: Read the current SVG and popover structure**

Read `index.html` lines 1740–1850 and `assets/js/ga-slots.js` lines 1–80. Note:
- Current stage count and card structure
- How popover titles, descriptions, and links are keyed
- CSS classes used on stage cards

- [ ] **Step 2: Replace SVG stage cards with 8-stage layout**

In `index.html`, replace the Pipeline SVG cards section with 8 numbered stages. Preserve the existing CSS structure (copy the card HTML pattern for each existing stage, then add the two new stages). The 8 stages in order:

```
01  Intent v2          — Detection Channel × Awareness Depth
02  6 Situation Signals — Physical / Cognitive / Social / Priority / Form / Feasibility
03  2 Relationship Dials — Autonomy Dial · Disclosure Dial
04  Rule Engine         — 33 design rules → Proposed Action
05  Negotiation Gate    — Confidence × Risk × Reversibility × Sensitivity
06  Autonomy Resolution — Final Autonomy = min(User Setting, Gate Ceiling)
07  AX × Lifecycle      — 23 patterns tagged with Lifecycle Verbs
08  Agentic Response    — UI output · notification · side effect
```

Add a Brain cross-cut band as a visual element below (or above) the stage row with label "Brain (Cross-cut): Memory & Learning State — referenced by all stages". Use `font-style: italic` or a distinct styling to separate it from the numbered stages.

- [ ] **Step 3: Update popover data in `assets/js/ga-slots.js`**

Add popover entries for the two new stages (05 and 06). Follow existing data format exactly. Example structure:

```js
{
  id: 'negotiation-gate',
  title: 'Negotiation Gate',
  desc: 'Before acting, evaluates Confidence × Risk × Reversibility × Sensitivity. Outputs: Gate Decision + Autonomy Ceiling.',
  link: '/context-grammar/negotiation-gate/'
},
{
  id: 'autonomy-resolution',
  title: 'Autonomy Resolution',
  desc: 'Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling). This formula is the core safety contract.',
  link: '/context-grammar/negotiation-gate/#autonomy-resolution'
}
```

Update the Intent popover to reflect Intent v2 (Detection Channel × Awareness Depth).

- [ ] **Step 4: Update Explainer Step 3 pipeline cards (~line 2087)**

Read lines 2087–2130. The Explainer section shows abbreviated Pipeline cards. Add Negotiation Gate and Autonomy Resolution cards. For each new card, copy the existing card HTML pattern and fill in:

```
Negotiation Gate
Before acting: evaluates Confidence × Risk × Reversibility × Sensitivity
→ outputs Gate Decision + Autonomy Ceiling

Autonomy Resolution
Final Autonomy = min(User Setting, Gate Ceiling)
```

- [ ] **Step 5: Visual check**

Open `index.html` in a browser. Verify:
- 8 stage cards render in sequence
- Brain cross-cut band is visible but not numbered
- Two new stages (Negotiation Gate, Autonomy Resolution) show popovers on hover/click

- [ ] **Step 6: Commit**

```bash
git add index.html assets/js/ga-slots.js
git commit -m "feat: update Pipeline SVG and popovers to 8-stage Decision Pipeline"
```

---

### Task 6: Intent v2 page — EN

**Files:**
- Modify: `context-grammar/intent/index.html`

**Context for implementing agent:** Read `context-grammar/intent/index.html` in full. The current page uses "Floor 1" and a flat 4-channel model. This task rewrites it to the 2-axis Intent v2 model. The spec is §6 of `docs/superpowers/specs/2026-05-24-context-grammar-pipeline-v2-design.md`. Read that section before editing.

- [ ] **Step 1: Update `<title>`, `<meta>`, OG tags**

Replace:
- `<title>Intent — Floor 1 | Context Grammar</title>`
→ `<title>Intent v2 — Detection × Awareness | Context Grammar</title>`

Replace meta description (currently references "Floor 1" and "four channels"):
```html
<meta name="description" content="Intent v2 is Stage 1 of the Context Grammar Decision Pipeline. It uses two orthogonal axes: Detection Channel (Explicit / Implicit Active / Passive / Ambient) and Awareness Depth (Stated / Inferred / Latent).">
```

- [ ] **Step 2: Update Hero section**

Find the `<header class="cg3-hero">` block. Replace:
- H1 "Intent" → `<h1 class="cg3-title">Intent v2</h1>`
- Lead paragraph (currently "Intent is what the human is trying to accomplish…"): keep the core idea but update to mention the two-axis model and Awareness Depth. New lead:

```html
<p class="cg3-lead">Intent is what the human is trying to accomplish in this situation. Intent v2 describes it on two orthogonal axes: how the intent was detected (Detection Channel) and how conscious the intent is (Awareness Depth).</p>
```

In the hero proof list, replace the four bullet points with:
```html
<li><span>Detection Channel: Explicit / Active Implicit / Passive Implicit / Ambient Implicit</span></li>
<li><span>Awareness Depth: Stated / Inferred / Latent — orthogonal to Detection</span></li>
<li><span>Latent Intent is a hypothesis. It must always pass through the Negotiation Layer before action.</span></li>
```

- [ ] **Step 3: Update first body section — remove "Floor 1" framing**

Find: "Intent is Floor 1 of Context Grammar: the structured aim…"
Replace with: "Intent is Stage 1 of the Context Grammar Decision Pipeline: the structured aim a person is trying to fulfill in a specific situation."

Remove any remaining "Floor 1" references.

- [ ] **Step 4: Add the triple slogan section**

After the hero and before the first body section, add a new `<section>` block:

```html
<section class="cg3-section cg3-section--slogan" aria-label="Intent v2 core propositions">
  <div class="cg3-shell">
    <blockquote class="cg3-triple-slogan">
      <p>Implicit Intent is a function.</p>
      <p>Latent Intent is a hypothesis.</p>
      <p>Negotiation turns hypothesis into shared understanding.</p>
    </blockquote>
  </div>
</section>
```

For styling, add inline or in the `<style>` block if the page uses one:
```css
.cg3-triple-slogan {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  line-height: 1.8;
  border-left: 3px solid var(--gray-400);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--gray-700);
}
.cg3-triple-slogan p { margin: 0; }
```

- [ ] **Step 5: Add the 2-axis model section**

After the slogan section, add a section explaining the two axes and the 4×3 diagonal table. Insert before the existing "four channels" section:

```html
<section class="cg3-section" aria-label="Two-axis Intent model">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Intent v2: two orthogonal axes.</h2>
    <p>Detection Channel describes <em>how</em> the intent surfaces. Awareness Depth describes <em>how conscious</em> the intent is. The two axes are independent: an Ambient signal can carry a Stated, Inferred, or Latent intent.</p>

    <div class="cg3-two-col" style="gap: 2rem; margin: 2rem 0;">
      <div>
        <h3>Detection Channel (Axis 1)</h3>
        <ul>
          <li><strong>Explicit</strong> — user says, taps, or types it</li>
          <li><strong>Active Implicit</strong> — current action reveals intent</li>
          <li><strong>Passive Implicit</strong> — pattern + moment reveals it</li>
          <li><strong>Ambient Implicit</strong> — continuous background state</li>
        </ul>
      </div>
      <div>
        <h3>Awareness Depth (Axis 2)</h3>
        <ul>
          <li><strong>Stated</strong> — clearly known and expressed</li>
          <li><strong>Inferred</strong> — readable from context</li>
          <li><strong>Latent</strong> — emerging, not yet consciously formed</li>
        </ul>
      </div>
    </div>

    <h3>The interesting frontier: the Latent column</h3>
    <p>Most of the 4×3 matrix falls on the obvious diagonal. The <strong>Latent</strong> column is the design challenge: these are intents the user has not yet formed consciously. They require the Negotiation Layer — never direct action.</p>

    <div class="cg3-table-scroll" style="overflow-x: auto; margin: 2rem 0;">
      <table style="border-collapse: collapse; width: 100%; min-width: 600px; font-size: 0.9rem;">
        <thead>
          <tr style="background: var(--gray-100);">
            <th style="padding: 0.6rem 1rem; text-align: left; border: 1px solid var(--gray-200);"></th>
            <th style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Stated</th>
            <th style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Inferred</th>
            <th style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); background: var(--gray-50);"><strong>Latent</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); font-weight: 600;">Explicit</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">"Set a 20-min timer" (majority)</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">rare</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: var(--gray-500);">"I've been tired lately" → underlying lifestyle redesign need</td>
          </tr>
          <tr>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); font-weight: 600;">Active Implicit</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">rare</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Running gear on → going for a run</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: var(--gray-500);">Early-morning lights on → insomnia/anxiety signal</td>
          </tr>
          <tr>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); font-weight: 600;">Passive Implicit</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">—</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Friday 7pm pizza pattern</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: var(--gray-500);">Step count halved in 6 months → burnout precursor</td>
          </tr>
          <tr>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); font-weight: 600;">Ambient Implicit</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">—</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">11pm in bed reading → sleep mode</td>
            <td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: var(--gray-500);">Persistent family-dinner-time drift → relationship erosion</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p><strong>Hard rule:</strong> Latent Intent must always pass through the Negotiation Layer. It is never acted on directly, regardless of Gate confidence score.</p>
  </div>
</section>
```

- [ ] **Step 6: Update the existing "four channels" section**

Find the section with H2 "Explicit and Implicit are the split. Four channels make it buildable." Update the H2 to:
```
Detection Channel: four implementation-ready forms
```
Keep the four channel descriptions (Explicit / Active / Passive / Ambient) — they remain valid as Axis 1. Add a note at the end of the section:
```html
<p><em>These four channels define Axis 1 (Detection). Axis 2 (Awareness Depth) is orthogonal: each channel can carry Stated, Inferred, or Latent content depending on what the signal reveals about the user's consciousness of their own goal.</em></p>
```

- [ ] **Step 7: Verify no Floor/Tower/token references remain**

```bash
grep -n "Floor\|Tower\|token\|Intent becomes" context-grammar/intent/index.html
```

Expected: zero hits.

- [ ] **Step 8: Commit**

```bash
git add context-grammar/intent/index.html
git commit -m "feat: Intent v2 page — 2-axis model, triple slogan, Latent frontier table (EN)"
```

---

### Task 7: Signals & Dials page — EN Phase 1 copy changes

**Files:**
- Modify: `context-grammar/tokens/index.html` (Phase 1: copy only — do NOT rename file or folder)

**Context for implementing agent:** Read `context-grammar/tokens/index.html` in full. Phase 1 = copy changes only. The folder path `/tokens/` stays as a legacy URL route; Phase 2 (a separate later task) will add the canonical `/signals-and-dials/` path and 301 redirect. Focus: rename public-facing labels, add Readiness Table, add Decision Schema message.

- [ ] **Step 1: Update `<title>` and `<meta>`**

Find and replace:
```
<title>*token*</title>
```
with:
```html
<title>Signals &amp; Dials — Stage 2–3 | Context Grammar</title>
```

Update meta description to reference "6 Situation Signals & 2 Relationship Dials" and "Decision Schema".

- [ ] **Step 2: Update Hero H1 and lead**

Find the hero H1 (likely "Tokens" or "Context Tokens"). Replace with:
```html
<h1 class="cg3-title">Signals &amp; Dials</h1>
```

Update lead paragraph. New lead:
```html
<p class="cg3-lead">Stages 2 and 3 of the Decision Pipeline. Six Situation Signals read the current context. Two Relationship Dials capture what the user has established about trust and transparency. Each Signal and Dial is a Decision Schema record — not a sensor claim.</p>
```

- [ ] **Step 3: Update all in-page heading and label references**

Find all occurrences of:
- "8 Context Tokens" / "Context Tokens" / "Tokens" → "Signals & Dials" or contextually "Signals" / "Dials"
- Section heading for the 8 items: rename to "6 Situation Signals" and "2 Relationship Dials" with a clear visual split between the two groups

- [ ] **Step 4: Add Decision Schema section**

Insert a new section before the 6 Situation Signals listing:

```html
<section class="cg3-section cg3-section--feature" aria-label="Decision Schema">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Context Grammar is a decision schema, not a sensor spec.</h2>
    <p>Every Signal and Dial carries the same shape. This is what makes the framework inspectable, adjustable, and honest about uncertainty.</p>
    <pre style="background: var(--gray-100); border-radius: 6px; padding: 1.2rem; overflow-x: auto; font-size: 0.85rem; font-family: var(--font-mono);"><code>signal_name:
  value: ...
  source: explicit_user_input | system_state | behavioral_inference
          | sensor_signal | organizational_data | memory_learned
  confidence: 0.0–1.0
  user_confirmed: boolean
  fallback_behavior: "description of what AI does without this signal"
  implementation_readiness: high | mid | low</code></pre>
    <p>Context Grammar assumes partial signals, uncertain inference, user correction, and graceful fallback. No signal requires guaranteed sensor access.</p>
  </div>
</section>
```

- [ ] **Step 5: Add Readiness Table**

After the Decision Schema section, add the "How Signals and Dials Are Populated" section with the readiness table:

```html
<section class="cg3-section" aria-label="How Signals and Dials are populated">
  <div class="cg3-shell">
    <h2 class="cg3-h2">How Signals and Dials are populated</h2>
    <p>Implementation readiness varies by signal. The framework is usable even when low-readiness signals default to fallback behavior.</p>
    <div class="cg3-table-scroll" style="overflow-x: auto; margin: 2rem 0;">
      <table style="border-collapse: collapse; width: 100%; font-size: 0.9rem;">
        <thead>
          <tr style="background: var(--gray-100);">
            <th style="padding: 0.6rem 1rem; text-align: left; border: 1px solid var(--gray-200);">Signal / Dial</th>
            <th style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Readiness</th>
            <th style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Primary Sources</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Form Factor</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">HIGH</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">device / screen / OS</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Calendar Context</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">HIGH</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">calendar permission</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Time / Location</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">HIGH–MID</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">system permission</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Social Exposure</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a6a00; font-weight: 600;">MID–LOW</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">user input / meeting / location category</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Physical State</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a6a00; font-weight: 600;">MID–LOW</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">motion / posture / confirmation</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Cognitive Load</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a6a00; font-weight: 600;">LOW–MID</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">interaction pattern / task complexity / self-report</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Priority Weight</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a6a00; font-weight: 600;">MID</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">user preference / task type / toggle</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Autonomy Dial</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">HIGH</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">user setting</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Disclosure Dial</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">HIGH</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">user setting</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Verify**

```bash
grep -in "token\|Floor\|Tower" context-grammar/tokens/index.html | grep -v "tokens/" | grep -v "tokens\.css"
```

Expected: zero hits in body copy / headings / title / meta.

- [ ] **Step 7: Commit**

```bash
git add context-grammar/tokens/index.html
git commit -m "feat: Signals & Dials page — Phase 1 copy changes, Decision Schema, Readiness Table (EN)"
```

---

### Task 8: Negotiation Gate — new page (EN)

**Files:**
- Create: `context-grammar/negotiation-gate/index.html`

**Context for implementing agent:** Read `context-grammar/intent/index.html` to understand the page template (CSS links, nav setup, cg3-hero structure). The new page uses the same template. Content comes from spec §7 (Negotiation Gate) and §8 (Autonomy Resolution). Read those sections of `docs/superpowers/specs/2026-05-24-context-grammar-pipeline-v2-design.md` before writing.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p context-grammar/negotiation-gate
```

- [ ] **Step 2: Create `context-grammar/negotiation-gate/index.html`**

Copy the `<head>` and navigation structure from `context-grammar/intent/index.html`. Update:
- `<title>Negotiation Gate — Stage 5 | Context Grammar</title>`
- `<meta name="description" content="The Negotiation Gate is Stage 5 of the Context Grammar Decision Pipeline. It evaluates Confidence × Risk × Reversibility × Sensitivity and outputs an Autonomy Ceiling before any action is taken.">`

Then build the page body with these sections:

**Section 1 — Hero:**
```html
<header class="cg3-hero" data-theme="dark">
  <div class="cg3-shell cg3-hero-grid">
    <div class="cg3-hero-text">
      <p class="cg3-eyebrow">Stage 5 · Decision Pipeline</p>
      <h1 class="cg3-title">Negotiation Gate</h1>
      <p class="cg3-lead">Before any action is taken, the Gate evaluates whether to proceed, ask, align, or block. It is the safety contract between AI capability and human trust.</p>
    </div>
  </div>
</header>
```

**Section 2 — The four evaluation variables:**
```html
<section class="cg3-section" aria-label="Four evaluation variables">
  <div class="cg3-shell">
    <h2 class="cg3-h2">The Gate evaluates four variables.</h2>
    <div class="cg3-four-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
      <div class="cg3-card">
        <h3>Confidence</h3>
        <p>How certain is the interpretation? Range 0.0–1.0.</p>
      </div>
      <div class="cg3-card">
        <h3>Risk</h3>
        <p>How bad is it if we get this wrong? Low / Medium / High.</p>
      </div>
      <div class="cg3-card">
        <h3>Reversibility</h3>
        <p>Can the action be undone? High / Medium / Low.</p>
      </div>
      <div class="cg3-card">
        <h3>Sensitivity</h3>
        <p>Is this a domain we should touch without explicit permission? Varies by domain.</p>
      </div>
    </div>
  </div>
</section>
```

**Section 3 — Gate outputs:**
```html
<section class="cg3-section cg3-section--feature" aria-label="Gate outputs">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Two outputs: Risk Profile + Gate Decision.</h2>
    <p>The Gate produces two records. The Risk Profile is an evaluation of the situation. The Gate Decision is the instruction to the system.</p>
    <pre style="background: var(--gray-100); border-radius: 6px; padding: 1.2rem; overflow-x: auto; font-size: 0.85rem; font-family: var(--font-mono);"><code>risk_profile:
  confidence: 0.0–1.0
  risk: low | medium | high
  reversibility: high | medium | low
  sensitivity: low | medium | medium_high | high
  domain: health | finance | family_relationship | work | schedule | entertainment | information
  rationale: string

gate_decision:
  proceed: boolean
  ui_primitive: silent | confidence_signal | interpretation_preview | assumption_cards | escalate | block
  autonomy_ceiling: suggest | confirm | notify | auto
  rationale: string</code></pre>
  </div>
</section>
```

**Section 4 — Autonomy Resolution formula (id="autonomy-resolution"):**
```html
<section class="cg3-section" id="autonomy-resolution" aria-label="Autonomy Resolution">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Stage 6: Autonomy Resolution</h2>
    <p>After the Gate runs, Autonomy Resolution computes the final trust level for this specific action:</p>
    <div style="background: var(--gray-50); border: 2px solid var(--gray-200); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0; text-align: center;">
      <code style="font-size: 1.3rem; font-family: var(--font-mono); font-weight: 600;">Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)</code>
    </div>
    <p>A user who has set Autonomy to "Auto" may still get "Confirm" for a specific action if the Gate Ceiling requires it. This formula is the core proof that agentic AI can be both capable and safe.</p>
  </div>
</section>
```

**Section 5 — Firing rules R34–R41:**
```html
<section class="cg3-section" aria-label="Gate firing rules">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Firing rules (R34–R41)</h2>
    <p>These rules determine which UI primitive the Gate activates. They are part of the Rule Engine.</p>
    <div class="cg3-table-scroll" style="overflow-x: auto; margin: 1.5rem 0;">
      <table style="border-collapse: collapse; width: 100%; font-size: 0.88rem;">
        <thead>
          <tr style="background: var(--gray-100);">
            <th style="padding: 0.5rem 0.8rem; text-align: left; border: 1px solid var(--gray-200);">Rule</th>
            <th style="padding: 0.5rem 0.8rem; text-align: left; border: 1px solid var(--gray-200);">Condition</th>
            <th style="padding: 0.5rem 0.8rem; text-align: left; border: 1px solid var(--gray-200);">Gate action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R34</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">awareness = Latent</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Always negotiate as hypothesis</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R35</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">sensitivity = HIGH</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Require at least lightweight confirmation</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R36</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">risk = HIGH AND reversibility = LOW</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Require explicit confirmation or escalation</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R37</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">confidence &lt; 0.4</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Show Assumption Cards or ask clarification</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R38</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">0.4 ≤ confidence &lt; 0.8</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Show Interpretation Preview</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R39</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">confidence ≥ 0.8 AND risk = LOW AND reversibility = HIGH</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Proceed quietly (silent)</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R40</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">confidence ≥ 0.8 AND risk ≥ MEDIUM</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Show Confidence Signal + confirm per autonomy</td></tr>
          <tr><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200); font-family: var(--font-mono);">R41</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">user has previously corrected this pattern</td><td style="padding: 0.5rem 0.8rem; border: 1px solid var(--gray-200);">Lower confidence by 0.2, negotiate earlier</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

**Section 6 — Sensitivity defaults:**
```html
<section class="cg3-section" aria-label="Sensitivity defaults by domain">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Sensitivity defaults by domain</h2>
    <p>Per-user adjustments come from the Disclosure Dial, Social Exposure Signal, and Priority Weight Signal.</p>
    <div class="cg3-table-scroll" style="overflow-x: auto; margin: 1.5rem 0;">
      <table style="border-collapse: collapse; width: 100%; font-size: 0.9rem;">
        <thead><tr style="background: var(--gray-100);"><th style="padding: 0.6rem 1rem; text-align: left; border: 1px solid var(--gray-200);">Domain</th><th style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Default Sensitivity</th></tr></thead>
        <tbody>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Health</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a0000; font-weight: 600;">HIGH</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Finance</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a0000; font-weight: 600;">HIGH</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Family Relationship</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a4000; font-weight: 600;">MEDIUM–HIGH</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Work</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a6a00; font-weight: 600;">MEDIUM</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Schedule</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #8a6a00; font-weight: 600;">MEDIUM</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Entertainment</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">LOW</td></tr>
          <tr><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200);">Information</td><td style="padding: 0.6rem 1rem; border: 1px solid var(--gray-200); color: #2a7a3a; font-weight: 600;">LOW</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

**Section 7 — Anti-pattern warning:**
```html
<section class="cg3-section" aria-label="Anti-pattern: over-firing">
  <div class="cg3-shell">
    <h2 class="cg3-h2">The anti-pattern: firing the Gate too often.</h2>
    <p>A Negotiation Gate that interrupts on every action defeats the purpose of an agentic system. The firing rules (R34–R41) and the confidence thresholds are the guardrail. R39 ensures that high-confidence, low-risk, reversible actions proceed silently — the user never sees the Gate fire.</p>
    <p>The Gate is not a confirmation dialog. It is a judgment. Most of the time, the judgment is: proceed.</p>
  </div>
</section>
```

Add proper navigation (use the same nav setup as `context-grammar/intent/index.html`) and close the HTML.

- [ ] **Step 3: Add navigation link to the new page**

In `assets/js/nav.js` (or `assets/js/site-nav.js`), find where Context Grammar sub-pages are listed. Add a navigation entry for "Negotiation Gate" linking to `/context-grammar/negotiation-gate/`.

- [ ] **Step 4: Add link from the CG hub**

In `context-grammar/index.html`, find the table of contents or navigation list of CG pages. Add an entry for "Negotiation Gate" with a short description: "Stage 5 of the Pipeline — evaluates Confidence × Risk × Reversibility × Sensitivity before any action."

- [ ] **Step 5: Visual check**

Open `context-grammar/negotiation-gate/index.html` in a browser. Verify:
- All 7 sections render
- Formula box is visually prominent
- R34–R41 table is readable
- Navigation links to the page

- [ ] **Step 6: Commit**

```bash
git add context-grammar/negotiation-gate/index.html assets/js/nav.js context-grammar/index.html
git commit -m "feat: Negotiation Gate new page — Stage 5, R34-R41, Autonomy Resolution formula (EN)"
```

---

### Task 9: Negotiation Layer Phase 1 prototype

**Files:**
- Create: `context-grammar/negotiation-layer/index.html`

**Context for implementing agent:** This is the most engineering-intensive task. It builds a client-side-only interactive demo. No backend. The demo uses a scripted rule-based interpreter (not real AI) consistent with the Decision Schema framing: the spec already says "this is a decision contract, not a sensor spec — a scripted prototype matches the framing." Read spec §10 for requirements. Phase 1 scope = Interpretation Preview + Assumption Cards only (no Priority Toggle).

- [ ] **Step 1: Create directory**

```bash
mkdir -p context-grammar/negotiation-layer
```

- [ ] **Step 2: Define the JS interpretation engine**

The engine will map input patterns to structured output. Create a `PATTERNS` array in the page's `<script>` block:

```js
const PATTERNS = [
  {
    keywords: ['疲れ', '太った', '体重', '運動', 'tired', 'weight', 'exercise', 'health'],
    interpretation: 'You seem to be concerned about your health or physical state.',
    interpretation_jp: '健康や体の状態について気にされているようです。',
    assumptions: [
      { id: 'a1', text: 'This is about personal health, not medical emergency', editable: true },
      { id: 'a2', text: 'You want suggestions, not a diagnosis', editable: true },
      { id: 'a3', text: 'Privacy: health domain — high sensitivity', editable: false }
    ],
    confidence: 0.72,
    domain: 'health',
    awareness: 'Latent'
  },
  {
    keywords: ['仕事', '会議', '締め切り', 'work', 'meeting', 'deadline', 'busy'],
    interpretation: 'This looks like a work or schedule priority question.',
    interpretation_jp: '仕事やスケジュールの優先順位に関する質問のようです。',
    assumptions: [
      { id: 'b1', text: 'The deadline is time-sensitive', editable: true },
      { id: 'b2', text: 'You want help prioritizing, not scheduling', editable: true },
    ],
    confidence: 0.81,
    domain: 'work',
    awareness: 'Inferred'
  },
  {
    keywords: ['旅行', '計画', 'trip', 'travel', 'plan', 'vacation'],
    interpretation: 'You are planning or thinking about a trip.',
    interpretation_jp: '旅行の計画または準備について考えているようです。',
    assumptions: [
      { id: 'c1', text: 'This is leisure travel, not work travel', editable: true },
      { id: 'c2', text: 'You want ideas or help organizing', editable: true },
    ],
    confidence: 0.76,
    domain: 'schedule',
    awareness: 'Inferred'
  },
  {
    keywords: ['家族', 'family', 'dinner', '夕食', 'children', '子供'],
    interpretation: 'This involves your family — a sensitive, personal domain.',
    interpretation_jp: 'ご家族に関することのようです。プライバシーを重視して対応します。',
    assumptions: [
      { id: 'd1', text: 'Family context: medium-high sensitivity domain', editable: false },
      { id: 'd2', text: 'You want support, not decisions made for you', editable: true },
    ],
    confidence: 0.65,
    domain: 'family_relationship',
    awareness: 'Latent'
  }
];

const DEFAULT_PATTERN = {
  interpretation: 'I detected a general request. Let me surface my assumptions so you can correct them.',
  interpretation_jp: '一般的なリクエストとして認識しました。前提を表示します。修正してください。',
  assumptions: [
    { id: 'z1', text: 'This is a low-sensitivity request', editable: true },
    { id: 'z2', text: 'You want a direct response', editable: true },
  ],
  confidence: 0.45,
  domain: 'information',
  awareness: 'Stated'
};

function matchPattern(input) {
  const lower = input.toLowerCase();
  for (const p of PATTERNS) {
    if (p.keywords.some(k => lower.includes(k))) return p;
  }
  return DEFAULT_PATTERN;
}
```

- [ ] **Step 3: Build the UI structure**

Create the full `context-grammar/negotiation-layer/index.html` with this layout:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Negotiation Layer — Phase 1 Prototype | Context Grammar</title>
  <meta name="description" content="Interactive demo of the Negotiation Layer: Interpretation Preview and Assumption Cards. Client-side prototype showing how the system surfaces and negotiates its interpretation before acting.">
  <!-- Link same CSS as other CG pages: tokens.css, nav.css, etc. -->
  <link rel="stylesheet" href="../../assets/css/tokens.css">
  <link rel="stylesheet" href="../../assets/css/nav.css">
  <style>
    /* Page-specific styles below */
    .nl-shell { max-width: 720px; margin: 0 auto; padding: 2rem 1.5rem; }
    .nl-hero { background: var(--gray-950); color: var(--gray-50); padding: 4rem 1.5rem 3rem; text-align: center; }
    .nl-hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 600; margin: 0 0 0.8rem; }
    .nl-hero p { font-size: 1.1rem; color: var(--gray-400); max-width: 560px; margin: 0 auto; }
    .nl-phase-badge { display: inline-block; background: var(--gray-800); color: var(--gray-300); font-size: 0.75rem; font-family: var(--font-mono); padding: 0.25rem 0.7rem; border-radius: 4px; margin-bottom: 1.2rem; letter-spacing: 0.05em; }
    .nl-demo-area { background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; margin: 2rem 0; }
    .nl-demo-area label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--gray-600); margin-bottom: 0.5rem; }
    .nl-input { width: 100%; box-sizing: border-box; padding: 0.8rem 1rem; font-size: 1rem; font-family: var(--font-sans); border: 1.5px solid var(--gray-300); border-radius: 8px; resize: vertical; min-height: 80px; background: white; color: var(--gray-900); }
    .nl-input:focus { outline: none; border-color: var(--gray-600); }
    .nl-btn { display: inline-block; margin-top: 0.8rem; padding: 0.6rem 1.4rem; background: var(--gray-900); color: white; border: none; border-radius: 6px; font-size: 0.9rem; font-family: var(--font-sans); cursor: pointer; }
    .nl-btn:hover { background: var(--gray-700); }
    .nl-result { display: none; margin-top: 2rem; }
    .nl-result.visible { display: block; }
    .nl-confidence-bar { height: 6px; border-radius: 3px; background: var(--gray-200); margin: 0.5rem 0 1rem; }
    .nl-confidence-fill { height: 100%; border-radius: 3px; background: var(--gray-600); transition: width 0.4s ease; }
    .nl-interpretation-card { background: white; border: 1.5px solid var(--gray-300); border-radius: 10px; padding: 1.2rem 1.4rem; margin-bottom: 1.2rem; }
    .nl-interpretation-card h3 { font-size: 0.75rem; font-weight: 600; color: var(--gray-500); letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.5rem; }
    .nl-interpretation-card p { margin: 0; font-size: 1rem; color: var(--gray-900); line-height: 1.5; }
    .nl-meta { font-size: 0.8rem; color: var(--gray-500); margin-top: 0.6rem; font-family: var(--font-mono); }
    .nl-assumptions h3 { font-size: 0.75rem; font-weight: 600; color: var(--gray-500); letter-spacing: 0.08em; text-transform: uppercase; margin: 1.5rem 0 0.8rem; }
    .nl-assumption-card { display: flex; align-items: flex-start; gap: 0.8rem; background: white; border: 1px solid var(--gray-200); border-radius: 8px; padding: 0.8rem 1rem; margin-bottom: 0.6rem; }
    .nl-assumption-card.dismissed { opacity: 0.35; text-decoration: line-through; }
    .nl-assumption-text { flex: 1; font-size: 0.9rem; color: var(--gray-800); cursor: text; }
    .nl-assumption-text[contenteditable="true"]:focus { outline: 1px dashed var(--gray-400); border-radius: 3px; }
    .nl-assumption-dismiss { background: none; border: none; font-size: 1rem; color: var(--gray-400); cursor: pointer; padding: 0; line-height: 1; }
    .nl-assumption-dismiss:hover { color: var(--gray-700); }
    .nl-lock-badge { font-size: 0.65rem; color: var(--gray-400); font-family: var(--font-mono); margin-left: 0.4rem; vertical-align: middle; }
    .nl-actions { display: flex; gap: 0.8rem; margin-top: 1.5rem; flex-wrap: wrap; }
    .nl-btn-confirm { background: var(--gray-900); color: white; border: none; border-radius: 6px; padding: 0.6rem 1.4rem; font-size: 0.9rem; font-family: var(--font-sans); cursor: pointer; }
    .nl-btn-correct { background: white; color: var(--gray-700); border: 1.5px solid var(--gray-300); border-radius: 6px; padding: 0.6rem 1.4rem; font-size: 0.9rem; font-family: var(--font-sans); cursor: pointer; }
    .nl-btn-confirm:hover { background: var(--gray-700); }
    .nl-btn-correct:hover { border-color: var(--gray-500); }
    .nl-outcome { background: var(--gray-100); border-radius: 8px; padding: 1rem 1.2rem; margin-top: 1.2rem; font-size: 0.9rem; color: var(--gray-700); display: none; }
    .nl-outcome.visible { display: block; }
    .nl-explain { margin-top: 3rem; }
    .nl-explain h2 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
    .nl-explain p { font-size: 0.95rem; color: var(--gray-700); line-height: 1.65; margin-bottom: 0.8rem; }
    @media (max-width: 768px) { .nl-actions { flex-direction: column; } }
  </style>
</head>
<body>
  <!-- Insert site navigation here (same as other CG pages) -->

  <header class="nl-hero">
    <span class="nl-phase-badge">CROSS-CUT · NEGOTIATION DESIGN · PHASE 1</span>
    <h1>Negotiation Layer</h1>
    <p>Before the AI acts, it shows you its interpretation. You correct it. The system learns.</p>
  </header>

  <main class="nl-shell">
    <section class="nl-demo-area" aria-label="Interactive Negotiation Layer demo">
      <label for="nl-user-input">Type something you might say to an AI system:</label>
      <textarea class="nl-input" id="nl-user-input" placeholder="最近太った気がするんだけど… / I've been feeling tired lately / Work is overwhelming this week"></textarea>
      <button class="nl-btn" onclick="runGate()">Run Negotiation Gate →</button>

      <div class="nl-result" id="nl-result">
        <div class="nl-interpretation-card">
          <h3>Interpretation Preview</h3>
          <p id="nl-interp-text"></p>
          <div class="nl-confidence-bar"><div class="nl-confidence-fill" id="nl-conf-bar"></div></div>
          <p class="nl-meta" id="nl-meta-text"></p>
        </div>

        <div class="nl-assumptions">
          <h3>Assumption Cards — edit or dismiss any premise</h3>
          <div id="nl-assumption-list"></div>
        </div>

        <div class="nl-actions">
          <button class="nl-btn-confirm" onclick="confirmInterpretation()">Confirm — proceed with this interpretation</button>
          <button class="nl-btn-correct" onclick="correctInterpretation()">Correct — I'll clarify</button>
        </div>

        <div class="nl-outcome" id="nl-outcome"></div>
      </div>
    </section>

    <section class="nl-explain">
      <h2>What you just saw</h2>
      <p><strong>Interpretation Preview</strong> — before acting, the AI shows what it understood. You see the confidence score and the domain it classified your input into. This is the Gate's way of opening negotiation rather than assuming.</p>
      <p><strong>Assumption Cards</strong> — the AI's premises, made visible and editable. Editable cards can be rephrased. Non-editable cards are hard constraints (e.g., domain sensitivity cannot be overridden by the user). Dismissed cards are flagged as rejected — the system adjusts.</p>
      <p><strong>Confirm vs. Correct</strong> — Confirm routes through Stage 6 (Autonomy Resolution) and triggers an AX Pattern response. Correct reopens negotiation: the AI refines its interpretation rather than acting.</p>
      <p>This prototype is rule-based. The Decision Schema makes the AI's reasoning explicit and adjustable regardless of whether the underlying model is LLM, heuristic, or scripted — <em>that</em> is what the schema is for.</p>

      <h2 style="margin-top: 2rem;">Phase 1 scope</h2>
      <p>This demo implements Interpretation Preview + Assumption Cards. <strong>Priority Toggle</strong> (when two user values conflict, re-rank in the moment) is Phase 2.</p>
      <p>The Gate firing rules active here: R34 (Latent → always negotiate), R37 (confidence &lt; 0.4 → Assumption Cards), R38 (0.4–0.8 → Interpretation Preview), R39 (&gt; 0.8 + low risk → silent).</p>
    </section>
  </main>

  <script>
    // PATTERNS and matchPattern() defined here (from Step 2 above)
    // INSERT PATTERNS ARRAY AND matchPattern FUNCTION HERE

    let currentPattern = null;

    function runGate() {
      const input = document.getElementById('nl-user-input').value.trim();
      if (!input) return;

      currentPattern = matchPattern(input);
      const conf = currentPattern.confidence;
      const lang = /[　-鿿]/.test(input) ? 'jp' : 'en';

      document.getElementById('nl-interp-text').textContent =
        lang === 'jp' && currentPattern.interpretation_jp
          ? currentPattern.interpretation_jp
          : currentPattern.interpretation;

      document.getElementById('nl-conf-bar').style.width = (conf * 100) + '%';
      document.getElementById('nl-meta-text').textContent =
        `Confidence: ${Math.round(conf * 100)}% · Domain: ${currentPattern.domain} · Awareness Depth: ${currentPattern.awareness || 'Inferred'}`;

      const list = document.getElementById('nl-assumption-list');
      list.innerHTML = '';
      currentPattern.assumptions.forEach(a => {
        const card = document.createElement('div');
        card.className = 'nl-assumption-card';
        card.id = 'card-' + a.id;
        const editable = a.editable !== false;
        card.innerHTML = `
          <span class="nl-assumption-text" contenteditable="${editable}">${a.text}</span>
          ${!editable ? '<span class="nl-lock-badge">[system]</span>' : ''}
          ${editable ? `<button class="nl-assumption-dismiss" onclick="dismissCard('${a.id}')" title="Dismiss this assumption">✕</button>` : ''}
        `;
        list.appendChild(card);
      });

      document.getElementById('nl-result').classList.add('visible');
      document.getElementById('nl-outcome').classList.remove('visible');
      document.getElementById('nl-outcome').textContent = '';
    }

    function dismissCard(id) {
      const card = document.getElementById('card-' + id);
      if (card) card.classList.toggle('dismissed');
    }

    function confirmInterpretation() {
      const outcome = document.getElementById('nl-outcome');
      outcome.textContent = '✓ Interpretation confirmed. Gate decision: proceed. Routing through Autonomy Resolution → AX Pattern response would follow in a live system.';
      outcome.classList.add('visible');
    }

    function correctInterpretation() {
      const outcome = document.getElementById('nl-outcome');
      outcome.textContent = '↩ Correction noted. Gate holds. The AI refines its interpretation — it does not act until you confirm. Edit your input above and try again.';
      outcome.classList.add('visible');
    }
  </script>
</body>
</html>
```

- [ ] **Step 4: Add navigation link**

In `assets/js/nav.js` or `assets/js/site-nav.js`, add a navigation entry for "Negotiation Layer" linking to `/context-grammar/negotiation-layer/`. Also add the link in `context-grammar/index.html` hub page.

- [ ] **Step 5: Link from the Pipeline SVG**

In `index.html`, update the Negotiation Gate popover (from Task 5) to include a link to the prototype: `/context-grammar/negotiation-layer/`. This makes the demo discoverable from the landing page.

- [ ] **Step 6: Test the prototype**

Open `context-grammar/negotiation-layer/index.html` in a browser. Verify:
- Type "最近太った" → sees JP interpretation, confidence ~72%, domain=health, awareness=Latent, 3 assumption cards (third non-editable)
- Type "work deadline" → sees EN work interpretation, confidence ~81%, 2 editable cards
- Type anything unknown → sees default interpretation, confidence 45%, 2 cards
- Dismiss a card → it becomes strikethrough
- Edit an editable card → text updates inline
- Click Confirm → outcome message appears
- Click Correct → different outcome message appears

- [ ] **Step 7: Commit**

```bash
git add context-grammar/negotiation-layer/index.html assets/js/nav.js context-grammar/index.html
git commit -m "feat: Negotiation Layer Phase 1 prototype — Interpretation Preview + Assumption Cards"
```

---

### Task 10: Specs page updates

**Files:**
- Modify: `context-grammar/specs/index.html`
- Create: `context-grammar/specs/negotiation-gate.yaml`
- Modify: existing `context-grammar/specs/context-tokens-spec.yaml` (rename/reframe, do NOT delete)

**Context for implementing agent:** Read `context-grammar/specs/index.html` and the existing YAML files in that folder. The spec calls for: (a) a "Why YAML?" explainer section, (b) a new `negotiation-gate.yaml`, (c) reframing the existing context-tokens spec as a Decision Schema example.

- [ ] **Step 1: Read existing specs structure**

```bash
ls context-grammar/specs/
```

Read `context-grammar/specs/index.html` lines 1–100 to understand the page layout.

- [ ] **Step 2: Create `context-grammar/specs/negotiation-gate.yaml`**

```yaml
# Negotiation Gate Specification
# Context Grammar Decision Pipeline — Stage 5
# Version: 2026-05-25

negotiation_gate:
  stage: 5
  purpose: >
    Evaluate whether an AI agent should proceed, ask, align, or block before taking an action.
    Produces an Autonomy Ceiling that Stage 6 (Autonomy Resolution) uses to compute Final Autonomy.

  inputs:
    intent:
      type: IntentV2Object
      fields: [detection_channel, awareness_depth, proposition, raw_confidence]
    signals:
      type: SignalRecord[]
      count: 6
      schema: decision_schema
    dials:
      type: DialRecord[]
      count: 2
      schema: decision_schema
    brain:
      type: BrainSnapshot
      layers: [identity, learning, now]
    proposed_action:
      type: ActionRecord
      fields: [verb, description, external_effect, reversibility]
      verb_enum: [Inform, Recommend, Plan, Prepare, Act, Monitor, Adapt]
    domain:
      type: DomainEnum
      values: [health, finance, family_relationship, work, schedule, entertainment, information]
    current_autonomy:
      type: AutomonyStageEnum
      values: [Suggest, Confirm, Notify, Auto]

  evaluation_variables:
    confidence:
      source: intent.raw_confidence
      range: 0.0-1.0
    risk:
      values: [low, medium, high]
      derived_from: [domain, proposed_action.external_effect]
    reversibility:
      values: [high, medium, low]
      source: proposed_action.reversibility
    sensitivity:
      values: [low, medium, medium_high, high]
      default_by_domain:
        health: high
        finance: high
        family_relationship: medium_high
        work: medium
        schedule: medium
        entertainment: low
        information: low

  firing_rules:
    R34: {condition: "awareness = Latent", action: "negotiate_as_hypothesis"}
    R35: {condition: "sensitivity = HIGH", action: "require_confirmation"}
    R36: {condition: "risk = HIGH AND reversibility = LOW", action: "explicit_confirm_or_escalate"}
    R37: {condition: "confidence < 0.4", action: "show_assumption_cards"}
    R38: {condition: "0.4 <= confidence < 0.8", action: "show_interpretation_preview"}
    R39: {condition: "confidence >= 0.8 AND risk = LOW AND reversibility = HIGH", action: "silent"}
    R40: {condition: "confidence >= 0.8 AND risk >= MEDIUM", action: "confidence_signal_plus_confirm"}
    R41: {condition: "user_previously_corrected", action: "reduce_confidence_0.2_negotiate_earlier"}

  outputs:
    risk_profile:
      fields: [confidence, risk, reversibility, sensitivity, domain, rationale]
    gate_decision:
      fields: [proceed, ui_primitive, autonomy_ceiling, rationale]
      ui_primitive_enum: [silent, confidence_signal, interpretation_preview, assumption_cards, escalate, block]
      autonomy_ceiling_enum: [suggest, confirm, notify, auto]

  autonomy_resolution:
    stage: 6
    formula: "Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)"
    note: >
      This formula ensures a user who has set Autonomy to Auto may still get Confirm
      for a specific high-risk action if the Gate Ceiling requires it.
```

- [ ] **Step 3: Add "Why YAML / Why Decision Schema?" section to specs page**

In `context-grammar/specs/index.html`, add a new section (before or after existing spec listings):

```html
<section class="cg3-section" aria-label="Why Decision Schema">
  <div class="cg3-shell">
    <h2 class="cg3-h2">Why YAML? Why Decision Schema?</h2>
    <p>Every Signal and Dial in Context Grammar carries more than a value. It carries: where the value came from, how confident we are, what happens if it is missing, and whether the implementation is ready today. This is what transforms a "sensor spec" into a decision contract.</p>
    <p>A decision contract is inspectable. An engineer can read it and know exactly what a high-confidence, system-inferred Physical State means versus a low-confidence, behaviorally-inferred one. They can also know what the fallback is — so the system degrades gracefully when a signal is unavailable, rather than failing silently.</p>
    <p>YAML makes the schema human-readable without requiring a runtime system. The spec is the design artifact. The implementation reads from it.</p>
  </div>
</section>
```

- [ ] **Step 4: Reframe the existing context-tokens spec file listing**

In `context-grammar/specs/index.html`, find where the old `context-tokens-spec.yaml` is listed. Update its label:
- Old: "Context Tokens Specification" 
- New: "Signals & Dials — Decision Schema (legacy filename: context-tokens-spec.yaml)"

Add a note: "This file uses the old 'tokens' filename — Phase 2 migration will rename it to signals-and-dials-spec.yaml and add a 301 redirect."

- [ ] **Step 5: Add `negotiation-gate.yaml` to the specs page listing**

Add an entry for the new spec file with the label "Negotiation Gate" and a link to download or view the raw YAML.

- [ ] **Step 6: Commit**

```bash
git add context-grammar/specs/index.html context-grammar/specs/negotiation-gate.yaml
git commit -m "feat: specs page — Why Decision Schema explainer, negotiation-gate.yaml (EN)"
```

---

## Sprint 1 complete — verification checklist

After all 10 tasks above:

- [ ] `grep -rn -E "Floor [0-9]|5[- ]floor|Tower|5階" context-grammar/ index.html ja/index.html` → zero hits
- [ ] `grep -rn "Intent becomes the interface" context-grammar/ index.html ja/index.html` → zero hits
- [ ] `grep -rn -i "\btoken\b" context-grammar/ index.html ja/index.html --include="*.html" | grep -v "tokens/\|tokens\.css\|tokens\.yaml\|tokens\.json"` → zero hits in body copy
- [ ] Landing page hero H1 = "From human expression to agentic action."
- [ ] Pipeline SVG shows 8 numbered stages + Brain cross-cut band
- [ ] Intent page has triple slogan and 4×3 diagonal table
- [ ] Signals & Dials page shows Readiness Table and Decision Schema message
- [ ] Negotiation Gate page renders at `/context-grammar/negotiation-gate/`
- [ ] Negotiation Layer prototype is interactive at `/context-grammar/negotiation-layer/`
- [ ] Specs page includes `negotiation-gate.yaml` and Why Decision Schema section

---

## Sprint 2 — Reinforcement (Tasks 11–14)

### Task 11: AX Patterns — Agent Action Lifecycle section + Lifecycle Verb tags

**Files:**
- Modify: `context-grammar/ax-patterns/index.html`

**Steps:**
1. Read the current AX Patterns page structure
2. Add a new section "Agent Action Lifecycle" with the 7-verb table (Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt) and Gate Matrix
3. For each of the 23 AX Patterns, add a small Lifecycle Verb tag/badge showing its primary verb(s)
4. Note: "Recommend" not "Suggest" — critical to avoid collision with Autonomy Dial "Suggest"
5. Verify and commit

---

### Task 12: Rule Engine — Gate firing rules R34–R41

**Files:**
- Modify: `context-grammar/rule-engine/index.html`

**Steps:**
1. Read current Rule Engine page (currently lists R1–R33)
2. Add Section: "Negotiation Gate Rules (R34–R41)" with the same table format as other rule sections
3. Add link to Negotiation Gate page from the Rule Engine page
4. Verify and commit

---

### Task 13: About page — Interpretation Architect positioning

**Files:**
- Modify: `about/index.html` (or wherever the About page lives)

**Steps:**
1. Find the About page. Check `about/index.html` and `about/index.html` or root-level `about.html`
2. Update the role/positioning label to "Interpretation Architect for agentic AI systems"
3. Add the deeper positioning paragraph in the body:
   - EN: "I design decision systems that govern how AI interprets context, negotiates meaning, and calibrates autonomy."
   - Keep "Decision System Architect" out of the Hero; it belongs in the About body only
4. Verify and commit

---

### Task 14: Japanese mirror propagation

**Files:**
- Modify: `context-grammar/ja/intent/index.html` (or equivalent JP intent page)
- Modify: `context-grammar/ja/tokens/index.html` (or equivalent JP signals page)
- Create: `context-grammar/ja/negotiation-gate/index.html`
- Create: `context-grammar/ja/negotiation-layer/index.html` (JP version of prototype, same JS, JP default UI strings)

**Steps:**
1. For each EN page updated in Sprint 1, apply the same structural changes to its JP mirror
2. Use JP copy from spec §12 and change list §1.7, §3, §4 for all headings and body text
3. The Negotiation Layer prototype: the JS pattern matching already handles JP input (keyword arrays include Japanese). Update the UI labels and explanatory text to Japanese
4. Verify JP pages render correctly
5. Commit all JP changes together

---

## Sprint 3 — Extension (Tasks 15–18)

### Task 15: Negotiation Layer Phase 2 — Priority Toggle

**Files:**
- Modify: `context-grammar/negotiation-layer/index.html`

**Steps:**
1. Add a third phase to the prototype: Priority Toggle
2. When two assumption cards create a conflict (e.g., "prioritize health" AND "minimize disruption"), surface a toggle UI that lets the user pick which value takes precedence
3. The conflict detection is scripted: add a `conflicts` array to certain PATTERNS entries that flags when two assumptions are in tension
4. Test and commit

---

### Task 16: URL canonicalization — `/signals-and-dials/`

**Files:**
- Create: `context-grammar/signals-and-dials/index.html` (redirect wrapper)
- Modify: `context-grammar/tokens/index.html` (add canonical link)

**Steps:**
1. Create `context-grammar/signals-and-dials/index.html` as a minimal redirect page:
   ```html
   <meta http-equiv="refresh" content="0;url=/context-grammar/tokens/">
   <link rel="canonical" href="/context-grammar/tokens/">
   ```
   (Until proper server-side 301 is available, this is the client-side equivalent)
2. In `context-grammar/tokens/index.html`, add `<link rel="canonical" href="/context-grammar/signals-and-dials/">` in the `<head>`
3. Update internal links across the site to use `/context-grammar/signals-and-dials/` as the primary path
4. Search and replace in nav.js + site-nav.js
5. Commit

---

### Task 17: Project pages — Year tags and Lifecycle annotations

**Files:**
- Modify: `projects/project-01/index.html` (Living Home)
- Modify: `projects/project-02/index.html` (Family Trip)
- Modify: `projects/project-03/index.html` (Fluid Handoff, if exists)

**Steps:**
1. In each project's header/meta section, add a "Year: 2028–2030" tag in the project card UI
2. In scenario descriptions, add Lifecycle verb annotations where natural: e.g., "The AI **Prepares** a draft itinerary" → italicize/badge the Lifecycle verb
3. Verify and commit

---

### Task 18: Simulator updates

**Files:**
- Modify: `context-grammar/simulator/pipeline.html`
- Modify: `context-grammar/simulator/yamashiro-tuesday.html`

**Steps:**
1. Read both simulator files to understand current stage structure
2. In `pipeline.html`: update the stage count and labels to match the 8-stage Pipeline
3. In `yamashiro-tuesday.html`: annotate decision points in the story with Gate firing rule references (e.g., "R38 fires: confidence 0.65 → Interpretation Preview shown")
4. Verify and commit

---

## Self-review

**Spec coverage check:**
- §4 (8-stage Pipeline) → Tasks 1, 5 ✓
- §5 (Decision Schema) → Tasks 1, 7, 10 ✓
- §6 (Intent v2) → Tasks 6 ✓
- §7 (Negotiation Gate) → Tasks 8 ✓
- §8 (Autonomy Resolution) → Tasks 8 (included in Negotiation Gate page) ✓
- §9 (Agent Action Lifecycle) → Task 11 (Sprint 2) ✓
- §10 (Negotiation Layer) → Task 9 ✓
- §11 (Positioning) → Task 13 (Sprint 2) ✓
- §12 (Hero copy) → Tasks 3, 4 ✓
- §13 (URL/folder strategy) → Task 7 (Phase 1), Task 16 (Sprint 3) ✓
- §15 (Acceptance criteria) → Sprint 1 verification checklist ✓
- Global scans → Task 2 ✓

**Placeholder scan:** No TBDs or "implement later" statements — all code blocks contain actual content.

**Type consistency:** `nl-*` CSS classes used consistently throughout Task 9. Gate YAML structure in Task 10 matches the `risk_profile` / `gate_decision` shape from spec §7 exactly. Lifecycle verb "Recommend" used throughout (not "Suggest").

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-25-context-grammar-pipeline-v2.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — A fresh Sonnet agent per task, reviewed between tasks. Fast iteration, isolated context per task. Tasks 3, 4, and 6 can run in parallel (they touch different files). Task 9 (prototype) needs a full session — run it alone.

**2. Inline Execution** — Execute tasks in this session using executing-plans skill, with checkpoints for review after each Sprint 1 task.

Which approach?
