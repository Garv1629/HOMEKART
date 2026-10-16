const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('HOMEKART REALTY — SKEW-SLIDE BUTTON VERIFICATION');
console.log('====================================================\n');

// 1. Verify CSS Files
const componentsCss = fs.readFileSync(path.join(__dirname, 'src/styles/components.css'), 'utf8');
const headerCss = fs.readFileSync(path.join(__dirname, 'src/components/Header/Header.css'), 'utf8');
const homeCss = fs.readFileSync(path.join(__dirname, 'src/pages/Home/Home.css'), 'utf8');
const cardCss = fs.readFileSync(path.join(__dirname, 'src/components/PropertyCard/PropertyCard.css'), 'utf8');
const showcaseCss = fs.readFileSync(path.join(__dirname, 'src/components/ProjectShowcase/ProjectShowcase.css'), 'utf8');
const footerCss = fs.readFileSync(path.join(__dirname, 'src/components/Footer/Footer.css'), 'utf8');

console.log('1. Verifying Core Shared Skew-Slide CSS in components.css:');
assert(componentsCss.includes('.hk-btn::before') || componentsCss.includes('.cssbuttons-io::before'), 'Missing ::before pseudo-element in components.css');
assert(componentsCss.includes('skewX(-25deg)') || componentsCss.includes('skew('), 'Missing skew transform in components.css');
assert(componentsCss.includes('translate3d(115%') || componentsCss.includes('translate3d(100%') || componentsCss.includes('translate3d('), 'Missing translate3d hover slide in components.css');
assert(componentsCss.includes('scale(0.96)'), 'Missing subtle scale-down (0.96) on :active in components.css');
assert(componentsCss.includes(':focus-visible'), 'Missing focus-visible accessibility support in components.css');
assert(componentsCss.includes('prefers-reduced-motion'), 'Missing reduced-motion media query in components.css');
assert(componentsCss.includes('#432F2E'), 'Missing chocolate brown brand base (#432F2E) in components.css');
assert(componentsCss.includes('#FEEFB8') || componentsCss.includes('var(--hk-butter-yellow)'), 'Missing butter yellow (#FEEFB8) in components.css');
assert(componentsCss.includes('#C4DAE8') || componentsCss.includes('var(--hk-powder-blue)'), 'Missing powder blue (#C4DAE8) in components.css');
console.log('  ✓ Core shared skew-slide CSS passes all checks.\n');

console.log('2. Verifying Navbar CTA in Header.css:');
assert(headerCss.includes('.hk-header__cta::before'), 'Missing ::before in Header.css');
assert(headerCss.includes('skewX(-25deg)'), 'Missing skewX in Header.css');
assert(headerCss.includes('translate3d(115%'), 'Missing translate3d in Header.css');
assert(headerCss.includes('scale(0.96)'), 'Missing scale(0.96) in Header.css');
console.log('  ✓ Navbar CTA button passes all checks.\n');

console.log('3. Verifying Hero Buttons & Diptych Buttons in Home.css:');
assert(homeCss.includes('.hk-hero__btn::before'), 'Missing ::before in .hk-hero__btn');
assert(homeCss.includes('.hk-hero__btn:hover::before'), 'Missing hover slide in .hk-hero__btn');
assert(homeCss.includes('.hk-diptych-card__enquire-btn::before'), 'Missing ::before in .hk-diptych-card__enquire-btn');
assert(homeCss.includes('.hk-home-brand__btn::before'), 'Missing ::before in .hk-home-brand__btn');
console.log('  ✓ Hero, diptych, and brand buttons pass all checks.\n');

console.log('4. Verifying PropertyCard Buttons in PropertyCard.css:');
assert(cardCss.includes('.hk-editorial-card__view-btn::before'), 'Missing ::before in PropertyCard view button');
assert(cardCss.includes('.hk-editorial-card__enquire-btn::before'), 'Missing ::before in PropertyCard enquire button');
assert(cardCss.includes('scale(0.96)'), 'Missing scale-down in PropertyCard buttons');
console.log('  ✓ PropertyCard buttons pass all checks.\n');

console.log('5. Verifying Project Showcase CTA in ProjectShowcase.css:');
assert(showcaseCss.includes('.hk-editorial-showcase__cta-btn::before'), 'Missing ::before in ProjectShowcase.css');
assert(showcaseCss.includes('scale(0.96)'), 'Missing scale(0.96) in ProjectShowcase.css');
console.log('  ✓ Project Showcase CTA button passes all checks.\n');

console.log('6. Verifying Reusable Button Component:');
const buttonJsx = fs.readFileSync(path.join(__dirname, 'src/components/Button/Button.jsx'), 'utf8');
assert(buttonJsx.includes('hk-btn'), 'Button component missing hk-btn class');
assert(buttonJsx.includes('cssbuttons-io'), 'Button component missing cssbuttons-io class');
assert(buttonJsx.includes('hk-btn__content'), 'Button component missing hk-btn__content wrapper');
assert(buttonJsx.includes('Link'), 'Button component missing polymorphic Link support');
console.log('  ✓ Reusable Button component passes all checks.\n');

console.log('7. Verifying Footer Buttons in Footer.jsx:');
const footerJsx = fs.readFileSync(path.join(__dirname, 'src/components/Footer/Footer.jsx'), 'utf8');
assert(footerJsx.includes('hk-footer__cta-btn'), 'Missing footer CTA button');
assert(footerJsx.includes('hk-footer__social-btn'), 'Missing footer social buttons');
console.log('  ✓ Footer buttons pass all checks.\n');

console.log('8. Verifying Filter Reset in Properties.jsx:');
const propertiesJsx = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.jsx'), 'utf8');
assert(propertiesJsx.includes('hk-filters__reset-btn'), 'Missing reset button in filter bar');
assert(propertiesJsx.includes('handleClearFilters'), 'Missing clear filters handler');
console.log('  ✓ Filter buttons pass all checks.\n');

console.log('====================================================');
console.log('ALL VERIFICATION CHECKS PASSED: 100% SUCCESS!');
console.log('====================================================');
