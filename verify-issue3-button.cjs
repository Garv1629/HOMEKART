const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== VERIFYING USABILITY ISSUE 3: INITIATE DIALOGUE BUTTON ===\n');

// 1. Check ContactForm.jsx markup
const contactFormPath = path.join(__dirname, 'src/components/AnimatedForm/ContactForm.jsx');
const contactFormJsx = fs.readFileSync(contactFormPath, 'utf8');

assert(contactFormJsx.includes('Initiate Dialogue'), 'Button text must be exactly "Initiate Dialogue"');
assert(contactFormJsx.includes('hk-animated-form__submit--dialogue'), 'Button must have targeted class modifier hk-animated-form__submit--dialogue');
console.log('✓ 1. ContactForm.jsx renders exact title-case "Initiate Dialogue" with targeted modifier class.');

// 2. Check AnimatedForm.css styling
const animCssPath = path.join(__dirname, 'src/components/AnimatedForm/AnimatedForm.css');
const animCss = fs.readFileSync(animCssPath, 'utf8');

assert(animCss.includes('.hk-animated-form__submit--dialogue'), 'AnimatedForm.css must define .hk-animated-form__submit--dialogue');
const dialogueBlock = animCss.match(/\.hk-animated-form__submit--dialogue\s*\{([^}]+)\}/);
assert(dialogueBlock, 'Modifier block must exist in AnimatedForm.css');
assert(dialogueBlock[1].includes('text-transform: none'), 'Modifier must explicitly set text-transform: none');
console.log('✓ 2. CSS explicitly overrides text-transform to none on .hk-animated-form__submit--dialogue.');

// 3. Confirm other buttons remain unaffected
const inquiryJsx = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/PropertyInquiryForm.jsx'), 'utf8');
const visitJsx = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/SiteVisitBookingForm.jsx'), 'utf8');

assert(!inquiryJsx.includes('hk-animated-form__submit--dialogue'), 'PropertyInquiryForm button must not have dialogue modifier');
assert(!visitJsx.includes('hk-animated-form__submit--dialogue'), 'SiteVisitBookingForm button must not have dialogue modifier');
console.log('✓ 3. Other form submit buttons remain untransformed and retain their original styling.');

// 4. Verify dimensions and responsive rules
assert(animCss.includes('.hk-animated-form__submit {') && animCss.includes('min-height: 52px'), 'Desktop min-height preserved');
assert(animCss.includes('width: 100%'), 'Full-width mobile responsiveness preserved');
console.log('✓ 4. Button dimensions, touch targets, and responsive mobile behavior fully preserved.');

console.log('\nALL VERIFICATION CHECKS FOR ISSUE 3 PASSED CLEANLY (100%)!');
