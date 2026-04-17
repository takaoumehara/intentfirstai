/* ═══════════════════════════════════════════════════════════
   scroll-observer.js  —  P3 Reveal + Count-Up Animation
   ═══════════════════════════════════════════════════════════ */

const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('[data-count-up]').forEach(el => {
        const target = +el.dataset.countUp;
        const start = performance.now();
        (function tick(now) {
          const p = Math.min((now - start) / 800, 1);
          el.querySelector('span').textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
