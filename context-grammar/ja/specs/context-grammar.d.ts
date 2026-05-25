/**
 * Context Grammar — TypeScript Type Definitions v1.0.0
 *
 * Source of truth for the 6 Situation Signals, 2 Relationship Dials, 23 AX Patterns, and rule engine API.
 * Generated from context-grammar.schema.json + ax-patterns-spec.yaml.
 *
 * Usage:
 *   import type { ContextState, AXPattern, EvaluationResult } from '@context-grammar/core';
 *
 * Spec page: https://intentfirst.ai/context-grammar/specs/
 * License: CC BY 4.0
 */

// ─────────────────────────────────────────────────────────────
// 6 Situation Signal & 2 Relationship Dial enums
// ─────────────────────────────────────────────────────────────

/** ① Physical State — posture, mobility, hand availability. */
export type PhysicalState =
  | 'stationary_both_hands'
  | 'stationary_one_hand'
  | 'walking'
  | 'transit_passive'
  | 'driving'
  | 'exercising'
  | 'lying_down';

/** ② Cognitive Load — estimated, never directly measured. */
export type CognitiveLoad = 'low' | 'moderate' | 'high' | 'overloaded';

/** ③ Social Exposure — who can see/hear the device output. */
export type SocialExposure =
  | 'private'
  | 'trusted_partner'
  | 'family_with_children'
  | 'social_acquaintances'
  | 'public';

/** ④ Priority Weight — collision resolution urgency. */
export type PriorityWeight = 'critical' | 'high' | 'standard' | 'low';

/** ⑤ Form Factor — display surface + input modality. */
export type FormFactor =
  | 'phone_handheld'
  | 'phone_folded'
  | 'phone_unfolded'
  | 'tablet'
  | 'tv_display'
  | 'fridge_display'
  | 'car_display'
  | 'watch'
  | 'desktop_monitor';

/** ⑥ Feasibility — reality filter. */
export type Feasibility = 'fully_feasible' | 'partially_feasible' | 'infeasible';

/** ⑦ Autonomy Dial — AI execution authority. */
export type AutonomyDial = 'suggest' | 'confirm' | 'notify' | 'auto';

/** ⑧ Disclosure Dial — AI data access. Prerequisite for Autonomy. */
export type DisclosureDial = 'none' | 'minimal' | 'moderate' | 'full';

// ─────────────────────────────────────────────────────────────
// Composite token state
// ─────────────────────────────────────────────────────────────

/**
 * Complete Context Grammar state.
 * All 6 Situation Signals and 2 Relationship Dials must be set before the rule engine can evaluate.
 */
export interface ContextState {
  physical_state: PhysicalState;
  cognitive_load: CognitiveLoad;
  social_exposure: SocialExposure;
  priority_weight: PriorityWeight;
  form_factor: FormFactor;
  feasibility: Feasibility;
  autonomy_dial: AutonomyDial;
  disclosure_dial: DisclosureDial;
}

// ─────────────────────────────────────────────────────────────
// AX Patterns
// ─────────────────────────────────────────────────────────────

/** Pattern category direction. */
export type PatternCategory = 'D' | 'E' | 'A' | 'X';

/** All 23 AX Pattern IDs. */
export type AXPatternId =
  // Delegation (6)
  | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6'
  // Escalation (5)
  | 'E1' | 'E2' | 'E3' | 'E4' | 'E5'
  // Adaptation (8)
  | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8'
  // Enterprise (4)
  | 'X1' | 'X2' | 'X3' | 'X4';

/** A single AX Pattern definition. */
export interface AXPattern {
  id: AXPatternId;
  name: string;
  category: PatternCategory;
  categoryName: 'Delegation' | 'Escalation' | 'Adaptation' | 'Enterprise';
  /** One-line behavioral description. */
  essence: string;
  /** Token-state predicate — returns true when token preconditions match. */
  trigger: (state: ContextState) => boolean;
  /** Human-readable trigger condition (for UI/docs). */
  triggerHuman: string;
  /** Optional non-token conditions (Brain state, AI confidence, user actions). */
  extended?: string;
  /** Real-world example sentence. */
  example: string;
}

// ─────────────────────────────────────────────────────────────
// Rule engine output
// ─────────────────────────────────────────────────────────────

/** Substitution mode recommendation when feasibility ≠ fully. */
export interface SubstitutionRecommendation {
  mode: 'Exact' | 'Flexible' | 'Exploring' | 'Surprise';
  reason: string;
}

/** Synthesized design rules from token state. */
export interface DesignRules {
  ui_density: 'low' | 'medium' | 'high';
  max_choices: number;
  touch_target: string;
  notification_level: 'interrupt' | 'prominent' | 'normal' | 'ambient';
  content_filter: string;
  ai_capability: string;
}

/** Cross-token override (hard rules and logical constraints). */
export interface CrossTokenOverride {
  name: string;
  effect: string;
  severity: 'hard' | 'logical';
}

/** Complete rule engine evaluation result. */
export interface EvaluationResult {
  /** Patterns whose token preconditions are met by the current state. */
  triggered: AXPattern[];
  /** Active cross-token overrides. */
  overrides: CrossTokenOverride[];
  /** Substitution mode if feasibility ≠ fully_feasible. */
  substitution: SubstitutionRecommendation | null;
  /** Synthesized UI design rules. */
  designRules: DesignRules;
  /** Whether autonomy_dial is logically valid given disclosure_dial. */
  autonomyValid: boolean;
  /** Maximum permitted autonomy given current disclosure level. */
  autonomyCeiling: AutonomyDial | null;
}

// ─────────────────────────────────────────────────────────────
// Public API surface
// ─────────────────────────────────────────────────────────────

/** Evaluate a complete token state against the rule engine. */
export function evaluateContextGrammar(state: ContextState): EvaluationResult;

/** Get only the patterns that fire for this state (convenience). */
export function getTriggeredPatterns(state: ContextState): AXPattern[];

/** Recommend substitution mode (returns null if fully feasible). */
export function recommendSubstitutionMode(state: ContextState): SubstitutionRecommendation | null;

/** Get the maximum autonomy allowed by the current disclosure level. */
export function getAutonomyCeiling(disclosure: DisclosureDial): AutonomyDial | null;

/** Validate that a token state is logically consistent. */
export function validateState(state: ContextState): {
  valid: boolean;
  violations: string[];
};

/**
 * The full pattern catalog — exposed for documentation, UI, and tooling.
 * Pattern IDs and trigger logic are stable across minor versions.
 */
export const PATTERNS: readonly AXPattern[];

// ─────────────────────────────────────────────────────────────
// Token metadata (for UI rendering, docs, and signal mocking)
// ─────────────────────────────────────────────────────────────

export interface TokenValue<T extends string> {
  id: T;
  label: string;
  description?: string;
  /** Mock signal text — what a real device would report. Useful for demos. */
  mock_signal?: string;
}

export interface TokenMetadata<T extends string> {
  number: number;
  name: string;
  name_ja: string;
  category: 'situation' | 'relationship_dial';
  /** 1–5 stars: how feasible this token is to detect with shipping technology. */
  reality_level: 1 | 2 | 3 | 4 | 5;
  today_detectable: boolean;
  today_method: string;
  values: readonly TokenValue<T>[];
}

export const TOKENS: {
  physical_state: TokenMetadata<PhysicalState>;
  cognitive_load: TokenMetadata<CognitiveLoad>;
  social_exposure: TokenMetadata<SocialExposure>;
  priority_weight: TokenMetadata<PriorityWeight>;
  form_factor: TokenMetadata<FormFactor>;
  feasibility: TokenMetadata<Feasibility>;
  autonomy_dial: TokenMetadata<AutonomyDial>;
  disclosure_dial: TokenMetadata<DisclosureDial>;
};
