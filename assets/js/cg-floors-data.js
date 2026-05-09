/* Canonical floor descriptions — single source of truth for both index.html and context-grammar/index.html.
   Any page that includes this file and marks cells with data-cg-key="<key>" gets descriptions injected.
   Bilingual: picks JA when <html lang> starts with "ja", otherwise EN. */
window.CG_FLOOR_DESCS_EN = {
  'overview':    'The full pipeline from Intent to AX Patterns — seven entries, one framework. Start here.',
  'intent':      'Four channels of human signal — explicit, active, passive, ambient. Intent is a structured goal, not a text string.',
  'tokens':      'Eight signals AI reads about your situation — 6 context signals and 2 trust dials.',
  'brain':       'Three layers of memory — Identity, Learning, Right Now. Five Brain types. Every Brain has the same anatomy.',
  'rule-engine': 'Tokens × Brain → design rules. Three exits: Delegate, Escalate, Adapt.',
  'ax-patterns': '23 named patterns — Delivery, Escalation, Autonomy, Cross-cutting — describing how UI behaves when the Rule Engine fires.',
  'trust':       'Autonomy Dial: how much the system acts without asking. Disclosure Dial: how much you share. Per-domain. User-owned.',
  'specs':       'YAML schema definitions for Context Tokens, Brain layers, and AX Pattern triggers — portable across teams and platforms.'
};

window.CG_FLOOR_DESCS_JA = {
  'overview':    'IntentからAXパターンまでの全パイプライン — 7つの要素で、ひとつのフレームワーク。まずはここから。',
  'intent':      '人のシグナルを4つのチャネルで捉える — 明示・能動・受動・アンビエント。Intentは文字列ではなく、構造化されたゴール。',
  'tokens':      '6つの状況シグナルと2つの信頼ダイヤル。いまどこにいて、システムが責任を持って何をできるかを記述する変数。',
  'brain':       '3層の記憶 — Identity（変わらないもの）、Learning（蓄積するもの）、Now（いま流動しているもの）。すべてのBrainが同じ構造を持つ。',
  'rule-engine': 'Token × Brain → デザインルール。3つの出口は「任せる」「確認する」「適応する」。',
  'ax-patterns': '名前のついた23のパターン — Delivery、Escalation、Autonomy、Cross-cutting。Rule Engineが発火したときのUIの振る舞いを記述する。',
  'trust':       'Autonomy Dial:システムがどこまで確認なしに動くか。Disclosure Dial:どこまで共有するか。ドメインごとに、本人の手に。',
  'specs':       'Context Token、Brain層、AXパターンのトリガーをYAMLスキーマで定義 — チームをまたいで持ち運べる仕様に。'
};

/* Backwards-compat alias (in case older code references CG_FLOOR_DESCS). */
window.CG_FLOOR_DESCS = window.CG_FLOOR_DESCS_EN;

(function () {
  function update() {
    var lang = (document.documentElement.lang || 'en').toLowerCase();
    var descs = lang.indexOf('ja') === 0 ? window.CG_FLOOR_DESCS_JA : window.CG_FLOOR_DESCS_EN;
    document.querySelectorAll('[data-cg-key]').forEach(function (cell) {
      var key = cell.getAttribute('data-cg-key');
      var desc = descs[key];
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
