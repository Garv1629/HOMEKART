const fs = require('fs');
const path = require('path');

const suites = [
  ['Loader', './verify-loader.cjs'],
  ['Smit Cards', './verify-smit-cards.cjs'],
  ['Checkboxes', './verify-checkboxes.cjs'],
  ['Buttons', './test-buttons.cjs'],
  ['Consultation', './verify-consultation.cjs'],
  ['Toggles', './verify-toggles.cjs'],
  ['Inputs', './verify-inputs.cjs'],
  ['Wheel', './verify-wheel.cjs'],
  ['Animated Forms', './verify-animated-forms.cjs'],
  ['Location Tooltip', './verify-location-tooltip.cjs'],
  ['Contact', './verify-contact.cjs'],
  ['Flows', './verify-flows.cjs'],
  ['Regression', './regression-suite.cjs'],
  ['Responsive Deep', './verify-responsive-deep.cjs'],
];

const results = [];
for (const [name, file] of suites) {
  try {
    require(file);
    results.push(`[PASS] ${name}`);
  } catch (err) {
    results.push(`[FAIL] ${name}: ${err.message}\n${err.stack}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'debug-run-results.txt'), results.join('\n\n'));
console.log('Finished debug test execution. Results written to debug-run-results.txt');
