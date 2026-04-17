/* ═══════════════════════════════════════════════════════════
   tokens.js  —  P2 Token Card Modal Interaction
   ═══════════════════════════════════════════════════════════ */

const tokenModalData = [
  { badge:'01', name:'Intent', def:'What the user needs to accomplish right now. Not just functional — includes emotional and social goals.', val:'Cook dinner — execute within constraints', impact:'Every suggestion filtered through feasibility mode. The OS doesn\'t show ideal recipes — only what can actually be made tonight with what\'s available.' },
  { badge:'02', name:'Physical State', def:'What the body can physically do. Hand availability, movement state, sensory constraints. Determines input method and touch target size.', val:'Driving → Cooking', impact:'Two completely different physical states requiring two completely different UIs. Car: voice-only, zero visual. Kitchen: 96 px type from 1 meter away, no touch (wet hands).' },
  { badge:'03', name:'Cognitive Load', def:'Available mental bandwidth. Decision-making capacity, information processing ability, attention remaining.', val:'Depleted', impact:'After a 10-hour workday, 10 options = delivery. Maximum 2 choices. No descriptions, no ratings. "A or B" is the only decision the user has energy for.' },
  { badge:'04', name:'Social Exposure', def:'Who can see the screen. Privacy level and audience definition. Has the power to reshape the entire information architecture.', val:'Not active', impact:'This token doesn\'t prominently fire in this scenario. The user is alone in the car and then at home with family. No privacy constraints apply.' },
  { badge:'05', name:'Priority Weight', def:'When multiple values conflict, which one wins. Designer sets defaults, user adjusts. The basis for "why did AI choose this?"', val:'Feasibility > Variety', impact:'Tonight, "can I make this?" beats "would I enjoy this most?" The fridge is nearly empty — but feasibility is gradient. Salmon + fries can be delivered for $15, so the recipe stays.' },
  { badge:'06', name:'Synchro Rate', def:'How much autonomy the AI gets. Changes through trust accumulation over time. The only token dynamically updated through usage history.', val:'Fridge scan = Delegate. TaskRabbit order ($15 for salmon + fries) = Delegate. "Which recipe to make?" = You decide.', impact:'AI handles logistics — scanning the fridge, ordering groceries, pushing the recipe to the kitchen display. Human makes the decisions that matter — what to cook, whether to approve the order.' },
  { badge:'07', name:'Form Factor', def:'What device is available right now, and what\'s nearby. The device\'s "role" changes by context.', val:'Phone (car) → Samsung Family Hub (kitchen)', impact:'Voice waveform and food cards on the phone in the car. 96 px step-by-step recipe on the fridge display. Hands-free voice navigation. Same task, entirely different interface.' },
  { badge:'08', name:'Feasibility Token', def:'What is actually possible right now — physical, temporal, resource constraints. Not "what\'s ideal" but "what the world allows." This is the new 8th token.', val:'Fridge: only frozen broccoli. Salmon and fries — out. But TaskRabbit can deliver both from Trader Joe\'s in 20 min for ~$15.', impact:'Instead of showing only broccoli recipes, the system orders what\'s missing — timed to arrive before you get home. Gradient feasibility: don\'t remove the recipe, deliver what it needs. $15 home-cooked vs $28 Uber Eats.' }
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
document.getElementById('tmClose').addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
