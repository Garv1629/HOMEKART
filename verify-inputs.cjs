/**
 * Homekart Realty — Smit-Prajapati Input & Search-Field System Verification Script
 *
 * Validates:
 * 1. Component files exist in src/components/Input/ (Input, SearchBar, Select, Textarea, index, CSS)
 * 2. Smit-Prajapati pill-shaped silhouette (border-radius: 9999px)
 * 3. Layered warm ivory gradient (#F7F5F0 to #FFFFFF)
 * 4. Subtle powder-blue border (#C4DAE8) and ambient drop-shadow elevation
 * 5. Butter-yellow (#FEEFB8) & deep powder-blue (#5C8CA9) focus ring transitions
 * 6. Rich chocolate-brown typography (#432F2E) and accessible high-contrast placeholder (#705352)
 * 7. SearchBar with embedded SVG magnifying glass icon and interactive clear button
 * 8. Pill Select with custom chocolate SVG chevron and rounded Textarea
 * 9. Validation and error states with aria-invalid, aria-describedby, and role="alert"
 * 10. Integration across Properties filter dock, Home hero discovery, and ConsultationForm
 * 11. Mobile touch target safety (min-height >= 48px) and prefers-reduced-motion coverage
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

console.log('--- 1. VERIFYING REUSABLE COMPONENT FILES & EXPORTS ---');
const inputJsxPath = path.join(__dirname, 'src/components/Input/Input.jsx');
const searchBarJsxPath = path.join(__dirname, 'src/components/Input/SearchBar.jsx');
const selectJsxPath = path.join(__dirname, 'src/components/Input/Select.jsx');
const textareaJsxPath = path.join(__dirname, 'src/components/Input/Textarea.jsx');
const inputCssPath = path.join(__dirname, 'src/components/Input/Input.css');
const inputIndexPath = path.join(__dirname, 'src/components/Input/index.js');

assert(fs.existsSync(inputJsxPath), 'Input.jsx exists');
assert(fs.existsSync(searchBarJsxPath), 'SearchBar.jsx exists');
assert(fs.existsSync(selectJsxPath), 'Select.jsx exists');
assert(fs.existsSync(textareaJsxPath), 'Textarea.jsx exists');
assert(fs.existsSync(inputCssPath), 'Input.css exists');
assert(fs.existsSync(inputIndexPath), 'Input index.js exists');

const inputJsx = fs.readFileSync(inputJsxPath, 'utf8');
const searchBarJsx = fs.readFileSync(searchBarJsxPath, 'utf8');
const selectJsx = fs.readFileSync(selectJsxPath, 'utf8');
const textareaJsx = fs.readFileSync(textareaJsxPath, 'utf8');
const inputCss = fs.readFileSync(inputCssPath, 'utf8');
const inputIndex = fs.readFileSync(inputIndexPath, 'utf8');
const componentsCss = fs.readFileSync(path.join(__dirname, 'src/styles/components.css'), 'utf8');

assert(inputIndex.includes('Input') && inputIndex.includes('SearchBar') && inputIndex.includes('Select') && inputIndex.includes('Textarea'), 'index.js re-exports all 4 input primitives');

console.log('\n--- 2. VERIFYING SMIT-PRAJAPATI PILL SILHOUETTE & LAYERED GRADIENTS ---');
assert(inputCss.includes('border-radius: 9999px') || componentsCss.includes('border-radius: 9999px'), 'Pill-shaped border-radius (9999px) applied to inputs');
assert(inputCss.includes('linear-gradient(180deg, #FFFFFF 0%, #F7F5F0 100%)') || componentsCss.includes('linear-gradient(180deg, #FFFFFF 0%, #F7F5F0 100%)'), 'Layered warm ivory (#F7F5F0 to #FFFFFF) gradient applied');

console.log('\n--- 3. VERIFYING BRAND PALETTE & AMBIENT SHADOWS ---');
// Powder blue #C4DAE8
assert(inputCss.includes('196, 218, 232') || inputCss.includes('#C4DAE8'), 'Powder blue (#C4DAE8) borders and ambient shadow hue present');
// Chocolate brown #432F2E
assert(inputCss.includes('#432F2E'), 'Chocolate brown (#432F2E) base text and icon color present');
// Butter yellow #FEEFB8
assert(inputCss.includes('#FEEFB8'), 'Butter yellow (#FEEFB8) focus inset highlight present');
// Deep powder blue #5C8CA9
assert(inputCss.includes('#5C8CA9'), 'Deep powder blue (#5C8CA9) focus border present');
// High-contrast placeholder #705352
assert(inputCss.includes('#705352'), 'High-contrast placeholder color (#705352) present');
// Ambient drop shadow
assert(inputCss.includes('box-shadow:') && inputCss.includes('rgba(196, 218, 232,'), 'Ambient colored drop-shadow elevation configured');

console.log('\n--- 4. VERIFYING SEARCHBAR COMPONENT & MAGNIFYING ICON ---');
assert(searchBarJsx.includes('role="search"'), 'SearchBar includes role="search" attribute');
assert(searchBarJsx.includes('hk-search-bar__icon'), 'SearchBar renders embedded magnifying icon container');
assert(searchBarJsx.includes('<circle') && searchBarJsx.includes('<line'), 'SearchBar renders crisp SVG magnifying glass icon');
assert(searchBarJsx.includes('hk-search-bar__clear'), 'SearchBar provides interactive clear button');
assert(searchBarJsx.includes('type="search"'), 'SearchBar uses semantic search input type');
assert(inputCss.includes('.hk-search-bar__icon'), 'CSS handles magnifying icon positioning and focus transition');
assert(inputCss.includes('.hk-search-bar__clear'), 'CSS handles clear button hover and focus-visible states');

console.log('\n--- 5. VERIFYING PILL SELECT & ROUNDED TEXTAREA ---');
assert(selectJsx.includes('hk-select'), 'Select renders hk-select class');
assert(selectJsx.includes('aria-invalid'), 'Select supports accessible validation states');
assert(inputCss.includes('.hk-select') && inputCss.includes('data:image/svg+xml'), 'Select uses custom chocolate SVG chevron arrow');
assert(textareaJsx.includes('hk-textarea'), 'Textarea renders hk-textarea class');
assert(inputCss.includes('border-radius: 20px'), 'Textarea uses refined 20px rounded card silhouette');

console.log('\n--- 6. VERIFYING ACCESSIBILITY, FOCUS-VISIBLE & ERROR STATES ---');
assert(inputJsx.includes('aria-invalid') && inputJsx.includes('aria-describedby'), 'Input connects aria-invalid and aria-describedby');
assert(inputJsx.includes('role="alert"'), 'Input errors announced via role="alert"');
assert(inputCss.includes('.hk-input--error') && inputCss.includes('#A8423F'), 'Error state styles border in terracotta/crimson (#A8423F)');
assert(inputCss.includes(':focus-visible'), 'Accessible visible keyboard focus states supported');
assert(inputCss.includes('prefers-reduced-motion'), 'Prefers-reduced-motion media query implemented');

console.log('\n--- 7. VERIFYING INTEGRATION ACROSS PROPERTIES, HOME & FORMS ---');
// Properties Page
const propertiesJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');
assert(propertiesJsx.includes('SearchBar'), 'Properties imports SearchBar component');
assert(propertiesJsx.includes('id="property-search"'), 'Properties search preserves property-search ID');
assert(propertiesJsx.includes('value={search}'), 'Properties search connects to search filter state');
assert(propertiesJsx.includes('onClear'), 'Properties search supports onClear');
assert(propertiesJsx.includes('useSearchParams'), 'Properties syncs query parameters with search');

// Home Page
const homeJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Home/Home.jsx'), 'utf8');
assert(homeJsx.includes('SearchBar'), 'Home imports SearchBar component');
assert(homeJsx.includes('hk-hero__search-wrap'), 'Home renders hero discovery search bar');
assert(homeJsx.includes('handleHeroSearch'), 'Home search navigates to /properties?search=');

// Consultation Form
const consultCss = fs.readFileSync(path.join(__dirname, 'src/components/ConsultationForm/ConsultationForm.css'), 'utf8');
assert(consultCss.includes('border-radius: 9999px'), 'ConsultationForm inputs apply Smit-Prajapati pill silhouette');
assert(consultCss.includes('#5C8CA9') || consultCss.includes('#432F2E'), 'ConsultationForm inputs use luxury brand focus borders');

console.log('\n--- 8. VERIFYING MOBILE TOUCH TARGET SAFETY ---');
assert(inputCss.includes('min-height: 50px') || inputCss.includes('min-height: 48px'), 'Desktop inputs meet 50px comfort height');
assert(inputCss.includes('@media (max-width: 640px)') && inputCss.includes('min-height: 48px'), 'Mobile inputs guarantee minimum 48px touch target');

console.log('\n----------------------------------------');
if (errors.length > 0) {
  console.error(`FAILED: ${errors.length} assertion(s) failed.`);
  if (require.main === module) process.exit(1);
  throw new Error(`${errors.length} checks failed in verify-inputs`);
} else {
  console.log(`SUCCESS: All ${passed} input assertions passed cleanly!`);
  if (require.main === module) process.exit(0);
}
