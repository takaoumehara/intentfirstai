> ⚠️ **SUPERSEDED** — This plan has been superseded by the Lean Model Migration (2026-05-27). The architecture is now 6 Stages + 2 Always-On Layers. See `HANDOFF.md` for the current state.

# Context Grammar Pipeline v2 — Design Spec

**Date:** 2026-05-24
**Author:** Takao Umehara (with Claude + ChatGPT triangulation)
**Status:** Approved for implementation planning (rev3 — all P0 locked)
**Related artifacts:**
- Thinking history: [`_private/_Brainstorming/00_new-thinking-intent-and-more.html`](../../../_private/_Brainstorming/00_new-thinking-intent-and-more.html)
- File-by-file change list: [`_private/_Brainstorming/00_change-list-intent-and-more.md`](../../../_private/_Brainstorming/00_change-list-intent-and-more.md)
- Theoretical brief: [`_private/_Brainstorming/00_thoughtson_intent-goal-job-etc.md`](../../../_private/_Brainstorming/00_thoughtson_intent-goal-job-etc.md)
- YAML rationale: [`_private/_Brainstorming/00_ChatGPT_why_YAML.md`](../../../_private/_Brainstorming/00_ChatGPT_why_YAML.md)
- JD strategy: [`_private/job-descriptions/portfolio-strategy.html`](../../../_private/job-descriptions/portfolio-strategy.html)

---

## 1. Purpose

Upgrade the Context Grammar framework from its current mechanism-centric Pipeline (Human → Intent → 6 Signals → 2 Dials → Rule Engine → AX Patterns) to a theory-complete **8-stage Decision Pipeline** with three Always-On Layers and a Decision Schema foundation.

The upgrade is driven by three converging signals:

1. **Theoretical maturity** — the brief surfaces concepts (Simultaneous Inference, Negotiation Layer, Risk/Confidence Evaluation, Latent Intent, Decision System framing) that the current site implements partially but does not name or foreground.
2. **Hiring fit** — 19 JDs analyzed reveal recurring needs (agentic OS interaction models, confidence visibility, agentic workflows, machine-readable architectures, multimodal calm tech, speculative future-state) that the upgraded framework addresses directly through named primitives.
3. **Engineering credibility** — the current Context Grammar risks looking like a "sensor spec hairball" (claiming detection that hardware can't deliver). The Decision Schema reframing — every signal carries `source / confidence / fallback / readiness` — defangs this critique while staying speculative-friendly.

The purpose of this spec is to capture the locked architectural and copy decisions so a separate implementation plan can be written and executed.

## 2. Non-goals

- This spec does **not** rewrite the underlying Brain content (3 layers Identity / Learning / Now), Trust Design content (Disclosure × Autonomy, Temporal Arc), or the 23 AX Patterns themselves. These are well-formed assets that are reframed in placement and tagged with new metadata, not rewritten.
- This spec does **not** add new content domains (no Disposable Brain deep dive, no Family Graduated Archive expansion, no new project). Scope is the theory layer + a small set of new UI primitives.
- This spec does **not** describe implementation file-by-file detail. That belongs in the change list (already written) and in the implementation plan (writing-plans skill will produce it).
- This spec does **not** finalize the design of the Sprint 1 Negotiation Layer prototype (Interpretation Preview + Assumption Cards). Component-level UX design belongs in implementation.

## 3. Definitions (locked terminology)

| Term | Definition |
|---|---|
| **Context Grammar** | The whole framework. Brand name retained sitewide. |
| **Decision Pipeline** | The 8-stage flow from Inflow to Agentic Response. Public structural metaphor. Replaces the deprecated "Tower / Floor N" metaphor. |
| **Inflow** | Human Raw Expression. Enters the Pipeline but is not a numbered Stage. |
| **Stage 1–8** | Numbered Pipeline steps. See §4 below. |
| **Always-On Layer** | A concern that spans all Stages rather than living at one Stage. Three Always-On Layers: Brain, Trust Design, Negotiation Design. |
| **Intent v2** | The two-axis Intent model: Detection Channel × Awareness Depth. Replaces the prior 4-channel flat list. |
| **Detection Channel** | Axis 1 of Intent v2. Explicit + Implicit{Active, Passive, Ambient}. |
| **Awareness Depth** | Axis 2 of Intent v2. Stated / Inferred / Latent. Orthogonal to Detection. |
| **Latent Intent** | Awareness Depth value: an intent the user has not yet consciously formed. Must always go through the Negotiation Layer; never acted on directly. |
| **6 Situation Signals** | Public name for Floor 2 contents (Physical State, Cognitive Load, Social Exposure, Priority Weight, Form Factor, Feasibility). Never called "tokens" in public copy. |
| **2 Relationship Dials** | Public name for Autonomy Dial + Disclosure Dial. Distinct from Signals: Signals are read, Dials are set. |
| **Decision Schema** | The contract every Signal and Dial carries: `{value, source, confidence, user_confirmed, fallback_behavior, implementation_readiness}`. Six source types. Frames Context Grammar as a decision schema, not a sensor spec. |
| **Negotiation Gate** | Stage 5. Evaluates Confidence × Risk × Reversibility × Sensitivity. Takes a Proposed Action (with its Lifecycle Verb) and outputs a Risk Profile + Gate Decision (including `autonomy_ceiling` and `required_ui_primitive`). |
| **Autonomy Resolution** | Stage 6. Computes `Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)`. |
| **Autonomy Dial** | Trust axis: Suggest / Confirm / Notify / Auto. User-set preference. |
| **Agent Action Lifecycle** | Action axis: Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt. Describes what the agent is doing. Orthogonal to Autonomy Dial. |
| **Recommend** | The second Lifecycle verb. Renamed from brief's "Suggest" to avoid collision with Autonomy Stage "Suggest". |
| **Negotiation Layer** | Public name for the third Always-On Layer. UI primitives for moment-to-moment meaning alignment. EN: "Negotiation Layer". JP: "意味のすり合わせ層 / Negotiation Layer". Never "交渉" alone. |
| **Negotiation Design** | The discipline that owns the Negotiation Layer. Sits alongside Trust Design (both are Always-On Layers, but Trust = long-term/relational, Negotiation = moment-to-moment/semantic). |
| **Interpretation Architect** | Takao's public-facing positioning tag. Goes in Hero/Nav/About card label. JP: 「Agentic AI のための Interpretation Architect」. |
| **Decision System Architect** | Takao's deeper positioning, used in About body, interviews, and the 30-second pitch. Not on the Hero. |

**Banned terms (must not appear in public copy):**
- "Tower", "Floor N", "5-floor", "Five floor" — replaced by Pipeline / Always-On Layer / Stage.
- "Tokens", "Context Tokens", "8 Context Tokens" — replaced by Signals & Dials. The folder path `/tokens/` may remain temporarily as a legacy URL (see §10 redirect plan), but `<title>`, `<meta>`, OG, footer, body, headings, alt, ARIA must all use the new terms.
- "Intent becomes the interface" — replaced by "Intent is the entry point. Interpretation is the interface."
- "Synchro Rate" (already banned in CLAUDE.md, restated here).

## 4. The 8-stage Decision Pipeline

```
Inflow:  Human Raw Expression
         "最近太った。何かしなきゃ" — not a clean Intent

Stage 1: Intent v2
         Detection Channel × Awareness Depth
         Output: a structured Intent with channel, depth, proposition, raw_confidence

Stage 2: 6 Situation Signals
         Physical State / Cognitive Load / Social Exposure /
         Priority Weight / Form Factor / Feasibility
         Each signal is a Decision Schema record (§5)

Stage 3: 2 Relationship Dials
         Autonomy Dial / Disclosure Dial
         User-set preferences, also Decision Schema records

Stage 4: Rule Engine
         33 existing if/then design rules + 8 new Gate firing rules (R34–R41)
         Produces a Proposed Action with a Lifecycle Verb

Stage 5: Negotiation Gate                                    [NEW]
         Inputs: Intent v2, Signals, Dials, Brain snapshot,
                 Proposed Action (with Lifecycle Verb), Domain
         Evaluates: Confidence × Risk × Reversibility × Sensitivity
         Outputs: Risk Profile, Gate Decision {proceed | preview |
                  confirm | notify | block}, Autonomy Ceiling,
                  Required UI Primitive

Stage 6: Autonomy Resolution                                  [NEW]
         Final Autonomy = min(User Autonomy Setting,
                              Gate Autonomy Ceiling)

Stage 7: AX Patterns × Agent Action Lifecycle
         23 existing patterns, each tagged with primary Lifecycle Verb(s)
         Lifecycle verbs: Inform / Recommend / Plan / Prepare /
                          Act / Monitor / Adapt

Stage 8: Agentic Response
         Actual UI output, notification, side effect, external API call
```

**Always-On Layers span all 8 Stages:**

| Always-On Layer | Time horizon | Role |
|---|---|---|
| **Brain** (Memory & Learning State) | seconds–years | Referenced by every Stage as a Source; updated during Monitor/Adapt |
| **Trust Design** | weeks–years | Long-term relational trust (Disclosure × Autonomy, Temporal Arc) |
| **Negotiation Design** | seconds–minutes | Moment-to-moment meaning alignment (UI primitives below) |

**Mandatory note about Brain placement:**
> Brain is not a one-time step in the pipeline. It is a memory and learning state referenced throughout the pipeline, and updated during Monitor / Adapt.

## 5. Decision Schema (per Signal and per Dial)

Every Signal and Dial carries the same shape:

```yaml
signal_name:
  value: ...
  source: one of [explicit_user_input, system_state, behavioral_inference,
                  sensor_signal, organizational_data, memory_learned]
  confidence: 0.0–1.0
  user_confirmed: boolean
  fallback_behavior: string
  implementation_readiness: high | mid | low
```

**Core public message:**
> Context Grammar is not a sensor spec. It is a decision schema for making contextual AI judgments explicit, inspectable, and adjustable. It assumes partial signals, uncertain inference, user correction, and graceful fallback.

**Readiness baseline (defaults, per-user overridable):**

| Signal / Dial | Readiness | Primary Sources |
|---|---|---|
| Form Factor | HIGH | device / screen / OS |
| Calendar Context | HIGH | calendar permission |
| Time / Location | HIGH–MID | system permission |
| Social Exposure | MID–LOW | user input / meeting / location category |
| Physical State | MID–LOW | motion / posture / confirmation |
| Cognitive Load | LOW–MID | interaction pattern / task complexity / self-report |
| Priority Weight | MID | user preference / task type / toggle |
| Autonomy Dial | HIGH | user setting |
| Disclosure Dial | HIGH | user setting |

## 6. Intent v2 (Stage 1 specification)

**Two orthogonal axes:**

```
Detection Channel (Axis 1) — how did the intent surface?
├── Explicit Intent           user says / taps / types
└── Implicit Intent
    ├── Active                current action reveals it
    ├── Passive               pattern + moment reveals it
    └── Ambient               continuous background state

Awareness Depth (Axis 2) — how conscious is the intent?
├── Stated                    clearly known and expressed
├── Inferred                  readable from context
└── Latent                    emerging but not yet consciously formed
```

**Diagonal map (mostly the obvious diagonal, but the Latent column is the interesting frontier):**

| | Stated | Inferred | **Latent** |
|---|---|---|---|
| **Explicit** | "20-min timer" (majority) | rare | "I've been tired lately" → underlying need to redesign lifestyle |
| **Active Implicit** | rare | running gear on → going for a run | early-morning lights on → insomnia/anxiety signal |
| **Passive Implicit** | — | Friday 7pm pizza pattern | step count halved in 6 months → burnout precursor |
| **Ambient Implicit** | — | 11pm in bed reading → sleep mode | persistent family-dinner-time drift → relationship erosion |

**Core slogan (three lines, both languages):**

```
Implicit Intent is a function.
Latent Intent is a hypothesis.
Negotiation turns hypothesis into shared understanding.

Implicit Intent は関数である。
Latent Intent は仮説である。
Negotiation が仮説を共有理解に変える。
```

**Hard rule:** Latent Intent must always pass through the Negotiation Layer. It is never acted on directly, regardless of Gate confidence score.

## 7. Negotiation Gate (Stage 5 specification)

**Purpose:** before any action is taken, evaluate whether to proceed, ask, align, or block.

**Inputs (all required):**
- `intent`: Intent v2 object `{detection, awareness, proposition, raw_confidence}`
- `signals`: current 6 Signal values (with Decision Schema)
- `dials`: current 2 Dial values
- `brain`: relevant Brain snapshot (L1 / L2 / L3 slices)
- `proposed_action`: `{verb (Lifecycle), description, external_effect, reversibility}`
- `domain`: enum from §5 sensitivity table
- `current_autonomy`: enum Suggest | Confirm | Notify | Auto

**Evaluation variables:**

| Variable | Question |
|---|---|
| Confidence | How certain is the interpretation? |
| Risk | How bad is it if we get this wrong? |
| Reversibility | Can the action be undone? |
| Sensitivity | Is this a domain we should even touch? |

**Outputs (split into two records):**

```yaml
risk_profile:
  confidence: 0.0–1.0
  risk: low | medium | high
  reversibility: high | medium | low
  sensitivity: low | medium | medium_high | high
  domain: ...
  rationale: string

gate_decision:
  proceed: boolean
  ui_primitive: silent | confidence_signal | interpretation_preview |
                assumption_cards | escalate | block
  autonomy_ceiling: suggest | confirm | notify | auto
  rationale: string
```

**Sensitivity defaults (per-domain, per-user overridable):**

| Domain | Default Sensitivity |
|---|---|
| Health | HIGH |
| Finance | HIGH |
| Family Relationship | MEDIUM–HIGH |
| Work | MEDIUM |
| Schedule | MEDIUM |
| Entertainment | LOW |
| Information | LOW |

Per-user adjustments come from Disclosure Dial, Social Exposure, and Priority Weight.

**Firing rules (added to Rule Engine as R34–R41):**

```
R34: IF awareness = Latent               → Always negotiate as hypothesis
R35: IF sensitivity = HIGH               → Require at least lightweight confirmation
R36: IF risk = HIGH AND reversibility = LOW → Require explicit confirmation or escalation
R37: IF confidence < 0.4                 → Show Assumption Cards or ask clarification
R38: IF 0.4 ≤ confidence < 0.8           → Show Interpretation Preview
R39: IF confidence ≥ 0.8 AND risk = LOW AND reversibility = HIGH → Proceed quietly
R40: IF confidence ≥ 0.8 AND risk ≥ MEDIUM → Show Confidence Signal + confirm per autonomy
R41: IF user has previously corrected this pattern → Lower confidence by 0.2, negotiate earlier
```

## 8. Autonomy Resolution (Stage 6 specification)

**Core formula (the memorable equation of this whole framework):**

```
Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling)

Gate Autonomy Ceiling = f(
  action_lifecycle_verb,
  confidence,
  risk,
  reversibility,
  sensitivity,
  domain,
  social_exposure,
  prior_corrections
)
```

This formula makes "the user says Auto but this particular action gets Confirm because the Gate said so" expressible in one line. It is the core proof point that Agentic UX can be both calm and safe.

## 9. Agent Action Lifecycle (Stage 7 sub-section)

Seven verbs describing what the agent is doing at any moment. Orthogonal to the Autonomy Dial (which describes how much trust the user has granted).

```
Inform     present information
Recommend  offer an option   (renamed from brief's "Suggest" to avoid collision)
Plan       synthesize a multi-step approach
Prepare    stage / set up (do not commit)
Act        execute                           ← reversibility boundary
Monitor    watch outcomes
Adapt      adjust based on feedback
```

**Gate Matrix** (Negotiation Gate output, expressed as the UI requirement per Autonomy × Verb cell):

| User Autonomy | Inform | Recommend | Plan | Prepare | **Act** | Monitor | Adapt |
|---|---|---|---|---|---|---|---|
| Suggest | Silent | Silent | Preview | Preview | Confirm | Silent | Confirm |
| Confirm | Silent | Silent | OK | OK | Confirm | Silent | Preview |
| Notify | Silent | Silent | OK | OK | Notify* | OK | Notify |
| Auto | Silent | OK | OK | OK | OK* | OK | OK* |

*high-risk or irreversible cells get demoted by the Gate Ceiling regardless of user setting.

**AX Pattern tagging:** every existing AX Pattern gets a primary Lifecycle Verb tag (e.g., D1 Approval Gate → Prepare/Act; A7 Live Recomposition → Adapt; E1 Confidence Signal → Recommend/Plan).

## 10. Negotiation Layer (Always-On Layer 3, Sprint 1 prototype)

**Three new UI primitives** (Phase 1 scope = first two only):

| Primitive | What it does | Sprint |
|---|---|---|
| **Interpretation Preview** | Before acting, AI shows "this is what I understood" and asks to confirm | **Phase 1** |
| **Assumption Cards** | A short list of premises the AI is operating on; user can edit or remove cards | **Phase 1** |
| **Priority Toggle** | When two values conflict, user can re-rank in the moment | Phase 2 |

**Four reframed components** (sourced from existing AX Patterns, re-themed for the Negotiation Layer surface):

| Component | Source | Notes |
|---|---|---|
| Confidence Signal | E1 | Re-themed visual indicator |
| Reasoning Trace | X1 | Expanded for the Layer context |
| Interpretation Undo | new separation from E5 | Undoes meaning, not autonomy demotion |
| Trust Breach Recovery | E5 (kept) | Still about autonomy demotion |

**Naming:** English "Negotiation Layer". Japanese "意味のすり合わせ層 / Negotiation Layer" (always paired; never the standalone "交渉").

**Anti-pattern to call out:** firing the Negotiation Layer too often makes the AI annoying. The firing rules (R34–R41) and the Gate's confidence threshold are what prevent this. The Negotiation Layer page must document this guardrail explicitly.

## 11. Positioning

**Takao's public-facing tag (Hero / nav / About card label):**

```
EN: Interpretation Architect for agentic AI systems
JP: Agentic AI のための Interpretation Architect
```

**Takao's deeper positioning (About body / interview / 30-second pitch):**

```
EN: I design decision systems that govern how AI interprets context,
    negotiates meaning, and calibrates autonomy.

JP: AIが文脈をどう解釈し、意味をどうすり合わせ、どこまで自律的に動くかを
    決めるDecision Systemを設計する。
```

The deeper "Decision System Architect" tag is **not** placed on the Hero. The Hero stays product-shaped (see §12).

## 12. Hero copy

**EN:**

```
H1:  From human expression to agentic action.

Sub: Context Grammar is a decision pipeline for designing the space between
     what people mean and what AI does. It interprets intent, reads six
     situation signals, respects two relationship dials, passes risky actions
     through a Negotiation Gate, and resolves how much autonomy AI should
     have before it responds.
```

**JP:**

```
H1:  人間の表現から、AIエージェントの行動へ。

Sub: Context Grammarは、人が本当に意味していることと、AIが実際に行うこと
     のあいだを設計するDecision Pipelineです。Intentを解釈し、6つの
     Situation Signalsを読み、2つのRelationship Dialsを尊重し、リスクの
     ある行動をNegotiation Gateに通し、AIにどこまで任せるかを解決して
     から応答します。
```

Public copy stays product- and value-shaped. JD-language mapping is internal only.

## 13. URL and folder strategy

| Phase | Action |
|---|---|
| **Phase 1** | Remove "tokens" from all public copy (title, meta, OG, footer, body, headings, alt, ARIA). Keep the folder `/context-grammar-v3/tokens/` as a temporary legacy route. |
| **Phase 2** | Create canonical `/context-grammar-v3/signals-and-dials/`. Add `301 redirect` from `/tokens/`. Update `<link rel="canonical">`. Update internal links. |

Folder/filename `tokens.css` (design tokens for color/spacing/typography) is **not** in scope — it refers to design-system tokens, not Context Grammar Signals/Dials, and the industry uses that term unambiguously. No rename.

## 14. Implementation Sprint plan (handoff to writing-plans)

**Sprint 1 — public-shippable minimum:**

1. CLAUDE.md + `_my-understanding.md` updates (terminology, Pipeline rewrite, Decision Schema entry, Brain always-on-layer note)
2. Landing page Hero + 8-stage Pipeline SVG (EN + JP)
3. Intent v2 page (intent/index.html EN + JP) — new 2-axis model, 4×3 diagonal table, triple slogan
4. Signals & Dials page (current `tokens/index.html` EN + JP) — public label change, "How Signals and Dials Are Populated" section, Readiness Table, Decision Schema core message
5. Negotiation Gate new page (`negotiation-gate/index.html` EN + JP) — chapter outline from §7 of this spec
6. Negotiation Layer Phase 1 prototype — Interpretation Preview + Assumption Cards working demo
7. Specs page — "Why YAML?" + `negotiation-gate.yaml` + Decision Schema reframing of `context-tokens-spec.yaml`

**Sprint 2 — reinforcement:**

8. AX Patterns page — Lifecycle Verb tags + Agent Action Lifecycle section
9. Rule Engine page — Gate firing rules R34–R41
10. About page — Interpretation Architect label + Decision System Architect deeper paragraph
11. Japanese mirror full propagation

**Sprint 3 — extension:**

12. Negotiation Layer Phase 2 (Priority Toggle)
13. 301 redirect / canonical migration to `/signals-and-dials/`
14. Project pages: `Year: 2028–2030` tags + Lifecycle verb annotations
15. Simulator updates (yamashiro-tuesday, pipeline)

The implementation plan produced by writing-plans should respect these Sprint boundaries and the dependencies they imply (Sprint 1 #1 unblocks future sessions; Sprint 1 #4 is the most copy-heavy; Sprint 1 #6 is the only prototype-class engineering task).

## 15. Acceptance criteria

After Sprint 1 ships, the following must be true:

- A first-time visitor sees the new Hero (B + A combo) within 1 second of load.
- The Pipeline SVG shows 8 numbered stages plus an Inflow card; Brain appears as a horizontal band above/below the stages, not as a numbered stage.
- The Intent page shows the 2-axis model and the triple slogan; the prior "Intent becomes the interface" copy is gone.
- The Signals & Dials page shows the Readiness Table and the core "Context Grammar is not a sensor spec" message.
- The Negotiation Gate page renders, links from the Pipeline SVG, and shows the four-variable model plus the `Final Autonomy = min(...)` formula.
- The Negotiation Layer prototype lets a visitor type a sentence, see the AI's interpretation, edit at least one assumption card, and confirm or correct — all client-side, no backend.
- `grep -rn -E "Floor [0-9]|Tower|5階"` over `context-grammar-v3/ index.html ja/ CLAUDE.md` returns zero hits.
- `grep -rn -i "token"` over the same paths returns hits only in (a) folder paths, (b) design-system CSS filenames, (c) legacy spec YAML filenames, (d) explicit redirect/migration comments.
- CLAUDE.md naming table includes all rev3 LOCK rows from §3 of this spec.

## 16. Out-of-scope risks and what we accept

- **Risk:** by adding two new Stages (Negotiation Gate, Autonomy Resolution) and one new Always-On Layer, the framework becomes harder to skim in one breath. **Accepted** — the trade is worth it because the new Stages are precisely what JDs ask for and what the brief's theory required.
- **Risk:** the `tokens/` legacy folder may live alongside `signals-and-dials/` for some time. **Accepted** — Phase 2 redirects handle the migration; the public copy is already clean from Phase 1.
- **Risk:** the Sprint 1 prototype is client-side only and doesn't prove real AI inference. **Accepted** — the Decision Schema framing already concedes "this is a decision contract, not a sensor spec", so a scripted prototype matches the framing.
- **Risk:** Brain placement as Always-On Layer may surprise readers who memorized the old 5-floor Tower. **Accepted** — a one-line mandatory note in the Pipeline figure resolves this without revisiting the architecture.

## 17. Decision log (what we considered and rejected)

| Considered | Rejected because |
|---|---|
| Renaming "Context Grammar" to "Interpretation Architecture" sitewide | Existing brand equity across Substack + portfolio + JD strategy is too strong to disrupt |
| Adding "Latent Intent" as a 5th Detection Channel | Latent is awareness depth, not detection mechanism; it can emerge from any channel |
| Bundling Agent Action Lifecycle into the Autonomy Dial | Different axes (trust vs action type); collapsing loses both |
| Implementing all three Negotiation primitives in Phase 1 | Two is enough to prove the core claim; three at once splinters the demo narrative |
| Putting "Decision System Architect" on the Hero | Too abstract for first-touch; reserved for About body / interview where deeper framing is appropriate |
| Keeping "tokens" in title/meta/OG for SEO | LLM-token / design-token confusion outweighs the SEO gain; redirect strategy preserves discoverability |
| Renaming the `tokens/` folder in Phase 1 | URL changes ripple through nav / canonical / OG / external backlinks; defer to Phase 2 |
| Splitting Tower into Tower View + Pipeline View | The site has moved to Pipeline-only; reintroducing Tower as a parallel view fights that direction |

---

**End of spec.** Implementation planning continues in the writing-plans skill, which will produce a step-by-step plan grounded in the change list and respecting the Sprint boundaries above.
