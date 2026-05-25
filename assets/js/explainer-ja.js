(function () {
  'use strict';

  /* ─── PIPELINE CARD DATA (JAPANESE) ─── */
  var PIPELINE_DATA = {
    human: {
      num: '01',
      title: 'Human（人間）',
      desc: '履歴、コンテキスト、ゴール、制約を持った、現実の瞬間を生きる実在の人物。',
      bullets: ['抽象的な「ユーザー」ではない', 'パイプラインの出発点', 'コンテキストは人間の状況から始まる'],
      link: '../context-grammar/ja/index.html',
      color: 'default'
    },
    intent: {
      num: '02',
      title: 'Intent v2（意図）',
      desc: 'リクエストの背後にあるゴール — Detection Channel × Awareness Depthにわたって解釈される。',
      bullets: ['明示的シグナル：話す、入力する、タップする', '暗黙的シグナル：文脈や記憶から推測される', 'Intentは入口。Interpretationがインターフェース。'],
      link: '../context-grammar/ja/intent/index.html',
      color: 'intent'
    },
    signals: {
      num: '03',
      title: '6 Situation Signals（状況シグナル）',
      desc: '今この瞬間に何が起きているかを記述する6つの状況シグナル。',
      bullets: [
        '身体的状態・認知負荷・ソーシャル露出',
        '優先度・フォームファクタ・実現可能性',
        '継続的に読み取られる — プロンプトは不要'
      ],
      link: '../context-grammar/ja/tokens/index.html',
      color: 'grammar'
    },
    dials: {
      num: '04',
      title: '2 Relationship Dials（関係性ダイヤル）',
      desc: 'AIにどこまで任せるか、どこまで知らせるか。ドメインごと、人ごとに設定。',
      bullets: [
        'Autonomy Dial：Suggest → Confirm → Notify → Auto',
        'Disclosure Dial：AIがあなたについて何を知っているか',
        '自律の前提は開示 — 知らせない × 任せるは成立しない'
      ],
      link: '../context-grammar/ja/tokens/index.html',
      color: 'grammar'
    },
    'rule-engine': {
      num: '05',
      title: 'Rule Engine（ルールエンジン）',
      desc: 'コンテキストを具体的なUIの振る舞いへと変換するロジック層。',
      bullets: ['シグナルとダイヤルと記憶を読み取る', 'デバイスに依存しないUIコマンドを出力する', 'ユーザーを尊重したインターフェースの適応を支援する'],
      link: '../context-grammar/ja/rule-engine/index.html',
      color: 'default'
    },
    'negotiation-gate': {
      num: '06',
      title: 'Negotiation Gate（交渉ゲート）',
      desc: '行動の前にConfidence × Risk × Reversibility × Sensitivityを評価する。',
      bullets: ['高確信度 + 低リスク → 実行', '低確信度または高リスク → ユーザーにエスカレーション', 'Gate Decision + Autonomy Ceilingを出力'],
      link: '../context-grammar/ja/negotiation-gate/',
      color: 'default'
    },
    'autonomy-resolution': {
      num: '07',
      title: 'Autonomy Resolution（自律解決）',
      desc: '最終自律度 = min(ユーザー設定, Gate上限)。これがコアの安全契約。',
      bullets: ['ユーザー設定は希望値', 'Gate上限は安全制約', '最終自律度はその低い方'],
      link: '../context-grammar/ja/negotiation-gate/#autonomy-resolution',
      color: 'default'
    },
    'ax-patterns': {
      num: '08',
      title: 'AX × Lifecycle（適応型UXパターン）',
      desc: 'AIエージェントのライフサイクル全体にわたる、再利用可能な振る舞いパターン。',
      bullets: ['Delegation（委譲：AIが代わりに実行する）', 'Escalation（エスカレーション：人間に判断や確認を求める）', 'Adaptation（適応：画面を適応させる）'],
      link: '../context-grammar/ja/ax-patterns/index.html',
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
    popover.setAttribute('aria-expanded', 'false');
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
