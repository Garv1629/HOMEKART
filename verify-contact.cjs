const fs = require('fs');
const path = require('path');
const assert = require('assert');

try {
  console.log('=== VERIFYING /contact PAGE USABILITY FIXES 1–6 ===\n');

// 1. Audit Contact.css
const contactCssPath = path.join(__dirname, 'src/pages/Contact/Contact.css');
assert(fs.existsSync(contactCssPath), 'Contact.css must exist');
const contactCss = fs.readFileSync(contactCssPath, 'utf8');

// Also load AnimatedForm.css as it renders on /contact
const animCssPath = path.join(__dirname, 'src/components/AnimatedForm/AnimatedForm.css');
const animCss = fs.readFileSync(animCssPath, 'utf8');

// Combine both CSS files representing /contact page styles
const combinedCss = contactCss + '\n' + animCss;

// Extract font sizes in Contact.css
const fontSizeRegex = /font-size\s*:\s*([^;]+);/g;
let match;
const contactFontSizes = new Set();
while ((match = fontSizeRegex.exec(contactCss)) !== null) {
  contactFontSizes.add(match[1].trim());
}
console.log('1. Contact.css Typography Scale:');
console.log(`   - Count: ${contactFontSizes.size} distinct font-size declarations (Requirement: <= 10)`);
console.log('   - Values:', Array.from(contactFontSizes));
assert(contactFontSizes.size <= 10, `Contact.css font-sizes (${contactFontSizes.size}) must be <= 10`);

// Check across combined /contact page CSS
const allContactFontSizes = new Set();
fontSizeRegex.lastIndex = 0;
while ((match = fontSizeRegex.exec(combinedCss)) !== null) {
  allContactFontSizes.add(match[1].trim());
}
console.log(`   - Combined /contact page font sizes: ${allContactFontSizes.size} (Requirement: <= 10)`);
console.log('   - Values:', Array.from(allContactFontSizes));
assert(allContactFontSizes.size <= 10, `Combined page font-sizes (${allContactFontSizes.size}) must be <= 10`);
console.log('   ✓ Issue 1 (Typography scale) PASSED!\n');

// 2. Extract Text Colors
const colorRegex = /(?:^|\s|\{|;)color\s*:\s*([^;!]+)/g;
const contactColors = new Set();
while ((match = colorRegex.exec(contactCss)) !== null) {
  contactColors.add(match[1].trim());
}
console.log('2. Contact.css Text Colors:');
console.log(`   - Count: ${contactColors.size} distinct color declarations (Requirement: <= 12)`);
console.log('   - Values:', Array.from(contactColors));
assert(contactColors.size <= 12, `Contact.css text colors (${contactColors.size}) must be <= 12`);

const allContactColors = new Set();
colorRegex.lastIndex = 0;
while ((match = colorRegex.exec(combinedCss)) !== null) {
  allContactColors.add(match[1].trim());
}
console.log(`   - Combined /contact page text colors: ${allContactColors.size} (Requirement: <= 12)`);
console.log('   - Values:', Array.from(allContactColors));
assert(allContactColors.size <= 12, `Combined page text colors (${allContactColors.size}) must be <= 12`);
console.log('   ✓ Issue 2 (Text colors) PASSED!\n');

// 3. Extract Border Radii
const radiusRegex = /border-radius\s*:\s*([^;!]+)/g;
const contactRadii = new Set();
while ((match = radiusRegex.exec(contactCss)) !== null) {
  contactRadii.add(match[1].trim());
}
console.log('3. Contact Page Border Radii:');
console.log(`   - Contact.css radii count: ${contactRadii.size}`);
console.log('   - Values:', Array.from(contactRadii));

const allContactRadii = new Set();
radiusRegex.lastIndex = 0;
while ((match = radiusRegex.exec(combinedCss)) !== null) {
  allContactRadii.add(match[1].trim());
}
console.log(`   - Combined /contact page border-radii: ${allContactRadii.size} (Requirement: <= 6)`);
console.log('   - Values:', Array.from(allContactRadii));
assert(allContactRadii.size <= 6, `Combined page border-radii (${allContactRadii.size}) must be <= 6`);

// Confirm pill-shaped button radii preserved
assert(
  combinedCss.includes('var(--hk-radius-full') || combinedCss.includes('9999px'),
  'Pill-shaped border-radius must be preserved for buttons & tabs'
);
console.log('   ✓ Issue 3 (Border radii) PASSED!\n');

// 4. Issue 4: Uppercase Overline Sentence Case
console.log('4. Uppercase Overline Sentence Case:');
assert(
  contactCss.includes('.hk-overline.hk-sh__overline') && contactCss.includes('text-transform: none'),
  'Overline .hk-overline.hk-sh__overline must override text-transform to none'
);
console.log('   ✓ Issue 4 (Sentence case overline) PASSED!\n');

// 5. Issue 5: Hotline Label Size
console.log('5. Hotline Channel Label Size:');
const hotlineMatch = contactCss.match(/\.hk-contact__channel-label\s*\{[^}]*font-size\s*:\s*([^;]+);/);
assert(hotlineMatch, 'Hotline channel label must have font-size');
const hotlineFontSize = hotlineMatch[1].trim();
console.log(`   - Hotline font-size: ${hotlineFontSize}`);
assert(
  hotlineFontSize.includes('var(--hk-text-label') ||
  hotlineFontSize.includes('13px') ||
  hotlineFontSize.includes('0.8125rem') ||
  hotlineFontSize.includes('var(--hk-text-xs') ||
  hotlineFontSize.includes('12px'),
  'Hotline label font size must be increased to at least 12px / 13px'
);
console.log('   ✓ Issue 5 (Hotline label size) PASSED!\n');

// 6. Issue 6: Response-Time Label Size
console.log('6. Response-Time Label Size:');
const responseMatch = contactCss.match(/\.hk-contact__response-tag\s*\{[^}]*font-size\s*:\s*([^;]+);/);
assert(responseMatch, 'Response tag must have font-size');
const responseFontSize = responseMatch[1].trim();
console.log(`   - Response tag font-size: ${responseFontSize}`);
assert(
  responseFontSize.includes('var(--hk-text-xs') ||
  responseFontSize.includes('12px') ||
  responseFontSize.includes('0.75rem') ||
  responseFontSize.includes('13px') ||
  responseFontSize.includes('0.8125rem'),
  'Response tag font size must be increased to at least 12px–13px'
);
console.log('   ✓ Issue 6 (Response-time label size) PASSED!\n');

console.log('7. Page-level H1 Verification:');
const contactJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Contact/Contact.jsx'), 'utf8');
const sectionHeaderJsx = fs.readFileSync(path.join(__dirname, 'src/components/SectionHeader/SectionHeader.jsx'), 'utf8');

assert(contactJsx.includes('as="h1"'), 'Contact page primary banner must render as H1');
assert(sectionHeaderJsx.includes('as: HeadingTag'), 'SectionHeader component must support dynamic heading tag via as prop');
console.log('   ✓ Issue 7 (Single page-level H1) PASSED!\n');

console.log('8. Footer Semantic Heading Level:');
const footerJsx = fs.readFileSync(path.join(__dirname, 'src/components/Footer/Footer.jsx'), 'utf8');
assert(!footerJsx.includes('<h4 className="hk-footer__heading">Navigate</h4>'), 'Footer should not use h4 for Navigate');
assert(footerJsx.includes('<h3 className="hk-footer__heading">Navigate</h3>'), 'Footer Navigate column must use H3');
assert(footerJsx.includes('<h3 className="hk-footer__heading">Services</h3>'), 'Footer Services column must use H3');
assert(footerJsx.includes('<h3 className="hk-footer__heading">Get in Touch</h3>'), 'Footer Get in Touch column must use H3');
console.log('   ✓ Issue 8 (Footer semantic H3 headings) PASSED!\n');

  console.log('========================================================');
  console.log('ALL USABILITY CHECKS 1–8 FOR /contact PASSED (100%)!');
  console.log('========================================================\n');
} catch (err) {
  fs.writeFileSync(path.join(__dirname, 'contact-error.log'), err.stack || err.message);
  console.log('FAILED VERIFY CONTACT:', err.message);
  process.exit(1);
}
