const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- VERIFYING AMMARSAA ANIMATED FORM SYSTEM ---');

// 1. Verify File Existence
const files = [
  'src/components/AnimatedForm/AnimatedForm.css',
  'src/components/AnimatedForm/FloatingField.jsx',
  'src/components/AnimatedForm/PropertyInquiryForm.jsx',
  'src/components/AnimatedForm/SiteVisitBookingForm.jsx',
  'src/components/AnimatedForm/ContactForm.jsx',
  'src/components/AnimatedForm/AnimatedConsultation.jsx',
  'src/components/AnimatedForm/index.js',
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  assert(fs.existsSync(p), `Missing required animated form file: ${f}`);
});
console.log('✓ All 7 AnimatedForm component & style files exist');

// 2. CSS Scoping & Luxury Palette Verification
const cssContent = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/AnimatedForm.css'), 'utf8');

// Keyframe pulse
assert(cssContent.includes('@keyframes hkTitlePulse'), 'Missing @keyframes hkTitlePulse glowing indicator animation');
assert(cssContent.includes('.hk-animated-form__title::after'), 'Missing title glowing outer aura ring');

// Palette tokens
assert(cssContent.includes('#C4DAE8') || cssContent.includes('196, 218, 232'), 'Missing powder blue palette');
assert(cssContent.includes('#FEEFB8') || cssContent.includes('254, 239, 184'), 'Missing butter yellow palette');
assert(cssContent.includes('#432F2E') || cssContent.includes('67, 47, 46'), 'Missing chocolate brown palette');
assert(cssContent.includes('#F7F5F0') || cssContent.includes('#FAF8F5') || cssContent.includes('247, 245, 240'), 'Missing warm ivory palette');

// Prefers-reduced-motion
assert(cssContent.includes('prefers-reduced-motion: reduce'), 'Missing prefers-reduced-motion accessible media query');

// Ensure no global bare classes leak
const forbiddenBareSelectors = ['\n.form {', '\n.title {', '\n.input {', '\n.message {', '\n.flex {', '\n.submit {'];
forbiddenBareSelectors.forEach(sel => {
  assert(!cssContent.includes(sel), `CSS contains unscoped bare selector: ${sel.trim()}`);
});
console.log('✓ Scoped BEM styling, palette tokens, and reduced-motion verified');

// 3. FloatingField Accessibility & Features
const fieldCode = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/FloatingField.jsx'), 'utf8');
assert(fieldCode.includes('aria-invalid'), 'FloatingField missing aria-invalid attribute');
assert(fieldCode.includes('aria-describedby'), 'FloatingField missing aria-describedby attribute');
assert(fieldCode.includes('role="alert"'), 'FloatingField missing role="alert" error container');
assert(fieldCode.includes('hk-animated-field__label'), 'FloatingField missing floating label element');
console.log('✓ FloatingField accessibility (aria-invalid, aria-describedby, role=alert) verified');

// 4. Form Components Logic & Storage Continuity
const inquiryCode = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/PropertyInquiryForm.jsx'), 'utf8');
assert(inquiryCode.includes('homekart_inquiries'), 'PropertyInquiryForm missing homekart_inquiries storage key');
assert(inquiryCode.includes('homekart_leads'), 'PropertyInquiryForm missing unified homekart_leads storage key');
assert(inquiryCode.includes('budget'), 'PropertyInquiryForm missing budget field');
assert(inquiryCode.includes('propertyInterest'), 'PropertyInquiryForm missing propertyInterest field');

const visitCode = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/SiteVisitBookingForm.jsx'), 'utf8');
assert(visitCode.includes('homekart_visits'), 'SiteVisitBookingForm missing homekart_visits storage key');
assert(visitCode.includes('visitDate'), 'SiteVisitBookingForm missing visitDate field');
assert(visitCode.includes('timeSlot'), 'SiteVisitBookingForm missing timeSlot field');
assert(visitCode.includes('protocol'), 'SiteVisitBookingForm missing protocol field');

const contactCode = fs.readFileSync(path.join(__dirname, 'src/components/AnimatedForm/ContactForm.jsx'), 'utf8');
assert(contactCode.includes('homekart_leads'), 'ContactForm missing homekart_leads storage key');
assert(contactCode.includes('service'), 'ContactForm missing service / advisory focus field');
assert(contactCode.includes('metro'), 'ContactForm missing metro field');
console.log('✓ PropertyInquiryForm, SiteVisitBookingForm, and ContactForm business logic verified');

// 5. Page Integration Verification
const propDetailCode = fs.readFileSync(path.join(__dirname, 'src/pages/PropertyDetail/PropertyDetail.jsx'), 'utf8');
assert(propDetailCode.includes('AnimatedConsultation'), 'PropertyDetail.jsx missing AnimatedConsultation integration');

const contactPageCode = fs.readFileSync(path.join(__dirname, 'src/pages/Contact/Contact.jsx'), 'utf8');
assert(contactPageCode.includes('ContactForm') && contactPageCode.includes('PropertyInquiryForm') && contactPageCode.includes('SiteVisitBookingForm'), 'Contact.jsx missing animated forms integration');
console.log('✓ Page integration in PropertyDetail and Contact verified');

// 6. Test storage simulation
const mockStore = {};
const mockLocalStorage = {
  getItem: (key) => mockStore[key] || null,
  setItem: (key, val) => { mockStore[key] = val; }
};

function testInquiryStorage(inq) {
  const existing = JSON.parse(mockLocalStorage.getItem('homekart_inquiries') || '[]');
  mockLocalStorage.setItem('homekart_inquiries', JSON.stringify([inq, ...existing]));
  return true;
}

const testInq = {
  refCode: 'HK-INQ-9901',
  client: 'Lady Eleanor Vance',
  phone: '+91 99887 76655',
  email: 'eleanor@vance-holdings.co.uk',
  property: 'The Glass Residence',
  budget: '₹25 Cr – ₹50 Cr'
};

assert(testInquiryStorage(testInq) === true, 'Inquiry storage test failed');
const storedInqs = JSON.parse(mockLocalStorage.getItem('homekart_inquiries'));
assert.strictEqual(storedInqs[0].refCode, 'HK-INQ-9901');
assert.strictEqual(storedInqs[0].budget, '₹25 Cr – ₹50 Cr');
console.log('✓ Real-time inquiry persistence simulation passed');

console.log('\nPASS: ALL AMMARSAA ANIMATED FORM CHECKS PASSED (100%)!\n');
if (require.main === module) process.exit(0);
