/* ═══════════════════════════════════════════════════════════
   tokens.js  —  P3 Token Card Modal Interaction
   ═══════════════════════════════════════════════════════════ */

const tokenModalData = [
  {
    badge: '01', name: 'Intent',
    def: 'What the user needs to accomplish right now. Not just functional — includes emotional and social goals.',
    val: 'Explore → Decide',
    impact: 'At the station, the system is a research assistant — finding, filtering, verifying. In the living room, it becomes a family facilitator — splitting information between TV and phone to protect the social dynamics of choosing together.'
  },
  {
    badge: '02', name: 'Physical State',
    def: 'What the body can physically do. Hand availability, movement state, sensory constraints.',
    val: 'Both hands → One hand → Both hands',
    impact: 'Station: full browse with both hands. Train: cards enlarge, interaction zone drops to thumb reach (bottom 40%), touch targets expand to 56px. Living room: remote control with both hands on phone — a completely different interaction model.'
  },
  {
    badge: '03', name: 'Cognitive Load',
    def: 'Available mental bandwidth. Decision-making capacity, information processing ability.',
    val: 'Moderate → Family mode',
    impact: 'Not depleted like the dinner scenario. But the living room shifts to family cognitive mode — less analytical, more social and emotional. The UI responds by showing emotional labels on TV ("Waterproof! Fast!") instead of specs.'
  },
  {
    badge: '04', name: 'Social Exposure',
    def: 'Who can see the screen. Has the power to reshape the entire information architecture.',
    val: 'Private → Public → Family',
    impact: 'The most transformative token in this scenario. FAMILY mode triggers a complete information architecture split: TV shows what the child should see (shoes with emotional labels, no price). Phone shows what only the parent should see (price, confidence signals, Buy button). This protects the Social Job.'
  },
  {
    badge: '05', name: 'Priority Weight',
    def: 'When multiple values conflict, which one wins. The basis for "why did AI choose this?"',
    val: 'Child preference > Brand > Price',
    impact: 'Priority order stays constant across all phases. But the UI enforces it structurally — by hiding price from the TV, the system ensures the child\'s emotional preference comes first, without the distorting influence of cost.'
  },
  {
    badge: '06', name: 'Synchro Rate',
    def: 'How much autonomy the AI gets. Changes through trust accumulation over time.',
    val: 'Delegate search → Own purchase',
    impact: 'AI autonomously handles: translating "not fluffy," searching 3 sites, cross-referencing sizes, verifying stock. Human retains: which shoe to buy, whether to include the 71% confidence candidate, and final purchase approval (remote → OK → Buy tap).'
  },
  {
    badge: '07', name: 'Form Factor',
    def: 'What device is available right now, and what\'s nearby.',
    val: 'Phone only → Phone + TV',
    impact: 'The most dramatic form factor transformation in the entire portfolio. When TV enters the scene, the phone doesn\'t just share content — it completely transforms. Product images are purged. A remote appears. The phone stops being a display and becomes a controller.'
  },
  {
    badge: '08', name: 'Feasibility',
    def: 'What is actually possible right now — physical, temporal, resource constraints.',
    val: 'In-stock · Size verified · Delivery before weekend',
    impact: 'Unlike last time (wrong size, out of stock surprise), every candidate passes three feasibility checks: real-time inventory, cross-brand size verification, and delivery window confirmation. Infeasible candidates never enter the pipeline.'
  }
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
