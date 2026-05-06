/**
 * Context Grammar — Core type definitions
 * Mirrors context-grammar.schema.json. Source of truth for the rule engine.
 */

export type PhysicalState =
  | 'stationary_both_hands'
  | 'stationary_one_hand'
  | 'walking'
  | 'transit_passive'
  | 'driving'
  | 'exercising'
  | 'lying_down';

export type CognitiveLoad = 'low' | 'moderate' | 'high' | 'overloaded';

export type SocialExposure =
  | 'private'
  | 'trusted_partner'
  | 'family_with_children'
  | 'social_acquaintances'
  | 'public';

export type PriorityWeight = 'critical' | 'high' | 'standard' | 'low';

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

export type Feasibility = 'fully_feasible' | 'partially_feasible' | 'infeasible';

export type AutonomyDial = 'suggest' | 'confirm' | 'notify' | 'auto';

export type DisclosureDial = 'none' | 'minimal' | 'moderate' | 'full';

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

export type PatternCategory = 'D' | 'E' | 'A' | 'X';

export type AXPatternId =
  | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6'
  | 'E1' | 'E2' | 'E3' | 'E4' | 'E5'
  | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8'
  | 'X1' | 'X2' | 'X3' | 'X4';

export interface AXPattern {
  id: AXPatternId;
  name: string;
  category: PatternCategory;
  categoryName: 'Delegation' | 'Escalation' | 'Adaptation' | 'Enterprise';
  essence: string;
  trigger: (state: ContextState) => boolean;
  triggerHuman: string;
  extended?: string;
  example: string;
}

export interface SubstitutionRecommendation {
  mode: 'Exact' | 'Flexible' | 'Exploring' | 'Surprise';
  reason: string;
}

export interface DesignRules {
  ui_density: 'low' | 'medium' | 'high';
  max_choices: number;
  touch_target: string;
  notification_level: 'interrupt' | 'prominent' | 'normal' | 'ambient';
  content_filter: string;
  ai_capability: string;
}

export interface CrossTokenOverride {
  name: string;
  effect: string;
  severity: 'hard' | 'logical';
}

export interface EvaluationResult {
  triggered: AXPattern[];
  overrides: CrossTokenOverride[];
  substitution: SubstitutionRecommendation | null;
  designRules: DesignRules;
  autonomyValid: boolean;
  autonomyCeiling: AutonomyDial | null;
}
