/**
 * Example: Deep work session
 * Desk, focused, full disclosure to work agent, auto autonomy.
 */

import {
  evaluateContextGrammar,
  validateState,
  type ContextState,
} from '@context-grammar/core';

const state: ContextState = {
  physical_state: 'stationary_both_hands',
  cognitive_load: 'high', // Deep focus
  social_exposure: 'private',
  priority_weight: 'high',
  form_factor: 'desktop_monitor',
  feasibility: 'fully_feasible',
  autonomy_dial: 'auto', // Trust agent fully
  disclosure_dial: 'full', // Full domain access
};

// Validate state before evaluation
const validation = validateState(state);
if (!validation.valid) {
  console.error('Invalid state:', validation.violations);
  process.exit(1);
}

const result = evaluateContextGrammar(state);

console.log('=== Deep Work Session ===');
console.log(`\nPatterns firing: ${result.triggered.length}/23`);

// Group by category
const byCategory: Record<string, string[]> = { D: [], E: [], A: [], X: [] };
result.triggered.forEach((p) => byCategory[p.category].push(`${p.id} ${p.name}`));

(['D', 'E', 'A', 'X'] as const).forEach((cat) => {
  if (byCategory[cat].length > 0) {
    console.log(`\n  ${cat} ${byCategory[cat].length}:`);
    byCategory[cat].forEach((p) => console.log(`    ${p}`));
  }
});

console.log('\nDesign rules:');
Object.entries(result.designRules).forEach(([k, v]) => {
  console.log(`  ${k}: ${v}`);
});

// Expected highlights:
//   - D4 Omakase Mode (auto + full disclosure)
//   - D6 Dynamic Friction (auto + high priority)
//   - X1 Reasoning Trace (high priority)
//   - X4 Source Attribution (high priority + full disclosure)
//   - A2 Cognitive Scaling (high load)
