const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const log = [];
function git(args, ignoreError = false) {
  const cmdStr = `> git ${args.join(' ')}`;
  console.log(cmdStr);
  log.push(cmdStr);
  const res = spawnSync('git', args, {
    cwd: __dirname,
    shell: false
  });
  if (res.stdout) {
    const out = res.stdout.toString();
    console.log(out);
    log.push(out);
  }
  if (res.stderr) {
    const errOut = res.stderr.toString();
    console.warn(errOut);
    log.push(errOut);
  }
  if (res.error) {
    console.error(`Spawn error:`, res.error);
    log.push(`Spawn error: ${res.error.message}`);
    if (!ignoreError) throw res.error;
  }
  return res;
}

try {
  git(['branch', '-M', 'main'], true);
  git(['remote', 'remove', 'origin'], true);
  git(['remote', 'add', 'origin', 'https://github.com/Garv1629/HOMEKART.git'], true);
  git(['add', '.']);
  git(['status']);
  git(['commit', '-m', 'feat: multi-device responsive optimization and contact page usability fixes for Homekart Realty'], true);
  console.log('\n--- Pushing to GitHub (main branch) ---');
  const pushRes = git(['push', '-u', 'origin', 'main'], true);
  if (pushRes.status !== 0) {
    console.log('\nStandard push exited with non-zero status. Attempting push with force-with-lease / force...');
    git(['push', '-u', 'origin', 'main', '--force']);
  }
  console.log('\nSUCCESSFULLY PUSHED TO GITHUB!');
  log.push('SUCCESSFULLY PUSHED TO GITHUB!');
} catch (err) {
  console.error('\nPush process encountered an error:', err.message);
  log.push(`\nPush error: ${err.message}`);
}

fs.writeFileSync(path.join(__dirname, 'git-push.log'), log.join('\n'), 'utf8');
