const fs = require('fs');
const path = require('path');

const contactCssPath = path.resolve('src/pages/Contact/Contact.css');
const contactCss = fs.readFileSync(contactCssPath, 'utf8');

console.log('=== CONTACT.CSS AUDIT ===');

// 1. Font sizes
const fontSizeRegex = /font-size\s*:\s*([^;]+);/g;
let match;
const fontSizes = new Set();
while ((match = fontSizeRegex.exec(contactCss)) !== null) {
  fontSizes.add(match[1].trim());
}
console.log('Contact.css font-sizes (' + fontSizes.size + '):', Array.from(fontSizes));

// 2. Text colors
const colorRegex = /(?:^|\s|\{|;)color\s*:\s*([^;!]+)/g;
const colors = new Set();
while ((match = colorRegex.exec(contactCss)) !== null) {
  colors.add(match[1].trim());
}
console.log('Contact.css colors (' + colors.size + '):', Array.from(colors));

// 3. Border radii
const radiusRegex = /border-radius\s*:\s*([^;!]+)/g;
const radii = new Set();
while ((match = radiusRegex.exec(contactCss)) !== null) {
  radii.add(match[1].trim());
}
console.log('Contact.css border-radii (' + radii.size + '):', Array.from(radii));

// Check AnimatedForm.css as well
const animCssPath = path.resolve('src/components/AnimatedForm/AnimatedForm.css');
const animCss = fs.readFileSync(animCssPath, 'utf8');

const animFontSizes = new Set();
while ((match = fontSizeRegex.exec(animCss)) !== null) {
  animFontSizes.add(match[1].trim());
}
console.log('\nAnimatedForm.css font-sizes (' + animFontSizes.size + '):', Array.from(animFontSizes));

const animColors = new Set();
while ((match = colorRegex.exec(animCss)) !== null) {
  animColors.add(match[1].trim());
}
console.log('AnimatedForm.css colors (' + animColors.size + '):', Array.from(animColors));

const animRadii = new Set();
while ((match = radiusRegex.exec(animCss)) !== null) {
  animRadii.add(match[1].trim());
}
console.log('AnimatedForm.css border-radii (' + animRadii.size + '):', Array.from(animRadii));
