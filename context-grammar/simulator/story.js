/* =============================================================
   Context Grammar Simulator — Story version
   =============================================================
   Two responsibilities:
   1. Reveal scenes as they enter the viewport (subtle fade-up).
   2. If a builder lands here with ?pattern= / ?preset= / ?state=,
      redirect them to the live console which handles those.
   ============================================================= */

(function () {
  'use strict';

  // ─── Console redirect for builder URLs ───
  const params = new URLSearchParams(window.location.search);
  if (params.get('pattern') || params.get('preset') || params.get('state')) {
    // Preserve query string and hand off to the live console
    window.location.replace('console.html' + window.location.search + window.location.hash);
    return;
  }

  // ─── Scene reveals ───
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.scene').forEach((s) => observer.observe(s));
  } else {
    // Older browsers — just show everything
    document.querySelectorAll('.scene').forEach((s) => s.classList.add('is-visible'));
  }
})();
