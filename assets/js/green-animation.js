/* ═══════════════════════════════════════════════════════════════
   Green Animation — Component Framework
   Slug: green-simple-bold-animation-interaction

   Usage:
     <link rel="stylesheet" href="/assets/css/green-animation.css">
     <div data-ga="pipeline" data-feedback="true" data-random="true"></div>
     <div data-ga="tokens"></div>
     <div data-ga="brain"></div>
     <div data-ga="rule-engine" data-random="true"></div>
     <div data-ga="intent"></div>
     <script src="/assets/js/green-animation.js" defer></script>

   On DOMContentLoaded, every [data-ga] placeholder is hydrated
   with an inline SVG, scoped under `.ga` for theming.
   ═══════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const GA = {};

  /* ─── SVG component definitions ───
     Each function takes options and returns SVG markup.
     Options come from the placeholder's data-* attributes. */

  GA.components = {

    /* Full pipeline hero — 6 stages, 12s loop */
    pipeline(opts) {
      const feedback = opts.feedback !== 'false';   // default true
      const dials = opts.dials !== 'false';         // default true
      return `
<svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid meet"
     style="width: 100%; height: auto; max-height: 460px;"
     class="ga-svg" aria-label="Context Grammar pipeline">
  <line class="ga-s-soft" x1="100" y1="200" x2="1080" y2="200" stroke-dasharray="3 4"/>

  <!-- Human -->
  <g>
    <circle class="ga-s-main ga-stage-human" cx="80" cy="180" r="12" fill="var(--ga-bg)"/>
    <path class="ga-s-main" d="M 62,218 Q 80,200 98,218" fill="none"/>
    <text class="ga-lbl-stage ga-stage-label ga-ll-human" x="80" y="258" text-anchor="middle">Human</text>
  </g>

  <!-- Intent -->
  <g>
    <circle class="ga-f-accent ga-intent-core" cx="180" cy="200" r="8"/>
    <text class="ga-lbl-stage ga-stage-label ga-ll-intent" x="180" y="258" text-anchor="middle">Intent</text>
  </g>

  <!-- Tokens (with optional dials) -->
  <g>
    <line class="ga-s-soft" x1="280" y1="200" x2="${dials ? 540 : 520}" y2="200"/>
    <line class="ga-s-main ga-tk ga-tk-1" x1="300" y1="175" x2="300" y2="225"/>
    <line class="ga-s-main ga-tk ga-tk-2" x1="330" y1="175" x2="330" y2="225"/>
    <line class="ga-s-main ga-tk ga-tk-3" x1="360" y1="175" x2="360" y2="225"/>
    <line class="ga-s-main ga-tk ga-tk-4" x1="390" y1="175" x2="390" y2="225"/>
    <line class="ga-s-main ga-tk ga-tk-5" x1="420" y1="175" x2="420" y2="225"/>
    <line class="ga-s-main ga-tk ga-tk-6" x1="450" y1="175" x2="450" y2="225"/>
    ${dials ? `
    <line class="ga-s-soft" x1="470" y1="185" x2="470" y2="215" stroke-dasharray="1 2"/>
    <g>
      <path class="ga-s-main" d="M 470,200 A 15 15 0 0 1 500,200"/>
      <line class="ga-s-main" x1="470" y1="200" x2="500" y2="200"/>
      <line class="ga-s-green ga-dial-needle ga-dial-autonomy" x1="485" y1="200" x2="485" y2="188" stroke-width="2"/>
      <circle class="ga-f-accent" cx="485" cy="200" r="2"/>
      <text class="ga-lbl-mono" x="485" y="232" text-anchor="middle" style="font-size: 8px">Autonomy</text>
    </g>
    <g>
      <path class="ga-s-main" d="M 500,200 A 15 15 0 0 1 530,200"/>
      <line class="ga-s-main" x1="500" y1="200" x2="530" y2="200"/>
      <line class="ga-s-green ga-dial-needle ga-dial-disclosure" x1="515" y1="200" x2="515" y2="188" stroke-width="2"/>
      <circle class="ga-f-accent" cx="515" cy="200" r="2"/>
      <text class="ga-lbl-mono" x="515" y="244" text-anchor="middle" style="font-size: 8px">Disclosure</text>
    </g>
    ` : `
    <line class="ga-s-main ga-tk ga-tk-7" x1="485" y1="165" x2="485" y2="235"/>
    <line class="ga-s-main ga-tk ga-tk-8" x1="510" y1="165" x2="510" y2="235"/>
    `}
    <text class="ga-lbl-stage ga-stage-label ga-ll-tokens" x="400" y="258" text-anchor="middle">8 Context Tokens${dials ? ' · 6 + 2 Dials' : ''}</text>
  </g>

  <!-- Brain -->
  <g>
    <rect class="ga-s-main ga-bl ga-bl-1" x="620" y="165" width="100" height="16" rx="8" fill="var(--ga-bg)"/>
    <rect class="ga-s-main ga-bl ga-bl-2" x="620" y="190" width="100" height="16" rx="8" fill="var(--ga-bg)"/>
    <rect class="ga-s-main ga-bl ga-bl-3" x="620" y="215" width="100" height="16" rx="8" fill="var(--ga-bg)"/>
    <line class="ga-s-soft" x1="670" y1="150" x2="670" y2="165" stroke-dasharray="2 2"/>
    <text class="ga-lbl-stage ga-stage-label ga-ll-brain" x="670" y="258" text-anchor="middle">3-Layer Brain</text>
  </g>

  <!-- Rule Engine -->
  <g>
    <polygon class="ga-s-main ga-rhombus" points="860,160 910,200 860,240 810,200" fill="var(--ga-bg)"/>
    <text class="ga-lbl-stage ga-stage-label ga-ll-rules" x="860" y="258" text-anchor="middle">Rule Engine</text>
  </g>

  <!-- Output: gray "ghost" base lines (always visible) + green overlay lines (draw progressively) -->
  <g>
    <line class="ga-out-base" x1="910" y1="200" x2="1050" y2="140"/>
    <line class="ga-out-base" x1="910" y1="200" x2="1050" y2="200"/>
    <line class="ga-out-base" x1="910" y1="200" x2="1050" y2="260"/>
    <line class="ga-out-path ga-op-1" x1="910" y1="200" x2="1050" y2="140" pathLength="1"/>
    <line class="ga-out-path ga-op-2" x1="910" y1="200" x2="1050" y2="200" pathLength="1"/>
    <line class="ga-out-path ga-op-3" x1="910" y1="200" x2="1050" y2="260" pathLength="1"/>
    <circle class="ga-out-end ga-oe-1" cx="1055" cy="140" r="8"/>
    <circle class="ga-out-end ga-oe-2" cx="1055" cy="200" r="8"/>
    <circle class="ga-out-end ga-oe-3" cx="1055" cy="260" r="8"/>
    <text class="ga-lbl-stage" x="1080" y="144" style="font-size: 10px">Delegate</text>
    <text class="ga-lbl-stage" x="1080" y="204" style="font-size: 10px">Escalate</text>
    <text class="ga-lbl-stage" x="1080" y="264" style="font-size: 10px">Adapt</text>
    <text class="ga-lbl-stage ga-stage-label ga-ll-output" x="1055" y="305" text-anchor="middle">AX Patterns</text>
  </g>

  ${feedback ? `
  <path class="ga-feedback-path" d="M 1055,262 C 1055,310 400,310 670,216"/>
  <circle class="ga-feedback-dot" r="3.5"/>
  <text class="ga-lbl-mono" x="800" y="298" text-anchor="middle" style="font-size: 9px; fill: var(--ga-green);">Learning · outcomes update Brain L2</text>
  ` : ''}

  <g class="ga-traveler" style="--ga-target-y: -60px;">
    <circle class="ga-f-accent" cx="80" cy="200" r="5"/>
    <circle class="ga-s-green" cx="80" cy="200" r="9" opacity="0.3"/>
  </g>
</svg>`;
    },

    /* Tokens standalone — 6 situation ticks + 2 relationship dials.
       Two precise sub-labels mark the 6 + 2 split. */
    tokens(opts) {
      return `
<svg viewBox="0 0 360 220" width="360" height="220" class="ga-svg" aria-label="8 Context Tokens — 6 Situation + 2 Dials">
  <!-- 6 situation tokens -->
  <line class="ga-s-main ga-tk ga-tk-1" x1="50"  y1="80" x2="50"  y2="140"/>
  <line class="ga-s-main ga-tk ga-tk-2" x1="86"  y1="80" x2="86"  y2="140"/>
  <line class="ga-s-main ga-tk ga-tk-3" x1="122" y1="80" x2="122" y2="140"/>
  <line class="ga-s-main ga-tk ga-tk-4" x1="158" y1="80" x2="158" y2="140"/>
  <line class="ga-s-main ga-tk ga-tk-5" x1="194" y1="80" x2="194" y2="140"/>
  <line class="ga-s-main ga-tk ga-tk-6" x1="230" y1="80" x2="230" y2="140"/>

  <!-- 2 dials (with spatial gap from ticks to mark the 6+2 split) -->
  <path class="ga-s-main" d="M 268,110 A 16 16 0 0 1 300,110"/>
  <line class="ga-s-main" x1="268" y1="110" x2="300" y2="110"/>
  <line class="ga-s-green ga-dial-needle ga-dial-autonomy" x1="284" y1="110" x2="284" y2="96" stroke-width="2"/>

  <path class="ga-s-main" d="M 308,110 A 16 16 0 0 1 340,110"/>
  <line class="ga-s-main" x1="308" y1="110" x2="340" y2="110"/>
  <line class="ga-s-green ga-dial-needle ga-dial-disclosure" x1="324" y1="110" x2="324" y2="96" stroke-width="2"/>

  <!-- Sub-labels for the 6 + 2 split -->
  <text class="ga-lbl-mono" x="140" y="170" text-anchor="middle">6 Situation</text>
  <text class="ga-lbl-mono" x="304" y="170" text-anchor="middle">2 Dials</text>
</svg>`;
    },

    /* Brain standalone — 3 flat pills stacked vertically, matching
       _tower-explorations.html "STACK" cell aesthetic. */
    brain(opts) {
      return `
<svg viewBox="0 0 360 240" width="360" height="240" class="ga-svg ga-brain-svg" aria-label="3-Layer Brain — Identity, Accumulated Learning, Right Now">
  <!-- Layer 3 · Right Now (top) -->
  <rect class="ga-s-main ga-bl ga-bl-3" x="60" y="60"  width="240" height="32" rx="16" fill="var(--ga-bg)"/>
  <text class="ga-bl-lbl" x="180" y="80.5" text-anchor="middle">RIGHT NOW</text>

  <!-- Layer 2 · Accumulated Learning (middle) -->
  <rect class="ga-s-main ga-bl ga-bl-2" x="60" y="104" width="240" height="32" rx="16" fill="var(--ga-bg)"/>
  <text class="ga-bl-lbl" x="180" y="124.5" text-anchor="middle">ACCUMULATED LEARNING</text>

  <!-- Layer 1 · Identity (bottom) -->
  <rect class="ga-s-main ga-bl ga-bl-1" x="60" y="148" width="240" height="32" rx="16" fill="var(--ga-bg)"/>
  <text class="ga-bl-lbl" x="180" y="168.5" text-anchor="middle">IDENTITY</text>

  <!-- Information flow — green dots travel between layers (bidirectional) -->
  <g class="ga-bl-flow ga-bl-flow-up">
    <circle class="ga-bl-dot" cx="150" cy="76" r="3.5"/>
  </g>
  <g class="ga-bl-flow ga-bl-flow-down">
    <circle class="ga-bl-dot" cx="210" cy="76" r="3.5"/>
  </g>
</svg>`;
    },

    /* Brain Architecture — Project Atlas 4-Brain hierarchy.
       Project Brain (top, 3 inner layers visible) →
       3 specialist brains row (Brand · Research · Living Meeting) →
       Org Brain (wide foundation pill).
       All geometry uses ga-s-main (full ink, 1.5px). Green is reserved
       for the single moving accent. Animation flow: Org Brain pulses up
       to specialists → specialists feed into Project Brain → 3 inner
       layers cycle (Now → Learning → Identity) → graduation pulse exits
       right toward archive endpoint. */
    'brain-architecture'(opts) {
      // Five Brain Diagram — supports `highlight` opt:
      //   "org" | "brand" | "brand-b2c" | "brand-b2b" | "research" | "pmb" | "project"
      // The highlighted brain gets a persistent green state (overrides the cycle).
      const hl = (opts && opts.highlight) ? String(opts.highlight).toLowerCase() : '';
      const stageClass = hl ? ` ga-ba--here-${hl}` : '';

      // Helper: one Project Brain box (x=brain left edge, inner stripes, no text)
      const projBrain = (x) => {
        const ix = x + 8, iw = 84;
        return `
  <rect class="ga-s-main ga-ba-projcard" x="${x}" y="16" width="100" height="54" rx="8" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-3" x="${ix}" y="24" width="${iw}" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-2" x="${ix}" y="38" width="${iw}" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-1" x="${ix}" y="52" width="${iw}" height="11" rx="5" fill="var(--ga-bg)"/>`;
      };

      return `
<svg viewBox="0 0 620 268" width="620" class="ga-svg ga-brain-arch${stageClass}" aria-label="Five Brain Diagram — Enterprise Context Brain hierarchy">

  <!-- ───── Tier labels (left rail) ───── -->
  <text class="ga-lbl-mono ga-ba-tierlabel" x="56" y="46" text-anchor="end">TIER 4</text>
  <text class="ga-lbl-mono ga-ba-tierlabel" x="56" y="120" text-anchor="end">TIER 3</text>
  <text class="ga-lbl-mono ga-ba-tierlabel" x="56" y="180" text-anchor="end">TIER 2</text>
  <text class="ga-lbl-mono ga-ba-tierlabel" x="56" y="244" text-anchor="end">TIER 1</text>
  <line x1="60" y1="12" x2="60" y2="260" stroke="var(--ga-ink-3)" stroke-width="0.5" stroke-dasharray="2 3"/>

  <!-- ───── TIER 4 · 4 Project Brains (3 unlabelled layer stripes each) ───── -->
  ${projBrain(68)}${projBrain(196)}${projBrain(324)}${projBrain(452)}

  <!-- Graduation arrow: rightmost brain → archive -->
  <line class="ga-s-main ga-ba-grad" x1="552" y1="43" x2="582" y2="43"/>
  <polyline class="ga-s-main ga-ba-grad" points="574,38 584,43 574,48" fill="none"/>
  <circle class="ga-s-main ga-ba-archive" cx="596" cy="43" r="5" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-ba-archlabel" x="596" y="62" text-anchor="middle">ARCHIVE</text>
  <circle class="ga-f-accent ga-ba-gradpulse" cx="552" cy="43" r="3"/>

  <!-- ───── Comb: 4 Project Brains → PMB ───── -->
  <!-- stubs down from each brain bottom -->
  <line class="ga-s-main ga-ba-pmb-up" x1="118" y1="70" x2="118" y2="86"/>
  <line class="ga-s-main ga-ba-pmb-up" x1="246" y1="70" x2="246" y2="86"/>
  <line class="ga-s-main ga-ba-pmb-up" x1="374" y1="70" x2="374" y2="86"/>
  <line class="ga-s-main ga-ba-pmb-up" x1="502" y1="70" x2="502" y2="86"/>
  <!-- horizontal crossbar + drop to PMB -->
  <line class="ga-s-main ga-ba-pmb-up" x1="118" y1="86" x2="502" y2="86"/>
  <line class="ga-s-main ga-ba-pmb-up" x1="310" y1="86" x2="310" y2="100"/>
  <circle class="ga-f-accent ga-ba-pmb-up-pulse" r="3" cx="310" cy="86"/>

  <!-- ───── TIER 3 · PROJECT MASTER BRAIN ───── -->
  <rect class="ga-s-main ga-ba-pmb" x="68" y="100" width="484" height="30" rx="15" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-ba-pmblabel" x="310" y="120" text-anchor="middle">PROJECT MASTER BRAIN</text>

  <!-- ───── Comb: PMB → 3 Spec brains ───── -->
  <line class="ga-s-main ga-ba-up-2" x1="310" y1="130" x2="310" y2="144"/>
  <line class="ga-s-main ga-ba-up-2" x1="141" y1="144" x2="479" y2="144"/>
  <line class="ga-s-main ga-ba-up-1" x1="141" y1="144" x2="141" y2="158"/>
  <line class="ga-s-main ga-ba-up-2" x1="310" y1="144" x2="310" y2="158"/>
  <line class="ga-s-main ga-ba-up-3" x1="479" y1="144" x2="479" y2="158"/>

  <!-- Pulse dots Spec → PMB -->
  <circle class="ga-f-accent ga-ba-flow ga-ba-flow-1" r="3" cx="141" cy="158"/>
  <circle class="ga-f-accent ga-ba-flow ga-ba-flow-2" r="3" cx="310" cy="158"/>
  <circle class="ga-f-accent ga-ba-flow ga-ba-flow-3" r="3" cx="479" cy="158"/>

  <!-- ───── TIER 2 · Brand B2C · Brand B2B · Research ───── -->
  <rect class="ga-s-main ga-ba-spec ga-ba-spec-1" x="68"  y="158" width="146" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-ba-speclabel"        x="141" y="180" text-anchor="middle">BRAND · B2C</text>

  <rect class="ga-s-main ga-ba-spec ga-ba-spec-2" x="237" y="158" width="146" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-ba-speclabel"        x="310" y="180" text-anchor="middle">BRAND · B2B</text>

  <rect class="ga-s-main ga-ba-spec ga-ba-spec-3" x="406" y="158" width="146" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-ba-speclabel"        x="479" y="180" text-anchor="middle">RESEARCH</text>

  <!-- ───── Comb: 3 Spec brains → Org Brain ───── -->
  <line class="ga-s-main ga-ba-base-1" x1="141" y1="192" x2="141" y2="208"/>
  <line class="ga-s-main ga-ba-base-2" x1="310" y1="192" x2="310" y2="208"/>
  <line class="ga-s-main ga-ba-base-3" x1="479" y1="192" x2="479" y2="208"/>
  <line class="ga-s-main ga-ba-base-2" x1="141" y1="208" x2="479" y2="208"/>
  <line class="ga-s-main ga-ba-base-2" x1="310" y1="208" x2="310" y2="222"/>

  <!-- Pulse dots Org → Specs -->
  <circle class="ga-f-accent ga-ba-base-pulse ga-ba-base-pulse-1" r="3" cx="141" cy="222"/>
  <circle class="ga-f-accent ga-ba-base-pulse ga-ba-base-pulse-2" r="3" cx="310" cy="222"/>
  <circle class="ga-f-accent ga-ba-base-pulse ga-ba-base-pulse-3" r="3" cx="479" cy="222"/>

  <!-- ───── TIER 1 · ORG BRAIN ───── -->
  <rect class="ga-s-main ga-ba-org" x="68" y="222" width="484" height="36" rx="18" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-ba-orglabel" x="310" y="245" text-anchor="middle">ORG BRAIN</text>
</svg>`;
    },

    'home-five-brains'(opts) {
      // Five Home Brains Diagram — P1 analog of P4's brain-architecture.
      // Supports `highlight` opt:
      //   "household" | "person" | "domain" | "coordinator" | "event"
      // The highlighted brain(s) get a persistent green state.
      const hl = (opts && opts.highlight) ? String(opts.highlight).toLowerCase() : '';
      const stageClass = hl ? ` ga-hb--here-${hl}` : '';

      // Helper: one Event Brain box with 3-layer stripes (born/learns/dies)
      const eventBrain = (x, label) => {
        const ix = x + 8, iw = 84;
        return `
  <rect class="ga-s-main ga-hb-eventcard" x="${x}" y="16" width="100" height="54" rx="8" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-3" x="${ix}" y="24" width="${iw}" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-2" x="${ix}" y="38" width="${iw}" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-1" x="${ix}" y="52" width="${iw}" height="11" rx="5" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-hb-eventlabel" x="${x + 50}" y="82" text-anchor="middle">${label}</text>`;
      };

      // Helper: one small brain pill (Person or Domain)
      // x=center-x, y=top, label, kind=person|domain, idx (1..5)
      const smallPill = (cx, y, label, kind, idx) => {
        const w = 86, h = 24, x = cx - w / 2;
        return `
  <rect class="ga-s-main ga-hb-${kind} ga-hb-${kind}-${idx}" x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-hb-${kind}label" x="${cx}" y="${y + 16}" text-anchor="middle">${label}</text>`;
      };

      return `
<svg viewBox="0 0 620 360" width="620" class="ga-svg ga-home-brains${stageClass}" aria-label="Five Home Brains Diagram — Household / Person×5 / Domain×N / Coordinator / Event">

  <!-- ───── Tier labels (left rail) ───── -->
  <text class="ga-lbl-mono ga-hb-tierlabel" x="56" y="46"  text-anchor="end">TIER 5</text>
  <text class="ga-lbl-mono ga-hb-tierlabel" x="56" y="120" text-anchor="end">TIER 4</text>
  <text class="ga-lbl-mono ga-hb-tierlabel" x="56" y="170" text-anchor="end">TIER 3</text>
  <text class="ga-lbl-mono ga-hb-tierlabel" x="56" y="222" text-anchor="end">TIER 2</text>
  <text class="ga-lbl-mono ga-hb-tierlabel" x="56" y="338" text-anchor="end">TIER 1</text>
  <line x1="60" y1="12" x2="60" y2="354" stroke="var(--ga-ink-3)" stroke-width="0.5" stroke-dasharray="2 3"/>

  <!-- ───── TIER 5 · Event Brains × 4 (Trip / School Year / Birthday / Move) ───── -->
  ${eventBrain(68,  'TRIP')}
  ${eventBrain(196, 'SCHOOL YR')}
  ${eventBrain(324, 'BIRTHDAY')}
  ${eventBrain(452, 'MOVE')}

  <!-- Graduation arrow rightmost Event → Archive -->
  <line class="ga-s-main ga-hb-grad" x1="552" y1="43" x2="582" y2="43"/>
  <polyline class="ga-s-main ga-hb-grad" points="574,38 584,43 574,48" fill="none"/>
  <circle class="ga-s-main ga-hb-archive" cx="596" cy="43" r="5" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-hb-archlabel" x="596" y="62" text-anchor="middle">ARCHIVE</text>
  <circle class="ga-f-accent ga-hb-gradpulse" cx="552" cy="43" r="3"/>

  <!-- ───── Comb: 4 Event Brains → Coordinator ───── -->
  <line class="ga-s-main ga-hb-coord-up" x1="118" y1="86" x2="118" y2="100"/>
  <line class="ga-s-main ga-hb-coord-up" x1="246" y1="86" x2="246" y2="100"/>
  <line class="ga-s-main ga-hb-coord-up" x1="374" y1="86" x2="374" y2="100"/>
  <line class="ga-s-main ga-hb-coord-up" x1="502" y1="86" x2="502" y2="100"/>
  <line class="ga-s-main ga-hb-coord-up" x1="118" y1="100" x2="502" y2="100"/>
  <line class="ga-s-main ga-hb-coord-up" x1="310" y1="100" x2="310" y2="114"/>
  <circle class="ga-f-accent ga-hb-coord-up-pulse" r="3" cx="310" cy="100"/>

  <!-- ───── TIER 4 · HOUSEHOLD COORDINATOR ───── -->
  <rect class="ga-s-main ga-hb-coord" x="68" y="114" width="484" height="30" rx="15" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-hb-coordlabel" x="310" y="134" text-anchor="middle">HOUSEHOLD COORDINATOR</text>

  <!-- Comb: Coordinator → Domain row + Person row -->
  <line class="ga-s-main ga-hb-down" x1="310" y1="144" x2="310" y2="158"/>

  <!-- ───── TIER 3 · Domain Brain × 5 (Finance / Education / Health / Calendar / Home) ───── -->
  ${smallPill(116, 158, 'FINANCE',   'domain', 1)}
  ${smallPill(213, 158, 'EDUCATION', 'domain', 2)}
  ${smallPill(310, 158, 'HEALTH',    'domain', 3)}
  ${smallPill(407, 158, 'CALENDAR',  'domain', 4)}
  ${smallPill(504, 158, 'HOME',      'domain', 5)}

  <!-- ───── Comb: Domains → Persons ───── -->
  <line class="ga-s-main ga-hb-tier-link" x1="310" y1="182" x2="310" y2="208"/>
  <circle class="ga-f-accent ga-hb-tier-pulse" r="2.5" cx="310" cy="208"/>

  <!-- ───── TIER 2 · Person Brain × 5 (Mai / Kiran / Aoi / Sota / Leo) ───── -->
  ${smallPill(116, 210, 'MAI',   'person', 1)}
  ${smallPill(213, 210, 'KIRAN', 'person', 2)}
  ${smallPill(310, 210, 'AOI',   'person', 3)}
  ${smallPill(407, 210, 'SOTA',  'person', 4)}
  ${smallPill(504, 210, 'LEO',   'person', 5)}

  <!-- ───── Comb: Person row → Household Brain ───── -->
  <line class="ga-s-main ga-hb-base" x1="116" y1="234" x2="116" y2="280"/>
  <line class="ga-s-main ga-hb-base" x1="213" y1="234" x2="213" y2="280"/>
  <line class="ga-s-main ga-hb-base" x1="310" y1="234" x2="310" y2="280"/>
  <line class="ga-s-main ga-hb-base" x1="407" y1="234" x2="407" y2="280"/>
  <line class="ga-s-main ga-hb-base" x1="504" y1="234" x2="504" y2="280"/>
  <line class="ga-s-main ga-hb-base" x1="116" y1="280" x2="504" y2="280"/>
  <line class="ga-s-main ga-hb-base" x1="310" y1="280" x2="310" y2="298"/>

  <!-- Pulse dots Household → Persons -->
  <circle class="ga-f-accent ga-hb-base-pulse ga-hb-base-pulse-1" r="3" cx="116" cy="298"/>
  <circle class="ga-f-accent ga-hb-base-pulse ga-hb-base-pulse-2" r="3" cx="213" cy="298"/>
  <circle class="ga-f-accent ga-hb-base-pulse ga-hb-base-pulse-3" r="3" cx="310" cy="298"/>
  <circle class="ga-f-accent ga-hb-base-pulse ga-hb-base-pulse-4" r="3" cx="407" cy="298"/>
  <circle class="ga-f-accent ga-hb-base-pulse ga-hb-base-pulse-5" r="3" cx="504" cy="298"/>

  <!-- ───── TIER 1 · HOUSEHOLD BRAIN ───── -->
  <rect class="ga-s-main ga-hb-household" x="68" y="298" width="484" height="36" rx="18" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono ga-hb-householdlabel" x="310" y="321" text-anchor="middle">HOUSEHOLD BRAIN</text>
</svg>`;
    },

    'home-brain-agent-flow'(opts) {
      // Brain ↔ Coordinator ↔ Agent flow — 3-column lateral process diagram.
      // Left column: 5 Brains (memory). Center: 1 Coordinator. Right: 3 Agents (action).
      // Supports `highlight` opt: "brains" | "coordinator" | "agents"
      const hl = (opts && opts.highlight) ? String(opts.highlight).toLowerCase() : '';
      const stageClass = hl ? ` ga-baf--here-${hl}` : '';

      // Helper: Brain pill on the left
      const brainPill = (y, idx, label) => `
  <rect class="ga-s-main ga-baf-brain ga-baf-brain-${idx}" x="20" y="${y}" width="170" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-baf-brainlabel" x="105" y="${y + 22}" text-anchor="middle">${label}</text>`;

      // Helper: Agent pill on the right
      const agentPill = (y, idx, label) => `
  <rect class="ga-s-main ga-baf-agent ga-baf-agent-${idx}" x="560" y="${y}" width="200" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-baf-agentlabel" x="660" y="${y + 22}" text-anchor="middle">${label}</text>`;

      return `
<svg viewBox="0 0 780 400" width="780" class="ga-svg ga-brain-agent-flow${stageClass}" aria-label="Brain ↔ Coordinator ↔ Agent flow — Sota's shoes scenario">

  <!-- ───── Column headers ───── -->
  <text class="ga-baf-colhead ga-baf-colhead-brain" x="105" y="22" text-anchor="middle">5 BRAINS · 記憶</text>
  <text class="ga-baf-colhead ga-baf-colhead-coord" x="390" y="22" text-anchor="middle">1 COORDINATOR · 司令塔</text>
  <text class="ga-baf-colhead ga-baf-colhead-agent" x="660" y="22" text-anchor="middle">3 AGENTS · 行動者</text>

  <!-- ───── LEFT · 5 Brain pills ───── -->
  ${brainPill(50,  1, 'Person Brain · Sota')}
  ${brainPill(98,  2, 'Finance Brain')}
  ${brainPill(146, 3, 'Education Brain')}
  ${brainPill(194, 4, 'Calendar Brain')}
  ${brainPill(242, 5, 'Household Brain')}

  <!-- ───── CENTER · Coordinator pill ───── -->
  <rect class="ga-s-main ga-baf-coord" x="300" y="135" width="180" height="60" rx="30" fill="var(--ga-bg)"/>
  <text class="ga-baf-coordlabel ga-baf-coordlabel-1" x="390" y="158" text-anchor="middle">Household</text>
  <text class="ga-baf-coordlabel ga-baf-coordlabel-2" x="390" y="178" text-anchor="middle">Coordinator</text>

  <!-- ───── RIGHT · 3 Agent pills ───── -->
  ${agentPill(98,  1, 'Voice Agent · 聞く')}
  ${agentPill(146, 2, 'Shopping Agent · 買う')}
  ${agentPill(194, 3, 'Notify Agent · 報せる')}

  <!-- ───── READ flow: Brains → Coordinator (animated curves) ───── -->
  <path class="ga-baf-read ga-baf-read-1" d="M 190 67  Q 245 90  300 145" fill="none"/>
  <path class="ga-baf-read ga-baf-read-2" d="M 190 115 Q 245 130 300 155" fill="none"/>
  <path class="ga-baf-read ga-baf-read-3" d="M 190 163 L 300 165" fill="none"/>
  <path class="ga-baf-read ga-baf-read-4" d="M 190 211 Q 245 200 300 175" fill="none"/>
  <path class="ga-baf-read ga-baf-read-5" d="M 190 259 Q 245 220 300 185" fill="none"/>

  <!-- Pulse dots travelling Brains → Coordinator -->
  <circle class="ga-baf-readpulse ga-baf-readpulse-1" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-2" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-3" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-4" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-5" r="3.5" fill="var(--ga-green)"/>

  <text class="ga-baf-flowlabel" x="245" y="85" text-anchor="middle">read</text>

  <!-- ───── COMMAND flow: Coordinator → Agents ───── -->
  <path class="ga-baf-cmd ga-baf-cmd-1" d="M 480 145 Q 520 120 560 115" fill="none"/>
  <path class="ga-baf-cmd ga-baf-cmd-2" d="M 480 165 L 560 163" fill="none"/>
  <path class="ga-baf-cmd ga-baf-cmd-3" d="M 480 185 Q 520 200 560 211" fill="none"/>

  <circle class="ga-baf-cmdpulse ga-baf-cmdpulse-1" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-cmdpulse ga-baf-cmdpulse-2" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-cmdpulse ga-baf-cmdpulse-3" r="3.5" fill="var(--ga-green)"/>

  <text class="ga-baf-flowlabel" x="520" y="138" text-anchor="middle">command</text>

  <!-- ───── WRITE-BACK flow: Agents → Brains (dashed curved loop at bottom) ───── -->
  <path class="ga-baf-writeback" d="M 660 230 Q 660 350 105 320 L 105 280" fill="none" stroke-dasharray="4 4"/>
  <circle class="ga-baf-writepulse" r="3" fill="var(--ga-ink-2)"/>

  <text class="ga-baf-flowlabel" x="380" y="358" text-anchor="middle">write back · 学んだことを記録</text>
</svg>`;
    },

    /* English-only variant — same layout, no Japanese. Used on P1 (English page). */
    'home-brain-agent-flow-en'(opts) {
      const hl = (opts && opts.highlight) ? String(opts.highlight).toLowerCase() : '';
      const stageClass = hl ? ` ga-baf--here-${hl}` : '';

      const brainPill = (y, idx, label) => `
  <rect class="ga-s-main ga-baf-brain ga-baf-brain-${idx}" x="20" y="${y}" width="170" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-baf-brainlabel" x="105" y="${y + 22}" text-anchor="middle">${label}</text>`;

      const agentPill = (y, idx, label) => `
  <rect class="ga-s-main ga-baf-agent ga-baf-agent-${idx}" x="560" y="${y}" width="200" height="34" rx="17" fill="var(--ga-bg)"/>
  <text class="ga-baf-agentlabel" x="660" y="${y + 22}" text-anchor="middle">${label}</text>`;

      return `
<svg viewBox="0 0 780 400" width="780" class="ga-svg ga-brain-agent-flow${stageClass}" aria-label="Brain ↔ Coordinator ↔ Agent flow — Sota's shoes scenario">

  <!-- ───── Column headers ───── -->
  <text class="ga-baf-colhead ga-baf-colhead-brain" x="105" y="22" text-anchor="middle">5 BRAINS · MEMORY</text>
  <text class="ga-baf-colhead ga-baf-colhead-coord" x="390" y="22" text-anchor="middle">1 COORDINATOR</text>
  <text class="ga-baf-colhead ga-baf-colhead-agent" x="660" y="22" text-anchor="middle">3 AGENTS · ACTION</text>

  <!-- ───── LEFT · 5 Brain pills ───── -->
  ${brainPill(50,  1, 'Person Brain · Sota')}
  ${brainPill(98,  2, 'Finance Brain')}
  ${brainPill(146, 3, 'Education Brain')}
  ${brainPill(194, 4, 'Calendar Brain')}
  ${brainPill(242, 5, 'Household Brain')}

  <!-- ───── CENTER · Coordinator pill ───── -->
  <rect class="ga-s-main ga-baf-coord" x="300" y="135" width="180" height="60" rx="30" fill="var(--ga-bg)"/>
  <text class="ga-baf-coordlabel ga-baf-coordlabel-1" x="390" y="158" text-anchor="middle">Household</text>
  <text class="ga-baf-coordlabel ga-baf-coordlabel-2" x="390" y="178" text-anchor="middle">Coordinator</text>

  <!-- ───── RIGHT · 3 Agent pills ───── -->
  ${agentPill(98,  1, 'Voice Agent')}
  ${agentPill(146, 2, 'Shopping Agent')}
  ${agentPill(194, 3, 'Notify Agent')}

  <!-- ───── READ flow: Brains → Coordinator (animated curves) ───── -->
  <path class="ga-baf-read ga-baf-read-1" d="M 190 67  Q 245 90  300 145" fill="none"/>
  <path class="ga-baf-read ga-baf-read-2" d="M 190 115 Q 245 130 300 155" fill="none"/>
  <path class="ga-baf-read ga-baf-read-3" d="M 190 163 L 300 165" fill="none"/>
  <path class="ga-baf-read ga-baf-read-4" d="M 190 211 Q 245 200 300 175" fill="none"/>
  <path class="ga-baf-read ga-baf-read-5" d="M 190 259 Q 245 220 300 185" fill="none"/>

  <circle class="ga-baf-readpulse ga-baf-readpulse-1" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-2" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-3" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-4" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-readpulse ga-baf-readpulse-5" r="3.5" fill="var(--ga-green)"/>

  <text class="ga-baf-flowlabel" x="245" y="85" text-anchor="middle">read</text>

  <!-- ───── COMMAND flow: Coordinator → Agents ───── -->
  <path class="ga-baf-cmd ga-baf-cmd-1" d="M 480 145 Q 520 120 560 115" fill="none"/>
  <path class="ga-baf-cmd ga-baf-cmd-2" d="M 480 165 L 560 163" fill="none"/>
  <path class="ga-baf-cmd ga-baf-cmd-3" d="M 480 185 Q 520 200 560 211" fill="none"/>

  <circle class="ga-baf-cmdpulse ga-baf-cmdpulse-1" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-cmdpulse ga-baf-cmdpulse-2" r="3.5" fill="var(--ga-green)"/>
  <circle class="ga-baf-cmdpulse ga-baf-cmdpulse-3" r="3.5" fill="var(--ga-green)"/>

  <text class="ga-baf-flowlabel" x="520" y="138" text-anchor="middle">command</text>

  <!-- ───── WRITE-BACK flow: Agents → Brains (dashed curved loop at bottom) ───── -->
  <path class="ga-baf-writeback" d="M 660 230 Q 660 350 105 320 L 105 280" fill="none" stroke-dasharray="4 4"/>
  <circle class="ga-baf-writepulse" r="3" fill="var(--ga-ink-2)"/>

  <text class="ga-baf-flowlabel" x="380" y="358" text-anchor="middle">write back · records what it learned</text>
</svg>`;
    },

    /* Brain Layer Mini — 3 stack pills with ONE highlighted.
       Compact (80×56), embeddable in cards, eyebrows, headers.
       Shows the active layer's position within the whole 3-layer Brain. */
    'brain-layer-1'(opts) {
      return `
<svg viewBox="0 0 80 56" width="80" height="56" class="ga-svg" aria-label="Context Brain · Identity Layer">
  <rect class="ga-s-main"           x="6" y="2"  width="68" height="14" rx="7" fill="var(--ga-bg)"/>
  <rect class="ga-s-main"           x="6" y="20" width="68" height="14" rx="7" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bli-on" x="6" y="38" width="68" height="14" rx="7"/>
</svg>`;
    },
    'brain-layer-2'(opts) {
      return `
<svg viewBox="0 0 80 56" width="80" height="56" class="ga-svg" aria-label="Context Brain · Learning Layer">
  <rect class="ga-s-main"           x="6" y="2"  width="68" height="14" rx="7" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bli-on" x="6" y="20" width="68" height="14" rx="7"/>
  <rect class="ga-s-main"           x="6" y="38" width="68" height="14" rx="7" fill="var(--ga-bg)"/>
</svg>`;
    },
    'brain-layer-3'(opts) {
      return `
<svg viewBox="0 0 80 56" width="80" height="56" class="ga-svg" aria-label="Context Brain · Now Layer">
  <rect class="ga-s-main ga-bli-on" x="6" y="2"  width="68" height="14" rx="7"/>
  <rect class="ga-s-main"           x="6" y="20" width="68" height="14" rx="7" fill="var(--ga-bg)"/>
  <rect class="ga-s-main"           x="6" y="38" width="68" height="14" rx="7" fill="var(--ga-bg)"/>
</svg>`;
    },

    /* Brain Layer · Identity (Floor 3, Layer 1) — themed illustration:
       a stable "registration card" with portrait silhouette + identity facts.
       Green pin = permanent record. */
    'brain-identity'(opts) {
      return `
<svg viewBox="0 0 220 160" width="220" height="160" class="ga-svg ga-brain-identity-svg" aria-label="Identity Layer — who you are, written once">
  <!-- Card outline -->
  <rect class="ga-s-main" x="34" y="22" width="152" height="106" rx="6" fill="var(--ga-bg)"/>

  <!-- Portrait silhouette (top-left of card) -->
  <circle class="ga-s-main" cx="62" cy="48" r="9" fill="var(--ga-bg)"/>
  <path class="ga-s-main" d="M 48 70 Q 62 60 76 70" fill="none"/>

  <!-- Identity fields beside portrait -->
  <line class="ga-s-main" x1="84" y1="44" x2="170" y2="44"/>
  <line class="ga-s-soft" x1="84" y1="54" x2="148" y2="54"/>
  <line class="ga-s-soft" x1="84" y1="64" x2="160" y2="64"/>

  <!-- Lower fields (full-width) -->
  <line class="ga-s-soft" x1="50" y1="86"  x2="170" y2="86"/>
  <line class="ga-s-soft" x1="50" y1="98"  x2="150" y2="98"/>
  <line class="ga-s-soft" x1="50" y1="110" x2="160" y2="110"/>

  <!-- Permanent stamp (green dot, like a wax seal) -->
  <circle class="ga-bl-identity-pin" cx="166" cy="115" r="5" fill="var(--ga-green)"/>

  <!-- Small "PERMANENT" caption below -->
  <text class="ga-bl-lbl" x="110" y="148" text-anchor="middle">MONTHS &middot; YEARS</text>
</svg>`;
    },

    /* Brain Layer · Accumulated Learning (Floor 3, Layer 2) — themed illustration:
       7 vertical bars accumulating heights (patterns building over time).
       Green dot = the latest learning peak. */
    'brain-learning'(opts) {
      return `
<svg viewBox="0 0 220 160" width="220" height="160" class="ga-svg ga-brain-learning-svg" aria-label="Accumulated Learning Layer — patterns built from observation">
  <!-- Baseline -->
  <line class="ga-s-soft" x1="20" y1="120" x2="200" y2="120" stroke-dasharray="2 3"/>

  <!-- Bars accumulating heights (left → right = time) -->
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-1" x="28"  y="100" width="14" height="20" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-2" x="50"  y="86"  width="14" height="34" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-3" x="72"  y="74"  width="14" height="46" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-4" x="94"  y="60"  width="14" height="60" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-5" x="116" y="48"  width="14" height="72" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-6" x="138" y="38"  width="14" height="82" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl-bar ga-bl-bar-7" x="160" y="28"  width="14" height="92" fill="var(--ga-bg)"/>

  <!-- Trend line (subtle, dotted) connecting tops -->
  <polyline class="ga-s-soft" points="35,100 57,86 79,74 101,60 123,48 145,38 167,28" fill="none" stroke-dasharray="3 3"/>

  <!-- Green dot at latest peak (this visit's learning) -->
  <circle class="ga-bl-learning-peak" cx="167" cy="28" r="4" fill="var(--ga-green)"/>

  <!-- Time axis label -->
  <text class="ga-bl-lbl" x="20"  y="142">PAST</text>
  <text class="ga-bl-lbl" x="200" y="142" text-anchor="end">NOW</text>
  <text class="ga-bl-lbl" x="110" y="148" text-anchor="middle">DAYS &middot; WEEKS &middot; MONTHS</text>
</svg>`;
    },

    /* Brain Layer · Right Now (Floor 3, Layer 3) — themed illustration:
       8 token signals converging into a central live pulse.
       The 8 ticks come from 8 directions = 8 Context Tokens.
       Center = present moment, pulsing green. */
    'brain-now'(opts) {
      return `
<svg viewBox="0 0 220 160" width="220" height="160" class="ga-svg ga-brain-now-svg" aria-label="Right Now Layer — live signals from 8 Context Tokens">
  <!-- 8 incoming token ticks (all converge toward center 110,80) -->
  <line class="ga-s-main ga-bl-now-tick" x1="110" y1="14"  x2="110" y2="42"/>
  <line class="ga-s-main ga-bl-now-tick" x1="110" y1="118" x2="110" y2="146"/>
  <line class="ga-s-main ga-bl-now-tick" x1="20"  y1="80"  x2="48"  y2="80"/>
  <line class="ga-s-main ga-bl-now-tick" x1="172" y1="80"  x2="200" y2="80"/>
  <line class="ga-s-main ga-bl-now-tick" x1="44"  y1="22"  x2="64"  y2="42"/>
  <line class="ga-s-main ga-bl-now-tick" x1="176" y1="22"  x2="156" y2="42"/>
  <line class="ga-s-main ga-bl-now-tick" x1="44"  y1="138" x2="64"  y2="118"/>
  <line class="ga-s-main ga-bl-now-tick" x1="176" y1="138" x2="156" y2="118"/>

  <!-- Live pulse rings (3 concentric, soft green tint) -->
  <circle class="ga-bl-now-ring ga-bl-now-ring-3" cx="110" cy="80" r="28" fill="none" stroke="var(--ga-green)" stroke-width="0.8" opacity="0.18"/>
  <circle class="ga-bl-now-ring ga-bl-now-ring-2" cx="110" cy="80" r="20" fill="none" stroke="var(--ga-green)" stroke-width="1"   opacity="0.32"/>
  <circle class="ga-bl-now-ring ga-bl-now-ring-1" cx="110" cy="80" r="12" fill="none" stroke="var(--ga-green)" stroke-width="1.5" opacity="0.55"/>

  <!-- Core (always-on green dot) -->
  <circle class="ga-bl-now-core" cx="110" cy="80" r="5" fill="var(--ga-green)"/>

  <!-- Caption -->
  <text class="ga-bl-lbl" x="110" y="155" text-anchor="middle">SECONDS &middot; MINUTES</text>
</svg>`;
    },

    /* Multi-Agent Orchestration — central Brain coordinating multiple
       specialist agents. Replaces pipeline-b for this concept. */
    'multi-agent'(opts) {
      return `
<svg viewBox="0 0 360 220" width="360" height="220" class="ga-svg ga-multi-agent-svg" aria-label="Multi-Agent Orchestration — Context Brain coordinating specialist agents">
  <!-- Central Context Brain (3 stacked pills, miniature) -->
  <g transform="translate(140 86)">
    <rect class="ga-s-main" x="0" y="0"  width="80" height="14" rx="7" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="0" y="18" width="80" height="14" rx="7" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="0" y="36" width="80" height="14" rx="7" fill="var(--ga-bg)"/>
    <text class="ga-bl-lbl" x="40" y="-6" text-anchor="middle">CONTEXT BRAIN</text>
  </g>

  <!-- 4 specialist agents around -->
  <!-- Top: Flight -->
  <g class="ga-ma-agent ga-ma-agent-1">
    <circle class="ga-s-main" cx="180" cy="28" r="11" fill="var(--ga-bg)"/>
    <text class="ga-bl-lbl" x="180" y="14" text-anchor="middle">FLIGHT</text>
  </g>
  <line class="ga-ma-link ga-ma-link-1" x1="180" y1="39" x2="180" y2="86" stroke-dasharray="3 3"/>

  <!-- Right: Hotel -->
  <g class="ga-ma-agent ga-ma-agent-2">
    <circle class="ga-s-main" cx="320" cy="110" r="11" fill="var(--ga-bg)"/>
    <text class="ga-bl-lbl" x="320" y="138" text-anchor="middle">HOTEL</text>
  </g>
  <line class="ga-ma-link ga-ma-link-2" x1="309" y1="110" x2="220" y2="110" stroke-dasharray="3 3"/>

  <!-- Bottom: Activity -->
  <g class="ga-ma-agent ga-ma-agent-3">
    <circle class="ga-s-main" cx="180" cy="194" r="11" fill="var(--ga-bg)"/>
    <text class="ga-bl-lbl" x="180" y="218" text-anchor="middle">ACTIVITY</text>
  </g>
  <line class="ga-ma-link ga-ma-link-3" x1="180" y1="183" x2="180" y2="136" stroke-dasharray="3 3"/>

  <!-- Left: Budget -->
  <g class="ga-ma-agent ga-ma-agent-4">
    <circle class="ga-s-main" cx="40" cy="110" r="11" fill="var(--ga-bg)"/>
    <text class="ga-bl-lbl" x="40" y="138" text-anchor="middle">BUDGET</text>
  </g>
  <line class="ga-ma-link ga-ma-link-4" x1="51" y1="110" x2="140" y2="110" stroke-dasharray="3 3"/>

  <!-- Center pulse — alignment signal -->
  <circle class="ga-ma-pulse" cx="180" cy="110" r="2.5" fill="var(--ga-green)"/>
</svg>`;
    },

    /* Rule Engine standalone — supports orientation: vertical (default) or horizontal */
    'rule-engine'(opts) {
      const horizontal = opts.orientation === 'horizontal';

      if (horizontal) {
        return `
<svg viewBox="0 0 360 220" width="360" height="220" class="ga-svg" aria-label="Rule Engine, horizontal">
  <!-- 3 inputs flowing in from left -->
  <circle class="ga-f-accent" cx="20" cy="90" r="4">
    <animate attributeName="cx" values="20;130;130" dur="6s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite"/>
  </circle>
  <circle class="ga-f-accent" cx="20" cy="110" r="4">
    <animate attributeName="cx" values="20;130;130" dur="6s" repeatCount="indefinite" begin="-1s"/>
    <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" begin="-1s"/>
  </circle>
  <circle class="ga-f-accent" cx="20" cy="130" r="4">
    <animate attributeName="cx" values="20;130;130" dur="6s" repeatCount="indefinite" begin="-2s"/>
    <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" begin="-2s"/>
  </circle>

  <!-- Rhombus -->
  <polygon class="ga-s-main ga-rhombus" points="130,70 180,110 130,150 80,110" fill="var(--ga-bg)"/>

  <!-- Ghost base lines (always visible) + green overlays -->
  <line class="ga-out-base" x1="180" y1="110" x2="280" y2="50"/>
  <line class="ga-out-base" x1="180" y1="110" x2="280" y2="110"/>
  <line class="ga-out-base" x1="180" y1="110" x2="280" y2="170"/>
  <!-- 3 output paths fanning right (pathLength="1" for draw animation) -->
  <line class="ga-out-path ga-op-1" x1="180" y1="110" x2="280" y2="50"  pathLength="1"/>
  <line class="ga-out-path ga-op-2" x1="180" y1="110" x2="280" y2="110" pathLength="1"/>
  <line class="ga-out-path ga-op-3" x1="180" y1="110" x2="280" y2="170" pathLength="1"/>

  <circle class="ga-out-end ga-oe-1" cx="285" cy="50"  r="8"/>
  <circle class="ga-out-end ga-oe-2" cx="285" cy="110" r="8"/>
  <circle class="ga-out-end ga-oe-3" cx="285" cy="170" r="8"/>

  <text class="ga-lbl-mono" x="305" y="54" >Delegate</text>
  <text class="ga-lbl-mono" x="305" y="114">Escalate</text>
  <text class="ga-lbl-mono" x="305" y="174">Adapt</text>
</svg>`;
      }

      // Vertical (default)
      return `
<svg viewBox="0 0 360 280" width="340" class="ga-svg" aria-label="Rule Engine with random output">
  <!-- Inputs falling into rhombus -->
  <circle class="ga-f-accent" cx="160" cy="40" r="4">
    <animate attributeName="cy" values="40;110;110" dur="6s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite"/>
  </circle>
  <circle class="ga-f-accent" cx="180" cy="40" r="4">
    <animate attributeName="cy" values="40;110;110" dur="6s" repeatCount="indefinite" begin="-1s"/>
    <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" begin="-1s"/>
  </circle>
  <circle class="ga-f-accent" cx="200" cy="40" r="4">
    <animate attributeName="cy" values="40;110;110" dur="6s" repeatCount="indefinite" begin="-2s"/>
    <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" begin="-2s"/>
  </circle>

  <!-- Rhombus -->
  <polygon class="ga-s-main ga-rhombus" points="180,90 230,140 180,190 130,140" fill="var(--ga-bg)"/>

  <!-- 3 output paths (pathLength="1" enables draw animation) -->
  <!-- Ghost base lines + green overlays -->
  <line class="ga-out-base" x1="180" y1="190" x2="100" y2="240"/>
  <line class="ga-out-base" x1="180" y1="190" x2="180" y2="245"/>
  <line class="ga-out-base" x1="180" y1="190" x2="260" y2="240"/>
  <line class="ga-out-path ga-op-1" x1="180" y1="190" x2="100" y2="240" pathLength="1"/>
  <line class="ga-out-path ga-op-2" x1="180" y1="190" x2="180" y2="245" pathLength="1"/>
  <line class="ga-out-path ga-op-3" x1="180" y1="190" x2="260" y2="240" pathLength="1"/>

  <!-- Endpoints -->
  <circle class="ga-out-end ga-oe-1" cx="95"  cy="245" r="7"/>
  <circle class="ga-out-end ga-oe-2" cx="180" cy="250" r="7"/>
  <circle class="ga-out-end ga-oe-3" cx="265" cy="245" r="7"/>

  <text class="ga-lbl-mono" x="95"  y="270" text-anchor="middle">Delegate</text>
  <text class="ga-lbl-mono" x="180" y="272" text-anchor="middle">Escalate</text>
  <text class="ga-lbl-mono" x="265" y="270" text-anchor="middle">Adapt</text>
</svg>`;
    },

    /* Intent standalone — Tree hierarchy: Explicit | Implicit at top,
       Active/Passive/Ambient branching from Implicit. */
    intent(opts) {
      return `
<svg viewBox="0 0 380 240" width="380" height="240" class="ga-svg ga-intent-svg" aria-label="Intent — Explicit | Implicit (3)">
  <!-- EXPLICIT category (left) -->
  <text class="ga-lbl-mono" x="80" y="28" text-anchor="middle" style="font-weight:500;letter-spacing:2px">EXPLICIT</text>
  <text class="ga-lbl-mono" x="80" y="42" text-anchor="middle" style="font-size:8px">1 · declared</text>
  <line class="ga-s-main" x1="80" y1="56" x2="80" y2="100"/>
  <circle class="ga-f-accent ga-cs-ex-pulse" cx="80" cy="118" r="13"/>

  <!-- IMPLICIT category (right) -->
  <text class="ga-lbl-mono" x="260" y="28" text-anchor="middle" style="font-weight:500;letter-spacing:2px">IMPLICIT</text>
  <text class="ga-lbl-mono" x="260" y="42" text-anchor="middle" style="font-size:8px">3 · inferred</text>
  <!-- Tree connector: vertical from label, horizontal cross, 3 verticals down to children -->
  <line class="ga-s-main" x1="260" y1="56" x2="260" y2="78"/>
  <line class="ga-s-main" x1="200" y1="78" x2="320" y2="78"/>
  <line class="ga-s-main" x1="200" y1="78" x2="200" y2="100"/>
  <line class="ga-s-main" x1="260" y1="78" x2="260" y2="100"/>
  <line class="ga-s-main" x1="320" y1="78" x2="320" y2="100"/>
  <!-- 3 sub-channels -->
  <circle class="ga-s-main ga-cs-ac-pulse" cx="200" cy="118" r="9" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono" x="200" y="148" text-anchor="middle">Active</text>
  <circle class="ga-s-main ga-cs-pa-pulse" cx="260" cy="118" r="9" fill="var(--ga-bg)" stroke-dasharray="2 2"/>
  <text class="ga-lbl-mono" x="260" y="148" text-anchor="middle">Passive</text>
  <circle class="ga-s-main ga-cs-am-pulse" cx="320" cy="118" r="11" fill="none"/>
  <text class="ga-lbl-mono" x="320" y="148" text-anchor="middle">Ambient</text>
</svg>`;
    },

    /* Temporal Arc — trust curve rises, dips, recovers. 5 phase labels. */
    'temporal-arc'(opts) {
      return `
<svg viewBox="0 0 360 240" width="360" height="240" class="ga-svg" aria-label="Temporal Arc — 5 phases of trust">
  <!-- Trust curve: rises, peaks, dips at friction, recovers -->
  <path class="ga-s-main" d="M 30,150 C 70,142 90,116 130,104 C 165,90 195,72 220,68 C 248,74 268,96 310,114 C 332,124 348,82 350,72" fill="none"/>

  <!-- Traveling dot -->
  <circle class="ga-f-accent ga-arc-dot" r="5" cx="0" cy="0"/>

  <!-- 5 phase labels -->
  <text class="ga-lbl-mono" x="30"  y="180" text-anchor="middle">Onboard</text>
  <text class="ga-lbl-mono" x="110" y="180" text-anchor="middle">Earn</text>
  <text class="ga-lbl-mono" x="200" y="180" text-anchor="middle">Trust</text>
  <text class="ga-lbl-mono" x="290" y="180" text-anchor="middle">Friction</text>
  <text class="ga-lbl-mono" x="350" y="180" text-anchor="middle">Repair</text>
</svg>`;
    },

    /* Trust Coupling — two dials joined by a green line.
       The accent line IS the message: they're tied. */
    'trust-coupling'(opts) {
      return `
<svg viewBox="0 0 360 220" width="360" height="220" class="ga-svg" aria-label="Trust — Disclosure × Autonomy coupling">
  <!-- Disclosure dial (left) -->
  <path class="ga-s-main" d="M 40,140 A 50 50 0 0 1 140,140"/>
  <line class="ga-s-main" x1="40" y1="140" x2="140" y2="140"/>
  <line class="ga-s-green ga-tr-needle ga-tr-needle-d" x1="90" y1="140" x2="90" y2="95" stroke-width="2.5"/>
  <text class="ga-lbl-mono" x="90" y="172" text-anchor="middle">Disclosure</text>

  <!-- Coupling accent (the green line is the whole point) -->
  <line class="ga-s-green" x1="108" y1="140" x2="232" y2="140"/>

  <!-- Autonomy dial (right) -->
  <path class="ga-s-main" d="M 220,140 A 50 50 0 0 1 320,140"/>
  <line class="ga-s-main" x1="220" y1="140" x2="320" y2="140"/>
  <line class="ga-s-green ga-tr-needle ga-tr-needle-a" x1="270" y1="140" x2="270" y2="95" stroke-width="2.5"/>
  <text class="ga-lbl-mono" x="270" y="172" text-anchor="middle">Autonomy</text>
</svg>`;
    },

    /* Substitution Modes — 4 cells, each with a distinct literal animation:
       Exact: an incoming circle slides in and matches the target perfectly.
       Flexible: multiple variants arrive, all accepted (close-enough match).
       Exploring: 5 candidates exist, one is picked and zooms in.
       Surprise: irregular shapes radiate out, one (different shape) wins. */
    substitution(opts) {
      return `
<svg viewBox="0 0 400 220" width="400" height="220" class="ga-svg" aria-label="Substitution Modes — 4 modes, literal animations">

  <!-- ── Mode 1: Exact ── -->
  <g class="ga-sub-cell ga-sub-1" transform="translate(10, 30)">
    <rect class="ga-sub-frame" x="0" y="0" width="80" height="100" rx="4" fill="none"/>
    <!-- Static target ring (the "specified" item) -->
    <circle class="ga-s-main ga-sub-target" cx="40" cy="50" r="11" fill="var(--ga-bg)"/>
    <!-- Incoming circle: slides in from left, matches target -->
    <circle class="ga-f-accent ga-sub-ex-incoming" cx="-15" cy="50" r="7"/>
    <text class="ga-lbl-mono" x="40" y="120" text-anchor="middle">Exact</text>
  </g>

  <!-- ── Mode 2: Flexible — 3 balls settle into the dashed acceptance zone ── -->
  <g class="ga-sub-cell ga-sub-2" transform="translate(110, 30)">
    <rect class="ga-sub-frame" x="0" y="0" width="80" height="100" rx="4" fill="none"/>
    <!-- Dashed acceptance zone (large) -->
    <circle class="ga-s-main ga-sub-target-fl" cx="40" cy="50" r="22" fill="var(--ga-bg)" stroke-dasharray="2 2"/>
    <!-- 3 incoming balls — each settles at a different position INSIDE the zone -->
    <circle class="ga-f-accent ga-sub-fl ga-sub-fl-1" cx="0" cy="50" r="5"/>
    <circle class="ga-f-accent ga-sub-fl ga-sub-fl-2" cx="0" cy="50" r="5"/>
    <circle class="ga-f-accent ga-sub-fl ga-sub-fl-3" cx="0" cy="50" r="5"/>
    <text class="ga-lbl-mono" x="40" y="120" text-anchor="middle">Flexible</text>
  </g>

  <!-- ── Mode 3: Exploring — center dot → burst of 5 candidates → zoom into 1 ── -->
  <g class="ga-sub-cell ga-sub-3" transform="translate(210, 30)">
    <rect class="ga-sub-frame" x="0" y="0" width="80" height="100" rx="4" fill="none"/>
    <!-- Center source (always visible) -->
    <circle class="ga-f-accent" cx="40" cy="50" r="3"/>
    <!-- 5 lines that draw outward during burst -->
    <line class="ga-s-main ga-sub-ex-line" x1="40" y1="50" x2="14" y2="22" pathLength="1"/>
    <line class="ga-s-main ga-sub-ex-line" x1="40" y1="50" x2="66" y2="22" pathLength="1"/>
    <line class="ga-s-main ga-sub-ex-line" x1="40" y1="50" x2="14" y2="78" pathLength="1"/>
    <line class="ga-s-main ga-sub-ex-line" x1="40" y1="50" x2="66" y2="78" pathLength="1"/>
    <line class="ga-s-main ga-sub-ex-line" x1="40" y1="50" x2="40" y2="86" pathLength="1"/>
    <!-- 4 candidate circles (appear after lines complete) -->
    <circle class="ga-s-main ga-sub-ex-c" cx="14" cy="22" r="0" fill="var(--ga-bg)"/>
    <circle class="ga-s-main ga-sub-ex-c" cx="66" cy="22" r="0" fill="var(--ga-bg)"/>
    <circle class="ga-s-main ga-sub-ex-c" cx="14" cy="78" r="0" fill="var(--ga-bg)"/>
    <circle class="ga-s-main ga-sub-ex-c" cx="66" cy="78" r="0" fill="var(--ga-bg)"/>
    <!-- The chosen one — zooms in (Google Maps style) at the end -->
    <circle class="ga-s-main ga-sub-ex-pick" cx="40" cy="86" r="0" fill="var(--ga-bg)"/>
    <text class="ga-lbl-mono" x="40" y="120" text-anchor="middle">Exploring</text>
  </g>

  <!-- ── Mode 4: Surprise — irregular shapes burst out (no lines), 1 zooms in ── -->
  <g class="ga-sub-cell ga-sub-4" transform="translate(310, 30)">
    <rect class="ga-sub-frame" x="0" y="0" width="80" height="100" rx="4" fill="none"/>
    <!-- Center source (always visible) -->
    <circle class="ga-f-accent ga-sub-sp-center" cx="40" cy="50" r="3"/>
    <!-- 4 irregular shapes scattered around (NO connecting lines — pure burst) -->
    <polygon class="ga-s-main ga-sub-sp ga-sub-sp-1" points="14,18 19,28 9,28" fill="var(--ga-bg)"/>      <!-- triangle TL -->
    <rect    class="ga-s-main ga-sub-sp ga-sub-sp-2" x="61" y="14" width="10" height="10" fill="var(--ga-bg)"/> <!-- square TR -->
    <polygon class="ga-s-main ga-sub-sp ga-sub-sp-3" points="9,72 17,80 9,88 1,80" fill="var(--ga-bg)"/>  <!-- diamond BL -->
    <polygon class="ga-s-main ga-sub-sp ga-sub-sp-5" points="40,9 44,16 36,16" fill="var(--ga-bg)"/>     <!-- triangle top -->
    <!-- The chosen one (a star-like shape that zooms in) -->
    <polygon class="ga-s-main ga-sub-sp-pick" points="66,72 70,80 78,82 71,86 73,94 66,89 59,94 61,86 54,82 62,80" fill="var(--ga-bg)"/>
    <text class="ga-lbl-mono" x="40" y="120" text-anchor="middle">Surprise</text>
  </g>
</svg>`;
    },

    /* Disposable Brain · A — Timeline (5-stage filmstrip).
       5 mini-illustrations side by side, sequential highlight. */
    'disposable-brain-timeline'(opts) {
      return `
<svg viewBox="0 0 360 200" width="360" height="200" class="ga-svg" aria-label="Disposable Brain — timeline">
  <!-- Stage 1: Home alone -->
  <g class="ga-dbt-stage ga-dbt-1" transform="translate(8, 30)">
    <rect class="ga-s-main" x="14" y="14" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="28" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="42" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
  </g>
  <text class="ga-lbl-mono" x="38" y="120" text-anchor="middle">Home</text>

  <!-- Stage 2: bud emerges from L2 -->
  <g class="ga-dbt-stage ga-dbt-2" transform="translate(80, 30)">
    <rect class="ga-s-main" x="14" y="14" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="28" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="42" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <circle class="ga-f-accent" cx="54" cy="32" r="3"/>
  </g>
  <text class="ga-lbl-mono" x="110" y="120" text-anchor="middle">born</text>

  <!-- Stage 3: bud has grown, learning dots inside -->
  <g class="ga-dbt-stage ga-dbt-3" transform="translate(152, 30)">
    <rect class="ga-s-main" x="6" y="14" width="22" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="6" y="28" width="22" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="6" y="42" width="22" height="8" rx="4" fill="var(--ga-bg)"/>
    <circle class="ga-s-green" cx="46" cy="32" r="11" fill="none"/>
    <circle class="ga-f-accent" cx="42" cy="29" r="1.5"/>
    <circle class="ga-f-accent" cx="50" cy="30" r="1.5"/>
    <circle class="ga-f-accent" cx="46" cy="36" r="1.5"/>
  </g>
  <text class="ga-lbl-mono" x="180" y="120" text-anchor="middle">learns</text>

  <!-- Stage 4: bud returns toward L2 -->
  <g class="ga-dbt-stage ga-dbt-4" transform="translate(224, 30)">
    <rect class="ga-s-main" x="14" y="14" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="28" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="42" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <circle class="ga-f-accent" cx="50" cy="32" r="2.5"/>
    <line class="ga-s-green" x1="56" y1="32" x2="46" y2="32"/>
    <polygon class="ga-f-accent" points="46,32 50,30 50,34"/>
  </g>
  <text class="ga-lbl-mono" x="252" y="120" text-anchor="middle">returns</text>

  <!-- Stage 5: Home alone, L2 now glows green -->
  <g class="ga-dbt-stage ga-dbt-5" transform="translate(296, 30)">
    <rect class="ga-s-main" x="14" y="14" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="14" y="28" width="32" height="8" rx="4" fill="var(--ga-green-2)" stroke="var(--ga-green)"/>
    <rect class="ga-s-main" x="14" y="42" width="32" height="8" rx="4" fill="var(--ga-bg)"/>
  </g>
  <text class="ga-lbl-mono" x="326" y="120" text-anchor="middle">merged</text>
</svg>`;
    },

    /* Disposable Brain · B — Respiration (bubble inflates out of L2, deflates back).
       The Trip Brain is born by EXPANDING out of L2 of Home Brain, lives,
       then SHRINKS back into L2 (which flashes green to show learning was absorbed). */
    'disposable-brain-orbit'(opts) {
      return `
<svg viewBox="0 0 360 220" width="360" height="220" class="ga-svg" aria-label="Disposable Brain — bubble emerges from L2 and returns">
  <!-- Home Brain (3 flat pills, matching the new Brain style) -->
  <rect class="ga-s-main"                      x="40" y="80"  width="120" height="20" rx="10" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-db-l2"             x="40" y="106" width="120" height="20" rx="10" fill="var(--ga-bg)"/>
  <rect class="ga-s-main"                      x="40" y="132" width="120" height="20" rx="10" fill="var(--ga-bg)"/>
  <text class="ga-lbl-mono" x="100" y="178" text-anchor="middle">Home Brain</text>
  <text class="ga-lbl-mono" x="100" y="192" text-anchor="middle" style="font-size:8px">L2 absorbs the trip</text>

  <!-- Trip bubble — emerges from L2's right edge, expands, returns -->
  <circle class="ga-f-accent ga-db-bubble" cx="160" cy="116" r="10"/>
  <text class="ga-lbl-mono ga-db-trip-label" x="270" y="120" text-anchor="middle" dominant-baseline="middle">Trip Brain</text>
</svg>`;
    },

    /* Disposable Brain · C — Pair (Home + Trip side by side).
       Trip Brain fades in (born), accumulates dots (learns),
       transfers back via arrow (merges), fades out (dies),
       Home L2 flashes green. */
    'disposable-brain-pair'(opts) {
      return `
<svg viewBox="0 0 360 200" width="360" height="200" class="ga-svg" aria-label="Disposable Brain — pair">
  <!-- Home Brain (left, persistent) -->
  <g transform="translate(30, 60)">
    <rect class="ga-s-main" x="0" y="0"  width="80" height="14" rx="7" fill="var(--ga-bg)"/>
    <rect class="ga-s-main ga-dbp-l2" x="0" y="20" width="80" height="14" rx="7" fill="var(--ga-bg)"/>
    <rect class="ga-s-main" x="0" y="40" width="80" height="14" rx="7" fill="var(--ga-bg)"/>
  </g>
  <text class="ga-lbl-mono" x="70" y="142" text-anchor="middle">Home Brain</text>

  <!-- Outbound arrow (born) -->
  <g class="ga-dbp-arrow-out">
    <line class="ga-s-green" x1="120" y1="84" x2="200" y2="84"/>
    <polygon class="ga-f-accent" points="200,84 193,80 193,88"/>
  </g>
  <!-- Inbound arrow (merges) -->
  <g class="ga-dbp-arrow-in">
    <line class="ga-s-green" x1="200" y1="100" x2="120" y2="100"/>
    <polygon class="ga-f-accent" points="120,100 127,96 127,104"/>
  </g>

  <!-- Trip Brain (right, ephemeral, dashed border) -->
  <g class="ga-dbp-trip">
    <rect class="ga-s-main" x="210" y="68" width="76" height="48" rx="6" fill="var(--ga-bg)" stroke-dasharray="3 3"/>
    <circle class="ga-f-accent ga-dbp-dot ga-dbp-dot-1" cx="226" cy="82" r="2.5"/>
    <circle class="ga-f-accent ga-dbp-dot ga-dbp-dot-2" cx="248" cy="86" r="2.5"/>
    <circle class="ga-f-accent ga-dbp-dot ga-dbp-dot-3" cx="270" cy="82" r="2.5"/>
    <circle class="ga-f-accent ga-dbp-dot ga-dbp-dot-4" cx="236" cy="102" r="2.5"/>
    <circle class="ga-f-accent ga-dbp-dot ga-dbp-dot-5" cx="262" cy="104" r="2.5"/>
  </g>
  <text class="ga-lbl-mono ga-dbp-label" x="248" y="142" text-anchor="middle">Trip Brain</text>
</svg>`;
    },


    /* Rule Constellation — 33 design rules across 7 categories.
       Used at the top of the Specs page. Visually distinct from Rule Engine
       (which is a single rhombus + 3 outputs). This shows the spec's body. */
    'rule-constellation'(opts) {
      return `
<svg viewBox="0 0 360 240" width="360" height="240" class="ga-svg" aria-label="33 design rules across 7 categories">
  <!-- Cluster 1: Cognitive Load Mitigation (5 rules) -->
  <circle class="rc-dot" cx="50" cy="42" r="3"/>
  <circle class="rc-dot rc-pick rc-pick-1" cx="70" cy="42" r="3"/>
  <circle class="rc-dot" cx="60" cy="50" r="3"/>
  <circle class="rc-dot" cx="50" cy="58" r="3"/>
  <circle class="rc-dot" cx="70" cy="58" r="3"/>
  <text class="ga-lbl-mono" x="60" y="82" text-anchor="middle">Cognitive</text>
  <text class="ga-lbl-mono" x="60" y="94" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R001–R005</text>

  <!-- Cluster 2: Social Privacy Guard (5 rules) -->
  <circle class="rc-dot" cx="140" cy="42" r="3"/>
  <circle class="rc-dot" cx="160" cy="42" r="3"/>
  <circle class="rc-dot" cx="150" cy="50" r="3"/>
  <circle class="rc-dot rc-pick rc-pick-2" cx="140" cy="58" r="3"/>
  <circle class="rc-dot" cx="160" cy="58" r="3"/>
  <text class="ga-lbl-mono" x="150" y="82" text-anchor="middle">Social</text>
  <text class="ga-lbl-mono" x="150" y="94" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R006–R010</text>

  <!-- Cluster 3: Trust Calibration (5 rules) -->
  <circle class="rc-dot" cx="230" cy="42" r="3"/>
  <circle class="rc-dot" cx="250" cy="42" r="3"/>
  <circle class="rc-dot rc-pick rc-pick-3" cx="240" cy="50" r="3"/>
  <circle class="rc-dot" cx="230" cy="58" r="3"/>
  <circle class="rc-dot" cx="250" cy="58" r="3"/>
  <text class="ga-lbl-mono" x="240" y="82" text-anchor="middle">Trust</text>
  <text class="ga-lbl-mono" x="240" y="94" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R011–R015</text>

  <!-- Cluster 4: Device Reflow (5 rules) -->
  <circle class="rc-dot" cx="310" cy="42" r="3"/>
  <circle class="rc-dot" cx="330" cy="42" r="3"/>
  <circle class="rc-dot" cx="320" cy="50" r="3"/>
  <circle class="rc-dot" cx="310" cy="58" r="3"/>
  <circle class="rc-dot rc-pick rc-pick-4" cx="330" cy="58" r="3"/>
  <text class="ga-lbl-mono" x="320" y="82" text-anchor="middle">Device</text>
  <text class="ga-lbl-mono" x="320" y="94" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R016–R020</text>

  <!-- Cluster 5: Priority Resolution (5 rules) -->
  <circle class="rc-dot rc-pick rc-pick-5" cx="80" cy="152" r="3"/>
  <circle class="rc-dot" cx="100" cy="152" r="3"/>
  <circle class="rc-dot" cx="90" cy="160" r="3"/>
  <circle class="rc-dot" cx="80" cy="168" r="3"/>
  <circle class="rc-dot" cx="100" cy="168" r="3"/>
  <text class="ga-lbl-mono" x="90" y="192" text-anchor="middle">Priority</text>
  <text class="ga-lbl-mono" x="90" y="204" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R021–R025</text>

  <!-- Cluster 6: Temporal Evolution (5 rules) -->
  <circle class="rc-dot" cx="190" cy="152" r="3"/>
  <circle class="rc-dot rc-pick rc-pick-6" cx="210" cy="152" r="3"/>
  <circle class="rc-dot" cx="200" cy="160" r="3"/>
  <circle class="rc-dot" cx="190" cy="168" r="3"/>
  <circle class="rc-dot" cx="210" cy="168" r="3"/>
  <text class="ga-lbl-mono" x="200" y="192" text-anchor="middle">Temporal</text>
  <text class="ga-lbl-mono" x="200" y="204" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R026–R030</text>

  <!-- Cluster 7: Multi-person Orchestration (3 rules) -->
  <circle class="rc-dot rc-pick rc-pick-7" cx="300" cy="152" r="3"/>
  <circle class="rc-dot" cx="290" cy="166" r="3"/>
  <circle class="rc-dot" cx="310" cy="166" r="3"/>
  <text class="ga-lbl-mono" x="300" y="192" text-anchor="middle">Multi</text>
  <text class="ga-lbl-mono" x="300" y="204" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">R031–R033</text>

  <!-- Footer badge -->
  <text class="ga-lbl-mono" x="180" y="228" text-anchor="middle" style="font-size:9px;letter-spacing:2px;font-weight:500">33 RULES · 7 CATEGORIES</text>
</svg>`;
    },

    /* AX Patterns standalone — Constellation of 23 patterns (6 + 5 + 12).
       Visually distinct from Rule Engine (which is "decision");
       this is "library/catalog of patterns".
       One pattern in the chosen cluster lights green per cycle. */
    'ax-patterns'(opts) {
      return `
<!-- Horizontal layout (desktop): 3 clusters in a row -->
<svg class="ga-svg ga-axp-h" viewBox="0 0 360 180" width="360" height="180" aria-label="23 AX Patterns — constellation">
  <!-- Delegate cluster (6 patterns: 3×2 grid) -->
  <circle class="ga-axc-dot" cx="42"  cy="50" r="4"/>
  <circle class="ga-axc-dot" cx="60"  cy="50" r="4"/>
  <circle class="ga-axc-dot" cx="78"  cy="50" r="4"/>
  <circle class="ga-axc-dot" cx="42"  cy="68" r="4"/>
  <circle class="ga-axc-dot ga-axc-pick-d" cx="60" cy="68" r="4"/>
  <circle class="ga-axc-dot" cx="78"  cy="68" r="4"/>
  <text class="ga-lbl-mono" x="60" y="100" text-anchor="middle">Delegate</text>
  <text class="ga-lbl-mono" x="60" y="114" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">6 patterns</text>

  <!-- Escalate cluster (5 patterns: 3 + 2 layout) -->
  <circle class="ga-axc-dot" cx="162" cy="50" r="4"/>
  <circle class="ga-axc-dot ga-axc-pick-e" cx="180" cy="50" r="4"/>
  <circle class="ga-axc-dot" cx="198" cy="50" r="4"/>
  <circle class="ga-axc-dot" cx="171" cy="68" r="4"/>
  <circle class="ga-axc-dot" cx="189" cy="68" r="4"/>
  <text class="ga-lbl-mono" x="180" y="100" text-anchor="middle">Escalate</text>
  <text class="ga-lbl-mono" x="180" y="114" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">5 patterns</text>

  <!-- Adapt cluster (12 patterns: 4×3 grid) -->
  <circle class="ga-axc-dot" cx="260" cy="40" r="4"/>
  <circle class="ga-axc-dot" cx="278" cy="40" r="4"/>
  <circle class="ga-axc-dot" cx="296" cy="40" r="4"/>
  <circle class="ga-axc-dot" cx="314" cy="40" r="4"/>
  <circle class="ga-axc-dot" cx="260" cy="58" r="4"/>
  <circle class="ga-axc-dot ga-axc-pick-a" cx="278" cy="58" r="4"/>
  <circle class="ga-axc-dot" cx="296" cy="58" r="4"/>
  <circle class="ga-axc-dot" cx="314" cy="58" r="4"/>
  <circle class="ga-axc-dot" cx="260" cy="76" r="4"/>
  <circle class="ga-axc-dot" cx="278" cy="76" r="4"/>
  <circle class="ga-axc-dot" cx="296" cy="76" r="4"/>
  <circle class="ga-axc-dot" cx="314" cy="76" r="4"/>
  <text class="ga-lbl-mono" x="287" y="100" text-anchor="middle">Adapt</text>
  <text class="ga-lbl-mono" x="287" y="114" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-3)">12 patterns</text>
</svg>

<!-- Vertical layout (mobile): 3 clusters stacked -->
<svg class="ga-svg ga-axp-v" viewBox="0 0 240 360" width="240" height="360" aria-label="23 AX Patterns — vertical constellation">
  <!-- Delegate (top) -->
  <circle class="ga-axc-dot" cx="100" cy="34" r="4"/>
  <circle class="ga-axc-dot" cx="118" cy="34" r="4"/>
  <circle class="ga-axc-dot" cx="136" cy="34" r="4"/>
  <circle class="ga-axc-dot" cx="100" cy="52" r="4"/>
  <circle class="ga-axc-dot ga-axc-pick-d" cx="118" cy="52" r="4"/>
  <circle class="ga-axc-dot" cx="136" cy="52" r="4"/>
  <text class="ga-lbl-mono" x="60" y="48" text-anchor="end">Delegate</text>
  <text class="ga-lbl-mono" x="60" y="62" text-anchor="end" style="font-size:8px;fill:var(--ga-ink-3)">6</text>

  <!-- Escalate (middle) -->
  <circle class="ga-axc-dot" cx="100" cy="142" r="4"/>
  <circle class="ga-axc-dot ga-axc-pick-e" cx="118" cy="142" r="4"/>
  <circle class="ga-axc-dot" cx="136" cy="142" r="4"/>
  <circle class="ga-axc-dot" cx="109" cy="160" r="4"/>
  <circle class="ga-axc-dot" cx="127" cy="160" r="4"/>
  <text class="ga-lbl-mono" x="60" y="156" text-anchor="end">Escalate</text>
  <text class="ga-lbl-mono" x="60" y="170" text-anchor="end" style="font-size:8px;fill:var(--ga-ink-3)">5</text>

  <!-- Adapt (bottom) -->
  <circle class="ga-axc-dot" cx="100" cy="240" r="4"/>
  <circle class="ga-axc-dot" cx="118" cy="240" r="4"/>
  <circle class="ga-axc-dot" cx="136" cy="240" r="4"/>
  <circle class="ga-axc-dot" cx="154" cy="240" r="4"/>
  <circle class="ga-axc-dot" cx="100" cy="258" r="4"/>
  <circle class="ga-axc-dot ga-axc-pick-a" cx="118" cy="258" r="4"/>
  <circle class="ga-axc-dot" cx="136" cy="258" r="4"/>
  <circle class="ga-axc-dot" cx="154" cy="258" r="4"/>
  <circle class="ga-axc-dot" cx="100" cy="276" r="4"/>
  <circle class="ga-axc-dot" cx="118" cy="276" r="4"/>
  <circle class="ga-axc-dot" cx="136" cy="276" r="4"/>
  <circle class="ga-axc-dot" cx="154" cy="276" r="4"/>
  <text class="ga-lbl-mono" x="60" y="262" text-anchor="end">Adapt</text>
  <text class="ga-lbl-mono" x="60" y="276" text-anchor="end" style="font-size:8px;fill:var(--ga-ink-3)">12</text>
</svg>`;
    },

    /* Pipeline-B — Intent next to Human; Tokens (above) + Brain (below)
       interpret the signal in parallel before Rule Engine decides. */
    'pipeline-b'(opts) {
      const feedback = opts.feedback !== 'false';
      return `
<svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid meet"
     style="width:100%;height:auto;max-height:420px;"
     class="ga-svg" aria-label="Context Grammar pipeline — Brain as parallel layer">

  <!-- Main spine (y=180) -->
  <line class="ga-s-soft" x1="100" y1="180" x2="1080" y2="180" stroke-dasharray="3 4"/>

  <!-- Human (on spine) -->
  <circle class="ga-s-main ga-stage-human" cx="80" cy="160" r="11" fill="var(--ga-bg)"/>
  <path   class="ga-s-main" d="M 64,196 Q 80,180 96,196" fill="none"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-human" x="80" y="244" text-anchor="middle">Human</text>

  <!-- Intent (next to Human, on spine) — the human's signal -->
  <circle class="ga-f-accent ga-intent-core" cx="170" cy="180" r="8"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-intent" x="170" y="244" text-anchor="middle">Intent</text>

  <!-- Fork: Intent → Tokens (up) and Intent → Brain (down) -->
  <line class="ga-s-soft" x1="178" y1="174" x2="222" y2="148"/>
  <line class="ga-s-soft" x1="178" y1="186" x2="222" y2="212"/>

  <!-- Tokens (above spine, centered y=140) — interprets situation -->
  <line class="ga-s-soft" x1="220" y1="140" x2="500" y2="140"/>
  <line class="ga-s-main ga-tk ga-tk-1" x1="240" y1="120" x2="240" y2="160"/>
  <line class="ga-s-main ga-tk ga-tk-2" x1="266" y1="120" x2="266" y2="160"/>
  <line class="ga-s-main ga-tk ga-tk-3" x1="292" y1="120" x2="292" y2="160"/>
  <line class="ga-s-main ga-tk ga-tk-4" x1="318" y1="120" x2="318" y2="160"/>
  <line class="ga-s-main ga-tk ga-tk-5" x1="344" y1="120" x2="344" y2="160"/>
  <line class="ga-s-main ga-tk ga-tk-6" x1="370" y1="120" x2="370" y2="160"/>
  <!-- Dials at y=140 -->
  <path class="ga-s-main" d="M 398,140 A 13 13 0 0 1 424,140"/>
  <line class="ga-s-main" x1="398" y1="140" x2="424" y2="140"/>
  <line class="ga-s-green ga-dial-needle ga-dial-autonomy" x1="411" y1="140" x2="411" y2="129" stroke-width="2"/>
  <circle class="ga-f-accent" cx="411" cy="140" r="2"/>
  <path class="ga-s-main" d="M 430,140 A 13 13 0 0 1 456,140"/>
  <line class="ga-s-main" x1="430" y1="140" x2="456" y2="140"/>
  <line class="ga-s-green ga-dial-needle ga-dial-disclosure" x1="443" y1="140" x2="443" y2="129" stroke-width="2"/>
  <circle class="ga-f-accent" cx="443" cy="140" r="2"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-tokens" x="340" y="100" text-anchor="middle">8 Context Tokens</text>

  <!-- Brain (below spine, centered y=220) — interprets memory/identity -->
  <rect class="ga-s-main ga-bl ga-bl-1" x="220" y="200" width="280" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-2" x="220" y="215" width="280" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-3" x="220" y="230" width="280" height="11" rx="5" fill="var(--ga-bg)"/>
  <text class="ga-lbl-stage" x="360" y="262" text-anchor="middle">3-Layer Brain</text>

  <!-- Bidirectional connector — Tokens & Brain cross-talk during interpretation -->
  <line class="ga-s-green" x1="360" y1="162" x2="360" y2="198" stroke-dasharray="3 3" opacity="0.55"/>
  <polygon class="ga-f-accent" points="360,162 356,170 364,170" opacity="0.7"/>
  <polygon class="ga-f-accent" points="360,198 356,190 364,190" opacity="0.7"/>

  <!-- Converge: Tokens-end + Brain-end → Rule Engine -->
  <line class="ga-s-soft" x1="502" y1="146" x2="700" y2="178"/>
  <line class="ga-s-soft" x1="502" y1="220" x2="700" y2="184"/>

  <!-- Interpretation label (between block and Rule Engine) -->
  <text class="ga-lbl-mono" x="600" y="172" text-anchor="middle" style="font-size:8px;fill:var(--ga-ink-2)">interpreted</text>

  <!-- Rule Engine (on spine) -->
  <polygon class="ga-s-main ga-rhombus" points="760,144 812,180 760,216 708,180" fill="var(--ga-bg)"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-rules" x="760" y="244" text-anchor="middle">Rule Engine</text>

  <!-- Output -->
  <line class="ga-out-path ga-op-1" x1="812" y1="180" x2="970" y2="120"/>
  <line class="ga-out-path ga-op-2" x1="812" y1="180" x2="970" y2="180"/>
  <line class="ga-out-path ga-op-3" x1="812" y1="180" x2="970" y2="240"/>
  <circle class="ga-out-end ga-oe-1" cx="976" cy="120" r="8"/>
  <circle class="ga-out-end ga-oe-2" cx="976" cy="180" r="8"/>
  <circle class="ga-out-end ga-oe-3" cx="976" cy="240" r="8"/>
  <text class="ga-lbl-stage" x="1000" y="124" style="font-size:10px">Delegate</text>
  <text class="ga-lbl-stage" x="1000" y="184" style="font-size:10px">Escalate</text>
  <text class="ga-lbl-stage" x="1000" y="244" style="font-size:10px">Adapt</text>
  <text class="ga-lbl-stage ga-stage-label" x="976" y="282" text-anchor="middle">AX Patterns</text>

  ${feedback ? `
  <path class="ga-feedback-path" d="M 976,242 C 976,330 340,330 340,244"/>
  <circle class="ga-feedback-dot" r="3.5"/>
  ` : ''}

  <g class="ga-traveler" style="--ga-target-y:0px;">
    <circle class="ga-f-accent" cx="80" cy="180" r="5"/>
    <circle class="ga-s-green"  cx="80" cy="180" r="9" opacity="0.3"/>
  </g>
</svg>`;
    },

    /* Pipeline-Min — Subway-style minimal pipeline (A order).
       Aesthetic: same as _tower-explorations.html FLOW + SCAN cells.
       6 stations + 3 output fan-out. One traveler. Stations flash as
       the traveler passes. No internal detail per station — that lives
       on each dedicated page. */
    'pipeline-min'(opts) {
      return `
<svg viewBox="0 0 1100 200" preserveAspectRatio="xMidYMid meet"
     style="width:100%;height:auto;max-height:280px;"
     class="ga-svg" aria-label="Context Grammar pipeline — minimal">
  <!-- Rail -->
  <line class="ga-s-main" x1="80" y1="100" x2="724" y2="100"/>

  <!-- 4 circle stations: Human, Intent, Tokens, Brain -->
  <circle class="ga-s-main ga-pm-st ga-pm-st-1" cx="80"  cy="100" r="14" fill="var(--ga-bg)"/>
  <circle class="ga-s-main ga-pm-st ga-pm-st-2" cx="240" cy="100" r="14" fill="var(--ga-bg)"/>
  <circle class="ga-s-main ga-pm-st ga-pm-st-3" cx="400" cy="100" r="14" fill="var(--ga-bg)"/>
  <circle class="ga-s-main ga-pm-st ga-pm-st-4" cx="560" cy="100" r="14" fill="var(--ga-bg)"/>

  <!-- Rules: rhombus (the 5th station, distinct shape) -->
  <polygon class="ga-s-main ga-pm-st ga-pm-st-5" points="720,86 738,100 720,114 702,100" fill="var(--ga-bg)"/>

  <!-- Ghost base lines (always visible) + green overlay paths -->
  <line class="ga-out-base" x1="738" y1="100" x2="900" y2="40"/>
  <line class="ga-out-base" x1="738" y1="100" x2="900" y2="100"/>
  <line class="ga-out-base" x1="738" y1="100" x2="900" y2="160"/>
  <line class="ga-out-path ga-op-1" x1="738" y1="100" x2="900" y2="40"  pathLength="1"/>
  <line class="ga-out-path ga-op-2" x1="738" y1="100" x2="900" y2="100" pathLength="1"/>
  <line class="ga-out-path ga-op-3" x1="738" y1="100" x2="900" y2="160" pathLength="1"/>

  <!-- 3 output endpoints -->
  <circle class="ga-out-end ga-oe-1" cx="906" cy="40"  r="14"/>
  <circle class="ga-out-end ga-oe-2" cx="906" cy="100" r="14"/>
  <circle class="ga-out-end ga-oe-3" cx="906" cy="160" r="14"/>

  <!-- Stage labels (under stations) -->
  <text class="ga-lbl-mono" x="80"  y="142" text-anchor="middle">Human</text>
  <text class="ga-lbl-mono" x="240" y="142" text-anchor="middle">Intent</text>
  <text class="ga-lbl-mono" x="400" y="142" text-anchor="middle">Tokens</text>
  <text class="ga-lbl-mono" x="560" y="142" text-anchor="middle">Brain</text>
  <text class="ga-lbl-mono" x="720" y="142" text-anchor="middle">Rules</text>

  <!-- Output labels (right of endpoints) -->
  <text class="ga-lbl-mono" x="930" y="44">Delegate</text>
  <text class="ga-lbl-mono" x="930" y="104">Escalate</text>
  <text class="ga-lbl-mono" x="930" y="164">Adapt</text>

  <!-- Traveler dot -->
  <circle class="ga-f-accent ga-pm-traveler" cx="80" cy="100" r="6"/>
</svg>`;
    },

    /* Pipeline-Vertical — top-to-bottom layout for mobile */
    'pipeline-vertical'(opts) {
      const feedback = opts.feedback !== 'false';
      return `
<svg viewBox="0 0 320 700" preserveAspectRatio="xMidYMid meet"
     style="width:100%;height:auto;"
     class="ga-svg" aria-label="Context Grammar pipeline — vertical">
  <!-- Spine -->
  <line class="ga-s-soft" x1="160" y1="48" x2="160" y2="618" stroke-dasharray="3 4"/>

  <!-- Human -->
  <circle class="ga-s-main ga-stage-human" cx="160" cy="48" r="11" fill="var(--ga-bg)"/>
  <path   class="ga-s-main" d="M 145,80 Q 160,66 175,80" fill="none"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-human" x="184" y="52" dominant-baseline="middle">Human</text>

  <!-- Intent -->
  <circle class="ga-f-accent ga-intent-core" cx="160" cy="136" r="7"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-intent" x="184" y="140" dominant-baseline="middle">Intent</text>

  <!-- Tokens -->
  <line class="ga-s-soft" x1="120" y1="222" x2="200" y2="222"/>
  <line class="ga-s-main ga-tk ga-tk-1" x1="122" y1="208" x2="122" y2="236"/>
  <line class="ga-s-main ga-tk ga-tk-2" x1="135" y1="208" x2="135" y2="236"/>
  <line class="ga-s-main ga-tk ga-tk-3" x1="148" y1="208" x2="148" y2="236"/>
  <line class="ga-s-main ga-tk ga-tk-4" x1="161" y1="208" x2="161" y2="236"/>
  <line class="ga-s-main ga-tk ga-tk-5" x1="174" y1="208" x2="174" y2="236"/>
  <line class="ga-s-main ga-tk ga-tk-6" x1="187" y1="208" x2="187" y2="236"/>
  <!-- Mini dials -->
  <path class="ga-s-main" d="M 126,258 A 9 9 0 0 1 144,258"/>
  <line class="ga-s-main" x1="126" y1="258" x2="144" y2="258"/>
  <line class="ga-s-green ga-dial-needle ga-dial-autonomy" x1="135" y1="258" x2="135" y2="251" stroke-width="1.5"/>
  <circle class="ga-f-accent" cx="135" cy="258" r="2"/>
  <path class="ga-s-main" d="M 152,258 A 9 9 0 0 1 170,258"/>
  <line class="ga-s-main" x1="152" y1="258" x2="170" y2="258"/>
  <line class="ga-s-green ga-dial-needle ga-dial-disclosure" x1="161" y1="258" x2="161" y2="251" stroke-width="1.5"/>
  <circle class="ga-f-accent" cx="161" cy="258" r="2"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-tokens" x="184" y="234" dominant-baseline="middle">8 Tokens · 6+2</text>

  <!-- Brain (3 flat rects) -->
  <rect class="ga-s-main ga-bl ga-bl-1" x="120" y="326" width="80" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-2" x="120" y="342" width="80" height="11" rx="5" fill="var(--ga-bg)"/>
  <rect class="ga-s-main ga-bl ga-bl-3" x="120" y="358" width="80" height="11" rx="5" fill="var(--ga-bg)"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-brain" x="212" y="344" dominant-baseline="middle">3-Layer Brain</text>

  <!-- Rule Engine -->
  <polygon class="ga-s-main ga-rhombus" points="160,436 196,468 160,500 124,468" fill="var(--ga-bg)"/>
  <text class="ga-lbl-stage ga-stage-label ga-ll-rules" x="210" y="470" dominant-baseline="middle">Rule Engine</text>

  <!-- Ghost base lines (always visible) -->
  <line class="ga-out-base" x1="160" y1="500" x2="52"  y2="574"/>
  <line class="ga-out-base" x1="160" y1="500" x2="160" y2="578"/>
  <line class="ga-out-base" x1="160" y1="500" x2="268" y2="574"/>
  <!-- 3 output paths fan out from the BOTTOM corner of the rhombus (160,500) -->
  <line class="ga-out-path ga-op-1" x1="160" y1="500" x2="52"  y2="574" pathLength="1"/>
  <line class="ga-out-path ga-op-2" x1="160" y1="500" x2="160" y2="578" pathLength="1"/>
  <line class="ga-out-path ga-op-3" x1="160" y1="500" x2="268" y2="574" pathLength="1"/>
  <circle class="ga-out-end ga-oe-1" cx="47"  cy="580" r="8"/>
  <circle class="ga-out-end ga-oe-2" cx="160" cy="584" r="8"/>
  <circle class="ga-out-end ga-oe-3" cx="273" cy="580" r="8"/>
  <text class="ga-lbl-stage" x="47"  y="604" text-anchor="middle">Delegate</text>
  <text class="ga-lbl-stage" x="160" y="608" text-anchor="middle">Escalate</text>
  <text class="ga-lbl-stage" x="273" y="604" text-anchor="middle">Adapt</text>

  ${feedback ? `
  <path class="ga-feedback-path" d="M 47,580 C 10,580 10,48 146,48"/>
  <circle class="ga-feedback-dot-v" r="3"/>
  <text class="ga-lbl-mono" x="28" y="320" text-anchor="middle" style="font-size:8px;fill:var(--ga-green);writing-mode:vertical-rl">Learning · Brain L2</text>
  ` : ''}

  <g class="ga-traveler-v" style="--ga-target-x:0px;">
    <circle class="ga-f-accent" cx="160" cy="48" r="5"/>
    <circle class="ga-s-green"  cx="160" cy="48" r="9" opacity="0.3"/>
  </g>
</svg>`;
    }
  };

  /* ─── Helpers ─── */

  /* Setup randomized output for any SVG with .ga-traveler and 3-output structure */
  GA.setupRandomOutput = function (root, opts) {
    const traveler = root.querySelector('.ga-traveler');
    if (!traveler) return;

    const weights = (opts && opts.weights) || { delegate: 0.5, adapt: 0.3, escalate: 0.2 };
    const targets = (opts && opts.targets) || {
      delegate: -60,
      escalate: 0,
      adapt:    60
    };

    function pick() {
      const r = Math.random();
      let acc = 0;
      for (const k of Object.keys(weights)) {
        acc += weights[k];
        if (r < acc) return { output: k, y: targets[k] };
      }
      return { output: 'escalate', y: 0 };
    }

    function apply(p) {
      root.dataset.output = p.output;
      traveler.style.setProperty('--ga-target-y', p.y + 'px');
    }

    apply(pick());
    traveler.addEventListener('animationiteration', () => apply(pick()));
  };

  /* Rule-engine / ax-patterns: timer-based random output rotation.
     No traveler dot — just the data-output attribute drives which path lights. */
  GA.setupRandomRuleEngine = function (root, opts) {
    opts = opts || {};
    const weights = opts.weights || { delegate: 0.5, adapt: 0.3, escalate: 0.2 };
    const interval = opts.interval || 6000;
    function pick() {
      const r = Math.random();
      let acc = 0;
      for (const k of Object.keys(weights)) {
        acc += weights[k];
        if (r < acc) return k;
      }
      return 'escalate';
    }
    root.dataset.output = pick();
    setInterval(() => { root.dataset.output = pick(); }, interval);
  };

  /* Vertical pipeline: traveler fans out horizontally at the bottom */
  GA.setupRandomOutputVertical = function (root) {
    const traveler = root.querySelector('.ga-traveler-v');
    if (!traveler) return;
    const weights = { delegate: 0.5, adapt: 0.3, escalate: 0.2 };
    const targets = { delegate: -113, escalate: 0, adapt: 113 };

    function pick() {
      const r = Math.random();
      let acc = 0;
      for (const k of Object.keys(weights)) {
        acc += weights[k];
        if (r < acc) return { output: k, x: targets[k] };
      }
      return { output: 'escalate', x: 0 };
    }

    function apply(p) {
      root.dataset.output = p.output;
      traveler.style.setProperty('--ga-target-x', p.x + 'px');
    }

    apply(pick());
    traveler.addEventListener('animationiteration', () => apply(pick()));
  };

  /* ─── Slot manifest resolution ───
     If an element has data-ga-slot, look up its target component name in
     window.GA_SLOTS (defined in ga-slots.js). Set data-ga so the rest of
     the framework treats it the same as a directly-declared component. */
  GA.resolveSlots = function () {
    const slots = (typeof window !== 'undefined' && window.GA_SLOTS) || {};
    document.querySelectorAll('[data-ga-slot]').forEach(el => {
      const slotName = el.dataset.gaSlot;
      const componentName = slots[slotName];
      if (!componentName) {
        console.warn('Green Animation: slot "' + slotName + '" not registered in window.GA_SLOTS');
        return;
      }
      // Don't overwrite an explicit data-ga
      if (!el.dataset.ga) el.dataset.ga = componentName;
    });
  };

  /* ─── Main init ─── */
  GA.init = function () {
    GA.resolveSlots();
    document.querySelectorAll('[data-ga]').forEach(el => {
      const type = el.dataset.ga;
      const builder = GA.components[type];
      if (!builder) {
        console.warn('Green Animation: unknown component "' + type + '"');
        return;
      }

      // Hydrate
      el.classList.add('ga');
      el.classList.add('ga-' + type);
      el.innerHTML = builder({ ...el.dataset });

      // Skip random-output setup in interactive mode — the user drives.
      const isInteractive = el.dataset.mode === 'interactive';

      // Post-injection setup based on data attrs
      if (!isInteractive && (el.dataset.random === 'true' || el.dataset.random === undefined)) {
        if (type === 'pipeline')              GA.setupRandomOutput(el);
        else if (type === 'pipeline-b')       GA.setupRandomOutput(el, { targets: { delegate: -60, escalate: 0, adapt: 60 } });
        else if (type === 'pipeline-vertical') GA.setupRandomOutputVertical(el);
        else if (type === 'pipeline-min')     GA.setupRandomRuleEngine(el, { interval: 9000 });
        else if (type === 'rule-engine')      GA.setupRandomRuleEngine(el, { interval: 6000 });
        else if (type === 'ax-patterns')      GA.setupRandomRuleEngine(el, { interval: 5000 });
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', GA.init);
  } else {
    GA.init();
  }

  global.GA = GA;
})(window);
