const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('=== AUDITING ALL IMAGES AND ASSETS IN HOMEKART REALTY ===\n');

const propFile = fs.readFileSync(path.join(__dirname, 'src/data/properties.js'), 'utf8');

const urlRegex = /https:\/\/images\.unsplash\.com\/[^\s'"]+/g;
const allUrls = Array.from(new Set(propFile.match(urlRegex) || []));

console.log(`Found ${allUrls.length} unique Unsplash asset URLs in properties.js.`);

let completed = 0;
let errors = 0;
const results = [];

allUrls.forEach((url, idx) => {
  https.get(url, (res) => {
    completed++;
    if (res.statusCode >= 200 && res.statusCode < 400) {
      results.push(`[OK ${res.statusCode}] ${url.slice(0, 70)}...`);
    } else {
      errors++;
      results.push(`[FAIL ${res.statusCode}] ${url}`);
    }
    if (completed === allUrls.length) {
      finish();
    }
  }).on('error', (err) => {
    completed++;
    errors++;
    results.push(`[ERR] ${err.message} - ${url}`);
    if (completed === allUrls.length) {
      finish();
    }
  });
});

function finish() {
  console.log(`\nChecked ${completed} assets. Success: ${completed - errors}, Failed: ${errors}`);
  if (errors > 0) {
    console.error('FAIL: Some images returned broken statuses!');
    results.filter(r => r.includes('FAIL') || r.includes('ERR')).forEach(r => console.error(r));
    process.exit(1);
  } else {
    console.log('SUCCESS: All image assets returned HTTP 200 OK!');
    process.exit(0);
  }
}
