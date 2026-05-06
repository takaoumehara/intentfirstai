/* =============================================================
   Context Grammar Simulator — Rule Engine + UI
   =============================================================
   Reads token state, evaluates AX Pattern triggers, and outputs
   design rules. Pure browser JS — no backend, no build step.
   Data embedded inline; mirrors specs/context-tokens-spec.yaml
   and specs/ax-patterns-spec.yaml.
   ============================================================= */

/* ─── 8 Context Tokens — definitions ─── */
const TOKENS = {
  physical_state: {
    number: 1,
    name: 'Physical State',
    name_ja: '身体状態',
    category: 'situation',
    reality_level: 4,
    today_detectable: true,
    today_method: 'iOS CMMotionActivityManager / Android Activity Recognition',
    values: [
      { id: 'stationary_both_hands', label: 'Stationary · both hands free', mock_signal: 'Accelerometer flat, low motion' },
      { id: 'stationary_one_hand', label: 'Stationary · one hand', mock_signal: 'Slight motion, single grip' },
      { id: 'walking', label: 'Walking', mock_signal: 'Step counter active, 1.4 m/s' },
      { id: 'transit_passive', label: 'Passive transit', mock_signal: 'Linear motion 30+ km/h, no driver input' },
      { id: 'driving', label: 'Driving', mock_signal: 'CarPlay/Auto connected' },
      { id: 'exercising', label: 'Exercising', mock_signal: 'Heart rate elevated, repetitive motion' },
      { id: 'lying_down', label: 'Lying down', mock_signal: 'Device flat, low motion, late hour' },
    ],
  },
  cognitive_load: {
    number: 2,
    name: 'Cognitive Load',
    name_ja: '認知負荷',
    category: 'situation',
    reality_level: 2,
    today_detectable: false,
    today_method: 'Estimation only — never directly measured',
    values: [
      { id: 'low', label: 'Low load', mock_signal: 'Calendar empty next 2h, no Focus Mode' },
      { id: 'moderate', label: 'Moderate load', mock_signal: 'Normal calendar density' },
      { id: 'high', label: 'High load', mock_signal: '3+ events back-to-back, app-switching frequent' },
      { id: 'overloaded', label: 'Overloaded', mock_signal: 'Late hour + dense calendar + Focus Mode active' },
    ],
  },
  social_exposure: {
    number: 3,
    name: 'Social Exposure',
    name_ja: '社会的露出',
    category: 'situation',
    reality_level: 4,
    today_detectable: true,
    today_method: 'Privacy Display (Samsung S26U), Visual ID (Echo Show), Voice ID',
    values: [
      { id: 'private', label: 'Private (alone)', mock_signal: 'No other faces detected, home Wi-Fi' },
      { id: 'trusted_partner', label: 'With partner', mock_signal: 'Known device nearby (BLE)' },
      { id: 'family_with_children', label: 'Family with children', mock_signal: 'Multiple known voices, child profile present' },
      { id: 'social_acquaintances', label: 'Social / acquaintances', mock_signal: 'Multiple unknown faces' },
      { id: 'public', label: 'Public', mock_signal: 'GPS = café/transit, ambient crowd noise' },
    ],
  },
  priority_weight: {
    number: 4,
    name: 'Priority Weight',
    name_ja: '優先度',
    category: 'situation',
    reality_level: 3,
    today_detectable: true,
    today_method: 'Calendar/email priority APIs (Gmail Priority Inbox, iOS Priority Notifications)',
    values: [
      { id: 'critical', label: 'Critical · irreversible', mock_signal: 'Time-sensitive, hard deadline within 15 min' },
      { id: 'high', label: 'High · time-sensitive', mock_signal: 'Recoverable but time-pressed' },
      { id: 'standard', label: 'Standard', mock_signal: 'Routine task, flexible timing' },
      { id: 'low', label: 'Low · exploratory', mock_signal: 'No time pressure, browsing context' },
    ],
  },
  form_factor: {
    number: 5,
    name: 'Form Factor',
    name_ja: 'フォームファクター',
    category: 'situation',
    reality_level: 4,
    today_detectable: true,
    today_method: 'Device hardware ID, AirPlay/Cast/DeX detection',
    values: [
      { id: 'phone_handheld', label: 'Phone (handheld)', mock_signal: '6.1″ touch, portrait' },
      { id: 'phone_unfolded', label: 'Foldable (unfolded)', mock_signal: '7.6″ flex mode active' },
      { id: 'tablet', label: 'Tablet', mock_signal: '11″ touch + stylus paired' },
      { id: 'tv_display', label: 'TV / large display', mock_signal: '65″ cast active, 3m viewing distance' },
      { id: 'fridge_display', label: 'Smart fridge', mock_signal: '21″ kitchen, voice + touch' },
      { id: 'car_display', label: 'Car dashboard', mock_signal: '10″ CarPlay, voice-primary' },
      { id: 'watch', label: 'Smartwatch', mock_signal: '1.9″ wrist, glance context' },
      { id: 'desktop_monitor', label: 'Desktop (DeX)', mock_signal: '27″ monitor + keyboard + mouse' },
    ],
  },
  feasibility: {
    number: 6,
    name: 'Feasibility',
    name_ja: '実現可能性',
    category: 'situation',
    reality_level: 3,
    today_detectable: true,
    today_method: 'Inventory / maps / weather APIs (per-domain)',
    values: [
      { id: 'fully_feasible', label: 'Fully feasible', mock_signal: 'In stock, on time, in budget' },
      { id: 'partially_feasible', label: 'Partially feasible', mock_signal: 'Stock alt available / time tight' },
      { id: 'infeasible', label: 'Infeasible', mock_signal: 'Out of stock / closed / over budget' },
    ],
  },
  autonomy_dial: {
    number: 7,
    name: 'Autonomy Dial',
    name_ja: '自律度ダイアル',
    category: 'relationship_dial',
    reality_level: 3,
    today_detectable: true,
    today_method: 'User-configurable (Claude Code, GitHub Copilot ship 2-3 stage modes)',
    values: [
      { id: 'suggest', label: 'Suggest', mock_signal: 'AI shows options, user decides' },
      { id: 'confirm', label: 'Confirm', mock_signal: 'AI proposes, user approves' },
      { id: 'notify', label: 'Notify', mock_signal: 'AI executes, undo window 5 min' },
      { id: 'auto', label: 'Auto', mock_signal: 'Silent execution, periodic summary only' },
    ],
  },
  disclosure_dial: {
    number: 8,
    name: 'Disclosure Dial',
    name_ja: '開示ダイアル',
    category: 'relationship_dial',
    reality_level: 2,
    today_detectable: false,
    today_method: 'Per-app permissions exist; unified per-domain dial does not',
    values: [
      { id: 'none', label: 'None', mock_signal: 'AI has no data in this domain' },
      { id: 'minimal', label: 'Minimal', mock_signal: 'Basic preferences only' },
      { id: 'moderate', label: 'Moderate', mock_signal: 'Preferences + history shared' },
      { id: 'full', label: 'Full', mock_signal: 'Complete domain access + anticipatory' },
    ],
  },
};

/* ─── AX Patterns — 23 trigger evaluators ─── */
const PATTERNS = [
  /* ─── DELEGATION ─── */
  {
    id: 'D1', name: 'Approval Gate', category: 'D', categoryName: 'Delegation',
    essence: 'A checkpoint where the user approves, edits, or rejects an AI proposal before execution.',
    trigger: (t) => t.autonomy_dial === 'confirm' && (t.priority_weight === 'high' || t.priority_weight === 'critical'),
    triggerHuman: 'autonomy = confirm AND priority = high/critical',
    example: 'The fridge proposes a grocery order — Hana taps Approve, Edit, or Skip.',
  },
  {
    id: 'D2', name: 'Progressive Trust', category: 'D', categoryName: 'Delegation',
    essence: 'AI earns the right to act with less friction as successful outcomes accumulate.',
    trigger: (t) => (t.autonomy_dial === 'confirm' || t.autonomy_dial === 'notify') &&
                    (t.disclosure_dial === 'moderate' || t.disclosure_dial === 'full'),
    triggerHuman: 'autonomy = confirm/notify AND disclosure ≥ moderate (Brain L2 success threshold)',
    extended: 'Requires Brain L2 to record consecutive successful approvals',
    example: 'After 8 weeks of approvals, the system upgrades to Notify — Hana sees swaps after, not before.',
  },
  {
    id: 'D3', name: 'Proactive Nudge', category: 'D', categoryName: 'Delegation',
    essence: 'AI surfaces a non-urgent suggestion when Cognitive Load is low enough to act on it.',
    trigger: (t) => t.cognitive_load === 'low' && t.priority_weight === 'standard' && t.feasibility === 'fully_feasible',
    triggerHuman: 'load = low AND priority = standard AND feasibility = fully',
    example: 'Saturday morning: app surfaces "Kai\'s soccer cleats need replacing — end of season sale now."',
  },
  {
    id: 'D4', name: 'Omakase Mode', category: 'D', categoryName: 'Delegation',
    essence: 'Full delegation when trust, disclosure, and Brain confidence are all maximum.',
    trigger: (t) => t.autonomy_dial === 'auto' && t.disclosure_dial === 'full',
    triggerHuman: 'autonomy = auto AND disclosure = full (+ Brain L2 trust = high)',
    extended: 'Brain L2 trust must also be high in this domain',
    example: 'The regular grocery order runs itself, exactly as Hana would have placed it.',
  },
  {
    id: 'D5', name: 'Substitution Modes', category: 'D', categoryName: 'Delegation',
    essence: 'Four levels of substitution freedom — Exact, Flexible, Exploring, Surprise — per item.',
    trigger: (t) => t.feasibility === 'partially_feasible' || t.feasibility === 'infeasible',
    triggerHuman: 'feasibility ≠ fully_feasible (item out of stock or constrained)',
    example: 'Peanut butter set to Exact (allergy). Yogurt = Flexible. New snack = Surprise.',
  },
  {
    id: 'D6', name: 'Dynamic Friction', category: 'D', categoryName: 'Delegation',
    essence: 'High-cost or high-risk actions keep a confirmation step even when overall trust is mature.',
    trigger: (t) => (t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto') &&
                    (t.priority_weight === 'high' || t.priority_weight === 'critical'),
    triggerHuman: 'autonomy = notify/auto AND priority = high/critical (cost × risk threshold)',
    example: 'Fridge auto-reorders yogurt. But a ¥15,000 appliance always asks first.',
  },

  /* ─── ESCALATION ─── */
  {
    id: 'E1', name: 'Confidence Signal', category: 'E', categoryName: 'Escalation',
    essence: 'AI displays uncertainty in graduated levels — making doubt legible.',
    trigger: (t) => (t.social_exposure === 'social_acquaintances' || t.social_exposure === 'public') &&
                    t.disclosure_dial !== 'full',
    triggerHuman: 'social ≥ acquaintances AND disclosure < full (+ AI confidence ≤ 80%)',
    extended: 'Also requires AI model confidence below 80%',
    example: 'Travel app shows "71% match — alternatives available" rather than a single confident pick.',
  },
  {
    id: 'E2', name: 'Limitation Disclosure', category: 'E', categoryName: 'Escalation',
    essence: 'AI honestly names what it cannot do and redirects to the appropriate resource.',
    trigger: (t) => t.priority_weight === 'high' || t.priority_weight === 'critical',
    triggerHuman: 'priority = high/critical AND request outside AI capability',
    extended: 'Requires request type to be outside AI capability boundary',
    example: '"I can find clinics, but I cannot make medical decisions" + map.',
  },
  {
    id: 'E3', name: 'Rollback', category: 'E', categoryName: 'Escalation',
    essence: 'AI reverses a completed action when external conditions change after execution.',
    trigger: (t) => t.feasibility === 'infeasible' && (t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto'),
    triggerHuman: 'feasibility = infeasible AND already executed (notify/auto)',
    example: 'Booked 14:00 flight cancelled — app strikes it through, shows 16:30 alternative at no extra cost.',
  },
  {
    id: 'E4', name: 'Ambiguity Escalation', category: 'E', categoryName: 'Escalation',
    essence: 'AI surfaces gray-zone decisions and explicitly defers the final call to the human.',
    trigger: (t) => t.cognitive_load !== 'overloaded',
    triggerHuman: 'AI confidence in 40–79% gray zone (suppressed if user is overloaded)',
    extended: 'Driven by AI confidence, not token state — gated against user overload',
    example: '"Not sure if Kai would enjoy this museum" — two options, "your call."',
  },
  {
    id: 'E5', name: 'Trust Breach Recovery', category: 'E', categoryName: 'Escalation',
    essence: 'After AI misjudgment, the Autonomy Dial is demoted and trust is rebuilt from a lower stage.',
    trigger: (t) => t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto',
    triggerHuman: 'autonomy ≥ notify (only elevated dials can be breached)',
    extended: 'Activates on user reject/undo. Demotes dial one step.',
    example: 'Hana rejects a substitution. System demotes Notify → Confirm until trust is re-earned.',
  },

  /* ─── ADAPTATION ─── */
  {
    id: 'A1', name: 'Form Factor Transform', category: 'A', categoryName: 'Adaptation',
    essence: 'The same content restructures itself when the active device changes.',
    trigger: (t) => true, // Always relevant — surface depends on form_factor
    triggerHuman: 'form_factor change (always evaluated)',
    example: 'Trip itinerary is a list on phone; cast to TV it becomes a full-bleed timeline with photos.',
  },
  {
    id: 'A2', name: 'Cognitive Scaling', category: 'A', categoryName: 'Adaptation',
    essence: 'Density and number of choices contract when Cognitive Load is high, expand when it drops.',
    trigger: (t) => t.cognitive_load === 'high' || t.cognitive_load === 'overloaded',
    triggerHuman: 'cognitive_load ≥ high',
    example: 'Late at the airport: 3 pre-selected options. At home: full 12-item list.',
  },
  {
    id: 'A3', name: 'Social-Aware Filtering', category: 'A', categoryName: 'Adaptation',
    essence: 'Content shifts based on who is present — prices and personal notes hide as exposure increases.',
    trigger: (t) => (t.social_exposure === 'family_with_children' ||
                     t.social_exposure === 'social_acquaintances' ||
                     t.social_exposure === 'public') &&
                    t.disclosure_dial !== 'full',
    triggerHuman: 'social ≥ family_with_children AND disclosure ≠ full',
    example: 'Alone: prices visible. At dinner party: TV shows recipe with no costs.',
  },
  {
    id: 'A4', name: 'Disclosure Cascade', category: 'A', categoryName: 'Adaptation',
    essence: 'Information visibility moves through FULL → SUMMARY → EXISTENCE → HIDDEN per domain and person.',
    trigger: (t) => t.disclosure_dial !== 'full',
    triggerHuman: 'disclosure ≠ full (cascade levels matter for visibility filtering)',
    example: 'Koji\'s medical history: Full for parent, Summary for doctor, Existence for school nurse.',
  },
  {
    id: 'A5', name: 'Disposable Surface', category: 'A', categoryName: 'Adaptation',
    essence: 'A UI instance is born for a specific purpose and dissolves when that purpose is complete.',
    trigger: (t) => t.priority_weight !== 'low', // Time-bound goals usually have weight
    triggerHuman: 'time-bound intent + Disposable Brain created',
    extended: 'Requires explicit time-bound Intent (trip, renovation, event)',
    example: 'Kyoto trip UI appears the morning they leave; disappears when they get home.',
  },
  {
    id: 'A6', name: 'Care Architecture', category: 'A', categoryName: 'Adaptation',
    essence: 'AI tracks emotional and relational context to surface care opportunities.',
    trigger: (t) => t.cognitive_load === 'low' || t.cognitive_load === 'moderate',
    triggerHuman: 'cognitive_load ≤ moderate (must not interrupt) + Brain L2 relational signal',
    extended: 'Requires Brain L2 relationship data + upcoming relational event',
    example: '"Hana\'s mother\'s birthday is next week — last year you sent flowers."',
  },
  {
    id: 'A7', name: 'Live Recomposition', category: 'A', categoryName: 'Adaptation',
    essence: 'An existing plan is instantly rebuilt when external conditions change.',
    trigger: (t) => t.feasibility === 'partially_feasible' || t.feasibility === 'infeasible',
    triggerHuman: 'feasibility changed AND active plan present (pre-execution)',
    example: 'Outdoor market rained out. Itinerary silently swaps for an indoor museum at the same time.',
  },
  {
    id: 'A8', name: 'Temporal Handoff', category: 'A', categoryName: 'Adaptation',
    essence: 'When a Disposable Brain ends, distilled learnings return to the persistent Home Brain.',
    trigger: (t) => false, // Lifecycle event, not a token state
    triggerHuman: 'Disposable Brain lifecycle ends (lifecycle event, not token-driven)',
    extended: 'Triggered by brain lifecycle, not token state',
    example: 'After Kyoto: "Kai loves ramen", "Mia fades at 3pm" written into Home Brain.',
  },

  /* ─── ENTERPRISE ─── */
  {
    id: 'X1', name: 'Reasoning Trace', category: 'X', categoryName: 'Enterprise',
    essence: 'AI decision rationale available in collapsible format — auto-expands for high-risk decisions.',
    trigger: (t) => t.priority_weight === 'high' || t.priority_weight === 'critical',
    triggerHuman: 'priority = high/critical (auto-expand) OR user request',
    example: 'AI recommends Vendor A. Tap "Why?" reveals 3 CRM threads + 2 calendar entries.',
  },
  {
    id: 'X2', name: 'Inline Edit', category: 'X', categoryName: 'Enterprise',
    essence: 'An AI proposal can be edited in place and immediately re-executed — the edit path within Approval Gate.',
    trigger: (t) => t.autonomy_dial === 'confirm',
    triggerHuman: 'autonomy = confirm (edit path within D1)',
    example: 'AI drafts a sales email. Priya edits one sentence inline; system re-runs the draft.',
  },
  {
    id: 'X3', name: 'Autonomy Dial UI', category: 'X', categoryName: 'Enterprise',
    essence: 'Explicit user control over the four-stage Autonomy level — paired with the Disclosure Dial.',
    trigger: (t) => true, // Always available as a settings UI
    triggerHuman: 'always available (settings/UI invocation)',
    example: 'Confirm for client-facing content, Notify for internal drafts, Auto for research summaries.',
  },
  {
    id: 'X4', name: 'Source Attribution', category: 'X', categoryName: 'Enterprise',
    essence: 'AI answers include the specific data sources that produced them.',
    trigger: (t) => t.priority_weight === 'high' || t.priority_weight === 'critical' || t.disclosure_dial === 'full',
    triggerHuman: 'priority = high/critical OR disclosure = full OR compliance rule active',
    example: '"Q3 revenue up 12%" with chips: CRM · Email · Calendar · Sheets — traceable in one tap.',
  },
];

/* ─── Cross-token rules (overrides) ─── */
const CROSS_TOKEN_RULES = [
  {
    name: 'Driving safety override',
    condition: (t) => t.physical_state === 'driving',
    effect: 'Force voice-only. Cap UI density to low. Hard rule: no visual attention demands.',
    severity: 'hard',
  },
  {
    name: 'Cognitive overload protection',
    condition: (t) => t.cognitive_load === 'overloaded',
    effect: 'Single best recommendation. Defer non-critical. Suppress standard/low priority notifications.',
    severity: 'hard',
  },
  {
    name: 'Public privacy cascade',
    condition: (t) => t.social_exposure === 'public',
    effect: 'Treat disclosure as if minimal regardless of setting. Suppress audio output unless headphones.',
    severity: 'hard',
  },
  {
    name: 'Disclosure-Autonomy gate',
    condition: (t) => t.disclosure_dial === 'none' && t.autonomy_dial !== 'suggest',
    effect: 'Cap autonomy at Suggest — AI cannot automate without disclosure.',
    severity: 'logical',
  },
  {
    name: 'Disclosure-Autonomy ceiling (minimal)',
    condition: (t) => t.disclosure_dial === 'minimal' && (t.autonomy_dial === 'notify' || t.autonomy_dial === 'auto'),
    effect: 'Cap autonomy at Suggest — minimal disclosure cannot reliably support notify/auto.',
    severity: 'logical',
  },
];

/* ─── Substitution mode recommendation ─── */
function recommendSubstitutionMode(t) {
  if (t.feasibility === 'fully_feasible') return null;
  if (t.priority_weight === 'critical') return { mode: 'Exact', reason: 'Critical priority — no risk on substitution' };
  if (t.autonomy_dial === 'auto') return { mode: 'Surprise', reason: 'Auto autonomy — AI picks best available' };
  if (t.autonomy_dial === 'notify') return { mode: 'Surprise', reason: 'Notify autonomy — AI executes, user can undo' };
  if (t.autonomy_dial === 'confirm') {
    return t.cognitive_load === 'low'
      ? { mode: 'Exploring', reason: 'Confirm + low load — user has bandwidth for alternatives' }
      : { mode: 'Flexible', reason: 'Confirm autonomy — close equivalent with approval' };
  }
  return { mode: 'Exact', reason: 'Suggest autonomy — same item, different source' };
}

/* ─── Design rule synthesis (from token combinations) ─── */
function synthesizeDesignRules(t) {
  const rules = {};

  // UI density (driven by load + driving + form factor)
  if (t.physical_state === 'driving' || t.cognitive_load === 'overloaded' || t.cognitive_load === 'high') {
    rules.ui_density = 'low';
  } else if (t.form_factor === 'watch' || t.form_factor === 'car_display' || t.form_factor === 'phone_folded') {
    rules.ui_density = 'low';
  } else if (t.form_factor === 'tablet' || t.form_factor === 'tv_display' || t.form_factor === 'desktop_monitor') {
    rules.ui_density = 'high';
  } else {
    rules.ui_density = 'medium';
  }

  // Max choices (cognitive load)
  rules.max_choices = ({ low: 8, moderate: 5, high: 3, overloaded: 1 })[t.cognitive_load];

  // Touch target
  if (t.physical_state === 'driving') rules.touch_target = 'voice only — no manual';
  else if (t.physical_state === 'walking' || t.physical_state === 'exercising') rules.touch_target = '≥ 64dp';
  else if (t.physical_state === 'stationary_one_hand' || t.physical_state === 'transit_passive') rules.touch_target = '≥ 56dp';
  else rules.touch_target = '≥ 48dp';

  // Notification level
  rules.notification_level = ({ critical: 'interrupt', high: 'prominent', standard: 'normal', low: 'ambient' })[t.priority_weight];

  // Content filter (social exposure)
  rules.content_filter = ({
    private: 'none',
    trusted_partner: 'light',
    family_with_children: 'moderate (hide gift prices, financial details)',
    social_acquaintances: 'significant (hide personal data, financial info)',
    public: 'maximum (no personal info visible)',
  })[t.social_exposure];

  // AI capability
  rules.ai_capability = ({
    none: 'none — no AI involvement',
    minimal: 'filter + basic suggest only',
    moderate: 'suggest, confirm, notify',
    full: 'full spectrum + anticipatory',
  })[t.disclosure_dial];

  return rules;
}

/* ─── Main evaluator ─── */
function evaluateContextGrammar(state) {
  const triggered = PATTERNS.filter(p => p.trigger(state));
  const overrides = CROSS_TOKEN_RULES.filter(r => r.condition(state));
  const substitution = recommendSubstitutionMode(state);
  const designRules = synthesizeDesignRules(state);

  // Recommended autonomy: cap by disclosure
  const ceilings = { none: null, minimal: 'suggest', moderate: 'notify', full: 'auto' };
  const ceiling = ceilings[state.disclosure_dial];
  const autonomyOk = ceiling === null
    ? false
    : ['suggest', 'confirm', 'notify', 'auto'].indexOf(state.autonomy_dial) <= ['suggest', 'confirm', 'notify', 'auto'].indexOf(ceiling);

  return {
    triggered,
    overrides,
    substitution,
    designRules,
    autonomyValid: autonomyOk,
    autonomyCeiling: ceiling,
  };
}

/* ─── Scenario presets ─── */
const PRESETS = [
  {
    id: 'cooking_dinner',
    label: 'Cooking dinner with kids',
    description: 'Kitchen · fridge display · kids around · hands wet',
    project: { ref: 'P1', label: 'See in P1', url: '../../projects/project-01/p1-scroll.html#fridge' },
    state: {
      physical_state: 'stationary_one_hand',
      cognitive_load: 'moderate',
      social_exposure: 'family_with_children',
      priority_weight: 'standard',
      form_factor: 'fridge_display',
      feasibility: 'partially_feasible',
      autonomy_dial: 'confirm',
      disclosure_dial: 'moderate',
    },
  },
  {
    id: 'driving_commute',
    label: 'Driving to work',
    description: 'CarPlay · eyes on road · voice-only',
    project: { ref: 'P2', label: 'See in P2', url: '../../projects/project-02/p2-family-trip.html#car' },
    state: {
      physical_state: 'driving',
      cognitive_load: 'high',
      social_exposure: 'private',
      priority_weight: 'high',
      form_factor: 'car_display',
      feasibility: 'fully_feasible',
      autonomy_dial: 'notify',
      disclosure_dial: 'moderate',
    },
  },
  {
    id: 'late_night_browse',
    label: 'Late-night browsing',
    description: 'In bed · lying down · no rush · exploring',
    // No project anchor — none of P1/P2/P3 has a "lying in bed at night" scene.
    state: {
      physical_state: 'lying_down',
      cognitive_load: 'low',
      social_exposure: 'private',
      priority_weight: 'low',
      form_factor: 'phone_handheld',
      feasibility: 'fully_feasible',
      autonomy_dial: 'suggest',
      disclosure_dial: 'full',
    },
  },
  {
    id: 'public_transit',
    label: 'Public transit',
    description: 'On the train · one hand · strangers around',
    project: { ref: 'P3', label: 'See in P3', url: '../../projects/project-03/p3-scroll.html#adaptive' },
    state: {
      physical_state: 'transit_passive',
      cognitive_load: 'moderate',
      social_exposure: 'public',
      priority_weight: 'standard',
      form_factor: 'phone_handheld',
      feasibility: 'fully_feasible',
      autonomy_dial: 'confirm',
      disclosure_dial: 'moderate',
    },
  },
  {
    id: 'family_living_room',
    label: 'Family movie night',
    description: 'Living room · TV cast · partner + kids',
    project: { ref: 'P3', label: 'See in P3', url: '../../projects/project-03/p3-scroll.html#tv' },
    state: {
      physical_state: 'stationary_both_hands',
      cognitive_load: 'low',
      social_exposure: 'family_with_children',
      priority_weight: 'low',
      form_factor: 'tv_display',
      feasibility: 'fully_feasible',
      autonomy_dial: 'suggest',
      disclosure_dial: 'moderate',
    },
  },
  {
    id: 'work_focused',
    label: 'Deep work session',
    description: 'Desk · focused · full disclosure to work agent',
    project: { ref: 'P1', label: 'See in P1', url: '../../projects/project-01/p1-scroll.html#enterprise' },
    state: {
      physical_state: 'stationary_both_hands',
      cognitive_load: 'high',
      social_exposure: 'private',
      priority_weight: 'high',
      form_factor: 'desktop_monitor',
      feasibility: 'fully_feasible',
      autonomy_dial: 'auto',
      disclosure_dial: 'full',
    },
  },
];

/* ─── Default state ─── */
const DEFAULT_STATE = {
  physical_state: 'stationary_both_hands',
  cognitive_load: 'moderate',
  social_exposure: 'private',
  priority_weight: 'standard',
  form_factor: 'phone_handheld',
  feasibility: 'fully_feasible',
  autonomy_dial: 'confirm',
  disclosure_dial: 'moderate',
};

/* ============================================================
   UI rendering
   ============================================================ */

const state = { ...DEFAULT_STATE };
let mode = 'today'; // 'today' or 'future'

function realityStars(level) {
  const filled = '★'.repeat(level);
  const empty = '☆'.repeat(5 - level);
  return filled + empty;
}

/* Convert enum id to human label using TOKENS catalog. */
function tokenLabel(tokenId, valueId) {
  const t = TOKENS[tokenId];
  if (!t) return valueId;
  const v = t.values.find(x => x.id === valueId);
  return v ? v.label : valueId;
}

function titleCase(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function renderTokenInputs() {
  const container = document.getElementById('token-inputs');
  container.innerHTML = '';

  Object.entries(TOKENS).forEach(([id, token]) => {
    const row = document.createElement('div');
    row.className = 'token-row';
    row.dataset.tokenId = id;
    row.dataset.detectable = token.today_detectable;

    const valueId = state[id];
    const value = token.values.find(v => v.id === valueId);
    const mockSignal = value ? value.mock_signal : '';
    const sourceLabel = token.today_detectable ? 'Sensor' : 'Estimated';

    row.innerHTML = `
      <span class="token-row__num" aria-hidden="true">${String(token.number).padStart(2, '0')}</span>
      <div class="token-row__main">
        <div class="token-row__label-line">
          <span class="token-row__name">${token.name}<span class="token-row__name-ja">${token.name_ja}</span></span>
          <span class="token-row__reality" title="Reality level: ${token.reality_level}/5 — ${token.today_method}">${realityStars(token.reality_level)}</span>
        </div>
        <select class="token-row__select" data-token="${id}" title="${sourceLabel}: ${mockSignal}" aria-label="${token.name}">
          ${token.values.map(v => `<option value="${v.id}" ${v.id === state[id] ? 'selected' : ''}>${v.label}</option>`).join('')}
        </select>
      </div>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll('.token-row__select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const tokenId = e.target.dataset.token;
      state[tokenId] = e.target.value;
      const token = TOKENS[tokenId];
      const value = token.values.find(v => v.id === e.target.value);
      const sourceLabel = token.today_detectable ? 'Sensor' : 'Estimated';
      e.target.title = `${sourceLabel}: ${value.mock_signal}`;
      render(tokenId);
    });
  });
}

/* Quick visual: brief device flash on scenario/preset change. */
function flashDevice() {
  const device = document.querySelector('#preview-stage .device');
  if (!device) return;
  device.classList.remove('is-flashing');
  void device.offsetWidth;
  device.classList.add('is-flashing');
}

/* Pulse the validity card when autonomy/disclosure (the load-bearing axes) change. */
function pulseValidityIfRelevant(changedTokenId) {
  if (changedTokenId !== 'autonomy_dial' && changedTokenId !== 'disclosure_dial') return;
  const card = document.getElementById('output-autonomy');
  if (!card) return;
  card.classList.remove('is-flashing');
  void card.offsetWidth;
  card.classList.add('is-flashing');
}

/* ─── Validity headline (traffic-light + 1-sentence verdict) ─── */
function renderValidity(result) {
  const el = document.getElementById('output-autonomy');
  if (!el) return;

  const discLabel = titleCase(state.disclosure_dial);
  const autoLabel = titleCase(state.autonomy_dial);
  const ceilingLabel = result.autonomyCeiling ? titleCase(result.autonomyCeiling) : null;

  let stateLabel, label, verdict, rule;

  if (!result.autonomyValid) {
    stateLabel = 'invalid';
    label = 'Invalid';
    if (ceilingLabel) {
      verdict = `Disclosure <strong>${discLabel}</strong> caps Autonomy at <strong>${ceilingLabel}</strong>. You're at <strong>${autoLabel}</strong>.`;
    } else {
      verdict = `Disclosure = <strong>None</strong>. AI can't participate. Autonomy must be Suggest.`;
    }
    rule = 'AI cannot automate what it does not know.';
  } else if (state.disclosure_dial === 'none') {
    // Edge: disclosure none + autonomy suggest is technically valid, but AI is absent
    stateLabel = 'capped';
    label = 'AI absent';
    verdict = `No disclosure means no AI involvement in this domain.`;
    rule = 'AI cannot automate what it does not know.';
  } else {
    stateLabel = 'valid';
    label = 'Valid';
    verdict = `Disclosure <strong>${discLabel}</strong> permits Autonomy up to <strong>${ceilingLabel}</strong>. You're at <strong>${autoLabel}</strong>.`;
    rule = 'Disclosure is what limits AI autonomy.';
  }

  el.dataset.state = stateLabel;
  el.innerHTML = `
    <div class="validity-headline__top">
      <span class="validity-headline__dot" aria-hidden="true"></span>
      <span class="validity-headline__label">${label}</span>
    </div>
    <p class="validity-headline__verdict">${verdict}</p>
    <p class="validity-headline__rule">${rule}</p>
  `;
}

/* ─── Pattern listing — chip groups with per-group expand ─── */
function renderPatterns(result) {
  const patternsEl = document.getElementById('output-patterns');
  const countEl = document.getElementById('output-pattern-count');
  if (!patternsEl) return;

  countEl.textContent = `${result.triggered.length} of 23`;

  if (result.triggered.length === 0) {
    patternsEl.innerHTML = '<p class="output-empty">Nothing fires for this combination.</p>';
    return;
  }

  const grouped = { D: [], E: [], A: [], X: [] };
  result.triggered.forEach(p => grouped[p.category].push(p));

  patternsEl.innerHTML = `
    <div class="pattern-groups">
      ${['D', 'E', 'A', 'X'].filter(cat => grouped[cat].length > 0).map(cat => {
        const patterns = grouped[cat];
        return `
          <details class="pattern-group-row pattern-group--${cat.toLowerCase()}">
            <summary class="pattern-group-summary">
              <span class="pattern-group-badge">${cat}</span>
              <span class="pattern-group-name">${patterns[0].categoryName}</span>
              <span class="pattern-group-count">${patterns.length} firing</span>
            </summary>
            ${patterns.map(p => `
              <article class="pattern-item">
                <div class="pattern-item-header">
                  <span class="pattern-id">${p.id}</span>
                  <a class="pattern-name" href="../ax-patterns/#${p.id}" title="Open ${p.id} in the catalog">${p.name}</a>
                </div>
                <p class="pattern-essence">${p.essence}</p>
                <p class="pattern-trigger">
                  <span class="pattern-trigger__expr">${p.triggerHuman}</span>
                </p>
                ${p.extended ? `<p class="pattern-extended"><span class="chip chip--warn">Needs more signal</span> ${p.extended}</p>` : ''}
                <p class="pattern-example">${p.example}</p>
              </article>
            `).join('')}
          </details>
        `;
      }).join('')}
    </div>
  `;
}

/* ─── Overrides list + count ─── */
function renderOverrides(result) {
  const overridesEl = document.getElementById('output-overrides');
  const countEl = document.getElementById('output-override-count');
  const detailsEl = document.getElementById('overrides-details');
  if (!overridesEl) return;

  countEl.textContent = String(result.overrides.length);

  // Auto-open details when overrides exist
  if (detailsEl) detailsEl.open = result.overrides.length > 0;

  if (result.overrides.length === 0) {
    overridesEl.innerHTML = '<p class="output-empty">No overrides active.</p>';
    return;
  }

  overridesEl.innerHTML = result.overrides.map(o => `
    <div class="override-item override-item--${o.severity}">
      <span class="override-severity">${o.severity === 'hard' ? 'HARD RULE' : 'LOGICAL'}</span>
      <p class="override-name">${o.name}</p>
      <p class="override-effect">${o.effect}</p>
    </div>
  `).join('');
}

/* ─── Design rules dl ─── */
function renderDesignRules(result) {
  const rulesEl = document.getElementById('output-rules');
  if (!rulesEl) return;
  rulesEl.innerHTML = `
    <dl class="rules-list">
      <dt>UI density</dt><dd>${result.designRules.ui_density}</dd>
      <dt>Max choices</dt><dd>${result.designRules.max_choices}</dd>
      <dt>Touch target</dt><dd>${result.designRules.touch_target}</dd>
      <dt>Notifications</dt><dd>${result.designRules.notification_level}</dd>
      <dt>Content filter</dt><dd>${result.designRules.content_filter}</dd>
      <dt>AI capability</dt><dd>${result.designRules.ai_capability}</dd>
    </dl>
  `;
}

/* ─── Substitution — auto-shown only when relevant ─── */
function renderSubstitution(result) {
  const subEl = document.getElementById('output-substitution');
  const detailsEl = document.getElementById('substitution-details');
  if (!subEl) return;

  if (result.substitution) {
    if (detailsEl) {
      detailsEl.hidden = false;
      detailsEl.open = true;
    }
    subEl.innerHTML = `
      <div class="sub-card sub-card--active">
        <span class="sub-mode">${result.substitution.mode}</span>
        <p class="sub-reason">${result.substitution.reason}</p>
      </div>
    `;
  } else {
    if (detailsEl) detailsEl.hidden = true;
    subEl.innerHTML = '';
  }
}

function renderOutput() {
  const result = evaluateContextGrammar(state);
  renderValidity(result);
  renderPatterns(result);
  renderOverrides(result);
  renderDesignRules(result);
  renderSubstitution(result);

  // Live UI preview (visual mockup)
  if (window.SimPreview) {
    window.SimPreview.render(document.getElementById('preview-stage'), state, result);
  }
}

function renderPresets() {
  const container = document.getElementById('preset-grid');
  container.innerHTML = PRESETS.map(p => `
    <div class="preset-card">
      <button class="preset-btn" data-preset="${p.id}" type="button">
        <span class="preset-label">${p.label}</span>
        <span class="preset-desc">${p.description}</span>
      </button>
      ${p.project ? `<a class="preset-link" href="${p.project.url}" title="${p.project.label}">${p.project.label} →</a>` : ''}
    </div>
  `).join('');

  container.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = PRESETS.find(p => p.id === btn.dataset.preset);
      Object.assign(state, preset.state);
      renderTokenInputs();
      render();
      flashDevice();
      closeScenarios();
    });
  });
}

function render(changedTokenId) {
  renderOutput();
  pulseValidityIfRelevant(changedTokenId);
}

/* ─── Scenarios popover open/close ─── */
function openScenarios() {
  const pop = document.getElementById('scenarios-popover');
  const back = document.getElementById('scenarios-backdrop');
  const btn = document.getElementById('scenarios-toggle');
  if (!pop || !back || !btn) return;
  pop.hidden = false;
  back.hidden = false;
  btn.setAttribute('aria-expanded', 'true');
  // Move focus to first scenario card for keyboard users
  const firstBtn = pop.querySelector('.preset-btn');
  if (firstBtn) firstBtn.focus();
}
function closeScenarios() {
  const pop = document.getElementById('scenarios-popover');
  const back = document.getElementById('scenarios-backdrop');
  const btn = document.getElementById('scenarios-toggle');
  if (!pop || !back || !btn) return;
  pop.hidden = true;
  back.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
}

/* ─── Per-pattern demo states ─── */
/* For each AX Pattern, the state that makes it the most prominent firing pattern. */
const PATTERN_DEMO_STATES = {
  // DELEGATION
  D1: { autonomy_dial: 'confirm', priority_weight: 'high' },
  D2: { autonomy_dial: 'confirm', disclosure_dial: 'moderate' },
  D3: { cognitive_load: 'low', priority_weight: 'standard', feasibility: 'fully_feasible' },
  D4: { autonomy_dial: 'auto', disclosure_dial: 'full', priority_weight: 'low' },
  D5: { feasibility: 'partially_feasible', autonomy_dial: 'confirm' },
  D6: { autonomy_dial: 'auto', priority_weight: 'critical' },
  // ESCALATION
  E1: { social_exposure: 'public', disclosure_dial: 'moderate' },
  E2: { priority_weight: 'critical', autonomy_dial: 'suggest' },
  E3: { feasibility: 'infeasible', autonomy_dial: 'notify' },
  E4: { cognitive_load: 'moderate', autonomy_dial: 'confirm' },
  E5: { autonomy_dial: 'notify', disclosure_dial: 'moderate' },
  // ADAPTATION
  A1: { form_factor: 'tv_display', social_exposure: 'family_with_children' },
  A2: { cognitive_load: 'high', form_factor: 'phone_handheld' },
  A3: { social_exposure: 'family_with_children', disclosure_dial: 'moderate' },
  A4: { disclosure_dial: 'moderate', social_exposure: 'social_acquaintances' },
  A5: { priority_weight: 'high', form_factor: 'phone_handheld' },
  A6: { cognitive_load: 'low', priority_weight: 'low' },
  A7: { feasibility: 'partially_feasible', autonomy_dial: 'notify' },
  A8: { priority_weight: 'low', cognitive_load: 'low' },
  // ENTERPRISE
  X1: { priority_weight: 'high', form_factor: 'desktop_monitor', disclosure_dial: 'full' },
  X2: { autonomy_dial: 'confirm', form_factor: 'desktop_monitor' },
  X3: { autonomy_dial: 'confirm', disclosure_dial: 'moderate', form_factor: 'desktop_monitor' },
  X4: { priority_weight: 'high', disclosure_dial: 'full', form_factor: 'desktop_monitor' },
};

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);

  const presetId = params.get('preset');
  if (presetId) {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) Object.assign(state, preset.state);
    return { source: 'preset', label: preset ? preset.label : null };
  }

  const patternId = params.get('pattern');
  if (patternId && PATTERN_DEMO_STATES[patternId]) {
    Object.assign(state, PATTERN_DEMO_STATES[patternId]);
    return { source: 'pattern', label: patternId };
  }

  return null;
}

function showFocusBanner(focus) {
  if (!focus) return;
  const banner = document.getElementById('focus-banner');
  if (!banner) return;
  if (focus.source === 'pattern') {
    banner.innerHTML = `<span class="focus-eyebrow">Focused on</span> <strong>${focus.label}</strong> — token state set to make this pattern fire prominently. <a href="?" class="focus-clear">Clear focus</a>`;
  } else if (focus.source === 'preset') {
    banner.innerHTML = `<span class="focus-eyebrow">Loaded preset</span> <strong>${focus.label}</strong>. <a href="?" class="focus-clear">Reset</a>`;
  }
  banner.hidden = false;
}

function init() {
  const focus = applyUrlParams();
  renderTokenInputs();
  renderPresets();
  showFocusBanner(focus);
  render();

  // Reset
  document.getElementById('reset-btn').addEventListener('click', () => {
    Object.assign(state, DEFAULT_STATE);
    renderTokenInputs();
    render();
    flashDevice();
    const banner = document.getElementById('focus-banner');
    if (banner) banner.hidden = true;
  });

  // Mode toggle (Today / Near-future)
  document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-toggle-btn').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      mode = btn.dataset.mode;
      document.body.dataset.mode = mode;
    });
  });

  // Scenarios popover open / close
  const togglerBtn = document.getElementById('scenarios-toggle');
  if (togglerBtn) {
    togglerBtn.addEventListener('click', () => {
      const pop = document.getElementById('scenarios-popover');
      if (pop && pop.hidden) openScenarios();
      else closeScenarios();
    });
  }
  const closeBtn = document.getElementById('scenarios-close');
  if (closeBtn) closeBtn.addEventListener('click', closeScenarios);
  const backdrop = document.getElementById('scenarios-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeScenarios);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const pop = document.getElementById('scenarios-popover');
      if (pop && !pop.hidden) closeScenarios();
    }
  });

  // If a focus banner was shown (URL preset or pattern), open scenarios for context — not auto.
  // Just make sure flash fires once on initial load if a state was set.
  if (focus) flashDevice();
}

document.addEventListener('DOMContentLoaded', init);
