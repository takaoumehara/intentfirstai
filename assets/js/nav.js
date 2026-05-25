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
     activePage — 'home'|'simulator'|'intent'|'tokens'|'brain'|'ruleengine'|'trust'|'specs'|'axpatterns'|'projects'|'about'
     lang       — 'en' or 'ja'
   ============================================================= */

/* ─── Multi-page view transition direction restorer ───
   Runs before any other script. If the previous page set a direction
   in sessionStorage, apply it to <html> NOW so that the browser's
   inbound view transition uses the matching keyframes. The class is
   removed after the transition settles so subsequent navs are clean. */
(function () {
  try {
    var dir = sessionStorage.getItem('cgnav-dir');
    if (!dir) return;
    sessionStorage.removeItem('cgnav-dir');
    document.documentElement.classList.add('cgnav-' + dir);
    setTimeout(function () {
      document.documentElement.classList.remove('cgnav-' + dir);
    }, 900);
  } catch (e) { /* sessionStorage may be blocked — ignore */ }
})();

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
  var active = opts.activePage || '';
  var cgKeys = ['context-grammar', 'simulator', 'intent', 'tokens', 'trust', 'brain', 'ruleengine', 'negotiation-gate', 'negotiation-layer', 'axpatterns', 'specs'];

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
        { label: (navLang === 'ja' ? '状況シグナル' : 'Situation Signals'), href: '__cg__/signals-and-dials/index.html', key: 'tokens' },
        { label: (navLang === 'ja' ? '関係性ダイヤル' : 'Relationship Dials'), href: '__cg__/trust-design/index.html', key: 'trust' },
        { label: 'Brain', href: '__cg__/brain/index.html', key: 'brain' },
        { label: 'Rule Engine', href: '__cg__/rule-engine/index.html', key: 'ruleengine' },
        { label: 'Negotiation Gate', href: '__cg__/negotiation-gate/index.html', key: 'negotiation-gate' },
        { label: 'Negotiation Layer', href: '__cg__/negotiation-layer/index.html', key: 'negotiation-layer' },
        { label: 'AX Patterns', href: '__cg__/ax-patterns/index.html', key: 'axpatterns' },
        { label: 'Specs', href: '__cg__/specs/index.html', key: 'specs' }
      ]
    },
    {
      num: '02',
      label: 'Projects',
      href: 'projects/index.html',
      keys: ['projects'],
      children: [
        { label: 'P1', href: 'projects/project-01/index.html' },
        { label: 'P2', href: 'projects/project-02/p2-scroll-v2.html', hidden: true }, // HIDDEN — restore by removing hidden:true
        { label: 'P3', href: 'projects/project-03/index.html' },
        { label: 'P4', href: 'projects/project-04/index.html' },
        { label: 'P5', href: 'projects/project-05/p5-scroll-v2.html', hidden: true }, // HIDDEN — restore by removing hidden:true
        { label: 'P6', href: 'projects/project-06/p6-life-brain-v2.html', hidden: true } // HIDDEN — restore by removing hidden:true
      ]
    },
    { num: '03', label: 'Journal', href: 'journal/index.html', keys: ['journal'] },
    { num: '04', label: 'About', href: 'about/index.html', keys: ['about'] }
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
    + '  <button class="' + triggerClass + '" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-haspopup="dialog">'
    + '    <span class="site-nav__dot-wrap">'
    + '      <span class="site-nav__dot" aria-hidden="true"></span>'
    + '      <span class="site-nav__dot-text" aria-hidden="true">Menu</span>'
    + '    </span>'
    + '    <span class="site-nav__close" aria-hidden="true"></span>'
    + '  </button>'
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
      + '<a href="' + prefixCg('signals-and-dials/index.html') + '"' + (active === 'tokens' ? ' aria-current="page"' : '') + '>' + (navLang === 'ja' ? '状況シグナル' : '<span class="cg-nav-lbl-full">Situation Signals</span><span class="cg-nav-lbl-short">Signals</span>') + '</a>'
      + '<a href="' + prefixCg('trust-design/index.html') + '"' + (active === 'trust' ? ' aria-current="page"' : '') + '>' + (navLang === 'ja' ? '関係性ダイヤル' : '<span class="cg-nav-lbl-full">Relationship Dials</span><span class="cg-nav-lbl-short">Dials</span>') + '</a>'
      + '<a href="' + prefixCg('brain/index.html') + '"' + (active === 'brain' ? ' aria-current="page"' : '') + '>Brain</a>'
      + '<a href="' + prefixCg('rule-engine/index.html') + '"' + (active === 'ruleengine' ? ' aria-current="page"' : '') + '>Rules</a>'
      + '<a href="' + prefixCg('negotiation-layer/index.html') + '"' + (active === 'negotiation-layer' ? ' aria-current="page"' : '') + '>Negotiate</a>'
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
  initSiteNavCompat(opts);
  return;

  opts = opts || {};
  var bp = opts.basePath || '';
  var active = opts.activePage || '';
  var lang = opts.lang || 'en';
  var showLang = opts.showLang !== false; // default true; pass false to hide
  var autoHide = opts.autoHide === true;  // default false; pass true to hide on scroll down
  var isDarkNav = document.body.hasAttribute('data-dark-nav');

  // ── Build paths ──
  var logoBlack = bp + 'assets/logo/IF-lockup-black.svg';
  var logoWhite = bp + 'assets/logo/IF-lockup-white.svg';
  var pageRoot = bp + (lang === 'ja' ? 'ja/' : '');

  // Language switch paths — toggles between /[page] and /ja/[page].
  var currentPath = window.location.pathname;

  // Page paths (relative to basePath)
  var pages = {
    home: pageRoot + 'index.html',
    overview: pageRoot + 'context-grammar/index.html',
    simulator: pageRoot + 'context-grammar/simulator/index.html',
    intent: pageRoot + 'context-grammar/intent/index.html',
    tokens: pageRoot + 'context-grammar/signals-and-dials/index.html',
    brain: pageRoot + 'context-grammar/brain/index.html',
    ruleengine: pageRoot + 'context-grammar/rule-engine/index.html',
    trust: pageRoot + 'context-grammar/trust-design/index.html',
    specs: pageRoot + 'context-grammar/specs/index.html',
    axpatterns: pageRoot + 'context-grammar/ax-patterns/index.html',
    projects: pageRoot + 'projects/index.html',
    industry: pageRoot + 'industry/index.html',
    about: pageRoot + 'about/index.html',
    contact: pageRoot + 'contact/index.html'
  };

  // CG sub-pages for dropdown trigger active state + subnav
  var cgPages = ['context-grammar', 'simulator', 'intent', 'tokens', 'brain', 'ruleengine', 'trust', 'specs', 'axpatterns'];
  var isCGActive = cgPages.indexOf(active) !== -1;

  // ── Helper: active class ──
  function ac(page) {
    return active === page ? ' nav-active' : '';
  }

  // ── Language switcher URLs ──
  // Simple approach: swap /ja/ prefix in current pathname
  var enUrl, jaUrl;
  if (lang === 'ja') {
    // Currently on JA page — EN version removes /ja/
    jaUrl = currentPath;
    enUrl = currentPath.replace(/\/ja\//, '/');
  } else {
    // Currently on EN page — JA version adds /ja/ after domain root
    enUrl = currentPath;
    // Insert /ja/ after the first path segment that matches the site root
    jaUrl = currentPath.replace(/^\//, '/ja/');
  }

  // ── Build nav HTML ──
  var navClass = isDarkNav ? 'nav nav--transparent' : 'nav nav--solid';

  var html = ''
    + '<nav class="' + navClass + '" id="nav">'
    + '  <div class="nav-inner">'
    + '    <a class="nav-logo" href="' + pages.home + '">'
    + '      <img class="nav-logo-img" id="nav-logo-img" src="' + (isDarkNav ? logoWhite : logoBlack) + '" alt="intentfirst" />'
    + '    </a>'
    + '    <div class="nav-links">'
    + '      <div class="nav-dropdown" id="nav-dropdown">'
    + '        <a href="' + pages.intent + '" class="nav-dropdown-trigger' + (isCGActive ? ' nav-active' : '') + '" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-menu">'
    + '          Context Grammar'
    + '        </a>'
    + '        <div class="nav-dropdown-menu" id="nav-dropdown-menu" role="menu">'
    + '          <a href="' + pages.overview + '" role="menuitem" class="' + ac('context-grammar') + '">Overview</a>'
    + '          <a href="' + pages.simulator + '" role="menuitem" class="' + ac('simulator') + '">Simulator</a>'
    + '          <a href="' + pages.intent + '" role="menuitem" class="' + ac('intent') + '">Intent</a>'
    + '          <a href="' + pages.tokens + '" role="menuitem" class="' + ac('tokens') + '">' + (lang === 'ja' ? '状況シグナル' : 'Situation Signals') + '</a>'
    + '          <a href="' + pages.trust + '" role="menuitem" class="' + ac('trust') + '">' + (lang === 'ja' ? '関係性ダイヤル' : 'Relationship Dials') + '</a>'
    + '          <a href="' + pages.brain + '" role="menuitem" class="' + ac('brain') + '">Brain</a>'
    + '          <a href="' + pages.ruleengine + '" role="menuitem" class="' + ac('ruleengine') + '">Rule Engine</a>'
    + '          <a href="' + pages.axpatterns + '" role="menuitem" class="' + ac('axpatterns') + '">AX Patterns</a>'
    + '          <a href="' + pages.specs + '" role="menuitem" class="nav-dropdown-child' + ac('specs') + '">↳ Specs</a>'
    + '        </div>'
    + '      </div>'
    + '      <a href="' + pages.projects + '" class="' + ac('projects') + '">Projects</a>'
    + '      <a href="' + pages.about + '" class="' + ac('about') + '">About</a>'
    + '      <a href="' + pages.contact + '" class="nav-cta">Contact</a>'
    + '    </div>'
    + '    <button class="hamburger-btn" id="hamburger-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-mobile-overlay">'
    + '      <span></span><span></span><span></span>'
    + '    </button>'
    + '  </div>'
    + '</nav>';
 
   // ── Secondary subnav (Context Grammar pages only) ──
   if (isCGActive) {
     html += ''
       + '<nav class="nav-subnav" id="nav-subnav" aria-label="Context Grammar">'
       + '  <div class="nav-subnav-inner">'
       + '    <span class="nav-subnav-prefix">Context Grammar</span>'
       + '    <span class="nav-subnav-sep"></span>'
       + '    <a href="' + pages.overview + '"' + (active === 'context-grammar' ? ' class="nav-subnav-active"' : '') + '>Overview</a>'
       + '    <a href="' + pages.simulator + '"' + (active === 'simulator' ? ' class="nav-subnav-active"' : '') + '>Simulator</a>'
       + '    <a href="' + pages.intent + '"' + (active === 'intent' ? ' class="nav-subnav-active"' : '') + '>Intent</a>'
       + '    <a href="' + pages.tokens + '"' + (active === 'tokens' ? ' class="nav-subnav-active"' : '') + '>' + (lang === 'ja' ? '状況シグナル' : '<span class="cg-nav-lbl-full">Situation Signals</span><span class="cg-nav-lbl-short">Signals</span>') + '</a>'
       + '    <a href="' + pages.trust + '"' + (active === 'trust' ? ' class="nav-subnav-active"' : '') + '>' + (lang === 'ja' ? '関係性ダイヤル' : '<span class="cg-nav-lbl-full">Relationship Dials</span><span class="cg-nav-lbl-short">Dials</span>') + '</a>'
       + '    <a href="' + pages.brain + '"' + (active === 'brain' ? ' class="nav-subnav-active"' : '') + '>Brain</a>'
       + '    <a href="' + pages.ruleengine + '"' + (active === 'ruleengine' ? ' class="nav-subnav-active"' : '') + '>Rule Engine</a>'
       + '    <a href="' + pages.axpatterns + '"' + (active === 'axpatterns' ? ' class="nav-subnav-active"' : '') + '>AX Patterns</a>'
       + '    <a href="' + pages.specs + '" class="nav-subnav-child' + (active === 'specs' ? ' nav-subnav-active' : '') + '">↳ Specs</a>'
       + '  </div>'
       + '</nav>';
   }
 
   // ── Mobile overlay ──
   html += ''
     + '<nav class="nav-mobile-overlay" id="nav-mobile-overlay" aria-label="Mobile navigation" aria-hidden="true">'
     + '  <a href="' + pages.home + '" class="' + ac('home') + '">Home</a>'
     + '  <div class="mobile-section-label">Context Grammar</div>'
     + '  <a href="' + pages.overview + '" class="mobile-sub-link' + ac('context-grammar') + '">Overview</a>'
     + '  <a href="' + pages.simulator + '" class="mobile-sub-link' + ac('simulator') + '">Simulator</a>'
     + '  <a href="' + pages.intent + '" class="mobile-sub-link' + ac('intent') + '">Intent</a>'
     + '  <a href="' + pages.tokens + '" class="mobile-sub-link' + ac('tokens') + '">' + (lang === 'ja' ? '状況シグナル' : 'Situation Signals') + '</a>'
     + '  <a href="' + pages.trust + '" class="mobile-sub-link' + ac('trust') + '">' + (lang === 'ja' ? '関係性ダイヤル' : 'Relationship Dials') + '</a>'
     + '  <a href="' + pages.brain + '" class="mobile-sub-link' + ac('brain') + '">Brain</a>'
     + '  <a href="' + pages.ruleengine + '" class="mobile-sub-link' + ac('ruleengine') + '">Rule Engine</a>'
     + '  <a href="' + pages.axpatterns + '" class="mobile-sub-link' + ac('axpatterns') + '">AX Patterns</a>'
     + '  <a href="' + pages.specs + '" class="mobile-sub-link mobile-sub-link--child' + ac('specs') + '">↳ Specs</a>'
     + '  <a href="' + pages.projects + '" class="' + ac('projects') + '">Projects</a>'
     + '  <a href="' + pages.about + '" class="' + ac('about') + '">About</a>'
     + '  <a href="' + pages.contact + '" class="nav-cta">Contact</a>'
    + (showLang
      ? '  <div class="nav-mobile-lang">'
      + '    <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="Switch to English">EN</a>'
      + '    <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '" aria-label="日本語に切り替え">JA</a>'
      + '  </div>'
      : '')
    + '</nav>';

  // ── Desktop language switcher ──
  if (showLang) {
    html += ''
      + '<div class="lang-switch" id="lang-switch" role="group" aria-label="Language">'
      + '  <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="Switch to English">EN</a>'
      + '  <div class="lang-divider" aria-hidden="true"></div>'
      + '  <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '" aria-label="日本語に切り替え">JA</a>'
      + '</div>';
  }

  // ── Inject into page ──
  // Insert at the very start of <body>
  document.body.insertAdjacentHTML('afterbegin', html);

  // Add body class when subnav is present
  if (isCGActive) {
    document.body.classList.add('nav-has-subnav');
  }

  // ── Cache elements ──
  var nav = document.getElementById('nav');
  var dropdown = document.getElementById('nav-dropdown');
  var trigger = dropdown.querySelector('.nav-dropdown-trigger');
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
    // Check initial scroll position
    onScroll();
  }

  // ── Auto-hide on scroll down, reveal on scroll up (project scroll pages) ──
  if (autoHide) {
    var lastY = window.scrollY;
    var hideTicking = false;
    var hideThreshold = 100;    // px from top: always visible before this
    var moveDelta = 6;          // min px change before acting (noise filter)

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

  // ── Dropdown: hover + click ──
  var hoverTimeout = null;
  var closeTimeout = null;

  function openDropdown() {
    clearTimeout(closeTimeout);
    dropdown.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function scheduleClose() {
    closeTimeout = setTimeout(closeDropdown, 200);
  }

  // Mouse hover (desktop)
  dropdown.addEventListener('mouseenter', function () {
    clearTimeout(closeTimeout);
    hoverTimeout = setTimeout(openDropdown, 80);
  });

  dropdown.addEventListener('mouseleave', function () {
    clearTimeout(hoverTimeout);
    scheduleClose();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown();
      if (overlay.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // ── Dropdown: keyboard navigation (arrow keys on menuitems) ──
  var dropdownMenu = document.getElementById('nav-dropdown-menu');
  var menuItems = dropdownMenu.querySelectorAll('a[role="menuitem"]');

  // Open dropdown on ArrowDown/Enter/Space from the trigger
  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDropdown();
      if (menuItems.length) menuItems[0].focus();
    }
  });

  // Arrow keys move focus between menuitems; Esc closes and returns focus to trigger
  for (var mi = 0; mi < menuItems.length; mi++) {
    (function (idx) {
      menuItems[idx].addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          menuItems[(idx + 1) % menuItems.length].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          menuItems[(idx - 1 + menuItems.length) % menuItems.length].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          menuItems[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          menuItems[menuItems.length - 1].focus();
        } else if (e.key === 'Escape' || e.key === 'Tab') {
          closeDropdown();
          if (e.key === 'Escape') {
            e.preventDefault();
            trigger.focus();
          }
        }
      });
    })(mi);
  }

  // ── Hamburger / mobile menu (with focus trap) ──
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

  // Focus trap: wrap Tab / Shift+Tab within the overlay while open
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

  // Close mobile menu when a link is clicked
  var mobileLinks = overlay.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      closeMobileMenu();
    });
  }
}
