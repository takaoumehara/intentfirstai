/* ═══════════════════════════════════════════════════════════════
   Green Animation — Slot Manifest

   Maps semantic slot names → component names from green-animation.js.

   USAGE in HTML:
     <div data-ga-slot="p1-brain-identity"></div>

   To swap an animation everywhere it's used: edit the value here.
   To rename a slot: edit the key here AND search-replace in HTML.

   Load this BEFORE green-animation.js:
     <script src="/assets/js/ga-slots.js"></script>
     <script src="/assets/js/green-animation.js" defer></script>

   📝 To embed slots into new pages with another AI agent, see:
      /Global_Assets/GREEN_ANIMATION_EMBED.md
   ═══════════════════════════════════════════════════════════════ */

window.GA_SLOTS = {

  /* ─── Project 01 · Living Home ─── */
  'p1-hero-pipeline':         'pipeline',
  'p1-three-layers-overview': 'brain',
  'p1-brain-identity':        'brain-layer-1',
  'p1-brain-learning':        'brain-layer-2',
  'p1-brain-now':             'brain-layer-3',
  'p1-now-tokens':            'tokens',
  'p1-rule-engine':           'rule-engine',
  'p1-tokens-as-contract':    'tokens',
  'p1-five-home-brains':      'home-five-brains',  /* Five Home Brains Diagram — supports data-highlight=household|person|domain|coordinator|event */
  'p1-brain-agent-flow':      'home-brain-agent-flow',     /* Brain ↔ Coordinator ↔ Agent flow — bilingual (EN+JP) — used on JP pages */
  'p1-brain-agent-flow-en':   'home-brain-agent-flow-en',  /* Brain ↔ Coordinator ↔ Agent flow — English only — used on P1 EN scroll page */

  /* ─── Project 02 · Family Trip ─── */
  'p2-hero-disposable':       'disposable-brain-orbit',
  'p2-home-to-trip':          'brain',
  'p2-intent-fidelity':       'intent',
  'p2-disclosure-pre-trip':   'trust-coupling',
  'p2-proactive-tokens':      'tokens',
  'p2-graduated-archive':     'trust-coupling',

  /* ─── Project 03 · Fluid Handoff ─── */
  'p3-context-brain-moves':   'brain',
  'p3-intent-translation':    'intent',
  'p3-form-factor-modes':     'substitution',
  'p3-autonomy-ramp':         'trust-coupling',
  'p3-rule-engine-compile':   'rule-engine',
  'p3-shopping-fold-back':    'disposable-brain-orbit',

  /* ─── Project 04 · Project Atlas ─── */
  'p4-context-brain-org':     'pipeline',
  'p4-brain-hierarchy':       'brain-architecture',  /* Five Brain Diagram — supports data-highlight=org|brand|brand-b2c|brand-b2b|research|pmb|project */
  'p4-brain-3layers':         'brain',                /* basic 3-layer pills (legacy) */
  'p4-meeting-timeline':      'temporal-arc',
  'p4-project-brain-1':       'brain-layer-1',
  'p4-project-brain-2':       'brain-layer-2',
  'p4-project-brain-3':       'brain-layer-3',
  'p4-intent-fidelity':       'intent',

  /* ─── Project 05 · Control Tower ─── */
  'p5-autonomy-matrix':       'trust-coupling',
  'p5-multi-agent-cascade':   'rule-engine',
  'p5-three-trust-curves':    'temporal-arc',

  /* ─── Project 06 · Life Brain ─── */
  'p6-life-brain-arch':       'brain',
  'p6-moment-composer':       'rule-engine',
  'p6-per-domain-autonomy':   'trust-coupling',

  /* ─── Shared / cross-project hero animations ─── */
  'cg-human':                 'human',
  'cg-why':                   'pipeline',          /* Why CG: full grammar flow */
  'cg-checklist':             'ax-patterns',       /* Checklist: rule/pattern evaluation */
  'cg-pipeline':              'pipeline',
  'cg-pipeline-mobile':       'pipeline-vertical',
  'cg-tokens':                'tokens',
  'cg-brain':                 'brain',
  'cg-rule-engine':           'rule-engine',
  'cg-specs':                 'rule-constellation',
  'cg-ax-patterns':           'ax-patterns',
  'cg-intent':                'intent',
  'cg-trust-coupling':        'trust-coupling',
  'cg-temporal-arc':          'temporal-arc',
  'cg-substitution':          'substitution',

  /* Brain page — sub-layer + variant slots */
  'cg-brain-l1':              'brain-identity',     /* themed: card + portrait silhouette */
  'cg-brain-l2':              'brain-learning',     /* themed: accumulating bar chart */
  'cg-brain-l3':              'brain-now',          /* themed: 8-direction pulse */
  'cg-disposable-brain':      'disposable-brain-orbit',
  'cg-multi-person-brain':    'brain',
  'cg-multi-agent':           'multi-agent',        /* central Brain + 4 specialist agents */
};
