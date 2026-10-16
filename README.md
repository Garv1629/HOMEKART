# Homekart Realty — Cinematic Luxury Real Estate

A cinematic luxury real-estate web application built from scratch with **React 19**, **Vite 6**, and **React Router 7**, featuring an editorial ivory, charcoal, and muted bronze design system.

---

## ✦ Design System & Aesthetic Foundation

- **Ivory Spectrum** (`#FDFCF9`, `#FAF8F3`, `#F5F1E8`): Warm, editorial off-white surfaces and backgrounds.
- **Charcoal Spectrum** (`#1A1A1A`, `#2B2B2B`, `#3D3D3D`): Deep, grounding architectural neutrals for typography and contrast elements.
- **Muted Bronze & Gold** (`#C4A265`, `#A6884A`, `#8B7234`): Metallic accents for dividers, indicators, and call-to-actions.
- **Editorial Typography**:
  - Headings: `Cormorant Garamond` (Google Fonts)
  - Body & Specifications: `Inter` (Google Fonts)
- **Cinematic Interactions**: Scroll-triggered intersection observer reveals, smooth parallax scaling, micro-animations, and full keyboard/mobile accessibility.

---

## ✦ Key Features

1. **Sticky Translucent Navbar**:
   - Dynamic blur on scroll (`rgba(253, 252, 249, 0.95)` with backdrop filter).
   - Responsive slide-out navigation drawer with animated hamburger toggle.
   - Active route detection and direct "Book a Viewing" CTA.

2. **Animated Hero Section**:
   - Slow cinematic zoom on architectural background.
   - Staggered editorial headline entry animations (`Where Luxury Finds Its Address`).
   - Animated pulsing scroll indicator.

3. **Curated Property Portfolio**:
   - Verified luxury listings across Mumbai, Gurugram, Bengaluru, and New Delhi.
   - Authentic pricing in Indian Rupees (₹ Cr / ₹ Lakh).
   - Real-time search, property type filter, buy/rent status filter, and metro city filter.
   - Responsive cards with image hover zoom and key specs (bedrooms, bathrooms, sq ft).

4. **Dedicated Property Detail Suite (`/properties/:slug`)**:
   - High-resolution architectural photo gallery with interactive thumbnail switcher.
   - Comprehensive architectural narrative, orientation, floor level, parking, and possession status.
   - Spatial room dimensions & floor plan highlights.
   - **Interactive Mortgage / Financial Estimator**: Computes monthly investment (EMI) based on down payment % and loan tenure slider.
   - Dedicated Private Client Advisor card with direct telephone link.
   - Embedded viewing reservation form pre-filled with the property title.

5. **Signature Project Showcases**:
   - Tabbed architectural landmarks (*The Aurelia Collection*, *The Whispering Pines Estate*, *The Glass Horizon*).
   - Architectural partner credits, scale, target completion, and direct dossier inquiry.

6. **Brand Storytelling (`/about`)**:
   - The Homekart Philosophy: "We believe a home is not merely a transaction; it is a sanctuary for generational memory."
   - The Three Pillars: *Architectural Provenance*, *Uncompromising Discretion*, and *Bespoke Concierge*.
   - Historical milestone timeline (2018 – Present).
   - Regional partner and leadership profiles.

7. **Consultation & Inquiry Center (`/contact`)**:
   - Interactive VIP consultation scheduler with time slot preference and booking reference generator.
   - Verified regional private suites across Gurugram, Mumbai (BKC), Bengaluru (UB City), and New Delhi (Connaught Place).
   - Direct Private Client Concierge hotline.
   - Frequently Asked Questions accordion addressing non-disclosure, legal due diligence, and NRI/OCI acquisition compliance.

8. **Floating VIP Concierge Trigger**:
   - Quick-access private desk trigger positioned on all pages.

---

## ✦ Project Structure

```
homekart/
├── public/
│   └── favicon.svg               # Minimalist architectural brand glyph
├── src/
│   ├── components/
│   │   ├── AnimatedForm/         # ammarsaa animated form system (PropertyInquiryForm, SiteVisitBookingForm, ContactForm)
│   │   ├── ConsultationForm/     # VIP scheduling form with reference generator
│   │   ├── Footer/               # Architectural 4-column footer
│   │   ├── Header/               # Sticky translucent navbar & mobile menu
│   │   ├── LocationTooltip/      # Amine-maker animated location tooltip & map pins (floating clouds, pulse marker, blur reveal)
│   │   ├── ProjectShowcase/      # Tabbed landmark developments showcase
│   │   ├── PropertyCard/         # Luxury card with image zoom & specs
│   │   └── SectionHeader/        # Editorial serif headings with bronze rule
│   ├── data/
│   │   └── properties.js         # Verified property catalog, advisors, milestones, offices
│   ├── hooks/
│   │   └── useUtils.js           # useInView, useDebounce, useScrollToTop
│   ├── pages/
│   │   ├── Home/                 # Hero, stats, featured, showcases, storytelling, testimonials
│   │   ├── Properties/           # Live search, multi-criteria filters, property grid
│   │   ├── PropertyDetail/       # Gallery, specs, floor plan, mortgage estimator, advisor
│   │   ├── About/                # Philosophy, 3 pillars, timeline, leadership
│   │   └── Contact/              # Consultation scheduler, hotline, regional suites, FAQ
│   ├── styles/
│   │   ├── design-tokens.css     # Colors, typography, spacing, shadows, animations
│   │   └── components.css        # Buttons, cards, inputs, floating trigger
│   ├── App.jsx                   # Route hierarchy & global layout
│   └── main.jsx                  # Application entry point with BrowserRouter
├── index.html                    # SEO metadata, preconnected Google Fonts
├── package.json                  # Dependencies & scripts
└── vite.config.js                # Vite build configuration
```

---

## ✦ Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```
