console.log('STARTING DIRECT TEST RUNNER');
try {
  require('./test-all.cjs');
} catch (e) {
  require('fs').writeFileSync('./test-direct-error.log', e.stack || e.message);
  console.error('ERROR in test-direct:', e);
}
