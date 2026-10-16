const fs = require('fs');
const path = require('path');
const https = require('https');
const urlModule = require('url');

console.log('================================================================');
console.log('HOMEKART REALTY — DEEP MEDIA & IMAGE ASSET AUDIT');
console.log('================================================================\n');

// 1. Gather all URLs from all JS, JSX, CSS, HTML files
function getFiles(dir, exts = ['.js', '.jsx', '.css', '.html']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === 'dist' || file.startsWith('.')) return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else {
      if (exts.some(ext => file.endsWith(ext))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const allFiles = getFiles(__dirname);
const urlRegex = /https?:\/\/[^\s'")`]+/g;
const uniqueUrls = new Map(); // url -> Array of occurrences { file, line }

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineIdx) => {
    const matches = line.match(urlRegex);
    if (matches) {
      matches.forEach(u => {
        // Clean trailing punctuation or delimiters
        let cleanUrl = u.replace(/[;,\)\}\]]+$/, '').trim();
        // We only care about media/image URLs or unsplash
        if (cleanUrl.includes('images.unsplash.com') || cleanUrl.match(/\.(jpg|jpeg|png|webp|svg|gif)($|\?)/i)) {
          if (!uniqueUrls.has(cleanUrl)) {
            uniqueUrls.set(cleanUrl, []);
          }
          uniqueUrls.get(cleanUrl).push({
            file: path.relative(__dirname, file),
            line: lineIdx + 1
          });
        }
      });
    }
  });
});

console.log(`Discovered ${uniqueUrls.size} unique image/media asset URLs across project files.\n`);

// 2. Perform real HTTPS verification for all URLs
async function checkUrl(testUrl) {
  return new Promise((resolve) => {
    try {
      const parsed = urlModule.parse(testUrl);
      const req = https.request({
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        path: parsed.path,
        method: 'HEAD',
        timeout: 8000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        // Some CDNs disallow HEAD, try GET if 405
        if (res.statusCode === 405) {
          https.get(testUrl, (getRes) => {
            getRes.resume(); // consume stream
            resolve({ url: testUrl, statusCode: getRes.statusCode, ok: getRes.statusCode >= 200 && getRes.statusCode < 400 });
          }).on('error', (err) => {
            resolve({ url: testUrl, statusCode: 0, error: err.message, ok: false });
          });
        } else {
          res.resume();
          resolve({ url: testUrl, statusCode: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
        }
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ url: testUrl, statusCode: 0, error: 'Timeout after 8s', ok: false });
      });

      req.on('error', (err) => {
        resolve({ url: testUrl, statusCode: 0, error: err.message, ok: false });
      });

      req.end();
    } catch (e) {
      resolve({ url: testUrl, statusCode: 0, error: e.message, ok: false });
    }
  });
}

async function runAudit() {
  console.log('--- 1. Testing Network Health for Every Image URL ---');
  const urlList = Array.from(uniqueUrls.keys());
  let passedUrls = 0;
  let failedUrls = [];

  // Run in chunks of 5 for safety
  for (let i = 0; i < urlList.length; i += 5) {
    const chunk = urlList.slice(i, i + 5);
    const results = await Promise.all(chunk.map(checkUrl));
    results.forEach(res => {
      const occurrences = uniqueUrls.get(res.url);
      const locStr = occurrences ? occurrences.map(o => `${o.file}:${o.line}`).join(', ') : 'unknown';
      if (res.ok) {
        passedUrls++;
        console.log(`✓ [${res.statusCode}] ${res.url.slice(0, 70)}... (${occurrences ? occurrences.length : 1} refs)`);
      } else {
        failedUrls.push({ ...res, occurrences });
        console.error(`✗ [${res.statusCode || 'ERR'}] ${res.url} — ${res.error || 'HTTP ' + res.statusCode} at ${locStr}`);
      }
    });
  }

  console.log(`\nURL Verification Result: ${passedUrls}/${urlList.length} passed.`);

  // 3. Inspect JSX <img> tags
  console.log('\n--- 2. Auditing <img> JSX Tags for Alt, Loading, and Fallback ---');
  const jsxFiles = allFiles.filter(f => f.endsWith('.jsx'));
  let totalImgTags = 0;
  let missingAlt = [];
  let lazyOnHero = [];

  jsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relFile = path.relative(__dirname, file);
    const imgMatches = content.matchAll(/<img[^>]*>/g);
    for (const match of imgMatches) {
      totalImgTags++;
      const tag = match[0];
      if (!tag.includes('alt=')) {
        missingAlt.push({ file: relFile, tag });
      }
      if (relFile.includes('Home.jsx') && tag.includes('hk-hero__bg-img') && tag.includes('loading="lazy"')) {
        lazyOnHero.push({ file: relFile, tag });
      }
    }
  });

  console.log(`Audited ${totalImgTags} <img> elements across JSX components.`);
  if (missingAlt.length > 0) {
    console.warn(`WARNING: Found ${missingAlt.length} images missing alt attribute.`);
    missingAlt.forEach(m => console.warn(`   ${m.file}: ${m.tag}`));
  } else {
    console.log('✓ All <img> elements have accessible alt attributes.');
  }

  if (lazyOnHero.length > 0) {
    console.warn(`NOTICE: Found ${lazyOnHero.length} hero images with loading="lazy" (should be eager/high priority for LCP).`);
    lazyOnHero.forEach(h => console.warn(`   ${h.file}: ${h.tag}`));
  } else {
    console.log('✓ Hero banner loading strategy verified.');
  }

  // 4. Inspect CSS Image Presentation (object-fit, aspect-ratio, container overflow)
  console.log('\n--- 3. Auditing CSS Image Presentation & Layering ---');
  const cssFiles = allFiles.filter(f => f.endsWith('.css'));
  let totalImgRules = 0;
  let missingObjectFit = [];
  let overflowIssues = [];

  cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relFile = path.relative(__dirname, file);
    const rules = content.split('}');
    rules.forEach(rule => {
      if (!rule.includes('{')) return;
      const [sel, body] = rule.split('{');
      if (!body) return;
      if (sel.includes('img') || sel.includes('image') || sel.includes('thumb') || sel.includes('media') || sel.includes('photo')) {
        totalImgRules++;
        if ((sel.includes('img') || sel.includes('image')) && !sel.includes('container') && !sel.includes('wrapper') && !sel.includes('scrim') && !sel.includes('overlay')) {
          if (!body.includes('object-fit') && (body.includes('width: 100%') || body.includes('height: 100%'))) {
            // Check if object-fit is defined
            missingObjectFit.push({ file: relFile, selector: sel.trim() });
          }
        }
      }
    });
  });

  console.log(`Audited ${totalImgRules} image-related CSS rules.`);
  console.log(`Rules with width/height but missing object-fit: ${missingObjectFit.length}`);
  missingObjectFit.forEach(m => console.log(`   ${m.file} -> ${m.selector}`));

  // 5. Audit Scrim & Z-Index Layering
  console.log('\n--- 4. Auditing Scrim & Z-Index Layering ---');
  let scrimCount = 0;
  cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relFile = path.relative(__dirname, file);
    if (content.includes('scrim') || content.includes('gradient')) {
      const scrimMatches = content.match(/\.hk-[a-zA-Z0-9_-]+scrim[^{]*\{[^}]*\}/g) || [];
      scrimMatches.forEach(sm => {
        scrimCount++;
        const hasPointerEvents = sm.includes('pointer-events: none');
        const hasZIndex = sm.includes('z-index');
        console.log(`✓ Scrim [${relFile}]: ${sm.split('{')[0].trim()} (pointer-events: none = ${hasPointerEvents}, z-index = ${hasZIndex})`);
      });
    }
  });

  console.log(`\n================================================================`);
  console.log(`MEDIA AUDIT SUMMARY:`);
  console.log(`- URLs Verified: ${passedUrls}/${urlList.length} (100% OK = ${passedUrls === urlList.length})`);
  console.log(`- Failed URLs: ${failedUrls.length}`);
  console.log(`- Missing Alt Tags: ${missingAlt.length}`);
  console.log(`- Scrim Overlays Protected: ${scrimCount}`);
  console.log(`================================================================\n`);
  
  const reportObj = {
    timestamp: new Date().toISOString(),
    totalUrls: urlList.length,
    passedUrls,
    failedUrls,
    missingAlt,
    lazyOnHero,
    missingObjectFit,
    scrimCount
  };

  fs.writeFileSync(path.join(__dirname, 'media-audit-report.json'), JSON.stringify(reportObj, null, 2));
}

runAudit();
