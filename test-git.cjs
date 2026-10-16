const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'test-git.log');
try {
  const res = spawnSync('git', ['status'], { cwd: __dirname, shell: true });
  fs.writeFileSync(logPath, 'CWD: ' + process.cwd() + '\n__dirname: ' + __dirname + '\nStatus with shell:true:\n' + (res.stdout ? res.stdout.toString() : '') + (res.stderr ? res.stderr.toString() : ''));
} catch (e) {
  fs.writeFileSync(logPath, 'Error: ' + e.message);
}
