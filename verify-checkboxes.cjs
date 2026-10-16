const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('HOMEKART REALTY — UIVERSE.IO 3D CHECKBOX VERIFICATION');
console.log('====================================================\n');

// 1. Checkbox.css verification
const checkboxCss = fs.readFileSync(path.join(__dirname, 'src/components/Checkbox/Checkbox.css'), 'utf8');

console.log('1. Checking 3D Inset-Shadow & Motion Styles in Checkbox.css:');
assert(checkboxCss.includes('inset 2px 2px') || checkboxCss.includes('inset'), 'Missing inset box-shadow');
assert(checkboxCss.includes('200ms'), 'Missing 200ms smooth transition');
assert(checkboxCss.includes('scale(0.92)') || checkboxCss.includes('translateY(1px)'), 'Missing 3D pressed-state active transform');
assert(checkboxCss.includes('#432F2E'), 'Missing chocolate brown brand base (#432F2E)');
assert(checkboxCss.includes('#FEEFB8'), 'Missing butter yellow checked state (#FEEFB8)');
assert(checkboxCss.includes('#C4DAE8'), 'Missing powder blue checked state (#C4DAE8)');
assert(checkboxCss.includes('.hk-checkbox__cross'), 'Missing cross icon style');
assert(checkboxCss.includes('.hk-checkbox__check'), 'Missing checkmark icon style');
assert(checkboxCss.includes('stroke-dashoffset'), 'Missing stroke-dashoffset icon swap animation');
assert(checkboxCss.includes(':focus-visible'), 'Missing focus-visible accessibility');
assert(checkboxCss.includes('prefers-reduced-motion'), 'Missing reduced-motion media query');
console.log('  ✓ Checkbox.css passed all 3D inset, palette, and animation checks.\n');

// 2. Checkbox.jsx verification
const checkboxJsx = fs.readFileSync(path.join(__dirname, 'src/components/Checkbox/Checkbox.jsx'), 'utf8');

console.log('2. Checking Reusable Checkbox Component in Checkbox.jsx:');
assert(checkboxJsx.includes('useId'), 'Missing useId for guaranteed unique IDs');
assert(checkboxJsx.includes('hk-checkbox__input'), 'Missing accessible hidden input');
assert(checkboxJsx.includes('hk-checkbox__box'), 'Missing 3D box container');
assert(checkboxJsx.includes('hk-checkbox__cross'), 'Missing cross SVG path');
assert(checkboxJsx.includes('hk-checkbox__check'), 'Missing checkmark SVG path');
assert(checkboxJsx.includes('aria-describedby'), 'Missing aria-describedby accessibility');
console.log('  ✓ Checkbox.jsx passed all accessible component checks.\n');

// 3. ConsultationForm.jsx verification
const consultJsx = fs.readFileSync(path.join(__dirname, 'src/components/ConsultationForm/ConsultationForm.jsx'), 'utf8');

console.log('3. Checking Enquiry Form Checkboxes in ConsultationForm.jsx:');
assert(consultJsx.includes("import Checkbox from '../Checkbox'"), 'Missing Checkbox import in ConsultationForm.jsx');
assert(consultJsx.includes('requireNda'), 'Missing NDA protocol checkbox in ConsultationForm.jsx');
assert(consultJsx.includes('managingPartner'), 'Missing Managing Partner checkbox in ConsultationForm.jsx');
assert(consultJsx.includes('virtualWalkthrough'), 'Missing Virtual Walkthrough checkbox in ConsultationForm.jsx');
assert(consultJsx.includes('test-failure-mode'), 'Missing Checkbox in test mode toggle');
console.log('  ✓ ConsultationForm checkboxes passed all checks.\n');

// 4. Properties.jsx verification
const propJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');

console.log('4. Checking Property Filters & Amenities in Properties.jsx:');
assert(propJsx.includes("import Checkbox from '../../components/Checkbox'"), 'Missing Checkbox import in Properties.jsx');
assert(propJsx.includes('amenityFilters'), 'Missing amenityFilters state in Properties.jsx');
assert(propJsx.includes('seaView'), 'Missing seaView amenity filter in Properties.jsx');
assert(propJsx.includes('privatePool'), 'Missing privatePool amenity filter in Properties.jsx');
assert(propJsx.includes('smartHome'), 'Missing smartHome amenity filter in Properties.jsx');
assert(propJsx.includes('conciergeLift'), 'Missing conciergeLift amenity filter in Properties.jsx');
assert(propJsx.includes('filter-amenity-sea'), 'Missing unique ID for sea amenity checkbox');
console.log('  ✓ Properties.jsx amenity filters passed all checks.\n');

// 5. PropertyDetail.jsx verification
const detailJsx = fs.readFileSync(path.join(__dirname, 'src/pages/PropertyDetail/PropertyDetail.jsx'), 'utf8');

console.log('5. Checking Curated Amenities Checklist in PropertyDetail.jsx:');
assert(detailJsx.includes("import Checkbox from '../../components/Checkbox'"), 'Missing Checkbox import in PropertyDetail.jsx');
assert(detailJsx.includes('verifiedAmenities'), 'Missing verifiedAmenities state in PropertyDetail.jsx');
assert(detailJsx.includes('prop-${property.id}-amenity-'), 'Missing unique property amenity checkbox IDs');
console.log('  ✓ PropertyDetail.jsx amenity checklist passed all checks.\n');

console.log('====================================================');
console.log('ALL CHECKBOX TESTS PASSED SUCCESSFULLY (100% PASS)');
console.log('====================================================');
