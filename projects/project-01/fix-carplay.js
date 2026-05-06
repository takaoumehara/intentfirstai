const fs = require('fs');
const path = '/Users/takao/Documents/00_Product_Develpment/Substack/Portfolio/intentfirst/ui-screens/p1-v2/animations/anim-care-collapse.html';
let html = fs.readFileSync(path, 'utf8');

// 1. The Daily Icon
html = html.replace(
  'background: linear-gradient(135deg, #3a3240, #1f1b24 60%);',
  'background-image: url("https://upload.wikimedia.org/wikipedia/en/2/23/The_Daily_logo.jpg"); background-size: cover; background-position: center;'
);
html = html.replace('content: "NYT";', 'display: none;');

// 2. Scene 2 layout
html = html.replace(
  '.s2{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 22px;\n    padding: 36px;',
  '.s2{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 30px;\n    padding: 36px;'
);
html = html.replace('</style>', `
  .s2-body{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    width: 100%;
  }
  .s2-caller{
    display: flex;
    align-items: center;
    gap: 24px;
    text-align: left;
  }
</style>`);

// Replace Scene 2 HTML
html = html.replace(
  /<div class="big-avatar">NC<\/div>[\s\S]*?<div style="text-align:center;">/,
  '<div class="s2-body">\n            <div class="s2-caller">\n              <div class="big-avatar">NC</div>\n              <div>'
);
html = html.replace(
  /<div class="s2-state">CALLING…<\/div>\n\s*<\/div>/,
  '<div class="s2-state">CALLING…</div>\n              </div>\n            </div>'
);
html = html.replace(
  /<\/div>\n\s*<div class="voice-confirm-overlay"/,
  '</div>\n          </div>\n          <div class="voice-confirm-overlay"'
);

// 3. Remove 900px media query
html = html.replace(
  /@media \(max-width: 900px\){\n\s*\.s1-grid, \.split{ grid-template-columns: 1fr; }\n\s*\.pane\.call{ border-right: none; border-bottom: 1px solid var\(--car-line\); }\n\s*}/,
  ''
);

// 4. Map realism & Action Chips
html = html.replace('.map-block{', '.map-block{ display: none; ');
html = html.replace('.map-park{', '.map-park{ display: none; ');
html = html.replace('.map-water{', '.map-water{ display: none; ');

html = html.replace(
  /background: #0d1015;/g,
  "background-image: url('https://a.basemaps.cartocdn.com/dark_nolabels/14/2620/6331.png'); background-size: cover; background-position: center;"
);
html = html.replace(
  /background: #0f1218;/g,
  "background-image: url('https://a.basemaps.cartocdn.com/dark_nolabels/14/2620/6331.png'); background-size: cover; background-position: center;"
);

// Map routes styling
html = html.replace(
  /\.map-route-active{([\s\S]*?)}/,
  `.map-route-active{
    fill: none;
    stroke: #5e97f6;
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));
  }
  .map-route-inner{
    fill: none;
    stroke: #8ab4f8;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`
);
html = html.replace(
  /\.map-route-muted{([\s\S]*?)}/,
  `.map-route-muted{
    fill: none;
    stroke: #5f6368;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .map-route-shadow{
    fill: none;
    stroke: #202124;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
  }`
);

// Scene 4 Action Chips
html = html.replace(
  /\.actions{\n\s*display: flex; flex-direction: column;\n\s*gap: 9px;\n\s*margin-top: 4px;\n\s*}/,
  `.actions{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 4px;
  }`
);
html = html.replace(
  /\.action{\n\s*display: flex;\n\s*gap: 14px;\n\s*align-items: flex-start;\n\s*padding: 12px 16px;/,
  `.action{
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 8px 12px;`
);

// Map Action chip to span 2 cols and be horizontal
html = html.replace(
  /\.action--map{\n\s*flex-direction: column;\n\s*gap: 10px;\n\s*}/,
  `.action--map{
    grid-column: span 2;
    flex-direction: row;
    align-items: stretch;
    padding: 0;
    overflow: hidden;
  }`
);
html = html.replace(
  /\.action--map \.action-head{\n\s*display: flex;\n\s*gap: 14px;\n\s*align-items: flex-start;\n\s*width: 100%;\n\s*}/,
  `.action--map .action-head{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 14px 16px;
    width: 210px;
    flex-shrink: 0;
  }`
);
html = html.replace(
  /\.action--map \.abstract-map{\n\s*width: 100%;\n\s*height: 140px;\n\s*aspect-ratio: 340 \/ 180;\n\s*min-height: 100px;\n\s*}/,
  `.action--map .abstract-map{
    flex: 1;
    height: auto;
    border-radius: 0 12px 12px 0;
    min-height: 120px;
  }`
);
html = html.replace(/@media \(min-width: 640px\){\n\s*\.action--map \.abstract-map{ height: 160px; }\n\s*}/, '');

// Scene 6 Typography
html = html.replace(
  /\.eta-big{\n\s*font-family: var\(--car-sans\);\n\s*font-size: 60px;/,
  `.eta-big{
    font-family: var(--car-sans);
    font-size: 40px;`
);
html = html.replace(
  /\.eta-big \.unit{\n\s*font-family: var\(--car-mono\);\n\s*color: var\(--car-text-dim\);\n\s*font-size: 28px;/,
  `.eta-big .unit{
    font-family: var(--car-mono);
    color: var(--car-text-dim);
    font-size: 20px;`
);

// Inject map-route-shadow and inner paths
// Scene 1 Active Route
html = html.replace(
  /<path d="M 36 128 C 90 112, 150 120, 210 108 S 280 90, 300 78"[\s\S]*?fill="none" stroke="#30c969" stroke-width="4"[\s\S]*?stroke-linecap="round" stroke-linejoin="round"[\s\S]*?style="filter:drop-shadow\(0 0 6px rgba\(48,201,105,0\.55\)\);"\/>/,
  `<path class="map-route-shadow" d="M 36 128 C 90 112, 150 120, 210 108 S 280 90, 300 78"/>
   <path d="M 36 128 C 90 112, 150 120, 210 108 S 280 90, 300 78" class="map-route-active"/>
   <path d="M 36 128 C 90 112, 150 120, 210 108 S 280 90, 300 78" class="map-route-inner"/>`
);

// Scene 4 & 6 Active Route
html = html.replace(
  /<path class="map-route-active"\s*d="M 28 150 C 80 140, 110 120, 150 110 S 230 84, 300 60"\/>/g,
  `<path class="map-route-shadow" d="M 28 150 C 80 140, 110 120, 150 110 S 230 84, 300 60"/>
   <path class="map-route-active" d="M 28 150 C 80 140, 110 120, 150 110 S 230 84, 300 60"/>
   <path class="map-route-inner" d="M 28 150 C 80 140, 110 120, 150 110 S 230 84, 300 60"/>`
);
html = html.replace(
  /<path class="map-route-active"\s*d="M 60 220 C 120 200, 180 160, 260 140 S 420 100, 520 60"\/>/g,
  `<path class="map-route-shadow" d="M 60 220 C 120 200, 180 160, 260 140 S 420 100, 520 60"/>
   <path class="map-route-active" d="M 60 220 C 120 200, 180 160, 260 140 S 420 100, 520 60"/>
   <path class="map-route-inner" d="M 60 220 C 120 200, 180 160, 260 140 S 420 100, 520 60"/>`
);

fs.writeFileSync(path, html);
console.log("Updated HTML successfully.");
