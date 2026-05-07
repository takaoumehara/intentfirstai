/* =============================================================
   Vivid Moments Gallery — minimal JS
   =============================================================
   - Reveal each moment as it scrolls into view.
   - If a builder lands here with ?pattern= / ?preset= / ?state=,
     redirect them to the live console which handles those.
   ============================================================= */

(function () {
  'use strict';

  // ─── Console redirect for builder URLs ───
  const params = new URLSearchParams(window.location.search);
  if (params.get('pattern') || params.get('preset') || params.get('state')) {
    window.location.replace('console.html' + window.location.search + window.location.hash);
    return;
  }

  // ─── Reveal moments on scroll ───
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.moment').forEach((m) => observer.observe(m));
  } else {
    document.querySelectorAll('.moment').forEach((m) => m.classList.add('is-visible'));
  }
})();
