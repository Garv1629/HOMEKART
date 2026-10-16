const fs = require('fs');
['find-exit.cjs', 'test-runner.cjs', 'verify-contact-audit.cjs', 'sweep.cjs'].forEach(f => {
  try {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  } catch (e) {}
});
