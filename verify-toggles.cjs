/**
 * Homekart Realty — Toggle System Verification Script (BB-8 Animation Removed)
 *
 * Validates:
 * 1. Removal of elaborate BB-8 Droid robot DOM and CSS animations across all switches
 * 2. Reusable luxury tactile toggle components: Compact capsule toggle and Segmented sliding toggle
 * 3. Functional state continuity across Header, Properties, PropertyDetail, and ProjectShowcase
 * 4. Accessibility standards (role="switch", aria-checked, :focus-visible, unique IDs)
 * 5. Reduced motion support and twilight theme hooks
 */

const fs = require('fs');
const path = require('path');

let errors = [];
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errors.push(message);
  } else {
    console.log(`✓ PASS: ${message}`);
    passed++;
  }
}

console.log('--- 1. VERIFYING COMPONENT FILES & STRUCTURE ---');
const toggleJsxPath = path.join(__dirname, 'src/components/Toggle/Toggle.jsx');
const toggleCssPath = path.join(__dirname, 'src/components/Toggle/Toggle.css');
const toggleIndexPath = path.join(__dirname, 'src/components/Toggle/index.js');

assert(fs.existsSync(toggleJsxPath), 'Toggle.jsx exists');
assert(fs.existsSync(toggleCssPath), 'Toggle.css exists');
assert(fs.existsSync(toggleIndexPath), 'Toggle index.js exists');

const toggleJsx = fs.readFileSync(toggleJsxPath, 'utf8');
const toggleCss = fs.readFileSync(toggleCssPath, 'utf8');

console.log('\n--- 2. VERIFYING BB-8 DROID REMOVAL ---');
assert(!toggleJsx.includes('bb8__head'), 'BB-8 head removed from Toggle.jsx');
assert(!toggleJsx.includes('bb8__body'), 'BB-8 body removed from Toggle.jsx');
assert(!toggleJsx.includes('bb8__antenna'), 'BB-8 antenna removed from Toggle.jsx');
assert(!toggleJsx.includes('bb8-toggle__scenery'), 'BB-8 scenery removed from Toggle.jsx');
assert(!toggleJsx.includes('bb8-toggle__star'), 'BB-8 stars removed from Toggle.jsx');
assert(!toggleCss.includes('hkStarTwinkle'), 'hkStarTwinkle keyframes removed from Toggle.css');
assert(!toggleCss.includes('hkCloudFloat'), 'hkCloudFloat keyframes removed from Toggle.css');
assert(!toggleCss.includes('.bb8-toggle__track'), 'bb8-toggle__track removed from Toggle.css');

console.log('\n--- 3. VERIFYING LUXURY TACTILE TOGGLES (COMPACT & SEGMENTED) ---');
assert(toggleJsx.includes('hk-compact-toggle'), 'Compact toggle variant handled in JSX');
assert(toggleJsx.includes('hk-segmented-toggle'), 'Segmented toggle variant handled in JSX');
assert(toggleCss.includes('.hk-compact-toggle__track'), 'Compact toggle track styles defined');
assert(toggleCss.includes('.hk-compact-toggle__thumb'), 'Compact toggle thumb styles defined');
assert(toggleCss.includes('.hk-segmented-toggle__slider'), 'Segmented sliding pill styles defined');

console.log('\n--- 4. VERIFYING BRAND PALETTE ADAPTATION ---');
assert(toggleCss.includes('#432F2E') || toggleCss.includes('var(--hk-chocolate-700)'), 'Chocolate brown #432F2E used');
assert(toggleCss.includes('#FEEFB8') || toggleCss.includes('var(--hk-butter-yellow)'), 'Butter yellow #FEEFB8 used');
assert(toggleCss.includes('#C4DAE8') || toggleCss.includes('var(--hk-powder-blue)'), 'Powder blue #C4DAE8 used');
assert(toggleCss.includes('#F7F5F0') || toggleCss.includes('var(--hk-ivory-200)'), 'Warm ivory surface used');

console.log('\n--- 5. VERIFYING ACCESSIBILITY & REDUCED MOTION ---');
assert(toggleJsx.includes('role="switch"'), 'Toggle uses role="switch" for screen readers');
assert(toggleJsx.includes('aria-checked'), 'Toggle provides aria-checked attribute');
assert(toggleJsx.includes('useId'), 'Toggle automatically generates unique IDs via useId()');
assert(toggleCss.includes(':focus-visible'), 'Focus visible ring implemented for keyboard navigation');
assert(toggleCss.includes('prefers-reduced-motion'), 'Prefers-reduced-motion media query implemented');

console.log('\n--- 6. VERIFYING FUNCTIONAL INTEGRATION & STATE CONTINUITY ---');
// Header integration (Day/Night toggle cleanly removed per user instruction)
const headerJsx = fs.readFileSync(path.join(__dirname, 'src/components/Header/Header.jsx'), 'utf8');
assert(!headerJsx.includes('header-ambiance-desktop'), 'Header no longer renders desktop Day/Night toggle');
assert(!headerJsx.includes('header-ambiance-mobile'), 'Header no longer renders mobile Day/Night toggle');
assert(!headerJsx.includes('variant="bb8"'), 'Header no longer uses variant="bb8"');

// Properties filter integration
const propertiesJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');
assert(propertiesJsx.includes('import Toggle from \'../../components/Toggle\''), 'Properties imports Toggle');
assert(propertiesJsx.includes('filter-immediate-availability'), 'Properties uses compact toggle for Immediate Possession');
assert(propertiesJsx.includes('immediateOnly'), 'Properties connects immediateOnly toggle to filtering logic');

// PropertyDetail integration
const propertyDetailJsx = fs.readFileSync(path.join(__dirname, 'src/pages/PropertyDetail/PropertyDetail.jsx'), 'utf8');
assert(propertyDetailJsx.includes('import Toggle from \'../../components/Toggle\''), 'PropertyDetail imports Toggle');
assert(propertyDetailJsx.includes('twilightGallery'), 'PropertyDetail manages twilightGallery state');
assert(!propertyDetailJsx.includes('variant="bb8"'), 'PropertyDetail no longer uses variant="bb8"');
assert(propertyDetailJsx.includes('includeEscrow'), 'PropertyDetail connects compact toggle to mortgage escrow calculation');

// ProjectShowcase integration
const projectShowcaseJsx = fs.readFileSync(path.join(__dirname, 'src/components/ProjectShowcase/ProjectShowcase.jsx'), 'utf8');
assert(projectShowcaseJsx.includes('import Toggle from \'../Toggle\''), 'ProjectShowcase imports Toggle');
assert(!projectShowcaseJsx.includes('variant="bb8"'), 'ProjectShowcase no longer uses variant="bb8"');

console.log('\n======================================================');
if (errors.length === 0) {
  console.log(`🎉 ALL ${passed} TOGGLE VERIFICATION CHECKS PASSED CLEANLY!`);
  if (require.main === module) process.exit(0);
} else {
  console.error(`💥 ${errors.length} CHECKS FAILED!`);
  if (require.main === module) process.exit(1);
  throw new Error(`${errors.length} checks failed in verify-toggles`);
}
