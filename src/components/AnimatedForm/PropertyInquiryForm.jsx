import React, { useState } from 'react';
import FloatingField from './FloatingField';
import { companyInfo } from '../../data/properties';
import './AnimatedForm.css';

/**
 * Lead & Inquiry Storage Utility
 * Persists inquiry securely to localStorage without synthetic delays.
 */
function saveInquiry(inquiryData) {
  try {
    const existingInquiries = JSON.parse(localStorage.getItem('homekart_inquiries') || '[]');
    localStorage.setItem('homekart_inquiries', JSON.stringify([inquiryData, ...existingInquiries]));

    // Also persist to global leads ledger for unified CRM continuity
    const existingLeads = JSON.parse(localStorage.getItem('homekart_leads') || '[]');
    localStorage.setItem('homekart_leads', JSON.stringify([inquiryData, ...existingLeads]));
    return true;
  } catch (err) {
    console.error('Homekart Inquiry storage failed:', err);
    return false;
  }
}

const BUDGET_OPTIONS = [
  { value: '', label: 'Select Investment Budget' },
  { value: '₹5 Cr – ₹10 Cr', label: '₹5 Cr – ₹10 Cr' },
  { value: '₹10 Cr – ₹25 Cr', label: '₹10 Cr – ₹25 Cr' },
  { value: '₹25 Cr – ₹50 Cr', label: '₹25 Cr – ₹50 Cr' },
  { value: '₹50 Cr+', label: 'Ultra-Luxury (₹50 Cr+)' },
  { value: 'Undisclosed / Bespoke', label: 'Undisclosed / Institutional' },
];

export default function PropertyInquiryForm({
  defaultProperty = '',
  compact = false,
  onSuccess,
  className = '',
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyInterest: defaultProperty,
    budget: '₹10 Cr – ₹25 Cr',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [refCode, setRefCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Please provide your full legal or family name.';
        }
        return '';
      case 'phone': {
        const digits = value.replace(/[^0-9]/g, '');
        if (!value || digits.length < 8) {
          return 'Please enter a valid telephone number with country code.';
        }
        return '';
      }
      case 'email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid corporate or personal email address.';
        }
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });

    if (!validateAll()) return;

    setStatus('submitting');
    setErrorMessage('');

    // Connect to real storage without artificial delays
    const generatedRef = `HK-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiryPayload = {
      refCode: generatedRef,
      type: 'Property Inquiry',
      client: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      property: formData.propertyInterest.trim() || 'General Residence Portfolio',
      budget: formData.budget,
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
    };

    const saved = saveInquiry(inquiryPayload);
    if (saved) {
      setRefCode(generatedRef);
      setStatus('success');
      if (onSuccess) onSuccess(inquiryPayload);
    } else {
      setStatus('error');
      setErrorMessage('Local repository synchronization failed. Please try again or connect via direct WhatsApp.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      propertyInterest: defaultProperty,
      budget: '₹10 Cr – ₹25 Cr',
      message: '',
    });
    setTouched({});
    setErrors({});
    setStatus('idle');
    setRefCode('');
  };

  const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, '');
  const inquiryProp = formData.propertyInterest || defaultProperty || 'Residence Inquiry';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Homekart Realty Senior Advisory, I submitted Inquiry ${refCode || 'Dossier'} regarding ${inquiryProp}. Client: ${formData.name}.`
  )}`;

  return (
    <div className={`hk-animated-form ${compact ? 'hk-animated-form--compact' : ''} ${className}`}>
      {/* ammarsaa Glowing Pulse Title Indicator */}
      <div className="hk-animated-form__title-wrap">
        <h3 className="hk-animated-form__title">Property Inquiry</h3>
        <p className="hk-animated-form__subtitle">
          Confidential architectural advisory and verified acquisition dossier.
        </p>
      </div>

      {status === 'success' ? (
        <div className="hk-animated-form__success-box" role="status" aria-live="polite">
          <div className="hk-animated-form__success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--hk-font-display, serif)', color: '#432F2E' }}>
            Inquiry Dossier Registered
          </h4>
          <span className="hk-animated-form__ref-code">REF: {refCode}</span>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#705352', lineHeight: 1.5 }}>
            Thank you, {formData.name}. Our Senior Custodian for <strong>{inquiryProp}</strong> has received your dossier and will reach out with complete provenance documentation.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hk-animated-form__wa-link"
            aria-label="Direct WhatsApp verification with Senior Advisory Desk"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.25-1.92 1.33-.5.07-1.15.1-3.32-.8-2.77-1.15-4.55-3.99-4.69-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4.06.63.51.24.48.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.79 3.48.94 3.63.15.15.24.23.28.29.04.07.04.4-.2 1.08z" />
            </svg>
            <span>Priority WhatsApp Channel</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="hk-btn-subtle"
            style={{ fontSize: '0.78rem', marginTop: '0.5rem', background: 'none', border: 'none', color: '#705352', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {errorMessage && (
            <div className="hk-animated-field__error-msg" role="alert" style={{ marginBottom: '0.75rem' }}>
              <span>{errorMessage}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <FloatingField
              name="name"
              label="Full Legal / Family Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name ? errors.name : ''}
              required
              disabled={status === 'submitting'}
            />

            <div className="hk-animated-form__flex">
              <FloatingField
                name="phone"
                label="Telephone / WhatsApp"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone ? errors.phone : ''}
                required
                disabled={status === 'submitting'}
              />

              <FloatingField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : ''}
                required
                disabled={status === 'submitting'}
              />
            </div>

            <div className="hk-animated-form__flex">
              <FloatingField
                name="propertyInterest"
                label="Property Interest"
                value={formData.propertyInterest}
                onChange={handleChange}
                disabled={status === 'submitting'}
                placeholder="e.g. The Glass Residence"
              />

              <FloatingField
                as="select"
                name="budget"
                label="Investment Budget"
                value={formData.budget}
                onChange={handleChange}
                options={BUDGET_OPTIONS}
                disabled={status === 'submitting'}
              />
            </div>

            <FloatingField
              as="textarea"
              name="message"
              label="Acquisition Requirements / Notes"
              value={formData.message}
              onChange={handleChange}
              rows={compact ? 2 : 3}
              disabled={status === 'submitting'}
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="hk-animated-form__submit"
            >
              <span>{status === 'submitting' ? 'Registering Dossier...' : 'Submit Inquiry'}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
