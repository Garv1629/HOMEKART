const { spawnSync } = require('child_process');
const fs = require('fs');

const filesToRemove = ['check-push.cjs', 'git-push.cjs', 'git-status.txt'];
for (const f of filesToRemove) {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
  }
}

spawnSync('git', ['add', '.'], { stdio: 'inherit' });
spawnSync('git', ['commit', '-m', 'chore: clean package.json and repository tree'], { stdio: 'inherit' });
spawnSync('git', ['push', 'origin', 'main'], { stdio: 'inherit' });
fs.unlinkSync('sync.cjs');
