/* ═══════════════════════════════════════════════════════════
   interactions.js  —  P3 Micro-interactions
   ═══════════════════════════════════════════════════════════ */

/* ═══ WAVEFORM STAGGER ═══ */
document.querySelectorAll('.pv-waveform span').forEach((bar, i) => {
  bar.style.animationDelay = (i * 0.12) + 's';
});

/* ═══ REMOTE + TV INTERACTION ═══ */
const shoes = [
  { id: 'A', name: 'Nike Revolution 7', conf: '94% match — smooth lining confirmed', price: '$52' },
  { id: 'B', name: 'Adidas Terrex K',   conf: '88% match — synthetic lining confirmed', price: '$65' },
  { id: 'C', name: 'Merrell Moab Speed', conf: '71% — review data limited', price: '$48' }
];

let focusIndex = 1; // start on B (middle)

const tvShoes = [
  document.getElementById('tvShoeA'),
  document.getElementById('tvShoeB'),
  document.getElementById('tvShoeC')
];
const remoteItemName  = document.getElementById('remoteItemName');
const remoteItemConf  = document.getElementById('remoteItemConf');
const remoteItemPrice = document.getElementById('remoteItemPrice');

function updateFocus() {
  if (!tvShoes[0]) return;
  tvShoes.forEach((el, i) => {
    if (el) el.classList.toggle('tv-shoe--focus', i === focusIndex);
  });
  const shoe = shoes[focusIndex];
  if (remoteItemName)  remoteItemName.textContent  = shoe.name;
  if (remoteItemConf)  remoteItemConf.innerHTML     = '<span class="conf-dot ' + (shoe.id === 'C' ? 'conf-dot--mid' : 'conf-dot--high') + '"></span> ' + shoe.conf;
  if (remoteItemPrice) remoteItemPrice.textContent = shoe.price;
}

// remote button handlers
const remoteLeft  = document.getElementById('remoteLeft');
const remoteRight = document.getElementById('remoteRight');
const remoteOk    = document.getElementById('remoteOk');
const remoteBuy   = document.getElementById('remoteBuy');

if (remoteLeft) {
  remoteLeft.addEventListener('click', () => {
    focusIndex = Math.max(0, focusIndex - 1);
    updateFocus();
  });
}
if (remoteRight) {
  remoteRight.addEventListener('click', () => {
    focusIndex = Math.min(shoes.length - 1, focusIndex + 1);
    updateFocus();
  });
}
if (remoteOk) {
  remoteOk.addEventListener('click', () => {
    if (remoteBuy) {
      remoteBuy.textContent = 'Buy — ' + shoes[focusIndex].price;
      remoteBuy.style.background = '#16a34a';
    }
  });
}
if (remoteBuy) {
  remoteBuy.addEventListener('click', () => {
    remoteBuy.textContent = 'Purchased ✓';
    remoteBuy.style.background = '#16a34a';
    remoteBuy.disabled = true;
  });
}

// Keyboard navigation for remote
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  { focusIndex = Math.max(0, focusIndex - 1); updateFocus(); }
  if (e.key === 'ArrowRight') { focusIndex = Math.min(shoes.length - 1, focusIndex + 1); updateFocus(); }
});
