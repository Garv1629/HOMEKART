const { execSync } = require('child_process');
try {
  const output = execSync('npx vite build', { encoding: 'utf-8' });
  console.log('BUILD SUCCESS:');
  console.log(output);
} catch (err) {
  console.error('BUILD ERROR:');
  console.error(err.stdout || err.message);
  process.exit(1);
}
