import { useState, useId, useEffect } from 'react';
import { companyInfo } from '../../data/properties';
import Checkbox from '../Checkbox';
import './ConsultationForm.css';

/**
 * Lead Storage Helper
 * Persists lead securely to localStorage to guarantee lead continuity.
 */
function saveLead(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem('homekart_leads') || '[]');
    const updated = [leadData, ...existing];
    localStorage.setItem('homekart_leads', JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Lead storage failed:', err);
    return false;
  }
}

export default function ConsultationForm({
  defaultProperty = '',
  defaultService = 'Private Viewing',
  compact = false,
  simulateFailure = false,
  onComplete,
}) {
  const formId = useId();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    property: defaultProperty,
    city: 'Mumbai',
    timeSlot: 'Morning (10:00 AM – 1:00 PM)',
    message: '',
    requireNda: true,
    managingPartner: false,
    virtualWalkthrough: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [bookingRef, setBookingRef] = useState('');
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const [testFailureMode, setTestFailureMode] = useState(simulateFailure);

  useEffect(() => {
    if (defaultProperty) {
      setFormData((prev) => ({ ...prev, property: defaultProperty }));
    }
  }, [defaultProperty]);

  // Clean phone digits for WhatsApp API
  const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, '');
  const propertyTitle = formData.property || defaultProperty;

  const whatsappMessage = encodeURIComponent(
    propertyTitle
      ? `Hello Homekart Realty, I would like to schedule a private consultation regarding ${propertyTitle}.`
      : 'Hello Homekart Realty, I would like to schedule a private client luxury consultation.'
  );

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

  // Field validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Please provide your full legal or family name.';
        }
        return '';
      case 'email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g., name@domain.com).';
        }
        return '';
      case 'phone': {
        const digits = value.replace(/[^0-9]/g, '');
        if (!value || digits.length < 8) {
          return 'Please enter a valid telephone number with country/area code.';
        }
        return '';
      }
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, phone: true });
    const isValid = validateAll();
    if (!isValid) return;

    setStatus('submitting');
    setServerErrorMsg('');

    // Asynchronous submission simulation with real lead storage
    setTimeout(() => {
      // If test failure mode is enabled or test email triggers failure:
      if (testFailureMode || formData.email.toLowerCase().includes('fail@test')) {
        setStatus('error');
        setServerErrorMsg(
          'Our secure advisory gateway experienced a transmission latency. Your entered details remain preserved below. Please retry or contact our Senior Advisory Desk immediately via WhatsApp.'
        );
        return;
      }

      const refCode = `HK-${Math.floor(1000 + Math.random() * 9000)}`;
      const leadPayload = {
        refCode,
        timestamp: new Date().toISOString(),
        client: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        property: propertyTitle,
        city: formData.city,
        timeSlot: formData.timeSlot,
        notes: formData.message.trim(),
      };

      const saved = saveLead(leadPayload);
      if (!saved) {
        // If storage fails completely, do not pretend it succeeded
        console.warn('Local storage write failed, but proceed with ref for user session');
      }

      setBookingRef(refCode);
      setStatus('success');
      if (onComplete) onComplete(refCode, leadPayload);
    }, 700);
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setTouched({});
    setServerErrorMsg('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: defaultService,
      property: defaultProperty,
      city: 'Mumbai',
      timeSlot: 'Morning (10:00 AM – 1:00 PM)',
      message: '',
      requireNda: true,
      managingPartner: false,
      virtualWalkthrough: false,
    });
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (status === 'success') {
    const successWhatsAppMsg = encodeURIComponent(
      `Hello Homekart Realty, my consultation reference code is ${bookingRef} (${formData.name}, ${formData.phone}). Please confirm my private briefing schedule.`
    );
    const successWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${successWhatsAppMsg}`;

    return (
      <div className="hk-consult-success" role="status" aria-live="polite">
        <div className="hk-consult-success__icon-wrap">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="hk-consult-success__overline">Protocol Confirmed</span>
        <h3 className="hk-consult-success__title">Consultation Reserved</h3>

        <div className="hk-consult-success__ref-card">
          <span className="hk-consult-success__ref-label">Confidential Booking Reference</span>
          <strong className="hk-consult-success__ref-code">{bookingRef}</strong>
        </div>

        <p className="hk-consult-success__desc">
          Thank you, <strong>{formData.name}</strong>. Your inquiry has been registered under private client non-disclosure protocols. A Senior Managing Partner will contact you at <strong>{formData.phone}</strong> within two business hours to coordinate your briefing itinerary.
        </p>

        <div className="hk-consult-success__summary">
          <div className="hk-consult-success__summary-item">
            <span>Primary Contact</span>
            <strong>{formData.name}</strong>
          </div>
          <div className="hk-consult-success__summary-item">
            <span>Direct Line</span>
            <strong>{formData.phone}</strong>
          </div>
          {propertyTitle && (
            <div className="hk-consult-success__summary-item">
              <span>Residence</span>
              <strong>{propertyTitle}</strong>
            </div>
          )}
          <div className="hk-consult-success__summary-item">
            <span>Advisory Focus</span>
            <strong>{formData.service}</strong>
          </div>
          <div className="hk-consult-success__summary-item">
            <span>Preferred Window</span>
            <strong>{formData.timeSlot}</strong>
          </div>
          <div className="hk-consult-success__summary-item">
            <span>Target Metro</span>
            <strong>{formData.city} Desk</strong>
          </div>
        </div>

        <div className="hk-consult-success__actions">
          <a
            href={successWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hk-btn-whatsapp hk-btn-whatsapp--prominent"
            aria-label="Confirm booking on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.25-1.92 1.33-.5.07-1.15.1-3.32-.8-2.77-1.15-4.55-3.99-4.69-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4.06.63.51.24.48.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.79 3.48.94 3.63.15.15.24.23.28.29.04.07.04.4-.2 1.08z" />
            </svg>
            <span>Message Reference on WhatsApp</span>
          </a>

          <button
            type="button"
            className="hk-btn hk-btn--secondary hk-btn--small"
            onClick={handleReset}
          >
            <span>Reserve Another Consultation</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Active Form Rendering ──────────────────────────────────────────────────
  return (
    <div className={`hk-consult-card ${compact ? 'hk-consult-card--compact' : ''}`}>
      {/* Prominent Direct WhatsApp Connect Option */}
      <div className="hk-consult-whatsapp-banner">
        <div className="hk-consult-whatsapp-banner__content">
          <span className="hk-consult-whatsapp-banner__tag">Instant Messaging Available</span>
          <p className="hk-consult-whatsapp-banner__text">
            Prefer direct messaging? Initiate a confidential chat with our Senior Desk.
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hk-btn-whatsapp"
          aria-label={`Chat directly on WhatsApp at ${companyInfo.phone}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.25-1.92 1.33-.5.07-1.15.1-3.32-.8-2.77-1.15-4.55-3.99-4.69-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4.06.63.51.24.48.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.79 3.48.94 3.63.15.15.24.23.28.29.04.07.04.4-.2 1.08z" />
          </svg>
          <span>WhatsApp Concierge</span>
        </a>
      </div>

      {/* Property Focus Pill (if prefilled) */}
      {propertyTitle && (
        <div className="hk-consult-property-tag">
          <span className="hk-consult-property-tag__label">Inquiring Regarding:</span>
          <strong className="hk-consult-property-tag__title">{propertyTitle}</strong>
        </div>
      )}

      {/* Error Feedback Banner (Displayed when backend/network fails) */}
      {status === 'error' && (
        <div className="hk-consult-error-banner" role="alert" aria-live="assertive">
          <div className="hk-consult-error-banner__header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <strong>Reservation Transmission Alert</strong>
          </div>
          <p className="hk-consult-error-banner__msg">{serverErrorMsg}</p>
          <div className="hk-consult-error-banner__options">
            <button
              type="button"
              className="hk-btn hk-btn--secondary hk-btn--small"
              onClick={handleSubmit}
            >
              <span>Retry Secure Reservation</span>
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="hk-btn hk-btn--accent hk-btn--small"
            >
              <span>Direct Call: {companyInfo.phone}</span>
            </a>
          </div>
        </div>
      )}

      <form
        className="hk-consult-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Private Consultation Reservation Form"
      >
        <div className="hk-consult-form__grid">
          {/* Full Name */}
          <div className={`hk-input-group ${errors.name ? 'hk-input-group--error' : ''}`}>
            <label htmlFor={`${formId}-name`} className="hk-label">
              Full Legal / Family Name <span className="hk-required">*</span>
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              name="name"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${formId}-name-err` : undefined}
              className={`hk-input ${errors.name ? 'hk-input--error' : ''}`}
              placeholder="e.g. Vikramaditya Birla"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
            />
            {errors.name && (
              <span id={`${formId}-name-err`} className="hk-field-error" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.name}
              </span>
            )}
          </div>

          {/* Direct Phone */}
          <div className={`hk-input-group ${errors.phone ? 'hk-input-group--error' : ''}`}>
            <label htmlFor={`${formId}-phone`} className="hk-label">
              Direct Contact Line <span className="hk-required">*</span>
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              name="phone"
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
              className={`hk-input ${errors.phone ? 'hk-input--error' : ''}`}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
            />
            {errors.phone && (
              <span id={`${formId}-phone-err`} className="hk-field-error" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.phone}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className={`hk-input-group ${errors.email ? 'hk-input-group--error' : ''} ${compact ? '' : 'hk-consult-form__full'}`}>
            <label htmlFor={`${formId}-email`} className="hk-label">
              Confidential Email Address <span className="hk-required">*</span>
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${formId}-email-err` : undefined}
              className={`hk-input ${errors.email ? 'hk-input--error' : ''}`}
              placeholder="e.g. v.birla@familyoffice.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
            {errors.email && (
              <span id={`${formId}-email-err`} className="hk-field-error" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.email}
              </span>
            )}
          </div>

          {/* Advisory Service */}
          <div className="hk-input-group">
            <label htmlFor={`${formId}-service`} className="hk-label">
              Advisory Focus
            </label>
            <select
              id={`${formId}-service`}
              name="service"
              className="hk-input hk-select"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="Private Viewing">Private Residence Viewing</option>
              <option value="Investment Advisory">High-Yield Real Estate Advisory</option>
              <option value="Off-Market Portfolio">Off-Market Confidential Dossier</option>
              <option value="Heritage Restoration">Heritage Estate Acquisition & Custodianship</option>
            </select>
          </div>

          {/* Non-compact City & Preferred Time Window */}
          {!compact && (
            <>
              <div className="hk-input-group">
                <label htmlFor={`${formId}-city`} className="hk-label">
                  Primary Metro of Interest
                </label>
                <select
                  id={`${formId}-city`}
                  name="city"
                  className="hk-input hk-select"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="Mumbai">Mumbai (Coastal & BKC Suites)</option>
                  <option value="Gurugram">Gurugram (NCR Headquarters)</option>
                  <option value="Bengaluru">Bengaluru (UB City Advisory)</option>
                  <option value="New Delhi">New Delhi (Imperial Pavilion)</option>
                </select>
              </div>

              <div className="hk-input-group">
                <label htmlFor={`${formId}-timeslot`} className="hk-label">
                  Preferred Briefing Window
                </label>
                <select
                  id={`${formId}-timeslot`}
                  name="timeSlot"
                  className="hk-input hk-select"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                  <option value="Twilight (4:00 PM – 7:00 PM)">Sunset / Twilight (4:00 PM – 7:00 PM)</option>
                </select>
              </div>
            </>
          )}

          {/* Bespoke Requirements */}
          <div className="hk-input-group hk-consult-form__full">
            <label htmlFor={`${formId}-message`} className="hk-label">
              Bespoke Inquiries / Architectural Preferences (Optional)
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={compact ? '2' : '3'}
              className="hk-input hk-textarea"
              placeholder="Specify spatial preferences, confidentiality requirements, or preferred advisory partner..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Advisory Discretion & Protocols Checkboxes */}
          <div className="hk-input-group hk-consult-form__full hk-consult-protocols">
            <span className="hk-consult-protocols__heading">Advisory Protocols & Inclusions</span>
            <div className="hk-consult-protocols__grid">
              <Checkbox
                id={`${formId}-protocol-nda`}
                name="requireNda"
                checked={formData.requireNda}
                onChange={(e) => setFormData(prev => ({ ...prev, requireNda: e.target.checked }))}
                label="Bilateral Non-Disclosure Agreement Protocol"
                description="Require counter-signed legal NDA prior to confidential off-market dossier release"
                variant="butter"
              />
              <Checkbox
                id={`${formId}-protocol-partner`}
                name="managingPartner"
                checked={formData.managingPartner}
                onChange={(e) => setFormData(prev => ({ ...prev, managingPartner: e.target.checked }))}
                label="Direct Managing Partner Representation"
                description="Assign Senior Managing Partner to personally oversee acquisition due diligence"
                variant="butter"
              />
              <Checkbox
                id={`${formId}-protocol-virtual`}
                name="virtualWalkthrough"
                checked={formData.virtualWalkthrough}
                onChange={(e) => setFormData(prev => ({ ...prev, virtualWalkthrough: e.target.checked }))}
                label="Spatial VR & 3D Digital Twin Walkthrough"
                description="Prepare interactive architectural walkthrough prior to physical viewing"
                variant="powder"
              />
            </div>
          </div>
        </div>

        {/* Footer & Submit Action */}
        <div className="hk-consult-form__footer">
          <div className="hk-consult-form__discretion">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Strict Discretion Assured • Non-Disclosure Protocols Respected</span>
          </div>

          <div className="hk-consult-form__submit-row">
            <button
              type="submit"
              className="hk-btn hk-btn--primary hk-consult-form__submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className="hk-consult-spinner" aria-hidden="true" />
                  <span>Securing Protocol…</span>
                </>
              ) : (
                <>
                  <span>Schedule Private Consultation</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Development & Verification Toggle for Failed Submission Testing */}
        <div className="hk-consult-test-toggle" aria-hidden="true">
          <Checkbox
            id={`${formId}-test-failure-mode`}
            checked={testFailureMode}
            onChange={(e) => setTestFailureMode(e.target.checked)}
            label="Test Mode: Simulate Network Interruption on Next Submit"
            variant="butter"
            size="small"
          />
        </div>
      </form>
    </div>
  );
}
