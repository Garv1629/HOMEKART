const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- VERIFYING AMINE-MAKER ANIMATED LOCATION TOOLTIP SYSTEM ---');

// 1. Verify File Existence
const files = [
  'src/components/LocationTooltip/LocationTooltip.css',
  'src/components/LocationTooltip/LocationTooltip.jsx',
  'src/components/LocationTooltip/PropertyMapPin.jsx',
  'src/components/LocationTooltip/index.js',
];

files.forEach((f) => {
  const p = path.join(__dirname, f);
  assert(fs.existsSync(p), `Missing required location tooltip file: ${f}`);
});
console.log('✓ All 4 LocationTooltip component & style files exist');

// 2. CSS Scoping, Animations & Luxury Palette Verification
const cssContent = fs.readFileSync(path.join(__dirname, 'src/components/LocationTooltip/LocationTooltip.css'), 'utf8');

// Keyframes
assert(cssContent.includes('@keyframes hkMarkerPulse'), 'Missing @keyframes hkMarkerPulse for pulsing location marker');
assert(cssContent.includes('@keyframes hkPinBounce'), 'Missing @keyframes hkPinBounce for marker pin animation');
assert(cssContent.includes('@keyframes hkCloudDrift1'), 'Missing @keyframes hkCloudDrift1 for floating clouds');
assert(cssContent.includes('@keyframes hkCloudDrift2'), 'Missing @keyframes hkCloudDrift2 for floating clouds');

// Scale-in & Blur-to-Sharp Reveal
assert(cssContent.includes('filter: blur(8px)'), 'Missing blur reveal initial state');
assert(cssContent.includes('filter: blur(0px)'), 'Missing blur reveal sharp state');
assert(cssContent.includes('scale(0.88)'), 'Missing scale-in initial scale');

// Luxury Palette Tokens
assert(cssContent.includes('#C4DAE8') || cssContent.includes('196, 218, 232'), 'Missing powder blue brand palette');
assert(cssContent.includes('#FEEFB8') || cssContent.includes('254, 239, 184'), 'Missing butter yellow brand palette');
assert(cssContent.includes('#432F2E') || cssContent.includes('67, 47, 46'), 'Missing chocolate brown brand palette');
assert(cssContent.includes('#FAF8F5') || cssContent.includes('#FDFBF7') || cssContent.includes('#F7F5F0') || cssContent.includes('253, 251, 247'), 'Missing warm ivory brand palette');

// Viewport Positioning & Scoped Classes
assert(cssContent.includes('.hk-loc-tooltip--top'), 'Missing top positioning modifier');
assert(cssContent.includes('.hk-loc-tooltip--bottom'), 'Missing bottom positioning modifier');
assert(cssContent.includes('.hk-loc-tooltip--align-left'), 'Missing left alignment modifier');
assert(cssContent.includes('.hk-loc-tooltip--align-right'), 'Missing right alignment modifier');

// Prefers-reduced-motion
assert(cssContent.includes('prefers-reduced-motion: reduce'), 'Missing prefers-reduced-motion query');

// Ensure no bare unscoped selectors
const forbiddenBareSelectors = ['\n#app', '\n.card {', '\n.location {', '\n.relative {', '\n.absolute {'];
forbiddenBareSelectors.forEach((sel) => {
  assert(!cssContent.includes(sel), `CSS contains unscoped generic selector: ${sel.trim()}`);
});
console.log('✓ Scoped BEM styling, pulse keyframes, cloud drift, and blur-to-sharp reveal verified');

// 3. LocationTooltip Component Features & Accessibility
const tooltipCode = fs.readFileSync(path.join(__dirname, 'src/components/LocationTooltip/LocationTooltip.jsx'), 'utf8');
assert(tooltipCode.includes('aria-haspopup="dialog"'), 'Missing aria-haspopup="dialog"');
assert(tooltipCode.includes('aria-expanded'), 'Missing aria-expanded attribute');
assert(tooltipCode.includes('role="dialog"'), 'Missing role="dialog" on popup card');
assert(tooltipCode.includes('CloudSVG'), 'Missing floating CloudSVG layer');
assert(tooltipCode.includes('hk-loc-tooltip__pulse-ring'), 'Missing pulsing marker rings');
assert(tooltipCode.includes('updatePlacement'), 'Missing smart viewport clipping placement logic');
assert(tooltipCode.includes('Escape'), 'Missing Escape key dismissal');
assert(tooltipCode.includes('pointerdown'), 'Missing tap/click outside listener');
console.log('✓ LocationTooltip accessibility (ARIA, keyboard, touch, viewport clipping) verified');

// 4. PropertyMapPin Component Verification
const mapPinCode = fs.readFileSync(path.join(__dirname, 'src/components/LocationTooltip/PropertyMapPin.jsx'), 'utf8');
assert(mapPinCode.includes('LocationTooltip'), 'PropertyMapPin wraps LocationTooltip');
assert(mapPinCode.includes('hk-map-pin__btn'), 'PropertyMapPin contains pin button');
console.log('✓ PropertyMapPin component verified');

// 5. Integration Verification
const propCardCode = fs.readFileSync(path.join(__dirname, 'src/components/PropertyCard/PropertyCard.jsx'), 'utf8');
assert(propCardCode.includes('LocationTooltip'), 'PropertyCard.jsx missing LocationTooltip integration');

const propDetailCode = fs.readFileSync(path.join(__dirname, 'src/pages/PropertyDetail/PropertyDetail.jsx'), 'utf8');
assert(propDetailCode.includes('LocationTooltip'), 'PropertyDetail.jsx missing LocationTooltip integration');

const propertiesCode = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');
assert(propertiesCode.includes('PropertyMapPin'), 'Properties.jsx missing PropertyMapPin integration');
console.log('✓ Integration across PropertyCard, PropertyDetail, and Properties page verified');

console.log('\nPASS: ALL AMINE-MAKER ANIMATED LOCATION TOOLTIP CHECKS PASSED (100%)!\n');
if (require.main === module) process.exit(0);
