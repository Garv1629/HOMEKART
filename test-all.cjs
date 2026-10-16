const fs = require('fs');
const path = require('path');

console.log('========================================================');
console.log('HOMEKART REALTY — COMPLETE VERIFICATION SUITE');
console.log('========================================================\n');

const logFile = path.join(__dirname, 'test-run.log');
fs.writeFileSync(logFile, 'TEST SUITE RUN STARTED\n');
function logSuite(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

try {
  logSuite('[1/12] Luxury Loader Tests...');
  require('./verify-loader.cjs');
  logSuite('[2/12] Card Corners Removal Tests...');
  require('./verify-smit-cards.cjs');
  logSuite('[3/12] Checkboxes Tests...');
  require('./verify-checkboxes.cjs');
  logSuite('[4/12] Buttons Tests...');
  require('./test-buttons.cjs');
  logSuite('[5/12] Consultation Tests...');
  require('./verify-consultation.cjs');
  logSuite('[6/12] Toggles Tests...');
  require('./verify-toggles.cjs');
  logSuite('[7/12] Inputs Tests...');
  require('./verify-inputs.cjs');
  logSuite('[8/12] Wheel Tests...');
  require('./verify-wheel.cjs');
  logSuite('[9/12] Animated Forms Tests...');
  require('./verify-animated-forms.cjs');
  logSuite('[10/12] Location Tooltip Tests...');
  require('./verify-location-tooltip.cjs');
  logSuite('[11/12] Contact Page Usability Tests...');
  require('./verify-contact.cjs');
  logSuite('[12/13] User Flows, Search & Filter Verification...');
  require('./verify-flows.cjs');
  logSuite('[13/14] Full Regression & Breakpoint Verification...');
  require('./regression-suite.cjs');
  logSuite('[14/15] Deep Multi-Device Responsive & Layout Verification...');
  require('./verify-responsive-deep.cjs');
  logSuite('[15/15] Usability Issue 3 (Initiate Dialogue Title Case) Verification...');
  require('./verify-issue3-button.cjs');
  logSuite('ALL 15 SUITES PASSED CLEANLY (100% SUCCESS)!');
  process.exit(0);
} catch (err) {
  try {
    fs.writeFileSync(path.join(__dirname, 'test-failure.log'), err.stack || err.message);
  } catch {}
  logSuite('FAILED: ' + (err.stack || err.message));
  process.exit(1);
}
