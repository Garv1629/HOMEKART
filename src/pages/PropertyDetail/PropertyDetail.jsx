import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../../data/properties';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ConsultationForm from '../../components/ConsultationForm/ConsultationForm';
import { AnimatedConsultation } from '../../components/AnimatedForm';
import LocationTooltip from '../../components/LocationTooltip';
import Checkbox from '../../components/Checkbox';
import Toggle from '../../components/Toggle';
import { useScrollToTop } from '../../hooks/useUtils';
import './PropertyDetail.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80';

export default function PropertyDetail() {
  useScrollToTop();
  const { slug } = useParams();

  const property = properties.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [twilightGallery, setTwilightGallery] = useState(false);

  // Mortgage / Financial Estimator State
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [includeEscrow, setIncludeEscrow] = useState(false);
  const baseInterestRate = 8.5; // Benchmark luxury home loan rate %
  const effectiveInterestRate = includeEscrow ? baseInterestRate + 0.25 : baseInterestRate;

  // Interactive Amenity Verification State
  const [verifiedAmenities, setVerifiedAmenities] = useState(() => {
    const initial = {};
    property?.features?.forEach((_, idx) => { initial[idx] = true; });
    return initial;
  });

  if (!property) {
    return (
      <main className="hk-prop-not-found">
        <div className="hk-container">
          <h1 className="hk-prop-not-found__title">Property Not Found</h1>
          <p>The residence you are looking for is currently off-market or unavailable.</p>
          <Link to="/properties" className="hk-btn hk-btn--accent">
            <span>View All Properties</span>
          </Link>
        </div>
      </main>
    );
  }

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];
  const relatedProperties = properties.filter(p => p.id !== property.id && (p.city === property.city || p.type === property.type)).slice(0, 3);

  // Mortgage calculation
  const principal = property.price * (1 - downPaymentPct / 100);
  const monthlyRate = (effectiveInterestRate / 100) / 12;
  const numberOfMonths = tenureYears * 12;
  const monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  const formatCurrency = (amt) => {
    if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`;
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} Lakh`;
    return `₹${Math.round(amt).toLocaleString('en-IN')}`;
  };

  return (
    <main className="hk-prop-detail">
      {/* ── Breadcrumb & Top Bar ───────────────────────────────────────── */}
      <div className="hk-prop-detail__topbar">
        <div className="hk-container">
          <nav className="hk-prop-detail__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/properties">Properties</Link>
            <span>/</span>
            <span className="hk-prop-detail__curr">{property.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero Gallery ──────────────────────────────────────────────── */}
      <section className="hk-prop-detail__gallery-sec" aria-label="Property Gallery">
        <div className="hk-container">
          {/* Architectural Ambiance & Lighting Switcher */}
          <div className="hk-prop-detail__lighting-bar">
            <div className="hk-prop-detail__lighting-meta">
              <span className="hk-overline">Architectural Ambiance</span>
              <span className="hk-prop-detail__lighting-title">
                {twilightGallery ? '✦ Twilight Tour: Ambient Facade & Terrace Lighting' : '✦ Daylight Solarium: Natural Solar Orientation'}
              </span>
            </div>
            <div className="hk-prop-detail__lighting-toggle-box">
              <Toggle
                id={`prop-${property.id}-lighting`}
                variant="segmented"
                size="small"
                checked={twilightGallery}
                onChange={(e) => setTwilightGallery(e.target.checked)}
                aria-label="Toggle gallery lighting between daylight and twilight"
                offLabel="Day"
                onLabel="Night"
              />
            </div>
          </div>

          <div className={`hk-prop-detail__main-img-wrap ${twilightGallery ? 'hk-prop-detail__main-img-wrap--twilight' : ''}`}>
            <img
              src={gallery[selectedImage] || FALLBACK_IMAGE}
              alt={`${property.title} view ${selectedImage + 1}`}
              className={`hk-prop-detail__main-img ${twilightGallery ? 'hk-prop-detail__main-img--twilight' : ''}`}
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_IMAGE) {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }
              }}
            />
            <span className={`hk-prop-detail__status-badge ${twilightGallery ? 'hk-prop-detail__status-badge--twilight' : ''}`}>
              {twilightGallery ? 'Twilight Tour' : property.status}
            </span>
            <div className="hk-prop-detail__gallery-counter">
              {selectedImage + 1} / {gallery.length} Photographs
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="hk-prop-detail__thumbs">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hk-prop-detail__thumb-btn ${selectedImage === idx ? 'hk-prop-detail__thumb-btn--active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`View photograph ${idx + 1}`}
                >
                  <img
                    src={img || FALLBACK_IMAGE}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== FALLBACK_IMAGE) {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Core Details & Layout ─────────────────────────────────────── */}
      <section className="hk-section hk-prop-detail__content">
        <div className="hk-container">
          <div className="hk-prop-detail__grid">
            {/* Left Column: Architectural Story & Specs */}
            <div className="hk-prop-detail__main-info">
              <div className="hk-prop-detail__header-block">
                <span className="hk-overline">{property.type} • {property.city}</span>
                <h1 className="hk-prop-detail__title">{property.title}</h1>
                <LocationTooltip property={property} position="bottom" align="left">
                  <p className="hk-prop-detail__address" style={{ cursor: 'pointer', margin: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <span>{property.location}</span>
                  </p>
                </LocationTooltip>
                <div className="hk-prop-detail__price-tag">{property.priceFormatted}</div>
              </div>

              {/* Key Quick Metrics */}
              <div className="hk-prop-detail__metrics">
                <div className="hk-prop-detail__metric">
                  <span className="hk-prop-detail__metric-val">{property.bedrooms}</span>
                  <span className="hk-prop-detail__metric-lbl">Bedrooms</span>
                </div>
                <div className="hk-prop-detail__metric">
                  <span className="hk-prop-detail__metric-val">{property.bathrooms}</span>
                  <span className="hk-prop-detail__metric-lbl">Bathrooms</span>
                </div>
                <div className="hk-prop-detail__metric">
                  <span className="hk-prop-detail__metric-val">{property.area}</span>
                  <span className="hk-prop-detail__metric-lbl">{property.areaUnit}</span>
                </div>
                <div className="hk-prop-detail__metric">
                  <span className="hk-prop-detail__metric-val">{property.yearBuilt}</span>
                  <span className="hk-prop-detail__metric-lbl">Year Built</span>
                </div>
              </div>

              <div className="hk-divider hk-prop-detail__divider" />

              {/* Description */}
              <div className="hk-prop-detail__section">
                <h2 className="hk-prop-detail__subheading">Architectural Overview</h2>
                <p className="hk-prop-detail__narrative">{property.description}</p>
              </div>

              <div className="hk-divider hk-prop-detail__divider" />

              {/* Curated Amenities */}
              <div className="hk-prop-detail__section">
                <div className="hk-prop-detail__features-header">
                  <h2 className="hk-prop-detail__subheading">Bespoke Amenities & Specifications</h2>
                  <span className="hk-prop-detail__features-tag">Verified Inclusions</span>
                </div>
                <div className="hk-prop-detail__features-grid">
                  {property.features.map((feat, i) => (
                    <div key={i} className="hk-prop-detail__feature-item">
                      <Checkbox
                        id={`prop-${property.id}-amenity-${i}`}
                        checked={verifiedAmenities[i] ?? true}
                        onChange={(e) => setVerifiedAmenities(prev => ({ ...prev, [i]: e.target.checked }))}
                        label={feat}
                        variant={i % 2 === 0 ? 'butter' : 'powder'}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hk-divider hk-prop-detail__divider" />

              {/* Technical Specifications */}
              <div className="hk-prop-detail__section">
                <h2 className="hk-prop-detail__subheading">Residence Specifications</h2>
                <dl className="hk-prop-detail__specs-list">
                  <div>
                    <dt>Floor / Elevation</dt>
                    <dd>{property.floor || 'Independent Ground Level'}</dd>
                  </div>
                  <div>
                    <dt>Orientation / Facing</dt>
                    <dd>{property.facing || 'East Facing'}</dd>
                  </div>
                  <div>
                    <dt>Parking Allocation</dt>
                    <dd>{property.parking || '2 Reserved Bays'}</dd>
                  </div>
                  <div>
                    <dt>Furnishing State</dt>
                    <dd>{property.furnishing || 'Curated Contemporary'}</dd>
                  </div>
                  <div>
                    <dt>Possession Status</dt>
                    <dd>{property.possession || 'Ready to Move'}</dd>
                  </div>
                </dl>
              </div>

              {/* Floor Plan Dimensions */}
              {property.floorPlan && (
                <>
                  <div className="hk-divider hk-prop-detail__divider" />
                  <div className="hk-prop-detail__section">
                    <h2 className="hk-prop-detail__subheading">Floor Plan & Spatial Proportions</h2>
                    <div className="hk-prop-detail__floor-box">
                      <div className="hk-prop-detail__floor-row">
                        <span>Levels:</span> <strong>{property.floorPlan.levels} Storey(s)</strong>
                      </div>
                      <div className="hk-prop-detail__floor-row">
                        <span>Grand Living & Dining:</span> <strong>{property.floorPlan.livingDining}</strong>
                      </div>
                      <div className="hk-prop-detail__floor-row">
                        <span>Master Suite:</span> <strong>{property.floorPlan.masterSuite}</strong>
                      </div>
                      <div className="hk-prop-detail__floor-row">
                        <span>Private Balcony / Terrace:</span> <strong>{property.floorPlan.terrace}</strong>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Financial & Mortgage Estimator */}
              <div className="hk-divider hk-prop-detail__divider" />
              <div className="hk-prop-detail__section hk-prop-detail__calculator">
                <h2 className="hk-prop-detail__subheading">Financial & Investment Estimator</h2>
                <p className="hk-prop-detail__calc-desc">
                  Simulate your customized acquisition structure based on prevailing private banking rates.
                </p>

                <div className="hk-prop-detail__calc-controls">
                  <div className="hk-prop-detail__slider-grp">
                    <div className="hk-prop-detail__slider-lbl">
                      <span>Down Payment ({downPaymentPct}%):</span>
                      <strong>{formatCurrency(property.price * (downPaymentPct / 100))}</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                      className="hk-range-input"
                      aria-label="Down payment percentage"
                    />
                  </div>

                  <div className="hk-prop-detail__slider-grp">
                    <div className="hk-prop-detail__slider-lbl">
                      <span>Loan Tenure ({tenureYears} Years):</span>
                      <strong>{tenureYears * 12} Installments</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="5"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="hk-range-input"
                      aria-label="Loan tenure in years"
                    />
                  </div>

                  {/* Compact Sliding Toggle: Wealth Advisory & Escrow Structure */}
                  <div className="hk-prop-detail__calc-toggle-row">
                    <Toggle
                      id={`prop-${property.id}-escrow-toggle`}
                      variant="compact"
                      size="small"
                      label="Include Private Banking Wealth Advisory & Legal Escrow (+0.25%)"
                      checked={includeEscrow}
                      onChange={(e) => setIncludeEscrow(e.target.checked)}
                      aria-label="Include private banking wealth advisory and legal escrow structure"
                    />
                  </div>
                </div>

                <div className="hk-prop-detail__calc-result">
                  <div>
                    <span className="hk-prop-detail__emi-label">Estimated Monthly Investment</span>
                    <strong className="hk-prop-detail__emi-val">{formatCurrency(monthlyEmi)}/mo</strong>
                  </div>
                  <span className="hk-prop-detail__emi-note">
                    Calculated at benchmark {effectiveInterestRate.toFixed(2)}% p.a. {includeEscrow ? '(includes 0.25% dedicated wealth escrow)' : ''} • Excludes statutory registration and stamp duty
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Private Client Advisor & Viewing Scheduler */}
            <aside className="hk-prop-detail__sidebar">
              {/* Advisor Card */}
              {property.advisor && (
                <div className="hk-advisor-card">
                  <div className="hk-advisor-card__header">
                    <img
                      src={property.advisor.avatar || FALLBACK_AVATAR}
                      alt={property.advisor.name}
                      className="hk-advisor-card__avatar"
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK_AVATAR) {
                          e.currentTarget.src = FALLBACK_AVATAR;
                        }
                      }}
                    />
                    <div>
                      <span className="hk-overline">Exclusive Advisory</span>
                      <h3 className="hk-advisor-card__name">{property.advisor.name}</h3>
                      <p className="hk-advisor-card__title">{property.advisor.title}</p>
                    </div>
                  </div>

                  <div className="hk-advisor-card__contact">
                    <a
                      href={`tel:${property.advisor.phone.replace(/\s/g, '')}`}
                      className="hk-btn hk-btn--secondary hk-btn--small hk-advisor-card__btn"
                      aria-label={`Call ${property.advisor.name} at ${property.advisor.phone}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>Call {property.advisor.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${property.advisor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${property.advisor.name}, I am interested in scheduling a private walkthrough of ${property.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hk-btn-whatsapp hk-advisor-card__wa-btn"
                      aria-label={`WhatsApp ${property.advisor.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.25-1.92 1.33-.5.07-1.15.1-3.32-.8-2.77-1.15-4.55-3.99-4.69-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4.06.63.51.24.48.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.79 3.48.94 3.63.15.15.24.23.28.29.04.07.04.4-.2 1.08z" />
                      </svg>
                      <span>WhatsApp Advisor</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Consultation Scheduler — ammarsaa Animated Form System */}
              <div className="hk-prop-detail__booking-box" id="book-viewing" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
                <AnimatedConsultation
                  defaultProperty={property.title}
                  compact
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related Properties ────────────────────────────────────────── */}
      {relatedProperties.length > 0 && (
        <section className="hk-section hk-prop-detail__related" aria-label="Similar properties">
          <div className="hk-container">
            <span className="hk-overline">Portfolio Recommendations</span>
            <h2 className="hk-prop-detail__related-title">Similar Extraordinary Residences</h2>
            <div className="hk-grid hk-grid--3">
              {relatedProperties.map((p, idx) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  index={idx}
                  onEnquire={() => {
                    const el = document.getElementById('book-viewing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
