/**
 * Context Grammar — Rule Engine
 *
 * Pure function that evaluates a ContextState against the 23 AX Patterns,
 * cross-token rules, and design rule synthesis logic. No side effects,
 * no I/O — fully deterministic.
 */

import type {
  AutonomyDial,
  ContextState,
  CrossTokenOverride,
  DesignRules,
  DisclosureDial,
  EvaluationResult,
  SubstitutionRecommendation,
} from './types.js';
import { PATTERNS } from './patterns.js';

const AUTONOMY_LADDER: AutonomyDial[] = ['suggest', 'confirm', 'notify', 'auto'];

const DISCLOSURE_CEILING: Record<DisclosureDial, AutonomyDial | null> = {
  none: null,
  minimal: 'suggest',
  moderate: 'notify',
  full: 'auto',
};

const CROSS_TOKEN_RULES: ReadonlyArray<{
  name: string;
  effect: string;
  severity: 'hard' | 'logical';
  condition: (t: ContextState) => boolean;
}> = [
  {
    name: 'Driving safety override',
    severity: 'hard',
    condition: (t) => t.physical_state === 'driving',
    effect:
      'Force voice-only. Cap UI density to low. Hard rule: no visual attention demands.',
  },
  {
    name: 'Cognitive overload protection',
    severity: 'hard',
    condition: (t) => t.cognitive_load === 'overloaded',
    effect:
      'Single best recommendation. Defer non-critical. Suppress standard/low priority notifications.',
  },
  {
    name: 'Public privacy cascade',
    severity: 'hard',
    condition: (t) => t.social_exposure === 'public',
    effect:
      'Treat disclosure as if minimal regardless of setting. Suppress audio output unless headphones.',
  },
  {
    name: 'Disclosure-Autonomy gate',
    severity: 'logical',
    condition: (t) => t.disclosure_dial === 'none' && t.autonomy_dial !== 'suggest',
    effect: 'Cap autonomy at Suggest — AI cannot automate without disclosure.',
  },
  {
    name: 'Disclosure-Autonomy ceiling (minimal)',
    severity: 'logical',
    condition: (t) =>
      t.disclosure_dial === 'minimal' &&
      (t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto'),
    effect: 'Cap autonomy at Suggest — minimal disclosure cannot reliably support notify/auto.',
  },
];

/** Maximum permitted autonomy given current disclosure level. */
export function getAutonomyCeiling(disclosure: DisclosureDial): AutonomyDial | null {
  return DISCLOSURE_CEILING[disclosure];
}

/** Recommend substitution mode. Returns null when feasibility = fully_feasible. */
export function recommendSubstitutionMode(
  t: ContextState
): SubstitutionRecommendation | null {
  if (t.feasibility === 'fully_feasible') return null;

  if (t.priority_weight === 'critical')
    return { mode: 'Exact', reason: 'Critical priority — no risk on substitution' };

  if (t.autonomy_dial === 'auto')
    return { mode: 'Surprise', reason: 'Auto autonomy — AI picks best available' };

  if (t.autonomy_dial === 'notify')
    return { mode: 'Surprise', reason: 'Notify autonomy — AI executes, user can undo' };

  if (t.autonomy_dial === 'confirm') {
    return t.cognitive_load === 'low'
      ? { mode: 'Exploring', reason: 'Confirm + low load — bandwidth for alternatives' }
      : { mode: 'Flexible', reason: 'Confirm autonomy — close equivalent with approval' };
  }

  return { mode: 'Exact', reason: 'Suggest autonomy — same item, different source' };
}

function synthesizeDesignRules(t: ContextState): DesignRules {
  let ui_density: DesignRules['ui_density'];
  if (
    t.physical_state === 'driving' ||
    t.cognitive_load === 'overloaded' ||
    t.cognitive_load === 'high'
  ) {
    ui_density = 'low';
  } else if (
    t.form_factor === 'watch' ||
    t.form_factor === 'car_display' ||
    t.form_factor === 'phone_folded'
  ) {
    ui_density = 'low';
  } else if (
    t.form_factor === 'tablet' ||
    t.form_factor === 'tv_display' ||
    t.form_factor === 'desktop_monitor'
  ) {
    ui_density = 'high';
  } else {
    ui_density = 'medium';
  }

  const max_choices = ({ low: 8, moderate: 5, high: 3, overloaded: 1 } as const)[
    t.cognitive_load
  ];

  let touch_target: string;
  if (t.physical_state === 'driving') touch_target = 'voice only — no manual';
  else if (t.physical_state === 'walking' || t.physical_state === 'exercising')
    touch_target = '≥ 64dp';
  else if (
    t.physical_state === 'stationary_one_hand' ||
    t.physical_state === 'transit_passive'
  )
    touch_target = '≥ 56dp';
  else touch_target = '≥ 48dp';

  const notification_level = (
    {
      critical: 'interrupt',
      high: 'prominent',
      standard: 'normal',
      low: 'ambient',
    } as const
  )[t.priority_weight];

  const content_filter = ({
    private: 'none',
    trusted_partner: 'light',
    family_with_children: 'moderate (hide gift prices, financial details)',
    social_acquaintances: 'significant (hide personal data, financial info)',
    public: 'maximum (no personal info visible)',
  } as const)[t.social_exposure];

  const ai_capability = ({
    none: 'none — no AI involvement',
    minimal: 'filter + basic suggest only',
    moderate: 'suggest, confirm, notify',
    full: 'full spectrum + anticipatory',
  } as const)[t.disclosure_dial];

  return {
    ui_density,
    max_choices,
    touch_target,
    notification_level,
    content_filter,
    ai_capability,
  };
}

/** Validate a token state for logical consistency. */
export function validateState(state: ContextState): {
  valid: boolean;
  violations: string[];
} {
  const violations: string[] = [];

  const ceiling = DISCLOSURE_CEILING[state.disclosure_dial];
  if (ceiling === null && state.autonomy_dial !== 'suggest') {
    violations.push(
      `Disclosure = none requires Autonomy = suggest (got ${state.autonomy_dial})`
    );
  } else if (
    ceiling !== null &&
    AUTONOMY_LADDER.indexOf(state.autonomy_dial) > AUTONOMY_LADDER.indexOf(ceiling)
  ) {
    violations.push(
      `Disclosure = ${state.disclosure_dial} caps Autonomy at ${ceiling} (got ${state.autonomy_dial})`
    );
  }

  if (state.physical_state === 'driving' && state.form_factor === 'phone_handheld') {
    violations.push(
      'physical_state = driving with form_factor = phone_handheld — driving requires car_display'
    );
  }

  return { valid: violations.length === 0, violations };
}

/** Get only the patterns that fire for this state. */
export function getTriggeredPatterns(state: ContextState) {
  return PATTERNS.filter((p) => p.trigger(state));
}

/** Main rule engine entry point. */
export function evaluateContextGrammar(state: ContextState): EvaluationResult {
  const triggered = getTriggeredPatterns(state).slice();
  const overrides: CrossTokenOverride[] = CROSS_TOKEN_RULES.filter((r) =>
    r.condition(state)
  ).map(({ name, effect, severity }) => ({ name, effect, severity }));
  const substitution = recommendSubstitutionMode(state);
  const designRules = synthesizeDesignRules(state);

  const ceiling = DISCLOSURE_CEILING[state.disclosure_dial];
  const autonomyValid =
    ceiling !== null &&
    AUTONOMY_LADDER.indexOf(state.autonomy_dial) <= AUTONOMY_LADDER.indexOf(ceiling);

  return {
    triggered,
    overrides,
    substitution,
    designRules,
    autonomyValid,
    autonomyCeiling: ceiling,
  };
}
