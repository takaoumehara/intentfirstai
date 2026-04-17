/* ═══ TOKEN FULL-SCREEN MODAL ═══ */
const tokenModalData = [
  { badge:'01', name:'Intent', def:'What the user needs to accomplish right now. Not just functional — includes emotional and social goals.', val:'Emergency', impact:'Every suggestion filtered through crisis mode. The OS doesn\'t show "nice to have" — only what resolves the situation.' },
  { badge:'02', name:'Physical State', def:'What the body can physically do. Hand availability, movement state, sensory constraints. Determines input method and touch target size.', val:'Standing / One-hand', impact:'Touch targets maximized. No typing required. All interaction reduced to swipe gestures. The UI adapts to a single thumb.' },
  { badge:'03', name:'Cognitive Load', def:'Available mental bandwidth. Decision-making capacity, information processing ability, attention remaining.', val:'PANIC', impact:'Surface shows 1 recommended option only. No comparison UI. But alternatives are accessible — because this is an exception event and the Dial is downgraded.' },
  { badge:'04', name:'Social Exposure', def:'Who can see the screen. Privacy level and audience definition. Has the power to reshape the entire information architecture.', val:'PUBLIC', impact:'Prices shown minimally. Personal information reduced. No sensitive details visible to strangers at the gate.' },
  { badge:'05', name:'Priority Weight', def:'When multiple values conflict, which one wins. Designer sets defaults, user adjusts. The basis for "why did AI choose this?"', val:'Reliability > Cost', impact:'Sort by arrival certainty, not cheapest price. Budget options with delay risk are hidden. Getting there matters more than saving $100.' },
  { badge:'06', name:'Synchro Rate', def:'How much autonomy the AI gets. Changes through trust accumulation over time. The only token that is dynamically updated through usage history.', val:'Exception: Dial Downgraded', impact:'Flight cancellation is an exception event. Even at high Synchro (0.8), the Dial temporarily drops to Confirm (0.6). AI recommends, but you choose.' },
  { badge:'07', name:'Form Factor', def:'What device is available right now, and what\'s nearby. The device\'s "role" changes by context. Dismantles the assumption that the phone is always the UI container.', val:'Lock-screen only', impact:'The most minimal interface possible. No app is opened. The lock screen IS the entire UI. The disposable dashboard lives and dies here.' },
  { badge:'08', name:'Feasibility Context', def:'What is actually possible right now — physical, temporal, resource constraints. Filters for feasible-only plans. Not "what\'s ideal" but "what the world allows."', val:'3 seats / trains running / free hotel change', impact:'These real-world constraints shaped every option. No flights after 6 AM? Hidden. Hotel has a cancellation fee? Different hotel chosen. The environment defines the boundaries.' }
];

const overlay = document.getElementById('tokenModalOverlay');

document.querySelectorAll('.token-card').forEach((card, idx) => {
  card.addEventListener('click', () => {
    const d = tokenModalData[idx];
    document.getElementById('tmBadge').textContent = d.badge;
    document.getElementById('tmName').textContent = d.name;
    document.getElementById('tmDef').textContent = d.def;
    document.getElementById('tmVal').textContent = d.val;
    document.getElementById('tmImpact').textContent = d.impact;
    overlay.classList.add('open');
  });
});

document.getElementById('tmClose').addEventListener('click', () => {
  overlay.classList.remove('open');
});
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('open');
});
