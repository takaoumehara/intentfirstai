# @context-grammar/core

[![spec version](https://img.shields.io/badge/spec-1.0.0--alpha.1-blue)](https://intentfirst.ai/context-grammar/specs/) [![license](https://img.shields.io/badge/license-CC--BY--4.0-green)](./LICENSE)

Rule engine for **Context Grammar** — a design language for agentic AI products.

> **Input:** 8 enums describing the user's context.
> **Output:** which of 23 named UI patterns to fire, what design rules to apply, whether the AI is allowed to act, and how to substitute when reality breaks the plan.

Pure function. Zero dependencies. Runs in any JavaScript runtime.

---

## Install

```bash
npm install @context-grammar/core
```

## Use

```ts
import { evaluateContextGrammar, type ContextState } from '@context-grammar/core';

const state: ContextState = {
  physical_state: 'walking',
  cognitive_load: 'high',
  social_exposure: 'public',
  priority_weight: 'standard',
  form_factor: 'phone_handheld',
  feasibility: 'fully_feasible',
  autonomy_dial: 'confirm',
  disclosure_dial: 'moderate',
};

const result = evaluateContextGrammar(state);

console.log(result.triggered.map((p) => `${p.id} ${p.name}`));
//  → ['A2 Cognitive Scaling', 'A3 Social-Aware Filtering', 'A4 Disclosure Cascade', ...]

console.log(result.designRules.max_choices); // 3
console.log(result.designRules.content_filter); // 'maximum (no personal info visible)'
console.log(result.autonomyValid); // true
```

---

## What it does

Given a complete `ContextState`, the engine:

1. **Pattern matching** — runs 23 trigger predicates, returns the matching `AXPattern[]`
2. **Design rule synthesis** — combines tokens into UI density, max choices, touch target, content filter, notification level
3. **Substitution recommendation** — Exact / Flexible / Exploring / Surprise (when feasibility ≠ fully)
4. **Logical validity** — verifies `autonomy_dial` respects the `disclosure_dial` ceiling
5. **Cross-token overrides** — driving safety, cognitive overload, public privacy

All of it as one pure function: `evaluateContextGrammar(state)`.

## API

```ts
// Main entry point
evaluateContextGrammar(state: ContextState): EvaluationResult;

// Convenience helpers
getTriggeredPatterns(state: ContextState): AXPattern[];
recommendSubstitutionMode(state: ContextState): SubstitutionRecommendation | null;
getAutonomyCeiling(disclosure: DisclosureDial): AutonomyDial | null;
validateState(state: ContextState): { valid: boolean; violations: string[] };

// Catalogs
import { PATTERNS } from '@context-grammar/core/patterns';
import { TOKENS } from '@context-grammar/core/tokens';
```

## The Disclosure × Autonomy gate (read this)

This is the most important rule:

> **AI cannot automate what it does not know about.**

| Disclosure | Max Autonomy |
|---|---|
| `none` | (AI absent) |
| `minimal` | `suggest` |
| `moderate` | `notify` |
| `full` | `auto` |

If your code lets the user set `autonomy_dial: 'auto'` while `disclosure_dial: 'minimal'`, you have a bug. Use `validateState()` to catch it.

## Examples

See [`examples/`](./examples) for runnable scenarios:

- `commute.ts` — Public transit, public exposure, moderate disclosure
- `family-dinner.ts` — Fridge display, kids present, partial inventory → substitution
- `work-deep-focus.ts` — Auto autonomy + full disclosure → Omakase Mode

## Spec

The full specification, including YAML sources and a [live browser simulator](https://intentfirst.ai/context-grammar/simulator/), lives at:

**https://intentfirst.ai/context-grammar/**

- Token definitions: [`context-tokens-spec.yaml`](https://intentfirst.ai/context-grammar/specs/context-tokens-spec.yaml)
- Pattern definitions: [`ax-patterns-spec.yaml`](https://intentfirst.ai/context-grammar/specs/ax-patterns-spec.yaml)
- JSON Schema: [`context-grammar.schema.json`](https://intentfirst.ai/context-grammar/specs/context-grammar.schema.json)
- Implementation guide: [`IMPLEMENTATION.md`](https://intentfirst.ai/context-grammar/specs/IMPLEMENTATION.md)

## Versioning

Following the spec's forward-compatibility rules:

- **Adding tokens or enum values** → minor version bump
- **Removing tokens or values** → major version bump
- **Trigger logic changes that flip fire/no-fire** → major version bump
- **New patterns** → minor version bump

Pin to `^1` for stable behavior.

## Contributing

Pattern proposals, trigger refinements, and new signal sources are welcome. The framework is open governance.

Open an issue at [github.com/intentfirst/context-grammar](https://github.com/intentfirst/context-grammar) (coming with the v1.0.0 release).

## License

CC BY 4.0 — Use it. Build with it. Argue with it. Cite the spec.

Created by Takao Umehara — [intentfirst.ai](https://intentfirst.ai/about)
