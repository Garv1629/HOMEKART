const fs = require('fs');
['run-test.cjs', 'test-contact-only.cjs', 'test-flows-only.cjs'].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});
console.log('Temporary runners removed');
