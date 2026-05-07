/**
 * @context-grammar/core
 *
 * Rule engine for Context Grammar — the design language for agentic AI.
 * Specification: https://intentfirst.ai/context-grammar/
 *
 * Quickstart:
 *
 *   import { evaluateContextGrammar } from '@context-grammar/core';
 *
 *   const state = {
 *     physical_state: 'walking',
 *     cognitive_load: 'high',
 *     social_exposure: 'public',
 *     priority_weight: 'standard',
 *     form_factor: 'phone_handheld',
 *     feasibility: 'fully_feasible',
 *     autonomy_dial: 'confirm',
 *     disclosure_dial: 'moderate',
 *   };
 *
 *   const result = evaluateContextGrammar(state);
 *   console.log(result.triggered.map(p => p.id));
 *   // → ['A2', 'A3', 'A4', ...]
 */

export type {
  AutonomyDial,
  AXPattern,
  AXPatternId,
  CognitiveLoad,
  ContextState,
  CrossTokenOverride,
  DesignRules,
  DisclosureDial,
  EvaluationResult,
  Feasibility,
  FormFactor,
  PatternCategory,
  PhysicalState,
  PriorityWeight,
  SocialExposure,
  SubstitutionRecommendation,
} from './types.js';

export { PATTERNS } from './patterns.js';
export { TOKENS } from './tokens.js';
export {
  evaluateContextGrammar,
  getAutonomyCeiling,
  getTriggeredPatterns,
  recommendSubstitutionMode,
  validateState,
} from './engine.js';

export const SPEC_VERSION = '1.0.0-alpha.1';
