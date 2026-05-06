/* Canonical floor descriptions — single source of truth for both index.html and context-grammar/index.html.
   Any page that includes this file and marks cells with data-cg-key="<key>" gets descriptions injected. */
window.CG_FLOOR_DESCS = {
  'intent':      'Four channels of human signal — explicit, active, passive, ambient. Intent is a structured goal, not a text string.',
  'tokens':      'Eight signals AI reads about your situation — 6 context signals and 2 trust dials.',
  'brain':       'Three layers of memory — Identity, Learning, Right Now. Five Brain types. Every Brain has the same anatomy.',
  'rule-engine': 'Tokens × Brain → design rules. Three exits: Delegate, Escalate, Adapt.',
  'ax-patterns': '23 named patterns — Delivery, Escalation, Autonomy, Cross-cutting — describing how UI behaves when the Rule Engine fires.',
  'trust':       'Autonomy Dial: how much the system acts without asking. Disclosure Dial: how much you share. Per-domain. User-owned.',
  'specs':       'YAML schema definitions for Context Tokens, Brain layers, and AX Pattern triggers — portable across teams and platforms.'
};

(function () {
  function update() {
    document.querySelectorAll('[data-cg-key]').forEach(function (cell) {
      var key = cell.getAttribute('data-cg-key');
      var desc = window.CG_FLOOR_DESCS[key];
      if (!desc) return;
      var el = cell.querySelector('.cg-cell__desc, .floor-cell__desc');
      if (el) el.textContent = desc;
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }
})();
