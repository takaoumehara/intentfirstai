(function () {
  'use strict';

  /* ─── PIPELINE CARD DATA (JAPANESE) ─── */
  var PIPELINE_DATA = {
    human: {
      num: '01',
      title: 'Human Raw Expression（人間の生の表現）',
      desc: '履歴、コンテキスト、ゴール、制約を持った、現実の瞬間を生きる実在の人物。Messy（ノイジー）な感情や状況の塊。',
      bullets: ['抽象的なユーザーではなく実在の人間', 'コマンド以前の生のニーズが出発点', 'コンテキストGrammarの真の入口'],
      link: '../context-grammar/ja/index.html',
      color: 'default'
    },
    inference: {
      num: '02',
      title: 'Simultaneous Inference（同時並列推論）',
      desc: '明示的な意図だけでなく、6つの状況シグナルと潜在的な欲求（Latent Intent）を単一パスで同時並列に推論。',
      bullets: ['明示的・暗黙的・潜在的意図の同時解析', '6つの状況シグナルの自動読み込み', '文脈変数のリアルタイム構造化'],
      link: '../context-grammar/ja/signals/index.html',
      color: 'intent'
    },
    gate: {
      num: '03',
      title: 'Risk & Confidence Gate（リスク＆確信度ゲート）',
      desc: 'アクション実行前に、確信度（Confidence）× リスク × 可逆性 × センシティビティを自動評価。',
      bullets: ['確信度×リスクの動的判定', 'ドメイン感度の自動分類', '自律度の上限（Ceiling）を安全に設定'],
      link: '../context-grammar/ja/negotiation-gate/',
      color: 'grammar'
    },
    negotiation: {
      num: '04',
      title: 'Negotiation Gate（交渉ゲート）',
      desc: '意図が曖昧・リスクが高い場合、Assumption CardsやPriority Toggleで調整しながら、自律度上限を決定する。',
      bullets: ['EditableなAssumption Cardsによる確認', '自律度上限：min(ユーザー設定, Gate上限)', '進行／プレビュー／確認／ブロックの決定'],
      link: '../context-grammar/ja/negotiation-gate/index.html',
      color: 'grammar'
    },
    autonomy: {
      num: '06',
      title: 'AXパターン',
      desc: 'Negotiation Gateで解決されたレスポンスを、23種類の再利用可能なAXパターンでアクティブな画面に表現する。マルチデバイスにまたがるライフサイクル監視・適応も実行する。',
      bullets: ['23種類のAXパターンがレスポンスを形成', '各パターンにAgent Action Lifecycleの動詞タグを付与', 'Watch/CarPlay/HUDのデバイス協調'],
      link: '../context-grammar/ja/ax-patterns/index.html',
      color: 'brand'
    },
    brain: {
      num: '🧠',
      title: 'Brain（記憶レイヤー）',
      desc: '3つの記憶層：Identity（属性）、Learning（学習した嗜好）、Now（現在の状態）。常に全てのステージから参照・更新される。',
      bullets: ['Identity：誰であるか', 'Learning：何を学習したか', 'Now：今この瞬間の状態とシグナル'],
      link: '../context-grammar/ja/brain/index.html',
      color: 'default'
    },
    trust: {
      num: '🛡️',
      title: 'Trust（長期の信頼関係）',
      desc: '長期的な関係性の質。Disclosure × Autonomyの連動、Temporal Arc（時間的変化）、ブレイクからの回復。',
      bullets: ['Disclosure × Autonomy coupling', 'Temporal Arc — 関係の時間的成長', 'Trust Breach Recovery'],
      link: '../context-grammar/ja/trust/index.html',
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
