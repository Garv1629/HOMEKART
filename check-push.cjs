const { spawnSync } = require('child_process');
const fs = require('fs');

const log = [];
function git(args) {
  log.push(`\n$ git ${args.join(' ')}`);
  const res = spawnSync('git', args, { cwd: __dirname, shell: false });
  if (res.stdout) log.push(res.stdout.toString());
  if (res.stderr) log.push(res.stderr.toString());
  log.push(`exit code: ${res.status}`);
  return res;
}

git(['status']);
git(['remote', '-v']);
git(['log', '-n', '2', '--oneline']);
git(['push', '-u', 'origin', 'main']);

fs.writeFileSync('git-status.txt', log.join('\n'), 'utf8');
console.log(log.join('\n'));
