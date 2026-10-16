/**
 * Homekart Realty — Minimal Floating Property Filter Card Verification Script
 *
 * Validates:
 * 1. Component files exist in src/components/WheelSelector/ (WheelSelector.jsx, WheelSelector.css, index.js)
 * 2. Minimal Floating Property Filter Card architecture:
 *    - Minimal floating card container (.hk-minimal-filter-card)
 *    - Small editorial "FIND YOUR PROPERTY" label (.hk-minimal-filter__label)
 *    - Four filter buttons (ALL, BUY, RENT, COMMERCIAL)
 *    - Chocolate brown active state (#432F2E) with warm ivory (#F7F5F0) text
 *    - Subtle border (#C4DAE8) and ambient butter-yellow inset glow (#FEEFB8)
 *    - Compact footer (.hk-minimal-filter__footer) showing selected category and dynamic live property count
 * 3. Clean removal of circular dial mechanics:
 *    - No circular bezel (.hk-wheel__bezel)
 *    - No rotating rotor (.hk-wheel__rotor)
 *    - No center jewel cap (.hk-wheel__center-cap)
 *    - No caliper notch (.hk-wheel__notch)
 *    - No numbered markers (01, 02, 03, 00)
 *    - No ROTATE TO SELECT text
 * 4. Luxury brand palette adaptation:
 *    - Powder blue (#C4DAE8)
 *    - Butter yellow (#FEEFB8)
 *    - Chocolate brown (#432F2E)
 *    - Warm ivory (#F7F5F0)
 * 5. Accessibility & UX standards:
 *    - Filter buttons implement aria-pressed
 *    - Keyboard arrow key navigation (ArrowLeft/ArrowRight)
 *    - Visible keyboard focus states (:focus-visible)
 *    - Prefers-reduced-motion media query coverage
 * 6. Real React state & property filtering integration in Properties.jsx
 * 7. Dynamic live count computation from real property data
 */

const fs = require('fs');
const path = require('path');

let errors = [];
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    errors.push(message);
  } else {
    console.log(`PASS: ${message}`);
    passed++;
  }
}

console.log('--- 1. VERIFYING COMPONENT FILES & EXPORTS ---');
const wheelJsxPath = path.join(__dirname, 'src/components/WheelSelector/WheelSelector.jsx');
const wheelCssPath = path.join(__dirname, 'src/components/WheelSelector/WheelSelector.css');
const wheelIndexPath = path.join(__dirname, 'src/components/WheelSelector/index.js');

assert(fs.existsSync(wheelJsxPath), 'WheelSelector.jsx exists');
assert(fs.existsSync(wheelCssPath), 'WheelSelector.css exists');
assert(fs.existsSync(wheelIndexPath), 'WheelSelector index.js exists');

const wheelJsx = fs.readFileSync(wheelJsxPath, 'utf8');
const wheelCss = fs.readFileSync(wheelCssPath, 'utf8');
const wheelIndex = fs.readFileSync(wheelIndexPath, 'utf8');

assert(wheelIndex.includes('WheelSelector'), 'index.js exports WheelSelector');
assert(wheelIndex.includes('MinimalPropertyFilterCard'), 'index.js exports MinimalPropertyFilterCard');

console.log('\n--- 2. VERIFYING REMOVAL OF CIRCULAR DIAL & ROTATING LABELS ---');
assert(!wheelJsx.includes('hk-wheel__bezel'), 'Circular dial bezel removed from JSX');
assert(!wheelJsx.includes('hk-wheel__rotor'), 'Rotating rotor removed from JSX');
assert(!wheelJsx.includes('hk-wheel__center-cap'), 'Central knob removed from JSX');
assert(!wheelJsx.includes('hk-wheel__notch'), 'Calibrated notch removed from JSX');
assert(!wheelJsx.includes('ROTATE TO SELECT'), 'ROTATE TO SELECT text removed from JSX');
assert(!wheelJsx.includes("'01'"), 'Numbered marker 01 removed from JSX');
assert(!wheelJsx.includes("'02'"), 'Numbered marker 02 removed from JSX');
assert(!wheelJsx.includes("'03'"), 'Numbered marker 03 removed from JSX');
assert(!wheelJsx.includes("'00'"), 'Numbered marker 00 removed from JSX');

console.log('\n--- 3. VERIFYING MINIMAL FLOATING FILTER CARD ARCHITECTURE ---');
assert(wheelJsx.includes('FIND YOUR PROPERTY'), 'Small FIND YOUR PROPERTY label present in JSX');
assert(wheelJsx.includes('hk-minimal-filter-card'), 'Floating filter card container present in JSX');
assert(wheelCss.includes('.hk-minimal-filter-card'), 'Card container styling present in CSS');
assert(wheelCss.includes('rgba(196, 218, 232') && wheelCss.includes('border: 1px solid'), 'Subtle powder blue border present in CSS');
assert(wheelCss.includes('box-shadow:'), 'Subtle floating shadow present in CSS');

// Four Filters
assert(wheelJsx.includes("'ALL'"), 'ALL filter button present in JSX');
assert(wheelJsx.includes("'BUY'"), 'BUY filter button present in JSX');
assert(wheelJsx.includes("'RENT'"), 'RENT filter button present in JSX');
assert(wheelJsx.includes("'COMMERCIAL'"), 'COMMERCIAL filter button present in JSX');

// Active State
assert(wheelCss.includes('.hk-minimal-filter__btn--active'), 'Active filter button styles present in CSS');
assert(wheelCss.includes('#432F2E !important') && wheelCss.includes('#F7F5F0 !important'), 'Chocolate active state with ivory text configured');

// Compact Footer
assert(wheelJsx.includes('hk-minimal-filter__footer'), 'Compact footer present in JSX');
assert(wheelJsx.includes('hk-minimal-filter__footer-cat'), 'Selected category description present in footer');
assert(wheelJsx.includes('hk-minimal-filter__footer-count'), 'Live property count present in footer');
assert(wheelCss.includes('.hk-minimal-filter__footer'), 'Footer styling present in CSS');

console.log('\n--- 4. VERIFYING LUXURY BRAND PALETTE ---');
assert(wheelCss.includes('#C4DAE8') || wheelCss.includes('196, 218, 232'), 'Powder blue (#C4DAE8) used');
assert(wheelCss.includes('#FEEFB8') || wheelCss.includes('254, 239, 184'), 'Butter yellow (#FEEFB8) used');
assert(wheelCss.includes('#432F2E'), 'Chocolate brown (#432F2E) used');
assert(wheelCss.includes('#F7F5F0') || wheelCss.includes('247, 245, 240'), 'Warm ivory (#F7F5F0) used');

console.log('\n--- 5. VERIFYING ACCESSIBILITY & RESPONSIVENESS ---');
assert(wheelJsx.includes('aria-pressed={isActive}'), 'Filter buttons implement aria-pressed');
assert(wheelJsx.includes('ArrowRight') && wheelJsx.includes('ArrowLeft'), 'Arrow key navigation implemented');
assert(wheelCss.includes(':focus-visible'), 'Visible focus ring implemented in CSS');
assert(wheelCss.includes('prefers-reduced-motion'), 'Prefers-reduced-motion media query implemented');
assert(wheelCss.includes('@media (max-width:'), 'Responsive styles implemented for mobile');

console.log('\n--- 6. VERIFYING REACT STATE & REAL PROPERTY DATA INTEGRATION ---');
const propertiesJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');
assert(propertiesJsx.includes("import WheelSelector from '../../components/WheelSelector'"), 'Properties imports WheelSelector');
assert(propertiesJsx.includes('value={statusFilter}'), 'WheelSelector connects to statusFilter state');
assert(propertiesJsx.includes('onChange={(newStatus) => setStatusFilter(newStatus)}'), 'WheelSelector updates statusFilter state');
assert(propertiesJsx.includes('properties={properties}'), 'WheelSelector receives real property dataset');
assert(propertiesJsx.includes("statusFilter === 'Commercial'"), 'Properties filtering handles Commercial acquisition mode');

console.log('\n----------------------------------------');
if (errors.length > 0) {
  console.error(`FAILED: ${errors.length} assertion(s) failed.`);
  if (require.main === module) process.exit(1);
  throw new Error(`${errors.length} checks failed in verify-wheel`);
} else {
  console.log(`SUCCESS: All ${passed} minimal filter card assertions passed cleanly!`);
  if (require.main === module) process.exit(0);
}
