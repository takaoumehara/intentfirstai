(function () {
  'use strict';

  /* ─── PIPELINE CARD DATA ─── */
  var PIPELINE_DATA = {
    human: {
      num: '01',
      title: 'Human',
      desc: 'A real person in a real moment — with history, context, goals, and constraints.',
      bullets: ['Not an abstract user', 'The starting point of the pipeline', 'Context begins with the human situation'],
      link: 'context-grammar/index.html',
      color: 'default'
    },
    intent: {
      num: '02',
      title: 'Intent v2',
      desc: 'The goal behind a request — interpreted across Detection Channel × Awareness Depth.',
      bullets: ['Can be explicit: spoken, typed, tapped', 'Can be implicit: inferred from context and memory', 'Intent is the entry point. Interpretation is the interface.'],
      link: 'context-grammar/intent/index.html',
      color: 'intent'
    },
    signals: {
      num: '03',
      title: '6 Situation Signals',
      desc: 'Six signals that describe what is happening right now.',
      bullets: [
        'Physical state · Cognitive load · Social exposure',
        'Priority weight · Form factor · Feasibility',
        'Read continuously — not prompted'
      ],
      link: 'context-grammar/tokens/index.html',
      color: 'grammar'
    },
    dials: {
      num: '04',
      title: '2 Relationship Dials',
      desc: 'How much to trust AI, and how much to share. Set per domain, per person.',
      bullets: [
        'Autonomy Dial: Suggest → Confirm → Notify → Auto',
        'Disclosure Dial: what AI knows about you',
        'Prerequisite for Autonomy — knowing precedes acting'
      ],
      link: 'context-grammar/tokens/index.html',
      color: 'grammar'
    },
    'rule-engine': {
      num: '05',
      title: 'Rule Engine',
      desc: 'The logic layer that turns context into UI behavior.',
      bullets: ['Reads signals, dials, and memory', 'Outputs device-independent UI commands', 'Helps the interface adapt respectfully'],
      link: 'context-grammar/rule-engine/index.html',
      color: 'default'
    },
    'negotiation-gate': {
      num: '06',
      title: 'Negotiation Gate',
      desc: 'Evaluates Confidence × Risk × Reversibility × Sensitivity before any action.',
      bullets: ['High confidence + low risk → proceed', 'Low confidence or high risk → escalate to user', 'Outputs Gate Decision + Autonomy Ceiling'],
      link: 'context-grammar/negotiation-gate/',
      color: 'default'
    },
    'autonomy-resolution': {
      num: '07',
      title: 'Autonomy Resolution',
      desc: 'Final Autonomy = min(User Autonomy Setting, Gate Autonomy Ceiling). The core safety contract.',
      bullets: ['User setting is the preference', 'Gate ceiling is the safety constraint', 'Final autonomy is the lower of the two'],
      link: 'context-grammar/negotiation-gate/#autonomy-resolution',
      color: 'default'
    },
    'ax-patterns': {
      num: '08',
      title: 'AX × Lifecycle',
      desc: 'Reusable behavior patterns for AI experiences across the agent lifecycle.',
      bullets: ['Delegation', 'Escalation', 'Adaptation', 'Enterprise constraints'],
      link: 'context-grammar/ax-patterns/index.html',
      color: 'brand'
    }
  };

  /* ─── STEP → PIPELINE STAGE MAPPING ─── */
  var STEP_STAGES = {
    0: ['human'],
    1: ['human', 'intent'],
    2: ['human', 'intent', 'signals', 'dials', 'rule-engine', 'negotiation-gate', 'autonomy-resolution', 'ax-patterns'],
    3: ['human', 'intent', 'signals', 'dials'],
    4: ['human', 'intent', 'signals', 'dials', 'rule-engine', 'negotiation-gate', 'autonomy-resolution', 'ax-patterns']
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
        var key = card.getAttribute('data-xp-card');
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
