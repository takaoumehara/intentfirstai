/**
 * Context Grammar — 23 AX Pattern definitions with trigger predicates.
 *
 * Patterns are evaluated against a ContextState; each pattern's `trigger`
 * function returns true when the token preconditions match. Some patterns
 * have additional non-token requirements documented in `extended`.
 */

import type { AXPattern, ContextState } from './types.js';

export const PATTERNS: readonly AXPattern[] = [
  // ─── DELEGATION ───
  {
    id: 'D1',
    name: 'Approval Gate',
    category: 'D',
    categoryName: 'Delegation',
    essence:
      'A checkpoint where the user approves, edits, or rejects an AI proposal before execution.',
    trigger: (t: ContextState) =>
      t.autonomy_dial === 'confirm' &&
      (t.priority_weight === 'high' || t.priority_weight === 'critical'),
    triggerHuman: 'autonomy = confirm AND priority = high/critical',
    example:
      'The fridge proposes a grocery order — Hana taps Approve, Edit, or Skip.',
  },
  {
    id: 'D2',
    name: 'Progressive Trust',
    category: 'D',
    categoryName: 'Delegation',
    essence:
      'AI earns the right to act with less friction as successful outcomes accumulate.',
    trigger: (t: ContextState) =>
      (t.autonomy_dial === 'confirm' || t.autonomy_dial === 'notify') &&
      (t.disclosure_dial === 'moderate' || t.disclosure_dial === 'full'),
    triggerHuman:
      'autonomy = confirm/notify AND disclosure ≥ moderate (Brain L2 success threshold)',
    extended: 'Requires Brain L2 to record consecutive successful approvals',
    example:
      'After 8 weeks of approvals, the system upgrades to Notify — Hana sees swaps after, not before.',
  },
  {
    id: 'D3',
    name: 'Proactive Nudge',
    category: 'D',
    categoryName: 'Delegation',
    essence:
      'AI surfaces a non-urgent suggestion when Cognitive Load is low enough to act on it.',
    trigger: (t: ContextState) =>
      t.cognitive_load === 'low' &&
      t.priority_weight === 'standard' &&
      t.feasibility === 'fully_feasible',
    triggerHuman: 'load = low AND priority = standard AND feasibility = fully',
    example:
      'Saturday morning: app surfaces "Kai\'s soccer cleats need replacing — end of season sale now."',
  },
  {
    id: 'D4',
    name: 'Omakase Mode',
    category: 'D',
    categoryName: 'Delegation',
    essence:
      'Full delegation when trust, disclosure, and Brain confidence are all maximum.',
    trigger: (t: ContextState) =>
      t.autonomy_dial === 'auto' && t.disclosure_dial === 'full',
    triggerHuman:
      'autonomy = auto AND disclosure = full (+ Brain L2 trust = high)',
    extended: 'Brain L2 trust must also be high in this domain',
    example:
      'The regular grocery order runs itself, exactly as Hana would have placed it.',
  },
  {
    id: 'D5',
    name: 'Substitution Modes',
    category: 'D',
    categoryName: 'Delegation',
    essence:
      'Four levels of substitution freedom — Exact, Flexible, Exploring, Surprise — per item.',
    trigger: (t: ContextState) =>
      t.feasibility === 'partially_feasible' || t.feasibility === 'infeasible',
    triggerHuman: 'feasibility ≠ fully_feasible (item out of stock or constrained)',
    example: 'Peanut butter set to Exact (allergy). Yogurt = Flexible. New snack = Surprise.',
  },
  {
    id: 'D6',
    name: 'Dynamic Friction',
    category: 'D',
    categoryName: 'Delegation',
    essence:
      'High-cost or high-risk actions keep a confirmation step even when overall trust is mature.',
    trigger: (t: ContextState) =>
      (t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto') &&
      (t.priority_weight === 'high' || t.priority_weight === 'critical'),
    triggerHuman: 'autonomy = notify/auto AND priority = high/critical',
    example: 'Fridge auto-reorders yogurt. But a ¥15,000 appliance always asks first.',
  },

  // ─── ESCALATION ───
  {
    id: 'E1',
    name: 'Confidence Signal',
    category: 'E',
    categoryName: 'Escalation',
    essence:
      'AI displays uncertainty in graduated levels — making doubt legible.',
    trigger: (t: ContextState) =>
      (t.social_exposure === 'social_acquaintances' ||
        t.social_exposure === 'public') &&
      t.disclosure_dial !== 'full',
    triggerHuman:
      'social ≥ acquaintances AND disclosure < full (+ AI confidence ≤ 80%)',
    extended: 'Also requires AI model confidence below 80%',
    example:
      'Travel app shows "71% match — alternatives available" rather than a single confident pick.',
  },
  {
    id: 'E2',
    name: 'Limitation Disclosure',
    category: 'E',
    categoryName: 'Escalation',
    essence:
      'AI honestly names what it cannot do and redirects to the appropriate resource.',
    trigger: (t: ContextState) =>
      t.priority_weight === 'high' || t.priority_weight === 'critical',
    triggerHuman: 'priority = high/critical AND request outside AI capability',
    extended: 'Requires request type to be outside AI capability boundary',
    example: '"I can find clinics, but I cannot make medical decisions" + map.',
  },
  {
    id: 'E3',
    name: 'Rollback',
    category: 'E',
    categoryName: 'Escalation',
    essence:
      'AI reverses a completed action when external conditions change after execution.',
    trigger: (t: ContextState) =>
      t.feasibility === 'infeasible' &&
      (t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto'),
    triggerHuman: 'feasibility = infeasible AND already executed (notify/auto)',
    example:
      'Booked 14:00 flight cancelled — app strikes it through, shows 16:30 alternative.',
  },
  {
    id: 'E4',
    name: 'Ambiguity Escalation',
    category: 'E',
    categoryName: 'Escalation',
    essence:
      'AI surfaces gray-zone decisions and explicitly defers the final call to the human.',
    trigger: (t: ContextState) => t.cognitive_load !== 'overloaded',
    triggerHuman: 'AI confidence in 40–79% gray zone (suppressed if user overloaded)',
    extended: 'Driven by AI confidence, not token state — gated against user overload',
    example: '"Not sure if Kai would enjoy this museum" — two options, "your call."',
  },
  {
    id: 'E5',
    name: 'Trust Breach Recovery',
    category: 'E',
    categoryName: 'Escalation',
    essence:
      'After AI misjudgment, the Autonomy Dial is demoted and trust is rebuilt from a lower stage.',
    trigger: (t: ContextState) =>
      t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto',
    triggerHuman: 'autonomy ≥ notify (only elevated dials can be breached)',
    extended: 'Activates on user reject/undo. Demotes dial one step.',
    example: 'Hana rejects a substitution. System demotes Notify → Confirm.',
  },

  // ─── ADAPTATION ───
  {
    id: 'A1',
    name: 'Form Factor Transform',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'The same content restructures itself when the active device changes.',
    trigger: () => true,
    triggerHuman: 'form_factor change (always evaluated)',
    example:
      'Trip itinerary is a list on phone; cast to TV it becomes a full-bleed timeline.',
  },
  {
    id: 'A2',
    name: 'Cognitive Scaling',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'Density and number of choices contract when Cognitive Load is high, expand when it drops.',
    trigger: (t: ContextState) =>
      t.cognitive_load === 'high' || t.cognitive_load === 'overloaded',
    triggerHuman: 'cognitive_load ≥ high',
    example: 'Late at the airport: 3 pre-selected options. At home: full 12-item list.',
  },
  {
    id: 'A3',
    name: 'Social-Aware Filtering',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'Content shifts based on who is present — prices and personal notes hide as exposure increases.',
    trigger: (t: ContextState) =>
      (t.social_exposure === 'family_with_children' ||
        t.social_exposure === 'social_acquaintances' ||
        t.social_exposure === 'public') &&
      t.disclosure_dial !== 'full',
    triggerHuman: 'social ≥ family_with_children AND disclosure ≠ full',
    example: 'Alone: prices visible. At dinner party: TV shows recipe with no costs.',
  },
  {
    id: 'A4',
    name: 'Disclosure Cascade',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'Information visibility moves through FULL → SUMMARY → EXISTENCE → HIDDEN per domain and person.',
    trigger: (t: ContextState) => t.disclosure_dial !== 'full',
    triggerHuman: 'disclosure ≠ full (cascade levels matter for visibility filtering)',
    example: 'Medical history: Full for parent, Summary for doctor, Existence for school.',
  },
  {
    id: 'A5',
    name: 'Disposable Surface',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'A UI instance is born for a specific purpose and dissolves when that purpose is complete.',
    trigger: (t: ContextState) => t.priority_weight !== 'low',
    triggerHuman: 'time-bound intent + Disposable Brain created',
    extended: 'Requires explicit time-bound Intent (trip, renovation, event)',
    example: 'Kyoto trip UI appears the morning they leave; disappears when they get home.',
  },
  {
    id: 'A6',
    name: 'Care Architecture',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'AI tracks emotional and relational context to surface care opportunities.',
    trigger: (t: ContextState) =>
      t.cognitive_load === 'low' || t.cognitive_load === 'moderate',
    triggerHuman:
      'cognitive_load ≤ moderate (must not interrupt) + Brain L2 relational signal',
    extended: 'Requires Brain L2 relationship data + upcoming relational event',
    example:
      '"Hana\'s mother\'s birthday is next week — last year you sent flowers."',
  },
  {
    id: 'A7',
    name: 'Live Recomposition',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'An existing plan is instantly rebuilt when external conditions change.',
    trigger: (t: ContextState) =>
      t.feasibility === 'partially_feasible' || t.feasibility === 'infeasible',
    triggerHuman: 'feasibility changed AND active plan present (pre-execution)',
    example: 'Outdoor market rained out. Itinerary silently swaps for an indoor museum.',
  },
  {
    id: 'A8',
    name: 'Temporal Handoff',
    category: 'A',
    categoryName: 'Adaptation',
    essence:
      'When a Disposable Brain ends, distilled learnings return to the persistent Home Brain.',
    trigger: () => false,
    triggerHuman: 'Disposable Brain lifecycle ends (lifecycle event, not token-driven)',
    extended: 'Triggered by brain lifecycle, not token state',
    example: 'After Kyoto: "Kai loves ramen" written into Home Brain.',
  },

  // ─── ENTERPRISE ───
  {
    id: 'X1',
    name: 'Reasoning Trace',
    category: 'X',
    categoryName: 'Enterprise',
    essence:
      'AI decision rationale available in collapsible format — auto-expands for high-risk decisions.',
    trigger: (t: ContextState) =>
      t.priority_weight === 'high' || t.priority_weight === 'critical',
    triggerHuman: 'priority = high/critical (auto-expand) OR user request',
    example: 'AI recommends Vendor A. Tap "Why?" reveals 3 CRM threads + 2 calendar entries.',
  },
  {
    id: 'X2',
    name: 'Inline Edit',
    category: 'X',
    categoryName: 'Enterprise',
    essence:
      'An AI proposal can be edited in place and immediately re-executed — the edit path within Approval Gate.',
    trigger: (t: ContextState) => t.autonomy_dial === 'confirm',
    triggerHuman: 'autonomy = confirm (edit path within D1)',
    example: 'AI drafts a sales email. Priya edits one sentence; system re-runs the draft.',
  },
  {
    id: 'X3',
    name: 'Autonomy Dial UI',
    category: 'X',
    categoryName: 'Enterprise',
    essence:
      'Explicit user control over the four-stage Autonomy level — paired with the Disclosure Dial.',
    trigger: () => true,
    triggerHuman: 'always available (settings/UI invocation)',
    example:
      'Confirm for client-facing content, Notify for internal drafts, Auto for research summaries.',
  },
  {
    id: 'X4',
    name: 'Source Attribution',
    category: 'X',
    categoryName: 'Enterprise',
    essence:
      'AI answers include the specific data sources that produced them.',
    trigger: (t: ContextState) =>
      t.priority_weight === 'high' ||
      t.priority_weight === 'critical' ||
      t.disclosure_dial === 'full',
    triggerHuman: 'priority = high/critical OR disclosure = full OR compliance rule active',
    example: '"Q3 revenue up 12%" with chips: CRM · Email · Calendar · Sheets.',
  },
];
