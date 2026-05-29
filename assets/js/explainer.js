(function () {
  'use strict';

  /* ─── PIPELINE CARD DATA ─── */
  var PIPELINE_DATA = {
    human: {
      num: '01',
      title: 'Human Raw Expression',
      desc: 'A real person expressing raw, messy needs mixing concern, desire, anxiety, goals, and constraints.',
      bullets: ['The starting point before any command prompt', 'High noise, high friction human reality', 'The entry point of the entire pipeline'],
      link: 'context-grammar/index.html',
      color: 'default'
    },
    inference: {
      num: '02',
      title: 'Simultaneous Inference',
      desc: 'The AI parallel-processes explicit intent, implicit situation signals, and latent desires in a single pass.',
      bullets: ['Explicit, Implicit, and Latent intent parsing', 'Incorporates 6 Situation Signals automatically', 'Extracts structured context variables instantaneously'],
      link: 'context-grammar/signals/index.html',
      color: 'intent'
    },
    gate: {
      num: '03',
      title: 'Risk & Confidence Gate',
      desc: 'Evaluates system Confidence, domain Sensitivity, transaction Risk, and action Reversibility.',
      bullets: ['Confidence × Risk metric analysis', 'Domain sensitivity classification', 'Sets a safety ceiling on execution autonomy'],
      link: 'context-grammar/negotiation-gate/',
      color: 'grammar'
    },
    negotiation: {
      num: '04',
      title: 'Negotiation Gate',
      desc: 'Clarifies intent and maps understanding. Evaluates Confidence × Risk × Reversibility × Sensitivity before acting.',
      bullets: ['Assumption Cards & Interpretation Previews', 'Sets autonomy ceiling: min(User Setting, Gate Ceiling)', 'Proceed / preview / confirm / block decision'],
      link: 'context-grammar/negotiation-gate/index.html',
      color: 'grammar'
    },
    autonomy: {
      num: '06',
      title: 'AX Patterns',
      desc: 'Expresses the Gate-resolved response via 23 reusable AX patterns across active surfaces. Executes across multi-device surfaces and triggers active lifecycle loops.',
      bullets: ['23 AX Patterns shape response behavior', 'Each pattern tagged with Agent Action Lifecycle verb', 'Device orchestration across Watch, CarPlay, HUD'],
      link: 'context-grammar/ax-patterns/index.html',
      color: 'brand'
    },
    brain: {
      num: '🧠',
      title: 'Brain',
      desc: 'Three-layer memory: Identity (who you are), Learning (taught preferences), Now (current state). Referenced dynamically by every stage.',
      bullets: ['Identity (who you are)', 'Learning (taught preferences)', 'Now (current state and signals)'],
      link: 'context-grammar/brain/index.html',
      color: 'default'
    },
    trust: {
      num: '🛡️',
      title: 'Trust',
      desc: 'Long-term relationship quality. Disclosure × Autonomy, Temporal Arc, Breach Recovery. Bounds autonomy ceiling.',
      bullets: ['Disclosure × Autonomy coupling', 'Temporal Arc — relationship grows over time', 'Trust Breach Recovery'],
      link: 'context-grammar/trust/index.html',
      color: 'brand'
    }
  };

  /* ─── STEP → PIPELINE STAGE MAPPING ─── */
  var STEP_STAGES = {
    0: ['human'],
    1: ['human', 'inference'],
    2: ['human', 'inference', 'gate', 'negotiation', 'autonomy'],
    3: ['human', 'inference', 'gate', 'negotiation'],
    4: ['human', 'inference', 'gate', 'negotiation', 'autonomy']
  };

  /* ─── STATE ─── */
  var state = {
    step: 0,
    openCard: null,
    openCardEl: null
  };

  /* ─── DOM REFS ─── */
  var section, steps, dots, progressFill, pipeBarStages;
  var prevBtn, nextBtn, curLabel;
  var popover, popoverNum, popoverTitle, popoverDesc, popoverBullets, popoverLink, popoverClose;

  function normalizeStageKey(key) {
    return key === 'trust-design' ? 'trust' : key;
  }

  /* ─── INIT ─── */
  function init() {
    section = document.getElementById('xp-section');
    if (!section) return;

    steps         = section.querySelectorAll('.xp-step');
    dots          = section.querySelectorAll('.xp-dot');
    progressFill  = section.querySelector('.xp-progress__fill');
    pipeBarStages = section.querySelectorAll('.xp-pipe-bar__stage');
    prevBtn     = document.getElementById('xp-prev');
    nextBtn     = document.getElementById('xp-next');
    curLabel    = document.getElementById('xp-cur');
    popover       = document.getElementById('xp-popover');
    popoverNum    = popover.querySelector('.xp-popover__num');
    popoverTitle  = popover.querySelector('.xp-popover__title');
    popoverDesc   = popover.querySelector('.xp-popover__desc');
    popoverBullets = popover.querySelector('.xp-popover__bullets');
    popoverLink   = popover.querySelector('.xp-popover__link');
    popoverClose  = popover.querySelector('.xp-popover__close');

    // Bind controls
    prevBtn.addEventListener('click', function () { goTo(state.step - 1); });
    nextBtn.addEventListener('click', function () { goTo(state.step + 1); });

    // Bind dots
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    // Bind pipeline cards
    section.querySelectorAll('.xp-pipe-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        var key = normalizeStageKey(card.getAttribute('data-xp-card'));
        if (state.openCard === key) {
          closePopover();
        } else {
          openPopover(key, card);
        }
      });
    });

    // Bind popover close
    popoverClose.addEventListener('click', closePopover);

    // Click outside popover to close
    document.addEventListener('click', function (e) {
      if (!popover.hidden && !popover.contains(e.target) && !e.target.closest('.xp-pipe-card')) {
        closePopover();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      var inSection = section.contains(document.activeElement);

      if (e.key === 'Escape') {
        if (!popover.hidden) { closePopover(); e.preventDefault(); }
        return;
      }

      if (!inSection) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.stopPropagation();
        goTo(state.step + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.stopPropagation();
        goTo(state.step - 1);
      }
    });

    // Initial render without animation
    renderStatic();

    // Expose global hook
    window.xpExplainer = { goTo: goTo };
  }

  /* ─── RENDER (static, no animation — for initial state) ─── */
  function renderStatic() {
    steps.forEach(function (step, i) {
      if (i === state.step) {
        step.removeAttribute('hidden');
      } else {
        step.setAttribute('hidden', '');
      }
      step.classList.remove('xp-step--in', 'xp-step--out');
    });
    updateNav();
  }

  /* ─── RENDER (animated) ─── */
  function render(prevStep) {
    var outStep = steps[prevStep];
    var inStep  = steps[state.step];

    // Close popover on step change
    if (!popover.hidden) closePopover();

    // Animate out
    outStep.classList.remove('xp-step--in');
    outStep.classList.add('xp-step--out');

    var onAnimEnd = function () {
      outStep.setAttribute('hidden', '');
      outStep.classList.remove('xp-step--out');
      outStep.removeEventListener('animationend', onAnimEnd);
    };
    outStep.addEventListener('animationend', onAnimEnd);

    // Animate in
    inStep.removeAttribute('hidden');
    inStep.classList.remove('xp-step--out');
    // Force reflow before adding class so animation fires
    void inStep.offsetWidth;
    inStep.classList.add('xp-step--in');

    updateNav();
  }

  /* ─── UPDATE NAV CONTROLS ─── */
  function updateNav() {
    // Progress bar
    var pct = ((state.step + 1) / steps.length) * 100;
    if (progressFill) progressFill.style.width = pct + '%';

    // Dots
    dots.forEach(function (dot, i) {
      var active = i === state.step;
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Buttons
    prevBtn.disabled = state.step === 0;
    nextBtn.disabled = state.step === steps.length - 1;

    // Label
    if (curLabel) curLabel.textContent = state.step + 1;

    // Mini pipeline bar
    if (pipeBarStages && pipeBarStages.length) {
      var activeStages = STEP_STAGES[state.step] || [];
      pipeBarStages.forEach(function (stageEl) {
        var key = stageEl.getAttribute('data-pipe-stage');
        stageEl.classList.toggle('xp-pipe-bar__stage--active', activeStages.indexOf(key) !== -1);
      });
    }
  }

  /* ─── GO TO STEP ─── */
  function goTo(idx) {
    if (idx < 0 || idx > steps.length - 1) return;
    if (idx === state.step) return;
    var prev = state.step;
    state.step = idx;
    render(prev);
  }

  /* ─── OPEN POPOVER ─── */
  function openPopover(key, triggerEl) {
    key = normalizeStageKey(key);
    var data = PIPELINE_DATA[key];
    if (!data) return;

    // Populate
    popoverNum.textContent    = data.num;
    popoverTitle.textContent  = data.title;
    popoverDesc.textContent   = data.desc;
    popoverLink.href          = data.link;
    popover.setAttribute('data-xp-color', data.color);

    // Bullets
    if (popoverBullets) {
      popoverBullets.innerHTML = '';
      if (data.bullets && data.bullets.length) {
        data.bullets.forEach(function (b) {
          var li = document.createElement('li');
          li.textContent = b;
          popoverBullets.appendChild(li);
        });
        popoverBullets.removeAttribute('hidden');
      } else {
        popoverBullets.setAttribute('hidden', '');
      }
    }

    // Update aria on cards
    if (state.openCardEl) state.openCardEl.setAttribute('aria-expanded', 'false');
    triggerEl.setAttribute('aria-expanded', 'true');

    state.openCard   = key;
    state.openCardEl = triggerEl;

    popover.removeAttribute('hidden');
    popoverClose.focus();
  }

  /* ─── CLOSE POPOVER ─── */
  function closePopover() {
    popover.setAttribute('hidden', '');
    if (state.openCardEl) {
      state.openCardEl.setAttribute('aria-expanded', 'false');
      state.openCardEl.focus();
    }
    state.openCard   = null;
    state.openCardEl = null;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
