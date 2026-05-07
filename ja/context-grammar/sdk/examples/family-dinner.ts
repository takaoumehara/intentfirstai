/**
 * Example: Cooking dinner with kids
 * Fridge display, family present, hands wet, partial inventory.
 */

import {
  evaluateContextGrammar,
  recommendSubstitutionMode,
  type ContextState,
} from '@context-grammar/core';

const state: ContextState = {
  physical_state: 'stationary_one_hand', // Stirring with one hand
  cognitive_load: 'moderate',
  social_exposure: 'family_with_children',
  priority_weight: 'standard',
  form_factor: 'fridge_display',
  feasibility: 'partially_feasible', // Out of one ingredient
  autonomy_dial: 'confirm',
  disclosure_dial: 'moderate',
};

const result = evaluateContextGrammar(state);
const substitution = recommendSubstitutionMode(state);

console.log(`Patterns firing: ${result.triggered.length}`);
result.triggered.forEach((p) => console.log(`  ${p.id} ${p.name}`));

if (substitution) {
  console.log(`\nSubstitution: ${substitution.mode}`);
  console.log(`Reason: ${substitution.reason}`);
}

console.log(`\nAutonomy valid: ${result.autonomyValid}`);
console.log(`Autonomy ceiling: ${result.autonomyCeiling}`);

// Expected:
//   - D1 Approval Gate firing? (depends on priority)
//   - D5 Substitution Modes (feasibility partial)
//   - A3 Social-Aware Filtering (family with children)
//   - A4 Disclosure Cascade
//   - A7 Live Recomposition (feasibility partial + active plan)
//   - Substitution = Flexible (confirm + moderate load)
