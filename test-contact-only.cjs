const fs = require('fs');
try {
  require('./verify-contact.cjs');
  fs.writeFileSync('contact-result.txt', 'VERIFY CONTACT PASSED CLEANLY');
} catch (e) {
  fs.writeFileSync('contact-result.txt', 'VERIFY CONTACT ERROR: ' + (e.stack || e.message));
}
