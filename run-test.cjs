const fs = require('fs');

const logFile = fs.createWriteStream('test-results.txt');
process.stdout.write = (chunk) => {
  logFile.write(chunk);
  return true;
};
process.stderr.write = (chunk) => {
  logFile.write(chunk);
  return true;
};
console.log = (...args) => {
  logFile.write(args.join(' ') + '\n');
};
console.error = (...args) => {
  logFile.write(args.join(' ') + '\n');
};

try {
  require('./test-all.cjs');
  logFile.write('\nRUNNER FINISHED SUCCESS\n');
} catch (e) {
  logFile.write('\nRUNNER CAUGHT: ' + (e.stack || e.message) + '\n');
}
