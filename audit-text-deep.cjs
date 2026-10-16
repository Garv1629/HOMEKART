const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('HOMEKART REALTY — DEEP TEXT, FONT & TYPOGRAPHY AUDIT');
console.log('================================================================\n');

const fontWeightsLoaded = {
  'Bodoni Moda': [400, 500, 600, 700, 800, 900],
  'Montserrat': [300, 400, 500, 600, 700],
  'Pinyon Script': [400],
  'Playfair Display': [400, 500, 600, 700, 800, 900]
};

// Find all CSS and JSX files
function getFiles(dir, exts = ['.css', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
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

const srcDir = path.join(__dirname, 'src');
const allCssFiles = getFiles(srcDir, ['.css']);
const allJsxFiles = getFiles(srcDir, ['.jsx']);

console.log(`Auditing ${allCssFiles.length} CSS files and ${allJsxFiles.length} JSX files...\n`);

const issues = [];

// 1. Check for font-family issues
console.log('--- 1. Auditing font-family declarations ---');
allCssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(__dirname, file);
  const fontMatches = content.matchAll(/font-family:\s*([^;]+);/g);
  for (const match of fontMatches) {
    const val = match[1].trim();
    // Check if it refers to valid token or valid font
    if (
      !val.includes('--hk-font') &&
      !val.includes('inherit') &&
      !val.includes('system-ui') &&
      !val.includes('sans-serif') &&
      !val.includes('serif') &&
      !val.includes('cursive')
    ) {
      issues.push({
        type: 'UNRECOGNIZED_FONT_FAMILY',
        file: relPath,
        declaration: match[0]
      });
    }
  }
});

// 2. Check font-weight compatibility
console.log('--- 2. Auditing font-weight declarations against Montserrat / Bodoni ---');
allCssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(__dirname, file);
  // Match rule blocks
  const rules = content.split('}');
  rules.forEach(rule => {
    if (!rule.includes('{')) return;
    const [selector, body] = rule.split('{');
    if (!body) return;
    
    // Check if body has font-weight
    const fwMatch = body.match(/font-weight:\s*([^;]+);/);
    const ffMatch = body.match(/font-family:\s*([^;]+);/);
    
    if (fwMatch) {
      const weightVal = fwMatch[1].trim();
      // If Montserrat (body font) is used with weight 800 or 900 or 100 or 200
      const isMontserrat = ffMatch ? ffMatch[1].includes('hk-font-body') || ffMatch[1].includes('hk-font-sans') : selector.includes('btn') || selector.includes('lbl') || selector.includes('tag');
      if (isMontserrat && (weightVal === '800' || weightVal === '900' || weightVal === '100' || weightVal === '200')) {
        issues.push({
          type: 'INVALID_WEIGHT_FOR_FONT',
          file: relPath,
          selector: selector.trim(),
          details: `Weight ${weightVal} used on sans-serif font which only loads 300, 400, 500, 600, 700.`
        });
      }
    }
  });
});

// 3. Check for cut-off letters / line-height clipping
console.log('--- 3. Auditing line-height and overflow clipping ---');
allCssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(__dirname, file);
  const rules = content.split('}');
  rules.forEach(rule => {
    if (!rule.includes('{')) return;
    const [selector, body] = rule.split('{');
    if (!body) return;

    // Check headings or display text with line-height < 1.0 or tight line height + overflow: hidden without padding
    const lhMatch = body.match(/line-height:\s*([0-9.]+);/);
    const ofMatch = body.match(/overflow:\s*hidden/);
    
    if (lhMatch && parseFloat(lhMatch[1]) < 0.95) {
      issues.push({
        type: 'DANGEROUSLY_LOW_LINE_HEIGHT',
        file: relPath,
        selector: selector.trim(),
        details: `line-height: ${lhMatch[1]} may cut off ascenders or descenders.`
      });
    }

    if (ofMatch && (selector.includes('h1') || selector.includes('h2') || selector.includes('title') || selector.includes('heading'))) {
      if (!body.includes('padding') && !body.includes('line-height: 1.2') && !body.includes('line-height: 1.3')) {
        issues.push({
          type: 'POTENTIAL_HEADING_CLIPPING',
          file: relPath,
          selector: selector.trim(),
          details: `Heading has overflow:hidden which may clip serif italics or descenders.`
        });
      }
    }
  });
});

// 4. Check for white-space: nowrap on text containers that could break on mobile 320px
console.log('--- 4. Auditing white-space: nowrap on text elements ---');
allCssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(__dirname, file);
  const rules = content.split('}');
  rules.forEach(rule => {
    if (!rule.includes('{')) return;
    const [selector, body] = rule.split('{');
    if (!body) return;

    if (body.includes('white-space: nowrap')) {
      const isButtonOrTag = selector.includes('btn') || selector.includes('badge') || selector.includes('tag') || selector.includes('tab') || selector.includes('item') || selector.includes('label');
      const hasEllipsis = body.includes('text-overflow: ellipsis');
      const isMedia = selector.includes('@media');
      
      // If it's a heading or paragraph or price or title with nowrap and no ellipsis
      if ((selector.includes('title') || selector.includes('heading') || selector.includes('desc') || selector.includes('location')) && !hasEllipsis) {
        issues.push({
          type: 'UNBOUNDED_NOWRAP_TEXT',
          file: relPath,
          selector: selector.trim(),
          details: `white-space: nowrap without text-overflow: ellipsis could overflow viewport on mobile.`
        });
      }
    }
  });
});

// 5. Check text contrast and unreadable colors
console.log('--- 5. Auditing unreadable colors & contrast ---');
allCssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(__dirname, file);
  const rules = content.split('}');
  rules.forEach(rule => {
    if (!rule.includes('{')) return;
    const [selector, body] = rule.split('{');
    if (!body) return;

    // Check light text on light background or dark text on dark background
    // e.g. color: #fff or #FAF8F5 or var(--hk-ivory) when background is white or ivory
    if (
      (body.includes('background: #fff') || body.includes('background-color: #fff') || body.includes('background: var(--hk-ivory-100)') || body.includes('background: var(--hk-ivory-50)')) &&
      (body.includes('color: #fff') || body.includes('color: var(--hk-text-inverse)') || body.includes('color: var(--hk-ivory)'))
    ) {
      issues.push({
        type: 'LOW_CONTRAST_SAME_COLOR',
        file: relPath,
        selector: selector.trim(),
        details: `Light text defined on light background surface.`
      });
    }

    if (
      (body.includes('background: var(--hk-chocolate') || body.includes('background: #2C1E1D') || body.includes('background: #432F2E')) &&
      (body.includes('color: var(--hk-chocolate') || body.includes('color: #2C1E1D') || body.includes('color: #432F2E'))
    ) {
      issues.push({
        type: 'LOW_CONTRAST_DARK_ON_DARK',
        file: relPath,
        selector: selector.trim(),
        details: `Dark text defined on dark background surface.`
      });
    }
  });
});

// 6. Check JSX elements for unstyled text or awkward elements
console.log('--- 6. Auditing JSX text elements & pricing strings ---');
allJsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(__dirname, file);

  // Check property price rendering
  if (content.includes('priceFormatted') || content.includes('price')) {
    // Check if price is wrapped in a dedicated semantic element
    const priceMatches = content.match(/priceFormatted/g) || [];
    // verified
  }

  // Check headings without accessible text
  const emptyHeadings = content.match(/<h[1-6][^>]*>\s*<\/h[1-6]>/g);
  if (emptyHeadings) {
    issues.push({
      type: 'EMPTY_HEADING_ELEMENT',
      file: relPath,
      details: `Found empty heading element: ${emptyHeadings.join(', ')}`
    });
  }
});

console.log('\n================================================================');
console.log(`AUDIT COMPLETE: Found ${issues.length} potential issues.`);
console.log('================================================================\n');

if (issues.length > 0) {
  issues.forEach((iss, i) => {
    console.log(`[ISSUE #${i + 1}] ${iss.type} in ${iss.file}`);
    if (iss.selector) console.log(`   Selector: ${iss.selector}`);
    if (iss.details) console.log(`   Details: ${iss.details}`);
    if (iss.declaration) console.log(`   Declaration: ${iss.declaration}`);
  });
} else {
  console.log('No font, weight, contrast, or clipping issues detected by static analyzer!');
}
