const fs = require('fs');

const p1Path = '/Users/takao/Documents/00_Product_Develpment/Substack/Portfolio/intentfirst/projects/project-01/p1-scroll.html';
const compPath = '/Users/takao/Documents/00_Product_Develpment/Substack/Portfolio/intentfirst/ui-screens/p1-v2/s9a-carplay-composite.html';

let p1Html = fs.readFileSync(p1Path, 'utf8');
const startMarker = '  <!-- Animation controls (parent-page typography, calls iframe.__carScene) -->';
const endMarker = '<!-- ───── Approvals pending — what cascade does ───── -->';

const startIndex = p1Html.indexOf(startMarker);
const endIndex = p1Html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  let extracted = p1Html.substring(startIndex, endIndex);
  
  // Remove the block from p1-scroll.html
  p1Html = p1Html.substring(0, startIndex) + '\n\n' + p1Html.substring(endIndex);
  fs.writeFileSync(p1Path, p1Html);

  // Modify extracted code to work within s9a-carplay-composite.html
  extracted = extracted.replace('.care-controls{', `
  .care-controls {
    position: absolute;
    bottom: 6%;
    right: 4%;
    z-index: 100;
    max-width: auto;
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    transform: scale(1.3);
    transform-origin: bottom right;
`);
  extracted = extracted.replace("var frame = document.getElementById('care-anim-frame');", "var frame = document.getElementById('inner-ui-frame');");
  
  // Inject into s9a-carplay-composite.html
  let compHtml = fs.readFileSync(compPath, 'utf8');
  compHtml = compHtml.replace('</body>', extracted + '\n</body>');
  fs.writeFileSync(compPath, compHtml);
  console.log("Migration successful.");
} else {
  console.log("Could not find markers.");
}
