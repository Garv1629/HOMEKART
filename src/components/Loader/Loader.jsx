import React from 'react';
import './Loader.css';

/**
 * Luxury Real Estate Loader Component
 * 
 * Features:
 * - 'bars': Mechanical bouncing ball over 5 vertical scaling bars (inspired by Nawsome)
 * - 'dots': Rhythmic fluid dot-wave (inspired by dovatgabriel)
 * - 'minimal': Clean editorial ring spinner
 * - Supports inline, card-embedded, or full-page glassmorphism overlays
 */
export default function Loader({
  variant = 'bars',
  size = 'md',
  text = 'Curating Residences...',
  fullPage = false,
  className = '',
  'aria-label': ariaLabel,
}) {
  const accessibleLabel = ariaLabel || text || 'Loading content';

  const loaderVisual = (
    <div
      className={`hk-loader hk-loader--${variant} hk-loader--${size} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={accessibleLabel}
    >
      {variant === 'bars' && (
        <div className="hk-loader-bars__stage" aria-hidden="true">
          <div className="hk-loader-bars__ball" />
          <div className="hk-loader-bars__bar hk-loader-bars__bar--1" />
          <div className="hk-loader-bars__bar hk-loader-bars__bar--2" />
          <div className="hk-loader-bars__bar hk-loader-bars__bar--3" />
          <div className="hk-loader-bars__bar hk-loader-bars__bar--4" />
          <div className="hk-loader-bars__bar hk-loader-bars__bar--5" />
        </div>
      )}

      {variant === 'dots' && (
        <div className="hk-loader-dots__stage" aria-hidden="true">
          <span className="hk-loader-dots__dot hk-loader-dots__dot--1" />
          <span className="hk-loader-dots__dot hk-loader-dots__dot--2" />
          <span className="hk-loader-dots__dot hk-loader-dots__dot--3" />
          <span className="hk-loader-dots__dot hk-loader-dots__dot--4" />
        </div>
      )}

      {variant === 'minimal' && (
        <div className="hk-loader-minimal__spinner" aria-hidden="true" />
      )}

      {text && (
        <p className="hk-loader__caption">
          <span className="hk-loader__caption-text">{text}</span>
          <span className="hk-loader__caption-ellipsis" aria-hidden="true" />
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="hk-loader-overlay" role="dialog" aria-modal="true" aria-label={accessibleLabel}>
        <div className="hk-loader-overlay__card">
          <div className="hk-loader-overlay__crest">✦ HOMEKART REALTY ✦</div>
          {loaderVisual}
        </div>
      </div>
    );
  }

  return loaderVisual;
}
