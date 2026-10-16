const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/data/properties.js', 'utf-8');
const urls = [];
const matches = content.matchAll(/image:\s*'([^']+)'/g);
for (const match of matches) {
  urls.push(match[1]);
}

console.log('Found', urls.length, 'images to test');

urls.forEach((url, i) => {
  https.get(url, (res) => {
    console.log(`Image ${i}: Status ${res.statusCode} - ${url}`);
  }).on('error', (err) => {
    console.log(`Image ${i}: Error ${err.message} - ${url}`);
  });
});
