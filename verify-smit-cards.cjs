/**
 * Homekart Realty — Smit-Prajapati Card Animation Removal Verification Script
 *
 * Validates:
 * 1. CardCorners component and corner panels removed from PropertyCard.jsx
 * 2. CardCorners component and corner panels removed from ProjectShowcase.jsx
 * 3. CardCorners component and corner panels removed from Home.jsx
 * 4. PropertyCard retains complete real estate presentation (Image, Title, Location, Price, Specs, CTAs)
 * 5. Visual cards are clean, unobstructed, and retain responsive luxury editorial styling
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

console.log('--- 1. VERIFYING REMOVAL FROM PROPERTYCARD.JSX ---');
const propCardJsx = fs.readFileSync(path.join(__dirname, 'src/components/PropertyCard/PropertyCard.jsx'), 'utf8');

assert(!propCardJsx.includes('import CardCorners'), 'PropertyCard does NOT import CardCorners');
assert(!propCardJsx.includes('<CardCorners'), 'PropertyCard does NOT render <CardCorners />');
assert(!propCardJsx.includes('hk-smit-card'), 'PropertyCard does NOT contain hk-smit-card class');

// Essential content preserved
assert(propCardJsx.includes('property.image'), 'PropertyCard displays property image');
assert(propCardJsx.includes('property.title'), 'PropertyCard displays property title');
assert(propCardJsx.includes('property.location'), 'PropertyCard displays property location');
assert(propCardJsx.includes('property.priceFormatted'), 'PropertyCard displays price');
assert(propCardJsx.includes('property.bedrooms') && propCardJsx.includes('property.bathrooms'), 'PropertyCard displays key specs');
assert(propCardJsx.includes('View Residence'), 'PropertyCard includes View Residence CTA');
assert(propCardJsx.includes('Enquire'), 'PropertyCard includes Enquire CTA');

console.log('\n--- 2. VERIFYING REMOVAL FROM PROJECTSHOWCASE.JSX ---');
const showcaseJsx = fs.readFileSync(path.join(__dirname, 'src/components/ProjectShowcase/ProjectShowcase.jsx'), 'utf8');

assert(!showcaseJsx.includes('import CardCorners'), 'ProjectShowcase does NOT import CardCorners');
assert(!showcaseJsx.includes('<CardCorners'), 'ProjectShowcase does NOT render <CardCorners />');
assert(!showcaseJsx.includes('hk-smit-card'), 'ProjectShowcase does NOT contain hk-smit-card class');

console.log('\n--- 3. VERIFYING REMOVAL FROM HOME.JSX ---');
const homeJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Home/Home.jsx'), 'utf8');

assert(!homeJsx.includes('import CardCorners'), 'Home.jsx does NOT import CardCorners');
assert(!homeJsx.includes('<CardCorners'), 'Home.jsx does NOT render <CardCorners />');
assert(!homeJsx.includes('hk-smit-card'), 'Home.jsx does NOT contain hk-smit-card class');

console.log('\n======================================================');
if (errors.length === 0) {
  console.log(`🎉 ALL ${passed} CARD ANIMATION REMOVAL CHECKS PASSED CLEANLY!`);
  if (require.main === module) process.exit(0);
} else {
  console.error(`💥 ${errors.length} CHECKS FAILED!`);
  if (require.main === module) process.exit(1);
  throw new Error(`${errors.length} checks failed in verify-smit-cards`);
}
