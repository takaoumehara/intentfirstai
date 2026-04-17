/* ═══ SCROLL OBSERVER ═══ */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count;
        const start = performance.now();
        (function tick(now) {
          const p = Math.min((now - start) / 800, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
