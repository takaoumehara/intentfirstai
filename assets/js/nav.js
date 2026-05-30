/* =============================================================
   intentfirst.ai — Shared Navigation
   =============================================================
   Usage:
     <link rel="stylesheet" href="[basePath]assets/css/nav.css">
     <script src="[basePath]assets/js/nav.js"></script>
     <script>
       initNav({ basePath: '../', activePage: 'about', lang: 'en' });
     </script>

   Options:
     basePath   — relative path to site root ('', '../', '../../')
     activePage — 'home'|'simulator'|'intent'|'signals'|'dials'|'trust'|'tokens'(legacy alias for signals)|'brain'|'ruleengine'|'specs'|'axpatterns'|'projects'|'about'
     lang       — 'en' or 'ja'
   ============================================================= */

/* ─── Multi-page view transition direction restorer ───
   Runs before any other script. If the previous page set a direction
   in sessionStorage, apply it to <html> NOW so that the browser's
   inbound view transition uses the matching keyframes. The class is
   removed after the transition settles so subsequent navs are clean. */
(function () {
  try {
    var theme = localStorage.getItem('cg-theme') || 'light';
    if (!document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    var dir = sessionStorage.getItem('cgnav-dir');
    if (!dir) return;
    sessionStorage.removeItem('cgnav-dir');
    document.documentElement.classList.add('cgnav-' + dir);
    setTimeout(function () {
      document.documentElement.classList.remove('cgnav-' + dir);
    }, 900);
  } catch (e) { /* sessionStorage/localStorage may be blocked — ignore */ }
})();

function initGlossaryAndCommandK(opts) {
  opts = opts || {};
  if (window.__ifGlossaryAndCommandKReady) return;
  window.__ifGlossaryAndCommandKReady = true;

  var rootPrefix = (opts.rootPrefix || '').replace(/\/$/, '');
  var lang = opts.lang === 'ja' ? 'ja' : 'en';
  var cgLangInside = !!opts.cgLangInside;
  var base = rootPrefix ? rootPrefix + '/' : '';

  function ensureGlossaryCss() {
    if (document.querySelector('link[href*="assets/css/glossary.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = base + 'assets/css/glossary.css';
    document.head.appendChild(link);
  }

  function ensureGlossaryDb(cb) {
    if (window.GLOSSARY_DB && window.GLOSSARY_DB.length) {
      cb();
      return;
    }
    var existing = document.querySelector('script[src*="assets/js/glossary-db.js"]');
    if (existing) {
      existing.addEventListener('load', cb, { once: true });
      existing.addEventListener('error', function () { /* ignore */ }, { once: true });
      return;
    }
    var script = document.createElement('script');
    script.src = base + 'assets/js/glossary-db.js';
    script.defer = true;
    script.onload = cb;
    script.onerror = function () { /* ignore */ };
    document.head.appendChild(script);
  }

  function ensurePaletteIndex(cb) {
    if (window.buildPaletteIndex) {
      cb();
      return;
    }
    var existing = document.querySelector('script[src*="assets/js/palette-index.js"]');
    if (existing) {
      existing.addEventListener('load', cb, { once: true });
      existing.addEventListener('error', function () { /* ignore */ }, { once: true });
      return;
    }
    var script = document.createElement('script');
    script.src = base + 'assets/js/palette-index.js';
    script.defer = true;
    script.onload = cb;
    script.onerror = function () { /* ignore */ };
    document.head.appendChild(script);
  }

  function normalizeText(s) {
    return String(s || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function looksLatin(s) {
    return /^[A-Za-z0-9 .·()&/+\-–—]+$/.test(s);
  }

  function localizeTargetPath(path) {
    if (!path) return '';
    var p = String(path).replace(/^\/+/, '');
    if (lang !== 'ja') return p;
    if (!cgLangInside) return p;
    if (p.indexOf('context-grammar/ja/') === 0) return p;
    if (p.indexOf('context-grammar/') === 0) return p.replace('context-grammar/', 'context-grammar/ja/');
    return p;
  }

  function buildGlossaryMap() {
    var db = Array.isArray(window.GLOSSARY_DB) ? window.GLOSSARY_DB : [];
    var byId = {};
    var termToId = {};
    var terms = [];
    db.forEach(function (entry) {
      byId[entry.id] = entry;
      var variants = [];
      if (entry.name) {
        variants.push(entry.name.en, entry.name.ja);
      }
      if (entry.shortName) {
        variants.push(entry.shortName.en, entry.shortName.ja);
      }
      variants.forEach(function (v) {
        var n = normalizeText(v);
        if (!n || n.length < 3) return;
        // Avoid noisy inline wrapping for generic short words like "Exact".
        if (looksLatin(n) && /^[a-z0-9]+$/.test(n) && n.length < 7) return;
        if (!termToId[n]) termToId[n] = entry.id;
      });
    });
    Object.keys(termToId).forEach(function (k) { terms.push(k); });
    terms.sort(function (a, b) { return b.length - a.length; });
    return { byId: byId, termToId: termToId, terms: terms };
  }

  function buildPattern(terms) {
    if (!terms.length) return null;
    var alt = terms.map(escapeRegex).join('|');
    return new RegExp('(' + alt + ')', 'gi');
  }

  function isBoundarySafe(text, idx, matched) {
    if (!looksLatin(matched)) return true;
    var before = idx > 0 ? text.charAt(idx - 1) : '';
    var after = idx + matched.length < text.length ? text.charAt(idx + matched.length) : '';
    var wb = /[A-Za-z0-9]/;
    return !wb.test(before) && !wb.test(after);
  }

  function shouldSkipNode(node) {
    if (!node || !node.parentElement) return true;
    var el = node.parentElement;
    if (el.closest('.site-nav, .cg-popover, .glossary-popover, .glossary-term, .if-cmdk-modal, .if-cmdk-toggle, [data-term]')) return true;
    if (el.closest('a, button, code, pre, kbd, samp, textarea, input, select, option, [contenteditable="true"]')) return true;
    var tag = el.tagName;
    if (!tag) return true;
    if (/^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE|KBD|SAMP|TEXTAREA|INPUT|SELECT|OPTION|BUTTON|A)$/i.test(tag)) return true;
    return false;
  }

  function wrapGlossaryTerms(state) {
    if (document.body.hasAttribute('data-glossary-wrapped')) return;
    var root = document.querySelector('main') || document.body;
    var pattern = state.pattern;
    if (!root || !pattern) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;
        var txt = node.nodeValue || '';
        if (txt.trim().length < 3) return NodeFilter.FILTER_REJECT;
        pattern.lastIndex = 0;
        if (!pattern.test(txt)) return NodeFilter.FILTER_REJECT;
        pattern.lastIndex = 0;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (textNode) {
      var text = textNode.nodeValue;
      pattern.lastIndex = 0;
      var match;
      var last = 0;
      var frag = null;
      while ((match = pattern.exec(text)) !== null) {
        var matched = match[0];
        var idx = match.index;
        if (!isBoundarySafe(text, idx, matched)) continue;
        var id = state.termToId[normalizeText(matched)];
        if (!id) continue;
        if (!frag) frag = document.createDocumentFragment();
        if (idx > last) frag.appendChild(document.createTextNode(text.slice(last, idx)));
        var span = document.createElement('span');
        span.className = 'glossary-term';
        span.setAttribute('data-term-id', id);
        span.setAttribute('tabindex', '0');
        span.setAttribute('role', 'button');
        span.textContent = matched;
        frag.appendChild(span);
        last = idx + matched.length;
      }
      if (!frag) return;
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });

    document.body.setAttribute('data-glossary-wrapped', 'true');
  }

  function ensurePopoverDom() {
    var pop = document.querySelector('.glossary-popover');
    if (pop) return pop;
    pop = document.createElement('div');
    pop.className = 'glossary-popover';
    pop.innerHTML = ''
      + '<div class="glossary-popover__content">'
      + '  <div class="glossary-popover__meta"><span class="glossary-popover__category"></span><span class="glossary-popover__stage"></span></div>'
      + '  <h4 class="glossary-popover__title"></h4>'
      + '  <p class="glossary-popover__definition"></p>'
      + '  <div class="glossary-popover__metaphor">'
      + '    <div class="glossary-popover__metaphor-title">Restaurant Metaphor</div>'
      + '    <p class="glossary-popover__metaphor-text"></p>'
      + '  </div>'
      + '  <hr class="glossary-popover__divider">'
      + '  <div class="glossary-popover__actions">'
      + '    <a class="glossary-popover__read-link" href="#">Read Spec →</a>'
      + '    <div class="glossary-popover__see-also"></div>'
      + '  </div>'
      + '</div>';
    document.body.appendChild(pop);
    return pop;
  }

  function positionPopover(pop, target) {
    var rect = target.getBoundingClientRect();
    var pRect = pop.getBoundingClientRect();
    var top = rect.bottom + window.scrollY + 10;
    var left = rect.left + window.scrollX;
    var maxLeft = window.scrollX + window.innerWidth - pRect.width - 16;
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + 8) left = window.scrollX + 8;
    if (top + pRect.height > window.scrollY + window.innerHeight - 8) {
      top = rect.top + window.scrollY - pRect.height - 12;
    }
    pop.style.top = Math.max(window.scrollY + 8, top) + 'px';
    pop.style.left = left + 'px';
  }

  function bindGlossaryPopover(state) {
    var pop = ensurePopoverDom();
    var content = pop.querySelector('.glossary-popover__content');
    var title = pop.querySelector('.glossary-popover__title');
    var def = pop.querySelector('.glossary-popover__definition');
    var metaCat = pop.querySelector('.glossary-popover__category');
    var metaStage = pop.querySelector('.glossary-popover__stage');
    var metaphor = pop.querySelector('.glossary-popover__metaphor-text');
    var readLink = pop.querySelector('.glossary-popover__read-link');
    var seeAlso = pop.querySelector('.glossary-popover__see-also');
    var activeTerm = null;
    var hideTimer = null;
    var currentId = null;

    function renderById(id) {
      var entry = state.byId[id];
      if (!entry) return;
      currentId = id;
      var name = (entry.name && entry.name[lang]) || (entry.shortName && entry.shortName[lang]) || id;
      var category = entry.category || 'term';
      var definition = (entry.definition && entry.definition[lang]) || '';
      var metaphorText = (entry.metaphor && entry.metaphor[lang]) || '';
      var anchor = entry.anchor ? ('#' + entry.anchor) : '';
      var targetPath = localizeTargetPath(entry.targetPath);
      title.textContent = name;
      def.textContent = definition;
      metaCat.textContent = String(category).toUpperCase();
      metaStage.textContent = targetPath.indexOf('context-grammar/') === 0 ? 'Context Grammar' : '';
      metaphor.textContent = metaphorText;
      readLink.href = base + targetPath + anchor;
      readLink.textContent = lang === 'ja' ? '詳しく読む →' : 'Read Spec →';
      seeAlso.innerHTML = '';
      (entry.seeAlso || []).forEach(function (sid) {
        var se = state.byId[sid];
        if (!se) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'glossary-jump-pill';
        btn.setAttribute('data-target-id', sid);
        btn.textContent = (se.shortName && se.shortName[lang]) || (se.name && se.name[lang]) || sid;
        seeAlso.appendChild(btn);
      });
    }

    function openForTerm(termEl) {
      clearTimeout(hideTimer);
      activeTerm = termEl;
      renderById(termEl.getAttribute('data-term-id'));
      pop.classList.add('is-active');
      pop.style.visibility = 'hidden';
      pop.style.display = 'block';
      positionPopover(pop, termEl);
      pop.style.visibility = '';
    }

    function closePopoverSoon() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        pop.classList.remove('is-active');
        activeTerm = null;
      }, 120);
    }

    document.addEventListener('mouseover', function (e) {
      var term = e.target.closest('.glossary-term');
      if (!term) return;
      openForTerm(term);
    });
    document.addEventListener('focusin', function (e) {
      var term = e.target.closest('.glossary-term');
      if (!term) return;
      openForTerm(term);
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('.glossary-term')) closePopoverSoon();
    });
    pop.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
    pop.addEventListener('mouseleave', closePopoverSoon);
    document.addEventListener('click', function (e) {
      if (e.target.closest('.glossary-term')) return;
      if (e.target.closest('.glossary-popover')) return;
      pop.classList.remove('is-active');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') pop.classList.remove('is-active');
    });
    window.addEventListener('scroll', function () {
      if (activeTerm && pop.classList.contains('is-active')) positionPopover(pop, activeTerm);
    }, { passive: true });
    window.addEventListener('resize', function () {
      if (activeTerm && pop.classList.contains('is-active')) positionPopover(pop, activeTerm);
    });

    pop.addEventListener('click', function (e) {
      var jump = e.target.closest('.glossary-jump-pill');
      if (!jump) return;
      e.preventDefault();
      var targetId = jump.getAttribute('data-target-id');
      if (!targetId || !state.byId[targetId]) return;
      content.classList.add('popover-transitioning');
      setTimeout(function () {
        renderById(targetId);
        content.classList.remove('popover-transitioning');
      }, 150);
    });
  }

  function initCommandK() {
    if (window.__ifCommandKApi) return window.__ifCommandKApi;
    var modal = document.createElement('dialog');
    modal.className = 'if-cmdk-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = ''
      + '<div class="if-cmdk-panel" role="document">'
      + '  <div class="if-cmdk-head">'
      + '    <span class="if-cmdk-kbd">' + (lang === 'ja' ? '検索' : 'Search') + '</span>'
      + '    <input class="if-cmdk-input" type="text" autocomplete="off" placeholder="' + (lang === 'ja' ? 'ページ・用語を検索…' : 'Search pages and terms…') + '">'
      + '    <button class="if-cmdk-close" type="button" aria-label="Close Command K">Esc</button>'
      + '  </div>'
      + '  <div class="if-cmdk-body">'
      + '    <ul class="if-cmdk-results"></ul>'
      + '    <div class="if-cmdk-preview"></div>'
      + '  </div>'
      + '</div>';
    document.body.appendChild(modal);

    var input = modal.querySelector('.if-cmdk-input');
    var resultsEl = modal.querySelector('.if-cmdk-results');
    var previewEl = modal.querySelector('.if-cmdk-preview');
    var closeBtn = modal.querySelector('.if-cmdk-close');
    var items = [];
    var glossaryById = {};
    var lastFocusedBeforeCmdk = null;
    var activeResults = [];

    modal.setAttribute('aria-label', 'Command K');
    input.setAttribute('aria-label', lang === 'ja' ? 'ページと用語を検索' : 'Search pages and terms');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', 'if-cmdk-results');
    input.setAttribute('aria-autocomplete', 'list');
    resultsEl.id = 'if-cmdk-results';
    resultsEl.setAttribute('role', 'listbox');

    function buildPageItems() {
      var out = [];
      var rows = document.querySelectorAll('.site-nav__list .site-nav__main, .site-nav__list .site-nav__sub');
      rows.forEach(function (a) {
        var title = a.textContent.trim();
        var href = a.getAttribute('href');
        if (!title || !href) return;
        out.push({ type: 'page', title: title, subtitle: href.replace(/^https?:\/\/[^/]+/, ''), href: href, tags: [title.toLowerCase()] });
      });
      return out;
    }

    function buildGlossaryItems() {
      var out = [];
      (window.GLOSSARY_DB || []).forEach(function (entry) {
        var title = (entry.name && entry.name[lang]) || (entry.shortName && entry.shortName[lang]) || entry.id;
        var subtitle = (entry.definition && entry.definition[lang]) || '';
        var targetPath = localizeTargetPath(entry.targetPath);
        var href = base + targetPath + (entry.anchor ? ('#' + entry.anchor) : '');
        out.push({
          type: 'glossary',
          id: entry.id,
          category: entry.category || 'term',
          title: title,
          subtitle: subtitle,
          metaphor: (entry.metaphor && entry.metaphor[lang]) || '',
          seeAlso: Array.isArray(entry.seeAlso) ? entry.seeAlso.slice() : [],
          href: href,
          tags: (entry.tags || []).concat([entry.id, entry.category || '']).map(function (t) { return String(t).toLowerCase(); })
        });
      });
      return out;
    }

    function refreshItems() {
      if (typeof window.buildPaletteIndex === 'function') {
        items = window.buildPaletteIndex(lang, base);
      } else {
        items = buildPageItems().concat(buildGlossaryItems());
      }
      glossaryById = {};
      items.forEach(function (item) {
        if (item.type === 'glossary' && item.id) glossaryById[item.id] = item;
      });
      renderResults(input.value || '');
    }

    function score(item, q) {
      if (!q) return 1;
      var t = item.title.toLowerCase();
      var s = item.subtitle.toLowerCase();
      if (t === q) return 100;
      if (t.indexOf(q) === 0) return 80;
      if (t.indexOf(q) !== -1) return 60;
      if (s.indexOf(q) !== -1) return 40;
      if ((item.tags || []).some(function (tag) { return tag.indexOf(q) !== -1; })) return 30;
      return 0;
    }

    function renderPreview(item) {
      if (!item) {
        previewEl.innerHTML = '<p class="if-cmdk-empty">' + (lang === 'ja' ? '用語またはページを選択してください。' : 'Select a term or page.') + '</p>';
        return;
      }
      if (item.type === 'glossary') {
        var related = (item.seeAlso || []).map(function (sid) {
          var target = glossaryById[sid];
          if (!target) return '';
          return '<button type="button" class="if-cmdk-rel-pill" data-related-id="' + sid + '">' + target.title + '</button>';
        }).filter(Boolean).join('');
        previewEl.innerHTML = ''
          + '<p class="if-cmdk-type">Glossary · ' + String(item.category || 'term').toUpperCase() + '</p>'
          + '<h4>' + item.title + '</h4>'
          + '<p>' + item.subtitle + '</p>'
          + '<p class="if-cmdk-metaphor">' + item.metaphor + '</p>'
          + (related ? '<div class="if-cmdk-related"><p class="if-cmdk-related-label">' + (lang === 'ja' ? '関連語' : 'Related terms') + '</p><div class="if-cmdk-related-pills">' + related + '</div></div>' : '');
      } else {
        previewEl.innerHTML = ''
          + '<p class="if-cmdk-type">Page</p>'
          + '<h4>' + item.title + '</h4>'
          + '<p>' + item.subtitle + '</p>';
      }
    }

    function setActiveByIndex(idx) {
      var list = Array.prototype.slice.call(resultsEl.querySelectorAll('.if-cmdk-item'));
      if (!list.length || idx < 0 || idx >= list.length) return;
      list.forEach(function (el) {
        el.classList.remove('is-active');
        el.setAttribute('aria-selected', 'false');
      });
      list[idx].classList.add('is-active');
      list[idx].setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', list[idx].id);
      renderPreview(activeResults[idx]);
      list[idx].scrollIntoView({ block: 'nearest' });
    }

    function activateRelatedTerm(termId) {
      var idx = activeResults.findIndex(function (it) { return it.type === 'glossary' && it.id === termId; });
      if (idx >= 0) {
        setActiveByIndex(idx);
        return;
      }
      var target = glossaryById[termId];
      if (!target) return;
      input.value = target.title;
      renderResults(target.title);
      var firstGlossaryIdx = activeResults.findIndex(function (it) { return it.type === 'glossary' && it.id === termId; });
      if (firstGlossaryIdx >= 0) setActiveByIndex(firstGlossaryIdx);
    }

    function renderResults(q) {
      var query = normalizeText(q || '');
      var ranked = items.map(function (item) {
        return { item: item, score: score(item, query) };
      }).filter(function (x) { return x.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 18)
        .map(function (x) { return x.item; });
      resultsEl.innerHTML = '';
      activeResults = ranked;
      ranked.forEach(function (item, idx) {
        var li = document.createElement('li');
        var optionId = 'if-cmdk-option-' + idx;
        li.className = 'if-cmdk-item' + (idx === 0 ? ' is-active' : '');
        li.id = optionId;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        li.setAttribute('data-href', item.href);
        li.innerHTML = '<strong>' + item.title + '</strong><span>' + item.subtitle + '</span>';
        li.addEventListener('mouseenter', function () {
          resultsEl.querySelectorAll('.if-cmdk-item').forEach(function (el) {
            el.classList.remove('is-active');
            el.setAttribute('aria-selected', 'false');
          });
          li.classList.add('is-active');
          li.setAttribute('aria-selected', 'true');
          input.setAttribute('aria-activedescendant', optionId);
          renderPreview(item);
        });
        li.addEventListener('click', function () {
          window.location.href = item.href;
        });
        resultsEl.appendChild(li);
      });
      if (ranked[0]) input.setAttribute('aria-activedescendant', 'if-cmdk-option-0');
      else input.removeAttribute('aria-activedescendant');
      renderPreview(ranked[0] || null);
    }

    function syncClosed(restoreFocus) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      if (restoreFocus && lastFocusedBeforeCmdk && typeof lastFocusedBeforeCmdk.focus === 'function') {
        lastFocusedBeforeCmdk.focus();
      }
    }

    function closeModal() {
      if (typeof modal.close === 'function' && modal.open) modal.close();
      else modal.removeAttribute('open');
      syncClosed(true);
    }

    function openModal() {
      lastFocusedBeforeCmdk = document.activeElement;
      if (typeof modal.showModal === 'function' && !modal.open) modal.showModal();
      else modal.setAttribute('open', '');
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      input.setAttribute('aria-expanded', 'true');
      input.value = '';
      refreshItems();
      setTimeout(function () { input.focus(); }, 0);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    modal.addEventListener('close', function () { syncClosed(true); });
    closeBtn.addEventListener('click', closeModal);
    previewEl.addEventListener('click', function (e) {
      var pill = e.target.closest('.if-cmdk-rel-pill');
      if (!pill) return;
      e.preventDefault();
      activateRelatedTerm(pill.getAttribute('data-related-id'));
    });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('is-open')) closeModal(); else openModal();
        return;
      }
      if (e.key === '/' && !modal.classList.contains('is-open')) {
        var t = e.target;
        var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
        if (!typing) {
          e.preventDefault();
          openModal();
        }
      }
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') {
        var focusable = Array.prototype.slice.call(modal.querySelectorAll('input, button, [href], [tabindex]:not([tabindex="-1"])')).filter(function (el) {
          return el.offsetParent !== null;
        });
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var list = Array.prototype.slice.call(resultsEl.querySelectorAll('.if-cmdk-item'));
        if (!list.length) return;
        var idx = list.findIndex(function (el) { return el.classList.contains('is-active'); });
        if (idx < 0) idx = 0;
        idx = e.key === 'ArrowDown' ? (idx + 1) % list.length : (idx - 1 + list.length) % list.length;
        setActiveByIndex(idx);
      }
      if (e.key === 'Enter') {
        var active = resultsEl.querySelector('.if-cmdk-item.is-active');
        if (active) window.location.href = active.getAttribute('data-href');
      }
    });
    input.addEventListener('input', function () { renderResults(input.value); });

    refreshItems();

    var cmdkButtons = document.querySelectorAll('.if-cmdk-toggle');
    cmdkButtons.forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(); });
    });

    window.__ifCommandKApi = {
      open: openModal,
      close: closeModal,
      refresh: refreshItems
    };
    return window.__ifCommandKApi;
  }

  ensureGlossaryCss();
  var commandK = initCommandK();
  ensureGlossaryDb(function () {
    if (window.GLOSSARY_DB && window.GLOSSARY_DB.length) {
      var state = buildGlossaryMap();
      state.pattern = buildPattern(state.terms);
      wrapGlossaryTerms(state);
      bindGlossaryPopover(state);
    }
    ensurePaletteIndex(function () {
      if (commandK && typeof commandK.refresh === 'function') commandK.refresh();
    });
  });
}

function initSiteNavCompat(opts) {
  opts = opts || {};
  var bp = opts.basePath || '';
  var rootPrefix = bp.replace(/\/$/, '');
  var navLang = opts.lang || 'en';
  var langDir = (navLang === 'ja') ? 'ja/' : '';
  var cgRoot = (opts.contextGrammarRoot || 'context-grammar').replace(/^\/+|\/+$/g, '');
  var cgLangInside = !!opts.contextGrammarLangInside;
  var prefix = function (href) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return (rootPrefix ? rootPrefix + '/' : '') + langDir + href;
  };
  var prefixCg = function (href) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    var cleanHref = href.replace(/^\/+/, '');
    if (cgLangInside) {
      var cgLangDir = (navLang === 'ja') ? 'ja/' : '';
      return (rootPrefix ? rootPrefix + '/' : '') + cgRoot + '/' + cgLangDir + cleanHref;
    }
    return (rootPrefix ? rootPrefix + '/' : '') + langDir + cgRoot + '/' + cleanHref;
  };
  var homeHref = prefix('index.html');
  var logoBase = rootPrefix ? rootPrefix + '/' : '';
  var activeRaw = opts.activePage || '';
  var active = activeRaw === 'tokens' ? 'signals' : activeRaw;
  var cgKeys = ['context-grammar', 'simulator', 'intent', 'signals', 'dials', 'tokens', 'trust', 'brain', 'ruleengine', 'negotiation-gate', 'axpatterns', 'specs'];

  var items = [
    {
      num: '01',
      label: 'Context Grammar',
      href: '__cg__/index.html',
      keys: cgKeys,
      children: [
        { label: 'Overview', href: '__cg__/index.html', key: 'context-grammar' },
        { label: 'Simulator', href: '__cg__/simulator/index.html', key: 'simulator' },
        { label: 'Intent', href: '__cg__/intent/index.html', key: 'intent' },
        { label: (navLang === 'ja' ? '状況シグナル' : 'Situation Signals'), href: '__cg__/signals/index.html', key: 'signals' },
        { label: (navLang === 'ja' ? '関係性ダイヤル' : 'Relationship Dials'), href: '__cg__/dials/index.html', key: 'dials' },
        { label: (navLang === 'ja' ? '信頼' : 'Trust'), href: '__cg__/trust/index.html', key: 'trust' },
        { label: 'Brain', href: '__cg__/brain/index.html', key: 'brain' },
        { label: 'Rule Engine', href: '__cg__/rule-engine/index.html', key: 'ruleengine' },
        { label: 'Negotiation Gate', href: '__cg__/negotiation-gate/index.html', key: 'negotiation-gate' },
        { label: 'AX Patterns', href: '__cg__/ax-patterns/index.html', key: 'axpatterns' },
        { label: 'Specs', href: '__cg__/specs/index.html', key: 'specs' }
      ]
    },
    {
      num: '02',
      label: 'Case Study',
      href: 'projects/index.html',
      keys: ['projects'],
      children: [
        { label: 'P1', href: 'projects/project-01/index.html' },
        { label: 'P2', href: 'projects/project-02/index.html' },
        { label: 'P3', href: 'projects/project-03/index.html' },
        { label: 'P4', href: 'projects/project-04/index.html' },
        { label: 'P5', href: 'projects/project-05/index.html' },
        { label: 'P6', href: 'projects/project-06/index.html' }
      ]
    },
    { num: '03', label: 'Writing', href: 'journal/index.html', keys: ['journal'] },
    {
      num: '04',
      label: 'About',
      href: 'about/index.html',
      keys: ['about', 'author'],
      children: [
        { label: 'intentfirst', href: 'about/index.html', key: 'about' },
        { label: 'Takao', href: 'about/author.html', key: 'author' }
      ]
    }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function isCurrentPath(href) {
    if (/^(https?:|mailto:|tel:)/.test(href)) return false;
    var targetHref = href.indexOf('__cg__/') === 0 ? prefixCg(href.replace('__cg__/', '')) : prefix(href);
    var target = new URL(targetHref, window.location.href).pathname;
    return window.location.pathname === target ||
      (target.slice(-11) === '/index.html' && window.location.pathname === target.replace('index.html', ''));
  }

  function isCurrent(item) {
    if (active && item.keys && item.keys.indexOf(active) !== -1) return true;
    if (isCurrentPath(item.href)) return true;
    return !!(item.children && item.children.some(function (child) {
      return (active && child.key === active) || isCurrentPath(child.href);
    }));
  }

  function isCurrentChild(child) {
    return (active && child.key === active) || isCurrentPath(child.href);
  }

  function isCurrentMain(item) {
    if (item.children && item.children.length) {
      var activeChild = item.children.some(function (child) { return active && child.key === active; });
      return !activeChild && active && item.keys && item.keys.indexOf(active) !== -1;
    }
    return isCurrent(item);
  }

  if (document.querySelector('.site-nav')) return;

  var rowsHtml = items.map(function (item) {
    var subsHtml = '<span></span>';
    if (item.children && item.children.length) {
      subsHtml = '<ul class="site-nav__subs">' + item.children.filter(function(c){ return !c.hidden; }).map(function (child) {
        var childExt = child.external ? ' target="_blank" rel="noopener"' : '';
        var childCurrent = isCurrentChild(child);
        var childHref = child.href.indexOf('__cg__/') === 0 ? prefixCg(child.href.replace('__cg__/', '')) : prefix(child.href);
        return '<li><a class="site-nav__sub' + (childCurrent ? ' is-current-sub' : '') + '" href="' + childHref + '"' + childExt + (childCurrent ? ' aria-current="page"' : '') + '>' + escapeHtml(child.label) + '</a></li>';
      }).join('') + '</ul>';
    }
    var ext = item.external ? ' target="_blank" rel="noopener"' : '';
    var mainCurrent = isCurrentMain(item);
    var itemHref = item.href.indexOf('__cg__/') === 0 ? prefixCg(item.href.replace('__cg__/', '')) : prefix(item.href);
    return ''
      + '<li class="site-nav__row' + (isCurrent(item) ? ' is-current' : '') + '">'
      + '  <div class="site-nav__row-inner">'
      + '    <a class="site-nav__main" href="' + itemHref + '"' + ext + (mainCurrent ? ' aria-current="page"' : '') + '>'
      + '      <span class="site-nav__num">' + item.num + '</span>'
      + '      <span class="site-nav__lbl">' + escapeHtml(item.label) + '</span>'
      + '    </a>'
      +      subsHtml
      + '    <span class="site-nav__arrow" aria-hidden="true">→</span>'
      + '  </div>'
      + '</li>';
  }).join('');

  var hasSeenMenu = sessionStorage.getItem('if_menu_seen');
  var triggerClass = hasSeenMenu ? 'site-nav__trigger' : 'site-nav__trigger is-onboarding';

  var root = document.createElement('div');
  root.className = 'site-nav';
  root.innerHTML = ''
    + '<div class="site-nav__bar">'
    + '  <a class="site-nav__logo" href="' + homeHref + '" aria-label="intentfirst — home">'
    + '    <img class="logo-for-light" src="' + logoBase + 'assets/logo/IF-lockup-black.svg" alt="intentfirst" />'
    + '    <img class="logo-for-dark" src="' + logoBase + 'assets/logo/IF-lockup-white.svg" alt="" aria-hidden="true" />'
    + '  </a>'
    + '  <div class="site-nav__tools" aria-label="Site tools">'
    + '    <button class="' + triggerClass + '" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-haspopup="dialog">'
    + '      <span class="site-nav__dot-wrap">'
    + '        <span class="site-nav__dot" aria-hidden="true"></span>'
    + '        <span class="site-nav__dot-text" aria-hidden="true">Menu</span>'
    + '      </span>'
    + '      <span class="site-nav__close" aria-hidden="true"></span>'
    + '    </button>'
    + '  </div>'
    + '</div>'
    + '<div class="site-nav__blob" aria-hidden="true"></div>'
    + '<div class="site-nav__overlay" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">'
    + '  <ul class="site-nav__list">' + rowsHtml + '</ul>'
    + '  <div class="site-nav__scan" aria-hidden="true"></div>'
    + '</div>';
  document.body.insertBefore(root, document.body.firstChild);

  // ── Scroll-aware logo color detection ──
  // Detects the background luminance of the page content under the nav bar
  // and toggles .site-nav--on-dark / .site-nav--on-light accordingly.
  (function () {
    var logoTick = false;

    function detectNavBg() {
      // Sample the point just inside the logo area of the nav bar
      var checkX = 40;
      var checkY = 30;
      var elements;
      try { elements = document.elementsFromPoint(checkX, checkY); }
      catch (e) { return; }
      if (!elements || !elements.length) return;

      for (var i = 0; i < elements.length; i++) {
        if (root.contains(elements[i])) continue; // skip nav elements
        var el = elements[i];
        // Walk up from this element to find the first opaque background
        while (el && el !== document.documentElement) {
          var bg = window.getComputedStyle(el).backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (m) {
              var lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
              root.classList.toggle('site-nav--on-light', lum > 0.5);
              root.classList.toggle('site-nav--on-dark',  lum <= 0.5);
              return;
            }
          }
          el = el.parentElement;
        }
        break;
      }
      // Fallback: use body data-dark-nav or page data-theme
      var dark = document.body.hasAttribute('data-dark-nav') || document.documentElement.getAttribute('data-theme') === 'dark';
      root.classList.toggle('site-nav--on-dark',  dark);
      root.classList.toggle('site-nav--on-light', !dark);
    }

    window.addEventListener('scroll', function () {
      if (!logoTick) {
        window.requestAnimationFrame(function () { detectNavBg(); logoTick = false; });
        logoTick = true;
      }
    }, { passive: true });

    window.addEventListener('load', detectNavBg);
    setTimeout(detectNavBg, 150);
  })();

  if (!hasSeenMenu) {
    sessionStorage.setItem('if_menu_seen', 'true');
    setTimeout(function() {
      var btn = root.querySelector('.site-nav__trigger.is-onboarding');
      if (btn) btn.classList.remove('is-onboarding');
    }, 4500); // Wait 4.5 seconds before hiding the text naturally
  }

  if (cgKeys.indexOf(active) !== -1) {
    var sectionNav = document.createElement('nav');
    sectionNav.className = 'cg-section-nav';
    sectionNav.setAttribute('aria-label', 'Context Grammar sections');
    sectionNav.innerHTML = ''
      + '<div class="cg-section-nav-indicator"></div>'
      + '<a href="' + prefixCg('index.html') + '"' + (active === 'context-grammar' ? ' aria-current="page"' : '') + '>Overview</a>'
      + '<a href="' + prefixCg('simulator/index.html') + '"' + (active === 'simulator' ? ' aria-current="page"' : '') + '>Simulator</a>'
      + '<a href="' + prefixCg('intent/index.html') + '"' + (active === 'intent' ? ' aria-current="page"' : '') + '>Intent</a>'
      + '<a href="' + prefixCg('signals/index.html') + '"' + (active === 'signals' ? ' aria-current="page"' : '') + '>' + (navLang === 'ja' ? '状況シグナル' : '<span class="cg-nav-lbl-full">Situation Signals</span><span class="cg-nav-lbl-short">Signals</span>') + '</a>'
      + '<a href="' + prefixCg('dials/index.html') + '"' + (active === 'dials' ? ' aria-current="page"' : '') + '>' + (navLang === 'ja' ? '関係性ダイヤル' : '<span class="cg-nav-lbl-full">Relationship Dials</span><span class="cg-nav-lbl-short">Dials</span>') + '</a>'
      + '<a href="' + prefixCg('trust/index.html') + '"' + (active === 'trust' ? ' aria-current="page"' : '') + '>Trust</a>'
      + '<a href="' + prefixCg('brain/index.html') + '"' + (active === 'brain' ? ' aria-current="page"' : '') + '>Brain</a>'
      + '<a href="' + prefixCg('rule-engine/index.html') + '"' + (active === 'ruleengine' ? ' aria-current="page"' : '') + '>Rules</a>'
      + '<a href="' + prefixCg('negotiation-gate/index.html') + '"' + (active === 'negotiation-gate' ? ' aria-current="page"' : '') + '>Gate</a>'
      + '<a href="' + prefixCg('ax-patterns/index.html') + '"' + (active === 'axpatterns' ? ' aria-current="page"' : '') + '>AX</a>'
      + '<a href="' + prefixCg('specs/index.html') + '"' + (active === 'specs' ? ' aria-current="page"' : '') + '>Specs</a>';
    root.appendChild(sectionNav);

    // Sliding Pill Logic
    var indicator = sectionNav.querySelector('.cg-section-nav-indicator');
    var links = sectionNav.querySelectorAll('a');
    var activeEl = sectionNav.querySelector('[aria-current="page"]');

    // ── Taffy / Cartoon Squash-Stretch Indicator ──
    // Stores the *current rendered* position so we can stretch from it.
    var currentX = 0;
    var currentW = 0;
    var indicatorTimeout;

    function applyInstant(x, w) {
      clearTimeout(indicatorTimeout);
      indicator.style.transition = 'none';
      indicator.style.transform = 'translateX(' + x + 'px)';
      indicator.style.width = w + 'px';
      indicator.style.borderRadius = '20px';
      indicator.style.opacity = '1';
      void indicator.offsetHeight;
      indicator.style.transition = '';
      currentX = x; currentW = w;
    }

    function animateTaffy(toX, toW) {
      clearTimeout(indicatorTimeout);
      var fromX = currentX, fromW = currentW;
      var stretchX = Math.min(fromX, toX);
      var stretchW = Math.max(fromX + fromW, toX + toW) - stretchX;

      // Phase 1: Stretch like taffy across the full distance (120ms, ease-out)
      indicator.style.transition ='transform 120ms cubic-bezier(0.215,0.61,0.355,1),' +
                                   'width 120ms cubic-bezier(0.215,0.61,0.355,1),' +
                                   'border-radius 120ms ease';
      indicator.style.transform   = 'translateX(' + stretchX + 'px)';
      indicator.style.width       = stretchW + 'px';
      indicator.style.borderRadius = '99px';

      // Phase 2: Snap to destination with elastic spring bounce (300ms)
      indicatorTimeout = setTimeout(function() {
        indicator.style.transition = 'transform 300ms cubic-bezier(0.34,1.56,0.64,1),' +
                                     'width 300ms cubic-bezier(0.34,1.56,0.64,1),' +
                                     'border-radius 250ms cubic-bezier(0.34,1.56,0.64,1)';
        indicator.style.transform   = 'translateX(' + toX + 'px)';
        indicator.style.width       = toW + 'px';
        indicator.style.borderRadius = '20px';
        currentX = toX; currentW = toW;
      }, 130);
    }

    function updateIndicator(el, instant) {
      if (!el) { indicator.style.opacity = '0'; return; }
      var toX = el.offsetLeft, toW = el.offsetWidth;
      if (instant) { applyInstant(toX, toW); }
      else         { animateTaffy(toX, toW); }
    }

    // Initialise position without animation
    updateIndicator(activeEl, true);
    window.addEventListener('load', function() { updateIndicator(activeEl, true); });

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (this === activeEl || this.target === '_blank' || href.indexOf('#') === 0) return;
        e.preventDefault();

        // Determine slide direction: target left of current = backward, right = forward
        var fromX = activeEl ? activeEl.offsetLeft : 0;
        var toX = this.offsetLeft;
        var direction = toX >= fromX ? 'forward' : 'backward';

        // Store direction so the next page can apply the matching transition class
        try { sessionStorage.setItem('cgnav-dir', direction); } catch (e) {}
        // Also set on the OUTGOING page so view-transition snapshot uses it
        document.documentElement.classList.add('cgnav-' + direction);

        if (activeEl) activeEl.removeAttribute('aria-current');
        this.setAttribute('aria-current', 'page');
        activeEl = this;
        updateIndicator(this, false);
        // Wait for taffy animation to finish before navigation
        setTimeout(function() { window.location.href = href; }, 440);
      });
    });

    window.addEventListener('resize', function() {
      updateIndicator(activeEl, true);
    }, { passive: true });

    // Track visibility state from both hero and scroll
    var heroHidden = false;
    var scrollHidden = false;

    // Apply hide class if either scroll or hero makes it hidden
    function applyNavVisibility() {
      if (heroHidden || scrollHidden) {
        sectionNav.classList.add('cg-section-nav--hidden');
      } else {
        sectionNav.classList.remove('cg-section-nav--hidden');
      }
    }

    // ── Hide subnav when dark hero is visible ──
    // Only targets elements explicitly classed .hero — avoids hiding subnav on
    // CG sub-pages where the first <section> is content, not a hero.
    var heroEl = document.querySelector('[data-subnav-hide-on-hero]') || null;
    if (heroEl) {
      var heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var shouldHideForHero = entry.isIntersecting && entry.intersectionRatio > 0.4;
          if (shouldHideForHero !== heroHidden) {
            heroHidden = shouldHideForHero;
            applyNavVisibility();
          }
        });
      }, { threshold: [0, 0.4] });
      heroObserver.observe(heroEl);
    }

    // Auto-hide subnav on scroll down (combined with hero visibility)
    var lastY = window.scrollY || 0;
    var hideTicking = false;
    window.addEventListener('scroll', function () {
      if (!hideTicking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          var dy = y - lastY;
          var shouldScrollHide = false;
          if (y < 80) {
            shouldScrollHide = false;
          } else if (dy > 8) {
            shouldScrollHide = true;
          } else if (dy < -8) {
            shouldScrollHide = false;
          } else {
            shouldScrollHide = scrollHidden; // keep current state
          }
          if (shouldScrollHide !== scrollHidden) {
            scrollHidden = shouldScrollHide;
            applyNavVisibility();
          }
          lastY = y;
          hideTicking = false;
        });
        hideTicking = true;
      }
    }, { passive: true });
  }

  var trigger = root.querySelector('.site-nav__trigger');
  var overlay = root.querySelector('.site-nav__overlay');
  var lastFocused = null;
  var focusables = function () {
    return Array.prototype.slice.call(overlay.querySelectorAll('a, button')).filter(function (el) {
      return el.offsetParent !== null;
    });
  };

  // ── Blob Reveal ──
  function open() {
    // Compute scale so blob covers entire viewport from its top-right position
    var blob = root.querySelector('.site-nav__blob');
    if (blob) {
      var br = blob.getBoundingClientRect();
      var cx = br.left + br.width / 2;
      var cy = br.top  + br.height / 2;
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var maxDist = Math.max(
        Math.sqrt(cx * cx + cy * cy),
        Math.sqrt((vw - cx) * (vw - cx) + cy * cy),
        Math.sqrt(cx * cx + (vh - cy) * (vh - cy)),
        Math.sqrt((vw - cx) * (vw - cx) + (vh - cy) * (vh - cy))
      );
      var scale = Math.ceil(maxDist / (br.width / 2)) + 2;
      root.style.setProperty('--blob-scale', scale);
    }

    lastFocused = document.activeElement;
    root.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-label', 'Close navigation menu');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(function () {
      var f = focusables();
      if (f.length) f[0].focus();
    });
  }

  var _closeTimer = null;
  function close() {
    if (_closeTimer) return; // prevent double-fire
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Open navigation menu');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Add closing class to trigger fast absorption animation
    root.classList.add('is-closing');

    _closeTimer = setTimeout(function () {
      root.classList.remove('is-open');
      root.classList.remove('is-closing');
      _closeTimer = null;
    }, 230); // matches longest closing transition (200ms + small buffer)

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    } else {
      trigger.focus();
    }
  }

  trigger.addEventListener('click', function () {
    root.classList.contains('is-open') ? close() : open();
  });

  document.addEventListener('keydown', function (e) {
    if (!root.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'Tab') {
      var f = focusables();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.classList.contains('site-nav__list')) close();
  });
}

function initNav(opts) {
  opts = opts || {};
  var bp = opts.basePath || '';
  var activeRaw = opts.activePage || '';
  var active = activeRaw === 'tokens' ? 'signals' : activeRaw;
  var lang = opts.lang || 'en';
  var showLang = opts.showLang !== false; // default true; pass false to hide
  var autoHide = opts.autoHide === true;  // default false; pass true to hide on scroll down
  var isDarkNav = document.body.hasAttribute('data-dark-nav');

  // ── Build paths ──
  var logoBlack = bp + 'assets/logo/IF-lockup-black.svg';
  var logoWhite = bp + 'assets/logo/IF-lockup-white.svg';

  var prefix = function (href) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    if (href.indexOf('projects/') === 0) {
      return bp + href;
    }
    return bp + (lang === 'ja' ? 'ja/' : '') + href;
  };

  var prefixCg = function (href) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    if (lang === 'ja') {
      return bp + href.replace(/^context-grammar\//, 'context-grammar/ja/');
    }
    return bp + href;
  };

  var homeHref = prefix('index.html');
  var projectsHref = prefix('projects/index.html');
  var journalHref = prefix('journal/index.html');

  // CG sub-pages for dropdown trigger active state
  var cgPages = ['context-grammar', 'simulator', 'intent', 'signals', 'dials', 'tokens', 'brain', 'ruleengine', 'trust', 'specs', 'axpatterns', 'negotiation-gate'];
  var isCGActive = cgPages.indexOf(active) !== -1;

  function ac(page) {
    return active === page ? ' nav-active' : '';
  }

  // ── Language switcher URLs ──
  var currentPath = window.location.pathname;
  var enUrl = currentPath;
  var jaUrl = currentPath;
  if (lang === 'ja') {
    jaUrl = currentPath;
    if (/\/context-grammar\/ja\//.test(currentPath)) {
      enUrl = currentPath.replace(/\/context-grammar\/ja\//, '/context-grammar/');
    } else {
      enUrl = currentPath.replace(/\/ja\//, '/');
    }
  } else {
    enUrl = currentPath;
    if (/\/context-grammar\//.test(currentPath) && !/\/context-grammar\/ja\//.test(currentPath)) {
      jaUrl = currentPath.replace(/\/context-grammar\//, '/context-grammar/ja/');
    } else {
      if (currentPath === '/' || currentPath === '') {
        jaUrl = '/ja/index.html';
      } else {
        jaUrl = '/' + 'ja' + currentPath;
      }
    }
  }

  // ── Helper for theme-aware GG-icons ──
  function getThemeIconHtml(iconName) {
    var pathLight = bp + 'context-grammar/GG-icons/small/light/' + iconName + '.svg';
    var pathDark = bp + 'context-grammar/GG-icons/small/dark/' + iconName + '.svg';
    return ''
      + '<img class="nav-icon nav-icon--light" src="' + pathLight + '" alt="" />'
      + '<img class="nav-icon nav-icon--dark" src="' + pathDark + '" alt="" />';
  }

  var cgLabel = function(key) {
    if (window.CG_IA) return window.CG_IA.label(key, lang);
    var fallbacks = {
      intent: 'Intent',
      signals: 'Signals',
      dials: 'Dials',
      ruleengine: 'Rule Engine',
      negotiation: 'Negotiation Gate',
      axpatterns: 'AX Patterns',
      brain: 'Brain',
      trust: 'Trust Design',
      simulator: 'Simulator',
      specs: 'Specs',
      'negotiation-layer': 'Negotiation Layer'
    };
    return fallbacks[key] || key;
  };

  var cgPath = function(key) {
    return prefixCg(window.CG_IA ? window.CG_IA.routes[key] : 'context-grammar/' + key + '/index.html');
  };

  // ── Build mobile overlay HTML ──
  var mobileHtml = '';
  mobileHtml += '<a href="' + homeHref + '" class="' + ac('home') + '">Home</a>';
  if (window.CG_IA) {
    window.CG_IA.structure.forEach(function (block) {
      if (block.kind === 'pin') {
        var label = window.CG_IA.label(block.key, lang);
        var activeC = (active === 'context-grammar') ? ' nav-active' : '';
        mobileHtml += '<a href="' + prefixCg(window.CG_IA.routes[block.key]) + '" class="mobile-sub-link' + activeC + '">' + label + '</a>';
      } else {
        mobileHtml += '<div class="mobile-section-label">' + window.CG_IA.label(block.labelKey, lang) + '</div>';
        block.items.forEach(function (key) {
          var stage = window.CG_IA.stageFor(key);
          var label = window.CG_IA.label(key, lang);
          var activeC = (active === key) ? ' nav-active' : '';
          var hint = window.CG_IA.hintFor(key, lang) ? (' <span class="nav-dd-hint">' + window.CG_IA.hintFor(key, lang) + '</span>') : '';
          var stagePrefix = stage ? ('<span class="nav-dd-stage">' + stage + '</span> ') : '';
          mobileHtml += '<a href="' + prefixCg(window.CG_IA.routes[key]) + '" class="mobile-sub-link' + activeC + '">' + stagePrefix + label + hint + '</a>';
        });
      }
    });
  }
  mobileHtml += '<a href="' + projectsHref + '" class="' + ac('projects') + '">Case Studies</a>';
  mobileHtml += '<a href="' + journalHref + '" class="' + ac('journal') + '">Writing</a>';
  if (showLang) {
    mobileHtml += '  <div class="nav-mobile-lang">'
      + '    <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="Switch to English">EN</a>'
      + '    <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '" aria-label="日本語に切り替え">JA</a>'
      + '  </div>';
  }

  // ── Build shared popover HTML ──
  var sharedDropdownHtml = '';
  sharedDropdownHtml += '<div class="nav-shared-dropdown" id="nav-shared-dropdown" aria-hidden="true" role="menu">';
  sharedDropdownHtml += '  <div class="nav-dropdown-slider" id="nav-dropdown-slider">';
  
  // PANE 1: Context Grammar
  sharedDropdownHtml += '    <div class="nav-dropdown-pane" id="pane-cg">';
  sharedDropdownHtml += '      <div class="nav-pane-left">';
  sharedDropdownHtml += '        <div class="nav-pane-grid-title">' + (lang === 'ja' ? 'PIPELINE STAGES' : 'PIPELINE STAGES') + '</div>';
  sharedDropdownHtml += '        <div class="nav-grid-2col">';
  
  var stages = [
    { key: 'intent', num: '01', icon: 'intent' },
    { key: 'signals', num: '02', icon: 'signals' },
    { key: 'dials', num: '03', icon: 'dials' },
    { key: 'ruleengine', num: '04', icon: 'rule-engine' },
    { key: 'negotiation', num: '05–06', icon: 'nego-gate' },
    { key: 'axpatterns', num: '07', icon: 'ax-pattern' }
  ];
  
  stages.forEach(function(st) {
    var activeC = (active === st.key) ? ' nav-active' : '';
    var label = st.key === 'negotiation' ? cgLabel('negotiation') : cgLabel(st.key);
    var desc = '';
    if (lang === 'ja') {
      if (st.key === 'intent') desc = '明示的な宣言、または暗黙的な推論による人間の生の欲求。';
      else if (st.key === 'signals') desc = '環境や姿勢など、今この瞬間を捉える6つの状況シグナル。';
      else if (st.key === 'dials') desc = '自律権限と情報開示の境界線を規定する2つの関係性ダイヤル。';
      else if (st.key === 'ruleengine') desc = 'シグナルと許容される意思決定の境界とを照合するルール群。';
      else if (st.key === 'negotiation') desc = '対立や摩擦を解決するためのインタラクティブな意思決定ゲート。';
      else if (st.key === 'axpatterns') desc = 'エージェント出力時のための、視覚・物理的な対話パターン体系。';
    } else {
      if (st.key === 'intent') desc = 'The human\'s raw desire, declared explicitly or inferred implicitly.';
      else if (st.key === 'signals') desc = '6 situation tokens capturing real-time posture and environment.';
      else if (st.key === 'dials') desc = '2 relationship dials defining autonomy limits and boundaries.';
      else if (st.key === 'ruleengine') desc = 'Core business rules matching signals to valid decision bounds.';
      else if (st.key === 'negotiation') desc = 'Interactive verification resolving conflict and friction.';
      else if (st.key === 'axpatterns') desc = 'Visual and physical interaction vocabulary for agent outputs.';
    }
    
    sharedDropdownHtml += '          <a href="' + cgPath(st.key) + '" class="nav-dd-card' + activeC + '" role="menuitem">';
    sharedDropdownHtml += '            <div class="nav-dd-card-icon">' + getThemeIconHtml(st.icon) + '</div>';
    sharedDropdownHtml += '            <div class="nav-dd-card-content">';
    sharedDropdownHtml += '              <div class="nav-dd-card-title"><span class="nav-dd-card-stage">' + st.num + '</span>' + label + '</div>';
    sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + desc + '</div>';
    sharedDropdownHtml += '            </div>';
    sharedDropdownHtml += '          </a>';
  });
  
  sharedDropdownHtml += '        </div>';
  sharedDropdownHtml += '      </div>';
  
  sharedDropdownHtml += '      <div class="nav-pane-right">';
  sharedDropdownHtml += '        <div class="nav-pane-right-section">';
  sharedDropdownHtml += '          <div class="nav-pane-right-label">' + (lang === 'ja' ? 'ALWAYS-ON' : 'ALWAYS-ON') + '</div>';
  
  var brainActive = (active === 'brain') ? ' nav-active' : '';
  var brainDesc = lang === 'ja' ? '3つのレイヤーで構成されるコンテキスト記憶システム。' : '3-level context memory system (Identity, Learning, Now).';
  sharedDropdownHtml += '          <a href="' + cgPath('brain') + '" class="nav-dd-card--compact' + brainActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon">' + getThemeIconHtml('brain') + '</div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + cgLabel('brain') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + brainDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  var trustActive = (active === 'trust') ? ' nav-active' : '';
  var trustDesc = lang === 'ja' ? '人間とAIの信頼構築に関する設計規律。' : 'How AI can build trust with humans.';
  sharedDropdownHtml += '          <a href="' + cgPath('trust') + '" class="nav-dd-card--compact' + trustActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon">' + getThemeIconHtml('trust') + '</div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + cgLabel('trust') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + trustDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  sharedDropdownHtml += '        </div>';
  sharedDropdownHtml += '        <div class="nav-pane-right-section">';
  sharedDropdownHtml += '          <div class="nav-pane-right-label">' + (lang === 'ja' ? 'REFERENCE' : 'REFERENCE') + '</div>';
  
  var overviewActive = (active === 'context-grammar') ? ' nav-active' : '';
  var overviewDesc = lang === 'ja' ? 'フレームワークの全体像と導入概要。' : 'Introduction to the Context Grammar framework.';
  sharedDropdownHtml += '          <a href="' + cgPath('framework') + '" class="nav-dd-card--compact' + overviewActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon nav-inline-icon-wrap"><svg class="nav-inline-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + (lang === 'ja' ? 'Overview (はじめに)' : 'Overview') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + overviewDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  var simActive = (active === 'simulator') ? ' nav-active' : '';
  var simDesc = lang === 'ja' ? '状況変化を追体験するインタラクティブ・シミュレーター。' : 'Morph Theater interactive context-aware simulator.';
  sharedDropdownHtml += '          <a href="' + cgPath('simulator') + '" class="nav-dd-card--compact' + simActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon nav-inline-icon-wrap"><svg class="nav-inline-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + cgLabel('simulator') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + simDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  var specsActive = (active === 'specs') ? ' nav-active' : '';
  var specsDesc = lang === 'ja' ? '技術的なデータスキーマとアーキテクチャ仕様書。' : 'Technical schemas and architecture specifications.';
  sharedDropdownHtml += '          <a href="' + cgPath('specs') + '" class="nav-dd-card--compact' + specsActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon nav-inline-icon-wrap"><svg class="nav-inline-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + cgLabel('specs') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + specsDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  sharedDropdownHtml += '        </div>';
  sharedDropdownHtml += '      </div>';
  sharedDropdownHtml += '    </div>';
  
  // PANE 2: Case Studies
  sharedDropdownHtml += '    <div class="nav-dropdown-pane" id="pane-projects">';
  sharedDropdownHtml += '      <div class="nav-pane-left">';
  sharedDropdownHtml += '        <div class="nav-pane-grid-title">' + (lang === 'ja' ? 'APPLIED CASE STUDIES' : 'APPLIED CASE STUDIES') + '</div>';
  sharedDropdownHtml += '        <div class="nav-grid-2col">';
  
  var projectsList = [
    { num: '01', key: 'p1', label: { en: 'The Living Home', ja: 'スマートホーム (P1)' }, path: 'projects/project-01/index.html', desc: { en: 'Family AI that learns who eats what and earns autonomy.', ja: '食事の好みを学習し、自律決定権を獲得していく家族AI。' } },
    { num: '02', key: 'p2', label: { en: 'The Family Trip', ja: '家族旅行 (P2)' }, path: 'projects/project-02/index.html', desc: { en: 'Kyoto trip planner with fever crisis and TV voting.', ja: '京都旅行での急な発熱、テレビ投票などの使い捨てUI。' } },
    { num: '03', key: 'p3', label: { en: 'Fluid Handoff', ja: 'マルチデバイス (P3)' }, path: 'projects/project-03/index.html', desc: { en: 'Experience flows seamlessly from train to family TV.', ja: '電車からテレビへと滑らかに引き継がれる購買体験。' } },
    { num: '04', key: 'p4', label: { en: 'Project Atlas', ja: 'エンタープライズ (P4)' }, path: 'projects/project-04/index.html', desc: { en: 'Enterprise Context Grammar scaling across teams.', ja: '組織全体で文脈を共有・持続する意思決定システム。' } },
    { num: '05', key: 'p5', label: { en: 'Cross-Surface', ja: '複数ディスプレイ (P5)' }, path: 'projects/project-05/index.html', desc: { en: 'One Brain routing context across five synced surfaces.', ja: '1つの脳から5つの連携デバイスへと文脈を最適配置。' } },
    { num: '06', key: 'p6', label: { en: 'Life Brain', ja: 'パーソナル記憶 (P6)' }, path: 'projects/project-06/index.html', desc: { en: 'Protected rituals and memory at the personal scale.', ja: '個人の尊厳を守る儀式とパーソナルな記憶システム。' } }
  ];
  
  projectsList.forEach(function(proj) {
    var activeC = (activeRaw === ('project-' + proj.num)) ? ' nav-active' : '';
    var labelText = lang === 'ja' ? proj.label.ja : proj.label.en;
    var descText = lang === 'ja' ? proj.desc.ja : proj.desc.en;
    
    sharedDropdownHtml += '          <a href="' + prefix(proj.path) + '" class="nav-dd-card' + activeC + '" role="menuitem">';
    sharedDropdownHtml += '            <div class="nav-dd-card-icon">' + getThemeIconHtml('case-study') + '</div>';
    sharedDropdownHtml += '            <div class="nav-dd-card-content">';
    sharedDropdownHtml += '              <div class="nav-dd-card-title"><span class="nav-dd-stage--large">' + proj.num + '</span>' + labelText + '</div>';
    sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + descText + '</div>';
    sharedDropdownHtml += '            </div>';
    sharedDropdownHtml += '          </a>';
  });
  
  sharedDropdownHtml += '        </div>';
  sharedDropdownHtml += '      </div>';
  
  sharedDropdownHtml += '      <div class="nav-pane-right">';
  sharedDropdownHtml += '        <div class="nav-pane-right-section">';
  sharedDropdownHtml += '          <div class="nav-pane-right-label">' + (lang === 'ja' ? 'METHODOLOGY' : 'METHODOLOGY') + '</div>';
  
  var casesOverviewActive = (activeRaw === 'projects') ? ' nav-active' : '';
  var casesOverviewDesc = lang === 'ja' ? '実社会シナリオへの適用方法と設計思想の概要。' : 'Applied Context Grammar methodology overview.';
  sharedDropdownHtml += '          <a href="' + projectsHref + '" class="nav-dd-card--compact' + casesOverviewActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon nav-inline-icon-wrap"><svg class="nav-inline-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + (lang === 'ja' ? 'All Case Studies (概要)' : 'All Case Studies') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + casesOverviewDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  sharedDropdownHtml += '        </div>';
  sharedDropdownHtml += '        <div class="nav-pane-right-section">';
  sharedDropdownHtml += '          <div class="nav-pane-right-label">' + (lang === 'ja' ? 'AUTHOR' : 'AUTHOR') + '</div>';
  
  var authorActive = (activeRaw === 'about' || activeRaw === 'author') ? ' nav-active' : '';
  var authorDesc = lang === 'ja' ? '意思決定システム設計を専門とするIA設計者。' : 'Interpretation Architect for agentic systems.';
  sharedDropdownHtml += '          <a href="' + prefix('about/index.html') + '" class="nav-dd-card--compact' + authorActive + '" role="menuitem">';
  sharedDropdownHtml += '            <div class="nav-dd-card-icon nav-inline-icon-wrap"><svg class="nav-inline-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>';
  sharedDropdownHtml += '            <div class="nav-dd-card-content">';
  sharedDropdownHtml += '              <div class="nav-dd-card-title">' + (lang === 'ja' ? 'Takao Umehara (プロフィール)' : 'Takao Umehara') + '</div>';
  sharedDropdownHtml += '              <div class="nav-dd-card-desc">' + authorDesc + '</div>';
  sharedDropdownHtml += '            </div>';
  sharedDropdownHtml += '          </a>';
  
  sharedDropdownHtml += '        </div>';
  sharedDropdownHtml += '      </div>';
  sharedDropdownHtml += '    </div>';
  
  sharedDropdownHtml += '  </div>';
  sharedDropdownHtml += '</div>';

  // ── Build nav HTML ──
  var navClass = isDarkNav ? 'nav nav--transparent' : 'nav nav--solid';
  var cmdkHtml = ''
    + '<button class="if-cmdk-toggle" type="button" aria-label="Open Command Palette">'
    + '  <span>Search</span>'
    + '  <kbd class="if-cmdk-toggle__key">⌘K</kbd>'
    + '</button>';

  var html = ''
    + '<nav class="' + navClass + '" id="nav">'
    + '  <div class="nav-inner">'
    + '    <a class="nav-logo" id="nav-logo" href="' + homeHref + '">'
    + '      <img class="nav-logo-img" id="nav-logo-img" src="' + (isDarkNav ? logoWhite : logoBlack) + '" alt="intentfirst" />'
    + '    </a>'
    + '    <div class="nav-links" id="nav-links">'
    + '      <div class="nav-trigger-wrapper" id="nav-trigger-cg-wrap">'
    + '        <a href="' + prefixCg('context-grammar/index.html') + '" id="nav-trigger-cg" class="nav-dropdown-trigger' + (isCGActive ? ' nav-active' : '') + '" aria-haspopup="true" aria-expanded="false" aria-controls="nav-shared-dropdown">'
    + '          Context Grammar'
    + '          <svg class="nav-chevron-icon" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
    + '        </a>'
    + '      </div>'
    + '      <div class="nav-trigger-wrapper" id="nav-trigger-projects-wrap">'
    + '        <a href="' + projectsHref + '" id="nav-trigger-projects" class="nav-dropdown-trigger' + (active === 'projects' ? ' nav-active' : '') + '" aria-haspopup="true" aria-expanded="false" aria-controls="nav-shared-dropdown">'
    + '          Case Studies'
    + '          <svg class="nav-chevron-icon" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
    + '        </a>'
    + '      </div>'
    + '      <a href="' + journalHref + '" id="nav-link-journal" class="' + ac('journal') + '">Writing</a>'
    +        cmdkHtml
    + '    </div>'
    + '    <button class="hamburger-btn" id="hamburger-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-mobile-overlay">'
    + '      <span></span><span></span><span></span>'
    + '    </button>'
    + '  </div>'
    + '  <!-- Shared Dropdown Container -->'
    +    sharedDropdownHtml
    + '</nav>';

  html += '<nav class="nav-mobile-overlay" id="nav-mobile-overlay" aria-label="Mobile navigation" aria-hidden="true">'
    +      mobileHtml
    + '</nav>';

  if (showLang) {
    html += ''
      + '<div class="lang-switch" id="lang-switch" role="group" aria-label="Language">'
      + '  <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="Switch to English">EN</a>'
      + '  <div class="lang-divider" aria-hidden="true"></div>'
      + '  <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '" aria-label="日本語に切り替え">JA</a>'
      + '</div>';
  }

  // ── Inject into page ──
  document.body.insertAdjacentHTML('afterbegin', html);

  // ── Cache elements ──
  var nav = document.getElementById('nav');
  var sharedDropdown = document.getElementById('nav-shared-dropdown');
  var slider = document.getElementById('nav-dropdown-slider');
  var triggerCgWrap = document.getElementById('nav-trigger-cg-wrap');
  var triggerProjectsWrap = document.getElementById('nav-trigger-projects-wrap');
  var triggerCg = document.getElementById('nav-trigger-cg');
  var triggerProjects = document.getElementById('nav-trigger-projects');
  var linkJournal = document.getElementById('nav-link-journal');
  var logoLink = document.getElementById('nav-logo');
  var cmdkButton = nav.querySelector('.if-cmdk-toggle');
  var hamburger = document.getElementById('hamburger-btn');
  var overlay = document.getElementById('nav-mobile-overlay');

  // ── Scroll detection (transparent → solid) ──
  if (isDarkNav) {
    var scrollThreshold = 80;
    var ticking = false;
    var logoImg = document.getElementById('nav-logo-img');
    var isScrolled = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var shouldScroll = window.scrollY > scrollThreshold;
          if (shouldScroll !== isScrolled) {
            isScrolled = shouldScroll;
            nav.classList.toggle('nav--scrolled', shouldScroll);
            if (logoImg) logoImg.src = shouldScroll ? logoBlack : logoWhite;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Auto-hide on scroll down, reveal on scroll up ──
  if (autoHide) {
    var lastY = window.scrollY;
    var hideTicking = false;
    var hideThreshold = 100;
    var moveDelta = 6;

    function onAutoHideScroll() {
      if (!hideTicking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          var dy = y - lastY;
          if (y < hideThreshold) {
            nav.classList.remove('nav--hidden');
          } else if (dy > moveDelta) {
            nav.classList.add('nav--hidden');
          } else if (dy < -moveDelta) {
            nav.classList.remove('nav--hidden');
          }
          lastY = y;
          hideTicking = false;
        });
        hideTicking = true;
      }
    }
    window.addEventListener('scroll', onAutoHideScroll, { passive: true });
  }

  // ── Popover: hover + slide transitions ──
  var hoverTimeout = null;
  var closeTimeout = null;
  var activePane = null; // 'cg' or 'projects'

  function openDropdown(pane) {
    clearTimeout(closeTimeout);
    
    if (pane === 'cg') {
      slider.style.transform = 'translateX(0)';
      triggerCgWrap.classList.add('nav-trigger-active');
      triggerProjectsWrap.classList.remove('nav-trigger-active');
      triggerCg.setAttribute('aria-expanded', 'true');
      triggerProjects.setAttribute('aria-expanded', 'false');
      activePane = 'cg';
    } else if (pane === 'projects') {
      slider.style.transform = 'translateX(-50%)';
      triggerProjectsWrap.classList.add('nav-trigger-active');
      triggerCgWrap.classList.remove('nav-trigger-active');
      triggerProjects.setAttribute('aria-expanded', 'true');
      triggerCg.setAttribute('aria-expanded', 'false');
      activePane = 'projects';
    }
    
    sharedDropdown.classList.add('open');
    sharedDropdown.setAttribute('aria-hidden', 'false');
  }

  function closeDropdown() {
    sharedDropdown.classList.remove('open');
    sharedDropdown.setAttribute('aria-hidden', 'true');
    triggerCgWrap.classList.remove('nav-trigger-active');
    triggerProjectsWrap.classList.remove('nav-trigger-active');
    triggerCg.setAttribute('aria-expanded', 'false');
    triggerProjects.setAttribute('aria-expanded', 'false');
    activePane = null;
  }

  function scheduleClose() {
    clearTimeout(closeTimeout);
    closeTimeout = setTimeout(closeDropdown, 180);
  }

  function cancelClose() {
    clearTimeout(closeTimeout);
  }

  // Hover triggers
  triggerCgWrap.addEventListener('mouseenter', function () {
    cancelClose();
    hoverTimeout = setTimeout(function() { openDropdown('cg'); }, 60);
  });
  triggerCgWrap.addEventListener('mouseleave', function () {
    clearTimeout(hoverTimeout);
    scheduleClose();
  });

  triggerProjectsWrap.addEventListener('mouseenter', function () {
    cancelClose();
    hoverTimeout = setTimeout(function() { openDropdown('projects'); }, 60);
  });
  triggerProjectsWrap.addEventListener('mouseleave', function () {
    clearTimeout(hoverTimeout);
    scheduleClose();
  });

  sharedDropdown.addEventListener('mouseenter', function () {
    cancelClose();
  });
  sharedDropdown.addEventListener('mouseleave', function () {
    scheduleClose();
  });

  // Snappy instant-close triggers
  var instantCloseEls = [logoLink, linkJournal, cmdkButton].filter(Boolean);
  instantCloseEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      clearTimeout(hoverTimeout);
      closeDropdown();
    });
  });

  document.addEventListener('click', function (e) {
    if (!sharedDropdown.contains(e.target) && 
        !triggerCgWrap.contains(e.target) && 
        !triggerProjectsWrap.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown();
      if (overlay.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // ── Hamburger / mobile menu ──
  var lastFocusedBeforeMenu = null;
  var overlayFocusable = null;

  function getOverlayFocusable() {
    return overlay.querySelectorAll('a[href], button:not([disabled])');
  }

  function openMobileMenu() {
    lastFocusedBeforeMenu = document.activeElement;
    hamburger.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    overlayFocusable = getOverlayFocusable();
    if (overlayFocusable.length) overlayFocusable[0].focus();
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedBeforeMenu && typeof lastFocusedBeforeMenu.focus === 'function') {
      lastFocusedBeforeMenu.focus();
    }
  }

  hamburger.addEventListener('click', function () {
    if (overlay.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  overlay.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusables = getOverlayFocusable();
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  var mobileLinks = overlay.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      closeMobileMenu();
    });
  }

  var rootPrefix = bp.replace(/\/$/, '');
  var cgLangInside = true;

  initGlossaryAndCommandK({
    rootPrefix: rootPrefix,
    lang: lang,
    cgLangInside: cgLangInside
  });
}
