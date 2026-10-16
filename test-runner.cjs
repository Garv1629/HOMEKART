const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let log = '';
try {
  log += '=== RUNNING TEST-ALL ===\n';
  const out = execFileSync(process.execPath, [path.join(__dirname, 'test-all.cjs')], {
    cwd: __dirname,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  log += out;
} catch (e) {
  log += 'ERR:\n' + (e.stdout || '') + '\n' + (e.stderr || '') + '\n' + e.message + '\n';
}

const logPath = path.join(__dirname, 'test-log.txt');
fs.writeFileSync(logPath, log, 'utf8');
console.log('Finished writing test-log.txt');
