const { execFileSync } = require('child_process');
const path = require('path');
const viteBin = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

try {
  console.log('Building project...');
  const out = execFileSync(process.execPath, [viteBin, 'build'], {
    cwd: __dirname,
    stdio: 'pipe',
  });
  console.log('Build output:\n' + out.toString());
  console.log('BUILD_VERIFIED_SUCCESSFULLY');
} catch (err) {
  console.error('Build failed:', err.message);
  if (err.stdout) console.log('Stdout:', err.stdout.toString());
  if (err.stderr) console.error('Stderr:', err.stderr.toString());
  process.exit(1);
}
