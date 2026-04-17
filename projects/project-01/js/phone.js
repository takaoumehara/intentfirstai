/* ═══ PHONE INTERACTION ═══ */
let dashActive = false, resolved = false;
let currentFlight = 'tonight';
const nodeIds = ['tl1','tl2','tl3','tl4','tl5'];

document.getElementById('lockScreen').addEventListener('click', () => {
  if (dashActive) return;
  dashActive = true;
  document.getElementById('dashboard').classList.add('active');
  nodeIds.forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('show'), 150 + i * 160);
  });
});

/* ═══ NODE DETAIL MODALS ═══ */
const nodeModalMap = { tl1: 'nodeModal1', tl2: 'nodeModal2', tl3: 'nodeModal3', tl4: 'nodeModal4' };

nodeIds.forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    if (!dashActive || resolved) return;
    const modalId = nodeModalMap[id];
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('open');
    }
  });
});

document.querySelectorAll('[data-close-node]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.closest('.node-modal').classList.remove('open');
  });
});

/* ═══ TYPEWRITER EFFECT ═══ */
function typewrite(el, text, speed) {
  speed = speed || 12;
  el.textContent = '';
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    }
  }
  tick();
}

/* ═══ FLIGHT OPTION SWITCHING ═══ */
document.querySelectorAll('.fo-option').forEach(opt => {
  opt.addEventListener('click', () => {
    if (resolved) return;
    const flight = opt.dataset.flight;
    if (flight === currentFlight) return;
    currentFlight = flight;

    // Toggle active class
    document.querySelectorAll('.fo-option').forEach(o => o.classList.remove('fo-active'));
    opt.classList.add('fo-active');

    // Animate timeline content out with stagger
    const contents = document.querySelectorAll('.tl-content');
    contents.forEach((c, i) => {
      setTimeout(() => c.classList.add('switching'), i * 40);
    });

    // Update timeline line colors
    const lines = document.querySelectorAll('.tl-line');
    const lineColor = flight === 'morning' ? 'rgba(217,119,6,0.15)' : 'rgba(37,99,235,0.12)';
    lines.forEach(l => { l.style.background = lineColor; });

    // After fade out, swap content
    setTimeout(() => {
      nodeIds.forEach(id => {
        const node = document.getElementById(id);
        const els = node.querySelectorAll('[data-' + flight + ']');
        els.forEach(el => {
          const newText = el.getAttribute('data-' + flight);
          if (newText !== null) el.textContent = newText;
        });
        // Handle status class changes
        const status = node.querySelector('.tl-status');
        if (status) {
          const newClass = status.getAttribute('data-' + flight + '-class');
          if (newClass) {
            status.className = 'tl-status ' + newClass;
          }
          const newText = status.getAttribute('data-' + flight);
          if (newText !== null) {
            status.textContent = newText;
            status.style.display = newText ? '' : 'none';
          }
        }
      });

      // Update last node dot color + pulse
      const lastDot = document.querySelector('#tl5 .tl-dot');
      if (flight === 'morning') {
        lastDot.className = 'tl-dot amber-dot amber-pulse';
      } else {
        lastDot.className = 'tl-dot green-dot';
      }

      // Update slack preview with typewriter
      const slackText = document.getElementById('slackText');
      const newSlack = slackText.getAttribute('data-' + flight);
      slackText.style.opacity = '0';
      setTimeout(() => {
        slackText.style.opacity = '1';
        typewrite(slackText, newSlack, 10);
      }, 200);

      // Animate content back in with stagger
      contents.forEach((c, i) => {
        setTimeout(() => c.classList.remove('switching'), 60 + i * 70);
      });
    }, 380);
  });
});

/* ═══ SLIDE TO RESOLVE ═══ */
const track = document.getElementById('slideTrack');
const thumb = document.getElementById('slideThumb');
const fill = document.getElementById('slideFill');
const label = document.getElementById('slideLabel');
let dragging = false, sx = 0, tx = 0;
const maxX = () => track.offsetWidth - 48;

function pDown(e) {
  if (resolved) return;
  dragging = true;
  sx = (e.touches ? e.touches[0].clientX : e.clientX) - tx;
  thumb.style.transition = 'none'; fill.style.transition = 'none';
  e.preventDefault();
}
function pMove(e) {
  if (!dragging) return;
  const cx = (e.touches ? e.touches[0].clientX : e.clientX);
  tx = Math.max(0, Math.min(cx - sx, maxX()));
  thumb.style.left = (4 + tx) + 'px';
  fill.style.width = (tx + 44) + 'px';
  label.style.opacity = 1 - tx / maxX();
}
function pUp() {
  if (!dragging) return;
  dragging = false;
  thumb.style.transition = 'left 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s';
  fill.style.transition = 'width 0.4s cubic-bezier(0.16,1,0.3,1)';
  if (tx / maxX() > 0.6) doResolve();
  else { tx = 0; thumb.style.left = '4px'; fill.style.width = '0'; label.style.opacity = 1; }
}

function doResolve() {
  resolved = true;
  tx = maxX();
  thumb.style.left = (4 + tx) + 'px';
  fill.style.width = '100%';
  track.classList.add('done');
  label.textContent = 'Resolved'; label.style.opacity = 1;
  thumb.innerHTML = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#fff;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round"><polyline points="20 6 9 17 4 12"/></svg>';

  // Green checkmarks cascade
  nodeIds.forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('resolved'), 100 + i * 120);
  });

  // Show resolved overlay
  setTimeout(() => {
    document.getElementById('dashResolved').classList.add('show');
  }, 800);

  // Dissolve back to lock screen
  setTimeout(() => {
    document.getElementById('dashResolved').classList.remove('show');
    setTimeout(() => {
      const dash = document.getElementById('dashboard');
      dash.style.transition = 'opacity 0.7s, transform 0.7s';
      dash.style.opacity = '0'; dash.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        dash.classList.remove('active');
        document.querySelectorAll('.node-modal').forEach(m => m.classList.remove('open'));
        dash.style.opacity = ''; dash.style.transform = ''; dash.style.transition = '';
        dashActive = false; resolved = false; tx = 0;
        currentFlight = 'tonight';
        thumb.style.left = '4px'; fill.style.width = '0';
        track.classList.remove('done');
        label.textContent = 'Slide to Resolve'; label.style.opacity = 1;
        thumb.innerHTML = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#fff;stroke-width:2;fill:none"><path d="M9 18l6-6-6-6"/></svg>';

        // Reset flight options
        document.querySelectorAll('.fo-option').forEach(o => o.classList.remove('fo-active'));
        document.getElementById('foTonight').classList.add('fo-active');

        // Reset timeline lines
        document.querySelectorAll('.tl-line').forEach(l => { l.style.background = ''; });

        // Reset timeline nodes
        nodeIds.forEach(id => {
          const node = document.getElementById(id);
          node.classList.remove('show', 'resolved');
          node.querySelectorAll('[data-tonight]').forEach(el => {
            el.textContent = el.getAttribute('data-tonight');
          });
          const status = node.querySelector('.tl-status');
          if (status) {
            const cls = status.getAttribute('data-tonight-class');
            if (cls) status.className = 'tl-status ' + cls;
            const txt = status.getAttribute('data-tonight');
            if (txt !== null) { status.textContent = txt; status.style.display = txt ? '' : 'none'; }
          }
        });

        // Reset last dot
        document.querySelector('#tl5 .tl-dot').className = 'tl-dot green-dot';

        // Reset slack
        const slackText = document.getElementById('slackText');
        slackText.textContent = slackText.getAttribute('data-tonight');
      }, 600);
    }, 400);
  }, 4000);
}

thumb.addEventListener('mousedown', pDown);
thumb.addEventListener('touchstart', pDown, { passive: false });
document.addEventListener('mousemove', pMove);
document.addEventListener('touchmove', pMove, { passive: false });
document.addEventListener('mouseup', pUp);
document.addEventListener('touchend', pUp);
