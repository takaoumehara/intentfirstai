# Trust Page Plan + Negotiation Layer Redesign

**Date:** 2026-05-25
**Status:** Design proposal

---

## Part A: Trust Page — Conceptual Architecture

### The Problem

Currently:
- **Dials** (`/dials/`) = the UI mechanism (Disclosure × Autonomy dials, Suggest→Auto stages, Full→Hidden levels)
- **Trust** (`/trust/`) = nearly empty stub (3 sections, no substance)
- **Trust Design** (`/trust-design/`) = legacy duplicate of Dials page (should be deleted)

The user wants Trust to be a **larger concept** than Dials. Dials is the *mechanism*. Trust is the *relationship arc*.

### The Relationship

```
┌─────────────────────────────────────────────────────────┐
│                    TRUST (Cross-cut)                    │
│                                                         │
│  "How the human-AI relationship grows, sustains,       │
│   and recovers across weeks, months, years"             │
│                                                         │
│  ┌───────────────────────────────────────────────┐      │
│  │  Temporal Arc                                  │      │
│  │  Trust doesn't arrive. It accumulates through  │      │
│  │  repeated good moments and decays after        │      │
│  │  failures. Suggest → Confirm → Notify → Auto   │      │
│  │  is the observable progression.                │      │
│  └───────────────────────────────────────────────┘      │
│                                                         │
│  ┌───────────────────────────────────────────────┐      │
│  │  Dynamic Friction                              │      │
│  │  Not every "Auto" action should be silent.     │      │
│  │  High-cost, high-risk actions keep friction    │      │
│  │  even when trust is mature.                    │      │
│  └───────────────────────────────────────────────┘      │
│                                                         │
│  ┌───────────────────────────────────────────────┐      │
│  │  Trust Breach Recovery                         │      │
│  │  After an AI failure: Autonomy drops to        │      │
│  │  Suggest immediately. Recovery requires        │      │
│  │  evidence, not time alone.                     │      │
│  └───────────────────────────────────────────────┘      │
│                                                         │
│  ┌───────────────────────────────────────────────┐      │
│  │  Dials = the UI mechanism                      │      │
│  │  Disclosure × Autonomy are the operational     │      │
│  │  knobs. Trust is what those knobs *express*.   │      │
│  │  → link to /dials/ for the mechanism details   │      │
│  └───────────────────────────────────────────────┘      │
│                                                         │
│  Cross-cut references:                                  │
│  • Brain (L2 Learning) — trust is built on memory       │
│  • Negotiation Layer — moment-to-moment trust moments   │
│  • Every Pipeline Stage — trust is checked at each one  │
└─────────────────────────────────────────────────────────┘
```

### Proposed Trust Page Structure

Following the established page pattern (Hero → Restaurant → Overview → Deep Dive → Walkthrough → CTA):

```
1. Hero
   - Kicker: "Context Grammar — Always-On Layer"
   - H1: "Trust"
   - Lead: Trust is not a permission screen. It is a longitudinal relationship that spans every stage of the pipeline.
   - Proof bullets: Temporal Arc / Dynamic Friction / Breach Recovery

2. Restaurant metaphor (NEW)
   - "Trust grows like becoming a regular"
   - First visit → careful ordering
   - Third visit → "the usual?" 
   - After 2 years → "surprise me"
   - After one bad dish → back to careful ordering
   - This maps directly to Temporal Arc + Breach Recovery

3. Three Concepts of Trust (NEW — core section)
   
   3a. Temporal Arc
   - Trust has a direction. It doesn't arrive at a fixed level.
   - The progression: Suggest → Confirm → Notify → Auto
   - Promotion requires evidence (repeated correct actions)
   - Demotion is immediate (one breach drops to Suggest)
   - Visual: arc diagram showing rise and fall over time
   
   3b. Dynamic Friction
   - Even at "Auto", some actions still need friction
   - D6 Dynamic Friction pattern (from AX Patterns)
   - ¥5,000 shoes = silent buy. ¥48,000 supplement = confirm even at Auto
   - Friction is not distrust — it is appropriate caution
   
   3c. Trust Breach Recovery
   - What happens after the AI gets it wrong
   - Autonomy drops immediately (not gradually)
   - Recovery requires: acknowledgment, correction, evidence of improvement
   - The arc is asymmetric: trust builds slowly, breaks instantly

4. Trust vs. Dials (NEW — disambiguation)
   - Dials = the operational mechanism (the knobs you turn)
   - Trust = the relationship state (what those knobs express)
   - You set Dials. You *feel* Trust.
   - Dials are per-person, per-domain. Trust is the aggregate experience.
   - Diagram: Dials (Disclosure × Autonomy) → Trust (Temporal Arc × Friction × Recovery)

5. Trust in the Pipeline (NEW — cross-cut mapping)
   - How trust is checked at each stage:
     - Stage 1 (Intent): high-trust users get more implicit intent accepted
     - Stage 2-3 (Signals & Dials): trust level determines which signals are consulted
     - Stage 4 (Rule Engine): trust influences rule priority (trusted users get fewer confirmations)
     - Stage 5 (Gate): trust affects the Autonomy Ceiling
     - Stage 6 (Autonomy Resolution): trust IS the User Autonomy Setting in the formula
     - Stage 7 (AX Patterns): trust determines which patterns are available (D4 Omakase requires high trust)
   - Visual: pipeline with trust level overlay

6. Concrete Walkthrough
   - "Mai's relationship with the family AI over 6 months"
   - Month 1: Everything is Suggest. Mai confirms everything.
   - Month 2: Groceries go to Confirm. The AI learned the family's rhythm.
   - Month 3: Groceries reach Notify. Weekly order runs silently.
   - Month 4: One wrong order (wrong brand). Groceries drop back to Confirm.
   - Month 5: Two correct weeks. Groceries return to Notify.
   - Month 6: Supplements reach Auto after 8 weeks of correct reorders.

7. Trust across contexts (enterprise extension)
   - Same framework scales: person → household → organization
   - Enterprise: audit trails, compliance boundaries, multi-person trust

8. Common questions
   - "Can I reset trust?" → Yes, per domain, per person
   - "Does time alone rebuild trust?" → No. Evidence is required.
   - "What if the AI is right 99% of the time?" → The 1% breach matters more than the 99% correct.
   - "Is trust the same as confidence?" → No. Confidence is per-action. Trust is longitudinal.

9. CTA
   - "Mechanism →" (Dials)
   - "Try Negotiation →" (Negotiation Layer)
   - "Memory →" (Brain)
   - "Overview →" (Hub)
```

### Content Migration Plan

1. **Delete `trust-design/` folder** — it's a duplicate of the old Dials content. The real Dials page is now at `dials/`.

2. **Build `trust/index.html`** from scratch following the structure above. Most content is NEW (not migrated from anywhere).

3. **Dials page** (`dials/index.html`) remains as-is — it correctly covers the operational mechanism (Disclosure × Autonomy levels, per-person/domain, logical dependency).

4. **Trust page** becomes the conceptual layer that explains WHY Dials exist and HOW trust evolves over time.

### Why this split works

| Dimension | Dials Page | Trust Page |
|---|---|---|
| **What** | The knobs (Disclosure, Autonomy) | The relationship arc |
| **Time scale** | Per-setting (static) | Longitudinal (weeks/months) |
| **User action** | "I set this to Auto" | "I feel safe saying 'surprise me'" |
| **Mechanism** | Suggest / Confirm / Notify / Auto levels | Temporal Arc / Dynamic Friction / Breach Recovery |
| **Analogy** | The thermostat dial | The relationship with your thermostat over a year |
| **Pipeline role** | Stage 3 operational input | Cross-cut spanning all stages |

---

## Part B: Negotiation Layer Redesign

### Current Problems

1. **No auto-demo** — User sees an empty text field and a "Run" button. Zero guidance.
2. **High barrier** — Requires user to think of something to type. Cognitive load before engagement.
3. **Submit did nothing** — The `runGate()` function works but the UX doesn't communicate what happened clearly.
4. **No conceptual framing** — "Negotiation Layer" is an abstract term. A first-time visitor has no idea what this page is about.
5. **No pre-set scenarios** — Compare to a museum exhibit where you can press buttons to see demos, vs. a blank wall asking you to perform.

### Redesign Principle

**"Show, then let"** — First show a pre-built example running. Then let the user try their own input.

### Proposed Negotiation Layer Page Structure

```
1. Hero
   - Kicker: "Always-On Layer · Negotiation Design · Interactive"
   - H1: "Negotiation Layer"
   - Lead: Before AI acts, it shows you what it understood. You correct it. The system learns.
   - Proof bullets: Interpretation Preview / Assumption Cards / Priority Toggle

2. Restaurant metaphor (NEW)
   - "The waiter who checks before assuming"
   - Guest orders the spiciest dish. Waiter asks: "Is this for sharing? Any allergies?"
   - That pause IS the Negotiation Layer. Not annoying — appropriate.
   - Water for the table? No question needed. Spicy dish? Check first.

3. Watch it in action (NEW — auto-play demo)
   - Pre-built scenario card that runs automatically on page load:
   
   ┌─────────────────────────────────────────────────────┐
   │  Try a preset, or type your own:                    │
   │                                                     │
   │  [ 🔘 Health concern ] [ 🔘 Work deadline ]         │
   │  [ 🔘 Family time    ] [ 🔘 Travel planning ]       │
   │                                                     │
   │  ┌───────────────────────────────────────────────┐  │
   │  │ 📝 "I've been feeling tired lately..."         │  │
   │  │                                                │  │
   │  │ 🔍 Interpretation Preview                      │  │
   │  │ "健康や体の状態について気にされているようです。"   │  │
   │  │ Confidence: ███████░░░ 72%                      │  │
   │  │ Domain: health · Awareness: Latent             │  │
   │  │                                                │  │
   │  │ 🃏 Assumption Cards                            │  │
   │  │ ☑ Personal health, not medical emergency  [✕]  │  │
   │  │ ☑ Want suggestions, not diagnosis         [✕]  │  │
   │  │ 🔒 Domain: Health — sensitivity HIGH           │  │
   │  │                                                │  │
   │  │ [ ✓ Confirm ]  [ ↩ Correct ]                  │  │
   │  └───────────────────────────────────────────────┘  │
   └─────────────────────────────────────────────────────┘

4. What you just saw (explanation section)
   - Interpretation Preview: AI shows understanding before acting
   - Assumption Cards: premises made visible and editable
   - Confirm vs. Correct: confirm proceeds, correct reopens negotiation
   - Gate firing rules: R34 (Latent), R37 (low conf), R38 (mid conf), R39 (high conf)

5. Try your own input
   - Same text field as before, but NOW the user has seen how it works
   - "Type something you might say to an AI system:"
   - Preset buttons still available above the text field

6. Gate firing rules (reference table)
   - Same R34-R41 table as the Gate page, but focused on which UI primitive fires

7. Phase scope
   - Phase 1: Interpretation Preview + Assumption Cards
   - Phase 2: Priority Toggle (when two values conflict)
   - "See Negotiation Gate for the full Stage 5 specification"

8. CTA
   - "Negotiation Gate →" (full spec)
   - "AX Patterns →"
   - "Dials →"
   - "Overview →"
```

### Key UX Changes

| Before | After |
|---|---|
| Empty text field on load | Auto-play scenario (Health concern) runs immediately |
| No presets | 4 preset scenario buttons |
| User must figure out what to do | "Watch first, then try" flow |
| No restaurant metaphor | Restaurant waiter analogy upfront |
| Result appears without explanation | Each section labeled (Interpretation, Assumptions, Actions) |
| Gate firing rules only in explanation | Gate rules shown as a reference table |

### Technical Implementation

- On page load: automatically run `runGate()` with the first preset scenario (health/tired)
- Preset buttons: each sets the text field and runs the demo
- Text field: still available for custom input, with a "Run" button
- Same JS engine (PATTERNS, matchPattern, runGate) — just different page structure
- Add CSS for preset buttons and auto-demo area

---

## Implementation Order

1. **Delete `trust-design/`** folder (it's a duplicate)
2. **Build `trust/index.html`** with the new structure (Part A)
3. **Redesign `negotiation-layer/index.html`** (Part B)
4. **Update all remaining stale links** (simulator pages, JA mirrors)
5. **Update hub page** trust section to link to new trust page
