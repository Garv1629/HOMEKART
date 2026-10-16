const fs = require('fs');
try {
  require('./verify-flows.cjs');
  fs.writeFileSync('flows-result.txt', 'VERIFY FLOWS PASSED CLEANLY');
} catch (e) {
  fs.writeFileSync('flows-result.txt', 'VERIFY FLOWS ERROR: ' + (e.stack || e.message));
}
