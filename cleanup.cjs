const fs = require('fs');
['test-all.cjs', 'test-direct.cjs', 'test-runner.cjs'].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});
console.log('Cleaned temporary files');
