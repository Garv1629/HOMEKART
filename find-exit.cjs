const fs = require('fs');
const path = require('path');

const artifactDir = 'C:/Users/GARV/.gemini/antigravity-ide/brain/026cd5d0-7cc9-4009-87d5-421752f2c395';
const logFile = path.join(artifactDir, 'progress.txt');

function mark(msg) {
  fs.appendFileSync(logFile, msg + '\n', 'utf8');
}

fs.writeFileSync(logFile, 'STARTING TEST SUITES\n', 'utf8');

const suites = [
  './verify-loader.cjs',
  './verify-smit-cards.cjs',
  './verify-checkboxes.cjs',
  './test-buttons.cjs',
  './verify-consultation.cjs',
  './verify-toggles.cjs',
  './verify-inputs.cjs',
  './verify-wheel.cjs',
  './verify-animated-forms.cjs',
  './verify-location-tooltip.cjs',
  './verify-contact.cjs'
];

for (const suite of suites) {
  mark('BEGIN: ' + suite);
  try {
    require(suite);
    mark('SUCCESS: ' + suite);
  } catch (err) {
    mark('THREW: ' + suite + ' -> ' + (err.stack || err.message));
    break;
  }
}
mark('ALL SUITES COMPLETED');
