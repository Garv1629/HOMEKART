import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { brandMilestones, companyInfo } from '../../data/properties';
import { useInView, useScrollToTop } from '../../hooks/useUtils';
import './About.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80';

export default function About() {
  useScrollToTop();
  const [statsRef, statsVisible] = useInView();
  const [manifestoRef, manifestoVisible] = useInView();
  const [pillarsRef, pillarsVisible] = useInView();
  const [timelineRef, timelineVisible] = useInView();
  const [leadersRef, leadersVisible] = useInView();

  const leaders = [
    {
      name: 'Gayatri Varma',
      title: 'Managing Director & Principal Advisor',
      region: 'NCR & Heritage Estates',
      bio: 'With over two decades advising prominent family offices across North India, Gayatri specializes in historic havelis and generational land acquisitions.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      office: 'Corporate Headquarters, One Horizon Centre, Gurugram',
    },
    {
      name: 'Aditya Singhal',
      title: 'Senior Partner, Western India',
      region: 'Mumbai Coastal & Penthouses',
      bio: 'A former architectural consultant, Aditya navigates Mumbai’s complex ultra-luxury vertical landscape with deep developer trust and rare sea-facing access.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      office: 'Private Client Suite, Maker Maxity, BKC, Mumbai',
    },
    {
      name: 'Vikram Chandran',
      title: 'Head of Southern Portfolio',
      region: 'Bengaluru Tech Corridors & Private Groves',
      bio: 'Vikram curates ultra-modern architectural villas and smart estates for tech founders, blending biophilic master planning with discreet portfolio assembly.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      office: 'Advisory Desk, UB City, Level 11, Bengaluru',
    },
  ];

  return (
    <main className="hk-about-page">
      {/* ── Editorial Hero ────────────────────────────────────────────── */}
      <section className="hk-about-hero" aria-label="About Homekart Realty">
        <div className="hk-about-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&auto=format&fit=crop&q=85"
            alt="Minimalist luxury architectural facade"
            className="hk-about-hero__img"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_IMAGE) {
                e.currentTarget.src = FALLBACK_IMAGE;
              }
            }}
          />
          <div className="hk-about-hero__overlay" />
        </div>

        <div className="hk-container hk-about-hero__content">
          <div className="hk-about-hero__badge">
            <span>Established {companyInfo.founded} • One Horizon Centre, Gurugram</span>
          </div>
          <h1 className="hk-about-hero__title">
            The Art of<br />Curated Living
          </h1>
          <p className="hk-about-hero__subtitle">
            Founded with a singular commitment: to elevate the luxury property transaction into an intimate, bespoke, and architecturally grounded journey.
          </p>
          <div className="hk-about-hero__metros">
            <span>Gurugram HQ</span>
            <span className="hk-about-hero__metro-dot">•</span>
            <span>Mumbai Suite</span>
            <span className="hk-about-hero__metro-dot">•</span>
            <span>Bengaluru Desk</span>
            <span className="hk-about-hero__metro-dot">•</span>
            <span>New Delhi Office</span>
          </div>
        </div>
      </section>

      {/* ── Verified Benchmarks Strip ─────────────────────────────────── */}
      <section
        ref={statsRef}
        className={`hk-about-stats ${statsVisible ? 'hk-about-stats--visible' : ''}`}
        aria-label="Verified company statistics"
      >
        <div className="hk-container">
          <div className="hk-about-stats__strip">
            <div className="hk-about-stats__item">
              <span className="hk-about-stats__num">{companyInfo.propertiesSold}</span>
              <span className="hk-about-stats__label">Properties Transacted</span>
              <span className="hk-about-stats__note">Verified acquisitions & private sales</span>
            </div>
            <div className="hk-about-stats__div" aria-hidden="true" />
            <div className="hk-about-stats__item">
              <span className="hk-about-stats__num">{companyInfo.citiesPresent}</span>
              <span className="hk-about-stats__label">Key Metros & Corridors</span>
              <span className="hk-about-stats__note">Hyperlocal intelligence desks</span>
            </div>
            <div className="hk-about-stats__div" aria-hidden="true" />
            <div className="hk-about-stats__item">
              <span className="hk-about-stats__num">{companyInfo.clientSatisfaction}</span>
              <span className="hk-about-stats__label">Client Advocacy Rating</span>
              <span className="hk-about-stats__note">Audited satisfaction across family offices</span>
            </div>
            <div className="hk-about-stats__div" aria-hidden="true" />
            <div className="hk-about-stats__item">
              <span className="hk-about-stats__num">{new Date().getFullYear() - companyInfo.founded}+</span>
              <span className="hk-about-stats__label">Years of Stewardship</span>
              <span className="hk-about-stats__note">Continuous advisory since {companyInfo.founded}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Manifesto & Philosophy ──────────────────────────────── */}
      <section
        ref={manifestoRef}
        className={`hk-section hk-about-manifesto ${manifestoVisible ? 'hk-about-manifesto--visible' : ''}`}
        aria-label="Philosophy & Manifesto"
      >
        <div className="hk-container">
          <div className="hk-about-manifesto__editorial">
            <div className="hk-about-manifesto__left">
              <span className="hk-overline">Our Philosophy</span>
              <h2 className="hk-about-manifesto__heading">
                We believe a home is not merely a transaction.<br />
                It is a sanctuary for generational memory.
              </h2>
              <div className="hk-about-manifesto__quote-box">
                <div className="hk-about-manifesto__quote-mark">“</div>
                <blockquote className="hk-about-manifesto__quote">
                  "Discretion is our foremost currency; architectural excellence is our unwavering criterion."
                </blockquote>
              </div>
              <div className="hk-about-manifesto__visual-wrap">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=85"
                  alt="Architectural limestone and curated light well"
                  className="hk-about-manifesto__visual-img"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                <span className="hk-about-manifesto__visual-caption">Architectural Purity • Curated Estate Detail</span>
              </div>
            </div>

            <div className="hk-about-manifesto__right">
              <span className="hk-overline hk-about-manifesto__sub-overline">Origins & Practice</span>
              <h3 className="hk-about-manifesto__sub-heading">
                Bridging Architectural Pedigree with Private Fiduciary Discretion
              </h3>
              <p>
                At Homekart Realty, we consciously reject the commoditization of living spaces. Founded in {companyInfo.founded} with corporate headquarters at One Horizon Centre on Golf Course Road, Gurugram, our practice was built to bridge the gap between world-class architectural design and discerning collectors of private residences.
              </p>
              <p>
                Unlike volume-driven aggregators that flood portals with unverified listings, our curation is intentionally restrained. Every property in our portfolio undergoes stringent architectural due diligence, structural auditing, and multi-generational legal provenance verification before being introduced to our private client registry.
              </p>
              <p>
                Whether acquiring an ocean-facing duplex along Mumbai’s Marine Drive, an expansive modernist estate on Golf Course Road, or an authentic restored haveli in Delhi, our clients engage with absolute confidentiality, calm discernment, and peace of mind.
              </p>

              <div className="hk-about-manifesto__fiduciary-box">
                <div className="hk-about-manifesto__fiduciary-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h4 className="hk-about-manifesto__fiduciary-title">Fiduciary Independence</h4>
                  <p className="hk-about-manifesto__fiduciary-desc">
                    We maintain strict custodial neutrality. Our advisors do not accept push-incentives or undisclosed developer commissions, ensuring our guidance is singularly dedicated to your family's lasting interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us: The Three Architectural Standards ──────────── */}
      <section
        ref={pillarsRef}
        className={`hk-section hk-about-pillars ${pillarsVisible ? 'hk-about-pillars--visible' : ''}`}
        aria-label="Why Choose Homekart Realty"
      >
        <div className="hk-container">
          <SectionHeader
            overline="The Architectural Standard"
            title="Why Choose Homekart Realty"
            description="Three non-negotiable principles that govern every acquisition, valuation, and private client relationship."
          />

          <div className="hk-pillars-editorial">
            {/* Lead Principle with Architectural Visual */}
            <article className="hk-pillar-lead">
              <div className="hk-pillar-lead__media">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=85"
                  alt="Harmonious architectural space with natural wood and light"
                  className="hk-pillar-lead__img"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                <div className="hk-pillar-lead__scrim" />
                <span className="hk-pillar-lead__num">PILLAR 01</span>
              </div>
              <div className="hk-pillar-lead__content">
                <span className="hk-pillar-lead__eyebrow">Spatial Integrity</span>
                <h3 className="hk-pillar-lead__title">Architectural Provenance & Material Purity</h3>
                <p className="hk-pillar-lead__desc">
                  We evaluate residences through an architectural lens rather than raw square footage. We examine spatial proportions, natural solar orientation, cross-ventilation axes, and construction craftsmanship from master practitioners. If a residence lacks structural honesty or spatial distinction, it does not enter our collection.
                </p>
                <div className="hk-pillar-lead__specs">
                  <span>Audited Spatial Flow</span>
                  <span className="hk-pillar-lead__dot">•</span>
                  <span>Structural Integrity Audits</span>
                  <span className="hk-pillar-lead__dot">•</span>
                  <span>Enduring Craftsmanship</span>
                </div>
              </div>
            </article>

            {/* Asymmetrical Diptych for Pillars 02 & 03 */}
            <div className="hk-pillars-diptych">
              <article className="hk-pillar-card-refined">
                <div className="hk-pillar-card-refined__header">
                  <span className="hk-pillar-card-refined__num">PILLAR 02</span>
                  <span className="hk-pillar-card-refined__badge">Confidential Protocol</span>
                </div>
                <h3 className="hk-pillar-card-refined__title">Uncompromising Discretion & Legal Stewardship</h3>
                <p className="hk-pillar-card-refined__desc">
                  Serving high-net-worth families, diplomatic clients, and corporate leaders with total confidentiality. All transactions proceed under customized non-disclosure agreements, shielded off-market dossiers, and rigorous multi-tier title verification to guarantee clean, unencumbered ownership.
                </p>
                <div className="hk-pillar-card-refined__footer">
                  <span className="hk-pillar-card-refined__tag">Non-Disclosure Protocols</span>
                  <span className="hk-pillar-card-refined__tag">Zero Public Aggregation</span>
                </div>
              </article>

              <article className="hk-pillar-card-refined">
                <div className="hk-pillar-card-refined__header">
                  <span className="hk-pillar-card-refined__num">PILLAR 03</span>
                  <span className="hk-pillar-card-refined__badge">Enduring Custodianship</span>
                </div>
                <h3 className="hk-pillar-card-refined__title">Bespoke Concierge & Generational Advisory</h3>
                <p className="hk-pillar-card-refined__desc">
                  Our engagement does not conclude with deed registration. We provide enduring custodial advisory across the lifetime of the property—from wealth structuring and interior architectural curation to private security staging and generational estate succession.
                </p>
                <div className="hk-pillar-card-refined__footer">
                  <span className="hk-pillar-card-refined__tag">Family Office Coordination</span>
                  <span className="hk-pillar-card-refined__tag">Long-Term Asset Care</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Milestones Timeline ─────────────────────────────────── */}
      <section
        ref={timelineRef}
        className={`hk-section hk-about-timeline ${timelineVisible ? 'hk-about-timeline--visible' : ''}`}
        aria-label="Heritage and Milestones"
      >
        <div className="hk-container hk-container--narrow">
          <SectionHeader
            overline="Heritage & Evolution"
            title="Milestones of Excellence"
            description="An audited chronology of our journey redefining luxury real estate advisory in India."
          />

          <div className="hk-timeline">
            {brandMilestones.map((ms, idx) => (
              <div
                key={idx}
                className="hk-timeline__item"
                style={{ '--ms-delay': `${idx * 0.16}s` }}
              >
                <div className="hk-timeline__year-col">
                  <span className="hk-timeline__year">{ms.year}</span>
                  <span className="hk-timeline__marker" aria-hidden="true" />
                </div>
                <div className="hk-timeline__content">
                  <span className="hk-timeline__step">MILESTONE 0{idx + 1}</span>
                  <h3 className="hk-timeline__title">{ms.title}</h3>
                  <p className="hk-timeline__desc">{ms.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Advisory Board ─────────────────────────────────── */}
      <section
        ref={leadersRef}
        className={`hk-section hk-about-leadership ${leadersVisible ? 'hk-about-leadership--visible' : ''}`}
        aria-label="Leadership Advisory"
      >
        <div className="hk-container">
          <SectionHeader
            overline="Senior Custodians"
            title="Leadership & Regional Custodians"
            description="Our senior partners bring decades of specialized insight into India's most nuanced luxury property micro-markets."
          />

          <div className="hk-leaders-editorial">
            {leaders.map((leader, i) => (
              <article key={i} className="hk-leader-monograph">
                <div className="hk-leader-monograph__image-wrap">
                  <img
                    src={leader.image || FALLBACK_AVATAR}
                    alt={leader.name}
                    className="hk-leader-monograph__image"
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== FALLBACK_AVATAR) {
                        e.currentTarget.src = FALLBACK_AVATAR;
                      }
                    }}
                  />
                  <div className="hk-leader-monograph__scrim" />
                  <span className="hk-leader-monograph__region-tag">{leader.region}</span>
                </div>
                <div className="hk-leader-monograph__info">
                  <span className="hk-leader-monograph__office">{leader.office}</span>
                  <h3 className="hk-leader-monograph__name">{leader.name}</h3>
                  <p className="hk-leader-monograph__title">{leader.title}</p>
                  <p className="hk-leader-monograph__bio">{leader.bio}</p>
                  <div className="hk-leader-monograph__action">
                    <Link to="/contact" className="hk-leader-monograph__link">
                      <span>Request Private Consultation</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Confidential Advisory CTA ─────────────────────────────────── */}
      <section className="hk-section hk-about-cta" aria-label="Initiate Confidential Discussion">
        <div className="hk-container hk-container--narrow">
          <div className="hk-about-cta__box">
            <span className="hk-overline hk-about-cta__overline">Private Client Desk</span>
            <h2 className="hk-about-cta__title">Initiate a Confidential Discussion</h2>
            <p className="hk-about-cta__desc">
              Whether curating an off-market acquisition, seeking structural due diligence on a signature estate, or arranging an invitation-only viewing, our Managing Partners are at your disposal.
            </p>
            <div className="hk-about-cta__actions">
              <Link to="/contact" className="hk-btn hk-btn--primary hk-btn--large">
                <span>Contact Private Client Desk</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/properties" className="hk-btn hk-btn--secondary hk-btn--large">
                <span>Explore Verified Collection</span>
              </Link>
            </div>
            <div className="hk-about-cta__meta">
              <span>Strict Non-Disclosure Protocols</span>
              <span className="hk-about-cta__dot">•</span>
              <span>Direct Senior Partner Representation</span>
              <span className="hk-about-cta__dot">•</span>
              <span>Zero Public Aggregation</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

