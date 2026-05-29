/* =============================================================
   intentfirst.ai — Chapter Navigation (Prev / Next)
   =============================================================
   Renders a tight Prev / Next pair at the bottom of CG sub-pages.
   Replaces the older 7-card "Other Chapters" grid (retired 2026-04-27).

   Usage (inside <body>, before closing tag, on any CG sub-page):
     <div class="chapter-nav" data-current="tokens" data-base="../"></div>
     <script src="../../assets/js/chapter-nav.js"></script>

   data-current values:
     intent | tokens | brain | ruleengine | specs | axpatterns | trust

   data-base is the relative path from the sub-page back to
   context-grammar/ (typically "../").
   ============================================================= */

(function () {
  // Linear reading order — Specs nests under Rule Engine but appears
  // here as the next-step continuation for "the engineering layer."
  var ORDER = [
    { id: 'intent',            href: 'intent/index.html',            title: 'Intent',               titleJa: 'Intent',          floor: 'Stage 1',                             floorJa: 'Stage 1' },
    { id: 'signals',           href: 'signals/index.html',           title: 'Situation Signals',    titleJa: '状況シグナル',    floor: 'Stage 2',                             floorJa: 'Stage 2' },
    { id: 'dials',             href: 'dials/index.html',             title: 'Relationship Dials',   titleJa: '関係性ダイヤル',  floor: 'Stage 3',                             floorJa: 'Stage 3' },
    { id: 'brain',             href: 'brain/index.html',             title: 'Brain',               titleJa: 'Brain',           floor: 'Always-On',                           floorJa: '常時起動' },
    { id: 'ruleengine',        href: 'rule-engine/index.html',       title: 'Rule Engine',          titleJa: 'Rule Engine',     floor: 'Stage 4',                             floorJa: 'Stage 4' },
    { id: 'specs',             href: 'specs/index.html',             title: 'Specs',               titleJa: 'Specs',           floor: 'Reference · under Rule Engine',       floorJa: 'リファレンス（ルールエンジンの下）' },
    { id: 'negotiation-gate',  href: 'negotiation-gate/index.html',  title: 'Negotiation Gate',     titleJa: '交渉ゲート',      floor: 'Stage 5',                             floorJa: 'Stage 5' },
    { id: 'axpatterns',        href: 'ax-patterns/index.html',       title: 'AX Patterns',          titleJa: 'AX Patterns',     floor: 'Stage 6',                             floorJa: 'Stage 6' },
    { id: 'trust',             href: 'trust/index.html',             title: 'Trust Design',         titleJa: '信頼設計',        floor: 'Always-On',                           floorJa: '常時起動' }
  ];

  function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }

  function renderLink(target, base, dir) {
    if (!target) {
      return '<div class="chapter-nav__pair-cell chapter-nav__pair-cell--empty"></div>';
    }
    var isJa = document.documentElement.lang === 'ja' || window.location.pathname.includes('/ja/');
    var arrow = dir === 'prev' ? '←' : '→';
    var label = isJa ? (dir === 'prev' ? '前へ' : '次へ') : (dir === 'prev' ? 'Previous' : 'Next');
    var title = isJa ? (target.titleJa || target.title) : target.title;
    var floor = isJa ? (target.floorJa || target.floor) : target.floor;
    return '<a href="' + base + target.href + '" class="chapter-nav__pair-cell chapter-nav__pair-cell--' + dir + '">'
      + '<span class="chapter-nav__pair-label">' + arrow + ' ' + label + '</span>'
      + '<span class="chapter-nav__pair-floor">' + escapeAttr(floor) + '</span>'
      + '<span class="chapter-nav__pair-title">' + escapeAttr(title) + '</span>'
      + '</a>';
  }

  function render(container) {
    var current = container.getAttribute('data-current') || '';
    if (current === 'trust-design') current = 'trust';
    if (current === 'tokens') current = 'signals';
    var base = container.getAttribute('data-base') || '../';
    var idx = -1;
    for (var i = 0; i < ORDER.length; i++) {
      if (ORDER[i].id === current) { idx = i; break; }
    }
    var prev = idx > 0 ? ORDER[idx - 1] : null;
    var next = idx >= 0 && idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

    container.innerHTML =
      '<nav class="chapter-nav__pair reveal" aria-label="Continue reading">'
      + renderLink(prev, base, 'prev')
      + renderLink(next, base, 'next')
      + '</nav>';
  }

  var containers = document.querySelectorAll('.chapter-nav');
  for (var i = 0; i < containers.length; i++) render(containers[i]);
})();
