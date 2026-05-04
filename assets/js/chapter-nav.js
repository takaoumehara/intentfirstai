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
    { id: 'intent',     href: 'intent/index.html',       title: 'Intent',          floor: 'Floor 1' },
    { id: 'tokens',     href: 'tokens/index.html',       title: 'Context Tokens',  floor: 'Floor 2' },
    { id: 'brain',      href: 'brain/index.html',        title: 'Brain',           floor: 'Floor 3' },
    { id: 'ruleengine', href: 'rule-engine/index.html',  title: 'Rule Engine',     floor: 'Floor 4' },
    { id: 'specs',      href: 'specs/index.html',        title: 'Specs',           floor: 'Reference · under Rule Engine' },
    { id: 'axpatterns', href: 'ax-patterns/index.html',  title: 'AX Patterns',     floor: 'Floor 5' },
    { id: 'trust',      href: 'trust-design/index.html', title: 'Trust Design',    floor: 'Side Stream' }
  ];

  function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }

  function renderLink(target, base, dir) {
    if (!target) {
      return '<div class="chapter-nav__pair-cell chapter-nav__pair-cell--empty"></div>';
    }
    var arrow = dir === 'prev' ? '←' : '→';
    var label = dir === 'prev' ? 'Previous' : 'Next';
    return '<a href="' + base + target.href + '" class="chapter-nav__pair-cell chapter-nav__pair-cell--' + dir + '">'
      + '<span class="chapter-nav__pair-label">' + arrow + ' ' + label + '</span>'
      + '<span class="chapter-nav__pair-floor">' + escapeAttr(target.floor) + '</span>'
      + '<span class="chapter-nav__pair-title">' + escapeAttr(target.title) + '</span>'
      + '</a>';
  }

  function render(container) {
    var current = container.getAttribute('data-current') || '';
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
