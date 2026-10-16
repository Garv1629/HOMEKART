import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { ContactForm, PropertyInquiryForm, SiteVisitBookingForm } from '../../components/AnimatedForm';
import { companyInfo } from '../../data/properties';
import { useScrollToTop, useInView } from '../../hooks/useUtils';
import './Contact.css';

export default function Contact() {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const prefilledProperty = searchParams.get('property') || '';
  const [activeFormTab, setActiveFormTab] = useState(prefilledProperty ? 'inquiry' : 'contact');

  useEffect(() => {
    if (prefilledProperty) {
      setActiveFormTab('inquiry');
    }
  }, [prefilledProperty]);
  const [openFaq, setOpenFaq] = useState(null);
  const [officesRef, officesVisible] = useInView({ threshold: 0.1 });
  const [faqRef, faqVisible] = useInView({ threshold: 0.08 });

  const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, '');
  const mainWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    prefilledProperty
      ? `Hello Homekart Realty, I would like to schedule a private client consultation regarding ${prefilledProperty}.`
      : 'Hello Homekart Realty, I would like to initiate a confidential dialogue with your Senior Advisory Desk.'
  )}`;

  const faqs = [
    {
      q: 'How does Homekart ensure privacy during property inquiries?',
      a: 'All client inquiries, identity details, and property viewings are conducted under strict non-disclosure protocols. We do not disclose client rosters, and viewing appointments are scheduled with private chauffeur arrivals and staggered viewings to guarantee anonymity.',
    },
    {
      q: 'Do you facilitate off-market private sales not listed publicly?',
      a: 'Yes. Over 40% of our ultra-luxury transactions occur completely off-market. Following an introductory verification with our Senior Advisory Desk, qualified buyers receive access to our confidential private dossier.',
    },
    {
      q: 'What architectural and legal due diligence is conducted prior to listing?',
      a: 'Every residence undergoes a multi-point audit: 30-year title provenance search by senior legal counsel, structural and MEP integrity checks, municipal sanction audit, and encumbrance verification.',
    },
    {
      q: 'Can Homekart assist NRI and overseas institutional family offices?',
      a: 'Absolutely. We maintain a dedicated Global Diaspora Desk providing end-to-end guidance on RBI FEMA regulations, NRE/NRO repatriation compliance, digital power of attorney protocols, and property management.',
    },
  ];

  return (
    <main className="hk-contact-page">
      {/* ── Page Banner ───────────────────────────────────────────────── */}
      <section className="hk-page-banner" aria-label="Contact header">
        <div className="hk-container">
          <SectionHeader
            as="h1"
            overline="Client Services & Advisory"
            title="Private Client Consultation"
            description="Initiate a confidential dialogue with our luxury property custodians. European private banking discretion, speed, and architectural precision assured."
          />
        </div>
      </section>

      {/* ── Main Form & Direct Line Section ───────────────────────────── */}
      <section className="hk-section" aria-label="Consultation Form">
        <div className="hk-container">
          <div className="hk-contact__grid">
            {/* Left: Interactive Animated Consultation Form */}
            <div className="hk-contact__form-wrap">
              <div className="hk-contact__header-box">
                <span className="hk-overline">Direct Custodial Registration</span>
                <h2 className="hk-contact__sec-title">Reserve a Confidential Consultation</h2>
                <p className="hk-contact__sec-desc">
                  Select your advisory focus below. A Managing Partner will coordinate your personalized briefing itinerary within two business hours.
                </p>
              </div>

              {/* Consultation Format Tabs */}
              <div className="hk-animated-form__tabs" role="tablist" aria-label="Consultation Form Options" style={{ maxWidth: 540, marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFormTab === 'contact'}
                  className={`hk-animated-form__tab-btn ${activeFormTab === 'contact' ? 'hk-animated-form__tab-btn--active' : ''}`}
                  onClick={() => setActiveFormTab('contact')}
                >
                  Advisory Dialogue
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFormTab === 'inquiry'}
                  className={`hk-animated-form__tab-btn ${activeFormTab === 'inquiry' ? 'hk-animated-form__tab-btn--active' : ''}`}
                  onClick={() => setActiveFormTab('inquiry')}
                >
                  Property Inquiry
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFormTab === 'visit'}
                  className={`hk-animated-form__tab-btn ${activeFormTab === 'visit' ? 'hk-animated-form__tab-btn--active' : ''}`}
                  onClick={() => setActiveFormTab('visit')}
                >
                  Site-Visit Booking
                </button>
              </div>

              {activeFormTab === 'contact' && (
                <ContactForm defaultProperty={prefilledProperty} />
              )}
              {activeFormTab === 'inquiry' && (
                <PropertyInquiryForm defaultProperty={prefilledProperty} />
              )}
              {activeFormTab === 'visit' && (
                <SiteVisitBookingForm defaultProperty={prefilledProperty} />
              )}
            </div>

            {/* Right: Direct Concierge, Verified Contacts & WhatsApp */}
            <aside className="hk-contact__aside">
              {/* Primary Concierge Box */}
              <div className="hk-contact__concierge-box">
                <span className="hk-overline hk-contact__concierge-overline">Direct Concierge</span>
                <h3 className="hk-contact__concierge-title">Private Client Desk</h3>
                <p className="hk-contact__concierge-text">
                  For immediate assistance with time-sensitive acquisitions, off-market dossiers, or confidential property dispositions:
                </p>

                {/* Prominent WhatsApp Channel */}
                <div className="hk-contact__whatsapp-channel">
                  <span className="hk-contact__channel-label">Instant Messaging Hotline</span>
                  <a
                    href={mainWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hk-btn-whatsapp hk-btn-whatsapp--prominent hk-contact__whatsapp-btn"
                    aria-label="Connect with Homekart Realty on WhatsApp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.25-1.92 1.33-.5.07-1.15.1-3.32-.8-2.77-1.15-4.55-3.99-4.69-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4.06.63.51.24.48.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.79 3.48.94 3.63.15.15.24.23.28.29.04.07.04.4-.2 1.08z" />
                    </svg>
                    <span>Connect on WhatsApp</span>
                  </a>
                  <span className="hk-contact__response-tag">Avg. Response: Under 15 Minutes</span>
                </div>

                {/* Direct Voice Hotline */}
                <div className="hk-contact__voice-channel">
                  <span className="hk-contact__channel-label">Confidential Voice Line</span>
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                    className="hk-contact__tel-link"
                    aria-label={`Call direct phone line at ${companyInfo.phone}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{companyInfo.phone}</span>
                  </a>
                </div>

                <div className="hk-contact__email-channel">
                  <span className="hk-contact__channel-label">Written Inquiries</span>
                  <a href={`mailto:${companyInfo.email}`} className="hk-contact__mailto">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              {/* Protocol Highlights */}
              <div className="hk-contact__protocol-box">
                <span className="hk-overline">Standards of Care</span>
                <h3 className="hk-contact__protocol-heading">The Homekart Protocol</h3>
                <ul className="hk-contact__protocol-list">
                  <li>
                    <span className="hk-contact__bullet">◈</span>
                    <div>
                      <strong>Senior Partner Attention</strong>
                      <p>Every consultation request is assigned directly to a Managing Partner, never an automated call-centre.</p>
                    </div>
                  </li>
                  <li>
                    <span className="hk-contact__bullet">◈</span>
                    <div>
                      <strong>Binding Non-Disclosure</strong>
                      <p>All property disclosures, family identities, and investment scales protected by institutional NDA.</p>
                    </div>
                  </li>
                  <li>
                    <span className="hk-contact__bullet">◈</span>
                    <div>
                      <strong>Zero Aggregator Leaks</strong>
                      <p>We operate independent of mass-market portals. Your contact details are never monetized or distributed.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Regional Private Offices ───────────────────────────────────── */}
      <section
        ref={officesRef}
        className={`hk-section hk-contact__offices-sec ${officesVisible ? 'hk-contact__offices-sec--visible' : ''}`}
        aria-label="Regional Offices"
      >
        <div className="hk-container">
          <SectionHeader
            overline="Regional Custodians"
            title="Regional Private Suites"
            description="Our physical offices are situated at landmark financial and cultural centers across India's principal metropolitan hubs."
          />

          <div className="hk-grid hk-grid--4 hk-contact__offices-grid">
            {companyInfo.offices.map((office, idx) => {
              const officeCleanPhone = office.phone.replace(/[^0-9]/g, '');
              const officeWhatsApp = `https://wa.me/${officeCleanPhone}?text=${encodeURIComponent(
                `Hello Homekart Realty, I would like to schedule an appointment at the ${office.city}.`
              )}`;

              return (
                <article
                  key={idx}
                  className="hk-office-card"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="hk-office-card__badge">METRO 0{idx + 1}</div>
                  <h3 className="hk-office-card__city">{office.city}</h3>
                  <p className="hk-office-card__address">{office.address}</p>

                  <div className="hk-office-card__meta">
                    <div>
                      <span className="hk-office-card__label">Direct Advisory Desk:</span>
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a>
                    </div>
                    <div>
                      <span className="hk-office-card__label">Admissions & Hours:</span>
                      <span>{office.hours}</span>
                    </div>
                  </div>

                  <div className="hk-office-card__actions">
                    <a
                      href={officeWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hk-office-card__wa-link"
                      aria-label={`Message ${office.city} on WhatsApp`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.25-1.92 1.33-.5.07-1.15.1-3.32-.8-2.77-1.15-4.55-3.99-4.69-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4.06.63.51.24.48.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.79 3.48.94 3.63.15.15.24.23.28.29.04.07.04.4-.2 1.08z" />
                      </svg>
                      <span>WhatsApp Appointment</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Client FAQ ────────────────────────────────────────────────── */}
      <section
        ref={faqRef}
        className={`hk-section hk-contact__faq-sec ${faqVisible ? 'hk-contact__faq-sec--visible' : ''}`}
        aria-label="Frequently Asked Questions"
      >
        <div className="hk-container hk-container--narrow">
          <SectionHeader
            overline="Client Inquiries"
            title="Frequently Addressed Questions"
            description="Clarity on privacy protocols, acquisition processes, and advisory standards."
          />

          <div className="hk-faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`hk-faq-item ${openFaq === i ? 'hk-faq-item--open' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  type="button"
                  className="hk-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="hk-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="hk-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
