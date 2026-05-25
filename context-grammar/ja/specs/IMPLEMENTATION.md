# Context Grammar — Implementation Guide

**Spec version: 1.0.0** · License: CC BY 4.0 · Source: [intentfirst.ai](https://intentfirst.ai/context-grammar/specs/)

This is the practitioner's guide to implementing Context Grammar in your product. If you've read the framework pages and want to wire it into actual code, start here.

---

## What Context Grammar gives you

A complete token state evaluates to:

1. **Triggered AX Patterns** — which of the 23 named UI patterns should fire
2. **Design rules** — UI density, max choices, touch target size, content filter, notification level
3. **Substitution mode** — Exact / Flexible / Exploring / Surprise (when feasibility ≠ fully)
4. **Logical validity** — whether Autonomy Dial respects the Disclosure Dial ceiling
5. **Cross-token overrides** — hard rules (driving safety) and logical constraints

Input: 6 Situation Signals & 2 Relationship Dials (8 enums total). Output: a complete UI behavior contract.

---

## Files in this spec

| File | Purpose | Format |
|---|---|---|
| [`context-grammar.schema.json`](./context-grammar.schema.json) | JSON Schema for token state validation | JSON Schema 2020-12 |
| [`context-grammar.d.ts`](./context-grammar.d.ts) | TypeScript type definitions for the rule engine API | `.d.ts` |
| [`context-tokens-spec.yaml`](./context-tokens-spec.yaml) | Token values, signals, design rules, reality levels | YAML |
| [`ax-patterns-spec.yaml`](./ax-patterns-spec.yaml) | 23 AX Patterns with trigger conditions | YAML |
| [`design-rules.yaml`](./design-rules.yaml) | 40+ design rules from real projects | YAML |
| [`brain-schema.yaml`](./brain-schema.yaml) | 3-layer Brain memory architecture | YAML |

The reference implementation of the rule engine — `simulator.js` — lives at [`../simulator/simulator.js`](../simulator/simulator.js). It runs the same logic this guide describes.

---

## Quickstart — 5 minutes

### 1. Validate a token state (any language)

Use any JSON Schema validator with `context-grammar.schema.json`:

```ts
import { Validator } from 'jsonschema';
import schema from './context-grammar.schema.json';

const state = {
  physical_state: 'walking',
  cognitive_load: 'high',
  social_exposure: 'public',
  priority_weight: 'standard',
  form_factor: 'phone_handheld',
  feasibility: 'fully_feasible',
  autonomy_dial: 'confirm',
  disclosure_dial: 'moderate',
};

const v = new Validator();
const result = v.validate(state, schema);
console.log(result.valid); // true
```

### 2. Evaluate the rule engine

```ts
import { evaluateContextGrammar } from '@context-grammar/core'; // (Phase 3)

const result = evaluateContextGrammar(state);

console.log(result.triggered.map(p => p.id));
// → ['A2', 'A3', 'A4']  (Cognitive Scaling, Social-Aware Filtering, Disclosure Cascade)

console.log(result.designRules);
// → {
//     ui_density: 'low',
//     max_choices: 3,
//     touch_target: '≥ 64dp',
//     notification_level: 'normal',
//     content_filter: 'maximum (no personal info visible)',
//     ai_capability: 'suggest, confirm, notify',
//   }

console.log(result.autonomyValid); // true (moderate disclosure permits up to notify)
```

### 3. Render the patterns

Each triggered pattern has a `triggerHuman` and `example` field — render these directly, or use the pattern ID to look up your own UI implementation.

---

## Architecture — 4 layers

```
┌─────────────────────────────────────────────────────┐
│  YOUR APP                                           │
│  Provides: device sensors → token state             │
│  Consumes: pattern IDs → renders matching UI        │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  SIGNAL LAYER (your code)                           │
│  Reads device sensors / Brain state / AI confidence │
│  Produces a complete ContextState                   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  RULE ENGINE (this spec)                            │
│  evaluateContextGrammar(state) → EvaluationResult   │
│  Pattern matching + design rule synthesis           │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  RENDERER LAYER (your code)                         │
│  Maps pattern IDs to your component library         │
│  Applies design rules to layout/typography          │
└─────────────────────────────────────────────────────┘
```

---

## Signal layer — how to populate the tokens

| Token | What you read | Today vs Future |
|---|---|---|
| `physical_state` | iOS `CMMotionActivityManager` / Android Activity Recognition / CarPlay connection | **Today** |
| `cognitive_load` | Calendar density + time of day + Focus Mode + app-switching frequency. Composite estimation. | **Today (estimated)** |
| `social_exposure` | Privacy Display / Visual ID / Voice ID / BLE proximity / GPS context | **Today** |
| `priority_weight` | Calendar proximity + irreversibility classification + Gmail Priority Inbox / Apple Priority Notifications | **Today (per-domain)** |
| `form_factor` | Device hardware ID + AirPlay/Cast/DeX detection + fold angle sensor | **Today** |
| `feasibility` | Inventory APIs + maps/traffic + weather + calendar windows | **Today (per-domain)** |
| `autonomy_dial` | User setting + service default + AI proposal | **Today (manual)** |
| `disclosure_dial` | App permission grants + per-service opt-in (Google Connected Apps) | **Today (fragmented)** |

The full signal mapping with platform-specific APIs is in [`context-tokens-spec.yaml`](./context-tokens-spec.yaml) under each token's `signals` field.

---

## Rule engine — what it does

```
Input:  ContextState (6 signals + 2 dials)
        │
        ├─ Pattern matching
        │   For each of 23 patterns: run trigger predicate
        │   → triggered: AXPattern[]
        │
        ├─ Cross-token overrides
        │   Apply hard rules (driving) and logical caps
        │   → overrides: CrossTokenOverride[]
        │
        ├─ Substitution mode (if feasibility ≠ fully)
        │   Combine feasibility × autonomy × cognitive_load
        │   → substitution: 'Exact' | 'Flexible' | 'Exploring' | 'Surprise'
        │
        ├─ Design rule synthesis
        │   Combine relevant tokens → ui_density, max_choices, touch_target...
        │   → designRules: DesignRules
        │
        └─ Logical validity
            Check autonomy_dial respects disclosure_dial ceiling
            → autonomyValid: boolean
            → autonomyCeiling: AutonomyDial | null

Output: EvaluationResult
```

Reference implementation: [`../simulator/simulator.js`](../simulator/simulator.js)

---

## The Disclosure × Autonomy logical gate (CRITICAL)

This is the most important rule in the spec. It is not an opinion — it is a logical constraint:

> **AI cannot automate what it does not know about.**

Concretely, `autonomy_dial` is bounded by `disclosure_dial`:

| Disclosure | Max Autonomy | Why |
|---|---|---|
| `none` | (none — AI absent) | AI has no domain data; cannot suggest or act |
| `minimal` | `suggest` | Filter only — cannot confirm or auto-execute reliably |
| `moderate` | `notify` | Has enough context to act and report |
| `full` | `auto` | Has complete context — full automation viable |

If your code allows the user to set `autonomy_dial: 'auto'` while `disclosure_dial: 'minimal'`, you have a bug — the AI will make confident decisions on insufficient context.

Use `getAutonomyCeiling(disclosure)` from the API to enforce this.

---

## Pattern triggers — extended conditions

Some patterns require non-token conditions to actually fire. The rule engine returns these as "triggered" when token preconditions are met, and the `extended` field documents what additional signals are needed.

| Pattern | Token preconditions | Additional signal required |
|---|---|---|
| D2 Progressive Trust | `autonomy ∈ {confirm, notify}` | Brain L2: ≥ 5 consecutive successful approvals |
| D4 Omakase Mode | `autonomy = auto AND disclosure = full` | Brain L2: domain trust = high |
| E1 Confidence Signal | `social ≥ acquaintances` | AI model confidence ≤ 80% |
| E4 Ambiguity Escalation | `cognitive_load ≠ overloaded` | AI model confidence in 40–79% |
| E5 Trust Breach Recovery | `autonomy ≥ notify` | User reject/undo action |
| A6 Care Architecture | `cognitive_load ≤ moderate` | Brain L2: upcoming relational event |
| A8 Temporal Handoff | (none) | Disposable Brain lifecycle ends |

When you implement a pattern with extended conditions, gate the actual UI behind the token preconditions AND the extended signal.

---

## Versioning policy

Following the same forward-compatibility rules as `context-tokens-spec.yaml`:

- **Adding fields** to `ContextState` (new token) → minor version bump
- **Adding values** to existing token enum → minor version bump
- **Removing fields or enum values** → major version bump
- **Changing trigger logic** that flips fire/no-fire for valid states → major version bump
- **Adding/refining patterns** without changing existing triggers → minor version bump

Pin to `^1.0.0` for stable behavior; consume the latest minor for new patterns.

---

## What's next (roadmap)

- **Phase 3** — `@context-grammar/core` npm package shipping `evaluateContextGrammar()` plus reference engine
- **Phase 4** — React/SwiftUI/Kotlin bindings that map pattern IDs → your component library
- **Community** — open governance for adding new AX Patterns; PR template for trigger condition proposals

---

## Reference

- Live simulator: [`/context-grammar/simulator/`](../simulator/index.html) — runs the rule engine in your browser
- Pattern catalog (prose): [`/context-grammar/ax-patterns/`](../ax-patterns/index.html)
- Token catalog (prose): [`/context-grammar/tokens/`](../tokens/index.html)
- Brain architecture: [`/context-grammar/brain/`](../brain/index.html)

Questions, corrections, contributions: [github.com/intentfirst](https://github.com/intentfirst) (coming with Phase 3).
