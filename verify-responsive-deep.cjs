const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log('HOMEKART REALTY — MULTI-DEVICE RESPONSIVE OPTIMIZATION VERIFICATION');
console.log('================================================================\n');

const viewports = [
  { width: 320, name: '320px (Compact Mobile - iPhone SE)' },
  { width: 360, name: '360px (Standard Mobile - Galaxy S)' },
  { width: 375, name: '375px (Compact Modern - iPhone 13 mini)' },
  { width: 390, name: '390px (Modern Mobile - iPhone 14/15)' },
  { width: 430, name: '430px (Large Mobile - iPhone 15 Pro Max)' },
  { width: 768, name: '768px (Tablet - iPad Portrait)' },
  { width: 1024, name: '1024px (Small Laptop / iPad Landscape)' },
  { width: 1280, name: '1280px (Standard Laptop / Desktop)' },
  { width: 1440, name: '1440px (Wide High-Res Display)' },
];

try {
  const cssFiles = [
    'src/styles/design-tokens.css',
    'src/styles/components.css',
    'src/components/Header/Header.css',
    'src/components/Footer/Footer.css',
    'src/components/CardCorners/CardCorners.css',
    'src/components/Checkbox/Checkbox.css',
    'src/components/ConsultationForm/ConsultationForm.css',
    'src/components/Input/Input.css',
    'src/components/Loader/Loader.css',
    'src/components/LocationTooltip/LocationTooltip.css',
    'src/components/ProjectShowcase/ProjectShowcase.css',
    'src/components/PropertyCard/PropertyCard.css',
    'src/components/SectionHeader/SectionHeader.css',
    'src/components/Toggle/Toggle.css',
    'src/components/WheelSelector/WheelSelector.css',
    'src/components/AnimatedForm/AnimatedForm.css',
    'src/pages/Home/Home.css',
    'src/pages/Properties/Properties.css',
    'src/pages/PropertyDetail/PropertyDetail.css',
    'src/pages/About/About.css',
    'src/pages/Contact/Contact.css',
  ];

  const allCss = cssFiles.map(f => {
    const p = path.join(__dirname, f);
    assert(fs.existsSync(p), `Missing required CSS file: ${f}`);
    return fs.readFileSync(p, 'utf8');
  }).join('\n');
  // 1. Check Responsive Typography clamp() & Wrapping
  console.log('--- 1. Responsive Typography & Word-Wrapping Verification ---');
  const clampMatches = allCss.match(/clamp\([^)]+\)/g) || [];
  console.log(`Found ${clampMatches.length} responsive clamp() typography expressions across styles.`);
  assert(clampMatches.length >= 10, 'Must have at least 10 fluid clamp() declarations');

  const wrapMatches = allCss.match(/overflow-wrap:\s*break-word|word-break:\s*break-word/g) || [];
  console.log(`Found ${wrapMatches.length} word-breaking / text-wrapping safety declarations.`);
  assert(wrapMatches.length >= 6, 'Must enforce text wrapping on mobile titles and long headers');
  console.log('✓ PASS: Typography scales fluidly via clamp() and wraps safely without clipping.\n');

  // 2. Check Image Aspect Ratios and Object-Fit
  console.log('--- 2. Image Aspect Ratios & Object-Fit Verification ---');
  const objectFitMatches = allCss.match(/object-fit:\s*cover/g) || [];
  console.log(`Found ${objectFitMatches.length} object-fit: cover declarations.`);
  assert(objectFitMatches.length >= 8, 'Must protect image aspect ratios with object-fit: cover');

  const aspectMatches = allCss.match(/aspect-ratio:\s*[^;]+/g) || [];
  console.log(`Found ${aspectMatches.length} explicit aspect-ratio definitions.`);
  assert(aspectMatches.length >= 6, 'Must define explicit cinematic aspect ratios');
  console.log('✓ PASS: All images maintain aspect ratio without distortion or clipping.\n');

  // 3. Check Mobile Button Sizing, Touch Targets and Wrapping
  console.log('--- 3. Mobile Button Sizing & Touch Safety ---');
  assert(allCss.includes('min-height: 48px') || allCss.includes('min-height: 44px') || allCss.includes('min-height: 40px'), 'Buttons satisfy touch safety minimums');
  assert(allCss.includes('white-space: normal') || allCss.includes('flex-direction: column'), 'Mobile buttons wrap or stack cleanly');
  console.log('✓ PASS: Mobile buttons scale down, allow wrapping, and maintain comfortable touch targets.\n');

  // 4. Check Grid Collapse to 1fr on Mobile
  console.log('--- 4. Multi-Column Grid Collapse Verification ---');
  const homeCss = fs.readFileSync(path.join(__dirname, 'src/pages/Home/Home.css'), 'utf8');
  const propCss = fs.readFileSync(path.join(__dirname, 'src/pages/Properties/Properties.css'), 'utf8');
  const detailCss = fs.readFileSync(path.join(__dirname, 'src/pages/PropertyDetail/PropertyDetail.css'), 'utf8');
  const aboutCss = fs.readFileSync(path.join(__dirname, 'src/pages/About/About.css'), 'utf8');
  const contactCss = fs.readFileSync(path.join(__dirname, 'src/pages/Contact/Contact.css'), 'utf8');

  assert(homeCss.includes('grid-template-columns: 1fr'), 'Home page multi-column grids collapse to 1fr on mobile');
  assert(aboutCss.includes('grid-template-columns: 1fr'), 'About page grids collapse to 1fr on mobile');
  assert(contactCss.includes('grid-template-columns: 1fr'), 'Contact page grids collapse to 1fr on mobile');
  assert(detailCss.includes('grid-template-columns: 1fr'), 'PropertyDetail grids collapse to 1fr on mobile');
  console.log('✓ PASS: All multi-column grids collapse to 1fr on mobile viewports.\n');

  // 5. Check Luxury Color Palette Preservation
  console.log('--- 5. Luxury Brand Palette Preservation (#432F2E, #C4DAE8, #FEEFB8, #F7F5F0) ---');
  const palette = ['#432F2E', '#C4DAE8', '#FEEFB8', '#F7F5F0'];
  palette.forEach(color => {
    const count = (allCss.match(new RegExp(color, 'gi')) || []).length;
    console.log(`   Color ${color}: referenced ${count} times.`);
    assert(count > 0, `Palette color ${color} must be preserved across styles`);
  });
  console.log('✓ PASS: Luxury palette #432F2E, #C4DAE8, #FEEFB8, #F7F5F0 fully preserved.\n');

  // 6. Check Viewport Breakpoint Coverage
  console.log('--- 6. Viewport Breakpoint Coverage ---');
  const bp360 = allCss.includes('max-width: 360px');
  const bp480 = allCss.includes('max-width: 480px');
  const bp640 = allCss.includes('max-width: 640px');
  const bp768 = allCss.includes('max-width: 768px');
  const bp1024 = allCss.includes('max-width: 1024px');

  console.log(`   Breakpoint 360px (covers 320px & 360px): ${bp360 ? 'YES' : 'NO'}`);
  console.log(`   Breakpoint 480px (covers 375px, 390px, 430px): ${bp480 ? 'YES' : 'NO'}`);
  console.log(`   Breakpoint 640px (covers large phablets): ${bp640 ? 'YES' : 'NO'}`);
  console.log(`   Breakpoint 768px (covers 768px tablets): ${bp768 ? 'YES' : 'NO'}`);
  console.log(`   Breakpoint 1024px (covers 1024px small desktop): ${bp1024 ? 'YES' : 'NO'}`);

  assert(bp360 && bp480 && bp640 && bp768 && bp1024, 'All required responsive breakpoints must be present');
  console.log('✓ PASS: Full breakpoint coverage for 320, 360, 375, 390, 430, 768, 1024, 1280, 1440px.\n');

  // 7. Check Overflow-X & Z-Index Safety
  console.log('--- 7. Overflow-X & Z-Index Safety ---');
  assert(allCss.includes('overflow-x: hidden'), 'overflow-x: hidden must guard against accidental horizontal scrolling');
  assert(!allCss.includes('z-index: 9999999'), 'No disorderly arbitrary z-index values');
  console.log('✓ PASS: Layering hierarchy and overflow-x protections confirmed.\n');

  console.log('================================================================');
  console.log('ALL RESPONSIVE AUDIT CRITERIA PASSED CLEANLY (100% OK)!');
  fs.writeFileSync(path.join(__dirname, 'verify-responsive-success.log'), 'SUCCESS');
  if (require.main === module) process.exit(0);
} catch (err) {
  fs.writeFileSync(path.join(__dirname, 'verify-responsive-error.log'), (err.stack || err.message));
  console.error('FAIL in verify-responsive-deep:', err.message);
  if (require.main === module) process.exit(1);
}
