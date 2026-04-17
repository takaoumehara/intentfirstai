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
     activePage — 'home'|'introduction'|'grammar'|'brain'|'trust'|'specs'|'axpatterns'|'projects'|'about'
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

  // Language switch paths
  var jaPrefix = bp + 'ja/';
  var enPrefix = bp;
  // If we're already in JA, basePath already accounts for depth.
  // The lang switcher toggles between /[page] and /ja/[page].
  var currentPath = window.location.pathname;

  // Page paths (relative to basePath)
  var pages = {
    home:        bp + 'index.html',
    introduction: bp + 'context-grammar/index.html',
    grammar:     bp + 'context-grammar/grammar/index.html',
    brain:       bp + 'context-grammar/brain/index.html',
    trust:       bp + 'context-grammar/trust-design/index.html',
    specs:       bp + 'context-grammar/specs/index.html',
    axpatterns:  bp + 'context-grammar/ax-patterns/index.html',
    projects:    bp + 'applied/index.html',
    industry:    bp + 'industry/index.html',
    about:       bp + 'about/index.html',
    contact:     bp + 'contact/index.html'
  };

  // CG sub-pages for dropdown trigger active state + subnav
  var cgPages = ['introduction', 'grammar', 'brain', 'trust', 'specs', 'axpatterns'];
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
    + '      <img class="nav-logo-img nav-logo-img--light" src="' + logoBlack + '" alt="intentfirst" />'
    + '      <img class="nav-logo-img nav-logo-img--dark" src="' + logoWhite + '" alt="intentfirst" />'
    + '    </a>'
    + '    <div class="nav-links">'
    + '      <div class="nav-dropdown" id="nav-dropdown">'
    + '        <a href="' + pages.introduction + '" class="nav-dropdown-trigger' + (isCGActive ? ' nav-active' : '') + '" aria-haspopup="true">'
    + '          Context Grammar'
    + '        </a>'
    + '        <div class="nav-dropdown-menu" role="menu">'
    + '          <a href="' + pages.introduction + '" role="menuitem" class="' + ac('introduction') + '">Introduction</a>'
    + '          <a href="' + pages.grammar + '" role="menuitem" class="' + ac('grammar') + '">Grammar</a>'
    + '          <a href="' + pages.brain + '" role="menuitem" class="' + ac('brain') + '">Brain</a>'
    + '          <a href="' + pages.trust + '" role="menuitem" class="' + ac('trust') + '">Trust Design</a>'
    + '          <a href="' + pages.specs + '" role="menuitem" class="' + ac('specs') + '">Specs</a>'
    + '          <a href="' + pages.axpatterns + '" role="menuitem" class="' + ac('axpatterns') + '">AX Patterns</a>'
    + '        </div>'
    + '      </div>'
    + '      <a href="' + pages.projects + '" class="' + ac('projects') + '">Projects</a>'
    + '      <a href="' + pages.about + '" class="' + ac('about') + '">About</a>'
    + '      <a href="' + pages.contact + '" class="nav-cta">Contact</a>'
    + '    </div>'
    + '    <button class="hamburger-btn" id="hamburger-btn" aria-label="Menu">'
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
      + '    <a href="' + pages.grammar + '"' + (active === 'grammar' ? ' class="nav-subnav-active"' : '') + '>Grammar</a>'
      + '    <a href="' + pages.brain + '"' + (active === 'brain' ? ' class="nav-subnav-active"' : '') + '>Brain</a>'
      + '    <a href="' + pages.trust + '"' + (active === 'trust' ? ' class="nav-subnav-active"' : '') + '>Trust Design</a>'
      + '    <a href="' + pages.specs + '"' + (active === 'specs' ? ' class="nav-subnav-active"' : '') + '>Specs</a>'
      + '    <a href="' + pages.axpatterns + '"' + (active === 'axpatterns' ? ' class="nav-subnav-active"' : '') + '>AX Patterns</a>'
      + '  </div>'
      + '</nav>';
  }

  // ── Mobile overlay ──
  html += ''
    + '<div class="nav-mobile-overlay" id="nav-mobile-overlay">'
    + '  <a href="' + pages.home + '" class="' + ac('home') + '">Home</a>'
    + '  <div class="mobile-section-label">Context Grammar</div>'
    + '  <a href="' + pages.introduction + '" class="mobile-sub-link' + ac('introduction') + '">Introduction</a>'
    + '  <a href="' + pages.grammar + '" class="mobile-sub-link' + ac('grammar') + '">Grammar</a>'
    + '  <a href="' + pages.brain + '" class="mobile-sub-link' + ac('brain') + '">Brain</a>'
    + '  <a href="' + pages.trust + '" class="mobile-sub-link' + ac('trust') + '">Trust Design</a>'
    + '  <a href="' + pages.specs + '" class="mobile-sub-link' + ac('specs') + '">Specs</a>'
    + '  <a href="' + pages.axpatterns + '" class="mobile-sub-link' + ac('axpatterns') + '">AX Patterns</a>'
    + '  <a href="' + pages.projects + '" class="' + ac('projects') + '">Projects</a>'
    + '  <a href="' + pages.about + '" class="' + ac('about') + '">About</a>'
    + '  <a href="' + pages.contact + '" class="nav-cta">Contact</a>'
    + '  <div class="nav-mobile-lang">'
    + '    <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '">EN</a>'
    + '    <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '">JA</a>'
    + '  </div>'
    + '</div>';

  // ── Desktop language switcher ──
  html += ''
    + '<div class="lang-switch" id="lang-switch">'
    + '  <a href="' + enUrl + '" class="' + (lang === 'en' ? 'active' : '') + '">EN</a>'
    + '  <div class="lang-divider"></div>'
    + '  <a href="' + jaUrl + '" class="' + (lang === 'ja' ? 'active' : '') + '">JA</a>'
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

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > scrollThreshold) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
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
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
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

  // ── Hamburger / mobile menu ──
  function openMobileMenu() {
    hamburger.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function() {
    if (overlay.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
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
