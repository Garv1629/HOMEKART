import React, { useState } from 'react';
import PropertyInquiryForm from './PropertyInquiryForm';
import SiteVisitBookingForm from './SiteVisitBookingForm';
import './AnimatedForm.css';

/**
 * AnimatedConsultation
 * Dual-tabbed luxury consultation card providing immediate switching between:
 * 1. Property Inquiry Form (ammarsaa animated)
 * 2. Site-Visit Booking Form (ammarsaa animated)
 */
export default function AnimatedConsultation({
  defaultProperty = '',
  initialTab = 'inquiry', // 'inquiry' | 'visit'
  compact = false,
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className={`hk-animated-consultation ${className}`}>
      {/* Tab Switcher */}
      <div className="hk-animated-form__tabs" role="tablist" aria-label="Consultation Mode Selection">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'inquiry'}
          className={`hk-animated-form__tab-btn ${activeTab === 'inquiry' ? 'hk-animated-form__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('inquiry')}
        >
          Property Inquiry
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'visit'}
          className={`hk-animated-form__tab-btn ${activeTab === 'visit' ? 'hk-animated-form__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('visit')}
        >
          Schedule Site Visit
        </button>
      </div>

      {/* Render Active Form */}
      {activeTab === 'inquiry' ? (
        <PropertyInquiryForm
          defaultProperty={defaultProperty}
          compact={compact}
        />
      ) : (
        <SiteVisitBookingForm
          defaultProperty={defaultProperty}
          compact={compact}
        />
      )}
    </div>
  );
}
