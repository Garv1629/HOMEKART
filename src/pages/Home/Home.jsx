import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import ProjectShowcase from '../../components/ProjectShowcase/ProjectShowcase';
import ConsultationForm from '../../components/ConsultationForm/ConsultationForm';
import { SearchBar } from '../../components/Input';
import { properties, featuredProperties, testimonials, companyInfo } from '../../data/properties';
import { useScrollToTop, useInView, usePrefersReducedMotion } from '../../hooks/useUtils';
import './Home.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85';

export default function Home() {
  useScrollToTop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [statsRef, statsVisible] = useInView();
  const [brandRef, brandVisible] = useInView();
  const [consultRef, consultVisible] = useInView();
  const [leadRef, leadVisible] = useInView({ threshold: 0.1 });
  const [duoLeftRef, duoLeftVisible] = useInView({ threshold: 0.1 });
  const [duoRightRef, duoRightVisible] = useInView({ threshold: 0.1 });
  const consultSectionRef = useRef(null);

  const [selectedShowcaseName, setSelectedShowcaseName] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (query) => {
    const q = query !== undefined ? query : heroSearch;
    if (q && q.trim()) {
      navigate(`/properties?search=${encodeURIComponent(q.trim())}`);
    } else {
      navigate('/properties');
    }
  };

  const leadProperty = featuredProperties[0];
  const secondaryFeatured = featuredProperties.slice(1, 3);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // Restrained scroll-based translation & subtle scale (disabled under reduced motion)
  const parallaxOffset = prefersReducedMotion ? 0 : Math.min(scrollY * 0.18, 100);
  const parallaxScale = prefersReducedMotion ? 1 : (1 + Math.min(scrollY * 0.00006, 0.025));

  const handleShowcaseInquire = (projectName) => {
    setSelectedShowcaseName(projectName);
    if (consultSectionRef.current) {
      consultSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hk-hero" aria-label="Hero">
        <div
          className="hk-hero__bg"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${parallaxScale})`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&auto=format&fit=crop&q=90"
            alt="Modern architectural residence with expansive glass walls and reflective waters"
            className="hk-hero__bg-image"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_IMAGE) {
                e.currentTarget.src = FALLBACK_IMAGE;
              }
            }}
          />
          <div className="hk-hero__scrim" />
        </div>

        <div className="hk-container hk-hero__content">
          <div className="hk-hero__reveal hk-hero__reveal--1">
            <span className="hk-hero__overline">
              <span className="hk-script hk-hero__script-tag">Exclusive Estates</span>
              Homekart Realty • Private Client Group
            </span>
          </div>

          <h1 className="hk-hero__title hk-hero__reveal hk-hero__reveal--2">
            Where Luxury<br />
            <span className="hk-hero__title-em">Finds Its Address</span>
          </h1>

          <p className="hk-hero__subtitle hk-hero__reveal hk-hero__reveal--3">
            Curating exceptional architectural residences and bespoke living experiences<br className="hk-hero__br" />
            across India's most prestigious metropolitan addresses.
          </p>

          {/* Smit-Prajapati Signature Pill Search Bar */}
          <div className="hk-hero__search-wrap hk-hero__reveal hk-hero__reveal--4">
            <SearchBar
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              onClear={() => setHeroSearch('')}
              onSubmit={handleHeroSearch}
              placeholder="Search Mumbai penthouses, Bengaluru villas, Delhi estates…"
              aria-label="Search luxury residences across India"
            />
          </div>

          <div className="hk-hero__actions hk-hero__reveal hk-hero__reveal--4">
            <Link to="/properties" className="hk-hero__btn hk-hero__btn--primary">
              <span>Explore Collection</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#consultation" className="hk-hero__btn hk-hero__btn--secondary">
              <span>Private Consultation</span>
            </a>
          </div>

          <div className="hk-hero__footer hk-hero__reveal hk-hero__reveal--5">
            <div className="hk-hero__meta-item">
              <span className="hk-hero__meta-label">Prime Metros</span>
              <span className="hk-hero__meta-value">Mumbai • Gurugram • Bengaluru • New Delhi</span>
            </div>
            <div className="hk-hero__meta-sep" aria-hidden="true" />
            <div className="hk-hero__meta-item">
              <span className="hk-hero__meta-label">Advisory Desk</span>
              <span className="hk-hero__meta-value">Off-Market & Generational Estates</span>
            </div>
          </div>
        </div>

        <div className="hk-hero__scroll-hint" aria-hidden="true">
          <span className="hk-hero__scroll-text">Scroll to Discover</span>
          <span className="hk-hero__scroll-bar" />
        </div>
      </section>

      {/* ── Architectural Monograph Metrics ───────────────────────────── */}
      <section
        ref={statsRef}
        className={`hk-stats ${statsVisible ? 'hk-stats--visible' : ''}`}
        aria-label="Verified company statistics and stewardship benchmarks"
      >
        <div className="hk-container">
          <div className="hk-stats__intro">
            <span className="hk-stats__overline">Audited Portfolio Benchmarks • Since {companyInfo.founded}</span>
            <h2 className="hk-stats__heading">A Record of Quiet Discernment</h2>
          </div>

          <div className="hk-stats__strip">
            <div className="hk-stats__item">
              <span className="hk-stats__number">{companyInfo.propertiesSold}</span>
              <span className="hk-stats__label">Properties Transacted</span>
              <p className="hk-stats__desc">
                Bespoke acquisitions & private transfers across premier luxury corridors.
              </p>
            </div>

            <div className="hk-stats__divider" aria-hidden="true" />

            <div className="hk-stats__item">
              <span className="hk-stats__number">{companyInfo.citiesPresent}</span>
              <span className="hk-stats__label">Key Metros & Corridors</span>
              <p className="hk-stats__desc">
                Regional advisory suites spanning Mumbai, NCR, Bengaluru & New Delhi.
              </p>
            </div>

            <div className="hk-stats__divider" aria-hidden="true" />

            <div className="hk-stats__item">
              <span className="hk-stats__number">{companyInfo.clientSatisfaction}</span>
              <span className="hk-stats__label">Client Advocacy Rating</span>
              <p className="hk-stats__desc">
                Independent satisfaction audit across high-net-worth families & diaspora.
              </p>
            </div>

            <div className="hk-stats__divider" aria-hidden="true" />

            <div className="hk-stats__item">
              <span className="hk-stats__number">{new Date().getFullYear() - companyInfo.founded}+</span>
              <span className="hk-stats__label">Years of Stewardship</span>
              <p className="hk-stats__desc">
                Established {companyInfo.founded}. Uninterrupted custodial advisory and private representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Residences Editorial Showcase ────────────────────── */}
      <section className="hk-section hk-featured-showcase" aria-label="Featured properties">
        <div className="hk-container">
          <SectionHeader
            overline="Curated Portfolio"
            title="Featured Residences"
            description="An editorial presentation of our signature residential acquisitions, defined by architectural pedigree, spatial distinction, and verified provenance."
          />

          <div className="hk-featured-editorial">
            {/* Primary Monograph Lead (Asymmetrical Hero Feature) */}
            {leadProperty && (
              <article
                ref={leadRef}
                className={`hk-lead-residence ${leadVisible ? 'hk-lead-residence--visible' : ''}`}
              >
                <div className="hk-lead-residence__media">
                  <Link
                    to={`/properties/${leadProperty.slug}`}
                    className="hk-lead-residence__img-link"
                    aria-label={`Explore architectural dossier for ${leadProperty.title}`}
                  >
                    <img
                      src={leadProperty.image || FALLBACK_IMAGE}
                      alt={leadProperty.title}
                      className="hk-lead-residence__img"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK_IMAGE) {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                    <div className="hk-lead-residence__scrim" />
                  </Link>
                  <span className="hk-lead-residence__badge">{leadProperty.status}</span>
                  <span className="hk-lead-residence__city-tag">{leadProperty.city}</span>
                </div>

                <div className="hk-lead-residence__dossier">
                  <div className="hk-lead-residence__top">
                    <span className="hk-lead-residence__index">01 / SIGNATURE PENTHOUSE</span>
                    <span className="hk-lead-residence__price">{leadProperty.priceFormatted}</span>
                  </div>

                  <h3 className="hk-lead-residence__title">
                    <Link to={`/properties/${leadProperty.slug}`} className="hk-lead-residence__title-link">
                      {leadProperty.title}
                    </Link>
                  </h3>

                  <p className="hk-lead-residence__location">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <span>{leadProperty.location}</span>
                  </p>

                  <p className="hk-lead-residence__narrative">
                    {leadProperty.description.slice(0, 195)}…
                  </p>

                  <div className="hk-lead-residence__specs">
                    <div className="hk-lead-residence__spec-item">
                      <span className="hk-lead-residence__spec-num">{leadProperty.bedrooms}</span>
                      <span className="hk-lead-residence__spec-label">Bedrooms</span>
                    </div>
                    <div className="hk-lead-residence__spec-sep" />
                    <div className="hk-lead-residence__spec-item">
                      <span className="hk-lead-residence__spec-num">{leadProperty.bathrooms}</span>
                      <span className="hk-lead-residence__spec-label">Bathrooms</span>
                    </div>
                    <div className="hk-lead-residence__spec-sep" />
                    <div className="hk-lead-residence__spec-item">
                      <span className="hk-lead-residence__spec-num">{leadProperty.area.toLocaleString()}</span>
                      <span className="hk-lead-residence__spec-label">{leadProperty.areaUnit}</span>
                    </div>
                    <div className="hk-lead-residence__spec-sep" />
                    <div className="hk-lead-residence__spec-item">
                      <span className="hk-lead-residence__spec-num">{leadProperty.yearBuilt}</span>
                      <span className="hk-lead-residence__spec-label">Completed</span>
                    </div>
                  </div>

                  <div className="hk-lead-residence__actions">
                    <Link
                      to={`/properties/${leadProperty.slug}`}
                      className="hk-btn hk-btn--primary"
                    >
                      <span>Explore Residence</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href="#consultation"
                      className="hk-btn hk-btn--secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShowcaseInquire(leadProperty.title);
                      }}
                    >
                      <span>Schedule Private Viewing</span>
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* Asymmetrical Editorial Duo */}
            <div className="hk-featured-diptych">
              {secondaryFeatured.map((property, idx) => (
                <article
                  key={property.id}
                  ref={idx === 0 ? duoLeftRef : duoRightRef}
                  className={`hk-diptych-card hk-diptych-card--${idx === 0 ? 'left' : 'right'} ${(idx === 0 ? duoLeftVisible : duoRightVisible) ? 'hk-diptych-card--visible' : ''}`}
                >
                  <div className="hk-diptych-card__media">
                    <Link
                      to={`/properties/${property.slug}`}
                      className="hk-diptych-card__img-link"
                      aria-label={`View ${property.title}`}
                    >
                      <img
                        src={property.image || FALLBACK_IMAGE}
                        alt={property.title}
                        className="hk-diptych-card__img"
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== FALLBACK_IMAGE) {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }
                        }}
                      />
                      <div className="hk-diptych-card__scrim" />
                    </Link>
                    <span className="hk-diptych-card__badge">{property.status}</span>
                    <span className="hk-diptych-card__city">{property.city}</span>

                    {/* Hover-revealed architectural highlight */}
                    {property.features && property.features.length > 0 && (
                      <div className="hk-diptych-card__hover-feature" aria-hidden="true">
                        <span>✦ {property.features[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="hk-diptych-card__content">
                    <div className="hk-diptych-card__meta-bar">
                      <span className="hk-diptych-card__index">
                        0{idx + 2} / {property.type.toUpperCase()}
                      </span>
                      <span className="hk-diptych-card__price">{property.priceFormatted}</span>
                    </div>

                    <h3 className="hk-diptych-card__title">
                      <Link to={`/properties/${property.slug}`}>
                        {property.title}
                      </Link>
                    </h3>

                    <p className="hk-diptych-card__location">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span>{property.location}</span>
                    </p>

                    <div className="hk-diptych-card__specs">
                      <span>{property.bedrooms} Bed</span>
                      <span className="hk-diptych-card__dot">•</span>
                      <span>{property.bathrooms} Bath</span>
                      <span className="hk-diptych-card__dot">•</span>
                      <span>{property.area.toLocaleString()} {property.areaUnit}</span>
                    </div>

                    <div className="hk-diptych-card__actions">
                      <Link
                        to={`/properties/${property.slug}`}
                        className="hk-diptych-card__link-btn"
                      >
                        <span>View Residence</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <a
                        href="#consultation"
                        className="hk-diptych-card__enquire-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowcaseInquire(property.title);
                        }}
                      >
                        <span>Enquire</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="hk-featured-showcase__view-all">
            <Link to="/properties" className="hk-btn hk-btn--secondary hk-btn--large">
              <span>Explore Complete Collection ({properties.length} Verified Residences)</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Project Showcases ─────────────────────────────────────────── */}
      <ProjectShowcase onInquire={handleShowcaseInquire} />

      {/* ── Brand Storytelling Architectural Monograph ─────────────────── */}
      <section
        ref={brandRef}
        className={`hk-section hk-home-brand ${brandVisible ? 'hk-home-brand--visible' : ''}`}
        aria-label="Homekart Realty Brand Storytelling"
      >
        <div className="hk-container">
          <div className="hk-home-brand__editorial">
            {/* Architectural Visual Diptych */}
            <div className="hk-home-brand__visual-composition">
              <div className="hk-home-brand__primary-frame">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85"
                  alt="Modernist Indian luxury residence with reflection pool"
                  className="hk-home-brand__img-primary"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                <div className="hk-home-brand__scrim" />
                <div className="hk-home-brand__plaque">
                  <span className="hk-home-brand__plaque-label">Curatorial Philosophy</span>
                  <p className="hk-home-brand__plaque-text">
                    "A home is not an accumulation of square feet; it is the enduring stage upon which generational history unfolds."
                  </p>
                  <span className="hk-home-brand__plaque-provenance">One Horizon Centre, Gurugram • Est. {companyInfo.founded}</span>
                </div>
              </div>

              <div className="hk-home-brand__secondary-frame" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=85"
                  alt="Hand-fluted natural travertine and bronze architectural joinery"
                  className="hk-home-brand__img-secondary"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                <span className="hk-home-brand__secondary-caption">Architectural Detail / Material Purity</span>
              </div>
            </div>

            {/* Narrative Editorial Side */}
            <div className="hk-home-brand__narrative">
              <div className="hk-home-brand__meta-eyebrow">
                <span className="hk-overline">Brand Storytelling</span>
                <span className="hk-home-brand__meta-bullet">•</span>
                <span className="hk-home-brand__meta-city">Gurugram • Mumbai • Bengaluru • New Delhi</span>
              </div>

              <h2 className="hk-home-brand__headline">
                <span className="hk-script hk-brand__script-flourish">The Art of Living</span>
                Curating Spaces That<br />
                <span className="hk-home-brand__headline-em">Transcend Generations</span>
              </h2>

              <p className="hk-home-brand__lead">
                Real estate at the ultra-luxury tier is not a volume business—it is an art of quiet discernment, structural permanence, and generational memory.
              </p>

              <div className="hk-home-brand__body">
                <p>
                  Founded in {companyInfo.founded} with corporate headquarters at One Horizon Centre on Golf Course Road, Homekart Realty emerged from a clear necessity: to provide discerning families and global Indian diaspora with European private-banking discretion in luxury real estate.
                </p>
                <p>
                  From rare seafront penthouses along Mumbai’s coastline to historic restored havelis in the capital and secluded private groves in Bengaluru, every residence we represent undergoes exhaustive architectural due diligence and meticulous title verification.
                </p>
              </div>

              {/* Three Editorial Principles (No generic icon grids) */}
              <div className="hk-home-brand__principles">
                <div className="hk-home-brand__principle">
                  <div className="hk-home-brand__principle-idx">01</div>
                  <div className="hk-home-brand__principle-info">
                    <h3 className="hk-home-brand__principle-title">Off-Market Discretion</h3>
                    <p className="hk-home-brand__principle-desc">
                      Confidential private dossiers shielded from public portals, safeguarded by binding non-disclosure protocols.
                    </p>
                  </div>
                </div>

                <div className="hk-home-brand__principle">
                  <div className="hk-home-brand__principle-idx">02</div>
                  <div className="hk-home-brand__principle-info">
                    <h3 className="hk-home-brand__principle-title">Architectural Due Diligence</h3>
                    <p className="hk-home-brand__principle-desc">
                      Every residence audited for spatial integrity, natural light orientation, material purity, and structural craft.
                    </p>
                  </div>
                </div>

                <div className="hk-home-brand__principle">
                  <div className="hk-home-brand__principle-idx">03</div>
                  <div className="hk-home-brand__principle-info">
                    <h3 className="hk-home-brand__principle-title">Custodial Continuity</h3>
                    <p className="hk-home-brand__principle-desc">
                      Advisory relationships that endure far past registry—wealth structuring, heritage stewardship, and bespoke concierge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hk-home-brand__actions">
                <Link to="/about" className="hk-home-brand__btn">
                  <span>Discover Our Heritage & Advisory Ethos</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Editorial Monograph ──────────────────────────── */}
      <section className="hk-section hk-testimonials" aria-label="Verified Client Testimonials">
        <div className="hk-container">
          <SectionHeader
            overline="Verified Client Advocacy"
            title="Voices of Trust"
            description="Unvarnished reflections from our homeowners and institutional partners across Mumbai, Gurugram, and Bengaluru."
            dark
          />

          <div className="hk-testimonials-monograph">
            {/* Primary Featured Monograph — Arjun & Priya Mehta */}
            {testimonials[0] && (
              <article className="hk-testimonial-lead">
                <div className="hk-testimonial-lead__watermark" aria-hidden="true">“</div>
                <div className="hk-testimonial-lead__content">
                  <div className="hk-testimonial-lead__badge">
                    <span>Verified Homeowners • Mumbai Coastal Desk</span>
                  </div>
                  <blockquote className="hk-testimonial-lead__quote">
                    "{testimonials[0].quote}"
                  </blockquote>
                  <footer className="hk-testimonial-lead__author">
                    <img
                      src={testimonials[0].avatar}
                      alt={testimonials[0].name}
                      className="hk-testimonial-lead__avatar"
                      loading="lazy"
                    />
                    <div className="hk-testimonial-lead__meta">
                      <cite className="hk-testimonial-lead__name">{testimonials[0].name}</cite>
                      <span className="hk-testimonial-lead__role">{testimonials[0].role}</span>
                      <span className="hk-testimonial-lead__location">Bandra West, {testimonials[0].location}</span>
                    </div>
                  </footer>
                </div>
              </article>
            )}

            {/* Secondary Editorial Diptych — Kavitha Reddy & Rohan Kapoor */}
            <div className="hk-testimonials-diptych">
              {testimonials.slice(1).map((t) => (
                <article key={t.id} className="hk-testimonial-sub">
                  <div className="hk-testimonial-sub__top">
                    <span className="hk-testimonial-sub__loc-tag">
                      {t.location.toUpperCase()} DESK
                    </span>
                    <span className="hk-testimonial-sub__mark" aria-hidden="true">“</span>
                  </div>
                  <blockquote className="hk-testimonial-sub__quote">
                    "{t.quote}"
                  </blockquote>
                  <footer className="hk-testimonial-sub__author">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="hk-testimonial-sub__avatar"
                      loading="lazy"
                    />
                    <div className="hk-testimonial-sub__meta">
                      <cite className="hk-testimonial-sub__name">{t.name}</cite>
                      <span className="hk-testimonial-sub__role">{t.role}</span>
                    </div>
                  </footer>
                </article>
              ))}
            </div>

            {/* Credibility & Privacy Disclaimer Note */}
            <div className="hk-testimonials-footnote">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>
                All testimonials are unedited reflections from verified private clients. Personal identifiers and transactional figures are protected in strict adherence to client Non-Disclosure Agreements.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── On-Page Consultation Section ──────────────────────────────── */}
      <section
        id="consultation"
        ref={consultSectionRef}
        className="hk-section hk-home-consultation"
        aria-label="Consultation booking"
      >
        <div className="hk-container hk-container--narrow">
          <div ref={consultRef} className={`hk-home-consultation__inner ${consultVisible ? 'hk-home-consultation--visible' : ''}`}>
            <SectionHeader
              overline="Private Advisory Desk"
              title="Schedule a Private Consultation"
              description="Whether reserving an exclusive walkthrough, requesting an off-market dossier, or seeking bespoke investment analysis, our Managing Partners are at your disposal."
            />

            <ConsultationForm
              defaultProperty={selectedShowcaseName}
              defaultService="Private Viewing"
            />

            <div className="hk-home-consultation__trust">
              <span>Direct Managing Partner Assignment</span>
              <span className="hk-home-consultation__trust-dot">•</span>
              <span>Binding NDA Protection</span>
              <span className="hk-home-consultation__trust-dot">•</span>
              <span>Zero Aggregator Data Sharing</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
