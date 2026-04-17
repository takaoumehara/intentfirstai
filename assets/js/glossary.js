/**
 * Glossary Tooltip System — intentfirst.ai
 *
 * Adds hover tooltips to any element with data-term="term-id".
 * Loads definitions from glossary-data.json (ja/en).
 *
 * USAGE:
 *   <script src="/assets/js/glossary.js"></script>
 *   Then mark terms: <span data-term="autonomy-dial">Autonomy Dial</span>
 *
 * CATEGORY COLORS (from tokens.css):
 *   grammar → --color-grammar (blue)
 *   brain   → --color-brain (purple)
 *   intent  → --color-intent (amber)
 */
(function () {
  'use strict';

  // Detect language from <html lang="">
  var lang = document.documentElement.lang === 'en' ? 'en' : 'ja';

  // Category → CSS color variable mapping
  var catColors = {
    grammar: 'var(--color-grammar, #6889b4)',
    brain: 'var(--color-brain, #8a6ab0)',
    intent: 'var(--color-intent, #a07040)'
  };

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '[data-term]{cursor:help;border-bottom:1px dotted currentColor;position:relative}',
    '.gl-tip{position:fixed;z-index:9999;max-width:360px;padding:14px 18px;border-radius:12px;font-family:var(--font-jp,sans-serif);font-size:14px;line-height:1.7;color:var(--text,#1a1816);background:var(--bg,#fdfcfa);border:1px solid var(--border,rgba(26,24,22,0.1));box-shadow:0 8px 32px rgba(0,0,0,0.12);pointer-events:none;opacity:0;transition:opacity 0.2s ease;white-space:normal}',
    '.gl-tip.visible{opacity:1}',
    '.gl-tip-cat{display:inline-block;font-family:var(--font-ui,sans-serif);font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:2px 8px;border-radius:4px;margin-bottom:8px}',
    '.gl-tip-cat--grammar{background:rgba(104,137,180,0.1);color:#6889b4}',
    '.gl-tip-cat--brain{background:rgba(138,106,176,0.1);color:#8a6ab0}',
    '.gl-tip-cat--intent{background:rgba(160,112,64,0.1);color:#a07040}',
    '@media(max-width:768px){.gl-tip{max-width:280px;font-size:13px;padding:12px 14px}}'
  ].join('\n');
  document.head.appendChild(style);

  // Create tooltip element
  var tip = document.createElement('div');
  tip.className = 'gl-tip';
  document.body.appendChild(tip);

  // Load glossary data
  var glossary = null;
  var dataPath = (function () {
    // Find the script tag to resolve relative path
    var scripts = document.querySelectorAll('script[src*="glossary"]');
    if (scripts.length > 0) {
      var src = scripts[scripts.length - 1].src;
      return src.replace('js/glossary.js', 'data/glossary-data.json');
    }
    return '/assets/data/glossary-data.json';
  })();

  fetch(dataPath)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      glossary = data;
      bindTerms();
    })
    .catch(function () {
      // Fallback: try relative path
      fetch('../../assets/data/glossary-data.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          glossary = data;
          bindTerms();
        })
        .catch(function () { /* silently fail */ });
    });

  function bindTerms() {
    var terms = document.querySelectorAll('[data-term]');
    terms.forEach(function (el) {
      el.addEventListener('mouseenter', showTip);
      el.addEventListener('mouseleave', hideTip);
      el.addEventListener('touchstart', function (e) {
        e.preventDefault();
        showTip.call(el, e);
        setTimeout(hideTip, 3000);
      }, { passive: false });
    });
  }

  function showTip(e) {
    if (!glossary) return;
    var termId = this.getAttribute('data-term');
    var entry = glossary[termId];
    if (!entry) return;

    var catLabel = { grammar: 'Grammar', brain: 'Brain', intent: 'Intent / Dial' };
    var catClass = 'gl-tip-cat--' + (entry.category || 'grammar');

    tip.innerHTML =
      '<div class="gl-tip-cat ' + catClass + '">' + (catLabel[entry.category] || 'Term') + '</div>' +
      '<div>' + entry[lang] + '</div>';

    // Position near the element
    var rect = this.getBoundingClientRect();
    var tipW = 360;
    var left = rect.left;
    var top = rect.bottom + 8;

    // Keep on screen
    if (left + tipW > window.innerWidth) left = window.innerWidth - tipW - 16;
    if (left < 8) left = 8;
    if (top + 200 > window.innerHeight) top = rect.top - 8; // flip above

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tip.classList.add('visible');
  }

  function hideTip() {
    tip.classList.remove('visible');
  }

})();
