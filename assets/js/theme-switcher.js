/* Context Grammar — Theme Switcher
   Icon pill: sun (light) / moon (dark). Fixed bottom-left.
   Reads/writes localStorage key 'cg-theme'. */

(function () {
  const KEY = 'cg-theme';

  const SVG_SUN = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/>
    <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="2.93" y1="2.93" x2="4.34" y2="4.34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="11.66" y1="11.66" x2="13.07" y2="13.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="2.93" y1="13.07" x2="4.34" y2="11.66" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="11.66" y1="4.34" x2="13.07" y2="2.93" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  const SVG_MOON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.5 10A6 6 0 0 1 6 2.5a6.5 6.5 0 1 0 7.5 7.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const stored = localStorage.getItem(KEY) || 'light';
  document.documentElement.setAttribute('data-theme', stored);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    document.querySelectorAll('.theme-switcher__btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.mode === theme);
    });
  }

  function buildSwitcher() {
    const sw = document.createElement('div');
    sw.className = 'theme-switcher';
    sw.setAttribute('role', 'group');
    sw.setAttribute('aria-label', 'Color theme');
    sw.innerHTML = `
      <button class="theme-switcher__btn" data-mode="light" aria-label="Light mode">${SVG_SUN}</button>
      <button class="theme-switcher__btn" data-mode="dark"  aria-label="Dark mode">${SVG_MOON}</button>
    `;
    document.body.appendChild(sw);

    sw.addEventListener('click', e => {
      const btn = e.target.closest('[data-mode]');
      if (btn) applyTheme(btn.dataset.mode);
    });

    const current = localStorage.getItem(KEY) || 'light';
    sw.querySelectorAll('[data-mode]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.mode === current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSwitcher);
  } else {
    buildSwitcher();
  }
})();
