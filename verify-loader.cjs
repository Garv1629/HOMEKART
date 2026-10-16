/**
 * Homekart Realty — Luxury Loader (Nawsome & Dovatgabriel Inspired) Verification Script
 *
 * Validates:
 * 1. Component files and CSS exist
 * 2. Nawsome 5-bar mechanical staircase with bouncing ball (@keyframes ball624 & barUp1-5)
 * 3. Dovatgabriel fluid wave dots with --uib-speed and staggered offsets
 * 4. Brand palette colors (#432F2E, #C4DAE8, #FEEFB8, #FAF8F5)
 * 5. Glassmorphism overlay and luxury editorial crest
 * 6. Accessibility (role="status", aria-live="polite", prefers-reduced-motion)
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

console.log('--- 1. VERIFYING LOADER FILES & STRUCTURE ---');
const loaderJsxPath = path.join(__dirname, 'src/components/Loader/Loader.jsx');
const loaderCssPath = path.join(__dirname, 'src/components/Loader/Loader.css');
const loaderIndexPath = path.join(__dirname, 'src/components/Loader/index.js');

assert(fs.existsSync(loaderJsxPath), 'Loader.jsx exists');
assert(fs.existsSync(loaderCssPath), 'Loader.css exists');
assert(fs.existsSync(loaderIndexPath), 'Loader index.js exists');

const loaderJsx = fs.readFileSync(loaderJsxPath, 'utf8');
const loaderCss = fs.readFileSync(loaderCssPath, 'utf8');

console.log('\n--- 2. VERIFYING NAWSOME 5-BAR STAIRCASE & BOUNCING BALL ---');
// JSX elements
assert(loaderJsx.includes('hk-loader-bars__stage'), 'Bar staircase stage present in JSX');
assert(loaderJsx.includes('hk-loader-bars__ball'), 'Bouncing ball present in JSX');
assert(loaderJsx.includes('hk-loader-bars__bar--1'), 'Bar 1 present in JSX');
assert(loaderJsx.includes('hk-loader-bars__bar--2'), 'Bar 2 present in JSX');
assert(loaderJsx.includes('hk-loader-bars__bar--3'), 'Bar 3 present in JSX');
assert(loaderJsx.includes('hk-loader-bars__bar--4'), 'Bar 4 present in JSX');
assert(loaderJsx.includes('hk-loader-bars__bar--5'), 'Bar 5 present in JSX');

// CSS Keyframes & Animations
assert(loaderCss.includes('@keyframes ball624'), 'ball624 keyframes present in CSS');
assert(loaderCss.includes('animation: ball624'), 'Ball element applies ball624 animation');
assert(loaderCss.includes('@keyframes barUp1'), 'barUp1 keyframes present in CSS');
assert(loaderCss.includes('@keyframes barUp2'), 'barUp2 keyframes present in CSS');
assert(loaderCss.includes('@keyframes barUp3'), 'barUp3 keyframes present in CSS');
assert(loaderCss.includes('@keyframes barUp4'), 'barUp4 keyframes present in CSS');
assert(loaderCss.includes('@keyframes barUp5'), 'barUp5 keyframes present in CSS');
assert(loaderCss.includes('scale(1, 0.2)'), 'Bars scale down to scale(1, 0.2)');
assert(loaderCss.includes('scale(1, 1)'), 'Bars scale up to scale(1, 1)');
assert(loaderCss.includes('transform-origin: bottom center'), 'Bars transform from bottom');

console.log('\n--- 3. VERIFYING DOVATGABRIEL FLUID WAVE DOTS ---');
assert(loaderJsx.includes('hk-loader-dots__stage'), 'Dots stage container present in JSX');
assert(loaderJsx.includes('hk-loader-dots__dot--1'), 'Dot 1 present in JSX');
assert(loaderJsx.includes('hk-loader-dots__dot--4'), 'Dot 4 present in JSX');
assert(loaderCss.includes('--uib-speed'), '--uib-speed token defined in CSS');
assert(loaderCss.includes('@keyframes hkDotWave'), 'hkDotWave keyframes present in CSS');

console.log('\n--- 4. VERIFYING BRAND PALETTE ---');
assert(loaderCss.includes('#432F2E'), 'Rich chocolate brown (#432F2E) present');
assert(loaderCss.includes('#C4DAE8'), 'Powder blue (#C4DAE8) present');
assert(loaderCss.includes('#FEEFB8'), 'Butter yellow (#FEEFB8) present');
assert(loaderCss.includes('#FAF8F5') || loaderCss.includes('250, 248, 245'), 'Warm ivory ground present');

console.log('\n--- 5. VERIFYING GLASSMORPHISM OVERLAY & EDITORIAL CREST ---');
assert(loaderJsx.includes('hk-loader-overlay'), 'Overlay container present in JSX');
assert(loaderJsx.includes('hk-loader-overlay__crest'), 'Luxury editorial crest present in JSX');
assert(loaderCss.includes('backdrop-filter: blur'), 'Glassmorphic backdrop blur present in CSS');

console.log('\n--- 6. VERIFYING ACCESSIBILITY & REDUCED MOTION ---');
assert(loaderJsx.includes('role="status"'), 'role="status" accessibility attribute present');
assert(loaderJsx.includes('aria-live="polite"'), 'aria-live="polite" attribute present');
assert(loaderCss.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion media query handled');

console.log('\n----------------------------------------');
if (errors.length > 0) {
  console.error(`FAILED: ${errors.length} assertion(s) failed.`);
  if (require.main === module) process.exit(1);
  throw new Error(`${errors.length} checks failed in verify-loader`);
} else {
  console.log(`SUCCESS: All ${passed} loader assertions passed cleanly!`);
  if (require.main === module) process.exit(0);
}
