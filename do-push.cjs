const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'push-output.log');
fs.writeFileSync(logFile, 'PUSH SCRIPT STARTED\n', 'utf8');

function writeLog(msg) {
  fs.appendFileSync(logFile, msg + '\n', 'utf8');
  console.log(msg);
}

function run(cmd) {
  writeLog(`\n$ ${cmd}`);
  try {
    const out = execSync(cmd, {
      cwd: __dirname,
      encoding: 'utf8',
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      timeout: 15000
    });
    writeLog(out || '(no output)');
    return out;
  } catch (err) {
    writeLog(`ERROR: ${err.message}`);
    if (err.stdout) writeLog(`STDOUT: ${err.stdout}`);
    if (err.stderr) writeLog(`STDERR: ${err.stderr}`);
    return null;
  }
}

try {
  run('git branch -M main');
  run('git add .');
  run('git status --short');
  run('git commit -m "feat: multi-device responsive optimization, contact usability polish, and luxury design for Homekart Realty"');
  writeLog('\n--- ATTEMPTING GIT PUSH ---');
  run('git push -u origin main');
  writeLog('\nALL PUSH OPERATIONS COMPLETED');
} catch (globalErr) {
  writeLog(`GLOBAL SCRIPT ERROR: ${globalErr.stack || globalErr.message}`);
}
