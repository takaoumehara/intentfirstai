/* ═══ AUTONOMY DIAL ═══ */
const dialData = [
  'Seat hold is <strong>fully reversible</strong> — auto-releases in 15 min. Normally at high Synchro, this would be silent. But this is an <strong>exception event</strong> — Dial downgraded. AI held the seat and notified you.',
  'Hotel rebooking has a <strong>free cancellation window</strong>. Substitution Mode: <strong>Flexible</strong> — same area, brand doesn\'t matter. AI changed it automatically and notified after.',
  'A $340 flight purchase is <strong>irreversible</strong>. Even at high Synchro, this requires confirmation. The exception event reinforces this — AI prepared everything but waits for your swipe.',
  'Slack messages are <strong>socially irreversible</strong>. Substitution Mode: <strong>Exact</strong> — you control the wording. AI drafted it in your tone, but sending requires your explicit approval.'
];
document.querySelectorAll('.dial-marker').forEach(m => {
  m.addEventListener('click', () => {
    const i = +m.dataset.dial;
    const det = document.getElementById('dialDetail');
    const txt = document.getElementById('dialDetailText');
    const same = det.classList.contains('show') && txt.innerHTML === dialData[i];
    det.classList.remove('show');
    if (!same) setTimeout(() => { txt.innerHTML = dialData[i]; det.classList.add('show'); }, 120);
  });
});
