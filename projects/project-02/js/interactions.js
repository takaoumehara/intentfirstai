/* ═══════════════════════════════════════════════════════════
   interactions.js  —  P2 Micro-interactions
   ═══════════════════════════════════════════════════════════ */

/* ═══ CAR WAVEFORM STAGGER ═══ */
document.querySelectorAll('.car-waveform span').forEach((bar, i) => {
  bar.style.animationDelay = (i * 0.12) + 's';
});

/* ═══ KITCHEN STEP NAVIGATION ═══ */
const kitchenSteps = [
  { num: 'Step 1 of 6', title: 'Mix the glaze', detail: 'Honey + soy sauce + minced garlic in a small bowl. Stir until combined.', next: 'Next: Season the salmon', img: 'image-set02/Jpg/P2_11_Marine.jpg', imgAlt: 'Mixing honey-garlic glaze in a glass bowl' },
  { num: 'Step 2 of 6', title: 'Season the salmon', detail: 'Pat fillets dry. Brush glaze generously on both sides.', next: 'Next: Load Basket 1', img: 'image-set02/Jpg/P2_05_Honey-Garlic_Salmon+CrispyFries.jpg', imgAlt: 'Glazed salmon fillets ready to cook' },
  { num: 'Step 3 of 6', title: 'Load Basket 1', detail: 'Place salmon + broccoli florets in Basket 1. Spray with oil.', next: 'Next: Fries arrived!', img: 'image-set02/Jpg/P2_09_NinjaAirFryer.jpg', imgAlt: 'Ninja Air Fryer with salmon and broccoli in Basket 1' },
  { num: 'Step 4 of 6', title: 'Fries arrived! Load Basket 2', detail: 'TaskRabbit delivery is here! Spread frozen fries in Basket 2.', next: 'Next: Air fry', img: 'image-set02/Jpg/P2_12_FryArrived.jpg', imgAlt: 'Frozen fries arrived — loading into Basket 2' },
  { num: 'Step 5 of 6', title: 'Air fry', detail: '400°F. Zone 1: 12 min (salmon). Zone 2: 15 min (fries). Ninja syncs finish time.', next: 'Next: Plate & serve', img: 'image-set02/Jpg/P2_09_NinjaAirFryer.jpg', imgAlt: 'Ninja Air Fryer dual baskets cooking simultaneously' },
  { num: 'Step 6 of 6', title: 'Plate & serve', detail: 'Squeeze lemon if you have it. Kids\' favorite dinner — done.', next: 'Done — Dad of the year.', img: 'image-set02/Jpg/P2_05_Honey-Garlic_Salmon+CrispyFries.jpg', imgAlt: 'Honey-garlic salmon with crispy fries — plated and ready' }
];

let currentStep = 0;

const ksStepNum = document.getElementById('ksStepNum');
const ksStepText = document.getElementById('ksStepText');
const ksStepDetail = document.getElementById('ksStepDetail');
const ksNextLabel = document.getElementById('ksNextLabel');
const ksDots = document.getElementById('ksDots');
const ksPrev = document.getElementById('ksPrev');
const ksNext = document.getElementById('ksNext');

const ksDishImg = document.getElementById('ksDishImg');

function updateKitchenStep() {
  if (!ksStepNum) return;
  const step = kitchenSteps[currentStep];
  ksStepNum.textContent = step.num;
  ksStepText.textContent = step.title;
  ksStepDetail.textContent = step.detail;
  ksNextLabel.textContent = step.next;

  // Update dish image per step
  if (ksDishImg && step.img) {
    ksDishImg.style.opacity = '0';
    setTimeout(() => {
      ksDishImg.src = step.img;
      ksDishImg.alt = step.imgAlt;
      ksDishImg.style.opacity = '1';
    }, 200);
  }

  // Update dots
  if (ksDots) {
    const dots = ksDots.querySelectorAll('.ks-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('ks-dot--on', i <= currentStep);
    });
  }

  // Update buttons
  if (ksPrev) ksPrev.disabled = currentStep === 0;
  if (ksNext) {
    ksNext.textContent = currentStep === kitchenSteps.length - 1 ? 'Done ✓' : 'Next →';
    ksNext.disabled = currentStep === kitchenSteps.length - 1;
  }
}

if (ksNext) {
  ksNext.addEventListener('click', () => {
    if (currentStep < kitchenSteps.length - 1) {
      currentStep++;
      updateKitchenStep();
    }
  });
}

if (ksPrev) {
  ksPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateKitchenStep();
    }
  });
}
