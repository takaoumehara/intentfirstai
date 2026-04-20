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
     activePage — 'home'|'introduction'|'grammar'|'brain'|'ruleengine'|'trust'|'specs'|'axpatterns'|'projects'|'about'
     lang       — 'en' or 'ja'
   ============================================================= */

function initNav(opts) {
  opts = opts || {};
  var bp = opts.basePath || '';
  var active = opts.activePage || '';
  var lang = opts.lang || 'en';
  var isDarkNav = document.body.hasAttribute('data-dark-nav');

  // ── Build paths ──
  var logoBlack = bp + 'assets/logo/IF-lockup-black.svg';
  var logoWhite = bp + 'assets/logo/IF-lockup-white.svg';

  // Language switch paths — toggles between /[page] and /ja/[page].
  var currentPath = window.location.pathname;

  // Page paths (relative to basePath)
  var pages = {
    home:        bp + 'index.html',
    introduction: bp + 'context-grammar/index.html',
    intent:      bp + 'context-grammar/intent/index.html',
    grammar:     bp + 'context-grammar/grammar/index.html',
    brain:       bp + 'context-grammar/brain/index.html',
    ruleengine:  bp + 'context-grammar/rule-engine/index.html',
    trust:       bp + 'context-grammar/trust-design/index.html',
    specs:       bp + 'context-grammar/specs/index.html',
    axpatterns:  bp + 'context-grammar/ax-patterns/index.html',
    projects:    bp + 'applied/index.html',
    industry:    bp + 'industry/index.html',
    about:       bp + 'about/index.html',
    contact:     bp + 'contact/index.html'
  };

  // CG sub-pages for dropdown trigger active state + subnav
  var cgPages = ['introduction', 'intent', 'grammar', 'brain', 'ruleengine', 'trust', 'specs', 'axpatterns'];
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
    + '        <a href="' + pages.introduction + '" class="nav-dropdown-trigger' + (isCGActive ? ' nav-active' : '') + '" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-menu">'
    + '          Context Grammar'
    + '        </a>'
    + '        <div class="nav-dropdown-menu" id="nav-dropdown-menu" role="menu">'
    + '          <a href="' + pages.introduction + '" role="menuitem" class="' + ac('introduction') + '">Introduction</a>'
    + '          <a href="' + pages.intent + '" role="menuitem" class="' + ac('intent') + '">Intent</a>'
    + '          <a href="' + pages.grammar + '" role="menuitem" class="' + ac('grammar') + '">Grammar</a>'
    + '          <a href="' + pages.brain + '" role="menuitem" class="' + ac('brain') + '">Brain</a>'
    + '          <a href="' + pages.ruleengine + '" role="menuitem" class="' + ac('ruleengine') + '">Rule Engine</a>'
    + '          <a href="' + pages.trust + '" role="menuitem" class="' + ac('trust') + '">Trust Design</a>'
    + '          <a href="' + pages.specs + '" role="menuitem" class="' + ac('specs') + '">Specs</a>'
    + '          <a href="' + pages.axpatterns + '" role="menuitem" class="' + ac('axpatterns') + '">AX Patterns</a>'
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
      + '    <a href="' + pages.introduction + '"' + (active === 'introduction' ? ' class="nav-subnav-active"' : '') + '>Introduction</a>'
      + '    <a href="' + pages.intent + '"' + (active === 'intent' ? ' class="nav-subnav-active"' : '') + '>Intent</a>'
      + '    <a href="' + pages.grammar + '"' + (active === 'grammar' ? ' class="nav-subnav-active"' : '') + '>Grammar</a>'
      + '    <a href="' + pages.brain + '"' + (active === 'brain' ? ' class="nav-subnav-active"' : '') + '>Brain</a>'
      + '    <a href="' + pages.ruleengine + '"' + (active === 'ruleengine' ? ' class="nav-subnav-active"' : '') + '>Rule Engine</a>'
      + '    <a href="' + pages.axpatterns + '"' + (active === 'axpatterns' ? ' class="nav-subnav-active"' : '') + '>Response</a>'
      + '    <span class="nav-subnav-divider" aria-hidden="true"></span>'
      + '    <a href="' + pages.trust + '"' + (active === 'trust' ? ' class="nav-subnav-active"' : '') + '>Trust Design</a>'
      + '    <a href="' + pages.specs + '"' + (active === 'specs' ? ' class="nav-subnav-active"' : '') + '>Specs</a>'
      + '  </div>'
      + '</nav>';
  }

  // ── Mobile overlay ──
  html += ''
    + '<nav class="nav-mobile-overlay" id="nav-mobile-overlay" aria-label="Mobile navigation" aria-hidden="true">'
    + '  <a href="' + pages.home + '" class="' + ac('home') + '">Home</a>'
    + '  <div class="mobile-section-label">Context Grammar</div>'
    + '  <a href="' + pages.introduction + '" class="mobile-sub-link' + ac('introduction') + '">Introduction</a>'
    + '  <a href="' + pages.intent + '" class="mobile-sub-link' + ac('intent') + '">Intent</a>'
    + '  <a href="' + pages.grammar + '" class="mobile-sub-link' + ac('grammar') + '">Grammar</a>'
    + '  <a href="' + pages.brain + '" class="mobile-sub-link' + ac('brain') + '">Brain</a>'
    + '  <a href="' + pages.ruleengine + '" class="mobile-sub-link' + ac('ruleengine') + '">Rule Engine</a>'
    + '  <a href="' + pages.axpatterns + '" class="mobile-sub-link' + ac('axpatterns') + '">Response</a>'
    + '  <a href="' + pages.trust + '" class="mobile-sub-link' + ac('trust') + '">Trust Design</a>'
    + '  <a href="' + pages.specs + '" class="mobile-sub-link' + ac('specs') + '">Specs</a>'
    + '  <a href="' + pages.projects + '" class="' + ac('projects') + '">Projects</a>'
    + '  <a href="' + pages.about + '" class="' + ac('about') + '">About</a>'
    + '  <a href="' + pages.contact + '" class="nav-cta">Contact</a>'
    + '  <div class="nav-mobile-lang">'
    + '    <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="Switch to English">EN</a>'
    + '    <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '" aria-label="日本語に切り替え">JA</a>'
    + '  </div>'
    + '</nav>';

  // ── Desktop language switcher ──
  html += ''
    + '<div class="lang-switch" id="lang-switch" role="group" aria-label="Language">'
    + '  <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '" aria-label="Switch to English">EN</a>'
    + '  <div class="lang-divider" aria-hidden="true"></div>'
    + '  <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '" aria-label="日本語に切り替え">JA</a>'
    + '</div>';

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
        window.requestAnimationFrame(function() {
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
  dropdown.addEventListener('mouseenter', function() {
    clearTimeout(closeTimeout);
    hoverTimeout = setTimeout(openDropdown, 80);
  });

  dropdown.addEventListener('mouseleave', function() {
    clearTimeout(hoverTimeout);
    scheduleClose();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown on Escape
  document.addEventListener('keydown', function(e) {
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
  trigger.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDropdown();
      if (menuItems.length) menuItems[0].focus();
    }
  });

  // Arrow keys move focus between menuitems; Esc closes and returns focus to trigger
  for (var mi = 0; mi < menuItems.length; mi++) {
    (function(idx) {
      menuItems[idx].addEventListener('keydown', function(e) {
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

  hamburger.addEventListener('click', function() {
    if (overlay.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Focus trap: wrap Tab / Shift+Tab within the overlay while open
  overlay.addEventListener('keydown', function(e) {
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
    mobileLinks[i].addEventListener('click', function() {
      closeMobileMenu();
    });
  }
}
