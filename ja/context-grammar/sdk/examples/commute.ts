/**
 * Example: Public transit commute
 * Tokens populated from typical morning commute sensors.
 */

import { evaluateContextGrammar, type ContextState } from '@context-grammar/core';

const state: ContextState = {
  physical_state: 'transit_passive', // Sitting on the train
  cognitive_load: 'moderate',
  social_exposure: 'public', // Strangers nearby
  priority_weight: 'standard',
  form_factor: 'phone_handheld',
  feasibility: 'fully_feasible',
  autonomy_dial: 'confirm',
  disclosure_dial: 'moderate',
};

const result = evaluateContextGrammar(state);

console.log('Triggered patterns:');
result.triggered.forEach((p) => console.log(`  ${p.id} ${p.name}`));

console.log('\nDesign rules:');
console.log(`  UI density:     ${result.designRules.ui_density}`);
console.log(`  Max choices:    ${result.designRules.max_choices}`);
console.log(`  Touch target:   ${result.designRules.touch_target}`);
console.log(`  Notifications:  ${result.designRules.notification_level}`);
console.log(`  Content filter: ${result.designRules.content_filter}`);

console.log('\nActive overrides:');
result.overrides.forEach((o) => console.log(`  [${o.severity}] ${o.name}`));

// Expected output includes:
//   - A3 Social-Aware Filtering (public + non-full disclosure)
//   - A4 Disclosure Cascade (disclosure ≠ full)
//   - X2 Inline Edit (autonomy = confirm)
//   - Hard override: Public privacy cascade
