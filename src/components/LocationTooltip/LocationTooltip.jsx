import React, { useState, useRef, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import './LocationTooltip.css';

/**
 * CloudSVG Component
 * Renders stylized floating cloud paths for Amine-maker sky animation.
 */
function CloudSVG({ className }) {
  return (
    <svg
      viewBox="0 0 100 45"
      className={className}
      aria-hidden="true"
    >
      <path d="M 20,40 Q 5,40 5,28 Q 5,16 18,16 Q 24,6 38,8 Q 52,2 65,12 Q 78,8 86,18 Q 95,20 95,30 Q 95,40 80,40 Z" />
    </svg>
  );
}

/**
 * Uiverse.io by Amine-maker Animated Location Tooltip
 *
 * Luxury Real-Estate Adaptation:
 * - Scale-in and blur-to-sharp reveal
 * - Dual-layer pulsing location marker with subtle bounce
 * - 3 floating clouds drifting across powder-blue sky
 * - Warm Ivory and Powder Blue frosted glass card
 * - Smart viewport detection preventing clipping
 * - Full keyboard focus, mobile tap-outside, ARIA support
 */
export default function LocationTooltip({
  property,
  children,
  position = 'auto', // 'auto' | 'top' | 'bottom'
  align = 'auto', // 'auto' | 'left' | 'right' | 'center'
  className = '',
  showCta = true,
  onOpen,
  onClose,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [computedPlacement, setComputedPlacement] = useState({
    vertical: position === 'auto' ? 'top' : position,
    horizontal: align === 'auto' ? 'left' : align,
  });

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const tooltipId = useId();

  // Smart viewport clipping calculation
  const updatePlacement = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const cardWidth = 310;
    const cardHeight = 270;

    let vertical = position;
    if (position === 'auto') {
      const spaceAbove = rect.top;
      const spaceBelow = viewportHeight - rect.bottom;
      vertical = spaceAbove >= cardHeight || spaceAbove > spaceBelow ? 'top' : 'bottom';
    }

    let horizontal = align;
    if (align === 'auto') {
      if (rect.left + cardWidth > viewportWidth - 16) {
        horizontal = 'right';
      } else if (rect.left < 16) {
        horizontal = 'left';
      } else {
        horizontal = 'left';
      }
    }

    setComputedPlacement({ vertical, horizontal });
  };

  const handleOpen = () => {
    clearTimeout(hoverTimeoutRef.current);
    updatePlacement();
    setIsOpen(true);
    if (onOpen) onOpen(property);
  };

  const handleClose = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsOpen(false);
    if (onClose) onClose(property);
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    handleOpen();
  };

  const handleMouseLeave = () => {
    // Grace delay so pointer can glide into the card
    hoverTimeoutRef.current = setTimeout(() => {
      handleClose();
    }, 180);
  };

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
      triggerRef.current?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTriggerClick(e);
    }
  };

  // Close on tap outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDownOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        handleClose();
      }
    };

    const handleWindowResize = () => {
      updatePlacement();
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => clearTimeout(hoverTimeoutRef.current);
  }, []);

  if (!property) return null;

  const placementClasses = `hk-loc-tooltip--${computedPlacement.vertical} hk-loc-tooltip--align-${computedPlacement.horizontal}`;

  return (
    <div
      ref={rootRef}
      className={`hk-loc-tooltip ${placementClasses} ${isOpen ? 'hk-loc-tooltip--open' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Interactive Trigger ── */}
      <button
        ref={triggerRef}
        type="button"
        className="hk-loc-tooltip__trigger"
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={tooltipId}
        aria-label={`View architectural location dossier for ${property.title}, ${property.location || property.city}`}
      >
        {children ? (
          children
        ) : (
          <>
            <span className="hk-loc-tooltip__pin-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <span className="hk-loc-tooltip__trigger-text">{property.location || property.city}</span>
          </>
        )}
      </button>

      {/* ── Amine-maker Glass Card Tooltip Popup ── */}
      <div
        id={tooltipId}
        ref={cardRef}
        role="dialog"
        aria-label={`Location Preview: ${property.title}`}
        className="hk-loc-tooltip__card"
        onMouseEnter={() => clearTimeout(hoverTimeoutRef.current)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hk-loc-tooltip__arrow" aria-hidden="true" />

        {/* 1. Header with Sky Backdrop, Floating Clouds & Pulsing Marker */}
        <div className="hk-loc-tooltip__header">
          {property.image && (
            <img
              src={property.image}
              alt=""
              className="hk-loc-tooltip__image-bg"
              loading="lazy"
              onError={(e) => {
                const fb = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85';
                if (e.currentTarget.src !== fb) {
                  e.currentTarget.src = fb;
                }
              }}
            />
          )}

          {/* Floating Clouds Layer */}
          <div className="hk-loc-tooltip__sky">
            <CloudSVG className="hk-loc-tooltip__cloud hk-loc-tooltip__cloud--1" />
            <CloudSVG className="hk-loc-tooltip__cloud hk-loc-tooltip__cloud--2" />
            <CloudSVG className="hk-loc-tooltip__cloud hk-loc-tooltip__cloud--3" />
          </div>

          {/* Pulsing Location Marker Pin */}
          <div className="hk-loc-tooltip__marker-hub" aria-hidden="true">
            <div className="hk-loc-tooltip__marker-pin">
              <div className="hk-loc-tooltip__marker-dot" />
            </div>
            <div className="hk-loc-tooltip__pulse-ring" />
            <div className="hk-loc-tooltip__pulse-ring hk-loc-tooltip__pulse-ring--outer" />
          </div>
        </div>

        {/* 2. Body Details from Real Property Data */}
        <div className="hk-loc-tooltip__body">
          <div className="hk-loc-tooltip__meta-row">
            <span className="hk-loc-tooltip__status-tag">{property.status || 'Verified Listing'}</span>
            <span className="hk-loc-tooltip__city-tag">{property.city}</span>
          </div>

          <h4 className="hk-loc-tooltip__title">{property.title}</h4>

          <p className="hk-loc-tooltip__locality">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2" />
            </svg>
            <span>{property.location || property.city}</span>
          </p>

          {/* Key Specs */}
          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="hk-loc-tooltip__specs">
              {property.bedrooms && (
                <div className="hk-loc-tooltip__spec-item">
                  <span className="hk-loc-tooltip__spec-val">{property.bedrooms}</span>
                  <span className="hk-loc-tooltip__spec-lbl">Beds</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="hk-loc-tooltip__spec-item">
                  <span className="hk-loc-tooltip__spec-val">{property.bathrooms}</span>
                  <span className="hk-loc-tooltip__spec-lbl">Baths</span>
                </div>
              )}
              {property.area && (
                <div className="hk-loc-tooltip__spec-item">
                  <span className="hk-loc-tooltip__spec-val">{property.area.toLocaleString()}</span>
                  <span className="hk-loc-tooltip__spec-lbl">{property.areaUnit || 'SQ FT'}</span>
                </div>
              )}
            </div>
          )}

          {property.priceFormatted && (
            <div className="hk-loc-tooltip__price">
              {property.priceFormatted}
            </div>
          )}

          {showCta && property.slug && (
            <Link
              to={`/properties/${property.slug}`}
              className="hk-loc-tooltip__cta"
              onClick={handleClose}
            >
              <span>Explore Residence</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
