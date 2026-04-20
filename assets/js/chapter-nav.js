/* =============================================================
   intentfirst.ai — Chapter Navigation
   =============================================================
   Renders "Explore other chapters" section on CG sub-pages.

   Usage (inside <body>, before closing tag, on any CG sub-page):
     <div class="chapter-nav" data-current="grammar" data-base="../"></div>
     <script src="../../assets/js/chapter-nav.js"></script>

   data-current values match nav.js activePage:
     intent | grammar | brain | ruleengine | axpatterns | trust | specs

   data-base is the relative path from the sub-page back to
   context-grammar/ (typically "../").
   ============================================================= */

(function () {
  var CHAPTERS = [
    {
      id: 'intent',
      href: 'intent/index.html',
      img: 'IF-03-Intent-4layers.png',
      alt: 'Intent — four layers of user goals',
      title: 'Intent — What the User Wants',
      desc: 'Explicit or implicit. Four layers from stated goals to inferred intent. The "why" behind every interaction — and how tokens and memory reveal it.',
      tag: 'everyone',
      tagLabel: 'For everyone'
    },
    {
      id: 'grammar',
      href: 'grammar/index.html',
      img: 'IF-04.8tokens.png',
      alt: '8 Context Tokens grid',
      title: 'Grammar — 8 Context Tokens',
      desc: 'Six situation sensors that read your physical state, mental bandwidth, social context, priorities, device, and constraints. Plus two relationship dials and four Substitution Modes.',
      tag: 'designers',
      tagLabel: 'For designers'
    },
    {
      id: 'brain',
      href: 'brain/index.html',
      img: 'IF-05-brain3layers.png',
      alt: 'Context Brain 3-layer architecture',
      title: 'Context Brain — Three Layers of Memory',
      desc: 'Identity (who you are), Accumulated Learning (patterns over time), Right Now (live context). Plus Disposable Brain and multi-person orchestration.',
      tag: 'everyone',
      tagLabel: 'For everyone'
    },
    {
      id: 'ruleengine',
      href: 'rule-engine/index.html',
      img: 'IF-06-RuleEngine.png',
      alt: 'Rule Engine if/then architecture',
      title: 'Rule Engine — Context Becomes Action',
      desc: 'Where tokens and memory meet if/then logic. The layer that turns human state into concrete design rules — what to show, how to respond, how much autonomy to grant.',
      tag: 'engineers',
      tagLabel: 'For engineers'
    },
    {
      id: 'axpatterns',
      href: 'ax-patterns/index.html',
      img: 'IF-08-3directions.png',
      alt: 'AX Pattern Library — 3 directions',
      title: 'Response — 23 AX Patterns',
      desc: 'A pattern library for agent experience design. Delegation, escalation, and adaptation patterns with restaurant metaphors, wireframes, and token dependencies.',
      tag: 'designers',
      tagLabel: 'For designers'
    },
    {
      id: 'trust',
      href: 'trust-design/index.html',
      img: 'Trust-01.png',
      alt: 'Trust design framework',
      title: 'Trust Design — How Trust Builds and Breaks',
      desc: 'Disclosure Dial (what you share), Autonomy Dial (what AI can do), Dynamic Friction (risk caps autonomy), and the 6-month temporal arc from stranger to ambient trust.',
      tag: 'designers',
      tagLabel: 'For designers'
    },
    {
      id: 'specs',
      href: 'specs/index.html',
      img: 'IF_Specs_02_Tokens_Brains_Rules.png',
      alt: 'YAML specification files',
      title: 'Specs — Machine-Readable Specification',
      desc: 'Three YAML files (tokens, brain schema, 33 design rules) ready for Claude, ChatGPT, or your own agent framework. Open specification under CC BY 4.0.',
      tag: 'engineers',
      tagLabel: 'For engineers'
    }
  ];

  function escapeAttr(s) {
    return String(s).replace(/"/g, '&quot;');
  }

  function renderCard(c, base, delayIndex) {
    var delayClass = delayIndex > 0 ? ' d' + Math.min(delayIndex, 4) : '';
    return '<a href="' + base + c.href + '" class="toc-card reveal' + delayClass + '">'
      + '<img src="' + base + 'images/ISO-GREEN/' + c.img + '" alt="' + escapeAttr(c.alt) + '" class="toc-card-thumb" loading="lazy">'
      + '<div class="toc-card-body">'
      + '<h3 class="toc-card-title">' + c.title + '</h3>'
      + '<p class="toc-card-desc">' + c.desc + '</p>'
      + '<span class="toc-card-tag toc-card-tag--' + c.tag + '">' + c.tagLabel + '</span>'
      + '</div>'
      + '</a>';
  }

  function render(container) {
    var current = container.getAttribute('data-current') || '';
    var base = container.getAttribute('data-base') || '../';
    var filtered = CHAPTERS.filter(function (c) { return c.id !== current; });
    var cardsHtml = filtered.map(function (c, i) { return renderCard(c, base, i); }).join('');

    container.innerHTML =
      '<section class="chapter-nav-wrap">'
      + '<div class="chapter-nav-inner">'
      + '<p class="chapter-nav-label reveal">Keep Exploring</p>'
      + '<h2 class="chapter-nav-title reveal d1">Other Chapters</h2>'
      + '<p class="chapter-nav-desc reveal d2">Context Grammar has seven chapters. Each stands on its own — jump to whichever draws you next.</p>'
      + '<div class="toc-grid">' + cardsHtml + '</div>'
      + '</div>'
      + '</section>';
  }

  var containers = document.querySelectorAll('.chapter-nav');
  for (var i = 0; i < containers.length; i++) render(containers[i]);
})();
