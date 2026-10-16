const fs = require('fs');
const path = require('path');
const assert = require('assert');

let logs = [];
const origLog = console.log;
console.log = (...args) => {
  logs.push(args.join(' '));
  origLog(...args);
};

console.log('=== VERIFYING /properties?search=NOIDA PAGE USABILITY FIXES 1–2 ===\n');

// 1. Audit Properties Page CSS Files
const propCssPath = path.join(__dirname, 'src/pages/Properties/Properties.css');
const wheelCssPath = path.join(__dirname, 'src/components/WheelSelector/WheelSelector.css');
const cardCssPath = path.join(__dirname, 'src/components/PropertyCard/PropertyCard.css');
const inputCssPath = path.join(__dirname, 'src/components/Input/Input.css');
const checkboxCssPath = path.join(__dirname, 'src/components/Checkbox/Checkbox.css');

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

const propCss = stripComments(fs.readFileSync(propCssPath, 'utf8'));
const wheelCss = stripComments(fs.readFileSync(wheelCssPath, 'utf8'));
const cardCss = stripComments(fs.readFileSync(cardCssPath, 'utf8'));
const inputCss = stripComments(fs.readFileSync(inputCssPath, 'utf8'));
const checkboxCss = stripComments(fs.readFileSync(checkboxCssPath, 'utf8'));

// Combine the core components active on /properties
const combinedPropertiesCss = [propCss, wheelCss, inputCss, checkboxCss].join('\n');

// 1. Typography consolidation check
const fsRegex = /font-size\s*:\s*([^;!]+)/g;
let m;

const propFontSizes = new Set();
while ((m = fsRegex.exec(propCss)) !== null) {
  propFontSizes.add(m[1].trim());
}
console.log('1. Properties.css Typography Scale:');
console.log(`   - Count: ${propFontSizes.size} distinct font sizes (Requirement: <= 10)`);
console.log('   - Values:', Array.from(propFontSizes));
assert(propFontSizes.size <= 10, `Properties.css font-sizes (${propFontSizes.size}) must be <= 10`);

const wheelFontSizes = new Set();
fsRegex.lastIndex = 0;
while ((m = fsRegex.exec(wheelCss)) !== null) {
  wheelFontSizes.add(m[1].trim());
}
console.log('\n2. WheelSelector.css Typography Scale:');
console.log(`   - Count: ${wheelFontSizes.size} distinct font sizes (Requirement: <= 10)`);
console.log('   - Values:', Array.from(wheelFontSizes));
assert(wheelFontSizes.size <= 10, `WheelSelector.css font-sizes (${wheelFontSizes.size}) must be <= 10`);

const cardFontSizes = new Set();
fsRegex.lastIndex = 0;
while ((m = fsRegex.exec(cardCss)) !== null) {
  cardFontSizes.add(m[1].trim());
}
console.log('\n3. PropertyCard.css Typography Scale:');
console.log(`   - Count: ${cardFontSizes.size} distinct font sizes (Requirement: <= 10)`);
console.log('   - Values:', Array.from(cardFontSizes));
assert(cardFontSizes.size <= 10, `PropertyCard.css font-sizes (${cardFontSizes.size}) must be <= 10`);

const combinedFontSizes = new Set();
fsRegex.lastIndex = 0;
while ((m = fsRegex.exec(combinedPropertiesCss)) !== null) {
  combinedFontSizes.add(m[1].trim());
}
console.log('\n4. Combined /properties Active Components Font Sizes:');
console.log(`   - Count: ${combinedFontSizes.size} distinct font sizes (Requirement: <= 10)`);
console.log('   - Values:', Array.from(combinedFontSizes));
assert(combinedFontSizes.size <= 10, `Combined page font-sizes (${combinedFontSizes.size}) must be <= 10`);
console.log('   ✓ Issue 1 (Consistent typography <= 10 distinct values) PASSED!\n');

// 2. Border Radii consolidation check
const rRegex = /border-radius\s*:\s*([^;!]+)/g;

const propRadii = new Set();
while ((m = rRegex.exec(propCss)) !== null) {
  propRadii.add(m[1].trim());
}
console.log('5. Properties.css Border Radii:');
console.log(`   - Count: ${propRadii.size} distinct radii (Requirement: <= 6)`);
console.log('   - Values:', Array.from(propRadii));
assert(propRadii.size <= 6, `Properties.css radii (${propRadii.size}) must be <= 6`);

const wheelRadii = new Set();
rRegex.lastIndex = 0;
while ((m = rRegex.exec(wheelCss)) !== null) {
  wheelRadii.add(m[1].trim());
}
console.log('\n6. WheelSelector.css Border Radii:');
console.log(`   - Count: ${wheelRadii.size} distinct radii (Requirement: <= 6)`);
console.log('   - Values:', Array.from(wheelRadii));
assert(wheelRadii.size <= 6, `WheelSelector.css radii (${wheelRadii.size}) must be <= 6`);

const cardRadii = new Set();
rRegex.lastIndex = 0;
while ((m = rRegex.exec(cardCss)) !== null) {
  cardRadii.add(m[1].trim());
}
console.log('\n7. PropertyCard.css Border Radii:');
console.log(`   - Count: ${cardRadii.size} distinct radii (Requirement: <= 6)`);
console.log('   - Values:', Array.from(cardRadii));
assert(cardRadii.size <= 6, `PropertyCard.css radii (${cardRadii.size}) must be <= 6`);

// Check across combined /properties active styles
const combinedRadii = new Set();
rRegex.lastIndex = 0;
while ((m = rRegex.exec(combinedPropertiesCss)) !== null) {
  combinedRadii.add(m[1].trim());
}
console.log('\n8. Combined /properties Active Components Border Radii:');
console.log(`   - Count: ${combinedRadii.size} distinct border-radii (Requirement: <= 6)`);
console.log('   - Values:', Array.from(combinedRadii));
assert(combinedRadii.size <= 6, `Combined active border-radii (${combinedRadii.size}) must be <= 6`);

// Confirm pill-shaped preservation
assert(
  combinedPropertiesCss.includes('var(--hk-radius-full)') || combinedPropertiesCss.includes('9999px'),
  'Pill-shaped border-radius must be preserved for buttons, chips, and pills'
);
console.log('   ✓ Issue 2 (Consistent border radii <= 6 shared values) PASSED!\n');

// 3. Issue 3: Acquisition Mode label in sentence case without uppercase text-transform
console.log('9. Acquisition Mode Label Presentation:');
const wheelJsx = fs.readFileSync(path.join(__dirname, 'src/components/WheelSelector/WheelSelector.jsx'), 'utf8');
assert(wheelJsx.includes('Acquisition Mode'), 'WheelSelector.jsx must render "Acquisition Mode" exactly');
assert(wheelCss.includes('.hk-minimal-filter__mode-indicator') && wheelCss.includes('text-transform: none'), 'WheelSelector.css must override/set text-transform: none for Acquisition Mode indicator');
console.log('   ✓ Issue 3 (Acquisition Mode label in sentence case) PASSED!\n');

// 4. Issue 4: Properties-found message in sentence case & dynamically connected
console.log('10. Properties-found Count Message:');
const propertiesJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');
assert(
  propertiesJsx.includes("filtered.length === 1 ? 'property' : 'properties'} found"),
  'Properties.jsx must dynamically connect count to filtered results with "property/properties found"'
);
assert(
  propCss.includes('.hk-filters__count') && propCss.includes('text-transform: none'),
  'Properties.css must set text-transform: none on .hk-filters__count'
);
console.log('   ✓ Issue 4 (Properties-found message in sentence case & dynamically connected) PASSED!\n');

// 5. Issue 5: Page-level H1 heading and logical heading hierarchy
console.log('11. Page-level H1 Heading & Hierarchy:');
assert(
  propertiesJsx.includes('as="h1"'),
  'Properties.jsx primary page banner must render as H1 via as="h1"'
);
assert(
  propertiesJsx.includes('title="Explore Properties"'),
  'Properties.jsx SectionHeader title must be a meaningful page heading ("Explore Properties")'
);
assert(
  propertiesJsx.includes('<h2>No properties match your criteria</h2>'),
  'Properties empty state must use H2 to maintain unbroken H1 -> H2 hierarchy'
);
assert(
  propCss.includes('.hk-properties-empty h2'),
  'Properties.css must style .hk-properties-empty h2'
);
console.log('   ✓ Issue 5 (Single meaningful visible H1 and logical hierarchy) PASSED!\n');

console.log('=== ALL USABILITY ISSUES 1–5 VERIFIED SUCCESSFULLY! ===');
fs.writeFileSync('E:\\homekart\\test-output.txt', logs.join('\n'), 'utf8');
